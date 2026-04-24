# Deployment Checklist

Follow this checklist to deploy your portfolio to production.

## Pre-Deployment

- [ ] All code is committed and pushed to GitHub
- [ ] Test both frontend and backend locally
- [ ] Update production MongoDB URI (if different from dev)
- [ ] Generate strong JWT_SECRET
- [ ] Set up SMTP credentials for production email
- [ ] Update CLIENT_URL to production frontend URL
- [ ] Run production build: `npm run build` in frontend

## Frontend Deployment (Vercel)

### Setup
1. [ ] Go to [Vercel](https://vercel.com)
2. [ ] Sign up/Sign in with GitHub
3. [ ] Click "New Project"
4. [ ] Select your portfolio repository
5. [ ] Configure project settings:
   - [ ] Framework Preset: Other
   - [ ] Root Directory: `frontend`
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `dist`

### Environment Variables (Vercel Project Settings)
1. [ ] Add `VITE_API_URL` = `https://your-backend-url/api`
2. [ ] Save and redeploy

### Verification
- [ ] Frontend is accessible at `https://your-vercel-url.vercel.app`
- [ ] All pages load correctly
- [ ] API calls show in Network tab (should point to backend)

## Backend Deployment (Render/Railway)

### Option 1: Render (Recommended)

1. [ ] Go to [Render](https://render.com)
2. [ ] Sign up/Sign in with GitHub
3. [ ] Click "New Web Service"
4. [ ] Select your portfolio repository
5. [ ] Configure settings:
   - [ ] Name: `portfolio-api`
   - [ ] Environment: `Node`
   - [ ] Region: Choose closest to you
   - [ ] Branch: `main`
   - [ ] Build Command: `npm install`
   - [ ] Start Command: `npm start`
   - [ ] Root Directory: `backend`

6. [ ] Add Environment Variables:
   - [ ] MONGO_URI
   - [ ] JWT_SECRET
   - [ ] ADMIN_EMAIL
   - [ ] ADMIN_PASSWORD
   - [ ] CLIENT_URL = `https://your-vercel-url.vercel.app`
   - [ ] SMTP_SERVICE = `gmail`
   - [ ] SMTP_USER
   - [ ] SMTP_PASS
   - [ ] CONTACT_TO

7. [ ] Deploy and wait for build to complete

### Option 2: Railway

1. [ ] Go to [Railway](https://railway.app)
2. [ ] Create new project
3. [ ] Deploy from GitHub
4. [ ] Select repository and main branch
5. [ ] Add variables in project settings
6. [ ] Deploy

### Verification
- [ ] API is accessible at `https://your-backend-url/api/projects`
- [ ] MongoDB is connected (check backend logs)
- [ ] Endpoints return proper responses

## Post-Deployment Testing

### Frontend Tests
- [ ] [ ] Homepage loads
- [ ] [ ] All sections are visible
- [ ] [ ] Images load correctly
- [ ] [ ] Links work (projects, social, etc.)
- [ ] [ ] Mobile responsive
- [ ] [ ] Dark mode toggle works
- [ ] [ ] Animations are smooth

### Backend Tests
- [ ] [ ] GET /api/projects returns projects
- [ ] [ ] GET /api/certificates returns certificates
- [ ] [ ] POST /api/contact sends emails correctly
- [ ] [ ] Admin login works: POST /api/auth/login
- [ ] [ ] Error handling works (invalid routes return 404)

### Integration Tests
- [ ] [ ] Frontend can fetch projects from backend
- [ ] [ ] Contact form works end-to-end
- [ ] [ ] Admin dashboard connects to API
- [ ] [ ] No CORS errors in console

## Performance Optimization

### Frontend
- [ ] [ ] Build is optimized (`npm run build`)
- [ ] [ ] Bundle size is reasonable (check with `npm run build -- --analyze`)
- [ ] [ ] Images are optimized
- [ ] [ ] Unused dependencies removed

### Backend
- [ ] [ ] Environment variables are set correctly
- [ ] [ ] MongoDB indexes are created
- [ ] [ ] API response times are acceptable (< 500ms)
- [ ] [ ] Error logging is in place

## Security Checklist

- [ ] [ ] JWT_SECRET is strong (30+ characters, random)
- [ ] [ ] MongoDB credentials are secure and in .env
- [ ] [ ] ADMIN_PASSWORD is strong
- [ ] [ ] SMTP credentials are app-specific (not main password)
- [ ] [ ] CORS is configured correctly
- [ ] [ ] .env file is in .gitignore (never committed)
- [ ] [ ] HTTPS is enabled (automatic on Vercel/Render)
- [ ] [ ] No sensitive data in frontend code

## Monitoring & Maintenance

After deployment:

- [ ] [ ] Set up email notifications for failed deployments
- [ ] [ ] Monitor application performance
- [ ] [ ] Check logs regularly for errors
- [ ] [ ] Update dependencies monthly
- [ ] [ ] Backup MongoDB regularly
- [ ] [ ] Test contact form email delivery weekly

## Troubleshooting Common Issues

### Frontend shows "Cannot reach API"
```
Solution: 
1. Check VITE_API_URL environment variable on Vercel
2. Verify backend is running and accessible
3. Check CORS settings in backend/src/app.js
```

### Backend won't start
```
Solution:
1. Check all environment variables are set
2. Verify MongoDB URI is correct
3. Check logs: Render/Railway dashboard → Logs
4. Verify IP is whitelisted in MongoDB Atlas
```

### Emails not sending
```
Solution:
1. Verify SMTP credentials are correct
2. Check that app-specific password is being used (not main password)
3. Verify CONTACT_TO email is correct
4. Check backend logs for errors
```

### CORS errors when frontend calls API
```
Solution:
1. Ensure CLIENT_URL is correct in backend .env
2. Check that frontend is actually hitting the API (Network tab)
3. Clear browser cache and restart dev server
4. Verify both servers are running
```

## Rollback Plan

If something goes wrong:

1. [ ] Check recent commits
2. [ ] Identify last working state
3. [ ] Revert to that commit: `git revert <commit-hash>`
4. [ ] Push: `git push`
5. [ ] Services auto-redeploy from main branch

## Post-Launch

- [ ] [ ] Share portfolio link with friends/recruiters
- [ ] [ ] Update LinkedIn with portfolio URL
- [ ] [ ] Monitor for 24-48 hours for issues
- [ ] [ ] Set up analytics (optional)
- [ ] [ ] Regularly update projects and content

---

**Great job! 🎉 Your portfolio is now live!**

If you encounter any issues, check the troubleshooting section or review the logs on your deployment platform.
