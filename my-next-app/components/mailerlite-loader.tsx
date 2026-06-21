"use client"

import { useEffect } from "react"
import { injectMailerLiteScript } from "@/lib/mailerlite"

/** Ensures MailerLite loads even if the initial script tag was blocked. */
export function MailerLiteLoader() {
  useEffect(() => {
    injectMailerLiteScript()
  }, [])

  return null
}
