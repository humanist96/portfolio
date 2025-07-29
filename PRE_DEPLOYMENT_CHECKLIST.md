# ✅ Pre-Deployment Checklist

Use this checklist before every deployment to ensure a smooth process.

## 🔍 Code Quality Checks

### TypeScript & Linting
- [ ] Run `npm run type-check` - No TypeScript errors
- [ ] Run `npm run lint` - No ESLint warnings/errors
- [ ] All `any` types replaced with proper types
- [ ] No `console.log` statements in production code

### Build & Performance
- [ ] Run `npm run build` - Build succeeds
- [ ] Bundle size is reasonable (check .next/analyze if needed)
- [ ] Images are optimized and using Next.js Image component
- [ ] No hardcoded URLs or API keys in code

## 🔐 Security Checks

### Environment Variables
- [ ] All sensitive data in environment variables
- [ ] `.env.local` is NOT committed to git
- [ ] Vercel has all required environment variables set
- [ ] Different values for production vs preview environments

### API Security
- [ ] API routes have proper authentication
- [ ] Admin routes check for admin credentials
- [ ] CORS configured properly if needed
- [ ] Rate limiting implemented for public APIs

## 🎨 UI/UX Checks

### Responsive Design
- [ ] Test on mobile devices (or browser dev tools)
- [ ] Test on tablet sizes
- [ ] Test on large screens (1920px+)
- [ ] All interactive elements are accessible via keyboard

### Cross-Browser
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari (if available)
- [ ] Test in Edge

### Accessibility
- [ ] Run Lighthouse accessibility audit
- [ ] All images have alt text
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Sufficient color contrast

## 📊 Functionality Checks

### Core Features
- [ ] Contact form submits successfully
- [ ] Contact form shows success/error messages
- [ ] Admin login works
- [ ] Admin can view contacts
- [ ] Theme toggle works and persists
- [ ] All navigation links work

### Data & Content
- [ ] All portfolio items have correct information
- [ ] Links to external sites open in new tabs
- [ ] No placeholder/lorem ipsum content
- [ ] Copyright year is current

## 🚀 Deployment Preparation

### Git Status
- [ ] All changes committed
- [ ] Working directory is clean
- [ ] On correct branch (main/master)
- [ ] Pulled latest changes from remote

### Dependencies
- [ ] Run `npm audit` - No high/critical vulnerabilities
- [ ] Dependencies are up to date
- [ ] Lock file (package-lock.json) is committed

### Documentation
- [ ] README.md is up to date
- [ ] Deployment guides are current
- [ ] Any API changes documented

## 📝 Final Checks

### Testing
- [ ] Manual testing completed
- [ ] No browser console errors
- [ ] Performance is acceptable (Lighthouse score >90)
- [ ] SEO meta tags are set

### Monitoring
- [ ] Error tracking configured (if using Sentry)
- [ ] Analytics configured (if using)
- [ ] Uptime monitoring set up (optional)

## 🎯 Deployment Commands

Once all checks pass, deploy using one of these methods:

### Automatic (via Git push):
```bash
git add .
git commit -m "Your descriptive commit message"
git push origin main
```

### Using deployment script:
```bash
# macOS/Linux
./scripts/deploy-vercel.sh production "Your commit message"

# Windows
scripts\deploy-vercel.bat production "Your commit message"
```

### Direct Vercel CLI:
```bash
vercel --prod
```

## 📋 Post-Deployment Verification

After deployment:
- [ ] Visit production URL and verify it loads
- [ ] Test contact form on production
- [ ] Check browser console for errors
- [ ] Verify environment-specific features work
- [ ] Monitor Vercel dashboard for any errors

---

**Remember**: It's better to catch issues before deployment than to fix them in production!