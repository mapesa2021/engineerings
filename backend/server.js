const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Determine environment and set appropriate callback URLs
const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction ? 'https://oleumengineering.netlify.app' : 'http://localhost:5179';
const WEBHOOK_URL = `${BASE_URL}/api/zeno-webhook`;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for payment statuses (in production, use a database)
const paymentStatuses = new Map();

// Zeno API configuration
const ZENO_API_KEY = process.env.ZENO_API_KEY || 'ArtYqYpjmi8UjbWqxhCe7SLqpSCbws-_7vjudTuGR91PT6pmWX85lapiuq7xpXsJ2BkPZ9gkxDEDotPgtjdV6g';
const ZENO_API_URL = 'https://zenoapi.com/api/payments/mobile_money_tanzania';

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Payment processing server is running' });
});

// Payment processing endpoint
app.post('/api/process-payment', async (req, res) => {
  try {
    const { buyer_email, buyer_name, buyer_phone, amount } = req.body;
    
    // Validate required fields
    if (!buyer_email || !buyer_name || !buyer_phone || !amount) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        required: ['buyer_email', 'buyer_name', 'buyer_phone', 'amount'] 
      });
    }
    
    // Validate amount
    if (amount < 1000) {
      return res.status(400).json({ 
        error: 'Minimum amount is 1000 Tsh' 
      });
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
    
    // Prepare data for Zeno API with proper callback URLs
    const paymentData = {
      order_id,
      buyer_email,
      buyer_name,
      buyer_phone,
      amount,
      callback_url: WEBHOOK_URL,
      success_url: `${BASE_URL}/payment-success`,
      cancel_url: `${BASE_URL}/payment-cancelled`
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
    res.json({
      success: true,
      message: 'Payment request sent successfully',
      orderId: order_id,
      paymentDetails: response.data
    });
    
  } catch (error) {
    console.error('Payment processing error:', error.response?.data || error.message);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      res.status(error.response.status).json({
        success: false,
        error: 'Payment processing failed',
        details: error.response.data
      });
    } else if (error.request) {
      // Request was made but no response received
      res.status(500).json({
        success: false,
        error: 'No response from payment processor',
        details: 'Please try again later'
      });
    } else {
      // Something else happened
      res.status(500).json({
        success: false,
        error: 'Payment processing error',
        details: error.message
      });
    }
  }
});

// Payment status endpoint
app.get('/api/payment-status/:orderId', (req, res) => {
  const { orderId } = req.params;
  
  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }
  
  const paymentStatus = paymentStatuses.get(orderId);
  
  if (!paymentStatus) {
    return res.status(404).json({ error: 'Payment not found' });
  }
  
  res.json({
    success: true,
    orderId,
    status: paymentStatus.status,
    timestamp: paymentStatus.timestamp
  });
});

// Zeno API webhook endpoint (to receive payment status updates)
app.post('/api/zeno-webhook', (req, res) => {
  try {
    const { order_id, status, transaction_id } = req.body;
    
    console.log('Webhook received:', { order_id, status, transaction_id });
    
    // Validate order_id exists
    if (!order_id) {
      return res.status(400).json({ error: 'Order ID is required' });
    }
    
    // Get existing payment status
    const paymentStatus = paymentStatuses.get(order_id);
    
    if (!paymentStatus) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    
    // Update payment status based on webhook
    paymentStatuses.set(order_id, {
      ...paymentStatus,
      status: status === 'success' ? 'completed' : status,
      transaction_id,
      updated: new Date()
    });
    
    console.log(`Payment ${order_id} updated to status: ${status}`);
    
    res.json({ success: true, message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Success and cancel endpoints
app.get('/payment-success', (req, res) => {
  // For a SPA, we'll send a simple success response
  // The frontend will handle the UI update
  res.json({ success: true, message: 'Payment successful' });
});

app.get('/payment-cancelled', (req, res) => {
  // For a SPA, we'll send a simple cancellation response
  // The frontend will handle the UI update
  res.json({ success: false, message: 'Payment cancelled' });
});

// Simulate payment completion (for testing - in real implementation, this would be a webhook)
app.post('/api/simulate-payment-completion/:orderId', (req, res) => {
  const { orderId } = req.params;
  
  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }
  
  const paymentStatus = paymentStatuses.get(orderId);
  
  if (!paymentStatus) {
    return res.status(404).json({ error: 'Payment not found' });
  }
  
  // Update status to completed
  paymentStatuses.set(orderId, {
    ...paymentStatus,
    status: 'completed'
  });
  
  res.json({
    success: true,
    message: 'Payment status updated to completed',
    orderId
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Payment processing server running on port ${PORT}`);
  console.log(`Webhook URL: ${WEBHOOK_URL}`);
  console.log(`Base URL: ${BASE_URL}`);
});

module.exports = app;