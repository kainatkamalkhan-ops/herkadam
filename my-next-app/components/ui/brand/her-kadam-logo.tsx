import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  size?: number
  /** Light strokes on dark backgrounds (e.g. primary footer) */
  variant?: "default" | "on-dark"
}

/**
 * Mark: two footsteps climbing forward — “her kadam” (her steps).
 * Uses currentColor for header (primary) and footer (on-dark).
 */
export function HerKadamLogoMark({ className, size = 44, variant = "default" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={cn(
        "shrink-0 text-primary",
        variant === "on-dark" && "text-primary-foreground",
        className
      )}
      aria-hidden
    >
      {/* Rear foot — lower left, softer */}
      <g opacity={0.55}>
        <path
          fill="currentColor"
          d="M9 34.5c0-3.2 2.4-5.8 5.5-6.2 1.4-.2 2.8.1 4 .8 1.9 1.1 3 3.2 2.8 5.4-.2 2.5-2.2 4.5-4.7 4.7h-.6c-3.5 0-6.3-2.5-7-5.7z"
        />
        <circle cx="16.5" cy="27" r="2.1" fill="currentColor" />
        <circle cx="19.8" cy="25.2" r="1.65" fill="currentColor" />
        <circle cx="23.2" cy="24.2" r="1.45" fill="currentColor" />
      </g>
      {/* Front foot — upper right, leading step */}
      <g>
        <path
          fill="currentColor"
          d="M22.5 22.2c.6-3.1 3.5-5.1 6.6-4.5 1.4.3 2.6 1.1 3.4 2.3 1.3 2 1.1 4.6-.6 6.3-1.5 1.5-3.8 2-5.9 1.2l-.5-.2c-3.2-1.2-4.8-4.5-3-7.1z"
        />
        <circle cx="30.5" cy="16.2" r="2.35" fill="currentColor" />
        <circle cx="34.4" cy="15" r="1.85" fill="currentColor" />
        <circle cx="38" cy="15.2" r="1.55" fill="currentColor" />
      </g>
      {/* Subtle arc: path upward */}
      <path
        d="M10 40c6-10 16-18 28-22"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.28}
      />
    </svg>
  )
}

type WordmarkProps = {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "on-dark"
}

export function HerKadamWordmark({ className, size = "md", variant = "default" }: WordmarkProps) {
  const sizeClass =
    size === "sm" ? "text-lg md:text-xl" : size === "lg" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"

  if (variant === "on-dark") {
    return (
      <span className={cn("font-brand leading-none tracking-tight", sizeClass, className)}>
        <span className="font-semibold text-black">Her</span>
        <span className="font-semibold text-white"> Kadam</span>
      </span>
    )
  }

  return (
    <span className={cn("font-brand leading-none tracking-tight", sizeClass, className)}>
      <span className="font-semibold text-foreground">Her</span>
      <span className="font-semibold text-primary"> Kadam</span>
    </span>
  )
}
