import { notFound } from "next/navigation"
import Link from "next/link"
import {
  Calendar,
  MapPin,
  DollarSign,
  Building2,
  ArrowLeft,
  ExternalLink,
  Clock,
} from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OpportunityCard } from "@/components/opportunities/opportunity-card"
import { OpportunityDetailBody } from "@/components/opportunities/opportunity-detail-body"
import { OpportunityShareButton } from "@/components/opportunities/opportunity-share-button"
import { getOpportunities, getOpportunityById } from "@/lib/opportunities"
import { formatOpportunityDate } from "@/lib/opportunity-text"

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
    (new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )
  const isUrgent = daysUntilDeadline <= 7 && daysUntilDeadline > 0

  const all = await getOpportunities()
  const relatedOpportunities = all
    .filter((opp) => opp.id !== id && (opp.type === opportunity.type || opp.region === opportunity.region))
    .slice(0, 3)

  const sharePath = `/opportunities/${id}`

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 bg-background">
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
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {opportunity.type}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={
                      opportunity.fundingType === "Fully Funded"
                        ? "bg-emerald-100 text-emerald-800"
                        : opportunity.fundingType === "Partially Funded"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-800"
                    }
                  >
                    {opportunity.fundingType}
                  </Badge>
                  {isUrgent && <Badge variant="destructive">Deadline Soon</Badge>}
                </div>

                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  {opportunity.title}
                </h1>
              </div>

              <OpportunityDetailBody opportunity={opportunity} />

              {relatedOpportunities.length > 0 && (
                <div className="mt-12">
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

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div
                      className={`flex items-center gap-3 mb-6 ${isUrgent ? "text-destructive" : "text-muted-foreground"}`}
                    >
                      <Clock className="h-5 w-5" />
                      <div>
                        <p className="text-sm">Application Deadline</p>
                        <p
                          className={`font-semibold text-foreground ${isUrgent ? "text-destructive" : ""}`}
                        >
                          {formatOpportunityDate(opportunity.deadline)}
                        </p>
                        {daysUntilDeadline > 0 && (
                          <p className={`text-sm ${isUrgent ? "text-destructive font-medium" : ""}`}>
                            {daysUntilDeadline} days remaining
                          </p>
                        )}
                      </div>
                    </div>

                    {opportunity.applicationLink ? (
                      <Button className="w-full gap-2 mb-3" size="lg" asChild>
                        <a
                          href={opportunity.applicationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply Now
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button className="w-full gap-2 mb-3" size="lg" disabled>
                        Apply Now
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}

                    <OpportunityShareButton
                      title={opportunity.title}
                      path={sharePath}
                      className="w-full gap-2"
                    />
                  </CardContent>
                </Card>

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
                        <p className="font-medium">{formatOpportunityDate(opportunity.deadline)}</p>
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
