"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface LensProps {
  children: React.ReactNode;
  lensSize?: number;
  maxStretch?: number;
  radius?: number;
  className?: string;
  ariaLabel?: string;
}

export function Lens({
  children,
  lensSize = 190,
  maxStretch = 1.38,
  radius = 120,
  className = "",
  ariaLabel = "Zoom Area",
}: LensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePosRef = useRef({ x: -999, y: -999 });
  const lastPosRef = useRef({ x: -999, y: -999 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    mousePosRef.current = { x: -999, y: -999 };

    // Reset all characters width, stroke & letter spacing on leave
    if (containerRef.current) {
      const chars = containerRef.current.querySelectorAll<HTMLElement>(".proxi-char");
      chars.forEach((char) => {
        char.style.transform = "scaleX(1) scaleY(1)";
        char.style.webkitTextStroke = "0px";
        char.style.paddingLeft = "0px";
        char.style.paddingRight = "0px";
        char.style.letterSpacing = "normal";
      });
    }
  }, []);

  useEffect(() => {
    let frameId: number;

    const loop = () => {
      frameId = requestAnimationFrame(loop);
      const container = containerRef.current;
      const lensEl = lensRef.current;
      if (!container) return;

      const { x, y } = mousePosRef.current;

      // Update magnifying glass ring position
      if (lensEl) {
        if (x > -100 && y > -100 && isHovering) {
          lensEl.style.opacity = "1";
          lensEl.style.transform = `translate3d(${x - lensSize / 2}px, ${y - lensSize / 2}px, 0)`;
        } else {
          lensEl.style.opacity = "0";
        }
      }

      if (lastPosRef.current.x === x && lastPosRef.current.y === y) return;
      lastPosRef.current = { x, y };

      const containerRect = container.getBoundingClientRect();
      const chars = container.querySelectorAll<HTMLElement>(".proxi-char");

      chars.forEach((char) => {
        const charRect = char.getBoundingClientRect();
        const charCenterX = charRect.left + charRect.width / 2 - containerRect.left;
        const charCenterY = charRect.top + charRect.height / 2 - containerRect.top;

        const dist = Math.sqrt((x - charCenterX) ** 2 + (y - charCenterY) ** 2);

        if (dist >= radius || x < -100) {
          char.style.transform = "scaleX(1) scaleY(1)";
          char.style.webkitTextStroke = "0px";
          char.style.paddingLeft = "0px";
          char.style.paddingRight = "0px";
          char.style.letterSpacing = "normal";
        } else {
          // Spherical cosine falloff for organic variable width expansion + dynamic letter spacing
          const norm = Math.cos((dist / radius) * (Math.PI / 2));
          const scaleX = 1 + (maxStretch - 1) * norm;
          const strokeWidth = (norm * 0.65).toFixed(2);
          const spacingPx = (norm * 3.5).toFixed(1);

          char.style.transform = `scaleX(${scaleX.toFixed(3)}) scaleY(1)`;
          char.style.webkitTextStroke = norm > 0.08 ? `${strokeWidth}px currentColor` : "0px";
          char.style.paddingLeft = `${spacingPx}px`;
          char.style.paddingRight = `${spacingPx}px`;
          char.style.letterSpacing = `${(norm * 0.05).toFixed(3)}em`;
        }
      });
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [radius, maxStretch, lensSize, isHovering]);

  return (
    <div
      ref={containerRef}
      data-cursor-hidden="true"
      className={cn(
        "relative z-20 overflow-visible select-none transition-all",
        isHovering ? "cursor-none" : "cursor-default",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label={ariaLabel}
    >
      {/* Base Text Content */}
      <div className="relative z-10">{children}</div>

      {/* Optical Specular Magnifying Glass Lens Ring (Desktop Only, Hidden Initially) */}
      <div
        ref={lensRef}
        className="hidden md:block pointer-events-none absolute top-0 left-0 rounded-full border-2 border-[#004AAD]/50 bg-[#004AAD]/[0.03] backdrop-blur-[0.5px] shadow-[0_12px_40px_rgba(0,74,173,0.22),inset_0_0_25px_rgba(76,163,255,0.25)] transition-opacity duration-150 will-change-transform z-30 opacity-0"
        style={{
          width: `${lensSize}px`,
          height: `${lensSize}px`,
          opacity: 0,
        }}
      >
        {/* Specular Highlight Arc */}
        <div className="absolute top-2 left-4 h-5 w-12 rounded-full bg-white/40 blur-[1px] rotate-[-25deg]" />
      </div>
    </div>
  );
}

export default Lens;
