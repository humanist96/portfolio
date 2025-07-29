#!/bin/bash

# Enhanced Vercel Deployment Script
# Usage: ./scripts/deploy-vercel.sh [environment] "commit message"
# Environment: preview | production (default: preview)

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-preview}
COMMIT_MESSAGE=${2:-"Update deployment"}

# Validate environment
if [[ "$ENVIRONMENT" != "preview" && "$ENVIRONMENT" != "production" ]]; then
    echo -e "${RED}❌ Invalid environment. Use 'preview' or 'production'${NC}"
    exit 1
fi

echo -e "${BLUE}🚀 Starting Vercel deployment process...${NC}"
echo -e "${BLUE}📦 Environment: ${ENVIRONMENT}${NC}"

# 1. Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}📥 Installing Vercel CLI...${NC}"
    npm i -g vercel@latest
fi

# 2. Check environment variables
echo -e "${YELLOW}🔐 Checking environment variables...${NC}"
REQUIRED_VARS=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
    "ADMIN_USERNAME"
    "ADMIN_PASSWORD"
)

MISSING_VARS=()
for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        MISSING_VARS+=($var)
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo -e "${RED}❌ Missing environment variables:${NC}"
    printf '%s\n' "${MISSING_VARS[@]}"
    echo -e "${YELLOW}💡 Set them in Vercel dashboard or .env file${NC}"
fi

# 3. Run pre-deployment checks
echo -e "${YELLOW}🧪 Running pre-deployment checks...${NC}"

# Type check
echo "  → Type checking..."
npm run type-check || {
    echo -e "${RED}❌ Type check failed${NC}"
    exit 1
}

# Lint check
echo "  → Linting..."
npm run lint || {
    echo -e "${RED}❌ Lint check failed${NC}"
    exit 1
}

# Build test
echo "  → Building..."
npm run build || {
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
}

echo -e "${GREEN}✅ All checks passed!${NC}"

# 4. Git operations
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}📝 Committing changes...${NC}"
    git add .
    git commit -m "$COMMIT_MESSAGE" || true
fi

echo -e "${YELLOW}📤 Pushing to GitHub...${NC}"
git push origin main || git push origin master

# 5. Deploy to Vercel
echo -e "${YELLOW}🎯 Deploying to Vercel (${ENVIRONMENT})...${NC}"

if [ "$ENVIRONMENT" == "production" ]; then
    vercel --prod
else
    vercel
fi

# 6. Success message
echo -e "${GREEN}✅ Deployment initiated successfully!${NC}"
echo -e "${BLUE}📊 Check deployment status:${NC}"
echo "   → Vercel Dashboard: https://vercel.com/dashboard"
echo "   → GitHub Actions: https://github.com/YOUR_USERNAME/portfolio-jeonggyeongseok/actions"

# 7. URLs
echo -e "\n${BLUE}🌐 Deployment URLs:${NC}"
if [ "$ENVIRONMENT" == "production" ]; then
    echo "   → Production: https://portfolio-jeonggyeongseok.vercel.app"
else
    echo "   → Preview: Check Vercel dashboard for preview URL"
fi