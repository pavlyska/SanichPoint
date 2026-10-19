package main

type ElementType string

const (
	ElemTitle    ElementType = "title"
	ElemText     ElementType = "text"
	ElemBadge    ElementType = "badge"
	ElemImage    ElementType = "image"
	ElemPanel    ElementType = "panel"
	ElemBullets  ElementType = "bullets"
	ElemQuote    ElementType = "quote"
	ElemMetric   ElementType = "metric"
	ElemTimeline ElementType = "timeline"
	ElemCallout  ElementType = "callout"
	ElemDivider  ElementType = "divider"
	ElemCode     ElementType = "code"
	ElemButton   ElementType = "button"
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
	Compact      bool         `json:"compact,omitempty"`
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
	ObjectFit    string       `json:"objectFit,omitempty"`
	Icon         string       `json:"icon"`
	Title        string       `json:"title"`
	Description  string       `json:"description"`
	Bullets      []BulletItem `json:"bullets"`
	QuoteAuthor  string       `json:"quoteAuthor"`
	QuoteRole    string       `json:"quoteRole"`
	// Новые поля для компонентов
	Value     string `json:"value,omitempty"`
	Trend     string `json:"trend,omitempty"`
	StepBadge string `json:"stepBadge,omitempty"`
	Variant   string `json:"variant,omitempty"`
	Code      string `json:"code,omitempty"`
	Language  string `json:"language,omitempty"`
	URL       string `json:"url,omitempty"`
	Style     string `json:"style,omitempty"`
}

type Slide struct {
	ID             int            `json:"id"`
	Title          string         `json:"title"`
	Elements       []SlideElement `json:"elements"`
	BgType         string         `json:"bgType,omitempty"`         // "theme", "color", "gradient", "image", "pattern"
	BgColor        string         `json:"bgColor,omitempty"`        // custom color hex
	BgGradient     string         `json:"bgGradient,omitempty"`     // CSS gradient
	BgImage        string         `json:"bgImage,omitempty"`        // image url or local path
	OverlayOpacity float64        `json:"overlayOpacity,omitempty"` // 0.0 - 1.0 (default 0.65)
	BgPattern      string         `json:"bgPattern,omitempty"`      // "dots", "grid", "blueprint", "radial"
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
	Presentation       Presentation `json:"presentation"`
	OutputDir          string       `json:"outputDir"`
	FileName           string       `json:"fileName"`
	AssetsSubdir       string       `json:"assetsSubdir"`
	EnableVoiceControl *bool        `json:"enableVoiceControl,omitempty"`
	IncludeUI          *bool        `json:"includeUI,omitempty"`
}

type GeneratorOptions struct {
	EnableVoiceControl bool
	IncludeUI          bool
}

type ExportResponse struct {
	Success    bool   `json:"success"`
	FilePath   string `json:"filePath"`
	AssetsPath string `json:"assetsPath"`
	Message    string `json:"message"`
	Error      string `json:"error,omitempty"`
}

