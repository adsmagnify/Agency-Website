"use client";

import { useState } from "react";
import {
  TrendingUp,
  Search,
  Globe,
  Bot,
  Sparkles,
  Clapperboard,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  Sliders,
  Cpu,
  Layers,
} from "lucide-react";

export default function ServicesBentoGrid() {
  const [activeHookTab, setActiveHookTab] = useState<"a" | "b">("b");

  return (
    <section
      id="services"
      className="relative w-full py-20 sm:py-28 bg-[#FAFCFF] border-b border-slate-200/80 overflow-hidden select-none"
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient background soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-400/8 via-amber-300/8 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 flex flex-col items-center">
          <div className="mb-3.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-200 bg-white/90 shadow-xs text-xs font-bold uppercase tracking-[0.22em] text-[#004AAD]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#004AAD] animate-pulse" />
            <span>CORE GROWTH CAPABILITIES</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1A3A] leading-[1.12] tracking-tight">
            Every Growth Channel.{" "}
            <span className="text-[#004AAD]">Working as One.</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mt-4 font-normal max-w-2xl">
            A unified growth engine seamlessly connecting paid acquisition, organic visibility, rapid AI creative iteration, and automated sales pipelines.
          </p>
        </div>

        {/* 6-Card Interactive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {/* ========================================================= */}
          {/* CARD 1: PERFORMANCE MARKETING (Featured Wide or Standard) */}
          {/* ========================================================= */}
          <div className="group relative rounded-[28px] bg-white/95 border border-slate-200/90 hover:border-blue-300/80 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 flex flex-col justify-between overflow-hidden">
            {/* Top Tag & Icon */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#004AAD] flex items-center justify-center border border-blue-100/80 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-50/80 text-blue-700 border border-blue-100">
                  Paid Acquisition
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0A1A3A] group-hover:text-[#004AAD] transition-colors">
                Performance Marketing
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                High-intent search, social acquisition, and full-funnel conversion architecture engineered for compounding ROAS.
              </p>

              {/* Live Interactive Mockup: Sparkline & Metrics */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Average ROAS
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <Zap className="w-3 h-3" /> +348%
                  </span>
                </div>

                {/* Animated Mini Bar Chart */}
                <div className="flex items-end gap-1.5 h-12 pt-2">
                  {[35, 52, 44, 68, 85, 76, 96].map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-[#004AAD] to-[#36A2FA] rounded-t-sm transition-all duration-500 group-hover:brightness-110"
                      style={{ height: `${val}%` }}
                    />
                  ))}
                </div>

                {/* Channels Badge */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[10px] font-semibold text-slate-500">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">Google Ads</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">Meta</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">TikTok</span>
                </div>
              </div>
            </div>

            {/* Bottom Link */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-[#004AAD]">
              <span>Explore Channel</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 2: SEARCH ENGINE OPTIMIZATION (SEO)                  */}
          {/* ========================================================= */}
          <div className="group relative rounded-[28px] bg-white/95 border border-slate-200/90 hover:border-amber-300/80 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/5 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/80 group-hover:scale-105 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-50/80 text-amber-700 border border-amber-100">
                  Organic Authority
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0A1A3A] group-hover:text-amber-600 transition-colors">
                Search Engine Optimization
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                Technical health, programmatic content architecture, and authority building that captures high-intent search.
              </p>

              {/* Live Interactive Mockup: Keyword SERP Preview */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>Keyword Position</span>
                  <span className="text-blue-600 font-bold">Top 3 Rankings</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs font-medium text-[#0A1A3A]">
                    <span className="truncate pr-2">Growth Marketing Agency</span>
                    <span className="shrink-0 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">#1</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs font-medium text-[#0A1A3A]">
                    <span className="truncate pr-2">Enterprise Performance Ads</span>
                    <span className="shrink-0 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">#2</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span>Traffic Growth</span>
                  <span className="font-bold text-emerald-600">+420% Organic</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-amber-600">
              <span>Explore Channel</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 3: WEBSITE DEVELOPMENT                               */}
          {/* ========================================================= */}
          <div className="group relative rounded-[28px] bg-white/95 border border-slate-200/90 hover:border-cyan-300/80 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/5 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100/80 group-hover:scale-105 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-cyan-50/80 text-cyan-700 border border-cyan-100">
                  Web & Shopify
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0A1A3A] group-hover:text-cyan-600 transition-colors">
                Website Development
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                Lightning-fast Next.js and Shopify storefronts with SEO-first architecture and buttery-smooth interactive UX.
              </p>

              {/* Live Interactive Mockup: Lighthouse 100 Badges */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>Lighthouse Core Web Vitals</span>
                  <span className="text-emerald-600 font-bold">0.4s Load</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="block text-emerald-600 font-black text-base">100</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase">Perf</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="block text-emerald-600 font-black text-base">100</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase">SEO</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="block text-emerald-600 font-black text-base">100</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase">UX</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Next.js 15+</span>
                  <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Shopify Hydrogen</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-cyan-600">
              <span>Explore Channel</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 4: CRM DEVELOPMENT WITH AI INTEGRATION               */}
          {/* ========================================================= */}
          <div className="group relative rounded-[28px] bg-white/95 border border-slate-200/90 hover:border-indigo-300/80 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/5 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/80 group-hover:scale-105 transition-transform">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-indigo-50/80 text-indigo-700 border border-indigo-100">
                  AI Automation
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0A1A3A] group-hover:text-indigo-600 transition-colors">
                CRM & AI Automation
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                Intelligent pipeline enrichment, automated lead scoring, and AI agent workflows that close deals on autopilot.
              </p>

              {/* Live Interactive Mockup: Pipeline Flow */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>AI Pipeline Router</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-indigo-600 font-bold">
                    <Cpu className="w-3 h-3 animate-spin" /> Active
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-medium">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-700">Inbound Lead Arrived</span>
                    <span className="text-slate-400 text-[10px]">Just now</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-indigo-50/60 border border-indigo-200 text-indigo-900 font-bold">
                    <span>AI Score: 98/100 (Hot)</span>
                    <span className="text-emerald-600 text-[10px]">Auto-Routed</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span>Conversion Velocity</span>
                  <span className="font-bold text-indigo-600">3.2x Faster Close</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-indigo-600">
              <span>Explore Channel</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 5: GENERATIVE AI WITH UGC ADS                        */}
          {/* ========================================================= */}
          <div className="group relative rounded-[28px] bg-white/95 border border-slate-200/90 hover:border-pink-300/80 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-pink-900/5 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-100/80 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-pink-50/80 text-pink-700 border border-pink-100">
                  Creative Velocity
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0A1A3A] group-hover:text-pink-600 transition-colors">
                Generative AI with UGC Ads
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                High-velocity AI avatar generation, viral creative iterations, and multivariate hook testing at scale.
              </p>

              {/* Live Interactive Mockup: Multivariate Hook Tester */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>Multivariate Hook Tester</span>
                  <span className="text-pink-600 font-bold">50+ Iterations/Wk</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveHookTab("a")}
                    className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                      activeHookTab === "a"
                        ? "bg-pink-50 border-pink-300 text-pink-900 font-bold shadow-xs"
                        : "bg-white border-slate-200 text-slate-600"
                    }`}
                  >
                    <span className="block text-[10px] text-slate-400">Variant A</span>
                    <span className="text-xs">CTR: 4.8%</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveHookTab("b")}
                    className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                      activeHookTab === "b"
                        ? "bg-pink-50 border-pink-300 text-pink-900 font-bold shadow-xs"
                        : "bg-white border-slate-200 text-slate-600"
                    }`}
                  >
                    <span className="block text-[10px] text-pink-500 font-bold">Winner B ✨</span>
                    <span className="text-xs text-emerald-600 font-bold">CTR: 8.9%</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span>Ad Creative Fatigue</span>
                  <span className="font-bold text-emerald-600">Zero Burnout</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-pink-600">
              <span>Explore Channel</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 6: GENERATIVE AI WITH TVC ADS                        */}
          {/* ========================================================= */}
          <div className="group relative rounded-[28px] bg-white/95 border border-slate-200/90 hover:border-violet-300/80 p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-violet-900/5 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100/80 group-hover:scale-105 transition-transform">
                  <Clapperboard className="w-5 h-5" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-violet-50/80 text-violet-700 border border-violet-100">
                  Cinema & TVC
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0A1A3A] group-hover:text-violet-600 transition-colors">
                Generative AI with TVC Ads
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                Cinema-grade AI video production, 3D brand films, and television commercial cutdowns produced in days.
              </p>

              {/* Live Interactive Mockup: Cinema Specs */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>Production Pipeline</span>
                  <span className="text-violet-600 font-bold">4K UHD Cinema</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
                    <span>Multi-Format Master</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-violet-100 text-violet-700 text-[10px] font-bold">16:9 / 9:16</span>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span>Turnaround Time</span>
                  <span className="font-bold text-violet-600">72 Hours Production</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-violet-600">
              <span>Explore Channel</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
