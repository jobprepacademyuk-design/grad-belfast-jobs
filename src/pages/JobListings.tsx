import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { parseCSV, filterJobsByCategory, Job } from "@/utils/csvParser";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const JobListings = () => {
  const { category } = useParams<{ category: string }>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const allJobs = await parseCSV();
      const filteredJobs = category 
        ? filterJobsByCategory(allJobs, category)
        : allJobs;
      setJobs(filteredJobs);
      setLoading(false);
    };

    loadJobs();
  }, [category]);

  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) 
    : "All";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <Link to="/jobs">
                <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sectors
                </Button>
              </Link>
              <h1 className="text-4xl font-bold text-primary mb-2">
                {categoryTitle} Graduate Jobs
              </h1>
              <p className="text-lg text-muted-foreground">
                {jobs.length} opportunities available in Belfast
              </p>
            </div>

            {loading ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">Loading jobs...</p>
              </Card>
            ) : jobs.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No jobs found in this category.</p>
              </Card>
            ) : (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead className="font-semibold">Company</TableHead>
                        <TableHead className="font-semibold">Job Title</TableHead>
                        <TableHead className="font-semibold">Salary</TableHead>
                        <TableHead className="font-semibold">Location</TableHead>
                        <TableHead className="font-semibold">Opening Date</TableHead>
                        <TableHead className="font-semibold">Closing Date</TableHead>
                        <TableHead className="font-semibold">Notes</TableHead>
                        <TableHead className="font-semibold text-center">Link</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs.map((job, index) => (
                        <TableRow key={index} className="hover:bg-secondary/30">
                          <TableCell className="font-medium">{job.company}</TableCell>
                          <TableCell>{job.jobTitle}</TableCell>
                          <TableCell className="whitespace-nowrap">{job.salary}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell className="whitespace-nowrap">{job.openingDate}</TableCell>
                          <TableCell className="whitespace-nowrap">{job.closingDate}</TableCell>
                          <TableCell className="max-w-xs truncate" title={job.notes}>
                            {job.notes}
                          </TableCell>
                          <TableCell className="text-center">
                            <a 
                              href={job.jobLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors"
                            >
                              Apply
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobListings;
