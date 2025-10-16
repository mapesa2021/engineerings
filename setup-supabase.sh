#!/bin/bash

echo "🚀 Olerum Engineering - Supabase Production Setup"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the olerum-engineering directory."
    exit 1
fi

echo "✅ Project directory confirmed"
echo ""

echo "📋 PREREQUISITES CHECKLIST:"
echo "============================"
echo "1. ✅ Supabase account created at https://supabase.com"
echo "2. ✅ Supabase project created with name: olerum-engineering-db"
echo "3. ✅ Database password saved securely"
echo "4. ✅ Project URL copied from Supabase dashboard"
echo "5. ✅ Anon/Public key copied from Supabase dashboard"
echo "6. ✅ Service Role key copied from Supabase dashboard"
echo ""

read -p "Have you completed all the prerequisites above? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please complete the prerequisites first, then run this script again."
    echo ""
    echo "📖 SETUP INSTRUCTIONS:"
    echo "1. Go to https://supabase.com and create an account"
    echo "2. Create a new project named 'olerum-engineering-db'"
    echo "3. Note down your database password"
    echo "4. Go to Project Settings → API"
    echo "5. Copy the Project URL and both API keys"
    echo ""
    exit 1
fi

echo "✅ Prerequisites confirmed!"
echo ""

echo "🔧 ENVIRONMENT SETUP"
echo "===================="

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "📝 .env.local file found. Please update it with your Supabase credentials:"
    echo ""
    echo "Required variables:"
    echo "- NEXT_PUBLIC_SUPABASE_URL=your_project_url"
    echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key"
    echo "- SUPABASE_SERVICE_ROLE_KEY=your_service_role_key"
    echo ""
    echo "Example:"
    echo "NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    echo "SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    echo ""
else
    echo "📝 Creating .env.local file..."
    cp env-template.txt .env.local
    echo "✅ .env.local file created. Please update it with your Supabase credentials."
fi

echo "🗄️ DATABASE SETUP"
echo "================="
echo "Next steps:"
echo "1. Go to your Supabase project dashboard"
echo "2. Navigate to SQL Editor"
echo "3. Copy and paste the contents of database-schema.sql"
echo "4. Run the SQL script to create all tables"
echo "5. Verify tables are created in the Table Editor"
echo ""

echo "🔐 ADMIN USER SETUP"
echo "==================="
echo "Default admin credentials will be created:"
echo "- Username: admin"
echo "- Password: olerum2024"
echo ""
echo "⚠️  IMPORTANT: Change the password after first login!"
echo ""

echo "🌐 PRODUCTION DEPLOYMENT"
echo "========================"
echo "After database setup, you can deploy to:"
echo "1. Vercel (recommended for Next.js)"
echo "2. Netlify"
echo "3. Any static hosting provider"
echo ""

echo "📦 BUILD FOR PRODUCTION"
echo "======================="
echo "Run these commands to build for production:"
echo "npm run build"
echo "npm run export"
echo ""

echo "🎉 SETUP COMPLETE!"
echo "=================="
echo "Your Olerum Engineering website is ready for production!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Run the database schema in Supabase"
echo "3. Test locally: npm run dev"
echo "4. Deploy to your chosen hosting platform"
echo ""
echo "📖 For detailed deployment instructions, see:"
echo "- DEPLOYMENT_GUIDE.md"
echo "- NETLIFY_DEPLOYMENT.md"
echo "- ADMIN_README.md"
echo ""






