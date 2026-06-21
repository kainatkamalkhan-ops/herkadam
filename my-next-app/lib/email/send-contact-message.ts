const CONTACT_INBOX =
  process.env.CONTACT_INBOX_EMAIL?.trim() || "herkadamofficial@gmail.com"

export type ContactMessageInput = {
  name: string
  email: string
  message: string
}

export type SendContactResult = { ok: true } | { ok: false; error: string }

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

export async function sendContactMessage(input: ContactMessageInput): Promise<SendContactResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.RESEND_FROM_EMAIL?.trim()

  if (!apiKey || !from) {
    console.warn("[email] RESEND_API_KEY or RESEND_FROM_EMAIL not set — contact form disabled.")
    return { ok: false, error: "Contact form is temporarily unavailable. Please email us directly." }
  }

  const safeName = escapeHtml(input.name.trim())
  const safeEmail = escapeHtml(input.email.trim())
  const safeMessage = escapeHtml(input.message.trim()).replaceAll("\n", "<br />")

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: CONTACT_INBOX,
        reply_to: input.email.trim(),
        subject: `[Her Kadam Connect] Message from ${input.name.trim()}`,
        html: `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #2d1b3d; max-width: 560px; margin: 0 auto; padding: 24px;">
    <h1 style="font-size: 20px; margin-bottom: 16px;">New message from herkadam.com/connect</h1>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${safeMessage}</p>
  </body>
</html>
        `.trim(),
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error("[email] contact Resend error:", res.status, body)
      return { ok: false, error: "Could not send your message. Please try again." }
    }

    return { ok: true }
  } catch (err) {
    console.error("[email] contact send failed:", err)
    return { ok: false, error: "Could not send your message. Please try again." }
  }
}
