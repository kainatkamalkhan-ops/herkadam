"use client"

import { useState } from "react"
import Link from "next/link"
import { HerKadamLogoMark, HerKadamWordmark } from "@/components/ui/brand/her-kadam-logo"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const opportunitiesDropdown = {
  byType: [
    { label: "Scholarships", href: "/opportunities?type=scholarships" },
    { label: "Fellowships", href: "/opportunities?type=fellowships" },
    { label: "Jobs", href: "/opportunities?type=jobs" },
    { label: "Internships", href: "/opportunities?type=internships" },
    { label: "Grants", href: "/opportunities?type=grants" },
    { label: "Conferences", href: "/opportunities?type=conferences" },
  ],
  byRegion: [
    { label: "Africa", href: "/opportunities?region=africa" },
    { label: "Asia", href: "/opportunities?region=asia" },
    { label: "Europe", href: "/opportunities?region=europe" },
    { label: "North America", href: "/opportunities?region=north-america" },
    { label: "South America", href: "/opportunities?region=south-america" },
    { label: "Oceania", href: "/opportunities?region=oceania" },
    { label: "Global", href: "/opportunities?region=global" },
  ],
  byFunding: [
    { label: "Fully Funded", href: "/opportunities?funding=fully-funded" },
    { label: "Partially Funded", href: "/opportunities?funding=partially-funded" },
    { label: "Self Funded", href: "/opportunities?funding=self-funded" },
  ],
}

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-card/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 md:gap-3"
            aria-label="Her Kadam — home"
          >
            <HerKadamLogoMark size={40} className="w-9 h-9 md:w-11 md:h-11" />
            <div className="hidden sm:block">
              <HerKadamWordmark size="md" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* About - First Link */}
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>

            {/* Opportunities Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1 font-medium">
                  Opportunities
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/opportunities" className="font-medium">All Opportunities</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">By Type</div>
                {opportunitiesDropdown.byType.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">By Region</div>
                {opportunitiesDropdown.byRegion.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">By Funding</div>
                {opportunitiesDropdown.byFunding.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Other Links (skip About since it's first) */}
            {navLinks.filter(link => link.label !== "About").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Subscribe Button */}
            <Button asChild className="ml-2">
              <Link href="#subscribe">Subscribe</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              
              {/* Opportunities Section */}
              <div className="py-2">
                <Link
                  href="/opportunities"
                  className="px-4 py-2 text-sm font-semibold text-foreground hover:text-primary block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Opportunities
                </Link>
                <p className="px-4 text-xs font-semibold text-muted-foreground mt-2 mb-1">By Type</p>
                <div className="pl-4 flex flex-col gap-1">
                  {opportunitiesDropdown.byType.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-4 py-1.5 text-sm text-foreground hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <p className="px-4 text-xs font-semibold text-muted-foreground mt-2 mb-1">By Region</p>
                <div className="pl-4 flex flex-col gap-1">
                  {opportunitiesDropdown.byRegion.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-4 py-1.5 text-sm text-foreground hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.filter(link => link.label !== "About").map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="px-4 pt-2">
                <Button asChild className="w-full">
                  <Link href="#subscribe" onClick={() => setMobileMenuOpen(false)}>Subscribe</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
