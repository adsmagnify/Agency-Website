"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export interface CarouselChannel {
  id: string;
  channelNum: string;
  title: string;
  category: string;
  metric: string;
  metricLabel: string;
  description: string;
  videoSrc: string;
  tags: string[];
}

const CHANNELS: CarouselChannel[] = [
  {
    id: "meta-ugc",
    channelNum: "CH 01",
    title: "Meta ASC+ & AI UGC Velocity",
    category: "E-Commerce & DTC Scale",
    metric: "4.2X",
    metricLabel: "Blended ROAS",
    description: "High-frequency UGC angle drops and Meta ASC+ broad optimization driving profitable returns at 7-figure ad spend.",
    videoSrc: "/video_website.mp4",
    tags: ["Meta Ads", "AI UGC", "Advantage+"],
  },
  {
    id: "showreel",
    channelNum: "CH 02",
    title: "AdsMagnify Master Showreel",
    category: "Full-Funnel Growth Engine",
    metric: "$40M+",
    metricLabel: "Spend Managed",
    description: "Omnichannel command across Google, Meta, and Marketplaces with unified creative attribution and rapid testing.",
    videoSrc: "/download.mp4",
    tags: ["Showreel", "Omnichannel", "Attribution"],
  },
  {
    id: "hook-velocity",
    channelNum: "CH 03",
    title: "High-Converting Creative Hooks",
    category: "Creative Architecture",
    metric: "+142%",
    metricLabel: "Avg Hook Rate",
    description: "Testing 20+ viral angles weekly to defeat creative fatigue and maintain low customer acquisition costs.",
    videoSrc: "/hf_20260805_120154_4254fd47-f15f-4b24-bac4-e10d1bd181c6.mp4",
    tags: ["Hook Engine", "Viral UGC", "CAC Cut"],
  },
  {
    id: "enterprise-scale",
    channelNum: "CH 04",
    title: "8-Figure Revenue Engine",
    category: "Enterprise Performance",
    metric: "5.1X",
    metricLabel: "Peak Campaign ROAS",
    description: "Server-side CAPI tracking, programmatic SEO moats, and automated CRM lead routing built for enterprise scale.",
    videoSrc: "/video_monitor(1).mp4",
    tags: ["CAPI Tracking", "Enterprise CRM", "Moats"],
  },
];

