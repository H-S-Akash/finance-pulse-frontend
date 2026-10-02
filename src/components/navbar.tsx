"use client";

import React, { useState } from "react";
import {
  Activity,
  Bell,
  Search,
  SlidersHorizontal,
  Wallet,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: "Overview", href: "#overview", active: true },
    { name: "Performance", href: "#performance" },
    { name: "Allocations", href: "#allocations" },
    { name: "Risk Radar", href: "#risk" },
    { name: "Holdings", href: "#holdings" },
    { name: "Activity", href: "#activity" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#08090d]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-emerald-500/20 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400/60 transition-all duration-300">
                <Activity className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#08090d] animate-pulse-dot" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                    Finance<span className="text-cyan-400">Pulse</span>
                  </span>
                  <Badge variant="cyan" className="text-[10px] py-0 px-1.5 hidden sm:inline-flex">
                    PRO
                  </Badge>
                </div>
                <span className="text-[10px] text-zinc-400 -mt-0.5 font-mono">
                  Wealth Intelligence
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/60 rounded-full px-3 py-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  link.active
                    ? "text-cyan-300 bg-cyan-500/10 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assets, tickers, transactions..."
                className="w-full h-8 pl-9 pr-14 text-xs bg-zinc-900/80 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-sans"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-4 select-none items-center gap-0.5 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[9px] font-medium text-zinc-400">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right Action Stack */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Indicator */}
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>MARKETS OPEN</span>
            </div>

            {/* Notification Center */}
            <button
              type="button"
              className="relative p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 border border-zinc-800/50 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
            </button>

            {/* User Wallet / Account Pill */}
            <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800/90 hover:border-zinc-700 transition-colors cursor-pointer">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center text-zinc-950 font-bold text-xs shadow-inner">
                VP
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-semibold text-zinc-200 leading-tight">
                  Portfolio #1
                </span>
                <span className="text-[10px] text-emerald-400 font-mono leading-tight">
                  Connected
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-zinc-500" />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 border border-zinc-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#0a0c12] px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search assets, tickers..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-xs font-medium rounded-lg text-center ${
                  link.active
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "bg-zinc-900/60 text-zinc-300 border border-zinc-800/60 hover:bg-zinc-800"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              Live Streaming feed
            </span>
            <span className="text-cyan-400 font-mono">18ms Latency</span>
          </div>
        </div>
      )}
    </header>
  );
}
