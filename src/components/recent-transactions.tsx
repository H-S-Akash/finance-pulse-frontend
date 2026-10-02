"use client";

import React from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Zap,
  Coins,
  ArrowRightLeft,
  Clock,
  CheckCircle2,
  ExternalLink,
  History,
} from "lucide-react";
import { mockRecentTransactions } from "@/data/mock-portfolio";
import { Transaction } from "@/types/portfolio";
import { formatCurrency } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export function RecentTransactions() {
  const getIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "BUY":
        return <ArrowDownLeft className="w-4 h-4 text-emerald-400" />;
      case "SELL":
        return <ArrowUpRight className="w-4 h-4 text-rose-400" />;
      case "STAKING_REWARD":
        return <Zap className="w-4 h-4 text-indigo-400" />;
      case "DIVIDEND":
        return <Coins className="w-4 h-4 text-amber-400" />;
      case "TRANSFER":
        return <ArrowRightLeft className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getBadgeVariant = (type: Transaction["type"]) => {
    switch (type) {
      case "BUY":
        return "success";
      case "SELL":
        return "danger";
      case "STAKING_REWARD":
        return "purple";
      case "DIVIDEND":
        return "warning";
      case "TRANSFER":
        return "cyan";
      default:
        return "outline";
    }
  };

  return (
    <Card id="activity" className="border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-800/60">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            Audit Ledger & Recent Activity
          </CardTitle>
          <CardDescription className="mt-0.5">
            Immutable settlement log for trades, dividends, and yields
          </CardDescription>
        </div>
        <Badge variant="outline" className="font-mono text-xs hidden sm:inline-flex">
          5 Cleared Transactions
        </Badge>
      </CardHeader>

      <CardContent className="pt-4 space-y-3">
        {mockRecentTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/60 hover:border-zinc-700/80 transition-all hover:bg-zinc-850/60 group"
          >
            {/* Left: Icon & Description */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center shrink-0">
                {getIcon(tx.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-100 group-hover:text-cyan-300 transition-colors text-xs sm:text-sm">
                    {tx.assetName}
                  </span>
                  <Badge variant={getBadgeVariant(tx.type)} className="text-[10px] py-0 px-1.5">
                    {tx.type.replace("_", " ")}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono mt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {tx.date}
                  </span>
                  <span>•</span>
                  <span className="text-zinc-400">{tx.txHash}</span>
                </div>
              </div>
            </div>

            {/* Right: Amount & Status */}
            <div className="text-right">
              <div className="font-mono font-bold text-zinc-100 text-xs sm:text-sm">
                {tx.type === "SELL" ? "-" : "+"}
                {formatCurrency(tx.total)}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono flex items-center justify-end gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
                <span className="text-emerald-400">{tx.status}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
