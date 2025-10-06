import { Card } from "@/components/ui/card";
import { FileText, MessageSquare, Target, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ApplicationHelp = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
                Application Help
              </h1>
              <p className="text-lg text-muted-foreground">
                Get expert guidance to help you stand out in your graduate applications.
              </p>
            </div>
            
            <div className="mx-auto max-w-4xl space-y-8">
              <Card className="p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary mb-3">
                      CV Writing Tips
                    </h2>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Keep it concise - aim for 2 pages maximum</li>
                      <li>• Use clear section headings: Education, Experience, Skills</li>
                      <li>• Quantify achievements where possible (e.g., "Increased sales by 25%")</li>
                      <li>• Tailor your CV to each role and sector</li>
                      <li>• Use action verbs: developed, managed, achieved, implemented</li>
                      <li>• Proofread carefully - no typos or grammatical errors</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary mb-3">
                      Interview Preparation
                    </h2>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Research the company thoroughly before your interview</li>
                      <li>• Prepare examples using the STAR method (Situation, Task, Action, Result)</li>
                      <li>• Practice common questions with friends or family</li>
                      <li>• Prepare thoughtful questions to ask the interviewer</li>
                      <li>• Dress professionally and arrive 10-15 minutes early</li>
                      <li>• Follow up with a thank you email within 24 hours</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary mb-3">
                      Assessment Test Resources
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Many graduate schemes include online assessments. Here are recommended platforms to practice:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-accent flex-shrink-0" />
                        <a 
                          href="https://www.assessmentday.co.uk" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          AssessmentDay - Free practice tests
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-accent flex-shrink-0" />
                        <a 
                          href="https://www.jobtestprep.co.uk" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          JobTestPrep - Comprehensive test preparation
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-accent flex-shrink-0" />
                        <a 
                          href="https://www.practiceaptitudetests.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          Practice Aptitude Tests - Numerical and verbal reasoning
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApplicationHelp;
