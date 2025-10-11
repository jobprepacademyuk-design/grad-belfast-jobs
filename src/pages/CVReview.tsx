import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Upload, Clock, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loadStripe } from "@stripe/stripe-js";   // ✅ NEW
import { useState } from "react";                 // ✅ NEW

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!); // ✅ NEW

const CVReview = () => {
  const [loading, setLoading] = useState(false); // ✅ NEW

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      // Call your serverless function to create the Checkout Session
      const res = await fetch("/api/create-checkout-session", { method: "POST" });
      const data = await res.json();

      if (!data?.id) throw new Error("No session id returned from server");

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) alert(error.message);
    } catch (e) {
      console.error(e);
      alert("Unable to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl">
                Professional CV Review Service
              </h1>
              <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
                Get expert feedback from Belfast industry professionals to make your CV stand out to employers.
              </p>
              <div className="mb-4">
                <p className="text-5xl font-bold text-yellow-400 mb-2">£30</p>
                <p className="text-lg text-primary-foreground/90">One-time payment • 48-hour turnaround</p>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-16 border-b">
          <div className="container px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold text-primary mb-12">
              What You'll Get
            </h2>
            <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-2">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-primary">
                  Personalized Feedback
                </h3>
                <p className="text-muted-foreground">
                  Get detailed, personalized feedback from experienced Belfast recruiters who know what local employers are looking for.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-primary">
                  Industry-Specific Advice
                </h3>
                <p className="text-muted-foreground">
                  Receive tailored recommendations specific to your target sector - Finance, Law, Engineering, or Tech.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                  <Upload className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-primary">
                  ATS Optimization
                </h3>
                <p className="text-muted-foreground">
                  Ensure your CV passes Applicant Tracking Systems used by most major employers with our optimization tips.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-primary">
                  Fast Turnaround
                </h3>
                <p className="text-muted-foreground">
                  Receive your detailed CV review report within 48 hours, complete with actionable improvements.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-accent/5">
          <div className="container px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold text-primary mb-12">
              How It Works
            </h2>
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Purchase & Upload</h3>
                  <p className="text-muted-foreground">
                    Complete your secure payment and upload your CV through our platform.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Expert Review</h3>
                  <p className="text-muted-foreground">
                    Our Belfast-based industry professionals carefully review your CV against current market standards.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Receive Detailed Report</h3>
                  <p className="text-muted-foreground">
                    Get your comprehensive review with specific recommendations and examples within 48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-2xl p-8 md:p-12 shadow-lg border-2 border-primary/20 text-center">
              <h2 className="mb-4 text-3xl font-bold text-primary">
                Ready to Improve Your CV?
              </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Invest in your career success today. Get expert feedback that could land you your dream graduate role.
              </p>
              <div className="mb-6">
                <p className="text-4xl font-bold text-primary mb-2">£30</p>
                <p className="text-sm text-muted-foreground">One-time payment • 48-hour turnaround</p>
              </div>
              <Button 
                size="lg" 
                onClick={handleStripeCheckout}
                disabled={loading}
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold px-12 disabled:opacity-60"
              >
                {loading ? "Redirecting..." : "Purchase CV Review"}
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                Secure payment powered by Stripe
              </p>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CVReview;
