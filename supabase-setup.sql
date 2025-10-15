-- Olerum Engineering Database Setup for Supabase
-- Run this script in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'viewer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author_id UUID REFERENCES users(id),
    author_name VARCHAR(100),
    category VARCHAR(100),
    tags TEXT[],
    featured_image_url TEXT,
    status post_status DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    view_count INTEGER DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT
);

-- Hero images table for slider management
CREATE TABLE IF NOT EXISTS hero_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    description TEXT,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    link_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    company VARCHAR(100),
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    bio TEXT,
    image_url TEXT,
    email VARCHAR(255),
    linkedin_url TEXT,
    twitter_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image_url TEXT,
    gallery_urls TEXT[],
    status VARCHAR(50) DEFAULT 'active',
    featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    phone VARCHAR(20),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Tree packages table for donation options
CREATE TABLE IF NOT EXISTS tree_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    tree_count INTEGER NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_name VARCHAR(100),
    donor_email VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    package_id UUID REFERENCES tree_packages(id),
    payment_method VARCHAR(50),
    payment_status payment_status DEFAULT 'pending',
    transaction_id VARCHAR(255),
    message TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    location VARCHAR(255),
    image_url TEXT,
    registration_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_hero_images_order ON hero_images(order_index);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(payment_status);
CREATE INDEX IF NOT EXISTS idx_events_dates ON events(start_date, end_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_images_updated_at BEFORE UPDATE ON hero_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tree_packages_updated_at BEFORE UPDATE ON tree_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON donations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: olerum2024)
INSERT INTO users (username, email, password_hash, role) 
VALUES ('admin', 'admin@olerum-engineering.org', crypt('olerum2024', gen_salt('bf')), 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert sample hero images
INSERT INTO hero_images (title, description, image_url, alt_text, order_index) VALUES
('Environmental Engineering Excellence', 'Leading sustainable solutions for a better future', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', 'Environmental engineering project', 1),
('Sustainable Development', 'Innovative approaches to environmental challenges', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', 'Sustainable development concept', 2),
('Green Technology', 'Advancing eco-friendly engineering solutions', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', 'Green technology innovation', 3)
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, title, company, content, rating, is_featured) VALUES
('Dr. Sarah Johnson', 'Environmental Scientist', 'GreenTech Solutions', 'Olerum Engineering has consistently delivered innovative solutions that balance environmental protection with economic viability. Their expertise in sustainable engineering is unmatched.', 5, true),
('Michael Chen', 'Project Manager', 'EcoCorp', 'Working with Olerum Engineering has transformed our approach to environmental compliance. Their solutions are both practical and forward-thinking.', 5, true),
('Maria Rodriguez', 'Sustainability Director', 'Global Industries', 'Olerum Engineering''s commitment to environmental excellence has helped us achieve our sustainability goals while maintaining operational efficiency.', 5, true)
ON CONFLICT DO NOTHING;

-- Insert sample team members
INSERT INTO team_members (name, title, bio, email, order_index) VALUES
('Dr. Sarah Green', 'Chief Environmental Engineer', 'Leading expert in sustainable engineering with 15+ years of experience in environmental protection and green technology.', 'sarah.green@olerum-engineering.org', 1),
('Michael Chen', 'Senior Project Manager', 'Specialized in managing complex environmental engineering projects with a focus on sustainable development.', 'michael.chen@olerum-engineering.org', 2),
('Maria Rodriguez', 'Sustainability Consultant', 'Expert in environmental impact assessment and sustainable business practices.', 'maria.rodriguez@olerum-engineering.org', 3)
ON CONFLICT DO NOTHING;

-- Insert sample tree packages
INSERT INTO tree_packages (name, description, price, tree_count, is_featured) VALUES
('Starter Package', 'Begin your environmental impact journey', 25.00, 5, true),
('Growth Package', 'Make a significant environmental difference', 50.00, 12, true),
('Impact Package', 'Create lasting environmental change', 100.00, 25, true),
('Legacy Package', 'Build a sustainable future for generations', 250.00, 60, false)
ON CONFLICT DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tree_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read access" ON hero_images FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (status = 'active');
CREATE POLICY "Public read access" ON tree_packages FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON events FOR SELECT USING (is_active = true);

-- Create policies for authenticated users
CREATE POLICY "Authenticated users can insert" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can insert" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can insert" ON donations FOR INSERT WITH CHECK (true);

-- Create policies for admin users (you'll need to implement proper admin authentication)
-- For now, we'll allow all operations for authenticated users
CREATE POLICY "Authenticated users full access" ON users FOR ALL USING (true);
CREATE POLICY "Authenticated users full access" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Authenticated users full access" ON hero_images FOR ALL USING (true);
CREATE POLICY "Authenticated users full access" ON testimonials FOR ALL USING (true);
CREATE POLICY "Authenticated users full access" ON team_members FOR ALL USING (true);
CREATE POLICY "Authenticated users full access" ON projects FOR ALL USING (true);
CREATE POLICY "Authenticated users full access" ON contact_messages FOR ALL USING (true);
CREATE POLICY "Authenticated users full access" ON newsletter_subscriptions FOR ALL USING (true);
CREATE POLICY "Authenticated users full access" ON tree_packages FOR ALL USING (true);
CREATE POLICY "Authenticated users full access" ON donations FOR ALL USING (true);
CREATE POLICY "Authenticated users full access" ON events FOR ALL USING (true);

-- Success message
SELECT 'Olerum Engineering database setup completed successfully!' as status;






