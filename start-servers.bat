@echo off
echo ========================================
echo Starting API Reference Platform Servers
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] Starting Backend Server (Port 3002)...
start "Backend Server - Port 3002" cmd /k "node server.js"
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Server (Port 3001)...
start "Frontend Server - Port 3001" cmd /k "npm run dev"

echo.
echo ========================================
echo ✅ Both servers starting...
echo Backend:  http://localhost:3002
echo Frontend: http://localhost:3001
echo ========================================
echo.
echo Press any key to stop all servers...
pause >nul

echo Stopping servers...
taskkill /FI "WINDOWTITLE eq Backend Server - Port 3002" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Frontend Server - Port 3001" /F >nul 2>&1
echo Servers stopped.
