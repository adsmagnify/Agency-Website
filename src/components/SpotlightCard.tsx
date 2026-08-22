"use client";

import { useRef, useState, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  theme?: "light" | "dark";
  tiltStrength?: number;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor,
  theme = "light",
  tiltStrength = 8,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const defaultSpotlight =
    theme === "dark"
      ? "rgba(76, 163, 255, 0.16)"
      : "rgba(0, 74, 173, 0.09)";
  const color = spotlightColor || defaultSpotlight;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-py * tiltStrength).toFixed(2)}deg) rotateY(${(px * tiltStrength).toFixed(2)}deg) translateZ(0)`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ease-out will-change-transform ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Dynamic Cursor Spotlight Radial Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(420px circle at ${coords.x}px ${coords.y}px, ${color}, transparent 80%)`
            : "none",
        }}
        aria-hidden
      />

      {/* Dynamic Cursor Spotlight Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, ${theme === "dark" ? "rgba(255, 198, 25, 0.4)" : "rgba(0, 74, 173, 0.3)"}, transparent 70%)`
            : "none",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
        aria-hidden
      />

      {/* Content wrapper */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
