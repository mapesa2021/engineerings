import Head from 'next/head';
import Navbar from '../components/Navbar';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import Link from 'next/link';
import TeamSection from '../components/TeamSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Oleum Company Limited | Engineering Solutions in Tanzania</title>
        <meta name="description" content="Learn about Oleum Company Limited, a leading Tanzanian engineering company providing comprehensive technical solutions since 2023." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-oleum-white">
        <Navbar />
        
        {/* Hero Section */}
        <AnimatedSection delay={0.1}>
          <section className="section-padding bg-gradient-to-br from-oleum-navy via-oleum-navy-dark to-oleum-navy">
            <div className="container-custom">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-display">
                  About Oleum Company Limited
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-body">
                  Delivering innovative engineering solutions across Tanzania since 2023
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Company Story */}
        <AnimatedSection delay={200} animationType="scaleUp">
          <section className="section-padding bg-oleum-white">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-oleum-navy mb-6 font-display">
                    <span className="text-oleum-navy">Our Story</span>
                  </h2>
                  <p className="text-lg text-oleum-navy/80 mb-6 leading-relaxed">
                    Founded in 2023, Oleum Company Limited emerged from a vision to provide comprehensive engineering solutions that drive Tanzania's industrial and infrastructure development. What started as a small team of three passionate engineers has grown into a trusted partner for businesses across the country.
                  </p>
                  <p className="text-lg text-oleum-navy/80 mb-6 leading-relaxed">
                    Based in Ubungo, we've successfully completed 5 projects, serving clients in manufacturing, construction, environmental management, and various industrial sectors. Our commitment to excellence and innovation has made us a preferred choice for engineering solutions across Tanzania.
                  </p>
                  <p className="text-lg text-oleum-navy/80 mb-6 leading-relaxed">
                    We believe in building lasting relationships with our clients through transparent communication, reliable service delivery, and continuous improvement in our technical capabilities.
                  </p>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-oleum-yellow/20 to-oleum-navy/20 rounded-2xl p-8 border border-oleum-yellow/30">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-oleum-yellow to-oleum-navy rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-white font-bold">
                        💧
                      </div>
                      <h3 className="text-2xl font-bold text-oleum-navy mb-4">Our Mission</h3>
                      <p className="text-oleum-navy/80 leading-relaxed">
                        To provide innovative, reliable, and sustainable engineering solutions that empower businesses to achieve their goals while contributing to Tanzania's development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Company Values */}
        <AnimatedSection delay={300} animationType="scaleUp">
          <section className="section-padding bg-oleum-navy">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-display">
                  <span className="text-white">Our Core Values</span>
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto font-body">
                  The principles that guide our work and relationships with clients.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatedCard delay={100} animationType="scaleUp">
                  <div className="feature-card text-center group">
                    <div className="w-20 h-20 bg-oleum-yellow rounded-lg flex items-center justify-center mx-auto mb-6 text-3xl text-oleum-black transition-all duration-300 hover:animate-wiggle group-hover:animate-bounce-subtle">
                      ⚡
                    </div>
                    <h3 className="text-2xl font-bold text-oleum-navy mb-4">Excellence</h3>
                    <p className="text-oleum-navy/80 leading-relaxed">
                      We strive for excellence in every project, delivering the highest quality engineering solutions that exceed expectations and set industry standards.
                    </p>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={200} animationType="scaleUp">
                  <div className="feature-card text-center group">
                    <div className="w-20 h-20 bg-oleum-navy rounded-lg flex items-center justify-center mx-auto mb-6 text-3xl text-white transition-all duration-300 hover:animate-wiggle group-hover:animate-bounce-subtle">
                      🤝
                    </div>
                    <h3 className="text-2xl font-bold text-oleum-navy mb-4">Integrity</h3>
                    <p className="text-oleum-navy/80 leading-relaxed">
                      We conduct business with honesty, transparency, and ethical practices, building lasting trust with our clients and maintaining the highest professional standards.
                    </p>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={300} animationType="scaleUp">
                  <div className="feature-card text-center group">
                    <div className="w-20 h-20 bg-oleum-yellow rounded-lg flex items-center justify-center mx-auto mb-6 text-3xl text-oleum-black transition-all duration-300 hover:animate-wiggle group-hover:animate-bounce-subtle">
                      🌱
                    </div>
                    <h3 className="text-2xl font-bold text-oleum-navy mb-4">Innovation</h3>
                    <p className="text-oleum-navy/80 leading-relaxed">
                      We embrace new technologies and innovative approaches to solve complex engineering challenges, staying ahead of industry trends and best practices.
                    </p>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Company Timeline */}
        <AnimatedSection delay={400} animationType="scaleUp">
          <section className="section-padding bg-oleum-white">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-oleum-navy mb-6 font-display">
                  <span className="text-oleum-navy">Our Journey</span>
                </h2>
                <p className="text-xl text-oleum-navy/80 max-w-3xl mx-auto font-body">
                  Key milestones in our company's growth and development.
                </p>
              </div>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-oleum-yellow h-full"></div>
                
                <div className="space-y-12">
                  {/* 2023 */}
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8 text-right">
                      <div className="bg-oleum-navy text-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-2">2023</h3>
                        <p className="text-white/90">Company founded in Ubungo with 3 engineers</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-oleum-yellow rounded-full border-4 border-white shadow-lg"></div>
                    <div className="w-1/2 pl-8"></div>
                  </div>

                  {/* 2024 */}
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8"></div>
                    <div className="w-4 h-4 bg-oleum-yellow rounded-full border-4 border-white shadow-lg"></div>
                    <div className="w-1/2 pl-8">
                      <div className="bg-oleum-yellow text-oleum-black p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-2">2024</h3>
                        <p className="text-oleum-black/90">Completed first 5 projects and established client base</p>
                      </div>
                    </div>
                  </div>

                  {/* 2025 */}
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8 text-right">
                      <div className="bg-oleum-navy text-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-2">2025</h3>
                        <p className="text-white/90">Expanding services and building strong partnerships</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-oleum-yellow rounded-full border-4 border-white shadow-lg"></div>
                    <div className="w-1/2 pl-8"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Team Section */}
        <TeamSection 
          title="Our Expert Team"
          subtitle="Meet the dedicated professionals behind our success."
          maxMembers={6}
          showExpertise={true}
          showContact={true}
        />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Location & Contact */}
        <AnimatedSection delay={0.6}>
          <section className="section-padding bg-oleum-white">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-oleum-navy mb-6 font-display">
                  <span className="text-oleum-navy">Visit Our Office</span>
                </h2>
                <p className="text-xl text-oleum-navy/80 max-w-3xl mx-auto font-body">
                  Located in the heart of Ubungo, our office is easily accessible and ready to welcome you.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="bg-oleum-navy text-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-oleum-yellow rounded-lg flex items-center justify-center text-oleum-black">
                          📍
                        </div>
                        <div>
                          <p className="font-semibold">Address</p>
                          <p className="text-white/80">Ubungo, Dar es Salaam, Tanzania</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-oleum-yellow rounded-lg flex items-center justify-center text-oleum-black">
                          📞
                        </div>
                        <div>
                          <p className="font-semibold">Phone</p>
                          <p className="text-white/80">+255 674 685 062</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-oleum-yellow rounded-lg flex items-center justify-center text-oleum-black">
                          📧
                        </div>
                        <div>
                          <p className="font-semibold">Email</p>
                          <p className="text-white/80">info@oleum.co.tz</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-oleum-yellow rounded-lg flex items-center justify-center text-oleum-black">
                          🕒
                        </div>
                        <div>
                          <p className="font-semibold">Business Hours</p>
                          <p className="text-white/80">Monday - Friday: 8:00 AM - 6:00 PM</p>
                          <p className="text-white/80">Saturday: 9:00 AM - 3:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg h-96">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.5!2d39.1945!3d-6.7909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDcnMjcuNCJTIDM5wrAxMSc0MC4xIkU!5e0!3m2!1sen!2stz!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Oleum Company Limited Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection delay={0.7}>
          <section className="section-padding bg-oleum-navy relative overflow-hidden">
            <div className="container-custom relative z-10">
              <div className="text-center">
                <div className="w-20 h-20 bg-oleum-yellow rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle shadow-lg">
                  <span className="text-3xl">🚀</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-display">
                  <span className="text-white">Ready to Work Together?</span>
                </h2>
                
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Let's discuss how our engineering expertise can help achieve your project goals.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/contact" className="group relative">
                    <div className="bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform hover:animate-bounce-subtle flex items-center justify-center gap-3 border-2 border-oleum-navy hover:border-oleum-navy-dark shadow-oleum-yellow/20">
                      <svg className="w-6 h-6 group-hover:animate-wiggle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    Get in Touch
                    </div>
                  </Link>
                  
                  <Link href="/projects" className="group relative">
                    <div className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 transform hover:animate-bounce-subtle flex items-center justify-center gap-3">
                      <svg className="w-6 h-6 group-hover:animate-wiggle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      View Projects
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <Footer />
      </main>
    </>
  );
} 