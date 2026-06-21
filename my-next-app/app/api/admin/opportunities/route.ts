import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import {
  FUNDING_TYPES,
  OPPORTUNITY_REGIONS,
  OPPORTUNITY_TYPES,
  type FundingType,
  type OpportunityRegion,
  type OpportunityType,
} from "@/lib/opportunity-constants"
import { linesToBulletList } from "@/lib/opportunity-text"
import { createOpportunity } from "@/lib/opportunities-admin"
import { parseYoutubeVideoId } from "@/lib/youtube"

type Body = {
  title?: string
  organization?: string
  location?: string
  type?: string
  region?: string
  fundingType?: string
  deadline?: string
  summary?: string
  description?: string
  benefits?: string
  eligibility?: string
  requirements?: string
  impactForWomen?: string
  imageUrl?: string
  applicationLink?: string
  videoLink?: string
  isFeatured?: boolean
}

function isOneOf<T extends string>(value: string, allowed: readonly T[]): value is T {
  return (allowed as readonly string[]).includes(value)
}

export async function POST(request: Request) {
  const body = (await request.json()) as Body

  const title = body.title?.trim() ?? ""
  const organization = body.organization?.trim() ?? ""
  const location = body.location?.trim() ?? ""
  const type = body.type ?? ""
  const region = body.region ?? ""
  const fundingType = body.fundingType ?? ""
  const deadline = body.deadline ?? ""
  const summary = body.summary?.trim() ?? ""
  const description = body.description?.trim() ?? ""
  const benefits = body.benefits ?? ""
  const eligibility = body.eligibility ?? ""
  const impactForWomen = body.impactForWomen?.trim() ?? ""

  if (
    !title ||
    !organization ||
    !location ||
    !deadline ||
    !summary ||
    !description ||
    !impactForWomen
  ) {
    return NextResponse.json(
      {
        error:
          "Title, organization, location, deadline, summary, description, and Why This Matters for Her are required.",
      },
      { status: 400 },
    )
  }

  if (!linesToBulletList(benefits).length) {
    return NextResponse.json(
      { error: "Add at least one benefit (one bullet per line)." },
      { status: 400 },
    )
  }

  if (!linesToBulletList(eligibility).length) {
    return NextResponse.json(
      { error: "Add at least one eligibility criterion (one bullet per line)." },
      { status: 400 },
    )
  }

  if (!isOneOf(type, OPPORTUNITY_TYPES)) {
    return NextResponse.json({ error: "Invalid opportunity type." }, { status: 400 })
  }
  if (!isOneOf(region, OPPORTUNITY_REGIONS)) {
    return NextResponse.json({ error: "Invalid region." }, { status: 400 })
  }
  if (!isOneOf(fundingType, FUNDING_TYPES)) {
    return NextResponse.json({ error: "Invalid funding status." }, { status: 400 })
  }

  const videoLink = body.videoLink?.trim() ?? ""
  if (videoLink && !parseYoutubeVideoId(videoLink)) {
    return NextResponse.json(
      { error: "Video link must be a valid YouTube URL (watch, youtu.be, embed, or shorts)." },
      { status: 400 },
    )
  }

  const result = await createOpportunity({
    title,
    organization,
    location,
    type: type as OpportunityType,
    region: region as OpportunityRegion,
    fundingType: fundingType as FundingType,
    deadline,
    summary,
    description,
    benefits,
    eligibility,
    requirements: body.requirements,
    impactForWomen,
    imageUrl: body.imageUrl,
    applicationLink: body.applicationLink,
    videoLink: videoLink || undefined,
    isFeatured: Boolean(body.isFeatured),
  })

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  revalidatePath("/")
  revalidatePath("/opportunities")
  revalidatePath(`/opportunities/${result.id}`)

  return NextResponse.json({ id: result.id })
}
