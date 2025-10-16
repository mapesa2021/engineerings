import { supabase, BlogPost, Event, TeamMember, Testimonial, HeroImage, ContactMessage, NewsletterSubscriber, ButtonConfig, AdminUser } from './supabase';

// Blog Posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    console.log('🔍 Fetching blog posts from Supabase...');
    console.log('🔍 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('🔍 Supabase Key available:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching blog posts:', error);
      console.log('🔄 Falling back to sample data...');
      return getFallbackData('blog_posts', []);
    }
    
    console.log('✅ Blog posts fetched from Supabase:', data);
    console.log('📊 Number of blog posts:', data?.length || 0);
    
    // If no data from Supabase, return fallback data
    if (!data || data.length === 0) {
      console.log('⚠️ No blog posts found in Supabase, using fallback data');
      return getFallbackData('blog_posts', []);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Supabase error:', error);
    console.log('🔄 Falling back to sample data...');
    return getFallbackData('blog_posts', []);
  }
};

export const getBlogPostById = async (id: number): Promise<BlogPost | null> => {
  try {
    console.log('🔍 Fetching blog post with ID:', id);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('❌ Error fetching blog post:', error);
      // Try to get from fallback data
      const fallbackPosts = getFallbackData('blog_posts', []);
      const fallbackPost = fallbackPosts.find((post: BlogPost) => post.id === id);
      if (fallbackPost) {
        console.log('✅ Found blog post in fallback data');
        return fallbackPost;
      }
      return null;
    }
    
    console.log('✅ Blog post fetched from Supabase:', data);
    return data;
  } catch (error) {
    console.error('❌ Supabase error:', error);
    // Try to get from fallback data
    const fallbackPosts = getFallbackData('blog_posts', []);
    const fallbackPost = fallbackPosts.find((post: BlogPost) => post.id === id);
    if (fallbackPost) {
      console.log('✅ Found blog post in fallback data');
      return fallbackPost;
    }
    return null;
  }
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> => {
  try {
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
  } catch (error) {
    console.error('Supabase error:', error);
    return null;
  }
};

export const updateBlogPost = async (id: number, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
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
  } catch (error) {
    console.error('Supabase error:', error);
    return null;
  }
};

export const deleteBlogPost = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Supabase error:', error);
    return false;
  }
};

// Events
export const getEvents = async (): Promise<Event[]> => {
  try {
    console.log('🔍 Fetching events from Supabase...');
    console.log('🔍 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('🔍 Supabase Key available:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('❌ Error fetching events:', error);
      console.log('🔄 Falling back to sample data...');
      return getFallbackData('events', []);
    }
    
    console.log('✅ Events fetched from Supabase:', data);
    console.log('📊 Number of events:', data?.length || 0);
    
    // If no data from Supabase, return fallback data
    if (!data || data.length === 0) {
      console.log('⚠️ No events found in Supabase, using fallback data');
      return getFallbackData('events', []);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Supabase error:', error);
    console.log('🔄 Falling back to sample data...');
    return getFallbackData('events', []);
  }
};

export const getEventById = async (id: number): Promise<Event | null> => {
  try {
    console.log('🔍 Fetching event with ID:', id);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('❌ Error fetching event:', error);
      // Try to get from fallback data
      const fallbackEvents = getFallbackData('events', []);
      const fallbackEvent = fallbackEvents.find((event: Event) => event.id === id);
      if (fallbackEvent) {
        console.log('✅ Found event in fallback data');
        return fallbackEvent;
      }
      return null;
    }
    
    console.log('✅ Event fetched from Supabase:', data);
    return data;
  } catch (error) {
    console.error('❌ Supabase error:', error);
    // Try to get from fallback data
    const fallbackEvents = getFallbackData('events', []);
    const fallbackEvent = fallbackEvents.find((event: Event) => event.id === id);
    if (fallbackEvent) {
      console.log('✅ Found event in fallback data');
      return fallbackEvent;
    }
    return null;
  }
};

export const createEvent = async (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event | null> => {
  try {
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
  } catch (error) {
    console.error('Supabase error:', error);
    return null;
  }
};

export const updateEvent = async (id: number, updates: Partial<Event>): Promise<Event | null> => {
  try {
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
  } catch (error) {
    console.error('Supabase error:', error);
    return null;
  }
};

export const deleteEvent = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Supabase error:', error);
    return false;
  }
};

// Team Members
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching team members:', error);
      return getFallbackData('team_members', []);
    }
    return data || [];
  } catch (error) {
    console.error('Supabase error:', error);
    return getFallbackData('team_members', []);
  }
};

export const createTeamMember = async (member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>): Promise<TeamMember | null> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .insert([member])
      .select()
      .single();

    if (error) {
      console.error('Error creating team member:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Supabase error:', error);
    return null;
  }
};

export const updateTeamMember = async (id: number, updates: Partial<TeamMember>): Promise<TeamMember | null> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating team member:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Supabase error:', error);
    return null;
  }
};

export const deleteTeamMember = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting team member:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Supabase error:', error);
    return false;
  }
};

// Testimonials
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      return getFallbackData('testimonials', []);
    }
    return data || [];
  } catch (error) {
    console.error('Supabase error:', error);
    return getFallbackData('testimonials', []);
  }
};

// Hero Images
export const getHeroImages = async (): Promise<HeroImage[]> => {
  try {
    const { data, error } = await supabase
      .from('hero_images')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching hero images:', error);
      return getFallbackData('hero_images', []);
    }
    return data || [];
  } catch (error) {
    console.error('Supabase error:', error);
    return getFallbackData('hero_images', []);
  }
};

