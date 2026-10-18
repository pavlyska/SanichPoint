package main

import (
	"syscall"
	"unsafe"

	"github.com/jchv/go-webview2"
)

var (
	user32                   = syscall.NewLazyDLL("user32.dll")
	procGetWindowLongPtrW    = user32.NewProc("GetWindowLongPtrW")
	procSetWindowLongPtrW    = user32.NewProc("SetWindowLongPtrW")
	procSetWindowPos         = user32.NewProc("SetWindowPos")
	procShowWindow           = user32.NewProc("ShowWindow")
	procIsZoomed             = user32.NewProc("IsZoomed")
	procPostMessageW         = user32.NewProc("PostMessageW")
	procSendMessageW        = user32.NewProc("SendMessageW")
	procReleaseCapture       = user32.NewProc("ReleaseCapture")
	procLoadImageW           = user32.NewProc("LoadImageW")

	kernel32               = syscall.NewLazyDLL("kernel32.dll")
	procGetModuleHandleW   = kernel32.NewProc("GetModuleHandleW")

	dwmapi                    = syscall.NewLazyDLL("dwmapi.dll")
	procDwmSetWindowAttribute = dwmapi.NewProc("DwmSetWindowAttribute")
	procDwmExtendFrame        = dwmapi.NewProc("DwmExtendFrameIntoClientArea")
)

const (
	WM_SETICON      = 0x0080
	ICON_SMALL      = 0
	ICON_BIG        = 1
	IMAGE_ICON      = 1
	LR_LOADFROMFILE = 0x00000010
	LR_DEFAULTSIZE  = 0x00000040

	GWL_STYLE = -16

	WS_CAPTION     = 0x00C00000
	WS_THICKFRAME  = 0x00040000
	WS_MINIMIZEBOX = 0x00020000
	WS_MAXIMIZEBOX = 0x00010000
	WS_SYSMENU     = 0x00080000

	SWP_NOSIZE       = 0x0001
	SWP_NOMOVE       = 0x0002
	SWP_NOZORDER     = 0x0004
	SWP_FRAMECHANGED = 0x0020

	SW_MAXIMIZE = 3
	SW_MINIMIZE = 6
	SW_RESTORE  = 9

	WM_CLOSE         = 0x0010
	WM_NCLBUTTONDOWN = 0x00A1
	HTCAPTION        = 2

	DWMWA_USE_IMMERSIVE_DARK_MODE            = 20
	DWMWA_USE_IMMERSIVE_DARK_MODE_BEFORE_20H1 = 19
	DWMWA_WINDOW_CORNER_PREFERENCE           = 33
	DWMWCP_ROUND                             = 2
)

type margins struct {
	cxLeftWidth    int32
	cxRightWidth   int32
	cyTopHeight    int32
	cyBottomHeight int32
}

func getWindowLongPtr(hwnd uintptr, index int32) uintptr {
	if procGetWindowLongPtrW.Find() == nil {
		r, _, _ := procGetWindowLongPtrW.Call(hwnd, uintptr(index))
		return r
	}
	proc := user32.NewProc("GetWindowLongW")
	r, _, _ := proc.Call(hwnd, uintptr(index))
	return r
}

func setWindowLongPtr(hwnd uintptr, index int32, newLong uintptr) uintptr {
	if procSetWindowLongPtrW.Find() == nil {
		r, _, _ := procSetWindowLongPtrW.Call(hwnd, uintptr(index), newLong)
		return r
	}
	proc := user32.NewProc("SetWindowLongW")
	r, _, _ := proc.Call(hwnd, uintptr(index), newLong)
	return r
}

func setupCustomWindow(w webview2.WebView) {
	hwnd := uintptr(w.Window())
	if hwnd == 0 {
		return
	}

	// 1. Remove standard native white caption/titlebar, keeping thickframe for resize & minimize/maximize support
	style := getWindowLongPtr(hwnd, GWL_STYLE)
	newStyle := (style &^ WS_CAPTION) | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX | WS_SYSMENU
	setWindowLongPtr(hwnd, GWL_STYLE, newStyle)

	// 2. Enable dark mode and rounded corners in DWM
	darkMode := int32(1)
	if procDwmSetWindowAttribute.Find() == nil {
		_, _, _ = procDwmSetWindowAttribute.Call(hwnd, DWMWA_USE_IMMERSIVE_DARK_MODE, uintptr(unsafe.Pointer(&darkMode)), 4)
		_, _, _ = procDwmSetWindowAttribute.Call(hwnd, DWMWA_USE_IMMERSIVE_DARK_MODE_BEFORE_20H1, uintptr(unsafe.Pointer(&darkMode)), 4)
		cornerPref := int32(DWMWCP_ROUND)
		_, _, _ = procDwmSetWindowAttribute.Call(hwnd, DWMWA_WINDOW_CORNER_PREFERENCE, uintptr(unsafe.Pointer(&cornerPref)), 4)
	}

	// 3. Extend frame slightly into client area to preserve drop shadow
	if procDwmExtendFrame.Find() == nil {
		m := margins{cxLeftWidth: 1, cxRightWidth: 1, cyTopHeight: 1, cyBottomHeight: 1}
		_, _, _ = procDwmExtendFrame.Call(hwnd, uintptr(unsafe.Pointer(&m)))
	}

	// 4. Force frame update
	_, _, _ = procSetWindowPos.Call(hwnd, 0, 0, 0, 0, 0, SWP_NOMOVE|SWP_NOSIZE|SWP_NOZORDER|SWP_FRAMECHANGED)

	// 4.1 Set Window and Taskbar Icon from executable resources or icon.ico
	hInst, _, _ := procGetModuleHandleW.Call(0)
	hIcon, _, _ := procLoadImageW.Call(hInst, 1, IMAGE_ICON, 0, 0, LR_DEFAULTSIZE)
	if hIcon == 0 {
		icoPath, _ := syscall.UTF16PtrFromString("icon.ico")
		hIcon, _, _ = procLoadImageW.Call(0, uintptr(unsafe.Pointer(icoPath)), IMAGE_ICON, 0, 0, LR_LOADFROMFILE|LR_DEFAULTSIZE)
	}
	if hIcon != 0 {
		_, _, _ = procSendMessageW.Call(hwnd, WM_SETICON, ICON_BIG, hIcon)
		_, _, _ = procSendMessageW.Call(hwnd, WM_SETICON, ICON_SMALL, hIcon)
	}

	// 5. Bind native window controls for JS
	_ = w.Bind("nativeClose", func() {
		_, _, _ = procPostMessageW.Call(hwnd, WM_CLOSE, 0, 0)
	})

	_ = w.Bind("nativeMinimize", func() {
		_, _, _ = procShowWindow.Call(hwnd, SW_MINIMIZE)
	})

	_ = w.Bind("nativeMaximize", func() {
		isZoomed, _, _ := procIsZoomed.Call(hwnd)
		if isZoomed != 0 {
			_, _, _ = procShowWindow.Call(hwnd, SW_RESTORE)
		} else {
			_, _, _ = procShowWindow.Call(hwnd, SW_MAXIMIZE)
		}
	})

	_ = w.Bind("nativeIsMaximized", func() bool {
		isZoomed, _, _ := procIsZoomed.Call(hwnd)
		return isZoomed != 0
	})

	_ = w.Bind("nativeStartDrag", func() {
		_, _, _ = procReleaseCapture.Call()
		_, _, _ = procPostMessageW.Call(hwnd, WM_NCLBUTTONDOWN, HTCAPTION, 0)
	})
}
