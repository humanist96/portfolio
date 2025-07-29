# 🚀 Deployment Quick Reference

## 🔑 Essential URLs

| Service | URL |
|---------|-----|
| **Production Site** | https://portfolio-jeonggyeongseok.vercel.app |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **GitHub Repo** | https://github.com/YOUR_USERNAME/portfolio-jeonggyeongseok |
| **Supabase Dashboard** | https://app.supabase.com |

## ⚡ Quick Commands

### Deploy to Production
```bash
# Option 1: Git Push (Recommended)
git add . && git commit -m "Update" && git push

# Option 2: Script (macOS/Linux)
./scripts/deploy-vercel.sh production "Update message"

# Option 3: Script (Windows)
scripts\deploy-vercel.bat production "Update message"

# Option 4: Vercel CLI
vercel --prod
```

### Common Tasks
```bash
# Check build locally
npm run build

# Run type check
npm run type-check

# Update dependencies
npm update && npm audit fix

# View deployment logs
vercel logs

# List environment variables
vercel env ls
```

## 🔧 Environment Variables

### Required Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
ADMIN_USERNAME=admin
ADMIN_PASSWORD=xxxxx
```

### Set in Vercel
```bash
# Set single variable
vercel env add VARIABLE_NAME

# Pull from Vercel
vercel env pull
```

## 🚨 Quick Fixes

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Type Errors
```bash
# Check types
npm run type-check

# Update TypeScript
npm install -D typescript@latest
```

### Deploy Stuck
1. Check Vercel Status: https://www.vercel-status.com/
2. Cancel and retry deployment in dashboard
3. Check GitHub Actions tab

### Environment Issues
1. Verify in Vercel Dashboard → Settings → Environment Variables
2. Ensure variables set for correct environment (Production/Preview)
3. Redeploy after adding variables

## 📊 Monitoring

### Check Deployment Status
- **Vercel**: Dashboard shows real-time status
- **GitHub**: Actions tab shows workflow runs
- **CLI**: `vercel logs` for recent logs

### Performance Monitoring
- Vercel Analytics (Dashboard → Analytics)
- Lighthouse scores (Chrome DevTools)
- Real User Monitoring (if configured)

## 🆘 Emergency Rollback

### Via Vercel Dashboard
1. Go to project → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

### Via CLI
```bash
# List recent deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

## 📝 Deployment Checklist

**Before Deploy:**
- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] Environment variables set
- [ ] Git status clean

**After Deploy:**
- [ ] Site loads correctly
- [ ] Contact form works
- [ ] Admin panel accessible
- [ ] No console errors

## 🔗 Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Troubleshooting Guide](./COMPLETE_DEPLOYMENT_GUIDE.md#troubleshooting)

---

**Pro Tips:**
- Always test build locally first
- Use preview deployments for testing
- Keep environment variables secure
- Monitor deployment logs for issues