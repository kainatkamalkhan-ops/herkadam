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
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <Badge variant="secondary">Free Resources</Badge>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Application Resources
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Expert guides and tools to help you craft winning applications and advance your career.
            </p>
          </div>
          <Button variant="outline" className="gap-2 shrink-0" asChild>
            <Link href="/resources">
              View All Resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Resources Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => (
            <Link key={resource.id} href={`/resources/${resource.id}`}>
              <Card className="group hover:shadow-lg hover:border-primary/30 transition-all h-full">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl ${resource.color} flex items-center justify-center mb-5`}>
                    <resource.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary">
                    <span>Read Guide</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
