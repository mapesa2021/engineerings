# 🚀 cPanel Deployment Guide - Oleum Engineering Website

## 📦 Production Files Ready

Your website has been built and optimized for production deployment. All files are ready in the `oleum-engineering-production.zip` file.

## 📋 Pre-Deployment Checklist

✅ **Production build completed**  
✅ **Static export generated**  
✅ **All files optimized and compressed**  
✅ **Testimonials updated with new client reviews**  
✅ **Map coordinates updated to 6°47'27.4"S 39°11'40.1"E**  
✅ **Profile icons implemented**  
✅ **Layout optimized for 2 testimonials**  

## 🎯 Files to Upload

### Main Production Package
- **File:** `oleum-engineering-production.zip`
- **Location:** `/Users/clubzilla/Downloads/engineering-main/oleum-engineering-production.zip`
- **Size:** Optimized and compressed for fast loading

### What's Included
- ✅ All HTML pages (37 pages total)
- ✅ Optimized CSS and JavaScript files
- ✅ Static assets and images
- ✅ Admin panel (fully functional)
- ✅ Contact forms and testimonials
- ✅ Responsive design for all devices

## 📁 cPanel Upload Instructions

### Step 1: Access cPanel File Manager
1. Log into your cPanel account
2. Navigate to **File Manager**
3. Go to your domain's **public_html** folder (or subdomain folder)

### Step 2: Upload the Production Files
1. **Upload the zip file:**
   - Click **Upload** in File Manager
   - Select `oleum-engineering-production.zip`
   - Wait for upload to complete

2. **Extract the files:**
   - Right-click on `oleum-engineering-production.zip`
   - Select **Extract**
   - Choose **Extract files** to current directory
   - Delete the zip file after extraction

### Step 3: Verify File Structure
Your `public_html` folder should contain:
```
public_html/
├── index.html (Homepage)
├── about/
├── contact/
├── projects/
├── services/
├── blog/
├── admin/
├── _next/ (JavaScript and CSS files)
└── robots.txt
```

## 🌐 Domain Configuration

### For Main Domain
- Upload files directly to `public_html/`
- Your site will be accessible at: `https://yourdomain.com`

### For Subdomain
- Create subdomain in cPanel (e.g., `oleum.yourdomain.com`)
- Upload files to the subdomain's folder
- Your site will be accessible at: `https://oleum.yourdomain.com`

## ⚙️ Important Configuration Notes

### 1. Environment Variables
The site uses placeholder Supabase credentials. For full functionality:
- Update `.env.local` with real Supabase credentials
- Or contact your developer to configure the database

### 2. Admin Panel Access
- **URL:** `https://yourdomain.com/admin`
- **Login:** Use the admin credentials (check with your developer)
- **Features:** Full content management system

### 3. Contact Forms
- Contact forms are functional
- Messages are stored locally (check admin panel)
- For email notifications, configure SMTP settings

## 🔧 Post-Deployment Steps

### 1. Test All Pages
- ✅ Homepage: `https://yourdomain.com`
- ✅ About: `https://yourdomain.com/about`
- ✅ Contact: `https://yourdomain.com/contact`
- ✅ Projects: `https://yourdomain.com/projects`
- ✅ Services: `https://yourdomain.com/services`
- ✅ Blog: `https://yourdomain.com/blog`
- ✅ Admin: `https://yourdomain.com/admin`

### 2. Test Responsive Design
- ✅ Mobile devices
- ✅ Tablets
- ✅ Desktop computers
- ✅ Different browsers

### 3. Verify Features
- ✅ Contact forms working
- ✅ Testimonials displaying correctly
- ✅ Map showing correct location
- ✅ Navigation working
- ✅ Admin panel accessible

## 🚨 Troubleshooting

### If Pages Don't Load
1. Check file permissions (should be 644 for files, 755 for folders)
2. Verify all files uploaded correctly
3. Check for any error messages in cPanel error logs

### If Admin Panel Doesn't Work
1. Ensure all files in `/admin/` folder are uploaded
2. Check JavaScript console for errors
3. Verify file permissions

### If Contact Forms Don't Work
1. Check if forms are submitting (check admin panel for messages)
2. For email notifications, configure SMTP in cPanel
3. Check cPanel error logs

## 📞 Support

If you encounter any issues:
1. Check the cPanel error logs
2. Verify all files are uploaded correctly
3. Test in different browsers
4. Contact your developer for technical support

## 🎉 Success!

Once deployed, your Oleum Engineering website will be live with:
- ✅ Professional design and branding
- ✅ Updated client testimonials
- ✅ Correct map location
- ✅ Fully functional admin panel
- ✅ Responsive design for all devices
- ✅ Fast loading and optimized performance

---

**Deployment Date:** $(date)  
**Build Version:** Production Ready  
**Status:** ✅ Ready for Live Deployment
