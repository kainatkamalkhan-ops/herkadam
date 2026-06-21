export const MAILERLITE_POPUP_ID = "s96V4y"

declare global {
  interface Window {
    ml?: (...args: unknown[]) => void
  }
}

export function showMailerLitePopup(): void {
  if (typeof window !== "undefined" && typeof window.ml === "function") {
    window.ml("show", MAILERLITE_POPUP_ID, true)
  }
}
