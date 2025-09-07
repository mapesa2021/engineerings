// Admin Data Management System
// This handles all site content updates from the admin panel

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
  publishedAt: string;
  isPublished: boolean;
  slug: string;
  readTime: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
  expertise: string[];
  linkedin?: string;
  isActive: boolean;
  joinDate: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  client: string;
  location: string;
  completionDate: string;
  budget?: string;
  duration?: string;
  teamSize?: number;
  isActive: boolean;
  featured: boolean;
  technologies: string[];
  results: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  isActive: boolean;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  status: 'new' | 'read' | 'replied';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  date: string;
  isActive: boolean;
}

export interface Button {
  id: string;
  section: string;
  text: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline';
  order: number;
  isActive: boolean;
  date: string;
}

export interface SiteSettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  ctaButtons: {
    primary: string;
    secondary: string;
  };
}

// Local Storage Keys
const STORAGE_KEYS = {
  HERO_SLIDES: 'oleum_hero_slides',
  BLOG_POSTS: 'oleum_blog_posts',
  TEAM_MEMBERS: 'oleum_team_members',
  PROJECTS: 'oleum_projects',
  TESTIMONIALS: 'oleum_testimonials',
  CONTACT_MESSAGES: 'oleum_contact_messages',
  NEWSLETTER_SUBSCRIBERS: 'oleum_newsletter_subscribers',
  SITE_SETTINGS: 'oleum_site_settings',
  BUTTONS: 'oleum_buttons'
};

// Default Data
const defaultHeroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Engineering Excellence in Africa',
    subtitle: 'Your Trusted Partner',
    description: 'Comprehensive engineering solutions for industrial, institutional, and agricultural sectors across Tanzania.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop',
    buttonText: 'Explore Services',
    buttonLink: '/services',
    isActive: true,
    order: 1
  },
  {
    id: '2',
    title: 'Industrial Automation Solutions',
    subtitle: 'Smart Solutions for Africa',
    description: 'Advanced automation systems that optimize your operations and boost productivity across the continent.',
    image: 'https://i.postimg.cc/2SGXZWWC/PXL-20240212-063559150.jpg',
    buttonText: 'Learn More',
    buttonLink: '/projects',
    isActive: true,
    order: 2
  },
  {
    id: '3',
    title: 'Water Treatment Excellence',
    subtitle: 'Clean Solutions for Africa',
    description: 'Professional water treatment systems for sustainable and efficient operations across Tanzania.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
    buttonText: 'Get Quote',
    buttonLink: '/contact',
    isActive: true,
    order: 3
  },
  {
    id: '4',
    title: 'Agricultural Engineering',
    subtitle: 'Innovation for Growth',
    description: 'Modern agricultural solutions and irrigation systems to enhance farming productivity in Africa.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop',
    buttonText: 'Explore Services',
    buttonLink: '/services',
    isActive: true,
    order: 4
  },

];

const defaultBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Industrial Automation Trends 2025',
    excerpt: 'Discover the latest trends in industrial automation and how they\'re transforming manufacturing processes.',
    content: `
      <h2>The Future of Industrial Automation</h2>
      <p>Industrial automation is rapidly evolving, bringing unprecedented efficiency and productivity to manufacturing processes across Tanzania. As we move into 2025, several key trends are shaping the landscape of industrial automation.</p>
      
      <h3>1. Artificial Intelligence Integration</h3>
      <p>AI-powered systems are becoming increasingly sophisticated, enabling predictive maintenance, quality control, and process optimization. These systems can analyze vast amounts of data in real-time, identifying patterns and anomalies that human operators might miss.</p>
      
      <h3>2. Internet of Things (IoT) Connectivity</h3>
      <p>The IoT revolution is connecting machines, sensors, and systems like never before. This connectivity enables real-time monitoring, remote control, and data-driven decision making across entire manufacturing facilities.</p>
      
      <h3>3. Sustainable Automation</h3>
      <p>Environmental concerns are driving the adoption of energy-efficient automation solutions. Companies are investing in systems that reduce waste, optimize energy consumption, and support sustainable manufacturing practices.</p>
      
      <h2>Implementation Strategies</h2>
      <p>Successfully implementing industrial automation requires careful planning and strategic execution. Here are some key considerations:</p>
      
      <ul>
        <li><strong>Assessment:</strong> Evaluate current processes and identify automation opportunities</li>
        <li><strong>Training:</strong> Invest in employee training to ensure smooth transition</li>
        <li><strong>Integration:</strong> Ensure new systems integrate with existing infrastructure</li>
        <li><strong>Scalability:</strong> Choose solutions that can grow with your business</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Industrial automation is not just a trend—it's a fundamental shift in how we approach manufacturing. Companies that embrace these technologies will be better positioned to compete in an increasingly global and digital marketplace.</p>
    `,
    author: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    category: 'Technology',
    tags: ['automation', 'industry', 'trends'],
    publishedAt: '2025-01-15',
    isPublished: true,
    slug: 'industrial-automation-trends-2025',
    readTime: 5
  },
  {
    id: '2',
    title: 'Water Treatment Solutions for Agriculture',
    excerpt: 'Comprehensive guide to implementing effective water treatment systems in agricultural facilities.',
    content: `
      <h2>Sustainable Water Management in Agriculture</h2>
      <p>Water is the lifeblood of agriculture, and effective water treatment systems are essential for sustainable farming practices. This comprehensive guide explores the latest solutions and technologies for agricultural water treatment.</p>
      
      <h3>Understanding Agricultural Water Challenges</h3>
      <p>Agricultural operations face unique water quality challenges, including contamination from fertilizers, pesticides, and natural organic matter. Effective treatment systems must address these specific concerns while maintaining cost-effectiveness.</p>
      
      <h3>Advanced Treatment Technologies</h3>
      <p>Modern water treatment systems employ a combination of technologies to ensure water quality:</p>
      
      <ul>
        <li><strong>Filtration Systems:</strong> Remove suspended solids and organic matter</li>
        <li><strong>Disinfection:</strong> Eliminate harmful microorganisms</li>
        <li><strong>Chemical Treatment:</strong> Address specific contaminants</li>
        <li><strong>Monitoring Systems:</strong> Real-time quality control</li>
      </ul>
      
      <h3>Implementation Best Practices</h3>
      <p>Successful implementation requires careful planning and consideration of local conditions, crop requirements, and regulatory compliance.</p>
    `,
    author: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    category: 'Agriculture',
    tags: ['water treatment', 'agriculture', 'sustainability'],
    publishedAt: '2025-01-10',
    isPublished: true,
    slug: 'water-treatment-solutions-agriculture',
    readTime: 8
  },
  {
    id: '3',
    title: 'Electrical Systems Safety Standards',
    excerpt: 'Essential safety standards and best practices for electrical systems in industrial environments.',
    content: `
      <h2>Ensuring Electrical Safety in Industrial Environments</h2>
      <p>Electrical safety is paramount in industrial settings where high-voltage systems and complex electrical infrastructure are common. This article outlines essential safety standards and best practices.</p>
      
      <h3>Key Safety Standards</h3>
      <p>Compliance with established safety standards is not just a legal requirement—it's essential for protecting workers and equipment.</p>
      
      <h3>Best Practices for Implementation</h3>
      <p>Regular maintenance, proper training, and systematic safety protocols form the foundation of electrical safety in industrial environments.</p>
    `,
    author: 'David Wilson',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop',
    category: 'Safety',
    tags: ['electrical', 'safety', 'standards'],
    publishedAt: '2025-01-05',
    isPublished: true,
    slug: 'electrical-systems-safety-standards',
    readTime: 6
  }
];

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Industrial Automation System',
    description: 'Designed and implemented a comprehensive automation system for a manufacturing facility in Dar es Salaam, improving production efficiency by 40% and reducing operational costs.',
    category: 'Industrial',
    client: 'Tanzania Manufacturing Co.',
    location: 'Dar es Salaam',
    completionDate: '2023-12-15',
    results: ['40%: Efficiency Increase', '6: Months Duration', '25%: Cost Reduction'],
    technologies: ['PLC Systems', 'SCADA', 'Industrial IoT', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    isActive: true,
    featured: true,
    budget: 'TZS 150,000,000',
    duration: '6 months',
    teamSize: 8
  },
  {
    id: '2',
    title: 'Hospital Electrical Infrastructure',
    description: 'Upgraded the electrical infrastructure for a major hospital in Arusha, ensuring reliable power supply for critical medical equipment and improving patient safety.',
    category: 'Electrical',
    client: 'Arusha Medical Center',
    location: 'Arusha',
    completionDate: '2023-10-20',
    results: ['100%: Uptime Achieved', '500kW: Power Capacity', '24/7: Backup Power'],
    technologies: ['UPS Systems', 'Generator Backup', 'Smart Grid', 'Monitoring Systems'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    isActive: true,
    featured: true,
    budget: 'TZS 200,000,000',
    duration: '4 months',
    teamSize: 6
  },
  {
    id: '3',
    title: 'Water Treatment Plant',
    description: 'Designed and installed a comprehensive water treatment system for an agricultural facility, providing clean water for irrigation and processing while meeting environmental standards.',
    category: 'Water Treatment',
    client: 'Tanzania Agriculture Ltd.',
    location: 'Morogoro',
    completionDate: '2023-08-10',
    results: ['1000L: Daily Capacity', '99.9%: Purity Level', 'Zero: Waste Discharge'],
    technologies: ['Reverse Osmosis', 'UV Treatment', 'Filtration Systems', 'Chemical Dosing'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    isActive: true,
    featured: true,
    budget: 'TZS 120,000,000',
    duration: '5 months',
    teamSize: 5
  },
  {
    id: '4',
    title: 'Chemical Processing Facility',
    description: 'Built a state-of-the-art chemical processing facility with advanced safety systems and automated control processes.',
    category: 'Chemical',
    client: 'Tanzania Chemical Industries',
    location: 'Tanga',
    completionDate: '2023-06-15',
    results: ['50%: Production Increase', '100%: Safety Compliance', '30%: Energy Savings'],
    technologies: ['Process Control', 'Safety Systems', 'Chemical Handling', 'Automation'],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    isActive: true,
    featured: false,
    budget: 'TZS 300,000,000',
    duration: '8 months',
    teamSize: 12
  },
  {
    id: '5',
    title: 'Environmental Monitoring System',
    description: 'Implemented a comprehensive environmental monitoring system for a mining operation, ensuring compliance with environmental regulations.',
    category: 'Environmental',
    client: 'Tanzania Mining Corp.',
    location: 'Mwanza',
    completionDate: '2023-04-20',
    results: ['Real-time: Monitoring', '100%: Compliance Rate', '24/7: Data Collection'],
    technologies: ['IoT Sensors', 'Data Analytics', 'Cloud Platform', 'Alert Systems'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    isActive: true,
    featured: false,
    budget: 'TZS 80,000,000',
    duration: '3 months',
    teamSize: 4
  },
  {
    id: '6',
    title: 'Corporate Branding & Identity Design',
    description: 'Developed comprehensive branding solutions for a major Tanzanian corporation, including logo design, corporate identity, and marketing materials.',
    category: 'Branding',
    client: 'Tanzania Corporate Group',
    location: 'Dar es Salaam',
    completionDate: '2023-03-15',
    results: ['Complete: Brand Identity', '50+ Materials: Created', '100%: Client Satisfaction'],
    technologies: ['Adobe Creative Suite', 'Brand Guidelines', 'Digital Assets', 'Print Materials'],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    isActive: true,
    featured: false,
    budget: 'TZS 25,000,000',
    duration: '2 months',
    teamSize: 3
  },
  {
    id: '7',
    title: 'Digital Printing & Production Facility',
    description: 'Established a state-of-the-art digital printing facility with advanced printing equipment and production capabilities.',
    category: 'Printing',
    client: 'Tanzania Print Solutions',
    location: 'Dar es Salaam',
    completionDate: '2023-02-10',
    results: ['High-speed: Printing', '1000+ Pages: Daily Capacity', 'Full-color: Production'],
    technologies: ['Digital Presses', 'Color Management', 'Finishing Equipment', 'Quality Control'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    isActive: true,
    featured: false,
    budget: 'TZS 180,000,000',
    duration: '4 months',
    teamSize: 6
  },
  {
    id: '8',
    title: 'Office Stationery & Supply System',
    description: 'Implemented a comprehensive office stationery management system for a large corporate office, optimizing supply chain and inventory management.',
    category: 'Stationaries',
    client: 'Tanzania Business Center',
    location: 'Dar es Salaam',
    completionDate: '2023-01-20',
    results: ['30%: Cost Reduction', 'Automated: Inventory', '24/7: Supply Access'],
    technologies: ['Inventory Management', 'Supply Chain', 'Digital Catalog', 'Order System'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    isActive: true,
    featured: false,
    budget: 'TZS 45,000,000',
    duration: '3 months',
    teamSize: 4
  }
];

const defaultButtons: Button[] = [
  // Hero Section Buttons
  {
    id: '1',
    section: 'hero',
    text: 'Explore Services',
    url: '/services',
    variant: 'primary',
    order: 1,
    isActive: true,
    date: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    section: 'hero',
    text: 'Learn More',
    url: '/projects',
    variant: 'secondary',
    order: 2,
    isActive: true,
    date: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    section: 'hero',
    text: 'Get Quote',
    url: '/contact',
    variant: 'primary',
    order: 3,
    isActive: true,
    date: '2024-01-01T00:00:00Z'
  },
  
  // Supply Solutions Section Buttons
  {
    id: '4',
    section: 'supply-solutions',
    text: 'Learn More',
    url: '/services#chemicals',
    variant: 'outline',
    order: 1,
    isActive: true,
    date: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    section: 'supply-solutions',
    text: 'Learn More',
    url: '/services#medical',
    variant: 'outline',
    order: 2,
    isActive: true,
    date: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    section: 'supply-solutions',
    text: 'Learn More',
    url: '/services#construction',
    variant: 'outline',
    order: 3,
    isActive: true,
    date: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    section: 'supply-solutions',
    text: 'Learn More',
    url: '/services#office',
    variant: 'outline',
    order: 4,
    isActive: true,
    date: '2024-01-01T00:00:00Z'
  },
  
  // Core Services Section Buttons
  {
    id: '8',
    section: 'core-services',
    text: 'Learn More',
    url: '/services#industrial',
    variant: 'primary',
    order: 1,
    isActive: true,
    date: '2024-01-01T00:00:00Z'
  },
  {
    id: '9',
    section: 'core-services',
    text: 'Learn More',
    url: '/services#institutional',
    variant: 'primary',
    order: 2,
    isActive: true,
    date: '2024-01-01T00:00:00Z'
  },
  {
    id: '10',
    section: 'core-services',
    text: 'Learn More',
    url: '/services#agricultural',
    variant: 'primary',
    order: 3,
    isActive: true,
    date: '2024-01-01T00:00:00Z'
  },
  
  // CTA Section Buttons
  {
    id: '11',
    section: 'cta',
    text: 'Get a Quote',
    url: '/contact',
    variant: 'primary',
    order: 1,
    isActive: true,
    date: '2024-01-01T00:00:00Z'
  },
  {
    id: '12',
    section: 'cta',
    text: 'Explore Services',
    url: '/services',
    variant: 'outline',
    order: 2,
    isActive: true,
    date: '2024-01-01T00:00:00Z'
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Gladness Patrick Lwekamwa',
    position: 'CEO and Formulator',
    company: 'KCLEAN PRODUCTS',
    content: 'I was supplied with clean distilled water, exceeded my expectations and timely delivery.',
    rating: 5,
    image: 'https://www.shutterstock.com/image-photo/smiling-african-american-millennial-businessman-600nw-1437938108.jpg',
    isActive: true,
    date: '2025-03-22T14:15:00Z'
  },
  {
    id: '2',
    name: 'Fatima Hassan',
    position: 'Environmental Officer',
    company: 'Tanzania Environmental Services',
    content: 'Their environmental consulting services helped us achieve full compliance. Professional, reliable, and cost-effective solutions.',
    rating: 5,
    image: 'https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=',
    isActive: true,
    date: '2025-07-08T09:45:00Z'
  },
  {
    id: '3',
    name: 'Erick Mahenge',
    position: 'Workshop Manager',
    company: 'TAIFA INNOVATIONS AND TECHNOLOGIES LTD',
    content: 'I\'m very satisfied with the AC and refrigeration systems installed by Oleum Company Ltd in our office; efficient and professionally done. Their distilled water supply for vehicle batteries in our workshop is reliable and of high quality. Great service and timely delivery!',
    rating: 5,
    image: 'https://t3.ftcdn.net/jpg/03/62/40/80/360_F_362408093_AlwyWJQbyc6edRlXGaGz3xquwzLGXhkX.jpg',
    isActive: true,
    date: '2025-11-14T16:30:00Z'
  }
];

const defaultTeamMembers: TeamMember[] = [
  {
    id: '2',
    name: 'Bahati Nelson Nsolo',
    position: 'Managing Director',
    department: 'Engineering',
    email: 'bahatinsolo@oleum.co.tz',
    phone: '+255 674 685 062',
    image: 'https://i.postimg.cc/ZncRNLxh/Bahati-Nelson-Nsolo-managing-director.jpg',
    bio: 'Chemical and Process Engineer with a strong experience across beverage, cement, sugar, fertilizer, food, and chemical industries.',
    expertise: ['Management', 'Process Optimization', 'Quality Control & Assurance', 'Research & Design', 'Sustainable Engineering Solutions', 'Business Leadership'],
    linkedin: 'https://linkedin.com/in/bahatinelson',
    isActive: true,
    joinDate: '2021-03-20'
  },
  {
    id: '3',
    name: 'Ombeni Habibu Nziku',
    position: 'Technical Director',
    department: 'Engineering',
    email: 'ombeninziku@oleum.co.tz',
    phone: '+255788028584',
          image: 'https://i.postimg.cc/h4VjCDys/Untitled-design-8.jpg',
    bio: 'Process Engineer with a solid background in Chemical and Process Engineering, bringing hands-on experience in operations, field duties, and technical support across the oil & gas, lubricant blending, and beverage manufacturing industries.',
    expertise: ['Lubricant Oil Blending', 'Plant Operation', 'Process Optimization', 'Root Cause Analysis', 'Water Treatment', 'Troubleshooting', 'P&ID Interpretation', 'HSE Compliance', 'Technical Leadership'],
    linkedin: 'https://linkedin.com/in/ombeninziku',
    isActive: true,
    joinDate: '2021-06-10'
  },
  {
    id: '1',
    name: 'Freewind Godson Moshi',
    position: 'Project Manager',
    department: 'Engineering',
    email: 'freewindmoshi@oleum.co.tz',
    phone: '+255757554767',
    image: 'https://i.postimg.cc/65WTXDB6/Freewind-Godson-Moshi-project-manager.jpg',
    bio: 'Process Engineer with a strong background in Chemical and Process Engineering, experienced in operations and field duties across the oil & gas sector.',
    expertise: ['Cement Plant Operation', 'Process Optimization', 'Troubleshooting', 'Equipment Inspections', 'Safety Compliance', 'Project Management'],
    linkedin: 'https://linkedin.com/in/freewindmoshi',
    isActive: true,
    joinDate: '2020-01-15'
  }
];

const defaultSiteSettings: SiteSettings = {
  companyName: 'Oleum Company Limited',
  phone: '+255 674 685 062',
  email: 'info@oleum.co.tz',
      address: 'Ubungo, Dar es Salaam, Tanzania',
      workingHours: 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 3:00 PM',
  socialLinks: {
    facebook: 'https://facebook.com/oleumcompany',
    linkedin: 'https://linkedin.com/company/oleum'
  },
  ctaButtons: {
    primary: 'Get Quote',
    secondary: 'Learn More'
  }
};

// Utility Functions
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') {
    console.log(`getFromStorage called server-side for key: ${key}, returning default`);
    return defaultValue;
  }
  try {
    const stored = localStorage.getItem(key);
    console.log(`getFromStorage for key: ${key}, stored:`, stored);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error in getFromStorage for key: ${key}:`, error);
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Hero Slides Management
export const getHeroSlides = (): HeroSlide[] => {
  const slides = getFromStorage(STORAGE_KEYS.HERO_SLIDES, defaultHeroSlides);
  console.log('📖 adminData - getHeroSlides returning:', slides);
  return slides;
};

export const saveHeroSlides = (slides: HeroSlide[]): void => {
  saveToStorage(STORAGE_KEYS.HERO_SLIDES, slides);
};

export const addHeroSlide = (slide: Omit<HeroSlide, 'id'>): HeroSlide => {
  console.log('📝 adminData - addHeroSlide called with:', slide);
  const slides = getHeroSlides();
  console.log('📝 adminData - Current slides:', slides);
  const newSlide: HeroSlide = {
    ...slide,
    id: Date.now().toString()
  };
  console.log('📝 adminData - New slide created:', newSlide);
  const updatedSlides = [...slides, newSlide];
  console.log('📝 adminData - Updated slides array:', updatedSlides);
  saveHeroSlides(updatedSlides);
  console.log('📝 adminData - Slides saved to localStorage');
  return newSlide;
};

export const updateHeroSlide = (id: string, updates: Partial<HeroSlide>): HeroSlide | null => {
  const slides = getHeroSlides();
  const index = slides.findIndex(slide => slide.id === id);
  if (index === -1) return null;
  
  const updatedSlide = { ...slides[index], ...updates };
  slides[index] = updatedSlide;
  saveHeroSlides(slides);
  return updatedSlide;
};

export const deleteHeroSlide = (id: string): boolean => {
  const slides = getHeroSlides();
  const filteredSlides = slides.filter(slide => slide.id !== id);
  if (filteredSlides.length === slides.length) return false;
  
  saveHeroSlides(filteredSlides);
  return true;
};

// Blog Posts Management
export const getBlogPosts = (): BlogPost[] => {
  return getFromStorage(STORAGE_KEYS.BLOG_POSTS, defaultBlogPosts);
};

export const saveBlogPosts = (posts: BlogPost[]): void => {
  saveToStorage(STORAGE_KEYS.BLOG_POSTS, posts);
};

export const addBlogPost = (post: Omit<BlogPost, 'id' | 'slug' | 'publishedAt'>): BlogPost => {
  const posts = getBlogPosts();
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    publishedAt: new Date().toISOString().split('T')[0]
  };
  const updatedPosts = [newPost, ...posts];
  saveBlogPosts(updatedPosts);
  return newPost;
};

export const updateBlogPost = (id: string, updates: Partial<BlogPost>): BlogPost | null => {
  const posts = getBlogPosts();
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return null;
  
  const updatedPost = { ...posts[index], ...updates };
  posts[index] = updatedPost;
  saveBlogPosts(posts);
  return updatedPost;
};

export const deleteBlogPost = (id: string): boolean => {
  const posts = getBlogPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  if (filteredPosts.length === posts.length) return false;
  
  saveBlogPosts(filteredPosts);
  return true;
};

// Team Members Management
export const getTeamMembers = (): TeamMember[] => {
  return getFromStorage(STORAGE_KEYS.TEAM_MEMBERS, defaultTeamMembers);
};

export const saveTeamMembers = (members: TeamMember[]): void => {
  saveToStorage(STORAGE_KEYS.TEAM_MEMBERS, members);
};

export const addTeamMember = (member: Omit<TeamMember, 'id' | 'joinDate'>): TeamMember => {
  const members = getTeamMembers();
  const newMember: TeamMember = {
    ...member,
    id: Date.now().toString(),
    joinDate: new Date().toISOString().split('T')[0]
  };
  const updatedMembers = [...members, newMember];
  saveTeamMembers(updatedMembers);
  return newMember;
};

export const updateTeamMember = (id: string, updates: Partial<TeamMember>): TeamMember | null => {
  const members = getTeamMembers();
  const index = members.findIndex(member => member.id === id);
  if (index === -1) return null;
  
  const updatedMember = { ...members[index], ...updates };
  members[index] = updatedMember;
  saveTeamMembers(members);
  return updatedMember;
};

export const deleteTeamMember = (id: string): boolean => {
  const members = getTeamMembers();
  const filteredMembers = members.filter(member => member.id !== id);
  if (filteredMembers.length === members.length) return false;
  
  saveTeamMembers(filteredMembers);
  return true;
};

// Site Settings Management
export const getSiteSettings = (): SiteSettings => {
  return getFromStorage(STORAGE_KEYS.SITE_SETTINGS, defaultSiteSettings);
};

export const saveSiteSettings = (settings: SiteSettings): void => {
  saveToStorage(STORAGE_KEYS.SITE_SETTINGS, settings);
};

export const updateSiteSettings = (updates: Partial<SiteSettings>): SiteSettings => {
  const settings = getSiteSettings();
  const updatedSettings = { ...settings, ...updates };
  saveSiteSettings(updatedSettings);
  return updatedSettings;
};

// Contact Messages Management
export const getContactMessages = (): ContactMessage[] => {
  return getFromStorage(STORAGE_KEYS.CONTACT_MESSAGES, []);
};

export const saveContactMessages = (messages: ContactMessage[]): void => {
  saveToStorage(STORAGE_KEYS.CONTACT_MESSAGES, messages);
};

export const addContactMessage = (message: Omit<ContactMessage, 'id' | 'date' | 'isRead' | 'status'>): ContactMessage => {
  const messages = getContactMessages();
  const newMessage: ContactMessage = {
    ...message,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    isRead: false,
    status: 'new'
  };
  const updatedMessages = [newMessage, ...messages];
  saveContactMessages(updatedMessages);
  return newMessage;
};

export const markMessageAsRead = (id: string): ContactMessage | null => {
  const messages = getContactMessages();
  const index = messages.findIndex(message => message.id === id);
  if (index === -1) return null;
  
  const updatedMessage = { ...messages[index], isRead: true, status: 'read' as const };
  messages[index] = updatedMessage;
  saveContactMessages(messages);
  return updatedMessage;
};

// Projects Management
export const getProjects = (): Project[] => {
  return getFromStorage(STORAGE_KEYS.PROJECTS, defaultProjects);
};

export const saveProjects = (projects: Project[]): void => {
  saveToStorage(STORAGE_KEYS.PROJECTS, projects);
};

export const addProject = (project: Omit<Project, 'id'>): Project => {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: Date.now().toString()
  };
  const updatedProjects = [...projects, newProject];
  saveProjects(updatedProjects);
  return newProject;
};

export const updateProject = (id: string, updates: Partial<Project>): Project | null => {
  const projects = getProjects();
  const index = projects.findIndex(project => project.id === id);
  if (index === -1) return null;
  
  const updatedProject = { ...projects[index], ...updates };
  projects[index] = updatedProject;
  saveProjects(projects);
  return updatedProject;
};

export const deleteProject = (id: string): boolean => {
  const projects = getProjects();
  const filteredProjects = projects.filter(project => project.id !== id);
  if (filteredProjects.length === projects.length) return false;
  
  saveProjects(filteredProjects);
  return true;
};

// Testimonials Management
export const getTestimonials = (): Testimonial[] => {
  return getFromStorage(STORAGE_KEYS.TESTIMONIALS, defaultTestimonials);
};

export const saveTestimonials = (testimonials: Testimonial[]): void => {
  saveToStorage(STORAGE_KEYS.TESTIMONIALS, testimonials);
};

export const addTestimonial = (testimonial: Omit<Testimonial, 'id' | 'date'>): Testimonial => {
  const testimonials = getTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  const updatedTestimonials = [...testimonials, newTestimonial];
  saveTestimonials(updatedTestimonials);
  return newTestimonial;
};

export const updateTestimonial = (id: string, updates: Partial<Testimonial>): Testimonial | null => {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(testimonial => testimonial.id === id);
  if (index === -1) return null;
  
  const updatedTestimonial = { ...testimonials[index], ...updates };
  testimonials[index] = updatedTestimonial;
  saveTestimonials(testimonials);
  return updatedTestimonial;
};

export const deleteTestimonial = (id: string): boolean => {
  const testimonials = getTestimonials();
  const filteredTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
  if (filteredTestimonials.length === testimonials.length) return false;
  
  saveTestimonials(filteredTestimonials);
  return true;
};

// Newsletter Subscribers Management
export const getNewsletterSubscribers = (): NewsletterSubscriber[] => {
  return getFromStorage(STORAGE_KEYS.NEWSLETTER_SUBSCRIBERS, []);
};

export const saveNewsletterSubscribers = (subscribers: NewsletterSubscriber[]): void => {
  saveToStorage(STORAGE_KEYS.NEWSLETTER_SUBSCRIBERS, subscribers);
};

export const addNewsletterSubscriber = (email: string): NewsletterSubscriber => {
  const subscribers = getNewsletterSubscribers();
  const newSubscriber: NewsletterSubscriber = {
    id: Date.now().toString(),
    email,
    date: new Date().toISOString(),
    isActive: true
  };
  const updatedSubscribers = [...subscribers, newSubscriber];
  saveNewsletterSubscribers(updatedSubscribers);
  return newSubscriber;
};

export const removeNewsletterSubscriber = (id: string): boolean => {
  const subscribers = getNewsletterSubscribers();
  const filteredSubscribers = subscribers.filter(subscriber => subscriber.id !== id);
  if (filteredSubscribers.length === subscribers.length) return false;
  
  saveNewsletterSubscribers(filteredSubscribers);
  return true;
};

export const unsubscribeNewsletterSubscriber = (email: string): boolean => {
  const subscribers = getNewsletterSubscribers();
  const updatedSubscribers = subscribers.map(subscriber => 
    subscriber.email === email ? { ...subscriber, isActive: false } : subscriber
  );
  
  if (JSON.stringify(subscribers) === JSON.stringify(updatedSubscribers)) return false;
  
  saveNewsletterSubscribers(updatedSubscribers);
  return true;
};

export const getNewsletterSubscriberCount = (): number => {
  return getNewsletterSubscribers().filter(subscriber => subscriber.isActive).length;
};

// Button Management
export const getButtons = (): Button[] => {
  return getFromStorage(STORAGE_KEYS.BUTTONS, defaultButtons);
};

export const saveButtons = (buttons: Button[]): void => {
  saveToStorage(STORAGE_KEYS.BUTTONS, buttons);
};

export const addButton = (button: Omit<Button, 'id' | 'date'>): Button => {
  const buttons = getButtons();
  const newButton: Button = {
    ...button,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  const updatedButtons = [...buttons, newButton];
  saveButtons(updatedButtons);
  return newButton;
};

export const updateButton = (id: string, updates: Partial<Button>): Button | null => {
  const buttons = getButtons();
  const index = buttons.findIndex(button => button.id === id);
  if (index === -1) return null;
  
  const updatedButton = { ...buttons[index], ...updates };
  buttons[index] = updatedButton;
  saveButtons(buttons);
  return updatedButton;
};

export const deleteButton = (id: string): boolean => {
  const buttons = getButtons();
  const filteredButtons = buttons.filter(button => button.id !== id);
  if (filteredButtons.length === buttons.length) return false;
  
  saveButtons(filteredButtons);
  return true;
};

export const getButtonsBySection = (section: string): Button[] => {
  return getButtons().filter(button => button.section === section && button.isActive);
};

export const getButtonSections = (): string[] => {
  const buttons = getButtons();
  return Array.from(new Set(buttons.map(button => button.section)));
};

// Statistics
export const getAdminStats = () => {
  const blogPosts = getBlogPosts();
  const teamMembers = getTeamMembers();
  const projects = getProjects();
  const testimonials = getTestimonials();
  const contactMessages = getContactMessages();
  const newsletterSubscribers = getNewsletterSubscribers();
  const heroSlides = getHeroSlides();

  return {
    blogPosts: blogPosts.length,
    teamMembers: teamMembers.length,
    projects: projects.length,
    messages: contactMessages.length,
    newsletterSubscribers: newsletterSubscribers.length,
    testimonials: testimonials.length,
    activeHeroSlides: heroSlides.filter(slide => slide.isActive).length,
    totalHeroSlides: heroSlides.length,
    publishedPosts: blogPosts.filter(post => post.isPublished).length,
    draftPosts: blogPosts.filter(post => !post.isPublished).length,
    activeTeamMembers: teamMembers.filter(member => member.isActive).length,
    activeProjects: projects.filter(project => project.isActive).length,
    activeTestimonials: testimonials.filter(testimonial => testimonial.isActive).length,
    unreadMessages: contactMessages.filter(message => !message.isRead).length
  };
};

// Export for use in components
export { STORAGE_KEYS };
