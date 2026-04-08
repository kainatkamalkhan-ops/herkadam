"use client"

import Link from "next/link"
import { HerKadamLogoMark, HerKadamWordmark } from "@/components/ui/brand/her-kadam-logo"
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/social-icons"

const footerLinks = {
  opportunities: [
    { label: "Scholarships", href: "/opportunities/type/scholarships" },
    { label: "Fellowships", href: "/opportunities/type/fellowships" },
    { label: "Jobs", href: "/opportunities/type/jobs" },
    { label: "Internships", href: "/opportunities/type/internships" },
    { label: "Grants", href: "/opportunities/type/grants" },
  ],
  regions: [
    { label: "Africa", href: "/opportunities/region/africa" },
    { label: "Asia", href: "/opportunities/region/asia" },
    { label: "Europe", href: "/opportunities/region/europe" },
    { label: "North America", href: "/opportunities/region/north-america" },
    { label: "Global", href: "/opportunities/region/global" },
  ],
  resources: [
    { label: "CV Writing Tips", href: "/resources/cv-tips" },
    { label: "Statement of Purpose", href: "/resources/sop-guide" },
    { label: "Interview Preparation", href: "/resources/interview-prep" },
    { label: "Application Guide", href: "/resources/application-guide" },
    { label: "Blog", href: "/blog" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
}

const socialLinks = [
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
  { icon: XIcon, href: "https://x.com", label: "X" },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Her Kadam — home">
              <HerKadamLogoMark variant="on-dark" size={40} className="w-10 h-10" />
              <HerKadamWordmark size="sm" variant="on-dark" />
            </Link>
            <p className="text-sm opacity-80 mb-6 max-w-xs">
              Every opportunity empowers her. Connecting women with life-changing opportunities in education, career, and leadership.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Opportunities</h4>
            <ul className="space-y-2">
              {footerLinks.opportunities.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-4">Regions</h4>
            <ul className="space-y-2">
              {footerLinks.regions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-70">
              &copy; {new Date().getFullYear()} Her Kadam. All rights reserved.
            </p>
            <p className="text-sm opacity-70">
              Every step forward empowers her journey.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
