import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { LatestOpportunities } from "@/components/home/latest-opportunities"
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
      <main className="flex-1">
        <HeroSection />
        <LatestOpportunities opportunities={opportunities} />
        <FeaturedOpportunities opportunities={opportunities} />
        <CategoriesSection />
        <CalendarSection opportunities={opportunities} />
        <ResourcesSection />
        <BlogSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
