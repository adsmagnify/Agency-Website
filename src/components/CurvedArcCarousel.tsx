"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function CurvedArcCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      
      gsap.to(track, {
        rotationY: nx * 14,
        x: -nx * 40,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    const handlePointerLeave = () => {
      gsap.to(track, {
        rotationY: 0,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto overflow-hidden px-2 sm:px-4 py-4 flex flex-col items-center select-none"
      style={{ perspective: "1400px" }}
    >
      {/* 3D Curved Cylindrical Track */}
      <div
        ref={trackRef}
        className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 py-2 transition-transform will-change-transform"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* CARD 1 (Far Left): Vertical Bar Chart */}
        <div
          className="shrink-0 w-28 sm:w-36 md:w-44 h-40 sm:h-52 md:h-60 rounded-2xl bg-white p-3 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.15)] flex flex-col justify-between border border-white/80 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
          style={{
            transform: "rotateY(22deg) translateZ(-40px)",
          }}
        >
          <div>
            <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Intelligence in
            </span>
            <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 leading-tight">
              Every Decision
            </h4>
          </div>

          <div className="flex items-end justify-between gap-1.5 h-20 sm:h-28 pt-2">
            <div className="w-1/4 h-[40%] bg-emerald-400/30 rounded-t-sm" />
            <div className="w-1/4 h-[65%] bg-blue-400/40 rounded-t-sm" />
            <div className="w-1/4 h-[90%] bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-sm shadow-sm" />
            <div className="w-1/4 h-[75%] bg-blue-500/50 rounded-t-sm" />
          </div>
        </div>

        {/* CARD 2 (Left 2): Revenue & Expense KPI */}
        <div
          className="shrink-0 w-32 sm:w-40 md:w-48 h-44 sm:h-56 md:h-64 rounded-2xl bg-white p-3.5 sm:p-5 shadow-[0_20px_40px_rgba(0,0,0,0.18)] flex flex-col justify-between border border-white/90 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
          style={{
            transform: "rotateY(14deg) translateZ(-15px)",
          }}
        >
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-[14px] sm:text-lg md:text-xl font-black text-slate-900">
                $4,900
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                +24.8%
              </span>
            </div>
            <span className="text-[8px] sm:text-[10px] font-medium text-slate-400">
              Active Ad Scale
            </span>
          </div>

          <div className="space-y-2 my-auto">
            <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-semibold text-slate-600">
              <span>Meta ASC+</span>
              <span className="text-slate-900 font-bold">$3,240</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full w-[75%]" />
            </div>

            <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-semibold text-slate-600">
              <span>Google Search</span>
              <span className="text-slate-900 font-bold">$1,280</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-[45%]" />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[8px] sm:text-[9px] font-bold text-slate-400">
            <span>DAILY PROFIT</span>
            <span className="text-emerald-600 font-black">+4.8X ROAS</span>
          </div>
        </div>

        {/* CARD 3 (Left 1): Partner Portrait + Revenue Badge */}
        <div
          className="shrink-0 w-36 sm:w-44 md:w-52 h-48 sm:h-60 md:h-70 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 p-3 sm:p-4 shadow-[0_25px_50px_rgba(0,0,0,0.22)] flex flex-col justify-between text-white relative overflow-hidden border border-white/20 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
          style={{
            transform: "rotateY(6deg) translateZ(10px)",
          }}
        >
          <div className="flex items-center justify-between z-10">
            <span className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-md">
              Growth Partner
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
          </div>

          {/* Portrait Image / Monogram */}
          <div className="my-auto flex flex-col items-center justify-center z-10 py-2">
            <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-white/20 p-1 border border-white/40 shadow-inner flex items-center justify-center overflow-hidden">
              <img
                src="/final_monitor.png"
                alt="Partner"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Bottom Floating Stats Pill */}
          <div className="z-10 bg-white rounded-xl p-2 sm:p-2.5 text-slate-900 flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[7px] sm:text-[9px] font-bold text-slate-400 uppercase block">
                Scaled Rev
              </span>
              <span className="text-[10px] sm:text-xs font-black text-slate-900">
                $2,670
              </span>
            </div>
            <div className="border-l border-slate-200 pl-2">
              <span className="text-[7px] sm:text-[9px] font-bold text-slate-400 uppercase block">
                Net EBITDA
              </span>
              <span className="text-[10px] sm:text-xs font-black text-emerald-600">
                +$1,200
              </span>
            </div>
          </div>
        </div>

        {/* CARD 4 (Center): Decision Intelligence Wave Chart (Hero Centerpiece) */}
        <div
          className="shrink-0 w-40 sm:w-48 md:w-56 h-52 sm:h-64 md:h-74 rounded-2xl bg-white p-4 sm:p-5 shadow-[0_30px_60px_rgba(0,0,0,0.25)] flex flex-col justify-between border-2 border-white relative z-20 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
          style={{
            transform: "rotateY(0deg) translateZ(30px)",
          }}
        >
          <div>
            <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Intelligence in
            </span>
            <h4 className="text-xs sm:text-sm md:text-base font-black text-slate-900 leading-tight">
              Every Decision
            </h4>
          </div>

          {/* Smooth Rising Wave Curve */}
          <div className="my-auto w-full py-2">
            <svg viewBox="0 0 100 45" className="w-full h-20 sm:h-28 overflow-visible">
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0077E6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0077E6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,35 Q 25,32 45,22 T 85,8 T 100,4 L 100,45 L 0,45 Z"
                fill="url(#waveGrad)"
              />
              <path
                d="M 0,35 Q 25,32 45,22 T 85,8 T 100,4"
                fill="none"
                stroke="#0077E6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="85" cy="8" r="3.5" fill="#FFC619" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[8px] sm:text-[10px] font-bold text-slate-600">
                Active Optimization
              </span>
            </div>
            <span className="text-[9px] sm:text-[11px] font-black text-blue-600">
              99.4%
            </span>
          </div>
        </div>

        {/* CARD 5 (Right 1): Dark Luxury Expertise Card */}
        <div
          className="shrink-0 w-36 sm:w-44 md:w-52 h-48 sm:h-60 md:h-70 rounded-2xl bg-[#090E17] p-3.5 sm:p-5 shadow-[0_25px_50px_rgba(0,0,0,0.22)] flex flex-col justify-between text-white border border-white/10 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
          style={{
            transform: "rotateY(-6deg) translateZ(10px)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-black text-[#FFC619]">
              ✦
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-white/40">
              EST. 2026
            </span>
          </div>

          <div className="my-auto py-2">
            <h4 className="text-xs sm:text-sm md:text-base font-black leading-snug tracking-tight text-white">
              Expertise <span className="text-[#FFC619]">✦</span> that Combines Strategy, Data, and AI.
            </h4>
            <p className="mt-2 text-[8px] sm:text-[10px] text-white/60 font-light leading-relaxed">
              Full-stack media buying and high-velocity UGC creative engine.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <span className="inline-block h-5 w-5 rounded-full bg-blue-500 border border-black" />
              <span className="inline-block h-5 w-5 rounded-full bg-amber-400 border border-black" />
              <span className="inline-block h-5 w-5 rounded-full bg-emerald-400 border border-black" />
            </div>
            <span className="text-[8px] sm:text-[9px] font-bold text-white/60">
              Senior Pod
            </span>
          </div>
        </div>

        {/* CARD 6 (Right 2): Cyan Data Training Card */}
        <div
          className="shrink-0 w-32 sm:w-40 md:w-48 h-44 sm:h-56 md:h-64 rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 p-3.5 sm:p-5 shadow-[0_20px_40px_rgba(0,0,0,0.18)] flex flex-col justify-between text-white border border-white/30 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
          style={{
            transform: "rotateY(-14deg) translateZ(-15px)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-black text-white">
              +
            </div>
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full">
              Engine
            </span>
          </div>

          <div className="my-auto py-2">
            <h4 className="text-xs sm:text-sm md:text-base font-black text-white leading-tight">
              Data training
            </h4>
            <p className="mt-1 text-[8px] sm:text-[10px] text-white/80 font-medium">
              Tailored for your scale
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-xl p-2 text-center border border-white/20">
            <span className="text-[10px] sm:text-xs font-black text-white block">
              120+ Models
            </span>
            <span className="text-[7px] sm:text-[8px] text-white/70 font-semibold uppercase">
              Omnichannel Ready
            </span>
          </div>
        </div>

        {/* CARD 7 (Far Right): 520k+ Data Points KPI Card */}
        <div
          className="shrink-0 w-28 sm:w-36 md:w-44 h-40 sm:h-52 md:h-60 rounded-2xl bg-white p-3 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.15)] flex flex-col justify-between border border-white/80 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
          style={{
            transform: "rotateY(-22deg) translateZ(-40px)",
          }}
        >
          <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase">
            <span>Scale</span>
            <span>Monthly</span>
          </div>

          <div className="my-auto">
            <span className="text-base sm:text-xl md:text-2xl font-black text-slate-900 block leading-tight">
              520k+
            </span>
            <span className="text-[8px] sm:text-[9px] font-semibold text-slate-500 leading-tight block mt-1">
              Data Points Analyzed
            </span>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[8px] sm:text-[9px] font-black text-blue-600">
            <span>VERIFIED</span>
            <span>↗ 100%</span>
          </div>
        </div>

      </div>

      {/* Star Rating & Social Proof Proof Bar (Right Below Carousel) */}
      <div className="mt-4 sm:mt-6 flex flex-col items-center justify-center gap-1 text-center">
        <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
          Rated <strong className="text-white font-extrabold">4.9/5</strong> by 120+ scaling brands
        </span>
        <div className="flex items-center gap-1 text-amber-300 text-xs sm:text-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
    </div>
  );
}
