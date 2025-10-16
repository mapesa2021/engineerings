// Admin Data Storage Utility
// In production, this would be replaced with a proper database and API

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface HeroImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  order: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  order: number;
}

export interface TreePackage {
  id: number;
  name: string;
  description: string;
  treeCount: number;
  price: number;
  currency: string;
  features: string[];
  isPopular: boolean;
  order: number;
}

export interface Button {
  id: string;
  section: string;
  text: string;
  url: string;
  variant: 'primary' | 'secondary';
  order: number;
  isActive: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
  source: string; // 'homepage', 'contact', etc.
}

export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  avatar: string; // emoji or image URL
  email?: string;
  linkedin?: string;
  twitter?: string;
  order: number;
  isActive: boolean;
}

// Blog Posts Storage
export const getBlogPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('olerum_blog_posts');
  if (stored) {
    return JSON.parse(stored);
  }
  
           // Return default posts if none stored
         const defaultPosts: BlogPost[] = [
           {
             id: 1,
             title: "The Ultimate Guide to Nightlife Success with Q Play",
             excerpt: "Discover how Q Play is transforming the nightlife industry and creating unforgettable experiences for both fans and DJs.",
             content: "The nightlife industry is experiencing a revolutionary transformation, and Q Play is at the forefront of this change. Our platform has created a new paradigm where fans and DJs connect in real-time, creating experiences that were previously impossible.\n\nWhat Makes Q Play Special:\n• Real-time song requests with instant feedback\n• Transparent tipping system that rewards quality\n• Enhanced crowd engagement and energy\n• Increased revenue for DJs and venues\n• Better music selection based on crowd preferences\n\nOur data shows that venues using Q Play see a 40% increase in customer satisfaction and a 60% increase in repeat visits. DJs report earning 2-3x more through our platform, while fans enjoy unprecedented control over their nightlife experience.\n\nThe platform has become essential for modern nightlife, bridging the gap between audience and performer in ways never before possible. DJs report feeling more connected to their audience, while fans feel like they have a voice in shaping the night's soundtrack.\n\nKey Statistics:\n• 10,000+ active users across major cities\n• 500+ professional DJs on the platform\n• 50,000+ songs requested monthly\n• Average tip per request: $15-25\n• 95% user satisfaction rating\n\nThe future of nightlife is interactive, and Q Play is leading the charge.",
             author: "Q Play Team",
             date: "August 15, 2024",
             readTime: "5 min read",
             category: "Nightlife",
             image: "🎵",
             status: "published",
             createdAt: "2024-08-15T10:00:00Z",
             updatedAt: "2024-08-15T10:00:00Z"
           },
           {
             id: 2,
             title: "DJ Success Stories: From Local Gigs to International Fame",
             excerpt: "Meet the DJs who have transformed their careers and income using Q Play's innovative platform.",
             content: "Since launching Q Play, we've seen incredible success stories from DJs across the globe. These real-life examples show how our platform is revolutionizing the music industry.\n\nDJ Mike's Story:\nMike, a club DJ in Los Angeles, was struggling to make ends meet on his $200 per night gigs. After joining Q Play, he now averages $800+ per night through song request tips alone. 'The platform changed everything,' Mike says. 'I'm not just playing music anymore - I'm creating experiences.'\n\nSarah Chen's Transformation:\nSarah, a wedding DJ from Miami, saw her bookings increase by 300% after clients discovered her through Q Play. 'Couples love that their guests can request songs during the reception,' Sarah explains. 'It makes the event more personal and memorable.'\n\nThese success stories highlight how our platform is not just about earning extra income, but about building a sustainable career in music. DJs report feeling more connected to their audience, having more creative freedom, and building stronger fan bases.\n\nThe platform has become a game-changer for both established and emerging DJs looking to monetize their passion while delivering unforgettable experiences.",
             author: "Q Play Team",
             date: "August 12, 2024",
             readTime: "4 min read",
             category: "DJ Success",
             image: "🎛️",
             status: "published",
             createdAt: "2024-08-12T10:00:00Z",
             updatedAt: "2024-08-12T10:00:00Z"
           },
           {
             id: 3,
             title: "The Future of Interactive Entertainment",
             excerpt: "Explore how technology is reshaping entertainment and creating new opportunities for artists and audiences alike.",
             content: "The entertainment industry is undergoing a massive transformation, and Q Play is at the forefront of this revolution. We're not just changing how people experience nightlife; we're redefining the relationship between performers and audiences.\n\nTechnology Meets Human Connection:\nOur platform demonstrates how technology can enhance rather than replace human connection, creating more meaningful and engaging experiences. The key is maintaining the human element while leveraging technology to create deeper connections.\n\nThe Interactive Revolution:\nAs we look to the future, we see endless possibilities for expanding this model to other forms of entertainment:\n• Live music venues with real-time audience interaction\n• Comedy clubs with crowd-sourced material\n• Theater performances with dynamic storylines\n• Gaming events with live audience participation\n\nWhat Makes Q Play Special:\n• Real-time feedback and interaction\n• Transparent and fair compensation systems\n• Enhanced audience engagement\n• Data-driven insights for performers\n• Seamless integration with existing setups\n\nThe future of entertainment is interactive, personalized, and community-driven. Q Play is leading the charge in this exciting new era.",
             author: "Q Play Team",
             date: "August 10, 2024",
             readTime: "6 min read",
             category: "Industry Trends",
             image: "🚀",
             status: "published",
             createdAt: "2024-08-10T10:00:00Z",
             updatedAt: "2024-08-10T10:00:00Z"
           },
           {
             id: 4,
             title: "Top 10 Tips for DJs to Maximize Q Play Earnings",
             excerpt: "Learn proven strategies to boost your income and engagement using the Q Play platform.",
             content: "Want to maximize your earnings on Q Play? Here are our top 10 proven strategies that successful DJs use to boost their income and engagement.\n\n1. Set Up Your Profile Right:\nCreate a compelling DJ profile with high-quality photos, your music style, and what makes you unique. This helps fans connect with you before they even hear you play.\n\n2. Engage with Your Audience:\nDon't just play the requested songs - interact with your crowd! Use the messaging feature to thank fans for requests and build relationships.\n\n3. Price Your Requests Strategically:\nSet minimum tip amounts that reflect your value, but don't price yourself out of the market. Start with $5-10 minimums and adjust based on demand.\n\n4. Promote Your Q Play Presence:\nLet your audience know you're on Q Play! Mention it during your sets, post about it on social media, and encourage fans to download the app.\n\n5. Create Song Packages:\nBundle popular songs together and offer them at a discount. This encourages multiple requests and increases your overall earnings.\n\n6. Use Analytics to Your Advantage:\nTrack which songs get the most requests and highest tips. Use this data to build better sets and understand your audience.\n\n7. Network with Other DJs:\nConnect with other Q Play DJs in your area. You can share tips, collaborate on events, and even refer clients to each other.\n\n8. Offer Special Requests:\nGo beyond just playing songs - offer to learn new tracks, create custom mixes, or provide special dedications for extra tips.\n\n9. Build Your Fan Base:\nEncourage fans to follow you on Q Play. This creates a loyal audience that will request your services at future events.\n\n10. Stay Consistent:\nRegular activity on the platform builds trust and keeps you top of mind for fans looking for DJs.\n\nRemember: Success on Q Play is about building relationships, not just playing music. The more you engage with your audience, the more they'll engage with you!",
             author: "Q Play Team",
             date: "August 8, 2024",
             readTime: "7 min read",
             category: "DJ Tips",
             image: "💡",
             status: "published",
             createdAt: "2024-08-08T10:00:00Z",
             updatedAt: "2024-08-08T10:00:00Z"
           },
           {
             id: 5,
             title: "Q Play Platform Update: New Features for Enhanced User Experience",
             excerpt: "Discover the latest features and improvements that make Q Play even better for fans and DJs.",
             content: "We're excited to announce our biggest platform update yet! Here are the new features that will enhance your Q Play experience.\n\nNew Features for DJs:\n• Enhanced Analytics Dashboard: Get detailed insights into your earnings, most popular requests, and audience engagement metrics\n• Advanced Scheduling: Set your availability and let fans book you for future events\n• Song Library Expansion: Access to over 50 million tracks with real-time availability checking\n• Custom Tip Tiers: Create multiple pricing options for different types of requests\n• Fan Messaging: Direct communication with fans for better relationship building\n\nNew Features for Fans:\n• Improved Search: Find DJs by location, music style, and availability\n• Request History: Track all your past requests and favorite songs\n• Social Features: Follow your favorite DJs and get notified when they're playing nearby\n• Group Requests: Pool tips with friends for bigger song requests\n• Venue Integration: See which venues are using Q Play and what DJs are playing\n\nPerformance Improvements:\n• Faster loading times and smoother animations\n• Better offline functionality for areas with poor connectivity\n• Enhanced security for all transactions\n• Improved notification system\n\nWe're committed to continuously improving Q Play based on your feedback. These updates reflect the most requested features from our community of DJs and fans.\n\nStay tuned for more exciting announcements coming soon!",
             author: "Q Play Team",
             date: "August 5, 2024",
             readTime: "4 min read",
             category: "App Updates",
             image: "📱",
             status: "published",
             createdAt: "2024-08-05T10:00:00Z",
             updatedAt: "2024-08-05T10:00:00Z"
           }
         ];
  
  localStorage.setItem('olerum_blog_posts', JSON.stringify(defaultPosts));
  return defaultPosts;
};

