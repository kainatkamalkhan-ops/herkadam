export const MAILERLITE_ACCOUNT_ID = "2460657"
export const MAILERLITE_POPUP_ID = "s96V4y"

declare global {
  interface Window {
    ml?: ((...args: unknown[]) => unknown) & { q?: unknown[][] }
  }
}

function callMailerLite(...args: unknown[]): void {
  if (typeof window === "undefined") return

  if (typeof window.ml !== "function") {
    window.ml = function (...queuedArgs: unknown[]) {
      ;(window.ml!.q = window.ml!.q || []).push(queuedArgs)
    } as Window["ml"]
  }

  window.ml!(...args)
}

export function showMailerLitePopup(): void {
  if (typeof window === "undefined") return

  const openPopup = () => {
    callMailerLite("account", MAILERLITE_ACCOUNT_ID)
    callMailerLite("show", MAILERLITE_POPUP_ID, true)
  }

  openPopup()
  window.setTimeout(openPopup, 500)
}
