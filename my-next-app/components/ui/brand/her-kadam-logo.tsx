import Image from "next/image"
import { cn } from "@/lib/utils"

const LOGO_WHITE = "/her-kadam-logo.png"

type LogoSize = "xs" | "sm" | "md" | "nav" | "lg" | "xl" | "hero"

const sizeMap: Record<LogoSize, { px: number; className: string }> = {
  xs: { px: 40, className: "h-9 w-9" },
  sm: { px: 52, className: "h-11 w-11" },
  md: { px: 72, className: "h-14 w-14 md:h-[4.5rem] md:w-[4.5rem]" },
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
   * nav — white-bg circular PNG, blends into white header strip
   * hero-circle — white-bg PNG, tight circular crop on hero
   * on-dark — footer plate
   */
  variant?: "default" | "nav" | "hero-circle" | "on-dark"
}

export function HerKadamLogo({
  className,
  size = "md",
  priority = false,
  variant = "default",
}: HerKadamLogoProps) {
  const { px, className: sizeClass } = sizeMap[size]

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
          className
        )}
      >
        <span className="hero-logo-feather__white" aria-hidden />
        <span className="hero-logo-feather__purple" aria-hidden />
        <span className="hero-logo-feather__image-wrap">
          <Image
            src={LOGO_WHITE}
            alt="Her Kadam"
            width={px}
            height={px}
            priority={priority}
            className="h-full w-full scale-[1.18] object-cover object-center"
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
          className
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
