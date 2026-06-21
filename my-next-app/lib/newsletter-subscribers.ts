import { getSupabaseAdmin } from "@/lib/supabase/admin"

export type SubscriptionSource = "quiz" | "newsletter"

export type SubscribeResult =
  | { ok: true; isNew: boolean; shouldSendWelcome: boolean }
  | { ok: false; error: string }

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export async function subscribeEmail(
  email: string,
  source: SubscriptionSource,
): Promise<SubscribeResult> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return { ok: false, error: "Subscription storage is not configured." }
  }

  const normalized = normalizeEmail(email)

  const { data: existing, error: lookupError } = await supabase
    .from("newsletter_subscribers")
    .select("id, welcome_email_sent_at")
    .eq("email", normalized)
    .maybeSingle()

  if (lookupError) {
    console.error("[newsletter_subscribers] lookup failed:", lookupError.message)
    return { ok: false, error: "Could not save your subscription. Please try again." }
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from("newsletter_subscribers")
      .update({ source })
      .eq("id", existing.id)

    if (updateError) {
      console.error("[newsletter_subscribers] update failed:", updateError.message)
      return { ok: false, error: "Could not save your subscription. Please try again." }
    }

    return {
      ok: true,
      isNew: false,
      shouldSendWelcome: !existing.welcome_email_sent_at,
    }
  }

  const { error: insertError } = await supabase.from("newsletter_subscribers").insert({
    email: normalized,
    source,
  })

  if (insertError) {
    console.error("[newsletter_subscribers] insert failed:", insertError.message)
    return { ok: false, error: "Could not save your subscription. Please try again." }
  }

  return { ok: true, isNew: true, shouldSendWelcome: true }
}

export async function markWelcomeEmailSent(email: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({ welcome_email_sent_at: new Date().toISOString() })
    .eq("email", normalizeEmail(email))

  if (error) {
    console.error("[newsletter_subscribers] welcome timestamp failed:", error.message)
  }
}
