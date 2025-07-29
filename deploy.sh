#!/bin/bash

# 배포 자동화 스크립트
# 사용법: ./deploy.sh "커밋 메시지"

echo "🚀 배포 프로세스 시작..."

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Git 상태 확인
echo -e "${YELLOW}📋 Git 상태 확인...${NC}"
git status

# 2. 변경사항이 있는지 확인
if [[ -z $(git status -s) ]]; then
    echo -e "${RED}❌ 커밋할 변경사항이 없습니다.${NC}"
    exit 1
fi

# 3. 커밋 메시지 확인
if [ -z "$1" ]; then
    echo -e "${RED}❌ 커밋 메시지를 입력해주세요.${NC}"
    echo "사용법: ./deploy.sh \"커밋 메시지\""
    exit 1
fi

# 4. 빌드 테스트
echo -e "${YELLOW}🔨 빌드 테스트 중...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 빌드 실패! 에러를 수정해주세요.${NC}"
    exit 1
fi

# 5. 타입 체크
echo -e "${YELLOW}📝 TypeScript 타입 체크 중...${NC}"
npm run type-check
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 타입 에러 발견! 수정해주세요.${NC}"
    exit 1
fi

# 6. Git 커밋 및 푸시
echo -e "${YELLOW}📤 GitHub에 푸시 중...${NC}"
git add .
git commit -m "$1"
git push

# 7. 성공 메시지
echo -e "${GREEN}✅ 배포 완료!${NC}"
echo -e "${GREEN}🌐 Vercel이 자동으로 배포를 시작합니다.${NC}"
echo -e "${GREEN}📊 진행상황: https://vercel.com/dashboard${NC}"

# 8. 배포 URL 안내
echo -e "\n${YELLOW}🔗 배포 URL:${NC}"
echo "Production: https://portfolio-jeonggyeongseok.vercel.app"
echo "GitHub: https://github.com/YOUR_USERNAME/portfolio-jeonggyeongseok"