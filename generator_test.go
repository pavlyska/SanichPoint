package main

import (
	"strings"
	"testing"
)

func TestGenerateHTML(t *testing.T) {
	sample := GetSamplePresentation()
	htmlOut, err := GenerateHTML(&sample, "assets/")
	if err != nil {
		t.Fatalf("GenerateHTML failed: %v", err)
	}

	if !strings.Contains(htmlOut, "Иосип Броз") {
		t.Errorf("HTML does not contain title")
	}
	if !strings.Contains(htmlOut, "toggleVoiceControl()") {
		t.Errorf("HTML does not contain voice control function")
	}
	if !strings.Contains(htmlOut, "«Дальше»") {
		t.Errorf("HTML does not contain voice prompt hints")
	}
	if !strings.Contains(htmlOut, "SpeechRecognition") {
		t.Errorf("HTML does not contain speech recognition engine")
	}
	if !strings.Contains(htmlOut, "initDots()") {
		t.Errorf("HTML does not contain dot navigation")
	}
}

func TestThemes(t *testing.T) {
	for id := range PredefinedThemes {
		theme := GetTheme(id, nil)
		if theme.Accent400 == "" {
			t.Errorf("Theme %s has empty accent", id)
		}
	}
}

func TestRomaniaSlideExport(t *testing.T) {
	p := Presentation{
		Title:   "Румыния",
		ThemeID: "crimson",
		Slides: []Slide{
			{
				ID:    1,
				Title: "Государственный профиль",
				Elements: []SlideElement{
					{
						ID:   "el_1",
						Type: ElemBadge,
						X:    4,
						Y:    8,
						W:    35,
						Text: "ГОСУДАРСТВЕННЫЙ ПРОФИЛЬ • ЮГО-ВОСТОЧНАЯ ЕВРОПА",
					},
					{
						ID:   "el_2",
						Type: ElemText,
						X:    4,
						Y:    18,
						W:    50,
						Text: "Крупнейшее государство региона с уникальной восточнороманской идентичностью, древней историей и развитой экономикой.",
					},
					{
						ID:    "el_3",
						Type:  ElemPanel,
						X:     4,
						Y:     28,
						W:     50,
						Title: "Фундаментальные параметры государства:",
						Bullets: []BulletItem{
							{Icon: "🏛️", Title: "Столица и мегаполис:", Text: "Бухарест с населением свыше 2 млн жителей — главный политический, индустриальный и финансовый центр"},
							{Icon: "🌐", Title: "Международный статус:", Text: "Полноправный член Европейского союза с 2007 года, НАТО с 2004 года и стратегический партнер в Черноморье"},
							{Icon: "📜", Title: "Языковая уникальность:", Text: "Прямой потомок народной латыни, окруженный славянскими и финно-угорскими языковыми ареалами"},
							{Icon: "🗺️", Title: "Территориальный масштаб:", Text: "238,397 км² площади — 12-е по величине государство в Европейском союзе"},
						},
					},
					{
						ID:          "el_4",
						Type:        ElemImage,
						X:           57,
						Y:           13,
						W:           38,
						FallbackURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Turnul_Sfatului_din_Sibiu_2012.JPG/1280px-Turnul_Sfatului_din_Sibiu_2012.JPG",
					},
				},
			},
		},
	}

	htmlOut, err := GenerateHTML(&p, "assets/")
	if err != nil {
		t.Fatalf("GenerateHTML failed: %v", err)
	}
	if !strings.Contains(htmlOut, "slide-stage") {
		t.Errorf("HTML does not contain 16:9 slide-stage")
	}
}

