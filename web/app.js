
let currentProject = {
  title: "Иосип Броз Тито (1892–1980)",
  subtitle: "Биография, партизанская война и политическая карьера лидера СФРЮ",
  monogram: "",
  themeId: "gorkygold",
  slides: []
};

let activeSlideIndex = 0;
let selectedElementId = null;
let availableThemes = [];
let workspaceInfo = { workspaceDir: "", defaultExport: "" };
let lastExportedFilePath = "";

let isDragging = false;
let isResizing = false;
let resizeHandleType = "";
let dragStartX = 0;
let dragStartY = 0;
let elementStartLeft = 0;
let elementStartTop = 0;
let elementStartWidth = 0;
let elementStartHeight = 0;

document.addEventListener("DOMContentLoaded", async () => {
  initCustomTitlebar();
  await fetchInfo();
  await fetchThemes();
  await loadSampleProject();

  setupGlobalShortcuts();
  setupCanvasEvents();
});

function initCustomTitlebar() {
  const tb = document.getElementById("customTitlebar");
  if (!tb) return;

  tb.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    if (e.target.closest("button, input, select, a")) return;

    if (e.detail === 2) {
      handleWinMaximize();
    } else {
      if (window.nativeStartDrag) {
        window.nativeStartDrag();
      }
    }
  });

  window.addEventListener("resize", updateMaximizeButtonState);
  setTimeout(updateMaximizeButtonState, 250);
}

function handleWinMinimize() {
  if (window.nativeMinimize) {
    window.nativeMinimize();
  }
}

function handleWinMaximize() {
  if (window.nativeMaximize) {
    window.nativeMaximize().then(() => {
      setTimeout(updateMaximizeButtonState, 100);
    });
  }
}

function handleWinClose() {
  if (window.nativeClose) {
    window.nativeClose();
  } else {
    window.close();
  }
}

async function updateMaximizeButtonState() {
  if (window.nativeIsMaximized) {
    try {
      const isMax = await window.nativeIsMaximized();
      const icon = document.getElementById("winMaxIcon");
      if (icon) {
        if (isMax) {
          icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M2.5 2.5V1.5A0.5 0.5 0 013 1h5a0.5 0.5 0 010.5 0.5v5a0.5 0.5 0 01-0.5 0.5H7M1.5 3h5a0.5 0.5 0 010.5 0.5v5a0.5 0.5 0 01-0.5 0.5h-5A0.5 0.5 0 011 8.5v-5A0.5 0.5 0 011.5 3z"/>`;
        } else {
          icon.innerHTML = `<rect x="1" y="1" width="8" height="8" rx="0.5" stroke-width="1.2"/>`;
        }
      }
    } catch (e) {}
  }
}


let dialogResolveCallback = null;

function showCustomAlert(options) {
  return new Promise((resolve) => {
    const opts = typeof options === 'string' ? { message: options } : (options || {});
    const modal = document.getElementById("customDialogModal");
    const card = document.getElementById("customDialogCard");
    const titleEl = document.getElementById("customDialogTitle");
    const msgEl = document.getElementById("customDialogMessage");
    const iconContainer = document.getElementById("customDialogIconContainer");
    const btnContainer = document.getElementById("customDialogButtons");

    if (!modal || !card) {
      console.log("Alert:", opts.message);
      resolve(true);
      return;
    }

    const type = opts.type || "info";
    titleEl.innerText = opts.title || (type === "danger" ? "Ошибка" : type === "warning" ? "Внимание" : type === "success" ? "Успешно" : "Сообщение");
    msgEl.innerText = opts.message || "";

    let iconSvg = "";
    let iconBg = "";
    let btnClass = "";
    card.className = "w-full max-w-md rounded-2xl panel-glass p-6 border shadow-2xl space-y-4";

    if (type === "danger") {
      card.classList.add("border-red-500/40", "shadow-red-950/40");
      iconBg = "bg-red-500/20 text-red-400 border border-red-500/30";
      iconSvg = `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
      btnClass = "bg-red-600 hover:bg-red-500 text-white font-bold";
    } else if (type === "warning") {
      card.classList.add("border-amber-500/40", "shadow-amber-950/40");
      iconBg = "bg-amber-500/20 text-amber-400 border border-amber-500/30";
      iconSvg = `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      btnClass = "bg-amber-500 hover:bg-amber-400 text-black font-bold";
    } else if (type === "success") {
      card.classList.add("border-purple-500/40", "shadow-purple-950/40");
      iconBg = "bg-gradient-to-br from-purple-500/30 to-indigo-500/30 text-purple-300 border border-purple-400/40";
      iconSvg = `<svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
      btnClass = "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold";
    } else {
      card.classList.add("border-slate-700/60", "shadow-black/50");
      iconBg = "bg-slate-800 text-slate-300 border border-slate-700";
      iconSvg = `<svg class="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      btnClass = "bg-slate-800 hover:bg-slate-700 text-white font-bold";
    }

    iconContainer.className = `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`;
    iconContainer.innerHTML = iconSvg;

    btnContainer.innerHTML = `
      <button id="customDialogConfirmBtn" class="px-5 py-2 rounded-lg text-xs transition cursor-pointer shadow-md ${btnClass}">
        ${escapeHTML(opts.confirmText || "Понятно")}
      </button>
    `;

    dialogResolveCallback = resolve;
    modal.classList.remove("hidden");

    const confirmBtn = document.getElementById("customDialogConfirmBtn");
    if (confirmBtn) {
      confirmBtn.focus();
      confirmBtn.onclick = () => closeCustomDialog(true);
    }
  });
}

function showCustomConfirm(options) {
  return new Promise((resolve) => {
    const opts = typeof options === 'string' ? { message: options } : (options || {});
    const modal = document.getElementById("customDialogModal");
    const card = document.getElementById("customDialogCard");
    const titleEl = document.getElementById("customDialogTitle");
    const msgEl = document.getElementById("customDialogMessage");
    const iconContainer = document.getElementById("customDialogIconContainer");
    const btnContainer = document.getElementById("customDialogButtons");

    if (!modal || !card) {
      resolve(false);
      return;
    }

    const type = opts.type || "warning";
    titleEl.innerText = opts.title || (type === "danger" ? "Подтвердите удаление" : "Подтверждение");
    msgEl.innerText = opts.message || "Вы уверены?";

    let iconSvg = "";
    let iconBg = "";
    let btnClass = "";
    card.className = "w-full max-w-md rounded-2xl panel-glass p-6 border shadow-2xl space-y-4";

    if (type === "danger") {
      card.classList.add("border-red-500/40", "shadow-red-950/40");
      iconBg = "bg-red-500/20 text-red-400 border border-red-500/30";
      iconSvg = `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`;
      btnClass = "bg-red-600 hover:bg-red-500 text-white font-bold";
    } else {
      card.classList.add("border-amber-500/40", "shadow-amber-950/40");
      iconBg = "bg-amber-500/20 text-amber-400 border border-amber-500/30";
      iconSvg = `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      btnClass = "bg-amber-500 hover:bg-amber-400 text-black font-bold";
    }

    iconContainer.className = `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`;
    iconContainer.innerHTML = iconSvg;

    btnContainer.innerHTML = `
      <button id="customDialogCancelBtn" class="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">
        ${escapeHTML(opts.cancelText || "Отмена")}
      </button>
      <button id="customDialogConfirmBtn" class="px-5 py-2 rounded-lg text-xs transition cursor-pointer shadow-lg ${btnClass}">
        ${escapeHTML(opts.confirmText || "Подтвердить")}
      </button>
    `;

    dialogResolveCallback = resolve;
    modal.classList.remove("hidden");

    const cancelBtn = document.getElementById("customDialogCancelBtn");
    const confirmBtn = document.getElementById("customDialogConfirmBtn");

    if (cancelBtn) {
      cancelBtn.onclick = () => closeCustomDialog(false);
    }
    if (confirmBtn) {
      confirmBtn.focus();
      confirmBtn.onclick = () => closeCustomDialog(true);
    }
  });
}

function closeCustomDialog(result) {
  const modal = document.getElementById("customDialogModal");
  if (modal) modal.classList.add("hidden");
  if (dialogResolveCallback) {
    const cb = dialogResolveCallback;
    dialogResolveCallback = null;
    cb(result);
  }
}

function showCustomToast(options) {
  const opts = typeof options === 'string' ? { message: options } : (options || {});
  const container = document.getElementById("customToastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  const type = opts.type || "info";

  let borderBg = "bg-slate-900/95 border-slate-700/70 text-slate-200";
  let iconHtml = `<svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

  if (type === "success") {
    borderBg = "bg-slate-900/95 border-purple-500/50 text-purple-200 shadow-purple-950/40";
    iconHtml = `<svg class="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
  } else if (type === "danger" || type === "error") {
    borderBg = "bg-slate-900/95 border-red-500/50 text-red-200 shadow-red-950/40";
    iconHtml = `<svg class="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  } else if (type === "warning") {
    borderBg = "bg-slate-900/95 border-amber-500/50 text-amber-200 shadow-amber-950/40";
    iconHtml = `<svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }

  toast.className = `p-3 rounded-xl border shadow-xl flex items-start space-x-2.5 text-xs pointer-events-auto transform transition-all duration-300 translate-y-2 opacity-0 ${borderBg}`;
  toast.innerHTML = `
    ${iconHtml}
    <div class="flex-1 min-w-0">
      ${opts.title ? `<div class="font-bold text-white text-xs">${escapeHTML(opts.title)}</div>` : ''}
      <div class="text-[11px] text-slate-300 leading-tight mt-0.5">${escapeHTML(opts.message || '')}</div>
    </div>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-1");
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  }, opts.duration || 3200);
}

window.alert = function(msg) {
  return showCustomAlert({ message: String(msg), type: "info" });
};

async function fetchInfo() {
  try {
    const res = await fetch("/api/info");
    if (res.ok) {
      workspaceInfo = await res.json();
      const outDirInput = document.getElementById("exportOutputDir");
      if (outDirInput) {
        outDirInput.value = workspaceInfo.workspaceDir || "";
      }
    }
  } catch (e) {
    console.error("Info error:", e);
  }
}

async function fetchThemes() {
  try {
    const res = await fetch("/api/themes");
    if (res.ok) {
      availableThemes = await res.json();
      renderThemeSelector();
    }
  } catch (e) {
    console.error("Themes error:", e);
  }
}

async function loadSampleProject() {
  try {
    const res = await fetch("/api/sample");
    if (res.ok) {
      currentProject = await res.json();
      activeSlideIndex = 0;
      selectedElementId = null;
      updateHeaderUI();
      renderDeckList();
      renderCanvas();
      renderInspector();
    }
  } catch (e) {
    console.error("Sample error:", e);
  }
}

function updatePresTitle(val) {
  currentProject.title = val;
}

function updateHeaderUI() {
  const monogramEl = document.getElementById("headerMonogram");
  if (monogramEl) {
    monogramEl.innerText = currentProject.monogram || "SP";
  }
  const titleInput = document.getElementById("presTitleInput");
  if (titleInput && currentProject.title) {
    titleInput.value = currentProject.title;
  }
  renderThemeSelector();
}

function renderThemeSelector() {
  const container = document.getElementById("themeSelector");
  if (!container) return;
  container.innerHTML = "";

  availableThemes.forEach(theme => {
    const pill = document.createElement("button");
    const isSelected = theme.id === currentProject.themeId;
    pill.className = `theme-pill w-5 h-5 rounded-full flex items-center justify-center transition-all ${
      isSelected ? "active ring-2 ring-white scale-125 shadow-md" : "opacity-75 hover:opacity-100"
    }`;
    pill.style.background = `linear-gradient(135deg, ${theme.accent400}, ${theme.accent600})`;
    pill.title = `${theme.name} (${theme.accent400})`;
    pill.onclick = () => selectTheme(theme.id);
    container.appendChild(pill);
  });
}

function selectTheme(themeId) {
  currentProject.themeId = themeId;
  updateHeaderUI();
  renderCanvas();
}

function getCurrentTheme() {
  return availableThemes.find(t => t.id === currentProject.themeId) || {
    darkBg: "#0B0D12",
    accent400: "#D4A359",
    panelBg: "rgba(18, 22, 32, 0.85)",
    borderColor: "rgba(212, 163, 89, 0.25)"
  };
}

function getSlideThumbnailHTML(slide, theme, thumbWidth = 158) {
  const baseWidth = 960;
  const baseHeight = 540;
  const scale = thumbWidth / baseWidth;

  let elementsHTML = "";
  (slide.elements || []).forEach(el => {
    const contentHTML = getElementCanvasHTML(el, theme)
      .replace(/contenteditable="true"/g, '')
      .replace(/onblur="[^"]*"/g, '')
      .replace(/pointer-events-auto/g, '');

    elementsHTML += `
      <div style="position:absolute; left:${el.x}%; top:${el.y}%; width:${el.w}%; z-index:${el.zIndex || 1}; pointer-events:none;">
        ${contentHTML}
      </div>
    `;
  });

  return `
    <div style="width:${baseWidth}px; height:${baseHeight}px; position:absolute; top:0; left:0; transform-origin:0 0; transform:scale(${scale}); pointer-events:none; user-select:none; background-color:${theme.darkBg};">
      ${elementsHTML}
    </div>
  `;
}

function renderDeckList() {
  const container = document.getElementById("deckThumbsList");
  if (!container) return;
  container.innerHTML = "";

  const theme = getCurrentTheme();
  const availWidth = container.clientWidth > 40 ? (container.clientWidth - 28) : 158;
  const thumbWidth = Math.max(availWidth, 120);

  currentProject.slides.forEach((slide, idx) => {
    const isSelected = idx === activeSlideIndex;

    const row = document.createElement("div");
    row.className = "flex items-start space-x-2";

    const num = document.createElement("div");
    num.className = "text-[11px] font-mono font-bold text-slate-500 pt-1 w-3.5 text-right shrink-0 select-none";
    num.innerText = (idx + 1);

    const thumb = document.createElement("div");
    thumb.className = `deck-thumb flex-1 ${isSelected ? "active ring-2 ring-blue-500" : ""}`;
    thumb.style.backgroundColor = theme.darkBg;
    thumb.onclick = () => selectSlide(idx);
    thumb.innerHTML = getSlideThumbnailHTML(slide, theme, thumbWidth);

    row.appendChild(num);
    row.appendChild(thumb);
    container.appendChild(row);
  });
}

function selectSlide(index) {
  activeSlideIndex = index;
  selectedElementId = null;
  renderDeckList();
  renderCanvas();
  renderInspector();
}

function addNewSlide() {
  const newSlide = {
    id: currentProject.slides.length + 1,
    title: "Новый слайд " + (currentProject.slides.length + 1),
    elements: [
      {
        id: generateId(),
        type: "badge",
        x: 5,
        y: 8,
        w: 30,
        zIndex: 1,
        text: "Новый раздел"
      },
      {
        id: generateId(),
        type: "title",
        x: 5,
        y: 18,
        w: 55,
        zIndex: 2,
        text: "Заголовок темы",
        accentText: "Акцент"
      },
      {
        id: generateId(),
        type: "panel",
        x: 5,
        y: 42,
        w: 55,
        zIndex: 3,
        icon: "✦",
        title: "Ключевой факт",
        description: "Нажмите и редактируйте текст прямо на слайде или в панели свойств.",
        bullets: []
      },
      {
        id: generateId(),
        type: "image",
        x: 64,
        y: 18,
        w: 32,
        zIndex: 4,
        imageSrc: "",
        imageCaption: "Подпись к фотографии"
      }
    ]
  };
  currentProject.slides.push(newSlide);
  activeSlideIndex = currentProject.slides.length - 1;
  selectedElementId = null;
  renderDeckList();
  renderCanvas();
  renderInspector();
}

function duplicateCurrentSlide() {
  const current = currentProject.slides[activeSlideIndex];
  if (!current) return;
  const copy = JSON.parse(JSON.stringify(current));
  copy.id = currentProject.slides.length + 1;
  copy.title += " (копия)";
  (copy.elements || []).forEach(el => el.id = generateId());

  currentProject.slides.splice(activeSlideIndex + 1, 0, copy);
  activeSlideIndex++;
  selectedElementId = null;
  renderDeckList();
  renderCanvas();
  renderInspector();
}

async function deleteCurrentSlide() {
  if (currentProject.slides.length <= 1) {
    showCustomAlert({
      type: "warning",
      title: "Невозможно удалить",
      message: "В презентации должен оставаться как минимум один слайд."
    });
    return;
  }
  const confirmed = await showCustomConfirm({
    type: "danger",
    title: "Удалить слайд?",
    message: `Вы действительно хотите удалить слайд #${activeSlideIndex + 1}?\nВсе элементы на этом слайде будут удалены.`,
    confirmText: "Удалить слайд",
    cancelText: "Отмена"
  });
  if (!confirmed) return;

  currentProject.slides.splice(activeSlideIndex, 1);
  if (activeSlideIndex >= currentProject.slides.length) {
    activeSlideIndex = currentProject.slides.length - 1;
  }
  selectedElementId = null;
  renderDeckList();
  renderCanvas();
  renderInspector();
  showCustomToast({ title: "Слайд удален", message: `Слайд успешно удален`, type: "info" });
}

function generateId() {
  return "el_" + Math.random().toString(36).substr(2, 9);
}

function renderCanvas() {
  const canvas = document.getElementById("slideCanvas");
  if (!canvas) return;
  canvas.innerHTML = "";

  const theme = getCurrentTheme();
  canvas.style.backgroundColor = theme.darkBg;

  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide) return;

  (currentSlide.elements || []).forEach(el => {
    const isSelected = el.id === selectedElementId;
    const elDiv = document.createElement("div");
    elDiv.className = `canvas-element ${isSelected ? "selected" : ""}`;
    elDiv.id = el.id;
    elDiv.style.left = `${el.x}%`;
    elDiv.style.top = `${el.y}%`;
    elDiv.style.width = `${el.w}%`;
    elDiv.style.zIndex = el.zIndex || 1;

    elDiv.innerHTML = getElementCanvasHTML(el, theme);

    elDiv.innerHTML += `
      <div class="resize-handle handle-nw" data-handle="nw"></div>
      <div class="resize-handle handle-ne" data-handle="ne"></div>
      <div class="resize-handle handle-se" data-handle="se"></div>
      <div class="resize-handle handle-sw" data-handle="sw"></div>
      <div class="resize-handle handle-n"  data-handle="n"></div>
      <div class="resize-handle handle-s"  data-handle="s"></div>
      <div class="resize-handle handle-e"  data-handle="e"></div>
      <div class="resize-handle handle-w"  data-handle="w"></div>
    `;

    elDiv.addEventListener("mousedown", (e) => startElementDrag(e, el.id));

    canvas.appendChild(elDiv);
  });

  updateSelectionTools();
}

function getElementCanvasHTML(el, theme) {
  switch (el.type) {
    case "badge":
      return `
        <div class="inline-block px-[1.2cqw] py-[0.4cqw] rounded border font-semibold tracking-wider uppercase pointer-events-auto leading-normal"
             style="background: ${theme.accent400}18; border-color: ${theme.accent400}44; color: ${theme.accent400}; font-size: clamp(9px, 1.15cqw, 12px);"
             contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'text', this.innerText)">
          ${escapeHTML(el.text || 'Бейдж')}
        </div>
      `;

    case "title":
      const titleFs = el.fontSize || 32;
      return `
        <div class="font-serif font-bold text-white leading-tight" style="font-size: clamp(15px, calc(${titleFs} * 0.105cqw), ${titleFs}px); text-align: ${el.textAlign || 'left'};">
          <span contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'text', this.innerText)">${escapeHTML(el.text || 'Заголовок')}</span>
          ${el.accentText ? `<br><span class="font-normal italic" style="color:${theme.accent400};" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'accentText', this.innerText)">${escapeHTML(el.accentText)}</span>` : ''}
        </div>
      `;

    case "text":
      const textFs = el.fontSize || 15;
      return `
        <div class="text-slate-300 font-light leading-relaxed" style="font-size: clamp(10px, calc(${textFs} * 0.105cqw), ${textFs}px); text-align: ${el.textAlign || 'left'};"
             contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'text', this.innerText)">
          ${escapeHTML(el.text || 'Текст описания или факта.')}
        </div>
      `;

    case "image":
      const src = el.imageSrc ? getImagePreviewUrl(el.imageSrc) : "";
      return `
        <div class="w-full rounded-2xl bg-slate-900 border border-slate-800 p-[1.2cqw] shadow-2xl">
          <div class="w-full aspect-[4/3] max-h-[30cqw] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
            ${src ? `<img src="${src}" class="w-full h-full object-contain pointer-events-none" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23666%22 stroke-width=%222%22><rect x=%223%22 y=%223%22 width=%2218%22 height=%2218%22 rx=%222%22/><circle cx=%228.5%22 cy=%228.5%22 r=%221.5%22/><path d=%22M21 15l-5-5L5 21%22/></svg>'">` : `
              <div class="flex flex-col items-center justify-center text-slate-500 space-y-1">
                <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span class="text-[clamp(9px,1.1cqw,11px)]">Загрузите фото справа</span>
              </div>
            `}
          </div>
          ${el.imageCaption ? `<div class="text-center pt-[0.8cqw] text-[clamp(9px,1.1cqw,11px)] text-slate-400 font-medium" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'imageCaption', this.innerText)">${escapeHTML(el.imageCaption)}</div>` : ''}
        </div>
      `;

    case "panel":
      return `
        <div class="p-[1.6cqw] rounded-xl panel-box space-y-[0.8cqw]" style="background:${theme.panelBg}; border: 1px solid ${theme.borderColor}; font-size: clamp(10px, 1.25cqw, 13px);">
          <div class="font-bold flex items-center gap-1.5" style="color:${theme.accent400}; font-size: clamp(11px, 1.4cqw, 15px);">
            <span class="text-[clamp(11px,1.5cqw,16px)]">${escapeHTML(el.icon || '✦')}</span>
            <span contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'title', this.innerText)">${escapeHTML(el.title || 'Заголовок панели')}</span>
          </div>
          ${el.description ? `<p class="text-slate-300 leading-relaxed text-[clamp(9px,1.18cqw,12px)]" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'description', this.innerText)">${escapeHTML(el.description)}</p>` : ''}
          ${(el.bullets && el.bullets.length > 0) ? `
            <ul class="space-y-[0.5cqw] text-slate-300 text-[clamp(9px,1.18cqw,12px)] pt-0.5">
              ${el.bullets.map(b => `<li class="flex items-start gap-1.5"><span style="color:${theme.accent400}; font-bold;">${escapeHTML(b.icon || '•')}</span><span>${b.title ? `<b>${escapeHTML(b.title)}</b> ` : ''}${escapeHTML(b.text)}</span></li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `;

    case "bullets":
      return `
        <div class="p-[1.6cqw] rounded-xl panel-box space-y-[0.8cqw]" style="background:${theme.panelBg}; border: 1px solid ${theme.borderColor}; font-size: clamp(10px, 1.25cqw, 13px);">
          ${el.title ? `<div class="font-semibold text-white text-[clamp(11px,1.4cqw,15px)]" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'title', this.innerText)">${escapeHTML(el.title)}</div>` : ''}
          <ul class="space-y-[0.6cqw] text-slate-300 text-[clamp(9.5px,1.2cqw,13px)]">
            ${(el.bullets || []).map(b => `<li class="flex items-start gap-1.5"><span style="color:${theme.accent400}; font-bold;">${escapeHTML(b.icon || '•')}</span><span>${b.title ? `<b>${escapeHTML(b.title)}</b> ` : ''}${escapeHTML(b.text)}</span></li>`).join('')}
          </ul>
        </div>
      `;

    case "quote":
      return `
        <div class="p-[2cqw] rounded-2xl panel-box space-y-[0.9cqw] text-center" style="background:${theme.panelBg}; border: 1px solid ${theme.borderColor};">
          <div class="text-[clamp(18px,3.2cqw,36px)] leading-none select-none font-serif opacity-40" style="color:${theme.accent400};">“</div>
          <blockquote class="font-serif italic text-white leading-relaxed text-[clamp(11px,1.5cqw,18px)]" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'text', this.innerText)">
            «${escapeHTML(el.text || 'Текст важной мысли или цитаты')}»
          </blockquote>
          <div class="pt-1.5 border-t border-slate-800">
            <div class="font-bold font-serif text-[clamp(10px,1.3cqw,14px)]" style="color:${theme.accent400};" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'quoteAuthor', this.innerText)">${escapeHTML(el.quoteAuthor || 'Автор цитаты')}</div>
            <div class="text-[clamp(9px,1.05cqw,11px)] text-slate-400 mt-0.5" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'quoteRole', this.innerText)">${escapeHTML(el.quoteRole || 'Роль / Источник')}</div>
          </div>
        </div>
      `;
  }
  return "";
}

function handleInlineTextBlur(elementId, prop, value) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide) return;
  const el = currentSlide.elements.find(e => e.id === elementId);
  if (el) {
    el[prop] = value.trim();
    renderInspector();
    renderDeckList();
  }
}

function startElementDrag(e, elementId) {
  e.stopPropagation();

  if (e.target.isContentEditable) {
    selectElement(elementId);
    return;
  }

  if (e.target.dataset && e.target.dataset.handle) {
    isResizing = true;
    resizeHandleType = e.target.dataset.handle;
  } else {
    isDragging = true;
  }

  selectElement(elementId);

  const canvas = document.getElementById("slideCanvas");
  const canvasRect = canvas.getBoundingClientRect();

  dragStartX = e.clientX;
  dragStartY = e.clientY;

  const currentSlide = currentProject.slides[activeSlideIndex];
  const el = currentSlide.elements.find(item => item.id === elementId);
  if (!el) return;

  elementStartLeft = el.x;
  elementStartTop = el.y;
  elementStartWidth = el.w;
  elementStartHeight = el.h || 20;

  e.preventDefault();
}

function setupCanvasEvents() {
  window.addEventListener("mousemove", (e) => {
    if (!isDragging && !isResizing) return;

    const canvas = document.getElementById("slideCanvas");
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();

    const deltaXPercent = ((e.clientX - dragStartX) / canvasRect.width) * 100;
    const deltaYPercent = ((e.clientY - dragStartY) / canvasRect.height) * 100;

    const currentSlide = currentProject.slides[activeSlideIndex];
    if (!currentSlide) return;
    const el = currentSlide.elements.find(item => item.id === selectedElementId);
    if (!el) return;

    if (isDragging) {
      let newLeft = Math.round(elementStartLeft + deltaXPercent);
      let newTop = Math.round(elementStartTop + deltaYPercent);

      newLeft = Math.max(0, Math.min(newLeft, 95));
      newTop = Math.max(0, Math.min(newTop, 95));

      el.x = newLeft;
      el.y = newTop;

      const elDom = document.getElementById(el.id);
      if (elDom) {
        elDom.style.left = `${newLeft}%`;
        elDom.style.top = `${newTop}%`;
      }
    } else if (isResizing) {
      if (resizeHandleType.includes("e")) {
        let newWidth = Math.round(elementStartWidth + deltaXPercent);
        newWidth = Math.max(8, Math.min(newWidth, 100 - el.x));
        el.w = newWidth;
      }
      if (resizeHandleType.includes("w")) {
        let newWidth = Math.round(elementStartWidth - deltaXPercent);
        let newLeft = Math.round(elementStartLeft + deltaXPercent);
        if (newWidth >= 8 && newLeft >= 0) {
          el.w = newWidth;
          el.x = newLeft;
        }
      }

      const elDom = document.getElementById(el.id);
      if (elDom) {
        elDom.style.width = `${el.w}%`;
        elDom.style.left = `${el.x}%`;
        elDom.style.top = `${el.y}%`;
      }
    }

    updateInspectorCoords(el);
  });

  window.addEventListener("mouseup", () => {
    if (isDragging || isResizing) {
      isDragging = false;
      isResizing = false;
      renderDeckList();
    }
  });
}

function selectElement(elementId) {
  selectedElementId = elementId;
  const all = document.querySelectorAll(".canvas-element");
  all.forEach(div => {
    if (div.id === elementId) {
      div.classList.add("selected");
    } else {
      div.classList.remove("selected");
    }
  });
  updateSelectionTools();
  renderInspector();
}

function handleCanvasDeselect(e) {
  if (e.target.id === "slideCanvas" || e.target.classList.contains("canvas-outer")) {
    clearSelection();
  }
}

function handleSlideCanvasClick(e) {

  if (!e.target.closest(".canvas-element")) {
    clearSelection();
  }
}

function clearSelection() {
  selectedElementId = null;
  document.querySelectorAll(".canvas-element").forEach(d => d.classList.remove("selected"));
  updateSelectionTools();
  renderInspector();
}

function updateSelectionTools() {
  const tools = document.getElementById("selectionTools");
  if (!tools) return;
  if (selectedElementId) {
    tools.classList.remove("opacity-40", "pointer-events-none");
  } else {
    tools.classList.add("opacity-40", "pointer-events-none");
  }
}

function addCanvasElement(type) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide) return;

  const maxZ = (currentSlide.elements || []).reduce((acc, el) => Math.max(acc, el.zIndex || 1), 1);

  let newEl = {
    id: generateId(),
    type: type,
    x: 10,
    y: 20,
    w: 50,
    zIndex: maxZ + 1
  };

  switch (type) {
    case "badge":
      newEl.x = 6;
      newEl.y = 8;
      newEl.w = 35;
      newEl.text = "Новая метка • Раздел";
      break;

    case "title":
      newEl.x = 6;
      newEl.y = 18;
      newEl.w = 60;
      newEl.text = "Новый заголовок";
      newEl.accentText = "Акцент";
      newEl.fontSize = 36;
      break;

    case "text":
      newEl.x = 6;
      newEl.y = 38;
      newEl.w = 55;
      newEl.text = "Текстовое пояснение к слайду. Нажмите на текст, чтобы изменить его.";
      newEl.fontSize = 15;
      break;

    case "image":

      const existingImages = currentSlide.elements.filter(e => e.type === 'image');
      const offset = (existingImages.length * 6) % 30;
      newEl.x = Math.min(65, 55 + offset);
      newEl.y = Math.min(60, 16 + offset);
      newEl.w = 32;
      newEl.imageSrc = "";
      newEl.imageCaption = "Подпись к фото";
      break;

    case "panel":
      newEl.x = 6;
      newEl.y = 48;
      newEl.w = 55;
      newEl.icon = "✦";
      newEl.title = "Заголовок блока";
      newEl.description = "Описание события или аргумента. Нажмите для редактирования.";
      newEl.bullets = [];
      break;

    case "bullets":
      newEl.x = 6;
      newEl.y = 48;
      newEl.w = 55;
      newEl.title = "Основные тезисы:";
      newEl.bullets = [
        { icon: "•", title: "Тезис 1:", text: "Описание ключевого момента." },
        { icon: "•", title: "Тезис 2:", text: "Вторая важная деталь темы." }
      ];
      break;

    case "quote":
      newEl.x = 15;
      newEl.y = 22;
      newEl.w = 70;
      newEl.text = "Здесь можно написать важную цитату или ключевой тезис выступления.";
      newEl.quoteAuthor = "Автор цитаты";
      newEl.quoteRole = "Роль / 1948 год";
      break;
  }

  currentSlide.elements.push(newEl);
  renderCanvas();
  selectElement(newEl.id);
  renderDeckList();
}

function triggerNewImageUpload() {
  const uploader = document.getElementById("standaloneImageUploader");
  if (uploader) {
    uploader.value = "";
    uploader.click();
  }
}

async function handleStandaloneImageUpload(e) {
  if (!e.target.files || e.target.files.length === 0) return;
  const files = Array.from(e.target.files);
  await uploadMultipleFilesToSlide(files);
}

function handleCanvasDragOver(e) {
  e.preventDefault();
  const canvas = document.getElementById("slideCanvas");
  if (canvas) canvas.style.outline = "2px dashed #3B82F6";
}

function handleCanvasDragLeave(e) {
  e.preventDefault();
  const canvas = document.getElementById("slideCanvas");
  if (canvas) canvas.style.outline = "";
}

async function handleCanvasDropFiles(e) {
  e.preventDefault();
  const canvas = document.getElementById("slideCanvas");
  if (canvas) canvas.style.outline = "";

  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    if (files.length > 0) {
      await uploadMultipleFilesToSlide(files);
    }
  }
}

async function uploadMultipleFilesToSlide(files) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        const maxZ = (currentSlide.elements || []).reduce((acc, el) => Math.max(acc, el.zIndex || 1), 1);

        const existingImages = currentSlide.elements.filter(e => e.type === 'image');
        const count = existingImages.length;

        let posX = 55;
        let posY = 15;
        let posW = 32;

        if (count === 1) {
          posX = 55; posY = 52; posW = 30;
        } else if (count >= 2) {
          posX = 20 + ((count % 3) * 26);
          posY = 20 + (Math.floor(count / 3) * 32);
          posW = 24;
        }

        const newEl = {
          id: generateId(),
          type: "image",
          x: Math.min(75, posX),
          y: Math.min(70, posY),
          w: posW,
          zIndex: maxZ + 1,
          imageSrc: data.fileName,
          imageCaption: file.name.replace(/\.[^/.]+$/, "")
        };
        currentSlide.elements.push(newEl);
        renderCanvas();
        selectElement(newEl.id);
        renderDeckList();
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  }
}

function bringElementForward() {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide || !selectedElementId) return;
  const el = currentSlide.elements.find(e => e.id === selectedElementId);
  if (el) {
    el.zIndex = (el.zIndex || 1) + 2;
    renderCanvas();
  }
}

function sendElementBackward() {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide || !selectedElementId) return;
  const el = currentSlide.elements.find(e => e.id === selectedElementId);
  if (el) {
    el.zIndex = Math.max(1, (el.zIndex || 1) - 2);
    renderCanvas();
  }
}

function duplicateSelectedElement() {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide || !selectedElementId) return;
  const el = currentSlide.elements.find(e => e.id === selectedElementId);
  if (el) {
    const copy = JSON.parse(JSON.stringify(el));
    copy.id = generateId();
    copy.x = Math.min(85, copy.x + 3);
    copy.y = Math.min(85, copy.y + 3);
    copy.zIndex = (copy.zIndex || 1) + 1;
    currentSlide.elements.push(copy);
    renderCanvas();
    selectElement(copy.id);
    renderDeckList();
  }
}

function deleteSelectedElement() {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide || !selectedElementId) return;
  const idx = currentSlide.elements.findIndex(e => e.id === selectedElementId);
  if (idx !== -1) {
    currentSlide.elements.splice(idx, 1);
    selectedElementId = null;
    renderCanvas();
    renderInspector();
    renderDeckList();
  }
}

let clipboardElement = null;

function setupGlobalShortcuts() {
  window.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
      const slideshow = document.getElementById("slideshowModal");
      const exportModal = document.getElementById("exportModal");
      const aiModal = document.getElementById("aiModal");
      if (slideshow && !slideshow.classList.contains("hidden")) {
        closeSlideshow();
        return;
      }
      if (exportModal && !exportModal.classList.contains("hidden")) {
        closeExportModal();
        return;
      }
      if (aiModal && !aiModal.classList.contains("hidden")) {
        closeAIModal();
        return;
      }
      if (selectedElementId) {
        clearSelection();
        return;
      }
    }

    if (e.key === "F5") {
      e.preventDefault();
      openSlideshow();
      return;
    }

    if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "ы" || e.key === "S")) {
      e.preventDefault();
      openExportModal();
      return;
    }

    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) {
      return;
    }

    if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "с" || e.key === "C")) {
      if (selectedElementId) {
        const currentSlide = currentProject.slides[activeSlideIndex];
        const el = currentSlide && currentSlide.elements.find(item => item.id === selectedElementId);
        if (el) {
          clipboardElement = JSON.parse(JSON.stringify(el));
        }
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && (e.key === "v" || e.key === "м" || e.key === "V")) {
      if (clipboardElement) {
        e.preventDefault();
        pasteClipboardElement();
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && (e.key === "d" || e.key === "в" || e.key === "D")) {
      e.preventDefault();
      if (selectedElementId) {
        duplicateSelectedElement();
      } else {
        duplicateCurrentSlide();
      }
      return;
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      if (selectedElementId) {
        e.preventDefault();
        deleteSelectedElement();
        return;
      } else if (e.ctrlKey) {

        e.preventDefault();
        deleteCurrentSlide();
        return;
      }
    }

    if (selectedElementId) {
      const step = e.shiftKey ? 5 : 1;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        nudgeSelectedElement(-step, 0);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nudgeSelectedElement(step, 0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        nudgeSelectedElement(0, -step);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        nudgeSelectedElement(0, step);
      } else if (e.key === "[" || e.key === "х") {
        e.preventDefault();
        changeElementLayer(-1);
      } else if (e.key === "]" || e.key === "ъ") {
        e.preventDefault();
        changeElementLayer(1);
      }
    } else {

      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (activeSlideIndex > 0) {
          selectSlide(activeSlideIndex - 1);
        }
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        if (activeSlideIndex < currentProject.slides.length - 1) {
          selectSlide(activeSlideIndex + 1);
        }
      }
    }
  });
}

function pasteClipboardElement() {
  if (!clipboardElement) return;
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide) return;

  const copy = JSON.parse(JSON.stringify(clipboardElement));
  copy.id = generateId();
  copy.x = Math.min(85, copy.x + 3);
  copy.y = Math.min(85, copy.y + 3);
  const maxZ = (currentSlide.elements || []).reduce((acc, el) => Math.max(acc, el.zIndex || 1), 1);
  copy.zIndex = maxZ + 1;

  currentSlide.elements.push(copy);
  renderCanvas();
  selectElement(copy.id);
  renderDeckList();
}

function changeElementLayer(delta) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide || !selectedElementId) return;
  const el = currentSlide.elements.find(e => e.id === selectedElementId);
  if (el) {
    el.zIndex = Math.max(1, (el.zIndex || 1) + delta);
    const dom = document.getElementById(el.id);
    if (dom) dom.style.zIndex = el.zIndex;
  }
}

function nudgeSelectedElement(dx, dy) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide || !selectedElementId) return;
  const el = currentSlide.elements.find(e => e.id === selectedElementId);
  if (el) {
    el.x = Math.max(0, Math.min(95, el.x + dx));
    el.y = Math.max(0, Math.min(95, el.y + dy));
    const dom = document.getElementById(el.id);
    if (dom) {
      dom.style.left = `${el.x}%`;
      dom.style.top = `${el.y}%`;
    }
    updateInspectorCoords(el);
  }
}

function renderInspector() {
  const container = document.getElementById("inspectorContent");
  const badge = document.getElementById("selectedElementTypeBadge");
  if (!container) return;

  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide) return;

  const el = currentSlide.elements.find(e => e.id === selectedElementId);

  if (!el) {
    if (badge) badge.innerText = "Слайд #" + (activeSlideIndex + 1);
    container.innerHTML = `
      <div class="space-y-3 text-slate-400">
        <div>
          <label class="block text-[11px] font-semibold text-slate-300 mb-1">Название слайда:</label>
          <input type="text" class="input-luxury text-xs" value="${escapeHTML(currentSlide.title || '')}" oninput="updateSlideTitle(this.value)">
        </div>

        <div class="pt-3 border-t border-slate-800 text-[11px] space-y-1.5 text-slate-400">
          <div class="text-amber-400 font-bold flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Советы по работе:</span>
          </div>
          <div>• Перетаскивайте любой блок или фото мышкой.</div>
          <div>• Тяните за маркеры для изменения ширины.</div>
          <div>• Добавляйте сколько угодно фото на один слайд.</div>
          <div>• Двойной клик позволяет печатать прямо на слайде.</div>
        </div>
      </div>
    `;
    return;
  }

  const typeLabels = {
    badge: "Бейдж темы",
    title: "Заголовок",
    text: "Текст",
    image: "Фотография",
    panel: "Карточка (Panel Box)",
    bullets: "Список тезисов",
    quote: "Цитата"
  };

  if (badge) badge.innerText = typeLabels[el.type] || el.type;

  container.innerHTML = `
    <!-- Позиция и Размеры -->
    <div class="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
      <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Координаты на слайде:</div>
      <div class="grid grid-cols-3 gap-2 text-center">
        <div>
          <label class="text-[9px] text-slate-500 block">X (%)</label>
          <input type="number" id="insp_x" min="0" max="100" class="input-luxury text-center !py-1 text-xs font-mono" value="${el.x}" onchange="updateElementProp('x', parseFloat(this.value))">
        </div>
        <div>
          <label class="text-[9px] text-slate-500 block">Y (%)</label>
          <input type="number" id="insp_y" min="0" max="100" class="input-luxury text-center !py-1 text-xs font-mono" value="${el.y}" onchange="updateElementProp('y', parseFloat(this.value))">
        </div>
        <div>
          <label class="text-[9px] text-slate-500 block">Ширина (%)</label>
          <input type="number" id="insp_w" min="5" max="100" class="input-luxury text-center !py-1 text-xs font-mono" value="${el.w}" onchange="updateElementProp('w', parseFloat(this.value))">
        </div>
      </div>
    </div>

    <!-- Редактор контента в зависимости от типа -->
    ${renderInspectorFields(el)}
  `;
}

function updateInspectorCoords(el) {
  const xInp = document.getElementById("insp_x");
  const yInp = document.getElementById("insp_y");
  const wInp = document.getElementById("insp_w");
  if (xInp) xInp.value = el.x;
  if (yInp) yInp.value = el.y;
  if (wInp) wInp.value = el.w;
}

function renderInspectorFields(el) {
  switch (el.type) {
    case "badge":
      return `
        <div>
          <label class="block text-[11px] text-slate-300 mb-1">Текст бейджа:</label>
          <input type="text" class="input-luxury" value="${escapeHTML(el.text || '')}" oninput="updateElementProp('text', this.value)">
        </div>
      `;

    case "title":
      return `
        <div class="space-y-3">
          <div>
            <label class="block text-[11px] text-slate-300 mb-1">Основной текст:</label>
            <input type="text" class="input-luxury font-bold font-serif" value="${escapeHTML(el.text || '')}" oninput="updateElementProp('text', this.value)">
          </div>
          <div>
            <label class="block text-[11px] text-amber-400 mb-1">Акцентное слово (курсив):</label>
            <input type="text" class="input-luxury text-amber-300 italic" value="${escapeHTML(el.accentText || '')}" oninput="updateElementProp('accentText', this.value)">
          </div>
          <div>
            <label class="block text-[11px] text-slate-300 mb-1">Размер шрифта (px):</label>
            <input type="number" min="16" max="96" class="input-luxury" value="${el.fontSize || 36}" oninput="updateElementProp('fontSize', parseInt(this.value))">
          </div>
        </div>
      `;

    case "text":
      return `
        <div class="space-y-3">
          <div>
            <label class="block text-[11px] text-slate-300 mb-1">Текст параграфа:</label>
            <textarea rows="3" class="input-luxury text-xs resize-none" oninput="updateElementProp('text', this.value)">${escapeHTML(el.text || '')}</textarea>
          </div>
          <div>
            <label class="block text-[11px] text-slate-300 mb-1">Размер шрифта (px):</label>
            <input type="number" min="10" max="32" class="input-luxury" value="${el.fontSize || 15}" oninput="updateElementProp('fontSize', parseInt(this.value))">
          </div>
        </div>
      `;

    case "image":
      return `
        <div class="space-y-3">
          <button onclick="triggerInspectorImageUpload()" class="w-full py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition">
            <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
            <span>Загрузить фото с ПК</span>
          </button>
          <div class="text-[10px] text-slate-500 text-center">Файл сохранится в папке assets/</div>

          <div>
            <label class="block text-[11px] text-slate-400 mb-0.5">Или прямая ссылка / файл:</label>
            <input type="text" class="input-luxury text-xs font-mono" value="${escapeHTML(el.imageSrc || '')}" oninput="updateElementProp('imageSrc', this.value)">
          </div>

          <div>
            <label class="block text-[11px] text-slate-400 mb-0.5">Подпись к фотографии:</label>
            <input type="text" class="input-luxury text-xs" value="${escapeHTML(el.imageCaption || '')}" oninput="updateElementProp('imageCaption', this.value)">
          </div>

          <div>
            <label class="block text-[11px] text-slate-400 mb-0.5">Запасной URL (fallback):</label>
            <input type="text" class="input-luxury text-xs font-mono" value="${escapeHTML(el.fallbackUrl || '')}" oninput="updateElementProp('fallbackUrl', this.value)">
          </div>
        </div>
      `;

    case "panel":
      return `
        <div class="space-y-2.5">
          <div class="flex items-center space-x-2">
            <input type="text" class="input-luxury !w-12 text-center text-sm font-bold" placeholder="✦" value="${escapeHTML(el.icon || '✦')}" oninput="updateElementProp('icon', this.value)">
            <input type="text" class="input-luxury text-xs font-bold" placeholder="Заголовок" value="${escapeHTML(el.title || '')}" oninput="updateElementProp('title', this.value)">
          </div>
          <div>
            <label class="block text-[10px] text-slate-400 mb-0.5">Описание:</label>
            <textarea rows="2" class="input-luxury text-xs resize-none" oninput="updateElementProp('description', this.value)">${escapeHTML(el.description || '')}</textarea>
          </div>
          <div class="pt-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[10px] text-slate-400 uppercase font-semibold">Пункты списка:</span>
              <button onclick="addInspectorBullet()" class="text-[10px] text-amber-400 font-bold">+ Добавить</button>
            </div>
            ${(el.bullets || []).map((b, i) => `
              <div class="flex items-center gap-1 mb-1">
                <input type="text" class="input-luxury !w-6 text-center text-[10px]" value="${escapeHTML(b.icon || '•')}" oninput="updateInspectorBullet(${i}, 'icon', this.value)">
                <input type="text" class="input-luxury !w-20 text-[10px] font-bold" placeholder="Год:" value="${escapeHTML(b.title || '')}" oninput="updateInspectorBullet(${i}, 'title', this.value)">
                <input type="text" class="input-luxury text-[10px] flex-1" placeholder="Текст" value="${escapeHTML(b.text || '')}" oninput="updateInspectorBullet(${i}, 'text', this.value)">
                <button onclick="removeInspectorBullet(${i})" class="text-slate-500 hover:text-red-400 p-0.5">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case "bullets":
      return `
        <div class="space-y-2">
          <div>
            <label class="block text-[11px] text-slate-400 mb-0.5">Заголовок списка:</label>
            <input type="text" class="input-luxury text-xs font-semibold" value="${escapeHTML(el.title || '')}" oninput="updateElementProp('title', this.value)">
          </div>
          <div class="space-y-1 pt-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[10px] text-slate-400 uppercase font-semibold">Пункты:</span>
              <button onclick="addInspectorBullet()" class="text-[10px] text-amber-400 font-bold">+ Добавить</button>
            </div>
            ${(el.bullets || []).map((b, i) => `
              <div class="flex items-center gap-1">
                <input type="text" class="input-luxury !w-6 text-center text-[10px]" value="${escapeHTML(b.icon || '•')}" oninput="updateInspectorBullet(${i}, 'icon', this.value)">
                <input type="text" class="input-luxury !w-24 text-[10px] font-bold" placeholder="Тезис:" value="${escapeHTML(b.title || '')}" oninput="updateInspectorBullet(${i}, 'title', this.value)">
                <input type="text" class="input-luxury text-[10px] flex-1" placeholder="Пояснение" value="${escapeHTML(b.text || '')}" oninput="updateInspectorBullet(${i}, 'text', this.value)">
                <button onclick="removeInspectorBullet(${i})" class="text-slate-500 hover:text-red-400 p-0.5">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case "quote":
      return `
        <div class="space-y-2.5">
          <div>
            <label class="block text-[11px] text-amber-400 mb-0.5">Текст цитаты:</label>
            <textarea rows="3" class="input-luxury text-xs font-serif italic" oninput="updateElementProp('text', this.value)">${escapeHTML(el.text || '')}</textarea>
          </div>
          <div>
            <label class="block text-[11px] text-slate-300 mb-0.5">Автор:</label>
            <input type="text" class="input-luxury text-xs font-bold" value="${escapeHTML(el.quoteAuthor || '')}" oninput="updateElementProp('quoteAuthor', this.value)">
          </div>
          <div>
            <label class="block text-[11px] text-slate-300 mb-0.5">Роль / Год:</label>
            <input type="text" class="input-luxury text-xs" value="${escapeHTML(el.quoteRole || '')}" oninput="updateElementProp('quoteRole', this.value)">
          </div>
        </div>
      `;
  }
  return "";
}

function updateElementProp(prop, value) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide || !selectedElementId) return;
  const el = currentSlide.elements.find(e => e.id === selectedElementId);
  if (el) {
    el[prop] = value;
    renderCanvas();
    renderDeckList();
  }
}

function updateSlideTitle(val) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (currentSlide) {
    currentSlide.title = val;
    renderDeckList();
  }
}

function addInspectorBullet() {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide || !selectedElementId) return;
  const el = currentSlide.elements.find(e => e.id === selectedElementId);
  if (el) {
    if (!el.bullets) el.bullets = [];
    el.bullets.push({ icon: "•", title: "Тезис:", text: "Пояснение" });
    renderCanvas();
    renderInspector();
  }
}

function updateInspectorBullet(idx, prop, value) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide || !selectedElementId) return;
  const el = currentSlide.elements.find(e => e.id === selectedElementId);
  if (el && el.bullets && el.bullets[idx]) {
    el.bullets[idx][prop] = value;
    renderCanvas();
  }
}

function removeInspectorBullet(idx) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide || !selectedElementId) return;
  const el = currentSlide.elements.find(e => e.id === selectedElementId);
  if (el && el.bullets) {
    el.bullets.splice(idx, 1);
    renderCanvas();
    renderInspector();
  }
}

function triggerInspectorImageUpload() {
  const uploader = document.getElementById("standaloneImageUploader");
  if (uploader) {
    uploader.onchange = async (e) => {
      if (!e.target.files || !e.target.files[0]) return;
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (res.ok) {
          const data = await res.json();
          updateElementProp("imageSrc", data.fileName);
          updateElementProp("imageCaption", file.name.replace(/\.[^/.]+$/, ""));
          renderInspector();
        }
      } catch (err) {
        console.error(err);
      }
    };
    uploader.value = "";
    uploader.click();
  }
}

function getImagePreviewUrl(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  return `/api/temp-asset/${encodeURIComponent(src.replace(/^assets\//, "").replace(/^images\//, ""))}`;
}

async function openSlideshow() {
  const modal = document.getElementById("slideshowModal");
  const frame = document.getElementById("slideshowFrame");
  if (!modal || !frame) return;

  try {
    const res = await fetch("/api/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentProject)
    });
    if (res.ok) {
      const htmlText = await res.text();
      frame.srcdoc = htmlText;
      modal.classList.remove("hidden");
    }
  } catch (err) {
    console.error("Slideshow preview error:", err);
  }
}

function closeSlideshow() {
  const modal = document.getElementById("slideshowModal");
  const frame = document.getElementById("slideshowFrame");
  if (modal) modal.classList.add("hidden");
  if (frame) frame.srcdoc = "";
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSlideshow();
    closeExportModal();
  }
});

function openExportModal() {
  const modal = document.getElementById("exportModal");
  const resultBox = document.getElementById("exportResultBox");
  if (resultBox) resultBox.classList.add("hidden");

  const nameInput = document.getElementById("exportFileName");
  if (nameInput && currentProject.title) {
    const cleanTitle = currentProject.title.toLowerCase().replace(/[^a-zа-я0-9]/gi, "_").replace(/_+/g, "_").slice(0, 30);
    nameInput.value = cleanTitle || "презентация";
  }

  if (modal) modal.classList.remove("hidden");
}

function sanitizeFileName(input) {
  let val = input.value;
  val = val.replace(/\.html?$/gi, "");
  val = val.replace(/[<>:"/\\|?*]/g, "");
  input.value = val;
}

function closeExportModal() {
  const modal = document.getElementById("exportModal");
  if (modal) modal.classList.add("hidden");
}

async function submitExport() {
  const submitBtn = document.getElementById("exportSubmitBtn");
  const outDir = document.getElementById("exportOutputDir").value.trim();
  let baseName = document.getElementById("exportFileName").value.trim();
  baseName = baseName.replace(/\.html?$/gi, "");
  if (!baseName) baseName = "презентация";
  const fileName = baseName + ".html";
  const assetsDir = document.getElementById("exportAssetsDir").value.trim();
  const resultBox = document.getElementById("exportResultBox");
  const resultMsg = document.getElementById("exportResultMsg");
  const resultPath = document.getElementById("exportResultPath");

  submitBtn.disabled = true;
  submitBtn.innerText = "Генерация...";

  try {
    const reqBody = {
      presentation: currentProject,
      outputDir: outDir,
      fileName: fileName,
      assetsSubdir: assetsDir
    };

    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody)
    });

    const data = await res.json();
    submitBtn.disabled = false;
    submitBtn.innerText = "Сгенерировать и сохранить";

    if (data.success) {
      lastExportedFilePath = data.filePath;
      resultBox.classList.remove("hidden");
      resultMsg.innerText = data.message;
      resultPath.innerText = `Файл: ${data.filePath}\nПапка фото: ${data.assetsPath}`;
      showCustomToast({ title: "Экспорт выполнен", message: "Презентация успешно сохранена", type: "success" });
    } else {
      showCustomAlert({
        type: "danger",
        title: "Ошибка экспорта",
        message: data.error || "Неизвестная ошибка при сохранении"
      });
    }
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.innerText = "Сгенерировать и сохранить";
    showCustomAlert({
      type: "danger",
      title: "Ошибка соединения",
      message: err.message
    });
  }
}

async function openFolderInExplorer() {
  if (!lastExportedFilePath) return;
  try {
    await fetch("/api/open-folder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: lastExportedFilePath })
    });
  } catch (e) {
    console.error(e);
  }
}

async function openFileInBrowser() {
  if (!lastExportedFilePath) return;
  try {
    await fetch("/api/open-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: lastExportedFilePath })
    });
  } catch (e) {
    console.error(e);
  }
}


