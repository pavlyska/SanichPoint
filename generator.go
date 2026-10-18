package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html"
	"strings"
)

func GenerateHTML(p *Presentation, assetsRelativePath string) (string, error) {
	theme := GetTheme(p.ThemeID, p.CustomTheme)
	projectJSON, _ := json.Marshal(p)

	var buf bytes.Buffer
	title := p.Title
	if title == "" {
		title = "Презентация"
	}
	subtitle := p.Subtitle
	if subtitle == "" {
		subtitle = "Интерактивный доклад"
	}
	monogram := p.Monogram
	if monogram == "" {
		words := strings.Fields(title)
		if len(words) >= 2 {
			r1 := []rune(words[0])
			r2 := []rune(words[1])
			if len(r1) > 0 && len(r2) > 0 {
				monogram = strings.ToUpper(string(r1[0]) + string(r2[0]))
			}
		} else if len(words) == 1 {
			r := []rune(words[0])
			if len(r) >= 2 {
				monogram = strings.ToUpper(string(r[:2]))
			} else {
				monogram = strings.ToUpper(string(r))
			}
		} else {
			monogram = "ПР"
		}
	}

	totalSlides := len(p.Slides)
	if totalSlides == 0 {
		totalSlides = 1
	}

	buf.WriteString(`<!DOCTYPE html>
<html lang="ru" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>` + html.EscapeString(title) + ` — ` + html.EscapeString(subtitle) + `</title>

  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            accent: {
              300: '` + theme.Accent300 + `',
              400: '` + theme.Accent400 + `',
              500: '` + theme.Accent500 + `',
              600: '` + theme.Accent600 + `',
            },
            darkbg: '` + theme.DarkBg + `',
            darkcard: '` + theme.CardBg + `'
          },
          fontFamily: {
            serif: ['"Playfair Display"', 'Georgia', 'serif'],
            sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,500;1,600&display=swap" rel="stylesheet">

  <style>
    body {
      background-color: ` + theme.DarkBg + `;
      color: #F3F4F6;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .slide {
      opacity: 0;
      visibility: hidden;
      transform: translateY(12px);
      transition: opacity 0.35s ease, transform 0.35s ease, visibility 0.35s;
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      pointer-events: none;
    }

    .slide.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
      z-index: 10;
    }

    @keyframes mic-glow {
      0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
      100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
    .mic-active {
      animation: mic-glow 1.5s infinite;
      border-color: #EF4444 !important;
      background: rgba(239, 68, 68, 0.2) !important;
      color: #FCA5A5 !important;
    }

    .panel-box {
      background: ` + theme.PanelBg + `;
      border: 1px solid ` + theme.BorderColor + `;
      backdrop-filter: blur(10px);
    }
    .panel-box:hover {
      border-color: ` + theme.Accent400 + `55;
    }
  </style>
</head>

<body class="h-full w-full flex flex-col justify-between select-none">

  <header class="relative z-20 w-full px-6 lg:px-12 py-3.5 border-b border-slate-800 bg-[#0B0D12]/95 backdrop-blur-md flex items-center justify-between">

    <div class="flex items-center space-x-3">
      <div>
        <h1 class="text-sm md:text-base font-semibold text-white tracking-wide">
          ` + html.EscapeString(title) + `
        </h1>
        <p class="text-xs text-slate-400">` + html.EscapeString(subtitle) + `</p>
      </div>
    </div>

    <div class="flex items-center space-x-3">

      <div id="voiceFeedback" class="hidden text-xs md:text-sm px-3.5 py-1.5 rounded-full bg-accent-400 text-black font-bold font-mono shadow-lg transition">
        Слайд переключен
      </div>

      <button id="voiceBtn" onclick="toggleVoiceControl()"
              title="Нажмите, чтобы включить голосовое управление: слова «Дальше», «Назад», «Конец»"
              class="flex items-center space-x-2 px-4 py-2 rounded-xl border border-accent-500/50 bg-accent-500/10 hover:bg-accent-500/20 text-xs md:text-sm font-semibold text-accent-300 transition shadow-sm cursor-pointer">
        <span id="micDot" class="w-2.5 h-2.5 rounded-full bg-accent-400"></span>
        <span id="voiceText">🎤 Включить режим голоса</span>
      </button>

      <button onclick="toggleFullscreen()" class="p-2 text-slate-400 hover:text-white transition cursor-pointer" title="Полный экран">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </button>
    </div>
  </header>

  <main class="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 py-3 flex flex-col justify-center overflow-hidden">
`)

	for i, slide := range p.Slides {
		slideNum := i + 1
		activeClass := ""
		if slideNum == 1 {
			activeClass = " active"
		}

		buf.WriteString(fmt.Sprintf(`    <section class="slide%s" data-slide="%d">`+"\n", activeClass, slideNum))
		buf.WriteString(`      <div class="relative w-full h-full max-w-6xl mx-auto">` + "\n")

		renderCanvasElements(&buf, slide.Elements, theme, assetsRelativePath)

		buf.WriteString(`      </div>` + "\n")
		buf.WriteString("    </section>\n\n")
	}

	buf.WriteString(`  </main>

  <footer class="relative z-20 w-full px-6 lg:px-12 py-3.5 border-t border-slate-800 bg-[#0B0D12]/95 backdrop-blur-md flex items-center justify-between">

    <button id="prevBtn" onclick="prevSlide()"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sm font-semibold text-slate-200 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Назад (←)</span>
    </button>

    <div class="flex items-center space-x-3">
      <div id="dotsContainer" class="flex items-center space-x-2"></div>
      <span id="slideCounter" class="text-sm font-mono font-bold text-accent-400 ml-2">
        1 / ` + fmt.Sprintf("%d", totalSlides) + `
      </span>
      <span class="text-xs text-slate-500 hidden sm:inline border-l border-slate-800 pl-3">
        Команды голосом: <span class="text-accent-400 font-medium">«Дальше»</span>, <span class="text-slate-400 font-medium">«Назад»</span>, <span class="text-red-400 font-medium">«Конец»</span>
      </span>
    </div>

    <button id="nextBtn" onclick="nextSlide()"
            class="flex items-center space-x-2 px-5 py-2 rounded-lg bg-accent-500 hover:bg-accent-400 text-black text-sm font-bold transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-md">
      <span>Дальше (→ / Пробел)</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

  </footer>

  <script>
    let currentSlide = 1;
    const totalSlides = ` + fmt.Sprintf("%d", totalSlides) + `;
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dotsContainer');
    const slideCounter = document.getElementById('slideCounter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function initDots() {
      dotsContainer.innerHTML = '';
      for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = "w-2.5 h-2.5 rounded-full transition-all cursor-pointer " + (
          i === currentSlide ? 'bg-accent-400 w-8' : 'bg-slate-700 hover:bg-slate-500'
        );
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(n) {
      if (n < 1 || n > totalSlides) return;
      slides.forEach(s => s.classList.remove('active'));
      currentSlide = n;
      const active = document.querySelector('.slide[data-slide="' + currentSlide + '"]');
      if (active) active.classList.add('active');
      slideCounter.innerText = currentSlide + ' / ' + totalSlides;
      initDots();

      prevBtn.disabled = (currentSlide === 1);
      nextBtn.disabled = (currentSlide === totalSlides);
    }

    function nextSlide() {
      if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      if (currentSlide > 1) goToSlide(currentSlide - 1);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        goToSlide(1);
      } else if (e.key === 'End') {
        goToSlide(totalSlides);
      }
    });

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    }

    let recognition = null;
    let isVoiceListening = false;

    const voiceBtn = document.getElementById('voiceBtn');
    const micDot = document.getElementById('micDot');
    const voiceText = document.getElementById('voiceText');
    const voiceFeedback = document.getElementById('voiceFeedback');

    function notifyVoice(msg) {
      voiceFeedback.innerText = msg;
      voiceFeedback.classList.remove('hidden');
      setTimeout(() => voiceFeedback.classList.add('hidden'), 2200);
    }

    function handleExitPresentation() {
      notifyVoice('«Конец» ➔ Закрытие');
      stopVoice();

      document.body.innerHTML = ` + "`" + `
        <div style="height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:` + theme.DarkBg + `; color:#F3F4F6; font-family:'Inter',sans-serif; text-align:center; padding:20px;">
          <div style="width:64px; height:64px; border-radius:16px; background:` + theme.Accent500 + `22; border:1px solid ` + theme.Accent500 + `44; display:flex; align-items:center; justify-content:center; margin-bottom:20px; box-shadow:0 0 25px ` + theme.Accent500 + `33;">
            <svg style="width:32px; height:32px; color:` + theme.Accent400 + `;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
          </div>
          <h1 style="font-size:36px; font-weight:bold; margin-bottom:10px; color:` + theme.Accent400 + `; font-family:'Playfair Display',serif;">Доклад окончен</h1>
          <p style="font-size:18px; color:#9CA3AF; margin-bottom:28px;">Спасибо за внимание!</p>
          <button onclick="location.reload()" style="padding:12px 28px; background:` + theme.Accent500 + `; color:#000; border-radius:10px; font-weight:bold; border:none; cursor:pointer; font-size:15px; box-shadow:0 4px 15px rgba(0,0,0,0.4);">Открыть снова</button>
        </div>
      ` + "`" + `;
    }

    function initSpeechRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        voiceText.innerText = "Голос не поддерживается";
        return null;
      }

      const recognizer = new SpeechRecognition();
      recognizer.lang = 'ru-RU';
      recognizer.continuous = true;
      recognizer.interimResults = false;

      recognizer.onstart = () => {
        isVoiceListening = true;
        voiceBtn.classList.add('mic-active');
        micDot.className = "w-2.5 h-2.5 rounded-full bg-red-500 animate-ping";
        voiceText.innerText = "Голос активен: «Дальше» / «Конец»";
      };

      recognizer.onresult = (event) => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript.trim().toLowerCase();
        console.log("Распознано:", text);

        if (
          text.includes('конец') ||
          text.includes('закрой') ||
          text.includes('закрыть') ||
          text.includes('завершить') ||
          text.includes('выход')
        ) {
          handleExitPresentation();
          return;
        }

        if (
          text.includes('дальше') || text.includes('далее') ||
          text.includes('вперед') || text.includes('вперёд') ||
          text.includes('следующий') || text.includes('следующая')
        ) {
          notifyVoice('«Дальше» ➔ Следующий');
          nextSlide();
        }

        else if (
          text.includes('назад') || text.includes('предыдущий') ||
          text.includes('предыдущая') || text.includes('верни')
        ) {
          notifyVoice('«Назад» ➔ Предыдущий');
          prevSlide();
        }

        else if (text.includes('сначала') || text.includes('старт')) {
          notifyVoice('«Сначала» ➔ Слайд 1');
          goToSlide(1);
        }
      };

      recognizer.onerror = (e) => {
        console.warn("Speech error:", e.error);
        if (e.error === 'not-allowed') {
          alert('Доступ к микрофону заблокирован в браузере. Разрешите доступ в настройках браузера.');
          stopVoice();
        }
      };

      recognizer.onend = () => {
        if (isVoiceListening) {
          setTimeout(() => {
            if (isVoiceListening) {
              try { recognizer.start(); } catch(e) {}
            }
          }, 200);
        }
      };

      return recognizer;
    }

    function toggleVoiceControl() {
      if (isVoiceListening) {
        stopVoice();
        return;
      }

      if (!recognition) {
        recognition = initSpeechRecognition();
        if (!recognition) {
          alert('Ваш браузер не поддерживает распознавание речи. Рекомендуется Google Chrome, Яндекс.Браузер или Microsoft Edge.');
          return;
        }
      }

      startVoice();
    }

    function startVoice() {
      try {
        isVoiceListening = true;
        recognition.start();
      } catch(e) {
        console.log(e);
      }
    }

    function stopVoice() {
      isVoiceListening = false;
      if (recognition) {
        try { recognition.stop(); } catch(e) {}
      }
      voiceBtn.classList.remove('mic-active');
      micDot.className = "w-2.5 h-2.5 rounded-full bg-accent-400";
      voiceText.innerText = "🎤 Включить режим голоса";
    }

    initDots();
    goToSlide(1);
  </script>

  <script id="sanichpoint-data" type="application/json">` + string(projectJSON) + `</script>
</body>
</html>
`)

	return buf.String(), nil
}

