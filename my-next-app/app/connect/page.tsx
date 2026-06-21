"use client"

import { useState } from "react"
import { Send, CheckCircle2, Loader2, ArrowRight } from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { COMMUNITY_SOCIAL_LINKS } from "@/lib/community-social-links"

export default function ConnectPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [subscribeLoading, setSubscribeLoading] = useState(false)
  const [subscribeError, setSubscribeError] = useState<string | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [welcomeEmailSent, setWelcomeEmailSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormLoading(true)
    setFormError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) {
        setFormError(data.error ?? "Something went wrong. Please try again.")
        return
      }
      setIsSubmitted(true)
    } catch {
      setFormError("Network error. Please try again.")
    } finally {
      setFormLoading(false)
    }
  }

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!subscribeEmail.trim()) return

    setSubscribeLoading(true)
    setSubscribeError(null)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscribeEmail.trim() }),
      })
      const data = (await res.json()) as { error?: string; welcomeEmailSent?: boolean }
      if (!res.ok) {
        setSubscribeError(data.error ?? "Something went wrong. Please try again.")
        return
      }
      setWelcomeEmailSent(Boolean(data.welcomeEmailSent))
      setIsSubscribed(true)
      setSubscribeEmail("")
    } catch {
      setSubscribeError("Network error. Please try again.")
    } finally {
      setSubscribeLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar showSocialIcons={false} />
      <Header />
      <main className="flex-1 bg-background">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Badge variant="secondary" className="mb-4">
              Connect
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Connect With Us
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Your next opportunity might start with a single message. Reach out, follow along, and let&apos;s take
              the next step together.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Your Name
                          </label>
                          <Input
                            id="name"
                            placeholder="Jane Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            disabled={formLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="jane@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            disabled={formLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell us how we can help..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          disabled={formLoading}
                        />
                      </div>

                      {formError && <p className="text-sm text-destructive">{formError}</p>}

                      <Button type="submit" size="lg" className="gap-2" disabled={formLoading}>
                        {formLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for connecting with us. We&apos;ll get back to you within 24 hours.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false)
                          setFormData({ name: "", email: "", message: "" })
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Join Our Community</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-2 gap-2">
                    {COMMUNITY_SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow Her Kadam on ${social.label}`}
                        className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-2 transition-colors hover:border-primary/15 hover:bg-primary/5"
                      >
                        <span className="min-w-0 flex-1 truncate text-xs font-medium text-foreground sm:text-sm">
                          {social.label}
                        </span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <social.icon className="h-3.5 w-3.5" />
                        </span>
                      </a>
                    ))}
                  </div>

                  <div className="border-t pt-5 space-y-3">
                    <p className="text-sm font-medium text-foreground">
                      Get new opportunities delivered to your inbox.
                    </p>
                    {!isSubscribed ? (
                      <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={subscribeEmail}
                          onChange={(e) => setSubscribeEmail(e.target.value)}
                          required
                          disabled={subscribeLoading}
                        />
                        <Button type="submit" className="gap-2" disabled={subscribeLoading}>
                          {subscribeLoading ? (
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
                      <p className="text-sm text-emerald-700">
                        {welcomeEmailSent
                          ? "You're subscribed! Check your inbox for a welcome email from Her Kadam."
                          : "You're subscribed to Her Kadam weekly updates."}
                      </p>
                    )}
                    {subscribeError && !isSubscribed && (
                      <p className="text-sm text-destructive">{subscribeError}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
