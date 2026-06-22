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
import { NewsletterSection } from "@/components/home/newsletter-section"
import { getOpportunities } from "@/lib/opportunities"
import { getResourceVideos } from "@/lib/resource-videos"

export default async function HomePage() {
  const [opportunities, resourceVideos] = await Promise.all([
    getOpportunities(),
    getResourceVideos({ limit: 4 }),
  ])
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
        <ResourcesSection videos={resourceVideos} />
        <NewsletterSection />
      </HomepageMainShell>
      <Footer />
    </div>
  )
}