export const saveBlogPosts = (posts: BlogPost[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('olerum_blog_posts', JSON.stringify(posts));
};

export const addBlogPost = (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost => {
  const posts = getBlogPosts();
  const newPost: BlogPost = {
    ...post,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  saveBlogPosts(posts);
  return newPost;
};

export const updateBlogPost = (id: number, updates: Partial<BlogPost>): BlogPost | null => {
  const posts = getBlogPosts();
  const index = posts.findIndex(post => post.id === id);
  
  if (index === -1) return null;
  
  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  saveBlogPosts(posts);
  return posts[index];
};

export const deleteBlogPost = (id: number): boolean => {
  const posts = getBlogPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  
  if (filteredPosts.length === posts.length) return false;
  
  saveBlogPosts(filteredPosts);
  return true;
};

// Hero Images Storage
export const getHeroImages = (): HeroImage[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('olerum_hero_images');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Return default hero images if none stored
  const defaultImages: HeroImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Majestic mountains with snow-capped peaks above clouds",
      title: "Protecting Our Mountains",
      order: 1
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      alt: "Lush green forest with sunlight filtering through trees",
      title: "Restoring Forests",
      order: 2
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Person planting a tree in a forest",
      title: "Planting Trees Together",
      order: 3
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      alt: "Beautiful sunset over ocean waves",
      title: "Protecting Our Oceans",
      order: 4
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Wildlife in natural habitat",
      title: "Preserving Wildlife",
      order: 5
    }
  ];
  
  localStorage.setItem('olerum_hero_images', JSON.stringify(defaultImages));
  return defaultImages;
};

export const saveHeroImages = (images: HeroImage[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('olerum_hero_images', JSON.stringify(images));
};

export const updateHeroImage = (id: number, updates: Partial<HeroImage>): HeroImage | null => {
  const images = getHeroImages();
  const index = images.findIndex(img => img.id === id);
  
  if (index === -1) return null;
  
  images[index] = {
    ...images[index],
    ...updates
  };
  
  saveHeroImages(images);
  return images[index];
};

export const addHeroImage = (image: Omit<HeroImage, 'id'>): HeroImage => {
  const images = getHeroImages();
  const newImage: HeroImage = {
    ...image,
    id: Date.now()
  };
  
  images.push(newImage);
  saveHeroImages(images);
  return newImage;
};

export const deleteHeroImage = (id: number): boolean => {
  const images = getHeroImages();
  const filteredImages = images.filter(img => img.id !== id);
  
  if (filteredImages.length === images.length) return false;
  
  saveHeroImages(filteredImages);
  return true;
};

// Admin Authentication
export const isAdminAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('adminToken');
  return token === 'admin-token-123'; // In production, this would validate against a server
};

export const adminLogin = (username: string, password: string): boolean => {
  if (username === 'admin' && password === 'qplay2024') {
    localStorage.setItem('adminToken', 'admin-token-123');
    return true;
  }
  return false;
};

export const adminLogout = (): void => {
  localStorage.removeItem('adminToken');
};

// Testimonials Storage
export const getTestimonials = (): Testimonial[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('olerum_testimonials');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Return default testimonials if none stored
  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "David Chen",
      role: "Environmental Advocate",
      content: "I've been working with Olerum Engineering for over two years now, and I'm amazed by the impact they've made. Their environmental engineering solutions have transformed challenging projects into sustainable successes. It's incredible to see the difference they've made in our industry.",
      avatar: "👨‍💼",
      order: 1
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Climate Scientist",
      content: "As an environmental scientist, I'm impressed by Olerum Engineering's data-driven approach to sustainable engineering. Their projects are not just well-intentioned but scientifically sound. They're making real, measurable progress in environmental protection.",
      avatar: "👩‍🔬",
      order: 2
    },
    {
      id: 3,
      name: "Miguel Rodriguez",
      role: "Local Farmer",
      content: "Olerum Engineering didn't just provide engineering solutions—they taught us sustainable practices that have improved our operations while protecting the environment. Their community-focused approach has made all the difference.",
      avatar: "👨‍🌾",
      order: 3
    }
  ];
  
  localStorage.setItem('olerum_testimonials', JSON.stringify(defaultTestimonials));
  return defaultTestimonials;
};

