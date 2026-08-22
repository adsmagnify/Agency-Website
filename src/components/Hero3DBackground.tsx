"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Minimalist 3D Luxury Wave Field Background.
 * Pure undulating mathematical light wave in 3D perspective.
 * No geometric shape elements or floating crystals.
 */
export default function Hero3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, -8, 32);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 3D Flowing Mathematical Wave Mesh ---
    const waveRows = 45;
    const waveCols = 60;
    const waveCount = waveRows * waveCols;
    const waveGeometry = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(waveCount * 3);
    const waveColors = new Float32Array(waveCount * 3);

    const colorBlue = new THREE.Color("#004AAD");
    const colorCyan = new THREE.Color("#4CA3FF");
    const colorGold = new THREE.Color("#FFC619");

    let idx = 0;
    for (let i = 0; i < waveRows; i++) {
      for (let j = 0; j < waveCols; j++) {
        const u = (j / (waveCols - 1) - 0.5) * 65;
        const v = (i / (waveRows - 1) - 0.5) * 45;

        wavePositions[idx * 3] = u;
        wavePositions[idx * 3 + 1] = v;
        wavePositions[idx * 3 + 2] = 0;

        const blend = (u + 32) / 65;
        const col = new THREE.Color();
        if (blend < 0.75) {
          col.lerpColors(colorBlue, colorCyan, blend / 0.75);
        } else {
          col.lerpColors(colorCyan, colorGold, (blend - 0.75) / 0.25);
        }

        waveColors[idx * 3] = col.r;
        waveColors[idx * 3 + 1] = col.g;
        waveColors[idx * 3 + 2] = col.b;

        idx++;
      }
    }

    waveGeometry.setAttribute("position", new THREE.BufferAttribute(wavePositions, 3));
    waveGeometry.setAttribute("color", new THREE.BufferAttribute(waveColors, 3));

    // Particle Material with Soft Radial Point Glow
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.4, "rgba(255, 255, 255, 0.4)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const pointTexture = new THREE.CanvasTexture(canvas);

    const waveMaterial = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      map: pointTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    wavePoints.rotation.x = -Math.PI / 3.4;
    wavePoints.position.y = -6;
    scene.add(wavePoints);

    // --- Interactive Mouse Parallax Tracking ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- Resize Handling ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!reduceMotion) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.04;
        currentMouseY += (targetMouseY - currentMouseY) * 0.04;

        camera.position.x = currentMouseX * 2.5;
        camera.position.y = -8 - currentMouseY * 1.8;
        camera.lookAt(0, 0, 0);
      }

      // Animate 3D Wave Harmonics
      const positions = waveGeometry.attributes.position.array as Float32Array;
      let pIdx = 0;
      for (let i = 0; i < waveRows; i++) {
        for (let j = 0; j < waveCols; j++) {
          const u = positions[pIdx * 3];
          const v = positions[pIdx * 3 + 1];

          const waveZ =
            Math.sin(u * 0.14 + elapsedTime * 0.75) * 1.5 +
            Math.cos(v * 0.18 + elapsedTime * 0.55) * 1.3 +
            Math.sin((u + v) * 0.08 + elapsedTime * 0.35) * 0.7;

          positions[pIdx * 3 + 2] = waveZ;
          pIdx++;
        }
      }
      waveGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      pointTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none opacity-70"
      aria-hidden="true"
    />
  );
}
