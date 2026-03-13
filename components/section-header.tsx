import type React from "react"

import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  title: React.ReactNode
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  align?: "left" | "center"
  className?: string
}

export function SectionHeader({ title, description, eyebrow, align = "center", className }: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start"

  return (
    <div className={cn("flex flex-col gap-4", alignment, className)}>
      {eyebrow && (
        <div className="inline-flex items-center rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary shadow-sm">
          {eyebrow}
        </div>
      )}

      <div className={cn("max-w-3xl", align === "center" ? "mx-auto" : "")}>
        <h2 className="text-balance text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}

