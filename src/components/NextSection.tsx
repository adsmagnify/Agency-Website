"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import SpotlightCard from "./SpotlightCard";
import MagneticButton from "./MagneticButton";
import PlatformMarquee from "./PlatformMarquee";
import DepthText from "./DepthText";
import TextReveal3D from "./TextReveal3D";
import ServicesScrollStack from "./ServicesScrollStack";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const TIMELINE_PHASES = [
  {
    num: "01",
    title: "PHASE 1: FULL-FUNNEL AUDIT & TRACKING FOUNDATION",
    copy: "We begin with a deep diagnostic across your ad accounts, pixel health, CAPI server-side tracking, and conversion funnels. We patch revenue leaks, fix broken attribution, and architect 20+ fresh creative hooks to prepare your brand for high-velocity scale.",
    tags: ["Tracking Audit", "Angle Generation", "Leak Analysis", "Offer Architecture"],
  },
  {
    num: "02",
    title: "PHASE 2: THE SCALE ROLLOUT & CREATIVE VELOCITY",
    copy: "We go all-in across Meta, Google Ads, YouTube, and Marketplaces. High-frequency AI UGC ads and dynamic ASC+ broad testing deploy weekly, unlocking aggressive customer acquisition volume while keeping CAC strictly controlled.",
    tags: ["Meta Ads ASC+", "Google Search", "AI UGC Creative", "Weekly A/B Drops"],
  },
  {
    num: "03",
    title: "PHASE 3: COMPOUNDING EBITDA & MULTI-CHANNEL MOAT",
    copy: "We turn paid acquisition momentum into permanent market moat with programmatic SEO, AI CRM lead routing, and retention funnels. Live Looker Studio dashboards ensure you track every net dollar deposited.",
    tags: ["Programmatic SEO", "AI CRM Automation", "Shopify CRO", "Live Dashboards"],
  },
] as const;

const FAQS = [
  {
    q: "Will AdsMagnify be as reliable as an in-house pod?",
    a: "100%. You get a dedicated growth pod — senior media buyer, creative strategist, copywriter, and data engineer — with direct daily Slack communication and live dashboard access. No junior handoffs, no runarounds.",
  },
  {
    q: "Will campaigns stay profitable as ad spend scales?",
    a: "We never scale top-of-funnel ad spend without strict unit economics. Our 3-stage scaling framework tests horizontal angles, kills fatigued ads early, and continually refreshes creative assets before CAC spikes.",
  },
  {
    q: "Are all major acquisition channels managed under one roof?",
    a: "Yes. Paid social (Meta, TikTok), paid search (Google, YouTube), programmatic SEO, and AI CRM automation all talk to each other under one unified command to eliminate siloed waste.",
  },
] as const;

const DATA_METRICS = [
  { value: "3.4X", label: "Average Blended ROAS", sub: "Across all active accounts" },
  { value: "60", unit: "DAYS", label: "To Profitable Scale", sub: "From initial sprint launch" },
  { value: "$51M+", label: "In Total Revenue", sub: "Global performance scale" },
  { value: "300+", label: "Brands Scaled", sub: "DTC, B2B & Enterprise" },
];

const PROOF_METRICS = [
  {
    text: "300+",
    label: "Brands",
    midColor: "#FFC619",
    depthColor: "#004AAD",
  },
  {
    text: "$51M+",
    label: "In Total Revenue",
    midColor: "#FFD147",
    depthColor: "#006CD8",
  },
  {
    text: "₹50Cr+",
    label: "Revenue Generated",
    midColor: "#FFB800",
    depthColor: "#004AAD",
  },
];

