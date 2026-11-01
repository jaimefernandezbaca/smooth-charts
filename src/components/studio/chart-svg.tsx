import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  type AxisSide,
  type GridLevel,
  type Row,
  type Series,
  clamp,
  formatValue,
  parseNumber,
} from "@/lib/chart/model";

type ChartSvgProps = {
  width: number;
  height: number;
  animate: boolean;
  series: Series[];
  rows: Row[];
  showLabels: boolean;
  stackBars: boolean;
  grid: GridLevel;
  xLabel: string;
  yLeftLabel: string;
  yRightLabel: string;
};

type Point = Record<string, string | number | null>;

const GRID_STROKE: Record<GridLevel, string> = {
  light: "var(--color-plot-grid-light)",
  medium: "var(--color-plot-grid-medium)",
  strong: "var(--color-plot-grid-strong)",
};

function numbersFor(data: Point[], series: Series[], axis: AxisSide): number[] {
  const ids = series.filter((item) => item.axis === axis).map((item) => item.id);
  const values: number[] = [];
  for (const point of data) {
    for (const id of ids) {
      const value = point[id];
      if (typeof value === "number") values.push(value);
    }
  }
  return values;
}

function domainFor(values: number[], forceZero: boolean, showLabels: boolean): [
  "auto" | ((dataMin: number) => number),
  "auto" | ((dataMax: number) => number),
] {
  if (!values.length) return ["auto", "auto"];
  const min = Math.min(...values);
  const includeZero = forceZero && min >= 0;
  return [
    (dataMin: number) => (includeZero ? 0 : dataMin),
    (dataMax: number) => {
      const headroom = showLabels ? 0.16 : 0.06;
      const span = Math.abs(dataMax) || 1;
      return dataMax + span * headroom;
    },
  ];
}

