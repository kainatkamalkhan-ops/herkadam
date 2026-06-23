import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Download,
  ExternalLink,
  Mail,
} from "lucide-react"
import { InstagramIcon, YoutubeIcon } from "@/components/ui/social-icons"
import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplyWithUsForm } from "@/components/apply/apply-with-us-form"
import {
  HER_KADAM_EMAIL,
  HER_KADAM_INSTAGRAM_URL,
  HER_KADAM_YOUTUBE_URL,
} from "@/lib/application-services-constants"
import { SUBSCRIBE_PAGE_PATH } from "@/lib/mailerlite"

export const metadata: Metadata = {
  title: "Apply With Us",
  description:
    "Free application resources and paid review services from Her Kadam — CV, SOP, and research proposal feedback for women applying to programs worldwide.",
}

const reviewServices = [
  { name: "CV Review", price: "Rs 1,500" },
  { name: "Bachelor's Scholarship SOP Review", price: "Rs 2,000" },
  { name: "Master's / PhD Scholarship SOP Review", price: "Rs 3,500" },
  { name: "Research Proposal Review", price: "Rs 5,000" },
  {
    name: "Conference / Fellowship SOP / Motivation Letter Review",
    price: "Rs 1,000",
  },
  { name: "Recommendation Letter Review", price: "Rs 1,200" },
]

const packages = [
  { name: "Two Master's/PhD SOP Reviews Bundle", price: "Rs 6,000" },
  { name: "CV Review + Master's/PhD SOP Review Combo", price: "Rs 4,500" },
  {
    name: "Full PhD Application Package",
    price: "Rs 9,000",
    note: "CV review + Master's/PhD SOP review + research proposal review.",
  },
  {
    name: "Full Master's Application Package",
    price: "Rs 5,500",
    note: "CV review + Master's/PhD SOP review.",
  },
]

export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar showSocialIcons={false} />
      <Header />
      <main className="flex-1 bg-background">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Badge variant="secondary" className="mb-4">
              Apply With Us
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Strengthen your application before you submit
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg">
              Free guides and paid review services to help you apply with clarity — from downloadables
              and tips to honest feedback on your CV, SOP, and research proposal.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-16">
          {/* Section 1 — Free Services */}
          <section id="free-services" className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Free services
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Start here — no payment required.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2 text-lg">
                    <YoutubeIcon className="h-5 w-5 text-primary" />
                    YouTube channel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Walkthroughs, application tips, and opportunity breakdowns from Her Kadam.
                  </p>
                  <Button asChild variant="outline" className="gap-2">
                    <Link href={HER_KADAM_YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                      Visit channel
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2 text-lg">
                    <Download className="h-5 w-5 text-primary" />
                    Downloadables
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    A quick reference for deadlines, documents, and formatting by program type.
                  </p>
                  <Button asChild variant="outline" className="gap-2">
                    <Link href="/apply/checklist">
                      View downloadables
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Newsletter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Application tips and opportunity alerts delivered to your inbox.
                  </p>
                  <Button asChild className="gap-2">
                    <Link href={SUBSCRIBE_PAGE_PATH}>
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2 text-lg">
                    <InstagramIcon className="h-5 w-5 text-primary" />
                    Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    DM us on Instagram for quick questions before you apply or pay for a review.
                  </p>
                  <Button asChild variant="outline" className="gap-2">
                    <Link href={HER_KADAM_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                      @her.kadam
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 2 — Paid Services */}
          <section id="paid-services" className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Paid services
              </h2>
              <p className="mt-4 max-w-3xl text-foreground leading-relaxed">
                Getting into the right program is rarely about talent alone. It is about how clearly
                you can show what you have to offer, and most applicants never get real feedback on
                that until it is too late. Her Kadam&apos;s application review service exists to close
                that gap. We read your documents the way an admissions committee would, and tell you
                honestly what is working, what is not, and how to fix it.
              </p>
              <p className="mt-4 max-w-3xl text-sm italic text-muted-foreground leading-relaxed">
                We do not guarantee admission or selection, as that depends on the institution, not
                us. What we offer is honest, expert feedback on what you&apos;ve already written, so
                your application goes in clearer and stronger. We improve how your story is told. We
                don&apos;t write it for you.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Individual reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {reviewServices.map((item) => (
                      <li key={item.name} className="border-b border-border pb-3 last:border-0">
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-sm text-foreground">{item.name}</span>
                          <span className="shrink-0 text-sm font-semibold text-primary">
                            {item.price}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-muted-foreground">
                    For deadlines less than 3 days away, a Rs 500 rush fee applies on any service.
                    Research proposals must be submitted at least 2 weeks before your deadline.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {packages.map((item) => (
                      <li key={item.name} className="border-b border-border pb-4 last:border-0">
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                          <span className="shrink-0 text-sm font-semibold text-primary">
                            {item.price}
                          </span>
                        </div>
                        {item.note && (
                          <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 3 — CV Creation */}
          <section id="cv-creation" className="space-y-4">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                CV creation (from scratch)
              </h2>
            </div>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-foreground">CV Creation (from scratch)</span>
                  <span className="font-semibold text-primary">Rs 5,000</span>
                </div>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>
                    Requires a link to a folder containing all relevant documents (degrees,
                    certificates, work history, etc.).
                  </li>
                  <li>Must be requested at least 2 weeks before any application deadline.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 — Customised Consultation */}
          <section id="consultation" className="space-y-4">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Customised consultation
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Have a specific scholarship or a few in mind? Book a one-on-one consultation and get
                tailored guidance on what to highlight.
              </p>
            </div>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-foreground">One-on-one consultation</span>
                  <span className="font-semibold text-primary">Rs 5,000</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Two 30-minute sessions. In the first, you share your life story, experiences, and
                  background. In the second, you receive detailed feedback on how to present your
                  strengths, plus answers to any specific questions.
                </p>
                <p className="text-sm text-muted-foreground">
                  Full consultation sessions cannot be booked through this form. Contact Her Kadam via{" "}
                  <Link
                    href={HER_KADAM_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Instagram
                  </Link>{" "}
                  or{" "}
                  <Link
                    href={`mailto:${HER_KADAM_EMAIL}`}
                    className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    email
                  </Link>{" "}
                  to arrange.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Submission form */}
          <section id="submit" className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Submit your application
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Select your service, upload your documents, and submit payment proof below.
              </p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <ApplyWithUsForm />
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
