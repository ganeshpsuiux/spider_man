"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundManager } from "@/lib/sound";

gsap.registerPlugin(ScrollTrigger);

const SPREADS = [
  {
    id: 0,
    title: "Spiderverse Concept & Multiverse Origin",
    page: "Page 01 · Cover Spread",
    image: "/sketchbook/spread_0.png",
  },
  {
    id: 1,
    title: "About Us & Career Counselling UX",
    page: "Pages 02 & 03 · Wireframes",
    image: "/sketchbook/spread_1.png",
  },
  {
    id: 2,
    title: "Study Abroad & Language Architecture",
    page: "Pages 04 & 05 · Design System",
    image: "/sketchbook/spread_2.png",
  },
  {
    id: 3,
    title: "Kinetic UI Experiments & Spatial Nodes",
    page: "Pages 06 & 07 · Final Deliverables",
    image: "/sketchbook/spread_3.png",
  },
];

export const WebglPlaygroundSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isBgmActive, setIsBgmActive] = useState(false);
  const [activeSoundName, setActiveSoundName] = useState<string | null>(null);

  useEffect(() => {
    const unsub = soundManager.subscribe((enabled) => {
      setIsBgmActive(enabled);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const bentoCards = container.querySelectorAll(".playground-bento-card");
      gsap.fromTo(
        bentoCards,
        { opacity: 0, y: 45, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    soundManager.playHudBeep(1400);
    navigator.clipboard.writeText("ganeshpsuiux@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleNextSpread = () => {
    soundManager.playWhoosh();
    setSpreadIndex((prev) => (prev + 1) % SPREADS.length);
  };

  const handlePrevSpread = () => {
    soundManager.playWhoosh();
    setSpreadIndex((prev) => (prev - 1 + SPREADS.length) % SPREADS.length);
  };

  const triggerSound = (name: string, fn: () => void) => {
    setActiveSoundName(name);
    fn();
    setTimeout(() => setActiveSoundName(null), 800);
  };

  return (
    <section
      ref={containerRef}
      id="webgl-playground-section"
      className="relative w-full bg-[#030305] text-white py-24 lg:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
    >
      {/* Top Divider with subtle chromatic shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 via-red-500/40 to-transparent" />

      {/* Atmospheric Nebula Glows */}
      <div className="absolute top-1/4 left-1/3 w-[800px] h-[550px] bg-cyan-600/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[750px] h-[500px] bg-red-600/[0.05] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="w-full text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-[11px] font-mono tracking-widest uppercase text-red-400 mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            03 / INTERACTIVE WEBGL & 3D PLAYGROUND
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-[1.15]"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Where Curious Code Meets Tactile Physics.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Interactive toys, 3D sketchbook flipbook, real-time Web Audio synthesizers, and creative engineering experiments.
          </p>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-24">
          
          {/* Card A: 3D Interactive Sketchbook Flipbook (Cols 1-7) */}
          <div className="playground-bento-card md:col-span-7 rounded-[32px] p-6 sm:p-8 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.12] hover:border-white/[0.25] transition-all duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex flex-col justify-between opacity-0 will-change-transform">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                  ✦ 3D VISUAL ARCHIVE
                </span>
                <h3
                  className="text-xl font-bold text-white mt-1"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  Interactive Sketchbook Spread
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevSpread}
                  className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/15 flex items-center justify-center text-xs text-zinc-300 transition-all active:scale-90"
                >
                  ←
                </button>
                <button
                  onClick={handleNextSpread}
                  className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/15 flex items-center justify-center text-xs text-zinc-300 transition-all active:scale-90"
                >
                  →
                </button>
              </div>
            </div>

            {/* High-res Spread Canvas Frame */}
            <div className="relative my-6 aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-inner">
              <img
                src={SPREADS[spreadIndex].image}
                alt={SPREADS[spreadIndex].title}
                className="w-full h-full object-cover object-center filter contrast-[1.04] transition-all duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <span>{SPREADS[spreadIndex].page}</span>
                <span className="text-cyan-400 truncate max-w-[200px]">
                  {SPREADS[spreadIndex].title}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/[0.06]">
              <span>REAL SPREADS FROM GANESH’S ARCHIVE</span>
              <button
                onClick={handleNextSpread}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>NEXT SPREAD</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Card B: Web Audio API Soundboard Lab (Cols 8-12) */}
          <div className="playground-bento-card md:col-span-5 rounded-[32px] p-6 sm:p-8 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.12] hover:border-white/[0.25] transition-all duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex flex-col justify-between opacity-0 will-change-transform">
            <div className="pb-4 border-b border-white/[0.08]">
              <span className="text-xs font-mono tracking-widest text-red-400 uppercase">
                ✦ SYNTHESIZER LAB
              </span>
              <h3
                className="text-xl font-bold text-white mt-1"
                style={{ fontFamily: "var(--font-sora), sans-serif" }}
              >
                Spider-Sense Sound FX
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Pure procedural Web Audio API waveforms.
              </p>
            </div>

            {/* Soundboard Trigger Buttons */}
            <div className="grid grid-cols-2 gap-3 my-6">
              <button
                onClick={() => triggerSound("THWIP!", () => soundManager.playThwip())}
                className="p-4 rounded-2xl bg-white/[0.04] hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 text-left transition-all duration-300 active:scale-95 group"
              >
                <div className="text-xs font-mono text-red-400">01 / WEB SHOOT</div>
                <div className="text-lg font-bold text-white mt-1">THWIP! 🕸️</div>
                <div className="text-[10px] font-mono text-zinc-400 mt-1">White noise ramp</div>
              </button>

              <button
                onClick={() => triggerSound("GLITCH", () => soundManager.playGlitch())}
                className="p-4 rounded-2xl bg-white/[0.04] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 text-left transition-all duration-300 active:scale-95 group"
              >
                <div className="text-xs font-mono text-cyan-400">02 / DIMENSION</div>
                <div className="text-lg font-bold text-white mt-1">GLITCH ⚡</div>
                <div className="text-[10px] font-mono text-zinc-400 mt-1">Square wave pulse</div>
              </button>

              <button
                onClick={() => triggerSound("HUD BEEP", () => soundManager.playHudBeep(1200))}
                className="p-4 rounded-2xl bg-white/[0.04] hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/50 text-left transition-all duration-300 active:scale-95 group"
              >
                <div className="text-xs font-mono text-amber-400">03 / TACTILE</div>
                <div className="text-lg font-bold text-white mt-1">HUD BEEP 🔊</div>
                <div className="text-[10px] font-mono text-zinc-400 mt-1">Sine feedback</div>
              </button>

              <button
                onClick={() => soundManager.toggleBgm()}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 active:scale-95 ${
                  isBgmActive
                    ? "bg-emerald-500/20 border-emerald-500/60"
                    : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10"
                }`}
              >
                <div className="text-xs font-mono text-emerald-400">04 / THEME</div>
                <div className="text-lg font-bold text-white mt-1">
                  {isBgmActive ? "BGM PLAYING ♫" : "BGM MUTED 🔇"}
                </div>
                <div className="text-[10px] font-mono text-zinc-400 mt-1">Click to toggle</div>
              </button>
            </div>

            {/* Live Audio Status */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/[0.06]">
              <span>STATUS:</span>
              <span className="text-emerald-400">
                {activeSoundName ? `FIRED: ${activeSoundName}` : "READY TO TRIGGER"}
              </span>
            </div>
          </div>

          {/* Card C: "My Stuffs" Archive Box (Cols 1-6) */}
          <div className="playground-bento-card md:col-span-6 rounded-[32px] p-6 sm:p-8 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.12] hover:border-white/[0.25] transition-all duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex flex-col justify-between opacity-0 will-change-transform">
            <div className="pb-4 border-b border-white/[0.08]">
              <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
                ✦ TACTILE NOSTALGIA
              </span>
              <h3
                className="text-xl font-bold text-white mt-1"
                style={{ fontFamily: "var(--font-sora), sans-serif" }}
              >
                The Origin Archive Box
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                BMW M4 GT3 Hot Wheels · Spider-Man Mask · P-Zero Tyre
              </p>
            </div>

            <div className="relative my-4 aspect-[16/11] w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 group flex items-center justify-center">
              <img
                src="/assets/stuff_box.png"
                alt="My Stuffs Archive Box"
                className="w-full h-full object-contain filter contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono bg-black/60 border border-white/15 text-zinc-300">
                ITEM #73/250 HW STARTING GRID
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/[0.06]">
              <span>FROM M.COM TO CREATIVE DIRECTION</span>
              <span className="text-amber-300">SAME GUY, BIGGER STORY</span>
            </div>
          </div>

          {/* Card D: Live Vibe-Code Terminal (Cols 7-12) */}
          <div className="playground-bento-card md:col-span-6 rounded-[32px] p-6 sm:p-8 bg-[#0a0a0f] backdrop-blur-2xl border border-white/[0.12] hover:border-white/[0.25] transition-all duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex flex-col justify-between opacity-0 will-change-transform">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-zinc-400 ml-2">gg-creative-stack.ts</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                TURBOPACK 764ms
              </span>
            </div>

            <div className="font-mono text-xs sm:text-[13px] text-zinc-300 leading-relaxed my-4 p-4 rounded-2xl bg-black/60 border border-white/[0.06] overflow-x-auto">
              <p className="text-zinc-500">// Ganesh&apos;s Creative Engineering Formula</p>
              <p className="mt-1">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-cyan-400">craft</span> = {"{"}
              </p>
              <p className="pl-4">
                design: [<span className="text-amber-300">&apos;Figma&apos;</span>, <span className="text-amber-300">&apos;Design Systems&apos;</span>, <span className="text-amber-300">&apos;Spatial UI&apos;</span>],
              </p>
              <p className="pl-4">
                motion: [<span className="text-amber-300">&apos;GSAP ScrollTrigger&apos;</span>, <span className="text-amber-300">&apos;Three.js WebGL&apos;</span>],
              </p>
              <p className="pl-4">
                frontend: [<span className="text-amber-300">&apos;Next.js 16&apos;</span>, <span className="text-amber-300">&apos;Tailwind CSS&apos;</span>, <span className="text-amber-300">&apos;Turbopack&apos;</span>],
              </p>
              <p className="pl-4">
                philosophy: <span className="text-emerald-400">&apos;By Bringing Pixels To Life.&apos;</span>
              </p>
              <p>{"};"}</p>
              <p className="mt-2 text-zinc-400">
                <span className="text-cyan-400">craft</span>.ship(<span className="text-purple-300">&apos;uncompromising_quality&apos;</span>);
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/[0.06]">
              <span>ZERO DEPENDENCY BLOAT</span>
              <span className="text-zinc-300">100% PRODUCTION READY</span>
            </div>
          </div>

        </div>

        {/* ──────── THE ULTIMATE COLLAB BRIDGE & FOOTER ──────── */}
        <div className="w-full pt-16 lg:pt-24 border-t border-white/[0.10] flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-[11px] font-mono tracking-widest uppercase text-cyan-400 mb-6 backdrop-blur-md">
            ✦ READY TO BRING PIXELS TO LIFE?
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08] mb-6"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Have an idea? Let&apos;s build something impossible.
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mb-8 font-normal">
            Available for select product design leadership, design system architecture, and creative technologist collaborations.
          </p>

          {/* Interactive Email Copy Button */}
          <div className="mb-12">
            <button
              onClick={handleCopyEmail}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm sm:text-base font-mono transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:shadow-[0_0_60px_rgba(0,240,255,0.4)]"
            >
              <span>{copiedEmail ? "EMAIL COPIED TO CLIPBOARD! ✨" : "ganeshpsuiux@gmail.com"}</span>
              <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-xs group-hover:rotate-45 transition-transform">
                {copiedEmail ? "✓" : "↗"}
              </span>
            </button>
          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {[
              { name: "LinkedIn", href: "https://linkedin.com" },
              { name: "X (Twitter)", href: "https://x.com" },
              { name: "Behance", href: "https://behance.net" },
              { name: "GitHub", href: "https://github.com/ganeshpsuiux" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="px-4 py-2 rounded-full text-xs font-mono bg-white/[0.04] hover:bg-white/[0.10] border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white transition-all duration-300"
              >
                {social.name} ↗
              </a>
            ))}
          </div>

          {/* Footer Copyright */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-400 gap-4 pt-8 border-t border-white/[0.06]">
            <span>© 2026 GANESH (GG) · ALL RIGHTS RESERVED</span>
            <span className="text-zinc-400">
              CRAFTED WITH SPIDER-SENSE & VIBE CODING
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
