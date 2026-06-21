"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react"
import {
  OpportunityCard,
  type Opportunity,
} from "@/components/opportunities/opportunity-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  showTitle = true,
  theme = "light",
}: {
  showTitle?: boolean
  theme?: "light" | "gradient"
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

  const onGradient = theme === "gradient"
  const labelClass = onGradient ? "text-primary-foreground" : "text-foreground"
  const mutedClass = onGradient ? "text-primary-foreground/75" : "text-muted-foreground"
  const fieldClass = onGradient
    ? "rounded-lg border border-primary-foreground/25 bg-primary-foreground/95 text-foreground"
    : "rounded-lg border border-border bg-background text-foreground hover:border-primary/30"
  const fieldActiveClass = onGradient
    ? "border-primary-foreground bg-primary-foreground text-primary"
    : "border-primary bg-primary/5 text-foreground"
  const chipClass = (active: boolean) =>
    cn(
      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
      active
        ? onGradient
          ? "border-primary-foreground bg-primary-foreground text-primary"
          : "border-primary bg-primary text-primary-foreground"
        : onGradient
          ? "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:border-primary-foreground/50"
          : "border-border bg-background text-foreground hover:border-primary/40",
    )
  const selectClass = onGradient
    ? "flex h-10 w-full rounded-md border border-primary-foreground/25 bg-primary-foreground/95 px-3 text-sm text-foreground"
    : "flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
  const inputClass = onGradient
    ? "bg-primary-foreground/95 border-0 text-foreground placeholder:text-muted-foreground"
    : undefined
  const resultsBoxClass = onGradient
    ? "rounded-lg bg-primary-foreground/10 px-3 py-2 text-sm text-primary-foreground"
    : "rounded-lg bg-primary/5 px-3 py-2 text-sm text-foreground"
  const navGhostClass = onGradient
    ? "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
    : undefined
  const navPrimaryClass = onGradient ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" : undefined

  const quizBody = (
    <>
        {step !== "results" && (
          <p className={cn("mb-3 text-xs", mutedClass)}>
            Step {Math.min(stepIndex + 1, 4)} of 4
          </p>
        )}

        {step === "types" && (
          <fieldset className="space-y-2">
            <legend className={cn("mb-2 text-sm font-medium", labelClass)}>
              What are you looking for?
            </legend>
            <p className={cn("mb-2 text-xs", mutedClass)}>Select all that apply</p>
            <div className="flex flex-wrap gap-2">
              {QUIZ_OPPORTUNITY_TYPE_OPTIONS.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={chipClass(types.includes(type))}
                >
                  {type}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === "education" && (
          <fieldset className="space-y-2">
            <legend className={cn("mb-2 text-sm font-medium", labelClass)}>
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
                    educationLevel === level ? fieldActiveClass : fieldClass,
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
            <Label htmlFor="quiz-region" className={cn("text-sm font-medium", labelClass)}>
              Which region are you based in or interested in?
            </Label>
            <select
              id="quiz-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={selectClass}
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
            <Label htmlFor="quiz-field" className={cn("text-sm font-medium", labelClass)}>
              What field or sector interests you?
            </Label>
            <select
              id="quiz-field"
              value={fieldOfInterest}
              onChange={(e) => setFieldOfInterest(e.target.value)}
              className={selectClass}
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
            <p className={cn("text-sm", labelClass)}>
              Enter your email to see your personalized opportunities. You&apos;ll also be subscribed to Her Kadam weekly updates.
            </p>
            <div className="space-y-2">
              <Label htmlFor="quiz-email" className={labelClass}>
                Email address
              </Label>
              <Input
                id="quiz-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={inputClass}
              />
            </div>
            {error && (
              <p className={cn("text-sm", onGradient ? "text-primary-foreground" : "text-destructive")}>
                {error}
              </p>
            )}
          </div>
        )}

        {step === "results" && (
          <div ref={resultsRef} className="space-y-4">
            <p className={resultsBoxClass}>
              {welcomeEmailSent
                ? "Check your inbox — we've sent a welcome email from Her Kadam with your subscription."
                : "You're subscribed to Her Kadam weekly updates."}
            </p>
            <p className={cn("text-sm", labelClass)}>
              {totalMatches > 0
                ? `We found ${totalMatches} opportunit${totalMatches === 1 ? "y" : "ies"} matching your preferences.`
                : "No exact matches yet — explore all opportunities below."}
            </p>
            {results.length > 0 ? (
              <div className="grid max-h-[320px] gap-3 overflow-y-auto rounded-xl bg-background/95 p-2 pr-1 md:max-h-[420px]">
                {results.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} variant="compact" />
                ))}
              </div>
            ) : (
              <Button
                asChild
                variant={onGradient ? "secondary" : "outline"}
                size="sm"
                className="w-full"
              >
                <Link href="/opportunities">
                  Browse all opportunities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className={cn("w-full", navGhostClass)}
              onClick={resetQuiz}
            >
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
              className={cn("gap-1", navGhostClass)}
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
                className={cn("gap-1", navPrimaryClass)}
                variant={onGradient ? "secondary" : "default"}
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
                className={cn("gap-1", navPrimaryClass)}
                variant={onGradient ? "secondary" : "default"}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
    </>
  )

  if (onGradient) {
    return <div className="w-full">{quizBody}</div>
  }

  return (
    <Card className="h-full">
      {showTitle && (
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 font-serif text-xl">
            <Sparkles className="h-5 w-5 text-primary" aria-hidden />
            Find your match
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(!showTitle && "pt-6")}>{quizBody}</CardContent>
    </Card>
  )
}
