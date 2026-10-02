"use client";

import React, { useState, useMemo } from "react";
import { TrendingUp, Layers, Eye, Info, Crosshair } from "lucide-react";
import { mockTimeSeriesMap } from "@/data/mock-portfolio";
import { TimeFrame, TimeSeriesPoint } from "@/types/portfolio";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Tabs } from "./ui/tabs";
import { Badge } from "./ui/badge";

export function PerformanceChart() {
  const [activeTimeframe, setActiveTimeframe] = useState<TimeFrame>("1M");
  const [hoveredPoint, setHoveredPoint] = useState<TimeSeriesPoint | null>(null);
  const [showBenchmark, setShowBenchmark] = useState(true);

  const timeSeries = useMemo(() => {
    return mockTimeSeriesMap[activeTimeframe] || mockTimeSeriesMap["1M"];
  }, [activeTimeframe]);

  // Calculate min, max, delta for the active timeframe
  const { minVal, maxVal, deltaVal, deltaPercent, startVal, currentVal } = useMemo(() => {
    const values = timeSeries.map((p) => p.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const start = values[0];
    const end = values[values.length - 1];
    const delta = end - start;
    const pct = start > 0 ? (delta / start) * 100 : 0;
    return {
      minVal: min,
      maxVal: max,
      deltaVal: delta,
      deltaPercent: pct,
      startVal: start,
      currentVal: end,
    };
  }, [timeSeries]);

  // SVG viewBox and chart bounds
  const width = 800;
  const height = 300;
  const paddingX = 40;
  const paddingY = 30;

  // Coordinate normalizer
  const points = useMemo(() => {
    const valRange = maxVal - minVal || 1;
    const count = timeSeries.length;
    return timeSeries.map((point, index) => {
      const x = paddingX + (index / (count - 1)) * (width - paddingX * 2);
      const y = height - paddingY - ((point.value - minVal) / valRange) * (height - paddingY * 2);
      
      // Benchmark normalization
      const benchY =
        height - paddingY - ((point.benchmarkValue - minVal) / valRange) * (height - paddingY * 2);

      return {
        x,
        y,
        benchY: Math.max(paddingY, Math.min(height - paddingY, benchY)),
        data: point,
      };
    });
  }, [timeSeries, minVal, maxVal, width, height, paddingX, paddingY]);

  // Construct SVG Path string
  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    return points.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, "");
  }, [points]);

  // Closed area path for gradient
  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const first = points[0];
    const last = points[points.length - 1];
    const baseLine = height - paddingY;
    return `${linePath} L ${last.x} ${baseLine} L ${first.x} ${baseLine} Z`;
  }, [linePath, points, height, paddingY]);

  // Benchmark line path
  const benchPath = useMemo(() => {
    if (points.length === 0) return "";
    return points.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.benchY}` : `${acc} L ${curr.x} ${curr.benchY}`;
    }, "");
  }, [points]);

  const activeDisplayVal = hoveredPoint ? hoveredPoint.value : currentVal;
  const activeDisplayDate = hoveredPoint ? hoveredPoint.date : "Latest Close";

  return (
    <Card id="performance" className="border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-xl">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800/60">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Portfolio Performance
            </CardTitle>
            <Badge
              variant={deltaVal >= 0 ? "success" : "danger"}
              className="font-mono text-xs"
            >
              {deltaVal >= 0 ? "+" : ""}
              {formatPercent(deltaPercent)}
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Capital growth benchmarked against the S&P 500 Index
          </CardDescription>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Benchmark Toggle */}
          <button
            type="button"
            onClick={() => setShowBenchmark(!showBenchmark)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border font-medium transition-colors cursor-pointer ${
              showBenchmark
                ? "bg-zinc-800 text-zinc-200 border-zinc-700"
                : "bg-transparent text-zinc-500 border-zinc-800 hover:text-zinc-300"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>S&P 500 Benchmark</span>
          </button>

          {/* Timeframe Selector */}
          <Tabs
            size="sm"
            tabs={[
              { id: "1D", label: "1D" },
              { id: "1W", label: "1W" },
              { id: "1M", label: "1M" },
              { id: "1Y", label: "1Y" },
              { id: "ALL", label: "ALL" },
            ]}
            activeTab={activeTimeframe}
            onChange={(id) => {
              setActiveTimeframe(id as TimeFrame);
              setHoveredPoint(null);
            }}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {/* Dynamic Header Metrics on hover */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
          <div className="space-y-0.5">
            <div className="text-xs text-zinc-400 font-medium">
              Portfolio Value ({activeDisplayDate})
            </div>
            <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
              {formatCurrency(activeDisplayVal)}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-zinc-500 block text-[10px]">TIMEFRAME HIGH</span>
              <span className="text-emerald-400 font-semibold">{formatCurrency(maxVal)}</span>
            </div>
            <div className="h-6 w-px bg-zinc-800" />
            <div className="text-right">
              <span className="text-zinc-500 block text-[10px]">TIMEFRAME LOW</span>
              <span className="text-zinc-300 font-semibold">{formatCurrency(minVal)}</span>
            </div>
          </div>
        </div>

        {/* Interactive SVG Chart Container */}
        <div className="relative w-full h-64 sm:h-72">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Cyan gradient for portfolio area */}
              <linearGradient id="cyanAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>

              {/* Glowing stroke filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#06b6d4" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Horizontal Grid lines */}
            {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
              const y = paddingY + ratio * (height - paddingY * 2);
              return (
                <line
                  key={ratio}
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#1f2430"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              );
            })}

            {/* Benchmark line (S&P 500) */}
            {showBenchmark && (
              <path
                d={benchPath}
                fill="none"
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className="opacity-70 transition-opacity"
              />
            )}

            {/* Area Fill */}
            <path d={areaPath} fill="url(#cyanAreaGradient)" />

            {/* Main Portfolio Stroke */}
            <path
              d={linePath}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />

            {/* Interactive Points & Invisible Hover Slices */}
            {points.map((pt, idx) => (
              <g key={idx}>
                {/* Visible dot on hover or endpoints */}
                {(hoveredPoint?.date === pt.data.date || idx === points.length - 1) && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint?.date === pt.data.date ? 6 : 4}
                    fill="#06b6d4"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />
                )}

                {/* Vertical cursor guide when hovered */}
                {hoveredPoint?.date === pt.data.date && (
                  <line
                    x1={pt.x}
                    y1={paddingY}
                    x2={pt.x}
                    y2={height - paddingY}
                    stroke="#06b6d4"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    className="opacity-80"
                  />
                )}

                {/* Expanded Invisible hit-target slice for buttery mouse interaction */}
                <rect
                  x={pt.x - (width / points.length) / 2}
                  y={0}
                  width={width / points.length}
                  height={height}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoveredPoint(pt.data)}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Legend & Footnote */}
        <div className="flex flex-wrap items-center justify-between text-xs text-zinc-500 pt-3 border-t border-zinc-800/50 mt-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-3 h-0.5 bg-cyan-400 inline-block rounded-full" />
              FinancePulse Portfolio
            </span>
            {showBenchmark && (
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-3 h-0.5 bg-slate-500 inline-block border-t border-dashed" />
                S&P 500 Index (Normalized)
              </span>
            )}
          </div>
          <div className="font-mono text-[11px] text-zinc-400">
            Hover along chart to inspect points
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
