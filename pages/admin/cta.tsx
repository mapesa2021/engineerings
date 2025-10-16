import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  getSiteSettings, 
  updateSiteSettings,
  type SiteSettings 
} from '../../lib/adminData';

const CTAManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [formData, setFormData] = useState({
    primary: '',
    secondary: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('oleumAdminToken');
    console.log('CTA Management - Token:', token);
    
    if (token === 'oleum-admin-2025') {
      setIsAuthenticated(true);
      
      const loadSettings = () => {
        try {
          const siteSettings = getSiteSettings();
          console.log('CTA Management - Loaded settings:', siteSettings);
          setSettings(siteSettings);
          setFormData({
            primary: siteSettings.ctaButtons.primary || '',
            secondary: siteSettings.ctaButtons.secondary || ''
          });
        } catch (error) {
          console.error('CTA Management - Error loading settings:', error);
        }
      };
      
      loadSettings();
      
      // Refresh settings every 5 seconds to catch updates
      const interval = setInterval(loadSettings, 5000);
      
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      if (settings) {
        const updatedSettings = updateSiteSettings({
          ...settings,
          ctaButtons: {
            ...settings.ctaButtons,
            ...formData
          }
        });
        setSettings(updatedSettings);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error saving CTA settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (settings) {
      setFormData({
        primary: settings.ctaButtons.primary || '',
        secondary: settings.ctaButtons.secondary || ''
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-oleum-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oleum-navy mx-auto mb-4"></div>
          <p className="text-oleum-navy/80">Loading CTA Management...</p>
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
        <title>CTA Management - Oleum Admin</title>
        <meta name="description" content="Manage call-to-action buttons and settings" />
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
                  <h1 className="text-xl font-black text-white">CTA Management</h1>
                  <p className="text-oleum-yellow/80 text-sm">Manage call-to-action buttons and settings</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-oleum-navy/10 rounded-full">
                  <svg className="w-6 h-6 text-oleum-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Primary CTA</p>
                  <p className="text-lg font-semibold text-oleum-navy">
                    {formData.primary || 'Not Set'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
              <div className="flex items-center">
                <div className="p-3 bg-oleum-yellow/10 rounded-full">
                  <svg className="w-6 h-6 text-oleum-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-oleum-gray-dark">Secondary CTA</p>
                  <p className="text-lg font-semibold text-oleum-navy">
                    {formData.secondary || 'Not Set'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Form */}
          <div className="bg-white rounded-xl shadow-lg border border-oleum-gray p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-oleum-navy mb-2">Call-to-Action Buttons</h3>
              <p className="text-oleum-gray-dark">Manage the primary and secondary call-to-action buttons used throughout your website</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Primary CTA */}
              <div className="p-6 bg-gradient-to-r from-oleum-navy to-oleum-navy-dark rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-white mb-2">Primary CTA Text</label>
                    <input
                      type="text"
                      name="primary"
                      value={formData.primary}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-white/70"
                      placeholder="e.g., Get Quote, Contact Us, Learn More"
                    />
                    <p className="text-white/80 text-xs mt-1">This is your main call-to-action button text</p>
                  </div>
                </div>
              </div>

              {/* Secondary CTA */}
              <div className="p-6 bg-gradient-to-r from-oleum-yellow to-oleum-yellow-dark rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-white mb-2">Secondary CTA Text</label>
                    <input
                      type="text"
                      name="secondary"
                      value={formData.secondary}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-white/30 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-white/70"
                      placeholder="e.g., Learn More, View Projects, Download Brochure"
                    />
                    <p className="text-white/80 text-xs mt-1">This is your secondary call-to-action button text</p>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-semibold text-oleum-navy mb-4">Button Preview</h4>
                <div className="flex flex-wrap gap-4">
                  {formData.primary && (
                    <button className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      {formData.primary}
                    </button>
                  )}
                  {formData.secondary && (
                    <button className="bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black px-6 py-3 rounded-lg font-semibold transition-colors">
                      {formData.secondary}
                    </button>
                  )}
                  {!formData.primary && !formData.secondary && (
                    <p className="text-oleum-gray-dark">No CTA buttons configured yet</p>
                  )}
                </div>
              </div>

              {/* Common CTA Suggestions */}
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Popular CTA Suggestions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    'Get Quote', 'Contact Us', 'Learn More', 'View Projects',
                    'Download Brochure', 'Request Demo', 'Book Consultation', 'Start Project',
                    'Get Started', 'Explore Services', 'Read More', 'Sign Up'
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        if (!formData.primary) {
                          setFormData(prev => ({ ...prev, primary: suggestion }));
                        } else if (!formData.secondary) {
                          setFormData(prev => ({ ...prev, secondary: suggestion }));
                        }
                      }}
                      className="px-3 py-2 bg-white border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-oleum-gray">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 text-oleum-gray-dark hover:text-oleum-navy transition-colors"
                >
                  Reset to Default
                </button>
                
                <div className="flex items-center space-x-3">
                  {saveStatus === 'success' && (
                    <div className="flex items-center text-green-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Settings saved successfully!
                    </div>
                  )}
                  {saveStatus === 'error' && (
                    <div className="flex items-center text-red-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Error saving settings. Please try again.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-oleum-navy hover:bg-oleum-navy-dark text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-green-800 mb-3">Best Practices</h4>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong>Primary CTA:</strong> Use action-oriented text that clearly states what users will get (e.g., "Get Quote", "Contact Us")
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong>Secondary CTA:</strong> Use supporting text that provides additional value (e.g., "Learn More", "View Projects")
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Keep button text short and clear (2-4 words maximum)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use consistent terminology across your website for better user experience
              </li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export default CTAManagement;
