"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseCardProps {
  image: string;
  title: string;
  category: string;
  accent: string;
  year?: string;
  className?: string;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  image,
  title,
  category,
  accent,
  year = "2026",
  className = "",
}) => (
  <div
    className={`w-full bg-white/95 rounded-2xl p-2.5 sm:p-3 shadow-[0_20px_45px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] border border-black/[0.08] backdrop-blur-md select-none transition-transform duration-300 ${className}`}
  >
    {/* Card Image Viewport */}
    <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 relative mb-2.5 shadow-inner">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[1.01]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      <span
        className="absolute top-2 left-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-medium backdrop-blur-md shadow-sm border border-white/20"
        style={{
          backgroundColor: accent,
          color: "#ffffff",
        }}
      >
        {category}
      </span>
    </div>

    {/* Metadata */}
    <div className="px-1 flex items-center justify-between">
      <h4 className="font-sora text-[12px] sm:text-[13px] font-semibold text-zinc-900 tracking-tight truncate pr-2">
        {title}
      </h4>
      <span className="text-[10px] font-mono text-zinc-400 shrink-0">
        {year}
      </span>
    </div>
  </div>
);

export const AboutMeSection: React.FC = () => {
  const [hoveredPolaroid, setHoveredPolaroid] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const stageGridRef = useRef<HTMLDivElement>(null);
  const polaroidContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timecodeRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const punchlineContainerRef = useRef<HTMLDivElement>(null);
  const punchlineRef = useRef<HTMLHeadingElement>(null);

  // Multi-Plane Parallax Depth Layer Refs
  const bgCardsRiverRef = useRef<HTMLDivElement>(null);
  const bgCol1Ref = useRef<HTMLDivElement>(null);
  const bgCol2Ref = useRef<HTMLDivElement>(null);

  const fgCardsRiverRef = useRef<HTMLDivElement>(null);
  const fgCardLeftRef = useRef<HTMLDivElement>(null);
  const fgCardRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const video = videoRef.current;
    if (!section || !pinWrapper) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline when section scrolls near viewport
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      if (polaroidContainerRef.current) {
        entranceTl.fromTo(
          polaroidContainerRef.current,
          { opacity: 0, x: -30, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power2.out" }
        );
      }

      if (textContainerRef.current) {
        entranceTl.fromTo(
          textContainerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
      }

      // ─────────────────────────────────────────────────────────────
      // 2. THE MULTI-PLANE PARALLAX INTERACTION (+=380% PINNED TIMELINE)
      // Phase 1 (0.00 -> 0.35): Origin Story Stage (Video scrub + text reveal)
      // Phase 2 (0.35 -> 0.50): Downward Center Glide (Locks in dead center & blooms)
      // Phase 3 (0.50 -> 0.85): 3-Tier Multi-Plane Floating Cards Stream
      //   - Layer 1 (z-10): Underneath background cards float behind text (0.85x speed)
      //   - Layer 2 (z-20): Centered focal text statement locked in place
      //   - Layer 3 (z-30): Foreground camera-close cards overlap text (1.25x speed, deep drop shadows)
      // Phase 4 (0.85 -> 1.00): Smooth handoff & release into DesignShowcaseSection
      // ─────────────────────────────────────────────────────────────
      if (textContainerRef.current) {
        const lineElements = textContainerRef.current.querySelectorAll(".fill-editorial-line");

        // Signature Spidey Chromatic Text Shader
        gsap.set(lineElements, {
          backgroundImage:
            "linear-gradient(to right, #111111 0%, #18181b 34%, #27272a 38%, #dc2626 46%, #ef4444 52%, #3b82f6 57%, #2563eb 60%, #d4d4d8 64%, #e4e4e7 100%)",
          backgroundSize: "320% 100%",
          backgroundPositionX: "100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          display: "inline-block",
        });

        // Set initial positions for Underneath Layer (z-10)
        if (bgCol1Ref.current) gsap.set(bgCol1Ref.current, { y: "115vh" });
        if (bgCol2Ref.current) gsap.set(bgCol2Ref.current, { y: "125vh" });

        // Set initial positions for Foreground Overlap Layer (z-30)
        if (fgCardLeftRef.current) gsap.set(fgCardLeftRef.current, { y: "130vh" });
        if (fgCardRightRef.current) gsap.set(fgCardRightRef.current, { y: "140vh" });

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",      // Strictly start only when section reaches top
            end: "+=380%",         // 3.8x viewport travel for comfortable reading & card viewing
            pin: pinWrapper,       // Physically pin inner wrapper (prevents DOM reparenting jank)
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Video scrub strictly active during Phase 1 (0.00 -> 0.35)
              if (video && Number.isFinite(video.duration) && video.duration > 0) {
                const phase1Progress = Math.min(1, Math.max(0, self.progress / 0.35));
                const targetTime = phase1Progress * video.duration;
                if (Math.abs(video.currentTime - targetTime) > 0.04) {
                  video.currentTime = targetTime;
                }
              }

              // Monospace HUD timecode update (0:00 -> 0:14)
              if (timecodeRef.current && video && Number.isFinite(video.duration) && video.duration > 0) {
                const phase1Progress = Math.min(1, Math.max(0, self.progress / 0.35));
                const curSec = Math.floor(phase1Progress * video.duration);
                const totalSec = Math.floor(video.duration) || 14;
                timecodeRef.current.textContent = `0:${curSec < 10 ? "0" : ""}${curSec} / 0:${totalSec < 10 ? "0" : ""}${totalSec}`;
              }
            },
          },
        });

        // ═════════════════════════════════════════════════════════════
        // PHASE 1: ORIGIN STORY STAGE (Progress 0.00 -> 0.35)
        // ═════════════════════════════════════════════════════════════
        // Paragraph 1: 5 lines (Progress 0.00 -> 0.18)
        masterTl.to(".fill-p1-1", { backgroundPositionX: "0%", ease: "none", duration: 0.80 });
        masterTl.to(".fill-p1-2", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.35");
        masterTl.to(".fill-p1-3", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.35");
        masterTl.to(".fill-p1-4", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.35");
        masterTl.to(".fill-p1-5", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.35");

        // Paragraph 2: 4 lines (Progress 0.18 -> 0.30)
        masterTl.to(".fill-p2-1", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.20");
        masterTl.to(".fill-p2-2", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.35");
        masterTl.to(".fill-p2-3", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.35");
        masterTl.to(".fill-p2-4", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.30");

        // Closing Statement: 1 line (Progress 0.28 -> 0.35)
        masterTl.to(".fill-punchline", { backgroundPositionX: "0%", ease: "none", duration: 0.85 }, "-=0.20");

        // ═════════════════════════════════════════════════════════════
        // PHASE 2: DOWNWARD CENTER GLIDE (Progress 0.35 -> 0.50)
        // ═════════════════════════════════════════════════════════════
        masterTl.addLabel("glide", ">0.15");

        // 1. Polaroid card translates upward and dissolves
        if (polaroidContainerRef.current) {
          masterTl.to(
            polaroidContainerRef.current,
            {
              opacity: 0,
              y: -100,
              scale: 0.94,
              ease: "power2.inOut",
              duration: 1.5,
            },
            "glide"
          );
        }

        // 2. Paragraphs 1 & 2 translate upward and dissolve
        if (paragraphsRef.current) {
          masterTl.to(
            paragraphsRef.current,
            {
              opacity: 0,
              y: -100,
              ease: "power2.inOut",
              duration: 1.5,
            },
            "glide"
          );
        }

        // 3. Closing statement comes down into DEAD CENTER of viewport & blooms into hero badge
        if (punchlineContainerRef.current) {
          masterTl.to(
            punchlineContainerRef.current,
            {
              x: () => {
                const s = pinWrapperRef.current?.getBoundingClientRect();
                const p = punchlineContainerRef.current?.getBoundingClientRect();
                if (!s || !p) return 0;
                const curX = (gsap.getProperty(punchlineContainerRef.current, "x") as number) || 0;
                return s.left + s.width / 2 - (p.left - curX + p.width / 2);
              },
              y: () => {
                const s = pinWrapperRef.current?.getBoundingClientRect();
                const p = punchlineContainerRef.current?.getBoundingClientRect();
                if (!s || !p) return 0;
                const curY = (gsap.getProperty(punchlineContainerRef.current, "y") as number) || 0;
                return s.top + s.height / 2 - (p.top - curY + p.height / 2);
              },
              scale: () => (window.innerWidth >= 1024 ? 1.85 : 1.35),
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              borderColor: "rgba(0, 0, 0, 0.08)",
              boxShadow: "0 24px 50px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)",
              backdropFilter: "blur(16px)",
              paddingLeft: "36px",
              paddingRight: "36px",
              paddingTop: "14px",
              paddingBottom: "14px",
              borderRadius: "9999px",
              duration: 1.5,
              ease: "power2.inOut",
            },
            "glide"
          );
        }

        // ═════════════════════════════════════════════════════════════
        // PHASE 3: MULTI-PLANE "ABOVE & BELOW" STREAM (Progress 0.50 -> 0.85)
        // ═════════════════════════════════════════════════════════════
        masterTl.addLabel("stream", ">0.05");

        // Reveal both Underneath (z-10) and Foreground (z-30) card layers
        if (bgCardsRiverRef.current) {
          masterTl.to(bgCardsRiverRef.current, { opacity: 1, duration: 0.4, ease: "power1.in" }, "stream");
        }
        if (fgCardsRiverRef.current) {
          masterTl.to(fgCardsRiverRef.current, { opacity: 1, duration: 0.4, ease: "power1.in" }, "stream");
        }

        // Underneath Layer (z-10): Parallax Speed 0.85x (floats behind text plane)
        if (bgCol1Ref.current) {
          masterTl.to(
            bgCol1Ref.current,
            {
              y: "-125vh",
              duration: 3.5,
              ease: "none",
            },
            "stream"
          );
        }
        if (bgCol2Ref.current) {
          masterTl.to(
            bgCol2Ref.current,
            {
              y: "-120vh",
              duration: 3.5,
              ease: "none",
            },
            "stream"
          );
        }

        // Foreground Overlap Layer (z-30): Parallax Speed 1.25x (camera-close, overlaps text with deep shadow)
        if (fgCardLeftRef.current) {
          masterTl.to(
            fgCardLeftRef.current,
            {
              y: "-145vh",
              duration: 3.5,
              ease: "none",
            },
            "stream"
          );
        }
        if (fgCardRightRef.current) {
          masterTl.to(
            fgCardRightRef.current,
            {
              y: "-140vh",
              duration: 3.5,
              ease: "none",
            },
            "stream"
          );
        }

        // ═════════════════════════════════════════════════════════════
        // PHASE 4: SMOOTH HANDOFF INTO NEXT SECTION (Progress 0.85 -> 1.00)
        // ═════════════════════════════════════════════════════════════
        masterTl.addLabel("outro", ">-0.2");

        // Centered hero statement floats up gently and dissolves
        if (punchlineContainerRef.current) {
          masterTl.to(
            punchlineContainerRef.current,
            {
              y: "-=60px",
              opacity: 0,
              scale: () => (window.innerWidth >= 1024 ? 1.95 : 1.45),
              duration: 1.0,
              ease: "power2.inOut",
            },
            "outro"
          );
        }

        // Both card streams dissolve as they complete exit
        if (bgCardsRiverRef.current) {
          masterTl.to(bgCardsRiverRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "outro");
        }
        if (fgCardsRiverRef.current) {
          masterTl.to(fgCardsRiverRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "outro");
        }

        // Fluid release hold buffer into next section
        masterTl.to({}, { duration: 0.3 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-me-section"
      className="relative w-full min-h-screen bg-transparent select-none"
    >
      {/* Pinned Stage Viewport Wrapper */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-screen flex items-center justify-center bg-transparent px-6 lg:px-12 overflow-hidden"
      >
        {/* Dynamic Spidey Text Shader Styles */}
        <style>{`
          .fill-editorial-line {
            background-image: linear-gradient(
              to right,
              #111111 0%,
              #18181b 34%,
              #27272a 38%,
              #dc2626 46%,
              #ef4444 52%,
              #3b82f6 57%,
              #2563eb 60%,
              #d4d4d8 64%,
              #e4e4e7 100%
            );
            background-size: 320% 100%;
            background-position-x: 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
            display: inline-block;
          }

          @media (min-width: 1024px) {
            .fill-editorial-line {
              white-space: nowrap;
            }
          }
        `}</style>

        {/* ──────── 1. UNDERNEATH LAYER: BACKGROUND CARDS (Z-10) ──────── */}
        <div
          ref={bgCardsRiverRef}
          className="absolute inset-0 pointer-events-none overflow-hidden z-10 flex items-center justify-center opacity-0"
          style={{ width: "100%", height: "100%" }}
        >
          <div className="w-full max-w-5xl mx-auto px-4 grid grid-cols-2 gap-8 sm:gap-14 lg:gap-20 h-full items-center justify-center">
            
            {/* Background Column 1 (Left - Speed 0.85x, Tilt -1.5deg) */}
            <div
              ref={bgCol1Ref}
              className="flex flex-col gap-8 sm:gap-12 will-change-transform items-center"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              <ShowcaseCard
                image="/assets/concepts/about_me_spiderverse_ui_1793291690442.jpg"
                title="Spiderverse Design System"
                category="UI System"
                accent="#dc2626"
                className="max-w-[270px] sm:max-w-[290px]"
              />
              <ShowcaseCard
                image="/assets/card_creative_3d.jpg"
                title="Kinetic Spatial Dimensions"
                category="3D Motion"
                accent="#2563eb"
                className="max-w-[270px] sm:max-w-[290px]"
              />
              <ShowcaseCard
                image="/assets/concepts/about_me_portfolio_mockup_1793291329956.jpg"
                title="Editorial Platform UX"
                category="Web App"
                accent="#09090b"
                className="max-w-[270px] sm:max-w-[290px]"
              />
            </div>

            {/* Background Column 2 (Right - Speed 0.85x, Tilt 1.5deg) */}
            <div
              ref={bgCol2Ref}
              className="flex flex-col gap-8 sm:gap-12 will-change-transform items-center"
              style={{ transform: "rotate(1.5deg)" }}
            >
              <ShowcaseCard
                image="/assets/concepts/ganesh_about_me_bento_mockup_1793291386448.jpg"
                title="Modular Bento Architecture"
                category="Product UX"
                accent="#f59e0b"
                className="max-w-[270px] sm:max-w-[290px]"
              />
              <ShowcaseCard
                image="/assets/concepts/ganesh_ps_about_me_sketchbook_spread_1793291341733.jpg"
                title="Visual Ledger & Identity"
                category="Brand Craft"
                accent="#10b981"
                className="max-w-[270px] sm:max-w-[290px]"
              />
              <ShowcaseCard
                image="/assets/card_creative_podcast.jpg"
                title="Cinematic Soundscapes"
                category="Audio Hub"
                accent="#6366f1"
                className="max-w-[270px] sm:max-w-[290px]"
              />
            </div>

          </div>
        </div>

        {/* ──────── 2. TEXT PLANE: 2-COLUMN STAGE & CENTERED HERO STATEMENT (Z-20) ──────── */}
        <div
          ref={stageGridRef}
          className="relative z-20 w-full max-w-[1020px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          
          {/* ──────── Left Column: 1:1 Square Living Polaroid (Phase 1) ──────── */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div
              ref={polaroidContainerRef}
              onMouseEnter={() => setHoveredPolaroid(true)}
              onMouseLeave={() => setHoveredPolaroid(false)}
              className={`relative bg-white p-3.5 pb-10 rounded-[3px] shadow-[0_20px_45px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] border border-black/[0.06] transition-all duration-500 ease-out cursor-pointer w-[310px] sm:w-[330px] lg:w-[350px] will-change-transform ${
                hoveredPolaroid
                  ? "!rotate-0 scale-[1.02] shadow-[0_28px_56px_rgba(0,0,0,0.16)] -translate-y-1.5"
                  : "rotate-[-2.5deg] scale-100"
              }`}
              style={{
                transformOrigin: "center center",
              }}
            >
              {/* Top-Left Blue/Periwinkle Washi Tape */}
              <div
                className="absolute -top-3 -left-3 w-12 h-6 bg-[#9db4ff]/85 backdrop-blur-[0.5px] -rotate-[36deg] shadow-sm pointer-events-none rounded-[1px] border border-white/20 z-20"
                style={{
                  clipPath: "polygon(0% 12%, 100% 0%, 94% 88%, 6% 100%, 0% 78%)",
                }}
              />

              {/* Top-Right Yellow/Amber Washi Tape */}
              <div
                className="absolute -top-2.5 -right-2.5 w-11 h-5.5 bg-[#ffe380]/90 backdrop-blur-[0.5px] rotate-[26deg] shadow-sm pointer-events-none rounded-[1px] border border-white/20 z-20"
                style={{
                  clipPath: "polygon(4% 0%, 96% 10%, 100% 90%, 0% 100%)",
                }}
              />

              {/* Video Viewport: Strictly 1:1 Square Aspect Ratio */}
              <div className="w-full aspect-square rounded-[2px] overflow-hidden bg-black relative border border-black/10 shadow-inner group">
                <video
                  ref={videoRef}
                  src="/assets/about_origin.mp4"
                  playsInline
                  muted
                  preload="auto"
                  className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[1.02]"
                />

                {/* Subtle Film Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15 pointer-events-none" />

                {/* Floating Translucent Glass HUD Badge (0:00 / 0:14) */}
                <div
                  ref={timecodeRef}
                  className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-sm border border-white/15 text-white/85 pointer-events-none z-10"
                >
                  0:00 / 0:14
                </div>
              </div>

              {/* Polaroid Bottom Chin: Handwritten "me :)" + SCROLL TO REEL */}
              <div className="w-full pt-3 px-1 flex items-center justify-between">
                <span
                  className="text-2xl text-[#1a1a1a] tracking-wide select-none"
                  style={{
                    fontFamily: "var(--font-caveat), cursive",
                    fontWeight: 700,
                  }}
                >
                  me :)
                </span>
                <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase select-none">
                  SCROLL TO REEL
                </span>
              </div>
            </div>
          </div>

          {/* ──────── Right Column: Sora Editorial Typography ──────── */}
          <div
            ref={textContainerRef}
            className="lg:col-span-7 flex flex-col justify-between text-left h-full max-w-[580px] select-text font-sora"
            style={{
              fontFamily: "var(--font-sora), sans-serif",
            }}
          >
            {/* Paragraphs 1 & 2 Container (Translates upward in Phase 2) */}
            <div ref={paragraphsRef} className="will-change-transform">
              {/* Paragraph 1: Origin & Spark (5 lines) */}
              <p className="mb-7 sm:mb-8 text-[19px] sm:text-[21px] lg:text-[22.5px] font-[450] leading-[1.58] text-[#111111] tracking-[-0.015em]">
                <span className="block fill-editorial-line fill-p1-1">
                  I didn’t start in a design school or follow a perfectly drawn
                </span>
                <span className="block fill-editorial-line fill-p1-2">
                  path. My story began with commerce, books, and an
                </span>
                <span className="block fill-editorial-line fill-p1-3">
                  M.Com degree—until curiosity pulled me into the web of
                </span>
                <span className="block fill-editorial-line fill-p1-4">
                  design. What started as a spark soon became an
                </span>
                <span className="block fill-editorial-line fill-p1-5">
                  obsession.
                </span>
              </p>

              {/* Paragraph 2: Detour & Beyond the Screen (4 lines) */}
              <p className="mb-6 sm:mb-7 text-[19px] sm:text-[21px] lg:text-[22.5px] font-[450] leading-[1.58] text-[#111111] tracking-[-0.015em]">
                <span className="block fill-editorial-line fill-p2-1">
                  That unexpected detour became my origin story. Today, I
                </span>
                <span className="block fill-editorial-line fill-p2-2">
                  swing between ideas, identities, interfaces, and
                </span>
                <span className="block fill-editorial-line fill-p2-3">
                  technology—using motion, AI, and imagination to build
                </span>
                <span className="block fill-editorial-line fill-p2-4">
                  experiences that go beyond the screen.
                </span>
              </p>
            </div>

            {/* ──────── CLOSING STATEMENT & CENTER-LOCK ANCHOR (Z-20) ──────── */}
            <div className="mt-6 sm:mt-7">
              <div
                ref={punchlineContainerRef}
                className="inline-block will-change-transform z-20"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  transformOrigin: "center center",
                }}
              >
                <h3
                  ref={punchlineRef}
                  className="font-bold text-[22px] sm:text-[24px] lg:text-[26px] text-black tracking-tight leading-snug whitespace-nowrap"
                >
                  <span className="block fill-editorial-line fill-punchline">
                    By Bringing Pixels to life.
                  </span>
                </h3>
              </div>
            </div>
          </div>

        </div>

        {/* ──────── 3. FOREGROUND OVERLAP LAYER: CAMERA-CLOSE CARDS (Z-30) ──────── */}
        <div
          ref={fgCardsRiverRef}
          className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-between px-4 sm:px-8 lg:px-16 opacity-0"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Foreground Card 1 (Left / Lower Flank Overlap with Real Depth Shadow) */}
          <div
            ref={fgCardLeftRef}
            className="will-change-transform shrink-0"
            style={{ transform: "rotate(-3deg)" }}
          >
            <div className="w-[280px] sm:w-[320px] lg:w-[350px] bg-white rounded-2xl p-3 sm:p-3.5 shadow-[0_32px_64px_rgba(0,0,0,0.22),0_8px_20px_rgba(0,0,0,0.10)] border border-black/[0.12] backdrop-blur-lg">
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 relative mb-3 shadow-inner">
                <img
                  src="/assets/iridescent_glass_footer.jpg"
                  alt="Iridescent Glass Interfaces"
                  className="w-full h-full object-cover object-center filter contrast-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-2.5 left-2.5 text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-medium bg-[#8b5cf6] text-white shadow-sm border border-white/20">
                  Featured Innovation
                </span>
              </div>
              <div className="px-1 flex items-center justify-between">
                <h4 className="font-sora text-[13px] sm:text-[14px] font-semibold text-zinc-900 tracking-tight truncate pr-2">
                  Iridescent Glass Interfaces
                </h4>
                <span className="text-[10.5px] font-mono text-zinc-400 shrink-0">
                  2026
                </span>
              </div>
            </div>
          </div>

          {/* Foreground Card 2 (Right / Upper Flank Overlap with Real Depth Shadow) */}
          <div
            ref={fgCardRightRef}
            className="will-change-transform shrink-0 hidden sm:block"
            style={{ transform: "rotate(3.5deg)" }}
          >
            <div className="w-[270px] sm:w-[310px] lg:w-[340px] bg-white rounded-2xl p-3 sm:p-3.5 shadow-[0_32px_64px_rgba(0,0,0,0.20),0_8px_20px_rgba(0,0,0,0.08)] border border-black/[0.12] backdrop-blur-lg">
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 relative mb-3 shadow-inner">
                <img
                  src="/assets/card_creative_jam.jpg"
                  alt="Interactive Creative Jam"
                  className="w-full h-full object-cover object-center filter contrast-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-2.5 left-2.5 text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-medium bg-[#ec4899] text-white shadow-sm border border-white/20">
                  Experiential UX
                </span>
              </div>
              <div className="px-1 flex items-center justify-between">
                <h4 className="font-sora text-[13px] sm:text-[14px] font-semibold text-zinc-900 tracking-tight truncate pr-2">
                  Interactive Creative Jam
                </h4>
                <span className="text-[10.5px] font-mono text-zinc-400 shrink-0">
                  2026
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
