import { supabase, BlogPost, Event, TeamMember, Testimonial, HeroImage, ContactMessage, NewsletterSubscriber, ButtonConfig, AdminUser } from './supabase';

// Blog Posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
};

export const getBlogPostById = async (id: number): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data;
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    return null;
  }

  return data;
};

export const updateBlogPost = async (id: number, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating blog post:', error);
    return null;
  }

  return data;
};

export const deleteBlogPost = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }

  return true;
};

// Events
export const getEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .in('status', ['upcoming', 'ongoing'])
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data || [];
};

export const getEventById = async (id: number): Promise<Event | null> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  return data;
};

export const createEvent = async (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event | null> => {
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    return null;
  }

  return data;
};

export const updateEvent = async (id: number, updates: Partial<Event>): Promise<Event | null> => {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    return null;
  }

  return data;
};

export const deleteEvent = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    return false;
  }

  return true;
};

// Team Members
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }

  return data || [];
};

// Testimonials
export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data || [];
};

// Hero Images
export const getHeroImages = async (): Promise<HeroImage[]> => {
  const { data, error } = await supabase
    .from('hero_images')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching hero images:', error);
    return [];
  }

  return data || [];
};

// Contact Messages
export const createContactMessage = async (message: Omit<ContactMessage, 'id' | 'is_read' | 'created_at' | 'updated_at'>): Promise<ContactMessage | null> => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([message])
    .select()
    .single();

  if (error) {
    console.error('Error creating contact message:', error);
    return null;
  }

  return data;
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }

  return data || [];
};

// Newsletter Subscribers
export const subscribeToNewsletter = async (email: string): Promise<NewsletterSubscriber | null> => {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .upsert([{ email, is_active: true }], { onConflict: 'email' })
    .select()
    .single();

  if (error) {
    console.error('Error subscribing to newsletter:', error);
    return null;
  }

  return data;
};

export const getNewsletterSubscribers = async (): Promise<NewsletterSubscriber[]> => {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .eq('is_active', true)
    .order('subscribed_at', { ascending: false });

  if (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return [];
  }

  return data || [];
};

// Button Configurations
export const getButtonConfig = async (buttonName: string): Promise<ButtonConfig | null> => {
  const { data, error } = await supabase
    .from('buttons_config')
    .select('*')
    .eq('button_name', buttonName)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching button config:', error);
    return null;
  }

  return data;
};

// Admin Authentication
export const authenticateAdmin = async (username: string, password: string): Promise<AdminUser | null> => {
  // For now, we'll use a simple check. In production, you should use proper password hashing
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('username', username)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    console.error('Error authenticating admin:', error);
    return null;
  }

  // Simple password check (replace with proper hashing in production)
  if (password === 'qplay2024') {
    return data;
  }

  return null;
};

// Fallback to localStorage if Supabase is not available
export const getFallbackData = () => {
  if (typeof window === 'undefined') return null;

  return {
    blogPosts: JSON.parse(localStorage.getItem('olerum_blog_posts') || '[]'),
events: JSON.parse(localStorage.getItem('olerum_events') || '[]'),
testimonials: JSON.parse(localStorage.getItem('olerum_testimonials') || '[]'),
teamMembers: JSON.parse(localStorage.getItem('olerum_team_members') || '[]'),
  };
}; 