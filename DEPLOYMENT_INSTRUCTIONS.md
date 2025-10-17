# Deployment Instructions

This document provides step-by-step instructions for deploying the addiction recovery app to Netlify with full payment functionality.

## Repository Information

- **Repository URL**: https://github.com/mapesa2021/engineering.git
- **Branch**: master

## Netlify Deployment Setup

### 1. Connect Repository to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Select "GitHub" as your Git provider
4. Connect your GitHub account if not already connected
5. Select the `engineering` repository
6. Configure the deployment settings:
   - Branch to deploy: `master`
   - Build command: `npm run build`
   - Publish directory: `dist`

### 2. Configure Environment Variables

In Netlify dashboard:
1. Go to your site settings
2. Navigate to "Build & deploy" → "Environment"
3. Add the following environment variable:
   ```
   ZENO_API_KEY = your_actual_zenopay_api_key_here
   ```

### 3. Configure Netlify Functions

The project is already configured to use Netlify Functions:
- Functions directory: `netlify/functions`
- No additional configuration needed

### 4. Set Up Redirects for SPA

The project includes a `_redirects` file in the `public` directory that handles SPA routing:
```
/*    /index.html   200
```

### 5. Trigger Deployment

1. Push any changes to your repository (already done)
2. Netlify will automatically deploy the site
3. Or manually trigger a deploy from the Netlify dashboard

## Environment Configuration

### Development Environment
- Frontend: Vite development server on port 5173
- Backend: Express server on port 5001
- API calls use relative paths

### Production Environment (Netlify)
- Frontend: Served as static files
- Backend: Implemented as Netlify Functions
- API calls use `/.netlify/functions/` paths

## Testing the Deployment

After deployment:

1. Visit your Netlify site URL
2. Complete the quiz
3. Click "Get the E-book"
4. Enter a phone number and click "Pay Now"
5. Verify that:
   - Payment processing initiates
   - USSD prompt is sent to the phone
   - Payment status checking works
   - User is redirected upon successful payment

## Troubleshooting

### Common Issues

1. **Payments not working**:
   - Check that `ZENO_API_KEY` is set in Netlify environment variables
   - Verify the API key is valid
   - Check Netlify function logs for errors

2. **Site not loading properly**:
   - Check the build logs for errors
   - Verify the publish directory is set to `dist`
   - Check browser console for JavaScript errors

3. **API calls failing**:
   - Check browser network tab for failed requests
   - Verify Netlify functions are deployed
   - Check function logs for errors

### Checking Function Logs

1. Go to your Netlify site dashboard
2. Navigate to "Functions" in the sidebar
3. Click on the function name (e.g., `process-payment`)
4. View the logs for execution details

## Updating the Deployment

To update your deployment:

1. Make changes to your local code
2. Commit and push to the repository:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin master
   ```
3. Netlify will automatically deploy the new version

## Need Help?

If you encounter any issues with the deployment:

1. Check the Netlify build logs
2. Check the function logs
3. Verify environment variables are correctly set
4. Ensure your ZenoPay API key is valid

For further assistance, please provide:
- Your Netlify site URL
- Error messages from the browser console
- Error messages from Netlify function logs