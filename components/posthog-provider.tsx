"use client"

import { useEffect } from "react"
import posthog from "posthog-js"
import { PostHogProvider as Provider } from "posthog-js/react"
import { usePathname } from "next/navigation"

function PostHogPageview() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    const url = typeof window !== "undefined" ? window.location.href : pathname
    posthog.capture("$pageview", { $current_url: url })
  }, [pathname])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key) return

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: true,
      disable_session_recording: true,
    })
  }, [])

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>
  }

  return (
    <Provider client={posthog}>
      <PostHogPageview />
      {children}
    </Provider>
  )
}
