import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden text-center">
        <div className="bg-gradient-to-r from-green-400 to-teal-500 p-6 text-white">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your e-book "Reclaim Your Focus" will be sent to your email shortly.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">What's next?</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Check your email for the e-book download link</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Start implementing the strategies immediately</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Join our community for ongoing support</span>
              </li>
            </ul>
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition font-medium shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;