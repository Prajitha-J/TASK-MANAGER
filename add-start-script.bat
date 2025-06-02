
@echo off
echo Adding "start" script to package.json...
node src/electron/add-start-script.js
if %ERRORLEVEL% neq 0 (
  echo Error adding start script!
  pause
  exit /b %ERRORLEVEL%
)
echo.
echo Done! You can now run "npm start" to launch the application.
pause
