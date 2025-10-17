# Netlify Combined Deployment Guide

This guide explains how to deploy the addiction recovery app to Netlify with both frontend and backend functionality working together.

## Architecture Overview

Netlify is primarily a static site hosting platform, but we can use Netlify Functions to handle our backend API needs:
- The frontend (React/Vite app) is served as static files
- Backend functionality is implemented as Netlify Functions
- Payments work through the Zeno API integration in the functions

## Prerequisites

1. A Netlify account
2. The project repository connected to Netlify
3. A ZenoPay API key

## Deployment Steps

### 1. Configure Environment Variables

In your Netlify site settings, go to "Site settings" → "Build & deploy" → "Environment" and add:

```
ZENO_API_KEY = your_actual_zenopay_api_key_here
```

### 2. Update netlify.toml

Ensure your [netlify.toml](file:///Users/clubzilla/Documents/ADDICTION/addiction-app/netlify.toml) file includes:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20.19.0"
  NETLIFY_NEXT_PLUGIN_SKIP = "true"
```

### 3. Deploy to Netlify

Netlify will automatically deploy your site when you push to your connected repository, or you can trigger a manual deploy.

## How It Works

1. **Frontend**: The React application is built and served as static files from the `dist` directory
2. **Backend Functions**: API endpoints are implemented as Netlify Functions in the `netlify/functions` directory
3. **API Calls**: Frontend makes API calls to `/.netlify/functions/function-name`
4. **Environment Variables**: Sensitive data like API keys are stored in Netlify's environment variables

## Netlify Functions

The following functions are implemented:

1. **process-payment**: Handles payment processing via Zeno API
2. **payment-status**: Checks the status of a payment
3. **zeno-webhook**: Receives webhook notifications from Zeno API

## Testing the Deployment

1. Deploy to Netlify
2. Visit your Netlify site URL
3. Complete the quiz and attempt to make a payment
4. Check that:
   - The frontend loads correctly
   - API calls are made to `/.netlify/functions/*`
   - Payment processing works
   - Payment status checking works

## Limitations

1. **State Persistence**: Netlify Functions are stateless, so payment status is stored in memory (not persistent across function restarts)
2. **Cold Starts**: Functions may have a slight delay when first accessed
3. **Execution Time**: Functions have a maximum execution time limit

## Production Considerations

For a production deployment, consider these improvements:

1. **Database Integration**: Replace the in-memory Map with a proper database (Supabase, MongoDB, etc.)
2. **Error Handling**: Add more robust error handling and logging
3. **Security**: Add authentication and rate limiting
4. **Monitoring**: Implement proper monitoring and alerting

## Troubleshooting

### Issue: Functions not deploying
**Solution**: Ensure the `netlify/functions` directory structure is correct and each function exports a `handler`.

### Issue: Environment variables not accessible
**Solution**: Verify the environment variables are set in Netlify's dashboard and have the correct names.

### Issue: API calls failing
**Solution**: Check the browser console and Netlify function logs for error messages.

### Issue: Payments not working
**Solution**: 
1. Verify `ZENO_API_KEY` is set in Netlify environment variables
2. Check Netlify function logs for payment processing errors
3. Ensure the Zeno API key is valid

## Benefits of This Approach

1. **Simplified Hosting**: Everything hosted on Netlify
2. **No CORS Issues**: Frontend and backend functions on the same domain
3. **Automatic Scaling**: Netlify handles function scaling
4. **Integrated Deployment**: Single deployment process for frontend and backend
5. **Free Tier**: Netlify's free tier is sufficient for small applications

## Need Help?

If you're experiencing issues with the Netlify deployment:

1. Check the Netlify deploy logs for build errors
2. Check the function logs for runtime errors
3. Verify environment variables are correctly set
4. Ensure the ZenoPay API key is valid

For further assistance, please provide:
- Your Netlify site URL
- Error messages from the browser console
- Error messages from Netlify function logs