import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Eye,
  FileCheck,
  Globe2,
  ListChecks,
  Search,
  Users,
} from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HerKadamLogo } from "@/components/ui/brand/her-kadam-logo"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Her Kadam — closing the information gap so young women everywhere can find scholarships, fellowships, jobs, and leadership opportunities.",
}

const values = [
  {
    icon: Eye,
    title: "Access Over Ambition",
    description:
      "Talent is not the barrier. Visibility is. We believe every young woman deserves a clear path to opportunities that can change the direction of her life, not just the ones who already know where to look.",
  },
  {
    icon: Globe2,
    title: "Borderless Opportunity",
    description:
      "A young woman's location should never decide her future. We connect women everywhere, regardless of geography, to opportunities the rest of the world already has easy access to.",
  },
  {
    icon: Users,
    title: "Strength in Numbers",
    description:
      "Progress feels lighter when it isn't carried alone. We're building a community where women share what they know, lift each other up, and move forward together.",
  },
  {
    icon: ListChecks,
    title: "Clarity, Not Clutter",
    description:
      "Opportunities should be easy to find and easy to understand. We organize information so no one is left guessing, searching, or giving up before they've even started.",
  },
]

const whatWeDo = [
  {
    icon: Search,
    title: "We Find What's Worth Finding",
    description:
      "We research and verify hundreds of scholarships, fellowships, jobs, and leadership programs, so you're not the one digging through scattered listings and outdated links.",
  },
  {
    icon: FileCheck,
    title: "We Help You Show Up Ready",
    description:
      "Our guides, templates, and application resources are built to help you put your best self forward, because a strong opportunity deserves a strong application behind it.",
  },
  {
    icon: Compass,
    title: "We Strengthen Your Application",
    description:
      "Beyond resources, we offer direct feedback on your applications, from your statement of purpose to your CV, helping you understand what makes an application stand out and giving you the guidance to make yours the best version of itself.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 bg-background">
        <div className="relative bg-gradient-to-br from-primary via-plum-light to-rose py-10 md:py-14">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 border-[3px] border-primary-foreground/10 rounded-full" />
            <div className="absolute bottom-10 -left-20 w-60 h-60 border-[3px] border-primary-foreground/10 rounded-full" />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <Badge
              variant="secondary"
              className="mb-4 border-0 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20"
            >
              About
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 max-w-4xl mx-auto text-balance">
              About Her Kadam
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <article className="mx-auto max-w-3xl">
            <section className="mb-14 md:mb-20">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
                The Problem We&apos;re Solving
              </h2>
              <div className="space-y-4 text-justify text-muted-foreground leading-relaxed hyphens-auto">
                <p>
                  Every year, thousands of life-changing opportunities open up for young women: scholarships,
                  fellowships, leadership programs, jobs that could shift the entire course of a life. But for most,
                  these opportunities remain invisible. They are buried in newsletters they never receive, on websites
                  that assume a network they were never given, shared in circles they were never invited into. The
                  opportunity exists. The access does not.
                </p>
                <p>
                  This is not a talent gap. It is an information gap, and it is one of the quietest forms of exclusion
                  that exists today. Two equally capable young women, anywhere in the world, do not always have the same
                  starting point, not because one lacks ability, but because no one made sure the door was visible to
                  her.
                </p>
                <p className="font-medium text-foreground">Her Kadam exists to close that gap.</p>
              </div>
            </section>

            <section className="mb-14 md:mb-20">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
                Our Philosophy
              </h2>
              <div className="space-y-4 text-justify text-muted-foreground leading-relaxed hyphens-auto">
                <p>
                  Her Kadam takes its name from the Urdu phrase &ldquo;ہر قدم&rdquo; (Har Kadam), meaning &ldquo;every
                  step.&rdquo; It carries a quiet but powerful idea: that progress is not a single leap, but a series of
                  steps, each one opening a new possibility.
                </p>
                <p>
                  We believe access, once made visible and reachable, can be transformative. A young woman does not need
                  someone to hand her a future, she needs the door to be findable, the information to be clear, and the
                  path to be navigable without unnecessary barriers in her way.
                </p>
                <p>
                  At its heart, Her Kadam is a global gateway connecting young women to scholarships, fellowships, jobs,
                  internships, and leadership opportunities, all in one place. It removes the burden of searching
                  scattered, hard-to-find listings and replaces it with clarity. But it is built on more than
                  convenience, it is built on dignity and informed choice. Every opportunity shared here reflects a
                  commitment to making access more equitable and more intentional, and every step a young woman takes
                  toward her goals is meaningful progress, both for her own journey and for the world she is helping
                  shape.
                </p>
                <p>
                  We are not just a list of links. We are a space built specifically for the young women too often left
                  out of the rooms where these opportunities first get shared.
                </p>
              </div>
            </section>
          </article>
        </div>

        {/* Values */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <header className="mx-auto mb-12 max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">
                Our Values
              </Badge>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                What Drives Us
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Everything we build, from the opportunities we curate to the community we&apos;re growing, comes back to
                a few simple beliefs.
              </p>
            </header>
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <Card key={value.title} className="border-border/80 shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="flex h-full flex-col gap-4 p-6 md:p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <value.icon className="h-6 w-6" aria-hidden />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-semibold text-foreground">{value.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="border-y border-border bg-muted/20 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <header className="mx-auto mb-12 max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">
                What We Do
              </Badge>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                How We Help Women Succeed
              </h2>
            </header>
            <div className="mx-auto flex max-w-3xl flex-col gap-5">
              {whatWeDo.map((item, index) => (
                <Card key={item.title} className="overflow-hidden border-border/80 shadow-sm">
                  <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-start md:gap-6 md:p-8">
                    <div className="flex shrink-0 items-center gap-4 md:flex-col md:items-start md:gap-3">
                      <span className="font-serif text-2xl font-bold tabular-nums text-primary/30 md:text-3xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                        <item.icon className="h-5 w-5" aria-hidden />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-semibold leading-snug text-foreground md:text-[1.35rem]">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <article className="mx-auto max-w-3xl">
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight">
                About Me
              </h2>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-12">
                <div className="space-y-4 text-justify text-muted-foreground leading-relaxed hyphens-auto">
                  <p>
                    I&apos;m Kainat Kamal, the founder of Her Kadam. I&apos;m a researcher and PhD candidate whose work
                    sits at the intersection of academia, peacebuilding, and advocacy, and over the years I&apos;ve seen
                    firsthand how often talent and ambition are not the limiting factor for young women, access is. I
                    built Her Kadam because I wanted that gap to close, one opportunity, one application, one step at a
                    time.
                  </p>
                  <p>
                    My work spans peacebuilding research and advocacy, from speaking at CEDAW GR40 in Bangkok to
                    representing Pakistan at the UN Women Generation Equality Forum, alongside ongoing PhD research and
                    a Visiting Research Fellowship at ANU. Along the way, I&apos;ve been fortunate to receive multiple
                    scholarships and fellowships myself, experiences that taught me firsthand how much a strong
                    application, and the right guidance behind it, can change. But every accomplishment traces back to
                    the same starting point many of the young women on this platform share: searching for the right
                    opportunity with no one to point the way. That&apos;s the gap Her Kadam exists to close.
                  </p>
                </div>
                <div className="relative mx-auto flex min-h-[320px] w-full max-w-xs items-center justify-center sm:min-h-[360px] lg:mx-0 lg:max-w-sm">
                  <div
                    className="absolute left-0 top-4 z-10 w-[58%] max-w-[200px] origin-center rotate-[-7deg] overflow-hidden rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] ring-2 ring-background sm:max-w-[220px]"
                    style={{ aspectRatio: "3 / 4" }}
                  >
                    <Image
                      src="/about-founder.png"
                      alt="Kainat Kamal, founder of Her Kadam"
                      fill
                      className="object-cover object-[center_22%]"
                      sizes="(max-width: 1024px) 40vw, 220px"
                    />
                  </div>
                  <div className="absolute bottom-2 right-0 z-20 w-[65%] max-w-[240px] origin-center rotate-[9deg] rounded-2xl bg-white p-3 shadow-[0_24px_60px_-14px_rgba(0,0,0,0.3)] ring-2 ring-border/80 sm:bottom-4">
                    <div className="flex items-center justify-center">
                      <HerKadamLogo size="md" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </div>

        <div className="container mx-auto px-4 pb-16 md:pb-24">
          <Card className="bg-gradient-to-br from-primary to-plum-light text-primary-foreground overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                    Ready to Open New Doors?
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="secondary" size="lg" asChild>
                      <Link href="/opportunities">
                        Explore Opportunities
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                      asChild
                    >
                      <Link href="/connect">Connect With Us</Link>
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="space-y-3">
                    {[
                      "Free application resources",
                      "Supportive community",
                      "Weekly newsletter updates",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
