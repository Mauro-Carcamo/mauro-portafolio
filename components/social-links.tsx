"use client"

import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"
import { motion, Variants } from "framer-motion"

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

  // Variantes para el contenedor (maneja la cascada)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Tiempo entre cada icono
        delayChildren: 0.1,   // Espera inicial opcional
      },
    },
  }

  // Variantes para cada icono individual
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  }

  const hoverAnimation = {
    y: -5,
    scale: 1.15,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className ?? "flex flex-wrap items-center gap-5"}
    >
      <motion.a
        variants={itemVariants}
        whileHover={hoverAnimation}
        href="https://github.com/Mauro-Carcamo"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        aria-label="GitHub"
        title="GitHub"
      >
        <Github size={iconSize} />
      </motion.a>

      <motion.a
        variants={itemVariants}
        whileHover={hoverAnimation}
        href="https://www.linkedin.com/in/mauricio-carcamo-diaz/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <Linkedin size={iconSize} />
      </motion.a>

      <motion.a
        variants={itemVariants}
        whileHover={hoverAnimation}
        href="mailto:mauro.carcamo89@gmail.com"
        className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        aria-label="Email"
        title="Email"
      >
        <Mail size={iconSize} />
      </motion.a>

      <motion.a
        variants={itemVariants}
        whileHover={hoverAnimation}
        href="https://wa.me/56990381919"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <MessageCircle size={iconSize} />
      </motion.a>
    </motion.div>
  )
}
