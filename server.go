package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
)

type Server struct {
	mu           sync.Mutex
	workspaceDir string
	uploadedImgs map[string][]byte
}

func NewServer(workspaceDir string) *Server {
	return &Server{
		workspaceDir: workspaceDir,
		uploadedImgs: make(map[string][]byte),
	}
}

func (s *Server) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/themes", s.handleThemes)
	mux.HandleFunc("/api/sample", s.handleSample)
	mux.HandleFunc("/api/preview", s.handlePreview)
	mux.HandleFunc("/api/upload", s.handleUpload)
	mux.HandleFunc("/api/temp-asset/", s.handleTempAsset)
	mux.HandleFunc("/api/export", s.handleExport)
	mux.HandleFunc("/api/open-folder", s.handleOpenFolder)
	mux.HandleFunc("/api/open-file", s.handleOpenFile)
	mux.HandleFunc("/api/info", s.handleInfo)
}

func (s *Server) handleInfo(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]interface{}{
		"workspaceDir":  s.workspaceDir,
		"defaultExport": filepath.Join(s.workspaceDir, "презентация.html"),
	})
}

func (s *Server) handleThemes(w http.ResponseWriter, r *http.Request) {
	var list []Theme
	for _, t := range PredefinedThemes {
		list = append(list, t)
	}
	writeJSON(w, http.StatusOK, list)
}

func (s *Server) handleSample(w http.ResponseWriter, r *http.Request) {
	sample := GetSamplePresentation()
	writeJSON(w, http.StatusOK, sample)
}

