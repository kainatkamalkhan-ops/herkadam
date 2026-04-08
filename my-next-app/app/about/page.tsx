import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  Sparkles,
  Plane,
  HeartHandshake,
  Footprints,
  Users,
  Award,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HerKadamLogoMark, HerKadamWordmark } from "@/components/ui/brand/her-kadam-logo"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Her Kadam — every step toward scholarships, fellowships, jobs, and leadership for women worldwide.",
}

const values = [
  {
    icon: Sparkles,
    title: "Empowerment",
    description: "We believe every woman deserves access to opportunities that can transform her life and community.",
  },
  {
    icon: Plane,
    title: "Global Reach",
    description: "We connect women from all corners of the world with international opportunities.",
  },
  {
    icon: HeartHandshake,
    title: "Community",
    description: "We foster a supportive community where women uplift and inspire each other.",
  },
  {
    icon: Footprints,
    title: "Accessibility",
    description: "We make information accessible, organized, and easy to navigate for all users.",
  },
]

const whatWeDo = [
  {
    icon: Lightbulb,
    title: "Curate Opportunities",
    description:
      "We research and verify hundreds of scholarships, fellowships, jobs, and programs specifically for women.",
  },
  {
    icon: Award,
    title: "Provide Resources",
    description:
      "Our guides, templates, and tips help women craft winning applications and prepare for success.",
  },
  {
    icon: Users,
    title: "Build Community",
    description:
      "We connect women with mentors, peers, and networks that support their growth and development.",
  },
]

