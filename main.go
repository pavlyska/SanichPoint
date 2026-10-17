package main

import (
	"context"
	"embed"
	"fmt"
	"io/fs"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"time"

	"github.com/jchv/go-webview2"
)

//go:embed web/*
var webFS embed.FS

func main() {
	execDir, err := os.Getwd()
	if err != nil {
		execDir = "."
	}
	if exePath, errExe := os.Executable(); errExe == nil {
		execDir = filepath.Dir(exePath)
	}

	parentDir := filepath.Dir(execDir)
	workspaceDir := execDir
	if _, err := os.Stat(filepath.Join(parentDir, "тито.html")); err == nil {
		workspaceDir = parentDir
	} else if _, err := os.Stat(filepath.Join(parentDir, "images")); err == nil {
		workspaceDir = parentDir
	}

	srv := NewServer(workspaceDir)

	mux := http.NewServeMux()
	srv.RegisterRoutes(mux)

	subFS, err := fs.Sub(webFS, "web")
	if err != nil {
		fmt.Printf("Ошибка монтирования статики: %v\n", err)
		return
	}
	mux.Handle("/", http.FileServer(http.FS(subFS)))

	port := findFreePort(8090)
	addr := fmt.Sprintf("127.0.0.1:%d", port)
	appURL := fmt.Sprintf("http://localhost:%d", port)

	fmt.Println("=============================================================")
	fmt.Println("   SANICHPOINT STUDIO — КОНСТРУКТОР ПРЕЗЕНТАЦИЙ")
	fmt.Println("   PowerPoint-холст • Мульти-фото • Голос • HTML + Assets")
	fmt.Println("=============================================================")
	fmt.Printf("   Рабочая папка: %s\n", workspaceDir)
	fmt.Printf("   Веб-сервер запущен: %s\n", appURL)
	fmt.Println("   Открываем окно приложения...")
	fmt.Println("   Для завершения закройте окно программы.")
	fmt.Println("=============================================================")

	server := &http.Server{
		Addr:    addr,
		Handler: mux,
	}

	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Printf("Ошибка сервера: %v\n", err)
		}
	}()

	w := webview2.NewWithOptions(webview2.WebViewOptions{
		Debug: false,
		WindowOptions: webview2.WindowOptions{
			Title:  "SanichPoint Studio — Конструктор Презентаций",
			Width:  1280,
			Height: 800,
			IconId: 1,
			Center: true,
		},
	})

	if w != nil {
		defer w.Destroy()
		w.SetSize(1280, 800, webview2.HintNone)
		w.Navigate(appURL)
		w.Run()

		ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
		defer cancel()
		_ = server.Shutdown(ctx)
		return
	}

	go func() {
		time.Sleep(300 * time.Millisecond)
		openBrowser(appURL)
	}()

	select {}
}

func findFreePort(startPort int) int {
	for p := startPort; p < startPort+100; p++ {
		l, err := net.Listen("tcp", fmt.Sprintf("127.0.0.1:%d", p))
		if err == nil {
			l.Close()
			return p
		}
	}
	l, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		return 8090
	}
	defer l.Close()
	return l.Addr().(*net.TCPAddr).Port
}

func openBrowser(url string) {
	if runtime.GOOS == "windows" {
		edgePaths := []string{
			`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`,
			`C:\Program Files\Microsoft\Edge\Application\msedge.exe`,
		}
		for _, ep := range edgePaths {
			if _, err := os.Stat(ep); err == nil {
				cmd := exec.Command(ep, fmt.Sprintf("--app=%s", url))
				if err := cmd.Start(); err == nil {
					return
				}
			}
		}

		cmd := exec.Command("cmd", "/c", "start", "", url)
		_ = cmd.Start()
		return
	}

	if runtime.GOOS == "darwin" {
		_ = exec.Command("open", url).Start()
		return
	}

	_ = exec.Command("xdg-open", url).Start()
}

