import { NextResponse } from "next/server"
import { sendContactMessage } from "@/lib/email/send-contact-message"

const VALID_SUBJECTS = new Set([
  "general",
  "opportunity",
  "partnership",
  "feedback",
  "support",
  "other",
])

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

  const { name, email, subject, message } = body as Record<string, unknown>

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 })
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  if (typeof subject !== "string" || !VALID_SUBJECTS.has(subject)) {
    return NextResponse.json({ error: "Please select a subject." }, { status: 400 })
  }

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 })
  }

  const result = await sendContactMessage({
    name: name.trim(),
    email: email.trim(),
    subject,
    message: message.trim(),
  })

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ sent: true })
}
