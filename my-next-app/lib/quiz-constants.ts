import { OPPORTUNITY_REGIONS } from "@/lib/opportunity-constants"

/** Quiz Q1 — same categories as homepage filter pills */
export const QUIZ_OPPORTUNITY_TYPE_OPTIONS = [
  "Scholarships",
  "Fellowships",
  "Jobs",
  "Internships",
  "Grants",
  "Others",
] as const

export const QUIZ_EDUCATION_LEVELS = [
  "Undergraduate",
  "Graduate",
  "PhD/Postdoc",
  "No formal requirement",
] as const

/** Quiz Q3 — canonical opportunity regions */
export const QUIZ_REGION_OPTIONS = [...OPPORTUNITY_REGIONS] as const

export const QUIZ_FIELD_OPTIONS = [
  "Peace & Conflict",
  "STEM",
  "Business",
  "Arts",
  "Health",
  "Education",
  "Other",
] as const

export type QuizAnswers = {
  opportunityTypes: string[]
  educationLevel: string
  region: string
  fieldOfInterest: string
}

export type QuizLeadInput = QuizAnswers & {
  email: string
}
