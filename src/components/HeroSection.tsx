"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Link from "next/link";
import GlobeCarousel from "./GlobeCarousel";
import MagneticButton from "./MagneticButton";
import Lens from "./Lens";
import Hero3DBackground from "./Hero3DBackground";
import Noise from "./Noise";
import OptionWheel from "./OptionWheel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let splitSubheadline: SplitText | null = null;

    const ctx = gsap.context(() => {
      splitSubheadline = new SplitText(".hero-desc", {
        type: "words",
        wordsClass: "desc-split-word",
      });

      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Ultra-Smooth Fluid Letter Entrance
      tl.fromTo(
        ".hero-char",
        {
          y: 35,
          opacity: 0,
          rotateX: 25,
          filter: "blur(8px)",
          transformOrigin: "50% 100%",
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.0,
          stagger: 0.02,
          ease: "power3.out",
        }
      );

      // 2. Continuous Ambient Floating Shimmer on "magnifies"
      gsap.to(".hero-accent-text", {
        textShadow: "0 0 20px rgba(76, 163, 255, 0.45), 0 0 35px rgba(0, 74, 173, 0.25)",
        repeat: -1,
        yoyo: true,
        duration: 2.2,
        ease: "sine.inOut",
      });

      // 3. Sparkles Entrance & Continuous Floating Physics
      tl.fromTo(
        ".sparkle-item",
        { scale: 0, opacity: 0, rotation: -90 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(2.2)",
        },
        "-=0.45"
      );

      gsap.to(".sparkle-1", {
        y: -5,
        rotation: 15,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: "sine.inOut",
      });

      gsap.to(".sparkle-2", {
        scale: 1.25,
        opacity: 0.9,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
      });

      gsap.to(".sparkle-3", {
        rotation: 360,
        repeat: -1,
        duration: 6,
        ease: "none",
      });

      // 4. Smooth Underline Draw on "magnifies"
      tl.fromTo(
        ".magnify-underline",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.9, ease: "power3.out" },
        "-=0.6"
      );

      // 5. Subheadline Stagger via SplitText Words
      if (splitSubheadline.words && splitSubheadline.words.length > 0) {
        tl.fromTo(
          splitSubheadline.words,
          { y: 16, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.012,
            ease: "power3.out",
          },
          "-=0.6"
        );
      }

      // 6. CTA Buttons Smooth Reveal
      tl.fromTo(
        ".hero-ctas",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
        "-=0.5"
      );

      // 7. 3D Globe Smooth Float-In
      tl.fromTo(
        ".hero-globe",
        { y: 30, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=0.6"
      );
    }, section);

    return () => {
      ctx.revert();
      if (splitSubheadline) splitSubheadline.revert();
    };
  }, []);

  const headlineWords = [
    { text: "Marketing", isAccent: false },
    { text: "that", isAccent: false },
    { text: "magnifies", isAccent: true },
    { text: "every", isAccent: false },
    { text: "dollar", isAccent: false },
    { text: "you", isAccent: false },
    { text: "spend", isAccent: false },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAF9F6] text-[#0A1A3A] overflow-x-hidden overflow-y-visible flex flex-col justify-between select-none"
      style={{
        background: `
          radial-gradient(100% 55% at 50% 0%, rgba(0, 74, 173, 0.05) 0%, rgba(250, 249, 246, 0) 70%),
          #FAF9F6
        `,
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 3D INTERACTIVE LUXURY BACKGROUND & TOP NOISE GRAIN             */}
      {/* ------------------------------------------------------------- */}
      <Hero3DBackground />

      {/* Cinematic Animated Film Grain / Noise Overlay with Seamless Feathered Gradient Blend */}
      <div
        className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden z-10 opacity-60"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0) 75%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0) 75%)",
        }}
      >
        <Noise
          patternSize={250}
          patternScaleX={2}
          patternScaleY={2}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RESPONSIVE LUXURY HEADER (Mobile: Left Logo, Desktop: Center)  */}
      {/* ------------------------------------------------------------- */}
      <header className="relative z-30 w-full px-4 sm:px-12 py-3 sm:py-5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Side: Desktop Audit CTA Button (Hidden on Mobile) */}
        <div className="hidden sm:flex items-center gap-3 w-1/4 justify-start">
          <a
            href="mailto:adsmagnify@gmail.com"
            data-cursor-text="AUDIT"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 hover:bg-[#004AAD] hover:text-white hover:border-[#004AAD] text-[#0A1A3A] px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs backdrop-blur-sm"
          >
            <span>Get a Free Audit</span>
            <span>→</span>
          </a>
        </div>

        {/* Logo: Sits cleanly on the left for Mobile (<sm), Centered for Desktop (sm+) */}
        <div className="flex items-center justify-start sm:justify-center shrink-0 sm:w-2/4">
          <Link href="/" className="inline-flex items-center group">
            <img
              src="/full_logo.svg"
              alt="AdsMagnify"
              className="h-6 xs:h-7 sm:h-11 md:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Right Side: Direct Interactive OptionWheel (Clean Bounds, Inward Curve) */}
        <div className="flex items-center justify-end flex-1 sm:flex-initial sm:w-1/4">
          <div className="relative w-[135px] xs:w-[155px] sm:w-[220px] md:w-[260px] h-[52px] sm:h-[80px] flex items-center justify-end overflow-hidden">
            <OptionWheel
              items={["Why Us", "How We Work", "Case Studies", "Contact"]}
              side="right"
              spacing={1.3}
              tilt={6}
              curve={0.9}
              textColor="#94a3b8"
              activeColor="#004AAD"
              loop={false}
              onSelect={(index, item) => {
                if (item === "Why Us") {
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                } else if (item === "How We Work") {
                  document.querySelector("#growth-roadmap")?.scrollIntoView({ behavior: "smooth" });
                } else if (item === "Case Studies") {
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                } else if (item === "Contact") {
                  window.location.href = "mailto:adsmagnify@gmail.com";
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* HERO HEADLINE, DESCRIPTIVE COPY & CTAS                         */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 w-full px-3 sm:px-6 max-w-4xl mx-auto text-center flex flex-col items-center pt-2 sm:pt-4 pb-2">
        
        {/* Interactive Magnifying Glass Lens with Responsive Headline */}
        <Lens lensSize={190} maxStretch={1.38} radius={120} className="w-full">
          <h1
            className="font-serif text-[1.95rem] xs:text-[2.35rem] sm:text-4xl md:text-5xl lg:text-[4.6rem] font-normal leading-[1.15] sm:leading-[1.18] tracking-tight text-[#0A1A3A] max-w-[22ch] mx-auto py-1 sm:py-2"
            style={{ perspective: "1000px" }}
          >
            {headlineWords.map((word, wIdx) => {
              const chars = word.text.split("");

              if (word.isAccent) {
                return (
                  <span
                    key={wIdx}
                    className="inline-block relative mx-1 sm:mx-2 px-1 sm:px-2 py-0.5 align-baseline tracking-[0.02em]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Glowing Accent Letters */}
                    <span className="hero-accent-text italic font-normal text-[#004AAD] inline-block pr-1.5 sm:pr-3 relative z-10 drop-shadow-[0_2px_12px_rgba(0,74,173,0.18)]">
                      {chars.map((char, cIdx) => (
                        <span
                          key={cIdx}
                          className="proxi-char hero-char inline-block will-change-transform"
                          style={{
                            transformOrigin: "center center",
                            transition: "transform 0.06s ease-out, padding 0.06s ease-out, letter-spacing 0.06s ease-out",
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>

                    {/* Sparkle 1: Top Right Gold Star */}
                    <span className="sparkle-item sparkle-1 pointer-events-none absolute -top-3 -right-3 text-[#FFC619] text-sm sm:text-xl select-none z-20">
                      ✦
                    </span>

                    {/* Sparkle 2: Top Left Cyan Mini Star */}
                    <span className="sparkle-item sparkle-2 pointer-events-none absolute -top-2 -left-2 text-[#4CA3FF] text-xs sm:text-base select-none z-20">
                      ✧
                    </span>

                    {/* Sparkle 3: Bottom Right Gold Micro Sparkle */}
                    <span className="sparkle-item sparkle-3 pointer-events-none absolute -bottom-1.5 -right-1.5 text-[#FFC619] text-xs sm:text-sm select-none z-20">
                      ⋆
                    </span>

                    {/* Decorative Gradient Underline */}
                    <span className="magnify-underline pointer-events-none absolute -bottom-0.5 left-1 right-2 sm:right-3 h-[2.5px] bg-gradient-to-r from-[#004AAD] via-[#4CA3FF] to-[#FFC619] rounded-full" />
                  </span>
                );
              }

              return (
                <span
                  key={wIdx}
                  className="inline-block mx-1 sm:mx-2 whitespace-nowrap tracking-[0.02em]"
                >
                  {chars.map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="proxi-char hero-char inline-block will-change-transform"
                      style={{
                        transformOrigin: "center center",
                        transition: "transform 0.06s ease-out, padding 0.06s ease-out, letter-spacing 0.06s ease-out",
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              );
            })}
          </h1>
        </Lens>

        {/* Detailed Value Proposition Subtext (Zero Margin Overflow) */}
        <p className="hero-desc mt-3 sm:mt-4 max-w-[56ch] text-[12.5px] sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed px-2 sm:px-0">
          Adsmagnify is a performance marketing agency for ambitious brands—performance marketing, search engine optimization, website development, CRM development with AI integration, and generative AI with UGC & TVC ads, built to scale profitably.
        </p>

        {/* Rock-Solid Stable CTA Buttons */}
        <div className="hero-ctas mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full px-2">
          <MagneticButton strength={0.18}>
            <a
              href="mailto:adsmagnify@gmail.com"
              data-cursor-text="AUDIT"
              className="inline-flex items-center gap-2 rounded-full bg-[#004AAD] hover:bg-[#003B8A] text-white px-5 sm:px-7 py-2.5 sm:py-3 text-xs font-black uppercase tracking-[0.15em] shadow-md shadow-[#004AAD]/20 transition-colors duration-200"
            >
              <span>Get a Free Growth Audit</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </MagneticButton>

          <MagneticButton strength={0.18}>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-5 sm:px-7 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-200 shadow-xs"
            >
              <span>See Our Results</span>
              <span>↗</span>
            </a>
          </MagneticButton>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3D GLOBE CLIENT NETWORK (Mobile: Horizon Arc Arc View)         */}
      {/* ------------------------------------------------------------- */}
      <div className="hero-globe relative z-20 w-full flex flex-col items-center justify-start overflow-hidden pt-1 pb-0 sm:pb-6 px-2 sm:px-4">
        <p className="text-[11px] sm:text-[13px] font-normal tracking-wide text-slate-500 mb-1 text-center px-4 max-w-lg">
          Managing active growth campaigns across <span className="text-[#0A1A3A] font-semibold">Mumbai</span>, <span className="text-[#0A1A3A] font-semibold">Dubai</span>, <span className="text-[#0A1A3A] font-semibold">London</span>, <span className="text-[#0A1A3A] font-semibold">New York</span> & beyond
        </p>

        {/* Clean Horizon Viewport: Crops the bottom half on mobile to guarantee horizon arc */}
        <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-4xl h-[210px] xs:h-[240px] sm:h-auto overflow-hidden flex items-start justify-center">
          <GlobeCarousel className="w-full" />
        </div>
      </div>

    </section>
  );
}
