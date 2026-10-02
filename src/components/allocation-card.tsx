"use client";

import React from "react";
import { PieChart, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import { mockAssetAllocations, mockPortfolioSummary } from "@/data/mock-portfolio";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export function AllocationCard() {
  return (
    <Card className="border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-xl flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3 border-b border-zinc-800/60">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-cyan-400" />
              Capital Composition
            </CardTitle>
            <Badge variant="cyan" className="font-mono text-[10px]">
              4 Asset Classes
            </Badge>
          </div>
          <CardDescription>
            Diversification distribution & liquidity
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          {/* Visual Multi-Segment Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-zinc-800 p-0.5 gap-0.5">
              {mockAssetAllocations.map((alloc) => (
                <div
                  key={alloc.category}
                  style={{
                    width: `${alloc.percentage}%`,
                    backgroundColor: alloc.color,
                  }}
                  className="h-full rounded-sm transition-all hover:opacity-80"
                  title={`${alloc.category}: ${alloc.percentage}%`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span>Equities 48%</span>
              <span>Crypto 30%</span>
              <span>Fixed 14%</span>
              <span>Cash 8%</span>
            </div>
          </div>

          {/* Allocation Breakdown Rows */}
          <div className="space-y-2.5 pt-1">
            {mockAssetAllocations.map((alloc) => (
              <div
                key={alloc.category}
                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800/60 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: alloc.color }}
                  />
                  <div>
                    <span className="font-medium text-zinc-200 block">
                      {alloc.category}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Target: {alloc.targetPercentage}%
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="font-semibold text-zinc-100">
                    {formatCurrency(alloc.value)}
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    {alloc.percentage}% of portfolio
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>

      {/* Cash Reserve Highlight */}
      <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs">
        <span className="text-zinc-400 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Emergency Liquidity
        </span>
        <span className="font-mono font-semibold text-emerald-400">
          {formatCurrency(mockPortfolioSummary.cashAvailable)}
        </span>
      </div>
    </Card>
  );
}
