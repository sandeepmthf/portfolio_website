#!/bin/bash

# Portfolio Fullstack Startup Script
# This script starts both frontend and backend servers

echo "🚀 Starting Portfolio Application..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node -v)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm -v)"
echo ""

# Check if both folders exist
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: backend/ or frontend/ folder not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "📁 Project structure verified"
echo ""

# Install dependencies if needed
echo "📦 Checking dependencies..."

if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

echo "✅ Dependencies ready"
echo ""

# Check .env files
echo "🔐 Checking environment configuration..."

if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found"
    echo "Creating from template..."
    cp backend/.env.example backend/.env
    echo "❌ Please update backend/.env with your MongoDB credentials"
    echo "See MONGODB_SETUP.md for instructions"
    exit 1
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  frontend/.env not found"
    echo "Creating from template..."
    cp frontend/.env.example frontend/.env
fi

echo "✅ Environment configuration ready"
echo ""

# Start servers
echo "🎯 Starting servers..."
echo ""
echo "Backend will start on: http://localhost:5000"
echo "Frontend will start on: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

sleep 2

# Start frontend in background
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

cleanup
