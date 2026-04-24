# Quick Reference Guide

## 🚀 Start Development (Copy & Paste)

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

Then open: **http://localhost:5173**

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Project overview, tech stack, features |
| **SETUP_GUIDE.md** | Local development setup & troubleshooting |
| **DEPLOYMENT_CHECKLIST.md** | Production deployment guide |
| **QUICK_REFERENCE.md** | This file - quick commands |

---

## 🔧 Useful Commands

### Backend
```bash
cd backend

npm install          # Install dependencies
npm run dev          # Start with auto-reload (Nodemon)
npm start            # Start production
npm test             # Run tests
```

### Frontend
```bash
cd frontend

npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code style
```

---

## 📦 Environment Setup

### First Time Setup
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env and add your MongoDB URI

# Frontend
cd frontend
cp .env.example .env
```

### Key Environment Variables

**Backend** (`backend/.env`):
- `MONGO_URI` - MongoDB connection string (required)
- `JWT_SECRET` - Secret key for JWT tokens
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` - Admin login credentials

**Frontend** (`frontend/.env`):
- `VITE_API_URL` - Backend API URL

---

## 📁 Project Structure

```
portfolio-fullstack/
├── frontend/       React + Vite application
├── backend/        Node.js + Express API
├── README.md       Project documentation
├── SETUP_GUIDE.md  Development setup guide
└── DEPLOYMENT_CHECKLIST.md  Production guide
```

---

## 🌐 API Endpoints

**Base URL**: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/projects` | Get all projects |
| GET | `/projects?category=X` | Filter projects |
| GET | `/certificates` | Get certificates |
| POST | `/contact` | Send contact message |
| POST | `/auth/login` | Admin login |

---

## 🐛 Troubleshooting

### Backend won't connect to MongoDB
```bash
# Check MONGO_URI in backend/.env
# Verify IP is whitelisted in MongoDB Atlas
# Check username/password are correct
```

### Frontend can't reach backend
```bash
# Check VITE_API_URL in frontend/.env
# Verify backend is running on port 5000
# Check browser console for CORS errors
```

### Port already in use
```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repo
2. Set root: `frontend`
3. Add env: `VITE_API_URL=<backend-url>`

### Backend (Render)
1. Connect GitHub repo  
2. Set root: `backend`
3. Add all env variables
4. Start command: `npm start`

---

## 📞 Need Help?

- See **SETUP_GUIDE.md** for detailed setup
- See **DEPLOYMENT_CHECKLIST.md** for deployment
- Check **README.md** for full documentation
- Review Git commits: `git log --oneline`

---

## ✨ Features Checklist

- ✅ React 18 + Vite frontend
- ✅ Node.js + Express backend
- ✅ MongoDB database
- ✅ JWT authentication
- ✅ Project showcase
- ✅ Skills & experience sections
- ✅ Contact form
- ✅ Responsive design
- ✅ Dark mode support

---

**Last Updated**: April 24, 2024
**Repository**: https://github.com/sandeepmthf/portfolio_website
