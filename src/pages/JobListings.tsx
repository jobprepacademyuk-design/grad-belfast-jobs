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

/** Minimal CSV parser that respects quotes and commas in fields */
function parseCSV(text: string): Job[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"'; // escaped quote
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(cell);
        cell = "";
      } else if (ch === "\n") {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else if (ch === "\r") {
        // ignore \r (CRLF)
      } else {
        cell += ch;
      }
    }
  }
  // push last cell/row if file doesn't end with newline
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  if (!rows.length) return [];
  const header = rows[0].map((h) => h.trim());
  const dataRows = rows.slice(1).filter((r) => r.some((c) => c && c.trim().length));

  return dataRows.map((r) => {
    const obj: any = {};
    header.forEach((h, i) => (obj[h] = (r[i] ?? "").trim()));
    return obj as Job;
  });
}

const JobListings = () => {
  const { category } = useParams<{ category: string }>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const csvUrl = import.meta.env.VITE_AIRTABLE_ALL_CSV || "/jobs.csv";
        const res = await fetch(csvUrl, { cache: "no-cache" });
        if (!res.ok) throw new Error(`Failed to load jobs (${res.status})`);

        const text = await res.text();
        const parsed = parseCSV(text);

        const filtered = category
          ? parsed.filter(
              (j) =>
                (j.Category || "").toLowerCase().trim() ===
                category.toLowerCase().trim()
            )
          : parsed;

        setJobs(filtered);
      } catch (e: any) {
        setError(e.message || "Error loading jobs");
      } finally {
        setLoading(false);
      }
    })();
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
                        <TableHead className="font-semibold text-center">Link</TableHead>
                        <TableHead className="font-semibold">Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs.map((job, index) => (
                        <TableRow key={index} className="hover:bg-secondary/30">
                          <TableCell className="font-medium">{job.Company}</TableCell>
                          <TableCell>{job["Job Title"]}</TableCell>
                          <TableCell>{job.Category}</TableCell>
                          <TableCell className="whitespace-nowrap">{job.Salary}</TableCell>
                          <TableCell className="text-center">
                            <a
                              href={job["Job Link"]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors break-all"
                            >
                              Apply
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </TableCell>
                          <TableCell className="max-w-xs truncate" title={job.Notes}>
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
