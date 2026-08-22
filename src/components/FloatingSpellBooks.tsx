"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FloatingSpellBooks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const book1Ref = useRef<HTMLDivElement>(null);
  const book2Ref = useRef<HTMLDivElement>(null);
  const book3Ref = useRef<HTMLDivElement>(null);
  const book4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const books = [book1Ref.current, book2Ref.current, book3Ref.current, book4Ref.current].filter(Boolean);
    if (books.length === 0) return;

    // Gentle organic floating levitation animation
    books.forEach((book, i) => {
      gsap.to(book, {
        y: i % 2 === 0 ? "-=12" : "+=10",
        rotation: i % 2 === 0 ? "+=1.5" : "-=1.5",
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 w-full h-full overflow-hidden select-none"
    >
      {/* ------------------------------------------------------------- */}
      {/* BOOK 1 (TOP-LEFT): OPEN ILLUSTRATED SPELLBOOK                 */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={book1Ref}
        className="pointer-events-auto absolute -top-4 -left-6 sm:top-6 sm:left-4 md:top-12 md:left-8 w-44 sm:w-56 md:w-64 aspect-[1.3/1] transition-transform duration-300 hover:scale-105 cursor-pointer"
        style={{
          transform: "rotate(-14deg)",
          filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))",
        }}
      >
        {/* Open Book Spread */}
        <div className="relative h-full w-full rounded-xl bg-[#2C482C] p-1.5 flex shadow-2xl">
          {/* Left Page */}
          <div className="h-full w-1/2 rounded-l-md bg-[#FFFDF5] p-2.5 sm:p-3.5 border-r border-amber-950/10 flex flex-col justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg">🍲</span>
              <span className="text-[7px] sm:text-[8px] font-mono text-slate-400">P. 12</span>
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-full" />
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-[85%]" />
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-[90%]" />
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-[70%]" />
            </div>
            <span className="text-[6px] sm:text-[7px] font-mono text-slate-400">✦ SPELL ARCHITECTURE</span>
          </div>

          {/* Right Page */}
          <div className="h-full w-1/2 rounded-r-md bg-[#FFF9EE] p-2.5 sm:p-3.5 flex flex-col justify-between">
            <div className="space-y-1 sm:space-y-1.5">
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-[95%]" />
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-[80%]" />
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-[90%]" />
            </div>
            {/* Illustrated Magic Hand Sketch */}
            <div className="my-auto flex justify-center text-xl sm:text-2xl text-slate-900">
              ✋
            </div>
            <span className="text-[6px] sm:text-[7px] font-mono text-slate-400 text-right">P. 13</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOOK 2 (TOP-RIGHT): BURGUNDY LEATHER EMBOSSED HARDCOVER       */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={book2Ref}
        className="pointer-events-auto absolute -top-4 -right-6 sm:top-6 sm:right-6 md:top-10 md:right-12 w-32 sm:w-40 md:w-48 aspect-[1/1.3] transition-transform duration-300 hover:scale-105 cursor-pointer"
        style={{
          transform: "rotate(16deg)",
          filter: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.2))",
        }}
      >
        <div className="relative h-full w-full rounded-r-2xl rounded-l-sm bg-[#8B2323] p-3 sm:p-4 border-l-4 border-[#5E1616] text-[#F3C562] flex flex-col justify-between shadow-2xl overflow-hidden">
          {/* Gold Embossed Frame */}
          <div className="absolute inset-2 border border-[#F3C562]/60 rounded-xl pointer-events-none" />
          <div className="absolute inset-3 border border-[#F3C562]/30 rounded-lg pointer-events-none" />

          {/* Book Header */}
          <div className="text-center pt-2 z-10">
            <span className="font-serif italic text-lg sm:text-2xl md:text-3xl font-normal block leading-tight tracking-wide drop-shadow-sm">
              Design
            </span>
            <span className="font-serif italic text-lg sm:text-2xl md:text-3xl font-normal block leading-tight tracking-wide drop-shadow-sm">
              Spells
            </span>
          </div>

          {/* Center Emblem */}
          <div className="text-center z-10 my-auto">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#F3C562]/80 uppercase block">
              Book III
            </span>
            <span className="text-base sm:text-lg block mt-1">
              🔥
            </span>
          </div>

          <div className="text-center z-10 pb-1">
            <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-[#F3C562]/60">
              ADSMAGNIFY • ED.
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOOK 3 (BOTTOM-LEFT): SAPPHIRE BLUE EMBOSSED LEATHER BOOK    */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={book3Ref}
        className="pointer-events-auto absolute bottom-24 -left-6 sm:bottom-28 sm:left-6 md:bottom-32 md:left-12 w-32 sm:w-40 md:w-48 aspect-[1/1.3] transition-transform duration-300 hover:scale-105 cursor-pointer hidden sm:block"
        style={{
          transform: "rotate(-18deg)",
          filter: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.2))",
        }}
      >
        <div className="relative h-full w-full rounded-r-2xl rounded-l-sm bg-[#1E4D7A] p-3 sm:p-4 border-l-4 border-[#12314F] text-[#E8D499] flex flex-col justify-between shadow-2xl overflow-hidden">
          {/* Gold Embossed Frame */}
          <div className="absolute inset-2 border border-[#E8D499]/60 rounded-xl pointer-events-none" />
          <div className="absolute inset-3 border border-[#E8D499]/30 rounded-lg pointer-events-none" />

          {/* Book Header */}
          <div className="text-center pt-2 z-10">
            <span className="font-serif italic text-lg sm:text-2xl md:text-3xl font-normal block leading-tight tracking-wide drop-shadow-sm">
              Growth
            </span>
            <span className="font-serif italic text-lg sm:text-2xl md:text-3xl font-normal block leading-tight tracking-wide drop-shadow-sm">
              Spells
            </span>
          </div>

          {/* Center Emblem */}
          <div className="text-center z-10 my-auto">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#E8D499]/80 uppercase block">
              Book IV
            </span>
            <span className="text-base sm:text-lg block mt-1">
              ✦
            </span>
          </div>

          <div className="text-center z-10 pb-1">
            <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-[#E8D499]/60">
              SCALE & DATA
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOOK 4 (BOTTOM-RIGHT): OPEN NOTEBOOK WITH PURPLE RIBBON      */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={book4Ref}
        className="pointer-events-auto absolute bottom-24 -right-6 sm:bottom-28 sm:right-6 md:bottom-32 md:right-12 w-44 sm:w-56 md:w-64 aspect-[1.3/1] transition-transform duration-300 hover:scale-105 cursor-pointer hidden sm:block"
        style={{
          transform: "rotate(14deg)",
          filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))",
        }}
      >
        <div className="relative h-full w-full rounded-xl bg-[#6B21A8] p-1.5 flex shadow-2xl">
          {/* Left Page */}
          <div className="h-full w-1/2 rounded-l-md bg-[#FFFDF7] p-2.5 sm:p-3.5 border-r border-purple-950/10 flex flex-col justify-between">
            <div className="space-y-1 sm:space-y-1.5">
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-[90%]" />
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-full" />
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-[75%]" />
            </div>
            {/* Illustrated Mouse / Magic Scroll */}
            <div className="my-auto flex justify-center text-xl sm:text-2xl">
              🖱️
            </div>
            <span className="text-[6px] sm:text-[7px] font-mono text-slate-400">P. 88</span>
          </div>

          {/* Right Page */}
          <div className="h-full w-1/2 rounded-r-md bg-[#FFF9EE] p-2.5 sm:p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[7px] sm:text-[8px] font-mono text-slate-400">✦ METRICS</span>
              <span className="text-[8px] sm:text-[10px]">✨</span>
            </div>
            <div className="space-y-1 sm:space-y-1.5 my-auto">
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-full" />
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-[85%]" />
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-[95%]" />
              <div className="h-1 sm:h-1.5 bg-slate-800/80 rounded w-[60%]" />
            </div>
            <span className="text-[6px] sm:text-[7px] font-mono text-slate-400 text-right">P. 89</span>
          </div>
        </div>
      </div>
    </div>
  );
}
