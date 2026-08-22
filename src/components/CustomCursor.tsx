"use client";

import { useEffect, useRef, useState } from "react";

/**
 * High-performance CustomCursor with touch/mobile guard and zero layout shift.
 * Only activates on desktop devices with fine pointer controls.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsHover || reduceMotion) return;

    setIsSupported(true);

    let mouseX = -999;
    let mouseY = -999;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const hiddenEl = target.closest("[data-cursor-hidden='true'], .cursor-none");
      setIsHidden(!!hiddenEl);

      const hoverEl = target.closest("a, button, [data-cursor-text]") as HTMLElement | null;
      const text = hoverEl?.getAttribute("data-cursor-text") || "";
      setCursorText(text);
    };
    window.addEventListener("pointerover", onOver, { passive: true });

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
    };
    tick();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!isSupported) return null;

  return (
    <div
      className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-200"
      style={{ opacity: isHidden ? 0 : 1 }}
      aria-hidden="true"
    >
      {/* Center Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-[#004AAD] shadow-[0_0_10px_rgba(0,74,173,0.8)] will-change-transform"
      />

      {/* Trailing Ring with Micro-label */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 flex items-center justify-center rounded-full border border-[#004AAD]/40 transition-[width,height,background-color] duration-200 will-change-transform ${
          cursorText
            ? "h-14 w-14 bg-[#004AAD] text-[9px] font-black uppercase tracking-wider text-white shadow-lg shadow-blue-500/20"
            : isClicking
            ? "h-7 w-7 bg-[#004AAD]/10"
            : "h-9 w-9 bg-transparent"
        }`}
      >
        {cursorText && (
          <span className="select-none tracking-widest leading-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
