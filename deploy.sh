#!/bin/bash

# 🚀 Olerum Engineering Deployment Script

echo "🌱 Olerum Engineering - Building for Production..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the olerum-engineering directory."
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Export static files
echo "📤 Exporting static files..."
npm run export

# Create deployment package
echo "📦 Creating deployment package..."
cd out

# Create zip file
zip -r ../olerum-engineering-production.zip .

# Get file size
FILE_SIZE=$(du -h olerum-engineering-production.zip | cut -f1)

# Success message
echo ""
echo "✅ Deployment package created successfully!"
echo "📁 File: olerum-engineering-production.zip"
echo "📏 Size: $FILE_SIZE"
echo "📍 Location: $(pwd)/olerum-engineering-production.zip"
echo ""
echo "🚀 Ready for deployment to any static hosting provider!" 