function saveProjectJSON() {
  const jsonStr = JSON.stringify(currentProject, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const cleanTitle = (currentProject.title || "presentation").replace(/[^a-zа-я0-9]/gi, "_");
  a.href = url;
  a.download = `${cleanTitle}_project.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function loadProjectJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && parsed.slides) {
        currentProject = parsed;
        activeSlideIndex = 0;
        selectedElementId = null;
        updateHeaderUI();
        renderDeckList();
        renderCanvas();
        renderInspector();
        showCustomToast({ title: "Проект загружен", message: "Презентация успешно открыта", type: "success" });
      } else {
        showCustomAlert({
          type: "warning",
          title: "Некорректный файл",
          message: "Файл не является корректным проектом презентации."
        });
      }
    } catch (err) {
      showCustomAlert({
        type: "danger",
        title: "Ошибка чтения JSON",
        message: err.message
      });
    }
  };
  reader.readAsText(file);
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function loadHTMLPresentation(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const fileName = file.name.toLowerCase();
  if (!fileName.endsWith(".html") && !fileName.endsWith(".htm")) {
    showCustomAlert({
      type: "warning",
      title: "Неверный формат",
      message: "Можно открывать только файлы презентаций с расширением .html или .htm!"
    });
    event.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const htmlContent = e.target.result;

      const match = htmlContent.match(/<script\s+id=["']sanichpoint-data["'][^>]*>([\s\S]*?)<\/script>/i);

      if (!match || !match[1] || !match[1].trim()) {
        showCustomAlert({
          type: "warning",
          title: "Файл не поддерживается",
          message: "Этот HTML-файл не является презентацией SanichPoint или был создан сторонней программой без структуры нашего алгоритма.\n\nОткрывать можно только файлы, сгенерированные в SanichPoint."
        });
        event.target.value = "";
        return;
      }

      const parsedProject = JSON.parse(match[1].trim());

      if (!parsedProject || !Array.isArray(parsedProject.slides) || parsedProject.slides.length === 0) {
        showCustomAlert({
          type: "danger",
          title: "Повреждённый файл",
          message: "Внутри HTML-файла повреждены данные слайдов презентации."
        });
        event.target.value = "";
        return;
      }

      currentProject = parsedProject;
      activeSlideIndex = 0;
      selectedElementId = null;

      updateHeaderUI();
      renderDeckList();
      renderCanvas();
      renderInspector();

      showCustomAlert({
        type: "success",
        title: "Презентация открыта",
        message: `Презентация «${currentProject.title || 'Без названия'}» успешно загружена!\n\nКоличество слайдов: ${currentProject.slides.length}`
      });
    } catch (err) {
      showCustomAlert({
        type: "danger",
        title: "Ошибка чтения",
        message: "Ошибка при чтении HTML-файла: " + err.message
      });
    } finally {
      event.target.value = "";
    }
  };

  reader.onerror = () => {
    showCustomAlert({
      type: "danger",
      title: "Ошибка чтения",
      message: "Не удалось прочитать выбранный файл."
    });
    event.target.value = "";
  };

  reader.readAsText(file);
}


function openAIModal() {
  const modal = document.getElementById("aiModal");
  if (modal) {
    modal.classList.remove("hidden");
    const input = document.getElementById("aiCodeInput");
    if (input && !input.value.trim()) {
      input.focus();
    }
  }
}

function closeAIModal() {
  const modal = document.getElementById("aiModal");
  if (modal) modal.classList.add("hidden");
}

const AI_PROMPT_SKILL_TEXT = `Напиши мне презентацию используя этот скилл https://github.com/pavlyska/SanichPointAISkill на тему [Ваша Тема]`;

function copyAIPromptInstruction() {
  navigator.clipboard.writeText(AI_PROMPT_SKILL_TEXT).then(() => {
    const btnText = document.getElementById("copyPromptBtnText");
    if (btnText) {
      const orig = btnText.innerText;
      btnText.innerText = "✓ Скопировано в буфер!";
      setTimeout(() => { btnText.innerText = orig; }, 2500);
    }
    showCustomToast({ title: "Промпт скопирован", message: "Отправьте его нейросети с вашей темой", type: "success" });
  }).catch(() => {
    showCustomAlert({
      type: "info",
      title: "Промпт для нейросети",
      message: AI_PROMPT_SKILL_TEXT,
      confirmText: "Закрыть"
    });
  });
}

function clearAIInputError() {
  const errBox = document.getElementById("aiInputError");
  const input = document.getElementById("aiCodeInput");
  if (errBox) errBox.classList.add("hidden");
  if (input) {
    input.classList.remove("border-red-500", "ring-2", "ring-red-500/30");
    input.classList.add("border-slate-800");
  }
}

function loadSampleAIPutin() {
  const input = document.getElementById("aiCodeInput");
  if (!input) return;
  clearAIInputError();
  input.value = `SANICHPOINT_AI
TITLE: Владимир Путин: Биография и эпоха
SUBTITLE: От службы в разведке до руководства великой державой
THEME: ruby
MONOGRAM: ВП

=== СЛАЙД 1: Лидер эпохи
BADGE: Политический портрет • Лидер России
TITLE: Владимир Путин | Президент Российской Федерации
TEXT: Российский государственный деятель, действующий Президент Российской Федерации, определивший вектор развития страны в XXI веке.
IMAGE: https://upload.wikimedia.org/wikipedia/commons/8/8d/Vladimir_Putin_%282020-01-15%29.jpg | Официальный портрет Президента РФ
BULLETS: Основные вехи политического пути:
* 1952 год: | Рождение в Ленинграде, спорт и юридическое образование в ЛГУ.
* 1975–1990 гг.: | Служба в органах государственной безопасности, работа в Дрездене.
* 2000 год — н.в.: | Руководство государством, восстановление целостности и суверенитета страны.

=== СЛАЙД 2: Истоки и образование
BADGE: 1952 — 1975 годы • Ленинград
TITLE: Детство, спорт и юрфак ЛГУ | Характер и школа
TEXT: Годы, сформировавшие принципы, выдержку и государственное мировоззрение.
IMAGE: https://upload.wikimedia.org/wikipedia/commons/e/ec/Vladimir_Putin_in_his_youth.jpg | Владимир Путин в молодые годы
PANEL: ✦ Фундамент личности
* Борьба самбо и дзюдо: | Мастер спорта, сформировавший волю, хладнокровие и умение держать удар.
* Кафедра международного права: | Фундаментальная юридическая школа Санкт-Петербургского госуниверситета.

=== СЛАЙД 3: Служба в органах безопасности
BADGE: 1975 — 1991 годы • Разведка
TITLE: Служба в ПГУ КГБ СССР | Дрезденская миссия
TEXT: Профессиональная разведывательная работа, анализ международной обстановки и опыт управления в кризисных условиях.
IMAGE: https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Vladimir_Putin_1999.jpg/800px-Vladimir_Putin_1999.jpg | На государственной службе, 1999 год
PANEL: ❖ Ключевой опыт
* Аналитическая работа: | Сбор и обработка стратегической политической информации.
* Знание языков и психологии: | Свободное владение немецким языком и искусство переговоров.

=== СЛАЙД 4: Государственное кредо
BADGE: Принцип суверенитета
QUOTE: Быть сильным — это не вопрос выбора, это необходимое условие нашего выживания и суверенного развития в современном мире. | В. В. Путин | Президент Российской Федерации
IMAGE: https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Vladimir_Putin_2024.jpg/800px-Vladimir_Putin_2024.jpg | Выступление с Посланием Федеральному Собранию

=== СЛАЙД 5: Возрождение государственности
BADGE: 2000 — 2014 годы • Реформы
TITLE: Укрепление вертикали власти | Экономический подъем
TEXT: Преодоление кризиса 1990-х годов, восстановление конституционного порядка и многократный рост благосостояния граждан.
IMAGE: https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Meeting_with_members_of_the_Security_Council_%282024-05-13%29_02.jpg/800px-Meeting_with_members_of_the_Security_Council_%282024-05-13%29_02.jpg | Совещание по стратегическим вопросам
BULLETS: Стратегические результаты:
* Сохранение единства: | Ликвидация угрозы распада страны и победа над международным терроризмом на Кавказе.
* Рост экономики: | Рост ВВП, создание Фонда национального благосостояния и выплата внешних долгов.
* Оборонная мощь: | Масштабное перевооружение армии и создание передовых систем безопасности.

=== СЛАЙД 6: Стратегический суверенитет
BADGE: XXI век • Будущее России
TITLE: Многополярный мир | Независимый путь
PANEL: ✦ Принципы внешней политики
* Суверенное равенство: | Отстаивание права каждой цивилизации на свой путь без диктата извне.
* Технологический суверенитет: | Развитие космической отрасли, ядерной энергетики и микроэлектроники.
* Традиционные ценности: | Защита семьи, культурного наследия и исторической памяти.
IMAGE: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/President_Putin_meets_with_military_officers_2023.jpg/800px-President_Putin_meets_with_military_officers_2023.jpg | Встреча с защитниками Отечества`;
}

function applyAICode() {
  const input = document.getElementById("aiCodeInput");
  const errBox = document.getElementById("aiInputError");
  const errText = document.getElementById("aiInputErrorText");

  if (!input || !input.value.trim()) {
    if (input) {
      input.classList.remove("border-slate-800");
      input.classList.add("border-red-500", "ring-2", "ring-red-500/30");
      input.focus();
    }
    if (errBox) {
      if (errText) errText.innerText = "Пожалуйста, вставьте код презентации от AI!";
      errBox.classList.remove("hidden");
    }
    showCustomToast({
      title: "Поле пустое",
      message: "Вставьте код от AI перед созданием презентации",
      type: "warning"
    });
    return;
  }

  try {
    const newProject = parseAICode(input.value);
    currentProject = newProject;
    activeSlideIndex = 0;
    selectedElementId = null;

    updateHeaderUI();
    renderDeckList();
    renderCanvas();
    renderInspector();

    closeAIModal();
    showCustomAlert({
      type: "success",
      title: "✨ Презентация создана!",
      message: `Презентация «${currentProject.title}» успешно создана!\n\nВсего слайдов: ${currentProject.slides.length}\nВыбранный стиль: ${currentProject.themeId}`,
      confirmText: "Отлично"
    });
  } catch (err) {
    if (errBox) {
      if (errText) errText.innerText = "Ошибка: " + err.message;
      errBox.classList.remove("hidden");
    }
    showCustomAlert({
      type: "danger",
      title: "Ошибка парсинга кода AI",
      message: err.message,
      confirmText: "Исправить"
    });
  }
}

function parseAICode(rawText) {
  if (!rawText || !rawText.trim()) {
    throw new Error("Текст пустой! Вставьте код презентации от AI.");
  }

  let text = rawText.trim();
  text = text.replace(/^```[a-z0-9_-]*\s*/i, "").replace(/\s*```$/i, "").trim();

  if (text.startsWith("{")) {
    try {
      const parsed = JSON.parse(text);
      if (parsed && Array.isArray(parsed.slides)) {
        return parsed;
      }
    } catch (e) {
    }
  }

  const lines = text.split(/\r?\n/);
  const project = {
    title: "Презентация от AI",
    subtitle: "",
    monogram: "",
    themeId: "ruby",
    slides: []
  };

  let currentSlide = null;
  let currentBulletsTarget = null;

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || line === "SANICHPOINT_AI") continue;

    if (/^TITLE\s*:\s*/i.test(line)) {
      project.title = line.replace(/^TITLE\s*:\s*/i, "").trim();
      continue;
    }
    if (/^SUBTITLE\s*:\s*/i.test(line)) {
      project.subtitle = line.replace(/^SUBTITLE\s*:\s*/i, "").trim();
      continue;
    }
    if (/^THEME\s*:\s*/i.test(line)) {
      let th = line.replace(/^THEME\s*:\s*/i, "").trim().toLowerCase();
      if (th === "cyberpunk") th = "cyan";
      if (th === "titan") th = "titanium";
      project.themeId = th || "ruby";
      continue;
    }
    if (/^MONOGRAM\s*:\s*/i.test(line)) {
      project.monogram = line.replace(/^MONOGRAM\s*:\s*/i, "").trim().toUpperCase();
      continue;
    }

    if (/^(?:={3,}|-{3,})\s*(?:СЛАЙД|SLIDE)?\s*(\d*)\s*:?\s*(.*)$/i.test(line)) {
      const match = line.match(/^(?:={3,}|-{3,})\s*(?:СЛАЙД|SLIDE)?\s*(\d*)\s*:?\s*(.*)$/i);
      const sTitle = (match && match[2] && match[2].trim()) || ("Слайд " + (project.slides.length + 1));
      currentSlide = {
        id: project.slides.length + 1,
        title: sTitle,
        rawItems: []
      };
      project.slides.push(currentSlide);
      currentBulletsTarget = null;
      continue;
    }

    if (!currentSlide) {
      currentSlide = {
        id: 1,
        title: "Введение",
        rawItems: []
      };
      project.slides.push(currentSlide);
    }

    if (/^LAYOUT\s*:\s*/i.test(line)) {
      currentSlide.layout = line.replace(/^LAYOUT\s*:\s*/i, "").trim().toLowerCase();
      continue;
    }

    if (/^ALIGN\s*:\s*/i.test(line)) {
      currentSlide.align = line.replace(/^ALIGN\s*:\s*/i, "").trim().toLowerCase();
      continue;
    }

    if (/^BADGE\s*:\s*/i.test(line)) {
      currentSlide.rawItems.push({ type: "badge", text: line.replace(/^BADGE\s*:\s*/i, "").trim() });
      currentBulletsTarget = null;
      continue;
    }

    if (/^TITLE\s*:\s*/i.test(line)) {
      const parts = line.replace(/^TITLE\s*:\s*/i, "").trim().split("|");
      currentSlide.rawItems.push({
        type: "title",
        text: parts[0].trim(),
        accentText: parts[1] ? parts[1].trim() : ""
      });
      currentBulletsTarget = null;
      continue;
    }

    if (/^TEXT\s*:\s*/i.test(line)) {
      currentSlide.rawItems.push({ type: "text", text: line.replace(/^TEXT\s*:\s*/i, "").trim() });
      currentBulletsTarget = null;
      continue;
    }

    if (/^IMAGE\s*:\s*/i.test(line)) {
      const parts = line.replace(/^IMAGE\s*:\s*/i, "").trim().split("|");
      currentSlide.rawItems.push({
        type: "image",
        url: parts[0].trim(),
        caption: parts[1] ? parts[1].trim() : ""
      });
      currentBulletsTarget = null;
      continue;
    }

    if (/^(?:METRIC|STAT)\s*:\s*/i.test(line)) {
      const parts = line.replace(/^(?:METRIC|STAT)\s*:\s*/i, "").trim().split("|");
      currentSlide.rawItems.push({
        type: "metric",
        value: parts[0] ? parts[0].trim() : "",
        title: parts[1] ? parts[1].trim() : "",
        description: parts[2] ? parts[2].trim() : ""
      });
      currentBulletsTarget = null;
      continue;
    }

    if (/^PANEL\s*:\s*/i.test(line)) {
      const parts = line.replace(/^PANEL\s*:\s*/i, "").trim().split("|");
      let rawTitle = parts[0].trim();
      let icon = "✦";

      const emojiMatch = rawTitle.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|\u2B50|[\uE000-\uF8FF]|✦|❖|⚡|🏛️|📈|⚖️|🛡️|🎯|🔬|💡|👑|🎖️|🌾|•|✓|★)\s*(.*)$/u);
      if (emojiMatch) {
        icon = emojiMatch[1];
        rawTitle = emojiMatch[2];
      } else if (parts[2]) {
        icon = parts[2].trim();
      }

      const pItem = {
        type: "panel",
        icon: icon,
        title: rawTitle,
        description: parts[1] ? parts[1].trim() : "",
        bullets: []
      };
      currentSlide.rawItems.push(pItem);
      currentBulletsTarget = pItem.bullets;
      continue;
    }

    if (/^BULLETS\s*:\s*/i.test(line)) {
      const bItem = {
        type: "bullets",
        title: line.replace(/^BULLETS\s*:\s*/i, "").trim(),
        bullets: []
      };
      currentSlide.rawItems.push(bItem);
      currentBulletsTarget = bItem.bullets;
      continue;
    }

    if (/^QUOTE\s*:\s*/i.test(line)) {
      const parts = line.replace(/^QUOTE\s*:\s*/i, "").trim().split("|");
      currentSlide.rawItems.push({
        type: "quote",
        text: parts[0].trim(),
        author: parts[1] ? parts[1].trim() : "",
        role: parts[2] ? parts[2].trim() : ""
      });
      currentBulletsTarget = null;
      continue;
    }

    if (/^[*•-]\s+/i.test(line)) {
      const bContent = line.replace(/^[*•-]\s+/i, "").trim();
      const bParts = bContent.split("|");
      let bTitle = bParts[1] ? bParts[0].trim() : "";
      let bText = bParts[1] ? bParts[1].trim() : bParts[0].trim();
      let bIcon = "•";

      const emojiMatch = bTitle.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|\u2B50|[\uE000-\uF8FF]|✦|❖|⚡|🏛️|📈|⚖️|🛡️|🎯|🔬|💡|👑|🎖️|🌾|•|✓|★)\s*(.*)$/u);
      if (emojiMatch) {
        bIcon = emojiMatch[1];
        bTitle = emojiMatch[2];
      }

      const bulletObj = {
        icon: bIcon,
        title: bTitle,
        text: bText
      };
      if (currentBulletsTarget) {
        currentBulletsTarget.push(bulletObj);
      } else {
        const bList = {
          type: "bullets",
          title: "",
          bullets: [bulletObj]
        };
        currentSlide.rawItems.push(bList);
        currentBulletsTarget = bList.bullets;
      }
      continue;
    }
  }

  if (project.slides.length === 0) {
    throw new Error("Не удалось обнаружить слайды в коде. Проверьте разделители слайдов (например, === СЛАЙД 1).");
  }

  project.slides.forEach((slide, sIdx) => {
    slide.elements = layoutSlideElements(slide.rawItems || [], sIdx === 0, {
      layout: slide.layout,
      align: slide.align
    });
    delete slide.rawItems;
    delete slide.layout;
    delete slide.align;
  });

  if (!project.monogram && project.title) {
    const words = project.title.split(/\s+/).filter(Boolean);
    project.monogram = (words.length >= 2 ? words[0][0] + words[1][0] : words[0].slice(0, 2)).toUpperCase();
  }

  return project;
}

