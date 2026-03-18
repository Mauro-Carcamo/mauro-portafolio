"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Code2, ExternalLink, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Metrics = {
  rows: number;
  vocab_size: number;
  totals: Record<string, number>;
  top_global: Array<{ word: string; total: number }>;
};

type TopWords = Record<string, Array<{ word: string; count: number }>>;

type ChartItem = {
  src: string;
  title: string;
  description?: string;
};

type CorpusName = "Antiguo Test" | "Nuevo Test" | "Coran" | "Tora" | "Upanishads";

type CorpusKey = "antiguo_test" | "nuevo_test" | "coran" | "tora" | "upanishads";

type PipelineStep = {
  id:
    | "extract"
    | "clean"
    | "tokenize"
    | "count"
    | "compare"
    | "visualize";
  title: string;
  caption: string;
};

function formatCompactInteger(value: number) {
  return value.toLocaleString();
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "0%";
  if (value >= 10) return `${value.toFixed(0)}%`;
  if (value >= 1) return `${value.toFixed(1)}%`;
  if (value >= 0.1) return `${value.toFixed(2)}%`;
  return `${value.toFixed(3)}%`;
}

type IconifyImgProps = {
  icon: string;
  color?: string;
  alt?: string;
  className?: string;
};

function iconifyUrl(icon: string, color?: string) {
  const base = `https://api.iconify.design/${icon}.svg`;
  if (!color) return base;
  return `${base}?color=${encodeURIComponent(color)}`;
}

function IconifyImg({ icon, color, alt = "", className }: IconifyImgProps) {
  return (
    <img
      src={iconifyUrl(icon, color)}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      loading="lazy"
      className={className}
    />
  );
}const PIPELINE_CODE = {
  extract: `import PyPDF2

pdf_reader = PyPDF2.PdfReader(documento)
texto_completo = ""
for page in pdf_reader.pages:
    texto_completo += page.extract_text()`,
  clean: `texto_limpio = texto.lower()
texto_limpio = texto_limpio.translate(
    str.maketrans('', '', string.punctuation)
)`,
  tokenize: `palabras = word_tokenize(texto_limpio)
stop = stopwords.words('spanish')
palabras = [p for p in palabras if p not in stop]`,
  count: `from collections import Counter

contador = Counter(palabras)
sorted_counts = sorted(
    contador.items(), key=lambda x: x[1], reverse=True
)
df = pd.DataFrame(sorted_counts, columns=['Word', 'Count'])`,
  compare: `# notebook (resumen)
df_merged.to_csv('frec_textos_sagrados.csv', index=False)

# portafolio
metrics = metrics_from_combined(COMBINED)
(Path("portfolio_metrics.json")).write_text(json.dumps(metrics))`,
  visualize: `charts_dir = ROOT / "portfolio_charts"
chart_global_top(COMBINED, charts_dir / "top_global.png")
chart_comparison_heatmap(COMBINED, charts_dir / "comparison_heatmap.png")`,
} as const;

type CodeCardProps = {
  title: string;
  description: string;
  code: string;
};

function CodeCard({ title, description, code }: CodeCardProps) {
  return (
    <aside className="rounded-2xl border bg-slate-950 p-4 text-slate-50 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-800 bg-slate-900/60">
          <Code2 className="h-4 w-4 text-slate-200" />
        </span>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          {title}
        </p>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-slate-300">{description}</p>
      <pre className="mt-3 max-h-[260px] overflow-auto rounded-xl bg-slate-900/60 p-3 text-[11px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </aside>
  );
}

