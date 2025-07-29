#!/bin/bash

# First-Time Setup Script for Vercel Deployment
# This script helps you set up everything needed for deployment

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Portfolio First-Time Setup${NC}"
echo -e "${BLUE}================================${NC}\n"

# 1. Check Node.js
echo -e "${YELLOW}1. Checking Node.js installation...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# 2. Check Git
echo -e "\n${YELLOW}2. Checking Git installation...${NC}"
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✅ Git installed: $GIT_VERSION${NC}"
else
    echo -e "${RED}❌ Git not found. Please install Git${NC}"
    echo "   Visit: https://git-scm.com/"
    exit 1
fi

# 3. Install dependencies
echo -e "\n${YELLOW}3. Installing project dependencies...${NC}"
npm install

# 4. Create .env.local from template
echo -e "\n${YELLOW}4. Setting up environment variables...${NC}"
if [ ! -f .env.local ]; then
    if [ -f .env.example ]; then
        cp .env.example .env.local
        echo -e "${GREEN}✅ Created .env.local from template${NC}"
        echo -e "${YELLOW}   Please edit .env.local with your actual values${NC}"
    else
        echo -e "${RED}❌ .env.example not found${NC}"
    fi
else
    echo -e "${GREEN}✅ .env.local already exists${NC}"
fi

# 5. Install Vercel CLI
echo -e "\n${YELLOW}5. Installing Vercel CLI...${NC}"
if command -v vercel &> /dev/null; then
    echo -e "${GREEN}✅ Vercel CLI already installed${NC}"
else
    npm install -g vercel
    echo -e "${GREEN}✅ Vercel CLI installed${NC}"
fi

# 6. Test build
echo -e "\n${YELLOW}6. Testing build...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed. Please fix errors before deploying.${NC}"
    exit 1
fi

# 7. Setup checklist
echo -e "\n${BLUE}📋 Next Steps:${NC}"
echo -e "${YELLOW}1. Configure Supabase:${NC}"
echo "   - Create a Supabase project at https://supabase.com"
echo "   - Run the SQL schema from supabase/schema.sql"
echo "   - Copy your API keys to .env.local"

echo -e "\n${YELLOW}2. Configure Vercel:${NC}"
echo "   - Create account at https://vercel.com"
echo "   - Run: vercel login"
echo "   - Run: vercel link"

echo -e "\n${YELLOW}3. Configure GitHub:${NC}"
echo "   - Create repository on GitHub"
echo "   - Add GitHub secrets (see COMPLETE_DEPLOYMENT_GUIDE.md)"

echo -e "\n${YELLOW}4. Deploy:${NC}"
echo "   - Run: ./scripts/deploy-vercel.sh production \"Initial deployment\""

echo -e "\n${GREEN}✅ Setup complete! Check COMPLETE_DEPLOYMENT_GUIDE.md for detailed instructions.${NC}"