export default function TelevisionCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isTuning, setIsTuning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const screenRef = useRef<HTMLDivElement>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChannel = CHANNELS[currentIdx];
  const slideDuration = 7000;
  const progressStepMs = 50;

  const switchChannel = useCallback(
    (newIdx: number) => {
      if (newIdx === currentIdx || isTuning) return;

      setIsTuning(true);
      setProgress(0);

      if (screenRef.current) {
        gsap.to(screenRef.current, {
          scale: 0.985,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });
      }

      window.setTimeout(() => {
        setCurrentIdx(newIdx);
        setIsTuning(false);
      }, 200);
    },
    [currentIdx, isTuning]
  );

  const nextChannel = useCallback(() => {
    const nextIdx = (currentIdx + 1) % CHANNELS.length;
    switchChannel(nextIdx);
  }, [currentIdx, switchChannel]);

  const prevChannel = useCallback(() => {
    const prevIdx = (currentIdx - 1 + CHANNELS.length) % CHANNELS.length;
    switchChannel(prevIdx);
  }, [currentIdx, switchChannel]);

  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === currentIdx && isPlaying) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [currentIdx, isPlaying]);

  const togglePlay = () => {
    const activeVid = videoRefs.current[currentIdx];
    if (!activeVid) return;

    if (isPlaying) {
      activeVid.pause();
      setIsPlaying(false);
    } else {
      activeVid.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const activeVid = videoRefs.current[currentIdx];
    if (activeVid) {
      activeVid.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (progressStepMs / slideDuration) * 100;
        if (next >= 100) {
          nextChannel();
          return 0;
        }
        return next;
      });
    }, progressStepMs);

    progressTimerRef.current = interval;
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, nextChannel, slideDuration]);

  return (
    <div
      className="relative mx-auto w-full max-w-4xl px-2 sm:px-4 select-none flex flex-col items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG Clip Path for Authentic CRT Curved Screen Tube */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="crt-screen-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.045,0.05 C 0.25,0.015 0.75,0.015 0.955,0.05 C 0.99,0.22 0.99,0.78 0.955,0.95 C 0.75,0.985 0.25,0.985 0.045,0.95 C 0.01,0.78 0.01,0.22 0.045,0.05 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Main Vintage Television Housing (Engineered to fit in single viewport) */}
      <div className="relative w-full rounded-[1.8rem] sm:rounded-[2.2rem] bg-gradient-to-b from-[#111827] via-[#0b1120] to-[#050914] p-2.5 sm:p-4 crt-tube-container border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_35px_rgba(0,74,173,0.2)]">
        
        {/* TV Top Header Bar */}
        <div className="mb-2 sm:mb-2.5 flex items-center justify-between px-1.5 sm:px-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded bg-black/60 px-2 sm:px-2.5 py-0.5 border border-white/10">
              <span className="font-heading text-[10px] sm:text-xs font-black tracking-widest text-[#FFC619]">
                ADSMAGNIFY
              </span>
              <span className="text-[9px] font-semibold text-white/40 tracking-wider hidden sm:inline">
                TRINITRON
              </span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-[#004AAD]/25 border border-[#004AAD]/40 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#4CA3FF]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC619] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FFC619]"></span>
              </span>
              <span>LIVE REEL</span>
            </div>
          </div>

          {/* Channel Quick Switchers (Compact) */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 rounded-md bg-black/60 p-0.5 border border-white/10">
              {CHANNELS.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => switchChannel(idx)}
                  type="button"
                  className={`rounded px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold transition-all cursor-pointer ${
                    currentIdx === idx
                      ? "bg-[#FFC619] text-[#0A1A3A] shadow-[0_0_8px_rgba(255,198,25,0.4)]"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                  aria-label={`Tune to ${ch.channelNum}`}
                >
                  {ch.channelNum}
                </button>
              ))}
            </div>

            <button
              onClick={toggleMute}
              type="button"
              className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white transition-all hover:bg-white/20 cursor-pointer text-[10px] sm:text-xs"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
          </div>
        </div>

        {/* CRT Screen Display Tube (Bounded by SVG Curve) */}
        <div className="relative w-full aspect-[16/8.8] sm:aspect-[16/8.4] md:aspect-[16/8] max-h-[36vh] sm:max-h-[40vh] md:max-h-[44vh] overflow-hidden rounded-[1.3rem] sm:rounded-[1.6rem] bg-[#02050b] p-1.5 sm:p-2 shadow-inner">
          <div className="relative h-full w-full rounded-[1.2rem] bg-black overflow-hidden flex items-center justify-center">
            
            {/* The Barrel-Curved TV Screen */}
            <div
              ref={screenRef}
              style={{ clipPath: "url(#crt-screen-clip)" }}
              className="relative h-full w-full bg-[#050c1a] overflow-hidden flex items-center justify-center cursor-pointer"
              onClick={togglePlay}
            >
              {/* Video Slides */}
              {CHANNELS.map((ch, idx) => (
                <div
                  key={ch.id}
                  className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
                    currentIdx === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    src={ch.videoSrc}
                    loop
                    muted={isMuted}
                    playsInline
                    autoPlay={idx === 0}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}

              {/* Tuning Static Flash */}
              {isTuning && (
                <div className="crt-static-effect absolute inset-0 z-30 opacity-90 mix-blend-screen pointer-events-none" />
              )}

              {/* CRT Scanlines & Vignette */}
              <div className="crt-scanlines pointer-events-none absolute inset-0 z-20 opacity-25" />
              <div className="crt-vignette pointer-events-none absolute inset-0 z-20 opacity-80" />
              <div className="crt-glass-glare pointer-events-none absolute inset-0 z-20 opacity-55" />

              {/* Translucent Center Play Button (From Reference Image) */}
              <div
                className={`absolute inset-0 z-25 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
                  !isPlaying || isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_0_25px_rgba(0,0,0,0.6)]">
                  {isPlaying ? (
                    <span className="text-white text-base sm:text-lg font-black">❚❚</span>
                  ) : (
                    <span className="text-white text-lg sm:text-xl font-black ml-0.5">▶</span>
                  )}
                </div>
              </div>

              {/* Screen Top-Left Overlay */}
              <div className="pointer-events-none absolute top-2.5 left-4 sm:top-3.5 sm:left-5 z-25 flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-[#004AAD]/85 px-1.5 py-0.5 font-heading text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#FFC619]">
                    {currentChannel.channelNum}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    {currentChannel.title}
                  </span>
                </div>
              </div>

              {/* Screen Bottom-Right Key Metric Pill */}
              <div className="pointer-events-none absolute bottom-2.5 right-4 sm:bottom-3 sm:right-5 z-25 flex items-center gap-2 rounded-xl bg-black/75 border border-[#FFC619]/40 px-2.5 sm:px-3 py-1 backdrop-blur-md shadow-lg">
                <div className="font-heading text-sm sm:text-base md:text-lg font-black text-[#FFC619]">
                  {currentChannel.metric}
                </div>
                <div className="border-l border-white/20 pl-1.5 text-[8px] sm:text-[9px] font-bold uppercase text-white/90">
                  {currentChannel.metricLabel}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TV Bottom Quick Control & Autoplay Progress */}
        <div className="mt-2 sm:mt-2.5 flex items-center justify-between gap-3 px-1.5 sm:px-3">
          {/* Progress Bar */}
          <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#004AAD] to-[#FFC619] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Prev/Next Rocker Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={prevChannel}
              type="button"
              className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-black/60 border border-white/15 text-white transition-all hover:bg-white/20 cursor-pointer active:scale-95 text-[10px]"
              aria-label="Previous channel"
            >
              ◀
            </button>
            <button
              onClick={nextChannel}
              type="button"
              className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-black/60 border border-white/15 text-white transition-all hover:bg-white/20 cursor-pointer active:scale-95 text-[10px]"
              aria-label="Next channel"
            >
              ▶
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

