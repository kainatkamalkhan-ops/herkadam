export const MAILERLITE_ACCOUNT_ID = "2460657"
export const MAILERLITE_FORM_ID = "iCfJuP"
export const MAILERLITE_BOOTSTRAP_SRC = "/scripts/subscribe-popup.js"
export const SUBSCRIBE_PAGE_PATH = "/subscribe"

/** @deprecated Popup trigger — use SUBSCRIBE_PAGE_PATH links instead */
export const MAILERLITE_POPUP_ID = MAILERLITE_FORM_ID

declare global {
  interface Window {
    ml?: (...args: unknown[]) => unknown
  }
}

export function injectMailerLiteScript(): void {
  if (typeof window === "undefined") return
  if (typeof window.ml === "function") return
  if (document.getElementById("mailerlite-bootstrap")) return

  const script = document.createElement("script")
  script.id = "mailerlite-bootstrap"
  script.src = MAILERLITE_BOOTSTRAP_SRC
  script.async = false
  document.head.appendChild(script)
}
