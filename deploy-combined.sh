#!/bin/bash

# Combined deployment script for frontend and backend
# This script builds the frontend and starts the combined server

echo "Building frontend..."
npm run build

if [ $? -ne 0 ]; then
  echo "Frontend build failed!"
  exit 1
fi

echo "Frontend build completed successfully!"

echo "Starting combined server..."
cd backend
node server.js