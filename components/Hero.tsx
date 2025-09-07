'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getHeroSlides } from '../lib/adminData';

// Parallax hook
const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return offset;
};

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const parallaxOffset = useParallax(0.3);

  // Load hero slides from admin data
  useEffect(() => {
    const loadHeroSlides = async () => {
      try {
        const allSlides = await getHeroSlides();
        console.log('🔍 Hero Component - All slides from admin:', allSlides);
        
        const slides = allSlides.filter(slide => slide.isActive);
        console.log('🔍 Hero Component - Active slides:', slides);
        
        if (slides.length > 0) {
          console.log('✅ Hero Component - Setting slides from admin data:', slides);
          setHeroSlides(slides);
        } else {
          console.log('⚠️ Hero Component - No active slides found, using fallback');
          // Fallback to default slides if no admin slides are configured
          setHeroSlides([
            {
              id: '1',
              title: 'Technical Engineering Solutions Across Tanzania',
              subtitle: 'Your Trusted Partner',
              description: 'From industrial automation to water treatment and office solutions, we deliver complete technical solutions for your business needs.',
              image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              buttonText: 'Get a Quote',
              buttonLink: '/contact',
              isActive: true
            }
          ]);
        }
      } catch (error) {
        console.error('❌ Hero Component - Error loading hero slides:', error);
        // Fallback to default slide
        setHeroSlides([
          {
            id: '1',
            title: 'Technical Engineering Solutions Across Tanzania',
            subtitle: 'Your Trusted Partner',
            description: 'From industrial automation to water treatment and office solutions, we deliver complete technical solutions for your business needs.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            buttonText: 'Get a Quote',
            buttonLink: '/contact',
            isActive: true
          }
        ]);
      }
    };

    loadHeroSlides();
    
    // Refresh slides every 5 seconds to catch admin updates
    const interval = setInterval(loadHeroSlides, 5000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    if (heroSlides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Function to go to next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroSlides.length - 1 : prevIndex - 1
    );
  };

  // Function to go to specific image
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (heroSlides.length === 0) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Loading..."
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="container-custom relative z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-yellow mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full Cover Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImageIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
            style={{
              transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
              transform: `translateY(${parallaxOffset}px) scale(1.1)`
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Professional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`text-left transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main Heading */}
            <h1 
              key={`title-${currentImageIndex}`}
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight font-display transition-all duration-1000 ease-in-out"
              style={{
                animation: 'fadeInUp 1s ease-in-out'
              }}
            >
              {heroSlides[currentImageIndex]?.title || heroSlides[0]?.title}
            </h1>
            
            {/* Subtitle */}
            {heroSlides[currentImageIndex]?.subtitle && (
              <p 
                key={`subtitle-${currentImageIndex}`}
                className="text-2xl md:text-3xl text-oleum-yellow mb-4 font-semibold transition-all duration-1000 ease-in-out"
                style={{
                  animation: 'fadeInUp 1s ease-in-out 0.2s both'
                }}
              >
                {heroSlides[currentImageIndex].subtitle}
              </p>
            )}
            
            {/* Description */}
            <p 
              key={`description-${currentImageIndex}`}
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-body transition-all duration-1000 ease-in-out"
              style={{
                animation: 'fadeInUp 1s ease-in-out 0.4s both'
              }}
            >
              {heroSlides[currentImageIndex]?.description || heroSlides[0]?.description}
            </p>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href={heroSlides[currentImageIndex]?.buttonLink || heroSlides[0]?.buttonLink || '/contact'}
                className="bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform hover:animate-bounce-subtle flex items-center justify-center gap-3 border-2 border-oleum-navy hover:border-oleum-navy-dark shadow-oleum-yellow/20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {heroSlides[currentImageIndex]?.buttonText || heroSlides[0]?.buttonText || 'Get a Quote'}
              </Link>
              <Link 
                href="/services"
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 transform hover:animate-bounce-subtle flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Explore Services
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-oleum-yellow mb-2">1+</div>
                <div className="text-white text-sm font-semibold">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-oleum-yellow mb-2">5+</div>
                <div className="text-white text-sm font-semibold">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-oleum-yellow mb-2">100%</div>
                <div className="text-white text-sm font-semibold">Client Satisfaction</div>
              </div>
            </div>
          </div>
          
          {/* Mini Slider */}
          <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              {/* Slider Images */}
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentImageIndex 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                  style={{
                    transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  {/* Image overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {slide.subtitle || 'Professional engineering solutions for your business'}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-3 transition-all duration-200 z-10"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-3 transition-all duration-200 z-10"
                aria-label="Next image"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Dots Indicator */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-oleum-yellow scale-110' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 