"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { HerKadamLogo } from "@/components/ui/brand/her-kadam-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.")
        return
      }
      setSubscribed(true)
      setEmail("")
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Link href="/" className="mb-6 inline-flex" aria-label="Her Kadam — home">
            <HerKadamLogo size="xl" variant="on-dark" />
          </Link>

          <h2 className="font-serif text-2xl font-bold mb-4">Her Kadam</h2>

          <p className="text-sm leading-relaxed opacity-90 md:text-base">
            Her Kadam, meaning every step, is a global gateway connecting young women everywhere to
            scholarships, fellowships, jobs, and leadership opportunities, because access, once visible,
            becomes transformative.
          </p>

          <div className="mt-8 w-full max-w-md">
            {subscribed ? (
              <p className="text-sm font-medium opacity-95">
                Thank you for subscribing to our newsletter.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="h-11 border-0 bg-primary-foreground/95 text-foreground placeholder:text-muted-foreground"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="h-11 shrink-0 gap-2 px-6"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Subscribing…
                    </>
                  ) : (
                    <>
                      Subscribe to Newsletter
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
            {error && !subscribed && (
              <p className="mt-2 text-sm text-primary-foreground/90">{error}</p>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center">
          <p className="text-sm opacity-70">
            &copy; {new Date().getFullYear()} Her Kadam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
