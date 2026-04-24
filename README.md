# Sandeep Kumar's Full Stack Portfolio

A modern, responsive full-stack portfolio built with **React**, **Node.js**, **Express**, and **MongoDB**.

## 📁 Project Structure

```
portfolio-fullstack/
├── frontend/          # React + Vite frontend application
│   ├── src/
│   │   ├── pages/     # HomePage and other pages
│   │   ├── components/
│   │   ├── services/  # API service integration
│   │   ├── context/   # Authentication context
│   │   └── assets/
│   ├── public/        # Static files (certificates, logos)
│   ├── package.json
│   └── vite.config.js
│
├── backend/           # Node.js + Express server
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Authentication & validation
│   │   └── config/       # Database config
│   ├── package.json
│   ├── .env            # Environment variables
│   └── .env.example
│
├── README.md
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/sandeepmthf/portfolio_website.git
cd portfolio-fullstack
```

#### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file in the backend folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
JWT_SECRET=your_secret_key
ADMIN_EMAIL=your_email@gmail.com
ADMIN_PASSWORD=your_password
CLIENT_URL=http://localhost:5173
SMTP_SERVICE=gmail
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_TO=your_email@gmail.com
```

Start the backend server:
```bash
npm run dev
```
Backend will run on `http://localhost:5000`

#### 3. Setup Frontend
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📚 Features

### Frontend
✅ Modern React UI with Framer Motion animations
✅ Responsive design (mobile, tablet, desktop)
✅ Dark/Light mode toggle
✅ Project showcase with filtering
✅ Skills section with multiple categories
✅ Experience & achievements timeline
✅ Certifications display
✅ Coding profiles (LeetCode, CodeForces)
✅ Contact form with email integration

### Backend
✅ RESTful API with Express.js
✅ MongoDB for data persistence
✅ JWT authentication
✅ Project management (CRUD)
✅ Certificate management
✅ Contact form handling
✅ Input validation & error handling

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- React Icons
- React Helmet (SEO)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemon (development)
- CORS enabled

## 📝 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?category=Full%20Stack` - Get filtered projects
- `POST /api/projects` - Create project (authenticated)
- `PUT /api/projects/:id` - Update project (authenticated)
- `DELETE /api/projects/:id` - Delete project (authenticated)

### Certificates
- `GET /api/certificates` - Get all certificates
- `POST /api/certificates` - Create certificate (authenticated)

### Contact
- `POST /api/contact` - Send contact message

### Auth
- `POST /api/auth/login` - Admin login

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password
CLIENT_URL=http://localhost:5173
SMTP_SERVICE=gmail
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_TO=your_email@gmail.com
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Set build command: `npm run build`
4. Set start command: `npm run dev`
5. Set environment variable: `VITE_API_URL=<your-backend-url>/api`

### Backend (Render/Railway/Heroku)
1. Create account on Render/Railway/Heroku
2. Connect GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Set all environment variables from `.env`

## 📱 Portfolio Sections

1. **Hero Section** - Professional introduction with CTA
2. **Skills** - Frontend, Backend, Database, Cloud, ML, UI/UX, Graphic Design
3. **Projects** - Ghartak, Jeevan Setu, Gurukul with live demos and GitHub links
4. **Experience** - IBM SkillsBuild, Gurukul Institute
5. **Achievements** - SIH, IIIT Hackathon
6. **Certifications** - IBM SDE, Professional certificates with PDF download
7. **Coding Profiles** - LeetCode, CodeForces with profile links
8. **Contact** - Email form with Nodemailer integration

## 🔧 Development Commands

### Backend
```bash
cd backend
npm install       # Install dependencies
npm run dev       # Start dev server with nodemon
npm start         # Start production server
```

### Frontend
```bash
cd frontend
npm install       # Install dependencies
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

## 📧 Contact & Social

- **Email:** sandeep636764@gmail.com
- **Phone:** +91 6367648334
- **GitHub:** https://github.com/sandeepmthf
- **LeetCode:** https://leetcode.com/u/sandeepmth/
- **CodeForces:** https://codeforces.com/profile/sandeepmth

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ by Sandeep Kumar**
