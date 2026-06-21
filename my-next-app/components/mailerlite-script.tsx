import Script from "next/script"

export function MailerLiteScript() {
  return (
    <Script
      id="mailerlite-universal"
      src="/scripts/mailerlite-universal.js"
      strategy="afterInteractive"
    />
  )
}