export const saveTestimonials = (testimonials: Testimonial[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('olerum_testimonials', JSON.stringify(testimonials));
};

export const updateTestimonial = (id: number, updates: Partial<Testimonial>): Testimonial | null => {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(testimonial => testimonial.id === id);
  
  if (index === -1) return null;
  
  testimonials[index] = {
    ...testimonials[index],
    ...updates
  };
  
  saveTestimonials(testimonials);
  return testimonials[index];
};

export const addTestimonial = (testimonial: Omit<Testimonial, 'id'>): Testimonial => {
  const testimonials = getTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now()
  };
  
  testimonials.push(newTestimonial);
  saveTestimonials(testimonials);
  return newTestimonial;
};

export const deleteTestimonial = (id: number): boolean => {
  const testimonials = getTestimonials();
  const filteredTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
  
  if (filteredTestimonials.length === testimonials.length) return false;
  
  saveTestimonials(filteredTestimonials);
  return true;
};

// Tree Packages Storage
export const getTreePackages = (): TreePackage[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('olerum_tree_packages');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Return default tree packages if none stored
  const defaultPackages: TreePackage[] = [
    {
      id: 1,
      name: "Bronze Package",
      description: "Start your environmental journey with our basic tree planting package.",
      treeCount: 5,
      price: 30000,
      currency: "Tsh",
      features: [
        "5 trees planted in your name",
        "Certificate of contribution",
        "Monthly progress updates",
        "Basic impact report"
      ],
      isPopular: false,
      order: 1
    },
    {
      id: 2,
      name: "Silver Package",
      description: "Make a significant impact with our popular tree planting package.",
      treeCount: 20,
      price: 100000,
      currency: "Tsh",
      features: [
        "20 trees planted in your name",
        "Premium certificate of contribution",
        "Weekly progress updates",
        "Detailed impact report",
        "GPS coordinates of planted trees",
        "Photo updates of tree growth"
      ],
      isPopular: true,
      order: 2
    },
    {
      id: 3,
      name: "Gold Package",
      description: "Maximum environmental impact with our premium tree planting package.",
      treeCount: 50,
      price: 300000,
      currency: "Tsh",
      features: [
        "50 trees planted in your name",
        "Luxury certificate of contribution",
        "Real-time progress tracking",
        "Comprehensive impact report",
        "GPS coordinates of planted trees",
        "Regular photo updates",
        "Personal tree planting ceremony invitation",
        "Naming rights for a small grove"
      ],
      isPopular: false,
      order: 3
    }
  ];
  
  localStorage.setItem('olerum_tree_packages', JSON.stringify(defaultPackages));
  return defaultPackages;
};

