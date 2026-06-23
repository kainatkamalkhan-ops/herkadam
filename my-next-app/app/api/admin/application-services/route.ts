import { NextResponse } from "next/server"
import {
  APPLICATION_SERVICE_STATUSES,
  type ApplicationServiceStatus,
} from "@/lib/application-services-constants"
import {
  listApplicationServices,
  updateApplicationServiceStatus,
} from "@/lib/application-services-admin"

export async function GET() {
  const result = await listApplicationServices()
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }
  return NextResponse.json({ submissions: result })
}

export async function PATCH(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const { id, status } = body as { id?: string; status?: string }

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Submission id is required." }, { status: 400 })
  }

  if (
    !status ||
    !APPLICATION_SERVICE_STATUSES.includes(status as ApplicationServiceStatus)
  ) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 })
  }

  const result = await updateApplicationServiceStatus(id, status as ApplicationServiceStatus)
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
