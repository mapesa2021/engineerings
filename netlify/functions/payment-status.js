// Netlify Function for checking payment status
// In-memory storage for payment statuses (in production, use a database)
const paymentStatuses = new Map();

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Extract order ID from path parameter
    const orderId = event.path.split('/').pop();
    
    if (!orderId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Order ID is required' })
      };
    }
    
    const paymentStatus = paymentStatuses.get(orderId);
    
    if (!paymentStatus) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Payment not found' })
      };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        orderId,
        status: paymentStatus.status,
        timestamp: paymentStatus.timestamp
      })
    };
  } catch (error) {
    console.error('Error checking payment status:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};