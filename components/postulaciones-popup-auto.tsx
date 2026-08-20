"use client"

import { useEffect, useState } from "react"
import { PostulacionesPopup } from "@/components/postulaciones-popup"

/** Abre el historial de postulaciones automáticamente a los 4s de cargar la home. */
export function PostulacionesPopupAuto() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 4000)
    return () => clearTimeout(t)
  }, [])

  return <PostulacionesPopup open={open} onOpenChange={setOpen} />
}
