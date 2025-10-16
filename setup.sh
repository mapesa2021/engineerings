#!/bin/bash

echo "🌱 Setting up Olerum Engineering Next.js project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cp env-template.txt .env.local
    echo "✅ .env.local file created. Please update it with your configuration."
else
    echo "✅ .env.local file already exists"
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "🎉 Setup complete! You can now:"
    echo "   • Run 'npm run dev' to start the development server"
    echo "   • Run 'npm run build' to build for production"
    echo "   • Run 'npm run export' to create static files"
    echo ""
    echo "📖 Check the README.md for more information"
else
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi 