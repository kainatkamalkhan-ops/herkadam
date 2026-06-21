import { NextResponse } from "next/server"
import { subscribeUser } from "@/lib/subscribe-user"

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

  const email =
    body && typeof body === "object" && "email" in body && typeof body.email === "string"
      ? body.email
      : ""

  if (!email.trim() || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  const subscription = await subscribeUser(email.trim(), "newsletter")
  if (!subscription.ok) {
    return NextResponse.json({ error: subscription.error }, { status: 500 })
  }

  return NextResponse.json({
    subscribed: true,
    welcomeEmailSent: subscription.welcomeEmailSent,
  })
}
