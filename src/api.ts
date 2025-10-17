// api.ts - Utility functions for API calls

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Payment API functions
export const paymentApi = {
  // Process payment
  processPayment: async (paymentData: {
    buyer_email: string;
    buyer_name: string;
    buyer_phone: string;
    amount: number;
  }) => {
    const response = await fetch(`${API_BASE_URL}/api/process-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    
    return response.json();
  },
  
  // Check payment status
  checkPaymentStatus: async (orderId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/payment-status/${orderId}`);
    return response.json();
  }
};