"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Plus,
  ArrowRightLeft,
  Sparkles,
  Download,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Wallet2,
  CheckCircle2,
} from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { mockPortfolioSummary } from "@/data/mock-portfolio";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function HeroMetric() {
  const [currency, setCurrency] = useState("USD");
  const [notification, setNotification] = useState<string | null>(null);

  const handleAction = (name: string) => {
    setNotification(`${name} dialog initiated.`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <section id="overview" className="relative pt-6 pb-4">
      {/* Background glow decoration */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Action Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-cyan-500/40 text-cyan-300 text-xs shadow-2xl shadow-cyan-950/80 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{notification}</span>
        </div>
      )}

      <div className="rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/80 via-zinc-900/40 to-[#0c0e15] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Main Portfolio Value */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                Total Portfolio Net Worth
              </span>
              <Badge variant="outline" className="text-[11px] font-mono py-0.5">
                {mockPortfolioSummary.lastUpdated}
              </Badge>
            </div>

            <div className="flex flex-wrap items-baseline gap-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-mono">
                {formatCurrency(mockPortfolioSummary.totalNetWorth, currency)}
              </h1>

              {/* 24h PnL Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold font-mono shadow-sm shadow-emerald-950">
                <ArrowUpRight className="w-4 h-4" />
                <span>
                  +{formatCurrency(mockPortfolioSummary.change24hAmount)} ({formatPercent(mockPortfolioSummary.change24hPercent)})
                </span>
                <span className="text-[11px] text-emerald-500/80 font-sans font-normal ml-0.5">
                  Today
                </span>
              </div>
            </div>

            {/* Micro stats banner */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-400 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500">All-Time Gain:</span>
                <span className="font-semibold text-emerald-400 font-mono">
                  +{formatCurrency(mockPortfolioSummary.allTimeProfit)} ({formatPercent(mockPortfolioSummary.allTimeProfitPercent)})
                </span>
              </div>
              <div className="hidden sm:inline text-zinc-700">•</div>
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500">Monthly Divs:</span>
                <span className="font-semibold text-zinc-200 font-mono">
                  {formatCurrency(mockPortfolioSummary.monthlyDividends)}/mo
                </span>
              </div>
              <div className="hidden sm:inline text-zinc-700">•</div>
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500">Liquid Cash:</span>
                <span className="font-semibold text-cyan-300 font-mono">
                  {formatCurrency(mockPortfolioSummary.cashAvailable)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            <Button
              onClick={() => handleAction("Deposit Capital")}
              variant="default"
              size="lg"
              className="flex-1 sm:flex-none"
            >
              <Plus className="w-4 h-4" />
              Deposit
            </Button>
            <Button
              onClick={() => handleAction("Instant Swap")}
              variant="outline"
              size="lg"
              className="flex-1 sm:flex-none border-zinc-700/80 hover:border-zinc-500"
            >
              <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
              Swap
            </Button>
            <Button
              onClick={() => handleAction("AI Auto-Rebalance")}
              variant="outline"
              size="lg"
              className="flex-1 sm:flex-none border-zinc-700/80 hover:border-zinc-500"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Rebalance
            </Button>
            <Button
              onClick={() => handleAction("Tax Statement Download")}
              variant="ghost"
              size="icon"
              className="rounded-xl border border-zinc-800 hover:border-zinc-700 hidden sm:flex"
              title="Export Report"
            >
              <Download className="w-4 h-4 text-zinc-400" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
