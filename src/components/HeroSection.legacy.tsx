"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RetroComputer3D from "./RetroComputer3D";
import SiteHeader from "./SiteHeader";

gsap.registerPlugin(ScrollTrigger);

const ROWS = [
  { text: "adsmagnify" },
  { text: "adsmagnify" },
  { text: "adsmagnify" },
] as const;

const BLUE = "#004AAD";
const YELLOW = "#FFC619";
const YELLOW_HOT = "#FFC619";

function splitChars(text: string) {
  return text.split("").map((ch, i) => (
    <span
      key={`${ch}-${i}`}
      className="hero-char inline-block will-change-transform opacity-0"
      data-char={ch === " " ? " " : ch}
    >
      {ch === " " ? " " : ch}
    </span>
  ));
}

function mixHex(a: string, b: string, t: number) {
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}

/** Keep blends near pure blue/yellow so mids don't go muddy. */
function punchColor(from: string, to: string, t: number) {
  if (t < 0.38) return from;
  if (t > 0.62) return to;
  return mixHex(from, to, (t - 0.38) / 0.24);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cueRef = useRef<HTMLDivElement>(null);
  const zoomContainerRef = useRef<HTMLDivElement>(null);
  const websiteVideoRef = useRef<HTMLVideoElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const screenContainerRef = useRef<HTMLDivElement>(null);
  const crtOverlayRef = useRef<HTMLDivElement>(null);
  // Plain scroll-progress mirror (not React state) so the pointermove
  // handler can read it every frame without re-subscribing.
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let handleFirstScroll: (() => void) | null = null;
    let handlePointerMove: ((e: PointerEvent) => void) | null = null;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      if (cueRef.current) gsap.set(cueRef.current, { opacity: 0 });
      section.querySelectorAll(".hero-char").forEach((node) => {
        (node as HTMLElement).style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
      const chars0 = rows[0]?.querySelectorAll(".hero-char") ?? [];
      const chars1 = rows[1]?.querySelectorAll(".hero-char") ?? [];
      const chars2 = rows[2]?.querySelectorAll(".hero-char") ?? [];
      const allChars = Array.from(
        section.querySelectorAll(".hero-char")
      ) as HTMLElement[];

      gsap.set(cueRef.current, { opacity: 0 });

      const isMobile = window.innerWidth < 768;

      // The screen container is literally sized/curved to fit the video —
      // it's laid out full-bleed then scaled down (via a transform, not
      // width/height/top/left) to exactly the monitor's screen rect, with
      // rounded corners. Scrolling scales it back up to 1 (fullscreen),
      // straightening the corners to 0 as it goes — video and the CRT
      // overlay just fill it at 100%, so they scale along with it for
      // free. Scale + border-radius are both GPU-composited, so the zoom
      // stays smooth without touching layout on any frame.
      //
      // transformOrigin is derived, not eyeballed: for a full-bleed box
      // scaled by (scaleX, scaleY) around origin (originX%, originY%),
      // the box's rendered top-left corner lands at
      //   (originX * (1 - scaleX), originY * (1 - scaleY))
      // Solving that for the origin, given the target small-screen rect
      // below, means the container's rendered edges land exactly on the
      // monitor's screen rect at rest, and exactly fill the viewport
      // once scaled to 1.
      const screenRect = isMobile
        ? { left: 34.3, top: 31.5, width: 32.4, height: 29.0 }
        : { left: 38.35, top: 39.15, width: 24.3, height: 21.7 };
      const screenScaleX = screenRect.width / 100;
      const screenScaleY = screenRect.height / 100;
      const screenOriginX = screenRect.left / (1 - screenScaleX);
      const screenOriginY = screenRect.top / (1 - screenScaleY);

      gsap.set(screenContainerRef.current, {
        scaleX: screenScaleX,
        scaleY: screenScaleY,
        transformOrigin: `${screenOriginX}% ${screenOriginY}%`,
        // Compensated so the *rendered* corner reads as ~8px at this
        // scale — border-radius is defined in the full-bleed box's own
        // coordinate space, so it gets shrunk by the same scale transform.
        borderRadius: `${8 / screenScaleY}px`,
        visibility: "hidden",
      });
      gsap.set(websiteVideoRef.current, { opacity: 0 });
      gsap.set(crtOverlayRef.current, { opacity: 0 });
      gsap.set(canvasContainerRef.current, {
        scale: 1,
        opacity: 1,
      });

      // --- Intro: snappy stretch from right → left ---
      gsap.set(allChars, {
        opacity: 0,
        scaleX: 0.06,
        scaleY: 1,
        x: 36,
        transformOrigin: "100% 50%",
      });

      const startColorWave = () => {
        rows.forEach((row, rowIndex) => {
          const chars = Array.from(row.querySelectorAll(".hero-char")) as HTMLElement[];
          const blueFirst = rowIndex % 2 === 0;
          const from = blueFirst ? BLUE : YELLOW;
          const to = blueFirst ? YELLOW_HOT : BLUE;
          const state = { wave: 0 };

          const paint = () => {
            const n = Math.max(chars.length - 1, 1);
            chars.forEach((ch, i) => {
              const base = i / n;
              const t = (base + state.wave) % 1;
              const blend = t < 0.5 ? t * 2 : (1 - t) * 2;
              ch.style.color = punchColor(from, to, blend);
            });
          };

          paint();
          gsap.to(state, {
            wave: 1,
            duration: 3.2,
            repeat: -1,
            ease: "none",
            delay: rowIndex * 0.45,
            onUpdate: paint,
          });
        });
      };

      const intro = gsap.timeline({ delay: 0.12 });

      const topChars = Array.from(chars0) as HTMLElement[];
      const midChars = Array.from(chars1) as HTMLElement[];
      const botChars = Array.from(chars2) as HTMLElement[];

      const snapStretch = (chars: HTMLElement[], at: number) => {
        intro.to(
          chars,
          {
            opacity: 1,
            scaleX: 1,
            x: 0,
            duration: 0.52,
            stagger: { each: 0.036, from: "end" },
            ease: "power4.out",
          },
          at
        );
        intro.to(
          chars,
          {
            scaleX: 1.05,
            duration: 0.1,
            stagger: { each: 0.036, from: "end" },
            ease: "power2.out",
          },
          at + 0.4
        );
        intro.to(
          chars,
          {
            scaleX: 1,
            duration: 0.16,
            stagger: { each: 0.036, from: "end" },
            ease: "power3.out",
          },
          at + 0.5
        );
      };

      // Paint brand blue/yellow before motion so stretch isn't flat blue
      startColorWave();

      snapStretch(midChars, 0);
      snapStretch(topChars, 0.1);
      snapStretch(botChars, 0.18);

      intro.to(cueRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.15");

      // After a beat, same stretch but from the left expanding right
      const stretchRight = (chars: HTMLElement[], at: number) => {
        intro.set(chars, { transformOrigin: "0% 50%" }, at);
        intro.to(
          chars,
          {
            scaleX: 0.06,
            x: -36,
            duration: 0.28,
            stagger: { each: 0.036, from: "start" },
            ease: "power3.in",
          },
          at
        );
        intro.to(
          chars,
          {
            scaleX: 1,
            x: 0,
            duration: 0.52,
            stagger: { each: 0.036, from: "start" },
            ease: "power4.out",
          },
          at + 0.28
        );
        intro.to(
          chars,
          {
            scaleX: 1.05,
            duration: 0.1,
            stagger: { each: 0.036, from: "start" },
            ease: "power2.out",
          },
          at + 0.68
        );
        intro.to(
          chars,
          {
            scaleX: 1,
            duration: 0.16,
            stagger: { each: 0.036, from: "start" },
            ease: "power3.out",
          },
          at + 0.78
        );
      };

      // ~2.5s after load, stretch left → right
      stretchRight(midChars, 2.55);
      stretchRight(topChars, 2.65);
      stretchRight(botChars, 2.72);

      const zoomOriginY = isMobile ? "36.5%" : "40.4%";
      const finalScale = isMobile ? 5.2 : 4.6;

      const buildScrollTimeline = () => {
        // Reset to a clean resting pose so the zoom doesn't inherit intro mid-state
        gsap.set(allChars, { clearProps: "transform,filter" });
        gsap.set(allChars, {
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotate: 0,
          scale: 1,
          scaleX: 1,
          scaleY: 1,
          filter: "none",
        });
        gsap.set(rows, { clearProps: "transform" });

        // Paused, plain (non-scrubbed) timeline: instead of tying the zoom
        // to how far the user drags the scrollbar, a single scroll tick
        // plays the whole snap-to-fullscreen animation to completion.
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
          onUpdate: () => {
            scrollProgressRef.current = tl.progress();
          },
        });

        // Slowed down (rather than an instant cut) so the monitor itself
        // stays visible mid-zoom instead of being a blink-and-you-miss-it
        // flash — timeScale stretches every tween below proportionally,
        // in both play and reverse, so their relative pacing to each
        // other is untouched.
        tl.timeScale(0.6);

        // Video/CRT/monitor finish growing to fill the screen by the
        // halfway point, then just sit there full-size before fading.
        //
        // The screen container scales from its small monitor-screen size
        // up to 1 (full-bleed), corners un-rounding to 0 in step — a
        // single transform, not a width/height/top/left resize. Video and
        // the CRT overlay ride along as its children (each just fills the
        // container) instead of being tweened independently.
        tl.to(
          screenContainerRef.current,
          {
            scaleX: 1,
            scaleY: 1,
            borderRadius: "0px",
            duration: 0.5,
          },
          0
        );
        tl.set(screenContainerRef.current, { visibility: "visible" }, 0);

        tl.to(
          canvasContainerRef.current,
          {
            scale: finalScale,
            transformOrigin: `50% ${zoomOriginY}`,
            duration: 0.5,
          },
          0
        );

        tl.to(
          websiteVideoRef.current,
          {
            opacity: 1,
            duration: 0.45,
          },
          0.05
        );

        tl.to(
          crtOverlayRef.current,
          {
            opacity: 1,
            duration: 0.45,
          },
          0.05
        );

        tl.to(
          crtOverlayRef.current,
          {
            opacity: 0,
            duration: 0.16,
          },
          0.78
        );


        tl.to(rows[0], { xPercent: -14, yPercent: -6, opacity: 0.35, duration: 1 }, 0);
        tl.to(
          chars0,
          {
            y: (i: number) => -12 - i * 2.2,
            opacity: (i: number) => 0.25 + (i % 3) * 0.15,
            filter: "blur(1.5px)",
            stagger: { each: 0.02, from: "end" },
            duration: 1,
          },
          0
        );

        tl.to(
          rows[1],
          {
            letterSpacing: window.innerWidth < 768 ? "0.1em" : "0.22em",
            scale: 1.04,
            opacity: 0.95,
            duration: 1,
          },
          0
        );
        tl.to(
          chars1,
          {
            y: (i: number) => Math.sin(i * 0.7) * 18,
            opacity: 1,
            stagger: { each: 0.018, from: "center" },
            duration: 1,
          },
          0
        );

        tl.to(rows[2], { xPercent: 14, yPercent: 6, opacity: 0.35, duration: 1 }, 0);
        tl.to(
          chars2,
          {
            y: (i: number) => 10 + i * 2,
            opacity: (i: number) => 0.25 + ((chars2.length - i) % 3) * 0.15,
            filter: "blur(1.5px)",
            stagger: { each: 0.02, from: "start" },
            duration: 1,
          },
          0
        );

        tl.to(cueRef.current, { opacity: 0, y: 10, duration: 0.2 }, 0);

        // Snap based on live scroll direction across the whole pinned
        // range, not just a single boundary crossing — any scroll-down
        // tick plays the zoom-into-the-monitor-screen forward, and any
        // scroll-up tick reverses it, from wherever it currently is. That
        // way scrolling back snaps the video back into the monitor from
        // anywhere in the pinned section, not only once you've scrolled
        // all the way back to the very top. play()/reverse() are safe to
        // call repeatedly — GSAP just continues/redirects from the
        // timeline's current position instead of restarting.
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            if (self.direction === 1 && tl.progress() < 1) {
              tl.play();
            } else if (self.direction === -1 && tl.progress() > 0) {
              tl.reverse();
            }
          },
        });
      };

      let scrollTimelineBuilt = false;
      const buildScrollTimelineOnce = () => {
        if (scrollTimelineBuilt) return;
        scrollTimelineBuilt = true;
        buildScrollTimeline();
      };

      // Mouse-driven parallax tilt — desktop/pointer devices only. Gives the
      // monitor scene real depth (rotateX/Y against the perspective set on
      // the sticky wrapper). The kinetic type used to drift opposite the
      // tilt for a foreground/background cue, but that meant its resting
      // position shifted with the cursor instead of staying put — removed
      // so the wordmark holds its position regardless of hover.
      const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (supportsHover) {
        // quickTo's resetTo() looks up the prop-tween it created by exact
        // property name. GSAP normalizes "rotateX"/"rotateY" to the
        // canonical "rotationX"/"rotationY" internally, so asking quickTo
        // for the alias makes that lookup miss every time (logging "not
        // eligible for reset"). Using the canonical names keeps them equal.
        const rotateY = gsap.quickTo(zoomContainerRef.current, "rotationY", {
          duration: 0.8,
          ease: "power3.out",
        });
        const rotateX = gsap.quickTo(zoomContainerRef.current, "rotationX", {
          duration: 0.8,
          ease: "power3.out",
        });

        handlePointerMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;

          // The video/monitor's width/height tween runs from scroll
          // progress 0 to 0.5 (see buildScrollTimeline below) — once it's
          // full-bleed, tilting it on hover reads as broken rather than
          // playful, so the tilt is eased to zero over the back half of
          // that growth instead of continuing to full screen.
          const p = scrollProgressRef.current;
          const tiltFade = 1 - Math.min(1, Math.max(0, (p - 0.3) / 0.2));

          rotateY(nx * 9 * tiltFade);
          rotateX(-ny * 6 * tiltFade);
        };
        window.addEventListener("pointermove", handlePointerMove);
      }

      intro.eventCallback("onComplete", buildScrollTimelineOnce);

      const forceCompleteIntro = () => {
        if (!scrollTimelineBuilt) {
          intro.progress(1);
          buildScrollTimelineOnce();
        }
      };

      if (window.scrollY > 0) {
        forceCompleteIntro();
      } else {
        handleFirstScroll = () => {
          if (window.scrollY > 0) {
            forceCompleteIntro();
            if (handleFirstScroll) {
              window.removeEventListener("scroll", handleFirstScroll);
              handleFirstScroll = null;
            }
          }
        };
        window.addEventListener("scroll", handleFirstScroll);
      }
    }, section);

    return () => {
      if (handleFirstScroll) {
        window.removeEventListener("scroll", handleFirstScroll);
      }
      if (handlePointerMove) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[190vh] w-full">
      <div
        className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden text-[#0A1A3A] select-none"
        style={{
          perspective: "1400px",
          background: `
            radial-gradient(
              115% 90% at 0% 100%,
              rgba(255, 229, 102, 0.72) 0%,
              rgba(255, 236, 150, 0.42) 22%,
              rgba(255, 246, 210, 0.18) 42%,
              rgba(255, 252, 240, 0.06) 58%,
              rgba(255, 255, 255, 0) 72%
            ),
            radial-gradient(
              120% 95% at 100% 0%,
              rgba(107, 163, 224, 0.5) 0%,
              rgba(154, 196, 238, 0.28) 32%,
              rgba(201, 220, 248, 0.12) 55%,
              rgba(247, 250, 255, 0) 74%
            ),
            #ffffff
          `,
        }}
      >
        <SiteHeader theme="onLight" />

        {/* Kinetic background type — mobile: 1st clear above monitor, 2nd & 3rd behind it */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden font-boldonse select-none md:flex md:flex-col md:items-center md:justify-center md:gap-8 md:-translate-y-[8%]">
          {ROWS.map((row, i) => (
            <div
              key={i}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className={[
                "hero-blend-text origin-center inline-flex max-w-none flex-nowrap whitespace-nowrap font-bold uppercase tracking-[0.06em] will-change-transform drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]",
                "absolute left-1/2 -translate-x-1/2 scale-x-[1.12] scale-y-[1.32] text-[clamp(2.45rem,10vw,8.2rem)] leading-[1.05]",
                "sm:scale-x-[1.15] sm:scale-y-[1.35]",
                "md:relative md:left-auto md:top-auto md:translate-x-0 md:scale-x-[1.18] md:scale-y-[1.08] md:text-[clamp(2.9rem,7.4vw,8.2rem)] md:leading-[1.12]",
                i === 0 && "top-[max(5.25rem,16vh)] md:top-auto",
                i === 1 && "top-[calc(max(5.25rem,16vh)+1.85em)] md:top-auto",
                i === 2 && "top-[calc(max(5.25rem,16vh)+3.7em)] md:top-auto",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden
            >
              {splitChars(row.text)}
            </div>
          ))}
        </div>

        {/* Zoom viewport wrapper */}
        <div ref={zoomContainerRef} className="absolute inset-0 w-full h-full origin-center">
          {/* Retro computer canvas (z-10) */}
          <div ref={canvasContainerRef} className="absolute inset-0 z-10 w-full h-full">
            <main className="pointer-events-none absolute inset-0">
              <div className="pointer-events-auto absolute inset-0 flex items-end justify-center">
                <div className="relative flex h-full w-full items-end justify-center">
                  <RetroComputer3D />
                </div>
              </div>
            </main>
          </div>

          {/* Transparent container around the monitor's screen (z-20) —
              curved to fit it and scaled down to that exact rect (see the
              gsap.set/tl.to calls above), so video + CRT overlay grow and
              un-round together as one smooth transform instead of two
              separately resized boxes. */}
          <div
            ref={screenContainerRef}
            className="absolute inset-0 z-20 h-full w-full overflow-hidden bg-transparent"
          >
            {/* Website video playing ABOVE the monitor */}
            <video
              ref={websiteVideoRef}
              src="/video_website.mp4"
              loop
              muted
              playsInline
              autoPlay
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
            />

            {/* CRT Screen Overlay, above the video */}
            <div
              ref={crtOverlayRef}
              className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
              style={{
                // Kept deliberately subtle: this vignette looks like a nice CRT
                // curve at small monitor size, but the same rgba values read as
                // a hard dark band once the box is stretched to fill the whole
                // viewport — so it's toned way down to stay invisible at full
                // scale rather than timing its fade-out against everything else.
                background: `
                  radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 50%),
                  radial-gradient(circle at center, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.16) 100%),
                  repeating-linear-gradient(rgba(18, 16, 16, 0) 0px, rgba(18, 16, 16, 0.08) 2px, rgba(18, 16, 16, 0) 4px)
                `,
                backgroundSize: "100% 100%, 100% 100%, 100% 6px",
                boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.18)",
              }}
            />
          </div>
        </div>

        <div
          ref={cueRef}
          className="absolute bottom-6 right-6 z-20 flex flex-col items-center gap-2 text-[#0A1A3A]/40 md:right-10"
          aria-hidden
        >
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em]">
            Scroll
          </span>
          <span className="block h-8 w-px bg-gradient-to-b from-[#0A1A3A]/45 to-transparent" />
        </div>

        {/* Film grain — ties all the layers together with a shared texture */}
        <div className="hero-grain pointer-events-none absolute inset-0 z-[40] opacity-[0.05]" aria-hidden />
      </div>
    </section>
  );
}
