package main

type ElementType string

const (
	ElemTitle   ElementType = "title"
	ElemText    ElementType = "text"
	ElemBadge   ElementType = "badge"
	ElemImage   ElementType = "image"
	ElemPanel   ElementType = "panel"
	ElemBullets ElementType = "bullets"
	ElemQuote   ElementType = "quote"
)

type BulletItem struct {
	Icon  string `json:"icon"`
	Title string `json:"title"`
	Text  string `json:"text"`
}

type SlideElement struct {
	ID           string       `json:"id"`
	Type         ElementType  `json:"type"`
	X            float64      `json:"x"`
	Y            float64      `json:"y"`
	W            float64      `json:"w"`
	H            float64      `json:"h,omitempty"`
	ZIndex       int          `json:"zIndex"`
	Text         string       `json:"text"`
	AccentText   string       `json:"accentText"`
	FontSize     int          `json:"fontSize"`
	FontFamily   string       `json:"fontFamily"`
	TextAlign    string       `json:"textAlign"`
	Color        string       `json:"color"`
	BgStyle      string       `json:"bgStyle"`
	ImageSrc     string       `json:"imageSrc"`
	ImageCaption string       `json:"imageCaption"`
	FallbackURL  string       `json:"fallbackUrl"`
	Icon         string       `json:"icon"`
	Title        string       `json:"title"`
	Description  string       `json:"description"`
	Bullets      []BulletItem `json:"bullets"`
	QuoteAuthor  string       `json:"quoteAuthor"`
	QuoteRole    string       `json:"quoteRole"`
}

type Slide struct {
	ID       int            `json:"id"`
	Title    string         `json:"title"`
	Elements []SlideElement `json:"elements"`
}

type Theme struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Accent300   string `json:"accent300"`
	Accent400   string `json:"accent400"`
	Accent500   string `json:"accent500"`
	Accent600   string `json:"accent600"`
	DarkBg      string `json:"darkBg"`
	CardBg      string `json:"cardBg"`
	BorderColor string `json:"borderColor"`
	PanelBg     string `json:"panelBg"`
}

type Presentation struct {
	Title       string  `json:"title"`
	Subtitle    string  `json:"subtitle"`
	Monogram    string  `json:"monogram"`
	ThemeID     string  `json:"themeId"`
	CustomTheme *Theme  `json:"customTheme,omitempty"`
	Slides      []Slide `json:"slides"`
}

type ExportRequest struct {
	Presentation Presentation `json:"presentation"`
	OutputDir    string       `json:"outputDir"`
	FileName     string       `json:"fileName"`
	AssetsSubdir string       `json:"assetsSubdir"`
}

type ExportResponse struct {
	Success    bool   `json:"success"`
	FilePath   string `json:"filePath"`
	AssetsPath string `json:"assetsPath"`
	Message    string `json:"message"`
	Error      string `json:"error,omitempty"`
}

