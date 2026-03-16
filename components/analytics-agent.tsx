"use client"

import { useEffect, useMemo, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"

type TrackPayload = {
  event_name: string
  session_id?: string
  page_path?: string
  page_url?: string
  referrer?: string
  element_id?: string
  element_text?: string
  duration_ms?: number
  scroll_depth?: number
  numeric_value?: number
  properties?: Record<string, unknown>
}

const SESSION_KEY = "analytics_session_id"

function getDeviceType() {
  if (typeof window === "undefined") return undefined
  const w = window.innerWidth
  if (w < 640) return "mobile"
  if (w < 1024) return "tablet"
  return "desktop"
}

function getUtmParams() {
  if (typeof window === "undefined") return {}
  const url = new URL(window.location.href)
  const get = (key: string) => url.searchParams.get(key) ?? undefined
  return {
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_term: get("utm_term"),
    utm_content: get("utm_content"),
  }
}

function safeText(value: string | null | undefined, max = 120) {
  const t = (value ?? "").replace(/\s+/g, " ").trim()
  return t.length > max ? `${t.slice(0, max - 1)}…` : t
}

export function AnalyticsAgent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageKey = useMemo(() => {
    if (!pathname) return ""
    return searchParams?.size ? `${pathname}?${searchParams.toString()}` : pathname
  }, [pathname, searchParams])

  const sessionIdRef = useRef<string | null>(null)
  const pageStartRef = useRef<number>(Date.now())
  const lastUrlRef = useRef<string | null>(null)
  const scrollMilestonesRef = useRef<Set<number>>(new Set())

  const send = (payload: TrackPayload, { beacon }: { beacon?: boolean } = {}) => {
    if (typeof window === "undefined") return

    const body = JSON.stringify({
      ...payload,
      session_id: payload.session_id ?? sessionIdRef.current ?? undefined,
      page_path: payload.page_path ?? pathname ?? undefined,
      page_url: payload.page_url ?? window.location.href,
      referrer: payload.referrer ?? lastUrlRef.current ?? document.referrer ?? undefined,
    })

    if (beacon && navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" })
      navigator.sendBeacon("/api/analytics/track", blob)
      return
    }

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: !!beacon,
    }).catch(() => {})
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const existing = window.sessionStorage.getItem(SESSION_KEY)
    if (existing) {
      sessionIdRef.current = existing
      return
    }

    const utm = getUtmParams()
    fetch("/api/analytics/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        referrer: document.referrer || undefined,
        device_type: getDeviceType(),
        ...utm,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        const sid = typeof data?.session_id === "string" ? data.session_id : null
        if (!sid) return
        sessionIdRef.current = sid
        window.sessionStorage.setItem(SESSION_KEY, sid)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!pageKey) return

    // reset page state
    pageStartRef.current = Date.now()
    scrollMilestonesRef.current = new Set()
    lastUrlRef.current = typeof window !== "undefined" ? window.location.href : null

    send({ event_name: "page_view" })
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.capture("page_view", { page: pageKey })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageKey])

  useEffect(() => {
    if (typeof window === "undefined") return

    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      if (max <= 0) return

      const pct = Math.round((window.scrollY / max) * 100)
      const milestones = [25, 50, 75, 100]

      for (const m of milestones) {
        if (pct < m) continue
        if (scrollMilestonesRef.current.has(m)) continue
        scrollMilestonesRef.current.add(m)
        send({ event_name: "scroll_depth", scroll_depth: m, properties: { milestone: m } })
        if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
          posthog.capture("scroll_depth", { milestone: m, page: pageKey })
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [pageKey])

  useEffect(() => {
    if (typeof window === "undefined") return

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const clickable = target.closest("a,button") as HTMLElement | null
      if (!clickable) return

      const tag = clickable.tagName.toLowerCase()
      const id = clickable.getAttribute("data-analytics") || clickable.id || undefined
      const text = safeText(clickable.textContent || clickable.getAttribute("aria-label") || undefined, 140) || undefined

      const href = tag === "a" ? (clickable as HTMLAnchorElement).href : undefined

      send({
        event_name: "click",
        element_id: id,
        element_text: text,
        properties: { tag, href },
      })
    }

    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true } as any)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const flushTimeOnPage = (beacon: boolean) => {
      const durationMs = Math.max(0, Date.now() - pageStartRef.current)
      if (durationMs < 1500) return
      send({ event_name: "time_on_page", duration_ms: durationMs }, { beacon })
      if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.capture("time_on_page", { duration_ms: durationMs, page: pageKey })
      }
    }

    const onVisibility = () => {
      if (document.visibilityState === "hidden") flushTimeOnPage(true)
    }

    const onUnload = () => flushTimeOnPage(true)

    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("pagehide", onUnload)
    return () => {
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pagehide", onUnload)
    }
  }, [pageKey])

  return null
}

