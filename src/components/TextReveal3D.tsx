"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TextReveal3D.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TextReveal3DProps {
  line1?: string;
  line2?: string;
  subline?: string;
  perspective?: number;
  scrubSmoothing?: number | boolean;
  fontSize?: string;
  className?: string;
}

export default function TextReveal3D({
  line1 = "ONE HUB.",
  line2 = "EVERY GROWTH CHANNEL WORKING TOGETHER.",
  subline = "Performance marketing, search engine optimization, websites, CRM + AI, and generative AI creative—connected under one growth strategy.",
  perspective = 850,
  scrubSmoothing = 0.35,
  fontSize = "clamp(1.55rem, 4.2vw, 2.85rem)",
  className = ""
}: TextReveal3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const block = blockRef.current;
    if (!container || !block) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // 1. Initial 3D Cylinder state (entering from bottom floor)
      gsap.set(block, {
        rotateX: -45,
        y: 40,
        z: -50,
        opacity: 0.35,
        force3D: true,
        transformOrigin: "50% 50% -160px"
      });

      // 2. Timeline synchronized so roll-up is visibly active as text leaves the top edge
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          end: "bottom 10%",
          scrub: scrubSmoothing,
          invalidateOnRefresh: true,
        }
      });

      // Phase 1 (0 -> 0.32): Enters and rotates into full center upright focus (0deg)
      tl.to(
        block,
        {
          rotateX: 0,
          y: 0,
          z: 0,
          opacity: 1,
          ease: "power1.out",
          duration: 0.32,
          force3D: true,
        },
        0
      );

      // Phase 2 (0.32 -> 0.60): Plateau in viewport center
      tl.to(
        block,
        {
          rotateX: 0,
          y: 0,
          z: 0,
          opacity: 1,
          ease: "none",
          duration: 0.28,
          force3D: true,
        },
        0.32
      );

      // Phase 3 (0.60 -> 1.0): Visibly rolls up into the ceiling depth as the top line starts exiting
      tl.to(
        block,
        {
          rotateX: 55,
          y: -45,
          z: -80,
          opacity: 0.35,
          ease: "power1.in",
          duration: 0.40,
          force3D: true,
        },
        0.60
      );
    }, container);

    return () => ctx.revert();
  }, [scrubSmoothing]);

  return (
    <div
      ref={containerRef}
      className={`text-reveal-3d-root relative w-full pt-10 sm:pt-14 pb-6 text-[#0A1A3A] flex items-center justify-center select-none ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      <div className="text-reveal-3d-stage px-5 sm:px-6">
        <div ref={blockRef} className="text-reveal-3d-block max-w-4xl mx-auto">
          {/* Headline */}
          <h2
            className="font-heading uppercase tracking-[-0.035em] text-[#0A1A3A] font-black text-center"
            style={{ fontSize }}
          >
            <span>{line1}</span>
            <br />
            <span className="block mt-1 sm:mt-2">{line2}</span>
          </h2>

          {/* Subline */}
          {subline && (
            <p className="text-slate-600 font-sans text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed mt-3 sm:mt-4 font-normal tracking-normal text-center px-2">
              {subline}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
