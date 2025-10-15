import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Oleum Company Limited</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>

      <div className="min-h-screen bg-oleum-gray flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-oleum-navy rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-oleum-yellow">404</span>
            </div>
            <h1 className="text-4xl font-bold text-oleum-navy mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-oleum-gray-dark mb-6">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-oleum-navy hover:bg-oleum-navy-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Go Home
            </Link>
            <Link
              href="/contact"
              className="block w-full bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-8 text-sm text-oleum-gray-dark">
            <p>Or try one of these pages:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Link href="/about" className="text-oleum-navy hover:text-oleum-navy-dark underline">
                About Us
              </Link>
              <Link href="/services" className="text-oleum-navy hover:text-oleum-navy-dark underline">
                Services
              </Link>
              <Link href="/projects" className="text-oleum-navy hover:text-oleum-navy-dark underline">
                Projects
              </Link>
              <Link href="/blog" className="text-oleum-navy hover:text-oleum-navy-dark underline">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
