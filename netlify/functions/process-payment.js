// Netlify Function for processing payments
const axios = require('axios');

// In-memory storage for payment statuses (in production, use a database)
const paymentStatuses = new Map();

// Zeno API configuration
const ZENO_API_KEY = process.env.ZENO_API_KEY || 'ArtYqYpjmi8UjbWqxhCe7SLqpSCbws-_7vjudTuGR91PT6pmWX85lapiuq7xpXsJ2BkPZ9gkxDEDotPgtjdV6g';
const ZENO_API_URL = 'https://zenoapi.com/api/payments/mobile_money_tanzania';

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { buyer_email, buyer_name, buyer_phone, amount } = JSON.parse(event.body);
    
    // Validate required fields
    if (!buyer_email || !buyer_name || !buyer_phone || !amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Missing required fields', 
          required: ['buyer_email', 'buyer_name', 'buyer_phone', 'amount'] 
        })
      };
    }
    
    // Validate amount
    if (amount < 1000) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Minimum amount is 1000 Tsh' 
        })
      };
    }
    
    // Generate order ID
    const order_id = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Initialize payment status
    paymentStatuses.set(order_id, {
      status: 'pending',
      timestamp: new Date(),
      buyer_phone,
      amount
    });
    
    // Prepare data for Zeno API
    const paymentData = {
      order_id,
      buyer_email,
      buyer_name,
      buyer_phone,
      amount
    };
    
    // Call Zeno API
    const response = await axios.post(ZENO_API_URL, paymentData, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ZENO_API_KEY
      }
    });
    
    // Update payment status
    paymentStatuses.set(order_id, {
      ...paymentStatuses.get(order_id),
      status: 'processing',
      zenoResponse: response.data
    });
    
    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Payment request sent successfully',
        orderId: order_id,
        paymentDetails: response.data
      })
    };
    
  } catch (error) {
    console.error('Payment processing error:', error.response?.data || error.message);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      return {
        statusCode: error.response.status,
        body: JSON.stringify({
          success: false,
          error: 'Payment processing failed',
          details: error.response.data
        })
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: 'No response from payment processor',
          details: 'Please try again later'
        })
      };
    } else {
      // Something else happened
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: 'Payment processing error',
          details: error.message
        })
      };
    }
  }
};