export default function ReligiousTextsProject() {
  const chartItems: ChartItem[] = useMemo(
    () => [
      {
        src: "/projects/religious-texts/charts/top_global.png",
        title: "Top global",
        description: "Palabras con mayor frecuencia total (suma de corpora).",
      },
      {
        src: "/projects/religious-texts/charts/comparison_heatmap.png",
        title: "Comparación normalizada",
        description: "Heatmap 0–1 por corpus para las palabras más frecuentes.",
      },
      {
        src: "/projects/religious-texts/charts/top_antiguo_test.png",
        title: "Antiguo Testamento",
      },
      {
        src: "/projects/religious-texts/charts/top_nuevo_test.png",
        title: "Nuevo Testamento",
      },
      {
        src: "/projects/religious-texts/charts/top_coran.png",
        title: "Corán",
      },
      {
        src: "/projects/religious-texts/charts/top_tora.png",
        title: "Torá",
      },
      {
        src: "/projects/religious-texts/charts/top_upanishads.png",
        title: "Upanishads",
      },
    ],
    [],
  );

  const technologies = [
    "Python",
    "NLTK",
    "PyPDF2",
    "pandas",
    "Matplotlib",
    "Seaborn",
    "NLP",
  ];

  const pipelineSteps: PipelineStep[] = useMemo(
    () => [
      { id: "extract", title: "Extracción de datos", caption: "PDF → texto plano", icon: "ph:file-pdf", color: "#4f46e5" },
      { id: "clean", title: "Preprocesamiento", caption: "limpieza + normalización", icon: "ph:sparkle", color: "#0ea5e9" },
      { id: "tokenize", title: "Tokenización y filtrado", caption: "tokens + stopwords", icon: "ph:funnel", color: "#8b5cf6" },
      { id: "count", title: "Análisis de frecuencia", caption: "ocurrencias + métricas", icon: "ph:hash", color: "#10b981" },
      { id: "compare", title: "Comparación de corpus", caption: "comparativo entre corpora", icon: "ph:table", color: "#f59e0b" },
      { id: "visualize", title: "Visualización de resultados", caption: "gráficos e insights", icon: "ph:chart-bar", color: "#f43f5e" },
    ],
    [],
  );

  const corpusOrder: CorpusName[] = useMemo(
    () => ["Antiguo Test", "Nuevo Test", "Coran", "Tora", "Upanishads"],
    [],
  );

  const corpusKeyByName: Record<CorpusName, CorpusKey> = useMemo(
    () => ({
      "Antiguo Test": "antiguo_test",
      "Nuevo Test": "nuevo_test",
      Coran: "coran",
      Tora: "tora",
      Upanishads: "upanishads",
    }),
    [],
  );

  const corpusMetaByName: Record<
    CorpusName,
    { religion: string; iconSrc: string }
  > = useMemo(
    () => ({
      "Antiguo Test": {
        religion: "Cristianismo",
        iconSrc: "/projects/religious-texts/icons/christianity.svg",
      },
      "Nuevo Test": {
        religion: "Cristianismo",
        iconSrc: "/projects/religious-texts/icons/christianity.svg",
      },
      Coran: {
        religion: "Islam",
        iconSrc: "/projects/religious-texts/icons/islam.svg",
      },
      Tora: {
        religion: "Judaismo",
        iconSrc: "/projects/religious-texts/icons/judaism.svg",
      },
      Upanishads: {
        religion: "Hinduismo",
        iconSrc: "/projects/religious-texts/icons/hinduism.svg",
      },
    }),
    [],
  );

  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [topWords, setTopWords] = useState<TopWords | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const [mRes, tRes] = await Promise.all([
        fetch("/projects/religious-texts/portfolio_metrics.json", {
          cache: "force-cache",
        }),
        fetch("/projects/religious-texts/portfolio_top_words.json", {
          cache: "force-cache",
        }),
      ]);

      const nextMetrics = mRes.ok ? await mRes.json().catch(() => null) : null;
      const nextTop = tRes.ok ? await tRes.json().catch(() => null) : null;

      if (!mounted) return;
      setMetrics(nextMetrics);
      setTopWords(nextTop);
    };

    load().catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, []);

  const topGlobal = metrics?.top_global?.slice(0, 10) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link href="/#projects">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a Proyectos
              </Button>
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <Badge variant="secondary">NLP</Badge>
              <Badge variant="secondary">Análisis comparativo</Badge>
              <Badge variant="secondary">Python</Badge>
            </div>
          </div>

          <header className="rounded-2xl border bg-card/70 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Textos Religiosos y Machine Learning
                </h1>
                <p className="mt-2 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Comparación de textos sagrados con NLP: frecuencias de palabras,
                  contraste entre corpora y visualizaciones.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <a href="#pipeline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Ver Proceso
                  </a>
                </Button>
                <Button asChild className="rounded-full">
                  <a href="#demo" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Ver Demo
                  </a>
                </Button>
                <Button variant="outline" asChild className="rounded-full">
                  <a
                    href="https://github.com/Mauro-Carcamo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <Github className="h-4 w-4" />
                    Ver Código
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="font-semibold">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </header>

          <div className="mt-8 grid gap-6">
                        <Card
              id="top-corpus"
              className="scroll-mt-24 border bg-card/70 shadow-sm backdrop-blur"
            >
              <CardHeader>
                <CardTitle className="text-xl">Top por corpus (top 10)</CardTitle>
              </CardHeader>
              <CardContent>
                {topWords ? (
                  <div className="grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
                    {corpusOrder.map((name) => {
                      const words = topWords[name] ?? [];
                      const key = corpusKeyByName[name];
                      const meta = corpusMetaByName[name];
                      const corpusTotal = metrics?.totals?.[key] ?? null;

                      return (
                        <div
                          key={name}
                          className="rounded-2xl border bg-background/60 p-4 shadow-sm h-full flex flex-col"
                        >
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border bg-muted">
                                <img
                                  src={meta.iconSrc}
                                  alt=""
                                  aria-hidden={true}
                                  className="h-5 w-5 text-slate-700"
                                />
                              </span>
                              <p className="text-sm font-semibold">{name}</p>
                            </div>
                            <p className="mt-2 text-[11px] font-semibold text-muted-foreground">
                              {meta.religion}
                            </p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              Total palabras:{" "}
                              {corpusTotal === null
                                ? "..."
                                : formatCompactInteger(corpusTotal)}
                            </p>
                          </div>

                          <div className="mt-3 rounded-xl border bg-muted/30 px-3 py-2">
                            <div className="grid grid-cols-[1fr_70px_56px] gap-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                              <span>Palabra</span>
                              <span className="text-right">Veces</span>
                              <span className="text-right">%</span>
                            </div>
                          </div>

                          <div className="mt-2 flex-1">
                            {words.length ? (
                              <ul className="space-y-1.5 text-xs text-muted-foreground">
                                {words.slice(0, 10).map((w) => {
                                  const pct =
                                    corpusTotal && corpusTotal > 0
                                      ? (w.count / corpusTotal) * 100
                                      : 0;
                                  return (
                                    <li
                                      key={`${name}-${w.word}`}
                                      className="grid grid-cols-[1fr_70px_56px] items-baseline gap-3 rounded-lg px-2 py-1 hover:bg-muted/40"
                                    >
                                      <span
                                        className="truncate whitespace-nowrap"
                                        title={w.word}
                                      >
                                        {w.word}
                                      </span>
                                      <span className="tabular-nums whitespace-nowrap text-right text-slate-800">
                                        {formatCompactInteger(w.count)}
                                      </span>
                                      <span className="tabular-nums whitespace-nowrap text-right text-[11px] text-emerald-700">
                                        {formatPercent(pct)}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : (
                              <p className="mt-1 text-xs text-muted-foreground">Sin datos.</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Cargando...</p>
                )}
              </CardContent>
            </Card>
            <Card
              id="pipeline"
              className="scroll-mt-24 border bg-card/70 shadow-sm backdrop-blur"
            >
              <CardHeader>
                <CardTitle className="text-xl">
                  Pipeline de análisis de texto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Estos son los pasos del análisis y cómo se conectan con los
                  resultados que ves abajo.
                </p>

                <nav aria-label="Pasos del análisis">
                  <ol className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
                    {pipelineSteps.map((step, idx) => (
                      <li key={step.id}>
                        <a
                          href={`#step-${step.id}`}
                          style={{ borderTopColor: step.color }}
                          className="group relative block rounded-2xl border border-border/60 bg-background/60 px-3 py-3 transition-[transform,box-shadow,background-color] duration-200 hover:bg-muted/40 hover:shadow-sm hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background border-t-4"
                        >
                          <span className="absolute right-2 top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full border bg-background/80 px-1 text-[10px] font-semibold tabular-nums text-muted-foreground transition-transform duration-200 group-hover:scale-105">
                            {idx + 1}
                          </span>
                          <div className="flex items-start gap-3">
                            <span style={{ borderColor: step.color }}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background/70">
                              <IconifyImg
                                icon={step.icon}
                                color={step.color}
                                className="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
                              />
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-baseline gap-2">
                                <p className="text-sm font-semibold text-foreground leading-snug whitespace-normal">
                                  {step.title}
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground leading-snug whitespace-normal">
                                {step.caption}
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
                <div className="space-y-4">
                                    <section
                    id="step-extract"
                    className="scroll-mt-24 rounded-2xl border bg-card/70 p-5 shadow-sm backdrop-blur border-t-4 border-indigo-400/40 bg-gradient-to-b from-indigo-500/5 to-transparent"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold">1) Extracción de datos</p>
                      <p className="text-sm text-muted-foreground">
                        Tomamos documentos y los convertimos a texto para poder analizarlos.
                      </p>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-2xl border bg-background/60 p-4 shadow-sm">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Qué ocurre (visual)
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              <IconifyImg icon="ph:file-pdf" color="#4f46e5" className="h-4 w-4" /> PDFs
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              Texto plano
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground">
                            Extraemos el contenido de cada página y lo unimos en un solo texto por corpus.
                          </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Entrada</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              PDFs por corpus (Biblia, Corán, Torá, Upanishads).
                            </p>
                          </div>
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Proceso</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Recorre páginas y concatena el texto.
                            </p>
                          </div>
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Salida</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Texto listo para limpiar, tokenizar y contar.
                            </p>
                          </div>
                        </div>
                      </div>

                      <CodeCard
                        title="Código clave (extracción)"
                        description="Convierte un PDF en texto recorriendo sus páginas y acumulando el contenido."
                        code={PIPELINE_CODE.extract}
                      />
                    </div>
                  </section>

                                    <section
                    id="step-clean"
                    className="scroll-mt-24 rounded-2xl border bg-card/70 p-5 shadow-sm backdrop-blur border-t-4 border-sky-400/40 bg-gradient-to-b from-sky-500/5 to-transparent"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold">2) Preprocesamiento</p>
                      <p className="text-sm text-muted-foreground">
                        Dejamos el texto “parejo”: sin mayúsculas ni signos que ensucian el conteo.
                      </p>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-2xl border bg-background/60 p-4 shadow-sm">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Qué ocurre (visual)
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              Texto original
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              <IconifyImg icon="ph:sparkle" color="#0ea5e9" className="h-4 w-4" /> Texto limpio
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground">
                            Evita que variaciones como “Dios”, “dios” y “dios,” se cuenten distinto.
                          </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Normaliza</p>
                            <p className="mt-1 text-xs text-muted-foreground">Minúsculas + quita puntuación.</p>
                          </div>
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Filtra</p>
                            <p className="mt-1 text-xs text-muted-foreground">Opcional: remueve palabras muy largas.</p>
                          </div>
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Mejora</p>
                            <p className="mt-1 text-xs text-muted-foreground">Conteo más estable y comparable.</p>
                          </div>
                        </div>
                      </div>

                      <CodeCard
                        title="Código clave (limpieza)"
                        description="Pasa a minúsculas y elimina signos para que el conteo sea consistente."
                        code={PIPELINE_CODE.clean}
                      />
                    </div>
                  </section>

                                    <section
                    id="step-tokenize"
                    className="scroll-mt-24 rounded-2xl border bg-card/70 p-5 shadow-sm backdrop-blur border-t-4 border-violet-400/40 bg-gradient-to-b from-violet-500/5 to-transparent"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold">3) Tokenización y filtrado</p>
                      <p className="text-sm text-muted-foreground">
                        Separamos el texto en palabras y quitamos palabras muy comunes (“de”, “la”, “y”…).
                      </p>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-2xl border bg-background/60 p-4 shadow-sm">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Qué ocurre (visual)
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              Frase
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              Tokens
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              <IconifyImg icon="ph:funnel" color="#8b5cf6" className="h-4 w-4" /> Sin stopwords
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground">
                            Nos quedamos con palabras con más significado y evitamos conectores del idioma.
                          </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Tokeniza</p>
                            <p className="mt-1 text-xs text-muted-foreground">Texto → lista de palabras.</p>
                          </div>
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Stopwords</p>
                            <p className="mt-1 text-xs text-muted-foreground">Elimina palabras muy frecuentes.</p>
                          </div>
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Resultado</p>
                            <p className="mt-1 text-xs text-muted-foreground">Tokens filtrados para contar.</p>
                          </div>
                        </div>
                      </div>

                      <CodeCard
                        title="Código clave (tokens + stopwords)"
                        description="Tokeniza y elimina stopwords en español para quedarnos con términos más informativos."
                        code={PIPELINE_CODE.tokenize}
                      />
                    </div>
                  </section>

                                    <section
                    id="step-count"
                    className="scroll-mt-24 rounded-2xl border bg-card/70 p-5 shadow-sm backdrop-blur border-t-4 border-emerald-400/40 bg-gradient-to-b from-emerald-500/5 to-transparent"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold">4) Análisis de frecuencia</p>
                      <p className="text-sm text-muted-foreground">
                        Contamos cuántas veces aparece cada palabra y armamos rankings por corpus.
                      </p>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-2xl border bg-background/60 p-4 shadow-sm">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Qué ocurre (visual)
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              Tokens
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              <IconifyImg icon="ph:hash" color="#10b981" className="h-4 w-4" /> Conteo
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              Ranking (Top 10)
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground">
                            Esto alimenta el “Top por corpus” y el “Top global” (sección{" "}
                            <a href="#demo" className="font-semibold text-slate-800 underline underline-offset-2">
                              Demo
                            </a>
                            ).
                          </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">CSVs</p>
                            <p className="mt-1 text-xs text-muted-foreground">Frecuencias por corpus (frec_*.csv).</p>
                          </div>
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Ejemplo (Top global)</p>
                            {topGlobal.length ? (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {topGlobal.slice(0, 6).map((item) => (
                                  <span
                                    key={`pipeline-top-${item.word}`}
                                    className="rounded-full border bg-muted px-2 py-0.5 text-[11px] font-semibold"
                                    title={`${formatCompactInteger(item.total)} apariciones`}
                                  >
                                    {item.word}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="mt-2 text-xs text-muted-foreground">Cargando…</p>
                            )}
                          </div>
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Qué significa</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Palabras con mayor repetición (no necesariamente “más importantes”).
                            </p>
                          </div>
                        </div>

                        {metrics?.totals ? (
                          <div className="rounded-2xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Totales por corpus (contexto)
                            </p>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                              {corpusOrder.map((name) => {
                                const key = corpusKeyByName[name];
                                const total = metrics.totals[key] ?? 0;
                                return (
                                  <div
                                    key={`pipeline-total-${name}`}
                                    className="flex items-center justify-between gap-2 rounded-xl border bg-background px-3 py-2"
                                  >
                                    <span className="truncate">{name}</span>
                                    <span className="tabular-nums font-semibold text-slate-800">
                                      {formatCompactInteger(total)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <CodeCard
                        title="Código clave (conteo)"
                        description="Cuenta ocurrencias y ordena resultados para construir el ranking de palabras más frecuentes."
                        code={PIPELINE_CODE.count}
                      />
                    </div>
                  </section>

                                    <section
                    id="step-compare"
                    className="scroll-mt-24 rounded-2xl border bg-card/70 p-5 shadow-sm backdrop-blur border-t-4 border-amber-400/40 bg-gradient-to-b from-amber-500/5 to-transparent"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold">5) Comparación de corpus</p>
                      <p className="text-sm text-muted-foreground">
                        Comparamos textos entre sí para ver qué palabras destacan en cada uno.
                      </p>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-2xl border bg-background/60 p-4 shadow-sm">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Qué ocurre (visual)
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              Rankings por corpus
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              <IconifyImg icon="ph:table" color="#f59e0b" className="h-4 w-4" /> Tabla combinada
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              Comparación
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground">
                            Al combinar, cada palabra queda en una fila y vemos su frecuencia en cada texto.
                          </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Tabla final</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              <span className="font-mono">frec_textos_sagrados.csv</span>
                            </p>
                          </div>
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Métricas</p>
                            <p className="mt-1 text-xs text-muted-foreground">Resumen del análisis.</p>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs">
                              <span className="rounded-full border bg-muted px-3 py-1 font-semibold">
                                Vocab: {metrics ? formatCompactInteger(metrics.vocab_size) : "..."}
                              </span>
                              <span className="rounded-full border bg-muted px-3 py-1 font-semibold">
                                Filas: {metrics ? formatCompactInteger(metrics.rows) : "..."}
                              </span>
                            </div>
                          </div>
                          <div className="rounded-xl border bg-background/60 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-800">Ver gráfico</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Revisa la comparación en{" "}
                              <a href="#charts" className="font-semibold text-slate-800 underline underline-offset-2">
                                Gráficos
                              </a>.
                            </p>
                          </div>
                        </div>
                      </div>

                      <CodeCard
                        title="Código clave (comparación)"
                        description="Guarda la tabla combinada para comparar corpora y genera métricas/JSON del portafolio."
                        code={PIPELINE_CODE.compare}
                      />
                    </div>
                  </section>

                                    <section
                    id="step-visualize"
                    className="scroll-mt-24 rounded-2xl border bg-card/70 p-5 shadow-sm backdrop-blur border-t-4 border-rose-400/40 bg-gradient-to-b from-rose-500/5 to-transparent"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold">6) Visualización de resultados</p>
                      <p className="text-sm text-muted-foreground">
                        Convertimos números en gráficos para detectar patrones rápido.
                      </p>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-2xl border bg-background/60 p-4 shadow-sm">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Qué ocurre (visual)
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              Datos
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              <IconifyImg icon="ph:chart-bar" color="#f43f5e" className="h-4 w-4" /> Gráficos
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-semibold">
                              Insights
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground">
                            Usamos PNGs estáticos para que la página cargue rápido.
                          </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <figure className="overflow-hidden rounded-2xl border bg-background shadow-sm">
                            <div className="relative aspect-video w-full bg-muted">
                              <Image
                                src="/projects/religious-texts/charts/top_global.png"
                                alt="Top global"
                                fill
                                sizes="(min-width: 1024px) 520px, 100vw"
                                className="object-contain"
                              />
                            </div>
                            <figcaption className="px-4 py-3">
                              <p className="text-sm font-semibold">Top global</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Palabras más repetidas sumando todos los textos.
                              </p>
                            </figcaption>
                          </figure>

                          <figure className="overflow-hidden rounded-2xl border bg-background shadow-sm">
                            <div className="relative aspect-video w-full bg-muted">
                              <Image
                                src="/projects/religious-texts/charts/comparison_heatmap.png"
                                alt="Heatmap comparativo"
                                fill
                                sizes="(min-width: 1024px) 520px, 100vw"
                                className="object-contain"
                              />
                            </div>
                            <figcaption className="px-4 py-3">
                              <p className="text-sm font-semibold">Heatmap comparativo</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Comparación normalizada para ver diferencias entre corpora.
                              </p>
                            </figcaption>
                          </figure>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Ver la galería completa en{" "}
                          <a href="#charts" className="font-semibold text-slate-800 underline underline-offset-2">
                            Gráficos
                          </a>.
                        </p>
                      </div>

                      <CodeCard
                        title="Código clave (gráficos)"
                        description="Genera las imágenes del portafolio (top global y heatmap) desde la tabla combinada."
                        code={PIPELINE_CODE.visualize}
                      />
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>

            <Card
              id="demo"
              className="scroll-mt-24 border bg-card/70 shadow-sm backdrop-blur"
            >
              <CardHeader>
                <CardTitle className="text-xl">Demo (resumen)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border bg-background/60 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Vocabulario total
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {metrics ? formatCompactInteger(metrics.vocab_size) : "..."}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Palabras únicas en la tabla combinada.
                    </p>
                  </div>
                  <div className="rounded-xl border bg-background/60 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Filas agregadas
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {metrics ? formatCompactInteger(metrics.rows) : "..."}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Registros de frecuencia combinados.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Top global (palabras)
                  </p>
                  {topGlobal.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {topGlobal.map((item) => (
                        <span
                          key={item.word}
                          className="rounded-full border bg-muted px-3 py-1 text-xs font-semibold"
                          title={`${formatCompactInteger(item.total)} apariciones`}
                        >
                          {item.word}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">
                      Cargando...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card
              id="charts"
              className="scroll-mt-24 border bg-card/70 shadow-sm backdrop-blur"
            >
              <CardHeader>
                <CardTitle className="text-xl">Gráficos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {chartItems.map((item) => (
                    <figure
                      key={item.src}
                      className="rounded-2xl border bg-background overflow-hidden shadow-sm"
                    >
                      <div className="relative aspect-video w-full bg-muted">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 520px, 100vw"
                          className="object-contain"
                        />
                      </div>
                      <figcaption className="p-4">
                        <p className="text-sm font-semibold">{item.title}</p>
                        {item.description ? (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        ) : null}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}































