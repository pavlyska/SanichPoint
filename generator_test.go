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

