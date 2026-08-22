"use client";

import { useState } from "react";

export default function MagicCarouselPeek() {
  const [activeTab, setActiveTab] = useState<string>("All Types");

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Side Fade Feather Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 sm:w-24 bg-gradient-to-r from-[#FAF9F6] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 sm:w-24 bg-gradient-to-l from-[#FAF9F6] to-transparent" />

      {/* Cards Row Peeking from the bottom */}
      <div className="flex items-end justify-center gap-4 sm:gap-6 px-4 sm:px-8 translate-y-6 sm:translate-y-8 hover:translate-y-2 transition-transform duration-500">
        
        {/* Card 1: Lavender & Violet Ambient Blur Card */}
        <div className="shrink-0 w-44 sm:w-56 md:w-64 h-48 sm:h-60 rounded-t-3xl bg-gradient-to-br from-violet-200 via-purple-300 to-indigo-400 p-4 shadow-xl border border-white/60 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-3 cursor-pointer">
          <div className="flex items-center justify-between text-white/90">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-black/10 px-2 py-0.5 rounded-full backdrop-blur-md">
              Spell #01
            </span>
            <span className="text-xs">✦</span>
          </div>
          <div className="mt-auto">
            <h5 className="font-heading text-sm sm:text-base font-black text-white leading-tight">
              Micro-Interactions
            </h5>
            <p className="text-[9px] sm:text-[10px] text-white/80 font-medium mt-0.5">
              Tactile hover & drag feedback
            </p>
          </div>
        </div>

        {/* Card 2: Sunset Gold & Peach Warm Gradient Card */}
        <div className="shrink-0 w-44 sm:w-56 md:w-64 h-48 sm:h-60 rounded-t-3xl bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300 p-4 shadow-xl border border-white/60 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-3 cursor-pointer">
          <div className="flex items-center justify-between text-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/40 px-2 py-0.5 rounded-full backdrop-blur-md">
              Spell #02
            </span>
            <span className="text-xs">✨</span>
          </div>
          <div className="mt-auto">
            <h5 className="font-heading text-sm sm:text-base font-black text-slate-900 leading-tight">
              Conversion Hooks
            </h5>
            <p className="text-[9px] sm:text-[10px] text-slate-700 font-medium mt-0.5">
              Psychological pricing cues
            </p>
          </div>
        </div>

        {/* Card 3: Sky Azure & Electric Blue Glass Card */}
        <div className="shrink-0 w-44 sm:w-56 md:w-64 h-48 sm:h-60 rounded-t-3xl bg-gradient-to-br from-sky-200 via-blue-300 to-indigo-400 p-4 shadow-xl border border-white/60 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-3 cursor-pointer">
          <div className="flex items-center justify-between text-white/90">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-black/10 px-2 py-0.5 rounded-full backdrop-blur-md">
              Spell #03
            </span>
            <span className="text-xs">⚡</span>
          </div>
          <div className="mt-auto">
            <h5 className="font-heading text-sm sm:text-base font-black text-white leading-tight">
              Fluid Animation
            </h5>
            <p className="text-[9px] sm:text-[10px] text-white/80 font-medium mt-0.5">
              Spring-physics transitions
            </p>
          </div>
        </div>

        {/* Card 4 (Centerpiece): Interactive UI Modal Widget (From Screenshot) */}
        <div className="shrink-0 w-64 sm:w-76 md:w-84 h-56 sm:h-68 rounded-t-3xl bg-white p-4 sm:p-5 shadow-2xl border border-slate-200/80 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-3 cursor-pointer">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Type of Place
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Place Filter Selector */}
          <div className="grid grid-cols-3 gap-1.5 my-2">
            {["All types", "Rooms", "Homes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-1.5 px-2 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all text-center ${
                  activeTab === tab
                    ? "bg-[#18181B] text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Price Range Histogram Graph */}
          <div className="space-y-1 my-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
              Price Range Histogram
            </span>
            <div className="flex items-end justify-between gap-1 h-12 pt-2 px-1">
              {[20, 35, 60, 45, 90, 100, 80, 50, 75, 40, 65, 30, 20].map((val, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t-xs transition-all ${
                    i >= 4 && i <= 8 ? "bg-[#18181B]" : "bg-slate-200"
                  }`}
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[8px] sm:text-[9px] font-bold text-slate-500">
            <span>$1,200 avg</span>
            <span className="text-purple-600 font-black">Applied Filter ↗</span>
          </div>
        </div>

        {/* Card 5: Mint Emerald & Lime Frosted Gradient Card */}
        <div className="shrink-0 w-44 sm:w-56 md:w-64 h-48 sm:h-60 rounded-t-3xl bg-gradient-to-br from-emerald-100 via-teal-200 to-lime-300 p-4 shadow-xl border border-white/60 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-3 cursor-pointer">
          <div className="flex items-center justify-between text-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/40 px-2 py-0.5 rounded-full backdrop-blur-md">
              Spell #04
            </span>
            <span className="text-xs">🍀</span>
          </div>
          <div className="mt-auto">
            <h5 className="font-heading text-sm sm:text-base font-black text-slate-900 leading-tight">
              ROAS Accelerators
            </h5>
            <p className="text-[9px] sm:text-[10px] text-slate-700 font-medium mt-0.5">
              Attribution & CAPI loops
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
