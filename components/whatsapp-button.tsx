"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppButton() {
  const phoneNumber = "+56990381919"
  const message = "Hola Mauricio, vi tu portafolio y me gustaría contactarte."

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-0"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  )
}
