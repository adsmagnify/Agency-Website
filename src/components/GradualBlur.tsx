"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

// Component added by Ansh - github.com/ansh-dhanani

export interface GradualBlurProps {
  target?: "parent" | "window" | "self";
  position?: "top" | "bottom" | "left" | "right";
  height?: string;
  width?: string;
  strength?: number;
  divCount?: number;
  curve?: "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";
  exponential?: boolean;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

const CURVE_FUNCTIONS = {
  linear: (t: number) => t,
  "ease-in": (t: number) => t * t,
  "ease-out": (t: number) => t * (2 - t),
  "ease-in-out": (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  bezier: (t: number) => t * t * (3 - 2 * t), // Smoothstep cubic bezier
};

export function GradualBlur({
  target = "parent",
  position = "bottom",
  height = "7rem",
  width = "7rem",
  strength = 2,
  divCount = 5,
  curve = "bezier",
  exponential = true,
  opacity = 1,
  className = "",
  style = {},
}: GradualBlurProps) {
  const isVertical = position === "top" || position === "bottom";

  const layers = useMemo(() => {
    const curveFn = CURVE_FUNCTIONS[curve] || CURVE_FUNCTIONS.bezier;
    const result: Array<{
      blur: number;
      mask: string;
      zIndex: number;
    }> = [];

    const getDirection = () => {
      switch (position) {
        case "top":
          return "to top";
        case "left":
          return "to left";
        case "right":
          return "to right";
        case "bottom":
        default:
          return "to bottom";
      }
    };

    const direction = getDirection();

    for (let i = 1; i <= divCount; i++) {
      const t = i / divCount;
      const curvedProgress = curveFn(t);

      // Smooth blur value calculation
      let blurAmount: number;
      if (exponential) {
        blurAmount = Math.pow(2, i - 1) * strength;
      } else {
        blurAmount = curvedProgress * strength * 8;
      }

      // Smooth overlapping feather masks for seamless zero-banding transition
      const start = Math.max(0, ((i - 1) / divCount) * 100);
      const mid = (i / divCount) * 100;

      const mask = `linear-gradient(${direction}, rgba(0,0,0,0) 0%, rgba(0,0,0,0) ${start.toFixed(
        1
      )}%, rgba(0,0,0,1) ${mid.toFixed(1)}%, rgba(0,0,0,1) 100%)`;

      result.push({
        blur: Math.round(blurAmount * 10) / 10,
        mask,
        zIndex: i,
      });
    }

    return result;
  }, [divCount, curve, exponential, strength, position]);

  const containerStyles: React.CSSProperties = useMemo(() => {
    const isFixed = target === "window";
    const pos = isFixed ? "fixed" : "absolute";

    const base: React.CSSProperties = {
      position: pos,
      pointerEvents: "none",
      opacity,
      zIndex: 50,
      ...style,
    };

    if (isVertical) {
      return {
        ...base,
        left: 0,
        right: 0,
        width: "100%",
        height,
        [position]: 0,
      };
    } else {
      return {
        ...base,
        top: 0,
        bottom: 0,
        height: "100%",
        width,
        [position]: 0,
      };
    }
  }, [target, position, isVertical, height, width, opacity, style]);

  return (
    <div
      className={cn("pointer-events-none overflow-hidden select-none", className)}
      style={containerStyles}
      aria-hidden="true"
    >
      {layers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0 size-full"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: layer.mask,
            WebkitMaskImage: layer.mask,
            zIndex: layer.zIndex,
          }}
        />
      ))}
    </div>
  );
}

export default GradualBlur;
