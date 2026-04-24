# Getting Started - Portfolio Full Stack

## ⚡ Quick Start (30 seconds)

### macOS / Linux
```bash
cd /path/to/portfolio-fullstack
chmod +x start.sh
./start.sh
```

### Windows
```cmd
cd path\to\portfolio-fullstack
start.bat
```

Then open: **http://localhost:5173**

---

## 📋 Prerequisites

- Node.js (v14+) - [Download](https://nodejs.org/)
- npm (comes with Node.js)
- Git (for version control)
- MongoDB Atlas account (free) - [Create account](https://www.mongodb.com/cloud/atlas)

---

## 🔧 Manual Setup (if scripts don't work)

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Setup MongoDB
See **MONGODB_SETUP.md** for detailed MongoDB Atlas setup

### 4. Configure Environment
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env and add your MongoDB URI

# Frontend
cd frontend
cp .env.example .env
# No changes needed, it's already configured
```

### 5. Start Backend
```bash
cd backend
npm run dev
```

### 6. Start Frontend (in new terminal)
```bash
cd frontend
npm run dev
```

---

## 🌐 Access the Application

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | Portfolio website |
| Backend API | http://localhost:5000 | REST API |
| Admin Dashboard | http://localhost:5173/admin | Admin panel |

---

## 🗄️ Database Setup

### Using MongoDB Atlas (Recommended)

1. **Create Free Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up with email or Google

2. **Create Cluster**
   - Click "Create a Deployment"
   - Choose "Free" tier
   - Select your region
   - Click "Create"

3. **Create Database User**
   - Go to "Security" → "Database Access"
   - Click "Add New Database User"
   - Save username and password

4. **Whitelist IP**
   - Go to "Security" → "Network Access"
   - Click "Add IP Address"
   - Add your computer's IP (or 0.0.0.0/0 for development)

5. **Get Connection String**
   - Click "Connect"
   - Choose "Connect to your application"
   - Copy the connection string
   - Update `backend/.env` with it

See **MONGODB_SETUP.md** for detailed instructions.

---

## 📚 Project Structure

```
portfolio-fullstack/
├── frontend/           # React + Vite app
├── backend/            # Node.js + Express API
├── README.md           # Main documentation
├── MONGODB_SETUP.md    # Database setup guide
├── VERCEL_SETUP.md     # Frontend deployment
├── RENDER_SETUP.md     # Backend deployment
├── start.sh            # macOS/Linux startup script
├── start.bat           # Windows startup script
└── .gitignore          # Git ignore rules
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel
```
See **VERCEL_SETUP.md** for detailed steps

### Backend (Render)
See **RENDER_SETUP.md** for detailed steps

---

## 🐛 Troubleshooting

### Backend won't start
**Error**: `Failed to start server bad auth: Authentication failed`
**Solution**: 
- Check MongoDB URI in `backend/.env`
- Verify username/password are correct
- Ensure your IP is whitelisted in MongoDB Atlas

### Frontend can't connect to API
**Error**: CORS error or blank page
**Solution**:
- Verify backend is running on http://localhost:5000
- Check `VITE_API_URL` in `frontend/.env` is correct
- Check browser console for error messages

### Port already in use
**Error**: `EADDRINUSE: address already in use :::5000`
**Solution**:
```bash
# macOS/Linux - Kill process using port 5000
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### npm install fails
**Error**: `npm ERR! code ERESOLVE`
**Solution**:
```bash
npm install --legacy-peer-deps
```

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster...
JWT_SECRET=your_secret_key
ADMIN_EMAIL=your_email@gmail.com
ADMIN_PASSWORD=your_password
CLIENT_URL=http://localhost:5173
SMTP_SERVICE=gmail
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_TO=your_email@gmail.com
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📞 Support

- Check existing documentation files
- Review troubleshooting section above
- Check browser console (F12) for error details
- Check terminal output for server errors

---

## ✅ Verification Checklist

After startup, verify:
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] No console errors
- [ ] MongoDB connected (check backend terminal)
- [ ] Can access http://localhost:5173
- [ ] Projects are loading

---

**Happy coding! 🎉**
