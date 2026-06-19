import Image from "next/image"
import { cn } from "@/lib/utils"

const LOGO_WHITE = "/her-kadam-logo.png"
const LOGO_NAV_ICON = "/her-kadam-logo-nav.png"
const NAV_WORDMARK_HER = "/brand/nav-wordmark-her-kadam.png"
const NAV_KADAM_ORNAMENT = "/brand/nav-kadam-ornament.png"

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

export function HerKadamWordmark({
  className,
  size = "md",
}: {
  className?: string
  size?: "sm" | "md" | "lg"
}) {
  const herClip =
    size === "sm"
      ? "h-[1.3rem] md:h-[1.45rem] w-[2.4rem] md:w-[2.65rem]"
      : size === "lg"
        ? "h-[1.85rem] md:h-[2rem] w-[3.4rem] md:w-[3.75rem]"
        : "h-[1.5rem] md:h-[1.65rem] w-[2.75rem] md:w-[3rem]"

  const kadamHeight =
    size === "sm"
      ? "h-[1.15rem] md:h-[1.25rem]"
      : size === "lg"
        ? "h-[1.6rem] md:h-[1.75rem]"
        : "h-[1.25rem] md:h-[1.35rem]"

  return (
    <span className={cn("inline-flex flex-col items-start gap-0.5 leading-none", className)}>
      {/* "her" — serif mark from brand asset (top crop) */}
      <span className={cn("relative shrink-0 overflow-hidden", herClip)}>
        <Image
          src={NAV_WORDMARK_HER}
          alt=""
          width={160}
          height={72}
          priority
          className="absolute left-0 top-0 h-[4.25rem] w-auto max-w-none select-none"
          aria-hidden
        />
      </span>
      {/* "KADAM" + ornament from brand asset */}
      <Image
        src={NAV_KADAM_ORNAMENT}
        alt="Kadam"
        width={132}
        height={44}
        priority
        className={cn("w-auto object-contain object-left", kadamHeight)}
      />
    </span>
  )
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
      <span className={cn("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full", sizeClass, className)}>
        <Image
          src={LOGO_NAV_ICON}
          alt=""
          width={px}
          height={px}
          priority={priority}
          className="h-full w-full object-cover object-center scale-[1.12]"
          aria-hidden
        />
      </span>
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
