# 🚀 Complete Vercel Deployment Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Environment Variables](#environment-variables)
4. [GitHub Setup](#github-setup)
5. [Vercel Setup](#vercel-setup)
6. [Deployment Methods](#deployment-methods)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools
- [ ] Node.js 18+ installed
- [ ] Git installed and configured
- [ ] GitHub account
- [ ] Vercel account (free tier is fine)
- [ ] Supabase account (for database)

### Project Checklist
- [ ] All dependencies installed (`npm install`)
- [ ] Build successful (`npm run build`)
- [ ] TypeScript errors resolved (`npm run type-check`)
- [ ] Environment variables configured

## Initial Setup

### 1. Clone and Prepare Repository

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/portfolio-jeonggyeongseok.git
cd portfolio-jeonggyeongseok

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### 2. Configure Environment Variables

Edit `.env.local` with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
```

### 3. Test Locally

```bash
# Run development server
npm run dev

# Test build
npm run build

# Run production build locally
npm run start
```

## Environment Variables

### Required Variables

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (secret) | Supabase Dashboard → Settings → API |
| `ADMIN_USERNAME` | Admin panel username | You choose this |
| `ADMIN_PASSWORD` | Admin panel password | You choose this (make it secure!) |

### Setting Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable for Production, Preview, and Development environments

## GitHub Setup

### 1. Create Repository

```bash
# Initialize git (if not already)
git init

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/portfolio-jeonggyeongseok.git

# Push initial commit
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

### 2. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:
- `VERCEL_TOKEN` - Get from Vercel Account Settings
- `VERCEL_ORG_ID` - Get from Vercel project settings
- `VERCEL_PROJECT_ID` - Get from Vercel project settings
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

### 3. Enable GitHub Actions

The workflow file `.github/workflows/deploy.yml` is already configured. It will:
- Run tests on every push
- Deploy previews for pull requests
- Deploy to production on main branch pushes

## Vercel Setup

### 1. Import Project

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click "Import Git Repository"
3. Connect your GitHub account
4. Select your repository
5. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Install Command: `npm install`

### 2. Configure Environment Variables

In Vercel project settings, add all environment variables from `.env.example`.

### 3. Configure Domains (Optional)

1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)

Push to GitHub and Vercel auto-deploys:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push
```

### Method 2: Using Deployment Scripts

#### On macOS/Linux:
```bash
# Deploy to preview
./scripts/deploy-vercel.sh preview "Your commit message"

# Deploy to production
./scripts/deploy-vercel.sh production "Your commit message"
```

#### On Windows:
```cmd
# Deploy to preview
scripts\deploy-vercel.bat preview "Your commit message"

# Deploy to production
scripts\deploy-vercel.bat production "Your commit message"
```

### Method 3: Vercel CLI Direct

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 4: Manual via Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click "Redeploy"

## Monitoring & Maintenance

### 1. Check Deployment Status

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Actions**: https://github.com/YOUR_USERNAME/portfolio-jeonggyeongseok/actions
- **Analytics**: Vercel Dashboard → Analytics tab

### 2. Monitor Performance

- Check Core Web Vitals in Vercel Analytics
- Monitor function execution times
- Review error logs

### 3. Regular Maintenance

```bash
# Update dependencies monthly
npm update
npm audit fix

# Check for security vulnerabilities
npm audit

# Update to latest Next.js
npm install next@latest react@latest react-dom@latest
```

## Troubleshooting

### Common Issues

#### 1. Build Failures

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

#### 2. Environment Variable Issues

- Ensure all variables are set in Vercel dashboard
- Check for typos in variable names
- Verify Supabase keys are correct

#### 3. TypeScript Errors

```bash
# Check for type errors
npm run type-check

# Update TypeScript
npm install -D typescript@latest @types/react@latest @types/node@latest
```

#### 4. Deployment Stuck

- Check Vercel status page
- Review function logs in Vercel dashboard
- Ensure GitHub Actions has correct permissions

### Debug Commands

```bash
# Verify Vercel CLI connection
vercel whoami

# Check project linking
vercel project ls

# View deployment logs
vercel logs

# Check environment variables
vercel env ls
```

## 🎉 Success Checklist

- [ ] Project builds successfully locally
- [ ] All environment variables configured
- [ ] GitHub repository connected to Vercel
- [ ] First deployment successful
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Monitoring alerts set up

## 📞 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated**: 2025-07-29
**Version**: 1.0.0