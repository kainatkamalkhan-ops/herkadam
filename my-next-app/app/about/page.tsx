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
import { InstagramIcon } from "@/components/ui/social-icons"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { OPPORTUNITY_TYPES_MARKETING_LIST } from "@/lib/opportunity-constants"

export const metadata: Metadata = {
  title: "About",
  description:
    `Learn about Her Kadam — closing the information gap so young women everywhere can find ${OPPORTUNITY_TYPES_MARKETING_LIST}.`,
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
      `We research and verify hundreds of ${OPPORTUNITY_TYPES_MARKETING_LIST}, so you're not the one digging through scattered listings and outdated links.`,
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
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 max-w-4xl mx-auto text-balance">
              About
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <article className="mx-auto max-w-3xl">
            <section className="mb-14 md:mb-20">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
                The Problem We&apos;re Solving
              </h2>
              <div className="about-prose space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Every year, thousands of life-changing opportunities open up for young women: {OPPORTUNITY_TYPES_MARKETING_LIST}
                  that could shift the entire course of a life. But for most, these opportunities remain invisible. They are buried in newsletters they never receive, on websites
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
              <div className="about-prose space-y-4 text-muted-foreground leading-relaxed">
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
                  At its heart, Her Kadam is a global gateway connecting young women to {OPPORTUNITY_TYPES_MARKETING_LIST}, all in one place. It removes the burden of searching
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

        {/* Values — list */}
        <section className="relative overflow-hidden bg-secondary/30 py-16 md:py-24">
          <div
            className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-rose/10 blur-3xl"
            aria-hidden
          />
          <div className="container relative mx-auto px-4">
            <header className="mx-auto mb-12 max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">
                Our Values
              </Badge>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                What Drives Us
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Four beliefs shape every list we curate, every resource we publish, and every connection we help
                young women make.
              </p>
            </header>
            <ul className="mx-auto max-w-3xl divide-y divide-border/70">
              {values.map((value, index) => (
                <li key={value.title} className="flex gap-5 py-8 first:pt-0 last:pb-0 md:gap-6 md:py-10">
                  <div className="flex shrink-0 flex-col items-center gap-3">
                    <span className="font-serif text-sm font-bold tabular-nums text-primary/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 md:h-12 md:w-12">
                      <value.icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
                    </div>
                  </div>
                  <div className="min-w-0 space-y-2 pt-1">
                    <h3 className="font-serif text-xl font-semibold text-foreground md:text-[1.35rem]">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                      {value.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What We Do — journey path */}
        <section className="border-y border-border bg-muted/20 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <header className="mx-auto mb-14 max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">
                What We Do
              </Badge>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                How We Help Women Succeed
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                From discovery to application, we walk alongside you at each stage of the journey.
              </p>
            </header>
            <div className="about-journey-path mx-auto max-w-5xl space-y-10 md:space-y-16">
              {whatWeDo.map((item, index) => {
                const isEven = index % 2 === 0
                return (
                  <div
                    key={item.title}
                    className="relative grid gap-6 md:grid-cols-2 md:items-center md:gap-10"
                  >
                    <div
                      className={cn(
                        "relative pl-14 md:pl-0",
                        isEven ? "md:order-1 md:pr-10 md:text-right" : "md:order-2 md:pl-10 md:text-left",
                      )}
                    >
                      <div
                        className={cn(
                          "absolute top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary text-sm font-bold text-primary-foreground shadow-md md:top-1/2 md:-translate-y-1/2",
                          isEven
                            ? "left-0 md:left-auto md:right-0 md:translate-x-1/2"
                            : "left-0 md:left-0 md:-translate-x-1/2",
                        )}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={cn(
                          "inline-flex flex-col gap-3",
                          isEven ? "md:items-end" : "md:items-start",
                        )}
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-plum-light text-primary-foreground shadow-lg">
                          <item.icon className="h-6 w-6" aria-hidden />
                        </div>
                        <h3 className="font-serif text-2xl font-semibold leading-snug text-foreground md:max-w-sm">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <Card
                      className={cn(
                        "border-border/80 bg-card/90 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md",
                        isEven ? "md:order-2 md:mr-8" : "md:order-1 md:ml-8",
                      )}
                    >
                      <CardContent className="p-6 md:p-8">
                        <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <article className="mx-auto max-w-3xl lg:max-w-5xl">
            <section>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight">
                About Me
              </h2>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] lg:items-start lg:gap-8">
                <div className="about-prose order-2 space-y-4 text-[15px] leading-snug text-muted-foreground md:text-base md:leading-relaxed lg:order-1 lg:pr-2">
                  <p>
                    I&apos;m Kainat Kamal, the founder of Her Kadam. I&apos;m a tribal Pashtun woman from Pakistan, and
                    that identity has shaped how I see the world, the value of community, the weight of representation,
                    and the importance of standing firmly in who you are while still reaching toward more. I believe
                    progress is never a single leap, it is built one deliberate step at a time, and that belief sits at
                    the center of everything I do.
                  </p>
                  <p>
                    I&apos;m a PhD candidate in Peace and Conflict Studies at the National University of Sciences and
                    Technology, researching inclusive peacebuilding frameworks for conflict-affected regions, alongside a
                    Visiting Research Fellowship at the Australian National University. I&apos;m trained in gender
                    mainstreaming through Pakistan&apos;s Planning and Management Institute, completed the United Nations
                    Gender Advisor Course, and was selected for UNITAR&apos;s Women&apos;s Leadership for Peace Emerging
                    Leaders Course in Geneva. I&apos;ve spoken at multiple international conferences, represented
                    Pakistan across two cohorts of the UN Women Gen-Forum, and served as Country Speaker at the UN Women
                    Asia-Pacific consultation on CEDAW General Recommendation No. 40, the United Nations framework on
                    women&apos;s equal and inclusive representation in decision-making.
                  </p>
                  <p>
                    My journey combines academia, art, and advocacy to advance gender equality. Along the way,
                    I&apos;ve been fortunate to receive multiple scholarships and fellowships myself, experiences that
                    taught me firsthand how much a strong application, and the right guidance behind it, can change.
                  </p>
                </div>
                <div className="order-1 mx-auto w-full max-w-[320px] shrink-0 sm:max-w-[340px] lg:order-2 lg:mx-0 lg:max-w-none">
                  <div className="overflow-hidden rounded-2xl bg-muted/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] ring-2 ring-border/50">
                    <Image
                      src="/about-founder.png"
                      alt="Kainat Kamal, founder of Her Kadam"
                      width={768}
                      height={1024}
                      className="block h-auto w-full"
                      sizes="(max-width: 1024px) 340px, 300px"
                      priority
                    />
                    <Link
                      href="https://www.instagram.com/dukhtarekamal/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow @dukhtarekamal on Instagram"
                      className="flex items-center justify-center gap-2 border-t border-border/40 bg-muted/30 px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 hover:text-primary"
                    >
                      <InstagramIcon className="h-4 w-4 text-primary" aria-hidden />
                      <span>@dukhtarekamal</span>
                    </Link>
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
