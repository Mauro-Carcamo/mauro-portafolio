import { NextResponse } from "next/server"
import { z } from "zod"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const SessionInputSchema = z
  .object({
    user_id: z.string().uuid().optional(),
    referrer: z.string().max(2048).optional(),
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    device_type: z.string().max(50).optional(),
    country_code: z.string().max(10).optional(),
  })
  .optional()

export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined)
  const parsed = SessionInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const input = parsed.data ?? {}
  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase.rpc("analytics.start_session", {
    p_user_id: input.user_id ?? null,
    p_referrer: input.referrer ?? null,
    p_utm_source: input.utm_source ?? null,
    p_utm_medium: input.utm_medium ?? null,
    p_utm_campaign: input.utm_campaign ?? null,
    p_utm_term: input.utm_term ?? null,
    p_utm_content: input.utm_content ?? null,
    p_device_type: input.device_type ?? null,
    p_country_code: input.country_code ?? null,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ session_id: data })
}

