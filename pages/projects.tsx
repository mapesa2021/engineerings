import Head from 'next/head';
import Navbar from '../components/Navbar';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import Footer from '../components/Footer';
import Link from 'next/link';
import ProjectsSection from '../components/ProjectsSection';
import ProjectCategories from '../components/ProjectCategories';

export default function Projects() {
  return (
    <>
      <Head>
        <title>Our Projects - Oleum Company Limited | Engineering Solutions in Tanzania</title>
        <meta name="description" content="Explore our engineering projects and technical solutions across Tanzania, including electrical systems, industrial automation, and environmental consulting." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-oleum-white">
        <Navbar />
        
        {/* Hero Section */}
        <AnimatedSection delay={0.1}>
          <section className="section-padding bg-gradient-to-br from-oleum-navy via-oleum-navy-dark to-oleum-navy">
          <div className="container-custom text-center">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-display">
              Our Projects
            </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-body">
                Discover how we're delivering innovative engineering solutions across Tanzania.
            </p>
          </div>
        </section>
        </AnimatedSection>

        {/* Featured Projects */}
        <ProjectsSection 
          title="Featured Projects"
          subtitle="Discover how we're delivering innovative engineering solutions across Tanzania."
          maxProjects={6}
          showFeatured={true}
          showCategories={true}
        />

        {/* Project Categories */}
        <ProjectCategories 
          title="Project Categories"
          subtitle="Explore our diverse portfolio of engineering solutions across different sectors."
        />

        {/* Get Involved */}
        <AnimatedSection delay={0.4}>
          <section className="section-padding bg-oleum-yellow">
            <div className="container-custom text-center">
              <h2 className="text-3xl md:text-4xl font-black text-oleum-black mb-6 font-display">
                Start Your Project
            </h2>
              <p className="text-xl text-oleum-black/80 mb-8 max-w-2xl mx-auto">
                Ready to bring your engineering vision to life? Let's discuss your project requirements.
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