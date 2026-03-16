import { NextResponse } from "next/server"

export const runtime = "nodejs"

function parseSupabaseRef(url: string | null) {
  if (!url) return null
  try {
    const host = new URL(url).host
    // <ref>.supabase.co
    const match = host.match(/^([a-z0-9]+)\.supabase\.co$/i)
    return match?.[1] ?? null
  } catch {
    return null
  }
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || null
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? null

  return NextResponse.json({
    ok: true,
    posthog: {
      enabled: Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY),
      host: posthogHost,
    },
    supabase: {
      url_set: Boolean(supabaseUrl),
      url: supabaseUrl,
      project_ref_guess: parseSupabaseRef(supabaseUrl),
      service_role_set: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      project_ref: process.env.SUPABASE_PROJECT_REF ?? null,
      postgres_url_set: Boolean(
        process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_HOST
      ),
    },
    vercel: {
      env: process.env.VERCEL_ENV ?? null,
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    },
  })
}
