# Setup Guide - Portfolio Full Stack

This guide will help you set up the project locally after cloning from GitHub.

## Quick Start

### 1. Backend Setup

```bash
cd backend

# Copy the .env.example to .env
cp .env.example .env

# Update .env with your MongoDB credentials
# Edit the MONGO_URI line with your actual MongoDB Atlas credentials
nano .env  # or your preferred editor

# Install dependencies
npm install

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

In a new terminal window:

```bash
cd frontend

# Copy the .env.example to .env
cp .env.example .env

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## Configuration Details

### Backend (.env)

Key variables to configure:

- **MONGO_URI**: Your MongoDB Atlas connection string
  - Replace `username` and `password` with your MongoDB credentials
  - Format: `mongodb+srv://username:password@cluster0.qeohfoa.mongodb.net/portfolio?authSource=admin&retryWrites=true&w=majority`

- **JWT_SECRET**: A secure random string for JWT token signing
  - Example: `your-super-secret-jwt-key-123456`

- **ADMIN_EMAIL** & **ADMIN_PASSWORD**: Admin account credentials
  - Used for admin dashboard login

- **SMTP_USER** & **SMTP_PASS**: Gmail credentials for sending emails
  - Note: Use an app-specific password, not your regular Gmail password

### Frontend (.env)

- **VITE_API_URL**: Backend API URL
  - Local development: `http://localhost:5000/api`
  - Production: `https://your-backend-url.com/api`

## MongoDB Atlas Setup

If you don't have MongoDB Atlas set up yet:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user (username and password)
5. Add your IP to the network access list (0.0.0.0/0 for development)
6. Copy the connection string and update `MONGO_URI` in `.env`

## Development Commands

### Backend
```bash
cd backend
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production
npm test         # Run tests (if configured)
```

### Frontend
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Testing the Connection

After starting both servers:

1. Open `http://localhost:5173` in your browser
2. The portfolio should load
3. Check the browser console for any errors
4. Verify MongoDB connection in backend terminal (look for "MongoDB connected" message)

## Troubleshooting

### Backend won't connect to MongoDB
- Check that your MONGO_URI is correct in `.env`
- Verify your IP is whitelisted in MongoDB Atlas
- Make sure your username and password don't contain special characters that need encoding

### Frontend can't reach backend
- Verify backend is running on port 5000
- Check that VITE_API_URL in frontend `.env` is correct
- Check browser console for CORS errors

### Port already in use
- Change PORT in backend `.env` to an unused port
- Or kill the process using the port:
  ```bash
  # macOS/Linux
  lsof -i :5000
  kill -9 <PID>
  
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

## Next Steps

1. Update content in the frontend pages
2. Add your projects to MongoDB
3. Deploy to Vercel (frontend) and Render/Railway (backend)
4. Set up email notifications for contact form

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [React + Vite Documentation](https://vitejs.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

**Need help?** Check the main README.md for more details about the project structure and deployment.
