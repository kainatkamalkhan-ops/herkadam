import { markWelcomeEmailSent } from "@/lib/newsletter-subscribers"
import type { SubscriptionSource } from "@/lib/newsletter-subscribers"
import { OPPORTUNITY_TYPES_MARKETING_LIST } from "@/lib/opportunity-constants"

type WelcomeEmailOptions = {
  email: string
  source: SubscriptionSource
}

function getFromAddress(): string | null {
  const from = process.env.RESEND_FROM_EMAIL?.trim()
  return from || null
}

function buildWelcomeHtml(source: SubscriptionSource): string {
  const intro =
    source === "quiz"
      ? "Thanks for completing the Her Kadam opportunity quiz. You're now subscribed to our weekly updates."
      : "Thanks for subscribing to Her Kadam. You're now on our list for weekly opportunity updates."

  return `
<!DOCTYPE html>
<html>
  <body style="font-family: Georgia, 'Times New Roman', serif; line-height: 1.6; color: #2d1b3d; max-width: 560px; margin: 0 auto; padding: 24px;">
    <h1 style="color: #6b2d7a; font-size: 24px; margin-bottom: 8px;">Welcome to Her Kadam</h1>
    <p>${intro}</p>
    <p>Each week we share ${OPPORTUNITY_TYPES_MARKETING_LIST} for women across India and beyond.</p>
    <p style="margin-top: 24px;">
      <a href="https://www.herkadam.com/opportunities" style="background: #6b2d7a; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 999px; display: inline-block;">
        Browse opportunities
      </a>
    </p>
    <p style="font-size: 14px; color: #666; margin-top: 32px;">
      You're receiving this because you signed up at herkadam.com. We'll only send helpful updates — no spam.
    </p>
    <p style="font-size: 14px; color: #666;">— The Her Kadam team</p>
  </body>
</html>
`.trim()
}

export type SendWelcomeResult = { ok: true } | { ok: false; error: string }

export async function sendSubscriptionWelcomeEmail(
  options: WelcomeEmailOptions,
): Promise<SendWelcomeResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = getFromAddress()

  if (!apiKey || !from) {
    console.warn("[email] RESEND_API_KEY or RESEND_FROM_EMAIL not set — skipping welcome email.")
    return { ok: false, error: "Email service is not configured." }
  }

  const subject =
    options.source === "quiz"
      ? "Your Her Kadam quiz results + weekly updates"
      : "Welcome to Her Kadam — you're subscribed"

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: options.email.trim().toLowerCase(),
        subject,
        html: buildWelcomeHtml(options.source),
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error("[email] Resend error:", res.status, body)
      return { ok: false, error: "Could not send welcome email." }
    }

    await markWelcomeEmailSent(options.email)
    return { ok: true }
  } catch (err) {
    console.error("[email] send failed:", err)
    return { ok: false, error: "Could not send welcome email." }
  }
}