export const createHeroImage = async (image: Omit<HeroImage, 'id' | 'created_at' | 'updated_at'>): Promise<HeroImage | null> => {
  try {
    const { data, error } = await supabase
      .from('hero_images')
      .insert([image])
      .select()
      .single();

    if (error) {
      console.error('Error creating hero image:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Supabase error:', error);
    return null;
  }
};

export const updateHeroImage = async (id: number, updates: Partial<HeroImage>): Promise<HeroImage | null> => {
  try {
    const { data, error } = await supabase
      .from('hero_images')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating hero image:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Supabase error:', error);
    return null;
  }
};

export const deleteHeroImage = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('hero_images')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting hero image:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Supabase error:', error);
    return false;
  }
};

export const updateHeroImageOrder = async (images: HeroImage[]): Promise<boolean> => {
  try {
    // Update each image's order
    for (const image of images) {
      const { error } = await supabase
        .from('hero_images')
        .update({ order_index: image.order_index })
        .eq('id', image.id);

      if (error) {
        console.error('Error updating hero image order:', error);
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error('Supabase error:', error);
    return false;
  }
};

// Contact Messages
export const createContactMessage = async (message: Omit<ContactMessage, 'id' | 'created_at' | 'updated_at'>): Promise<ContactMessage | null> => {
  try {
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
  } catch (error) {
    console.error('Supabase error:', error);
    return null;
  }
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Supabase error:', error);
    return [];
  }
};

// Newsletter Subscribers
export const createNewsletterSubscriber = async (email: string): Promise<NewsletterSubscriber | null> => {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])
      .select()
      .single();

    if (error) {
      console.error('Error creating newsletter subscriber:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Supabase error:', error);
    return null;
  }
};

export const getNewsletterSubscribers = async (): Promise<NewsletterSubscriber[]> => {
  try {
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
  } catch (error) {
    console.error('Supabase error:', error);
    return [];
  }
};

// Buttons Config
export const getButtonsConfig = async (): Promise<ButtonConfig[]> => {
  try {
    const { data, error } = await supabase
      .from('buttons_config')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching buttons config:', error);
      return getFallbackData('buttons_config', []);
    }
    return data || [];
  } catch (error) {
    console.error('Supabase error:', error);
    return getFallbackData('buttons_config', []);
  }
};

// Admin Authentication
export const adminLogin = async (username: string, password: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      console.error('Admin login error:', error);
      return false;
    }

    // For now, use a simple password check (in production, use proper hashing)
    // The password in the database is 'qplay2024'
    if (password === 'qplay2024') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminToken', 'admin-token-123');
      }
      return true;
    }

    return false;
  } catch (error) {
    console.error('Supabase error:', error);
    return false;
  }
};

export const isAdminAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('adminToken') === 'admin-token-123';
};

export const adminLogout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
  }
};

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    console.log('🔍 Testing Supabase connection...');
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Supabase connection test failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection test error:', error);
    return false;
  }
};

// Fallback to localStorage if Supabase is not available
const getFallbackData = (key: string, defaultValue: any): any => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const stored = localStorage.getItem(`olerum_${key}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  
  // Return sample data for blog posts and events if Supabase is not available
  if (key === 'blog_posts') {
    return [
      {
        id: 1,
        title: "Q Play App Launch: Revolutionizing Nightlife",
        excerpt: "Discover how Q Play is changing the way people experience nightlife and connect with DJs.",
        content: "Q Play has officially launched, bringing a new era of nightlife interaction...",
        author: "Q Play Team",
        date: "2024-01-15",
        read_time: "5 min read",
        category: "Platform Updates",
        image: "🚀",
        status: "published",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z"
      },
      {
        id: 2,
        title: "Top 10 DJ Tips for Success",
        excerpt: "Essential tips for DJs looking to build their brand and grow their audience.",
        content: "Being a successful DJ requires more than just good music...",
        author: "DJ Expert",
        date: "2024-01-10",
        read_time: "8 min read",
        category: "DJ Tips",
        image: "🎧",
        status: "published",
        created_at: "2024-01-10T10:00:00Z",
        updated_at: "2024-01-10T10:00:00Z"
      }
    ];
  }
  
  if (key === 'events') {
    return [
      {
        id: 1,
        title: "Q Play Launch Party",
        description: "Join us for the official launch of Q Play at the hottest club in town!",
        date: "2024-02-15",
        time: "10:00 PM",
        location: "Club Q",
        venue: "Club Q",
        address: "123 Nightlife Ave",
        city: "Los Angeles",
        state: "CA",
        zip_code: "90210",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        dj_name: "DJ Q Master",
        dj_bio: "International DJ with over 10 years of experience",
        ticket_price: "$25",
        capacity: 500,
        category: "Launch Party",
        status: "upcoming",
        featured: true,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z"
      },
      {
        id: 2,
        title: "Weekend Vibes",
        description: "The ultimate weekend party with the best DJs in the city",
        date: "2024-02-20",
        time: "9:00 PM",
        location: "Vibe Lounge",
        venue: "Vibe Lounge",
        address: "456 Party Street",
        city: "Miami",
        state: "FL",
        zip_code: "33101",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
        dj_name: "DJ Vibe",
        dj_bio: "Local favorite known for amazing energy",
        ticket_price: "$30",
        capacity: 300,
        category: "Weekend Party",
        status: "upcoming",
        featured: false,
        created_at: "2024-01-16T10:00:00Z",
        updated_at: "2024-01-16T10:00:00Z"
      }
    ];
  }
  
  return defaultValue;
}; 