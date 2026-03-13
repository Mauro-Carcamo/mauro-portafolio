"use client"

import { useEffect, useState } from "react"
import { ParallaxBanner } from "react-scroll-parallax"
import { cn } from "@/lib/utils"

type SectionParallaxProps = {
  className?: string
  variant?: "default" | "muted"
}

export function SectionParallax({ className, variant = "default" }: SectionParallaxProps) {
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    setDisabled(Boolean(reduceMotion))
  }, [])

  const base =
    variant === "muted"
      ? "from-primary/10 via-transparent to-accent/10 opacity-70"
      : "from-primary/12 via-transparent to-accent/12 opacity-60"

  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <ParallaxBanner
        disabled={disabled}
        className="absolute inset-0"
        layers={[
          {
            speed: -12,
            children: (
              <div className={cn("absolute inset-0 bg-gradient-to-br", base)} />
            ),
          },
          {
            speed: -22,
            children: (
              <div className="absolute -top-32 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            ),
          },
          {
            speed: -8,
            children: (
              <div className="absolute -bottom-40 right-[-6rem] h-[38rem] w-[38rem] rounded-full bg-accent/10 blur-3xl" />
            ),
          },
        ]}
      />
    </div>
  )
}

