"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RetroComputer3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 4.0);
    camera.lookAt(0, -0.04, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.opacity = "0";
    container.appendChild(renderer.domElement);

    const video = document.createElement("video");
    video.src = "/video_monitor_keyed.mp4";
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute("autoplay", "true");
    video.setAttribute("loop", "true");
    video.setAttribute("muted", "true");
    video.setAttribute("playsinline", "true");

    video.play().catch((err) => {
      console.warn("Video playback autoplay blocked or failed:", err);
    });

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.generateMipmaps = false;
    videoTexture.colorSpace = THREE.SRGBColorSpace;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D textureMap;
      varying vec2 vUv;

      void main() {
        vec4 texel = texture2D(textureMap, vUv);
        float r = texel.r;
        float g = texel.g;
        float b = texel.b;

        float maxRB = max(r, b);
        float greenExcess = g - maxRB;
        float greenRatio = g / max(r + g + b, 0.001);

        if (g > 0.45 && greenExcess > 0.18 && greenRatio > 0.45) {
          discard;
        }
        if (g > 0.75 && r < 0.28 && b < 0.28) {
          discard;
        }

        float keyAmount = smoothstep(0.12, 0.32, greenExcess);
        keyAmount = max(keyAmount, smoothstep(0.42, 0.62, greenRatio) * smoothstep(0.35, 0.7, g));

        if (keyAmount > 0.55) {
          discard;
        }

        float spill = clamp(greenExcess * 1.8, 0.0, 1.0) * (1.0 - keyAmount);
        vec3 rgb = vec3(r, mix(g, maxRB, spill * 0.85), b);

        gl_FragColor = vec4(rgb, 1.0 - keyAmount);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        textureMap: { value: videoTexture },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false,
    });

    const geometry = new THREE.PlaneGeometry(1, 1);
    const plane = new THREE.Mesh(geometry, material);
    plane.position.y = -0.12;
    scene.add(plane);

    let imgAspect = 1672 / 941;

    const updateSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      const isMobile = w < 768;
      let scaleWidth = 4.85;
      if (isMobile) {
        scaleWidth = (w / 100) * 0.84;
      } else {
        // limit the visual scale to 3.27 to match the original size on full-screen desktop canvas
        scaleWidth = Math.min(3.27, (w / h) * 1.85);
      }

      const scaleHeight = scaleWidth / imgAspect;
      plane.scale.set(scaleWidth, scaleHeight, 1);
    };

    const onMetadataLoaded = () => {
      if (video.videoWidth && video.videoHeight) {
        imgAspect = video.videoWidth / video.videoHeight;
        updateSize();
      }
    };

    video.addEventListener("loadedmetadata", onMetadataLoaded);
    if (video.readyState >= 1) {
      onMetadataLoaded();
    }

    updateSize();
    window.addEventListener("resize", updateSize);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        videoTexture.needsUpdate = true;
        if (renderer.domElement.style.opacity !== "1") {
          renderer.domElement.style.opacity = "1";
        }
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      video.removeEventListener("loadedmetadata", onMetadataLoaded);
      cancelAnimationFrame(animationFrameId);

      video.pause();
      video.src = "";
      video.load();

      geometry.dispose();
      material.dispose();
      videoTexture.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
