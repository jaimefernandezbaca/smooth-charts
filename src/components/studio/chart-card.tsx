import { Suspense, forwardRef, lazy, useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { Pencil } from "lucide-react";
import { useChartStore } from "@/lib/chart/store";
import { type Series, clamp } from "@/lib/chart/model";
import { cn } from "@/lib/cn";

const ChartSvg = lazy(() => import("./chart-svg"));

function useElementSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const apply = (width: number, height: number) => {
      const next = { width: Math.round(width), height: Math.round(height) };
      setSize((prev) => (prev.width === next.width && prev.height === next.height ? prev : next));
    };
    apply(element.clientWidth, element.clientHeight);
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      apply(rect.width, rect.height);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return reduced;
}

function Swatch({ series }: { series: Series }) {
  if (series.type === "line") {
    return (
      <svg viewBox="0 0 22 10" className="h-2.5 w-6 shrink-0" aria-hidden>
        <line x1="1" y1="5" x2="21" y2="5" stroke={series.color} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="11" cy="5" r="2.4" fill={series.color} />
      </svg>
    );
  }
  return (
    <span
      className={cn("h-2.5 shrink-0 rounded-sm", series.type === "area" ? "w-6" : "w-3.5")}
      style={{ backgroundColor: series.color, opacity: series.type === "area" ? 0.85 : 1 }}
    />
  );
}

function AxisTitle({ text, fontSize }: { text: string; fontSize: number }) {
  return (
    <div className="flex items-center justify-center px-1">
      <span
        className="font-semibold whitespace-nowrap text-plot-muted"
        style={{ fontSize, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {text}
      </span>
    </div>
  );
}
  series,
  vertical,
  fontSize,
}: {
  series: Series[];
  vertical?: boolean;
  fontSize: number;
}) {
  return (
    <ul
      className={cn("flex gap-x-4 gap-y-2", vertical ? "flex-col justify-center" : "flex-wrap")}
      style={{ fontSize }}
    >
      {series.map((item) => (
        <li key={item.id} className="flex max-w-full items-center gap-2 font-medium text-plot-muted">
          <Swatch series={item} />
          <span className="truncate text-plot-ink">{item.name || "Series"}</span>
        </li>
      ))}
    </ul>
  );
}

export function frameStyle(ratio: number): CSSProperties {
  const safe = Number.isFinite(ratio) && ratio > 0 ? ratio : 16 / 9;
  return {
    aspectRatio: String(safe),
    width: `min(100cqw, calc(100cqh * ${safe}))`,
    maxWidth: "100%",
    maxHeight: "100%",
  };
}

type ChartCardProps = {
  exporting?: boolean;
};

