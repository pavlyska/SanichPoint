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


