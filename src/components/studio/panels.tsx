import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { readFileAsText, toCsv } from "@/lib/chart/csv";
import {
  AXIS_OPTIONS,
  GRID_OPTIONS,
  LEGEND_OPTIONS,
  MAX_SERIES,
  OUTPUT_OPTIONS,
  PALETTE_OPTIONS,
  PALETTES,
  SAMPLES,
  SERIES_TYPES,
  SIZE_OPTIONS,
  type PaletteId,
  clamp,
  paletteColor,
  toHex,
} from "@/lib/chart/model";
import { useChartStore } from "@/lib/chart/store";
import { cn } from "@/lib/cn";
import { GhostButton, IconButton, PrimaryButton, SelectField, Switch, TextField } from "@/components/studio/ui";

function ColorField({
  color,
  label,
  onChange,
}: {
  color: string;
  label: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative grid size-11 shrink-0 place-items-center">
      <input
        type="color"
        value={toHex(color)}
        aria-label={label}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
      <span
        className="size-7 rounded-lg border border-border"
        style={{ backgroundColor: color }}
      />
    </label>
  );
}

export function StylePanel({ onSample }: { onSample: () => void }) {
  const doc = useChartStore();
  const paletteMatches = doc.series.every(
    (series, index) => series.color.toLowerCase() === paletteColor(doc.palette, index).toLowerCase(),
  );
  const paletteOptions = paletteMatches
    ? PALETTE_OPTIONS
    : [{ value: "custom" as const, label: "Custom" }, ...PALETTE_OPTIONS];

  return (
    <div className="space-y-6 p-4">
      <section>
        <h2 className="text-sm font-semibold text-fg">Start from a sample</h2>
        <p className="mt-1 text-sm text-muted">Load a combo chart, then change anything.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              title={sample.description}
              onClick={() => {
                doc.loadSample(sample.id);
                onSample();
              }}
              className="min-h-11 rounded-full border border-border bg-surface px-3 py-2 text-left text-sm text-fg transition hover:border-primary hover:bg-primary/5"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </section>

      <div className="h-px bg-border" />

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-fg">Adjust appearance</h2>
        <TextField label="Title" value={doc.title} onChange={(title) => doc.patch({ title })} />
        <TextField
          label="Subtitle"
          value={doc.subtitle}
          onChange={(subtitle) => doc.patch({ subtitle })}
          placeholder="Annotation under the title"
        />
        <SelectField
          label="Color palette"
          value={paletteMatches ? doc.palette : "custom"}
          onChange={(value) => {
            if (value === "custom") return;
            doc.setPalette(value as PaletteId);
          }}
          options={paletteOptions}
        />
        <div className="flex gap-1.5" aria-hidden>
          {(PALETTES[doc.palette] ?? []).map((color) => (
            <span key={color} className="h-2 flex-1 rounded-full" style={{ backgroundColor: color }} />
          ))}
        </div>
        <SelectField
          label="Size"
          value={doc.size}
          onChange={(size) => doc.patch({ size })}
          options={SIZE_OPTIONS}
        />
        {doc.size === "custom" ? (
          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-fg">Width</span>
              <input
                type="number"
                min={320}
                max={4000}
                value={doc.customWidth}
                onChange={(event) => doc.patch({ customWidth: Number(event.target.value) })}
                onBlur={() => doc.patch({ customWidth: clamp(doc.customWidth, 320, 4000) })}
                className="h-11 w-full rounded-xl border border-border bg-surface-2 px-3 text-base text-fg outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 sm:text-sm"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-fg">Height</span>
              <input
                type="number"
                min={320}
                max={4000}
                value={doc.customHeight}
                onChange={(event) => doc.patch({ customHeight: Number(event.target.value) })}
                onBlur={() => doc.patch({ customHeight: clamp(doc.customHeight, 320, 4000) })}
                className="h-11 w-full rounded-xl border border-border bg-surface-2 px-3 text-base text-fg outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 sm:text-sm"
              />
            </label>
          </div>
        ) : null}
        <SelectField
          label="Axis and grid"
          value={doc.grid}
          onChange={(grid) => doc.patch({ grid })}
          options={GRID_OPTIONS}
        />
        <SelectField
          label="Output preset"
          value={doc.output}
          onChange={(output) => doc.patch({ output })}
          options={OUTPUT_OPTIONS}
        />
        <SelectField
          label="Legend"
          value={doc.legend}
          onChange={(legend) => doc.patch({ legend })}
          options={LEGEND_OPTIONS}
        />
        <TextField
          label="X-axis label"
          value={doc.xLabel}
          onChange={(xLabel) => doc.patch({ xLabel })}
          placeholder="Month"
        />
        <TextField
          label="Y-axis (left) label"
          value={doc.yLeftLabel}
          onChange={(yLeftLabel) => doc.patch({ yLeftLabel })}
          placeholder="Revenue"
        />
        <TextField
          label="Y-axis (right) label"
          value={doc.yRightLabel}
          onChange={(yRightLabel) => doc.patch({ yRightLabel })}
          placeholder="Growth rate"
        />
        <Switch
          label="Show data labels"
          checked={doc.showLabels}
          onChange={(showLabels) => doc.patch({ showLabels })}
        />
        <Switch
          label="Stack the bars"
          hint="Lines and areas stay overlaid."
          checked={doc.stackBars}
          onChange={(stackBars) => doc.patch({ stackBars })}
        />
      </section>
    </div>
  );
}

