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
  perspective = 750,
  scrubSmoothing = 0.4,
  fontSize = "clamp(1.6rem, 3.8vw, 2.85rem)",
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
      // 1. Initial 3D Cylinder state
      gsap.set(block, {
        rotateX: -55,
        y: 40,
        z: -60,
        opacity: 0.4,
        force3D: true,
        transformOrigin: "50% 50% -180px"
      });

      // 2. Natural-Flow Scroll-Triggered 3D Roll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 95%",
          end: "bottom 15%",
          scrub: scrubSmoothing,
          invalidateOnRefresh: true,
        }
      });

      // Continuous 3D Cylinder Rotation (-55deg -> +55deg)
      tl.fromTo(
        block,
        {
          rotateX: -55,
          y: 40,
          z: -60,
        },
        {
          rotateX: 55,
          y: -40,
          z: -80,
          ease: "none",
          duration: 1,
          force3D: true,
        },
        0
      );

      // Smooth Opacity Peak in the Center of Viewport
      tl.fromTo(
        block,
        { opacity: 0.4 },
        {
          opacity: 1,
          ease: "power1.out",
          duration: 0.45,
          force3D: true,
        },
        0
      );

      tl.to(
        block,
        {
          opacity: 0.4,
          ease: "power1.in",
          duration: 0.45,
          force3D: true,
        },
        0.55
      );
    }, container);

    return () => ctx.revert();
  }, [scrubSmoothing]);

  return (
    <div
      ref={containerRef}
      className={`text-reveal-3d-root relative w-full pt-10 sm:pt-14 pb-4 text-[#0A1A3A] flex items-center justify-center select-none ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      <div className="text-reveal-3d-stage px-6">
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
            <p className="text-slate-600 font-sans text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-3 sm:mt-4 font-normal tracking-normal text-center">
              {subline}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
