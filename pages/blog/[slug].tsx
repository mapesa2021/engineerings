import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import AnimatedSection from '../../components/AnimatedSection';
import NewsletterForm from '../../components/NewsletterForm';
import { getBlogPosts, type BlogPost } from '../../lib/adminData';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);



  useEffect(() => {
    if (slug) {
      const loadPost = () => {
        // Load real blog posts from admin data
        const allPosts = getBlogPosts();
        const foundPost = allPosts.find(p => p.slug === slug && p.isPublished);
        
        if (foundPost) {
          setPost(foundPost);
          // Get related posts (same category, different posts)
          const related = allPosts.filter(p => 
            p.category === foundPost.category && p.id !== foundPost.id && p.isPublished
          ).slice(0, 3);
          setRelatedPosts(related);
        }
        setIsLoading(false);
      };
      
      loadPost();
      
      // Refresh every 5 seconds to catch updates
      const interval = setInterval(loadPost, 5000);
      
      return () => clearInterval(interval);
    }
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading... - Oleum Company Limited</title>
        </Head>
        <main className="min-h-screen bg-oleum-white">
          <Navbar />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-navy mx-auto mb-4"></div>
              <p className="text-oleum-gray-dark">Loading article...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Head>
          <title>Article Not Found - Oleum Company Limited</title>
        </Head>
        <main className="min-h-screen bg-oleum-white">
          <Navbar />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="text-6xl mb-4">📝</div>
              <h1 className="text-2xl font-bold text-oleum-navy mb-2">Article Not Found</h1>
              <p className="text-oleum-gray-dark mb-4">The article you're looking for doesn't exist.</p>
              <Link href="/blog" className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-6 py-3 rounded-lg transition-colors">
                Back to Blog
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - Oleum Company Limited</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-oleum-white">
        <Navbar />

        {/* Article Header */}
        <AnimatedSection delay={0.1}>
          <section className="section-padding bg-gradient-to-br from-oleum-navy via-oleum-navy-dark to-oleum-navy">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-6">
                  <Link href="/blog" className="inline-flex items-center text-oleum-yellow hover:text-oleum-yellow-light transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Blog
                  </Link>
                </div>
                
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="bg-oleum-yellow/20 text-oleum-yellow px-4 py-2 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/60">{post.readTime} min read</span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/60">{post.publishedAt}</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  {post.title}
                </h1>

                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-oleum-yellow rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-oleum-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">{post.author}</p>
                    <p className="text-white/60 text-sm">Author</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Featured Image */}
        {post.image && (
          <AnimatedSection delay={0.15}>
            <section className="section-padding">
              <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-xl shadow-lg border border-oleum-gray overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 md:h-96 object-cover"
                      onError={(e) => {
                        // Hide image if it fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>
        )}

        {/* Article Content */}
        <AnimatedSection delay={0.2}>
          <section className="section-padding">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <article className="prose prose-lg max-w-none">
                  <div 
                    className="bg-white rounded-xl shadow-lg border border-oleum-gray p-8 md:p-12 prose-headings:text-oleum-navy prose-headings:font-bold prose-h2:text-3xl prose-h2:mb-6 prose-h3:text-xl prose-h3:mb-4 prose-p:text-oleum-gray-dark prose-p:leading-relaxed prose-p:mb-4 prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2 prose-strong:text-oleum-navy prose-strong:font-semibold"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </article>

                {/* Tags */}
                <div className="mt-8 pt-8 border-t border-oleum-gray">
                  <h3 className="text-lg font-semibold text-oleum-navy mb-4">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="bg-oleum-yellow/20 text-oleum-yellow-dark px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <AnimatedSection delay={0.3}>
            <section className="section-padding bg-oleum-gray">
              <div className="container-custom">
                <h2 className="text-3xl font-bold text-oleum-navy text-center mb-12">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <article className="bg-white rounded-xl shadow-lg border border-oleum-gray overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                        <div className="p-6">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="bg-oleum-yellow/20 text-oleum-yellow-dark px-2 py-1 rounded-full text-xs font-medium">
                              {relatedPost.category}
                            </span>
                            <span className="text-oleum-gray-dark text-sm">•</span>
                            <span className="text-oleum-gray-dark text-sm">{relatedPost.readTime} min read</span>
                          </div>

                          <h3 className="text-lg font-bold text-oleum-navy mb-3 line-clamp-2">
                            {relatedPost.title}
                          </h3>

                          <p className="text-oleum-gray-dark mb-4 line-clamp-3">
                            {relatedPost.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-oleum-gray-dark">{relatedPost.author}</span>
                            <span className="text-sm text-oleum-gray-dark">{relatedPost.publishedAt}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>
        )}

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
