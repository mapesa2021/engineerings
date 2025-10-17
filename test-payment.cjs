const axios = require('axios');

// Test payment processing
async function testPayment() {
  try {
    const response = await axios.post('http://localhost:5002/api/process-payment', {
      buyer_email: 'test@example.com',
      buyer_name: 'Test User',
      buyer_phone: '0712345678',
      amount: 30000
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Payment response:', response.data);
  } catch (error) {
    console.error('Payment error:', error.response?.data || error.message);
  }
}

testPayment();