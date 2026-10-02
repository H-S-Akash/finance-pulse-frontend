"use client";

import React, { useState } from "react";
import {
  PieChart,
  ShieldAlert,
  Zap,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Percent,
  Layers,
  Activity,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { mockAssetAllocations, mockRiskMetrics } from "@/data/mock-portfolio";
import { formatCurrency, formatPercent } from "@/lib/utils";

export function FeatureGrid() {
  const [rebalancing, setRebalancing] = useState(false);
  const [rebalanced, setRebalanced] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState("Balanced Growth");

  const handleSimulateRebalance = () => {
    setRebalancing(true);
    setTimeout(() => {
      setRebalancing(false);
      setRebalanced(true);
      setTimeout(() => setRebalanced(false), 4000);
    }, 1200);
  };

  return (
    <section id="features" className="py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Portfolio Command & Intelligence
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time algorithmic monitoring, risk radar, and automated alpha generation
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Badge variant="cyan" className="font-mono text-[11px]">
            AI ENGINE ACTIVE
          </Badge>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1: Asset Allocation Engine */}
        <Card className="flex flex-col justify-between border-cyan-500/20 bg-gradient-to-b from-zinc-900/90 via-zinc-900/50 to-[#0b0e17] hover:border-cyan-500/40 transition-all duration-300">
          <div>
            <CardHeader className="flex flex-row items-start justify-between pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-white">
                      Allocation Matrix
                    </CardTitle>
                    <CardDescription>
                      Live weighting vs. Target benchmark
                    </CardDescription>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">
                {activeStrategy}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4 pt-1">
              {/* Stacked visually rich progress bars */}
              <div className="space-y-3">
                {mockAssetAllocations.map((alloc) => {
                  const deviation = alloc.percentage - alloc.targetPercentage;
                  return (
                    <div key={alloc.category} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-zinc-300 flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: alloc.color }}
                          />
                          {alloc.category}
                        </span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-zinc-200 font-semibold">
                            {alloc.percentage}%
                          </span>
                          <span className="text-zinc-500 text-[10px]">
                            (tgt {alloc.targetPercentage}%)
                          </span>
                          {deviation !== 0 && (
                            <span
                              className={`text-[10px] ${
                                deviation > 0 ? "text-amber-400" : "text-cyan-400"
                              }`}
                            >
                              {deviation > 0 ? `+${deviation}%` : `${deviation}%`}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-zinc-800/80 overflow-hidden relative">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${alloc.percentage}%`,
                            backgroundColor: alloc.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Drift Advisory Notice */}
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-200">Allocation Drift:</span>{" "}
                  Crypto is <span className="font-mono">+5.0%</span> over target due to recent BTC rally.
                </div>
              </div>
            </CardContent>
          </div>

          <CardFooter className="pt-3">
            <Button
              onClick={handleSimulateRebalance}
              disabled={rebalancing}
              variant={rebalanced ? "emerald" : "outline"}
              size="sm"
              className="w-full text-xs"
            >
              {rebalancing ? (
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 animate-spin" />
                  Calculating optimal trade batch...
                </span>
              ) : rebalanced ? (
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Portfolio Rebalanced to Target!
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Auto-Trim to Target Allocations
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* COLUMN 2: Volatility & Institutional Risk Radar */}
        <Card className="flex flex-col justify-between border-emerald-500/20 bg-gradient-to-b from-zinc-900/90 via-zinc-900/50 to-[#0b0e17] hover:border-emerald-500/40 transition-all duration-300">
          <div>
            <CardHeader className="flex flex-row items-start justify-between pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-white">
                      Institutional Risk Radar
                    </CardTitle>
                    <CardDescription>
                      VaR, Sharpe & Volatility bounds
                    </CardDescription>
                  </div>
                </div>
              </div>
              <Badge variant="success" className="text-[10px]">
                Health 94/100
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4 pt-1">
              {/* Sharpe Ratio Highlight Card */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/60">
                  <div className="text-[11px] text-zinc-400">Sharpe Ratio</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
                    {mockRiskMetrics.sharpeRatio}
                  </div>
                  <div className="text-[10px] text-emerald-500/90 font-medium">
                    {mockRiskMetrics.sharpeRating} (Top 5%)
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/60">
                  <div className="text-[11px] text-zinc-400">Beta to S&P 500</div>
                  <div className="text-2xl font-bold font-mono text-cyan-400 mt-0.5">
                    {mockRiskMetrics.beta}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-medium">
                    Moderate Market Correlation
                  </div>
                </div>
              </div>

              {/* Secondary Risk Metrics */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/60">
                  <span className="text-zinc-400">95% Daily Value-at-Risk (VaR)</span>
                  <span className="font-mono font-semibold text-rose-400">
                    -{formatCurrency(mockRiskMetrics.valueAtRisk95)} (1.44%)
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/60">
                  <span className="text-zinc-400">Annualized Volatility</span>
                  <span className="font-mono font-semibold text-zinc-200">
                    {mockRiskMetrics.volatility}%
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/60">
                  <span className="text-zinc-400">Max Historical Drawdown</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {mockRiskMetrics.maxDrawdown}% (vs SPY -12.4%)
                  </span>
                </div>
              </div>
            </CardContent>
          </div>

          <CardFooter className="pt-3">
            <div className="w-full flex items-center justify-between text-xs text-zinc-400 px-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5" />
                Zero Liquidation Exposure
              </span>
              <a
                href="#risk"
                className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-0.5 text-[11px]"
              >
                Stress Test <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </CardFooter>
        </Card>

        {/* COLUMN 3: Algorithmic Yield & Alpha Radar */}
        <Card className="flex flex-col justify-between border-indigo-500/20 bg-gradient-to-b from-zinc-900/90 via-zinc-900/50 to-[#0b0e17] hover:border-indigo-500/40 transition-all duration-300">
          <div>
            <CardHeader className="flex flex-row items-start justify-between pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-white">
                      Yield & Passive Engine
                    </CardTitle>
                    <CardDescription>
                      Staking rewards & recurring dividends
                    </CardDescription>
                  </div>
                </div>
              </div>
              <Badge variant="purple" className="text-[10px]">
                5.22% APY
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4 pt-1">
              {/* Annual Yield Counter */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-zinc-900 border border-indigo-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-300">Annual Run-Rate Passive Income</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  $14,886<span className="text-xs text-zinc-400 font-normal"> / year</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                  +$1,240.50 projected this month
                </div>
              </div>

              {/* Upcoming Cash Flows */}
              <div className="space-y-2 text-xs">
                <div className="text-zinc-400 font-semibold text-[11px] uppercase tracking-wider">
                  Upcoming Payout Schedule
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-zinc-200 font-medium">Apple (AAPL) Div</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">+$45.00</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-zinc-200 font-medium">Ethereum Staking (Lido)</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">+$147.42</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-zinc-200 font-medium">US Treasury T-Bill Yield</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">+$53.12</span>
                </div>
              </div>
            </CardContent>
          </div>

          <CardFooter className="pt-3">
            <div className="w-full flex items-center justify-between text-xs text-zinc-400 px-1">
              <span className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Auto-DCA Active: $500/wk
              </span>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-zinc-300">
                Manage DCA
              </Button>
            </div>
          </CardFooter>
        </Card>

      </div>
    </section>
  );
}
