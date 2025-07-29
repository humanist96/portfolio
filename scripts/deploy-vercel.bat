@echo off
setlocal enabledelayedexpansion

REM Enhanced Vercel Deployment Script for Windows
REM Usage: scripts\deploy-vercel.bat [environment] "commit message"
REM Environment: preview | production (default: preview)

set ENVIRONMENT=%~1
set COMMIT_MESSAGE=%~2

REM Set defaults
if "%ENVIRONMENT%"=="" set ENVIRONMENT=preview
if "%COMMIT_MESSAGE%"=="" set COMMIT_MESSAGE=Update deployment

REM Validate environment
if not "%ENVIRONMENT%"=="preview" if not "%ENVIRONMENT%"=="production" (
    echo [ERROR] Invalid environment. Use 'preview' or 'production'
    exit /b 1
)

echo ========================================
echo     Vercel Deployment Script
echo ========================================
echo Environment: %ENVIRONMENT%
echo.

REM 1. Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Installing Vercel CLI...
    call npm i -g vercel@latest
)

REM 2. Check Node.js version
echo [INFO] Checking Node.js version...
node --version

REM 3. Install dependencies
echo [INFO] Installing dependencies...
call npm install

REM 4. Run pre-deployment checks
echo.
echo [INFO] Running pre-deployment checks...

REM Type check
echo   - Type checking...
call npm run type-check
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Type check failed
    exit /b 1
)

REM Lint check
echo   - Linting...
call npm run lint
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Lint check failed
    exit /b 1
)

REM Build test
echo   - Building...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed
    exit /b 1
)

echo [SUCCESS] All checks passed!
echo.

REM 5. Git operations
echo [INFO] Checking git status...
git status --porcelain > temp_git_status.txt
set /p GIT_STATUS=<temp_git_status.txt
del temp_git_status.txt

if not "%GIT_STATUS%"=="" (
    echo [INFO] Committing changes...
    git add .
    git commit -m "%COMMIT_MESSAGE%"
)

echo [INFO] Pushing to GitHub...
git push origin main || git push origin master

REM 6. Deploy to Vercel
echo.
echo [INFO] Deploying to Vercel (%ENVIRONMENT%)...

if "%ENVIRONMENT%"=="production" (
    call vercel --prod
) else (
    call vercel
)

REM 7. Success message
echo.
echo ========================================
echo     Deployment Completed!
echo ========================================
echo.
echo Check deployment status:
echo   - Vercel Dashboard: https://vercel.com/dashboard
echo   - GitHub Actions: https://github.com/YOUR_USERNAME/portfolio-jeonggyeongseok/actions
echo.
echo Deployment URLs:
if "%ENVIRONMENT%"=="production" (
    echo   - Production: https://portfolio-jeonggyeongseok.vercel.app
) else (
    echo   - Preview: Check Vercel dashboard for preview URL
)

endlocal