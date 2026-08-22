"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_progress;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(0.80, 0.60, -0.60, 0.80);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = m * p * 2.02;
    a *= 0.5;
  }
  return v;
}

float smoother(float a, float b, float x) {
  float t = clamp((x - a) / (b - a), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (uv - 0.5) * vec2(u_res.x / u_res.y, 1.0);

  float t = u_time * 0.55;
  vec2 warp = vec2(
    fbm(p * 1.6 + vec2(t * 0.06, -t * 0.04)),
    fbm(p * 1.6 + vec2(-t * 0.05, t * 0.07) + 3.7)
  );
  vec2 q = p + (warp - 0.5) * (0.10 + u_progress * 0.12);

  float n = fbm(q * 2.4 + t * 0.05);
  float n2 = fbm(q * 5.2 - t * 0.08);

  float radius = mix(-0.16, 1.62, smoother(0.0, 1.0, u_progress));
  float dist = length(q) - n * 0.16 - n2 * 0.05;
  float edge = dist - radius;

  float hole = smoother(-0.22, 0.28, edge);
  float rim = (1.0 - smoother(-0.28, 0.22, abs(edge))) * hole;

  vec3 ink = vec3(0.039, 0.102, 0.227);
  vec3 deep = vec3(0.0, 0.20, 0.478);
  vec3 gold = vec3(1.0, 0.776, 0.098);
  vec3 fluid = mix(ink, deep, n * 0.55 + n2 * 0.25);
  fluid = mix(fluid, gold, rim * n2 * 0.08);

  vec3 col = mix(ink, fluid, rim * 0.85);
  float alpha = hole;

  if (u_progress < 0.16) {
    float seed = smoother(0.09, 0.0, length(q) - 0.05 - n * 0.03);
    col = mix(ink, fluid, seed * 0.9);
    alpha = mix(1.0, 0.92, seed * (u_progress / 0.16));
  }

  gl_FragColor = vec4(col, alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function FluidReveal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      wrap.style.display = "none";
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });
    if (!gl) {
      wrap.style.display = "none";
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uProgress = gl.getUniformLocation(prog, "u_progress");

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    fit();
    window.addEventListener("resize", fit);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const state = { progress: 0 };
    const t0 = performance.now();
    let raf = 0;
    let running = true;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const draw = () => {
      if (!running) return;
      raf = requestAnimationFrame(draw);
      const time = (performance.now() - t0) / 1000;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uProgress, state.progress);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    draw();

    const tl = gsap.timeline({
      onComplete: () => {
        running = false;
        cancelAnimationFrame(raf);
        document.body.style.overflow = prevOverflow;
        wrap.style.pointerEvents = "none";
        wrap.style.opacity = "0";
        window.setTimeout(() => {
          wrap.style.display = "none";
        }, 80);
      },
    });

    tl.to(state, { progress: 0.12, duration: 0.7, ease: "sine.out" });
    tl.to(
      state,
      {
        progress: 1,
        duration: 2.4,
        ease: "sine.inOut",
        onStart: () => {
          wrap.style.background = "transparent";
        },
      }
    );

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      tl.kill();
      window.removeEventListener("resize", fit);
      document.body.style.overflow = prevOverflow;
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[80] bg-[#0A1A3A]"
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
