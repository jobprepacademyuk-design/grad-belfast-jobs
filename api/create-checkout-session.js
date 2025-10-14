
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    // Support multiple products via request body
    const { product } = req.body;
    let sessionConfig;
    if (product === "premium_daily") {
      sessionConfig = {
        mode: "subscription",
        line_items: [
          {
            price: "price_1SFGNDIHvUs4FDge0U2nofNL",
            quantity: 1,
          },
        ],
        customer_creation: "always",
        billing_address_collection: "required",
        success_url: `https://grad-belfast-jobs.lovable.app/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://grad-belfast-jobs.lovable.app/pricing`,
        metadata: { product: "premium_daily" },
      };
    } else {
      sessionConfig = {
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product_data: {
                name: "CV Review Service",
                description: "Professional CV review by Belfast industry experts",
              },
              unit_amount: 3000, // £30 in pence
            },
            quantity: 1,
          },
        ],
        customer_creation: "always",
        billing_address_collection: "required",
        success_url: `https://grad-belfast-jobs.lovable.app/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://grad-belfast-jobs.lovable.app/cv-review`,
        metadata: { product: "cv_review" },
      };
    }
    const session = await stripe.checkout.sessions.create(sessionConfig);
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Unable to create session" });
  }
}
