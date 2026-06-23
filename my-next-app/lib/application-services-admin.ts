import {
  APPLICATION_SERVICE_OPTIONS,
  APPLICATION_SERVICE_STATUSES,
  type ApplicationServiceStatus,
  computeDeadlineFlags,
} from "@/lib/application-services-constants"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export type ApplicationServiceRow = {
  id: string
  full_name: string
  email: string
  whatsapp: string
  service_selected: string
  program_name: string
  program_link: string | null
  application_deadline: string
  background_document_path: string | null
  document_path: string | null
  documentation_folder_url: string | null
  account_holder_name: string
  payment_medium: string
  payment_proof_path: string
  additional_notes: string | null
  rush_fee_applies: boolean
  needs_two_week_notice: boolean
  status: ApplicationServiceStatus
  created_at: string
}

export type CreateApplicationServiceInput = {
  fullName: string
  email: string
  whatsapp: string
  serviceSelected: string
  programName: string
  programLink: string
  applicationDeadline: string
  backgroundDocumentPath: string
  documentPath?: string
  documentationFolderUrl?: string
  accountHolderName: string
  paymentMedium: string
  paymentProofPath: string
  additionalNotes?: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function validateApplicationServiceInput(
  input: CreateApplicationServiceInput,
): string | null {
  if (!input.fullName.trim()) return "Please enter your full name."
  if (!isValidEmail(input.email)) return "Please enter a valid email address."
  if (!input.whatsapp.trim()) return "Please enter your WhatsApp number."
  if (!APPLICATION_SERVICE_OPTIONS.includes(input.serviceSelected as (typeof APPLICATION_SERVICE_OPTIONS)[number])) {
    return "Please select a valid service or package."
  }
  if (!input.programName.trim()) return "Please enter the program or opportunity name."
  if (!input.programLink.trim()) return "Please enter the program or opportunity link."
  if (!input.applicationDeadline) return "Please enter your application deadline."
  if (!input.backgroundDocumentPath) return "Please upload your informal CV / background document."
  if (!input.accountHolderName.trim()) return "Please enter the account holder name for payment."
  if (!input.paymentMedium.trim()) return "Please select a payment medium."
  if (!input.paymentProofPath) return "Please upload payment proof."
  return null
}

export async function createApplicationService(
  input: CreateApplicationServiceInput,
): Promise<{ id: string } | { error: string }> {
  const validationError = validateApplicationServiceInput(input)
  if (validationError) return { error: validationError }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return {
      error:
        "Submissions are not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    }
  }

  const flags = computeDeadlineFlags(input.serviceSelected, input.applicationDeadline)

  const { data, error } = await supabase
    .from("application_services")
    .insert({
      full_name: input.fullName.trim(),
      email: input.email.trim(),
      whatsapp: input.whatsapp.trim(),
      service_selected: input.serviceSelected,
      program_name: input.programName.trim(),
      program_link: input.programLink.trim(),
      application_deadline: input.applicationDeadline,
      background_document_path: input.backgroundDocumentPath,
      document_path: input.documentPath ?? null,
      documentation_folder_url: input.documentationFolderUrl?.trim() || null,
      account_holder_name: input.accountHolderName.trim(),
      payment_medium: input.paymentMedium.trim(),
      payment_proof_path: input.paymentProofPath,
      additional_notes: input.additionalNotes?.trim() || null,
      rush_fee_applies: flags.rushFeeApplies,
      needs_two_week_notice: flags.needsTwoWeekNotice,
      status: "submitted",
    })
    .select("id")
    .single()

  if (error || !data?.id) {
    return { error: error?.message || "Failed to save submission." }
  }

  return { id: data.id as string }
}

export async function listApplicationServices(): Promise<
  ApplicationServiceRow[] | { error: string }
> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return { error: "Supabase admin client is not configured." }
  }

  const { data, error } = await supabase
    .from("application_services")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return { error: error.message || "Failed to load submissions." }
  }

  return (data ?? []) as ApplicationServiceRow[]
}

export async function updateApplicationServiceStatus(
  id: string,
  status: ApplicationServiceStatus,
): Promise<{ ok: true } | { error: string }> {
  if (!APPLICATION_SERVICE_STATUSES.includes(status)) {
    return { error: "Invalid status." }
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return { error: "Supabase admin client is not configured." }
  }

  const { error } = await supabase
    .from("application_services")
    .update({ status })
    .eq("id", id)

  if (error) {
    return { error: error.message || "Failed to update status." }
  }

  return { ok: true }
}

export async function getApplicationServiceById(
  id: string,
): Promise<ApplicationServiceRow | { error: string }> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return { error: "Supabase admin client is not configured." }
  }

  const { data, error } = await supabase
    .from("application_services")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    return { error: error.message || "Failed to load submission." }
  }

  if (!data) {
    return { error: "Submission not found." }
  }

  return data as ApplicationServiceRow
}
