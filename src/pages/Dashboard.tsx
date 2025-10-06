import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Mail, Sparkles, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl">
                Your Gateway to Belfast Graduate Careers
              </h1>
              <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
                Discover the best graduate opportunities across Finance, Law, Engineering, and Tech sectors in Belfast.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link to="/jobs">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold">
                    Browse Jobs
                    <Briefcase className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Premium Alerts
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Alerts Section */}
        <section className="py-16 bg-accent/5">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-4xl p-8 md:p-12 shadow-lg border-2 border-accent/20">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                  <Sparkles className="h-4 w-4" />
                  Premium Feature
                </div>
                <h2 className="mb-4 text-3xl font-bold text-primary">
                  Never Miss a Graduate Opportunity
                </h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  Get the newest Belfast graduate roles delivered directly to your inbox every morning at 7:30am.
                </p>
                <div className="mb-6">
                  <p className="text-2xl font-bold text-primary mb-2">£10.99/month</p>
                  <p className="text-sm text-muted-foreground">Daily or weekly email alerts • Be the first to apply</p>
                </div>
                <Link to="/pricing">
                  <Button size="lg" className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent font-semibold">
                    Subscribe Now
                  </Button>
                </Link>
                <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  Early applicants have a higher success rate
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-primary">
                Why Choose GradBelfast?
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                    <Briefcase className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-primary">
                    Curated Opportunities
                  </h3>
                  <p className="text-muted-foreground">
                    Hand-picked graduate roles from Belfast's top employers across key sectors.
                  </p>
                </Card>
                
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-primary">
                    Daily Updates
                  </h3>
                  <p className="text-muted-foreground">
                    Stay ahead with premium email alerts delivered every morning at 7:30am.
                  </p>
                </Card>
                
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-primary">
                    Career Support
                  </h3>
                  <p className="text-muted-foreground">
                    Access expert guidance on CVs, interviews, and assessment tests.
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

export default Dashboard;
