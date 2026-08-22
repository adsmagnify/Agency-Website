"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

export default function SiteFooter() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-[#050C1A] text-white">
      {/* Luxury CTA Banner */}
      <div className="relative border-b border-white/10 bg-[#0A1A3A] px-6 py-20 text-center text-white md:py-28">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_rgba(0,74,173,0.35)_0%,_transparent_70%)]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#FFC619]">
            <span>Ready for your defining moment?</span>
          </div>

          <h2 className="font-heading text-[clamp(2.2rem,6vw,4.6rem)] font-extrabold uppercase leading-[1.02] tracking-tight text-white">
            Ready to <span className="text-[#FFC619]">magnify</span> your revenue?
          </h2>

          <p className="mt-4 max-w-[50ch] text-sm font-light leading-relaxed text-white/75 sm:text-base">
            Get a tailored, full-funnel growth blueprint. We will analyze your performance channels and show you exactly where to
            capture 3x+ returns.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <MagneticButton strength={0.35}>
              <a
                href="mailto:adsmagnify@gmail.com"
                data-cursor-text="WORK"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#FFC619] bg-[#FFC619] px-9 py-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[#0A1A3A] shadow-[0_10px_30px_rgba(255,198,25,0.25)] transition-all duration-300 hover:border-[#4CA3FF] hover:bg-[#4CA3FF] hover:text-white"
              >
                <span>Work with us</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Brand + direct contact — no page links, since this is the only page */}
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <Link href="/" className="inline-block">
              <img
                src="/full_logo.svg"
                alt="AdsMagnify"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="max-w-[34ch] text-xs font-light leading-relaxed text-white/60">
              High-performance marketing, programmatic SEO, web engineering, AI CRM, and creative testing —
              engineered for bottom-line revenue.
            </p>
            <div className="text-xs font-semibold text-[#FFC619]">
              Mumbai, India • {timeString || "IST (UTC+5:30)"}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/40">Direct Inquiries</p>
            <a
              href="mailto:adsmagnify@gmail.com"
              className="text-sm font-semibold text-[#FFC619] transition-colors hover:underline"
            >
              adsmagnify@gmail.com
            </a>
            <a href="tel:+917700090236" className="text-sm font-semibold text-white/80 transition-colors hover:text-white">
              +91 7700090236
            </a>
            <p className="max-w-[30ch] text-xs font-light leading-relaxed text-white/50">
              G12, Pil Court, Churchgate, Mumbai - 400020
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-[11px] font-light uppercase tracking-[0.16em] text-white/45">
            © {new Date().getFullYear()} AdsMagnify Performance Marketing. All rights reserved.
          </p>

          <MagneticButton strength={0.35}>
            <button
              type="button"
              onClick={scrollToTop}
              data-cursor-text="TOP"
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition-all duration-200 hover:border-[#FFC619] hover:text-[#FFC619]"
            >
              <span>Back to top</span>
              <span className="transition-transform duration-200 group-hover:-translate-y-1">↑</span>
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
