"use client";

import React, { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollStack.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

export interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemStackDistance?: number;
  stackTopVh?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemStackDistance = 32,
  stackTopVh = 12,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const cardWrappers = Array.from(
        container.querySelectorAll<HTMLElement>(".scroll-stack-card-wrapper")
      );
      if (!cardWrappers.length) return;

      const lastWrapper = cardWrappers[cardWrappers.length - 1];

      cardWrappers.forEach((wrapper, index) => {
        const card = wrapper.querySelector<HTMLElement>(".scroll-stack-card");
        if (!card) return;

        // Calculate exact vertical offset for this card in the stack
        const pinOffsetPx = (window.innerHeight * stackTopVh) / 100 + index * itemStackDistance;

        // Pin each card at its step offset so previous cards remain visibly stacked above
        if (index < cardWrappers.length - 1) {
          ScrollTrigger.create({
            trigger: wrapper,
            start: () => `top ${pinOffsetPx}px`,
            endTrigger: lastWrapper,
            end: () => `top ${(window.innerHeight * stackTopVh) / 100 + (cardWrappers.length - 1) * itemStackDistance}px`,
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          });
        }
      });
    }, container);

    return () => ctx.revert();
  }, [itemStackDistance, stackTopVh]);

  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      ref={containerRef}
    >
      <div className="scroll-stack-inner">
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className="scroll-stack-card-wrapper"
            style={{
              zIndex: index + 10,
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollStack;
