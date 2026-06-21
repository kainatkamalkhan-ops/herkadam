import { ExternalLink } from "lucide-react"
import type { Opportunity } from "@/components/opportunities/opportunity-card"
import { Button } from "@/components/ui/button"
import {
  benefitsSectionTitle,
  formatOpportunityDate,
  linesToBulletList,
} from "@/lib/opportunity-text"

function Section({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={className}>
      <h2 className="font-serif text-xl font-semibold text-foreground mb-3">{title}</h2>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <ul className="space-y-2 text-muted-foreground leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function OpportunityDetailBody({ opportunity }: { opportunity: Opportunity }) {
  const benefits = linesToBulletList(opportunity.benefits)
  const eligibility = linesToBulletList(opportunity.eligibility)
  const requirements = linesToBulletList(opportunity.requirements)
  const publishedLabel = opportunity.publishedAt
    ? formatOpportunityDate(opportunity.publishedAt)
    : null

  return (
    <div className="space-y-8">
      {opportunity.summary?.trim() && (
        <p className="text-base md:text-lg font-semibold text-foreground leading-relaxed">
          {opportunity.summary.trim()}
        </p>
      )}

      <Section title={`Details About ${opportunity.title}`}>
        <ul className="space-y-2 text-muted-foreground leading-relaxed">
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>
              <strong className="font-medium text-foreground">Organization:</strong>{" "}
              {opportunity.organization}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>
              <strong className="font-medium text-foreground">Type:</strong> {opportunity.type}
            </span>
          </li>
          {publishedLabel && (
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>
                <strong className="font-medium text-foreground">Listed:</strong> {publishedLabel}
              </span>
            </li>
          )}
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>
              <strong className="font-medium text-foreground">Location:</strong> {opportunity.location}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>
              <strong className="font-medium text-foreground">Region:</strong> {opportunity.region}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>
              <strong className="font-medium text-foreground">Funding:</strong> {opportunity.fundingType}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>
              <strong className="font-medium text-foreground">Application deadline:</strong>{" "}
              {formatOpportunityDate(opportunity.deadline)}
            </span>
          </li>
        </ul>
      </Section>

      <Section title="About the Program">
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {opportunity.description}
        </p>
      </Section>

      {benefits.length > 0 && (
        <Section title={benefitsSectionTitle(opportunity.fundingType)}>
          <BulletList items={benefits} />
        </Section>
      )}

      {eligibility.length > 0 && (
        <Section title="Eligibility Criteria">
          <BulletList items={eligibility} />
        </Section>
      )}

      {requirements.length > 0 && (
        <Section title="Requirements">
          <BulletList items={requirements} />
        </Section>
      )}

      {opportunity.impactForWomen?.trim() && (
        <section className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/8 via-rose/10 to-secondary/40 p-6 md:p-8">
          <h2 className="font-serif text-xl font-semibold text-primary mb-3">
            Why This Matters for Her
          </h2>
          <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
            {opportunity.impactForWomen.trim()}
          </p>
        </section>
      )}

      <Section title="How to Apply">
        <p className="text-muted-foreground leading-relaxed mb-4">
          Review the opportunity details above, then submit your application through the official
          link below before the deadline.
        </p>
        {opportunity.applicationLink ? (
          <Button size="lg" className="gap-2" asChild>
            <a href={opportunity.applicationLink} target="_blank" rel="noopener noreferrer">
              Apply on Official Site
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Application link not yet provided. Check back soon or contact the organization directly.
          </p>
        )}
      </Section>
    </div>
  )
}
