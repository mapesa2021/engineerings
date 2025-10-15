import axios from 'axios';

// ZenoPay Configuration
export const ZENOPAY_CONFIG = {
  // ZenoPay API Key from your working test
  API_KEY: process.env.NEXT_PUBLIC_ZENOPAY_API_KEY || 'ArtYqYpjmi8UjbWqxhCe7SLqpSCbws-_7vjudTuGR91PT6pmWX85lapiuq7xpXsJ2BkPZ9gkxDEDotPgtjdV6g',
  
  // Base URL from your working test
  BASE_URL: 'https://zenoapi.com',
  
  // Payment endpoints based on your working API
  ENDPOINTS: {
    MOBILE_MONEY_TANZANIA: '/api/payments/mobile_money_tanzania',
    // Add other payment methods as needed
  }
};

// Payment Request Interface - Updated to match actual ZenoPay API
export interface PaymentRequest {
  amount: number;
  buyerEmail: string;
  buyerName: string;
  buyerPhone: string;
  orderId: string;
}

// Payment Response Interface
export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  paymentUrl?: string;
  message: string;
  error?: string;
}

// ZenoPay Payment Service - Updated to match actual API
export class ZenoPayService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = ZENOPAY_CONFIG.API_KEY;
    this.baseUrl = ZENOPAY_CONFIG.BASE_URL;
  }

  // Initiate payment using Mobile Money Tanzania
  async initiatePayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const payload = {
        order_id: paymentData.orderId,
        buyer_email: paymentData.buyerEmail,
        buyer_name: paymentData.buyerName,
        buyer_phone: paymentData.buyerPhone,
        amount: paymentData.amount
      };

      console.log('Initiating payment with payload:', payload);

      const response = await axios.post(
        `${this.baseUrl}${ZENOPAY_CONFIG.ENDPOINTS.MOBILE_MONEY_TANZANIA}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
          },
        }
      );

      console.log('ZenoPay response:', response.data);

      if (response.data.success || response.data.status === 'success') {
        return {
          success: true,
          paymentId: response.data.order_id || response.data.payment_id,
          paymentUrl: response.data.payment_url || response.data.redirect_url,
          message: 'Payment initiated successfully',
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Payment initiation failed',
          error: response.data.error || 'Unknown error',
        };
      }
    } catch (error: any) {
      console.error('ZenoPay payment initiation error:', error);
      return {
        success: false,
        message: 'Payment initiation failed',
        error: error.message || 'Unknown error',
      };
    }
  }

  // For now, we'll use a simplified verification
  // In production, you'd implement proper webhook handling
  async verifyPayment(paymentId: string): Promise<PaymentResponse> {
    // This is a placeholder - in real implementation, you'd verify with ZenoPay
    return {
      success: true,
      message: 'Payment verification placeholder - implement webhook handling',
    };
  }
}

// Create singleton instance
// Payments disabled
export const zenoPayService = null as any;

// Utility function to format amount
export const formatAmount = (amount: number, currency: string = 'TZS'): string => {
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Generate unique reference
export const generateReference = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `CTP_${timestamp}_${random}`.toUpperCase();
}; 