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

type RawRow = Record<string, string>;
type Job = {
  company: string;
  title: string;
  category: string;
  salary: string;
  link: string;
  notes: string;
};

const CSV_URL =
  "https://raw.githubusercontent.com/jobprepacademyuk-design/grad-belfast-jobs/main/public/jobs.csv";

/** Robust CSV parser that respects quotes/commas/CRLF, returns rows keyed by original headers */
function parseCSV(text: string): RawRow[] {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1); // strip BOM
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"'; i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(cell); cell = "";
      } else if (ch === "\n") {
        row.push(cell); rows.push(row); row = []; cell = "";
      } else if (ch !== "\r") {
        cell += ch;
      }
    }
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }

  if (!rows.length) return [];
  const header = rows[0].map((h) => h.trim());
  const dataRows = rows.slice(1).filter((r) => r.some((c) => (c ?? "").trim().length));

  return dataRows.map((r) => {
    const obj: RawRow = {};
    header.forEach((h, i) => (obj[h] = (r[i] ?? "").trim()));
    return obj;
  });
}

/** Normalize header names to a canonical key (lowercase, no spaces/punctuation) */
function normHeader(h: string) {
  return h.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Find the best matching header name among several options */
function findHeader(headers: string[], candidates: string[]): string | null {
  const normalized = headers.map((h) => ({ orig: h, norm: normHeader(h) }));
  const candidateNorms = candidates.map(normHeader);
  for (const c of candidateNorms) {
    const hit = normalized.find((h) => h.norm === c);
    if (hit) return hit.orig;
  }
  // fallback: partial contains (e.g., "categorytype" contains "category")
  for (const c of candidateNorms) {
    const hit = normalized.find((h) => h.norm.includes(c));
    if (hit) return hit.orig;
  }
  return null;
}

export default function JobListings() {
  const { category } = useParams<{ category: string }>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(CSV_URL, { cache: "no-cache" });
        if (!res.ok) throw new Error(`Failed to load jobs (${res.status})`);
        const text = await res.text();
        const raw = parseCSV(text);

        if (raw.length === 0) {
          setJobs([]); setLoading(false);
          console.warn("CSV parsed but contains no data rows.");
          return;
        }

        const headers = Object.keys(raw[0]);

        // Detect actual column names from whatever the CSV has
        const companyH = findHeader(headers, ["Company", "Employer", "Organisation"]) || "Company";
        const titleH   = findHeader(headers, ["Job Title", "Title", "Role"]) || "Job Title";
        const catH     = findHeader(headers, ["Category", "Sector", "Discipline"]) || "Category";
        const salaryH  = findHeader(headers, ["Salary", "Pay", "Compensation"]) || "Salary";
        const linkH    = findHeader(headers, ["Job Link", "Link", "URL"]) || "Job Link";
        const notesH   = findHeader(headers, ["Notes", "Remarks", "Description"]) || "Notes";

        // Map rows to our Job shape
        const mapped: Job[] = raw.map((r) => ({
          company: (r[companyH] || "").trim(),
          title: (r[titleH] || "").trim(),
          category: (r[catH] || "").trim(),
          salary: (r[salaryH] || "").trim(),
          link: (r[linkH] || "").trim(),
          notes: (r[notesH] || "").trim(),
        }));

        // DEBUG: show what categories we actually parsed
        const foundCats = Array.from(new Set(mapped.map(m => m.category.toLowerCase().trim()))).sort();
        console.log("Parsed headers:", headers);
        console.log("Detected columns:", { companyH, titleH, catH, salaryH, linkH, notesH });
        console.log("Categories found in CSV:", foundCats);
        console.log("Route category:", (category || "").toLowerCase().trim());

        const filtered = category
          ? mapped.filter(
              (j) =>
                j.category.toLowerCase().trim() === (category || "").toLowerCase().trim()
            )
          : mapped;

        setJobs(filtered);
      } catch (e: any) {
        console.error(e);
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
                        <TableHead className="font-semibold">Category</TableHead>
                        <TableHead className="font-semibold">Salary</TableHead>
                        <TableHead className="font-semibold text-center">Link</TableHead>
                        <TableHead className="font-semibold">Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs.map((job, index) => (
                        <TableRow key={index} className="hover:bg-secondary/30">
                          <TableCell className="font-medium">{job.company}</TableCell>
                          <TableCell>{job.title}</TableCell>
                          <TableCell>{job.category}</TableCell>
                          <TableCell className="whitespace-nowrap">{job.salary}</TableCell>
                          <TableCell className="text-center">
                            <a
                              href={job.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors break-all"
                            >
                              Apply
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </TableCell>
                          <TableCell className="max-w-xs truncate" title={job.notes}>
                            {job.notes}
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
}
