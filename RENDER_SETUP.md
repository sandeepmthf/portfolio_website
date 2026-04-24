# Render Configuration for Backend

## Deployment Steps

### 1. Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub

### 2. Deploy Backend
1. Click "New Web Service"
2. Connect GitHub repository
3. Configure:
   - **Name**: portfolio-api
   - **Repository**: your-portfolio repo
   - **Branch**: main
   - **Root Directory**: backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Set Environment Variables
In Render Dashboard → Environment:

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/portfolio
JWT_SECRET=[generate-secure-key]
ADMIN_EMAIL=sandeep636764@gmail.com
ADMIN_PASSWORD=[secure-password]
CLIENT_URL=https://your-vercel-domain.vercel.app
SMTP_SERVICE=gmail
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO=sandeep636764@gmail.com
```

### 4. MongoDB Atlas Setup
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a cluster
3. Create database user
4. Get connection string
5. Add IP to network access: `0.0.0.0/0`
6. Copy connection string to MONGO_URI

### 5. Deploy
- Render auto-deploys on push to main branch
- Check deployment status in Render Dashboard

## API URL for Frontend
```
https://portfolio-api-XXXX.onrender.com/api
```

Use this as `VITE_API_URL` in Vercel frontend settings.

## Troubleshooting
- Check logs: Render Dashboard → Logs
- Verify environment variables are set
- Test API: `curl https://portfolio-api-XXXX.onrender.com/api/projects`
