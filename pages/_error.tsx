import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
  hasGetInitialPropsRun?: boolean;
  err?: Error;
}

function Error({ statusCode, hasGetInitialPropsRun, err }: ErrorProps) {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    return null;
  }

  return (
    <>
      <Head>
        <title>Error {statusCode} - Oleum Company Limited</title>
        <meta name="description" content="An error occurred" />
      </Head>

      <div className="min-h-screen bg-oleum-gray flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-oleum-navy rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-oleum-yellow">!</span>
            </div>
            <h1 className="text-4xl font-bold text-oleum-navy mb-4">
              {statusCode ? `${statusCode}` : 'Error'}
            </h1>
            <p className="text-lg text-oleum-gray-dark mb-6">
              {statusCode === 404
                ? 'The page you are looking for does not exist.'
                : 'Something went wrong. Please try again later.'}
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-oleum-navy hover:bg-oleum-navy-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Go Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="block w-full bg-oleum-yellow hover:bg-oleum-yellow-dark text-oleum-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && err && (
            <details className="mt-8 text-left">
              <summary className="cursor-pointer text-oleum-navy font-semibold mb-2">
                Error Details (Development)
              </summary>
              <pre className="bg-red-50 border border-red-200 rounded p-4 text-sm text-red-800 overflow-auto">
                {err.stack}
              </pre>
            </details>
          )}
        </div>
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, hasGetInitialPropsRun: true, err };
};

export default Error;