export default function NextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // 1. Headings Kinetic Scroll Reveal
      gsap.utils.toArray<HTMLElement>(".gsap-reveal-heading").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 2. Bento Grid Staggered Entrance
      gsap.fromTo(
        ".bento-card",
        { y: 50, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Roadmap Phase Cards Stagger
      gsap.fromTo(
        ".phase-glass-card",
        { y: 55, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.2,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#growth-roadmap",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. FAQ Items Staggered Reveal
      gsap.fromTo(
        ".faq-item",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 5. Metrics Matrix Staggered Reveal
      gsap.fromTo(
        ".metric-card",
        { y: 45, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".metrics-container",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div ref={containerRef} className="w-full select-none">
      {/* ------------------------------------------------------------- */}
      {/* PROOF STATS SHOWCASE STRIP (3D DepthText: 300+ Brands, $51M+, ₹50Cr+) */}
      {/* ------------------------------------------------------------- */}
      <section className="proof-stats-strip relative w-full bg-white border-b border-slate-200/80 py-5 sm:py-7 overflow-hidden shadow-xs">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 gap-8 sm:gap-0 items-center">
            {PROOF_METRICS.map((item, idx) => (
              <div
                key={idx}
                className="proof-stat-item group flex flex-col items-center justify-center text-center px-4 py-4 sm:py-2 transition-transform duration-300 hover:scale-105 cursor-default"
              >
                <DepthText
                  text={item.text}
                  layers={26}
                  depth={1.8}
                  faceColor="#0A1A3A"
                  midColor={item.midColor}
                  depthColor={item.depthColor}
                  tilt={7.5}
                  delayMs={idx * 150}
                  pointerTracking
                  scrollTracking
                  autoOrbit
                  orbitSpeed={0.35}
                  fontSize="clamp(2.3rem, 4.2vw, 3.5rem)"
                  fontWeight={700}
                  shadow
                />
                <span className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 mt-3.5 transition-colors duration-200 group-hover:text-[#004AAD]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3D REVEAL & SERVICES SCROLLSTACK (Unified on Same Page)       */}
      {/* ------------------------------------------------------------- */}
      <ServicesScrollStack />

      {/* ------------------------------------------------------------- */}
      {/* ABOUT US & MODERN BENTO GRID                                  */}
      {/* ------------------------------------------------------------- */}
      <section id="about" className="relative w-full bg-[#FAFCFF] px-6 pt-8 sm:pt-12 pb-20 sm:pb-28 text-[#0A1A3A]">
        <div className="mx-auto max-w-5xl">
          
          {/* Top Pill & Editorial Headline */}
          <div className="text-center mb-14 sm:mb-18 flex flex-col items-center">
            <div className="gsap-reveal-heading mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span>ABOUT US</span>
            </div>

            <h2 className="gsap-reveal-heading font-heading max-w-[22ch] text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold text-[#0A1A3A] leading-[1.12] tracking-tight">
              A global growth partner dedicated to building{" "}
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#36A2FA]/20 text-[#006CD8] font-black align-middle text-[0.85em]">
                <span className="text-sm">🌐</span> smarter
              </span>{" "}
              and{" "}
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D7FA3B]/40 text-[#0A1A3A] font-black align-middle text-[0.85em]">
                <span className="text-sm">💡</span> more scalable
              </span>
            </h2>
          </div>

          {/* Modern Bento Grid Cards */}
          <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            
            {/* Card 1: Blue Card with Partner Portrait */}
            <div className="bento-card rounded-[2rem] bg-gradient-to-b from-[#0D87F2] to-[#006CD8] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl shadow-blue-500/10 min-h-[380px] transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="font-heading text-lg font-black tracking-wider uppercase">
                  ADSMAGNIFY
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs">
                  📊
                </span>
              </div>

              {/* Portrait Image */}
              <div className="my-auto flex justify-center py-4">
                <div className="h-32 w-32 rounded-2xl bg-white/15 p-1 border border-white/30 overflow-hidden shadow-md">
                  <img
                    src="/final_monitor.png"
                    alt="Founder"
                    className="h-full w-full object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Bottom Stat */}
              <div className="bg-white rounded-2xl p-5 text-[#0A1A3A] shadow-md">
                <span className="font-heading text-3xl sm:text-4xl font-black block leading-none text-[#0A1A3A]">
                  120+
                </span>
                <p className="mt-2 text-xs text-slate-500 font-medium leading-snug">
                  Collaborating with leading AI and performance growth providers.
                </p>
              </div>
            </div>

            {/* Card 2: Commitment to Measurable */}
            <div className="bento-card rounded-[2rem] bg-white p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between min-h-[380px] transition-transform duration-300 hover:-translate-y-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Commitment to measurable
                </span>
                <span className="font-heading text-4xl sm:text-5xl font-black text-[#0A1A3A] mt-2 block">
                  100%
                </span>
              </div>

              <div className="pt-6 border-t border-slate-100">
                {/* Client Avatars */}
                <div className="flex -space-x-2 mb-3">
                  <span className="h-8 w-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    A
                  </span>
                  <span className="h-8 w-8 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-slate-900 text-xs font-bold">
                    M
                  </span>
                  <span className="h-8 w-8 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center text-slate-900 text-xs font-bold">
                    Z
                  </span>
                  <span className="h-8 w-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    K
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed italic">
                  &ldquo;Their AI automation and media buying strategy completely reshaped how we scale. It&rsquo;s efficient, intelligent, and compounding.&rdquo;
                </p>
              </div>
            </div>

            {/* Column 3: Lime Green Data Points Card + Dark Card */}
            <div className="bento-card flex flex-col gap-6 sm:gap-8 justify-between">
              
              {/* Card 3 (Lime Green) */}
              <div className="rounded-[2rem] bg-[#D7FA3B] p-6 sm:p-8 text-[#0A1A3A] flex-1 flex flex-col justify-between shadow-lg shadow-lime-500/10 min-h-[220px] transition-transform duration-300 hover:-translate-y-1">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A1A3A]/70 block">
                    Data Points
                  </span>
                  <span className="font-heading text-4xl sm:text-5xl font-black text-[#0A1A3A] mt-2 block">
                    520k+
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#0A1A3A]/80 font-medium leading-snug mt-4">
                  Analyzed monthly to power smarter media buying and creative strategies.
                </p>
              </div>

              {/* Card 4 (Dark Navy Card) */}
              <div className="rounded-[2rem] bg-[#090E17] p-6 sm:p-8 text-white flex items-center justify-between shadow-xl transition-transform duration-300 hover:-translate-y-1">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Global Reach
                  </span>
                  <span className="text-sm font-semibold text-white/80">
                    Active Markets
                  </span>
                </div>

                <span className="font-heading text-4xl font-black text-white">
                  20+
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      <PlatformMarquee />

      {/* ------------------------------------------------------------- */}
      {/* GROWTH ROADMAP / 3 PHASE TIMELINE                             */}
      {/* ------------------------------------------------------------- */}
      <section
        id="growth-roadmap"
        className="relative w-full border-y border-white/10 bg-[#0A1A3A] px-6 py-24 text-white md:py-32"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="gsap-reveal-heading mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FFC619]">
              <span>The Growth Roadmap</span>
            </div>
            <h2 className="gsap-reveal-heading font-heading text-[clamp(2.2rem,5.5vw,4.2rem)] font-black uppercase leading-[1.02] tracking-tight text-white">
              What this means for your brand
            </h2>
          </div>

          {/* Connected Luxury Phase Cards */}
          <div className="flex flex-col gap-8">
            {TIMELINE_PHASES.map((phase) => (
              <div key={phase.num} className="phase-glass-card">
                <SpotlightCard
                  theme="dark"
                  tiltStrength={4}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl transition-all duration-300 hover:border-[#FFC619]/40 hover:bg-white/[0.05] md:p-12"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#FFC619]/30 bg-[#FFC619]/10 font-heading text-xl font-black text-[#FFC619] shadow-[0_0_20px_rgba(255,198,25,0.15)]">
                      {phase.num}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-heading text-[clamp(1.3rem,2.8vw,1.9rem)] font-black uppercase tracking-tight text-white">
                        {phase.title}
                      </h3>
                      <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-white/75">
                        {phase.copy}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {phase.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* INTERACTIVE FAQ ACCORDION BLOCK                               */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full overflow-hidden bg-[#050C1A] px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="gsap-reveal-heading mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FFC619]">
              <span>Transparent Q&A</span>
            </div>
            <h2 className="gsap-reveal-heading font-heading text-[clamp(2.2rem,5vw,3.8rem)] font-black uppercase tracking-tight text-white">
              Frequently asked questions
            </h2>
          </div>

          <div className="faq-container flex flex-col gap-5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={faq.q}
                  className="faq-item rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between p-6 text-left cursor-pointer md:p-8"
                  >
                    <h3 className="font-heading text-base sm:text-lg font-bold uppercase tracking-tight text-white pr-4">
                      {faq.q}
                    </h3>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm font-bold text-[#FFC619]">
                      {isOpen ? "−" : "+"}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/10 px-6 pb-6 pt-4 md:px-8 md:pb-8">
                      <p className="text-sm font-light leading-relaxed text-white/75 sm:text-base">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* METRICS MATRIX: "OUR DATA DOES THE TALKING"                   */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full border-t border-white/10 bg-[#0A1A3A] px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="gsap-reveal-heading mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FFC619]">
              <span>Audited Numbers</span>
            </div>
            <h2 className="gsap-reveal-heading font-heading text-[clamp(2.2rem,5vw,4rem)] font-black uppercase tracking-tight text-white">
              Our data does the talking
            </h2>
          </div>

          <div className="metrics-container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DATA_METRICS.map((m) => (
              <div key={m.label} className="metric-card">
                <SpotlightCard
                  theme="dark"
                  tiltStrength={6}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl transition-all duration-300 hover:border-[#FFC619]/40 hover:bg-white/[0.06]"
                >
                  <p className="font-heading text-4xl sm:text-5xl font-black text-[#FFC619]">
                    {m.value}
                    {m.unit && <span className="text-lg font-bold ml-1 text-white">{m.unit}</span>}
                  </p>
                  <p className="mt-3 font-heading text-sm font-bold uppercase tracking-wider text-white">
                    {m.label}
                  </p>
                  <p className="mt-1 text-xs text-white/50">{m.sub}</p>
                </SpotlightCard>
              </div>
            ))}
          </div>

          {/* Bottom Callout Banner */}
          <div className="mt-20 rounded-3xl border border-white/15 bg-gradient-to-r from-[#004AAD]/30 via-white/[0.04] to-[#004AAD]/30 p-10 md:p-14 text-center backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <h3 className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-black uppercase leading-tight text-white">
              Ready to magnify your bottom-line revenue?
            </h3>
            <p className="mx-auto mt-4 max-w-[48ch] text-sm font-light text-white/75 sm:text-base">
              Let&rsquo;s analyze your ad accounts and architect a tailored roadmap for 3x+ scalable ROAS.
            </p>
            <div className="mt-8 flex justify-center">
              <MagneticButton strength={0.35}>
                <a
                  href="mailto:adsmagnify@gmail.com"
                  data-cursor-text="TALK"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#FFC619] bg-[#FFC619] px-9 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#0A1A3A] shadow-[0_10px_30px_rgba(255,198,25,0.3)] transition-all duration-300 hover:border-[#4CA3FF] hover:bg-[#4CA3FF] hover:text-white"
                >
                  <span>Schedule a Strategy Call →</span>
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
