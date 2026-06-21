"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { paginationRange } from "@/lib/opportunity-pagination"
import { cn } from "@/lib/utils"

type OpportunitiesPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function OpportunitiesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: OpportunitiesPaginationProps) {
  if (totalPages <= 1) return null

  const pages = paginationRange(currentPage, totalPages)

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-1"
      aria-label="Opportunities pagination"
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9 px-2"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page, index) =>
        page === null ? (
          <span key={`gap-${index}`} className="px-1 text-muted-foreground">
            …
          </span>
        ) : (
          <Button
            key={page}
            type="button"
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            className={cn("h-9 min-w-9 px-2", page === currentPage && "pointer-events-none")}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9 px-2"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}
