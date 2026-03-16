# Supabase (Analytics / Event Tracking)

Este directorio contiene el esquema para **Web Analytics / Product Analytics** basado en **event tracking**.

## Qué se crea

- `analytics.sessions`: sesiones (opcional, pero útil para KPIs).
- `analytics.events`: eventos (page_view, click, scroll_depth, time_on_page, conversion, etc.).
- RPCs:
  - `analytics.start_session(...)` → retorna `session_id`
  - `analytics.track_event(...)` → inserta un evento y retorna `event_id`
- Views para KPIs:
  - `analytics.v_daily_kpis`
  - `analytics.v_event_counts_daily`
  - `analytics.v_top_pages_daily`

## Cómo aplicarlo en Supabase

Opción A (sin CLI): copia y ejecuta el SQL de:
- `supabase/migrations/20260316000000_analytics_event_tracking.sql`
en el **SQL Editor** de tu proyecto Supabase.

Opción B (CLI, recomendado):
1. `pnpm supabase login`
2. `pnpm supabase link --project-ref <TU_PROJECT_REF>`
3. `pnpm supabase db push`

OpciÃ³n C (sin login / sin TTY): migraciÃ³n directa con `DATABASE_URL`
1. Configura `DATABASE_URL` (Direct connection) en `/.env.local`
2. Ejecuta: `pnpm db:migrate`

Tip: si no quieres guardar el `DATABASE_URL`, puedes usar:
1. `SUPABASE_PROJECT_REF` + `SUPABASE_DB_PASSWORD` en `/.env.local`
2. Ejecuta: `pnpm db:migrate`

## Verificar que las credenciales están bien en Vercel

Este proyecto expone un health-check **sin secretos**:
- `/api/analytics/health`

Debe retornar `posthog.enabled: true` si `NEXT_PUBLIC_POSTHOG_KEY` está configurada en Vercel **antes** del build.

## Convención de eventos sugerida

- `page_view`
- `click`
- `scroll_depth` (usar `scroll_depth` 0–100)
- `time_on_page` (usar `duration_ms`)
- `conversion`
