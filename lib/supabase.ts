import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not configured. Using fallback data.');
}

export const supabase = createClient(
  supabaseUrl || 'https://kuhzazzxuobvakawadck.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1aHphenp4dW9idmFrYXdhZGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMDkxNTksImV4cCI6MjA3MTg4NTE1OX0.maJMKEoXXv8lw6VujpW22UhvvYoA2ihGDYFDeyEofzg'
);

// Database types
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  read_time: string;
  category: string;
  image: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  image: string;
  dj_name: string;
  dj_bio: string;
  ticket_price: string;
  capacity: number;
  category: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  social_links: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HeroImage {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  is_active: boolean;
  subscribed_at: string;
  updated_at: string;
}

export interface ButtonConfig {
  id: number;
  button_name: string;
  button_text: string;
  button_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
} 