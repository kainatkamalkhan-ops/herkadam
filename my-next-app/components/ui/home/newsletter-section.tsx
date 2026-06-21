"use client"

import { useState } from "react"
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [welcomeEmailSent, setWelcomeEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
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
      const data = (await res.json()) as { error?: string; welcomeEmailSent?: boolean }
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.")
        return
      }
      setWelcomeEmailSent(Boolean(data.welcomeEmailSent))
      setIsSubscribed(true)
      setEmail("")
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="subscribe" className="py-16 md:py-24 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-plum-light to-rose">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 border-[3px] border-primary-foreground/10 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 border-[3px] border-primary-foreground/10 rounded-full" />
            <div className="absolute top-1/2 right-1/4 w-20 h-20 border-[2px] border-primary-foreground/10 rounded-full" />
          </div>

          <div className="relative px-6 py-12 md:px-12 md:py-16 lg:px-20">
            <div className="max-w-3xl mx-auto text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm mb-6">
                <Mail className="h-8 w-8 text-primary-foreground" />
              </div>

              {/* Headline */}
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 text-balance">
                Never Miss an Opportunity
              </h2>

              {/* Description */}
              <p className="text-lg text-primary-foreground/85 mb-8 max-w-xl mx-auto">
                Get the latest scholarships, fellowships, and career opportunities delivered straight to your inbox every week.
              </p>

              {/* Form */}
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 bg-primary-foreground/95 border-0 text-foreground placeholder:text-muted-foreground"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    variant="secondary"
                    className="h-12 px-8 gap-2 shrink-0"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Subscribing…
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="flex items-center justify-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-6 py-4 max-w-md mx-auto">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-primary-foreground font-medium">
                    {welcomeEmailSent
                      ? "Thank you for subscribing! Check your inbox for a welcome email from Her Kadam."
                      : "Thank you for subscribing! You're on our weekly updates list."}
                  </p>
                </div>
              )}

              {error && !isSubscribed && (
                <p className="text-sm text-primary-foreground/90 mt-3">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
