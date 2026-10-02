"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Layers,
  MoreHorizontal,
  ExternalLink,
  ChevronRight,
  Filter,
} from "lucide-react";
import { mockHoldings } from "@/data/mock-portfolio";
import { Holding, AssetCategory } from "@/types/portfolio";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function HoldingsTable() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortField, setSortField] = useState<"totalValue" | "change24h" | "name">("totalValue");
  const [sortAsc, setSortAsc] = useState(false);

  // Filter & sort logic
  const filteredHoldings = useMemo(() => {
    return mockHoldings
      .filter((item) => {
        const matchesCategory =
          selectedCategory === "ALL" || item.category === selectedCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.ticker.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === "string") {
          return sortAsc
            ? (valA as string).localeCompare(valB as string)
            : (valB as string).localeCompare(valA as string);
        }
        return sortAsc
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      });
  }, [search, selectedCategory, sortField, sortAsc]);

  const toggleSort = (field: "totalValue" | "change24h" | "name") => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <Card id="holdings" className="border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-xl">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800/60">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Asset Holdings & Capital Distribution
          </CardTitle>
          <CardDescription className="mt-0.5">
            Active positions across equities, cryptocurrency, and fixed income
          </CardDescription>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Pills */}
          <div className="flex items-center rounded-xl bg-zinc-900 border border-zinc-800 p-1 text-xs">
            {["ALL", "Equities", "Crypto", "Fixed Income"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-zinc-800 text-white font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter assets..."
              className="h-8 pl-8 pr-3 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 px-0 sm:px-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/70 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                <th
                  onClick={() => toggleSort("name")}
                  className="py-3 px-3 cursor-pointer hover:text-zinc-200"
                >
                  <div className="flex items-center gap-1">
                    Asset <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Price</th>
                <th
                  onClick={() => toggleSort("change24h")}
                  className="py-3 px-3 cursor-pointer hover:text-zinc-200"
                >
                  <div className="flex items-center gap-1">
                    24h Change <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 hidden md:table-cell">7D Trend</th>
                <th
                  onClick={() => toggleSort("totalValue")}
                  className="py-3 px-3 text-right cursor-pointer hover:text-zinc-200"
                >
                  <div className="flex items-center justify-end gap-1">
                    Holding Value <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 hidden lg:table-cell text-right">Portfolio Share</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40 text-xs">
              {filteredHoldings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-500">
                    No holdings match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredHoldings.map((holding) => {
                  const isPositive = holding.change24h >= 0;
                  
                  // Compute Mini Sparkline SVG
                  const min = Math.min(...holding.sparkline);
                  const max = Math.max(...holding.sparkline);
                  const range = max - min || 1;
                  const sparkPoints = holding.sparkline
                    .map((val, idx) => {
                      const x = (idx / (holding.sparkline.length - 1)) * 80;
                      const y = 24 - ((val - min) / range) * 20;
                      return `${x},${y}`;
                    })
                    .join(" ");

                  return (
                    <tr
                      key={holding.id}
                      className="group hover:bg-zinc-800/30 transition-colors"
                    >
                      {/* Asset & Ticker */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl border flex items-center justify-center font-mono font-bold text-xs ${holding.iconBg}`}
                          >
                            {holding.ticker.slice(0, 3)}
                          </div>
                          <div>
                            <div className="font-semibold text-zinc-100 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                              {holding.name}
                            </div>
                            <div className="text-[11px] text-zinc-400 font-mono">
                              {holding.ticker} • {holding.amountHeld} units
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Current Spot Price */}
                      <td className="py-3.5 px-3 font-mono font-medium text-zinc-200">
                        {formatCurrency(holding.currentPrice)}
                      </td>

                      {/* 24h Change */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-0.5 font-mono font-semibold px-2 py-0.5 rounded-md ${
                            isPositive
                              ? "text-emerald-400 bg-emerald-500/10"
                              : "text-rose-400 bg-rose-500/10"
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {formatPercent(holding.change24h)}
                        </span>
                      </td>

                      {/* 7D Sparkline */}
                      <td className="py-3.5 px-3 hidden md:table-cell">
                        <svg className="w-20 h-6 overflow-visible" viewBox="0 0 80 24">
                          <polyline
                            fill="none"
                            stroke={isPositive ? "#10b981" : "#f43f5e"}
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={sparkPoints}
                          />
                        </svg>
                      </td>

                      {/* Total Value Held */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="font-mono font-bold text-zinc-100">
                          {formatCurrency(holding.totalValue)}
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          Avg: {formatCurrency(holding.currentPrice * 0.92)}
                        </div>
                      </td>

                      {/* Portfolio Share */}
                      <td className="py-3.5 px-3 hidden lg:table-cell text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-mono text-zinc-300">
                            {holding.allocationPercent}%
                          </span>
                          <div className="w-16 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                            <div
                              className="h-full bg-cyan-400 rounded-full"
                              style={{ width: `${Math.min(100, holding.allocationPercent * 2.5)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Action Button */}
                      <td className="py-3.5 px-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800"
                        >
                          Trade
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
