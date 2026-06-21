export const MAILERLITE_ACCOUNT_ID = "2460657"
export const MAILERLITE_POPUP_ID = "s96V4y"
export const MAILERLITE_BOOTSTRAP_SRC = "/scripts/subscribe-popup.js"

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

export function showMailerLitePopup(event?: { preventDefault?: () => void }): void {
  event?.preventDefault?.()

  if (typeof window === "undefined") return

  injectMailerLiteScript()

  const openPopup = () => {
    if (typeof window.ml !== "function") return false
    window.ml("account", MAILERLITE_ACCOUNT_ID)
    window.ml("show", MAILERLITE_POPUP_ID, true)
    return true
  }

  if (openPopup()) return

  let attempts = 0
  const timer = window.setInterval(() => {
    attempts += 1
    if (openPopup() || attempts >= 25) {
      window.clearInterval(timer)
    }
  }, 200)
}
