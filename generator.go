package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html"
	"strings"
)

func GenerateHTML(p *Presentation, assetsRelativePath string) (string, error) {
	return GenerateHTMLWithOptions(p, assetsRelativePath, GeneratorOptions{
		EnableVoiceControl: true,
		IncludeUI:          true,
	})
}

func GenerateHTMLWithOptions(p *Presentation, assetsRelativePath string, opts GeneratorOptions) (string, error) {
	if !opts.IncludeUI {
		opts.EnableVoiceControl = false
	}

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
      align-items: center;
      justify-content: center;
      pointer-events: none;
      overflow: hidden;
    }

    .slide.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
      z-index: 10;
    }

    .slide-stage {
      position: relative;
      width: 100vw;
      height: 100vh;
      max-width: calc(100vh * 16 / 9);
      max-height: calc(100vw * 9 / 16);
      aspect-ratio: 16 / 9;
      margin: auto;
      overflow: hidden;
      container-type: inline-size;
      isolation: isolate;
    }

    #presentationNav.nav-idle {
      opacity: 0.15;
    }
    #presentationNav:hover {
      opacity: 1 !important;
    }
`)

	if opts.EnableVoiceControl {
		buf.WriteString(`
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
`)
	}

	buf.WriteString(`
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
`)

	buf.WriteString(`
<body class="h-full w-full select-none bg-darkbg overflow-hidden m-0 p-0">
  <main class="relative w-full h-full flex items-center justify-center overflow-hidden m-0 p-0">
`)

	for i, slide := range p.Slides {
		slideNum := i + 1
		activeClass := ""
		if slideNum == 1 {
			activeClass = " active"
		}

		buf.WriteString(fmt.Sprintf(`    <section class="slide%s" data-slide="%d">`+"\n", activeClass, slideNum))
		buf.WriteString(`      <div class="slide-stage">` + "\n")

		renderCanvasElements(&buf, slide.Elements, theme, assetsRelativePath)

		buf.WriteString(`      </div>` + "\n")
		buf.WriteString("    </section>\n\n")
	}

	buf.WriteString(`  </main>` + "\n")

	if opts.IncludeUI {
		if opts.EnableVoiceControl {
			buf.WriteString(`
  <div id="voiceFeedback" class="hidden fixed top-5 left-1/2 -translate-x-1/2 z-50 text-xs md:text-sm px-4 py-2 rounded-full bg-accent-400 text-black font-bold font-mono shadow-2xl transition">
    Слайд переключен
  </div>
`)
		}

		buf.WriteString(`
  <div id="presentationNav" class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-[#0B0D12]/90 border border-slate-800/80 backdrop-blur-md shadow-2xl flex items-center space-x-3 transition-opacity duration-300 hover:opacity-100 opacity-80 select-none">

    <button id="prevBtn" onclick="prevSlide()"
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Назад</span>
    </button>

    <div class="flex items-center space-x-2">
      <div id="dotsContainer" class="flex items-center space-x-1.5"></div>
      <span id="slideCounter" class="text-xs font-mono font-bold text-accent-400 ml-1">
        1 / ` + fmt.Sprintf("%d", totalSlides) + `
      </span>
    </div>
`)

		if opts.EnableVoiceControl {
			buf.WriteString(`
    <span class="text-[11px] text-slate-500 hidden sm:inline border-l border-slate-800 pl-2.5">
      Голос: <span class="text-accent-400 font-medium">«Дальше»</span>, <span class="text-slate-400 font-medium">«Назад»</span>, <span class="text-red-400 font-medium">«Конец»</span>
    </span>

    <button id="voiceBtn" onclick="toggleVoiceControl()"
            title="Голосовое управление: «Дальше», «Назад», «Конец»"
            class="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-accent-500/50 bg-accent-500/10 hover:bg-accent-500/20 text-xs font-semibold text-accent-300 transition cursor-pointer">
      <span id="micDot" class="w-2 h-2 rounded-full bg-accent-400"></span>
      <span id="voiceText">🎤 Голос</span>
    </button>
`)
		}

		buf.WriteString(`
    <button onclick="toggleFullscreen()" class="p-1.5 text-slate-400 hover:text-white transition cursor-pointer" title="Полный экран">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    </button>

    <button id="nextBtn" onclick="nextSlide()"
            class="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-accent-500 hover:bg-accent-400 text-black text-xs font-bold transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-md">
      <span>Дальше</span>
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

  </div>
`)
	}

	buf.WriteString(`
  <script>
    let currentSlide = 1;
    const totalSlides = ` + fmt.Sprintf("%d", totalSlides) + `;
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dotsContainer');
    const slideCounter = document.getElementById('slideCounter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function initDots() {
      if (!dotsContainer) return;
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
      if (slideCounter) slideCounter.innerText = currentSlide + ' / ' + totalSlides;
      initDots();

      if (prevBtn) prevBtn.disabled = (currentSlide === 1);
      if (nextBtn) nextBtn.disabled = (currentSlide === totalSlides);
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

    document.addEventListener('click', (e) => {
      if (!e.target.closest('a, button, input, textarea, select')) {
        nextSlide();
      }
    });

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    }

    let idleTimer = null;
    const navBar = document.getElementById('presentationNav');
    function resetIdleTimer() {
      if (!navBar) return;
      navBar.classList.remove('nav-idle');
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        navBar.classList.add('nav-idle');
      }, 3500);
    }
    document.addEventListener('mousemove', resetIdleTimer);
    resetIdleTimer();
