"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react"
import {
  OpportunityCard,
  type Opportunity,
} from "@/components/opportunities/opportunity-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  QUIZ_EDUCATION_LEVELS,
  QUIZ_FIELD_OPTIONS,
  QUIZ_OPPORTUNITY_TYPE_OPTIONS,
  QUIZ_REGION_OPTIONS,
} from "@/lib/quiz-constants"
import { cn } from "@/lib/utils"

const STEPS = ["types", "education", "region", "field", "email", "results"] as const
type Step = (typeof STEPS)[number]

export function OpportunityQuiz({
  variant = "default",
  showTitle = true,
}: {
  variant?: "default" | "blend"
  showTitle?: boolean
}) {
  const [step, setStep] = useState<Step>("types")
  const [types, setTypes] = useState<string[]>([])
  const [educationLevel, setEducationLevel] = useState("")
  const [region, setRegion] = useState("")
  const [fieldOfInterest, setFieldOfInterest] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<Opportunity[]>([])
  const [totalMatches, setTotalMatches] = useState(0)
  const [welcomeEmailSent, setWelcomeEmailSent] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const stepIndex = STEPS.indexOf(step)

  function toggleType(type: string) {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    )
  }

  function canContinue(): boolean {
    switch (step) {
      case "types":
        return types.length > 0
      case "education":
        return Boolean(educationLevel)
      case "region":
        return Boolean(region)
      case "field":
        return Boolean(fieldOfInterest)
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      default:
        return true
    }
  }

  function goNext() {
    if (step === "field") {
      setStep("email")
      return
    }
    if (stepIndex < STEPS.indexOf("email")) {
      setStep(STEPS[stepIndex + 1])
    }
  }

  function goBack() {
    if (stepIndex > 0 && step !== "results") {
      setStep(STEPS[stepIndex - 1])
    }
  }

  async function submitQuiz() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          opportunityTypes: types,
          educationLevel,
          region,
          fieldOfInterest,
        }),
      })
      const data = (await res.json()) as {
        error?: string
        opportunities?: Opportunity[]
        total?: number
        welcomeEmailSent?: boolean
      }
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.")
        return
      }
      setResults(data.opportunities ?? [])
      setTotalMatches(data.total ?? data.opportunities?.length ?? 0)
      setWelcomeEmailSent(Boolean(data.welcomeEmailSent))
      setStep("results")
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }, 100)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function resetQuiz() {
    setStep("types")
    setTypes([])
    setEducationLevel("")
    setRegion("")
    setFieldOfInterest("")
    setEmail("")
    setError(null)
    setResults([])
    setTotalMatches(0)
    setWelcomeEmailSent(false)
  }

  return (
    <div className={cn("w-full max-w-md lg:max-w-none", variant === "blend" && "home-quiz-blend")}>
      <div
        className={cn(
          "rounded-2xl border p-4 shadow-lg backdrop-blur-sm sm:p-5",
          variant === "blend"
            ? "home-quiz-blend__panel border-white/25 bg-white/[0.88] shadow-[0_20px_50px_-12px_rgba(40,12,38,0.35)]"
            : "border-primary-foreground/15 bg-white/95",
        )}
      >
        {showTitle && (
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
            <h2 className="font-serif text-base font-semibold text-foreground sm:text-lg">
              Find your match
            </h2>
          </div>
        )}

        {step !== "results" && (
          <p className="mb-3 text-xs text-muted-foreground">
            Step {Math.min(stepIndex + 1, 4)} of 4
          </p>
        )}

        {step === "types" && (
          <fieldset className="space-y-2">
            <legend className="mb-2 text-sm font-medium text-foreground">
              What are you looking for?
            </legend>
            <p className="mb-2 text-xs text-muted-foreground">Select all that apply</p>
            <div className="flex flex-wrap gap-2">
              {QUIZ_OPPORTUNITY_TYPE_OPTIONS.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    types.includes(type)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/40",
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === "education" && (
          <fieldset className="space-y-2">
            <legend className="mb-2 text-sm font-medium text-foreground">
              What&apos;s your education level?
            </legend>
            <div className="grid gap-2">
              {QUIZ_EDUCATION_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setEducationLevel(level)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                    educationLevel === level
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border hover:border-primary/30",
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === "region" && (
          <div className="space-y-2">
            <Label htmlFor="quiz-region" className="text-sm font-medium">
              Which region are you based in or interested in?
            </Label>
            <select
              id="quiz-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Select a region</option>
              {QUIZ_REGION_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}

        {step === "field" && (
          <div className="space-y-2">
            <Label htmlFor="quiz-field" className="text-sm font-medium">
              What field or sector interests you?
            </Label>
            <select
              id="quiz-field"
              value={fieldOfInterest}
              onChange={(e) => setFieldOfInterest(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Select a field</option>
              {QUIZ_FIELD_OPTIONS.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        )}

        {step === "email" && (
          <div className="space-y-3">
            <p className="text-sm text-foreground">
              Enter your email to see your personalized opportunities. You&apos;ll also be subscribed to Her Kadam weekly updates.
            </p>
            <div className="space-y-2">
              <Label htmlFor="quiz-email">Email address</Label>
              <Input
                id="quiz-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        )}

        {step === "results" && (
          <div ref={resultsRef} className="space-y-4">
            <p className="rounded-lg bg-primary/5 px-3 py-2 text-sm text-foreground">
              {welcomeEmailSent
                ? "Check your inbox — we've sent a welcome email from Her Kadam with your subscription."
                : "You're subscribed to Her Kadam weekly updates."}
            </p>
            <p className="text-sm text-foreground">
              {totalMatches > 0
                ? `We found ${totalMatches} opportunit${totalMatches === 1 ? "y" : "ies"} matching your preferences.`
                : "No exact matches yet — explore all opportunities below."}
            </p>
            {results.length > 0 ? (
              <div className="grid max-h-[420px] gap-3 overflow-y-auto pr-1">
                {results.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} variant="compact" />
                ))}
              </div>
            ) : (
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/opportunities">
                  Browse all opportunities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" className="w-full" onClick={resetQuiz}>
              Take quiz again
            </Button>
          </div>
        )}

        {step !== "results" && (
          <div className="mt-5 flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={goBack}
              disabled={stepIndex === 0 || loading}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            {step === "email" ? (
              <Button
                type="button"
                size="sm"
                onClick={submitQuiz}
                disabled={!canContinue() || loading}
                className="gap-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Finding matches…
                  </>
                ) : (
                  <>
                    See my matches
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                onClick={goNext}
                disabled={!canContinue()}
                className="gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
