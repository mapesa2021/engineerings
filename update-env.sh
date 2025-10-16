#!/bin/bash

echo "🔧 Updating .env.local with Supabase credentials..."
echo ""

# Create .env.local with the provided credentials
cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://kuhzazzxuobvakawadck.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1aHphenp4dW9idmFrYXdhZGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMDkxNTksImV4cCI6MjA3MTg4NTE1OX0.maJMKEoXXv8lw6VujpW22UhvvYoA2ihGDYFDeyEofzg
SUPABASE_URL=https://kuhzazzxuobvakawadck.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1aHphenp4dW9idmFrYXdhZGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMDkxNTksImV4cCI6MjA3MTg4NTE1OX0.maJMKEoXXv8lw6VujpW22UhvvYoA2ihGDYFDeyEofzg

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=olerum2024

# Optional: Email Service (for contact forms and notifications)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_app_password

# Optional: Payment Processing (if using ZenoPay)
# ZENOPAY_API_KEY=your_zenopay_api_key
# ZENOPAY_SECRET_KEY=your_zenopay_secret_key
EOF

echo "✅ .env.local file updated with Supabase credentials!"
echo ""
echo "📋 Next Steps:"
echo "1. Run the database schema in Supabase SQL Editor"
echo "2. Test the connection: npm run dev"
echo "3. Deploy to production"
echo ""






