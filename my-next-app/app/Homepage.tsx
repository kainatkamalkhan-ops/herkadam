import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HomepageMainShell } from "@/components/home/homepage-main-shell"
import { HomeTaglineBand } from "@/components/home/home-tagline-band"
import { LatestOpportunities } from "@/components/home/latest-opportunities"
import { HomeQuizSection } from "@/components/home/home-quiz-section"
import { FeaturedOpportunities } from "@/components/home/featured-opportunities"
import { CategoriesSection } from "@/components/home/categories-section"
import { CalendarSection } from "@/components/home/calendar-section"
import { ResourcesSection } from "@/components/home/resources-section"
import { BlogSection } from "@/components/home/blog-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { getOpportunities } from "@/lib/opportunities"

export default async function HomePage() {
  const opportunities = await getOpportunities()
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <HomepageMainShell>
        <HomeTaglineBand />
        <LatestOpportunities opportunities={opportunities} />
        <HomeQuizSection />
        <FeaturedOpportunities opportunities={opportunities} />
        <CategoriesSection opportunities={opportunities} />
        <CalendarSection opportunities={opportunities} />
        <ResourcesSection />
        <BlogSection />
        <NewsletterSection />
      </HomepageMainShell>
      <Footer />
    </div>
  )
}
