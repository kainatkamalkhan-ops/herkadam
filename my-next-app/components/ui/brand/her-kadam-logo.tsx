import Image from "next/image"
import { cn } from "@/lib/utils"

const LOGO_WHITE = "/her-kadam-logo.png"
const NAV_LOGO_ICON = "/brand/nav-logo-icon.png"
const NAV_HER = "/brand/nav-her.png"
const NAV_KADAM = "/brand/nav-kadam.png"

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

/** White strip lockup: [icon] [HER] [KADAM] — plain img, no backgrounds */
export function HerKadamNavBrand({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 md:gap-3", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={NAV_LOGO_ICON}
        alt=""
        className="nav-brand-img h-10 w-auto shrink-0 md:h-11"
        draggable={false}
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={NAV_HER}
        alt=""
        className="nav-brand-img h-[1.35rem] w-auto shrink-0 md:h-[1.5rem]"
        draggable={false}
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={NAV_KADAM}
        alt=""
        className="nav-brand-img h-[1.35rem] w-auto shrink-0 md:h-[1.5rem]"
        draggable={false}
        aria-hidden
      />
    </span>
  )
}

/** @deprecated Use HerKadamNavBrand for the white header strip */
export function HerKadamWordmark({
  className,
  size = "md",
}: {
  className?: string
  size?: "sm" | "md" | "lg"
}) {
  const textHeight =
    size === "sm"
      ? "h-[1.35rem] md:h-[1.5rem]"
      : size === "lg"
        ? "h-[1.75rem] md:h-[2rem]"
        : "h-[1.45rem] md:h-[1.65rem]"

  return (
    <span className={cn("inline-flex items-center gap-2 md:gap-2.5", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={NAV_HER} alt="" className={cn("nav-brand-img w-auto shrink-0", textHeight)} draggable={false} aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={NAV_KADAM} alt="" className={cn("nav-brand-img w-auto shrink-0", textHeight)} draggable={false} aria-hidden />
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
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={NAV_LOGO_ICON}
        alt=""
        className={cn("nav-brand-img h-10 w-auto shrink-0 md:h-11", className)}
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
