import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Mail, Sparkles, TrendingUp, Scale, Wrench, Code } from "lucide-react";
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
              <div className="mx-auto max-w-md">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 h-12 px-4 rounded-md border border-primary-foreground/30 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold px-8">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Categories Section */}
        <section className="py-16 border-b">
          <div className="container px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold text-primary mb-8">
              Browse by Sector
            </h2>
            <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/jobs/finance">
                <Button variant="outline" size="lg" className="w-full h-24 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                  <Briefcase className="mr-2 h-6 w-6" />
                  Finance
                </Button>
              </Link>
              <Link to="/jobs/law">
                <Button variant="outline" size="lg" className="w-full h-24 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                  <Scale className="mr-2 h-6 w-6" />
                  Law
                </Button>
              </Link>
              <Link to="/jobs/engineering">
                <Button variant="outline" size="lg" className="w-full h-24 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                  <Wrench className="mr-2 h-6 w-6" />
                  Engineering
                </Button>
              </Link>
              <Link to="/jobs/tech">
                <Button variant="outline" size="lg" className="w-full h-24 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                  <Code className="mr-2 h-6 w-6" />
                  Tech
                </Button>
              </Link>
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
                  <p className="text-sm text-muted-foreground">Daily Email alerts • Be the first to apply</p>
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