func (s *Server) handlePreview(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var p Presentation
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		http.Error(w, "Invalid JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	htmlContent, err := GenerateHTML(&p, "/api/temp-asset/")
	if err != nil {
		http.Error(w, "Generation error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(htmlContent))
}

func (s *Server) handleUpload(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(32 << 20)
	if err != nil {
		http.Error(w, "File too large: "+err.Error(), http.StatusBadRequest)
		return
	}

	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "FormFile error: "+err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()

	data, err := io.ReadAll(file)
	if err != nil {
		http.Error(w, "Read error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	cleanName := filepath.Base(header.Filename)
	cleanName = strings.ReplaceAll(cleanName, " ", "_")

	s.mu.Lock()
	s.uploadedImgs[cleanName] = data
	s.mu.Unlock()

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success":  true,
		"fileName": cleanName,
		"url":      "/api/temp-asset/" + cleanName,
	})
}

func (s *Server) handleTempAsset(w http.ResponseWriter, r *http.Request) {
	fileName := strings.TrimPrefix(r.URL.Path, "/api/temp-asset/")
	cleanName := filepath.Base(fileName)

	s.mu.Lock()
	data, exists := s.uploadedImgs[cleanName]
	s.mu.Unlock()

	if exists {
		ext := strings.ToLower(filepath.Ext(cleanName))
		switch ext {
		case ".jpg", ".jpeg":
			w.Header().Set("Content-Type", "image/jpeg")
		case ".png":
			w.Header().Set("Content-Type", "image/png")
		case ".webp":
			w.Header().Set("Content-Type", "image/webp")
		case ".gif":
			w.Header().Set("Content-Type", "image/gif")
		case ".svg":
			w.Header().Set("Content-Type", "image/svg+xml")
		default:
			w.Header().Set("Content-Type", "application/octet-stream")
		}
		w.Write(data)
		return
	}

	possiblePaths := []string{
		filepath.Join(s.workspaceDir, "images", cleanName),
		filepath.Join(s.workspaceDir, "assets", cleanName),
		filepath.Join(s.workspaceDir, cleanName),
	}

	for _, p := range possiblePaths {
		if fileData, err := os.ReadFile(p); err == nil {
			ext := strings.ToLower(filepath.Ext(cleanName))
			switch ext {
			case ".jpg", ".jpeg":
				w.Header().Set("Content-Type", "image/jpeg")
			case ".png":
				w.Header().Set("Content-Type", "image/png")
			case ".webp":
				w.Header().Set("Content-Type", "image/webp")
			case ".gif":
				w.Header().Set("Content-Type", "image/gif")
			case ".svg":
				w.Header().Set("Content-Type", "image/svg+xml")
			default:
				w.Header().Set("Content-Type", "application/octet-stream")
			}
			w.Write(fileData)
			return
		}
	}

	http.NotFound(w, r)
}

func (s *Server) handleExport(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req ExportRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, ExportResponse{
			Success: false,
			Error:   "Invalid JSON: " + err.Error(),
		})
		return
	}

	outDir := strings.TrimSpace(req.OutputDir)
	if outDir == "" {
		outDir = s.workspaceDir
	}

	fileName := strings.TrimSpace(req.FileName)
	if fileName == "" {
		fileName = "презентация.html"
	}
	if !strings.HasSuffix(strings.ToLower(fileName), ".html") {
		fileName += ".html"
	}

	assetsSubdir := strings.TrimSpace(req.AssetsSubdir)
	if assetsSubdir == "" {
		assetsSubdir = "assets"
	}

	if err := os.MkdirAll(outDir, 0755); err != nil {
		writeJSON(w, http.StatusInternalServerError, ExportResponse{
			Success: false,
			Error:   "Не удалось создать директорию: " + err.Error(),
		})
		return
	}

	assetsFullDir := filepath.Join(outDir, assetsSubdir)
	if err := os.MkdirAll(assetsFullDir, 0755); err != nil {
		writeJSON(w, http.StatusInternalServerError, ExportResponse{
			Success: false,
			Error:   "Не удалось создать папку ассетов: " + err.Error(),
		})
		return
	}

	for _, slide := range req.Presentation.Slides {
		for _, el := range slide.Elements {
			if el.Type != ElemImage || el.ImageSrc == "" {
				continue
			}
			src := el.ImageSrc
			if strings.HasPrefix(src, "http://") || strings.HasPrefix(src, "https://") || strings.HasPrefix(src, "data:") {
				continue
			}

			baseName := filepath.Base(src)
			targetFile := filepath.Join(assetsFullDir, baseName)

			s.mu.Lock()
			cachedData, hasCached := s.uploadedImgs[baseName]
			s.mu.Unlock()

			if hasCached {
				_ = os.WriteFile(targetFile, cachedData, 0644)
				continue
			}

			possibleSources := []string{
				src,
				filepath.Join(s.workspaceDir, "images", baseName),
				filepath.Join(s.workspaceDir, "assets", baseName),
				filepath.Join(s.workspaceDir, baseName),
			}
			for _, ps := range possibleSources {
				if data, err := os.ReadFile(ps); err == nil {
					_ = os.WriteFile(targetFile, data, 0644)
					break
				}
			}
		}
	}

	htmlContent, err := GenerateHTML(&req.Presentation, assetsSubdir+"/")
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, ExportResponse{
			Success: false,
			Error:   "Ошибка генерации HTML: " + err.Error(),
		})
		return
	}

	targetHTMLPath := filepath.Join(outDir, fileName)
	if err := os.WriteFile(targetHTMLPath, []byte(htmlContent), 0644); err != nil {
		writeJSON(w, http.StatusInternalServerError, ExportResponse{
			Success: false,
			Error:   "Ошибка записи файла: " + err.Error(),
		})
		return
	}

	writeJSON(w, http.StatusOK, ExportResponse{
		Success:    true,
		FilePath:   targetHTMLPath,
		AssetsPath: assetsFullDir,
		Message:    fmt.Sprintf("Презентация успешно сохранена: %s", fileName),
	})
}

func (s *Server) handleOpenFolder(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Path string `json:"path"`
	}
	_ = json.NewDecoder(r.Body).Decode(&body)

	target := body.Path
	if target == "" {
		target = s.workspaceDir
	}

	fi, err := os.Stat(target)
	if err == nil && !fi.IsDir() {
		exec.Command("explorer.exe", "/select,", target).Start()
	} else {
		exec.Command("explorer.exe", target).Start()
	}

	writeJSON(w, http.StatusOK, map[string]bool{"success": true})
}

func (s *Server) handleOpenFile(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Path string `json:"path"`
	}
	_ = json.NewDecoder(r.Body).Decode(&body)

	target := body.Path
	if target == "" {
		http.Error(w, "Path required", http.StatusBadRequest)
		return
	}

	exec.Command("cmd", "/c", "start", "", target).Start()
	writeJSON(w, http.StatusOK, map[string]bool{"success": true})
}

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

