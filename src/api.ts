// api.ts - Utility functions for API calls

// Payment API functions
export const paymentApi = {
  // Process payment
  processPayment: async (paymentData: {
    buyer_email: string;
    buyer_name: string;
    buyer_phone: string;
    amount: number;
  }) => {
    const response = await fetch('/.netlify/functions/process-payment', {
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
    const response = await fetch(`/.netlify/functions/payment-status/${orderId}`);
    return response.json();
  }
};