func resolveImageSrc(src, assetsRelativePath string) string {
	if src == "" {
		return ""
	}
	if strings.HasPrefix(src, "http://") || strings.HasPrefix(src, "https://") || strings.HasPrefix(src, "data:") {
		return src
	}
	if strings.HasPrefix(src, "assets/") || strings.HasPrefix(src, "images/") {
		return src
	}
	if assetsRelativePath != "" {
		return strings.TrimSuffix(assetsRelativePath, "/") + "/" + src
	}
	return "assets/" + src
}

func renderCanvasElements(buf *bytes.Buffer, elements []SlideElement, t Theme, assetsRelativePath string) {
	for _, el := range elements {
		posStyle := fmt.Sprintf("position:absolute; left:%.2f%%; top:%.2f%%; width:%.2f%%; z-index:%d;", el.X, el.Y, el.W, el.ZIndex)

		buf.WriteString(fmt.Sprintf(`        <div style="%s">`+"\n", posStyle))

		switch el.Type {
		case ElemBadge:
			buf.WriteString(fmt.Sprintf(`          <div class="inline-block px-3.5 py-1.5 rounded bg-accent-500/10 border border-accent-500/30 text-accent-400 text-xs md:text-sm font-semibold tracking-wider uppercase">%s</div>`+"\n", html.EscapeString(el.Text)))

		case ElemTitle:
			fontSizeStyle := ""
			if el.FontSize > 0 {
				fontSizeStyle = fmt.Sprintf("font-size:%dpx;", el.FontSize)
			}
			alignClass := "text-left"
			if el.TextAlign == "center" {
				alignClass = "text-center"
			} else if el.TextAlign == "right" {
				alignClass = "text-right"
			}
			buf.WriteString(fmt.Sprintf(`          <h2 class="text-3xl md:text-5xl font-serif font-bold text-white leading-tight %s" style="%s">`+"\n", alignClass, fontSizeStyle))
			buf.WriteString(`            ` + html.EscapeString(el.Text) + "\n")
			if el.AccentText != "" {
				buf.WriteString(`            <br><span class="text-accent-400 font-normal italic">` + html.EscapeString(el.AccentText) + `</span>` + "\n")
			}
			buf.WriteString(`          </h2>` + "\n")

		case ElemText:
			fontSizeStyle := ""
			if el.FontSize > 0 {
				fontSizeStyle = fmt.Sprintf("font-size:%dpx;", el.FontSize)
			}
			alignClass := "text-left"
			if el.TextAlign == "center" {
				alignClass = "text-center"
			} else if el.TextAlign == "right" {
				alignClass = "text-right"
			}
			buf.WriteString(fmt.Sprintf(`          <p class="text-base md:text-lg text-slate-300 font-light leading-relaxed %s" style="%s">%s</p>`+"\n", alignClass, fontSizeStyle, html.EscapeString(el.Text)))

		case ElemImage:
			resolved := resolveImageSrc(el.ImageSrc, assetsRelativePath)
			onerrorAttr := ""
			if el.FallbackURL != "" {
				onerrorAttr = fmt.Sprintf(` onerror="this.src='%s'"`, html.EscapeString(el.FallbackURL))
			}
			captionHtml := ""
			if el.ImageCaption != "" {
				captionHtml = fmt.Sprintf(`<div class="text-center pt-2 text-xs md:text-sm text-slate-400">%s</div>`, html.EscapeString(el.ImageCaption))
			}
			buf.WriteString(fmt.Sprintf(`
          <div class="w-full rounded-2xl bg-slate-900 border border-slate-800 p-3 shadow-2xl">
            <div class="w-full h-72 md:h-80 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
              <img src="%s" alt="" class="w-full h-full object-contain"%s>
            </div>
            %s
          </div>
`, html.EscapeString(resolved), onerrorAttr, captionHtml))

		case ElemPanel:
			buf.WriteString(`          <div class="p-5 rounded-2xl panel-box space-y-3">` + "\n")
			if el.Title != "" || el.Icon != "" {
				buf.WriteString(fmt.Sprintf(`            <div class="text-accent-400 font-bold text-lg flex items-center gap-2"><span>%s</span> <span>%s</span></div>`+"\n", html.EscapeString(el.Icon), html.EscapeString(el.Title)))
			}
			if el.Description != "" {
				buf.WriteString(fmt.Sprintf(`            <p class="text-slate-300 text-sm md:text-base leading-relaxed">%s</p>`+"\n", html.EscapeString(el.Description)))
			}
			if len(el.Bullets) > 0 {
				buf.WriteString(`            <ul class="space-y-2 text-slate-300 text-sm md:text-base pt-1">` + "\n")
				for _, b := range el.Bullets {
					icon := b.Icon
					if icon == "" {
						icon = "•"
					}
					buf.WriteString(fmt.Sprintf(`              <li class="flex items-start gap-2.5"><span class="text-accent-400 font-bold">%s</span><span><b>%s</b> %s</span></li>`+"\n", html.EscapeString(icon), html.EscapeString(b.Title), html.EscapeString(b.Text)))
				}
				buf.WriteString(`            </ul>` + "\n")
			}
			buf.WriteString(`          </div>` + "\n")

		case ElemBullets:
			buf.WriteString(`          <div class="p-4 md:p-5 rounded-2xl panel-box space-y-2.5">` + "\n")
			if el.Title != "" {
				buf.WriteString(fmt.Sprintf(`            <p class="font-semibold text-white text-base md:text-lg">%s</p>`+"\n", html.EscapeString(el.Title)))
			}
			buf.WriteString(`            <ul class="space-y-2 text-slate-300 text-base">` + "\n")
			for _, b := range el.Bullets {
				icon := b.Icon
				if icon == "" {
					icon = "•"
				}
				buf.WriteString(fmt.Sprintf(`              <li class="flex items-start gap-2.5"><span class="text-accent-400 font-bold">%s</span><span><b>%s</b> %s</span></li>`+"\n", html.EscapeString(icon), html.EscapeString(b.Title), html.EscapeString(b.Text)))
			}
			buf.WriteString(`            </ul>` + "\n")
			buf.WriteString(`          </div>` + "\n")

		case ElemQuote:
			buf.WriteString(`          <div class="p-6 md:p-8 rounded-3xl panel-box relative shadow-2xl space-y-4 border border-accent-500/30 text-center">` + "\n")
			buf.WriteString(`            <div class="text-5xl text-accent-400/40 font-serif leading-none select-none">“</div>` + "\n")
			buf.WriteString(fmt.Sprintf(`            <blockquote class="text-xl md:text-3xl font-serif italic text-white leading-relaxed">«%s»</blockquote>`+"\n", html.EscapeString(el.Text)))
			buf.WriteString(`            <div class="pt-3 border-t border-slate-800">` + "\n")
			buf.WriteString(fmt.Sprintf(`              <div class="text-lg font-bold text-accent-400 font-serif">%s</div>`+"\n", html.EscapeString(el.QuoteAuthor)))
			if el.QuoteRole != "" {
				buf.WriteString(fmt.Sprintf(`              <div class="text-xs text-slate-400 mt-0.5">%s</div>`+"\n", html.EscapeString(el.QuoteRole)))
			}
			buf.WriteString(`            </div>` + "\n")
			buf.WriteString(`          </div>` + "\n")
		}

		buf.WriteString(`        </div>` + "\n")
	}
}

