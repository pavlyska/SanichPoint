//go:build windows

package main

import (
	"encoding/base64"
	"fmt"
	"os/exec"
	"strings"
	"syscall"
	"unicode/utf16"
)

func encodePowerShellCommand(script string) string {
	runes := utf16.Encode([]rune(script))
	bytes := make([]byte, len(runes)*2)
	for i, r := range runes {
		bytes[i*2] = byte(r)
		bytes[i*2+1] = byte(r >> 8)
	}
	return base64.StdEncoding.EncodeToString(bytes)
}

func pickFolderDialog(initialDir string) (string, error) {
	cleanDir := strings.ReplaceAll(initialDir, "'", "''")
	script := fmt.Sprintf(`
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = 'Выберите папку для сохранения презентации'
$dialog.ShowNewFolderButton = $true
$init = '%s'
if ($init -ne '' -and (Test-Path -LiteralPath $init)) {
    $dialog.SelectedPath = $init
}
$topForm = New-Object System.Windows.Forms.Form
$topForm.TopMost = $true
$res = $dialog.ShowDialog($topForm)
$topForm.Dispose()
if ($res -eq [System.Windows.Forms.DialogResult]::OK) {
    [Console]::WriteLine($dialog.SelectedPath)
}
$dialog.Dispose()
`, cleanDir)

	encoded := encodePowerShellCommand(script)

	cmd := exec.Command("powershell", "-STA", "-NoProfile", "-WindowStyle", "Hidden", "-ExecutionPolicy", "Bypass", "-EncodedCommand", encoded)
	cmd.SysProcAttr = &syscall.SysProcAttr{
		HideWindow:    true,
		CreationFlags: 0x08000000, // CREATE_NO_WINDOW
	}

	out, err := cmd.Output()
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(string(out)), nil
}