const team = [
  {
    name: "Kainat Kamal",
    role: "Founder & CEO",
    bio: "PhD Scholar at NUST and Visiting Research Fellow at ANU. Her work sits at the intersection of peacebuilding, gender justice, and creative advocacy, with a focus on making women’s empowerment a lived reality rather than an abstract ideal.",
  },
  {
    name: "Alishba Irfan",
    role: "Content & Editorial Curator",
    bio: "A high-achieving high school student with exceptional analytical and creative abilities. She brings a fresh, intuitive perspective to shaping content that is both accessible and impactful for a global audience.",
  },
  {
    name: "Barira Ahmad",
    role: "Research Lead",
    bio: "Master’s student at NUST with a strong grounding in academic research and analysis. She is responsible for identifying, verifying, and structuring opportunities with clarity and depth.",
  },
  {
    name: "Tehreem Tariq",
    role: "Communications & Outreach Strategist",
    bio: "Independent researcher focused on dialogue, visibility, and external engagement. She works on building meaningful connections and ensuring Her Kadam reaches the right communities and partners.",
  },
  {
    name: "Faruzan Anwar Butt",
    role: "Mentorship & Application Guidance Advisor",
    bio: "PhD Scholar at Beijing University with expertise in academic excellence and professional development. She supports applicants through mentorship, feedback, and strategic guidance to strengthen their applications and success pathways.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
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
              Her Kadam: Every Step Builds Her Power
            </h1>
          </div>
        </div>

        {/* Story Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-5 tracking-tight lg:whitespace-nowrap">
                Born from a Vision Where Women Lead Peace
              </h2>
              <div className="space-y-4 text-justify text-muted-foreground hyphens-auto">
                <p>
                  Her Kadam takes its name from the Urdu phrase “ہر قدم” (Har Kadam), meaning “every step.” It carries a quiet
                  but powerful idea: that progress is not a single leap, but a series of steps, each one opening a new
                  possibility. At its heart, the platform serves as a global gateway for women seeking scholarships,
                  fellowships, jobs, internships, and leadership opportunities that can reshape the course of their lives. It is
                  built on the understanding that access, when made visible and reachable, can be transformative.
                </p>
                <p>
                  Her Kadam is more than an opportunity board. It is a space that offers clarity, direction, and support in
                  navigating paths that are often scattered or difficult to access. By bringing together scholarships,
                  fellowships, jobs, and leadership programs in one place, it helps make opportunities more visible and easier
                  to reach. At its core, the platform is built on dignity and informed choice. Each opportunity shared is part
                  of a wider commitment to making access more equitable and intentional. Every step a woman takes toward her
                  goals is seen as meaningful progress that strengthens not only her own journey, but also contributes to more
                  inclusive and peaceful societies.
                </p>
                <p>
                  Her Kadam exists within the broader vision of Kainat Kamal, a peace activist and researcher whose work brings
                  together peacebuilding, gender justice, academia, arts, and advocacy. Grounded in the belief that “Peace
                  Needs Women,” her work repositions women as central to shaping systems and futures. Through Her Kadam and her
                  wider initiatives, she creates pathways that connect access with agency, ensuring that women are not only
                  present, but empowered to lead, influence, and transform the spaces they enter.
                </p>
              </div>
            </div>
            <div className="relative mx-auto flex min-h-[420px] w-full max-w-md items-center justify-center sm:min-h-[480px] lg:max-w-lg lg:min-h-[520px]">
              {/* Back tile — founder photo, tilted */}
              <div
                className="absolute left-0 top-6 z-10 w-[58%] max-w-[220px] origin-center rotate-[-7deg] overflow-hidden rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] ring-2 ring-background sm:left-2 sm:top-10 sm:max-w-[260px] lg:max-w-[280px]"
                style={{ aspectRatio: "3 / 4" }}
              >
                <Image
                  src="/about-founder.png"
                  alt="Kainat Kamal with passport and luggage in an airport terminal, representing global movement and Her Kadam’s gateway for women."
                  fill
                  className="object-cover object-[center_22%]"
                  sizes="(max-width: 1024px) 40vw, 280px"
                  priority
                />
              </div>
              {/* Front tile — brand, larger mark, overlapping */}
              <div className="absolute bottom-4 right-0 z-20 w-[68%] max-w-[280px] origin-center rotate-[9deg] rounded-2xl bg-gradient-to-br from-primary/25 via-card to-accent/20 p-6 shadow-[0_24px_60px_-14px_rgba(0,0,0,0.3)] ring-2 ring-border/80 backdrop-blur-[2px] sm:bottom-8 sm:max-w-[300px] lg:bottom-10 lg:max-w-[320px]">
                <div className="flex flex-col items-center gap-3 text-center">
                  <HerKadamLogoMark size={200} className="text-primary drop-shadow-sm" />
                  <HerKadamWordmark size="lg" className="scale-105" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-5xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">Our Values</Badge>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Drives Us
              </h2>
              <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <p className="text-muted-foreground whitespace-nowrap text-center w-max max-w-none mx-auto">
                  Our core values guide everything we do, from curating opportunities to building our community.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="text-center hover:shadow-md transition-all">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* What We Do — stacked editorial rows (not 3-up cards) */}
        <section className="border-y border-border bg-muted/25 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
              <Badge variant="secondary" className="mb-3">
                What We Do
              </Badge>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                How We Help Women Succeed
              </h2>
            </header>

            <div className="mx-auto max-w-3xl">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                {whatWeDo.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex flex-col gap-5 border-b border-border px-6 py-8 last:border-b-0 md:flex-row md:items-stretch md:gap-0 md:px-0 md:py-0"
                  >
                    <div className="flex flex-1 flex-col gap-3 md:max-w-[42%] md:border-r md:border-border md:bg-muted/30 md:p-8 lg:max-w-[40%]">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/15">
                          <item.icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold leading-snug text-foreground md:text-[1.35rem]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="flex-1 text-[15px] leading-relaxed text-muted-foreground md:flex md:items-center md:p-8 md:pl-10">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <div className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
              <Badge variant="secondary" className="mb-3 text-xs">Our Team</Badge>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                The People Behind Her Kadam
              </h2>
              <p className="text-sm text-muted-foreground">
                A passionate team dedicated to opening doors for women worldwide.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
              {team.map((member) => (
                <Card key={member.name} className="text-center shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col items-center p-3 sm:p-4">
                    <div
                      className="mx-auto mb-3 h-14 w-14 shrink-0 rounded-full border-2 border-dashed border-primary/25 bg-muted/50 sm:h-16 sm:w-16"
                      aria-hidden
                    />
                    <h3 className="font-serif text-sm font-semibold leading-tight text-foreground sm:text-base">
                      {member.name}
                    </h3>
                    <p className="mb-2 text-[11px] font-medium leading-snug text-primary sm:text-xs">{member.role}</p>
                    <p className="hyphens-auto text-justify text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 py-16 md:py-24">
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
                    <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                      <Link href="/contact">Contact Us</Link>
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
