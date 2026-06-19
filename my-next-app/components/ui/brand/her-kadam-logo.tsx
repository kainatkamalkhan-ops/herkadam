import Image from "next/image"
import { cn } from "@/lib/utils"

const LOGO_WHITE = "/her-kadam-logo.png"
const NAV_FULL_LOGO = "/brand/nav-full-logo.png"
const NAV_LOGO_ICON = "/brand/nav-logo-icon.png"

type LogoSize = "xs" | "sm" | "md" | "nav" | "nav-icon" | "lg" | "xl" | "hero"

const sizeMap: Record<LogoSize, { px: number; className: string }> = {
  xs: { px: 40, className: "h-9 w-9" },
  sm: { px: 52, className: "h-11 w-11" },
  md: { px: 72, className: "h-14 w-14 md:h-[4.5rem] md:w-[4.5rem]" },
  "nav-icon": { px: 56, className: "h-10 w-10 md:h-11 md:w-11" },
  nav: { px: 128, className: "h-[3.875rem] w-[3.875rem] md:h-[4.875rem] md:w-[4.875rem]" },
  lg: { px: 180, className: "h-36 w-36 sm:h-40 sm:w-40" },
  xl: { px: 240, className: "h-44 w-44 sm:h-52 sm:w-52" },
  hero: { px: 280, className: "h-[min(16rem,42vw)] w-[min(16rem,42vw)] sm:h-56 sm:w-56 lg:h-64 lg:w-64" },
}

type HerKadamLogoProps = {
  className?: string
  size?: LogoSize
  priority?: boolean
  /**
   * nav-icon — footprint mark only (white strip)
   * hero-circle — radial blend into hero purple gradient
   * on-dark — footer plate
   */
  variant?: "default" | "nav" | "nav-icon" | "hero-circle" | "on-dark"
}

/** Full circular logo for the white nav strip */
export function HerKadamNavBrand({ className }: { className?: string }) {
  return (
    <span className={cn("nav-brand-lockup inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={NAV_FULL_LOGO}
        alt="Her Kadam"
        className="nav-brand-img nav-brand-full"
        draggable={false}
      />
    </span>
  )
}

/** @deprecated Use HerKadamNavBrand for the white header strip */
export function HerKadamWordmark({ className }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return <HerKadamNavBrand className={className} />
}

export function HerKadamLogo({
  className,
  size = "md",
  priority = false,
  variant = "default",
}: HerKadamLogoProps) {
  const resolvedSize: LogoSize = variant === "nav-icon" ? "nav-icon" : size
  const { px, className: sizeClass } = sizeMap[resolvedSize]

  if (variant === "nav-icon") {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={NAV_LOGO_ICON}
        alt=""
        className={cn("nav-brand-img nav-brand-item", className)}
        draggable={false}
        aria-hidden
      />
    )
  }

  if (variant === "nav") {
    return (
      <span className={cn("inline-flex shrink-0 items-center", className)}>
        <Image
          src={LOGO_WHITE}
          alt="Her Kadam"
          width={px}
          height={px}
          priority={priority}
          className={cn("object-contain", sizeClass)}
        />
      </span>
    )
  }

  if (variant === "hero-circle") {
    return (
      <span
        className={cn(
          "hero-logo-feather relative inline-flex shrink-0 items-center justify-center",
          sizeClass,
          className,
        )}
      >
        <span className="hero-logo-feather__glow" aria-hidden />
        <span className="hero-logo-feather__image-wrap">
          <Image
            src={LOGO_WHITE}
            alt="Her Kadam"
            width={px}
            height={px}
            priority={priority}
            className="hero-logo-feather__image h-full w-full scale-[1.16] object-cover object-center"
          />
        </span>
      </span>
    )
  }

  if (variant === "on-dark") {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 overflow-hidden rounded-full bg-white p-0 shadow-sm",
          sizeClass,
          className,
        )}
      >
        <Image
          src={LOGO_WHITE}
          alt="Her Kadam"
          width={px}
          height={px}
          className="h-full w-full scale-[1.1] object-cover object-center"
        />
      </span>
    )
  }

  return (
    <span className={className}>
      <Image
        src={LOGO_WHITE}
        alt="Her Kadam"
        width={px}
        height={px}
        priority={priority}
        className={cn("shrink-0 object-contain", sizeClass)}
      />
    </span>
  )
}
