import {
  MAX_ROWS,
  MAX_SERIES,
  type AxisSide,
  type PaletteId,
  type Row,
  type Series,
  type SeriesType,
  paletteColor,
  parseNumber,
  uid,
} from "@/lib/chart/model";

export type CsvSuccess = {
  ok: true;
  series: Series[];
  rows: Row[];
  notice?: string;
};

export type CsvFailure = { ok: false; message: string };

const RATE = /rate|growth|cvr|margin|ratio|percent|%|temp|index|yield/i;
const TARGET = /target|goal|plan|forecast/i;

export function parseTable(text: string): string[][] {
  const cleaned = text.replace(/^\uFEFF/, "").trim();
  if (!cleaned) return [];
  const firstLine = cleaned.split(/\r?\n/, 1)[0] ?? "";
  const commas = (firstLine.match(/,/g) ?? []).length;
  const tabs = (firstLine.match(/\t/g) ?? []).length;
  const semis = (firstLine.match(/;/g) ?? []).length;
  const delim = tabs > commas && tabs >= semis ? "\t" : semis > commas ? ";" : ",";

  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < cleaned.length; i += 1) {
    const char = cleaned[i];
    if (inQuotes) {
      if (char === '"') {
        if (cleaned[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char ?? "";
      }
      continue;
    }
    if (char === '"') {
      inQuotes = true;
    } else if (char === delim) {
      row.push(cell.trim());
      cell = "";
    } else if (char === "\n") {
      row.push(cell.trim());
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char ?? "";
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    rows.push(row);
  }

  return rows.filter((entry) => entry.some((value) => value !== ""));
}

function numericScore(cells: string[]): number {
  const filled = cells.filter((cell) => cell.trim() !== "");
  if (!filled.length) return 0;
  const numeric = filled.filter((cell) => parseNumber(cell) !== null).length;
  return numeric / filled.length;
}

function inferKind(name: string, count: number): { type: SeriesType; axis: AxisSide } {
  if (count === 1) {
    return { type: RATE.test(name) ? "line" : "bar", axis: "left" };
  }
  if (TARGET.test(name)) return { type: "line", axis: "left" };
  if (RATE.test(name)) return { type: "line", axis: "right" };
  return { type: "bar", axis: "left" };
}

export function tableToChart(text: string, palette: PaletteId): CsvSuccess | CsvFailure {
  const grid = parseTable(text);
  if (!grid.length) return { ok: false, message: "Paste a table or choose a CSV file first." };

  const width = Math.max(...grid.map((entry) => entry.length));
  const norm = grid.map((entry) => [
    ...entry,
    ...Array.from({ length: Math.max(0, width - entry.length) }, () => ""),
  ]);

  const firstScore = numericScore(norm[0] ?? []);
  const hasHeader = firstScore < 0.5;
  const body = hasHeader ? norm.slice(1) : norm;
  if (!body.length) {
    return { ok: false, message: "Add at least one data row under the header." };
  }

  const headers = hasHeader ? (norm[0] ?? []) : [];
  const firstColumnIsCategory = body.some((entry) => {
    const cell = entry[0] ?? "";
    return cell !== "" && parseNumber(cell) === null;
  });

  const seriesIndexes: number[] = [];
  for (let index = 0; index < width; index += 1) {
    if (firstColumnIsCategory && index === 0) continue;
    seriesIndexes.push(index);
  }
  if (!seriesIndexes.length) {
    return { ok: false, message: "Couldn't find a numeric column to plot." };
  }

  let truncated = false;
  const keptIndexes = seriesIndexes.slice(0, MAX_SERIES);
  if (keptIndexes.length < seriesIndexes.length) truncated = true;

  const names = keptIndexes.map((index, order) => {
    const header = (headers[index] ?? "").trim();
    const fallback = `Series ${order + 1}`;
    return (header || fallback).slice(0, 48);
  });

  const series: Series[] = names.map((name, order) => {
    const kind = inferKind(name, names.length);
    return {
      id: uid("s"),
      name,
      color: paletteColor(palette, order),
      type: kind.type,
      axis: kind.axis,
    };
  });

  const sourceRows = body.slice(0, MAX_ROWS);
  if (sourceRows.length < body.length) truncated = true;

  const rows: Row[] = sourceRows
    .map((entry, index) => {
      const label = firstColumnIsCategory
        ? (entry[0] || `Item ${index + 1}`).slice(0, 40)
        : `Item ${index + 1}`;
      const values: Record<string, string> = {};
      series.forEach((item, order) => {
        const column = keptIndexes[order] ?? 0;
        values[item.id] = entry[column] ?? "";
      });
      return { id: uid("r"), label, values };
    })
    .filter((entry) => entry.label !== "" || Object.values(entry.values).some((value) => value !== ""));

  if (!rows.length) return { ok: false, message: "Couldn't find any rows to plot." };

  const hasNumber = rows.some((entry) =>
    series.some((item) => parseNumber(entry.values[item.id] ?? "") !== null),
  );
  if (!hasNumber) return { ok: false, message: "Couldn't find any numbers in that table." };

  return {
    ok: true,
    series,
    rows,
    notice: truncated
      ? `Loaded ${rows.length} rows · ${series.length} series. Extra data was skipped.`
      : `Loaded ${rows.length} rows · ${series.length} series.`,
  };
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function toCsv(xLabel: string, series: Series[], rows: Row[]): string {
  const header = [xLabel || "Item", ...series.map((item) => item.name)];
  const lines = [
    header,
    ...rows.map((entry) => [entry.label, ...series.map((item) => entry.values[item.id] ?? "")]),
  ];
  return lines.map((line) => line.map(csvEscape).join(",")).join("\n");
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Couldn't read that file."));
    reader.readAsText(file);
  });
}
