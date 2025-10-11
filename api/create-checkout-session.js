// Serverless function for Vercel/Netlify-style hosts
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product: "prod_TDIKoy10UlXRu6", // your product
            unit_amount: 3000,              // £30 in pence
          },
          quantity: 1,
        },
      ],
      customer_creation: "always",
      billing_address_collection: "required",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cv-review`,
      metadata: { product: "cv_review" },
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to create session" });
  }
};
