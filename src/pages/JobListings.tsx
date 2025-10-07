import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

type Job = {
  Company: string;
  "Job Title": string;
  Category: string;
  Salary: string;
  "Job Link": string;
  Notes: string;
};

const JobListings = () => {
  const { category } = useParams<{ category: string }>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        // --- OPTION 1: One Airtable CSV for all jobs ---
        const masterCsv = import.meta.env.VITE_AIRTABLE_ALL_CSV;

        // --- OPTION 2: Separate CSVs per category (preferred if you made filtered views) ---
        const urls: Record<string, string> = {
          finance: import.meta.env.VITE_AIRTABLE_FINANCE_CSV,
          law: import.meta.env.VITE_AIRTABLE_LAW_CSV,
          engineering: import.meta.env.VITE_AIRTABLE_ENGINEERING_CSV,
          tech: import.meta.env.VITE_AIRTABLE_TECH_CSV,
        };

        const fetchUrl =
          (category && urls[category.toLowerCase()]) ||
          masterCsv ||
          "/jobs.csv"; // fallback to local CSV

        const res = await fetch(fetchUrl, { cache: "no-cache" });
        if (!res.ok) throw new Error(`Failed to load jobs (${res.status})`);

        const text = await res.text();
        const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
        const headers = lines[0].split(",").map((h) => h.trim());
        const rows: Job[] = lines.slice(1).map((line) => {
          const cols = line.split(",").map((c) => c.trim());
          const obj: any = {};
          headers.forEach((h, i) => (obj[h] = cols[i] ?? ""));
          return obj as Job;
        });

        // Filter if using single master CSV
        const filtered = category
          ? rows.filter(
              (j) =>
                (j.Category || "").toLowerCase().trim() ===
                category.toLowerCase().trim()
            )
          : rows;

        setJobs(filtered);
      } catch (err: any) {
        setError(err.message || "Error loading jobs");
      } finally {
        setLoading(false);
      }
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
            ) : error ? (
              <Card className="p-12 text-center">
                <p className="text-red-500">{error}</p>
              </Card>
            ) : jobs.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">
                  No jobs found in this category.
                </p>
              </Card>
            ) : (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead className="font-semibold">Company</TableHead>
                        <TableHead className="font-semibold">Job Title</TableHead>
                        <TableHead className="font-semibold">Category</TableHead>
                        <TableHead className="font-semibold">Salary</TableHead>
                        <TableHead className="font-semibold text-center">
                          Link
                        </TableHead>
                        <TableHead className="font-semibold">Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs.map((job, index) => (
                        <TableRow key={index} className="hover:bg-secondary/30">
                          <TableCell className="font-medium">{job.Company}</TableCell>
                          <TableCell>{job["Job Title"]}</TableCell>
                          <TableCell>{job.Category}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            {job.Salary}
                          </TableCell>
                          <TableCell className="text-center">
                            <a
                              href={job["Job Link"]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors"
                            >
                              Apply
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </TableCell>
                          <TableCell
                            className="max-w-xs truncate"
                            title={job.Notes}
                          >
                            {job.Notes}
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
