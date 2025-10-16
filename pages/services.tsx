import Head from 'next/head';
import Navbar from '../components/Navbar';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Services - Oleum Company Limited | Engineering Solutions in Tanzania</title>
        <meta name="description" content="Explore our comprehensive engineering services including electrical systems, industrial automation, environmental consulting, and supply solutions across Tanzania." />
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
                  Our Services
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-body">
                  Comprehensive engineering solutions tailored to your business needs across Tanzania
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Core Services */}
        <AnimatedSection delay={0.2}>
          <section className="section-padding bg-oleum-white">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-oleum-navy mb-6 font-display">
                  <span className="text-oleum-navy">Core Services</span>
                </h2>
                <p className="text-xl text-oleum-navy/80 max-w-3xl mx-auto font-body">
                  Professional engineering solutions categorized by industry and application for easy understanding.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Supplies & Materials */}
                <AnimatedCard delay={0.1}>
                  <div className="bg-white border-2 border-oleum-gray rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-oleum-yellow rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl text-oleum-black">
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
                <AnimatedCard delay={0.2}>
                  <div className="bg-white border-2 border-oleum-yellow rounded-lg p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
                    {/* Most Popular Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-oleum-yellow text-oleum-black px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </div>
                    </div>
                    
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-oleum-navy rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl text-white">
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
                <AnimatedCard delay={0.3}>
                  <div className="bg-white border-2 border-oleum-gray rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-oleum-yellow rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl text-oleum-black">
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
        <AnimatedSection delay={0.3}>
          <section className="section-padding bg-oleum-navy">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-display">
                  <span className="text-white">Supply Solutions</span>
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto font-body">
                  Comprehensive supply of chemicals, construction materials, office supplies, and specialized equipment across Tanzania.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Industrial Chemicals */}
                <AnimatedCard delay={0.1}>
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
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
                </AnimatedCard>

                {/* Medical & Laboratory */}
                <AnimatedCard delay={0.2}>
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border-2 border-white">
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
                </AnimatedCard>

                {/* Construction Materials */}
                <AnimatedCard delay={0.3}>
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
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
                </AnimatedCard>

                {/* Office & Event Supplies */}
                <AnimatedCard delay={0.4}>
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border-2 border-white">
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
                </AnimatedCard>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection delay={0.4}>
          <section className="section-padding bg-oleum-yellow">
            <div className="container-custom text-center">
              <h2 className="text-3xl md:text-4xl font-black text-oleum-black mb-6 font-display">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-oleum-black/80 mb-8 max-w-2xl mx-auto">
                Contact us today for a consultation and discover how our comprehensive engineering solutions can benefit your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-oleum-navy text-white hover:bg-oleum-navy-dark font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
                  Get a Quote
                </Link>
                <Link href="/contact" className="border-2 border-oleum-navy text-oleum-navy hover:bg-oleum-navy hover:text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <Footer />
      </main>
    </>
  );
}
