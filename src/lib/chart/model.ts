export type SeriesType = "bar" | "line" | "area";
export type AxisSide = "left" | "right";
export type PaletteId = "default" | "modern" | "corporate" | "soft" | "dark";
export type SizeId = "landscape" | "square" | "portrait" | "custom";
export type OutputId = "current" | "presentation" | "social" | "story";
export type GridLevel = "light" | "medium" | "strong";
export type LegendPos = "bottom" | "top" | "right" | "none";
export type ThemeMode = "light" | "dark";

export type Series = {
  id: string;
  name: string;
  color: string;
  type: SeriesType;
  axis: AxisSide;
};

export type Row = {
  id: string;
  label: string;
  values: Record<string, string>;
};

export type ChartDoc = {
  title: string;
  subtitle: string;
  palette: PaletteId;
  size: SizeId;
  customWidth: number;
  customHeight: number;
  grid: GridLevel;
  output: OutputId;
  legend: LegendPos;
  xLabel: string;
  yLeftLabel: string;
  yRightLabel: string;
  showLabels: boolean;
  stackBars: boolean;
  series: Series[];
  rows: Row[];
};

export const PALETTES: Record<PaletteId, readonly string[]> = {
  default: ["#3B78F2", "#1FA971", "#F59A45", "#8B5CF6", "#E85D75", "#0EA5A4"],
  modern: ["#5B6BFF", "#22C55E", "#FF8A3D", "#A855F7", "#38BDF8", "#FB7185"],
  corporate: ["#1E3A5F", "#0F766E", "#B45309", "#334155", "#0369A1", "#7C2D12"],
  soft: ["#7CA8F5", "#7DCAA8", "#F3C08A", "#C4B5FD", "#F5A8B8", "#8ED6D2"],
  dark: ["#1D4ED8", "#047857", "#C2410C", "#6D28D9", "#BE123C", "#0F766E"],
};

export const PALETTE_OPTIONS: { value: PaletteId; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "modern", label: "Modern" },
  { value: "corporate", label: "Corporate" },
  { value: "soft", label: "Soft" },
  { value: "dark", label: "Dark" },
];

export const SIZE_OPTIONS: { value: SizeId; label: string }[] = [
  { value: "landscape", label: "Landscape 16:9" },
  { value: "square", label: "Square" },
  { value: "portrait", label: "Portrait" },
  { value: "custom", label: "Custom" },
];

export const OUTPUT_OPTIONS: { value: OutputId; label: string }[] = [
  { value: "current", label: "Current size" },
  { value: "presentation", label: "Presentation" },
  { value: "social", label: "Social" },
  { value: "story", label: "Story" },
];

export const GRID_OPTIONS: { value: GridLevel; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "strong", label: "Strong" },
];

export const LEGEND_OPTIONS: { value: LegendPos; label: string }[] = [
  { value: "bottom", label: "Bottom" },
  { value: "top", label: "Top" },
  { value: "right", label: "Right" },
  { value: "none", label: "None" },
];

export const SERIES_TYPES: { value: SeriesType; label: string }[] = [
  { value: "bar", label: "Bar" },
  { value: "line", label: "Line" },
  { value: "area", label: "Area" },
];

