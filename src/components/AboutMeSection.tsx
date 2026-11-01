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
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  image,
  title,
  category,
  accent,
  year = "2026",
}) => (
  <div className="w-full max-w-[280px] sm:max-w-[310px] bg-white/95 rounded-2xl p-2.5 sm:p-3 shadow-[0_24px_48px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] border border-black/[0.08] backdrop-blur-md select-none transition-transform duration-300">
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
      <h4 className="font-sora text-[12.5px] sm:text-[13.5px] font-semibold text-zinc-900 tracking-tight truncate pr-2">
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

  // River of floating showcase cards refs
  const cardsRiverRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

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
      // 2. THE SIGNATURE CDG CHOREOGRAPHY (+=380% PINNED TIMELINE)
      // Phase 1 (0.00 -> 0.40): 2-Column Editorial scrub & Spidey text gradient
      // Phase 2 (0.40 -> 0.55): Center-Lock Glide & Hero statement bloom
      // Phase 3 (0.55 -> 0.88): 3-Column Floating Cards Parallax Cascade
      // Phase 4 (0.88 -> 1.00): Seamless handoff & release to next section
      // ─────────────────────────────────────────────────────────────
      if (textContainerRef.current) {
        const lineElements = textContainerRef.current.querySelectorAll(".fill-editorial-line");

        // Signature Spidey Chromatic Text Ramp:
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

        // Set initial positions for the 3 floating parallax columns
        if (col1Ref.current) gsap.set(col1Ref.current, { y: "120vh" });
        if (col2Ref.current) gsap.set(col2Ref.current, { y: "135vh" });
        if (col3Ref.current) gsap.set(col3Ref.current, { y: "125vh" });

        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",      // STRICT: Absolutely NO playback or movement until section top reaches viewport top
            end: "+=380%",         // Generous scroll travel for all 4 phases
            pin: pinWrapper,       // Physically pin inner wrapper (prevents DOM reparenting jank)
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Video scrub strictly active during Phase 1 (0.00 -> 0.40)
              if (video && Number.isFinite(video.duration) && video.duration > 0) {
                const phase1Progress = Math.min(1, Math.max(0, self.progress / 0.40));
                const targetTime = phase1Progress * video.duration;
                if (Math.abs(video.currentTime - targetTime) > 0.04) {
                  video.currentTime = targetTime;
                }
              }

              // Monospace HUD timecode update (0:00 -> 0:14)
              if (timecodeRef.current && video && Number.isFinite(video.duration) && video.duration > 0) {
                const phase1Progress = Math.min(1, Math.max(0, self.progress / 0.40));
                const curSec = Math.floor(phase1Progress * video.duration);
                const totalSec = Math.floor(video.duration) || 14;
                timecodeRef.current.textContent = `0:${curSec < 10 ? "0" : ""}${curSec} / 0:${totalSec < 10 ? "0" : ""}${totalSec}`;
              }
            },
          },
        });

        // ═════════════════════════════════════════════════════════════
        // PHASE 1: 2-COLUMN EDITORIAL STAGE (Progress 0.00 -> 0.40)
        // ═════════════════════════════════════════════════════════════
        // Paragraph 1: 5 lines (Progress 0.00 -> 0.20)
        pinTl.to(".fill-p1-1", { backgroundPositionX: "0%", ease: "none", duration: 0.80 });
        pinTl.to(".fill-p1-2", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.35");
        pinTl.to(".fill-p1-3", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.35");
        pinTl.to(".fill-p1-4", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.35");
        pinTl.to(".fill-p1-5", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.35");

        // Paragraph 2: 4 lines (Progress 0.20 -> 0.35)
        pinTl.to(".fill-p2-1", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.20");
        pinTl.to(".fill-p2-2", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.35");
        pinTl.to(".fill-p2-3", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.35");
        pinTl.to(".fill-p2-4", { backgroundPositionX: "0%", ease: "none", duration: 0.80 }, "-=0.30");

        // Closing Statement: 1 line (Progress 0.33 -> 0.40)
        pinTl.to(".fill-punchline", { backgroundPositionX: "0%", ease: "none", duration: 0.85 }, "-=0.20");

        // ═════════════════════════════════════════════════════════════
        // PHASE 2: CENTER-LOCK GLIDE & HERO BLOOM (Progress 0.40 -> 0.55)
        // ═════════════════════════════════════════════════════════════
        pinTl.addLabel("glide", ">0.15");

        // 1. Polaroid card glides upward and dissolves
        if (polaroidContainerRef.current) {
          pinTl.to(
            polaroidContainerRef.current,
            {
              opacity: 0,
              y: -120,
              scale: 0.94,
              ease: "power2.inOut",
              duration: 1.5,
            },
            "glide"
          );
        }

        // 2. Paragraphs 1 & 2 glide upward and dissolve
        if (paragraphsRef.current) {
          pinTl.to(
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

        // 3. Closing statement glides to DEAD CENTER of viewport & blooms into frosted glass hero
        if (punchlineContainerRef.current) {
          pinTl.to(
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
              backgroundColor: "rgba(255, 255, 255, 0.92)",
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
        // PHASE 3: FLOATING CARDS PARALLAX CASCADE (Progress 0.55 -> 0.88)
        // ═════════════════════════════════════════════════════════════
        pinTl.addLabel("cascade", ">0.05");

        // Make floating cards river visible
        if (cardsRiverRef.current) {
          pinTl.to(
            cardsRiverRef.current,
            { opacity: 1, duration: 0.4, ease: "power1.in" },
            "cascade"
          );
        }

        // Column 1 (Left): Speed 1.2x with slight tilt (-2deg)
        if (col1Ref.current) {
          pinTl.to(
            col1Ref.current,
            {
              y: "-145vh",
              duration: 3.3,
              ease: "none",
            },
            "cascade"
          );
        }

        // Column 2 (Center-offset / background): Speed 0.85x with subtle tilt (0.5deg)
        if (col2Ref.current) {
          pinTl.to(
            col2Ref.current,
            {
              y: "-115vh",
              duration: 3.3,
              ease: "none",
            },
            "cascade"
          );
        }

        // Column 3 (Right): Speed 1.1x with slight tilt (2.5deg)
        if (col3Ref.current) {
          pinTl.to(
            col3Ref.current,
            {
              y: "-135vh",
              duration: 3.3,
              ease: "none",
            },
            "cascade"
          );
        }

        // ═════════════════════════════════════════════════════════════
        // PHASE 4: SEAMLESS HANDOFF & OUTRO (Progress 0.88 -> 1.00)
        // ═════════════════════════════════════════════════════════════
        pinTl.addLabel("outro", ">-0.2");

        // Centered hero badge gently floats up and dissolves
        if (punchlineContainerRef.current) {
          pinTl.to(
            punchlineContainerRef.current,
            {
              y: "-=80px",
              opacity: 0,
              scale: () => (window.innerWidth >= 1024 ? 1.95 : 1.45),
              duration: 1.0,
              ease: "power2.inOut",
            },
            "outro"
          );
        }

        // Cards river completes exit
        if (cardsRiverRef.current) {
          pinTl.to(
            cardsRiverRef.current,
            {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
            },
            "outro"
          );
        }

        // Hold beat for 0.2s before pin releases smoothly into next section
        pinTl.to({}, { duration: 0.3 });
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

        {/* ──────── 3. PHASE 3: FLOATING CARDS RIVER CASCADE (Z-10) ──────── */}
        <div
          ref={cardsRiverRef}
          className="absolute inset-0 pointer-events-none overflow-hidden z-10 flex items-center justify-center opacity-0"
          style={{ width: "100%", height: "100%" }}
        >
          <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 h-full items-center justify-center">
            
            {/* Column 1 (Left - Speed 1.2x, Tilt -2deg) */}
            <div
              ref={col1Ref}
              className="flex flex-col gap-6 sm:gap-8 will-change-transform items-center"
              style={{ transform: "rotate(-2deg)" }}
            >
              <ShowcaseCard
                image="/assets/concepts/about_me_spiderverse_ui_1793291690442.jpg"
                title="Spiderverse Design System"
                category="UI System"
                accent="#dc2626"
              />
              <ShowcaseCard
                image="/assets/card_creative_3d.jpg"
                title="Kinetic Spatial Dimensions"
                category="3D Motion"
                accent="#2563eb"
              />
              <ShowcaseCard
                image="/assets/concepts/about_me_portfolio_mockup_1793291329956.jpg"
                title="Editorial Platform UX"
                category="Web App"
                accent="#09090b"
              />
            </div>

            {/* Column 2 (Center-offset / background - Speed 0.85x, Tilt 0.5deg) */}
            <div
              ref={col2Ref}
              className="hidden lg:flex flex-col gap-6 sm:gap-8 will-change-transform items-center"
              style={{ transform: "rotate(0.5deg)" }}
            >
              <ShowcaseCard
                image="/assets/concepts/ganesh_about_me_bento_mockup_1793291386448.jpg"
                title="Modular Bento Architecture"
                category="Product UX"
                accent="#f59e0b"
              />
              <ShowcaseCard
                image="/assets/iridescent_glass_footer.jpg"
                title="Iridescent Glass Shaders"
                category="Kinetics"
                accent="#8b5cf6"
              />
              <ShowcaseCard
                image="/assets/card_creative_jam.jpg"
                title="Creative Jam Experience"
                category="Interactive"
                accent="#ec4899"
              />
            </div>

            {/* Column 3 (Right - Speed 1.1x, Tilt 2.5deg) */}
            <div
              ref={col3Ref}
              className="flex flex-col gap-6 sm:gap-8 will-change-transform items-center"
              style={{ transform: "rotate(2.5deg)" }}
            >
              <ShowcaseCard
                image="/assets/concepts/ganesh_ps_about_me_sketchbook_spread_1793291341733.jpg"
                title="Visual Ledger & Identity"
                category="Brand Craft"
                accent="#10b981"
              />
              <ShowcaseCard
                image="/assets/card_creative_podcast.jpg"
                title="Cinematic Soundscapes"
                category="Audio Hub"
                accent="#6366f1"
              />
              <ShowcaseCard
                image="/assets/concepts/about_me_scrapbook_poster_mockup_1793291710800.jpg"
                title="Poster & Editorial Form"
                category="Art Direction"
                accent="#ef4444"
              />
            </div>

          </div>
        </div>

        {/* ──────── MAIN STAGE: 2-COLUMN EDITORIAL GRID & ANCHOR (Z-20 & Z-30) ──────── */}
        <div
          ref={stageGridRef}
          className="relative z-20 w-full max-w-[1020px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          
          {/* ──────── 1. LEFT COLUMN: 1:1 SQUARE LIVING POLAROID (Phase 1) ──────── */}
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

          {/* ──────── 2. RIGHT COLUMN: SORA EDITORIAL TYPOGRAPHY ──────── */}
          <div
            ref={textContainerRef}
            className="lg:col-span-7 flex flex-col justify-between text-left h-full max-w-[580px] select-text font-sora"
            style={{
              fontFamily: "var(--font-sora), sans-serif",
            }}
          >
            {/* Paragraphs 1 & 2 Container (Glides upward in Phase 2) */}
            <div ref={paragraphsRef} className="will-change-transform">
              {/* Paragraph 1: Origin & Spark (5 lines strictly matching Image 2) */}
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

              {/* Paragraph 2: Detour & Beyond the Screen (4 lines strictly matching Image 2) */}
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

            {/* ──────── CLOSING STATEMENT & CENTER-LOCK ANCHOR (Z-30) ──────── */}
            <div className="mt-6 sm:mt-7">
              <div
                ref={punchlineContainerRef}
                className="inline-block will-change-transform z-30"
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
      </div>
    </section>
  );
};
