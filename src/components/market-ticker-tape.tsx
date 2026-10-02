"use client";

import React from "react";
import { mockMarketTickers } from "@/data/mock-portfolio";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export function MarketTickerTape() {
  // Duplicate tickers to ensure an uninterrupted, seamless infinite marquee loop
  const duplicatedTickers = [...mockMarketTickers, ...mockMarketTickers];

  return (
    <div className="w-full bg-[#0a0c12] border-b border-zinc-800/80 overflow-hidden py-2 select-none">
      <div className="relative flex items-center">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[#0a0c12] to-transparent pointer-events-none" />
        
        {/* Infinite scrolling track */}
        <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
          {duplicatedTickers.map((ticker, index) => {
            const isPos = ticker.isPositive;
            return (
              <div
                key={`${ticker.symbol}-${index}`}
                className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-md bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700 transition-colors"
              >
                <span className="font-semibold text-zinc-300">{ticker.symbol}</span>
                <span className="text-zinc-400 font-mono">
                  {ticker.symbol === "US10Y" ? `${ticker.price}%` : formatCurrency(ticker.price)}
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 font-mono font-medium ${
                    isPos ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {isPos ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {formatPercent(ticker.changePercent)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[#0a0c12] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
