"use client"

import { TechnologyIcon } from "@/components/technology-icon"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function SkillTooltipIcon({
  techName,
  description,
}: {
  techName: string
  description: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="group rounded-xl border border-border/50 bg-muted/25 p-2 shadow-sm transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label={`${techName}: ${description}`}
        >
          <TechnologyIcon techName={techName} size={28} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={10} className="max-w-[260px] text-left">
        <div className="font-semibold leading-none">{techName}</div>
        <div className="mt-1 leading-snug opacity-90">{description}</div>
      </TooltipContent>
    </Tooltip>
  )
}

