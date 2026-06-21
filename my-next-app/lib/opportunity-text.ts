/** Parse newline-separated textarea input into display bullets. */
export function linesToBulletList(text?: string | null): string[] {
  if (!text?.trim()) return []
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-•*]\s*/, ""))
}

/** Normalize textarea bullets for storage (trim lines, drop empties). */
export function normalizeBulletText(text?: string): string | null {
  const lines = linesToBulletList(text)
  if (!lines.length) return null
  return lines.join("\n")
}

export function benefitsSectionTitle(fundingType: string): string {
  if (fundingType === "Self-Funded") return "Program Benefits"
  return "Financial Benefits"
}

export function formatOpportunityDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
