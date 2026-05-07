"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  delayMs?: number
  variant?: "up" | "left" | "right"
}

export function ScrollReveal({ children, className, delayMs = 0, variant = "up" }: ScrollRevealProps) {
  const variants = {
    hidden: {
      opacity: 0,
      y: variant === "up" ? 30 : 0,
      x: variant === "left" ? -30 : variant === "right" ? 30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.6,
        delay: delayMs / 1000,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
