
function generateId() {
  return "el_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36);
}

const MENU_ICONS = {
  duplicate: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`,
  addSlide: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
  plus: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>`,
  trash: `<svg class="w-3.5 h-3.5 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
  moveUp: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>`,
  moveDown: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`,
  copy: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>`,
  cut: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242 3 3 0 014.242 0L12 12zm0 0L9.121 9.121a3 3 0 114.242-4.242 3 3 0 010 4.242L12 12z"/></svg>`,
  paste: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`,
  layerForward: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7"/></svg>`,
  layerBackward: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"/></svg>`,
  badge: `<svg class="w-3.5 h-3.5 shrink-0 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>`,
  title: `<svg class="w-3.5 h-3.5 shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h7"/></svg>`,
  text: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h10"/></svg>`,
  image: `<svg class="w-3.5 h-3.5 shrink-0 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
  panel: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
  bullets: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`,
  quote: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>`,
  metric: `<svg class="w-3.5 h-3.5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
  timeline: `<svg class="w-3.5 h-3.5 shrink-0 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  callout: `<svg class="w-3.5 h-3.5 shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
  divider: `<svg class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>`,
  code: `<svg class="w-3.5 h-3.5 shrink-0 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
  button: `<svg class="w-3.5 h-3.5 shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>`,
  palette: `<svg class="w-3.5 h-3.5 shrink-0 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4 3.99 3.99 0 012-3.46V7a4 4 0 118 0v6.54A3.99 3.99 0 0115 17a4 4 0 01-4 4H7zM11 7a2 2 0 10-4 0v4h4V7z"/></svg>`
};

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
  updateCanvasSize();

  const outer = document.querySelector(".canvas-outer");
  if (outer && window.ResizeObserver) {
    new ResizeObserver(() => updateCanvasSize()).observe(outer);
  }
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

const BG_COLOR_PRESETS = [
  "#080A0F", "#0B0F19", "#0F172A", "#18181B", "#1C1917",
  "#1E1B4B", "#064E3B", "#1E293B", "#31102B", "#111827",
  "#1A130B", "#14213D", "#0A192F", "#1F1D2B", "#0D1117"
];

const BG_GRADIENT_PRESETS = [
  { name: "Deep Space", value: "linear-gradient(135deg, #090A0F 0%, #151A2E 100%)" },
  { name: "Midnight Blue", value: "linear-gradient(135deg, #020617 0%, #0F172A 50%, #1E293B 100%)" },
  { name: "Golden Glow", value: "linear-gradient(135deg, #120D05 0%, #261B0B 50%, #0F0B05 100%)" },
  { name: "Emerald Night", value: "linear-gradient(135deg, #022013 0%, #064E3B 50%, #02170D 100%)" },
  { name: "Cyber Violet", value: "linear-gradient(135deg, #180828 0%, #3B0764 50%, #0F051D 100%)" },
  { name: "Crimson Sunset", value: "linear-gradient(135deg, #240A0F 0%, #450A0A 50%, #170407 100%)" },
  { name: "Slate Modern", value: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)" },
  { name: "Dark Radial", value: "radial-gradient(circle at 50% 30%, #1E293B 0%, #020617 100%)" }
];

const BG_PATTERNS = [
  { id: "dots", name: "Точки", desc: "Радиальные микро-точки" },
  { id: "grid", name: "Сетка", desc: "Технологичная клетка" },
  { id: "blueprint", name: "Чертёж", desc: "Синяя инженерная сетка" },
  { id: "radial", name: "Сияние", desc: "Световой акцент" }
];

function applySlideBackground(targetEl, slide, theme) {
  if (!targetEl) return;
  targetEl.classList.remove("pattern-dots", "pattern-grid", "pattern-blueprint", "pattern-radial");
  targetEl.style.backgroundImage = "";
  targetEl.style.backgroundColor = "";

  const bgType = (slide && slide.bgType) ? slide.bgType : "theme";
  if (bgType === "color") {
    targetEl.style.backgroundColor = slide.bgColor || theme.darkBg;
  } else if (bgType === "gradient") {
    targetEl.style.background = slide.bgGradient || theme.darkBg;
  } else if (bgType === "pattern") {
    targetEl.style.backgroundColor = slide.bgColor || theme.darkBg;
    targetEl.classList.add(`pattern-${slide.bgPattern || 'dots'}`);
  } else if (bgType === "image") {
    targetEl.style.backgroundColor = "#000";
  } else {
    targetEl.style.backgroundColor = theme.darkBg;
  }
}

function setSlideBackground(prop, val) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide) return;
  currentSlide[prop] = val;
  renderCanvas();
  renderDeckList();
  renderInspector();
}

function setSlideBgType(type) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide) return;
  currentSlide.bgType = type;
  const theme = getCurrentTheme();
  if (type === "color" && !currentSlide.bgColor) {
    currentSlide.bgColor = theme.darkBg;
  } else if (type === "gradient" && !currentSlide.bgGradient) {
    currentSlide.bgGradient = BG_GRADIENT_PRESETS[0].value;
  } else if (type === "pattern" && !currentSlide.bgPattern) {
    currentSlide.bgPattern = "dots";
    if (!currentSlide.bgColor) currentSlide.bgColor = theme.darkBg;
  } else if (type === "image" && (currentSlide.overlayOpacity === undefined || currentSlide.overlayOpacity === null)) {
    currentSlide.overlayOpacity = 0.65;
  }
  renderCanvas();
  renderDeckList();
  renderInspector();
}

function applyBgToAllSlides() {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide) return;
  const { bgType, bgColor, bgGradient, bgImage, overlayOpacity, bgPattern } = currentSlide;
  currentProject.slides.forEach(s => {
    s.bgType = bgType;
    s.bgColor = bgColor;
    s.bgGradient = bgGradient;
    s.bgImage = bgImage;
    s.overlayOpacity = overlayOpacity;
    s.bgPattern = bgPattern;
  });
  renderDeckList();
  renderCanvas();
  showCustomToast({ message: "Фон применён ко всем слайдам презентации!", type: "success" });
}

function openSlideBgSettings() {
  selectElement(null);
  renderInspector();
}

function triggerSlideBgImageUpload() {
  const uploader = document.getElementById("standaloneImageUploader");
  if (!uploader) return;
  uploader.onchange = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setSlideBackground("bgImage", data.fileName);
      }
    } catch (err) {
      console.error("Upload bg image error:", err);
    }
  };
  uploader.value = "";
  uploader.click();
}

function getSlideThumbnailHTML(slide, theme, thumbWidth = 130) {
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
      <div style="position:absolute; left:${el.x}%; top:${el.y}%; width:${el.w}%; z-index:${el.zIndex || 1}; pointer-events:none; box-sizing:border-box;">
        ${contentHTML}
      </div>
    `;
  });

  let bgStyle = `background-color:${theme.darkBg};`;
  let extraClass = "";
  let bgLayerHTML = "";

  const bgType = slide.bgType || "theme";
  if (bgType === "color" && slide.bgColor) {
    bgStyle = `background-color:${slide.bgColor};`;
  } else if (bgType === "gradient" && slide.bgGradient) {
    bgStyle = `background:${slide.bgGradient};`;
  } else if (bgType === "pattern") {
    if (slide.bgColor) {
      bgStyle = `background-color:${slide.bgColor};`;
    }
    const pat = slide.bgPattern || "dots";
    extraClass = ` pattern-${pat}`;
  } else if (bgType === "image" && slide.bgImage) {
    bgStyle = `background-color:#000;`;
    const imgUrl = getImagePreviewUrl(slide.bgImage);
    const opacity = (slide.overlayOpacity !== undefined && slide.overlayOpacity !== null && slide.overlayOpacity >= 0) ? slide.overlayOpacity : 0.65;
    bgLayerHTML = `
      <div style="position:absolute; inset:0; background-image:url('${imgUrl}'); background-size:cover; background-position:center; pointer-events:none; z-index:0;"></div>
      <div style="position:absolute; inset:0; background:rgba(0,0,0,${opacity}); pointer-events:none; z-index:0;"></div>
    `;
  }

  return `
    <div class="deck-thumb-inner${extraClass}" style="width:${baseWidth}px; height:${baseHeight}px; position:absolute; top:0; left:0; transform-origin:0 0; transform:scale(${scale}); pointer-events:none; user-select:none; ${bgStyle} container-type:inline-size; overflow:hidden; isolation:isolate;">
      ${bgLayerHTML}
      ${elementsHTML}
    </div>
  `;
}

function updateThumbnailsScale() {
  const thumbs = document.querySelectorAll(".deck-thumb");
  thumbs.forEach(thumb => {
    const inner = thumb.querySelector(".deck-thumb-inner");
    if (inner) {
      const w = thumb.clientWidth;
      if (w > 0) {
        inner.style.transform = `scale(${w / 960})`;
      }
    }
  });
}
window.addEventListener("resize", () => {
  updateCanvasSize();
  updateThumbnailsScale();
});

let draggedSlideIndex = null;

function clearDragIndicators() {
  document.querySelectorAll(".deck-row").forEach(r => {
    r.classList.remove("drop-indicator-top", "drop-indicator-bottom", "dragging");
  });
}

function renderDeckList() {
  const container = document.getElementById("deckThumbsList");
  if (!container) return;
  container.innerHTML = "";

  const theme = getCurrentTheme();
  const containerW = container.clientWidth || 176;
  const thumbWidth = Math.max(80, containerW - 46);

  container.ondragover = (e) => {
    e.preventDefault();
    if (draggedSlideIndex === null) return;
    e.dataTransfer.dropEffect = "move";
  };

  container.ondrop = (e) => {
    if (e.target === container && draggedSlideIndex !== null) {
      e.preventDefault();
      clearDragIndicators();
      container.classList.remove("is-reordering");
      const fromIdx = draggedSlideIndex;
      draggedSlideIndex = null;
      const toIdx = currentProject.slides.length - 1;
      if (fromIdx !== toIdx) {
        moveSlide(fromIdx, toIdx);
      }
    }
  };

  currentProject.slides.forEach((slide, idx) => {
    const isSelected = idx === activeSlideIndex;

    const row = document.createElement("div");
    row.className = "flex items-start space-x-2 deck-row";
    row.draggable = true;
    row.dataset.slideIndex = idx;

    row.ondragstart = (e) => {
      draggedSlideIndex = idx;
      e.dataTransfer.setData("text/plain", String(idx));
      e.dataTransfer.effectAllowed = "move";
      container.classList.add("is-reordering");
      setTimeout(() => row.classList.add("dragging"), 0);
    };

    row.ondragend = () => {
      clearDragIndicators();
      container.classList.remove("is-reordering");
      draggedSlideIndex = null;
    };

    row.ondragover = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (draggedSlideIndex === null || draggedSlideIndex === idx) return;

      const rect = row.getBoundingClientRect();
      const isBottom = (e.clientY - rect.top) > (rect.height / 2);
      clearDragIndicators();
      row.classList.add(isBottom ? "drop-indicator-bottom" : "drop-indicator-top");
    };

    row.ondragleave = (e) => {
      if (e.relatedTarget && row.contains(e.relatedTarget)) return;
      row.classList.remove("drop-indicator-top", "drop-indicator-bottom");
    };

    row.ondrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearDragIndicators();
      container.classList.remove("is-reordering");
      if (draggedSlideIndex === null) return;

      const fromIdx = draggedSlideIndex;
      const rect = row.getBoundingClientRect();
      const isBottom = (e.clientY - rect.top) > (rect.height / 2);

      let targetPos = isBottom ? idx + 1 : idx;
      let toIdx = (fromIdx < targetPos) ? targetPos - 1 : targetPos;
      draggedSlideIndex = null;

      if (fromIdx !== toIdx) {
        moveSlide(fromIdx, toIdx);
      }
    };

    row.oncontextmenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectSlide(idx);
      openSlideContextMenu(e.clientX, e.clientY, idx);
    };

    const num = document.createElement("div");
    num.className = "text-[11px] font-mono font-bold text-slate-500 pt-1 w-3.5 text-right shrink-0 select-none cursor-grab";
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

  requestAnimationFrame(() => updateThumbnailsScale());
}

function selectSlide(index) {
  activeSlideIndex = index;
  selectedElementId = null;
  renderDeckList();
  renderCanvas();
  renderInspector();
}

function moveSlide(fromIdx, toIdx) {
  if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0 ||
      fromIdx >= currentProject.slides.length || toIdx >= currentProject.slides.length) {
    return;
  }
  const [moved] = currentProject.slides.splice(fromIdx, 1);
  currentProject.slides.splice(toIdx, 0, moved);

  if (activeSlideIndex === fromIdx) {
    activeSlideIndex = toIdx;
  } else if (fromIdx < activeSlideIndex && toIdx >= activeSlideIndex) {
    activeSlideIndex--;
  } else if (fromIdx > activeSlideIndex && toIdx <= activeSlideIndex) {
    activeSlideIndex++;
  }

  currentProject.slides.forEach((s, i) => {
    s.id = i + 1;
  });

  renderDeckList();
  renderCanvas();
  renderInspector();
  updateHeaderUI();
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

