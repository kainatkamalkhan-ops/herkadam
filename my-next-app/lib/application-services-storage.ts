import { randomUUID } from "crypto"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export const APPLICATION_SUBMISSIONS_BUCKET = "application-submissions"

const MAX_FILE_BYTES = 10 * 1024 * 1024

const DOCUMENT_MIME_TYPES = new Set([
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
])

const PAYMENT_PROOF_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
])

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "file"
}

export async function uploadApplicationFile(
  file: File,
  kind: "background_document" | "review_document" | "payment_proof",
): Promise<{ path: string } | { error: string }> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return {
      error:
        "File storage is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    }
  }

  if (file.size > MAX_FILE_BYTES) {
    return { error: "Each file must be 10 MB or smaller." }
  }

  const allowed =
    kind === "payment_proof" ? PAYMENT_PROOF_MIME_TYPES : DOCUMENT_MIME_TYPES
  const mime = file.type || "application/octet-stream"
  if (!allowed.has(mime)) {
    return {
      error:
        kind === "payment_proof"
          ? "Upload payment proof as JPG, PNG, WebP, or PDF."
          : "Upload a Word document (.doc, .docx) or PDF.",
    }
  }

  const prefix =
    kind === "background_document"
      ? "background-documents"
      : kind === "review_document"
        ? "review-documents"
        : "payment-proofs"
  const path = `${prefix}/${randomUUID()}-${sanitizeFilename(file.name)}`

  const buffer = Buffer.from(await file.arrayBuffer())
  const { error } = await supabase.storage
    .from(APPLICATION_SUBMISSIONS_BUCKET)
    .upload(path, buffer, { contentType: mime, upsert: false })

  if (error) {
    return { error: error.message || "Failed to upload file." }
  }

  return { path }
}

export async function createSignedFileUrl(
  path: string,
  expiresInSeconds = 3600,
): Promise<{ url: string } | { error: string }> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return { error: "Supabase admin client is not configured." }
  }

  const { data, error } = await supabase.storage
    .from(APPLICATION_SUBMISSIONS_BUCKET)
    .createSignedUrl(path, expiresInSeconds)

  if (error || !data?.signedUrl) {
    return { error: error?.message || "Could not generate download link." }
  }

  return { url: data.signedUrl }
}
