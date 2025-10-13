// Stripe webhook endpoint for premium daily payments
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const app = express();

// Stripe requires the raw body to validate the signature
app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // Set this in your env
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment for premium daily product
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email || session.customer_email;
    if (customerEmail) {
      // Add customerEmail to Brevo premium daily list
      try {
        const response = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'api-key': 'xkeysib0cb68d0dffb33e52dcf8d1c4cebbf7461c628a3c48eb00b1842343884c24aeb5-4rhHp9a4tHDDumLy',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: customerEmail,
            listIds: [3],
            updateEnabled: true // update if contact exists
          })
        });
        const brevoResult = await response.json();
        console.log('Added to Brevo premium daily list:', customerEmail, brevoResult);
      } catch (err) {
        console.error('Failed to add to Brevo:', err);
      }
    } else {
      console.log('No customer email found in Stripe session.');
    }
  }

  res.status(200).json({ received: true });
});

module.exports = app;
