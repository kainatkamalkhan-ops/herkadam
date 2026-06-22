import Link from "next/link"
import { ArrowRight, Video } from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ResourceVideoGrid } from "@/components/resources/resource-video-grid"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getResourceVideos } from "@/lib/resource-videos"
import { OPPORTUNITY_TYPES_MARKETING_LIST } from "@/lib/opportunity-constants"

export default async function ResourcesPage() {
  const videos = await getResourceVideos()

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 bg-background">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Video className="h-6 w-6 text-primary" />
              <Badge variant="secondary">Free Resources</Badge>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Application Resources
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Watch step-by-step video guides on applications, interviews, and building a strong profile.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <ResourceVideoGrid videos={videos} />

          <Card className="mt-16 bg-gradient-to-br from-primary to-plum-light text-primary-foreground">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                Need Personalized Guidance?
              </h2>
              <p className="text-primary-foreground/85 mb-8 max-w-xl mx-auto">
                Join our community and get support as you apply for {OPPORTUNITY_TYPES_MARKETING_LIST}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/connect">
                    Connect With Us
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
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
