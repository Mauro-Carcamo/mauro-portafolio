"use client"

import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"

type SocialLinksProps = {
  size?: "sm" | "md"
  className?: string
}

const iconSizeByVariant = {
  sm: 18,
  md: 24,
} as const

export function SocialLinks({ size = "md", className }: SocialLinksProps) {
  const iconSize = iconSizeByVariant[size]

  return (
    <div className={className ?? "flex flex-wrap items-center gap-5"}>
      <a
        href="https://github.com/Mauro-Carcamo"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        aria-label="GitHub"
        title="GitHub"
      >
        <Github size={iconSize} />
      </a>

      <a
        href="https://www.linkedin.com/in/mauricio-carcamo-diaz/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <Linkedin size={iconSize} />
      </a>

      <a
        href="mailto:mauro.carcamo89@gmail.com"
        className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        aria-label="Email"
        title="Email"
      >
        <Mail size={iconSize} />
      </a>

      <a
        href="https://wa.me/56990381919"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <MessageCircle size={iconSize} />
      </a>
    </div>
  )
}

