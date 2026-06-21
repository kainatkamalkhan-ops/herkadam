"use client"

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TikTokIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/social-icons"

/** Placeholder entries — replace href when profile URLs are ready */
const socialLinks = [
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon, label: "Facebook" },
  { icon: LinkedinIcon, label: "LinkedIn" },
  { icon: XIcon, label: "X" },
  { icon: YoutubeIcon, label: "YouTube" },
  { icon: TikTokIcon, label: "TikTok" },
]

type TopBarProps = {
  /** When false, renders the purple strip only (no social icons). */
  showSocialIcons?: boolean
}

export function TopBar({ showSocialIcons = true }: TopBarProps) {
  return (
    <div className="bg-primary text-primary-foreground">
      <div
        className="container mx-auto px-4 py-2"
        aria-hidden={!showSocialIcons}
      >
        {showSocialIcons ? (
          <div className="flex items-center justify-center gap-3 sm:gap-3.5">
            {socialLinks.map((social) => (
              <span
                key={social.label}
                className="opacity-90"
                aria-label={social.label}
                title={`${social.label} — link coming soon`}
              >
                <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
            ))}
          </div>
        ) : (
          <div className="h-4 sm:h-5" aria-hidden />
        )}
      </div>
    </div>
  )
}
