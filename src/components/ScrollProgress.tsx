"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      setProgress(Math.min(1, Math.max(0, currentScroll / totalScroll)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-[#004AAD] via-[#4CA3FF] to-[#FFC619] shadow-[0_0_12px_rgba(76,163,255,0.8),0_0_24px_rgba(255,198,25,0.6)] transition-transform duration-75 ease-out will-change-transform"
        style={{
          transformOrigin: "0% 50%",
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
}
