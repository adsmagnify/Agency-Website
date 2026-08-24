"use client";

import React from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import TextReveal3D from "./TextReveal3D";
import {
  TrendingUp,
  Search,
  Globe,
  Bot,
  Sparkles,
  Clapperboard,
  ArrowUpRight,
} from "lucide-react";

interface ServiceCardData {
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  pills: string[];
  cardBg: string;
  textColor: string;
  subtextColor: string;
  pillBg: string;
  pillText: string;
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  iconText: string;
  buttonBg: string;
  buttonText: string;
  buttonBorder: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    number: "01",
    tag: "PAID MEDIA & SCALE",
    title: "Performance Marketing",
    subtitle: "Google Ads, Meta Ads & Paid Media",
    description:
      "High-intent paid search, social acquisition, and full-funnel conversion architecture engineered for compounding ROAS and scalable enterprise customer acquisition.",
    pills: ["+348% ROAS", "Google & Meta", "Multi-Channel Scaling"],
    cardBg: "bg-[#004AAD]",
    textColor: "text-white",
    subtextColor: "text-blue-100",
    pillBg: "bg-white/15 border-white/25",
    pillText: "text-white",
    badgeBg: "bg-[#FFC619]",
    badgeText: "text-[#0A1A3A]",
    iconBg: "bg-white/20 text-white",
    iconText: "text-white",
    buttonBg: "bg-[#FFC619] hover:bg-[#ffe066]",
    buttonText: "text-[#0A1A3A]",
    buttonBorder: "border-[#FFC619]",
    icon: TrendingUp,
  },
  {
    number: "02",
    tag: "ORGANIC AUTHORITY",
    title: "Search Engine Optimization",
    subtitle: "Technical, Local & Content Search Optimization",
    description:
      "Technical audits, programmatic SEO architecture, and authoritative content strategies that capture high-intent organic search volume.",
    pills: ["+420% Organic Lift", "Top 3 Rankings", "Zero Ad Spend"],
    cardBg: "bg-[#FFC619]",
    textColor: "text-[#0A1A3A]",
    subtextColor: "text-slate-800",
    pillBg: "bg-black/10 border-black/15",
    pillText: "text-[#0A1A3A]",
    badgeBg: "bg-[#004AAD]",
    badgeText: "text-white",
    iconBg: "bg-[#004AAD] text-white",
    iconText: "text-white",
    buttonBg: "bg-[#004AAD] hover:bg-[#003882]",
    buttonText: "text-white",
    buttonBorder: "border-[#004AAD]",
    icon: Search,
  },
  {
    number: "03",
    tag: "WEB & SHOPIFY",
    title: "Website Development",
    subtitle: "SEO-First Frontend Development for Shopify & Next.js",
    description:
      "Lightning-fast Next.js and Shopify storefronts built with SEO-first architecture, buttery-smooth interactive UX, and conversion-optimized checkout funnels.",
    pills: ["0.4s Load Speed", "100 Core Web Vitals", "Next.js & Shopify"],
    cardBg: "bg-[#006CD8]",
    textColor: "text-white",
    subtextColor: "text-sky-100",
    pillBg: "bg-white/15 border-white/25",
    pillText: "text-white",
    badgeBg: "bg-[#FFC619]",
    badgeText: "text-[#0A1A3A]",
    iconBg: "bg-white/20 text-white",
    iconText: "text-white",
    buttonBg: "bg-[#FFC619] hover:bg-[#ffe066]",
    buttonText: "text-[#0A1A3A]",
    buttonBorder: "border-[#FFC619]",
    icon: Globe,
  },
  {
    number: "04",
    tag: "AI AUTOMATION",
    title: "CRM Development with AI",
    subtitle: "AI Lead Scoring, Automation & Pipeline",
    description:
      "End-to-end CRM pipelines, automated lead scoring, and intelligent AI agent workflows that close inbound leads and accelerate pipeline velocity on autopilot.",
    pills: ["3.2x Sales Velocity", "Automated Lead Scoring", "Instant Routing"],
    cardBg: "bg-[#0A1A3A]",
    textColor: "text-white",
    subtextColor: "text-slate-300",
    pillBg: "bg-white/10 border-white/15",
    pillText: "text-white",
    badgeBg: "bg-[#36A2FA]",
    badgeText: "text-[#0A1A3A]",
    iconBg: "bg-[#004AAD] text-white",
    iconText: "text-white",
    buttonBg: "bg-[#36A2FA] hover:bg-[#60b5ff]",
    buttonText: "text-[#0A1A3A]",
    buttonBorder: "border-[#36A2FA]",
    icon: Bot,
  },
  {
    number: "05",
    tag: "CREATIVE VELOCITY",
    title: "Generative AI with UGC Ads",
    subtitle: "AI Avatars, Product Ads & Hook Testing",
    description:
      "High-velocity AI avatar generation, viral script iterations, and multivariate hook testing to rapidly uncover winning ad creatives and scale across Meta & TikTok.",
    pills: ["50+ Variants/Wk", "8.9% Winning CTR", "Zero Fatigue"],
    cardBg: "bg-gradient-to-br from-[#004AAD] to-[#0A1A3A]",
    textColor: "text-white",
    subtextColor: "text-blue-100",
    pillBg: "bg-white/15 border-white/25",
    pillText: "text-white",
    badgeBg: "bg-[#FFC619]",
    badgeText: "text-[#0A1A3A]",
    iconBg: "bg-[#FFC619] text-[#0A1A3A]",
    iconText: "text-[#0A1A3A]",
    buttonBg: "bg-[#FFC619] hover:bg-[#ffe066]",
    buttonText: "text-[#0A1A3A]",
    buttonBorder: "border-[#FFC619]",
    icon: Sparkles,
  },
  {
    number: "06",
    tag: "CINEMA & TVC",
    title: "Generative AI with TVC Ads",
    subtitle: "AI Video, Brand Films & TVC Cutdowns",
    description:
      "Cinema-grade AI video production, 3D brand films, and television commercial cutdowns produced with Hollywood visual fidelity in days, not months.",
    pills: ["4K UHD Cinema", "72-Hour Turnaround", "16:9 & 9:16"],
    cardBg: "bg-gradient-to-br from-[#FFC619] to-[#F59E0B]",
    textColor: "text-[#0A1A3A]",
    subtextColor: "text-slate-900",
    pillBg: "bg-black/10 border-black/15",
    pillText: "text-[#0A1A3A]",
    badgeBg: "bg-[#0A1A3A]",
    badgeText: "text-white",
    iconBg: "bg-[#0A1A3A] text-white",
    iconText: "text-white",
    buttonBg: "bg-[#0A1A3A] hover:bg-slate-800",
    buttonText: "text-white",
    buttonBorder: "border-[#0A1A3A]",
    icon: Clapperboard,
  },
];

