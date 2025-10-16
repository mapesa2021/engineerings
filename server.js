const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Payment processing endpoint
app.post('/api/process-payment', (req, res) => {
  try {
    const { buyer_phone } = req.body;
    
    // Basic validation
    if (!buyer_phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number is required' 
      });
    }
    
    // Simple phone number validation for Tanzania format (starts with 07 and has 10 digits)
    const phoneRegex = /^07\d{8}$/;
    if (!phoneRegex.test(buyer_phone)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid phone number format. Please use format: 07XXXXXXXX' 
      });
    }
    
    // Integration with Zeno API for mobile money payments
    const zenAPIKey = 'ArtYqYpjmi8UjbWqxhCe7SLqpSCbws-_7vjudTuGR91PT6pmWX85lapiuq7xpXsJ2BkPZ9gkxDEDotPgtjdV6g';
    const zenoApiUrl = 'https://zenoapi.com/api/payments/mobile_money_tanzania';
    
    // Hardcoded buyer information
    const buyerData = {
      order_id: `order-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      buyer_email: 'iam@gmail.com',
      buyer_name: 'John Joh',
      buyer_phone: buyer_phone,
      amount: 29000 // 29,000 TSh
    };
    
    const postData = JSON.stringify(buyerData);
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': zenAPIKey,
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    console.log(`Processing payment for phone number: ${buyer_phone}`);
    
    const zenReq = https.request(zenoApiUrl, options, (zenRes) => {
      let data = '';
      
      zenRes.on('data', (chunk) => {
        data += chunk;
      });
      
      zenRes.on('end', () => {
        try {
          const result = JSON.parse(data);
          
          if (zenRes.statusCode === 200 || zenRes.statusCode === 201) {
            res.json({ 
              success: true, 
              message: 'Payment request sent successfully! Check your phone to complete the transaction.',
              phone: buyer_phone,
              orderId: buyerData.order_id
            });
          } else {
            console.error('Zeno API error:', result);
            res.status(zenRes.statusCode).json({ 
              success: false, 
              message: result.message || 'Failed to process payment. Please try again.'
            });
          }
        } catch (parseError) {
          console.error('Error parsing Zeno API response:', parseError);
          res.status(500).json({ 
            success: false, 
            message: 'An error occurred while processing your payment. Please try again.' 
          });
        }
      });
    });
    
    zenReq.on('error', (error) => {
      console.error('Zeno API request error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while connecting to the payment processor. Please try again.' 
      });
    });
    
    zenReq.write(postData);
    zenReq.end();
    
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your payment. Please try again.' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Handle 404 for other routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Frontend is served at http://localhost:${PORT}/`);
});