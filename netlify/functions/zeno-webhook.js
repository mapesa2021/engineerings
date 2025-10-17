// Netlify Function for handling Zeno API webhooks
// In-memory storage for payment statuses (in production, use a database)
const paymentStatuses = new Map();

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { order_id, status, transaction_id } = JSON.parse(event.body);
    
    console.log('Webhook received:', { order_id, status, transaction_id });
    
    // Validate order_id exists
    if (!order_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Order ID is required' })
      };
    }
    
    // Get existing payment status
    const paymentStatus = paymentStatuses.get(order_id);
    
    if (!paymentStatus) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Payment not found' })
      };
    }
    
    // Update payment status based on webhook
    paymentStatuses.set(order_id, {
      ...paymentStatus,
      status: status === 'success' ? 'completed' : status,
      transaction_id,
      updated: new Date()
    });
    
    console.log(`Payment ${order_id} updated to status: ${status}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Webhook processed successfully' })
    };
  } catch (error) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook processing failed' })
    };
  }
};