import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Filter, Headphones, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl">
                Empowering Belfast Graduates to Kickstart Their Careers
              </h1>
              <p className="text-lg text-primary-foreground/90 md:text-xl">
                GradBelfast was created to help local graduates discover real job opportunities in Finance, Law, Engineering, and Tech — all in one place.
                We curate listings daily, share practical career tips, and help you present yourself confidently to top employers.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 border-b">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-primary">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is simple — make it easier for graduates in Northern Ireland to bridge the gap between university and professional life.
                From free job alerts to personalised CV reviews and premium daily updates, we're here to help you find the role that fits your future.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes Us Different Section */}
        <section className="py-16 bg-accent/5">
          <div className="container px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold text-primary mb-12">
              What Makes Us Different
            </h2>
            <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-primary">
                  Local Focus
                </h3>
                <p className="text-muted-foreground">
                  Every role we feature is based in Belfast or nearby, connecting you to opportunities in your community.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                  <Filter className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-primary">
                  Curated Listings
                </h3>
                <p className="text-muted-foreground">
                  We filter through hundreds of listings to highlight genuine graduate-level jobs that match your qualifications.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                  <Headphones className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-primary">
                  Practical Support
                </h3>
                <p className="text-muted-foreground">
                  From interview prep to CV reviews, we're focused on helping you get hired faster with expert guidance.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How GradBelfast Works Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold text-primary mb-12">
              How GradBelfast Works
            </h2>
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Subscribe for free</h3>
                  <p className="text-muted-foreground">
                    Get weekly job updates straight to your inbox with new graduate opportunities as they become available.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Explore sectors</h3>
                  <p className="text-muted-foreground">
                    Browse Finance, Law, Engineering, and Tech opportunities tailored to your skills and interests.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Upgrade to Premium</h3>
                  <p className="text-muted-foreground">
                    Receive daily curated job alerts at 7:30am and apply first to increase your chances of success.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Polish your CV</h3>
                  <p className="text-muted-foreground">
                    Book our 48-hour CV Review service for personalised feedback from industry professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / CTA Section */}
        <section className="py-16 bg-accent/5">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-2xl p-8 md:p-12 shadow-lg border-2 border-accent/20">
              <div className="text-center">
                <div className="mb-6 inline-flex items-center justify-center rounded-lg bg-accent/10 p-4">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-primary">
                  Get in Touch
                </h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  Have questions or want to collaborate?
                </p>
                <a 
                  href="mailto:careers@grad-belfast.co.uk"
                  className="text-xl font-semibold text-accent hover:text-accent/80 transition-colors"
                >
                  careers@grad-belfast.co.uk
                </a>
                <div className="mt-8 pt-8 border-t">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Or subscribe to our updates below
                  </p>
                  <div className="flex gap-2 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 h-12 px-4 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold px-8">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
