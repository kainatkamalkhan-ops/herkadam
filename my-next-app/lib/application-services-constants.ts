export const HER_KADAM_INSTAGRAM_URL = "https://www.instagram.com/her.kadam/"
export const HER_KADAM_YOUTUBE_URL =
  process.env.NEXT_PUBLIC_HER_KADAM_YOUTUBE_URL?.trim() || "https://www.youtube.com/@herkadam"

/** Shown on Apply With Us — update when payment details are ready */
export const APPLICATION_PAYMENT_ACCOUNT_DETAILS =
  process.env.NEXT_PUBLIC_APPLICATION_PAYMENT_DETAILS?.trim() ||
  "Payment account details will be added here soon. Message Her Kadam on Instagram before paying if you need current transfer details."

export const APPLICATION_SERVICE_OPTIONS = [
  "CV Review — Rs 1,500",
  "Bachelor's Scholarship SOP Review — Rs 2,000",
  "Master's / PhD Scholarship SOP Review — Rs 3,500",
  "Research Proposal Feedback — Rs 5,000",
  "Conference / Fellowship SOP / Motivation Letter Review — Rs 1,000",
  "Recommendation Letter Guidance — Rs 1,200",
  "Two SOP Reviews Bundle — Rs 6,000",
  "CV + SOP Combo — Rs 4,500",
  "Full PhD Application Package — Rs 9,000",
  "Full Master's Application Package — Rs 5,500",
  "CV Creation (from scratch) — Rs 5,000",
] as const

export const CV_CREATION_SERVICE = "CV Creation (from scratch) — Rs 5,000"

export const RESEARCH_PROPOSAL_SERVICE = "Research Proposal Feedback — Rs 5,000"

export const PAYMENT_MEDIUM_OPTIONS = [
  "Bank Transfer",
  "Easypaisa",
  "JazzCash",
  "Other",
] as const

export const APPLICATION_SERVICE_STATUSES = [
  "submitted",
  "payment_reviewed",
  "in_progress",
  "delivered",
] as const

export type ApplicationServiceStatus = (typeof APPLICATION_SERVICE_STATUSES)[number]

export function isCvCreationService(service: string): boolean {
  return service === CV_CREATION_SERVICE
}

export function isResearchProposalService(service: string): boolean {
  return service === RESEARCH_PROPOSAL_SERVICE
}

export function daysUntilDeadline(deadline: string): number {
  const end = new Date(deadline)
  end.setHours(23, 59, 59, 999)
  return Math.ceil((end.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

export function computeDeadlineFlags(service: string, deadline: string) {
  const days = daysUntilDeadline(deadline)
  return {
    rushFeeApplies: days >= 0 && days < 3,
    needsTwoWeekNotice:
      (isCvCreationService(service) || isResearchProposalService(service)) &&
      days >= 0 &&
      days < 14,
  }
}
