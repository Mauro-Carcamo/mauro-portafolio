"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, ExternalLink, X } from "lucide-react"

type PdfDialogProps = {
  src: string
  title: string
  trigger: React.ReactNode
  downloadName?: string
}

function withPdfHash(src: string) {
  if (src.includes("#")) return src
  return `${src}#toolbar=1&navpanes=0&zoom=page-width&view=FitH`
}

export function PdfDialog({ src, title, trigger, downloadName }: PdfDialogProps) {
  const embedSrc = withPdfHash(src)

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100%-1rem)] sm:max-w-6xl h-[92vh] p-0 gap-0 overflow-hidden grid-rows-[auto_1fr] rounded-none sm:rounded-lg"
      >
        <div className="flex items-center justify-between gap-2 border-b bg-background p-3 sm:p-4">
          <DialogTitle className="text-base sm:text-lg truncate pr-2">{title}</DialogTitle>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={src} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">Abrir</span>
              </a>
            </Button>

            <Button variant="outline" size="sm" asChild>
              <a href={src} download={downloadName}>
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Descargar</span>
              </a>
            </Button>

            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label="Cerrar">
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
          </div>
        </div>

        <div className="min-h-0 bg-muted/20">
          <object data={embedSrc} type="application/pdf" className="h-full w-full bg-white">
            <div className="h-full w-full p-4 flex flex-col items-center justify-center text-center gap-3">
              <p className="text-sm text-muted-foreground">
                No fue posible previsualizar este PDF en tu navegador.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button asChild>
                  <a href={src} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Abrir
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={src} download={downloadName}>
                    <Download className="h-4 w-4" />
                    Descargar
                  </a>
                </Button>
              </div>
            </div>
          </object>
        </div>
      </DialogContent>
    </Dialog>
  )
}
