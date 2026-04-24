# Vercel Configuration for Frontend

## Deployment Steps

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy Frontend
```bash
cd frontend
vercel
```

### 4. Set Environment Variables
In Vercel Dashboard:
- Project Settings → Environment Variables
- Add `VITE_API_URL` = `https://portfolio-api.onrender.com/api` (or your backend URL)

### 5. Redeploy
```bash
vercel --prod
```

## Configuration
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: `frontend`

## Troubleshooting
- If build fails, check that all dependencies are installed
- Clear cache: `vercel env pull`
- Check logs in Vercel Dashboard
