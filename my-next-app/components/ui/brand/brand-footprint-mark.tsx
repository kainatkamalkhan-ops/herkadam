import { cn } from "@/lib/utils"

/** Light → medium → dark plum, matching logo footprint trail (bottom to top). */
export const BRAND_FOOTPRINT_COLORS = ["#D399C2", "#914E86", "#5D245F"] as const

const SIZE_CLASS = [
  "h-7 w-7 sm:h-[1.85rem] sm:w-[1.85rem]",
  "h-9 w-9 sm:h-10 sm:w-10",
  "h-11 w-11 sm:h-12 sm:w-12",
] as const

/**
 * Logo footprint: teardrop sole, four toe dots (big toe largest), heel swoosh.
 * Default orientation — toes up, slight lean up-right (~22°).
 */
export function BrandFootprintMark({
  color,
  sizeIndex = 1,
  className,
}: {
  color: string
  sizeIndex?: 0 | 1 | 2
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 48 58"
      className={cn(SIZE_CLASS[sizeIndex], className)}
      aria-hidden
    >
      <g fill={color}>
        <path d="M24 13c-7 0-12 5-12.5 11.5-.4 5.5 2 12.5 10.5 22.5 1.1 1.3 2.2 1.3 2.2 1.3s1.1 0 2.2-1.3c8.5-10 10.9-17 10.5-22.5-.5-6.5-5.5-11.5-12.5-11.5z" />
        <circle cx="16.5" cy="19.5" r="2.6" />
        <circle cx="20.8" cy="15.8" r="3" />
        <circle cx="26.2" cy="15.8" r="2.85" />
        <circle cx="30.5" cy="19.5" r="2.3" />
      </g>
      <path
        d="M20 47.5c-3 3.5-6.5 6-10.5 7.5"
        stroke={color}
        strokeWidth="1.35"
        fill="none"
        strokeLinecap="round"
        opacity={0.75}
      />
    </svg>
  )
}