export default function ServicesScrollStack() {
  return (
    <section className="relative w-full bg-white border-b border-slate-200/80 overflow-hidden select-none">
      {/* 3D Reveal Headline on the SAME page at top */}
      <TextReveal3D
        line1="ONE HUB."
        line2="EVERY GROWTH CHANNEL WORKING TOGETHER."
        subline="Performance marketing, search engine optimization, websites, CRM + AI, and generative AI creative—connected under one growth strategy."
      />

      {/* Website Themed Step-Offset Stacking Deck */}
      <div className="relative z-10 w-full pt-4 pb-16">
        <ScrollStack itemStackDistance={32} stackTopVh={12}>
          {SERVICES_DATA.map((service) => {
            const IconComponent = service.icon;

            return (
              <ScrollStackItem key={service.number}>
                <div
                  className={`relative w-full h-full p-6 sm:p-8 md:p-10 ${service.cardBg} ${service.textColor} shadow-2xl flex flex-col justify-between overflow-hidden border border-white/10`}
                >
                  {/* Top Row: Icon, Number, Category Tag & Explore Link */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${service.iconBg} shadow-sm backdrop-blur-xs`}
                        >
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>

                        <div className="flex flex-col">
                          <span className="font-mono text-[11px] font-bold opacity-75">
                            SERVICE {service.number}
                          </span>
                          <span
                            className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-md mt-0.5 inline-block ${service.badgeBg} ${service.badgeText}`}
                          >
                            {service.tag}
                          </span>
                        </div>
                      </div>

                      {/* Explore Link */}
                      <a
                        href="#contact"
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl ${service.buttonBg} ${service.buttonText} border ${service.buttonBorder} text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all`}
                      >
                        <span>Explore</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`${service.subtextColor} text-xs sm:text-sm md:text-[15px] leading-relaxed mt-3 max-w-2xl font-normal`}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Minimal Metric Pills */}
                  <div className="mt-6 pt-4 border-t border-current/15 flex items-center gap-2 sm:gap-2.5 flex-wrap">
                    {service.pills.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        className={`px-3 py-1 rounded-lg border ${service.pillBg} ${service.pillText} text-[10px] sm:text-[11px] font-semibold backdrop-blur-xs`}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}
