import { create } from "zustand";
import { persist } from "zustand/middleware";
import { tableToChart, type CsvFailure, type CsvSuccess } from "@/lib/chart/csv";
import {
  MAX_SERIES,
  SAMPLES,
  type AxisSide,
  type ChartDoc,
  type PaletteId,
  type SeriesType,
  type ThemeMode,
  cloneDoc,
  defaultDoc,
  nextCategoryLabel,
  paletteColor,
  uid,
} from "@/lib/chart/model";

type ChartState = ChartDoc & {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  patch: (partial: Partial<ChartDoc>) => void;
  loadSample: (id: string) => void;
  setPalette: (palette: PaletteId) => void;
  updateSeries: (id: string, partial: Partial<{ name: string; color: string; type: SeriesType; axis: AxisSide }>) => void;
  addSeries: () => void;
  removeSeries: (id: string) => void;
  setLabel: (rowId: string, label: string) => void;
  setCell: (rowId: string, seriesId: string, value: string) => void;
  addRow: () => void;
  removeRow: (id: string) => void;
  moveRow: (id: string, direction: -1 | 1) => void;
  loadCsv: (text: string) => CsvSuccess | CsvFailure;
};

export const useChartStore = create<ChartState>()(
  persist(
    (set, get) => ({
      ...defaultDoc(),
      theme: "light",
      setTheme: (theme) => set({ theme }),
      patch: (partial) => set(partial),
      loadSample: (id) => {
        const sample = SAMPLES.find((entry) => entry.id === id);
        if (!sample) return;
        set(cloneDoc(sample.doc));
      },
      setPalette: (palette) =>
        set((state) => ({
          palette,
          series: state.series.map((series, index) => ({
            ...series,
            color: paletteColor(palette, index),
          })),
        })),
      updateSeries: (id, partial) =>
        set((state) => ({
          series: state.series.map((series) => (series.id === id ? { ...series, ...partial } : series)),
        })),
      addSeries: () =>
        set((state) => {
          if (state.series.length >= MAX_SERIES) return state;
          const id = uid("s");
          const hasBar = state.series.some((series) => series.type === "bar");
          const type: SeriesType = hasBar ? "line" : "bar";
          const axis: AxisSide = type === "line" ? "right" : "left";
          const series = [
            ...state.series,
            {
              id,
              name: `Series ${state.series.length + 1}`,
              color: paletteColor(state.palette, state.series.length),
              type,
              axis,
            },
          ];
          const rows = state.rows.map((entry) => ({
            ...entry,
            values: { ...entry.values, [id]: "" },
          }));
          return { series, rows };
        }),
      removeSeries: (id) =>
        set((state) => ({
          series: state.series.filter((series) => series.id !== id),
          rows: state.rows.map((entry) => {
            const values = { ...entry.values };
            delete values[id];
            return { ...entry, values };
          }),
        })),
      setLabel: (rowId, label) =>
        set((state) => ({
          rows: state.rows.map((entry) => (entry.id === rowId ? { ...entry, label } : entry)),
        })),
      setCell: (rowId, seriesId, value) =>
        set((state) => ({
          rows: state.rows.map((entry) =>
            entry.id === rowId ? { ...entry, values: { ...entry.values, [seriesId]: value } } : entry,
          ),
        })),
      addRow: () =>
        set((state) => {
          const id = uid("r");
          const values = Object.fromEntries(state.series.map((series) => [series.id, ""]));
          return {
            rows: [...state.rows, { id, label: nextCategoryLabel(state.rows), values }],
          };
        }),
      removeRow: (id) =>
        set((state) => ({
          rows: state.rows.filter((entry) => entry.id !== id),
        })),
      moveRow: (id, direction) =>
        set((state) => {
          const index = state.rows.findIndex((entry) => entry.id === id);
          const next = index + direction;
          if (index < 0 || next < 0 || next >= state.rows.length) return state;
          const rows = state.rows.slice();
          const current = rows[index];
          const swap = rows[next];
          if (!current || !swap) return state;
          rows[index] = swap;
          rows[next] = current;
          return { rows };
        }),
      loadCsv: (text) => {
        const result = tableToChart(text, get().palette);
        if (!result.ok) return result;
        set({ series: result.series, rows: result.rows });
        return result;
      },
    }),
    {
      name: "chart-studio-v1",
      skipHydration: true,
      partialize: (state) => ({
        theme: state.theme,
        title: state.title,
        subtitle: state.subtitle,
        palette: state.palette,
        size: state.size,
        customWidth: state.customWidth,
        customHeight: state.customHeight,
        grid: state.grid,
        output: state.output,
        legend: state.legend,
        xLabel: state.xLabel,
        yLeftLabel: state.yLeftLabel,
        yRightLabel: state.yRightLabel,
        showLabels: state.showLabels,
        stackBars: state.stackBars,
        series: state.series,
        rows: state.rows,
      }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<ChartState> | undefined;
        if (!saved || !Array.isArray(saved.series) || !Array.isArray(saved.rows)) return current;
        return { ...current, ...saved };
      },
    },
  ),
);
