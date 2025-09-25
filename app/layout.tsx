import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ThemeProvider } from "next-themes"

export const metadata: Metadata = {
  title: "Portafolio Mauricio Cárcamo",
  description: "Portafolio profesional de Mauricio Cárcamo, sociólogo especializado en Ciencia de Datos y Desarrollo Full Stack.",
  generator: "v0.app",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1706536613867.jpg-H1gm0kFpkJrdpxuyJIShGjRoIaEBYS.jpeg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
