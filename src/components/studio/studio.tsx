import { useEffect, useRef, useState } from "react";
import { ChevronDown, Copy, Download, LineChart, Moon, RotateCcw, SlidersHorizontal, Sun, Table2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { ChartCard, frameStyle } from "@/components/studio/chart-card";
import { DataPanel, StylePanel } from "@/components/studio/panels";
import { readFileAsText } from "@/lib/chart/csv";
import {
  chartToPng,
  chartToSvg,
  copyNodeImage,
  downloadBlob,
  downloadUrl,
  waitForPlot,
} from "@/lib/chart/export-image";
import { aspectOf, exportPixels, slugify } from "@/lib/chart/model";
import { useChartStore } from "@/lib/chart/store";
import { cn } from "@/lib/cn";

type MobileTab = "chart" | "style" | "data";
type ExportMode = "png" | "svg";

export function Studio() {
  const theme = useChartStore((state) => state.theme);
  const setTheme = useChartStore((state) => state.setTheme);
  const loadSample = useChartStore((state) => state.loadSample);
  const loadCsv = useChartStore((state) => state.loadCsv);
  const title = useChartStore((state) => state.title);
  const rows = useChartStore((state) => state.rows);
  const series = useChartStore((state) => state.series);
  const size = useChartStore((state) => state.size);
  const output = useChartStore((state) => state.output);
  const customWidth = useChartStore((state) => state.customWidth);
  const customHeight = useChartStore((state) => state.customHeight);
  const [tab, setTab] = useState<MobileTab>("chart");
  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy] = useState<ExportMode | "copy" | null>(null);
  const [job, setJob] = useState<{ width: number; height: number; mode: ExportMode } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [ready, setReady] = useState(false);
  const previewRef = useRef<HTMLElement>(null);
  const exportRef = useRef<HTMLElement>(null);
  const dragDepth = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const ratio = aspectOf({
    title,
    subtitle: "",
    palette: "default",
    size,
    customWidth,
    customHeight,
    grid: "light",
    output,
    legend: "top",
    xLabel: "",
    yLeftLabel: "",
    yRightLabel: "",
    showLabels: false,
    stackBars: false,
    series,
    rows,
  });
  const pixels = exportPixels({
    title,
    subtitle: "",
    palette: "default",
    size,
    customWidth,
    customHeight,
    grid: "light",
    output,
    legend: "top",
    xLabel: "",
    yLeftLabel: "",
    yRightLabel: "",
    showLabels: false,
    stackBars: false,
    series,
    rows,
  });

  useEffect(() => {
    void Promise.resolve(useChartStore.persist.rehydrate()).finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [ready, theme]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [menuOpen]);

  useEffect(() => {
    if (!job) return;
    let cancelled = false;
    const mode = job.mode;
    void (async () => {
      try {
        const node = exportRef.current;
        if (!node) throw new Error("Export surface missing");
        await waitForPlot(node, job.width);
        if (cancelled) return;
        const filename = slugify(useChartStore.getState().title);
        if (mode === "png") {
          const blob = await chartToPng(node, job.width, job.height);
          if (cancelled) return;
          downloadBlob(blob, `${filename}.png`);
          toast.success("Downloaded PNG");
        } else {
          const url = await chartToSvg(node);
          if (cancelled) return;
          downloadUrl(url, `${filename}.svg`);
          toast.success("Downloaded SVG");
        }
      } catch {
        if (!cancelled) toast.error("Couldn't export the chart. Try again.");
      } finally {
        if (!cancelled) {
          setJob(null);
          setBusy(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [job]);

  function startExport(mode: ExportMode) {
    if (busy) return;
    setMenuOpen(false);
    setBusy(mode);
    const next = exportPixels(useChartStore.getState());
    setJob({ width: next.width, height: next.height, mode });
  }

  async function copyImage() {
    const node = previewRef.current;
    if (!node || busy) return;
    setMenuOpen(false);
    setBusy("copy");
    try {
      await copyNodeImage(node);
      toast.success("Copied image");
    } catch {
      toast.error("Couldn't copy the image. Download the PNG instead.");
    } finally {
      setBusy(null);
    }
  }

  async function acceptFile(file: File | undefined) {
    if (!file) return;
    if (file.size > 2_000_000) {
      toast.error("That file is larger than 2 MB.");
      return;
    }
    try {
      const text = await readFileAsText(file);
      const result = loadCsv(text);
      if (result.ok) {
        toast.success(result.notice ?? "Chart data loaded");
        setTab("chart");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Couldn't read that file.");
    }
  }

  const tabs: { id: MobileTab; label: string; icon: typeof LineChart }[] = [
    { id: "chart", label: "Chart", icon: LineChart },
    { id: "style", label: "Style", icon: SlidersHorizontal },
    { id: "data", label: "Data", icon: Table2 },
  ];

  return (
    <div
      className="studio-shell"
      onDragEnter={(event) => {
        if (![...event.dataTransfer.types].includes("Files")) return;
        event.preventDefault();
        dragDepth.current += 1;
        setDragOver(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        dragDepth.current -= 1;
        if (dragDepth.current <= 0) {
          dragDepth.current = 0;
          setDragOver(false);
        }
      }}
      onDragOver={(event) => {
        if ([...event.dataTransfer.types].includes("Files")) event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
        dragDepth.current = 0;
        setDragOver(false);
        void acceptFile(event.dataTransfer.files?.[0]);
      }}
    >
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-surface px-3 sm:px-4">
        <span className="grid size-9 grid-cols-3 items-end gap-0.5 rounded-xl bg-primary px-2 py-1.5" aria-hidden>
          <span className="h-2 rounded-sm bg-primary-fg/80" />
          <span className="h-4 rounded-sm bg-primary-fg" />
          <span className="h-3 rounded-sm bg-primary-fg/80" />
        </span>
        <div className="min-w-0 leading-tight">
          <h1 className="truncate text-sm font-semibold text-fg">Chart Studio</h1>
          <p className="hidden text-xs text-muted sm:block">Bars, lines, and a second axis</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            aria-label="Reset to the revenue sample"
            onClick={() => {
              loadSample("revenue-growth");
              setTab("chart");
            }}
            className="grid size-11 place-items-center rounded-xl text-muted transition hover:bg-surface-2 hover:text-fg"
          >
            <RotateCcw className="size-4" />
          </button>
          <button
            type="button"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="grid size-11 place-items-center rounded-xl text-muted transition hover:bg-surface-2 hover:text-fg"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </header>

      <div className="studio-grid">
        <div className="border-b border-border bg-surface px-3 py-2 xl:hidden">
          <div className="grid grid-cols-3 gap-1 rounded-2xl bg-surface-2 p-1" role="tablist" aria-label="Studio sections">
            {tabs.map((item) => {
              const Icon = item.icon;
              const selected = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium transition",
                    selected ? "bg-surface text-fg shadow-sm" : "text-muted hover:text-fg",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <aside className={cn("panel-scroll bg-surface xl:border-r xl:border-border", tab !== "style" && "max-xl:hidden")}>
          <StylePanel onSample={() => setTab("chart")} />
        </aside>

        <section className={cn("flex min-h-0 min-w-0 flex-col bg-bg", tab !== "chart" && "max-xl:hidden")}>
          <div className="min-h-0 flex-1 p-3 sm:p-5">
            <div className="fit-host">
              <div style={frameStyle(ratio)}>
                <ChartCard ref={previewRef} />
              </div>
            </div>
          </div>
          <footer className="flex flex-col gap-3 border-t border-border px-3 py-3 sm:flex-row sm:items-center sm:px-5">
            <p className="text-xs text-muted sm:flex-1">
              {rows.length} categories · {series.length} series
              <span className="px-1.5">·</span>
              {pixels.label} {pixels.width}×{pixels.height}
            </p>
            <div ref={menuRef} className="relative flex w-full sm:w-auto">
              <button
                type="button"
                onClick={() => startExport("png")}
                disabled={busy !== null || series.length === 0 || rows.length === 0}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-l-xl bg-primary px-4 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover disabled:opacity-50 sm:flex-none"
              >
                <Download className="size-4" />
                {busy === "png" ? "Preparing…" : "Download PNG"}
              </button>
              <button
                type="button"
                aria-label="More download options"
                aria-expanded={menuOpen}
                disabled={busy !== null}
                onClick={() => setMenuOpen((open) => !open)}
                className="grid h-11 w-11 place-items-center rounded-r-xl border-l border-primary-fg/20 bg-primary text-primary-fg transition hover:bg-primary-hover disabled:opacity-50"
              >
                <ChevronDown className="size-4" />
              </button>
              {menuOpen ? (
                <div className="absolute right-0 bottom-12 z-20 w-48 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-card">
                  <button
                    type="button"
                    onClick={() => startExport("svg")}
                    className="flex h-11 w-full items-center gap-2 px-3 text-left text-sm text-fg hover:bg-surface-2"
                  >
                    <Download className="size-4 text-muted" />
                    Download SVG
                  </button>
                  <button
                    type="button"
                    onClick={() => void copyImage()}
                    className="flex h-11 w-full items-center gap-2 px-3 text-left text-sm text-fg hover:bg-surface-2"
                  >
                    <Copy className="size-4 text-muted" />
                    Copy image
                  </button>
                </div>
              ) : null}
            </div>
          </footer>
        </section>

        <aside className={cn("panel-scroll bg-surface xl:border-l xl:border-border", tab !== "data" && "max-xl:hidden")}>
          <DataPanel onLoaded={() => setTab("chart")} />
        </aside>
      </div>

      {job ? (
        <div className="pointer-events-none fixed top-0 left-0 -z-10" aria-hidden>
          <div style={{ width: job.width, height: job.height, position: "absolute", left: -20000 }}>
            <ChartCard ref={exportRef} exporting />
          </div>
        </div>
      ) : null}

      {dragOver ? (
        <div className="pointer-events-none fixed inset-0 z-40 grid place-items-center bg-bg/80 p-6">
          <p className="rounded-2xl border border-primary bg-surface px-6 py-4 text-sm font-semibold text-fg">
            Drop a CSV to load it
          </p>
        </div>
      ) : null}

      <Toaster position="top-center" theme={theme} />
    </div>
  );
}
