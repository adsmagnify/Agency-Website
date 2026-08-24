"use client";

import { useState, useEffect, useRef } from "react";
import {
  Target,
  Search,
  Globe,
  Bot,
  Sparkles,
  Clapperboard,
  ArrowUpRight,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  description: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    subtitle: "Google Ads, Meta Ads & paid media",
    categoryTag: "PAID MEDIA & CONVERSION ARCHITECTURE",
    description:
      "High-intent paid search, social acquisition, and full-funnel conversion architecture engineered for maximum ROAS, scalable customer acquisition, and compounding enterprise growth.",
    link: "#contact",
    icon: Target,
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    subtitle: "Technical, local & content search optimization",
    categoryTag: "TECHNICAL, LOCAL & CONTENT SEARCH OPTIMIZATION",
    description:
      "Search engine optimization for technical health, local search, and content that ranks—compounding organic traffic, high-intent pipeline, and sustainable long-term revenue.",
    link: "#contact",
    icon: Search,
  },
  {
    id: "web-dev",
    title: "Website Development",
    subtitle: "SEO-first frontend development for Shopify & Next.js",
    categoryTag: "MODERN WEB ENGINEERING & E-COMMERCE",
    description:
      "High-converting, lightning-fast Next.js and Shopify storefronts built with SEO-first architecture, buttery-smooth interactive UX, and conversion-optimized checkout funnels.",
    link: "#contact",
    icon: Globe,
  },
  {
    id: "crm-ai",
    title: "CRM Development with AI Integration",
    subtitle: "AI lead scoring, automation & pipeline",
    categoryTag: "AI AUTOMATION & REVENUE PIPELINES",
    description:
      "End-to-end CRM pipelines, automated lead scoring, and intelligent AI agent workflows that turn incoming inquiries into qualified pipeline and closed revenue on autopilot.",
    link: "#contact",
    icon: Bot,
  },
  {
    id: "gen-ai-ugc",
    title: "Generative AI with UGC Ads",
    subtitle: "AI avatars, product ads & hook testing",
    categoryTag: "HIGH-VELOCITY CREATIVE & AVATARS",
    description:
      "High-velocity AI avatar generation, viral creative iterations, and multivariate hook testing to rapidly uncover winning ad angles and scale performance across Meta & TikTok.",
    link: "#contact",
    icon: Sparkles,
  },
  {
    id: "gen-ai-tvc",
    title: "Generative AI with TVC Ads",
    subtitle: "AI video, brand films & TVC cutdowns",
    categoryTag: "CINEMATIC AI VIDEO & TV COMMERCIALS",
    description:
      "Cinema-grade AI video production, 3D brand films, and television commercial cutdowns engineered with Hollywood visual fidelity produced in days, not months.",
    link: "#contact",
    icon: Clapperboard,
  },
];

const ROTATION_INTERVAL = 6000; // 6 seconds per service

