"use client"

import Link from "next/link"
import { ArrowLeft, Printer } from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const sections = [
  {
    title: "Before you start",
    items: [
      "Confirm the official application portal and deadline (timezone matters).",
      "Save the program link and note whether documents must be uploaded separately or emailed.",
      "Create a folder for this application with subfolders: CV, SOP, transcripts, certificates, IDs.",
      "Check eligibility: nationality, age, degree level, field, language requirements.",
    ],
  },
  {
    title: "Bachelor's scholarships — typical documents",
    items: [
      "Completed application form (online or PDF).",
      "High school / A-Level transcripts and predicted or final grades.",
      "Passport or national ID copy.",
      "CV (1–2 pages) focused on academics, leadership, and extracurriculars.",
      "Statement of Purpose or motivation letter (often 500–800 words).",
      "Two recommendation letters (teachers or mentors who know you well).",
      "English proficiency test scores if required (IELTS, TOEFL, Duolingo, etc.).",
      "Financial documents if the scholarship asks for proof of need.",
    ],
    formatting: [
      "Use the font and margin guidelines in the application portal if provided.",
      "Name files clearly: LastName_SOP_ProgramName.pdf",
      "Export to PDF unless Word is explicitly requested.",
    ],
  },
  {
    title: "Master's scholarships — typical documents",
    items: [
      "Bachelor's degree certificate and transcript (or provisional).",
      "CV (2 pages max for most programs).",
      "Statement of Purpose tailored to the program (not a generic essay).",
      "Research interests paragraph if applying to research-heavy programs.",
      "Two academic or professional reference letters.",
      "Writing sample or portfolio if required.",
      "English proficiency and standardized tests (GRE/GMAT) if listed.",
    ],
    formatting: [
      "SOP: clear opening hook, why this program, why you, career goals, fit with faculty.",
      "Avoid repeating your CV line-by-line in the SOP.",
      "Keep paragraph length readable; use subheadings only if the portal allows.",
    ],
  },
  {
    title: "PhD applications — typical documents",
    items: [
      "Research proposal (length and structure per department guidelines).",
      "CV with publications, research experience, conferences, and technical skills.",
      "Statement of Purpose linking your background to proposed research.",
      "Master's and Bachelor's transcripts.",
      "Three academic references (preferably including a research supervisor).",
      "Writing sample or published paper if required.",
      "Contact potential supervisors before applying if the program expects it.",
    ],
    formatting: [
      "Research proposal: problem statement, literature gap, methodology, timeline, expected contribution.",
      "Align proposal language with faculty research areas listed on the department site.",
      "Submit research proposals at least 2 weeks before the deadline for review services.",
    ],
  },
  {
    title: "Fellowships & conferences — typical documents",
    items: [
      "Short motivation letter or statement (often 300–500 words).",
      "CV highlighting relevant experience for the fellowship theme.",
      "Abstract or project description for conference funding applications.",
      "Letter of support from institution or supervisor if required.",
      "Proof of acceptance or invitation letter for conference grants.",
    ],
    formatting: [
      "Lead with impact: what you will do, why it matters, what you bring.",
      "Match word limits exactly — do not exceed.",
    ],
  },
  {
    title: "Final checklist before submit",
    items: [
      "All files open correctly and are not corrupted.",
      "Spelling and grammar checked; consistent date formats throughout.",
      "Contact email and phone number are correct on every form.",
      "Recommenders have submitted or you have uploaded their letters.",
      "Payment or fee waiver completed if applicable.",
      "Confirmation email or submission receipt saved.",
    ],
  },
]

export default function ApplicationChecklistPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar showSocialIcons={false} />
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-10 md:py-14 max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/apply">
                <ArrowLeft className="h-4 w-4" />
                Back to Apply With Us
              </Link>
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Print / Save as PDF
            </Button>
          </div>

          <Badge variant="secondary" className="mb-4 print:hidden">
            Free resource
          </Badge>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Application checklist
          </h1>
          <p className="text-muted-foreground mb-10">
            Deadlines, required documents, and formatting reminders by program type. Use this before
            you submit — or share it with someone applying alongside you.
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {section.title}
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/90">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {section.formatting && (
                  <div className="mt-4 rounded-lg bg-muted/50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Formatting rules
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      {section.formatting.map((rule) => (
                        <li key={rule}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted-foreground print:mt-8">
            Her Kadam — herkadam.com/apply
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