function addNewSlideAfter(idx) {
  const newSlide = {
    id: currentProject.slides.length + 1,
    title: "Новый слайд " + (currentProject.slides.length + 1),
    elements: [
      { id: generateId(), type: "badge", x: 5, y: 8, w: 30, zIndex: 1, text: "Новый раздел" },
      { id: generateId(), type: "title", x: 5, y: 18, w: 55, zIndex: 2, text: "Заголовок темы", accentText: "Акцент" },
      { id: generateId(), type: "panel", x: 5, y: 42, w: 55, zIndex: 3, icon: "✦", title: "Ключевой факт", description: "Нажмите и редактируйте текст прямо на слайде.", bullets: [] },
      { id: generateId(), type: "image", x: 64, y: 18, w: 32, zIndex: 4, imageSrc: "", imageCaption: "Подпись к фото" }
    ]
  };
  currentProject.slides.splice(idx + 1, 0, newSlide);
  activeSlideIndex = idx + 1;
  selectedElementId = null;
  renderDeckList();
  renderCanvas();
  renderInspector();
}

function duplicateCurrentSlide() {
  duplicateSlideAtIndex(activeSlideIndex);
}

function duplicateSlideAtIndex(idx) {
  if (idx < 0 || idx >= currentProject.slides.length) return;
  const target = currentProject.slides[idx];
  const copy = JSON.parse(JSON.stringify(target));
  copy.id = currentProject.slides.length + 1;
  copy.title += " (копия)";
  (copy.elements || []).forEach(el => el.id = generateId());

  currentProject.slides.splice(idx + 1, 0, copy);
  activeSlideIndex = idx + 1;
  selectedElementId = null;
  renderDeckList();
  renderCanvas();
  renderInspector();
}

async function deleteCurrentSlide() {
  await deleteSlideAtIndex(activeSlideIndex);
}

async function deleteSlideAtIndex(idx) {
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
    message: `Вы действительно хотите удалить слайд #${idx + 1}?\nВсе элементы на этом слайде будут удалены.`,
    confirmText: "Удалить слайд",
    cancelText: "Отмена"
  });
  if (!confirmed) return;

  currentProject.slides.splice(idx, 1);
  if (activeSlideIndex >= currentProject.slides.length) {
    activeSlideIndex = currentProject.slides.length - 1;
  } else if (activeSlideIndex > idx) {
    activeSlideIndex--;
  }
  selectedElementId = null;
  renderDeckList();
  renderCanvas();
  renderInspector();
  showCustomToast({ title: "Слайд удален", message: `Слайд #${idx + 1} успешно удален`, type: "info" });
}

function copySelectedElement() {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide || !selectedElementId) return;
  const el = currentSlide.elements.find(item => item.id === selectedElementId);
  if (el) {
    clipboardElement = JSON.parse(JSON.stringify(el));
    showCustomToast({ title: "Скопировано", message: "Объект скопирован в буфер (Ctrl+V)", type: "info" });
  }
}

function cutSelectedElement() {
  copySelectedElement();
  deleteSelectedElement();
}

function showContextMenu(x, y, items) {
  const menu = document.getElementById("customContextMenu");
  if (!menu) return;

  menu.innerHTML = "";

  items.forEach(item => {
    if (item.divider) {
      const div = document.createElement("div");
      div.className = "context-menu-divider";
      menu.appendChild(div);
      return;
    }

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `context-menu-item ${item.danger ? "danger" : ""} ${item.disabled ? "disabled" : ""}`;
    btn.innerHTML = `
      <div class="flex items-center gap-2.5 pointer-events-none">
        <span class="w-4 h-4 flex items-center justify-center shrink-0">${item.icon || ""}</span>
        <span class="font-medium">${escapeHTML(item.label)}</span>
      </div>
      ${item.shortcut ? `<span class="text-[10px] text-slate-500 font-mono ml-4 pointer-events-none">${escapeHTML(item.shortcut)}</span>` : ""}
    `;

    if (!item.disabled && item.action) {
      btn.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        hideContextMenu();
        try {
          item.action();
        } catch (err) {
          console.error("Context menu action error:", err);
        }
      });
    }

    menu.appendChild(btn);
  });

  menu.classList.remove("hidden");

  const menuWidth = 230;
  const menuHeight = menu.offsetHeight || (items.length * 30);
  const posX = (x + menuWidth > window.innerWidth) ? (window.innerWidth - menuWidth - 12) : x;
  const posY = (y + menuHeight > window.innerHeight) ? Math.max(10, window.innerHeight - menuHeight - 12) : y;

  menu.style.left = `${Math.max(10, posX)}px`;
  menu.style.top = `${Math.max(10, posY)}px`;
}

function hideContextMenu() {
  const menu = document.getElementById("customContextMenu");
  if (menu && !menu.classList.contains("hidden")) {
    menu.classList.add("hidden");
  }
}

document.addEventListener("click", (e) => {
  if (!e.target.closest("#customContextMenu")) {
    hideContextMenu();
  }
});
document.addEventListener("contextmenu", (e) => {
  if (!e.target.closest("#customContextMenu")) {
    hideContextMenu();
  }
}, true);
window.addEventListener("resize", () => hideContextMenu());
window.addEventListener("scroll", () => hideContextMenu(), true);

function openSlideContextMenu(x, y, idx) {
  const total = currentProject.slides.length;
  showContextMenu(x, y, [
    {
      icon: MENU_ICONS.duplicate,
      label: "Дублировать слайд",
      shortcut: "Ctrl+D",
      action: () => duplicateSlideAtIndex(idx)
    },
    {
      icon: MENU_ICONS.addSlide,
      label: "Добавить слайд после этого",
      action: () => addNewSlideAfter(idx)
    },
    { divider: true },
    {
      icon: MENU_ICONS.moveUp,
      label: "Переместить выше",
      disabled: idx === 0,
      action: () => moveSlide(idx, idx - 1)
    },
    {
      icon: MENU_ICONS.moveDown,
      label: "Переместить ниже",
      disabled: idx === total - 1,
      action: () => moveSlide(idx, idx + 1)
    },
    { divider: true },
    {
      icon: MENU_ICONS.trash,
      label: "Удалить слайд",
      shortcut: "Ctrl+Del",
      danger: true,
      disabled: total <= 1,
      action: () => deleteSlideAtIndex(idx)
    }
  ]);
}

function openElementContextMenu(x, y, elId) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  const el = currentSlide && currentSlide.elements.find(e => e.id === elId);
  if (!el) return;

  showContextMenu(x, y, [
    {
      icon: MENU_ICONS.duplicate,
      label: "Дублировать",
      shortcut: "Ctrl+D",
      action: () => duplicateSelectedElement()
    },
    {
      icon: MENU_ICONS.copy,
      label: "Копировать",
      shortcut: "Ctrl+C",
      action: () => copySelectedElement()
    },
    {
      icon: MENU_ICONS.cut,
      label: "Вырезать",
      shortcut: "Ctrl+X",
      action: () => cutSelectedElement()
    },
    { divider: true },
    {
      icon: MENU_ICONS.layerForward,
      label: "На передний план",
      shortcut: "]",
      action: () => bringElementForward()
    },
    {
      icon: MENU_ICONS.layerBackward,
      label: "На задний план",
      shortcut: "[",
      action: () => sendElementBackward()
    },
    { divider: true },
    {
      icon: MENU_ICONS.trash,
      label: "Удалить объект",
      shortcut: "Delete",
      danger: true,
      action: () => deleteSelectedElement()
    }
  ]);
}

function openCanvasContextMenu(x, y) {
  const hasClipboard = !!clipboardElement;
  showContextMenu(x, y, [
    {
      icon: MENU_ICONS.paste,
      label: "Вставить объект",
      shortcut: "Ctrl+V",
      disabled: !hasClipboard,
      action: () => pasteClipboardElement()
    },
    { divider: true },
    {
      icon: MENU_ICONS.badge,
      label: "Добавить бейдж",
      action: () => addCanvasElement("badge")
    },
    {
      icon: MENU_ICONS.title,
      label: "Добавить заголовок",
      action: () => addCanvasElement("title")
    },
    {
      icon: MENU_ICONS.text,
      label: "Добавить текст",
      action: () => addCanvasElement("text")
    },
    {
      icon: MENU_ICONS.image,
      label: "Добавить фото...",
      action: () => openAddImageModal()
    },
    {
      icon: MENU_ICONS.panel,
      label: "Добавить карточку (панель)",
      action: () => addCanvasElement("panel")
    },
    {
      icon: MENU_ICONS.bullets,
      label: "Добавить тезисы",
      action: () => addCanvasElement("bullets")
    },
    {
      icon: MENU_ICONS.quote,
      label: "Добавить цитату",
      action: () => addCanvasElement("quote")
    },
    {
      icon: MENU_ICONS.metric,
      label: "Добавить показатель (метрику)",
      action: () => addCanvasElement("metric")
    },
    {
      icon: MENU_ICONS.timeline,
      label: "Добавить этап (таймлайн)",
      action: () => addCanvasElement("timeline")
    },
    {
      icon: MENU_ICONS.callout,
      label: "Добавить выноску (акцент)",
      action: () => addCanvasElement("callout")
    },
    {
      icon: MENU_ICONS.code,
      label: "Добавить окно кода / консоль",
      action: () => addCanvasElement("code")
    },
    {
      icon: MENU_ICONS.divider,
      label: "Добавить разделительную линию",
      action: () => addCanvasElement("divider")
    },
    {
      icon: MENU_ICONS.button,
      label: "Добавить кнопку / ссылку",
      action: () => addCanvasElement("button")
    },
    { divider: true },
    {
      icon: MENU_ICONS.palette,
      label: "Настройки фона слайда...",
      action: () => openSlideBgSettings()
    },
    { divider: true },
    {
      icon: MENU_ICONS.addSlide,
      label: "Создать новый слайд",
      action: () => addNewSlide()
    },
    {
      icon: MENU_ICONS.duplicate,
      label: "Дублировать этот слайд",
      shortcut: "Ctrl+D",
      action: () => duplicateCurrentSlide()
    },
    {
      icon: MENU_ICONS.trash,
      label: "Удалить этот слайд",
      shortcut: "Ctrl+Del",
      danger: true,
      disabled: currentProject.slides.length <= 1,
      action: () => deleteCurrentSlide()
    }
  ]);
}

function updateCanvasSize() {
  const outer = document.querySelector(".canvas-outer");
  const canvas = document.getElementById("slideCanvas");
  if (!outer || !canvas) return;

  const padX = 24;
  const padY = 24;
  const availW = Math.max(320, outer.clientWidth - padX);
  const availH = Math.max(180, outer.clientHeight - padY);
  const targetRatio = 16 / 9;

  let width, height;
  if (availW / availH > targetRatio) {
    height = availH;
    width = height * targetRatio;
  } else {
    width = availW;
    height = width / targetRatio;
  }

  canvas.style.width = `${Math.floor(width)}px`;
  canvas.style.height = `${Math.floor(height)}px`;
}

function renderCanvas() {
  updateCanvasSize();
  const canvas = document.getElementById("slideCanvas");
  if (!canvas) return;
  canvas.innerHTML = "";

  const theme = getCurrentTheme();
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide) return;

  applySlideBackground(canvas, currentSlide, theme);

  if (currentSlide.bgType === "image" && currentSlide.bgImage) {
    const bgUrl = getImagePreviewUrl(currentSlide.bgImage);
    const opacity = (currentSlide.overlayOpacity !== undefined && currentSlide.overlayOpacity !== null && currentSlide.overlayOpacity >= 0) ? currentSlide.overlayOpacity : 0.65;
    const bgDiv = document.createElement("div");
    bgDiv.className = "absolute inset-0 pointer-events-none select-none";
    bgDiv.style.zIndex = "0";
    bgDiv.innerHTML = `
      <div class="absolute inset-0 bg-cover bg-center" style="background-image:url('${bgUrl}');"></div>
      <div class="absolute inset-0" style="background:rgba(0,0,0,${opacity});"></div>
    `;
    canvas.appendChild(bgDiv);
  }

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

    elDiv.addEventListener("mousedown", (e) => {
      if (e.button === 0) startElementDrag(e, el.id);
    });

    elDiv.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectElement(el.id);
      openElementContextMenu(e.clientX, e.clientY, el.id);
    });

    canvas.appendChild(elDiv);
  });

  updateSelectionTools();
}

