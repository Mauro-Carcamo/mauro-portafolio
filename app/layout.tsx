import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ThemeProvider } from "next-themes"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
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
