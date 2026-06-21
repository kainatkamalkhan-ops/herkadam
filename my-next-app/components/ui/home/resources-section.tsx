"use client"

import Link from "next/link"
import { FileText, PenTool, MessageSquare, CheckSquare, ArrowRight, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const resources = [
  {
    id: "cv-tips",
    title: "CV Writing Guide",
    description: "Create a compelling CV that highlights your achievements and stands out to selection committees.",
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "sop-guide",
    title: "Statement of Purpose Tips",
    description: "Craft a powerful personal statement that tells your unique story and demonstrates your potential.",
    icon: PenTool,
    color: "bg-rose-100 text-rose-700",
  },
  {
    id: "interview-prep",
    title: "Interview Preparation",
    description: "Prepare for scholarship and job interviews with confidence using our comprehensive guide.",
    icon: MessageSquare,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "application-guide",
    title: "Application Checklist",
    description: "Never miss a requirement with our detailed checklist for scholarship and fellowship applications.",
    icon: CheckSquare,
    color: "bg-amber-100 text-amber-700",
  },
]

export function ResourcesSection() {
  return (
    <section className="py-10 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end md:gap-6">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 md:mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <Badge variant="secondary">Free Resources</Badge>
            </div>
            <h2 className="mb-2 font-serif text-2xl font-bold text-foreground md:text-4xl">
              Application Resources
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground md:text-base">
              Expert guides and tools to help you craft winning applications and advance your career.
            </p>
          </div>
          <Button variant="outline" className="w-fit shrink-0 gap-2" asChild>
            <Link href="/resources">
              View All Resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-2 md:hidden">
          {resources.map((resource) => (
            <Link
              key={resource.id}
              href={`/resources/${resource.id}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 transition-colors hover:border-primary/30 hover:bg-muted/40"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${resource.color}`}>
                <resource.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{resource.title}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground">{resource.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>

        <div className="hidden gap-6 md:grid sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <Link key={resource.id} href={`/resources/${resource.id}`}>
              <Card className="group h-full transition-all hover:border-primary/30 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${resource.color}`}>
                    <resource.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {resource.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">{resource.description}</p>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary">
                    <span>Read Guide</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
