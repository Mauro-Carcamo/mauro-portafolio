"use client"

import type React from "react"

import { useEffect, useId, useState } from "react"
import { cn } from "@/lib/utils"

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  delayMs?: number
  variant?: "up" | "left" | "right"
}

export function ScrollReveal({ children, className, delayMs = 0, variant = "up" }: ScrollRevealProps) {
  const id = useId()
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = document.getElementById(id)
    if (!element) return

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    if (reduceMotion) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (!entry.isIntersecting) return
        setIsInView(true)
        observer.disconnect()
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [id])

  return (
    <div
      id={id}
      data-reveal
      data-inview={isInView ? "true" : "false"}
      data-variant={variant}
      style={{ ["--reveal-delay" as any]: `${delayMs}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </div>
  )
}