export default function ServicesHubTable() {
  const [activeIndex, setActiveIndex] = useState(1); // Default to SEO as shown in reference
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Auto-rotation timer with progress bar
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    const intervalTick = 50;

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / ROTATION_INTERVAL) * 100, 100);
      setProgress(pct);

      if (elapsed >= ROTATION_INTERVAL) {
        setActiveIndex((prev) => (prev + 1) % SERVICES_DATA.length);
        startTimeRef.current = Date.now();
        setProgress(0);
      }
    }, intervalTick);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, isPaused]);

  const handleSelectService = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const activeService = SERVICES_DATA[activeIndex];

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#FAFCFF] border-b border-slate-200/80 overflow-hidden select-none">
      {/* Background Subtle Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-400/10 via-amber-300/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Main Grid: Left Service Tree List & Right Detail Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ========================================================= */}
          {/* LEFT: Tree / Branching Service List (5 Cols on LG)         */}
          {/* ========================================================= */}
          <div
            className="lg:col-span-6 relative flex flex-col gap-3 sm:gap-3.5 pl-6 sm:pl-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Vertical Connector Trunk Line */}
            <div className="absolute left-2 sm:left-3 top-6 bottom-6 w-[2px] bg-slate-200" />

            {SERVICES_DATA.map((service, idx) => {
              const isActive = idx === activeIndex;
              const IconComp = service.icon;

              return (
                <div key={service.id} className="relative flex items-center">
                  {/* Horizontal Branch Connector */}
                  <div
                    className={`absolute -left-4 sm:-left-5 w-4 sm:w-5 h-[2px] transition-colors duration-300 ${
                      isActive ? "bg-[#FFC619]" : "bg-slate-200"
                    }`}
                  />

                  {/* Service Card Pill */}
                  <button
                    type="button"
                    onClick={() => handleSelectService(idx)}
                    className={`group relative w-full text-left flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-300 border cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-amber-500/8 via-white to-blue-500/5 border-[#FFC619]/70 shadow-lg shadow-amber-500/10 translate-x-1 sm:translate-x-1.5"
                        : "bg-white/90 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-2">
                      {/* Icon Circle */}
                      <div
                        className={`shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-[#004AAD] text-white shadow-md shadow-blue-600/30 ring-2 ring-[#FFC619]/60"
                            : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                        }`}
                      >
                        <IconComp className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                      </div>

                      {/* Text Details */}
                      <div className="min-w-0 flex flex-col">
                        <span
                          className={`font-heading text-sm sm:text-base font-bold truncate transition-colors duration-200 ${
                            isActive
                              ? "text-[#0A1A3A]"
                              : "text-[#0A1A3A] group-hover:text-blue-600"
                          }`}
                        >
                          {service.title}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-500 truncate font-normal mt-0.5">
                          {service.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Active Arrow Indicator */}
                    {isActive && (
                      <div className="shrink-0 text-[#004AAD] pl-1 animate-in fade-in zoom-in-75 duration-200">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* RIGHT: Active Service Detail Hub Card (6 Cols on LG)       */}
          {/* ========================================================= */}
          <div
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative rounded-[28px] sm:rounded-[32px] bg-white/95 border border-slate-200/90 shadow-xl shadow-slate-200/50 p-7 sm:p-10 md:p-12 overflow-hidden backdrop-blur-xl flex flex-col justify-between min-h-[420px] sm:min-h-[460px]">
              {/* Soft decorative background tint */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-amber-400/10 via-blue-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* Top Section: Badge & Category */}
              <div>
                {/* Brand Hub Badge */}
                <div className="inline-flex flex-col items-start px-3.5 py-1.5 rounded-xl border border-blue-200/80 bg-white shadow-xs mb-6 sm:mb-8">
                  <span className="font-heading font-black text-sm sm:text-base text-[#0A1A3A] leading-tight tracking-tight">
                    adsmagnify
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600 tracking-wider uppercase">
                    homepage hub
                  </span>
                </div>

                {/* Category Subtitle Pill */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#FFC619] shadow-xs shadow-amber-400" />
                  <span className="font-heading text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#004AAD]">
                    {activeService.categoryTag}
                  </span>
                </div>

                {/* Main Service Title */}
                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A1A3A] leading-[1.15] tracking-tight">
                  {activeService.title}
                </h3>

                {/* Service Description */}
                <p className="text-slate-600 text-sm sm:text-base md:text-[17px] leading-relaxed mt-4 sm:mt-5 font-normal">
                  {activeService.description}
                </p>

                {/* Explore Link CTA */}
                <div className="mt-6 sm:mt-8">
                  <a
                    href={activeService.link}
                    className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#004AAD] hover:text-[#0A1A3A] transition-colors duration-200"
                  >
                    <span>Explore this service</span>
                    <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Bottom Progress Bar & Pagination Indicators */}
              <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-100 flex flex-col gap-4">
                {/* Auto-Rotation Progress Bar */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#004AAD] to-[#FFC619] transition-all duration-75 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center gap-2">
                  {SERVICES_DATA.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectService(idx)}
                      aria-label={`Go to service ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activeIndex
                          ? "w-6 bg-gradient-to-r from-[#004AAD] to-[#FFC619]"
                          : "w-2 bg-slate-200 hover:bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
