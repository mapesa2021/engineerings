# Combined Deployment Guide

This guide explains how to deploy the addiction recovery app with both frontend and backend running together in a single deployment.

## Architecture Overview

The combined deployment runs both the frontend and backend on the same server:
- The backend (Node.js/Express) serves both API endpoints and static frontend files
- All requests to `/api/*` are handled by the backend
- All other requests serve the React frontend application

## Prerequisites

1. Node.js 20.19.0 or higher
2. npm (comes with Node.js)

## Deployment Steps

### 1. Build and Start the Application

You can deploy the application using either method:

#### Method 1: Using the deployment script (Recommended)
```bash
./deploy-combined.sh
```

#### Method 2: Manual deployment
```bash
# Build the frontend
npm run build

# Start the combined server
npm start
```

### 2. Access the Application

Once the server is running, access the application at:
```
http://localhost:5000
```

Or if you've deployed to a hosting service, use your domain:
```
https://your-domain.com
```

## How It Works

1. **Frontend Build**: The React application is built into static files in the `dist` directory
2. **Backend Serving**: The Node.js server serves:
   - API endpoints at `/api/*` routes
   - Static frontend files from the `dist` directory for all other routes
3. **Single Port**: Both frontend and backend run on the same port (default 5000)

## Environment Variables

Create a `.env` file in the `backend` directory with:

```env
# Port for the server (default is 5000)
PORT=5000

# ZenoPay API Key
ZENO_API_KEY=your_actual_zenopay_api_key_here
```

## Hosting Options

### Option 1: Traditional Hosting (VPS, Dedicated Server)

1. Upload the entire project to your server
2. Install dependencies:
   ```bash
   npm install
   cd backend
   npm install
   cd ..
   ```
3. Set up environment variables in `backend/.env`
4. Run the deployment script:
   ```bash
   ./deploy-combined.sh
   ```

### Option 2: Cloud Platforms (Heroku, Render, etc.)

Most cloud platforms can automatically detect and deploy Node.js applications.

1. Create a `Procfile` in the root directory:
   ```
   web: npm start
   ```

2. Set environment variables in your platform's dashboard:
   - `ZENO_API_KEY`: Your ZenoPay API key
   - `PORT`: The port provided by your hosting platform (often automatically set)

3. Deploy using your platform's standard deployment process

### Option 3: Docker Deployment

Create a `Dockerfile` in the root directory:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install
RUN cd backend && npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
```

Build and run the Docker container:
```bash
docker build -t addiction-app .
docker run -p 5000:5000 -e ZENO_API_KEY=your_key_here addiction-app
```

## Testing the Deployment

1. Run the deployment script or manual steps
2. Open your browser to `http://localhost:5000`
3. Complete the quiz and attempt to make a payment
4. Check that:
   - The frontend loads correctly
   - API calls are made to the same domain
   - Payment processing works
   - Payment status checking works

## Troubleshooting

### Issue: Frontend not loading
**Solution**: Ensure the frontend has been built (`npm run build`) and the `dist` directory exists.

### Issue: API calls failing
**Solution**: Check that the backend routes are correctly defined and that CORS is properly configured.

### Issue: Payments not working
**Solution**: 
1. Verify `ZENO_API_KEY` is set in the backend environment
2. Check backend logs for payment processing errors
3. Ensure the backend can make outbound HTTPS requests

## Benefits of Combined Deployment

1. **Simplified Hosting**: Only one server to manage
2. **No CORS Issues**: Frontend and backend on the same domain
3. **Easier Configuration**: No need to manage separate URLs
4. **Reduced Complexity**: Single deployment process

## Limitations

1. **Scaling**: Frontend and backend scale together (less flexible than separate deployments)
2. **Technology Lock-in**: Both frontend and backend must be deployed together
3. **Restart Impact**: Updating either frontend or backend requires restarting the entire application

## Need Help?

If you're experiencing issues with the combined deployment:

1. Check the server console for error messages
2. Verify environment variables are correctly set
3. Ensure the ZenoPay API key is valid
4. Check that the frontend builds successfully

For further assistance, please provide:
- Error messages from the server console
- Error messages from the browser console
- Your deployment platform (if applicable)