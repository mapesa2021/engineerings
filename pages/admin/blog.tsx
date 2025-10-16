'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  getBlogPosts, 
  addBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  type BlogPost 
} from '../../lib/adminData';

const BlogManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    image: '',
    category: '',
    tags: [] as string[],
    isPublished: true,
    readTime: 5
  });
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('oleumAdminToken');
    console.log('Blog Management - Token:', token);
    
    if (token === 'oleum-admin-2025') {
      setIsAuthenticated(true);
      
      const loadPosts = () => {
        try {
          const realPosts = getBlogPosts();
          console.log('Blog Management - Loaded posts:', realPosts);
          setPosts(realPosts);
        } catch (error) {
          console.error('Blog Management - Error loading posts:', error);
          setPosts([]);
        }
      };
      
      loadPosts();
      
      // Refresh posts every 3 seconds to catch updates
      const interval = setInterval(loadPosts, 3000);
      
      // Set loading to false after authentication check
      setIsLoading(false);
      
      return () => clearInterval(interval);
    } else {
      // User is not authenticated
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      // Update existing post
      const updatedPost = updateBlogPost(editingPost.id, {
        ...editingPost,
        ...formData
      });
      if (updatedPost) {
        setPosts(posts.map(p => p.id === editingPost.id ? updatedPost : p));
      }
      setEditingPost(null);
    } else {
      // Add new post
      const newPost = addBlogPost({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        image: formData.image,
        category: formData.category,
        tags: formData.tags,
        isPublished: formData.isPublished,
        readTime: formData.readTime
      });
      setPosts([newPost, ...posts]);
      setShowAddForm(false);
    }
    
    // Reset form
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      image: '',
      category: '',
      tags: [],
      isPublished: true,
      readTime: 5
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : 
              name === 'readTime' ? parseInt(value) || 5 : value
    }));
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      image: post.image,
      category: post.category,
      tags: post.tags,
      isPublished: post.isPublished,
      readTime: post.readTime
    });
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      const success = deleteBlogPost(id);
      if (success) {
        setPosts(posts.filter(p => p.id !== id));
      }
    }
  };

  const handleTogglePublish = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      const updatedPost = updateBlogPost(id, { isPublished: !post.isPublished });
      if (updatedPost) {
        setPosts(posts.map(p => p.id === id ? updatedPost : p));
      }
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'published') return post.isPublished;
    if (filter === 'draft') return !post.isPublished;
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-oleum-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-navy mx-auto mb-4"></div>
          <p className="text-oleum-navy/80">Loading Blog Management...</p>
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
        <title>Blog Management - Oleum Admin</title>
        <meta name="description" content="Manage blog posts and content" />
      </Head>

      <div className="min-h-screen bg-oleum-gray">
          {/* Header */}
        <header className="bg-oleum-navy shadow-lg border-b border-oleum-yellow/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/admin" className="mr-4">
                  <svg className="w-6 h-6 text-oleum-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
                <div className="w-8 h-8 bg-oleum-yellow rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg font-bold text-oleum-black">O</span>
                </div>
            <div>
                  <h1 className="text-xl font-black text-white">Blog Management</h1>
                  <p className="text-oleum-yellow/80 text-sm">Create and manage blog posts</p>
                </div>
            </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Create New Post
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-oleum-navy/10 rounded-full">
                  <svg className="w-6 h-6 text-oleum-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Total Posts</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{posts.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Published</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{posts.filter(p => p.isPublished).length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-500/10 rounded-full">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Drafts</p>
                  <p className="text-2xl font-semibold text-oleum-navy">{posts.filter(p => !p.isPublished).length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Total Views</p>
                  <p className="text-2xl font-semibold text-oleum-navy">2.4K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-oleum-navy">Blog Posts</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all' 
                      ? 'bg-oleum-navy text-white' 
                      : 'bg-oleum-gray text-oleum-navy hover:bg-oleum-gray-dark'
                  }`}
                >
                  All ({posts.length})
                </button>
                <button
                  onClick={() => setFilter('published')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'published' 
                      ? 'bg-oleum-navy text-white' 
                      : 'bg-oleum-gray text-oleum-navy hover:bg-oleum-gray-dark'
                  }`}
                >
                  Published ({posts.filter(p => p.isPublished).length})
                </button>
                <button
                  onClick={() => setFilter('draft')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'draft' 
                      ? 'bg-oleum-navy text-white' 
                      : 'bg-oleum-gray text-oleum-navy hover:bg-oleum-gray-dark'
                  }`}
                >
                  Drafts ({posts.filter(p => !p.isPublished).length})
                </button>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-oleum-navy">{post.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {post.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      
                    <p className="text-oleum-gray-dark mb-3">{post.excerpt}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-oleum-gray-dark">
                        <span>By {post.author}</span>
                      <span>•</span>
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.readTime} min read</span>
                      <span>•</span>
                      <span className="bg-oleum-gray px-2 py-1 rounded">{post.category}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-oleum-yellow/20 text-oleum-yellow-dark px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                      </div>
                    </div>
                    
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Edit
                    </button>
                      <button
                      onClick={() => handleTogglePublish(post.id)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                        post.isPublished
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {post.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
            ))}
          </div>

          {/* Add/Edit Form Modal */}
          {(showAddForm || editingPost) && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-oleum-gray">
                  <h3 className="text-xl font-bold text-oleum-navy">
                    {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                  </h3>
                </div>
                
                <form onSubmit={handleSavePost} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter post title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Author</label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter author name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">Excerpt</label>
                    <textarea
                      rows={3}
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="Enter post excerpt"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">Content</label>
                    <textarea
                      rows={10}
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="Enter post content"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        <option value="Technology">Technology</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Safety">Safety</option>
                        <option value="Industry">Industry</option>
                        <option value="Engineering">Engineering</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Image URL</label>
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="Enter image URL"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-oleum-navy mb-2">Read Time (minutes)</label>
                      <input
                        type="number"
                        name="readTime"
                        value={formData.readTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                        placeholder="5"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-oleum-navy mb-2">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags.join(', ')}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-oleum-gray rounded-lg focus:ring-2 focus:ring-oleum-navy focus:border-transparent"
                      placeholder="Enter tags separated by commas"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                        className="rounded border-oleum-gray text-oleum-navy focus:ring-oleum-navy"
                      />
                      <span className="ml-2 text-sm text-oleum-navy">Publish immediately</span>
                    </label>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4 border-t border-oleum-gray">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingPost(null);
                      }}
                      className="px-4 py-2 text-oleum-gray-dark hover:text-oleum-navy transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {editingPost ? 'Update Post' : 'Create Post'}
                    </button>
                  </div>
                </form>
          </div>
        </div>
          )}
        </main>
      </div>
    </>
  );
};

export default BlogManagement; 