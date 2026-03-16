-- Web/Product Analytics schema (event tracking) for Supabase/Postgres
-- Safe defaults:
-- - Uses `analytics` schema to keep tables separate from app tables.
-- - Adds views for common KPIs (page views, sessions, engagement, conversions).
-- - Adds an RPC (`analytics.track_event`) you can call from the client/server.

-- Extensions
create extension if not exists pgcrypto;

-- Schema
create schema if not exists analytics;

-- Sessions (optional, but useful for KPIs)
create table if not exists analytics.sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid null,
  ip inet null,
  user_agent text null,
  referrer text null,
  utm_source text null,
  utm_medium text null,
  utm_campaign text null,
  utm_term text null,
  utm_content text null,
  device_type text null,
  country_code text null
);

-- Events: store everything as events (page_view, click, scroll_depth, time_on_page, conversion, etc.)
create table if not exists analytics.events (
  id uuid primary key default gen_random_uuid(),
  occurred_at timestamptz not null default now(),
  session_id uuid null references analytics.sessions(id) on delete set null,
  user_id uuid null,
  event_name text not null,
  page_path text null,
  page_url text null,
  referrer text null,
  element_id text null,
  element_text text null,
  duration_ms int null,
  scroll_depth int null check (scroll_depth is null or (scroll_depth >= 0 and scroll_depth <= 100)),
  numeric_value double precision null,
  properties jsonb not null default '{}'::jsonb,
  constraint events_event_name_not_blank check (length(btrim(event_name)) > 0)
);

create index if not exists events_occurred_at_idx on analytics.events (occurred_at desc);
create index if not exists events_event_name_idx on analytics.events (event_name);
create index if not exists events_session_id_idx on analytics.events (session_id);
create index if not exists events_page_path_idx on analytics.events (page_path);
create index if not exists events_user_id_idx on analytics.events (user_id);

-- Row Level Security (RLS)
alter table analytics.sessions enable row level security;
alter table analytics.events enable row level security;

-- Block direct access by default. Prefer the RPC below.
revoke all on analytics.sessions from anon, authenticated;
revoke all on analytics.events from anon, authenticated;

-- RPC: track sessions (optional)
create or replace function analytics.start_session(
  p_user_id uuid default null,
  p_referrer text default null,
  p_utm_source text default null,
  p_utm_medium text default null,
  p_utm_campaign text default null,
  p_utm_term text default null,
  p_utm_content text default null,
  p_device_type text default null,
  p_country_code text default null
)
returns uuid
language plpgsql
security definer
set search_path = analytics, public
as $$
declare
  v_session_id uuid;
begin
  insert into analytics.sessions (
    user_id,
    referrer,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    device_type,
    country_code
  )
  values (
    p_user_id,
    p_referrer,
    p_utm_source,
    p_utm_medium,
    p_utm_campaign,
    p_utm_term,
    p_utm_content,
    p_device_type,
    p_country_code
  )
  returning id into v_session_id;

  return v_session_id;
end;
$$;

-- RPC: track an event
create or replace function analytics.track_event(
  p_event_name text,
  p_session_id uuid default null,
  p_user_id uuid default null,
  p_page_path text default null,
  p_page_url text default null,
  p_referrer text default null,
  p_element_id text default null,
  p_element_text text default null,
  p_duration_ms int default null,
  p_scroll_depth int default null,
  p_numeric_value double precision default null,
  p_properties jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = analytics, public
as $$
declare
  v_event_id uuid;
begin
  insert into analytics.events (
    event_name,
    session_id,
    user_id,
    page_path,
    page_url,
    referrer,
    element_id,
    element_text,
    duration_ms,
    scroll_depth,
    numeric_value,
    properties
  )
  values (
    p_event_name,
    p_session_id,
    p_user_id,
    p_page_path,
    p_page_url,
    p_referrer,
    p_element_id,
    p_element_text,
    p_duration_ms,
    p_scroll_depth,
    p_numeric_value,
    coalesce(p_properties, '{}'::jsonb)
  )
  returning id into v_event_id;

  return v_event_id;
end;
$$;

-- Allow calling the RPCs from client libraries (anon/authenticated)
grant usage on schema analytics to anon, authenticated;
grant execute on function analytics.start_session(
  uuid, text, text, text, text, text, text, text, text
) to anon, authenticated;
grant execute on function analytics.track_event(
  text, uuid, uuid, text, text, text, text, text, int, int, double precision, jsonb
) to anon, authenticated;

-- KPI Views (read from server using service role key, or grant select to a dedicated role)
create or replace view analytics.v_event_counts_daily as
select
  (occurred_at at time zone 'utc')::date as day_utc,
  event_name,
  count(*)::bigint as events
from analytics.events
group by 1, 2
order by 1 desc, 2 asc;

create or replace view analytics.v_daily_kpis as
with base as (
  select
    (occurred_at at time zone 'utc')::date as day_utc,
    session_id,
    user_id,
    event_name,
    page_path,
    duration_ms,
    scroll_depth
  from analytics.events
)
select
  day_utc,
  count(*)::bigint as total_events,
  (count(*) filter (where event_name = 'page_view'))::bigint as page_views,
  (count(distinct session_id) filter (where session_id is not null))::bigint as sessions,
  (count(distinct user_id) filter (where user_id is not null))::bigint as users,
  (avg(duration_ms) filter (where event_name = 'time_on_page' and duration_ms is not null))::double precision as avg_time_on_page_ms,
  (avg(scroll_depth) filter (where event_name = 'scroll_depth' and scroll_depth is not null))::double precision as avg_scroll_depth_pct,
  (count(*) filter (where event_name = 'conversion'))::bigint as conversions
from base
group by 1
order by 1 desc;

create or replace view analytics.v_top_pages_daily as
select
  (occurred_at at time zone 'utc')::date as day_utc,
  page_path,
  count(*)::bigint as page_views
from analytics.events
where event_name = 'page_view'
group by 1, 2
order by 1 desc, 3 desc, 2 asc;
