import type { ComponentType } from "react"
import {
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  SubstackIcon,
  TelegramIcon,
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
 *        → WhatsApp → Telegram → Pinterest → Substack → Discord → Reddit
 */
export const COMMUNITY_SOCIAL_LINKS: CommunitySocialLink[] = [
  { label: "Instagram", href: "#", icon: InstagramIcon }, // TODO: Instagram URL
  { label: "Facebook", href: "#", icon: FacebookIcon }, // TODO: Facebook URL
  { label: "LinkedIn", href: "#", icon: LinkedinIcon }, // TODO: LinkedIn URL
  { label: "Threads", href: "#", icon: ThreadsIcon }, // TODO: Threads URL
  { label: "X", href: "#", icon: XIcon }, // TODO: X URL
  { label: "YouTube", href: "#", icon: YoutubeIcon }, // TODO: YouTube URL
  { label: "TikTok", href: "#", icon: TikTokIcon }, // TODO: TikTok URL
  { label: "WhatsApp", href: "#", icon: WhatsAppIcon }, // TODO: WhatsApp URL
  { label: "Telegram", href: "#", icon: TelegramIcon }, // TODO: Telegram URL
  { label: "Pinterest", href: "#", icon: PinterestIcon }, // TODO: Pinterest URL
  { label: "Substack", href: "#", icon: SubstackIcon }, // TODO: Substack URL
  { label: "Discord", href: "#", icon: DiscordIcon }, // TODO: Discord URL
  { label: "Reddit", href: "#", icon: RedditIcon }, // TODO: Reddit URL
]
