import { NextResponse } from "next/server"
import { getOpportunities } from "@/lib/opportunities"
import { filterOpportunitiesByQuiz } from "@/lib/quiz-filter"
import {
  QUIZ_EDUCATION_LEVELS,
  QUIZ_FIELD_OPTIONS,
  QUIZ_OPPORTUNITY_TYPE_OPTIONS,
  QUIZ_REGION_OPTIONS,
} from "@/lib/quiz-constants"
import { saveQuizLead } from "@/lib/quiz-leads"
import { subscribeUser } from "@/lib/subscribe-user"

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const {
    email,
    opportunityTypes,
    educationLevel,
    region,
    fieldOfInterest,
  } = body as Record<string, unknown>

  if (!isNonEmptyString(email) || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  if (!Array.isArray(opportunityTypes) || opportunityTypes.length === 0) {
    return NextResponse.json({ error: "Select at least one opportunity type." }, { status: 400 })
  }

  const normalizedTypes = opportunityTypes.filter(
    (t): t is string =>
      typeof t === "string" &&
      (QUIZ_OPPORTUNITY_TYPE_OPTIONS as readonly string[]).includes(t),
  )

  if (!normalizedTypes.length) {
    return NextResponse.json({ error: "Invalid opportunity types." }, { status: 400 })
  }

  if (
    !isNonEmptyString(educationLevel) ||
    !(QUIZ_EDUCATION_LEVELS as readonly string[]).includes(educationLevel)
  ) {
    return NextResponse.json({ error: "Invalid education level." }, { status: 400 })
  }

  if (!isNonEmptyString(region) || !(QUIZ_REGION_OPTIONS as readonly string[]).includes(region)) {
    return NextResponse.json({ error: "Invalid region." }, { status: 400 })
  }

  if (
    !isNonEmptyString(fieldOfInterest) ||
    !(QUIZ_FIELD_OPTIONS as readonly string[]).includes(fieldOfInterest)
  ) {
    return NextResponse.json({ error: "Invalid field of interest." }, { status: 400 })
  }

  const lead = await saveQuizLead({
    email: email.trim(),
    opportunityTypes: normalizedTypes,
    educationLevel,
    region,
    fieldOfInterest,
  })

  if (!lead.ok) {
    return NextResponse.json({ error: lead.error }, { status: 500 })
  }

  const subscription = await subscribeUser(email.trim(), "quiz")
  if (!subscription.ok) {
    return NextResponse.json({ error: subscription.error }, { status: 500 })
  }

  const all = await getOpportunities()
  const matches = filterOpportunitiesByQuiz(all, {
    opportunityTypes: normalizedTypes,
    region,
  })

  return NextResponse.json({
    opportunities: matches.slice(0, 6),
    total: matches.length,
    subscribed: true,
    welcomeEmailSent: subscription.welcomeEmailSent,
  })
}