export const saveTreePackages = (packages: TreePackage[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('olerum_tree_packages', JSON.stringify(packages));
};

export const updateTreePackage = (id: number, updates: Partial<TreePackage>): TreePackage | null => {
  const packages = getTreePackages();
  const index = packages.findIndex(pkg => pkg.id === id);
  
  if (index === -1) return null;
  
  packages[index] = {
    ...packages[index],
    ...updates
  };
  
  saveTreePackages(packages);
  return packages[index];
};

export const addTreePackage = (treePackage: Omit<TreePackage, 'id'>): TreePackage => {
  const packages = getTreePackages();
  const newPackage: TreePackage = {
    ...treePackage,
    id: Date.now()
  };
  
  packages.push(newPackage);
  saveTreePackages(packages);
  return newPackage;
};

export const deleteTreePackage = (id: number): boolean => {
  const packages = getTreePackages();
  const filteredPackages = packages.filter(pkg => pkg.id !== id);
  
  if (filteredPackages.length === packages.length) return false;
  
  saveTreePackages(filteredPackages);
  return true;
}; 

// Default homepage buttons
const defaultButtons: Button[] = [
  // Hero Section
  { id: 'hero-donate', section: 'hero', text: 'Donate Now', url: '/donate', variant: 'primary', order: 1, isActive: true },
  { id: 'hero-learn', section: 'hero', text: 'Learn More', url: '/about', variant: 'secondary', order: 2, isActive: true },
  
  // Join Our Mission Section
  { id: 'mission-plant', section: 'mission', text: 'Start Planting Today', url: '/plant', variant: 'primary', order: 1, isActive: true },
  { id: 'mission-how', section: 'mission', text: 'Learn How It Works', url: '/how-it-works', variant: 'secondary', order: 2, isActive: true },
  
  // About Section
  { id: 'about-read', section: 'about', text: 'Read More About Us', url: '/about', variant: 'secondary', order: 1, isActive: true },
  
  // Projects Section
  { id: 'project-trees', section: 'projects', text: 'Learn More →', url: '/projects/tree-planting', variant: 'secondary', order: 1, isActive: true },
  { id: 'project-energy', section: 'projects', text: 'Learn More →', url: '/projects/renewable-energy', variant: 'secondary', order: 2, isActive: true },
  { id: 'project-ocean', section: 'projects', text: 'Learn More →', url: '/projects/ocean-conservation', variant: 'secondary', order: 3, isActive: true },
  
  // CTA Section
  { id: 'cta-donate', section: 'cta', text: 'Donate Today', url: '/donate', variant: 'secondary', order: 1, isActive: true },
  { id: 'cta-volunteer', section: 'cta', text: 'Volunteer With Us', url: '/volunteer', variant: 'secondary', order: 2, isActive: true },
  
  // Newsletter Section
  { id: 'newsletter-subscribe', section: 'newsletter', text: 'Subscribe to Newsletter', url: '#', variant: 'secondary', order: 1, isActive: true }
];

// Button management functions
export const getButtons = (): Button[] => {
  if (typeof window === 'undefined') return defaultButtons;
  
  const stored = localStorage.getItem('homepage-buttons');
  if (!stored) {
    localStorage.setItem('homepage-buttons', JSON.stringify(defaultButtons));
    return defaultButtons;
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return defaultButtons;
  }
};

export const saveButtons = (buttons: Button[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('homepage-buttons', JSON.stringify(buttons));
};

export const getButtonsBySection = (section: string): Button[] => {
  const buttons = getButtons();
  return buttons
    .filter(button => button.section === section && button.isActive)
    .sort((a, b) => a.order - b.order);
};

export const updateButton = (id: string, updates: Partial<Button>): void => {
  const buttons = getButtons();
  const index = buttons.findIndex(button => button.id === id);
  
  if (index !== -1) {
    buttons[index] = { ...buttons[index], ...updates };
    saveButtons(buttons);
  }
};

export const addButton = (button: Omit<Button, 'id'>): void => {
  const buttons = getButtons();
  const newId = `${button.section}-${Date.now()}`;
  const newButton: Button = { ...button, id: newId };
  
  buttons.push(newButton);
  saveButtons(buttons);
};

export const deleteButton = (id: string): void => {
  const buttons = getButtons();
  const filteredButtons = buttons.filter(button => button.id !== id);
  saveButtons(filteredButtons);
};

export const getButtonSections = (): string[] => {
  return ['hero', 'mission', 'about', 'projects', 'cta', 'newsletter'];
}; 

// Newsletter subscriber management functions
export const getNewsletterSubscribers = (): NewsletterSubscriber[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('newsletter-subscribers');
  if (!stored) {
    return [];
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveNewsletterSubscribers = (subscribers: NewsletterSubscriber[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));
};

export const addNewsletterSubscriber = (email: string, source: string = 'homepage'): boolean => {
  const subscribers = getNewsletterSubscribers();
  
  // Check if email already exists
  const existingSubscriber = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
  if (existingSubscriber) {
    // Reactivate if previously unsubscribed
    if (!existingSubscriber.isActive) {
      existingSubscriber.isActive = true;
      existingSubscriber.subscribedAt = new Date().toISOString();
      saveNewsletterSubscribers(subscribers);
      return true;
    }
    return false; // Already subscribed
  }
  
  // Add new subscriber
  const newSubscriber: NewsletterSubscriber = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    subscribedAt: new Date().toISOString(),
    isActive: true,
    source
  };
  
  subscribers.push(newSubscriber);
  saveNewsletterSubscribers(subscribers);
  return true;
};

export const removeNewsletterSubscriber = (id: string): void => {
  const subscribers = getNewsletterSubscribers();
  const filteredSubscribers = subscribers.filter(sub => sub.id !== id);
  saveNewsletterSubscribers(filteredSubscribers);
};

export const unsubscribeNewsletterSubscriber = (email: string): boolean => {
  const subscribers = getNewsletterSubscribers();
  const subscriber = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
  
  if (subscriber) {
    subscriber.isActive = false;
    saveNewsletterSubscribers(subscribers);
    return true;
  }
  
  return false;
};

export const getActiveNewsletterSubscribers = (): NewsletterSubscriber[] => {
  return getNewsletterSubscribers().filter(sub => sub.isActive);
};

export const getNewsletterSubscriberCount = (): number => {
  return getActiveNewsletterSubscribers().length;
};

// Contact message management functions
export const getContactMessages = (): ContactMessage[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('contactMessages');
  if (!stored) {
    return [];
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveContactMessages = (messages: ContactMessage[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('contactMessages', JSON.stringify(messages));
};

export const addContactMessage = (message: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>): boolean => {
  const messages = getContactMessages();
  
  const newMessage: ContactMessage = {
    ...message,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: 'new'
  };
  
  messages.push(newMessage);
  saveContactMessages(messages);
  return true;
};

export const updateContactMessageStatus = (id: string, status: 'new' | 'read' | 'replied'): boolean => {
  const messages = getContactMessages();
  const messageIndex = messages.findIndex(msg => msg.id === id);
  
  if (messageIndex !== -1) {
    messages[messageIndex].status = status;
    saveContactMessages(messages);
    return true;
  }
  
  return false;
};

export const deleteContactMessage = (id: string): void => {
  const messages = getContactMessages();
  const filteredMessages = messages.filter(msg => msg.id !== id);
  saveContactMessages(filteredMessages);
};

export const getNewContactMessages = (): ContactMessage[] => {
  return getContactMessages().filter(msg => msg.status === 'new');
};

export const getContactMessageCount = (): number => {
  return getContactMessages().length;
};

export const getNewContactMessageCount = (): number => {
  return getNewContactMessages().length;
};

// Team member management functions
export const getTeamMembers = (): TeamMember[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('team-members');
  if (!stored) {
    // Return default team members if none stored
    const defaultMembers: TeamMember[] = [
      {
        id: '1',
        name: 'Dr. Sarah Green',
        position: 'Executive Director',
        bio: 'Environmental scientist with 15+ years of experience in conservation and sustainability.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        email: 'sarah.green@olerum-engineering.org',
        linkedin: 'https://linkedin.com/in/sarah-green',
        twitter: 'https://twitter.com/sarahgreen',
        order: 1,
        isActive: true
      },
      {
        id: '2',
        name: 'Dr. Michael Chen',
        position: 'Head of Research',
        bio: 'Climate scientist leading our research initiatives and data-driven conservation strategies.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        email: 'michael.chen@olerum-engineering.org',
        linkedin: 'https://linkedin.com/in/michael-chen',
        twitter: 'https://twitter.com/michaelchen',
        order: 2,
        isActive: true
      },
      {
        id: '3',
        name: 'Maria Rodriguez',
        position: 'Field Operations',
        bio: 'Conservation specialist managing our on-the-ground projects and community partnerships.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        email: 'maria.rodriguez@olerum-engineering.org',
        linkedin: 'https://linkedin.com/in/maria-rodriguez',
        twitter: 'https://twitter.com/mariarodriguez',
        order: 3,
        isActive: true
      }
    ];
    saveTeamMembers(defaultMembers);
    return defaultMembers;
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveTeamMembers = (members: TeamMember[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('team-members', JSON.stringify(members));
};

export const addTeamMember = (member: Omit<TeamMember, 'id'>): void => {
  const members = getTeamMembers();
  const newId = Date.now().toString();
  const newMember: TeamMember = { ...member, id: newId };
  
  members.push(newMember);
  saveTeamMembers(members);
  
  // Dispatch custom event for admin panel updates
  window.dispatchEvent(new CustomEvent('localStorageChange'));
};

export const updateTeamMember = (id: string, updates: Partial<TeamMember>): boolean => {
  const members = getTeamMembers();
  const memberIndex = members.findIndex(member => member.id === id);
  
  if (memberIndex !== -1) {
    members[memberIndex] = { ...members[memberIndex], ...updates };
    saveTeamMembers(members);
    
    // Dispatch custom event for admin panel updates
    window.dispatchEvent(new CustomEvent('localStorageChange'));
    return true;
  }
  
  return false;
};

export const deleteTeamMember = (id: string): void => {
  const members = getTeamMembers();
  const filteredMembers = members.filter(member => member.id !== id);
  saveTeamMembers(filteredMembers);
  
  // Dispatch custom event for admin panel updates
  window.dispatchEvent(new CustomEvent('localStorageChange'));
};

export const getActiveTeamMembers = (): TeamMember[] => {
  return getTeamMembers().filter(member => member.isActive).sort((a, b) => a.order - b.order);
};

export const getTeamMemberCount = (): number => {
  return getTeamMembers().length;
};

export const getActiveTeamMemberCount = (): number => {
  return getActiveTeamMembers().length;
}; 