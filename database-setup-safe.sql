-- Olerum Engineering Database Setup (Safe Version)
-- Run this in Supabase SQL Editor
-- This version handles existing objects gracefully

-- Enable extensions (ignore if already exists)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create types (ignore if already exists)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'viewer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    author_name VARCHAR(100),
    status post_status DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero images table
CREATE TABLE IF NOT EXISTS hero_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    image_url TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    content TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    bio TEXT,
    email VARCHAR(255),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image_url TEXT,
    client VARCHAR(255),
    location VARCHAR(255),
    completion_date DATE,
    budget VARCHAR(100),
    duration VARCHAR(100),
    team_size INTEGER,
    is_active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    technologies TEXT[],
    results TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    working_hours VARCHAR(255),
    social_links JSONB,
    cta_buttons JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Buttons configuration table
CREATE TABLE IF NOT EXISTS buttons_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section VARCHAR(100) NOT NULL,
    text VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    variant VARCHAR(50) DEFAULT 'primary',
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert admin user (ignore if exists)
INSERT INTO users (username, email, password_hash, role) 
VALUES ('admin', 'admin@olerum-engineering.org', crypt('olerum2024', gen_salt('bf')), 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert sample data (ignore if exists)
INSERT INTO hero_images (title, image_url, order_index) VALUES
('Environmental Engineering Excellence', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', 1),
('Sustainable Development', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', 2)
ON CONFLICT DO NOTHING;

-- Insert sample site settings (ignore if exists)
INSERT INTO site_settings (company_name, phone, email, address, working_hours, social_links, cta_buttons) VALUES
('Oleum Company Limited', '+255 768 216 901', 'info@oleum.co.tz', 'Dar Ubungo, Tanzania', 'Mon-Fri: 8AM-6PM', 
 '{"facebook": "https://facebook.com/oleumcompany", "linkedin": "https://linkedin.com/company/oleum"}',
 '{"primary": "Get Quote", "secondary": "Learn More"}')
ON CONFLICT DO NOTHING;

-- Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;

SELECT 'Database setup completed successfully!' as status;





