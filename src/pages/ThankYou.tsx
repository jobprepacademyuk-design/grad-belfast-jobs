import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ThankYou = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="max-w-2xl w-full p-12 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-accent/10 p-4 mb-6">
            <CheckCircle className="h-16 w-16 text-accent" />
          </div>
          
          <h1 className="text-4xl font-bold text-primary mb-4">
            Welcome to Premium!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for subscribing to GradBelfast Premium Alerts. You'll start receiving daily job notifications at 7:30am.
          </p>

          <div className="bg-secondary/50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Mail className="h-5 w-5 text-accent" />
              <h2 className="font-semibold text-primary">What's Next?</h2>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
              <li>✓ Check your email for a confirmation message</li>
              <li>✓ Add alerts@gradbelfast.com to your contacts</li>
              <li>✓ Your first alert will arrive tomorrow at 7:30am</li>
              <li>✓ Browse current opportunities on the dashboard</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThankYou;
