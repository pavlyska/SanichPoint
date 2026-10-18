@echo off
setlocal
title SanichPoint Studio - Build

echo ============================================================
echo           SANICHPOINT STUDIO COMPILER (Windows x64)
echo ============================================================
echo.

where go >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Go compiler not found!
    echo Please install Go from https://go.dev/dl/
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('go version') do echo [1/2] Compiler: %%v

echo [2/2] Compiling SanichPoint.exe...
echo       Flags: -ldflags "-H=windowsgui -s -w"
echo.

go build -ldflags "-H=windowsgui -s -w" -o SanichPoint.exe .

if %errorlevel% neq 0 (
    echo.
    echo ============================================================
    echo [ERROR] Compilation failed!
    echo ============================================================
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   SUCCESS! SanichPoint.exe has been compiled successfully!
echo ============================================================
echo.

set /p RUN_CHOICE=Launch SanichPoint.exe now? [Y/n]: 
if /i "%RUN_CHOICE%"=="n" goto :done
start "" SanichPoint.exe

:done
exit /b 0
