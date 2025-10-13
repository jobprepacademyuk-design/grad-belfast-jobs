import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

export default function CVReviewCheckoutButton({ label = "Purchase CV Review" }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
  const res = await fetch("/api/create-checkout-session", { method: "POST" });
  const data = await res.json();
  if (!data?.url) throw new Error("No session url from server");
  window.location.href = data.url;
    } catch (e: any) {
      console.error(e);
      alert("Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-600 text-white font-semibold px-5 py-3 rounded-md hover:bg-blue-700 disabled:opacity-60"
    >
      {loading ? "Redirecting..." : label}
    </button>
  );
}
