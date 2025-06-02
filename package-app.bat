
@echo off
echo Building and Packaging Task Manager Desktop App...
echo.
echo Step 1: Installing dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
  echo Error installing dependencies!
  pause
  exit /b %ERRORLEVEL%
)
echo.
echo Step 2: Building React app...
call npm run build
if %ERRORLEVEL% neq 0 (
  echo Error building React app!
  pause
  exit /b %ERRORLEVEL%
)
echo.
echo Step 3: Packaging as desktop application...
call node package-electron.js
if %ERRORLEVEL% neq 0 (
  echo Error packaging desktop application!
  pause
  exit /b %ERRORLEVEL%
)
echo.
echo Done! Check the desktop-build folder for your executable.
pause
