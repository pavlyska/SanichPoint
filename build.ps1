param(
    [switch]$Run,
    [switch]$DebugConsole,
    [string]$Output = "SanichPoint.exe"
)

$ErrorActionPreference = "Stop"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "       SANICHPOINT STUDIO COMPILER (Windows x64)           " -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

$goCmd = Get-Command go -ErrorAction SilentlyContinue
if (-not $goCmd) {
    Write-Host "[ERROR] Go compiler not found in PATH!" -ForegroundColor Red
    Write-Host "Please install Go: https://go.dev/dl/" -ForegroundColor Yellow
    exit 1
}

$goVersion = (go version).Trim()
Write-Host "[1/2] Compiler: $goVersion" -ForegroundColor Green

$ldFlags = "-s -w"
if (-not $DebugConsole) {
    $ldFlags = "-H=windowsgui $ldFlags"
    Write-Host "[2/2] Mode: GUI (silent, no black console window)" -ForegroundColor Green
} else {
    Write-Host "[2/2] Mode: DEBUG (console window enabled for logs)" -ForegroundColor Magenta
}

$timer = [System.Diagnostics.Stopwatch]::StartNew()

try {
    Write-Host "      Building $Output ..." -ForegroundColor Cyan
    go build -ldflags $ldFlags -o $Output .
    $timer.Stop()
} catch {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host " [ERROR] Build failed!" -ForegroundColor Red
    Write-Host "============================================================" -ForegroundColor Red
    Write-Error $_
    exit 1
}

if (Test-Path $Output) {
    $fileInfo = Get-Item $Output
    $sizeMB = [math]::Round($fileInfo.Length / 1MB, 2)
    $seconds = [math]::Round($timer.Elapsed.TotalSeconds, 2)

    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "   SUCCESS! Compiled $Output ($sizeMB MB) in $seconds sec" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host ""

    if ($Run) {
        Write-Host "Launching $Output ..." -ForegroundColor Cyan
        Start-Process ".\$Output"
    }
}
