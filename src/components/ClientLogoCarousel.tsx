"use client";

import { useState } from "react";

interface ClientBrand {
  name: string;
  category: string;
  metric: string;
  metricLabel: string;
  icon: string;
  accent: string;
}

const CLIENTS_ROW_1: ClientBrand[] = [
  {
    name: "LUMEN LUXURY",
    category: "Haute E-Commerce",
    metric: "+340%",
    metricLabel: "ROAS Scale",
    icon: "◈",
    accent: "#004AAD",
  },
  {
    name: "KAIROS APPAREL",
    category: "High-Growth DTC",
    metric: "4.2X",
    metricLabel: "Blended Return",
    icon: "✦",
    accent: "#FFC619",
  },
  {
    name: "NOVIX HEALTH",
    category: "Bio & Wellness",
    metric: "$2.8M",
    metricLabel: "Scaled Spend",
    icon: "⬡",
    accent: "#004AAD",
  },
  {
    name: "ZENITH B2B",
    category: "Enterprise SaaS",
    metric: "-42%",
    metricLabel: "CAC Reduction",
    icon: "▲",
    accent: "#FFC619",
  },
  {
    name: "AURA COUTURE",
    category: "Global Fashion",
    metric: "5.1X",
    metricLabel: "Peak Month",
    icon: "≈",
    accent: "#004AAD",
  },
  {
    name: "VANGUARD LABS",
    category: "Consumer Tech",
    metric: "+180%",
    metricLabel: "YoY Growth",
    icon: "❖",
    accent: "#FFC619",
  },
];

const CLIENTS_ROW_2: ClientBrand[] = [
  {
    name: "MATRIX SCALE",
    category: "Omnichannel DTC",
    metric: "$14M+",
    metricLabel: "Rev Generated",
    icon: "⦿",
    accent: "#FFC619",
  },
  {
    name: "ELEVATE ACTIVE",
    category: "Performance Fuel",
    metric: "4.6X",
    metricLabel: "Meta ASC+",
    icon: "⚡",
    accent: "#004AAD",
  },
  {
    name: "HYPERION CARE",
    category: "Clean Beauty",
    metric: "+220%",
    metricLabel: "MoM Volume",
    icon: "☘",
    accent: "#FFC619",
  },
  {
    name: "SOLARIS MEDIA",
    category: "Digital Retail",
    metric: "3.9X",
    metricLabel: "Search ROAS",
    icon: "✹",
    accent: "#004AAD",
  },
  {
    name: "ATLAS ORIGIN",
    category: "Lifestyle Brand",
    metric: "+165%",
    metricLabel: "LTV Boost",
    icon: "🛡",
    accent: "#FFC619",
  },
  {
    name: "CHRONOS ATELIER",
    category: "Luxury Horlogerie",
    metric: "5.4X",
    metricLabel: "Blended ROAS",
    icon: "◎",
    accent: "#004AAD",
  },
];