func TestNewComponentsAndBackgrounds(t *testing.T) {
	p := Presentation{
		Title:   "Уникальная презентация",
		ThemeID: "gorkygold",
		Slides: []Slide{
			{
				ID:             1,
				Title:          "Слайд с градиентом и новыми компонентами",
				BgType:         "gradient",
				BgGradient:     "linear-gradient(135deg, #090A0F 0%, #151A2E 100%)",
				Elements: []SlideElement{
					{
						ID:    "m_1",
						Type:  ElemMetric,
						X:     10,
						Y:     15,
						W:     35,
						Title: "Эффективность",
						Value: "+180%",
						Trend: "↑ рекорд года",
						Icon:  "▲",
					},
					{
						ID:        "t_1",
						Type:      ElemTimeline,
						X:         10,
						Y:     45,
						W:         45,
						StepBadge: "ФАЗА 01",
						Title:     "Старт проекта",
						Description: "Формирование команды и утверждение дорожной карты",
					},
					{
						ID:      "c_1",
						Type:    ElemCallout,
						X:       58,
						Y:       15,
						W:       35,
						Title:   "Внимание",
						Text:    "Критически важный тезис презентации",
						Variant: "warning",
						Icon:    "⚠️",
					},
					{
						ID:       "cd_1",
						Type:     ElemCode,
						X:        58,
						Y:        45,
						W:        35,
						Title:    "deploy.sh",
						Language: "BASH",
						Code:     "echo 'Deployed successfully'",
					},
					{
						ID:   "d_1",
						Type: ElemDivider,
						X:    10,
						Y:    75,
						W:    80,
						Text: "РАЗДЕЛ II",
					},
					{
						ID:   "b_1",
						Type: ElemButton,
						X:    10,
						Y:    85,
						W:    30,
						Text: "Узнать больше",
						Icon: "→",
						URL:  "https://example.com",
					},
				},
			},
			{
				ID:             2,
				Title:          "Слайд с узором",
				BgType:         "pattern",
				BgPattern:      "blueprint",
				BgColor:        "#070e1c",
				Elements: []SlideElement{
					{
						ID:   "el_title",
						Type: ElemTitle,
						X:    10,
						Y:    20,
						W:    80,
						Text: "Инженерная сетка",
					},
				},
			},
			{
				ID:             3,
				Title:          "Слайд с фото-фоном",
				BgType:         "image",
				BgImage:        "bg_abstract.jpg",
				OverlayOpacity: 0.70,
				Elements: []SlideElement{
					{
						ID:   "el_title2",
						Type: ElemTitle,
						X:    10,
						Y:    20,
						W:    80,
						Text: "Фотографический фон",
					},
				},
			},
		},
	}

	htmlOut, err := GenerateHTML(&p, "assets/")
	if err != nil {
		t.Fatalf("GenerateHTML failed: %v", err)
	}

	// Verify background rendering
	if !strings.Contains(htmlOut, "linear-gradient(135deg, #090A0F 0%, #151A2E 100%)") {
		t.Errorf("HTML does not contain gradient background")
	}
	if !strings.Contains(htmlOut, "pattern-blueprint") {
		t.Errorf("HTML does not contain pattern-blueprint class")
	}
	if !strings.Contains(htmlOut, "rgba(0,0,0,0.70)") {
		t.Errorf("HTML does not contain image overlay opacity")
	}

	// Verify all 6 new element components
	if !strings.Contains(htmlOut, "+180%") || !strings.Contains(htmlOut, "↑ рекорд года") {
		t.Errorf("HTML does not contain metric component data")
	}
	if !strings.Contains(htmlOut, "ФАЗА 01") || !strings.Contains(htmlOut, "Старт проекта") {
		t.Errorf("HTML does not contain timeline component data")
	}
	if !strings.Contains(htmlOut, "Критически важный тезис") || !strings.Contains(htmlOut, "#F59E0B") {
		t.Errorf("HTML does not contain callout component data")
	}
	if !strings.Contains(htmlOut, "deploy.sh") || !strings.Contains(htmlOut, "Deployed successfully") {
		t.Errorf("HTML does not contain code component data")
	}
	if !strings.Contains(htmlOut, "РАЗДЕЛ II") {
		t.Errorf("HTML does not contain divider component data")
	}
	if !strings.Contains(htmlOut, "Узнать больше") || !strings.Contains(htmlOut, "https://example.com") {
		t.Errorf("HTML does not contain button component data")
	}
}

func TestImageAndPanelHeightAndCompact(t *testing.T) {
	p := Presentation{
		Title:   "Тест размеров и компактности",
		ThemeID: "titanium",
		Slides: []Slide{
			{
				ID:    1,
				Title: "Слайд с компактными элементами",
				Elements: []SlideElement{
					{
						ID:       "img_compact",
						Type:     ElemImage,
						X:        4,
						Y:        26,
						W:        44,
						Compact:  true,
						ImageSrc: "https://example.com/test1.jpg",
					},
					{
						ID:       "img_custom_h",
						Type:     ElemImage,
						X:        4,
						Y:        54,
						W:        44,
						H:        26,
						ImageSrc: "https://example.com/test2.jpg",
					},
					{
						ID:    "panel_custom_h",
						Type:  ElemPanel,
						X:     52,
						Y:     26,
						W:     44,
						H:     30,
						Title: "Панель с фиксированной высотой",
					},
				},
			},
		},
	}

	htmlOut, err := GenerateHTML(&p, "assets/")
	if err != nil {
		t.Fatalf("GenerateHTML failed: %v", err)
	}

	if !strings.Contains(htmlOut, "aspect-[16/10] max-h-[15cqw]") {
		t.Errorf("HTML does not contain compact image aspect class")
	}
	if !strings.Contains(htmlOut, "height:calc(26.00 * 0.5625cqw)") {
		t.Errorf("HTML does not contain calculated height for image with H:26")
	}
	if !strings.Contains(htmlOut, "height:calc(30.00 * 0.5625cqw)") {
		t.Errorf("HTML does not contain calculated height for panel with H:30")
	}
}
