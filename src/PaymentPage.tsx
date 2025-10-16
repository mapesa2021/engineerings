import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LocationState {
  from?: string;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [orderId, setOrderId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  // Get any state passed from the previous page
  const { from } = (location.state as LocationState) || { from: '/' };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError('');
    
    try {
      // Send payment data to our backend with hardcoded test values
      const response = await fetch('http://localhost:5000/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyer_email: 'test@example.com', // Hardcoded test email
          buyer_name: 'Test User', // Hardcoded test name
          buyer_phone: paymentDetails.phoneNumber,
          amount: 30000 // 30,000 Tsh
        })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        // Store order ID for status checking
        setOrderId(result.orderId);
        // Show processing message
        setPaymentError(`Processing... USSD has been sent to your phone ${paymentDetails.phoneNumber}. Please respond to the prompt to complete your payment of 30,000 Tsh.`);
        setPaymentStatus('processing');
      } else {
        setPaymentError(result.error || 'Payment failed. Please try again.');
        setIsProcessing(false);
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('An error occurred while processing your payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Poll for payment status
  useEffect(() => {
    let statusCheckInterval: ReturnType<typeof setInterval>;
    
    if (orderId && paymentStatus === 'processing') {
      statusCheckInterval = setInterval(async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/payment-status/${orderId}`);
          const result = await response.json();
          
          if (result.success && result.status === 'completed') {
            // Payment completed - show success message and redirect after delay
            setPaymentError('Payment successful! Redirecting you to download your e-book...');
            clearInterval(statusCheckInterval);
            
            // Redirect to success page or show success after delay
            setTimeout(() => {
              setIsProcessing(false);
              setOrderId('');
              setPaymentStatus('');
              setPaymentDetails({ phoneNumber: '' });
              
              // Redirect to success page
              navigate('/success');
            }, 3000);
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      }, 5000); // Check every 5 seconds
    }
    
    // Cleanup interval on component unmount or when dependencies change
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, [orderId, paymentStatus, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
          <p className="mt-2 opacity-90">Enter your details to get "Reclaim Your Focus" e-book</p>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600">Amount to pay</p>
            <p className="text-2xl font-bold text-gray-900">30,000 TSH</p>
          </div>
          
          {paymentError && !isProcessing && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
              {paymentError}
            </div>
          )}
          
          {isProcessing && paymentError && (
            <div className={`p-3 rounded-lg mb-4 ${paymentStatus === 'processing' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
              {paymentError}
            </div>
          )}
          
          <form onSubmit={handlePaymentSubmit}>
            <div className="mb-5">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={paymentDetails.phoneNumber}
                onChange={handlePaymentChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="e.g., 0754546567"
                disabled={isProcessing}
              />
              <p className="mt-2 text-sm text-gray-500">
                After submitting, you will receive a prompt on your phone to complete the mobile money payment.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => navigate(from || '/')}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                disabled={isProcessing && paymentStatus === 'processing'}
              >
                Back
              </button>
              
              {!isProcessing ? (
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition font-medium shadow-md"
                >
                  Pay Now
                </button>
              ) : (
                <button
                  type="button"
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                  disabled
                >
                  {paymentStatus === 'processing' ? 'Processing...' : 'Please wait...'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;