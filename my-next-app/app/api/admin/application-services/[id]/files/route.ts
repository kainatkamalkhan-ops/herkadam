import { NextResponse } from "next/server"
import { getApplicationServiceById } from "@/lib/application-services-admin"
import { createSignedFileUrl } from "@/lib/application-services-storage"

type Params = { params: Promise<{ id: string }> }

export async function GET(request: Request, { params }: Params) {
  const { id } = await params
  const { searchParams } = new URL(request.url)
  const file = searchParams.get("file")

  if (file !== "document" && file !== "payment_proof") {
    return NextResponse.json(
      { error: "Query param file must be document or payment_proof." },
      { status: 400 },
    )
  }

  const row = await getApplicationServiceById(id)
  if ("error" in row) {
    return NextResponse.json({ error: row.error }, { status: 404 })
  }

  const path =
    file === "document" ? row.document_path : row.payment_proof_path

  if (!path) {
    return NextResponse.json({ error: "File not available for this submission." }, { status: 404 })
  }

  const signed = await createSignedFileUrl(path)
  if ("error" in signed) {
    return NextResponse.json({ error: signed.error }, { status: 500 })
  }

  return NextResponse.json({ url: signed.url })
}
