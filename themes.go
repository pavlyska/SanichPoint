package main

var PredefinedThemes = map[string]Theme{
	"gorkygold": {
		ID:          "gorkygold",
		Name:        "Золото и винтаж (стиль Тито)",
		Accent300:   "#E6C280",
		Accent400:   "#D4A359",
		Accent500:   "#B88638",
		Accent600:   "#946624",
		DarkBg:      "#0B0D12",
		CardBg:      "#121620",
		BorderColor: "rgba(212, 163, 89, 0.25)",
		PanelBg:     "rgba(18, 22, 32, 0.85)",
	},
	"sapphire": {
		ID:          "sapphire",
		Name:        "Деловой сапфир (стиль Набиуллина)",
		Accent300:   "#93C5FD",
		Accent400:   "#60A5FA",
		Accent500:   "#3B82F6",
		Accent600:   "#2563EB",
		DarkBg:      "#0A0F1D",
		CardBg:      "#111827",
		BorderColor: "rgba(96, 165, 250, 0.25)",
		PanelBg:     "rgba(17, 24, 39, 0.85)",
	},
	"emerald": {
		ID:          "emerald",
		Name:        "Изумруд и малахит",
		Accent300:   "#6EE7B7",
		Accent400:   "#34D399",
		Accent500:   "#10B981",
		Accent600:   "#059669",
		DarkBg:      "#06130E",
		CardBg:      "#0E231B",
		BorderColor: "rgba(52, 211, 153, 0.25)",
		PanelBg:     "rgba(14, 35, 27, 0.85)",
	},
	"ruby": {
		ID:          "ruby",
		Name:        "Императорский рубин (Красный)",
		Accent300:   "#FCA5A5",
		Accent400:   "#EF4444",
		Accent500:   "#DC2626",
		Accent600:   "#B91C1C",
		DarkBg:      "#0E0608",
		CardBg:      "#1C0C10",
		BorderColor: "rgba(239, 68, 68, 0.3)",
		PanelBg:     "rgba(28, 12, 16, 0.85)",
	},
	"amethyst": {
		ID:          "amethyst",
		Name:        "Королевский аметист",
		Accent300:   "#D8B4FE",
		Accent400:   "#C084FC",
		Accent500:   "#A855F7",
		Accent600:   "#9333EA",
		DarkBg:      "#0F0819",
		CardBg:      "#1B102B",
		BorderColor: "rgba(192, 132, 252, 0.25)",
		PanelBg:     "rgba(27, 16, 43, 0.85)",
	},
	"cyan": {
		ID:          "cyan",
		Name:        "Киберпанк и неон",
		Accent300:   "#67E8F9",
		Accent400:   "#22D3EE",
		Accent500:   "#06B6D4",
		Accent600:   "#0891B2",
		DarkBg:      "#071116",
		CardBg:      "#0E212A",
		BorderColor: "rgba(34, 211, 238, 0.25)",
		PanelBg:     "rgba(14, 33, 42, 0.85)",
	},
	"titanium": {
		ID:          "titanium",
		Name:        "Платина и титан",
		Accent300:   "#F1F5F9",
		Accent400:   "#CBD5E1",
		Accent500:   "#94A3B8",
		Accent600:   "#64748B",
		DarkBg:      "#0A0C10",
		CardBg:      "#141822",
		BorderColor: "rgba(203, 213, 225, 0.25)",
		PanelBg:     "rgba(20, 24, 34, 0.85)",
	},
}

func GetTheme(themeID string, custom *Theme) Theme {
	if custom != nil && custom.Accent400 != "" {
		return *custom
	}
	if theme, exists := PredefinedThemes[themeID]; exists {
		return theme
	}
	return PredefinedThemes["gorkygold"]
}

