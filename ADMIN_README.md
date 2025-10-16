# Olerum Engineering Admin Panel

This admin panel allows administrators to manage the Olerum Engineering website content, including blog posts and hero slider images.

## Access Information

- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `olerum2024`

## Features

### Blog Management
- Create, edit, and delete blog posts
- Rich text editor for content creation
- Image upload support
- SEO-friendly URLs
- Draft and publish functionality

### Hero Section Management
- Upload and manage hero slider images
- Set image titles and descriptions
- Control image order and visibility
- Responsive image optimization

### Content Management
- Manage testimonials
- Update team member information
- Control project showcases
- Newsletter subscription management

## Quick Start

1. **Access the admin panel**
   ```
   http://your-domain.com/admin
   ```

2. **Login with credentials**
   - Username: `admin`
   - Password: `olerum2024`

3. **Navigate to desired section**
   - Blog posts: `/admin/blog`
   - Hero images: `/admin/hero`
   - Testimonials: `/admin/testimonials`
   - Team members: `/admin/team`

## Security Notes

- Change the default password immediately after first login
- Use strong, unique passwords
- Regularly backup your content
- Monitor admin access logs

## File Structure

```
olerum-engineering/
├── pages/admin/           # Admin panel pages
│   ├── index.tsx         # Admin dashboard
│   ├── login.tsx         # Login page
│   ├── blog.tsx          # Blog management
│   └── hero.tsx          # Hero section management
├── components/            # Admin components
├── lib/                  # Database functions
└── utils/                # Admin utilities
```

## Content Guidelines

- Use high-quality images (recommended: 1920x1080 for hero images)
- Write engaging, SEO-optimized content
- Include relevant keywords naturally
- Keep content fresh and updated regularly

## Troubleshooting

### Common Issues

1. **Login not working**
   - Verify username and password
   - Check browser console for errors
   - Clear browser cache and cookies

2. **Images not uploading**
   - Check file size (max 5MB recommended)
   - Verify file format (JPG, PNG, WebP)
   - Ensure proper permissions

3. **Content not saving**
   - Check internet connection
   - Verify form completion
   - Look for validation errors

## Support

For technical support or questions about the admin panel, please contact the development team.

**Note**: This admin panel is designed for the Olerum Engineering environmental engineering website. All content should align with the website's mission of promoting environmental sustainability and engineering excellence. 