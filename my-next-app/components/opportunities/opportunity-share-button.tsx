"use client"

import { useState } from "react"
import { Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

type OpportunityShareButtonProps = {
  title: string
  path: string
  className?: string
}

export function OpportunityShareButton({ title, path, className }: OpportunityShareButtonProps) {
  const [copied, setCopied] = useState(false)

  function shareUrl() {
    if (typeof window === "undefined") return `https://www.herkadam.com${path}`
    return `${window.location.origin}${path}`
  }

  async function handleShare() {
    const url = shareUrl()
    const shareData = {
      title: `${title} | Her Kadam`,
      text: `Check out this opportunity on Her Kadam: ${title}`,
      url,
    }

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt("Copy this link:", url)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className={className ?? "w-full gap-2"}
      onClick={handleShare}
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Link copied" : "Share"}
    </Button>
  )
}
