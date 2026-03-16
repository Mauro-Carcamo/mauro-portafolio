import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET() {
  return NextResponse.json({
    ok: true,
    posthog: {
      enabled: Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY),
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? null,
    },
    supabase: {
      url_set: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      service_role_set: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      project_ref: process.env.SUPABASE_PROJECT_REF ?? null,
    },
    vercel: {
      env: process.env.VERCEL_ENV ?? null,
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    },
  })
}

