import { getSupabaseAdmin } from "@/lib/supabase/admin"
import type { QuizLeadInput } from "@/lib/quiz-constants"

export type QuizLeadResult = { ok: true } | { ok: false; error: string }

export async function saveQuizLead(input: QuizLeadInput): Promise<QuizLeadResult> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return { ok: false, error: "Quiz storage is not configured." }
  }

  const { error } = await supabase.from("quiz_leads").insert({
    email: input.email.trim().toLowerCase(),
    opportunity_types: input.opportunityTypes,
    education_level: input.educationLevel,
    region: input.region,
    field_of_interest: input.fieldOfInterest,
  })

  if (error) {
    console.error("[quiz_leads] insert failed:", error.message)
    return { ok: false, error: "Could not save your responses. Please try again." }
  }

  return { ok: true }
}
