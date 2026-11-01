"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FloatingImageProps {
  image: string;
  alt: string;
  className?: string;
}

/**
 * Pure Full-Bleed Floating Image Component (Zero outer padding, zero metadata labels)
 * Conforms to: "remove the extra outer space on the images - just the image is enough"
 */
const FloatingImage: React.FC<FloatingImageProps> = ({
  image,
  alt,
  className = "",
}) => (
  <div
    className={`overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_20px_45px_rgba(0,0,0,0.14),0_4px_12px_rgba(0,0,0,0.06)] border border-black/[0.06] select-none transition-transform duration-300 hover:scale-[1.03] aspect-[4/5] ${className}`}
  >
    <img
      src={image}
      alt={alt}
      className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[1.01]"
      loading="lazy"
    />
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
  const punchlineRef = useRef<HTMLHeadingElement>(null);
  const punchlineChromaticRef = useRef<HTMLSpanElement>(null);

  // 7 Showcase Image Refs positioned to match Image 3 benchmark
  const cardsRiverRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null); // Far Top-Left
  const card2Ref = useRef<HTMLDivElement>(null); // Upper-Left
  const card3Ref = useRef<HTMLDivElement>(null); // Upper Center-Right
  const card4Ref = useRef<HTMLDivElement>(null); // Upper Far-Right (Foreground)
  const card5Ref = useRef<HTMLDivElement>(null); // Far Bottom-Left
  const card6Ref = useRef<HTMLDivElement>(null); // Bottom Center-Left (Foreground)
  const card7Ref = useRef<HTMLDivElement>(null); // Bottom Center-Right

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
      // 2. CDG STUDIO SIGNATURE SCROLL CHOREOGRAPHY (+=380% PINNED TIMELINE)
      // Phase 1 (0.00 -> 0.35): Origin Story (Video scrub + Spidey text reveal)
      // Phase 2 (0.35 -> 0.52): Dead-Center Glide (Perfect center, refined medium weight)
      // Phase 3 (0.52 -> 0.85): 7-Image Multi-Plane Parallax Stream (Strict Image 3 layout)
      //   - Background Cards (z-10): Cards 1, 2, 3, 5, 7 stream with 0.9x parallax depth
      //   - Centered Focal Punchline (z-20): Locked dead-center in open negative space
      //   - Foreground Cards (z-30): Cards 4 & 6 stream with 1.25x speed & deeper shadows
      // Phase 4 (0.85 -> 1.00): Clean outro & fluid handoff into next section
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

        // Background layer cards (z-10) & Foreground layer cards (z-30)
        const bgCards = [
          card1Ref.current,
          card2Ref.current,
          card3Ref.current,
          card5Ref.current,
          card7Ref.current,
        ].filter(Boolean);

        const fgCards = [card4Ref.current, card6Ref.current].filter(Boolean);

        // Set initial offscreen positions below viewport
        if (bgCards.length > 0) gsap.set(bgCards, { y: "90vh" });
        if (fgCards.length > 0) gsap.set(fgCards, { y: "105vh" });
        if (punchlineChromaticRef.current) gsap.set(punchlineChromaticRef.current, { opacity: 0, backgroundPositionX: "0px" });

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",      // Strictly start only when section reaches top
            end: "+=380%",         // Generous scroll travel for full reading & showcase stream
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
        // PHASE 2: DEAD-CENTER GLIDE (Progress 0.35 -> 0.52)
        // STRICT: Perfect center from all sides (horizontally & vertically)
        // STRICT: 100% RAW typography directly on canvas (NO pills/capsules)
        // STRICT: Refined medium font weight (not overly bold)
        // ═════════════════════════════════════════════════════════════
        masterTl.addLabel("glide", ">0.15");

        // 1. Polaroid card translates upward and dissolves
        if (polaroidContainerRef.current) {
          masterTl.to(
            polaroidContainerRef.current,
            {
              opacity: 0,
              y: -120,
              scale: 0.94,
              ease: "power2.inOut",
              duration: 1.6,
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
              y: -120,
              ease: "power2.inOut",
              duration: 1.6,
            },
            "glide"
          );
        }

        // 3. Closing statement glides to DEAD CENTER OF VIEWPORT FROM ALL SIDES
        if (punchlineRef.current) {
          masterTl.to(
            punchlineRef.current,
            {
              x: () => {
                const pinWrapperEl = pinWrapperRef.current;
                const punchlineEl = punchlineRef.current;
                if (!pinWrapperEl || !punchlineEl) return 0;
                const s = pinWrapperEl.getBoundingClientRect();
                const p = punchlineEl.getBoundingClientRect();
                const curX = (gsap.getProperty(punchlineEl, "x") as number) || 0;
                // Dead center horizontally
                return s.left + s.width / 2 - (p.left - curX + p.width / 2);
              },
              y: () => {
                const pinWrapperEl = pinWrapperRef.current;
                const punchlineEl = punchlineRef.current;
                if (!pinWrapperEl || !punchlineEl) return 0;
                const s = pinWrapperEl.getBoundingClientRect();
                const p = punchlineEl.getBoundingClientRect();
                const curY = (gsap.getProperty(punchlineEl, "y") as number) || 0;
                // Dead center vertically
                return s.top + s.height / 2 - (p.top - curY + p.height / 2);
              },
              scale: () => (window.innerWidth >= 1024 ? 1.45 : 1.2),
              transformOrigin: "center center",
              duration: 1.8,
              ease: "power2.inOut",
            },
            "glide"
          );
        }

        // ═════════════════════════════════════════════════════════════
        // PHASE 3: 7-IMAGE MULTI-PLANE STREAM (Progress 0.52 -> 0.85)
        // Strict Image 3 Placements framing the dead-centered headline
        // + Continuous Chromatic Wave scrubbing across text in Image 2
        // ═════════════════════════════════════════════════════════════
        masterTl.addLabel("stream", ">0.05");

        // Fade in showcase cards river
        if (cardsRiverRef.current) {
          masterTl.to(cardsRiverRef.current, { opacity: 1, duration: 0.35, ease: "power1.in" }, "stream");
        }

        // Chromatic Color Wave: sweeps across the text continuously while scrolling in Image 2
        if (punchlineChromaticRef.current) {
          masterTl.to(
            punchlineChromaticRef.current,
            { opacity: 1, duration: 0.4, ease: "power1.in" },
            "stream"
          );

          masterTl.fromTo(
            punchlineChromaticRef.current,
            { backgroundPositionX: "0px" },
            {
              backgroundPositionX: "-3100px", // 5 full passes (620px period) while scrolling through Phase 3
              duration: 3.0,
              ease: "none",
            },
            "stream"
          );
        }

        // Background Cards (z-10): Parallax speed 0.9x (float from +90vh to -90vh)
        if (bgCards.length > 0) {
          masterTl.to(
            bgCards,
            {
              y: "-90vh",
              duration: 3.0,
              ease: "none",
            },
            "stream"
          );
        }

        // Foreground Cards (z-30): Parallax speed 1.25x (travel +105vh to -115vh for realistic 3D depth)
        if (fgCards.length > 0) {
          masterTl.to(
            fgCards,
            {
              y: "-115vh",
              duration: 3.0,
              ease: "none",
            },
            "stream"
          );
        }

        // ═════════════════════════════════════════════════════════════
        // PHASE 4: CLEAN OUTRO & HANDOFF (Progress 0.85 -> 1.00)
        // ═════════════════════════════════════════════════════════════
        masterTl.addLabel("outro", ">-0.2");

        // Closing statement translates gently up and dissolves
        if (punchlineRef.current) {
          masterTl.to(
            punchlineRef.current,
            {
              y: "-=50px",
              opacity: 0,
              duration: 1.0,
              ease: "power2.inOut",
            },
            "outro"
          );
        }

        // Fade out chromatic overlay
        if (punchlineChromaticRef.current) {
          masterTl.to(
            punchlineChromaticRef.current,
            {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
            },
            "outro"
          );
        }

        // Showcase cards dissolve as they finish upward travel
        if (cardsRiverRef.current) {
          masterTl.to(cardsRiverRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "outro");
        }

        // Fluid release buffer into next section
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
        className="relative w-full h-screen min-h-screen flex items-center justify-center bg-transparent overflow-hidden"
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

          .chromatic-scroll-pass {
            background-image: repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 100px,
              #b91c1c 150px,
              #ef4444 190px,
              #e11d48 230px,
              #9333ea 270px,
              #2563eb 310px,
              #38bdf8 345px,
              #e2e8f0 375px,
              #94a3b8 405px,
              transparent 450px,
              transparent 620px
            );
            background-size: 620px 100%;
            background-position-x: 0px;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
            display: block;
          }
        `}</style>

        {/* ──────── 1. SHOWCASE IMAGES RIVER: EXACT IMAGE 3 BENCHMARK PLACEMENTS ──────── */}
        <div
          ref={cardsRiverRef}
          className="absolute inset-0 pointer-events-none overflow-hidden opacity-0"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Card 1: Far Top-Left (Creative Block cutting mat, z-10) */}
          <div
            ref={card1Ref}
            className="absolute z-10 will-change-transform hidden sm:block"
            style={{ left: "2%", top: "-2%" }}
          >
            <FloatingImage
              image="/assets/showcase/s_img_6.png"
              alt="Creative Block cutting mat"
              className="w-[180px] sm:w-[220px] lg:w-[260px] -rotate-3"
            />
          </div>

          {/* Card 2: Upper-Left (SkillBridge Laptop Screen, z-10) */}
          <div
            ref={card2Ref}
            className="absolute z-10 will-change-transform"
            style={{ left: "11%", top: "-6%" }}
          >
            <FloatingImage
              image="/assets/showcase/s_img_7.png"
              alt="SkillBridge Laptop Screen"
              className="w-[200px] sm:w-[250px] lg:w-[290px] rotate-1"
            />
          </div>

          {/* Card 3: Upper Center-Right (Project MOOV Yellow Folder, z-10) */}
          <div
            ref={card3Ref}
            className="absolute z-10 will-change-transform"
            style={{ left: "47%", top: "-5%" }}
          >
            <FloatingImage
              image="/assets/showcase/s_img_5.png"
              alt="Project MOOV Folder"
              className="w-[200px] sm:w-[250px] lg:w-[290px] -rotate-2"
            />
          </div>

          {/* Card 4: Upper Far-Right (Hand with Glass Card - Foreground z-30, Deeper Shadow) */}
          <div
            ref={card4Ref}
            className="absolute z-30 will-change-transform"
            style={{ left: "73%", top: "10%" }}
          >
            <FloatingImage
              image="/assets/showcase/s_img_1.png"
              alt="Iridescent Glass Interface"
              className="w-[190px] sm:w-[240px] lg:w-[280px] rotate-3 shadow-[0_28px_56px_rgba(0,0,0,0.22),0_8px_20px_rgba(0,0,0,0.08)] border border-black/[0.08]"
            />
          </div>

          {/* Card 5: Far Bottom-Left (Blue Peel Interface "061", z-10) */}
          <div
            ref={card5Ref}
            className="absolute z-10 will-change-transform hidden sm:block"
            style={{ left: "1%", top: "56%" }}
          >
            <FloatingImage
              image="/assets/showcase/s_img_3.png"
              alt="Kinetic UI Dimensions"
              className="w-[180px] sm:w-[220px] lg:w-[260px] -rotate-4"
            />
          </div>

          {/* Card 6: Bottom Center-Left (Person with Red Glowing Cube - Foreground z-30, Deeper Shadow) */}
          <div
            ref={card6Ref}
            className="absolute z-30 will-change-transform"
            style={{ left: "24%", top: "52%" }}
          >
            <FloatingImage
              image="/assets/showcase/s_img_2.png"
              alt="Featured Red Glowing Cube"
              className="w-[190px] sm:w-[240px] lg:w-[290px] rotate-2 shadow-[0_28px_56px_rgba(0,0,0,0.22),0_8px_20px_rgba(0,0,0,0.08)] border border-black/[0.08]"
            />
          </div>

          {/* Card 7: Bottom Center-Right (Orange Skull Ninja Cards, z-10) */}
          <div
            ref={card7Ref}
            className="absolute z-10 will-change-transform hidden md:block"
            style={{ left: "59%", top: "55%" }}
          >
            <FloatingImage
              image="/assets/showcase/s_img_4.png"
              alt="Brand Craft Architecture"
              className="w-[190px] sm:w-[230px] lg:w-[280px] -rotate-3"
            />
          </div>
        </div>

        {/* ──────── 2. TEXT PLANE: 12-COLUMN STAGE & CENTERED HERO STATEMENT (Z-20) ──────── */}
        <div className="relative z-20 w-full max-w-[1200px] mx-auto px-6 lg:px-12 flex items-center justify-center">
          <div
            ref={stageGridRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start w-full"
          >
            
            {/* ──────── Left Column: 1:1 Square Living Polaroid (Cols 1-5) ──────── */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start items-center">
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

            {/* ──────── Right Column: Sora Editorial Typography (Cols 6-12) ──────── */}
            <div
              ref={textContainerRef}
              className="lg:col-span-7 flex flex-col justify-start text-left h-full max-w-[620px] select-text font-sora"
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

              {/* ──────── CLOSING STATEMENT & CENTER-LOCK ANCHOR (Z-20, REFINED MEDIUM WEIGHT) ──────── */}
              <div className="mt-6 sm:mt-7">
                <h3
                  ref={punchlineRef}
                  className="relative inline-block font-medium text-[22px] sm:text-[24px] lg:text-[26px] text-[#111111] tracking-[-0.02em] leading-snug whitespace-nowrap will-change-transform select-none"
                  style={{
                    fontFamily: "var(--font-sora), sans-serif",
                    transformOrigin: "center center",
                  }}
                >
                  {/* Base text: reveals in Phase 1 and holds solid black in Phase 2 & 3 */}
                  <span className="block fill-editorial-line fill-punchline font-medium">
                    By Bringing Pixels to life.
                  </span>

                  {/* Chromatic Wave Overlay: continuously sweeps across text while scrolling in Image 2 */}
                  <span
                    ref={punchlineChromaticRef}
                    aria-hidden="true"
                    className="absolute inset-0 block font-medium chromatic-scroll-pass pointer-events-none select-none opacity-0"
                  >
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
