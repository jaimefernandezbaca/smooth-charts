import { i as __toESM } from "../_runtime.mjs";
import { K as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Sun, c as Plus, d as Download, f as Copy, g as ArrowDown, h as ArrowUp, i as Table2, l as Pencil, m as ChartLine, o as SlidersHorizontal, p as ChevronDown, r as Trash2, s as RotateCcw, t as Upload, u as Moon } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as toSvg, t as toBlob } from "../_libs/html-to-image.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B-GA-bN9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var PALETTES = {
	default: [
		"#3B78F2",
		"#1FA971",
		"#F59A45",
		"#8B5CF6",
		"#E85D75",
		"#0EA5A4"
	],
	modern: [
		"#5B6BFF",
		"#22C55E",
		"#FF8A3D",
		"#A855F7",
		"#38BDF8",
		"#FB7185"
	],
	corporate: [
		"#1E3A5F",
		"#0F766E",
		"#B45309",
		"#334155",
		"#0369A1",
		"#7C2D12"
	],
	soft: [
		"#7CA8F5",
		"#7DCAA8",
		"#F3C08A",
		"#C4B5FD",
		"#F5A8B8",
		"#8ED6D2"
	],
	dark: [
		"#1D4ED8",
		"#047857",
		"#C2410C",
		"#6D28D9",
		"#BE123C",
		"#0F766E"
	]
};
var PALETTE_OPTIONS = [
	{
		value: "default",
		label: "Default"
	},
	{
		value: "modern",
		label: "Modern"
	},
	{
		value: "corporate",
		label: "Corporate"
	},
	{
		value: "soft",
		label: "Soft"
	},
	{
		value: "dark",
		label: "Dark"
	}
];
var SIZE_OPTIONS = [
	{
		value: "landscape",
		label: "Landscape 16:9"
	},
	{
		value: "square",
		label: "Square"
	},
	{
		value: "portrait",
		label: "Portrait"
	},
	{
		value: "custom",
		label: "Custom"
	}
];
var OUTPUT_OPTIONS = [
	{
		value: "current",
		label: "Current size"
	},
	{
		value: "presentation",
		label: "Presentation"
	},
	{
		value: "social",
		label: "Social"
	},
	{
		value: "story",
		label: "Story"
	}
];
var GRID_OPTIONS = [
	{
		value: "light",
		label: "Light"
	},
	{
		value: "medium",
		label: "Medium"
	},
	{
		value: "strong",
		label: "Strong"
	}
];
var LEGEND_OPTIONS = [
	{
		value: "bottom",
		label: "Bottom"
	},
	{
		value: "top",
		label: "Top"
	},
	{
		value: "right",
		label: "Right"
	},
	{
		value: "none",
		label: "None"
	}
];
var SERIES_TYPES = [
	{
		value: "bar",
		label: "Bar"
	},
	{
		value: "line",
		label: "Line"
	},
	{
		value: "area",
		label: "Area"
	}
];
var AXIS_OPTIONS = [{
	value: "left",
	label: "Left axis"
}, {
	value: "right",
	label: "Right axis"
}];
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
function clamp(n, min, max) {
	if (!Number.isFinite(n)) return min;
	return Math.min(max, Math.max(min, Math.round(n)));
}
function paletteColor(id, index) {
	const colors = PALETTES[id];
	return colors[index % colors.length] ?? colors[0];
}
function toHex(color) {
	return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#3B78F2";
}
var seq = 0;
function uid(prefix) {
	seq += 1;
	return `${prefix}-${seq.toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
function parseNumber(raw) {
	const trimmed = raw.trim().replace(/[%$\s]/g, "");
	if (!trimmed) return null;
	const normalized = trimmed.replace(/,/g, "");
	const n = Number(normalized);
	return Number.isFinite(n) ? n : null;
}
function formatValue(n) {
	if (!Number.isFinite(n)) return "";
	const abs = Math.abs(n);
	if (abs >= 1e5) return new Intl.NumberFormat("en", {
		notation: "compact",
		maximumFractionDigits: 1
	}).format(n);
	const digits = Number.isInteger(n) ? 0 : abs < 10 ? 2 : 1;
	return new Intl.NumberFormat("en", { maximumFractionDigits: digits }).format(n);
}
function slugify(title) {
	return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "chart";
}
function cloneDoc(doc) {
	return {
		...doc,
		series: doc.series.map((series) => ({ ...series })),
		rows: doc.rows.map((row) => ({
			...row,
			values: { ...row.values }
		}))
	};
}
function aspectOf(doc) {
	if (doc.size === "square") return 1;
	if (doc.size === "portrait") return 3 / 4;
	if (doc.size === "custom") return clamp(doc.customWidth, 320, 4e3) / clamp(doc.customHeight, 320, 4e3);
	return 16 / 9;
}
function exportPixels(doc) {
	if (doc.output === "presentation") return {
		width: 1920,
		height: 1080,
		label: "Presentation"
	};
	if (doc.output === "social") return {
		width: 1080,
		height: 1080,
		label: "Social"
	};
	if (doc.output === "story") return {
		width: 1080,
		height: 1920,
		label: "Story"
	};
	if (doc.size === "square") return {
		width: 1600,
		height: 1600,
		label: "Current size"
	};
	if (doc.size === "portrait") return {
		width: 1200,
		height: 1600,
		label: "Current size"
	};
	if (doc.size === "custom") return {
		width: clamp(doc.customWidth, 320, 4e3),
		height: clamp(doc.customHeight, 320, 4e3),
		label: "Current size"
	};
	return {
		width: 1920,
		height: 1080,
		label: "Current size"
	};
}
function nextCategoryLabel(rows) {
	const last = rows[rows.length - 1]?.label ?? "";
	const month = MONTHS.indexOf(last);
	if (month >= 0 && month < MONTHS.length - 1) return MONTHS[month + 1] ?? `Item ${rows.length + 1}`;
	const quarter = /^Q(\d+)$/i.exec(last.trim());
	if (quarter) return `Q${Number(quarter[1]) + 1}`;
	const week = /^W(\d+)$/i.exec(last.trim());
	if (week) return `W${Number(week[1]) + 1}`;
	return `Item ${rows.length + 1}`;
}
function row(id, label, values) {
	return {
		id,
		label,
		values
	};
}
function doc(partial) {
	return partial;
}
var revenueDoc = doc({
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
	series: [{
		id: "rev",
		name: "Revenue",
		color: PALETTES.default[0],
		type: "bar",
		axis: "left"
	}, {
		id: "yoy",
		name: "YoY growth rate",
		color: PALETTES.default[1],
		type: "line",
		axis: "right"
	}],
	rows: [
		row("r-jan", "Jan", {
			rev: "420",
			yoy: "3"
		}),
		row("r-feb", "Feb", {
			rev: "510",
			yoy: "5"
		}),
		row("r-mar", "Mar", {
			rev: "580",
			yoy: "8"
		}),
		row("r-apr", "Apr", {
			rev: "650",
			yoy: "9"
		}),
		row("r-may", "May", {
			rev: "720",
			yoy: "12"
		}),
		row("r-jun", "Jun", {
			rev: "820",
			yoy: "15"
		})
	]
});
var SAMPLES = [
	{
		id: "revenue-growth",
		label: "Revenue × growth rate",
		description: "Monthly revenue bars with a growth-rate line",
		doc: revenueDoc
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
			series: [{
				id: "pv",
				name: "Page views",
				color: PALETTES.default[0],
				type: "bar",
				axis: "left"
			}, {
				id: "cvr",
				name: "CVR",
				color: PALETTES.default[1],
				type: "line",
				axis: "right"
			}],
			rows: [
				row("w1", "W1", {
					pv: "12400",
					cvr: "2.1"
				}),
				row("w2", "W2", {
					pv: "13820",
					cvr: "2.4"
				}),
				row("w3", "W3", {
					pv: "15110",
					cvr: "2.8"
				}),
				row("w4", "W4", {
					pv: "14240",
					cvr: "2.3"
				}),
				row("w5", "W5", {
					pv: "16890",
					cvr: "3.1"
				}),
				row("w6", "W6", {
					pv: "18340",
					cvr: "3.4"
				})
			]
		})
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
			series: [{
				id: "actual",
				name: "Actual",
				color: PALETTES.default[0],
				type: "bar",
				axis: "left"
			}, {
				id: "target",
				name: "Target",
				color: PALETTES.default[2],
				type: "line",
				axis: "left"
			}],
			rows: [
				row("q1", "Q1", {
					actual: "182",
					target: "190"
				}),
				row("q2", "Q2", {
					actual: "205",
					target: "210"
				}),
				row("q3", "Q3", {
					actual: "196",
					target: "220"
				}),
				row("q4", "Q4", {
					actual: "238",
					target: "250"
				})
			]
		})
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
			series: [{
				id: "temp",
				name: "Temperature",
				color: PALETTES.default[2],
				type: "line",
				axis: "left"
			}, {
				id: "rain",
				name: "Precipitation",
				color: PALETTES.default[0],
				type: "bar",
				axis: "right"
			}],
			rows: [
				row("m1", "Jan", {
					temp: "4.2",
					rain: "78"
				}),
				row("m2", "Feb", {
					temp: "5.1",
					rain: "62"
				}),
				row("m3", "Mar", {
					temp: "8.4",
					rain: "68"
				}),
				row("m4", "Apr", {
					temp: "12.6",
					rain: "54"
				}),
				row("m5", "May", {
					temp: "16.8",
					rain: "48"
				}),
				row("m6", "Jun", {
					temp: "20.4",
					rain: "36"
				}),
				row("m7", "Jul", {
					temp: "23.7",
					rain: "22"
				}),
				row("m8", "Aug", {
					temp: "23.1",
					rain: "28"
				}),
				row("m9", "Sep", {
					temp: "18.9",
					rain: "44"
				}),
				row("m10", "Oct", {
					temp: "13.2",
					rain: "71"
				}),
				row("m11", "Nov", {
					temp: "8.0",
					rain: "82"
				}),
				row("m12", "Dec", {
					temp: "4.8",
					rain: "88"
				})
			]
		})
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
				{
					id: "product",
					name: "Product",
					color: PALETTES.default[0],
					type: "bar",
					axis: "left"
				},
				{
					id: "services",
					name: "Services",
					color: PALETTES.default[1],
					type: "bar",
					axis: "left"
				},
				{
					id: "license",
					name: "Licensing",
					color: PALETTES.default[2],
					type: "bar",
					axis: "left"
				},
				{
					id: "margin",
					name: "Margin",
					color: PALETTES.default[3],
					type: "line",
					axis: "right"
				}
			],
			rows: [
				row("sq1", "Q1", {
					product: "120",
					services: "86",
					license: "34",
					margin: "18.4"
				}),
				row("sq2", "Q2", {
					product: "138",
					services: "102",
					license: "41",
					margin: "19.1"
				}),
				row("sq3", "Q3", {
					product: "132",
					services: "118",
					license: "48",
					margin: "21.6"
				}),
				row("sq4", "Q4", {
					product: "154",
					services: "126",
					license: "57",
					margin: "22.8"
				})
			]
		})
	}
];
function defaultDoc() {
	return cloneDoc(revenueDoc);
}
var RATE = /rate|growth|cvr|margin|ratio|percent|%|temp|index|yield/i;
var TARGET = /target|goal|plan|forecast/i;
function parseTable(text) {
	const cleaned = text.replace(/^\uFEFF/, "").trim();
	if (!cleaned) return [];
	const firstLine = cleaned.split(/\r?\n/, 1)[0] ?? "";
	const commas = (firstLine.match(/,/g) ?? []).length;
	const tabs = (firstLine.match(/\t/g) ?? []).length;
	const semis = (firstLine.match(/;/g) ?? []).length;
	const delim = tabs > commas && tabs >= semis ? "	" : semis > commas ? ";" : ",";
	const rows = [];
	let row = [];
	let cell = "";
	let inQuotes = false;
	for (let i = 0; i < cleaned.length; i += 1) {
		const char = cleaned[i];
		if (inQuotes) {
			if (char === "\"") {
				if (cleaned[i + 1] === "\"") {
					cell += "\"";
					i += 1;
				} else inQuotes = false;
			} else cell += char ?? "";
			continue;
		}
		if (char === "\"") inQuotes = true;
		else if (char === delim) {
			row.push(cell.trim());
			cell = "";
		} else if (char === "\n") {
			row.push(cell.trim());
			rows.push(row);
			row = [];
			cell = "";
		} else if (char !== "\r") cell += char ?? "";
	}
	if (cell.length > 0 || row.length > 0) {
		row.push(cell.trim());
		rows.push(row);
	}
	return rows.filter((entry) => entry.some((value) => value !== ""));
}
function numericScore(cells) {
	const filled = cells.filter((cell) => cell.trim() !== "");
	if (!filled.length) return 0;
	return filled.filter((cell) => parseNumber(cell) !== null).length / filled.length;
}
function inferKind(name, count) {
	if (count === 1) return {
		type: RATE.test(name) ? "line" : "bar",
		axis: "left"
	};
	if (TARGET.test(name)) return {
		type: "line",
		axis: "left"
	};
	if (RATE.test(name)) return {
		type: "line",
		axis: "right"
	};
	return {
		type: "bar",
		axis: "left"
	};
}
function tableToChart(text, palette) {
	const grid = parseTable(text);
	if (!grid.length) return {
		ok: false,
		message: "Paste a table or choose a CSV file first."
	};
	const width = Math.max(...grid.map((entry) => entry.length));
	const norm = grid.map((entry) => [...entry, ...Array.from({ length: Math.max(0, width - entry.length) }, () => "")]);
	const hasHeader = numericScore(norm[0] ?? []) < .5;
	const body = hasHeader ? norm.slice(1) : norm;
	if (!body.length) return {
		ok: false,
		message: "Add at least one data row under the header."
	};
	const headers = hasHeader ? norm[0] ?? [] : [];
	const firstColumnIsCategory = body.some((entry) => {
		const cell = entry[0] ?? "";
		return cell !== "" && parseNumber(cell) === null;
	});
	const seriesIndexes = [];
	for (let index = 0; index < width; index += 1) {
		if (firstColumnIsCategory && index === 0) continue;
		seriesIndexes.push(index);
	}
	if (!seriesIndexes.length) return {
		ok: false,
		message: "Couldn't find a numeric column to plot."
	};
	let truncated = false;
	const keptIndexes = seriesIndexes.slice(0, 8);
	if (keptIndexes.length < seriesIndexes.length) truncated = true;
	const names = keptIndexes.map((index, order) => {
		const header = (headers[index] ?? "").trim();
		const fallback = `Series ${order + 1}`;
		return (header || fallback).slice(0, 48);
	});
	const series = names.map((name, order) => {
		const kind = inferKind(name, names.length);
		return {
			id: uid("s"),
			name,
			color: paletteColor(palette, order),
			type: kind.type,
			axis: kind.axis
		};
	});
	const sourceRows = body.slice(0, 200);
	if (sourceRows.length < body.length) truncated = true;
	const rows = sourceRows.map((entry, index) => {
		const label = firstColumnIsCategory ? (entry[0] || `Item ${index + 1}`).slice(0, 40) : `Item ${index + 1}`;
		const values = {};
		series.forEach((item, order) => {
			const column = keptIndexes[order] ?? 0;
			values[item.id] = entry[column] ?? "";
		});
		return {
			id: uid("r"),
			label,
			values
		};
	}).filter((entry) => entry.label !== "" || Object.values(entry.values).some((value) => value !== ""));
	if (!rows.length) return {
		ok: false,
		message: "Couldn't find any rows to plot."
	};
	if (!rows.some((entry) => series.some((item) => parseNumber(entry.values[item.id] ?? "") !== null))) return {
		ok: false,
		message: "Couldn't find any numbers in that table."
	};
	return {
		ok: true,
		series,
		rows,
		notice: truncated ? `Loaded ${rows.length} rows · ${series.length} series. Extra data was skipped.` : `Loaded ${rows.length} rows · ${series.length} series.`
	};
}
function csvEscape(value) {
	if (/[",\n]/.test(value)) return `"${value.replace(/"/g, "\"\"")}"`;
	return value;
}
function toCsv(xLabel, series, rows) {
	return [[xLabel || "Item", ...series.map((item) => item.name)], ...rows.map((entry) => [entry.label, ...series.map((item) => entry.values[item.id] ?? "")])].map((line) => line.map(csvEscape).join(",")).join("\n");
}
function readFileAsText(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result ?? ""));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Couldn't read that file."));
		reader.readAsText(file);
	});
}
var useChartStore = create()(persist((set, get) => ({
	...defaultDoc(),
	theme: "light",
	setTheme: (theme) => set({ theme }),
	patch: (partial) => set(partial),
	loadSample: (id) => {
		const sample = SAMPLES.find((entry) => entry.id === id);
		if (!sample) return;
		set(cloneDoc(sample.doc));
	},
	setPalette: (palette) => set((state) => ({
		palette,
		series: state.series.map((series, index) => ({
			...series,
			color: paletteColor(palette, index)
		}))
	})),
	updateSeries: (id, partial) => set((state) => ({ series: state.series.map((series) => series.id === id ? {
		...series,
		...partial
	} : series) })),
	addSeries: () => set((state) => {
		if (state.series.length >= 8) return state;
		const id = uid("s");
		const type = state.series.some((series) => series.type === "bar") ? "line" : "bar";
		const axis = type === "line" ? "right" : "left";
		return {
			series: [...state.series, {
				id,
				name: `Series ${state.series.length + 1}`,
				color: paletteColor(state.palette, state.series.length),
				type,
				axis
			}],
			rows: state.rows.map((entry) => ({
				...entry,
				values: {
					...entry.values,
					[id]: ""
				}
			}))
		};
	}),
	removeSeries: (id) => set((state) => ({
		series: state.series.filter((series) => series.id !== id),
		rows: state.rows.map((entry) => {
			const values = { ...entry.values };
			delete values[id];
			return {
				...entry,
				values
			};
		})
	})),
	setLabel: (rowId, label) => set((state) => ({ rows: state.rows.map((entry) => entry.id === rowId ? {
		...entry,
		label
	} : entry) })),
	setCell: (rowId, seriesId, value) => set((state) => ({ rows: state.rows.map((entry) => entry.id === rowId ? {
		...entry,
		values: {
			...entry.values,
			[seriesId]: value
		}
	} : entry) })),
	addRow: () => set((state) => {
		const id = uid("r");
		const values = Object.fromEntries(state.series.map((series) => [series.id, ""]));
		return { rows: [...state.rows, {
			id,
			label: nextCategoryLabel(state.rows),
			values
		}] };
	}),
	removeRow: (id) => set((state) => ({ rows: state.rows.filter((entry) => entry.id !== id) })),
	moveRow: (id, direction) => set((state) => {
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
		set({
			series: result.series,
			rows: result.rows
		});
		return result;
	}
}), {
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
		rows: state.rows
	}),
	merge: (persisted, current) => {
		const saved = persisted;
		if (!saved || !Array.isArray(saved.series) || !Array.isArray(saved.rows)) return current;
		return {
			...current,
			...saved
		};
	}
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var ChartSvg = (0, import_react.lazy)(() => import("./chart-svg-CrSVM9sK.mjs"));
function useElementSize(ref) {
	const [size, setSize] = (0, import_react.useState)({
		width: 0,
		height: 0
	});
	(0, import_react.useEffect)(() => {
		const element = ref.current;
		if (!element) return;
		const apply = (width, height) => {
			const next = {
				width: Math.round(width),
				height: Math.round(height)
			};
			setSize((prev) => prev.width === next.width && prev.height === next.height ? prev : next);
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
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setReduced(media.matches);
		apply();
		media.addEventListener("change", apply);
		return () => media.removeEventListener("change", apply);
	}, []);
	return reduced;
}
function Swatch({ series }) {
	if (series.type === "line") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 22 10",
		className: "h-2.5 w-6 shrink-0",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "1",
			y1: "5",
			x2: "21",
			y2: "5",
			stroke: series.color,
			strokeWidth: "2.4",
			strokeLinecap: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "11",
			cy: "5",
			r: "2.4",
			fill: series.color
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("h-2.5 shrink-0 rounded-sm", series.type === "area" ? "w-6" : "w-3.5"),
		style: {
			backgroundColor: series.color,
			opacity: series.type === "area" ? .85 : 1
		}
	});
}
function Legend({ series, vertical, fontSize }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: cn("flex gap-x-4 gap-y-2", vertical ? "flex-col justify-center" : "flex-wrap"),
		style: { fontSize },
		children: series.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex max-w-full items-center gap-2 font-medium text-plot-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, { series: item }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-plot-ink",
				children: item.name || "Series"
			})]
		}, item.id))
	});
}
function frameStyle(ratio) {
	const safe = Number.isFinite(ratio) && ratio > 0 ? ratio : 16 / 9;
	return {
		aspectRatio: String(safe),
		width: `min(100cqw, calc(100cqh * ${safe}))`,
		maxWidth: "100%",
		maxHeight: "100%"
	};
}
var ChartCard = (0, import_react.forwardRef)(function ChartCard({ exporting = false }, ref) {
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
	const cardRef = (0, import_react.useRef)(null);
	const plotRef = (0, import_react.useRef)(null);
	const titleRef = (0, import_react.useRef)(null);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const cardSize = useElementSize(cardRef);
	const plotSize = useElementSize(plotRef);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const width = cardSize.width || 640;
	const titlePx = clamp(Math.round(width / 24), 18, 64);
	const subtitlePx = clamp(Math.round(width / 42), 13, 32);
	const legendPx = clamp(Math.round(width / 48), 12, 28);
	const pad = clamp(Math.round(width / 32), 16, 56);
	const structureKey = `${stackBars}|${series.map((item) => `${item.id}:${item.type}:${item.axis}:${item.color}`).join("|")}`;
	const empty = series.length === 0 || rows.length === 0;
	const setRefs = (node) => {
		cardRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		ref: setRefs,
		className: cn("flex h-full w-full flex-col bg-chart text-plot-ink", exporting ? "shadow-none" : "shadow-card"),
		style: {
			borderRadius: Math.min(28, pad),
			padding: pad,
			border: "1px solid var(--color-plot-grid-medium)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "sr-only",
				children: [
					title || "Chart",
					".",
					" ",
					series.map((item) => `${item.name} ${item.type} on the ${item.axis} axis`).join(". ")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				children: [exporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "min-w-0 flex-1 font-semibold tracking-tight text-plot-ink",
					style: { fontSize: titlePx },
					children: title || "Untitled chart"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: titleRef,
					"aria-label": "Chart title",
					value: title,
					placeholder: "Chart title",
					onChange: (event) => patch({ title: event.target.value }),
					className: "min-w-0 flex-1 bg-transparent font-semibold tracking-tight text-plot-ink outline-none placeholder:text-plot-muted",
					style: { fontSize: titlePx }
				}), exporting ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Edit title",
					onClick: () => titleRef.current?.focus(),
					className: "mt-1 grid size-8 shrink-0 place-items-center rounded-lg text-plot-muted hover:bg-plot-grid-light hover:text-plot-ink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
				})]
			}),
			exporting ? subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-plot-muted",
				style: { fontSize: subtitlePx },
				children: subtitle
			}) : null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				"aria-label": "Subtitle",
				value: subtitle,
				placeholder: "Subtitle or annotation",
				onChange: (event) => patch({ subtitle: event.target.value }),
				className: "mt-1 w-full bg-transparent text-plot-muted outline-none placeholder:text-plot-muted/70",
				style: { fontSize: subtitlePx }
			}),
			legend === "top" && series.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					series,
					fontSize: legendPx
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-2 flex min-h-0 flex-1", legend === "right" && "flex-row gap-4"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: plotRef,
					className: "plot-svg min-h-0 min-w-0 flex-1",
					children: empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-full place-items-center px-6 text-center text-sm text-plot-muted",
						children: "Add a series and at least one row to draw the chart."
					}) : mounted && plotSize.width > 40 && plotSize.height > 40 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full animate-pulse rounded-xl bg-plot-grid-light" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSvg, {
							width: plotSize.width,
							height: plotSize.height,
							animate: !exporting && !reduced,
							series,
							rows,
							showLabels,
							stackBars,
							grid,
							xLabel,
							yLeftLabel,
							yRightLabel
						}, structureKey)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full rounded-xl bg-plot-grid-light/60" })
				}), legend === "right" && series.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					series,
					vertical: true,
					fontSize: legendPx
				}) : null]
			}),
			legend === "bottom" && series.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					series,
					fontSize: legendPx
				})
			}) : null
		]
	});
});
var fieldClass = "h-11 w-full rounded-xl border border-border bg-surface-2 px-3 text-base text-fg outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/25 sm:text-sm";
function FieldLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mb-1.5 block text-sm font-medium text-fg",
		children
	});
}
function TextField({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			placeholder,
			onChange: (event) => onChange(event.target.value),
			className: fieldClass
		})]
	});
}
function SelectField({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value,
				onChange: (event) => onChange(event.target.value),
				className: cn(fieldClass, "appearance-none pr-10"),
				children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: option.value,
					children: option.label
				}, option.value))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" })]
		})]
	});
}
function Switch({ checked, onChange, label, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm text-fg",
			children: label
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 block text-xs text-muted",
			children: hint
		}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "switch",
			"aria-checked": checked,
			"aria-label": label,
			onClick: () => onChange(!checked),
			className: cn("relative h-7 w-12 shrink-0 rounded-full transition", checked ? "bg-primary" : "bg-border"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0.5 size-6 rounded-full bg-knob shadow transition", checked ? "left-5" : "left-0.5") })
		})]
	});
}
function IconButton({ label, className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		className: cn("grid size-11 shrink-0 place-items-center rounded-xl text-muted transition hover:bg-surface-2 hover:text-fg disabled:cursor-not-allowed disabled:opacity-30", className),
		...props,
		children
	});
}
function GhostButton({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: cn("inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-fg transition hover:bg-surface-2 disabled:opacity-50", className),
		...props,
		children
	});
}
function PrimaryButton({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: cn("inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover disabled:opacity-50", className),
		...props,
		children
	});
}
function ColorField({ color, label, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "relative grid size-11 shrink-0 place-items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "color",
			value: toHex(color),
			"aria-label": label,
			onChange: (event) => onChange(event.target.value),
			className: "absolute inset-0 cursor-pointer opacity-0"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-7 rounded-lg border border-border",
			style: { backgroundColor: color }
		})]
	});
}
function StylePanel({ onSample }) {
	const doc = useChartStore();
	const paletteMatches = doc.series.every((series, index) => series.color.toLowerCase() === paletteColor(doc.palette, index).toLowerCase());
	const paletteOptions = paletteMatches ? PALETTE_OPTIONS : [{
		value: "custom",
		label: "Custom"
	}, ...PALETTE_OPTIONS];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-fg",
					children: "Start from a sample"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Load a combo chart, then change anything."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: SAMPLES.map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: sample.description,
						onClick: () => {
							doc.loadSample(sample.id);
							onSample();
						},
						className: "min-h-11 rounded-full border border-border bg-surface px-3 py-2 text-left text-sm text-fg transition hover:border-primary hover:bg-primary/5",
						children: sample.label
					}, sample.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-fg",
						children: "Adjust appearance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Title",
						value: doc.title,
						onChange: (title) => doc.patch({ title })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Subtitle",
						value: doc.subtitle,
						onChange: (subtitle) => doc.patch({ subtitle }),
						placeholder: "Annotation under the title"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
						label: "Color palette",
						value: paletteMatches ? doc.palette : "custom",
						onChange: (value) => {
							if (value === "custom") return;
							doc.setPalette(value);
						},
						options: paletteOptions
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5",
						"aria-hidden": true,
						children: (PALETTES[doc.palette] ?? []).map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-2 flex-1 rounded-full",
							style: { backgroundColor: color }
						}, color))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
						label: "Size",
						value: doc.size,
						onChange: (size) => doc.patch({ size }),
						options: SIZE_OPTIONS
					}),
					doc.size === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1.5 block text-sm font-medium text-fg",
								children: "Width"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 320,
								max: 4e3,
								value: doc.customWidth,
								onChange: (event) => doc.patch({ customWidth: Number(event.target.value) }),
								onBlur: () => doc.patch({ customWidth: clamp(doc.customWidth, 320, 4e3) }),
								className: "h-11 w-full rounded-xl border border-border bg-surface-2 px-3 text-base text-fg outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 sm:text-sm"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1.5 block text-sm font-medium text-fg",
								children: "Height"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 320,
								max: 4e3,
								value: doc.customHeight,
								onChange: (event) => doc.patch({ customHeight: Number(event.target.value) }),
								onBlur: () => doc.patch({ customHeight: clamp(doc.customHeight, 320, 4e3) }),
								className: "h-11 w-full rounded-xl border border-border bg-surface-2 px-3 text-base text-fg outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 sm:text-sm"
							})]
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
						label: "Axis and grid",
						value: doc.grid,
						onChange: (grid) => doc.patch({ grid }),
						options: GRID_OPTIONS
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
						label: "Output preset",
						value: doc.output,
						onChange: (output) => doc.patch({ output }),
						options: OUTPUT_OPTIONS
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
						label: "Legend",
						value: doc.legend,
						onChange: (legend) => doc.patch({ legend }),
						options: LEGEND_OPTIONS
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "X-axis label",
						value: doc.xLabel,
						onChange: (xLabel) => doc.patch({ xLabel }),
						placeholder: "Month"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Y-axis (left) label",
						value: doc.yLeftLabel,
						onChange: (yLeftLabel) => doc.patch({ yLeftLabel }),
						placeholder: "Revenue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Y-axis (right) label",
						value: doc.yRightLabel,
						onChange: (yRightLabel) => doc.patch({ yRightLabel }),
						placeholder: "Growth rate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						label: "Show data labels",
						checked: doc.showLabels,
						onChange: (showLabels) => doc.patch({ showLabels })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						label: "Stack the bars",
						hint: "Lines and areas stay overlaid.",
						checked: doc.stackBars,
						onChange: (stackBars) => doc.patch({ stackBars })
					})
				]
			})
		]
	});
}
function SeriesList() {
	const series = useChartStore((state) => state.series);
	const updateSeries = useChartStore((state) => state.updateSeries);
	const addSeries = useChartStore((state) => state.addSeries);
	const removeSeries = useChartStore((state) => state.removeSeries);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold text-fg",
				children: "Series display"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs text-muted",
				children: [
					series.length,
					"/",
					8
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: series.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-surface p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
							color: item.color,
							label: `${item.name || "Series"} color`,
							onChange: (color) => updateSeries(item.id, { color })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"aria-label": `${item.name || "Series"} name`,
							value: item.name,
							placeholder: "Series name",
							onChange: (event) => updateSeries(item.id, { name: event.target.value }),
							className: "h-11 min-w-0 flex-1 rounded-xl border border-border bg-surface-2 px-3 text-base text-fg outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 sm:text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							label: `Remove ${item.name || "series"}`,
							onClick: () => removeSeries(item.id),
							className: "hover:bg-danger/10 hover:text-danger",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "sr-only",
							children: [item.name, " chart type"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: item.type,
							"aria-label": `${item.name || "Series"} chart type`,
							onChange: (event) => updateSeries(item.id, { type: event.target.value }),
							className: "h-11 w-full rounded-xl border border-border bg-surface-2 px-3 text-sm text-fg outline-none focus:border-primary",
							children: SERIES_TYPES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: option.value,
								children: option.label
							}, option.value))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "sr-only",
							children: [item.name, " axis"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: item.axis,
							"aria-label": `${item.name || "Series"} axis`,
							onChange: (event) => updateSeries(item.id, { axis: event.target.value }),
							className: "h-11 w-full rounded-xl border border-border bg-surface-2 px-3 text-sm text-fg outline-none focus:border-primary",
							children: AXIS_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: option.value,
								children: option.label
							}, option.value))
						})]
					})]
				})]
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostButton, {
			className: "mt-3",
			onClick: addSeries,
			disabled: series.length >= 8,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add series"]
		})
	] });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-2xl border border-border",
		onPaste: (event) => {
			const text = event.clipboardData.getData("text");
			if (!text.includes("\n") && !text.includes("	")) return;
			event.preventDefault();
			const result = loadCsv(text);
			if (result.ok) toast.success(result.notice ?? "Table replaced");
			else toast.error(result.message);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[36rem] border-collapse text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "bg-surface-2 text-left text-xs font-semibold text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						className: "sticky left-0 bg-surface-2 px-3 py-3 font-semibold",
						children: xLabel || "Item"
					}),
					series.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						className: "px-3 py-3 font-semibold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-2.5 rounded-full",
								style: { backgroundColor: item.color }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whitespace-nowrap",
								children: item.name || "Series"
							})]
						})
					}, item.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						className: "px-2 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Row actions"
						})
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "row",
						className: "sticky left-0 bg-surface p-0 font-normal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"aria-label": `Category ${index + 1}`,
							value: entry.label,
							onChange: (event) => setLabel(entry.id, event.target.value),
							className: "h-11 w-full min-w-24 bg-transparent px-3 text-left text-base text-fg outline-none focus:bg-surface-2 sm:text-sm"
						})
					}),
					series.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"aria-label": `${entry.label || "Row"} ${item.name || "series"}`,
							inputMode: "decimal",
							value: entry.values[item.id] ?? "",
							onChange: (event) => setCell(entry.id, item.id, event.target.value),
							className: "h-11 w-full min-w-24 bg-transparent px-3 text-right text-base text-fg tabular-nums outline-none focus:bg-surface-2 sm:text-sm"
						})
					}, item.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									label: `Move ${entry.label || "row"} up`,
									disabled: index === 0,
									onClick: () => moveRow(entry.id, -1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									label: `Move ${entry.label || "row"} down`,
									disabled: index === rows.length - 1,
									onClick: () => moveRow(entry.id, 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									label: `Delete ${entry.label || "row"}`,
									onClick: () => removeRow(entry.id),
									className: "hover:bg-danger/10 hover:text-danger",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})
							]
						})
					})
				]
			}, entry.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				colSpan: series.length + 2,
				className: "px-3 py-8 text-center text-sm text-muted",
				children: "No rows yet. Add an item or paste a table."
			}) }) : null] })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 flex flex-wrap gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostButton, {
			onClick: addRow,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add item"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
			onClick: exportCsv,
			children: "Export CSV"
		})]
	})] });
}
function PastePanel({ onLoaded }) {
	const [text, setText] = (0, import_react.useState)("");
	const loadCsv = useChartStore((state) => state.loadCsv);
	const fileRef = (0, import_react.useRef)(null);
	function apply(source) {
		const result = loadCsv(source);
		if (result.ok) {
			toast.success(result.notice ?? "Chart data loaded");
			onLoaded();
		} else toast.error(result.message);
	}
	async function onFile(file) {
		if (!file) return;
		if (file.size > 2e6) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "First row can be headers. The first text column becomes the categories. Growth, rate, and margin columns land on the right axis as lines."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: text,
				onChange: (event) => setText(event.target.value),
				spellCheck: false,
				"aria-label": "CSV or TSV",
				placeholder: "Month,Revenue,YoY growth rate\nJan,420,3\nFeb,510,5\nMar,580,8",
				className: "min-h-64 w-full resize-y rounded-2xl border border-border bg-surface-2 p-3 text-sm text-fg tabular-nums outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
						onClick: () => apply(text),
						disabled: !text.trim(),
						children: "Parse and load"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostButton, {
						onClick: () => fileRef.current?.click(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "Upload CSV"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: ".csv,.tsv,text/csv,text/tab-separated-values,text/plain",
						className: "sr-only",
						onChange: (event) => {
							const file = event.target.files?.[0];
							event.target.value = "";
							onFile(file);
						}
					})
				]
			})
		]
	});
}
function DataPanel({ onLoaded }) {
	const [tab, setTab] = (0, import_react.useState)("table");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-semibold text-fg",
			children: "Enter data"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1",
			role: "tablist",
			children: [["table", "Table"], ["paste", "Paste CSV/TSV"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "tab",
				"aria-selected": tab === id,
				onClick: () => setTab(id),
				className: cn("h-11 rounded-xl text-sm font-medium transition", tab === id ? "bg-surface text-fg shadow-sm" : "text-muted hover:text-fg"),
				children: label
			}, id))
		})] }), tab === "table" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "tabpanel",
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeriesList, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "tabpanel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PastePanel, { onLoaded })
		})]
	});
}
function pixelRatioFor(width, height) {
	const longSide = Math.max(width, height);
	if (longSide >= 2e3) return 1;
	if (longSide * 2 <= 3840) return 2;
	return 1;
}
async function rasterBlob(node, ratio) {
	const options = {
		pixelRatio: ratio,
		backgroundColor: "#ffffff",
		cacheBust: true
	};
	try {
		const blob = await toBlob(node, options);
		if (blob) return blob;
	} catch {
		const blob = await toBlob(node, {
			...options,
			skipFonts: true
		});
		if (blob) return blob;
	}
	throw new Error("Couldn't render the chart image.");
}
async function chartToPng(node, width, height) {
	return rasterBlob(node, pixelRatioFor(width, height));
}
async function chartToSvg(node) {
	try {
		return await toSvg(node, {
			backgroundColor: "#ffffff",
			cacheBust: true
		});
	} catch {
		return toSvg(node, {
			backgroundColor: "#ffffff",
			cacheBust: true,
			skipFonts: true
		});
	}
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	link.remove();
	URL.revokeObjectURL(url);
}
function downloadUrl(url, filename) {
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	link.remove();
}
async function copyNodeImage(node) {
	const blobPromise = rasterBlob(node, 2);
	await navigator.clipboard.write([new ClipboardItem({ "image/png": blobPromise })]);
}
async function waitForPlot(node, minWidth) {
	const started = performance.now();
	while (performance.now() - started < 2800) {
		const box = node.querySelector("svg")?.getBoundingClientRect();
		if (box && box.width > Math.min(minWidth, 240) * .45 && box.height > 80) {
			await new Promise((resolve) => setTimeout(resolve, 80));
			return;
		}
		await new Promise((resolve) => setTimeout(resolve, 50));
	}
	throw new Error("The chart wasn't ready to export.");
}
function Studio() {
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
	const [tab, setTab] = (0, import_react.useState)("chart");
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [job, setJob] = (0, import_react.useState)(null);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const previewRef = (0, import_react.useRef)(null);
	const exportRef = (0, import_react.useRef)(null);
	const dragDepth = (0, import_react.useRef)(0);
	const menuRef = (0, import_react.useRef)(null);
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
		rows
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
		rows
	});
	(0, import_react.useEffect)(() => {
		Promise.resolve(useChartStore.persist.rehydrate()).finally(() => setReady(true));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [ready, theme]);
	(0, import_react.useEffect)(() => {
		if (!menuOpen) return;
		const close = (event) => {
			if (!menuRef.current?.contains(event.target)) setMenuOpen(false);
		};
		window.addEventListener("pointerdown", close);
		return () => window.removeEventListener("pointerdown", close);
	}, [menuOpen]);
	(0, import_react.useEffect)(() => {
		if (!job) return;
		let cancelled = false;
		const mode = job.mode;
		(async () => {
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
	function startExport(mode) {
		if (busy) return;
		setMenuOpen(false);
		setBusy(mode);
		const next = exportPixels(useChartStore.getState());
		setJob({
			width: next.width,
			height: next.height,
			mode
		});
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
	async function acceptFile(file) {
		if (!file) return;
		if (file.size > 2e6) {
			toast.error("That file is larger than 2 MB.");
			return;
		}
		try {
			const text = await readFileAsText(file);
			const result = loadCsv(text);
			if (result.ok) {
				toast.success(result.notice ?? "Chart data loaded");
				setTab("chart");
			} else toast.error(result.message);
		} catch {
			toast.error("Couldn't read that file.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "studio-shell",
		onDragEnter: (event) => {
			if (![...event.dataTransfer.types].includes("Files")) return;
			event.preventDefault();
			dragDepth.current += 1;
			setDragOver(true);
		},
		onDragLeave: (event) => {
			event.preventDefault();
			dragDepth.current -= 1;
			if (dragDepth.current <= 0) {
				dragDepth.current = 0;
				setDragOver(false);
			}
		},
		onDragOver: (event) => {
			if ([...event.dataTransfer.types].includes("Files")) event.preventDefault();
		},
		onDrop: (event) => {
			event.preventDefault();
			dragDepth.current = 0;
			setDragOver(false);
			acceptFile(event.dataTransfer.files?.[0]);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-16 shrink-0 items-center gap-3 border-b border-border bg-surface px-3 sm:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "grid size-9 grid-cols-3 items-end gap-0.5 rounded-xl bg-primary px-2 py-1.5",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 rounded-sm bg-primary-fg/80" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 rounded-sm bg-primary-fg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 rounded-sm bg-primary-fg/80" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate text-sm font-semibold text-fg",
							children: "Chart Studio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden text-xs text-muted sm:block",
							children: "Bars, lines, and a second axis"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Reset to the revenue sample",
							onClick: () => {
								loadSample("revenue-growth");
								setTab("chart");
							},
							className: "grid size-11 place-items-center rounded-xl text-muted transition hover:bg-surface-2 hover:text-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
							onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
							className: "grid size-11 place-items-center rounded-xl text-muted transition hover:bg-surface-2 hover:text-fg",
							children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "studio-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-border bg-surface px-3 py-2 xl:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-1 rounded-2xl bg-surface-2 p-1",
							role: "tablist",
							"aria-label": "Studio sections",
							children: [
								{
									id: "chart",
									label: "Chart",
									icon: ChartLine
								},
								{
									id: "style",
									label: "Style",
									icon: SlidersHorizontal
								},
								{
									id: "data",
									label: "Data",
									icon: Table2
								}
							].map((item) => {
								const Icon = item.icon;
								const selected = tab === item.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									role: "tab",
									"aria-selected": selected,
									onClick: () => setTab(item.id),
									className: cn("flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium transition", selected ? "bg-surface text-fg shadow-sm" : "text-muted hover:text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
								}, item.id);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: cn("panel-scroll bg-surface xl:border-r xl:border-border", tab !== "style" && "max-xl:hidden"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StylePanel, { onSample: () => setTab("chart") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: cn("flex min-h-0 min-w-0 flex-col bg-bg", tab !== "chart" && "max-xl:hidden"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 flex-1 p-3 sm:p-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fit-host",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: frameStyle(ratio),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, { ref: previewRef })
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "flex flex-col gap-3 border-t border-border px-3 py-3 sm:flex-row sm:items-center sm:px-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted sm:flex-1",
								children: [
									rows.length,
									" categories · ",
									series.length,
									" series",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-1.5",
										children: "·"
									}),
									pixels.label,
									" ",
									pixels.width,
									"×",
									pixels.height
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								ref: menuRef,
								className: "relative flex w-full sm:w-auto",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => startExport("png"),
										disabled: busy !== null || series.length === 0 || rows.length === 0,
										className: "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-l-xl bg-primary px-4 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover disabled:opacity-50 sm:flex-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), busy === "png" ? "Preparing…" : "Download PNG"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "More download options",
										"aria-expanded": menuOpen,
										disabled: busy !== null,
										onClick: () => setMenuOpen((open) => !open),
										className: "grid h-11 w-11 place-items-center rounded-r-xl border-l border-primary-fg/20 bg-primary text-primary-fg transition hover:bg-primary-hover disabled:opacity-50",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
									}),
									menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute right-0 bottom-12 z-20 w-48 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-card",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => startExport("svg"),
											className: "flex h-11 w-full items-center gap-2 px-3 text-left text-sm text-fg hover:bg-surface-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4 text-muted" }), "Download SVG"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => void copyImage(),
											className: "flex h-11 w-full items-center gap-2 px-3 text-left text-sm text-fg hover:bg-surface-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4 text-muted" }), "Copy image"]
										})]
									}) : null
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: cn("panel-scroll bg-surface xl:border-l xl:border-border", tab !== "data" && "max-xl:hidden"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPanel, { onLoaded: () => setTab("chart") })
					})
				]
			}),
			job ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed top-0 left-0 -z-10",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: job.width,
						height: job.height,
						position: "absolute",
						left: -2e4
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						ref: exportRef,
						exporting: true
					})
				})
			}) : null,
			dragOver ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-0 z-40 grid place-items-center bg-bg/80 p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl border border-primary bg-surface px-6 py-4 text-sm font-semibold text-fg",
					children: "Drop a CSV to load it"
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				theme
			})
		]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => SplitComponent });
var SplitComponent = Studio;
//#endregion
export { parseNumber as i, clamp as n, formatValue as r, routes_exports as t };
