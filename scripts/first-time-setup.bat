@echo off
setlocal enabledelayedexpansion

REM First-Time Setup Script for Vercel Deployment (Windows)
REM This script helps you set up everything needed for deployment

echo ========================================
echo     Portfolio First-Time Setup
echo ========================================
echo.

REM 1. Check Node.js
echo 1. Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo [SUCCESS] Node.js installed: !NODE_VERSION!
) else (
    echo [ERROR] Node.js not found. Please install Node.js 18+
    echo         Visit: https://nodejs.org/
    pause
    exit /b 1
)

REM 2. Check Git
echo.
echo 2. Checking Git installation...
where git >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i
    echo [SUCCESS] Git installed: !GIT_VERSION!
) else (
    echo [ERROR] Git not found. Please install Git
    echo         Visit: https://git-scm.com/
    pause
    exit /b 1
)

REM 3. Install dependencies
echo.
echo 3. Installing project dependencies...
call npm install

REM 4. Create .env.local from template
echo.
echo 4. Setting up environment variables...
if not exist .env.local (
    if exist .env.example (
        copy .env.example .env.local >nul
        echo [SUCCESS] Created .env.local from template
        echo           Please edit .env.local with your actual values
    ) else (
        echo [ERROR] .env.example not found
    )
) else (
    echo [SUCCESS] .env.local already exists
)

REM 5. Install Vercel CLI
echo.
echo 5. Installing Vercel CLI...
where vercel >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Vercel CLI already installed
) else (
    call npm install -g vercel
    echo [SUCCESS] Vercel CLI installed
)

REM 6. Test build
echo.
echo 6. Testing build...
call npm run build
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Build successful!
) else (
    echo [ERROR] Build failed. Please fix errors before deploying.
    pause
    exit /b 1
)

REM 7. Setup checklist
echo.
echo ========================================
echo     Next Steps
echo ========================================
echo.
echo 1. Configure Supabase:
echo    - Create a Supabase project at https://supabase.com
echo    - Run the SQL schema from supabase\schema.sql
echo    - Copy your API keys to .env.local
echo.
echo 2. Configure Vercel:
echo    - Create account at https://vercel.com
echo    - Run: vercel login
echo    - Run: vercel link
echo.
echo 3. Configure GitHub:
echo    - Create repository on GitHub
echo    - Add GitHub secrets (see COMPLETE_DEPLOYMENT_GUIDE.md)
echo.
echo 4. Deploy:
echo    - Run: scripts\deploy-vercel.bat production "Initial deployment"
echo.
echo [SUCCESS] Setup complete! Check COMPLETE_DEPLOYMENT_GUIDE.md for detailed instructions.
echo.
pause

endlocal