export default function ClientLogoCarousel() {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  // Duplicate arrays for seamless infinite marquee loop
  const row1Items = [...CLIENTS_ROW_1, ...CLIENTS_ROW_1, ...CLIENTS_ROW_1];
  const row2Items = [...CLIENTS_ROW_2, ...CLIENTS_ROW_2, ...CLIENTS_ROW_2];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 select-none marquee-pause-hover flex flex-col justify-center gap-3 sm:gap-4 overflow-hidden">
      
      {/* Top Header Badge */}
      <div className="flex items-center justify-center gap-2 mb-0.5">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/90 px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600 shadow-xs backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#004AAD] animate-ping" />
          <span className="text-[#004AAD] font-extrabold">120+ Growth Brands Scaled</span>
          <span className="text-slate-300">•</span>
          <span>Series A to 8-Figure Market Leaders</span>
        </div>
      </div>

      {/* Side Gradient Feather Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 sm:w-28 md:w-36 bg-gradient-to-r from-white via-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 sm:w-28 md:w-36 bg-gradient-to-l from-white via-white/80 to-transparent" />

      {/* Track 1: Drifts Left */}
      <div className="relative w-full overflow-hidden py-1">
        <div className="marquee-row-left gap-3 sm:gap-4">
          {row1Items.map((brand, idx) => {
            const isHovered = activeHover === `${brand.name}-${idx}`;
            return (
              <div
                key={`${brand.name}-${idx}`}
                onMouseEnter={() => setActiveHover(`${brand.name}-${idx}`)}
                onMouseLeave={() => setActiveHover(null)}
                className={`group flex items-center gap-3 rounded-2xl border transition-all duration-300 px-4 py-2.5 sm:px-5 sm:py-3 cursor-default ${
                  isHovered
                    ? "border-[#004AAD]/50 bg-white shadow-xl shadow-[#004AAD]/10 scale-[1.03]"
                    : "border-slate-200/80 bg-slate-50/75 hover:bg-white hover:border-slate-300 shadow-xs"
                }`}
              >
                {/* Brand Monogram Icon */}
                <div
                  className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl font-heading text-sm font-black transition-transform duration-300 group-hover:scale-110 shadow-xs"
                  style={{
                    backgroundColor: `${brand.accent}12`,
                    color: brand.accent,
                    border: `1px solid ${brand.accent}28`,
                  }}
                >
                  {brand.icon}
                </div>

                {/* Brand Info */}
                <div className="flex flex-col">
                  <span className="font-heading whitespace-nowrap text-xs sm:text-sm font-black tracking-wider text-[#0A1A3A] transition-colors duration-300 group-hover:text-[#004AAD]">
                    {brand.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 whitespace-nowrap">
                    {brand.category}
                  </span>
                </div>

                {/* Verified Metric Tag */}
                <div className="ml-1 sm:ml-2 flex flex-col items-end rounded-lg bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 sm:py-1">
                  <span className="font-heading text-[10px] sm:text-xs font-black text-[#0A1A3A] leading-tight">
                    {brand.metric}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-tight text-amber-700 leading-none">
                    {brand.metricLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Track 2: Drifts Right (Counter-Scrolling) */}
      <div className="relative w-full overflow-hidden py-1">
        <div className="marquee-row-right gap-3 sm:gap-4">
          {row2Items.map((brand, idx) => {
            const isHovered = activeHover === `${brand.name}-row2-${idx}`;
            return (
              <div
                key={`${brand.name}-row2-${idx}`}
                onMouseEnter={() => setActiveHover(`${brand.name}-row2-${idx}`)}
                onMouseLeave={() => setActiveHover(null)}
                className={`group flex items-center gap-3 rounded-2xl border transition-all duration-300 px-4 py-2.5 sm:px-5 sm:py-3 cursor-default ${
                  isHovered
                    ? "border-[#004AAD]/50 bg-white shadow-xl shadow-[#004AAD]/10 scale-[1.03]"
                    : "border-slate-200/80 bg-slate-50/75 hover:bg-white hover:border-slate-300 shadow-xs"
                }`}
              >
                {/* Brand Monogram Icon */}
                <div
                  className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl font-heading text-sm font-black transition-transform duration-300 group-hover:scale-110 shadow-xs"
                  style={{
                    backgroundColor: `${brand.accent}12`,
                    color: brand.accent,
                    border: `1px solid ${brand.accent}28`,
                  }}
                >
                  {brand.icon}
                </div>

                {/* Brand Info */}
                <div className="flex flex-col">
                  <span className="font-heading whitespace-nowrap text-xs sm:text-sm font-black tracking-wider text-[#0A1A3A] transition-colors duration-300 group-hover:text-[#004AAD]">
                    {brand.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 whitespace-nowrap">
                    {brand.category}
                  </span>
                </div>

                {/* Verified Metric Tag */}
                <div className="ml-1 sm:ml-2 flex flex-col items-end rounded-lg bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 sm:py-1">
                  <span className="font-heading text-[10px] sm:text-xs font-black text-[#004AAD] leading-tight">
                    {brand.metric}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-tight text-blue-700 leading-none">
                    {brand.metricLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Subtle Trust Proof Strip */}
      <div className="mt-0.5 flex items-center justify-center gap-4 sm:gap-8 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <span>✦ Meta ASC+ Certified</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">✦ Google Premier Partner</span>
        <span>•</span>
        <span>✦ $40M+ Managed Spend</span>
      </div>

    </div>
  );
}
