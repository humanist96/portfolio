@echo off
REM Windows용 배포 자동화 스크립트
REM 사용법: deploy.bat "커밋 메시지"

echo.
echo 🚀 배포 프로세스 시작...
echo.

REM 1. Git 상태 확인
echo 📋 Git 상태 확인...
git status
echo.

REM 2. 커밋 메시지 확인
if "%~1"=="" (
    echo ❌ 커밋 메시지를 입력해주세요.
    echo 사용법: deploy.bat "커밋 메시지"
    exit /b 1
)

REM 3. 빌드 테스트
echo 🔨 빌드 테스트 중...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ 빌드 실패! 에러를 수정해주세요.
    exit /b 1
)
echo.

REM 4. 타입 체크
echo 📝 TypeScript 타입 체크 중...
call npm run type-check
if %errorlevel% neq 0 (
    echo ❌ 타입 에러 발견! 수정해주세요.
    exit /b 1
)
echo.

REM 5. Git 커밋 및 푸시
echo 📤 GitHub에 푸시 중...
git add .
git commit -m "%~1"
git push
echo.

REM 6. 성공 메시지
echo ✅ 배포 완료!
echo 🌐 Vercel이 자동으로 배포를 시작합니다.
echo 📊 진행상황: https://vercel.com/dashboard
echo.

REM 7. 배포 URL 안내
echo 🔗 배포 URL:
echo Production: https://portfolio-jeonggyeongseok.vercel.app
echo GitHub: https://github.com/YOUR_USERNAME/portfolio-jeonggyeongseok
echo.

pause