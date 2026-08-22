"use client";

const PLATFORMS = [
  { name: "Meta Ads", icon: "✦", metric: "Scale & Creative" },
  { name: "Google Ads", icon: "▲", metric: "High-Intent Search" },
  { name: "TikTok Ads", icon: "●", metric: "Viral & Spark" },
  { name: "Snapchat Ads", icon: "◈", metric: "Gen-Z Reach" },
  { name: "Amazon Ads", icon: "■", metric: "Marketplace ROAS" },
  { name: "Flipkart Ads", icon: "◆", metric: "E-comm Growth" },
  { name: "Quick Commerce", icon: "⚡", metric: "Blinkit & Zepto" },
  { name: "Shopify Plus", icon: "❖", metric: "CRO & Funnels" },
] as const;

/** Infinite horizontal ticker with interactive glowing pills and micro-metrics */
export default function PlatformMarquee() {
  const items = [...PLATFORMS, ...PLATFORMS];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#0A1A3A] py-6 select-none">
      {/* Side gradient feather masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0A1A3A] to-transparent sm:w-36" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0A1A3A] to-transparent sm:w-36" />

      <div className="marquee-track flex w-max items-center gap-6 sm:gap-8">
        {items.map((platform, i) => (
          <div
            key={`${platform.name}-${i}`}
            className="group flex cursor-default items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 transition-all duration-300 hover:border-[#FFC619]/60 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(255,198,25,0.2)]"
          >
            <span className="font-mono text-xs text-[#FFC619] transition-transform duration-300 group-hover:scale-125">
              {platform.icon}
            </span>
            <span className="font-heading whitespace-nowrap text-sm sm:text-base font-bold uppercase tracking-wide text-white/80 transition-colors duration-300 group-hover:text-white">
              {platform.name}
            </span>
            <span className="hidden sm:inline text-[9px] font-semibold uppercase tracking-widest text-[#4CA3FF]/70 border-l border-white/10 pl-2.5">
              {platform.metric}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
