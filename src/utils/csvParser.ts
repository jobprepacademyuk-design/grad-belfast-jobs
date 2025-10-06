export interface Job {
  company: string;
  jobTitle: string;
  salary: string;
  location: string;
  jobLink: string;
  openingDate: string;
  closingDate: string;
  notes: string;
  category: string;
}

export const parseCSV = async (): Promise<Job[]> => {
  try {
    const response = await fetch('/jobs.csv');
    const text = await response.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    
    const jobs: Job[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = line.split(',');
      
      if (values.length >= 9) {
        jobs.push({
          company: values[0],
          jobTitle: values[1],
          salary: values[2],
          location: values[3],
          jobLink: values[4],
          openingDate: values[5],
          closingDate: values[6],
          notes: values[7],
          category: values[8],
        });
      }
    }
    
    return jobs;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
};

export const filterJobsByCategory = (jobs: Job[], category: string): Job[] => {
  return jobs.filter(job => job.category.toLowerCase() === category.toLowerCase());
};
