"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { soundManager } from "@/lib/sound";
import { FluidBgCanvas } from "@/components/FluidBgCanvas";
import { FluidSpideyCanvas } from "@/components/FluidSpideyCanvas";
import SideRays from "@/components/SideRays";
import { HeroMusicWave } from "@/components/HeroMusicWave";

/* ─────────────────────────────────────────────────────────────────────────── */
/* Personal Signature / Wordmark SVG Graphic                                  */
/* Uses handwritten calligraphy in red/off-white with an autograph flourish   */
/* ─────────────────────────────────────────────────────────────────────────── */
const PersonalSignatureGraphic: React.FC<{
  color?: string;
  accentColor?: string;
  className?: string;
}> = ({ color = "#f5f5f5", accentColor = "#e63946", className = "" }) => {
  return (
    <div className={`relative flex flex-col items-start select-none ${className}`}>
      {/* REPLACEABLE SIGNATURE / WORDMARK SLOT:
          If you have a transparent PNG signature asset, replace this SVG with:
          <Image src="/assets/signature.png" alt="Ganesh PS Signature" width={180} height={70} className="object-contain" />
      */}
      <svg
        viewBox="0 0 220 78"
        className="w-[160px] sm:w-[170px] lg:w-[180px] h-auto overflow-visible filter drop-shadow-[0_2px_10px_rgba(230,57,70,0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ganesh PS Signature Wordmark"
      >
        {/* Dynamic hand-drawn "Ganesh PS" Calligraphy Paths */}
        {/* Capital G Flourish */}
        <path
          d="M 38 18 C 32 10, 18 10, 14 24 C 9 39, 21 54, 36 50 C 45 47, 49 38, 48 29 C 47 24, 40 24, 32 28 C 35 34, 42 34, 46 33"
          stroke={accentColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 'anesh' cursive ligature */}
        <path
          d="M 52 38 C 55 33, 62 33, 63 38 C 64 43, 61 46, 56 46 C 52 46, 52 38, 62 38 C 65 38, 66 43, 68 46 M 72 38 C 73 34, 78 33, 81 37 L 82 46 M 87 42 C 86 36, 95 34, 96 38 C 96 44, 88 43, 90 46 M 98 42 C 101 35, 107 36, 106 40 C 105 45, 99 44, 102 46 M 109 26 L 110 46 C 111 41, 115 35, 119 36 L 120 46"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Capital P & S Wordmark Initials */}
        <path
          d="M 136 22 L 138 52 M 138 23 C 146 21, 156 22, 156 31 C 156 39, 145 40, 138 40"
          stroke={accentColor}
          strokeWidth="3.0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 166 26 C 163 23, 172 21, 176 25 C 180 29, 166 33, 169 41 C 171 45, 180 44, 182 40"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dynamic sweeping underline flourish */}
        <path
          d="M 22 62 C 60 58, 120 57, 188 59 C 196 59, 204 60, 208 63 C 210 65, 206 67, 194 67 C 170 67, 130 65, 112 65"
          stroke={accentColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────── */
/* Navigation Overlay Drawer Component                                         */
/* ─────────────────────────────────────────────────────────────────────────── */
interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { label: "01 // HERO STAGE", href: "#chapter-2-scroll", tag: "Spider Suit & Origin" },
    { label: "02 // PHILOSOPHY", href: "#chapter-2-scroll", tag: "With Great Responsibility" },
    { label: "03 // CREATIVE WORKS", href: "#white-canvas-wrapper", tag: "Editorial Vision" },
    { label: "04 // ABOUT ME", href: "#about-me-section", tag: "Scrapbook & Career Journey" },
    { label: "05 // DESIGN SHOWCASE", href: "#design-showcase", tag: "Interactive Systems" },
  ];

  const handleNavClick = (href: string) => {
    soundManager.playThwip();
    onClose();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl transition-all duration-300 animate-fadeIn"
    >
      <div className="relative w-full max-w-xl mx-6 p-8 sm:p-10 rounded-2xl bg-[#09090c]/95 border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.25)]">
        {/* Header with Title and Close Button */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <h2 className="font-barlow font-bold text-lg sm:text-xl tracking-[0.2em] uppercase text-white">
              SPIDER-SYS // NAVIGATION
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              soundManager.playHudBeep(700);
              onClose();
            }}
            aria-label="Close navigation menu"
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current stroke-2 fill-none">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Links List */}
        <nav className="mt-8 flex flex-col gap-4">
          {navLinks.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleNavClick(item.href)}
              className="group flex items-center justify-between p-4 rounded-xl text-left bg-white/[0.03] hover:bg-red-500/10 border border-white/5 hover:border-red-500/40 transition-all duration-300 cursor-pointer"
            >
              <div>
                <span className="block font-barlow font-bold text-xl sm:text-2xl tracking-[0.15em] text-white group-hover:text-red-400 transition-colors uppercase">
                  {item.label}
                </span>
                <span className="block text-xs font-mono text-zinc-400 tracking-wider mt-0.5">
                  {item.tag}
                </span>
              </div>
              <span className="text-red-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 font-mono text-lg">
                →
              </span>
            </button>
          ))}
        </nav>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>GANESH PS — PORTFOLIO</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────── */
