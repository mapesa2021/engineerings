@echo off
echo 🌱 Setting up Olerum Engineering Next.js project...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Create .env.local file if it doesn't exist
if not exist ".env.local" (
    echo 📝 Creating .env.local file...
    copy env-template.txt .env.local
    echo ✅ .env.local file created. Please update it with your configuration.
) else (
    echo ✅ .env.local file already exists
)

REM Build the project
echo 🔨 Building project...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build completed successfully!
    echo.
    echo 🎉 Setup complete! You can now:
    echo    • Run 'npm run dev' to start the development server
    echo    • Run 'npm run build' to build for production
    echo    • Run 'npm run export' to create static files
    echo.
    echo 📖 Check the README.md for more information
) else (
    echo ❌ Build failed! Please check the error messages above.
    pause
    exit /b 1
)

pause 