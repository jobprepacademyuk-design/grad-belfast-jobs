import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
          <Briefcase className="h-6 w-6 text-accent" />
          <span>GradBelfast</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/jobs" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/jobs") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Find Jobs
          </Link>
          <Link 
            to="/help" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/help") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Application Help
          </Link>
          <Link 
            to="/cv-review" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/cv-review") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            CV Review
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/signin">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
