@echo off
REM Portfolio Fullstack Startup Script for Windows
REM This script starts both frontend and backend servers

echo.
echo 🚀 Starting Portfolio Application...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm first.
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm found: %NPM_VERSION%
echo.

REM Check if both folders exist
if not exist "backend\" (
    echo ❌ Error: backend\ folder not found
    exit /b 1
)
if not exist "frontend\" (
    echo ❌ Error: frontend\ folder not found
    exit /b 1
)

echo 📁 Project structure verified
echo.

REM Install dependencies if needed
echo 📦 Checking dependencies...

if not exist "backend\node_modules\" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend\node_modules\" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo ✅ Dependencies ready
echo.

REM Check .env files
echo 🔐 Checking environment configuration...

if not exist "backend\.env" (
    echo ⚠️  backend\.env not found
    echo Creating from template...
    copy backend\.env.example backend\.env
    echo ❌ Please update backend\.env with your MongoDB credentials
    echo See MONGODB_SETUP.md for instructions
    exit /b 1
)

if not exist "frontend\.env" (
    echo ⚠️  frontend\.env not found
    echo Creating from template...
    copy frontend\.env.example frontend\.env
)

echo ✅ Environment configuration ready
echo.

REM Start servers
echo 🎯 Starting servers...
echo.
echo Backend will start on: http://localhost:5000
echo Frontend will start on: http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start backend in new window
cd backend
start "Backend" cmd /k npm run dev
cd ..

REM Wait a moment for backend to start
timeout /t 2 /nobreak

REM Start frontend in new window
cd frontend
start "Frontend" cmd /k npm run dev
cd ..

echo ✅ Both servers starting in new windows...
echo.
pause
