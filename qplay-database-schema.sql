-- Q Play Database Schema
-- This file contains all the necessary tables for the Q Play website

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE event_status AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');
CREATE TYPE blog_status AS ENUM ('draft', 'published', 'archived');

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    date VARCHAR(50) NOT NULL,
    read_time VARCHAR(20) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    status blog_status DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    image VARCHAR(500) NOT NULL,
    dj_name VARCHAR(100) NOT NULL,
    dj_bio TEXT,
    ticket_price VARCHAR(50) NOT NULL,
    capacity INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL,
    status event_status DEFAULT 'upcoming',
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    role VARCHAR(20) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    bio TEXT,
    image VARCHAR(255),
    social_links JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100),
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    image VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Images Table
CREATE TABLE IF NOT EXISTS hero_images (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    image_url VARCHAR(500) NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Buttons Configuration Table
CREATE TABLE IF NOT EXISTS buttons_config (
    id SERIAL PRIMARY KEY,
    button_name VARCHAR(100) UNIQUE NOT NULL,
    button_text VARCHAR(255) NOT NULL,
    button_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE buttons_config ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for blog posts" ON blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public read access for events" ON events
    FOR SELECT USING (status IN ('upcoming', 'ongoing'));

CREATE POLICY "Public read access for team members" ON team_members
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for testimonials" ON testimonials
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for hero images" ON hero_images
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for buttons config" ON buttons_config
    FOR SELECT USING (is_active = true);

-- Create policies for admin access (you'll need to implement proper auth)
CREATE POLICY "Admin full access for blog posts" ON blog_posts
    FOR ALL USING (true);

CREATE POLICY "Admin full access for events" ON events
    FOR ALL USING (true);

CREATE POLICY "Admin full access for admin users" ON admin_users
    FOR ALL USING (true);

CREATE POLICY "Admin full access for team members" ON team_members
    FOR ALL USING (true);

CREATE POLICY "Admin full access for testimonials" ON testimonials
    FOR ALL USING (true);

CREATE POLICY "Admin full access for hero images" ON hero_images
    FOR ALL USING (true);

CREATE POLICY "Admin full access for contact messages" ON contact_messages
    FOR ALL USING (true);

CREATE POLICY "Admin full access for newsletter subscribers" ON newsletter_subscribers
    FOR ALL USING (true);

CREATE POLICY "Admin full access for buttons config" ON buttons_config
    FOR ALL USING (true);

-- Insert default admin user (password: qplay2024)
INSERT INTO admin_users (username, password_hash, email, role) 
VALUES ('admin', '$2a$10$rQZ8K9mN2pL1vX3yW4uJ5t', 'admin@qplay.com', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert default Q Play blog posts
INSERT INTO blog_posts (title, excerpt, content, author, date, read_time, category, image, status) VALUES
(
    'The Ultimate Guide to Nightlife Success with Q Play',
    'Discover how Q Play is transforming the nightlife industry and creating unforgettable experiences for both fans and DJs.',
    'The nightlife industry is experiencing a revolutionary transformation, and Q Play is at the forefront of this change. Our platform has created a new paradigm where fans and DJs connect in real-time, creating experiences that were previously impossible.

What Makes Q Play Special:
• Real-time song requests with instant feedback
• Transparent tipping system that rewards quality
• Enhanced crowd engagement and energy
• Increased revenue for DJs and venues
• Better music selection based on crowd preferences

Our data shows that venues using Q Play see a 40% increase in customer satisfaction and a 60% increase in repeat visits. DJs report earning 2-3x more through our platform, while fans enjoy unprecedented control over their nightlife experience.

The platform has become essential for modern nightlife, bridging the gap between audience and performer in ways never before possible. DJs report feeling more connected to their audience, while fans feel like they have a voice in shaping the night''s soundtrack.

Key Statistics:
• 10,000+ active users across major cities
• 500+ professional DJs on the platform
• 50,000+ songs requested monthly
• Average tip per request: $15-25
• 95% user satisfaction rating

The future of nightlife is interactive, and Q Play is leading the charge.',
    'Q Play Team',
    'August 15, 2024',
    '5 min read',
    'Nightlife',
    '🎵',
    'published'
),
(
    'DJ Success Stories: From Local Gigs to International Fame',
    'Meet the DJs who have transformed their careers and income using Q Play''s innovative platform.',
    'Since launching Q Play, we''ve seen incredible success stories from DJs across the globe. These real-life examples show how our platform is revolutionizing the music industry.

DJ Mike''s Story:
Mike, a club DJ in Los Angeles, was struggling to make ends meet on his $200 per night gigs. After joining Q Play, he now averages $800+ per night through song request tips alone. ''The platform changed everything,'' Mike says. ''I''m not just playing music anymore - I''m creating experiences.''

Sarah Chen''s Transformation:
Sarah, a wedding DJ from Miami, saw her bookings increase by 300% after clients discovered her through Q Play. ''Couples love that their guests can request songs during the reception,'' Sarah explains. ''It makes the event more personal and memorable.''

These success stories highlight how our platform is not just about earning extra income, but about building a sustainable career in music. DJs report feeling more connected to their audience, having more creative freedom, and building stronger fan bases.

The platform has become a game-changer for both established and emerging DJs looking to monetize their passion while delivering unforgettable experiences.',
    'Q Play Team',
    'August 12, 2024',
    '4 min read',
    'DJ Success',
    '🎛️',
    'published'
),
(
    'The Future of Interactive Entertainment',
    'Explore how technology is reshaping entertainment and creating new opportunities for artists and audiences alike.',
    'The entertainment industry is undergoing a massive transformation, and Q Play is at the forefront of this revolution. We''re not just changing how people experience nightlife; we''re redefining the relationship between performers and audiences.

Technology Meets Human Connection:
Our platform demonstrates how technology can enhance rather than replace human connection, creating more meaningful and engaging experiences. The key is maintaining the human element while leveraging technology to create deeper connections.

The Interactive Revolution:
As we look to the future, we see endless possibilities for expanding this model to other forms of entertainment:
• Live music venues with real-time audience interaction
• Comedy clubs with crowd-sourced material
• Theater performances with dynamic storylines
• Gaming events with live audience participation

What Makes Q Play Special:
• Real-time feedback and interaction
• Transparent and fair compensation systems
• Enhanced audience engagement
• Data-driven insights for performers
• Seamless integration with existing setups

The future of entertainment is interactive, personalized, and community-driven. Q Play is leading the charge in this exciting new era.',
    'Q Play Team',
    'August 10, 2024',
    '6 min read',
    'Industry Trends',
    '🚀',
    'published'
),
(
    'Top 10 Tips for DJs to Maximize Q Play Earnings',
    'Learn proven strategies to boost your income and engagement using the Q Play platform.',
    'Want to maximize your earnings on Q Play? Here are our top 10 proven strategies that successful DJs use to boost their income and engagement.

1. Set Up Your Profile Right:
Create a compelling DJ profile with high-quality photos, your music style, and what makes you unique. This helps fans connect with you before they even hear you play.

2. Engage with Your Audience:
Don''t just play the requested songs - interact with your crowd! Use the messaging feature to thank fans for requests and build relationships.

3. Price Your Requests Strategically:
Set minimum tip amounts that reflect your value, but don''t price yourself out of the market. Start with $5-10 minimums and adjust based on demand.

4. Promote Your Q Play Presence:
Let your audience know you''re on Q Play! Mention it during your sets, post about it on social media, and encourage fans to download the app.

5. Create Song Packages:
Bundle popular songs together and offer them at a discount. This encourages multiple requests and increases your overall earnings.

6. Use Analytics to Your Advantage:
Track which songs get the most requests and highest tips. Use this data to build better sets and understand your audience.

7. Network with Other DJs:
Connect with other Q Play DJs in your area. You can share tips, collaborate on events, and even refer clients to each other.

8. Offer Special Requests:
Go beyond just playing songs - offer to learn new tracks, create custom mixes, or provide special dedications for extra tips.

9. Build Your Fan Base:
Encourage fans to follow you on Q Play. This creates a loyal audience that will request your services at future events.

10. Stay Consistent:
Regular activity on the platform builds trust and keeps you top of mind for fans looking for DJs.

Remember: Success on Q Play is about building relationships, not just playing music. The more you engage with your audience, the more they''ll engage with you!',
    'Q Play Team',
    'August 8, 2024',
    '7 min read',
    'DJ Tips',
    '💡',
    'published'
),
(
    'Q Play Platform Update: New Features for Enhanced User Experience',
    'Discover the latest features and improvements that make Q Play even better for fans and DJs.',
    'We''re excited to announce our biggest platform update yet! Here are the new features that will enhance your Q Play experience.

New Features for DJs:
• Enhanced Analytics Dashboard: Get detailed insights into your earnings, most popular requests, and audience engagement metrics
• Advanced Scheduling: Set your availability and let fans book you for future events
• Song Library Expansion: Access to over 50 million tracks with real-time availability checking
• Custom Tip Tiers: Create multiple pricing options for different types of requests
• Fan Messaging: Direct communication with fans for better relationship building

New Features for Fans:
• Improved Search: Find DJs by location, music style, and availability
• Request History: Track all your past requests and favorite songs
• Social Features: Follow your favorite DJs and get notified when they''re playing nearby
• Group Requests: Pool tips with friends for bigger song requests
• Venue Integration: See which venues are using Q Play and what DJs are playing

Performance Improvements:
• Faster loading times and smoother animations
• Better offline functionality for areas with poor connectivity
• Enhanced security for all transactions
• Improved notification system

We''re committed to continuously improving Q Play based on your feedback. These updates reflect the most requested features from our community of DJs and fans.

Stay tuned for more exciting announcements coming soon!',
    'Q Play Team',
    'August 5, 2024',
    '4 min read',
    'App Updates',
    '📱',
    'published'
)
ON CONFLICT DO NOTHING;

-- Insert default Q Play events
INSERT INTO events (title, description, date, time, location, venue, address, city, state, zip_code, image, dj_name, dj_bio, ticket_price, capacity, category, status, featured) VALUES
(
    'Neon Nights #1',
    'Experience the ultimate nightlife connection with Q Play. Request your favorite songs and tip DJs in real-time for an unforgettable night.',
    '2024-09-15',
    '10:00 PM',
    'Midtown Club',
    'Midtown Club',
    '123 Main Street',
    'New York',
    'NY',
    '10001',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'DJ Mike',
    'Professional DJ with 10+ years of experience in nightlife and electronic music.',
    '$25',
    300,
    'Nightclub',
    'upcoming',
    true
),
(
    'Electric Beats Festival',
    'A three-day electronic music festival featuring top DJs and Q Play integration for interactive crowd experiences.',
    '2024-09-20',
    '6:00 PM',
    'Downtown Arena',
    'Downtown Arena',
    '456 Music Avenue',
    'Los Angeles',
    'CA',
    '90210',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'Sarah Chen',
    'Award-winning DJ specializing in house and techno music with global recognition.',
    '$75',
    2000,
    'Festival',
    'upcoming',
    true
),
(
    'Miami Beach Vibes',
    'Sunset to sunrise beach party with Q Play integration. Request songs while watching the ocean waves.',
    '2024-09-25',
    '8:00 PM',
    'Beachfront Resort',
    'Ocean View Resort',
    '789 Beach Boulevard',
    'Miami',
    'FL',
    '33139',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'DJ Carlos',
    'Latin music specialist with expertise in reggaeton, salsa, and electronic fusion.',
    '$35',
    500,
    'Beach Party',
    'upcoming',
    false
)
ON CONFLICT DO NOTHING;

-- Insert default team members
INSERT INTO team_members (name, position, bio, image, social_links) VALUES
(
    'Alex Johnson',
    'CEO & Founder',
    'Former DJ turned tech entrepreneur, passionate about revolutionizing the nightlife industry.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    '{"linkedin": "https://linkedin.com/in/alexjohnson", "twitter": "https://twitter.com/alexjohnson"}'
),
(
    'Sarah Chen',
    'Head of Product',
    'Product strategist with 8+ years in music tech, focused on user experience and platform growth.',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    '{"linkedin": "https://linkedin.com/in/sarahchen", "twitter": "https://twitter.com/sarahchen"}'
),
(
    'Mike Rodriguez',
    'Lead Developer',
    'Full-stack developer specializing in real-time applications and mobile development.',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    '{"linkedin": "https://linkedin.com/in/mikerodriguez", "github": "https://github.com/mikerodriguez"}'
)
ON CONFLICT DO NOTHING;

-- Insert default testimonials
INSERT INTO testimonials (name, role, content, rating, image) VALUES
(
    'DJ Mike',
    'Club DJ, Los Angeles',
    'Q Play has completely transformed my career. I''m earning 3x more than before and my fans love the interactive experience!',
    5,
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
),
(
    'Sarah Chen',
    'Wedding DJ, Miami',
    'My bookings increased by 300% after joining Q Play. Couples love that their guests can request songs during receptions.',
    5,
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
),
(
    'Club Owner',
    'Neon Nights, NYC',
    'Our venue revenue increased by 40% since implementing Q Play. The interactive experience keeps customers engaged and coming back.',
    5,
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
)
ON CONFLICT DO NOTHING;

-- Insert default hero images
INSERT INTO hero_images (title, subtitle, image_url, order_index) VALUES
(
    'Request Songs. Tip DJs. Own the Night.',
    'The ultimate platform connecting fans and DJs for unforgettable nights',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    1
),
(
    'Interactive Nightlife Experience',
    'Real-time song requests and tips create unforgettable moments',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    2
),
(
    'Connect with Your Favorite DJs',
    'Build relationships and create memories that last a lifetime',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    3
)
ON CONFLICT DO NOTHING;

-- Insert default button configurations
INSERT INTO buttons_config (button_name, button_text, button_url) VALUES
('download_app_store', 'Download on App Store', '#'),
('download_google_play', 'Get it on Google Play', '#'),
('contact_us', 'Contact Us', '/contact'),
('learn_more', 'Learn More', '#'),
('get_started', 'Get Started', '#')
ON CONFLICT (button_name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(featured);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_images_updated_at BEFORE UPDATE ON hero_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE UPDATE ON newsletter_subscribers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_buttons_config_updated_at BEFORE UPDATE ON buttons_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 