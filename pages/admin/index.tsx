import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAdminStats } from '../../lib/adminData';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    blogPosts: 0,
    teamMembers: 0,
    projects: 0,
    messages: 0,
    newsletterSubscribers: 0,
    testimonials: 0,
    activeHeroSlides: 0,
    totalHeroSlides: 0,
    publishedPosts: 0,
    draftPosts: 0,
    activeTeamMembers: 0,
    unreadMessages: 0
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('oleumAdminToken');
    if (token === 'oleum-admin-2025') {
      setIsAuthenticated(true);
      // Load real stats
      const realStats = getAdminStats();
      setStats(realStats);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-oleum-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-navy mx-auto mb-4"></div>
          <p className="text-oleum-navy/80">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Oleum Admin Dashboard</title>
        <meta name="description" content="Complete site management dashboard for Oleum Company Limited" />
      </Head>

      <div className="min-h-screen bg-oleum-gray">
        {/* Header */}
        <header className="bg-oleum-navy shadow-lg border-b border-oleum-yellow/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-oleum-yellow rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl font-bold text-oleum-black">O</span>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white">Oleum Admin</h1>
                  <p className="text-oleum-yellow/80 text-sm">Complete Site Management</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-white/80">Welcome, Administrator</span>
                <button
                  onClick={() => {
                    localStorage.removeItem('oleumAdminToken');
                    router.push('/admin/login');
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-oleum-navy/10 rounded-full">
                  <svg className="w-6 h-6 text-oleum-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Blog Posts</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{stats.blogPosts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-oleum-yellow/10 rounded-full">
                  <svg className="w-6 h-6 text-oleum-yellow-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Team Members</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{stats.teamMembers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-oleum-navy-light/10 rounded-full">
                  <svg className="w-6 h-6 text-oleum-navy-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Projects</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{stats.projects}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Messages</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{stats.messages}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-purple-500/10 rounded-full">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Newsletter</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{stats.newsletterSubscribers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-orange-500/10 rounded-full">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Testimonials</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{stats.testimonials}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-oleum-navy mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/admin/hero" className="bg-gradient-to-r from-oleum-navy to-oleum-navy-dark text-white p-4 rounded-xl hover:shadow-lg transition-all duration-200">
                <div className="flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  <div>
                    <h3 className="font-semibold">Hero Section</h3>
                    <p className="text-sm opacity-80">Manage homepage slider</p>
                  </div>
                </div>
              </Link>

              <Link href="/admin/blog" className="bg-gradient-to-r from-oleum-yellow to-oleum-yellow-dark text-oleum-black p-4 rounded-xl hover:shadow-lg transition-all duration-200">
                <div className="flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold">Blog Posts</h3>
                    <p className="text-sm opacity-80">Create & manage articles</p>
                  </div>
                </div>
              </Link>

              <Link href="/admin/team" className="bg-gradient-to-r from-oleum-navy-light to-blue-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-200">
                <div className="flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold">Team Members</h3>
                    <p className="text-sm opacity-80">Manage staff profiles</p>
                </div>
              </div>
            </Link>

              <Link href="/admin/projects" className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-200">
                <div className="flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <div>
                    <h3 className="font-semibold">Projects</h3>
                    <p className="text-sm opacity-80">Manage portfolio</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Content Management */}
            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <h3 className="text-xl font-bold text-oleum-navy mb-4">Content Management</h3>
              <div className="space-y-3">
                <Link href="/admin/hero" className="flex items-center justify-between p-3 bg-oleum-gray/50 rounded-lg hover:bg-oleum-gray transition-colors">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-oleum-navy mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-oleum-navy">Hero Slider</span>
                  </div>
                  <svg className="w-4 h-4 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
            </Link>

                <Link href="/admin/blog" className="flex items-center justify-between p-3 bg-oleum-gray/50 rounded-lg hover:bg-oleum-gray transition-colors">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-oleum-navy mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <span className="text-oleum-navy">Blog Posts</span>
                  </div>
                  <svg className="w-4 h-4 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link href="/admin/team" className="flex items-center justify-between p-3 bg-oleum-gray/50 rounded-lg hover:bg-oleum-gray transition-colors">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-oleum-navy mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span className="text-oleum-navy">Team Members</span>
                  </div>
                  <svg className="w-4 h-4 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
            </Link>

                <Link href="/admin/projects" className="flex items-center justify-between p-3 bg-oleum-gray/50 rounded-lg hover:bg-oleum-gray transition-colors">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-oleum-navy mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="text-oleum-navy">Projects</span>
                  </div>
                  <svg className="w-4 h-4 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link href="/admin/testimonials" className="flex items-center justify-between p-3 bg-oleum-gray/50 rounded-lg hover:bg-oleum-gray transition-colors">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-oleum-navy mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="text-oleum-navy">Testimonials</span>
                  </div>
                  <svg className="w-4 h-4 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Communication Management */}
            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <h3 className="text-xl font-bold text-oleum-navy mb-4">Communication</h3>
              <div className="space-y-3">
                <Link href="/admin/messages" className="flex items-center justify-between p-3 bg-oleum-gray/50 rounded-lg hover:bg-oleum-gray transition-colors">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-oleum-navy mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-oleum-navy">Contact Messages</span>
                  </div>
                  <svg className="w-4 h-4 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
            </Link>

                <Link href="/admin/newsletter" className="flex items-center justify-between p-3 bg-oleum-gray/50 rounded-lg hover:bg-oleum-gray transition-colors">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-oleum-navy mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-oleum-navy">Newsletter</span>
                  </div>
                  <svg className="w-4 h-4 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link href="/admin/social" className="flex items-center justify-between p-3 bg-oleum-gray/50 rounded-lg hover:bg-oleum-gray transition-colors">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-oleum-navy mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
                    </svg>
                    <span className="text-oleum-navy">Social Media</span>
                  </div>
                  <svg className="w-4 h-4 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
            </Link>

                <Link href="/admin/cta" className="flex items-center justify-between p-3 bg-oleum-gray/50 rounded-lg hover:bg-oleum-gray transition-colors">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-oleum-navy mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-oleum-navy">Call-to-Action</span>
                  </div>
                  <svg className="w-4 h-4 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
            </Link>

                <Link href="/admin/buttons" className="flex items-center justify-between p-3 bg-oleum-gray/50 rounded-lg hover:bg-oleum-gray transition-colors">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-oleum-navy mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <span className="text-oleum-navy">Button Management</span>
                  </div>
                  <svg className="w-4 h-4 text-oleum-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
            <h3 className="text-xl font-bold text-oleum-navy mb-4">Recent Activity</h3>
              <div className="space-y-4">
              <div className="flex items-center p-3 bg-oleum-gray/30 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-oleum-navy font-medium">New blog post published</p>
                  <p className="text-oleum-gray-dark text-sm">"Industrial Automation Trends 2025" - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-oleum-gray/30 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-oleum-navy font-medium">New contact message received</p>
                  <p className="text-oleum-gray-dark text-sm">From: john@oleum.co.tz - 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-oleum-gray/30 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-oleum-navy font-medium">Team member profile updated</p>
                  <p className="text-oleum-gray-dark text-sm">Sarah Johnson - 6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard; 