/* Main LandoHeroSection Component                                             */
/* ─────────────────────────────────────────────────────────────────────────── */
export const LandoHeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitStageRef = useRef<HTMLDivElement>(null);
  const skeletonBaseRef = useRef<HTMLDivElement>(null);
  const skeletonScanRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle navigation menu
  const toggleMenu = useCallback(() => {
    soundManager.playThwip();
    setIsMenuOpen((prev) => !prev);
  }, []);

  // GSAP Choreography & Continuous Top-to-Bottom Face Scanning Animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Animation for Full-Screen Stage (Subtle and Smooth)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        portraitStageRef.current,
        { scale: 0.98, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }
      );

      // 2. CONTINUOUS TOP-TO-BOTTOM FACE SCANNING ANIMATION (50% Opacity + 10% Glow Boost while appearing)
      // Organic elliptical radial mask sweeping across facial region
      const scanTl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });

      const scanObj = { progress: 0 };
      scanTl.to(scanObj, {
        progress: 100,
        duration: 3.0,
        onUpdate: () => {
          const p = scanObj.progress;
          // Calculate vertical position across facial region (sweeping smoothly across eyes, nose, cheeks)
          const topPercent = 8 + p * 0.48;

          // Sinusoidal curve peaking at 75% (0.75) opacity when appearing
          const edgeFade = Math.sin((p / 100) * Math.PI);
          const scanOpacity = Math.pow(edgeFade, 0.65) * 0.75;

          // +10% dynamic holographic cyan glow boost while appearing
          const glowIntensity = 0.45 + edgeFade * 0.10;
          const glowRadius = Math.round(10 + edgeFade * 6);

          // Soft 2D Elliptical Radial Gradient Mask centered over the face wireframe
          if (skeletonScanRef.current) {
            skeletonScanRef.current.style.opacity = `${scanOpacity}`;
            const ellipticalMask = `radial-gradient(ellipse 28% 13% at 51% ${topPercent}%, black 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.25) 75%, transparent 100%)`;
            skeletonScanRef.current.style.webkitMaskImage = ellipticalMask;
            skeletonScanRef.current.style.maskImage = ellipticalMask;
            skeletonScanRef.current.style.filter = `brightness(${1.25 + edgeFade * 0.15}) contrast(1.15) drop-shadow(0 0 ${glowRadius}px rgba(0, 240, 255, ${glowIntensity})) drop-shadow(0 0 24px rgba(0, 240, 255, 0.35))`;
          }
        },
      });

      // 3. Refined Parallax 3D Tilt on Mouse Movement
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const xPercent = (e.clientX / innerWidth - 0.5) * 2;
        const yPercent = (e.clientY / innerHeight - 0.5) * 2;

        if (portraitStageRef.current) {
          gsap.to(portraitStageRef.current, {
            rotationY: xPercent * 1.6,
            rotationX: -yPercent * 1.2,
            x: xPercent * 4,
            y: yPercent * 3,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-spidey-cursor relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white select-none"
    >
      {/* ========================================================================= */}
      {/* 1. FULL-SCREEN BACKGROUND (Fluid Cursor-Revealed Spider Web BG + SideRays) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-black">
        {/* Dynamic Fluid Ghost Smoke Background Canvas (Reveals Spider Web texture on mouse motion) */}
        <FluidBgCanvas
          imageSrc="/assets/bg_web.png"
          baseOpacity={0.015}
          revealOpacity={0.4}
        />

        {/* Dynamic WebGL SideRays Shine Effect (Pure Crystal White Shiner Rays, Zero BG Color Tint) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-1">
          <SideRays
            speed={2.2}
            rayColor1="#ffffff"
            rayColor2="#ffffff"
            intensity={1.8}
            spread={2.0}
            origin="top-right"
            tilt={0}
            saturation={0}
            blend={0.5}
            falloff={1.6}
            opacity={0.85}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TRANSPARENT HEADER ACROSS TOP (3 ELEMENTS, NO BACKGROUND PANEL)        */}
      {/* - Top Left: Small personal logo / GP monogram                             */}
      {/* - Top Center: "GANESH PS" centered relative to entire viewport            */}
      {/* - Top Right: Compact menu icon with two angled horizontal bars             */}
      {/* Outer Spacing: 3-4vw horizontally, 32-48px from top on desktop           */}
      {/* ========================================================================= */}
      <header className="absolute top-0 left-0 w-full z-40 pointer-events-none px-[3.5vw] pt-8 sm:pt-10 lg:pt-11 flex items-center justify-between">
        {/* TOP LEFT: Small personal logo / GP monogram */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => soundManager.playThwip()}
            aria-label="Ganesh PS personal logo"
            className="group relative flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500/70 rounded-lg p-1 transition-transform active:scale-95 cursor-pointer"
          >
            {/* Existing Personal GG Logo Asset */}
            <div className="relative w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center">
              <Image
                src="/assets/gg_logo.png"
                alt="GG Personal Monogram"
                width={36}
                height={36}
                priority
                className="object-contain filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Discrete spider-sense monogram badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm group-hover:border-red-500/40 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider text-zinc-300 group-hover:text-white uppercase">
                GP
              </span>
            </div>
          </button>
        </div>

        {/* TOP CENTER: "GANESH PS" centered relative to entire viewport independent of left/right widths */}
        <div className="absolute left-1/2 -translate-x-1/2 top-8 sm:top-10 lg:top-11 pointer-events-auto">
          <h1 className="font-barlow font-bold text-2xl sm:text-[26px] lg:text-[28px] tracking-[0.22em] text-[#f2f2f2] uppercase select-none transition-all duration-300 hover:text-white hover:tracking-[0.25em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            GANESH PS
          </h1>
        </div>

        {/* TOP RIGHT: Compact menu icon inspired by reference's two angled horizontal bars */}
        <div className="pointer-events-auto flex items-center">
          <button
            type="button"
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu();
              }
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="group relative flex items-center justify-center p-2.5 rounded-lg text-white/90 hover:text-white transition-all duration-300 hover:bg-white/5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/60 cursor-pointer"
          >
            <div className="w-8 h-6 flex flex-col justify-center items-end gap-[6px] overflow-hidden">
              {/* Top angled bar */}
              <span
                className={`block h-[2.5px] bg-white rounded-full transition-all duration-300 origin-center ${
                  isMenuOpen
                    ? "w-7 translate-y-[4.5px] rotate-45 bg-red-500"
                    : "w-7 -skew-x-[26deg] group-hover:w-8 group-hover:bg-red-400 group-hover:drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]"
                }`}
              />
              {/* Bottom angled bar */}
              <span
                className={`block h-[2.5px] bg-white rounded-full transition-all duration-300 origin-center ${
                  isMenuOpen
                    ? "w-7 -translate-y-[4px] -rotate-45 bg-red-500"
                    : "w-5 -skew-x-[26deg] group-hover:w-7 group-hover:bg-red-400 group-hover:drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]"
                }`}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. CENTRAL PORTRAIT AS DOMINANT VISUAL (BOTTOM-ANCHORED, CENTERED)       */}
      {/* Head begins around 14-18% from the top; torso extends to the bottom       */}
      {/* Clear lateral space preserved for the lower content blocks               */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full flex items-end justify-center pointer-events-auto z-10 perspective-1000 overflow-hidden">
        {/* Scale tuned on desktop to 0.84 so the head begins at ~16% from the top */}
        <div className="relative w-full h-full flex items-end justify-center max-sm:scale-[2.15] max-sm:origin-bottom sm:scale-[0.84] origin-bottom transition-transform duration-300">
          <div
            ref={portraitStageRef}
            className="relative w-full h-full flex items-end justify-center preserve-3d origin-bottom"
          >
            {/* Aspect-Locked 16:9 Stage: Guarantees 100% pixel alignment and accurate facial scan */}
            <div className="relative w-full max-w-[calc(100vh*16/9)] aspect-[16/9] max-h-full flex items-end justify-center">
              {/* LAYER 1 & 2: DYNAMIC HUMAN DEVELOPER PORTRAIT & SPIDER-MAN SUIT REVEAL */}
              <FluidSpideyCanvas
                humanImageSrc="/assets/gg_human.png"
                spideyImageSrc="/assets/gg_spidey.png"
                className="z-10"
              />

              {/* LAYER 3: SKELETON BLUEPRINT WITH DELICATE TOP-TO-BOTTOM SCANNING */}
              <div className="absolute inset-0 w-full h-full pointer-events-none z-20 flex items-end justify-center">
                {/* 3A: Ambient Ghost Skeleton Blueprint */}
                <div
                  ref={skeletonBaseRef}
                  className="absolute inset-0 w-full h-full opacity-0 mix-blend-overlay"
                  style={{ mixBlendMode: "overlay" }}
                >
                  <Image
                    src="/assets/mask_blueprint.png"
                    alt="Skeleton Wireframe Ambient"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-contain object-bottom filter brightness-110"
                  />
                </div>

                {/* 3B: Active Scanning Band with 75% Opacity and Overlay Blend Filter */}
                <div
                  ref={skeletonScanRef}
                  className="absolute inset-0 w-full h-full mix-blend-overlay opacity-0 transition-all duration-75"
                  style={{ mixBlendMode: "overlay" }}
                >
                  <Image
                    src="/assets/mask_blueprint.png"
                    alt="Skeleton Wireframe Active Scan"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-contain object-bottom filter brightness-135 contrast-125 drop-shadow-[0_0_12px_#00f0ff] drop-shadow-[0_0_24px_rgba(0,240,255,0.4)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. LOWER CONTENT BLOCKS (DESKTOP: LEFT IMAGE + TEXT, RIGHT SIGNATURE + TEXT) */}
      {/* - Lower-left: Aligned with header's left margin (3.5vw)                    */}
      {/* - Lower-right: Aligned with header's right margin (3.5vw)                  */}
      {/* - Horizontal alignment: First line of both paragraphs perfectly aligns    */}
      {/* - Both paragraphs: 200-235px wide, 4-5 short lines, 16px Inter regular    */}
      {/* - Spacing below paragraphs: approx 12-15vh on desktop                      */}
      {/* ========================================================================= */}
      <div className="absolute inset-x-0 bottom-[13vh] px-[3.5vw] flex items-end justify-between pointer-events-none z-30 max-md:hidden">
        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* LOWER-LEFT CONTENT BLOCK                                            */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        <div className="pointer-events-auto flex flex-col items-start w-[215px] lg:w-[225px] max-w-[235px]">
          {/* REPLACEABLE IMAGE SLOT: /assets/hero_portrait_card.png (roughly 2:3 aspect ratio, ~160-170px wide) */}
          <div className="group relative w-[160px] lg:w-[170px] aspect-[2/3] rounded-lg border border-red-500/40 shadow-[0_0_22px_rgba(239,68,68,0.22),0_8px_24px_rgba(0,0,0,0.7)] overflow-hidden bg-black/60 transition-all duration-300 hover:border-red-500/80 hover:shadow-[0_0_28px_rgba(239,68,68,0.4)] hover:scale-[1.02]">
            <Image
              src="/assets/hero_portrait_card.png"
              alt="Ganesh PS — Portrait Visual"
              fill
              sizes="170px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle Spider-Sense Badge */}
            <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase bg-black/70 backdrop-blur-sm border border-red-500/30 text-red-400">
              GP // 01
            </div>
            {/* Glass shine vignette */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-lg" />
          </div>

          {/* Short paragraph (28px below image, 200-235px wide, 4-5 short lines, off-white) */}
          <p className="mt-7 font-inter font-normal text-[15px] lg:text-[16px] leading-[1.48] text-[#d6d6d6] text-left select-text">
            Product designer & creative technologist crafting cinematic digital experiences with architectural precision and kinetic interaction.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* LOWER-RIGHT CONTENT BLOCK                                           */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        <div className="pointer-events-auto flex flex-col items-start w-[215px] lg:w-[225px] max-w-[235px]">
          {/* Signature graphic container (height calibrated to match left image card so paragraphs align horizontally!) */}
          <div className="w-[160px] lg:w-[170px] h-[240px] lg:h-[255px] flex flex-col justify-end items-start pb-2">
            {/* REPLACEABLE SIGNATURE / PERSONAL WORDMARK */}
            <div
              className="group relative flex flex-col items-start cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
              onClick={() => soundManager.playThwip()}
              title="Ganesh PS Signature Wordmark"
            >
              <PersonalSignatureGraphic />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400 mt-1 pl-1 group-hover:text-red-400 transition-colors">
                PERSONAL WORDMARK
              </span>
            </div>
          </div>

          {/* Short paragraph (matching width, font size, line height, visual weight; first line horizontally aligned with left paragraph) */}
          <p className="mt-7 font-inter font-normal text-[15px] lg:text-[16px] leading-[1.48] text-[#d6d6d6] text-left select-text">
            Architecting scalable design systems, WebGL kinetics, and high-impact web products. Based in India, collaborating globally.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MOBILE RESPONSIVE CONTENT TRAY (CLEAN STACKING ON SMALL SCREENS)       */}
      {/* Displays the supporting cards cleanly without overlapping the portrait    */}
      {/* ========================================================================= */}
      <div className="md:hidden absolute bottom-20 inset-x-0 px-6 flex items-end justify-between pointer-events-none z-30">
        <div className="pointer-events-auto flex flex-col items-start max-w-[140px]">
          <div className="w-[85px] aspect-[2/3] rounded-md border border-red-500/40 shadow-lg overflow-hidden relative">
            <Image
              src="/assets/hero_portrait_card.png"
              alt="Ganesh PS Portrait"
              fill
              sizes="85px"
              className="object-cover object-top"
            />
          </div>
          <p className="mt-2 font-inter text-[12px] leading-snug text-zinc-300 text-left line-clamp-3">
            Product designer & creative technologist crafting cinematic digital experiences.
          </p>
        </div>

        <div className="pointer-events-auto flex flex-col items-end max-w-[150px]">
          <div onClick={() => soundManager.playThwip()} className="cursor-pointer">
            <PersonalSignatureGraphic className="w-[120px] origin-right scale-90" />
          </div>
          <p className="mt-2 font-inter text-[12px] leading-snug text-zinc-300 text-right line-clamp-3">
            Architecting scalable design systems and WebGL kinetics.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. BOTTOM-RIGHT CORNER: COMPACT AUDIO CONTROL & THEME MUSIC PLAYER         */}
      {/* Moved to bottom-right corner so it does not compete with menu or content   */}
      {/* ========================================================================= */}
      <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-[3.5vw] z-40 pointer-events-auto">
        <HeroMusicWave />
      </div>

      {/* ========================================================================= */}
      {/* 7. ACCESSIBLE NAVIGATION MODAL / DRAWER                                   */}
      {/* Connected to top-right menu icon                                          */}
      {/* ========================================================================= */}
      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};