`)

	if opts.EnableVoiceControl {
		buf.WriteString(`
    let recognition = null;
    let isVoiceListening = false;

    const voiceBtn = document.getElementById('voiceBtn');
    const micDot = document.getElementById('micDot');
    const voiceText = document.getElementById('voiceText');
    const voiceFeedback = document.getElementById('voiceFeedback');

    function notifyVoice(msg) {
      if (!voiceFeedback) return;
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
        if (voiceText) voiceText.innerText = "Голос не поддерживается";
        return null;
      }

      const recognizer = new SpeechRecognition();
      recognizer.lang = 'ru-RU';
      recognizer.continuous = true;
      recognizer.interimResults = false;

      recognizer.onstart = () => {
        isVoiceListening = true;
        if (voiceBtn) voiceBtn.classList.add('mic-active');
        if (micDot) micDot.className = "w-2.5 h-2.5 rounded-full bg-red-500 animate-ping";
        if (voiceText) voiceText.innerText = "Голос активен: «Дальше» / «Конец»";
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
      if (voiceBtn) voiceBtn.classList.remove('mic-active');
      if (micDot) micDot.className = "w-2.5 h-2.5 rounded-full bg-accent-400";
      if (voiceText) voiceText.innerText = "🎤 Включить режим голоса";
    }