function SeriesList() {
  const series = useChartStore((state) => state.series);
  const updateSeries = useChartStore((state) => state.updateSeries);
  const addSeries = useChartStore((state) => state.addSeries);
  const removeSeries = useChartStore((state) => state.removeSeries);

  return (
    <section>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-fg">Series display</h2>
        <span className="text-xs text-muted">
          {series.length}/{MAX_SERIES}
        </span>
      </div>
      <div className="space-y-2">
        {series.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border bg-surface p-2">
            <div className="flex items-center gap-2">
              <ColorField
                color={item.color}
                label={`${item.name || "Series"} color`}
                onChange={(color) => updateSeries(item.id, { color })}
              />
              <input
                aria-label={`${item.name || "Series"} name`}
                value={item.name}
                placeholder="Series name"
                onChange={(event) => updateSeries(item.id, { name: event.target.value })}
                className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-surface-2 px-3 text-base text-fg outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 sm:text-sm"
              />
              <IconButton
                label={`Remove ${item.name || "series"}`}
                onClick={() => removeSeries(item.id)}
                className="hover:bg-danger/10 hover:text-danger"
              >
                <Trash2 className="size-4" />
              </IconButton>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <label className="relative block">
                <span className="sr-only">{item.name} chart type</span>
                <select
                  value={item.type}
                  aria-label={`${item.name || "Series"} chart type`}
                  onChange={(event) =>
                    updateSeries(item.id, { type: event.target.value as typeof item.type })
                  }
                  className="h-11 w-full rounded-xl border border-border bg-surface-2 px-3 text-sm text-fg outline-none focus:border-primary"
                >
                  {SERIES_TYPES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="relative block">
                <span className="sr-only">{item.name} axis</span>
                <select
                  value={item.axis}
                  aria-label={`${item.name || "Series"} axis`}
                  onChange={(event) =>
                    updateSeries(item.id, { axis: event.target.value as typeof item.axis })
                  }
                  className="h-11 w-full rounded-xl border border-border bg-surface-2 px-3 text-sm text-fg outline-none focus:border-primary"
                >
                  {AXIS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        ))}
      </div>
      <GhostButton className="mt-3" onClick={addSeries} disabled={series.length >= MAX_SERIES}>
        <Plus className="size-4" />
        Add series
      </GhostButton>
    </section>
  );
}

