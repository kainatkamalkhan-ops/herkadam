import type { Metadata } from "next"
import { Mail } from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MailerLiteEmbeddedForm } from "@/components/mailerlite-embedded-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { OPPORTUNITY_TYPES_MARKETING_LIST } from "@/lib/opportunity-constants"

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    `Subscribe to Her Kadam weekly updates — ${OPPORTUNITY_TYPES_MARKETING_LIST} for women worldwide.`,
}

export default function SubscribePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 bg-background">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">
              Newsletter
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Subscribe to Her Kadam
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Get the latest {OPPORTUNITY_TYPES_MARKETING_LIST} delivered to your inbox every week.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <Card className="mx-auto max-w-lg border-border/80 shadow-sm">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6 flex items-center justify-center gap-3 text-primary">
                <Mail className="h-6 w-6" aria-hidden />
                <p className="font-medium text-foreground">Join our mailing list</p>
              </div>
              <MailerLiteEmbeddedForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
