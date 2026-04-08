import Link from "next/link"
import { 
  FileText, 
  PenTool, 
  MessageSquare, 
  CheckSquare, 
  BookOpen, 
  ArrowRight,
  Download,
  Video,
  Users
} from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const resources = [
  {
    id: "cv-tips",
    title: "CV Writing Guide",
    description: "Create a compelling CV that highlights your achievements and stands out to selection committees. Learn how to structure your CV, what to include, and common mistakes to avoid.",
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
    items: ["CV Templates", "Action Verbs List", "Formatting Tips", "Industry Examples"],
  },
  {
    id: "sop-guide",
    title: "Statement of Purpose Tips",
    description: "Craft a powerful personal statement that tells your unique story and demonstrates your potential. Discover the key elements that make a statement memorable.",
    icon: PenTool,
    color: "bg-rose-100 text-rose-700",
    items: ["Writing Framework", "Sample Statements", "Common Mistakes", "Review Checklist"],
  },
  {
    id: "interview-prep",
    title: "Interview Preparation",
    description: "Prepare for scholarship and job interviews with confidence. Learn techniques to handle tough questions and make a lasting impression.",
    icon: MessageSquare,
    color: "bg-emerald-100 text-emerald-700",
    items: ["Common Questions", "STAR Method Guide", "Virtual Interview Tips", "Follow-up Templates"],
  },
  {
    id: "application-guide",
    title: "Application Checklist",
    description: "Never miss a requirement with our detailed checklist for scholarship and fellowship applications. Stay organized throughout the application process.",
    icon: CheckSquare,
    color: "bg-amber-100 text-amber-700",
    items: ["Document Checklist", "Timeline Planner", "Recommendation Tips", "Submission Guide"],
  },
]

const additionalResources = [
  {
    title: "Video Tutorials",
    description: "Watch step-by-step guides on application processes",
    icon: Video,
    count: "15+ videos",
  },
  {
    title: "Downloadable Templates",
    description: "Ready-to-use templates for CVs, cover letters, and more",
    icon: Download,
    count: "25+ templates",
  },
  {
    title: "Community Forum",
    description: "Connect with other applicants and share experiences",
    icon: Users,
    count: "5000+ members",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <Badge variant="secondary">Free Resources</Badge>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Application Resources
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Expert guides, templates, and tools to help you craft winning applications and advance your career.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Main Resources */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {resources.map((resource) => (
              <Card key={resource.id} className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 rounded-xl ${resource.color} flex items-center justify-center`}>
                      <resource.icon className="h-7 w-7" />
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                      <Link href={`/resources/${resource.id}`}>
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                  <CardTitle className="font-serif text-xl mt-4">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{resource.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {resource.items.map((item) => (
                      <Badge key={item} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full gap-2" asChild>
                    <Link href={`/resources/${resource.id}`}>
                      Access Guide
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              More Ways to Prepare
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {additionalResources.map((resource) => (
                <Card key={resource.title} className="text-center hover:shadow-md transition-all">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <resource.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                    <Badge variant="secondary">{resource.count}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-br from-primary to-plum-light text-primary-foreground">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                Need Personalized Guidance?
              </h2>
              <p className="text-primary-foreground/85 mb-8 max-w-xl mx-auto">
                Join our community of successful applicants and get one-on-one support from mentors who have been through the process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/contact">Request a Mentor</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link href="/about">Learn About Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
