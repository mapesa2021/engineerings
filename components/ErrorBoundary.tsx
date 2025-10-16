'use client';
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-oleum-gray flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-oleum-navy rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-oleum-yellow">!</span>
              </div>
              <h1 className="text-4xl font-bold text-oleum-navy mb-4">
                Something went wrong
              </h1>
              <p className="text-lg text-oleum-gray-dark mb-6">
                An error occurred while loading this page.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-block bg-oleum-navy hover:bg-oleum-navy-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Reload Page
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-oleum-navy font-semibold mb-2">
                  Error Details (Development)
                </summary>
                <pre className="bg-red-50 border border-red-200 rounded p-4 text-sm text-red-800 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