function DataTable() {
  const series = useChartStore((state) => state.series);
  const rows = useChartStore((state) => state.rows);
  const xLabel = useChartStore((state) => state.xLabel);
  const setLabel = useChartStore((state) => state.setLabel);
  const setCell = useChartStore((state) => state.setCell);
  const addRow = useChartStore((state) => state.addRow);
  const removeRow = useChartStore((state) => state.removeRow);
  const moveRow = useChartStore((state) => state.moveRow);
  const loadCsv = useChartStore((state) => state.loadCsv);

  function exportCsv() {
    const csv = toCsv(xLabel, series, rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "chart-data.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast.success("Exported CSV");
  }

  return (
    <section>
      <div
        className="overflow-x-auto rounded-2xl border border-border"
        onPaste={(event) => {
          const text = event.clipboardData.getData("text");
          if (!text.includes("\n") && !text.includes("\t")) return;
          event.preventDefault();
          const result = loadCsv(text);
          if (result.ok) toast.success(result.notice ?? "Table replaced");
          else toast.error(result.message);
        }}
      >
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr className="bg-surface-2 text-left text-xs font-semibold text-muted">
              <th scope="col" className="sticky left-0 bg-surface-2 px-3 py-3 font-semibold">
                {xLabel || "Item"}
              </th>
              {series.map((item) => (
                <th key={item.id} scope="col" className="px-3 py-3 font-semibold">
                  <span className="inline-flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="whitespace-nowrap">{item.name || "Series"}</span>
                  </span>
                </th>
              ))}
              <th scope="col" className="px-2 py-3">
                <span className="sr-only">Row actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((entry, index) => (
              <tr key={entry.id} className="border-t border-border">
                <th scope="row" className="sticky left-0 bg-surface p-0 font-normal">
                  <input
                    aria-label={`Category ${index + 1}`}
                    value={entry.label}
                    onChange={(event) => setLabel(entry.id, event.target.value)}
                    className="h-11 w-full min-w-24 bg-transparent px-3 text-left text-base text-fg outline-none focus:bg-surface-2 sm:text-sm"
                  />
                </th>
                {series.map((item) => (
                  <td key={item.id} className="p-0">
                    <input
                      aria-label={`${entry.label || "Row"} ${item.name || "series"}`}
                      inputMode="decimal"
                      value={entry.values[item.id] ?? ""}
                      onChange={(event) => setCell(entry.id, item.id, event.target.value)}
                      className="h-11 w-full min-w-24 bg-transparent px-3 text-right text-base text-fg tabular-nums outline-none focus:bg-surface-2 sm:text-sm"
                    />
                  </td>
                ))}
                <td className="px-1">
                  <div className="flex items-center justify-end">
                    <IconButton
                      label={`Move ${entry.label || "row"} up`}
                      disabled={index === 0}
                      onClick={() => moveRow(entry.id, -1)}
                    >
                      <ArrowUp className="size-4" />
                    </IconButton>
                    <IconButton
                      label={`Move ${entry.label || "row"} down`}
                      disabled={index === rows.length - 1}
                      onClick={() => moveRow(entry.id, 1)}
                    >
                      <ArrowDown className="size-4" />
                    </IconButton>
                    <IconButton
                      label={`Delete ${entry.label || "row"}`}
                      onClick={() => removeRow(entry.id)}
                      className="hover:bg-danger/10 hover:text-danger"
                    >
                      <Trash2 className="size-4" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={series.length + 2} className="px-3 py-8 text-center text-sm text-muted">
                  No rows yet. Add an item or paste a table.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <GhostButton onClick={addRow}>
          <Plus className="size-4" />
          Add item
        </GhostButton>
        <GhostButton onClick={exportCsv}>Export CSV</GhostButton>
      </div>
    </section>
  );
}

function PastePanel({ onLoaded }: { onLoaded: () => void }) {
  const [text, setText] = useState("");
  const loadCsv = useChartStore((state) => state.loadCsv);
  const fileRef = useRef<HTMLInputElement>(null);

  function apply(source: string) {
    const result = loadCsv(source);
    if (result.ok) {
      toast.success(result.notice ?? "Chart data loaded");
      onLoaded();
    } else {
      toast.error(result.message);
    }
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    if (file.size > 2_000_000) {
      toast.error("That file is larger than 2 MB.");
      return;
    }
    try {
      const contents = await readFileAsText(file);
      setText(contents);
      apply(contents);
    } catch {
      toast.error("Couldn't read that file.");
    }
  }

  return (
    <section className="space-y-3">
      <p className="text-sm text-muted">
        First row can be headers. The first text column becomes the categories. Growth, rate, and margin
        columns land on the right axis as lines.
      </p>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        spellCheck={false}
        aria-label="CSV or TSV"
        placeholder={"Month,Revenue,YoY growth rate\nJan,420,3\nFeb,510,5\nMar,580,8"}
        className="min-h-64 w-full resize-y rounded-2xl border border-border bg-surface-2 p-3 text-sm text-fg tabular-nums outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
      />
      <div className="flex flex-wrap gap-2">
        <PrimaryButton onClick={() => apply(text)} disabled={!text.trim()}>
          Parse and load
        </PrimaryButton>
        <GhostButton onClick={() => fileRef.current?.click()}>
          <Upload className="size-4" />
          Upload CSV
        </GhostButton>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.tsv,text/csv,text/tab-separated-values,text/plain"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            void onFile(file);
          }}
        />
      </div>
    </section>
  );
}

export function DataPanel({ onLoaded }: { onLoaded: () => void }) {
  const [tab, setTab] = useState<"table" | "paste">("table");

  return (
    <div className="space-y-4 p-4">
      <div>
        <h2 className="text-sm font-semibold text-fg">Enter data</h2>
        <div className="mt-3 grid grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1" role="tablist">
          {(
            [
              ["table", "Table"],
              ["paste", "Paste CSV/TSV"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                "h-11 rounded-xl text-sm font-medium transition",
                tab === id ? "bg-surface text-fg shadow-sm" : "text-muted hover:text-fg",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {tab === "table" ? (
        <div role="tabpanel" className="space-y-5">
          <SeriesList />
          <DataTable />
        </div>
      ) : (
        <div role="tabpanel">
          <PastePanel onLoaded={onLoaded} />
        </div>
      )}
    </div>
  );
}