function getElementCanvasHTML(el, theme) {
  switch (el.type) {
    case "badge":
      return `
        <div class="inline-block px-[1.2cqw] py-[0.4cqw] rounded border font-semibold tracking-wider uppercase pointer-events-auto leading-normal"
             style="background: ${theme.accent400}18; border-color: ${theme.accent400}44; color: ${theme.accent400}; font-size: max(10px, 1.15cqw);"
             contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'text', this.innerText)">
          ${escapeHTML(el.text || 'Бейдж')}
        </div>
      `;

    case "title":
      const titleFs = el.fontSize || 32;
      return `
        <div class="font-serif font-bold text-white leading-tight" style="font-size: max(16px, calc(${titleFs} * 0.085cqw)); text-align: ${el.textAlign || 'left'};">
          <span contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'text', this.innerText)">${escapeHTML(el.text || 'Заголовок')}</span>
          ${el.accentText ? `<br><span class="font-normal italic" style="color:${theme.accent400};" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'accentText', this.innerText)">${escapeHTML(el.accentText)}</span>` : ''}
        </div>
      `;

    case "text":
      const textFs = el.fontSize || 15;
      return `
        <div class="text-slate-300 font-light leading-relaxed" style="font-size: max(11px, calc(${textFs} * 0.085cqw)); text-align: ${el.textAlign || 'left'};"
             contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'text', this.innerText)">
          ${escapeHTML(el.text || 'Текст описания или факта.')}
        </div>
      `;

    case "image":
      const src = el.imageSrc ? getImagePreviewUrl(el.imageSrc) : "";
      let imgWrapStyle = "";
      let innerAspectClass = "aspect-[4/3] max-h-[46cqw]";
      if (el.h) {
        imgWrapStyle = `height: calc(${el.h} * 0.5625cqw); display: flex; flex-direction: column;`;
        innerAspectClass = "flex-1 min-h-0";
      } else if (el.compact) {
        innerAspectClass = "aspect-[16/10] max-h-[15cqw]";
      }
      const fitClass = el.objectFit === "cover" ? "object-cover" : "object-contain";
      return `
        <div class="w-full rounded-2xl bg-slate-900 border border-slate-800 p-[1.2cqw] shadow-2xl overflow-hidden box-border" style="${imgWrapStyle}">
          <div class="w-full ${innerAspectClass} rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
            ${src ? `<img src="${src}" class="w-full h-full ${fitClass} pointer-events-none" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23666%22 stroke-width=%222%22><rect x=%223%22 y=%223%22 width=%2218%22 height=%2218%22 rx=%222%22/><circle cx=%228.5%22 cy=%228.5%22 r=%221.5%22/><path d=%22M21 15l-5-5L5 21%22/></svg>'">` : `
              <div class="flex flex-col items-center justify-center text-slate-500 space-y-1">
                <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span class="text-[max(10px,1.1cqw)]">Загрузите фото справа</span>
              </div>
            `}
          </div>
          ${el.imageCaption ? `<div class="text-center pt-[0.8cqw] text-[max(10px,1.1cqw)] text-slate-400 font-medium shrink-0" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'imageCaption', this.innerText)">${escapeHTML(el.imageCaption)}</div>` : ''}
        </div>
      `;

    case "panel":
      let panelWrapStyle = `background:${theme.panelBg}; border: 1px solid ${theme.borderColor}; font-size: max(11px, 1.2cqw);`;
      if (el.h) {
        panelWrapStyle += ` height: calc(${el.h} * 0.5625cqw); overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;`;
      }
      return `
        <div class="p-[1.6cqw] rounded-2xl panel-box space-y-[0.8cqw]" style="${panelWrapStyle}">
          <div class="font-bold flex items-center gap-1.5" style="color:${theme.accent400}; font-size: max(12px, 1.45cqw);">
            <span class="text-[max(12px,1.5cqw)]">${escapeHTML(el.icon || '✦')}</span>
            <span contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'title', this.innerText)">${escapeHTML(el.title || 'Заголовок панели')}</span>
          </div>
          ${el.description ? `<p class="text-slate-300 leading-relaxed text-[max(11px,1.2cqw)]" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'description', this.innerText)">${escapeHTML(el.description)}</p>` : ''}
          ${(el.bullets && el.bullets.length > 0) ? `
            <ul class="space-y-[0.6cqw] text-slate-300 text-[max(11px,1.2cqw)] pt-0.5">
              ${el.bullets.map(b => `<li class="flex items-start gap-1.5"><span style="color:${theme.accent400}; font-bold;">${escapeHTML(b.icon || '•')}</span><span>${b.title ? `<b>${escapeHTML(b.title)}</b> ` : ''}${escapeHTML(b.text)}</span></li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `;

    case "bullets":
      let bulletsWrapStyle = `background:${theme.panelBg}; border: 1px solid ${theme.borderColor}; font-size: max(11px, 1.2cqw);`;
      if (el.h) {
        bulletsWrapStyle += ` height: calc(${el.h} * 0.5625cqw); overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;`;
      }
      return `
        <div class="p-[1.6cqw] rounded-2xl panel-box space-y-[0.8cqw]" style="${bulletsWrapStyle}">
          ${el.title ? `<div class="font-semibold text-white text-[max(12px,1.45cqw)]" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'title', this.innerText)">${escapeHTML(el.title)}</div>` : ''}
          <ul class="space-y-[0.6cqw] text-slate-300 text-[max(11px,1.2cqw)]">
            ${(el.bullets || []).map(b => `<li class="flex items-start gap-1.5"><span style="color:${theme.accent400}; font-bold;">${escapeHTML(b.icon || '•')}</span><span>${b.title ? `<b>${escapeHTML(b.title)}</b> ` : ''}${escapeHTML(b.text)}</span></li>`).join('')}
          </ul>
        </div>
      `;

    case "quote":
      return `
        <div class="p-[2cqw] rounded-3xl panel-box space-y-[1cqw] text-center" style="background:${theme.panelBg}; border: 1px solid ${theme.borderColor};">
          <div class="text-[max(24px,3.8cqw)] leading-none select-none font-serif opacity-40" style="color:${theme.accent400};">“</div>
          <blockquote class="font-serif italic text-white leading-relaxed text-[max(13px,1.7cqw)]" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'text', this.innerText)">
            «${escapeHTML(el.text || 'Текст важной мысли или цитаты')}»
          </blockquote>
          <div class="pt-[0.8cqw] border-t border-slate-800">
            <div class="font-bold font-serif text-[max(11px,1.3cqw)]" style="color:${theme.accent400};" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'quoteAuthor', this.innerText)">${escapeHTML(el.quoteAuthor || 'Автор цитаты')}</div>
            <div class="text-[max(10px,1.1cqw)] text-slate-400 mt-0.5" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'quoteRole', this.innerText)">${escapeHTML(el.quoteRole || 'Роль / Источник')}</div>
          </div>
        </div>
      `;

    case "metric":
      const mTrend = el.trend ? `<span class="inline-flex items-center gap-1 px-[0.8cqw] py-[0.2cqw] rounded-full font-bold text-[max(9.5px,1.0cqw)] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'trend', this.innerText)">${escapeHTML(el.trend)}</span>` : '';
      const mIcon = el.icon ? `<span>${escapeHTML(el.icon)}</span> ` : '';
      const mVal = el.value || el.text || '85%';
      const mTitle = el.title || 'Ключевой показатель';
      return `
        <div class="p-[1.6cqw] rounded-2xl panel-box space-y-[0.6cqw] overflow-hidden" style="background:${theme.panelBg}; border:1px solid ${theme.borderColor};">
          <div class="flex items-center justify-between text-slate-400 font-medium text-[max(11px,1.2cqw)]">
            <span class="flex items-center gap-1.5">${mIcon}<span contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'title', this.innerText)">${escapeHTML(mTitle)}</span></span>
            ${mTrend}
          </div>
          <div class="font-serif font-black tracking-tight leading-none" style="font-size:max(24px, 3.4cqw); color:${theme.accent400};" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'value', this.innerText)">
            ${escapeHTML(mVal)}
          </div>
        </div>
      `;

    case "timeline":
      const tBadge = el.stepBadge || 'Шаг 01';
      const tTitle = el.title || 'Этап развития';
      const tDesc = el.description || 'Описание этапа';
      return `
        <div class="p-[1.6cqw] rounded-2xl panel-box space-y-[0.8cqw] relative" style="background:${theme.panelBg}; border:1px solid ${theme.borderColor};">
          <div class="flex items-center gap-2">
            <span class="px-[1cqw] py-[0.3cqw] rounded-lg font-mono font-bold text-[max(11px,1.2cqw)]" style="background:${theme.accent400}25; color:${theme.accent400}; border:1px solid ${theme.accent400}50;" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'stepBadge', this.innerText)">${escapeHTML(tBadge)}</span>
            <span class="font-bold text-white text-[max(12px,1.45cqw)]" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'title', this.innerText)">${escapeHTML(tTitle)}</span>
          </div>
          <p class="text-slate-300 leading-relaxed text-[max(11px,1.2cqw)]" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'description', this.innerText)">${escapeHTML(tDesc)}</p>
        </div>
      `;

    case "callout":
      const cIcon = el.icon || '💡';
      let cBorder = theme.accent400;
      if (el.variant === 'warning') cBorder = '#F59E0B';
      else if (el.variant === 'danger') cBorder = '#EF4444';
      else if (el.variant === 'success') cBorder = '#10B981';
      else if (el.variant === 'info') cBorder = '#38BDF8';
      const cTitle = el.title || 'Важная мысль';
      const cText = el.text || el.description || 'Текст пояснения';
      return `
        <div class="p-[1.6cqw] rounded-2xl relative shadow-xl space-y-[0.5cqw]" style="background:${theme.panelBg}; border:1px solid ${cBorder}22; border-left: 5px solid ${cBorder};">
          <div class="flex items-center gap-2">
            <span class="text-[max(14px,1.6cqw)]">${escapeHTML(cIcon)}</span>
            <span class="font-bold text-white text-[max(12px,1.45cqw)]" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'title', this.innerText)">${escapeHTML(cTitle)}</span>
          </div>
          <p class="text-slate-300 leading-relaxed text-[max(11px,1.2cqw)]" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'text', this.innerText)">${escapeHTML(cText)}</p>
        </div>
      `;

    case "divider":
      const dCenter = el.text ? `<span class="px-2.5 py-0.5 rounded-full text-[max(9px,0.95cqw)] font-bold tracking-widest uppercase" style="background:${theme.accent400}15; color:${theme.accent400}; border:1px solid ${theme.accent400}35;" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'text', this.innerText)">${escapeHTML(el.text)}</span>` : '';
      return `
        <div class="w-full flex items-center gap-3 my-[0.3cqw] py-[0.2cqw] pointer-events-auto">
          <div class="h-[2px] flex-1 rounded-full" style="background: linear-gradient(90deg, transparent, ${theme.accent400}, transparent);"></div>
          ${dCenter}
          <div class="h-[2px] flex-1 rounded-full" style="background: linear-gradient(90deg, transparent, ${theme.accent400}, transparent);"></div>
        </div>
      `;

    case "code":
      const cdLang = el.language || 'Bash';
      const cdTitle = el.title || 'terminal.sh';
      const cdCode = el.code || el.text || '# code';
      return `
        <div class="w-full rounded-2xl bg-[#090D16] border border-slate-800 p-[1.4cqw] shadow-2xl font-mono overflow-hidden box-border">
          <div class="flex items-center justify-between pb-[0.8cqw] mb-[0.8cqw] border-b border-slate-800/80 text-[max(10px,1.05cqw)] text-slate-400">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              <span class="ml-2 font-medium text-slate-300" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'title', this.innerText)">${escapeHTML(cdTitle)}</span>
            </div>
            <span class="px-2 py-0.5 rounded bg-slate-800/80 font-bold uppercase text-[max(9px,0.95cqw)]" style="color:${theme.accent400};">${escapeHTML(cdLang)}</span>
          </div>
          <pre class="text-slate-200 text-[max(10.5px,1.15cqw)] leading-relaxed whitespace-pre-wrap overflow-x-auto m-0" contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'code', this.innerText)"><code>${escapeHTML(cdCode)}</code></pre>
        </div>
      `;

    case "button":
      const bText = el.text || 'Подробнее';
      const bIcon = el.icon || '↗';
      return `
        <div class="inline-block pointer-events-auto">
          <a href="javascript:void(0)" class="inline-flex items-center gap-2 px-[1.6cqw] py-[0.7cqw] rounded-xl font-bold transition shadow-lg text-[max(11px,1.25cqw)]" style="background:${theme.accent400}; color:#000; box-shadow:0 0 20px ${theme.accent400}44;">
            <span contenteditable="true" onblur="handleInlineTextBlur('${el.id}', 'text', this.innerText)">${escapeHTML(bText)}</span>
            <span>${escapeHTML(bIcon)}</span>
          </a>
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

      newLeft = Math.max(0, Math.min(newLeft, 100));
      newTop = Math.max(0, Math.min(newTop, 100));

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
        newWidth = Math.max(4, Math.min(newWidth, 100 - el.x));
        el.w = newWidth;
      }
      if (resizeHandleType.includes("w")) {
        let newWidth = Math.round(elementStartWidth - deltaXPercent);
        let newLeft = Math.round(elementStartLeft + deltaXPercent);
        if (newWidth >= 4 && newLeft >= 0) {
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

  const canvas = document.getElementById("slideCanvas");
  if (canvas) {
    canvas.addEventListener("contextmenu", (e) => {
      if (e.target.closest(".canvas-element")) return;
      e.preventDefault();
      clearSelection();
      openCanvasContextMenu(e.clientX, e.clientY);
    });
  }

  const canvasOuter = document.querySelector(".canvas-outer");
  if (canvasOuter) {
    canvasOuter.addEventListener("contextmenu", (e) => {
      if (e.target.closest(".canvas-element") || e.target.closest("#slideCanvas")) return;
      e.preventDefault();
      clearSelection();
      openCanvasContextMenu(e.clientX, e.clientY);
    });
  }
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

    case "metric":
      newEl.x = 6;
      newEl.y = 48;
      newEl.w = 40;
      newEl.title = "Рост эффективности";
      newEl.value = "+140%";
      newEl.trend = "↑ за 12 месяцев";
      newEl.icon = "▲";
      break;

    case "timeline":
      newEl.x = 6;
      newEl.y = 48;
      newEl.w = 55;
      newEl.stepBadge = "ШАГ 01";
      newEl.title = "Разработка концепции";
      newEl.description = "Определение ключевых целей проекта, сбор требований и первичное планирование архитектуры.";
      break;

    case "callout":
      newEl.x = 6;
      newEl.y = 48;
      newEl.w = 58;
      newEl.icon = "💡";
      newEl.title = "Важное замечание";
      newEl.text = "Ключевой фактор успеха — регулярная проверка гипотез и фокус на ценности для пользователя.";
      newEl.variant = "accent";
      break;

    case "divider":
      newEl.x = 6;
      newEl.y = 35;
      newEl.w = 88;
      newEl.text = "РАЗДЕЛ II • АНАЛИЗ";
      break;

    case "code":
      newEl.x = 6;
      newEl.y = 42;
      newEl.w = 56;
      newEl.title = "terminal - bash";
      newEl.language = "BASH";
      newEl.code = "$ git clone https://github.com/project\n$ npm install\n$ npm run build";
      break;

    case "button":
      newEl.x = 6;
      newEl.y = 75;
      newEl.w = 32;
      newEl.text = "Перейти к материалу";
      newEl.icon = "↗";
      newEl.url = "https://example.com";
      newEl.variant = "primary";
      break;
  }

  currentSlide.elements.push(newEl);
  renderCanvas();
  selectElement(newEl.id);
  renderDeckList();
}

function triggerNewImageUpload() {
  openAddImageModal();
}

function openAddImageModal(initialTab = 'url') {
  const modal = document.getElementById("addImageModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  switchAddImageTab(initialTab);

  const urlInput = document.getElementById("modalImageUrlInput");
  const captionInput = document.getElementById("modalImageCaptionInput");
  if (urlInput) {
    urlInput.value = "";
    setTimeout(() => urlInput.focus(), 80);
  }
  if (captionInput) captionInput.value = "";
  resetModalImageUrlPreview();
  initModalDropzone();
}

function closeAddImageModal() {
  const modal = document.getElementById("addImageModal");
  if (modal) modal.classList.add("hidden");
}

function switchAddImageTab(tab) {
  const urlBtn = document.getElementById("tabBtnImageUrl");
  const fileBtn = document.getElementById("tabBtnImageFile");
  const urlPanel = document.getElementById("panelAddImageUrl");
  const filePanel = document.getElementById("panelAddImageFile");

  if (tab === 'file') {
    if (urlBtn) urlBtn.className = "py-2 rounded-lg flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200 transition cursor-pointer";
    if (fileBtn) fileBtn.className = "py-2 rounded-lg flex items-center justify-center gap-2 text-amber-400 bg-slate-800 border border-amber-500/30 shadow transition cursor-pointer";
    if (urlPanel) urlPanel.classList.add("hidden");
    if (filePanel) filePanel.classList.remove("hidden");
  } else {
    if (fileBtn) fileBtn.className = "py-2 rounded-lg flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200 transition cursor-pointer";
    if (urlBtn) urlBtn.className = "py-2 rounded-lg flex items-center justify-center gap-2 text-amber-400 bg-slate-800 border border-amber-500/30 shadow transition cursor-pointer";
    if (filePanel) filePanel.classList.add("hidden");
    if (urlPanel) urlPanel.classList.remove("hidden");
    const input = document.getElementById("modalImageUrlInput");
    if (input) setTimeout(() => input.focus(), 50);
  }
}

let modalUrlPreviewTimer = null;

function handleModalImageUrlInput() {
  clearTimeout(modalUrlPreviewTimer);
  modalUrlPreviewTimer = setTimeout(() => {
    updateModalImageUrlPreview();
  }, 250);
}

function resetModalImageUrlPreview() {
  const ph = document.getElementById("modalImageUrlPlaceholder");
  const img = document.getElementById("modalImageUrlImg");
  const err = document.getElementById("modalImageUrlError");
  if (ph) ph.classList.remove("hidden");
  if (img) {
    img.classList.add("hidden");
    img.src = "";
  }
  if (err) err.classList.add("hidden");
}

function updateModalImageUrlPreview() {
  const input = document.getElementById("modalImageUrlInput");
  const val = input ? input.value.trim() : "";
  const ph = document.getElementById("modalImageUrlPlaceholder");
  const img = document.getElementById("modalImageUrlImg");
  const err = document.getElementById("modalImageUrlError");

  if (!val) {
    resetModalImageUrlPreview();
    return;
  }

  if (ph) ph.classList.add("hidden");
  if (err) err.classList.add("hidden");

  img.onload = () => {
    img.classList.remove("hidden");
    if (err) err.classList.add("hidden");
    if (ph) ph.classList.add("hidden");
  };
  img.onerror = () => {
    img.classList.add("hidden");
    if (err) err.classList.remove("hidden");
    if (ph) ph.classList.add("hidden");
  };
  img.src = val;
}

function submitModalImageUrl() {
  const input = document.getElementById("modalImageUrlInput");
  const captionInput = document.getElementById("modalImageCaptionInput");
  const url = input ? input.value.trim() : "";
  const caption = captionInput ? captionInput.value.trim() : "";

  if (!url) {
    showCustomToast({
      type: "warning",
      title: "Ссылка не указана",
      message: "Пожалуйста, укажите прямую ссылку на фото"
    });
    if (input) input.focus();
    return;
  }

  addImageElementToSlide(url, caption);
  closeAddImageModal();
  showCustomToast({
    type: "success",
    title: "Фото добавлено",
    message: "Изображение по ссылке успешно размещено на слайде"
  });
}

function addImageElementToSlide(src, caption) {
  const currentSlide = currentProject.slides[activeSlideIndex];
  if (!currentSlide) return null;

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
    imageSrc: src,
    imageCaption: caption || ""
  };
  currentSlide.elements.push(newEl);
  renderCanvas();
  selectElement(newEl.id);
  renderDeckList();
  return newEl;
}

function triggerModalFileInput() {
  const fileInput = document.getElementById("modalFileInput");
  if (fileInput) {
    fileInput.value = "";
    fileInput.click();
  }
}

async function handleModalFileChosen(e) {
  if (!e.target.files || e.target.files.length === 0) return;
  const files = Array.from(e.target.files);
  await uploadFilesFromModal(files);
}

async function uploadFilesFromModal(files) {
  if (!files || files.length === 0) return;
  closeAddImageModal();
  showCustomToast({
    type: "info",
    title: "Загрузка фото...",
    message: `Загружаем ${files.length} файл(ов) на слайд`
  });
  await uploadMultipleFilesToSlide(files);
  showCustomToast({
    type: "success",
    title: "Фото загружены",
    message: `Успешно добавлено ${files.length} изображений`
  });
}

let modalDropzoneInitialized = false;

function initModalDropzone() {
  if (modalDropzoneInitialized) return;
  modalDropzoneInitialized = true;

  const dropzone = document.getElementById("modalImageDropzone");
  if (!dropzone) return;

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.add("border-amber-400", "bg-amber-500/10");
  });

  dropzone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.remove("border-amber-400", "bg-amber-500/10");
  });

  dropzone.addEventListener("drop", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.remove("border-amber-400", "bg-amber-500/10");

    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
      if (files.length > 0) {
        await uploadFilesFromModal(files);
      }
    }
  });
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
    const slideshow = document.getElementById("slideshowModal");
    const isSlideshowOpen = slideshow && !slideshow.classList.contains("hidden");

    if (isSlideshowOpen) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeSlideshow();
        return;
      }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        forwardSlideshowNav("nextSlide");
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        forwardSlideshowNav("prevSlide");
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        forwardSlideshowNav("firstSlide");
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        forwardSlideshowNav("lastSlide");
        return;
      }
      return;
    }

    if (e.key === "Escape") {
      const ctxMenu = document.getElementById("customContextMenu");
      if (ctxMenu && !ctxMenu.classList.contains("hidden")) {
        hideContextMenu();
        return;
      }
      const exportModal = document.getElementById("exportModal");
      const aiModal = document.getElementById("aiModal");
      if (exportModal && !exportModal.classList.contains("hidden")) {
        closeExportModal();
        return;
      }
      if (aiModal && !aiModal.classList.contains("hidden")) {
        closeAIModal();
        return;
      }
      const addImageModal = document.getElementById("addImageModal");
      if (addImageModal && !addImageModal.classList.contains("hidden")) {
        closeAddImageModal();
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
        copySelectedElement();
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && (e.key === "x" || e.key === "ч" || e.key === "X")) {
      if (selectedElementId) {
        e.preventDefault();
        cutSelectedElement();
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
    el.x = Math.max(0, Math.min(100, el.x + dx));
    el.y = Math.max(0, Math.min(100, el.y + dy));
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

  const theme = getCurrentTheme();
  const el = currentSlide.elements.find(e => e.id === selectedElementId);

  if (!el) {
    if (badge) badge.innerText = "Слайд #" + (activeSlideIndex + 1);

    const bgType = currentSlide.bgType || "theme";
    const bgColor = currentSlide.bgColor || theme.darkBg;
    const bgGradient = currentSlide.bgGradient || BG_GRADIENT_PRESETS[0].value;
    const bgImage = currentSlide.bgImage || "";
    const overlayOpacity = (currentSlide.overlayOpacity !== undefined && currentSlide.overlayOpacity !== null) ? currentSlide.overlayOpacity : 0.65;
    const bgPattern = currentSlide.bgPattern || "dots";

    container.innerHTML = `
      <div class="space-y-3.5 text-slate-300">
        <div>
          <label class="block text-[11px] font-semibold text-slate-300 mb-1">Название слайда:</label>
          <input type="text" class="input-luxury text-xs" value="${escapeHTML(currentSlide.title || '')}" oninput="updateSlideTitle(this.value)">
        </div>

        <div class="pt-2 border-t border-slate-800 space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              ${MENU_ICONS.palette}
              <span>Фон слайда</span>
            </span>
            <span class="text-[10px] text-slate-400 font-mono">${bgType}</span>
          </div>

          <!-- Переключатель типа фона -->
          <div class="grid grid-cols-5 gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-[10px] font-semibold text-center">
            <button onclick="setSlideBgType('theme')" class="py-1 rounded cursor-pointer transition ${bgType === 'theme' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'}">Тема</button>
            <button onclick="setSlideBgType('color')" class="py-1 rounded cursor-pointer transition ${bgType === 'color' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'}">Цвет</button>
            <button onclick="setSlideBgType('gradient')" class="py-1 rounded cursor-pointer transition ${bgType === 'gradient' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'}">Град.</button>
            <button onclick="setSlideBgType('image')" class="py-1 rounded cursor-pointer transition ${bgType === 'image' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'}">Фото</button>
            <button onclick="setSlideBgType('pattern')" class="py-1 rounded cursor-pointer transition ${bgType === 'pattern' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'}">Узор</button>
          </div>

          <!-- Настройки в зависимости от типа фона -->
          ${bgType === 'theme' ? `
            <div class="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <div class="text-white font-medium">Фон наследуется от активной темы:</div>
              <div class="flex items-center gap-2 pt-1">
                <span class="w-4 h-4 rounded-full border border-white/20 shadow" style="background:${theme.darkBg};"></span>
                <span class="font-mono text-xs text-slate-300">${theme.darkBg}</span>
              </div>
            </div>
          ` : ''}

          ${bgType === 'color' ? `
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <input type="color" class="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer p-0.5" value="${bgColor}" oninput="setSlideBackground('bgColor', this.value)">
                <input type="text" class="input-luxury text-xs font-mono flex-1" value="${bgColor}" oninput="setSlideBackground('bgColor', this.value)">
              </div>
              <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Палитра оттенков:</div>
              <div class="grid grid-cols-5 gap-1.5">
                ${BG_COLOR_PRESETS.map(c => `
                  <button onclick="setSlideBackground('bgColor', '${c}')" class="w-full h-6 rounded border ${c === bgColor ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-800 hover:border-slate-600'} cursor-pointer transition" style="background-color:${c};" title="${c}"></button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${bgType === 'gradient' ? `
            <div class="space-y-2">
              <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Дизайнерские градиенты:</div>
              <div class="grid grid-cols-2 gap-1.5">
                ${BG_GRADIENT_PRESETS.map(g => `
                  <button onclick="setSlideBackground('bgGradient', '${g.value}')" class="h-10 rounded-lg p-1.5 border text-left flex flex-col justify-end transition cursor-pointer ${g.value === bgGradient ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-800 hover:border-slate-600'}" style="background:${g.value};">
                    <span class="text-[9.5px] font-bold text-white drop-shadow">${g.name}</span>
                  </button>
                `).join('')}
              </div>
              <div class="pt-1">
                <label class="block text-[10px] text-slate-400 mb-0.5">Пользовательский CSS-градиент:</label>
                <input type="text" class="input-luxury text-[11px] font-mono" value="${escapeHTML(bgGradient)}" oninput="setSlideBackground('bgGradient', this.value)">
              </div>
            </div>
          ` : ''}

          ${bgType === 'image' ? `
            <div class="space-y-2.5">
              <button onclick="triggerSlideBgImageUpload()" class="w-full py-2 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/35 text-sky-300 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition">
                <svg class="w-4 h-4 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                <span>Загрузить фон с компьютера</span>
              </button>

              <div>
                <label class="block text-[10px] text-slate-400 mb-0.5">Или ссылка / файл:</label>
                <input type="text" class="input-luxury text-xs font-mono" placeholder="assets/photo.jpg или https://..." value="${escapeHTML(bgImage)}" oninput="setSlideBackground('bgImage', this.value)">
              </div>

              <div>
                <div class="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                  <span>Затемнение фона:</span>
                  <span class="font-mono font-bold text-amber-400" id="overlayOpacityLabel">${Math.round(overlayOpacity * 100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" class="w-full accent-amber-400 cursor-pointer" value="${overlayOpacity}" oninput="setSlideBackground('overlayOpacity', parseFloat(this.value)); document.getElementById('overlayOpacityLabel').innerText = Math.round(this.value * 100) + '%';">
                <div class="text-[9.5px] text-slate-500 mt-0.5">Рекомендуется 60-70% для удобного чтения текста</div>
              </div>
            </div>
          ` : ''}

          ${bgType === 'pattern' ? `
            <div class="space-y-2">
              <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Тип узора:</div>
              <div class="grid grid-cols-2 gap-1.5">
                ${BG_PATTERNS.map(p => `
                  <button onclick="setSlideBackground('bgPattern', '${p.id}')" class="p-2 rounded-lg border text-left transition cursor-pointer ${p.id === bgPattern ? 'bg-amber-500/15 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}">
                    <div class="text-xs font-bold">${p.name}</div>
                    <div class="text-[9px] text-slate-400">${p.desc}</div>
                  </button>
                `).join('')}
              </div>
              <div class="pt-1">
                <label class="block text-[10px] text-slate-400 mb-0.5">Базовый цвет под узором:</label>
                <div class="flex items-center gap-2">
                  <input type="color" class="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer p-0.5" value="${bgColor}" oninput="setSlideBackground('bgColor', this.value)">
                  <input type="text" class="input-luxury text-xs font-mono flex-1" value="${bgColor}" oninput="setSlideBackground('bgColor', this.value)">
                </div>
              </div>
            </div>
          ` : ''}

          <div class="pt-2">
            <button onclick="applyBgToAllSlides()" class="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition">
              <span>🌟 Применить этот фон ко всем слайдам</span>
            </button>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-800 text-[11px] space-y-1 text-slate-400">
          <div class="text-amber-400 font-bold flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Советы по оформлению:</span>
          </div>
          <div>• Нажмите на любой блок для редактирования его свойств.</div>
          <div>• Фон синхронизируется с презентацией 1 к 1.</div>
          <div>• Добавляйте метрики, этапы, выноски и терминалы.</div>
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
    quote: "Цитата",
    metric: "Метрика / Факт",
    timeline: "Этап / Хронология",
    callout: "Выноска / Акцент",
    divider: "Разделитель",
    code: "Окно кода / Консоль",
    button: "Кнопка / Ссылка"
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
            <label class="block text-[11px] text-slate-400 mb-0.5">Режим заполнения:</label>
            <select class="input-luxury text-xs" onchange="updateElementProp('objectFit', this.value)">
              <option value="contain" ${el.objectFit !== 'cover' ? 'selected' : ''}>Вписать целиком (contain)</option>
              <option value="cover" ${el.objectFit === 'cover' ? 'selected' : ''}>Заполнить рамку без полей (cover)</option>
            </select>
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

    case "metric":
      return `
        <div class="space-y-3">
          <div>
            <label class="block text-[11px] text-amber-400 mb-0.5 font-semibold">Значение (показатель / число):</label>
            <input type="text" class="input-luxury font-serif font-black text-amber-300 text-base" value="${escapeHTML(el.value || el.text || '')}" oninput="updateElementProp('value', this.value)">
          </div>
          <div>
            <label class="block text-[11px] text-slate-300 mb-0.5">Подпись / название метрики:</label>
            <input type="text" class="input-luxury text-xs" value="${escapeHTML(el.title || '')}" oninput="updateElementProp('title', this.value)">
          </div>
          <div>
            <label class="block text-[11px] text-emerald-400 mb-0.5">Динамика / тренд (необязательно):</label>
            <input type="text" class="input-luxury text-xs text-emerald-300 font-mono" placeholder="например: ↑ +45% за год" value="${escapeHTML(el.trend || '')}" oninput="updateElementProp('trend', this.value)">
          </div>
          <div>
            <label class="block text-[11px] text-slate-400 mb-0.5">Иконка:</label>
            <input type="text" class="input-luxury !w-16 text-center text-xs" placeholder="▲" value="${escapeHTML(el.icon || '▲')}" oninput="updateElementProp('icon', this.value)">
          </div>
        </div>
      `;

    case "timeline":
      return `
        <div class="space-y-3">
          <div>
            <label class="block text-[11px] text-amber-400 mb-0.5 font-semibold">Номер или дата этапа:</label>
            <input type="text" class="input-luxury font-mono font-bold text-amber-300 text-xs" placeholder="ШАГ 01 или 2024" value="${escapeHTML(el.stepBadge || 'Шаг 01')}" oninput="updateElementProp('stepBadge', this.value)">
          </div>
          <div>
            <label class="block text-[11px] text-slate-300 mb-0.5">Название этапа:</label>
            <input type="text" class="input-luxury text-xs font-bold" value="${escapeHTML(el.title || '')}" oninput="updateElementProp('title', this.value)">
          </div>
          <div>
            <label class="block text-[11px] text-slate-300 mb-0.5">Описание этапа:</label>
            <textarea rows="3" class="input-luxury text-xs resize-none" oninput="updateElementProp('description', this.value)">${escapeHTML(el.description || '')}</textarea>
          </div>
        </div>
      `;

    case "callout":
      return `
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <div>
              <label class="block text-[10px] text-slate-400 mb-0.5">Иконка:</label>
              <input type="text" class="input-luxury !w-12 text-center text-sm" value="${escapeHTML(el.icon || '💡')}" oninput="updateElementProp('icon', this.value)">
            </div>
            <div class="flex-1">
              <label class="block text-[10px] text-slate-400 mb-0.5">Стиль / акцент:</label>
              <select class="input-luxury text-xs" onchange="updateElementProp('variant', this.value)">
                <option value="accent" ${el.variant === 'accent' || !el.variant ? 'selected' : ''}>✦ Акцент темы</option>
                <option value="warning" ${el.variant === 'warning' ? 'selected' : ''}>⚠️ Внимание (Оранжевый)</option>
                <option value="danger" ${el.variant === 'danger' ? 'selected' : ''}>🔥 Важно (Красный)</option>
                <option value="success" ${el.variant === 'success' ? 'selected' : ''}>✅ Успех (Зеленый)</option>
                <option value="info" ${el.variant === 'info' ? 'selected' : ''}>ℹ️ Инфо (Голубой)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-[11px] text-slate-300 mb-0.5">Заголовок выноски:</label>
            <input type="text" class="input-luxury text-xs font-bold" value="${escapeHTML(el.title || '')}" oninput="updateElementProp('title', this.value)">
          </div>
          <div>
            <label class="block text-[11px] text-slate-300 mb-0.5">Текст мысли:</label>
            <textarea rows="3" class="input-luxury text-xs resize-none" oninput="updateElementProp('text', this.value)">${escapeHTML(el.text || el.description || '')}</textarea>
          </div>
        </div>
      `;

    case "divider":
      return `
        <div class="space-y-3">
          <div>
            <label class="block text-[11px] text-slate-300 mb-0.5">Центральная плашка (необязательно):</label>
            <input type="text" class="input-luxury text-xs uppercase tracking-wider" placeholder="например: РАЗДЕЛ II" value="${escapeHTML(el.text || '')}" oninput="updateElementProp('text', this.value)">
          </div>
          <div class="text-[10px] text-slate-500">Разделитель создает аккуратную неоновую линию в стилистике темы.</div>
        </div>
      `;

    case "code":
      return `
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <label class="block text-[10px] text-slate-400 mb-0.5">Заголовок окна:</label>
              <input type="text" class="input-luxury text-xs font-mono" placeholder="terminal.sh" value="${escapeHTML(el.title || '')}" oninput="updateElementProp('title', this.value)">
            </div>
            <div class="w-24">
              <label class="block text-[10px] text-slate-400 mb-0.5">Язык:</label>
              <input type="text" class="input-luxury text-xs uppercase font-mono text-center" placeholder="BASH" value="${escapeHTML(el.language || 'BASH')}" oninput="updateElementProp('language', this.value)">
            </div>
          </div>
          <div>
            <label class="block text-[11px] text-slate-300 mb-0.5">Код / команды:</label>
            <textarea rows="5" class="input-luxury text-xs font-mono resize-none leading-relaxed" oninput="updateElementProp('code', this.value)">${escapeHTML(el.code || el.text || '')}</textarea>
          </div>
        </div>
      `;

    case "button":
      return `
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <label class="block text-[11px] text-slate-300 mb-0.5">Текст кнопки:</label>
              <input type="text" class="input-luxury text-xs font-bold" value="${escapeHTML(el.text || '')}" oninput="updateElementProp('text', this.value)">
            </div>
            <div class="w-16">
              <label class="block text-[11px] text-slate-300 mb-0.5">Стрелка:</label>
              <input type="text" class="input-luxury text-xs text-center" value="${escapeHTML(el.icon || '↗')}" oninput="updateElementProp('icon', this.value)">
            </div>
          </div>
          <div>
            <label class="block text-[11px] text-slate-400 mb-0.5">Ссылка URL (откроется в новой вкладке):</label>
            <input type="text" class="input-luxury text-xs font-mono" placeholder="https://..." value="${escapeHTML(el.url || '')}" oninput="updateElementProp('url', this.value)">
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
  if (selectedElementId !== null) {
    selectedElementId = null;
    renderCanvas();
    renderInspector();
  }

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
      frame.onload = () => {
        try {
          frame.contentWindow?.focus();
          frame.focus();
        } catch (e) {}
      };
      frame.srcdoc = htmlText;
      modal.classList.remove("hidden");

      setTimeout(() => {
        try {
          frame.contentWindow?.focus();
          frame.focus();
        } catch (e) {}
      }, 50);
      setTimeout(() => {
        try {
          frame.contentWindow?.focus();
          frame.focus();
        } catch (e) {}
      }, 200);
    }
  } catch (err) {
    console.error("Slideshow preview error:", err);
  }
}

function forwardSlideshowNav(action) {
  const frame = document.getElementById("slideshowFrame");
  if (!frame) return;
  try {
    const cw = frame.contentWindow;
    if (cw) {
      if (action === "nextSlide" && typeof cw.nextSlide === "function") {
        cw.nextSlide();
      } else if (action === "prevSlide" && typeof cw.prevSlide === "function") {
        cw.prevSlide();
      } else if (action === "firstSlide" && typeof cw.goToSlide === "function") {
        cw.goToSlide(1);
      } else if (action === "lastSlide" && typeof cw.goToSlide === "function") {
        cw.goToSlide(cw.totalSlides || 999);
      } else {
        cw.postMessage(action, "*");
      }
      cw.focus();
    }
  } catch (err) {
    try {
      frame.contentWindow?.postMessage(action, "*");
    } catch (e) {}
  }
}

function closeSlideshow() {
  const modal = document.getElementById("slideshowModal");
  const frame = document.getElementById("slideshowFrame");
  if (modal) modal.classList.add("hidden");
  if (frame) frame.srcdoc = "";
}

function openExportModal() {
  if (selectedElementId !== null) {
    selectedElementId = null;
    renderCanvas();
    renderInspector();
  }

  const modal = document.getElementById("exportModal");
  const resultBox = document.getElementById("exportResultBox");
  if (resultBox) resultBox.classList.add("hidden");

  const nameInput = document.getElementById("exportFileName");
  if (nameInput && currentProject.title) {
    const cleanTitle = currentProject.title.toLowerCase().replace(/[^a-zа-я0-9]/gi, "_").replace(/_+/g, "_").slice(0, 30);
    nameInput.value = cleanTitle || "презентация";
  }

  const uiToggle = document.getElementById("exportToggleUI");
  const voiceToggle = document.getElementById("exportToggleVoice");
  const voiceRow = document.getElementById("exportVoiceOptionRow");
  if (uiToggle) uiToggle.checked = true;
  if (voiceToggle) {
    voiceToggle.checked = true;
    voiceToggle.disabled = false;
  }
  if (voiceRow) {
    voiceRow.classList.remove("opacity-40", "pointer-events-none");
  }

  if (modal) modal.classList.remove("hidden");
}

function handleExportUIToggle(isChecked) {
  const voiceToggle = document.getElementById("exportToggleVoice");
  const voiceRow = document.getElementById("exportVoiceOptionRow");
  if (!voiceToggle) return;

  if (!isChecked) {
    // ВНИМАНИЕ: если интерфейс отключается, управление голосом также выключается
    voiceToggle.checked = false;
    voiceToggle.disabled = true;
    if (voiceRow) {
      voiceRow.classList.add("opacity-40", "pointer-events-none");
    }
  } else {
    voiceToggle.disabled = false;
    voiceToggle.checked = true;
    if (voiceRow) {
      voiceRow.classList.remove("opacity-40", "pointer-events-none");
    }
  }
}

async function chooseExportFolder() {
  const currentDir = document.getElementById("exportOutputDir").value.trim();
  try {
    const res = await fetch("/api/choose-folder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentDir: currentDir })
    });
    const data = await res.json();
    if (data.folder) {
      document.getElementById("exportOutputDir").value = data.folder;
    }
  } catch (err) {
    console.error("Failed to select folder:", err);
  }
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

  const uiToggle = document.getElementById("exportToggleUI");
  const voiceToggle = document.getElementById("exportToggleVoice");
  const includeUI = uiToggle ? uiToggle.checked : true;
  const enableVoiceControl = includeUI && voiceToggle ? voiceToggle.checked : false;

  submitBtn.disabled = true;
  submitBtn.innerText = "Генерация...";

  try {
    const reqBody = {
      presentation: currentProject,
      outputDir: outDir,
      fileName: fileName,
      assetsSubdir: assetsDir,
      includeUI: includeUI,
      enableVoiceControl: enableVoiceControl
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
      if (data.assetsPath) {
        resultPath.innerText = `Файл: ${data.filePath}\nПапка фото: ${data.assetsPath}`;
      } else {
        resultPath.innerText = `Файл: ${data.filePath}\nФото: онлайн-ссылки/встроены (папка ассетов не требовалась)`;
      }
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
  if (selectedElementId !== null) {
    selectedElementId = null;
    renderCanvas();
    renderInspector();
  }

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
  let pendingCoords = null;

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || line === "SANICHPOINT_AI") continue;

    // Check for global presentation header tags before slides
    if (!currentSlide && /^TITLE\s*:\s*/i.test(line)) {
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
      pendingCoords = null;
      continue;
    }

    if (!currentSlide) {
      currentSlide = {
        id: 1,
        title: "Введение",
        rawItems: []
      };
      project.slides.push(currentSlide);
      pendingCoords = null;
    }

    // Direct coordinate directive: POS: x | y | w | [h] or AT: x, y, w
    if (/^(?:POS|AT|COORDS?|POSITION)\s*:\s*/i.test(line)) {
      const cStr = line.replace(/^(?:POS|AT|COORDS?|POSITION)\s*:\s*/i, "").trim();
      const m = cStr.match(/^([0-9.]+)[,\s|]+([0-9.]+)[,\s|]+([0-9.]+)(?:[,\s|]+([0-9.]+))?/);
      if (m) {
        pendingCoords = {
          x: parseFloat(m[1]),
          y: parseFloat(m[2]),
          w: parseFloat(m[3]),
          h: m[4] ? parseFloat(m[4]) : undefined
        };
      }
      continue;
    }

    // Extract inline coordinate suffix @ x, y, w, [h]
    let cleanLine = line;
    let inlineCoords = null;
    const atMatch = line.match(/\s+@\s*([0-9.]+)(?:[,\s|]+([0-9.]+))(?:[,\s|]+([0-9.]+))(?:[,\s|]+([0-9.]+))?\s*$/);
    if (atMatch) {
      cleanLine = line.substring(0, atMatch.index).trim();
      inlineCoords = {
        x: parseFloat(atMatch[1]),
        y: parseFloat(atMatch[2]),
        w: parseFloat(atMatch[3]),
        h: atMatch[4] ? parseFloat(atMatch[4]) : undefined
      };
    }
    const activeCoords = inlineCoords || pendingCoords;

    function attachCoords(item) {
      if (activeCoords) {
        item.x = activeCoords.x;
        item.y = activeCoords.y;
        item.w = activeCoords.w;
        if (activeCoords.h !== undefined) item.h = activeCoords.h;
        pendingCoords = null;
      }
      return item;
    }

    if (/^LAYOUT\s*:\s*/i.test(cleanLine)) {
      currentSlide.layout = cleanLine.replace(/^LAYOUT\s*:\s*/i, "").trim().toLowerCase();
      continue;
    }

    if (/^ALIGN\s*:\s*/i.test(cleanLine)) {
      currentSlide.align = cleanLine.replace(/^ALIGN\s*:\s*/i, "").trim().toLowerCase();
      continue;
    }

    if (/^BG\s*:\s*/i.test(cleanLine)) {
      const bgVal = cleanLine.replace(/^BG\s*:\s*/i, "").trim();
      const parts = bgVal.split("|").map(s => s.trim());
      const first = parts[0].toLowerCase();
      if (first === "color" || first.startsWith("#") || first.startsWith("rgb")) {
        currentSlide.bgType = "color";
        currentSlide.bgColor = first === "color" ? (parts[1] || "") : parts[0];
      } else if (first === "gradient" || first.startsWith("linear-gradient") || first.startsWith("radial-gradient")) {
        currentSlide.bgType = "gradient";
        let grad = first === "gradient" ? (parts[1] || "") : parts[0];
        const found = BG_GRADIENT_PRESETS.find(p => p.name.toLowerCase() === grad.toLowerCase() || p.name.toLowerCase().replace(/\s+/g, "-") === grad.toLowerCase());
        currentSlide.bgGradient = found ? found.value : grad;
      } else if (first === "pattern" || first === "dots" || first === "grid" || first === "blueprint" || first === "radial") {
        currentSlide.bgType = "pattern";
        currentSlide.bgPattern = first === "pattern" ? (parts[1] || "dots").toLowerCase() : first;
        if (parts[2]) currentSlide.bgColor = parts[2];
        else if (parts[1] && first !== "pattern") currentSlide.bgColor = parts[1];
      } else if (first === "image" || first.startsWith("http") || first.startsWith("assets/") || first.includes(".jpg") || first.includes(".png") || first.includes(".webp")) {
        currentSlide.bgType = "image";
        currentSlide.bgImage = first === "image" ? (parts[1] || "") : parts[0];
        if (parts[2]) currentSlide.overlayOpacity = parseFloat(parts[2]) || 0.65;
        else if (parts[1] && first !== "image") currentSlide.overlayOpacity = parseFloat(parts[1]) || 0.65;
        else currentSlide.overlayOpacity = 0.65;
      }
      continue;
    }

    if (/^BADGE\s*:\s*/i.test(cleanLine)) {
      currentSlide.rawItems.push(attachCoords({ type: "badge", text: cleanLine.replace(/^BADGE\s*:\s*/i, "").trim() }));
      currentBulletsTarget = null;
      continue;
    }

    if (/^TITLE\s*:\s*/i.test(cleanLine)) {
      const parts = cleanLine.replace(/^TITLE\s*:\s*/i, "").trim().split("|");
      currentSlide.rawItems.push(attachCoords({
        type: "title",
        text: parts[0].trim(),
        accentText: parts[1] ? parts[1].trim() : ""
      }));
      currentBulletsTarget = null;
      continue;
    }

    if (/^TEXT\s*:\s*/i.test(cleanLine)) {
      currentSlide.rawItems.push(attachCoords({ type: "text", text: cleanLine.replace(/^TEXT\s*:\s*/i, "").trim() }));
      currentBulletsTarget = null;
      continue;
    }

    if (/^IMAGE\s*:\s*/i.test(cleanLine)) {
      const parts = cleanLine.replace(/^IMAGE\s*:\s*/i, "").trim().split("|");
      currentSlide.rawItems.push(attachCoords({
        type: "image",
        url: parts[0].trim(),
        caption: parts[1] ? parts[1].trim() : ""
      }));
      currentBulletsTarget = null;
      continue;
    }

    if (/^(?:METRIC|STAT)\s*:\s*/i.test(cleanLine)) {
      const parts = cleanLine.replace(/^(?:METRIC|STAT)\s*:\s*/i, "").trim().split("|");
      currentSlide.rawItems.push(attachCoords({
        type: "metric",
        value: parts[0] ? parts[0].trim() : "",
        title: parts[1] ? parts[1].trim() : "",
        description: parts[2] ? parts[2].trim() : ""
      }));
      currentBulletsTarget = null;
      continue;
    }

    if (/^PANEL\s*:\s*/i.test(cleanLine)) {
      const parts = cleanLine.replace(/^PANEL\s*:\s*/i, "").trim().split("|");
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
      currentSlide.rawItems.push(attachCoords(pItem));
      currentBulletsTarget = pItem.bullets;
      continue;
    }

    if (/^BULLETS\s*:\s*/i.test(cleanLine)) {
      const bItem = {
        type: "bullets",
        title: cleanLine.replace(/^BULLETS\s*:\s*/i, "").trim(),
        bullets: []
      };
      currentSlide.rawItems.push(attachCoords(bItem));
      currentBulletsTarget = bItem.bullets;
      continue;
    }

    if (/^QUOTE\s*:\s*/i.test(cleanLine)) {
      const parts = cleanLine.replace(/^QUOTE\s*:\s*/i, "").trim().split("|");
      currentSlide.rawItems.push(attachCoords({
        type: "quote",
        text: parts[0].trim(),
        author: parts[1] ? parts[1].trim() : "",
        role: parts[2] ? parts[2].trim() : ""
      }));
      currentBulletsTarget = null;
      continue;
    }

    if (/^(?:TIMELINE|STEP)\s*:\s*/i.test(cleanLine)) {
      const parts = cleanLine.replace(/^(?:TIMELINE|STEP)\s*:\s*/i, "").trim().split("|");
      currentSlide.rawItems.push(attachCoords({
        type: "timeline",
        stepBadge: parts[0] ? parts[0].trim() : "ШАГ 01",
        title: parts[1] ? parts[1].trim() : "Этап",
        description: parts[2] ? parts[2].trim() : ""
      }));
      currentBulletsTarget = null;
      continue;
    }

    if (/^CALLOUT\s*:\s*/i.test(cleanLine)) {
      const parts = cleanLine.replace(/^CALLOUT\s*:\s*/i, "").trim().split("|");
      let icon = "💡";
      let title = parts[0] ? parts[0].trim() : "Важная мысль";
      let text = parts[1] ? parts[1].trim() : "";
      let variant = parts[2] ? parts[2].trim().toLowerCase() : "accent";

      if (title.length <= 3) {
        icon = title;
        title = parts[1] ? parts[1].trim() : "Важная мысль";
        text = parts[2] ? parts[2].trim() : "";
        variant = parts[3] ? parts[3].trim().toLowerCase() : "accent";
      }

      currentSlide.rawItems.push(attachCoords({
        type: "callout",
        icon,
        title,
        text,
        variant
      }));
      currentBulletsTarget = null;
      continue;
    }

    if (/^CODE\s*:\s*/i.test(cleanLine)) {
      const parts = cleanLine.replace(/^CODE\s*:\s*/i, "").trim().split("|");
      currentSlide.rawItems.push(attachCoords({
        type: "code",
        title: parts[0] ? parts[0].trim() : "terminal.sh",
        language: parts[1] ? parts[1].trim().toUpperCase() : "BASH",
        code: parts.length > 2 ? parts.slice(2).join("|").trim() : ""
      }));
      currentBulletsTarget = null;
      continue;
    }

    if (/^DIVIDER\s*:\s*/i.test(cleanLine)) {
      currentSlide.rawItems.push(attachCoords({
        type: "divider",
        text: cleanLine.replace(/^DIVIDER\s*:\s*/i, "").trim()
      }));
      currentBulletsTarget = null;
      continue;
    }

    if (/^BUTTON\s*:\s*/i.test(cleanLine)) {
      const parts = cleanLine.replace(/^BUTTON\s*:\s*/i, "").trim().split("|");
      currentSlide.rawItems.push(attachCoords({
        type: "button",
        text: parts[0] ? parts[0].trim() : "Подробнее",
        url: parts[1] ? parts[1].trim() : "#",
        icon: parts[2] ? parts[2].trim() : "↗"
      }));
      currentBulletsTarget = null;
      continue;
    }

    if (/^[*•-]\s+/i.test(cleanLine)) {
      const bContent = cleanLine.replace(/^[*•-]\s+/i, "").trim();
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
        currentSlide.rawItems.push(attachCoords(bList));
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

function rangesOverlap(a1, a2, b1, b2, tolerance = 1.0) {
  return Math.max(a1, b1) < Math.min(a2, b2) - tolerance;
}

function doHorizontallyOverlap(a, b) {
  const aW = a.w || 92;
  const bW = b.w || 92;
  return rangesOverlap(a.x, a.x + aW, b.x, b.x + bW, 1.2);
}

function estimateTitleHeight(title, accentText, widthPercent) {
  const charsPerLine = Math.max(14, Math.floor((widthPercent || 92) * 0.55));
  const lines = Math.max(1, Math.ceil((title || "").length / charsPerLine));
  let h = lines * 5.8 + 2.0;
  if (accentText) {
    const accLines = Math.max(1, Math.ceil((accentText || "").length / charsPerLine));
    h += accLines * 5.5 + 1.0;
  }
  return Math.max(8, h);
}

function estimateTextHeight(text, widthPercent) {
  if (!text) return 0;
  const charsPerLine = Math.max(20, Math.floor((widthPercent || 92) * 1.1));
  const lines = Math.ceil(text.length / charsPerLine);
  return Math.max(5.5, lines * 3.8 + 2.0);
}

function estimatePanelHeight(item) {
  let h = 6;
  if (item.title) h += 3.2;
  if (item.description) {
    h += Math.max(3.5, Math.ceil(item.description.length / 60) * 3.2);
  }
  if (item.bullets && item.bullets.length > 0) {
    item.bullets.forEach(b => {
      const bLen = (b.title ? b.title.length + 2 : 0) + (b.text ? b.text.length : 0);
      const bLines = Math.max(1, Math.ceil(bLen / 60));
      h += bLines * 3.4 + 1.2;
    });
  }
  return Math.max(13, Math.min(h, 28));
}

function estimateQuoteHeight(item, widthPercent) {
  const w = widthPercent || item.w || 55;
  const charsPerLine = Math.max(16, Math.floor(((w || 55) - 4) / 0.92));
  const textLen = (item.text || "").length;
  const lines = Math.max(1, Math.ceil(textLen / charsPerLine));
  let h = 24 + lines * 4.9;
  if (!item.author && !item.quoteAuthor) h -= 5;
  return Math.max(22, Math.min(h, 54));
}

function pushBodyElement(targetArray, item, x, y, width, z) {
  const finalX = item.x !== undefined ? item.x : x;
  const finalY = item.y !== undefined ? item.y : y;
  const finalW = item.w !== undefined ? item.w : width;

  let h = 16;
  const baseEl = {
    id: generateId(),
    type: item.type,
    x: finalX,
    y: finalY,
    w: finalW,
    zIndex: z
  };
  if (item.h !== undefined) {
    baseEl.h = item.h;
  }
  if (item.compact !== undefined) {
    baseEl.compact = item.compact;
  }

  switch (item.type) {
    case "panel":
      baseEl.icon = item.icon || "✦";
      baseEl.title = item.title;
      baseEl.description = item.description;
      baseEl.bullets = item.bullets || [];
      h = estimatePanelHeight(item) + 1.5;
      break;

    case "bullets":
      baseEl.title = item.title;
      baseEl.bullets = item.bullets || [];
      h = estimatePanelHeight(item) + 1.5;
      break;

    case "quote":
      baseEl.text = item.text;
      baseEl.quoteAuthor = item.author || item.quoteAuthor || "Цитата";
      baseEl.quoteRole = item.role || item.quoteRole || "";
      h = estimateQuoteHeight(item, finalW);
      break;

    case "metric":
      baseEl.icon = item.icon || "▲";
      baseEl.title = item.title || "Показатель";
      baseEl.value = item.value || "+100%";
      baseEl.trend = item.trend || "";
      baseEl.text = item.description || item.text || "";
      h = 15;
      break;

    case "timeline":
      baseEl.stepBadge = item.stepBadge || "ШАГ 01";
      baseEl.title = item.title || "Этап развития";
      baseEl.description = item.description || "";
      h = 13.5;
      break;

    case "callout":
      baseEl.icon = item.icon || "💡";
      baseEl.title = item.title || "Важная мысль";
      baseEl.text = item.text || item.description || "";
      baseEl.variant = item.variant || "accent";
      h = 13.5;
      break;

    case "divider":
      baseEl.text = item.text || "";
      h = 4;
      break;

    case "code":
      baseEl.title = item.title || "terminal.sh";
      baseEl.language = item.language || "BASH";
      baseEl.code = item.code || item.text || "";
      h = 22;
      break;

    case "button":
      baseEl.text = item.text || "Подробнее";
      baseEl.icon = item.icon || "↗";
      baseEl.url = item.url || "#";
      baseEl.w = Math.min(finalW, 36);
      h = 8;
      break;

    default:
      baseEl.title = item.title;
      baseEl.description = item.description;
      h = 14;
  }

  targetArray.push(baseEl);
  return h;
}

function estimateElementHeight(el) {
  if (el.h) return el.h;
  switch (el.type) {
    case "badge":
      return 5.5;
    case "title":
      return estimateTitleHeight(el.text, el.accentText, el.w || 92);
    case "text":
      return estimateTextHeight(el.text, el.w || 92);
    case "image":
      if (el.compact) return 24;
      return Math.min(42, Math.max(18, (el.w || 38) * 0.75 / 0.5625 + (el.imageCaption ? 3.5 : 1.5)));
    case "panel":
    case "bullets":
      return estimatePanelHeight(el);
    case "quote":
      return estimateQuoteHeight(el, el.w);
    case "metric":
      return 15;
    case "timeline":
      return 13.5;
    case "callout":
      return 13.5;
    case "divider":
      return 4;
    case "code":
      return 22;
    case "button":
      return 8;
    default:
      return 14;
  }
}

function resolveCollisions(elements) {
  if (!elements || elements.length <= 1) return elements;

  // Pass 1: Topological / Y-order collision push
  elements.sort((a, b) => {
    if (Math.abs(a.y - b.y) > 0.01) return a.y - b.y;
    return a.x - b.x;
  });

  const gap = 1.8;

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    let minAllowedY = el.y;

    for (let j = 0; j < i; j++) {
      const prev = elements[j];
      if (doHorizontallyOverlap(prev, el)) {
        const prevH = estimateElementHeight(prev);
        const requiredY = prev.y + prevH + gap;
        if (requiredY > minAllowedY) {
          minAllowedY = requiredY;
        }
      }
    }

    if (minAllowedY > el.y) {
      el.y = minAllowedY;
    }
  }

  // Pass 2: Bottom Floor Protection (stay within <= 86%)
  let maxBottom = 0;
  elements.forEach(el => {
    maxBottom = Math.max(maxBottom, el.y + estimateElementHeight(el));
  });

  if (maxBottom > 86) {
    let minY = 100;
    elements.forEach(el => {
      if (el.type !== "badge") minY = Math.min(minY, el.y);
    });

    const span = maxBottom - minY;
    if (span > 0) {
      const scale = (86 - minY) / span;
      if (scale > 0.65 && scale < 1.0) {
        elements.forEach(el => {
          if (el.type !== "badge" && el.y > minY) {
            el.y = minY + (el.y - minY) * scale;
          }
        });

        // Re-enforce non-overlap rule after scaling
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i];
          for (let j = 0; j < i; j++) {
            const prev = elements[j];
            if (doHorizontallyOverlap(prev, el)) {
              const prevH = estimateElementHeight(prev);
              const minPostY = prev.y + prevH + 1.0;
              if (el.y < minPostY) {
                el.y = minPostY;
              }
            }
          }
        }
      }
    }
  }

  return elements;
}

function layoutSlideElements(rawItems, isCover, slideConfig = {}) {
  const elements = [];
  let zCounter = 1;

  const layout = slideConfig.layout || "right-image";
  const slideAlign = slideConfig.align || (layout === "center" || layout === "hero" ? "center" : "left");

  const normalizedItems = rawItems.map(item => {
    if (item.type === "metric") {
      return {
        ...item,
        type: "metric",
        icon: item.icon || "▲",
        title: item.title || "Показатель",
        value: item.value || "+100%",
        trend: item.trend || "",
        text: item.description || item.text || ""
      };
    }
    return item;
  });

  const images = normalizedItems.filter(i => i.type === "image");
  const nonImages = normalizedItems.filter(i => i.type !== "image");
  const hasImages = images.length > 0;

  // Mode: Custom / Absolute placement
  if (layout === "custom" || layout === "absolute" || layout === "manual" || layout === "freeform") {
    let autoY = 8;
    normalizedItems.forEach(item => {
      let finalX = item.x !== undefined ? item.x : (slideAlign === "center" ? 10 : 4);
      let finalY = item.y !== undefined ? item.y : autoY;
      let finalW = item.w !== undefined ? item.w : (item.type === "badge" ? 42 : (item.type === "image" ? 44 : 92));

      if (item.type === "badge") {
        elements.push({
          id: generateId(),
          type: "badge",
          x: finalX, y: finalY, w: finalW,
          zIndex: zCounter++,
          text: item.text
        });
        autoY = Math.max(autoY, finalY + 7.0);
      } else if (item.type === "title") {
        elements.push({
          id: generateId(),
          type: "title",
          x: finalX, y: finalY, w: finalW,
          zIndex: zCounter++,
          text: item.text,
          accentText: item.accentText || "",
          fontSize: isCover ? 38 : 30,
          textAlign: slideAlign
        });
        autoY = Math.max(autoY, finalY + estimateTitleHeight(item.text, item.accentText, finalW));
      } else if (item.type === "text") {
        elements.push({
          id: generateId(),
          type: "text",
          x: finalX, y: finalY, w: finalW,
          zIndex: zCounter++,
          text: item.text,
          fontSize: 15,
          textAlign: slideAlign
        });
        autoY = Math.max(autoY, finalY + estimateTextHeight(item.text, finalW));
      } else if (item.type === "image") {
        elements.push({
          id: generateId(),
          type: "image",
          x: finalX, y: finalY, w: finalW,
          h: item.h,
          compact: item.compact || (item.h !== undefined && item.h <= 30),
          zIndex: zCounter++,
          imageSrc: item.url,
          imageCaption: item.caption,
          fallbackURL: item.url
        });
        autoY = Math.max(autoY, finalY + (item.h || 32));
      } else {
        const addedH = pushBodyElement(elements, item, finalX, finalY, finalW, zCounter++);
        autoY = Math.max(autoY, finalY + addedH + 2);
      }
    });
    return resolveCollisions(elements);
  }

  // Layout: split / two-columns
  if (layout === "split" || layout === "two-columns") {
    let topY = 6;
    const headerItems = nonImages.filter(i => i.type === "badge" || i.type === "title" || i.type === "text");
    const bodyItems = nonImages.filter(i => i.type !== "badge" && i.type !== "title" && i.type !== "text");

    headerItems.forEach(item => {
      const hX = item.x !== undefined ? item.x : 4;
      const hY = item.y !== undefined ? item.y : topY;
      const hW = item.w !== undefined ? item.w : (item.type === "badge" ? 42 : 92);
      if (item.type === "badge") {
        elements.push({
          id: generateId(),
          type: "badge",
          x: hX, y: hY, w: hW,
          zIndex: zCounter++,
          text: item.text
        });
        if (item.y === undefined) topY += 7.0;
      } else if (item.type === "title") {
        elements.push({
          id: generateId(),
          type: "title",
          x: hX, y: hY, w: hW,
          zIndex: zCounter++,
          text: item.text,
          accentText: item.accentText || "",
          fontSize: isCover ? 38 : 30,
          textAlign: slideAlign
        });
        if (item.y === undefined) topY += estimateTitleHeight(item.text, item.accentText, hW);
      } else if (item.type === "text") {
        elements.push({
          id: generateId(),
          type: "text",
          x: hX, y: hY, w: hW,
          zIndex: zCounter++,
          text: item.text,
          fontSize: 14,
          textAlign: slideAlign
        });
        if (item.y === undefined) topY += estimateTextHeight(item.text, hW);
      }
    });

    const bodyY = Math.max(topY + 1.5, 26);
    if (images.length === 1) {
      const hasLeftSibling = bodyItems.length >= 3 || bodyItems.some(b => b.x !== undefined && b.x < 48);
      const imgH = images[0].h !== undefined ? images[0].h : (hasLeftSibling ? 25 : undefined);

      elements.push({
        id: generateId(),
        type: "image",
        x: images[0].x !== undefined ? images[0].x : 4,
        y: images[0].y !== undefined ? images[0].y : bodyY,
        w: images[0].w !== undefined ? images[0].w : 44,
        h: imgH,
        compact: hasLeftSibling,
        zIndex: zCounter++,
        imageSrc: images[0].url,
        imageCaption: images[0].caption,
        fallbackURL: images[0].url
      });

      let rightY = bodyY;
      let leftY = bodyY + 27;

      bodyItems.forEach(b => {
        if (b.x !== undefined && b.y !== undefined) {
          pushBodyElement(elements, b, b.x, b.y, b.w || 44, zCounter++);
        } else if (rightY <= 54) {
          rightY += pushBodyElement(elements, b, 52, rightY, 44, zCounter++) + 2;
        } else if (leftY < 80) {
          leftY += pushBodyElement(elements, b, 4, leftY, 44, zCounter++) + 2;
        } else {
          rightY += pushBodyElement(elements, b, 52, rightY, 44, zCounter++) + 2;
        }
      });
    } else if (bodyItems.length >= 2) {
      let lY = bodyY;
      let rY = bodyY;
      bodyItems.forEach((b, idx) => {
        if (b.x !== undefined && b.y !== undefined) {
          pushBodyElement(elements, b, b.x, b.y, b.w || 44, zCounter++);
        } else if (idx % 2 === 0) {
          lY += pushBodyElement(elements, b, 4, lY, 44, zCounter++) + 2;
        } else {
          rY += pushBodyElement(elements, b, 52, rY, 44, zCounter++) + 2;
        }
      });
    } else {
      let cy = bodyY;
      bodyItems.forEach(b => {
        cy += pushBodyElement(elements, b, b.x !== undefined ? b.x : 4, b.y !== undefined ? b.y : cy, b.w !== undefined ? b.w : 92, zCounter++) + 2;
      });
    }
    return resolveCollisions(elements);
  }

  // Layout: cards / grid
  if (layout === "cards" || layout === "grid") {
    let topY = 6;
    const headerItems = nonImages.filter(i => i.type === "badge" || i.type === "title" || i.type === "text");
    const bodyCards = nonImages.filter(i => i.type !== "badge" && i.type !== "title" && i.type !== "text");

    const headerW = images.length > 0 ? 58 : 92;
    headerItems.forEach(item => {
      const hX = item.x !== undefined ? item.x : 4;
      const hY = item.y !== undefined ? item.y : topY;
      const hW = item.w !== undefined ? item.w : (item.type === "badge" ? 42 : headerW);
      if (item.type === "badge") {
        elements.push({
          id: generateId(),
          type: "badge",
          x: hX, y: hY, w: hW,
          zIndex: zCounter++,
          text: item.text
        });
        if (item.y === undefined) topY += 7.0;
      } else if (item.type === "title") {
        elements.push({
          id: generateId(),
          type: "title",
          x: hX, y: hY, w: hW,
          zIndex: zCounter++,
          text: item.text,
          accentText: item.accentText || "",
          fontSize: isCover ? 38 : 32,
          textAlign: slideAlign
        });
        if (item.y === undefined) topY += estimateTitleHeight(item.text, item.accentText, hW);
      } else if (item.type === "text") {
        elements.push({
          id: generateId(),
          type: "text",
          x: hX, y: hY, w: hW,
          zIndex: zCounter++,
          text: item.text,
          fontSize: 14,
          textAlign: slideAlign
        });
        if (item.y === undefined) topY += estimateTextHeight(item.text, hW);
      }
    });

    if (images.length === 1) {
      elements.push({
        id: generateId(),
        type: "image",
        x: images[0].x !== undefined ? images[0].x : 65,
        y: images[0].y !== undefined ? images[0].y : 6,
        w: images[0].w !== undefined ? images[0].w : 31,
        h: images[0].h !== undefined ? images[0].h : 20,
        compact: true,
        zIndex: zCounter++,
        imageSrc: images[0].url,
        imageCaption: images[0].caption,
        fallbackURL: images[0].url
      });
    }

    const cardY = Math.max(topY + 2.5, 33);
    const count = bodyCards.length;
    if (count === 1) {
      pushBodyElement(elements, bodyCards[0], bodyCards[0].x !== undefined ? bodyCards[0].x : 10, bodyCards[0].y !== undefined ? bodyCards[0].y : cardY, bodyCards[0].w !== undefined ? bodyCards[0].w : 80, zCounter++);
    } else if (count === 2) {
      pushBodyElement(elements, bodyCards[0], bodyCards[0].x !== undefined ? bodyCards[0].x : 4, bodyCards[0].y !== undefined ? bodyCards[0].y : cardY, bodyCards[0].w !== undefined ? bodyCards[0].w : 44, zCounter++);
      pushBodyElement(elements, bodyCards[1], bodyCards[1].x !== undefined ? bodyCards[1].x : 52, bodyCards[1].y !== undefined ? bodyCards[1].y : cardY, bodyCards[1].w !== undefined ? bodyCards[1].w : 44, zCounter++);
    } else if (count >= 3) {
      const cardW = 28.5;
      const gaps = [4, 35.75, 67.5];
      bodyCards.slice(0, 3).forEach((c, idx) => {
        pushBodyElement(elements, c, c.x !== undefined ? c.x : gaps[idx] || (4 + idx * 30), c.y !== undefined ? c.y : cardY, c.w !== undefined ? c.w : cardW, zCounter++);
      });
    }
    return resolveCollisions(elements);
  }

  // Layout: left-image
  if (layout === "left-image") {
    if (images.length === 1) {
      elements.push({
        id: generateId(),
        type: "image",
        x: images[0].x !== undefined ? images[0].x : 4,
        y: images[0].y !== undefined ? images[0].y : 10,
        w: images[0].w !== undefined ? images[0].w : 38,
        h: images[0].h,
        zIndex: zCounter++,
        imageSrc: images[0].url,
        imageCaption: images[0].caption,
        fallbackURL: images[0].url
      });
    } else if (images.length >= 2) {
      elements.push({
        id: generateId(),
        type: "image",
        x: images[0].x !== undefined ? images[0].x : 4,
        y: images[0].y !== undefined ? images[0].y : 10,
        w: images[0].w !== undefined ? images[0].w : 19,
        zIndex: zCounter++,
        imageSrc: images[0].url,
        imageCaption: images[0].caption,
        fallbackURL: images[0].url
      });
      elements.push({
        id: generateId(),
        type: "image",
        x: images[1].x !== undefined ? images[1].x : 25,
        y: images[1].y !== undefined ? images[1].y : 10,
        w: images[1].w !== undefined ? images[1].w : 19,
        zIndex: zCounter++,
        imageSrc: images[1].url,
        imageCaption: images[1].caption,
        fallbackURL: images[1].url
      });
    }

    const rightX = hasImages ? (images.length >= 2 ? 47 : 45) : 4;
    const contentWidth = hasImages ? (images.length >= 2 ? 49 : 51) : 92;
    let currentY = 7;

    const headerItems = nonImages.filter(i => i.type === "badge" || i.type === "title" || i.type === "text");
    const bodyItems = nonImages.filter(i => i.type !== "badge" && i.type !== "title" && i.type !== "text");

    headerItems.forEach(item => {
      const elX = item.x !== undefined ? item.x : rightX;
      const elY = item.y !== undefined ? item.y : currentY;
      const elW = item.w !== undefined ? item.w : contentWidth;
      switch (item.type) {
        case "badge":
          elements.push({
            id: generateId(),
            type: "badge",
            x: elX, y: elY, w: Math.min(elW, 42),
            zIndex: zCounter++,
            text: item.text
          });
          if (item.y === undefined) currentY += 7.0;
          break;
        case "title":
          elements.push({
            id: generateId(),
            type: "title",
            x: elX, y: elY, w: elW,
            zIndex: zCounter++,
            text: item.text,
            accentText: item.accentText || "",
            fontSize: isCover ? 38 : 30,
            textAlign: slideAlign
          });
          if (item.y === undefined) currentY += estimateTitleHeight(item.text, item.accentText, elW);
          break;
        case "text":
          elements.push({
            id: generateId(),
            type: "text",
            x: elX, y: elY, w: elW,
            zIndex: zCounter++,
            text: item.text,
            fontSize: 15,
            textAlign: slideAlign
          });
          if (item.y === undefined) currentY += estimateTextHeight(item.text, elW);
          break;
      }
    });

    bodyItems.forEach(item => {
      currentY += pushBodyElement(elements, item, rightX, currentY, contentWidth, zCounter++) + 2;
    });
    return resolveCollisions(elements);
  }

  // Layout: center / hero / quote-hero
  if (layout === "center" || layout === "hero" || layout === "quote-hero") {
    let currentY = 8;
    const headerItems = nonImages.filter(i => i.type === "badge" || i.type === "title" || i.type === "text");
    const bodyItems = nonImages.filter(i => i.type !== "badge" && i.type !== "title" && i.type !== "text");

    const hasQuoteAndImage = images.length === 1 && bodyItems.some(i => i.type === "quote");

    if (hasQuoteAndImage) {
      elements.push({
        id: generateId(),
        type: "image",
        x: images[0].x !== undefined ? images[0].x : 8,
        y: images[0].y !== undefined ? images[0].y : 16,
        w: images[0].w !== undefined ? images[0].w : 26,
        h: images[0].h,
        zIndex: zCounter++,
        imageSrc: images[0].url,
        imageCaption: images[0].caption,
        fallbackURL: images[0].url
      });

      let rightY = 8;
      headerItems.forEach(item => {
        const elX = item.x !== undefined ? item.x : 37;
        const elY = item.y !== undefined ? item.y : rightY;
        const elW = item.w !== undefined ? item.w : 55;
        if (item.type === "badge") {
          elements.push({
            id: generateId(),
            type: "badge",
            x: elX, y: elY, w: Math.min(elW, 42),
            zIndex: zCounter++,
            text: item.text
          });
          if (item.y === undefined) rightY += 7.0;
        } else if (item.type === "title") {
          elements.push({
            id: generateId(),
            type: "title",
            x: elX, y: elY, w: elW,
            zIndex: zCounter++,
            text: item.text,
            accentText: item.accentText || "",
            fontSize: isCover ? 36 : 28,
            textAlign: "left"
          });
          if (item.y === undefined) rightY += estimateTitleHeight(item.text, item.accentText, elW);
        }
      });

      rightY = Math.max(rightY, 16);
      bodyItems.forEach(item => {
        rightY += pushBodyElement(elements, item, item.x !== undefined ? item.x : 37, item.y !== undefined ? item.y : rightY, item.w !== undefined ? item.w : 55, zCounter++) + 2;
      });
      return resolveCollisions(elements);
    }

    headerItems.forEach(item => {
      const elX = item.x !== undefined ? item.x : (item.type === "badge" ? 29 : 8);
      const elY = item.y !== undefined ? item.y : currentY;
      const elW = item.w !== undefined ? item.w : (item.type === "badge" ? 42 : 84);
      switch (item.type) {
        case "badge":
          elements.push({
            id: generateId(),
            type: "badge",
            x: elX, y: elY, w: elW,
            zIndex: zCounter++,
            text: item.text
          });
          if (item.y === undefined) currentY += 7.0;
          break;
        case "title":
          elements.push({
            id: generateId(),
            type: "title",
            x: elX, y: elY, w: elW,
            zIndex: zCounter++,
            text: item.text,
            accentText: item.accentText || "",
            fontSize: isCover ? 42 : 34,
            textAlign: "center"
          });
          if (item.y === undefined) currentY += estimateTitleHeight(item.text, item.accentText, elW);
          break;
        case "text":
          elements.push({
            id: generateId(),
            type: "text",
            x: elX, y: elY, w: elW,
            zIndex: zCounter++,
            text: item.text,
            fontSize: 16,
            textAlign: "center"
          });
          if (item.y === undefined) currentY += estimateTextHeight(item.text, 76);
          break;
      }
    });

    bodyItems.forEach(item => {
      const posX = item.x !== undefined ? item.x : (item.type === "button" ? 38 : (item.type === "quote" ? 8 : 15));
      const posW = item.w !== undefined ? item.w : (item.type === "quote" ? 84 : 70);
      currentY += pushBodyElement(elements, item, posX, currentY, posW, zCounter++) + 2;
    });

    if (images.length === 1) {
      elements.push({
        id: generateId(),
        type: "image",
        x: images[0].x !== undefined ? images[0].x : 32,
        y: images[0].y !== undefined ? images[0].y : Math.min(currentY, 52),
        w: images[0].w !== undefined ? images[0].w : 36,
        h: images[0].h,
        zIndex: zCounter++,
        imageSrc: images[0].url,
        imageCaption: images[0].caption,
        fallbackURL: images[0].url
      });
    }
    return resolveCollisions(elements);
  }

  // Default: right-image
  if (images.length === 1) {
    elements.push({
      id: generateId(),
      type: "image",
      x: images[0].x !== undefined ? images[0].x : 58,
      y: images[0].y !== undefined ? images[0].y : 10,
      w: images[0].w !== undefined ? images[0].w : 38,
      h: images[0].h,
      zIndex: zCounter++,
      imageSrc: images[0].url,
      imageCaption: images[0].caption,
      fallbackURL: images[0].url
    });
  } else if (images.length >= 2) {
    elements.push({
      id: generateId(),
      type: "image",
      x: images[0].x !== undefined ? images[0].x : 53,
      y: images[0].y !== undefined ? images[0].y : 10,
      w: images[0].w !== undefined ? images[0].w : 21,
      zIndex: zCounter++,
      imageSrc: images[0].url,
      imageCaption: images[0].caption,
      fallbackURL: images[0].url
    });
    elements.push({
      id: generateId(),
      type: "image",
      x: images[1].x !== undefined ? images[1].x : 76,
      y: images[1].y !== undefined ? images[1].y : 10,
      w: images[1].w !== undefined ? images[1].w : 21,
      zIndex: zCounter++,
      imageSrc: images[1].url,
      imageCaption: images[1].caption,
      fallbackURL: images[1].url
    });
  }

  const leftX = 4;
  const contentWidth = hasImages ? (images.length >= 2 ? 46 : 51) : 92;
  let currentY = 7;

  const headerItems = nonImages.filter(i => i.type === "badge" || i.type === "title" || i.type === "text");
  const bodyItems = nonImages.filter(i => i.type !== "badge" && i.type !== "title" && i.type !== "text");

  headerItems.forEach(item => {
    const elX = item.x !== undefined ? item.x : leftX;
    const elY = item.y !== undefined ? item.y : currentY;
    const elW = item.w !== undefined ? item.w : contentWidth;
    switch (item.type) {
      case "badge":
        elements.push({
          id: generateId(),
          type: "badge",
          x: elX, y: elY, w: Math.min(elW, 42),
          zIndex: zCounter++,
          text: item.text
        });
        if (item.y === undefined) currentY += 7.0;
        break;
      case "title":
        elements.push({
          id: generateId(),
          type: "title",
          x: elX, y: elY, w: elW,
          zIndex: zCounter++,
          text: item.text,
          accentText: item.accentText || "",
          fontSize: isCover ? 38 : 30,
          textAlign: slideAlign
        });
        if (item.y === undefined) currentY += estimateTitleHeight(item.text, item.accentText, elW);
        break;
      case "text":
        elements.push({
          id: generateId(),
          type: "text",
          x: elX, y: elY, w: elW,
          zIndex: zCounter++,
          text: item.text,
          fontSize: 15,
          textAlign: slideAlign
        });
        if (item.y === undefined) currentY += estimateTextHeight(item.text, elW);
        break;
    }
  });

  bodyItems.forEach(item => {
    currentY += pushBodyElement(elements, item, leftX, currentY, contentWidth, zCounter++) + 2;
  });

  return resolveCollisions(elements);
}

