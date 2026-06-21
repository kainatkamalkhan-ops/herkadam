"use client"

import Link from "next/link"
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  ThreadsIcon,
  TikTokIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/social-icons"

/** Placeholder hrefs — replace when profile URLs are ready */
const socialLinks = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: ThreadsIcon, href: "#", label: "Threads" },
  { icon: XIcon, href: "#", label: "X" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
  { icon: TikTokIcon, href: "#", label: "TikTok" },
]

export function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-center px-4 py-2">
        <div className="flex items-center gap-3 sm:gap-3.5">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-opacity hover:opacity-80"
              aria-label={social.label}
            >
              <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
