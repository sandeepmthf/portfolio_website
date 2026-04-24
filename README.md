# Dynamic Portfolio Website (MERN)

Production-ready full-stack portfolio with public website + protected admin dashboard.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Auth: JWT admin authentication

## Project Structure
- `client/` - Portfolio frontend + admin dashboard UI
- `server/` - Express API + MongoDB models
- `client/src/admin/` - Admin dashboard pages/components

## Features Implemented
- Public sections: Hero, About, Skills, Projects (dynamic), Experience, Achievements, Certifications, Contact
- JWT-based admin login and protected route
- Admin CRUD for projects, resume URL update, certificate add
- Contact form API (Nodemailer)
- Input validation with `express-validator`
- Password hashing with `bcryptjs`
- Dark/light toggle, neon accents, glassmorphism cards, responsive layout, Framer Motion scroll animations
- SEO meta tags + resume download button

## Local Setup
### 1) Backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

## Default Admin Credentials
On first server start, admin user is auto-seeded from env:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## API Endpoints
- `POST /api/auth/login`
- `GET /api/projects`
- `POST /api/projects` (protected)
- `PUT /api/projects/:id` (protected)
- `DELETE /api/projects/:id` (protected)
- `GET /api/certificates`
- `POST /api/certificates` (protected)
- `GET /api/resume`
- `POST /api/resume` (protected)
- `POST /api/contact`

## Deployment
### Frontend (Vercel)
- Set root to `client`
- Env: `VITE_API_URL=<your-backend-url>/api`

### Backend (Render or AWS EC2)
- Set root to `server`
- Build command: `npm install`
- Start command: `npm start`
- Configure all vars from `server/.env.example`

### Database (MongoDB Atlas)
- Create cluster and user
- Add network IP access
- Set `MONGO_URI` in backend env
