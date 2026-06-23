"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { AlertTriangle, ExternalLink, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  APPLICATION_SERVICE_STATUSES,
  type ApplicationServiceStatus,
} from "@/lib/application-services-constants"
import type { ApplicationServiceRow } from "@/lib/application-services-admin"

const STATUS_LABELS: Record<ApplicationServiceStatus, string> = {
  submitted: "Submitted",
  payment_reviewed: "Payment reviewed",
  in_progress: "In progress",
  delivered: "Delivered",
}

function formatDate(value: string): string {
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return value
  }
}

function formatDateTime(value: string): string {
  try {
    return new Date(value).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return value
  }
}

export default function ApplicationServicesAdminPage() {
  const [submissions, setSubmissions] = useState<ApplicationServiceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [openingFile, setOpeningFile] = useState<string | null>(null)

  const loadSubmissions = useCallback(async () => {
    setLoading(true)
    setError("")
    const res = await fetch("/api/admin/application-services")
    const data = (await res.json()) as {
      submissions?: ApplicationServiceRow[]
      error?: string
    }
    setLoading(false)
    if (!res.ok) {
      setError(data.error ?? "Failed to load submissions.")
      return
    }
    setSubmissions(data.submissions ?? [])
  }, [])

  useEffect(() => {
    void loadSubmissions()
  }, [loadSubmissions])

  async function updateStatus(id: string, status: ApplicationServiceStatus) {
    setUpdatingId(id)
    const res = await fetch("/api/admin/application-services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    setUpdatingId(null)
    if (!res.ok) {
      const data = (await res.json()) as { error?: string }
      setError(data.error ?? "Failed to update status.")
      return
    }
    setSubmissions((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status } : row)),
    )
  }

  async function openFile(id: string, file: "document" | "payment_proof") {
    const key = `${id}-${file}`
    setOpeningFile(key)
    const res = await fetch(
      `/api/admin/application-services/${id}/files?file=${file}`,
    )
    const data = (await res.json()) as { url?: string; error?: string }
    setOpeningFile(null)
    if (!res.ok || !data.url) {
      setError(data.error ?? "Could not open file.")
      return
    }
    window.open(data.url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-muted/30 py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Her Kadam Admin</p>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Application service submissions
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => void loadSubmissions()} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/add-opportunity">Add opportunity</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/apply">View Apply page</Link>
            </Button>
          </div>
        </div>

        {error && (
          <p className="mb-4 text-sm text-destructive">{error}</p>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading submissions…
          </div>
        ) : submissions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No submissions yet.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((row) => (
              <Card key={row.id}>
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="font-serif text-lg">{row.full_name}</CardTitle>
                      <CardDescription>
                        {row.email} · WhatsApp: {row.whatsapp}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {row.rush_fee_applies && (
                        <Badge variant="outline" className="border-amber-500 text-amber-700">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Rush fee
                        </Badge>
                      )}
                      {row.needs_two_week_notice && (
                        <Badge variant="outline" className="border-amber-500 text-amber-700">
                          &lt; 2 weeks
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2 text-sm">
                    <p>
                      <span className="font-medium">Service:</span> {row.service_selected}
                    </p>
                    <p>
                      <span className="font-medium">Deadline:</span>{" "}
                      {formatDate(row.application_deadline)}
                    </p>
                    <p>
                      <span className="font-medium">Program:</span> {row.program_name}
                    </p>
                    {row.program_link && (
                      <p className="truncate">
                        <span className="font-medium">Link:</span>{" "}
                        <a
                          href={row.program_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          {row.program_link}
                        </a>
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Payment:</span> {row.payment_medium} —{" "}
                      {row.account_holder_name}
                    </p>
                    <p>
                      <span className="font-medium">Submitted:</span>{" "}
                      {formatDateTime(row.created_at)}
                    </p>
                  </div>

                  {row.documentation_folder_url && (
                    <p className="text-sm">
                      <span className="font-medium">Documentation folder:</span>{" "}
                      <a
                        href={row.documentation_folder_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-4 hover:underline break-all"
                      >
                        {row.documentation_folder_url}
                      </a>
                    </p>
                  )}

                  {row.additional_notes && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Notes:</span>{" "}
                      {row.additional_notes}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {row.document_path && (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={openingFile === `${row.id}-document`}
                        onClick={() => void openFile(row.id, "document")}
                      >
                        {openingFile === `${row.id}-document` ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <ExternalLink className="mr-2 h-4 w-4" />
                        )}
                        Open document
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={openingFile === `${row.id}-payment_proof`}
                      onClick={() => void openFile(row.id, "payment_proof")}
                    >
                      {openingFile === `${row.id}-payment_proof` ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <ExternalLink className="mr-2 h-4 w-4" />
                      )}
                      Open payment proof
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
                    <span className="text-sm font-medium">Status</span>
                    <Select
                      value={row.status}
                      onValueChange={(value) =>
                        void updateStatus(row.id, value as ApplicationServiceStatus)
                      }
                      disabled={updatingId === row.id}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {APPLICATION_SERVICE_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {STATUS_LABELS[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {updatingId === row.id && (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