export const AXIS_OPTIONS: { value: AxisSide; label: string }[] = [
  { value: "left", label: "Left axis" },
  { value: "right", label: "Right axis" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export function paletteColor(id: PaletteId, index: number): string {
  const colors = PALETTES[id];
  return colors[index % colors.length] ?? colors[0];
}

export function toHex(color: string): string {
  return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#3B78F2";
}

let seq = 0;
export function uid(prefix: string): string {
  seq += 1;
  return `${prefix}-${seq.toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function parseNumber(raw: string): number | null {
  const trimmed = raw.trim().replace(/[%$\s]/g, "");
  if (!trimmed) return null;
  const normalized = trimmed.replace(/,/g, "");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

export function formatValue(n: number): string {
  if (!Number.isFinite(n)) return "";
  const abs = Math.abs(n);
  if (abs >= 100000) {
    return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
  }
  const digits = Number.isInteger(n) ? 0 : abs < 10 ? 2 : 1;
  return new Intl.NumberFormat("en", { maximumFractionDigits: digits }).format(n);
}

export function slugify(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "chart";
}

export function cloneDoc(doc: ChartDoc): ChartDoc {
  return {
    ...doc,
    series: doc.series.map((series) => ({ ...series })),
    rows: doc.rows.map((row) => ({ ...row, values: { ...row.values } })),
  };
}

export function aspectOf(doc: ChartDoc): number {
  if (doc.size === "square") return 1;
  if (doc.size === "portrait") return 3 / 4;
  if (doc.size === "custom") {
    return clamp(doc.customWidth, 320, 4000) / clamp(doc.customHeight, 320, 4000);
  }
  return 16 / 9;
}

export function exportPixels(doc: ChartDoc): { width: number; height: number; label: string } {
  if (doc.output === "presentation") return { width: 1920, height: 1080, label: "Presentation" };
  if (doc.output === "social") return { width: 1080, height: 1080, label: "Social" };
  if (doc.output === "story") return { width: 1080, height: 1920, label: "Story" };
  if (doc.size === "square") return { width: 1600, height: 1600, label: "Current size" };
  if (doc.size === "portrait") return { width: 1200, height: 1600, label: "Current size" };
  if (doc.size === "custom") {
    return {
      width: clamp(doc.customWidth, 320, 4000),
      height: clamp(doc.customHeight, 320, 4000),
      label: "Current size",
    };
  }
  return { width: 1920, height: 1080, label: "Current size" };
}

export function nextCategoryLabel(rows: Row[]): string {
  const last = rows[rows.length - 1]?.label ?? "";
  const month = MONTHS.indexOf(last);
  if (month >= 0 && month < MONTHS.length - 1) return MONTHS[month + 1] ?? `Item ${rows.length + 1}`;
  const quarter = /^Q(\d+)$/i.exec(last.trim());
  if (quarter) return `Q${Number(quarter[1]) + 1}`;
  const week = /^W(\d+)$/i.exec(last.trim());
  if (week) return `W${Number(week[1]) + 1}`;
  return `Item ${rows.length + 1}`;
}

function row(id: string, label: string, values: Record<string, string>): Row {
  return { id, label, values };
}

function doc(partial: ChartDoc): ChartDoc {
  return partial;
}

const revenueDoc = doc({
  title: "Monthly revenue",
  subtitle: "Revenue in $k, with year-over-year growth",
  palette: "default",
  size: "landscape",
  customWidth: 1600,
  customHeight: 900,
  grid: "light",
  output: "current",
  legend: "top",
  xLabel: "Month",
  yLeftLabel: "Revenue ($k)",
  yRightLabel: "YoY growth (%)",
  showLabels: true,
  stackBars: false,
  series: [
    { id: "rev", name: "Revenue", color: PALETTES.default[0], type: "bar", axis: "left" },
    { id: "yoy", name: "YoY growth rate", color: PALETTES.default[1], type: "line", axis: "right" },
  ],
  rows: [
    row("r-jan", "Jan", { rev: "420", yoy: "3" }),
    row("r-feb", "Feb", { rev: "510", yoy: "5" }),
    row("r-mar", "Mar", { rev: "580", yoy: "8" }),
    row("r-apr", "Apr", { rev: "650", yoy: "9" }),
    row("r-may", "May", { rev: "720", yoy: "12" }),
    row("r-jun", "Jun", { rev: "820", yoy: "15" }),
  ],
});

export type Sample = {
  id: string;
  label: string;
  description: string;
  doc: ChartDoc;
};

export const SAMPLES: Sample[] = [
  {
    id: "revenue-growth",
    label: "Revenue × growth rate",
    description: "Monthly revenue bars with a growth-rate line",
    doc: revenueDoc,
  },
  {
    id: "pv-cvr",
    label: "PV × CVR",
    description: "Page views against conversion rate",
    doc: doc({
      title: "Traffic and conversion",
      subtitle: "Page views with conversion rate on the right axis",
      palette: "default",
      size: "landscape",
      customWidth: 1600,
      customHeight: 900,
      grid: "light",
      output: "current",
      legend: "top",
      xLabel: "Week",
      yLeftLabel: "Page views",
      yRightLabel: "CVR (%)",
      showLabels: true,
      stackBars: false,
      series: [
        { id: "pv", name: "Page views", color: PALETTES.default[0], type: "bar", axis: "left" },
        { id: "cvr", name: "CVR", color: PALETTES.default[1], type: "line", axis: "right" },
      ],
      rows: [
        row("w1", "W1", { pv: "12400", cvr: "2.1" }),
        row("w2", "W2", { pv: "13820", cvr: "2.4" }),
        row("w3", "W3", { pv: "15110", cvr: "2.8" }),
        row("w4", "W4", { pv: "14240", cvr: "2.3" }),
        row("w5", "W5", { pv: "16890", cvr: "3.1" }),
        row("w6", "W6", { pv: "18340", cvr: "3.4" }),
      ],
    }),
  },
  {
    id: "actual-target",
    label: "Actual vs. target",
    description: "Quarterly actuals against the plan, same axis",
    doc: doc({
      title: "Actual vs. target",
      subtitle: "Quarterly revenue against the plan",
      palette: "default",
      size: "landscape",
      customWidth: 1600,
      customHeight: 900,
      grid: "light",
      output: "current",
      legend: "top",
      xLabel: "Quarter",
      yLeftLabel: "Revenue ($k)",
      yRightLabel: "",
      showLabels: true,
      stackBars: false,
      series: [
        { id: "actual", name: "Actual", color: PALETTES.default[0], type: "bar", axis: "left" },
        { id: "target", name: "Target", color: PALETTES.default[2], type: "line", axis: "left" },
      ],
      rows: [
        row("q1", "Q1", { actual: "182", target: "190" }),
        row("q2", "Q2", { actual: "205", target: "210" }),
        row("q3", "Q3", { actual: "196", target: "220" }),
        row("q4", "Q4", { actual: "238", target: "250" }),
      ],
    }),
  },
  {
    id: "temp-precip",
    label: "Temperature × precipitation",
    description: "A year of temperature and rainfall",
    doc: doc({
      title: "City weather",
      subtitle: "Average temperature and monthly rainfall",
      palette: "default",
      size: "landscape",
      customWidth: 1600,
      customHeight: 900,
      grid: "light",
      output: "current",
      legend: "top",
      xLabel: "Month",
      yLeftLabel: "Temperature (°C)",
      yRightLabel: "Precipitation (mm)",
      showLabels: false,
      stackBars: false,
      series: [
        { id: "temp", name: "Temperature", color: PALETTES.default[2], type: "line", axis: "left" },
        { id: "rain", name: "Precipitation", color: PALETTES.default[0], type: "bar", axis: "right" },
      ],
      rows: [
        row("m1", "Jan", { temp: "4.2", rain: "78" }),
        row("m2", "Feb", { temp: "5.1", rain: "62" }),
        row("m3", "Mar", { temp: "8.4", rain: "68" }),
        row("m4", "Apr", { temp: "12.6", rain: "54" }),
        row("m5", "May", { temp: "16.8", rain: "48" }),
        row("m6", "Jun", { temp: "20.4", rain: "36" }),
        row("m7", "Jul", { temp: "23.7", rain: "22" }),
        row("m8", "Aug", { temp: "23.1", rain: "28" }),
        row("m9", "Sep", { temp: "18.9", rain: "44" }),
        row("m10", "Oct", { temp: "13.2", rain: "71" }),
        row("m11", "Nov", { temp: "8.0", rain: "82" }),
        row("m12", "Dec", { temp: "4.8", rain: "88" }),
      ],
    }),
  },
  {
    id: "segment-margin",
    label: "Segment revenue × margin",
    description: "Stacked segment revenue with a margin line",
    doc: doc({
      title: "Segment revenue",
      subtitle: "Stacked revenue with margin on the right axis",
      palette: "default",
      size: "landscape",
      customWidth: 1600,
      customHeight: 900,
      grid: "medium",
      output: "current",
      legend: "top",
      xLabel: "Quarter",
      yLeftLabel: "Revenue ($k)",
      yRightLabel: "Margin (%)",
      showLabels: false,
      stackBars: true,
      series: [
        { id: "product", name: "Product", color: PALETTES.default[0], type: "bar", axis: "left" },
        { id: "services", name: "Services", color: PALETTES.default[1], type: "bar", axis: "left" },
        { id: "license", name: "Licensing", color: PALETTES.default[2], type: "bar", axis: "left" },
        { id: "margin", name: "Margin", color: PALETTES.default[3], type: "line", axis: "right" },
      ],
      rows: [
        row("sq1", "Q1", { product: "120", services: "86", license: "34", margin: "18.4" }),
        row("sq2", "Q2", { product: "138", services: "102", license: "41", margin: "19.1" }),
        row("sq3", "Q3", { product: "132", services: "118", license: "48", margin: "21.6" }),
        row("sq4", "Q4", { product: "154", services: "126", license: "57", margin: "22.8" }),
      ],
    }),
  },
];

export function defaultDoc(): ChartDoc {
  return cloneDoc(revenueDoc);
}

export const MAX_SERIES = 8;
export const MAX_ROWS = 200;