export default function ChartSvg({
  width,
  height,
  animate,
  series,
  rows,
  showLabels,
  stackBars,
  grid,
  xLabel,
  yLeftLabel,
  yRightLabel,
}: ChartSvgProps) {
  const tickSize = clamp(Math.round(width / 78), 12, 28);
  const labelSize = clamp(Math.round(width / 90), 11, 24);
  const stroke = clamp(Math.round(width / 280), 2, 4);
  const dot = clamp(Math.round(width / 180), 3, 6);
  const radius = clamp(Math.round(width / 150), 4, 10);
  const rotate = rows.length > 8;

  const data: Point[] = rows.map((entry) => {
    const point: Point = { label: entry.label || " " };
    for (const item of series) {
      point[item.id] = parseNumber(entry.values[item.id] ?? "");
    }
    return point;
  });

  const ordered = [
    ...series.filter((item) => item.type === "area"),
    ...series.filter((item) => item.type === "bar"),
    ...series.filter((item) => item.type === "line"),
  ];

  const hasLeft = series.some((item) => item.axis === "left");
  const hasRight = series.some((item) => item.axis === "right");
  const leftValues = numbersFor(data, series, "left");
  const rightValues = numbersFor(data, series, "right");
  const leftForceZero = series.some((item) => item.axis === "left" && item.type === "bar");
  const rightForceZero = series.some((item) => item.axis === "right" && item.type === "bar");

  const axisWidth = (values: number[], hasLabel: boolean) => {
    const longest = values.reduce((max, value) => Math.max(max, formatValue(value).length), 2);
    return Math.ceil((longest + 1) * tickSize * 0.68) + (hasLabel ? tickSize + 10 : 12);
  };

  const xHeight = (rotate ? tickSize * 2.6 : tickSize * 2.1) + (xLabel ? tickSize + 8 : 0);
  const duration = animate ? 700 : 0;

  function renderTip(raw: {
    active?: boolean;
    label?: unknown;
    payload?: ReadonlyArray<{ dataKey?: unknown; value?: unknown }>;
  }) {
    const payload = raw.payload ?? [];
    if (!raw.active || !payload.length) return null;
    const items = series
      .map((item) => {
        const match = payload.find((entry) => String(entry.dataKey) === item.id);
        if (!match) return null;
        const num = typeof match.value === "number" ? match.value : Number(match.value);
        if (!Number.isFinite(num)) return null;
        return { id: item.id, name: item.name, color: item.color, value: num };
      })
      .filter((item): item is { id: string; name: string; color: string; value: number } => item !== null);
    if (!items.length) return null;
    return (
      <div className="rounded-xl bg-plot-tip px-3 py-2 text-plot-tip-fg shadow-card">
        <p className="mb-1 text-sm font-semibold">{String(raw.label ?? "")}</p>
        <div className="space-y-1">
          {items.map((item) => (
            <p key={item.id} className="flex items-center gap-2 text-sm">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="opacity-80">{item.name}</span>
              <span className="ml-2 font-semibold tabular-nums">{formatValue(item.value)}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ComposedChart
      width={width}
      height={height}
      data={data}
      margin={{ top: showLabels ? labelSize + 10 : 8, right: hasRight ? 8 : 12, left: 0, bottom: 0 }}
      barCategoryGap="20%"
      barGap={clamp(Math.round(width / 220), 2, 8)}
    >
      <CartesianGrid vertical={false} stroke={GRID_STROKE[grid]} />
      <XAxis
        dataKey="label"
        tick={{ fill: "var(--color-plot-muted)", fontSize: tickSize }}
        tickLine={false}
        tickMargin={8}
        axisLine={{ stroke: "var(--color-plot-axis)" }}
        interval={0}
        angle={rotate ? -36 : 0}
        textAnchor={rotate ? "end" : "middle"}
        height={xHeight}
        label={
          xLabel
            ? {
                value: xLabel,
                position: "insideBottom",
                offset: 0,
                style: {
                  fill: "var(--color-plot-muted)",
                  fontSize: tickSize,
                  fontWeight: 600,
                },
              }
            : undefined
        }
      />
      {hasLeft ? (
        <YAxis
          yAxisId="left"
          orientation="left"
          tick={{ fill: "var(--color-plot-muted)", fontSize: tickSize }}
          tickLine={false}
          axisLine={false}
          width={axisWidth(leftValues, false)}
          tickFormatter={(value: number) => formatValue(Number(value))}
          domain={domainFor(leftValues, leftForceZero, showLabels)}
        />
      ) : null}
      {hasRight ? (
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fill: "var(--color-plot-muted)", fontSize: tickSize }}
          tickLine={false}
          axisLine={false}
          width={axisWidth(rightValues, false)}
          tickFormatter={(value: number) => formatValue(Number(value))}
          domain={domainFor(rightValues, rightForceZero, showLabels)}
        />
      ) : null}
      <Tooltip
        content={(props) => renderTip(props)}
        cursor={{ fill: "var(--color-plot-grid-medium)" }}
        wrapperStyle={{ outline: "none", zIndex: 20 }}
      />
      {ordered.map((item) => {
        const values = data
          .map((point) => point[item.id])
          .filter((value): value is number => typeof value === "number");
        const rounded = !stackBars && values.every((value) => value >= 0);
        if (item.type === "bar") {
          return (
            <Bar
              key={item.id}
              yAxisId={item.axis}
              dataKey={item.id}
              name={item.name}
              fill={item.color}
              maxBarSize={clamp(Math.round(width / 8), 28, 96)}
              radius={rounded ? [radius, radius, 0, 0] : 0}
              stackId={stackBars ? `stack-${item.axis}` : undefined}
              isAnimationActive={animate}
              animationDuration={duration}
              animationEasing="ease-out"
            >
              {showLabels ? (
                <LabelList
                  dataKey={item.id}
                  position="top"
                  offset={6}
                  formatter={(value: unknown) => {
                    const num = typeof value === "number" ? value : Number(value);
                    return Number.isFinite(num) ? formatValue(num) : "";
                  }}
                  style={{ fill: "var(--color-plot-ink)", fontSize: labelSize, fontWeight: 650 }}
                />
              ) : null}
            </Bar>
          );
        }
        if (item.type === "area") {
          return (
            <Area
              key={item.id}
              yAxisId={item.axis}
              dataKey={item.id}
              name={item.name}
              type="monotone"
              stroke={item.color}
              fill={item.color}
              fillOpacity={0.18}
              strokeWidth={stroke}
              dot={false}
              activeDot={{ r: dot + 1 }}
              isAnimationActive={animate}
              animationDuration={duration}
              animationEasing="ease-out"
            >
              {showLabels ? (
                <LabelList
                  dataKey={item.id}
                  position="top"
                  offset={8}
                  formatter={(value: unknown) => {
                    const num = typeof value === "number" ? value : Number(value);
                    return Number.isFinite(num) ? formatValue(num) : "";
                  }}
                  style={{ fill: "var(--color-plot-ink)", fontSize: labelSize, fontWeight: 650 }}
                />
              ) : null}
            </Area>
          );
        }
        return (
          <Line
            key={item.id}
            yAxisId={item.axis}
            dataKey={item.id}
            name={item.name}
            type="monotone"
            stroke={item.color}
            strokeWidth={stroke}
            dot={{ r: dot, strokeWidth: 0, fill: item.color }}
            activeDot={{ r: dot + 2 }}
            connectNulls={false}
            isAnimationActive={animate}
            animationDuration={duration}
            animationEasing="ease-out"
          >
            {showLabels ? (
              <LabelList
                dataKey={item.id}
                position="top"
                offset={8}
                formatter={(value: unknown) => {
                  const num = typeof value === "number" ? value : Number(value);
                  return Number.isFinite(num) ? formatValue(num) : "";
                }}
                style={{ fill: "var(--color-plot-ink)", fontSize: labelSize, fontWeight: 650 }}
              />
            ) : null}
          </Line>
        );
      })}
    </ComposedChart>
  );
}
