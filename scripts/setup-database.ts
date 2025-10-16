import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kqbthffrjimvahmfxius.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxYnRoZmZyamltdmFobWZ4aXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MjQzMzksImV4cCI6MjA3MTEwMDMzOX0.gLQfKMmx23jt8WElS2yPuXAeMLZpJGi28yB-534JbrE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupDatabase() {
  console.log('🚀 Setting up Q Play database...');

  try {
    // Test the connection
    console.log('🔍 Testing database connection...');
    
    const { data: testData, error: testError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);

    if (testError) {
      console.log('📊 Database tables need to be created...');
      console.log('📝 Please run the SQL schema in your Supabase dashboard:');
      console.log('1. Go to your Supabase project dashboard');
      console.log('2. Click on "SQL Editor" in the left sidebar');
      console.log('3. Copy and paste the contents of qplay-database-schema.sql');
      console.log('4. Click "Run" to execute the SQL');
      console.log('');
      console.log('After running the SQL, your database will be ready!');
    } else {
      console.log(`✅ Database is working! Found ${testData?.length || 0} blog posts`);
      console.log('🎉 Your Q Play database is ready!');
    }

    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Deploy your website to production');
    console.log('2. Access admin panel at /admin');
    console.log('3. Login with: username: admin, password: qplay2024');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
  }
}

// Run the setup
setupDatabase(); 