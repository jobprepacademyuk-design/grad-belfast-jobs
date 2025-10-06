import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Briefcase, Scale, Wrench, Code } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sectors = [
  {
    name: "Finance",
    icon: Briefcase,
    description: "Banking, Accounting, Financial Services",
    category: "finance",
    gradient: "from-emerald-500/10 to-green-500/10",
    iconColor: "text-emerald-600",
  },
  {
    name: "Law",
    icon: Scale,
    description: "Legal Firms, Corporate Law, Training Contracts",
    category: "law",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-600",
  },
  {
    name: "Engineering",
    icon: Wrench,
    description: "Aerospace, Mechanical, Electrical Engineering",
    category: "engineering",
    gradient: "from-orange-500/10 to-red-500/10",
    iconColor: "text-orange-600",
  },
  {
    name: "Tech",
    icon: Code,
    description: "Software Development, Cybersecurity, IT",
    category: "tech",
    gradient: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-600",
  },
];

const FindJobs = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
                Find Your Perfect Graduate Role
              </h1>
              <p className="text-lg text-muted-foreground">
                Browse opportunities by sector and discover your next career move in Belfast.
              </p>
            </div>
            
            <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
              {sectors.map((sector) => {
                const Icon = sector.icon;
                return (
                  <Link 
                    key={sector.category} 
                    to={`/jobs/${sector.category}`}
                    className="group"
                  >
                    <Card className={`p-8 h-full transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer bg-gradient-to-br ${sector.gradient}`}>
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className={`rounded-full bg-background p-4 shadow-md group-hover:scale-110 transition-transform`}>
                          <Icon className={`h-10 w-10 ${sector.iconColor}`} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-primary mb-2">
                            {sector.name}
                          </h2>
                          <p className="text-muted-foreground">
                            {sector.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindJobs;
