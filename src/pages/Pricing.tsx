import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, Mail, Clock, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Pricing = () => {
  const handleSubscribe = () => {
    // Placeholder for Stripe Checkout integration
    console.log("Redirecting to Stripe Checkout...");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                <Sparkles className="h-4 w-4" />
                Premium Feature
              </div>
              <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
                Premium Job Alerts
              </h1>
              <p className="text-lg text-muted-foreground">
                Be the first to know about new graduate opportunities in Belfast
              </p>
            </div>

            <div className="mx-auto max-w-2xl">
              <Card className="overflow-hidden border-2 border-accent/20">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-8 text-center">
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    Premium Alerts Plan
                  </h2>
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-5xl font-bold text-primary">£10.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground">
                    Cancel anytime • No long-term commitment
                  </p>
                </div>

                <div className="p-8">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-accent/10 p-1 mt-0.5">
                        <Check className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">Daily Email Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Receive new jobs every morning at 7:30am
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-accent/10 p-1 mt-0.5">
                        <Check className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">Sector Filtering</p>
                        <p className="text-sm text-muted-foreground">
                          Get alerts for your preferred sectors only
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-accent/10 p-1 mt-0.5">
                        <Check className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">Early Access</p>
                        <p className="text-sm text-muted-foreground">
                          Be among the first to apply to new openings
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-accent/10 p-1 mt-0.5">
                        <Check className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">Weekly Summary</p>
                        <p className="text-sm text-muted-foreground">
                          Optional weekly digest of all opportunities
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent font-semibold"
                    onClick={handleSubscribe}
                  >
                    Subscribe for £10.99/month
                  </Button>

                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Secure payment processing via Stripe
                  </p>
                </div>
              </Card>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                <Card className="p-6 text-center">
                  <div className="inline-flex items-center justify-center rounded-lg bg-accent/10 p-3 mb-4">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Direct to Inbox</h3>
                  <p className="text-sm text-muted-foreground">
                    Jobs delivered straight to your email
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="inline-flex items-center justify-center rounded-lg bg-accent/10 p-3 mb-4">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Time Saving</h3>
                  <p className="text-sm text-muted-foreground">
                    No need to check the site daily
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="inline-flex items-center justify-center rounded-lg bg-accent/10 p-3 mb-4">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Better Odds</h3>
                  <p className="text-sm text-muted-foreground">
                    Early applicants have higher success rates
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
