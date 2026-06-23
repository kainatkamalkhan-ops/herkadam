import type { ComponentType } from "react"
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  PinterestIcon,
  ThreadsIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/social-icons"

export type CommunitySocialLink = {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
}

/**
 * Replace each "#" placeholder with your live profile URL.
 * Order: Instagram → Facebook → LinkedIn → Threads → X → YouTube → TikTok
 *        → WhatsApp → Pinterest
 */
export const COMMUNITY_SOCIAL_LINKS: CommunitySocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/her.kadam/", icon: InstagramIcon }, // TODO: Instagram URL
  { label: "Facebook", href: "#", icon: FacebookIcon }, // TODO: Facebook URL
  { label: "LinkedIn", href: "#", icon: LinkedinIcon }, // TODO: LinkedIn URL
  { label: "Threads", href: "#", icon: ThreadsIcon }, // TODO: Threads URL
  { label: "X", href: "#", icon: XIcon }, // TODO: X URL
  { label: "YouTube", href: "#", icon: YoutubeIcon }, // TODO: YouTube URL
  { label: "TikTok", href: "#", icon: TikTokIcon }, // TODO: TikTok URL
  { label: "WhatsApp", href: "#", icon: WhatsAppIcon }, // TODO: WhatsApp URL
  { label: "Pinterest", href: "#", icon: PinterestIcon }, // TODO: Pinterest URL
]