function layoutSlideElements(rawItems, isCover, slideConfig = {}) {
  const elements = [];
  let zCounter = 1;

  const layout = slideConfig.layout || "right-image";
  const slideAlign = slideConfig.align || (layout === "center" || layout === "hero" ? "center" : "left");

  const normalizedItems = rawItems.map(item => {
    if (item.type === "metric") {
      return {
        type: "panel",
        icon: "📈",
        title: item.value ? `${item.value} • ${item.title}` : item.title,
        description: item.description,
        bullets: []
      };
    }
    return item;
  });

  const images = normalizedItems.filter(i => i.type === "image");
  const nonImages = normalizedItems.filter(i => i.type !== "image");
  const hasImages = images.length > 0;

  if (layout === "split" || layout === "two-columns") {
    let topY = 6;
    const headerItems = nonImages.filter(i => i.type === "badge" || i.type === "title" || i.type === "text");
    const bodyItems = nonImages.filter(i => i.type === "panel" || i.type === "bullets" || i.type === "quote");

    headerItems.forEach(item => {
      if (item.type === "badge") {
        elements.push({
          id: generateId(),
          type: "badge",
          x: 4, y: topY, w: 42,
          zIndex: zCounter++,
          text: item.text
        });
        topY += 8;
      } else if (item.type === "title") {
        elements.push({
          id: generateId(),
          type: "title",
          x: 4, y: topY, w: 92,
          zIndex: zCounter++,
          text: item.text,
          accentText: item.accentText || "",
          fontSize: isCover ? 38 : 30,
          textAlign: slideAlign
        });
        topY += (item.accentText ? 18 : 12);
      } else if (item.type === "text") {
        elements.push({
          id: generateId(),
          type: "text",
          x: 4, y: topY, w: 92,
          zIndex: zCounter++,
          text: item.text,
          fontSize: 14,
          textAlign: slideAlign
        });
        topY += 12;
      }
    });

    const bodyY = Math.max(topY + 2, 34);
    if (images.length === 1 && bodyItems.length >= 1) {
      elements.push({
        id: generateId(),
        type: "image",
        x: 4, y: bodyY, w: 44,
        zIndex: zCounter++,
        imageSrc: images[0].url,
        imageCaption: images[0].caption,
        fallbackURL: images[0].url
      });
      let rightY = bodyY;
      bodyItems.forEach(b => {
        elements.push({
          id: generateId(),
          type: b.type,
          x: 52, y: rightY, w: 44,
          zIndex: zCounter++,
          icon: b.icon || "✦",
          title: b.title,
          description: b.description,
          bullets: b.bullets || [],
          text: b.text || "",
          quoteAuthor: b.author || "Цитата",
          quoteRole: b.role || ""
        });
        rightY += 28;
      });
    } else if (bodyItems.length >= 2) {
      elements.push({
        id: generateId(),
        type: bodyItems[0].type,
        x: 4, y: bodyY, w: 44,
        zIndex: zCounter++,
        icon: bodyItems[0].icon || "✦",
        title: bodyItems[0].title,
        description: bodyItems[0].description,
        bullets: bodyItems[0].bullets || []
      });
      elements.push({
        id: generateId(),
        type: bodyItems[1].type,
        x: 52, y: bodyY, w: 44,
        zIndex: zCounter++,
        icon: bodyItems[1].icon || "❖",
        title: bodyItems[1].title,
        description: bodyItems[1].description,
        bullets: bodyItems[1].bullets || []
      });
    } else {
      let cy = bodyY;
      bodyItems.forEach(b => {
        elements.push({
          id: generateId(),
          type: b.type,
          x: 4, y: cy, w: 92,
          zIndex: zCounter++,
          icon: b.icon || "✦",
          title: b.title,
          description: b.description,
          bullets: b.bullets || []
        });
        cy += 28;
      });
    }
    return elements;
  }

  if (layout === "cards" || layout === "grid") {
    let topY = 6;
    const headerItems = nonImages.filter(i => i.type === "badge" || i.type === "title" || i.type === "text");
    const bodyCards = nonImages.filter(i => i.type === "panel" || i.type === "bullets" || i.type === "quote");

    headerItems.forEach(item => {
      if (item.type === "badge") {
        elements.push({
          id: generateId(),
          type: "badge",
          x: 4, y: topY, w: 42,
          zIndex: zCounter++,
          text: item.text
        });
        topY += 8;
      } else if (item.type === "title") {
        elements.push({
          id: generateId(),
          type: "title",
          x: 4, y: topY, w: 92,
          zIndex: zCounter++,
          text: item.text,
          accentText: item.accentText || "",
          fontSize: isCover ? 38 : 32,
          textAlign: slideAlign
        });
        topY += (item.accentText ? 18 : 12);
      } else if (item.type === "text") {
        elements.push({
          id: generateId(),
          type: "text",
          x: 4, y: topY, w: 92,
          zIndex: zCounter++,
          text: item.text,
          fontSize: 14,
          textAlign: slideAlign
        });
        topY += 12;
      }
    });

    const cardY = Math.max(topY + 3, 34);
    const count = bodyCards.length;
    if (count === 1) {
      elements.push({
        id: generateId(),
        type: bodyCards[0].type,
        x: 10, y: cardY, w: 80,
        zIndex: zCounter++,
        icon: bodyCards[0].icon || "✦",
        title: bodyCards[0].title,
        description: bodyCards[0].description,
        bullets: bodyCards[0].bullets || []
      });
    } else if (count === 2) {
      bodyCards.forEach((c, idx) => {
        elements.push({
          id: generateId(),
          type: c.type,
          x: idx === 0 ? 4 : 52,
          y: cardY,
          w: 44,
          zIndex: zCounter++,
          icon: c.icon || (idx === 0 ? "✦" : "❖"),
          title: c.title,
          description: c.description,
          bullets: c.bullets || []
        });
      });
    } else if (count >= 3) {
      const cardW = 28.5;
      const gaps = [4, 35.75, 67.5];
      bodyCards.slice(0, 3).forEach((c, idx) => {
        elements.push({
          id: generateId(),
          type: c.type,
          x: gaps[idx] || (4 + idx * 30),
          y: cardY,
          w: cardW,
          zIndex: zCounter++,
          icon: c.icon || "✦",
          title: c.title,
          description: c.description,
          bullets: c.bullets || []
        });
      });
    }
    return elements;
  }

  if (layout === "left-image") {
    if (images.length === 1) {
      elements.push({
        id: generateId(),
        type: "image",
        x: 4, y: 10, w: 38,
        zIndex: zCounter++,
        imageSrc: images[0].url,
        imageCaption: images[0].caption,
        fallbackURL: images[0].url
      });
    } else if (images.length >= 2) {
      elements.push({
        id: generateId(),
        type: "image",
        x: 4, y: 10, w: 19,
        zIndex: zCounter++,
        imageSrc: images[0].url,
        imageCaption: images[0].caption,
        fallbackURL: images[0].url
      });
      elements.push({
        id: generateId(),
        type: "image",
        x: 24, y: 10, w: 19,
        zIndex: zCounter++,
        imageSrc: images[1].url,
        imageCaption: images[1].caption,
        fallbackURL: images[1].url
      });
    }

    const rightX = hasImages ? 46 : 4;
    const contentWidth = hasImages ? 50 : 92;
    let currentY = 7;

    nonImages.forEach(item => {
      switch (item.type) {
        case "badge":
          elements.push({
            id: generateId(),
            type: "badge",
            x: rightX, y: currentY, w: Math.min(contentWidth, 42),
            zIndex: zCounter++,
            text: item.text
          });
          currentY += 9;
          break;
        case "title":
          elements.push({
            id: generateId(),
            type: "title",
            x: rightX, y: currentY, w: contentWidth,
            zIndex: zCounter++,
            text: item.text,
            accentText: item.accentText || "",
            fontSize: isCover ? 38 : 32,
            textAlign: slideAlign
          });
          currentY += (item.accentText ? 20 : 14);
          break;
        case "text":
          elements.push({
            id: generateId(),
            type: "text",
            x: rightX, y: currentY, w: contentWidth,
            zIndex: zCounter++,
            text: item.text,
            fontSize: 15,
            textAlign: slideAlign
          });
          currentY += 14;
          break;
        case "panel":
          elements.push({
            id: generateId(),
            type: "panel",
            x: rightX, y: currentY, w: contentWidth,
            zIndex: zCounter++,
            icon: item.icon || "✦",
            title: item.title,
            description: item.description,
            bullets: item.bullets || []
          });
          currentY += 28;
          break;
        case "bullets":
          elements.push({
            id: generateId(),
            type: "bullets",
            x: rightX, y: currentY, w: contentWidth,
            zIndex: zCounter++,
            title: item.title,
            bullets: item.bullets || []
          });
          currentY += 26;
          break;
        case "quote":
          elements.push({
            id: generateId(),
            type: "quote",
            x: rightX, y: currentY, w: contentWidth,
            zIndex: zCounter++,
            text: item.text,
            quoteAuthor: item.author || "Цитата",
            quoteRole: item.role || ""
          });
          currentY += 28;
          break;
      }
    });
    return elements;
  }

  if (layout === "center" || layout === "hero" || layout === "quote-hero") {
    let currentY = 8;
    nonImages.forEach(item => {
      switch (item.type) {
        case "badge":
          elements.push({
            id: generateId(),
            type: "badge",
            x: 29, y: currentY, w: 42,
            zIndex: zCounter++,
            text: item.text
          });
          currentY += 9;
          break;
        case "title":
          elements.push({
            id: generateId(),
            type: "title",
            x: 8, y: currentY, w: 84,
            zIndex: zCounter++,
            text: item.text,
            accentText: item.accentText || "",
            fontSize: isCover ? 42 : 36,
            textAlign: "center"
          });
          currentY += (item.accentText ? 22 : 16);
          break;
        case "text":
          elements.push({
            id: generateId(),
            type: "text",
            x: 12, y: currentY, w: 76,
            zIndex: zCounter++,
            text: item.text,
            fontSize: 16,
            textAlign: "center"
          });
          currentY += 15;
          break;
        case "quote":
          elements.push({
            id: generateId(),
            type: "quote",
            x: 8, y: currentY, w: 84,
            zIndex: zCounter++,
            text: item.text,
            quoteAuthor: item.author || "Цитата",
            quoteRole: item.role || ""
          });
          currentY += 30;
          break;
        case "panel":
          elements.push({
            id: generateId(),
            type: "panel",
            x: 15, y: currentY, w: 70,
            zIndex: zCounter++,
            icon: item.icon || "✦",
            title: item.title,
            description: item.description,
            bullets: item.bullets || []
          });
          currentY += 28;
          break;
        case "bullets":
          elements.push({
            id: generateId(),
            type: "bullets",
            x: 15, y: currentY, w: 70,
            zIndex: zCounter++,
            title: item.title,
            bullets: item.bullets || []
          });
          currentY += 26;
          break;
      }
    });

    if (images.length === 1) {
      elements.push({
        id: generateId(),
        type: "image",
        x: 30, y: Math.max(currentY, 44), w: 40,
        zIndex: zCounter++,
        imageSrc: images[0].url,
        imageCaption: images[0].caption,
        fallbackURL: images[0].url
      });
    }
    return elements;
  }

  if (images.length === 1) {
    elements.push({
      id: generateId(),
      type: "image",
      x: 60, y: 10, w: 36,
      zIndex: zCounter++,
      imageSrc: images[0].url,
      imageCaption: images[0].caption,
      fallbackURL: images[0].url
    });
  } else if (images.length >= 2) {
    elements.push({
      id: generateId(),
      type: "image",
      x: 55, y: 10, w: 20,
      zIndex: zCounter++,
      imageSrc: images[0].url,
      imageCaption: images[0].caption,
      fallbackURL: images[0].url
    });
    elements.push({
      id: generateId(),
      type: "image",
      x: 77, y: 10, w: 20,
      zIndex: zCounter++,
      imageSrc: images[1].url,
      imageCaption: images[1].caption,
      fallbackURL: images[1].url
    });
  }

  const leftX = 4;
  const contentWidth = hasImages ? 54 : 92;
  let currentY = 7;

  nonImages.forEach(item => {
    switch (item.type) {
      case "badge":
        elements.push({
          id: generateId(),
          type: "badge",
          x: leftX, y: currentY, w: Math.min(contentWidth, 42),
          zIndex: zCounter++,
          text: item.text
        });
        currentY += 9;
        break;
      case "title":
        elements.push({
          id: generateId(),
          type: "title",
          x: leftX, y: currentY, w: contentWidth,
          zIndex: zCounter++,
          text: item.text,
          accentText: item.accentText || "",
          fontSize: isCover ? 38 : 32,
          textAlign: slideAlign
        });
        currentY += (item.accentText ? 20 : 14);
        break;
      case "text":
        elements.push({
          id: generateId(),
          type: "text",
          x: leftX, y: currentY, w: contentWidth,
          zIndex: zCounter++,
          text: item.text,
          fontSize: 15,
          textAlign: slideAlign
        });
        currentY += 14;
        break;
      case "panel":
        elements.push({
          id: generateId(),
          type: "panel",
          x: leftX, y: currentY, w: contentWidth,
          zIndex: zCounter++,
          icon: item.icon || "✦",
          title: item.title,
          description: item.description,
          bullets: item.bullets || []
        });
        currentY += 28;
        break;
      case "bullets":
        elements.push({
          id: generateId(),
          type: "bullets",
          x: leftX, y: currentY, w: contentWidth,
          zIndex: zCounter++,
          title: item.title,
          bullets: item.bullets || []
        });
        currentY += 26;
        break;
      case "quote":
        elements.push({
          id: generateId(),
          type: "quote",
          x: hasImages ? leftX : 10,
          y: currentY,
          w: hasImages ? contentWidth : 80,
          zIndex: zCounter++,
          text: item.text,
          quoteAuthor: item.author || "Цитата",
          quoteRole: item.role || ""
        });
        currentY += 28;
        break;
    }
  });

  return elements;
}

