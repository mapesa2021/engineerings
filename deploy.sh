#!/bin/bash

# Deployment script for the addiction recovery app

echo "Starting deployment process..."

# Build the frontend
echo "Building frontend..."
npm run build

if [ $? -ne 0 ]; then
  echo "Frontend build failed!"
  exit 1
fi

echo "Frontend build completed successfully!"

# Add all changes to git
echo "Adding changes to git..."
git add .

# Check if there are changes to commit
if ! git diff-index --quiet HEAD --; then
  echo "Enter commit message:"
  read commit_message
  git commit -m "$commit_message"
  
  # Push to repository
  echo "Pushing to repository..."
  git push origin master
  
  if [ $? -ne 0 ]; then
    echo "Failed to push to repository!"
    exit 1
  fi
  
  echo "Changes pushed to repository successfully!"
else
  echo "No changes to commit."
fi

echo "Deployment process completed!"
echo "Netlify will automatically deploy the new version."