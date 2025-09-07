#!/usr/bin/env node

/**
 * Database Migration Script
 * Migrates data from localStorage to Supabase database
 */

const { createClient } = require('@supabase/supabase-js');

// Your Supabase credentials
const supabaseUrl = 'https://kuhzazzxuobvakawadck.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1aHphenp4dW9idmFrYXdhZGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMDkxNTksImV4cCI6MjA3MTg4NTE1OX0.maJMKEoXXv8lw6VujpW22UhvvYoA2ihGDYFDeyEofzg';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔄 Starting database migration...');

// Test database connection
async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('hero_images')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error);
      return false;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Run migration
async function migrate() {
  const connected = await testConnection();
  if (!connected) {
    console.log('❌ Cannot proceed without database connection');
    return;
  }
  
  console.log('✅ Ready to migrate data to database');
  console.log('📝 This will sync your localStorage data to Supabase');
  console.log('🚀 After migration, your admin panel will use the database');
  
  // You can add migration logic here
  console.log('💡 To complete migration, run the admin panel and use the migration function');
}

migrate().catch(console.error);





