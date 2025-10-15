#!/usr/bin/env node

/**
 * Database Setup Script
 * This script helps you set up the database tables for the admin panel
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Database Setup Helper');
console.log('========================\n');

console.log('To fix the data persistence issue, follow these steps:\n');

console.log('1. 📊 Update Database Schema');
console.log('   - Go to your Supabase Dashboard');
console.log('   - Navigate to SQL Editor');
console.log('   - Copy and paste the contents of database-setup.sql');
console.log('   - Click "Run" to execute the SQL\n');

console.log('2. 🔑 Check Environment Variables');
console.log('   - Ensure your .env.local file has:');
console.log('     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
console.log('     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key\n');

console.log('3. 🧪 Test the Fix');
console.log('   - Run: npm run dev');
console.log('   - Go to /admin/hero');
console.log('   - Make changes and verify they persist\n');

console.log('4. 📋 What This Fixes');
console.log('   ✅ Data persists across all devices and browsers');
console.log('   ✅ Changes are stored in a real database');
console.log('   ✅ Fallback to localStorage if database fails');
console.log('   ✅ Better error handling and logging\n');

console.log('📖 For detailed instructions, see: DATABASE_FIX_GUIDE.md\n');

// Check if database-setup.sql exists
const setupFile = path.join(__dirname, 'database-setup.sql');
if (fs.existsSync(setupFile)) {
  console.log('✅ database-setup.sql found');
  const content = fs.readFileSync(setupFile, 'utf8');
  const tableCount = (content.match(/CREATE TABLE/g) || []).length;
  console.log(`📊 Found ${tableCount} table definitions\n`);
} else {
  console.log('❌ database-setup.sql not found');
}

// Check if .env.local exists
const envFile = path.join(__dirname, '.env.local');
if (fs.existsSync(envFile)) {
  console.log('✅ .env.local found');
  const content = fs.readFileSync(envFile, 'utf8');
  const hasSupabaseUrl = content.includes('NEXT_PUBLIC_SUPABASE_URL');
  const hasSupabaseKey = content.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  if (hasSupabaseUrl && hasSupabaseKey) {
    console.log('✅ Supabase environment variables found\n');
  } else {
    console.log('⚠️  Missing Supabase environment variables\n');
  }
} else {
  console.log('❌ .env.local not found - create it with your Supabase credentials\n');
}

console.log('🚀 Ready to fix your data persistence issues!');