`)
	}

	buf.WriteString(`
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
		posStyle := fmt.Sprintf("position:absolute; left:%.2f%%; top:%.2f%%; width:%.2f%%; z-index:%d; box-sizing:border-box;", el.X, el.Y, el.W, el.ZIndex)

		buf.WriteString(fmt.Sprintf(`        <div style="%s">`+"\n", posStyle))

		switch el.Type {
		case ElemBadge:
			buf.WriteString(fmt.Sprintf(`          <div class="inline-block px-[1.2cqw] py-[0.4cqw] rounded border font-semibold tracking-wider uppercase leading-normal" style="background:%s18; border-color:%s44; color:%s; font-size:max(10px, 1.15cqw);">%s</div>`+"\n", t.Accent400, t.Accent400, t.Accent400, html.EscapeString(el.Text)))

		case ElemTitle:
			fontSize := el.FontSize
			if fontSize <= 0 {
				fontSize = 32
			}
			align := el.TextAlign
			if align == "" {
				align = "left"
			}
			buf.WriteString(fmt.Sprintf(`          <div class="font-serif font-bold text-white leading-tight" style="font-size:max(16px, calc(%d * 0.085cqw)); text-align:%s;">`+"\n", fontSize, align))
			buf.WriteString(`            ` + html.EscapeString(el.Text) + "\n")
			if el.AccentText != "" {
				buf.WriteString(fmt.Sprintf(`            <br><span class="font-normal italic" style="color:%s;">%s</span>`+"\n", t.Accent400, html.EscapeString(el.AccentText)))
			}
			buf.WriteString(`          </div>` + "\n")

		case ElemText:
			fontSize := el.FontSize
			if fontSize <= 0 {
				fontSize = 15
			}
			align := el.TextAlign
			if align == "" {
				align = "left"
			}
			buf.WriteString(fmt.Sprintf(`          <div class="text-slate-300 font-light leading-relaxed" style="font-size:max(11px, calc(%d * 0.085cqw)); text-align:%s;">%s</div>`+"\n", fontSize, align, html.EscapeString(el.Text)))

		case ElemImage:
			resolved := resolveImageSrc(el.ImageSrc, assetsRelativePath)
			onerrorAttr := ""
			if el.FallbackURL != "" {
				onerrorAttr = fmt.Sprintf(` onerror="this.src='%s'"`, html.EscapeString(el.FallbackURL))
			}
			captionHtml := ""
			if el.ImageCaption != "" {
				captionHtml = fmt.Sprintf(`<div class="text-center pt-[0.8cqw] text-[max(10px,1.1cqw)] text-slate-400 font-medium">%s</div>`, html.EscapeString(el.ImageCaption))
			}
			buf.WriteString(fmt.Sprintf(`
          <div class="w-full rounded-2xl bg-slate-900 border border-slate-800 p-[1.2cqw] shadow-2xl overflow-hidden box-border">
            <div class="w-full aspect-[4/3] max-h-[46cqw] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
              <img src="%s" alt="" class="w-full h-full object-contain"%s>
            </div>
            %s
          </div>
`, html.EscapeString(resolved), onerrorAttr, captionHtml))

		case ElemPanel:
			buf.WriteString(fmt.Sprintf(`          <div class="p-[1.6cqw] rounded-2xl panel-box space-y-[0.8cqw]" style="background:%s; border:1px solid %s; font-size:max(11px, 1.2cqw);">`+"\n", t.PanelBg, t.BorderColor))
			if el.Title != "" || el.Icon != "" {
				icon := el.Icon
				if icon == "" {
					icon = "✦"
				}
				buf.WriteString(fmt.Sprintf(`            <div class="font-bold flex items-center gap-1.5" style="color:%s; font-size:max(12px, 1.45cqw);"><span class="text-[max(12px,1.5cqw)]">%s</span> <span>%s</span></div>`+"\n", t.Accent400, html.EscapeString(icon), html.EscapeString(el.Title)))
			}
			if el.Description != "" {
				buf.WriteString(fmt.Sprintf(`            <p class="text-slate-300 leading-relaxed text-[max(11px,1.2cqw)]">%s</p>`+"\n", html.EscapeString(el.Description)))
			}
			if len(el.Bullets) > 0 {
				buf.WriteString(`            <ul class="space-y-[0.6cqw] text-slate-300 text-[max(11px,1.2cqw)] pt-0.5">` + "\n")
				for _, b := range el.Bullets {
					icon := b.Icon
					if icon == "" {
						icon = "•"
					}
					titlePart := ""
					if b.Title != "" {
						titlePart = fmt.Sprintf("<b>%s</b> ", html.EscapeString(b.Title))
					}
					buf.WriteString(fmt.Sprintf(`              <li class="flex items-start gap-1.5"><span style="color:%s; font-bold;">%s</span><span>%s%s</span></li>`+"\n", t.Accent400, html.EscapeString(icon), titlePart, html.EscapeString(b.Text)))
				}
				buf.WriteString(`            </ul>` + "\n")
			}
			buf.WriteString(`          </div>` + "\n")

		case ElemBullets:
			buf.WriteString(fmt.Sprintf(`          <div class="p-[1.6cqw] rounded-2xl panel-box space-y-[0.8cqw]" style="background:%s; border:1px solid %s; font-size:max(11px, 1.2cqw);">`+"\n", t.PanelBg, t.BorderColor))
			if el.Title != "" {
				buf.WriteString(fmt.Sprintf(`            <div class="font-semibold text-white text-[max(12px,1.45cqw)]">%s</div>`+"\n", html.EscapeString(el.Title)))
			}
			buf.WriteString(`            <ul class="space-y-[0.6cqw] text-slate-300 text-[max(11px,1.2cqw)]">` + "\n")
			for _, b := range el.Bullets {
				icon := b.Icon
				if icon == "" {
					icon = "•"
				}
				titlePart := ""
				if b.Title != "" {
					titlePart = fmt.Sprintf("<b>%s</b> ", html.EscapeString(b.Title))
				}
				buf.WriteString(fmt.Sprintf(`              <li class="flex items-start gap-1.5"><span style="color:%s; font-bold;">%s</span><span>%s%s</span></li>`+"\n", t.Accent400, html.EscapeString(icon), titlePart, html.EscapeString(b.Text)))
			}
			buf.WriteString(`            </ul>` + "\n")
			buf.WriteString(`          </div>` + "\n")

		case ElemQuote:
			buf.WriteString(fmt.Sprintf(`          <div class="p-[2cqw] rounded-3xl panel-box space-y-[1cqw] text-center" style="background:%s; border:1px solid %s;">`+"\n", t.PanelBg, t.BorderColor))
			buf.WriteString(fmt.Sprintf(`            <div class="text-[max(24px,3.8cqw)] leading-none select-none font-serif opacity-40" style="color:%s;">“</div>`+"\n", t.Accent400))
			buf.WriteString(fmt.Sprintf(`            <blockquote class="font-serif italic text-white leading-relaxed text-[max(13px,1.7cqw)]">«%s»</blockquote>`+"\n", html.EscapeString(el.Text)))
			buf.WriteString(`            <div class="pt-[0.8cqw] border-t border-slate-800">` + "\n")
			buf.WriteString(fmt.Sprintf(`              <div class="font-bold font-serif text-[max(11px,1.3cqw)]" style="color:%s;">%s</div>`+"\n", t.Accent400, html.EscapeString(el.QuoteAuthor)))
			if el.QuoteRole != "" {
				buf.WriteString(fmt.Sprintf(`              <div class="text-slate-400 mt-0.5 text-[max(10px,1.1cqw)]">%s</div>`+"\n", html.EscapeString(el.QuoteRole)))
			}
			buf.WriteString(`            </div>` + "\n")
			buf.WriteString(`          </div>` + "\n")
		}

		buf.WriteString(`        </div>` + "\n")
	}
}

