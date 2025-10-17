# Production Deployment Guide

This guide explains how to properly deploy the addiction recovery app to a production environment with working payments.

## Architecture Overview

The application consists of two separate services:
1. **Frontend** - React/Vite application (served statically)
2. **Backend** - Node.js/Express server (handles payment processing)

## Environment Configuration

### Frontend Environment Variables

Create a `.env.production` file in the root of your frontend project with:

```env
# Production API URL (your backend domain)
VITE_API_URL=https://your-backend-domain.com
```

### Backend Environment Variables

Create a `.env` file in the backend directory with:

```env
# Port for the backend server
PORT=5000

# ZenoPay API Key
ZENO_API_KEY=your_actual_zenopay_api_key_here
```

## Deployment Options

### Option 1: Separate Hosting (Recommended)

1. **Frontend Deployment**:
   - Build the frontend: `npm run build`
   - Deploy the `dist` folder to a static hosting service (Netlify, Vercel, etc.)

2. **Backend Deployment**:
   - Deploy the backend to a Node.js hosting service (Heroku, Render, DigitalOcean, etc.)
   - Ensure the backend is accessible via HTTPS

### Option 2: Same Server Deployment

If you're deploying both frontend and backend to the same server:

1. Build the frontend: `npm run build`
2. Configure your web server to:
   - Serve static files from the `dist` folder
   - Proxy API requests to the backend (e.g., `/api/*` to `http://localhost:5000/api/*`)

## Setting Up Your Production Environment

### 1. Update Frontend Environment

In your production frontend `.env.production` file:

```env
VITE_API_URL=https://your-backend-domain.com
```

Replace `https://your-backend-domain.com` with your actual backend URL.

### 2. Deploy Backend

Deploy your backend to a hosting service that supports Node.js. Make sure to:

- Set the `ZENO_API_KEY` environment variable
- Use a production-ready database (not the in-memory Map)
- Configure proper CORS settings
- Use HTTPS

### 3. Update Netlify Configuration (if using Netlify)

If you're using Netlify for frontend hosting, add this to your `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20.19.0"
  NETLIFY_NEXT_PLUGIN_SKIP = "true"

# Proxy API requests to your backend
[[redirects]]
  from = "/api/*"
  to = "https://your-backend-domain.com/api/:splat"
  status = 200
```

## Common Issues and Solutions

### Issue: Payments not working in production
**Solution**: Make sure `VITE_API_URL` is correctly set in your production environment.

### Issue: CORS errors
**Solution**: Ensure your backend has proper CORS configuration:

```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:5173'],
  credentials: true
}));
```

### Issue: Environment variables not loading
**Solution**: Make sure you're using the correct file names:
- Development: `.env`
- Production: `.env.production`

## Testing Your Deployment

1. Deploy both frontend and backend
2. Set the correct `VITE_API_URL` in your frontend environment
3. Visit your frontend URL
4. Complete the quiz and attempt to make a payment
5. Check browser console and network tab for any errors

## Need Help?

If you're still experiencing issues with payments in production:

1. Check browser console for JavaScript errors
2. Check network tab to see if API requests are being made to the correct URL
3. Verify your backend is accessible and running
4. Ensure `ZENO_API_KEY` is properly set in your backend environment

For further assistance, please provide:
- Your frontend URL
- Your backend URL
- Any error messages from the browser console
- Any error messages from the backend logs