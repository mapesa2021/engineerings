# 🚀 Olerum Engineering - Production Deployment Guide

## ✅ **Current Status**
- ✅ Supabase project created: `kuhzazzxuobvakawadck`
- ✅ Environment variables configured
- ✅ Database schema ready
- ✅ Admin credentials: `admin` / `olerum2024`

## 📋 **Step-by-Step Production Setup**

### **Step 1: Database Setup**
1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard/project/kuhzazzxuobvakawadck
2. **Navigate to SQL Editor**
3. **Copy and paste** the contents of `database-setup.sql`
4. **Run the script** to create all tables
5. **Verify tables** are created in the Table Editor

### **Step 2: Test Local Connection**
```bash
npm run dev
```
Visit: http://localhost:3000
- ✅ Main website should load
- ✅ Admin panel: http://localhost:3000/admin
- ✅ Login with: `admin` / `olerum2024`

### **Step 3: Build for Production**
```bash
npm run build
npm run export
```

### **Step 4: Choose Deployment Platform**

## 🌐 **Deployment Options**

### **Option A: Vercel (Recommended for Next.js)**

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Configure Environment Variables** in Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### **Option B: Netlify**

1. **Build the project**:
   ```bash
   npm run build
   npm run export
   ```

2. **Upload to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `out/` folder
   - Or connect your GitHub repository

3. **Set Environment Variables** in Netlify Dashboard

### **Option C: Traditional Hosting**

1. **Build static files**:
   ```bash
   npm run build
   npm run export
   ```

2. **Upload to your hosting provider**:
   - Upload contents of `out/` folder to `public_html/`
   - Configure domain and SSL

## 🔧 **Environment Variables for Production**

Make sure these are set in your hosting platform:

```env
NEXT_PUBLIC_SUPABASE_URL=https://kuhzazzxuobvakawadck.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1aHphenp4dW9idmFrYXdhZGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMDkxNTksImV4cCI6MjA3MTg4NTE1OX0.maJMKEoXXv8lw6VujpW22UhvvYoA2ihGDYFDeyEofzg
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=olerum2024
```

## 🔐 **Security Checklist**

- [ ] Change default admin password after first login
- [ ] Enable SSL/HTTPS on your domain
- [ ] Set up proper CORS policies in Supabase
- [ ] Configure Row Level Security (RLS) policies
- [ ] Set up backup strategy for database
- [ ] Monitor for security vulnerabilities

## 📊 **Post-Deployment Tasks**

1. **Test all functionality**:
   - ✅ Website loads correctly
   - ✅ Admin panel accessible
   - ✅ Contact forms work
   - ✅ Blog posts display
   - ✅ Images load properly

2. **SEO Setup**:
   - Update `robots.txt`
   - Submit sitemap to search engines
   - Configure Google Analytics
   - Set up Google Search Console

3. **Performance Optimization**:
   - Enable image optimization
   - Configure CDN
   - Monitor Core Web Vitals
   - Set up caching strategies

## 🎯 **Quick Deployment Commands**

```bash
# Build for production
npm run build && npm run export

# Deploy to Vercel
vercel --prod

# Deploy to Netlify (if using CLI)
netlify deploy --prod --dir=out
```

## 📞 **Support & Troubleshooting**

### **Common Issues**:

1. **Database Connection Errors**:
   - Verify Supabase credentials
   - Check RLS policies
   - Ensure tables exist

2. **Build Errors**:
   - Clear `.next` folder
   - Reinstall dependencies
   - Check for TypeScript errors

3. **Admin Panel Issues**:
   - Verify admin user exists in database
   - Check authentication logic
   - Clear browser cache

### **Getting Help**:
- Check Supabase documentation
- Review Next.js deployment guides
- Monitor application logs

## 🎉 **Success Indicators**

Your Olerum Engineering website is production-ready when:

- ✅ Website loads at your domain
- ✅ Admin panel accessible at `/admin`
- ✅ Database operations work
- ✅ Contact forms submit successfully
- ✅ All pages render correctly
- ✅ Mobile responsiveness works
- ✅ SSL certificate active

---

**Your Olerum Engineering website is now ready for the world! 🌍**






