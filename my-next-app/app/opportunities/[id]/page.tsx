import { notFound } from "next/navigation"
import Link from "next/link"
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Building2, 
  Globe, 
  ArrowLeft, 
  ExternalLink,
  Share2,
  Bookmark,
  Clock,
  CheckCircle2
} from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OpportunityCard } from "@/components/opportunities/opportunity-card"
import { getOpportunities, getOpportunityById } from "@/lib/opportunities"

export const revalidate = 120

interface OpportunityDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function OpportunityDetailPage({ params }: OpportunityDetailPageProps) {
  const { id } = await params
  const opportunity = await getOpportunityById(id)

  if (!opportunity) {
    notFound()
  }

  const daysUntilDeadline = Math.ceil(
    (new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )
  const isUrgent = daysUntilDeadline <= 7 && daysUntilDeadline > 0

  const all = await getOpportunities()
  const relatedOpportunities = all
    .filter((opp) => opp.id !== id && (opp.type === opportunity.type || opp.region === opportunity.region))
    .slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 bg-background">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/opportunities">
              <ArrowLeft className="h-4 w-4" />
              Back to Opportunities
            </Link>
          </Button>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {opportunity.type}
                  </Badge>
                  <Badge variant="secondary" className={
                    opportunity.fundingType === "Fully Funded" 
                      ? "bg-emerald-100 text-emerald-800" 
                      : opportunity.fundingType === "Partially Funded"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-slate-100 text-slate-800"
                  }>
                    {opportunity.fundingType}
                  </Badge>
                  {isUrgent && (
                    <Badge variant="destructive">Deadline Soon</Badge>
                  )}
                </div>

                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {opportunity.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {opportunity.organization}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {opportunity.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {opportunity.region}
                  </span>
                </div>
              </div>

              {/* Description */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="font-serif">About This Opportunity</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {opportunity.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    This {opportunity.type.toLowerCase()} offers an incredible opportunity for women looking to advance their careers and make a meaningful impact. The program is designed to support talented individuals from diverse backgrounds and provide them with the resources, mentorship, and networks needed to succeed.
                  </p>
                  
                  <h3 className="font-serif text-lg font-semibold text-foreground mt-6 mb-3">Eligibility</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Open to women from all nationalities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Demonstrated leadership potential and commitment to making a difference</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Strong academic background or relevant professional experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Proficiency in English (written and spoken)</span>
                    </li>
                  </ul>

                  <h3 className="font-serif text-lg font-semibold text-foreground mt-6 mb-3">Benefits</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{opportunity.fundingType === "Fully Funded" ? "Full tuition coverage and living expenses" : "Partial financial support available"}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Access to exclusive networking events and mentorship programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Professional development workshops and career guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Join a global community of accomplished women leaders</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Related Opportunities */}
              {relatedOpportunities.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Related Opportunities
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {relatedOpportunities.slice(0, 2).map((opp) => (
                      <OpportunityCard key={opp.id} opportunity={opp} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Apply Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className={`flex items-center gap-3 mb-6 ${isUrgent ? "text-destructive" : "text-muted-foreground"}`}>
                      <Clock className="h-5 w-5" />
                      <div>
                        <p className="text-sm">Application Deadline</p>
                        <p className={`font-semibold text-foreground ${isUrgent ? "text-destructive" : ""}`}>
                          {new Date(opportunity.deadline).toLocaleDateString("en-US", { 
                            month: "long", 
                            day: "numeric", 
                            year: "numeric" 
                          })}
                        </p>
                        {daysUntilDeadline > 0 && (
                          <p className={`text-sm ${isUrgent ? "text-destructive font-medium" : ""}`}>
                            {daysUntilDeadline} days remaining
                          </p>
                        )}
                      </div>
                    </div>

                    <Button className="w-full gap-2 mb-3" size="lg">
                      Apply Now
                      <ExternalLink className="h-4 w-4" />
                    </Button>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 gap-2">
                        <Bookmark className="h-4 w-4" />
                        Save
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Quick Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Organization</p>
                        <p className="font-medium">{opportunity.organization}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{opportunity.location}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Funding</p>
                        <p className="font-medium">{opportunity.fundingType}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Deadline</p>
                        <p className="font-medium">
                          {new Date(opportunity.deadline).toLocaleDateString("en-US", { 
                            month: "short", 
                            day: "numeric", 
                            year: "numeric" 
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
