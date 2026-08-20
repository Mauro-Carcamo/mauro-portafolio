"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { X, Search, Sparkles, Brain } from "lucide-react"
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
  totalAnalizadasCV: number
  porPortal: { portal: string; cantidad: number }[]
  porKeyword: { keyword: string; cantidad: number }[]
  porRelevancia: { nivel: string; cantidad: number }[]
  porBigrama: { frase: string; cantidad: number }[]
  sueldos: Record<string, string>
  empresas: Record<string, Postulacion[]>
  generadoEl: string
}

const COLOR_RELEVANCIA: Record<string, string> = {
  Alta: "bg-primary",
  Media: "bg-accent",
  Baja: "bg-amber-500",
  "No Relevante (Keyword)": "bg-muted-foreground/40",
}

const PASOS = [
  {
    icon: Search,
    titulo: "1. Web scraping",
    descripcion: "Un bot recorre 13 portales laborales (Laborum, Chiletrabajos, GetOnBrd, Computrabajo, entre otros) y extrae cada oferta nueva.",
  },
  {
    icon: Sparkles,
    titulo: "2. Enriquecimiento",
    descripcion: "Visita el detalle de cada oferta y completa datos: sueldo, modalidad, requisitos, jornada.",
  },
  {
    icon: Brain,
    titulo: "3. Vinculación con mi CV",
    descripcion: "Compara cada oferta contra mi CV con embeddings semánticos (y opcionalmente un LLM local) para priorizar dónde postular.",
  },
]

interface PostulacionesPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type RespuestaEspecial = "no-aparece" | "no-informar" | null

export function PostulacionesPopup({ open, onOpenChange }: PostulacionesPopupProps) {
  const [empresa, setEmpresa] = useState("")
  const [respuestaEspecial, setRespuestaEspecial] = useState<RespuestaEspecial>(null)

  const postulaciones = empresa ? DATA.empresas[empresa] ?? [] : []
  const maxPortal = Math.max(...DATA.porPortal.map((p) => p.cantidad))
  const maxKeyword = Math.max(...DATA.porKeyword.map((p) => p.cantidad))
  const maxRelevancia = Math.max(...DATA.porRelevancia.map((p) => p.cantidad))
  const maxBigrama = Math.max(...DATA.porBigrama.map((p) => p.cantidad))

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

        {/* Saludo */}
        <DialogTitle className="pr-8 text-lg font-bold tracking-tight">
          👋 Hola, automaticé mi búsqueda laboral
        </DialogTitle>
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
          Construí un sistema que rastrea, analiza y hace seguimiento de postulaciones en 13 portales
          laborales. Esto es lo que encontró, con datos reales.
        </p>

        {/* Pregunta directa al reclutador */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <h3 className="mb-2 text-sm font-semibold text-foreground">¿De qué empresa vienes? 👀</h3>
          <select
            value={empresa}
            onChange={(e) => {
              setEmpresa(e.target.value)
              setRespuestaEspecial(null)
            }}
            className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="">
              — Selecciona tu empresa ({Object.keys(DATA.empresas).length} en la lista) —
            </option>
            {Object.keys(DATA.empresas).map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>

          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setEmpresa("")
                setRespuestaEspecial("no-aparece")
              }}
              className="rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
            >
              No aparece la empresa
            </button>
            <button
              type="button"
              onClick={() => {
                setEmpresa("")
                setRespuestaEspecial("no-informar")
              }}
              className="rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
            >
              Prefiero no informar
            </button>
          </div>

          {respuestaEspecial === "no-aparece" && (
            <p className="mt-2 text-xs text-muted-foreground">
              ¡Gracias por avisar! Probablemente aún no he postulado ahí — buena excusa para revisar sus
              vacantes 👀.
            </p>
          )}
          {respuestaEspecial === "no-informar" && (
            <p className="mt-2 text-xs text-muted-foreground">Sin problema, sigamos 🙂.</p>
          )}

          {postulaciones.length > 0 && (
            <div className="mt-3 space-y-2">
              {postulaciones.map((p, i) => (
                <div key={i} className="rounded-xl border border-border/60 bg-background p-3">
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
        </div>

        {/* El proceso */}
        <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          El proceso es el siguiente
        </h3>
        <div className="space-y-3">
          {PASOS.map((paso) => (
            <div key={paso.titulo} className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <paso.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold">{paso.titulo}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{paso.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-5 border-border/60" />

        {/* Resultados */}
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
          Los resultados son los siguientes
        </h3>

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

        <h4 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
          Ofertas por plataforma
        </h4>
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

        <h4 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
          Ofertas por palabra clave
        </h4>
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

        <h4 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
          Ofertas según relevancia con mi CV
        </h4>
        <div className="space-y-1.5">
          {DATA.porRelevancia.map((p) => (
            <div key={p.nivel} className="flex items-center gap-2 text-xs">
              <span className="w-28 shrink-0 truncate">{p.nivel}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className={`block h-full rounded-full ${COLOR_RELEVANCIA[p.nivel] ?? "bg-primary"}`}
                  style={{ width: `${(p.cantidad / maxRelevancia) * 100}%` }}
                />
              </span>
              <span className="w-8 shrink-0 text-right text-muted-foreground">{p.cantidad}</span>
            </div>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          Sobre {DATA.totalAnalizadasCV} ofertas comparadas contra mi CV con embeddings semánticos.
        </p>

        <h4 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
          Frases que más se repiten en las ofertas
        </h4>
        <div className="space-y-1.5">
          {DATA.porBigrama.map((p) => (
            <div key={p.frase} className="flex items-center gap-2 text-xs">
              <span className="w-28 shrink-0 truncate">{p.frase}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: `${(p.cantidad / maxBigrama) * 100}%` }}
                />
              </span>
              <span className="w-8 shrink-0 text-right text-muted-foreground">{p.cantidad}</span>
            </div>
          ))}
        </div>

        <h4 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
          Sueldos del mercado
        </h4>
        <div className="rounded-xl border border-border/60 bg-muted/40 p-3 text-xs">
          <p className="mb-2 text-muted-foreground">
            Solo {DATA.sueldos["% con sueldo"]} de las ofertas informa sueldo — con eso:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-muted-foreground">Mediana</div>
              <div className="font-semibold">{DATA.sueldos["Mediana sueldo mínimo"]}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Máximo encontrado</div>
              <div className="font-semibold">{DATA.sueldos["Sueldo máximo encontrado"]}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Rango típico (P25–P75)</div>
              <div className="font-semibold">
                {DATA.sueldos["P25 sueldo mínimo"]} – {DATA.sueldos["P75 sueldo mínimo"]}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Portal más transparente</div>
              <div className="font-semibold">{DATA.sueldos["Portal más transparente"]}</div>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}