export const ChartCard = forwardRef<HTMLElement, ChartCardProps>(function ChartCard(
  { exporting = false },
  ref,
) {
  const title = useChartStore((state) => state.title);
  const subtitle = useChartStore((state) => state.subtitle);
  const series = useChartStore((state) => state.series);
  const rows = useChartStore((state) => state.rows);
  const showLabels = useChartStore((state) => state.showLabels);
  const stackBars = useChartStore((state) => state.stackBars);
  const grid = useChartStore((state) => state.grid);
  const legend = useChartStore((state) => state.legend);
  const xLabel = useChartStore((state) => state.xLabel);
  const yLeftLabel = useChartStore((state) => state.yLeftLabel);
  const yRightLabel = useChartStore((state) => state.yRightLabel);
  const patch = useChartStore((state) => state.patch);
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLElement | null>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const cardSize = useElementSize(cardRef);
  const plotSize = useElementSize(plotRef);

  useEffect(() => setMounted(true), []);

  const width = cardSize.width || 640;
  const titlePx = clamp(Math.round(width / 24), 18, 64);
  const subtitlePx = clamp(Math.round(width / 42), 13, 32);
  const legendPx = clamp(Math.round(width / 48), 12, 28);
  const axisPx = clamp(Math.round(width / 46), 12, 22);
  const pad = clamp(Math.round(width / 32), 16, 56);
  const structureKey = `${stackBars}|${series.map((item) => `${item.id}:${item.type}:${item.axis}:${item.color}`).join("|")}`;
  const empty = series.length === 0 || rows.length === 0;

  const setRefs = (node: HTMLElement | null) => {
    cardRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <article
      ref={setRefs}
      className={cn(
        "flex h-full w-full flex-col bg-chart text-plot-ink",
        exporting ? "shadow-none" : "shadow-card",
      )}
      style={{
        borderRadius: Math.min(28, pad),
        padding: pad,
        border: "1px solid var(--color-plot-grid-medium)",
      }}
    >
      <p className="sr-only">
        {title || "Chart"}.{" "}
        {series.map((item) => `${item.name} ${item.type} on the ${item.axis} axis`).join(". ")}
      </p>
      <div className="flex items-start gap-2">
        {exporting ? (
          <h2 className="min-w-0 flex-1 font-semibold tracking-tight text-plot-ink" style={{ fontSize: titlePx }}>
            {title || "Untitled chart"}
          </h2>
        ) : (
          <input
            ref={titleRef}
            aria-label="Chart title"
            value={title}
            placeholder="Chart title"
            onChange={(event) => patch({ title: event.target.value })}
            className="min-w-0 flex-1 bg-transparent font-semibold tracking-tight text-plot-ink outline-none placeholder:text-plot-muted"
            style={{ fontSize: titlePx }}
          />
        )}
        {exporting ? null : (
          <button
            type="button"
            aria-label="Edit title"
            onClick={() => titleRef.current?.focus()}
            className="mt-1 grid size-8 shrink-0 place-items-center rounded-lg text-plot-muted hover:bg-plot-grid-light hover:text-plot-ink"
          >
            <Pencil className="size-4" />
          </button>
        )}
      </div>
      {exporting ? (
        subtitle ? (
          <p className="mt-1 text-plot-muted" style={{ fontSize: subtitlePx }}>
            {subtitle}
          </p>
        ) : null
      ) : (
        <input
          aria-label="Subtitle"
          value={subtitle}
          placeholder="Subtitle or annotation"
          onChange={(event) => patch({ subtitle: event.target.value })}
          className="mt-1 w-full bg-transparent text-plot-muted outline-none placeholder:text-plot-muted/70"
          style={{ fontSize: subtitlePx }}
        />
      )}

      {legend === "top" && series.length > 0 ? (
        <div className="mt-3">
          <Legend series={series} fontSize={legendPx} />
        </div>
      ) : null}

      <div className={cn("mt-3 flex min-h-0 flex-1", legend === "right" && "gap-4")}>
        <div className="flex min-h-0 min-w-0 flex-1">
          {yLeftLabel ? <AxisTitle text={yLeftLabel} fontSize={axisPx} /> : null}
          <div ref={plotRef} className="plot-svg min-h-0 min-w-0 flex-1">
          {empty ? (
            <div className="grid h-full place-items-center px-6 text-center text-sm text-plot-muted">
              Add a series and at least one row to draw the chart.
            </div>
          ) : mounted && plotSize.width > 40 && plotSize.height > 40 ? (
            <Suspense fallback={<div className="h-full w-full animate-pulse rounded-xl bg-plot-grid-light" />}>
              <ChartSvg
                key={structureKey}
                width={plotSize.width}
                height={plotSize.height}
                animate={!exporting && !reduced}
                series={series}
                rows={rows}
                showLabels={showLabels}
                stackBars={stackBars}
                grid={grid}
                xLabel={xLabel}
                yLeftLabel={yLeftLabel}
                yRightLabel={yRightLabel}
              />
            </Suspense>
          ) : (
            <div className="h-full w-full rounded-xl bg-plot-grid-light/60" />
          )}
          </div>
          {yRightLabel ? <AxisTitle text={yRightLabel} fontSize={axisPx} /> : null}
        </div>
        {legend === "right" && series.length > 0 ? (
          <Legend series={series} vertical fontSize={legendPx} />
        ) : null}
      </div>

      {legend === "bottom" && series.length > 0 ? (
        <div className="mt-2">
          <Legend series={series} fontSize={legendPx} />
        </div>
      ) : null}
    </article>
  );
});
