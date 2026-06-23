import { NextResponse } from "next/server"
import {
  PAYMENT_MEDIUM_OPTIONS,
  computeDeadlineFlags,
  isCvCreationService,
} from "@/lib/application-services-constants"
import { createApplicationService } from "@/lib/application-services-admin"
import { uploadApplicationFile } from "@/lib/application-services-storage"

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 })
  }

  const fullName = String(formData.get("fullName") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const whatsapp = String(formData.get("whatsapp") ?? "").trim()
  const serviceSelected = String(formData.get("serviceSelected") ?? "").trim()
  const programName = String(formData.get("programName") ?? "").trim()
  const programLink = String(formData.get("programLink") ?? "").trim()
  const applicationDeadline = String(formData.get("applicationDeadline") ?? "").trim()
  const documentationFolderUrl = String(formData.get("documentationFolderUrl") ?? "").trim()
  const accountHolderName = String(formData.get("accountHolderName") ?? "").trim()
  const paymentMedium = String(formData.get("paymentMedium") ?? "").trim()
  const additionalNotes = String(formData.get("additionalNotes") ?? "").trim()
  const backgroundDocumentFile = formData.get("backgroundDocumentFile")
  const reviewDocumentFile = formData.get("reviewDocumentFile")
  const paymentProofFile = formData.get("paymentProofFile")

  if (
    !fullName ||
    !email ||
    !whatsapp ||
    !serviceSelected ||
    !programName ||
    !programLink ||
    !applicationDeadline
  ) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  if (!isValidUrl(programLink)) {
    return NextResponse.json({ error: "Program link must be a valid URL." }, { status: 400 })
  }

  if (!PAYMENT_MEDIUM_OPTIONS.includes(paymentMedium as (typeof PAYMENT_MEDIUM_OPTIONS)[number])) {
    return NextResponse.json({ error: "Please select a valid payment medium." }, { status: 400 })
  }

  if (!(backgroundDocumentFile instanceof File) || backgroundDocumentFile.size === 0) {
    return NextResponse.json(
      { error: "Please upload your informal CV / background document." },
      { status: 400 },
    )
  }

  if (!(paymentProofFile instanceof File) || paymentProofFile.size === 0) {
    return NextResponse.json({ error: "Please upload payment proof." }, { status: 400 })
  }

  const cvCreation = isCvCreationService(serviceSelected)

  if (cvCreation) {
    if (!documentationFolderUrl || !isValidUrl(documentationFolderUrl)) {
      return NextResponse.json(
        {
          error:
            "CV Creation requires a link to your documentation folder (Google Drive or similar).",
        },
        { status: 400 },
      )
    }
  } else if (!(reviewDocumentFile instanceof File) || reviewDocumentFile.size === 0) {
    return NextResponse.json(
      { error: "Please upload the SOP, proposal, or CV you want reviewed." },
      { status: 400 },
    )
  }

  const backgroundUpload = await uploadApplicationFile(backgroundDocumentFile, "background_document")
  if ("error" in backgroundUpload) {
    return NextResponse.json({ error: backgroundUpload.error }, { status: 400 })
  }

  let reviewDocumentPath: string | undefined
  if (!cvCreation && reviewDocumentFile instanceof File) {
    const reviewUpload = await uploadApplicationFile(reviewDocumentFile, "review_document")
    if ("error" in reviewUpload) {
      return NextResponse.json({ error: reviewUpload.error }, { status: 400 })
    }
    reviewDocumentPath = reviewUpload.path
  }

  const paymentUpload = await uploadApplicationFile(paymentProofFile, "payment_proof")
  if ("error" in paymentUpload) {
    return NextResponse.json({ error: paymentUpload.error }, { status: 400 })
  }

  const flags = computeDeadlineFlags(serviceSelected, applicationDeadline)

  const result = await createApplicationService({
    fullName,
    email,
    whatsapp,
    serviceSelected,
    programName,
    programLink,
    applicationDeadline,
    backgroundDocumentPath: backgroundUpload.path,
    documentPath: reviewDocumentPath,
    documentationFolderUrl: cvCreation ? documentationFolderUrl : undefined,
    accountHolderName,
    paymentMedium,
    paymentProofPath: paymentUpload.path,
    additionalNotes: additionalNotes || undefined,
  })

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({
    id: result.id,
    rushFeeApplies: flags.rushFeeApplies,
    needsTwoWeekNotice: flags.needsTwoWeekNotice,
  })
}
