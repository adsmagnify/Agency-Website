"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1200;

const GLOBE_CONFIG: COBEOptions = {
  width: 1000,
  height: 1000,
  devicePixelRatio: 2,
  phi: 4.85, // Starts centered on India (75° E)
  theta: 0.28,
  dark: 0.8, // Deep royal ocean depth
  diffuse: 1.8, // Smooth radiant light scattering
  mapSamples: 24000, // Ultra-high density sampling for sharp realistic coastlines
  mapBrightness: 4.0,
  mapBaseBrightness: 0.08,
  baseColor: [0.12, 0.28, 0.65], // Rich royal ocean sapphire blue
  markerColor: [255 / 255, 198 / 255, 25 / 255], // Radiant golden city beacons
  glowColor: [0.2, 0.58, 1.0], // Luminous electric royal blue atmosphere glow
  scale: 1.05,
  markers: [
    { location: [19.076, 72.8777], size: 0.05 }, // Mumbai (HQ)
    { location: [28.6139, 77.209], size: 0.04 }, // Delhi
    { location: [12.9716, 77.5946], size: 0.038 }, // Bengaluru
    { location: [25.2048, 55.2708], size: 0.04 }, // Dubai
    { location: [1.3521, 103.8198], size: 0.038 }, // Singapore
    { location: [35.6762, 139.6503], size: 0.035 }, // Tokyo
    { location: [51.5074, -0.1278], size: 0.038 }, // London
    { location: [52.52, 13.405], size: 0.035 }, // Berlin
    { location: [40.7128, -74.006], size: 0.04 }, // New York
    { location: [37.7749, -122.4194], size: 0.038 }, // San Francisco
    { location: [-33.8688, 151.2093], size: 0.035 }, // Sydney
    { location: [-23.5505, -46.6333], size: 0.035 }, // São Paulo
  ],
};

export default function GlobeCarousel({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(4.85); // Initial position centered on India
  const widthRef = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 28,
    stiffness: 90,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const w = (widthRef.current || 480) * 2;
    const globe = createGlobe(canvasRef.current!, {
      ...GLOBE_CONFIG,
      width: w,
      height: w,
    });

    let animationFrameId: number;
    const animate = () => {
      if (!pointerInteracting.current) {
        phiRef.current += 0.003;
      }
      const currentWidth = (widthRef.current || 480) * 2;
      globe.update({
        phi: phiRef.current + rs.get(),
        width: currentWidth,
        height: currentWidth,
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    if (canvasRef.current) {
      canvasRef.current.style.opacity = "1";
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs]);

  return (
    <div
      className={cn(
        "relative w-full max-w-4xl mx-auto flex items-center justify-center select-none overflow-hidden py-2",
        className
      )}
    >
      {/* Radiant Light Sky-Blue Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,_rgba(186,230,253,0.5)_0%,_rgba(147,197,253,0.22)_38%,_transparent_75%)] blur-3xl transform scale-90" />

      {/* 3D COBE Canvas Stage */}
      <div className="relative w-full aspect-square max-w-[460px] sm:max-w-[540px] md:max-w-[620px] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="size-full opacity-0 transition-opacity duration-700 contain-[layout_paint_size] cursor-grab"
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX;
            updatePointerInteraction(e.clientX);
          }}
          onPointerUp={() => updatePointerInteraction(null)}
          onPointerOut={() => updatePointerInteraction(null)}
          onMouseMove={(e) => updateMovement(e.clientX)}
          onTouchMove={(e) =>
            e.touches[0] && updateMovement(e.touches[0].clientX)
          }
        />
      </div>
    </div>
  );
}



