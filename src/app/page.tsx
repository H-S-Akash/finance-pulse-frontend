import React from "react";
import { MarketTickerTape } from "@/components/market-ticker-tape";
import { Navbar } from "@/components/navbar";
import { HeroMetric } from "@/components/hero-metric";
import { FeatureGrid } from "@/components/feature-grid";
import { PerformanceChart } from "@/components/performance-chart";
import { AllocationCard } from "@/components/allocation-card";
import { HoldingsTable } from "@/components/holdings-table";
import { RecentTransactions } from "@/components/recent-transactions";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08090d] text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Streaming Market Indices Banner */}
      <MarketTickerTape />

      {/* Primary Sticky Header */}
      <Navbar />

      {/* Main Dashboard Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Hero Section: Net Worth, 24h PnL, Quick Action Bar */}
        <HeroMetric />

        {/* Core Requirement #1: 3-Column Feature Grid */}
        <FeatureGrid />

        {/* Interactive Analytics & Composition Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 flex flex-col">
            <PerformanceChart />
          </div>
          <div className="lg:col-span-4 flex flex-col">
            <AllocationCard />
          </div>
        </section>

        {/* Detailed Holdings Table */}
        <HoldingsTable />

        {/* Audit Log / Recent Activity */}
        <RecentTransactions />
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
