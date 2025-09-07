'use client';
import { useState, useEffect } from 'react';
import { getTestimonials, type Testimonial } from '../lib/adminData';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const loadTestimonials = () => {
      try {
      const data = getTestimonials();
        // Filter only active testimonials and sort by date (newest first)
        const activeTestimonials = data
          .filter(testimonial => testimonial.isActive)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setTestimonials(activeTestimonials);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading testimonials:', error);
        setTestimonials([]);
        setIsLoading(false);
      }
    };

    loadTestimonials();

    // Refresh testimonials every 3 seconds to catch updates from admin panel
    const interval = setInterval(loadTestimonials, 3000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <section className="section-padding bg-oleum-gray">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-oleum-navy mx-auto mb-4"></div>
            <p className="text-oleum-navy/60">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-oleum-gray">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-oleum-navy mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-oleum-navy/60 max-w-2xl mx-auto">
            Hear from our satisfied clients who have experienced our engineering excellence and professional service.
          </p>
        </div>
        
        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-oleum-navy/60 text-lg">No testimonials available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-oleum-gray">
                <div className="flex items-start mb-6">
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-oleum-navy rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-white">{testimonial.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-oleum-navy">{testimonial.name}</h3>
                    <p className="text-oleum-navy/60 text-sm">{testimonial.position}</p>
                    <p className="text-oleum-navy/60 text-sm">{testimonial.company}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-oleum-navy/80 leading-relaxed italic">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                <div className="mt-4 text-xs text-oleum-navy/40">
                  {new Date(testimonial.date).toLocaleDateString()}
                </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials; 