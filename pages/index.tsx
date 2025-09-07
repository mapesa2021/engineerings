import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import Link from 'next/link';
import TeamSection from '../components/TeamSection';
import ProjectsSection from '../components/ProjectsSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { addNewsletterSubscriber } from '../lib/adminData';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [counts, setCounts] = useState({
    projects: 0,
    engineers: 0,
    years: 0,
    satisfaction: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Custom hook for counting animation
  const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!hasAnimated) return;
      
      let startTime: number;
      let animationFrame: number;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [end, duration, hasAnimated]);
    
    return count;
  };

  // Intersection Observer to trigger animation when stats section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  // Initialize counting animations
  const projectsCount = useCountUp(5, 2000);
  const engineersCount = useCountUp(10, 1500);
  const yearsCount = useCountUp(1, 1800);
  const satisfactionCount = useCountUp(100, 2500);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const subscriber = addNewsletterSubscriber(email);
      
      if (subscriber) {
        alert('Thank you for subscribing to our newsletter!');
        setEmail('');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  const faqData = [
    {
      question: "What engineering services does Oleum Company Limited provide?",
      answer: "We provide comprehensive engineering solutions including electrical & water systems, industrial automation, environmental consulting, chemical supply, construction materials, and office/event supplies."
    },
    {
      question: "Do you serve clients outside of Dar es Salaam?",
              answer: "Yes, we serve clients across Tanzania. While we're based in Ubungo, we provide our services nationwide."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on scope and complexity. Small installations may take 1-2 weeks, while large industrial projects can take 2-6 months. We provide detailed timelines during consultation."
    },
    {
      question: "Do you provide maintenance services?",
      answer: "Yes, we offer comprehensive maintenance services for all equipment we install, including preventive maintenance, emergency repairs, and system upgrades."
    },
    {
      question: "What industries do you primarily serve?",
      answer: "We serve diverse industries including manufacturing, agriculture, healthcare, hospitality, construction, and commercial sectors."
    }
  ];

  return (
    <>
      <Head>
        <title>Oleum Company Limited - Technical Engineering Solutions Across Tanzania</title>
        <meta name="description" content="Oleum Company Limited provides comprehensive technical engineering solutions including electrical & water systems, industrial automation, environmental consulting, chemical supply, construction materials, and office/event supplies across Tanzania." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-oleum-white">
        <Navbar />
        <Hero />
        
        {/* Stats Section */}
        <AnimatedSection delay={0.1}>
          <section className="section-padding bg-oleum-navy/5" ref={statsRef}>
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <AnimatedCard delay={0.1}>
                  <div className="stats-card text-center hover:animate-pulse-gentle transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-black text-oleum-navy mb-2 animate-bounce-subtle">{projectsCount}+</div>
                    <div className="text-oleum-navy font-semibold">Projects Completed</div>
                  </div>
                </AnimatedCard>
                
                                <AnimatedCard delay={0.2}>
                  <div className="stats-card text-center hover:animate-pulse-gentle transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-black text-oleum-navy mb-2 animate-bounce-subtle">{engineersCount}</div>
                    <div className="text-oleum-navy font-semibold">Expert Engineers</div>
                  </div>
                </AnimatedCard>
                
                                <AnimatedCard delay={0.3}>
                  <div className="stats-card text-center hover:animate-pulse-gentle transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-black text-oleum-navy mb-2 animate-bounce-subtle">{yearsCount}+</div>
                    <div className="text-oleum-navy font-semibold">Years Experience</div>
                  </div>
                </AnimatedCard>
                
                <AnimatedCard delay={0.4}>
                  <div className="stats-card text-center hover:animate-pulse-gentle transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-black text-oleum-navy mb-2 animate-bounce-subtle">{satisfactionCount}%</div>
                    <div className="text-oleum-navy font-semibold">Client Satisfaction</div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        {/* About Us Section */}
        <AnimatedSection delay={0.2}>
          <section className="section-padding bg-oleum-navy">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-display">
                  <span className="text-white">About Oleum Company Limited</span>
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto font-body">
                  Founded in 2023 in Ubungo, we are a leading Tanzanian engineering company delivering comprehensive technical solutions across multiple sectors with our team of 3 experienced professionals.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Experience */}
                <AnimatedCard delay={0.1}>
                  <div className="feature-card text-center group">
                    <div className="w-20 h-20 bg-oleum-yellow rounded-lg flex items-center justify-center mx-auto mb-6 text-3xl text-oleum-black transition-all duration-300 hover:animate-wiggle group-hover:animate-bounce-subtle">
                      🏗️
                    </div>
                    <h3 className="text-2xl font-bold text-oleum-navy mb-4">Technical Expertise</h3>
                    <p className="text-oleum-navy/80 leading-relaxed">
                      Our experienced team provides professional engineering solutions across all technical disciplines.
                    </p>
                  </div>
                </AnimatedCard>

                {/* Multi-Sector */}
                <AnimatedCard delay={0.2}>
                  <div className="feature-card text-center group">
                    <div className="w-20 h-20 bg-oleum-navy rounded-lg flex items-center justify-center mx-auto mb-6 text-3xl text-white transition-all duration-300 hover:animate-wiggle group-hover:animate-bounce-subtle">
                      🔧
                    </div>
                    <h3 className="text-2xl font-bold text-oleum-navy mb-4">Multi-Sector Solutions</h3>
                    <p className="text-oleum-navy/80 leading-relaxed">
                      From electrical systems to environmental consulting, we offer end-to-end solutions for diverse industry needs.
                    </p>
                </div>
                </AnimatedCard>

                {/* Location */}
                <AnimatedCard delay={0.3}>
                  <div className="feature-card text-center group">
                    <div className="w-20 h-20 bg-oleum-yellow rounded-lg flex items-center justify-center mx-auto mb-6 text-3xl text-oleum-black transition-all duration-300 hover:animate-wiggle group-hover:animate-bounce-subtle">
                      📍
                </div>
                    <h3 className="text-2xl font-bold text-oleum-navy mb-4">Serving Tanzania</h3>
                    <p className="text-oleum-navy/80 leading-relaxed">
                      Based in Ubungo, we serve clients across Tanzania with reliable, professional engineering services.
                    </p>
                </div>
                </AnimatedCard>
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        {/* Core Services Packages */}
        <AnimatedSection delay={300} animationType="scaleUp">
          <section className="section-padding bg-oleum-white">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-oleum-navy mb-6 font-display">
                  <span className="text-oleum-navy">Our Services</span>
                  </h2>
                <p className="text-xl text-oleum-black max-w-3xl mx-auto font-body">
                  Comprehensive engineering solutions categorized by industry and application for easy understanding.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Supplies & Materials */}
                <AnimatedCard 
                  delay={100} 
                  animationType="scaleUp"
                  hoverEffect="lift"
                >
                  <div className="bg-white border-2 border-oleum-gray rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-oleum-yellow rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl text-oleum-black animate-float">
                        📦
                      </div>
                      <h3 className="text-2xl font-bold text-oleum-navy mb-2">Supplies & Materials</h3>
                      <p className="text-oleum-navy/80 text-sm">Comprehensive supply of equipment, chemicals, and materials</p>
                    </div>
                    
                    <div className="space-y-4 mb-8">

                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Water Treatment Equipment</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Water Treatment Chemicals</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Swimming Pool Chemicals</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Distilled Water (Hospitals, Labs, Cars, Batteries)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Construction Materials (Cement, Gravel, Sand)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Office & Event Supplies</span>
                      </div>
                    </div>
                    
                    <Link href="/services">
                      <button className="w-full bg-oleum-navy hover:bg-oleum-navy-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </AnimatedCard>

                {/* Engineering & Technical Solutions */}
                <AnimatedCard 
                  delay={200} 
                  animationType="scaleUp"
                  hoverEffect="glow"
                >
                  <div className="bg-white border-2 border-oleum-yellow rounded-lg p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
                    {/* Most Popular Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-oleum-yellow text-oleum-black px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </div>
                    </div>
                    
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-oleum-navy rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl text-white animate-float">
                        ⚙️
                      </div>
                      <h3 className="text-2xl font-bold text-oleum-navy mb-2">Engineering & Technical Solutions</h3>
                      <p className="text-oleum-navy/80 text-sm">Comprehensive engineering and technical services</p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Electrical Equipment (Supply, Installation, Maintenance)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Water Treatment Plants (Supply, Installation, Maintenance)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Drip Irrigation Systems</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Process Optimization & Design</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Process Auditing & Safety Audits</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Industrial Automation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Installation of Small to Medium Process Plants</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">AC and Refrigeration Systems (Supply, Installation and Maintenance)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Solar System and Solar Devices (Supply, Installation and Maintenance)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Electronic Devices (Supply, Installation and Maintenance)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Kiln Refractory Installation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Non-Destructive Testing in Pipelines, Pressure Vessels, etc</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Calibration and Testing of Instruments Like Gas Detectors and Analysers, PSV, Transmitters and Flow Meters</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Process Plant Design and P&ID Development</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Cathodic Protection</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">De-Rusting and Painting</span>
                      </div>

                    </div>
                    
                    <Link href="/services">
                      <button className="w-full bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </AnimatedCard>

                {/* Environmental & Sustainability Services */}
                <AnimatedCard 
                  delay={300} 
                  animationType="scaleUp"
                  hoverEffect="tilt"
                >
                  <div className="bg-white border-2 border-oleum-gray rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-oleum-yellow rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl text-oleum-black animate-float">
                        🌱
                      </div>
                      <h3 className="text-2xl font-bold text-oleum-navy mb-2">Environmental & Sustainability Services</h3>
                      <p className="text-oleum-navy/80 text-sm">Environmental protection and sustainability solutions</p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Industrial Pollution Control</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Waste Management</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Environmental Protection & Energy Conservation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Environmental Audits</span>
                      </div>


                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Environmental Impact Assessment (EIA)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-oleum-yellow rounded-full flex items-center justify-center">
                          <span className="text-oleum-black text-xs">✓</span>
                        </div>
                        <span className="text-oleum-navy text-sm">Chemical Disposal</span>
                      </div>
                    </div>
                    
                    <Link href="/services">
                      <button className="w-full bg-oleum-navy hover:bg-oleum-navy-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        {/* Supply Solutions */}
        <AnimatedSection delay={0.4}>
          <section className="section-padding bg-oleum-white">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-oleum-navy mb-6 font-display">
                  <span className="text-oleum-navy">Supply Solutions</span>
                </h2>
                <p className="text-xl text-oleum-navy/80 max-w-3xl mx-auto font-body">
                  Comprehensive supply of chemicals, construction materials, office supplies, and specialized equipment across Tanzania.
                </p>
              </div>
              
              {/* Auto-scrolling container */}
              <div className="relative overflow-hidden">
                <div className="flex animate-scroll-infinite gap-8">
                  {/* First set of tiles */}
                  <div className="flex gap-8 min-w-max">
                    {/* Industrial Chemicals */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-yellow h-24 flex items-center justify-center">
                        <div className="text-3xl">🧪</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Industrial Chemicals</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Specialized chemicals for water treatment, industrial processes, and swimming pool maintenance.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Medical & Laboratory */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-navy h-24 flex items-center justify-center">
                        <div className="text-3xl">🔋</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Medical & Laboratory</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Supply of Distilled Water
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Construction Materials */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-yellow h-24 flex items-center justify-center">
                        <div className="text-3xl">🧱</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Construction Materials</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Quality building materials including cement, gravel, sand, and construction supplies.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Office & Event Supplies */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-navy h-24 flex items-center justify-center">
                        <div className="text-3xl">📦</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Office & Event Supplies</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Complete office solutions including stationery, event materials, and promotional items.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Water Treatment Systems */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-yellow h-24 flex items-center justify-center">
                        <div className="text-3xl">💧</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Water Treatment Systems</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Advanced filtration and purification systems for industrial and commercial applications.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Safety Equipment */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-navy h-24 flex items-center justify-center">
                        <div className="text-3xl">🛡️</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Safety Equipment</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Personal protective equipment and safety gear for industrial and construction sites.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Automation Systems */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-yellow h-24 flex items-center justify-center">
                        <div className="text-3xl">🤖</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Automation Systems</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Industrial automation and control systems for manufacturing and process industries.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Environmental Solutions */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-navy h-24 flex items-center justify-center">
                        <div className="text-3xl">🌱</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Environmental Solutions</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Waste management, pollution control, and environmental monitoring systems.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Duplicate set for seamless loop */}
                  <div className="flex gap-8 min-w-max">
                    {/* Industrial Chemicals */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-yellow h-24 flex items-center justify-center">
                        <div className="text-3xl">🧪</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Industrial Chemicals</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Specialized chemicals for water treatment, industrial processes, and swimming pool maintenance.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Medical & Laboratory */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-navy h-24 flex items-center justify-center">
                        <div className="text-3xl">🔋</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Medical & Laboratory</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                        Supply of Distilled Water
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Construction Materials */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-yellow h-24 flex items-center justify-center">
                        <div className="text-3xl">🧱</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Construction Materials</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Quality building materials including cement, gravel, sand, and construction supplies.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Office & Event Supplies */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-navy h-24 flex items-center justify-center">
                        <div className="text-3xl">📦</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Office & Event Supplies</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Complete office solutions including stationery, event materials, and promotional items.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Water Treatment Systems */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-yellow h-24 flex items-center justify-center">
                        <div className="text-3xl">💧</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Water Treatment Systems</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Advanced filtration and purification systems for industrial and commercial applications.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Safety Equipment */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-navy h-24 flex items-center justify-center">
                        <div className="text-3xl">🛡️</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Safety Equipment</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Personal protective equipment and safety gear for industrial and construction sites.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Automation Systems */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-yellow h-24 flex items-center justify-center">
                        <div className="text-3xl">🤖</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Automation Systems</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Industrial automation and control systems for manufacturing and process industries.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Environmental Solutions */}
                    <div className="w-80 tile-3d border-2 border-white">
                      <div className="bg-oleum-navy h-24 flex items-center justify-center">
                        <div className="text-3xl">🌱</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-oleum-navy mb-3">Environmental Solutions</h3>
                        <p className="text-oleum-navy/70 text-sm mb-4">
                          Waste management, pollution control, and environmental monitoring systems.
                        </p>
                        <a href="#" className="text-oleum-navy font-semibold text-sm hover:text-oleum-navy-dark transition-colors duration-200">
                          Learn More →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Featured Projects Section */}
        <ProjectsSection 
          title="Featured Projects"
          subtitle="Discover our latest engineering solutions and successful implementations across Tanzania."
          maxProjects={3}
          showFeatured={true}
          showCategories={false}
        />

        {/* Team Section */}
        <TeamSection 
          title="Meet Our Expert Team"
          subtitle="Our experienced professionals are dedicated to delivering exceptional engineering solutions across Tanzania."
          maxMembers={3}
          showExpertise={true}
          showContact={true}
        />

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <AnimatedSection delay={0.7}>
          <section className="section-padding bg-oleum-navy/5">
            <div className="container-custom">
              <div className="text-center mb-16">
                <div className="w-20 h-1 bg-gradient-to-r from-oleum-yellow to-oleum-navy mx-auto mb-6 animate-bounce-subtle"></div>
                <h2 className="text-4xl md:text-5xl font-black text-oleum-navy mb-6 font-display">
                  <span className="text-oleum-navy">Frequently Asked Questions</span>
                </h2>
                <p className="text-xl text-oleum-navy/80 max-w-3xl mx-auto font-body">
                  Get answers to common questions about our engineering services and solutions.
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                {faqData.map((faq, index) => (
                  <AnimatedCard key={index} delay={0.1 + index * 0.1}>
                    <div className={`faq-item ${index % 2 === 0 ? 'bg-white' : 'bg-oleum-navy/5'}`}>
                      <div 
                        className="faq-question"
                        onClick={() => toggleFaq(index)}
                      >
                        <h3 className="text-lg font-semibold text-oleum-navy">{faq.question}</h3>
                        <span className="text-oleum-yellow text-2xl transition-transform duration-200 hover:animate-bounce-subtle">
                          {activeFaq === index ? '−' : '+'}
                        </span>
                  </div>
                      {activeFaq === index && (
                        <div className="faq-answer">
                          <p className="text-oleum-navy/80">{faq.answer}</p>
                </div>
                      )}
                  </div>
                </AnimatedCard>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Newsletter Section */}
        <AnimatedSection delay={0.8}>
          <section className="section-padding bg-oleum-white border-t-4 border-oleum-yellow">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <div className="w-20 h-1 bg-gradient-to-r from-oleum-navy to-oleum-yellow mx-auto mb-6 animate-bounce-subtle"></div>
                <h2 className="text-4xl md:text-5xl font-black text-oleum-navy mb-6 font-display">
                  <span className="text-oleum-navy">Stay Updated</span>
                </h2>
                <p className="text-xl text-oleum-navy/80 mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter for the latest engineering insights, project updates, and industry news.
                </p>
                
                <div className="newsletter-form relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-oleum-yellow via-oleum-navy to-oleum-yellow animate-shimmer"></div>
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-oleum-navy border-2 border-oleum-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-oleum-yellow focus:border-oleum-yellow transition-colors duration-200 text-white placeholder-white/60"
                      required
                    />
                    <button type="submit" className="bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
                      Subscribe Now
                    </button>
                  </form>
                  </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection delay={0.9}>
          <section className="section-padding bg-oleum-navy relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-20 h-20 bg-oleum-yellow/10 rounded-full animate-pulse-gentle"></div>
              <div className="absolute top-20 right-20 w-16 h-16 bg-oleum-yellow/5 rounded-full animate-bounce-slow"></div>
              <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-oleum-yellow/8 rounded-full animate-rotate-slow"></div>
              <div className="absolute bottom-10 right-1/3 w-12 h-12 bg-oleum-yellow/6 rounded-full animate-wiggle"></div>
            </div>
            
            <div className="container-custom relative z-10">
              <div className="text-center">
                {/* Animated Icon */}
                <div className="w-20 h-20 bg-oleum-yellow rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle shadow-lg">
                  <span className="text-3xl">🚀</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-display animate-fade-in">
                  <span className="text-white">Ready to Get Started?</span>
                </h2>
                
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up">
                  Contact us today for a consultation and discover how our comprehensive engineering solutions can benefit your project.
                </p>
                
                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                  <Link href="/contact" className="group relative">
                    <div className="bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform hover:animate-bounce-subtle flex items-center justify-center gap-3 border-2 border-oleum-navy hover:border-oleum-navy-dark shadow-oleum-yellow/20">
                      <svg className="w-6 h-6 group-hover:animate-wiggle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Get a Quote
                    </div>
                  </Link>
                  
                  <Link href="/services" className="group relative">
                    <div className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 transform hover:animate-bounce-subtle flex items-center justify-center gap-3">
                      <svg className="w-6 h-6 group-hover:animate-wiggle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Explore Services
                    </div>
                  </Link>
                </div>
                
                {/* Trust Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-oleum-yellow rounded-full flex items-center justify-center text-oleum-black text-sm font-bold mr-3">
                        ✓
                      </div>
                      <span className="text-white font-semibold">Free Consultation</span>
                    </div>
                    <p className="text-white/80 text-sm">Get expert advice at no cost</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-oleum-yellow rounded-full flex items-center justify-center text-oleum-black text-sm font-bold mr-3">
                        ⚡
                      </div>
                      <span className="text-white font-semibold">Quick Response</span>
                    </div>
                    <p className="text-white/80 text-sm">We respond within 24 hours</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-oleum-yellow rounded-full flex items-center justify-center text-oleum-black text-sm font-bold mr-3">
                        🏆
                      </div>
                      <span className="text-white font-semibold">Proven Results</span>
                    </div>
                                            <p className="text-white/80 text-sm">5 successful projects completed</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Visual Separator */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-oleum-yellow via-oleum-navy to-oleum-yellow h-1"></div>
          <div className="container-custom py-8">
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-oleum-yellow rounded-full animate-bounce-subtle"></div>
            </div>
          </div>
        </div>

      <Footer />
      </main>
    </>
  );
} 