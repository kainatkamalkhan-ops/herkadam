import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HerKadamLogo } from "@/components/ui/brand/her-kadam-logo"
import { Button } from "@/components/ui/button"
import { SUBSCRIBE_PAGE_PATH } from "@/lib/mailerlite"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Link href="/" className="mb-6 inline-flex" aria-label="Her Kadam — home">
            <HerKadamLogo size="xl" variant="on-dark" />
          </Link>

          <h2 className="font-serif text-2xl font-bold mb-4">Her Kadam</h2>

          <p className="max-w-xl text-xs leading-relaxed opacity-90 md:text-sm">
            <span className="block">
              Her Kadam is a global gateway connecting young women everywhere to scholarships, fellowships, jobs, and leadership opportunities,
            </span>
            <span className="block">
              because access, once visible, becomes transformative.
            </span>
          </p>

          <Button asChild variant="secondary" size="lg" className="mt-8 gap-2 px-8">
            <Link href={SUBSCRIBE_PAGE_PATH}>
              Subscribe to Newsletter
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center space-y-3">
          <p className="text-sm opacity-70">
            &copy; {new Date().getFullYear()} Her Kadam. All rights reserved.
          </p>
          <p className="mx-auto max-w-2xl text-xs leading-relaxed opacity-50 md:text-sm">
            Her Kadam shares opportunities posted by external institutions and organizations. We do not
            guarantee selection, admission, or funding outcomes.
          </p>
        </div>
      </div>
    </footer>
  )
}
