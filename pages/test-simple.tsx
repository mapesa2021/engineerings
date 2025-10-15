import Head from 'next/head';

export default function TestSimple() {
  return (
    <>
      <Head>
        <title>Simple Test - Oleum Company Limited</title>
      </Head>
      
      <div className="min-h-screen bg-oleum-gray flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-oleum-navy mb-4">
            Simple Test Page
          </h1>
          <p className="text-oleum-navy/60 mb-8">
            If you can see this page, the basic Next.js setup is working.
          </p>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-oleum-navy mb-2">
                Basic Functionality Test
              </h2>
              <p className="text-oleum-gray-dark">
                This page has no client-side components or localStorage access.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-oleum-navy mb-2">
                Next Steps
              </h2>
              <ul className="text-left text-oleum-gray-dark space-y-1">
                <li>• If this page loads, the error is in other components</li>
                <li>• Check browser console for specific error messages</li>
                <li>• Try accessing the homepage to see the full error</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
