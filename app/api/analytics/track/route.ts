import { NextResponse } from "next/server"
import { z } from "zod"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const TrackEventSchema = z.object({
  event_name: z.string().min(1).max(120),
  session_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  page_path: z.string().max(1024).optional(),
  page_url: z.string().max(2048).optional(),
  referrer: z.string().max(2048).optional(),
  element_id: z.string().max(200).optional(),
  element_text: z.string().max(200).optional(),
  duration_ms: z.number().int().nonnegative().optional(),
  scroll_depth: z.number().int().min(0).max(100).optional(),
  numeric_value: z.number().optional(),
  properties: z.record(z.unknown()).optional(),
})

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = TrackEventSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const input = parsed.data
  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase.rpc("analytics.track_event", {
    p_event_name: input.event_name,
    p_session_id: input.session_id ?? null,
    p_user_id: input.user_id ?? null,
    p_page_path: input.page_path ?? null,
    p_page_url: input.page_url ?? null,
    p_referrer: input.referrer ?? null,
    p_element_id: input.element_id ?? null,
    p_element_text: input.element_text ?? null,
    p_duration_ms: input.duration_ms ?? null,
    p_scroll_depth: input.scroll_depth ?? null,
    p_numeric_value: input.numeric_value ?? null,
    p_properties: input.properties ?? {},
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ event_id: data })
}

