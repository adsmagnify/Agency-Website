"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import './DepthText.css';

export interface DepthTextProps {
  text?: string;
  layers?: number;
  depth?: number;
  faceColor?: string;
  midColor?: string;
  depthColor?: string;
  tilt?: number;
  pointerTracking?: boolean;
  scrollTracking?: boolean;
  smoothing?: number;
  perspective?: number;
  autoOrbit?: boolean;
  orbitSpeed?: number;
  fontSize?: string;
  fontWeight?: number | string;
  shadow?: boolean;
  delayMs?: number;
  className?: string;
  style?: CSSProperties;
}

interface DepthLayer {
  index: number;
  color: string;
  transform: string;
  collapsedTransform: string;
}

const MAX_LAYERS = 64;

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const getLayerColor = (
  faceColor: string,
  depthColor: string,
  midColor: string | undefined,
  index: number,
  total: number
): string => {
  const progress = total <= 1 ? 1 : index / total;
  if (midColor) {
    if (progress < 0.45) {
      const t = progress / 0.45;
      return `color-mix(in srgb, ${midColor} ${Math.round(t * 100)}%, ${faceColor})`;
    } else {
      const t = (progress - 0.45) / 0.55;
      return `color-mix(in srgb, ${depthColor} ${Math.round(t * 100)}%, ${midColor})`;
    }
  }
  const eased = progress * progress;
  const faceMix = Math.round((1 - eased) * 72 + 4);
  return `color-mix(in srgb, ${faceColor} ${faceMix}%, ${depthColor})`;
};

const getTransform = (rotateX: number, rotateY: number, scale: number = 1): string =>
  `rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) scale(${scale.toFixed(3)})`;

const DepthText = ({
  text = 'Elevate',
  layers = 26,
  depth = 1.8,
  faceColor = '#0A1A3A',
  midColor = '#FFC619',
  depthColor = '#004AAD',
  tilt = 7.5,
  pointerTracking = true,
  scrollTracking = true,
  smoothing = 0.14,
  perspective = 900,
  autoOrbit = true,
  orbitSpeed = 0.35,
  fontSize = 'clamp(2.3rem, 4.2vw, 3.5rem)',
  fontWeight = 700,
  shadow = true,
  delayMs = 0,
  className = '',
  style = {}
}: DepthTextProps) => {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const stageRef = useRef<HTMLSpanElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  const safeLayers = clamp(Math.round(Number(layers) || 1), 2, MAX_LAYERS);
  const safeDepth = clamp(Number(depth) || 0, 0, 12);
  const safeTilt = clamp(Number(tilt) || 0, 0, 16);
  const safeSmoothing = clamp(Number(smoothing) || 0.14, 0.02, 0.35);
  const safePerspective = clamp(Number(perspective) || 900, 300, 2000);
  const safeOrbitSpeed = clamp(Number(orbitSpeed) || 0, 0, 2);

  const baseRotation = useMemo(() => ({ x: -safeTilt * 0.32, y: safeTilt * 0.42 }), [safeTilt]);

  // Observer to trigger the fade-in and 3D layer explosion when scrolled into view
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsInView(true);
          }, delayMs);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [delayMs]);

  const depthLayers = useMemo<DepthLayer[]>(
    () =>
      Array.from({ length: safeLayers }, (_, layerIndex) => {
        const index = safeLayers - layerIndex;
        return {
          index,
          color: getLayerColor(faceColor, depthColor, midColor, index, safeLayers),
          transform: `translateZ(${-index * safeDepth}px)`,
          collapsedTransform: `translateZ(0px)`
        };
      }),
    [safeLayers, safeDepth, faceColor, depthColor, midColor]
  );

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || typeof window === 'undefined') return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const canTrackPointer = pointerTracking && finePointer && !reducedMotion;

    let frameId = 0;
    let activePointer = false;
    let startTime = performance.now();
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const current = { ...baseRotation };
    const target = { ...baseRotation };

    const applyTransform = () => {
      stage.style.transform = getTransform(current.x, current.y);
    };

    if (reducedMotion) {
      stage.style.transform = getTransform(baseRotation.x, baseRotation.y);
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      activePointer = true;
      const x = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.8), -1, 1);
      const y = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.8), -1, 1);

      target.x = baseRotation.x - y * safeTilt;
      target.y = baseRotation.y + x * safeTilt;
    };

    const handlePointerLeave = () => {
      activePointer = false;
      target.x = baseRotation.x;
      target.y = baseRotation.y;
    };

    const handleScroll = () => {
      if (!scrollTracking) return;
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocity = clamp(delta * 0.35, -14, 14);
    };

    if (canTrackPointer) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerleave', handlePointerLeave);
      window.addEventListener('blur', handlePointerLeave);
    }

    if (scrollTracking) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    const tick = (now: number) => {
      // Apply scroll kinetic tilting
      if (Math.abs(scrollVelocity) > 0.01) {
        target.x = baseRotation.x - scrollVelocity * 0.75;
        target.y = baseRotation.y + scrollVelocity * 0.35;
        scrollVelocity *= 0.90; // smooth dampening
      }

      if ((!canTrackPointer || !activePointer) && autoOrbit) {
        const elapsed = (now - startTime) / 1000;
        const orbit = elapsed * safeOrbitSpeed * Math.PI * 2;
        const fallbackAmount = canTrackPointer ? 0.25 : 0.65;
        target.x += Math.sin(orbit) * safeTilt * fallbackAmount * 0.1;
        target.y += Math.cos(orbit * 0.85) * safeTilt * fallbackAmount * 0.1;
      }

      current.x += (target.x - current.x) * safeSmoothing;
      current.y += (target.y - current.y) * safeSmoothing;
      applyTransform();
      frameId = requestAnimationFrame(tick);
    };

    applyTransform();
    frameId = requestAnimationFrame(tick);

    return () => {
      if (canTrackPointer) {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', handlePointerLeave);
        window.removeEventListener('blur', handlePointerLeave);
      }
      if (scrollTracking) {
        window.removeEventListener('scroll', handleScroll);
      }
      cancelAnimationFrame(frameId);
      startTime = 0;
    };
  }, [autoOrbit, baseRotation, pointerTracking, scrollTracking, safeOrbitSpeed, safeSmoothing, safeTilt]);

  const rootStyle = {
    ...style,
    '--depth-text-perspective': `${safePerspective}px`,
    '--depth-text-font-size': fontSize,
    '--depth-text-font-weight': fontWeight,
    '--depth-text-face-color': faceColor,
    '--depth-text-depth-color': depthColor,
    '--depth-text-shadow': shadow && isInView
      ? `0 20px 30px color-mix(in srgb, ${depthColor} 30%, transparent), 0 4px 8px rgba(0, 0, 0, 0.15)`
      : 'none'
  } as CSSProperties;

  return (
    <span
      ref={rootRef}
      className={`depth-text ${isInView ? 'depth-text--in-view' : ''} ${className}`.trim()}
      style={rootStyle}
    >
      <span ref={stageRef} className="depth-text__stage">
        {depthLayers.map(layer => (
          <span
            aria-hidden="true"
            className="depth-text__layer"
            key={layer.index}
            style={{
              color: layer.color,
              transform: isInView ? layer.transform : layer.collapsedTransform
            }}
          >
            {text}
          </span>
        ))}
        <span className="depth-text__face">{text}</span>
      </span>
    </span>
  );
};

export default DepthText;
