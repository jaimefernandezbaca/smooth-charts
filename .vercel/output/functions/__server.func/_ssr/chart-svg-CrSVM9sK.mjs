import { K as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as parseNumber, n as clamp, r as formatValue } from "./routes-B-GA-bN9.mjs";
import { a as Line, c as LabelList, i as Area, l as Tooltip, n as YAxis, o as CartesianGrid, r as XAxis, s as Bar, t as ComposedChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chart-svg-CrSVM9sK.js
var import_jsx_runtime = require_jsx_runtime();
var GRID_STROKE = {
	light: "var(--color-plot-grid-light)",
	medium: "var(--color-plot-grid-medium)",
	strong: "var(--color-plot-grid-strong)"
};
function numbersFor(data, series, axis) {
	const ids = series.filter((item) => item.axis === axis).map((item) => item.id);
	const values = [];
	for (const point of data) for (const id of ids) {
		const value = point[id];
		if (typeof value === "number") values.push(value);
	}
	return values;
}
function domainFor(values, forceZero, showLabels) {
	if (!values.length) return ["auto", "auto"];
	const min = Math.min(...values);
	const includeZero = forceZero && min >= 0;
	return [(dataMin) => includeZero ? 0 : dataMin, (dataMax) => {
		return dataMax + (Math.abs(dataMax) || 1) * (showLabels ? .16 : .06);
	}];
}
function ChartSvg({ width, height, animate, series, rows, showLabels, stackBars, grid, xLabel, yLeftLabel, yRightLabel }) {
	const tickSize = clamp(Math.round(width / 78), 12, 28);
	const labelSize = clamp(Math.round(width / 90), 11, 24);
	const stroke = clamp(Math.round(width / 280), 2, 4);
	const dot = clamp(Math.round(width / 180), 3, 6);
	const radius = clamp(Math.round(width / 150), 4, 10);
	const rotate = rows.length > 8;
	const data = rows.map((entry) => {
		const point = { label: entry.label || " " };
		for (const item of series) point[item.id] = parseNumber(entry.values[item.id] ?? "");
		return point;
	});
	const ordered = [
		...series.filter((item) => item.type === "area"),
		...series.filter((item) => item.type === "bar"),
		...series.filter((item) => item.type === "line")
	];
	const hasLeft = series.some((item) => item.axis === "left");
	const hasRight = series.some((item) => item.axis === "right");
	const leftValues = numbersFor(data, series, "left");
	const rightValues = numbersFor(data, series, "right");
	const leftForceZero = series.some((item) => item.axis === "left" && item.type === "bar");
	const rightForceZero = series.some((item) => item.axis === "right" && item.type === "bar");
	const axisWidth = (values, hasLabel) => {
		const longest = values.reduce((max, value) => Math.max(max, formatValue(value).length), 2);
		return Math.ceil((longest + 1) * tickSize * .68) + (hasLabel ? tickSize + 10 : 12);
	};
	const xHeight = (rotate ? tickSize * 2.6 : tickSize * 2.1) + (xLabel ? tickSize + 8 : 0);
	const duration = animate ? 700 : 0;
	function renderTip(raw) {
		const payload = raw.payload ?? [];
		if (!raw.active || !payload.length) return null;
		const items = series.map((item) => {
			const match = payload.find((entry) => String(entry.dataKey) === item.id);
			if (!match) return null;
			const num = typeof match.value === "number" ? match.value : Number(match.value);
			if (!Number.isFinite(num)) return null;
			return {
				id: item.id,
				name: item.name,
				color: item.color,
				value: num
			};
		}).filter((item) => item !== null);
		if (!items.length) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-plot-tip px-3 py-2 text-plot-tip-fg shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1 text-sm font-semibold",
				children: String(raw.label ?? "")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-2.5 rounded-full",
							style: { backgroundColor: item.color }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "opacity-80",
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 font-semibold tabular-nums",
							children: formatValue(item.value)
						})
					]
				}, item.id))
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
		width,
		height,
		data,
		margin: {
			top: showLabels ? labelSize + 10 : 8,
			right: hasRight ? 8 : 12,
			left: 0,
			bottom: 0
		},
		barCategoryGap: "20%",
		barGap: clamp(Math.round(width / 220), 2, 8),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
				vertical: false,
				stroke: GRID_STROKE[grid]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
				dataKey: "label",
				tick: {
					fill: "var(--color-plot-muted)",
					fontSize: tickSize
				},
				tickLine: false,
				tickMargin: 8,
				axisLine: { stroke: "var(--color-plot-axis)" },
				interval: 0,
				angle: rotate ? -36 : 0,
				textAnchor: rotate ? "end" : "middle",
				height: xHeight,
				label: xLabel ? {
					value: xLabel,
					position: "insideBottom",
					offset: 0,
					style: {
						fill: "var(--color-plot-muted)",
						fontSize: tickSize,
						fontWeight: 600
					}
				} : void 0
			}),
			hasLeft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
				yAxisId: "left",
				orientation: "left",
				tick: {
					fill: "var(--color-plot-muted)",
					fontSize: tickSize
				},
				tickLine: false,
				axisLine: false,
				width: axisWidth(leftValues, Boolean(yLeftLabel)),
				tickFormatter: (value) => formatValue(Number(value)),
				domain: domainFor(leftValues, leftForceZero, showLabels),
				label: yLeftLabel ? {
					value: yLeftLabel,
					angle: -90,
					position: "insideLeft",
					offset: 0,
					style: {
						fill: "var(--color-plot-muted)",
						fontSize: Math.max(11, tickSize - 1),
						fontWeight: 600,
						textAnchor: "middle"
					}
				} : void 0
			}) : null,
			hasRight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
				yAxisId: "right",
				orientation: "right",
				tick: {
					fill: "var(--color-plot-muted)",
					fontSize: tickSize
				},
				tickLine: false,
				axisLine: false,
				width: axisWidth(rightValues, Boolean(yRightLabel)),
				tickFormatter: (value) => formatValue(Number(value)),
				domain: domainFor(rightValues, rightForceZero, showLabels),
				label: yRightLabel ? {
					value: yRightLabel,
					angle: 90,
					position: "insideRight",
					offset: 0,
					style: {
						fill: "var(--color-plot-muted)",
						fontSize: Math.max(11, tickSize - 1),
						fontWeight: 600,
						textAnchor: "middle"
					}
				} : void 0
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: (props) => renderTip(props),
				cursor: { fill: "var(--color-plot-grid-medium)" },
				wrapperStyle: {
					outline: "none",
					zIndex: 20
				}
			}),
			ordered.map((item) => {
				const values = data.map((point) => point[item.id]).filter((value) => typeof value === "number");
				const rounded = !stackBars && values.every((value) => value >= 0);
				if (item.type === "bar") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					yAxisId: item.axis,
					dataKey: item.id,
					name: item.name,
					fill: item.color,
					maxBarSize: clamp(Math.round(width / 8), 28, 96),
					radius: rounded ? [
						radius,
						radius,
						0,
						0
					] : 0,
					stackId: stackBars ? `stack-${item.axis}` : void 0,
					isAnimationActive: animate,
					animationDuration: duration,
					animationEasing: "ease-out",
					children: showLabels ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelList, {
						dataKey: item.id,
						position: "top",
						offset: 6,
						formatter: (value) => {
							const num = typeof value === "number" ? value : Number(value);
							return Number.isFinite(num) ? formatValue(num) : "";
						},
						style: {
							fill: "var(--color-plot-ink)",
							fontSize: labelSize,
							fontWeight: 650
						}
					}) : null
				}, item.id);
				if (item.type === "area") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					yAxisId: item.axis,
					dataKey: item.id,
					name: item.name,
					type: "monotone",
					stroke: item.color,
					fill: item.color,
					fillOpacity: .18,
					strokeWidth: stroke,
					dot: false,
					activeDot: { r: dot + 1 },
					isAnimationActive: animate,
					animationDuration: duration,
					animationEasing: "ease-out",
					children: showLabels ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelList, {
						dataKey: item.id,
						position: "top",
						offset: 8,
						formatter: (value) => {
							const num = typeof value === "number" ? value : Number(value);
							return Number.isFinite(num) ? formatValue(num) : "";
						},
						style: {
							fill: "var(--color-plot-ink)",
							fontSize: labelSize,
							fontWeight: 650
						}
					}) : null
				}, item.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					yAxisId: item.axis,
					dataKey: item.id,
					name: item.name,
					type: "monotone",
					stroke: item.color,
					strokeWidth: stroke,
					dot: {
						r: dot,
						strokeWidth: 0,
						fill: item.color
					},
					activeDot: { r: dot + 2 },
					connectNulls: false,
					isAnimationActive: animate,
					animationDuration: duration,
					animationEasing: "ease-out",
					children: showLabels ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelList, {
						dataKey: item.id,
						position: "top",
						offset: 8,
						formatter: (value) => {
							const num = typeof value === "number" ? value : Number(value);
							return Number.isFinite(num) ? formatValue(num) : "";
						},
						style: {
							fill: "var(--color-plot-ink)",
							fontSize: labelSize,
							fontWeight: 650
						}
					}) : null
				}, item.id);
			})
		]
	});
}
//#endregion
export { ChartSvg as default };
