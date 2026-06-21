"use client"

import { useEffect } from "react"
import { injectMailerLiteScript, MAILERLITE_FORM_ID } from "@/lib/mailerlite"

export function MailerLiteEmbeddedForm() {
  useEffect(() => {
    injectMailerLiteScript()
  }, [])

  return (
    <div
      className="ml-embedded min-h-[280px] w-full"
      data-form={MAILERLITE_FORM_ID}
    />
  )
}
