"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  APPLICATION_PAYMENT_ACCOUNT_DETAILS,
  APPLICATION_SERVICE_OPTIONS,
  HER_KADAM_INSTAGRAM_URL,
  PAYMENT_MEDIUM_OPTIONS,
  computeDeadlineFlags,
  isCvCreationService,
} from "@/lib/application-services-constants"

const WORD_ACCEPT =
  ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
const REVIEW_DOC_ACCEPT = `${WORD_ACCEPT},.pdf,application/pdf`

export function ApplyWithUsForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [serviceSelected, setServiceSelected] = useState("")
  const [programName, setProgramName] = useState("")
  const [programLink, setProgramLink] = useState("")
  const [applicationDeadline, setApplicationDeadline] = useState("")
  const [documentationFolderUrl, setDocumentationFolderUrl] = useState("")
  const [accountHolderName, setAccountHolderName] = useState("")
  const [paymentMedium, setPaymentMedium] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [backgroundDocumentFile, setBackgroundDocumentFile] = useState<File | null>(null)
  const [reviewDocumentFile, setReviewDocumentFile] = useState<File | null>(null)
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null)

  const cvCreation = isCvCreationService(serviceSelected)

  const deadlineFlags = useMemo(() => {
    if (!serviceSelected || !applicationDeadline) return null
    return computeDeadlineFlags(serviceSelected, applicationDeadline)
  }, [serviceSelected, applicationDeadline])

  function resetForm() {
    setSubmitted(false)
    setFullName("")
    setEmail("")
    setWhatsapp("")
    setServiceSelected("")
    setProgramName("")
    setProgramLink("")
    setApplicationDeadline("")
    setDocumentationFolderUrl("")
    setAccountHolderName("")
    setPaymentMedium("")
    setAdditionalNotes("")
    setBackgroundDocumentFile(null)
    setReviewDocumentFile(null)
    setPaymentProofFile(null)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData()
    formData.set("fullName", fullName)
    formData.set("email", email)
    formData.set("whatsapp", whatsapp)
    formData.set("serviceSelected", serviceSelected)
    formData.set("programName", programName)
    formData.set("programLink", programLink)
    formData.set("applicationDeadline", applicationDeadline)
    formData.set("accountHolderName", accountHolderName)
    formData.set("paymentMedium", paymentMedium)
    formData.set("additionalNotes", additionalNotes)

    if (backgroundDocumentFile) {
      formData.set("backgroundDocumentFile", backgroundDocumentFile)
    }

    if (cvCreation) {
      formData.set("documentationFolderUrl", documentationFolderUrl)
    } else if (reviewDocumentFile) {
      formData.set("reviewDocumentFile", reviewDocumentFile)
    }

    if (paymentProofFile) {
      formData.set("paymentProofFile", paymentProofFile)
    }

    try {
      const res = await fetch("/api/apply", { method: "POST", body: formData })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) {
        setError(data.error ?? "Submission failed. Please try again.")
        return
      }
      setSubmitted(true)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground">Application submitted</h3>
        <p className="mt-2 text-muted-foreground">
          Once your payment is reviewed, you will receive a confirmation message.
        </p>
        <Button variant="outline" className="mt-6" onClick={resetForm}>
          Submit another application
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name *</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp number *</Label>
        <Input
          id="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="+92 300 1234567"
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label>Service or package *</Label>
        <Select value={serviceSelected} onValueChange={setServiceSelected} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a service or package" />
          </SelectTrigger>
          <SelectContent>
            {APPLICATION_SERVICE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="programName">Program / opportunity name *</Label>
        <Input
          id="programName"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="programLink">Program / opportunity link *</Label>
        <Input
          id="programLink"
          type="url"
          value={programLink}
          onChange={(e) => setProgramLink(e.target.value)}
          placeholder="https://…"
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="applicationDeadline">Application deadline *</Label>
        <Input
          id="applicationDeadline"
          type="date"
          value={applicationDeadline}
          onChange={(e) => setApplicationDeadline(e.target.value)}
          required
          disabled={loading}
        />
        {deadlineFlags?.rushFeeApplies && (
          <p className="flex items-start gap-2 text-sm text-amber-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            Your deadline is less than 3 days away — a Rs 500 rush fee applies.
          </p>
        )}
        {deadlineFlags?.needsTwoWeekNotice && (
          <p className="flex items-start gap-2 text-sm text-amber-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            Research proposal review and CV creation require at least 2 weeks before your deadline.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="backgroundDocumentFile">
          Upload 1 — Informal CV / background document *
        </Label>
        <Input
          id="backgroundDocumentFile"
          type="file"
          accept={WORD_ACCEPT}
          onChange={(e) => setBackgroundDocumentFile(e.target.files?.[0] ?? null)}
          required
          disabled={loading}
        />
        <p className="text-xs text-muted-foreground">
          Word format preferred. Share your education, skills, and experiences in an informal Word
          document — this helps us understand your background so our feedback fits your story.
        </p>
      </div>

      {cvCreation ? (
        <div className="space-y-2">
          <Label htmlFor="documentationFolderUrl">Documentation folder link *</Label>
          <Input
            id="documentationFolderUrl"
            type="url"
            value={documentationFolderUrl}
            onChange={(e) => setDocumentationFolderUrl(e.target.value)}
            placeholder="https://drive.google.com/…"
            required
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">
            Link to a folder (Google Drive or similar) with degrees, certificates, work history,
            and other documents needed for CV creation from scratch.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="reviewDocumentFile">Upload 2 — SOP / proposal / CV for review *</Label>
          <Input
            id="reviewDocumentFile"
            type="file"
            accept={REVIEW_DOC_ACCEPT}
            onChange={(e) => setReviewDocumentFile(e.target.files?.[0] ?? null)}
            required
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">
            Word format preferred; PDF preferred for CVs so formatting stays intact. This is the
            document you will receive feedback on.
          </p>
        </div>
      )}

      <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-4">
        <h3 className="font-serif text-lg font-semibold text-foreground">Payment details</h3>
        <div className="rounded-md border border-dashed border-border bg-background p-4 text-sm text-muted-foreground whitespace-pre-wrap">
          {APPLICATION_PAYMENT_ACCOUNT_DETAILS}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="accountHolderName">Account holder name (sender) *</Label>
            <Input
              id="accountHolderName"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label>Payment medium *</Label>
            <Select value={paymentMedium} onValueChange={setPaymentMedium} required>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_MEDIUM_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentProofFile">Upload payment proof *</Label>
          <Input
            id="paymentProofFile"
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf"
            onChange={(e) => setPaymentProofFile(e.target.files?.[0] ?? null)}
            required
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">
            Screenshot or challan (JPG, PNG, WebP, or PDF), up to 10 MB.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional notes or specific concerns</Label>
        <Textarea
          id="additionalNotes"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          rows={4}
          disabled={loading}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" size="lg" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          "Submit application"
        )}
      </Button>

      <div className="space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
        <p>
          Have questions before submitting payment?{" "}
          <Link
            href={HER_KADAM_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Message Her Kadam on Instagram first.
          </Link>
        </p>
        <p>Once your payment is reviewed, you will receive a confirmation message.</p>
        <p className="font-bold text-destructive">
          Any fraudulent or AI-generated payment receipts will result in legal action.
        </p>
      </div>
    </form>
  )
}
