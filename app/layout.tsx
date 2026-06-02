import type React from "react"
import type { Metadata } from "next"
import type { Viewport } from "next"
import "./globals.css"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ThemeProvider } from "next-themes"
import { ScrollParallaxProvider } from "@/components/scroll-parallax-provider"
import { PostHogProvider } from "@/components/posthog-provider"
import { AnalyticsAgent } from "@/components/analytics-agent"

export const metadata: Metadata = {
  title: "Mauricio Cárcamo — Analista de Datos & Data Science",
  description: "Portafolio profesional de Mauricio Cárcamo, sociólogo especializado en Ciencia de Datos, Machine Learning, NLP y desarrollo Full Stack con Python.",
  keywords: ["Data Science", "Machine Learning", "NLP", "Python", "Análisis de Datos", "Power BI", "Sociología", "Portafolio", "Chile"],
  authors: [{ name: "Mauricio Cárcamo" }],
  openGraph: {
    title: "Mauricio Cárcamo — Analista de Datos & Data Science",
    description: "Sociólogo especializado en Ciencia de Datos, Machine Learning y NLP. Portafolio con proyectos reales.",
    type: "website",
    locale: "es_CL",
  },
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1706536613867.jpg-H1gm0kFpkJrdpxuyJIShGjRoIaEBYS.jpeg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="font-sans antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <PostHogProvider>
            <ScrollParallaxProvider>
              <AnalyticsAgent />
              {children}
              <WhatsAppButton />
            </ScrollParallaxProvider>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
