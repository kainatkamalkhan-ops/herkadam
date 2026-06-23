import { NextResponse } from "next/server"
import { getApplicationServiceById } from "@/lib/application-services-admin"
import { createSignedFileUrl } from "@/lib/application-services-storage"

type Params = { params: Promise<{ id: string }> }

const FILE_KEYS = [
  "background_document",
  "review_document",
  "document",
  "payment_proof",
] as const

type FileKey = (typeof FILE_KEYS)[number]

export async function GET(request: Request, { params }: Params) {
  const { id } = await params
  const { searchParams } = new URL(request.url)
  const file = searchParams.get("file") as FileKey | null

  if (!file || !FILE_KEYS.includes(file)) {
    return NextResponse.json(
      {
        error:
          "Query param file must be background_document, review_document, document, or payment_proof.",
      },
      { status: 400 },
    )
  }

  const row = await getApplicationServiceById(id)
  if ("error" in row) {
    return NextResponse.json({ error: row.error }, { status: 404 })
  }

  const path =
    file === "payment_proof"
      ? row.payment_proof_path
      : file === "background_document"
        ? row.background_document_path
        : row.document_path

  if (!path) {
    return NextResponse.json({ error: "File not available for this submission." }, { status: 404 })
  }

  const signed = await createSignedFileUrl(path)
  if ("error" in signed) {
    return NextResponse.json({ error: signed.error }, { status: 500 })
  }

  return NextResponse.json({ url: signed.url })
}
