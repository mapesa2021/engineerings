import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple authentication (in production, use proper auth)
    if (credentials.username === 'admin' && credentials.password === 'oleum2025') {
      localStorage.setItem('oleumAdminToken', 'oleum-admin-2025');
      router.push('/admin');
    } else {
      setError('Invalid credentials. Please try again.');
    }
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  return (
    <>
      <Head>
        <title>Oleum Admin Login</title>
        <meta name="description" content="Admin login for Oleum Company Limited" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-oleum-navy via-oleum-navy-dark to-oleum-navy flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-oleum-yellow rounded-xl flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-bold text-oleum-black">O</span>
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-black text-white">
              Oleum Admin Portal
            </h2>
            <p className="mt-2 text-center text-sm text-oleum-yellow/80">
              Complete Site Management Dashboard
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white/90 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-oleum-yellow/30 bg-white/10 text-white placeholder-white/50 rounded-lg focus:ring-2 focus:ring-oleum-yellow focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  placeholder="Enter your username"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-oleum-yellow/30 bg-white/10 text-white placeholder-white/50 rounded-lg focus:ring-2 focus:ring-oleum-yellow focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm backdrop-blur-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-oleum-yellow to-oleum-yellow-dark hover:from-oleum-yellow-dark hover:to-oleum-yellow text-oleum-black font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-oleum-yellow/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-oleum-black mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In to Admin Dashboard'
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-white/60">
                Demo Credentials: admin / oleum2025
              </p>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-white/5 rounded-lg border border-oleum-yellow/20">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-oleum-yellow mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs text-white/70">
                Secure admin access for authorized personnel only
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin; 