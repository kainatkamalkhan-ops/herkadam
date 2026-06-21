export const OPPORTUNITIES_PAGE_SIZE = 30

export function parsePageParam(value: string | null | undefined): number {
  const n = parseInt(value ?? "1", 10)
  if (!Number.isFinite(n) || n < 1) return 1
  return n
}

export function totalPages(count: number, pageSize = OPPORTUNITIES_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(count / pageSize))
}

export function slicePage<T>(items: T[], page: number, pageSize = OPPORTUNITIES_PAGE_SIZE): T[] {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}

/** Page numbers to show (1-based), with ellipsis gaps as null */
export function paginationRange(current: number, total: number): (number | null)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages: (number | null)[] = [1]
  if (current > 3) pages.push(null)
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p)
  }
  if (current < total - 2) pages.push(null)
  pages.push(total)
  return pages
}
