"use client";

import { Activity, ShieldCheck, Lock, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-[#06070a] mt-16 pt-12 pb-8 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-800/60">
          {/* Brand & mission */}
          <div className="space-y-2 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                Finance<span className="text-cyan-400">Pulse</span>
              </span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Institutional-grade wealth intelligence, real-time risk modeling, and automated portfolio rebalancing for modern retail investors.
            </p>
          </div>

          {/* Quick link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="font-semibold text-zinc-200 text-xs">Platform</div>
              <ul className="space-y-1.5 text-zinc-400 text-xs">
                <li><a href="#overview" className="hover:text-cyan-400 transition-colors">Overview</a></li>
                <li><a href="#performance" className="hover:text-cyan-400 transition-colors">Performance</a></li>
                <li><a href="#features" className="hover:text-cyan-400 transition-colors">Risk Radar</a></li>
                <li><a href="#holdings" className="hover:text-cyan-400 transition-colors">Holdings</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-semibold text-zinc-200 text-xs">Security & Trust</div>
              <ul className="space-y-1.5 text-zinc-400 text-xs">
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SOC-2 Type II</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>256-bit AES</span>
                </li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Cold Custody</a></li>
              </ul>
            </div>

            <div className="space-y-2 hidden sm:block">
              <div className="font-semibold text-zinc-200 text-xs">System Telemetry</div>
              <div className="space-y-1.5 text-zinc-400 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Feed: Operational</span>
                </div>
                <div className="text-zinc-500">Latency: 18ms</div>
                <div className="text-zinc-500">Node: us-east-1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright */}
        <div className="space-y-3 pt-2 text-[11px] text-zinc-500 leading-relaxed">
          <p>
            Disclaimer: FinancePulse is a simulated wealth intelligence dashboard and analytical management suite. Information presented is for computational, portfolio tracking, and demonstrative purposes only and does not constitute financial, investment, legal, or tax advice. Past returns do not guarantee future yields.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 pt-2">
            <span>© 2026 FinancePulse Intelligence Inc. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-zinc-300 transition-colors">API Docs</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
