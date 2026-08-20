"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import postulacionesData from "@/data/postulaciones.json"

type Postulacion = {
  empresa: string
  portal: string
  titulo: string
  estado: string
  fecha: string
  dias: number | null
}

const DATA = postulacionesData as {
  totalOfertas: number
  totalPlataformas: number
  totalPostulaciones: number
  porPortal: { portal: string; cantidad: number }[]
  porKeyword: { keyword: string; cantidad: number }[]
  empresas: Record<string, Postulacion[]>
  generadoEl: string
}

interface PostulacionesPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PostulacionesPopup({ open, onOpenChange }: PostulacionesPopupProps) {
  const [empresa, setEmpresa] = useState("")

  const postulaciones = empresa ? DATA.empresas[empresa] ?? [] : []
  const maxPortal = Math.max(...DATA.porPortal.map((p) => p.cantidad))
  const maxKeyword = Math.max(...DATA.porKeyword.map((p) => p.cantidad))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100%-1rem)] sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-5 sm:p-6"
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-muted/60 text-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogTitle className="pr-8 text-lg font-bold tracking-tight">
          Historial de búsqueda laboral
        </DialogTitle>
        <p className="mb-4 text-xs text-muted-foreground">
          Datos reales de mi proyecto de scraping — generado el {DATA.generadoEl}.
        </p>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="rounded-xl border border-border/60 bg-primary/5 p-3 text-center">
            <div className="text-xl font-bold text-primary">{DATA.totalOfertas}</div>
            <div className="text-[11px] text-muted-foreground">Ofertas extraídas</div>
          </div>
          <div className="rounded-xl border border-border/60 bg-primary/5 p-3 text-center">
            <div className="text-xl font-bold text-primary">{DATA.totalPlataformas}</div>
            <div className="text-[11px] text-muted-foreground">Plataformas</div>
          </div>
          <div className="rounded-xl border border-border/60 bg-primary/5 p-3 text-center">
            <div className="text-xl font-bold text-primary">{DATA.totalPostulaciones}</div>
            <div className="text-[11px] text-muted-foreground">Postulaciones</div>
          </div>
        </div>

        <h3 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
          Ofertas por plataforma
        </h3>
        <div className="space-y-1.5">
          {DATA.porPortal.map((p) => (
            <div key={p.portal} className="flex items-center gap-2 text-xs">
              <span className="w-28 shrink-0 truncate">{p.portal}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: `${(p.cantidad / maxPortal) * 100}%` }}
                />
              </span>
              <span className="w-8 shrink-0 text-right text-muted-foreground">{p.cantidad}</span>
            </div>
          ))}
        </div>

        <h3 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
          Ofertas por palabra clave
        </h3>
        <div className="space-y-1.5">
          {DATA.porKeyword.map((p) => (
            <div key={p.keyword} className="flex items-center gap-2 text-xs">
              <span className="w-28 shrink-0 truncate">{p.keyword}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-accent"
                  style={{ width: `${(p.cantidad / maxKeyword) * 100}%` }}
                />
              </span>
              <span className="w-8 shrink-0 text-right text-muted-foreground">{p.cantidad}</span>
            </div>
          ))}
        </div>

        <hr className="my-5 border-border/60" />

        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
          Verificar una postulación
        </h3>
        <select
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <option value="">
            — Selecciona una empresa ({Object.keys(DATA.empresas).length}) —
          </option>
          {Object.keys(DATA.empresas).map((nombre) => (
            <option key={nombre} value={nombre}>
              {nombre}
            </option>
          ))}
        </select>

        {postulaciones.length > 0 && (
          <div className="mt-3 space-y-2">
            {postulaciones.map((p, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-muted/40 p-3">
                <div className="text-sm font-semibold">{p.titulo || "(sin título)"}</div>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>🌐 {p.portal}</span>
                  <span>📅 {p.fecha}</span>
                  <span>📌 {p.estado || "Sin estado"}</span>
                </div>
                <span
                  className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    p.dias !== null && p.dias > 30
                      ? "bg-destructive/10 text-destructive"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {p.dias === null
                    ? "Sin fecha registrada"
                    : `${p.dias} día${p.dias === 1 ? "" : "s"} desde la postulación`}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="mt-5 text-right text-[11px] text-muted-foreground">
          Generado automáticamente por{" "}
          <a href="/projects/busqueda-ia" className="underline hover:text-primary">
            Búsqueda IA
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  )
}
