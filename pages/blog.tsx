import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import NewsletterForm from '../components/NewsletterForm';
import { getBlogPosts, type BlogPost } from '../lib/adminData';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(() => {
    // Load real blog posts from admin data
    const loadPosts = () => {
      const realPosts = getBlogPosts().filter(post => post.isPublished);
      setPosts(realPosts);
          setIsLoading(false);
      };
      
      loadPosts();
    
    // Refresh posts every 5 seconds to catch new additions
    const interval = setInterval(loadPosts, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Head>
        <title>Blog - Oleum Company Limited</title>
        <meta name="description" content="Latest insights, trends, and updates from Oleum Company Limited. Engineering solutions, industrial automation, and professional guidance." />
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
                Our Blog
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-body">
                Latest insights, trends, and updates from our engineering experts
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Search and Filter Section */}
        <AnimatedSection delay={0.2}>
          <section className="section-padding bg-oleum-gray">
            <div className="container-custom">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                {/* Search */}
                <div className="relative w-full lg:w-96">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-oleum-gray-dark rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                  />
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-oleum-navy text-white'
                          : 'bg-white text-oleum-navy hover:bg-oleum-navy hover:text-white'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Blog Posts */}
        <AnimatedSection delay={0.3}>
          <section className="section-padding">
            <div className="container-custom">
                {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-navy mx-auto mb-4"></div>
                  <p className="text-oleum-gray-dark">Loading articles...</p>
                    </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-oleum-navy mb-2">No articles found</h3>
                  <p className="text-oleum-gray-dark">Try adjusting your search or filter criteria.</p>
                  </div>
                                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, index) => (
                    <AnimatedCard key={post.id} delay={0.1 + index * 0.1}>
                      <Link href={`/blog/${post.slug}`}>
                        <article className="bg-white rounded-xl shadow-lg border border-oleum-gray overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                          {/* Image */}
                          <div className="relative h-48 bg-oleum-gray overflow-hidden">
                            {post.image ? (
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to placeholder if image fails to load
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`absolute inset-0 flex items-center justify-center ${post.image ? 'hidden' : ''}`}>
                              <svg className="w-16 h-16 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                            </div>
                      </div>
                      
                          {/* Content */}
                      <div className="p-6">
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="bg-oleum-yellow/20 text-oleum-yellow-dark px-3 py-1 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                              <span className="text-oleum-gray-dark text-sm">•</span>
                              <span className="text-oleum-gray-dark text-sm">{post.readTime} min read</span>
                        </div>
                        
                            <h3 className="text-xl font-bold text-oleum-navy mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        
                            <p className="text-oleum-gray-dark mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-oleum-gray rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                </div>
                                <span className="text-sm text-oleum-gray-dark">{post.author}</span>
                              </div>
                              <span className="text-sm text-oleum-gray-dark">{post.publishedAt}</span>
                        </div>
                        
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mt-4">
                              {post.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="bg-oleum-gray text-oleum-gray-dark px-2 py-1 rounded text-xs">
                                  #{tag}
                                </span>
                              ))}
                        </div>
                      </div>
                    </article>
                    </Link>
                  </AnimatedCard>
                  ))}
                </div>
              )}
            </div>
          </section>
        </AnimatedSection>

        {/* Newsletter Section */}
        <AnimatedSection delay={0.4}>
          <section className="section-padding bg-gradient-to-br from-oleum-navy via-oleum-navy-dark to-oleum-navy">
            <div className="container-custom text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Stay Updated</h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest engineering insights, industry trends, and company updates.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterForm />
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
    </>
  );
} 