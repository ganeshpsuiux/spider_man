"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AboutMeSection: React.FC = () => {
  const [hoveredPolaroid, setHoveredPolaroid] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftPolaroidRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const rightPolaroidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline when section scrolls near viewport
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Top Header & Note Fade-in
      if (headerRef.current) {
        entranceTl.fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      }

      // Left Polaroid Smooth Slide & Swing
      if (leftPolaroidRef.current) {
        entranceTl.fromTo(
          leftPolaroidRef.current,
          { opacity: 0, x: -60, rotate: -12, scale: 0.9 },
          { opacity: 1, x: 0, rotate: -4, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
          "-=0.4"
        );
      }

      // Center Narrative Container Fade & Rise
      if (centerTextRef.current) {
        entranceTl.fromTo(
          centerTextRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" },
          "-=0.5"
        );
      }

      // Stuff Box Physical Slide & Rotate Entrance
      if (rightPolaroidRef.current) {
        entranceTl.fromTo(
          rightPolaroidRef.current,
          {
            opacity: 0,
            x: 280,
            y: 30,
            rotate: 45,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.55"
        );
      }

      // ─────────────────────────────────────────────────────────────
      // 2. PINNED CENTER-SCREEN STICKY SCROLL TIMELINE
      // Locks dead-center in viewport (+=250%) while lines reveal progressively:
      // [Obsidian Black] -> [Charcoal] -> [Electric Red] -> [Neon Blue] -> [Ghost Gray]
      // ─────────────────────────────────────────────────────────────
      if (centerTextRef.current) {
        // Mathematically calibrated 320% ramp:
        // Visible window at 100% position is [68.75%, 100%] => 100% PURE GHOST GRAY (zero blue bleed!)
        // Visible window at 0% position is [0%, 31.25%] => 100% PURE OBSIDIAN BLACK
        const spideySuitRamp =
          "linear-gradient(to right, #09090b 0%, #09090b 34%, #18181b 38%, #dc2626 46%, #ef4444 52%, #3b82f6 57%, #2563eb 60%, #d4d4d8 64%, #e4e4e7 100%)";

        const blackItems = centerTextRef.current.querySelectorAll(
          ".fill-line-1, .fill-line-2, .fill-line-3, .fill-line-4, .fill-line-5, .fill-line-6, .fill-line-7, .fill-line-8-black"
        );
        gsap.set(blackItems, {
          backgroundImage: spideySuitRamp,
          backgroundSize: "320% 100%",
          backgroundPositionX: "100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          display: "inline-block",
        });

        // Dual-Chromatic Spidey Ramp for "AI and vibe coding." resolving to electric royal blue
        const blueItem = centerTextRef.current.querySelector(".fill-line-8-blue");
        if (blueItem) {
          gsap.set(blueItem, {
            backgroundImage:
              "linear-gradient(to right, #1d4ed8 0%, #2563eb 34%, #1d4ed8 38%, #dc2626 46%, #ef4444 52%, #3b82f6 57%, #60a5fa 60%, #d4d4d8 64%, #e4e4e7 100%)",
            backgroundSize: "320% 100%",
            backgroundPositionX: "100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            display: "inline-block",
          });
        }

        // Initialize highlighters and sparks to strictly hidden at rest
        gsap.set([".highlighter-line-1", ".highlighter-line-2"], {
          scaleX: 0,
          transformOrigin: "left center",
        });
        gsap.set([".spark-yellow", ".spark-blue"], {
          opacity: 0,
          scale: 0,
          transformOrigin: "center center",
        });

        // Pinned Timeline: locks section dead-center in viewport for 2.5x viewport height
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=250%",
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
          },
        });

        // ── MILESTONE 1: Block 1 (Intro) ──
        pinTl.to(".fill-line-1", { backgroundPositionX: "0%", ease: "none", duration: 1.0 });
        pinTl.to(".fill-line-2", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.15");

        // ── MILESTONE 2: Block 2 (Career Milestones & Highlighters) ──
        pinTl.to(".fill-line-3", { backgroundPositionX: "0%", ease: "none", duration: 1.1 });
        pinTl.to(".highlighter-line-1", { scaleX: 1, ease: "power1.out", duration: 0.7 }, "<0.4");
        pinTl.to(".spark-yellow", { opacity: 1, scale: 1, ease: "back.out(2)", duration: 0.4 }, "<0.4");

        pinTl.to(".fill-line-4", { backgroundPositionX: "0%", ease: "none", duration: 0.95 });
        pinTl.to(".highlighter-line-2", { scaleX: 1, ease: "power1.out", duration: 0.6 }, "<0.35");

        // ── MILESTONE 3: Block 3 (Philosophy) ──
        pinTl.to(".fill-line-5", { backgroundPositionX: "0%", ease: "none", duration: 1.0 });
        pinTl.to(".fill-line-6", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.15");

        // ── MILESTONE 4: Block 4 (Closer & Vibe Coding) ──
        pinTl.to(".fill-line-7", { backgroundPositionX: "0%", ease: "none", duration: 1.0 });
        pinTl.to(".fill-line-8-black", { backgroundPositionX: "0%", ease: "none", duration: 0.45 });
        pinTl.to(".fill-line-8-blue", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "<0.15");
        pinTl.to(".spark-blue", { opacity: 1, scale: 1, ease: "back.out(2)", duration: 0.4 }, "<0.3");

        // Brief hold so user can appreciate the fully revealed narrative before release
        pinTl.to({}, { duration: 0.4 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-me-section"
      className="relative w-full h-screen min-h-screen bg-transparent text-black flex items-center justify-center px-4 sm:px-8 lg:px-12 overflow-hidden select-none"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Signature Spidey Suit Chromatic Ramp:
          At 100% position, window is [68.75%, 100%] -> 100% UNREVEALED GHOST GRAY (zero blue bleed!)
          During scroll, sweeps Electric Blue -> Radiant Red -> Obsidian Black
          At 0% position, window is [0%, 31.25%] -> 100% OBSIDIAN BLACK */}
      <style>{`
        .fill-line-item {
          background-image: linear-gradient(
            to right,
            #09090b 0%,
            #09090b 34%,
            #18181b 38%,
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
        .fill-line-8-blue {
          background-image: linear-gradient(
            to right,
            #1d4ed8 0%,
            #2563eb 34%,
            #1d4ed8 38%,
            #dc2626 46%,
            #ef4444 52%,
            #3b82f6 57%,
            #60a5fa 60%,
            #d4d4d8 64%,
            #e4e4e7 100%
          ) !important;
        }
      `}</style>

      {/* Main Content Container: Pinned Dead-Center in Viewport */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center">
        {/* Top Header / Corner Note Area */}
        <div
          ref={headerRef}
          className="w-full flex items-start justify-between mb-4 sm:mb-6 lg:mb-8 relative opacity-0"
        >
          {/* Top-Left Handwritten "about me!" */}
          <div className="flex items-center gap-1.5 -rotate-3 hover:rotate-0 transition-transform duration-300 cursor-default">
            <span
              className="text-2xl sm:text-3xl text-[#1a1a1a] tracking-wide"
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontWeight: 700,
              }}
            >
              about me!
            </span>
          </div>

          {/* Center Hand-Drawn "what's up" Badge */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0">
            <div className="relative inline-flex items-center justify-center px-6 py-2 transition-transform duration-300 hover:scale-105">
              {/* Organic Hand-Drawn Sketched Border SVG */}
              <svg
                viewBox="0 0 160 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full text-[#111111] overflow-visible pointer-events-none"
              >
                <path
                  d="M10 8 C40 5, 120 6, 150 9 C155 18, 153 38, 149 46 C120 49, 45 47, 11 48 C7 38, 6 18, 10 8 Z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-90"
                />
              </svg>

              <span
                className="text-2xl sm:text-[1.85rem] text-[#111111] relative z-10 select-none tracking-wide"
                style={{
                  fontFamily: "var(--font-caveat), cursive",
                  fontWeight: 700,
                }}
              >
                what&apos;s up
              </span>
            </div>
          </div>

          {/* Empty right balance spacer */}
          <div className="w-12 h-4 hidden sm:block" />
        </div>

        {/* Center Stage: Left Polaroid | Center Handwritten Story | Right Polaroid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center justify-center my-2 sm:my-4">
          
          {/* ──────── 1. Left Polaroid Photo ("me") ──────── */}
          <div className="lg:col-span-3 flex justify-center order-2 lg:order-1">
            <div
              ref={leftPolaroidRef}
              onMouseEnter={() => setHoveredPolaroid("me")}
              onMouseLeave={() => setHoveredPolaroid(null)}
              className={`relative bg-white p-3 sm:p-3.5 pb-3.5 sm:pb-4 rounded-[4px] shadow-[0_16px_36px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] border border-black/[0.06] opacity-0 transition-all duration-500 ease-out cursor-pointer ${
                hoveredPolaroid === "me"
                  ? "!rotate-0 scale-105 shadow-[0_24px_48px_rgba(0,0,0,0.16)] -translate-y-2 z-20"
                  : "scale-100 z-10"
              }`}
              style={{
                width: "195px",
                transformOrigin: "center center",
              }}
            >
              {/* Top-Left Purple/Blue Washi Tape */}
              <div
                className="absolute -top-3 -left-3 w-12 h-6 bg-[#9db4ff]/80 backdrop-blur-[0.5px] -rotate-[38deg] shadow-sm pointer-events-none rounded-[1px] border border-white/20"
                style={{
                  clipPath:
                    "polygon(0% 10%, 100% 0%, 95% 90%, 5% 100%, 0% 80%)",
                }}
              />

              {/* Top-Right Yellow/Peach Washi Tape */}
              <div
                className="absolute -top-2.5 -right-2.5 w-10 h-5 bg-[#ffe380]/85 backdrop-blur-[0.5px] rotate-[28deg] shadow-sm pointer-events-none rounded-[1px] border border-white/20"
                style={{
                  clipPath:
                    "polygon(4% 0%, 96% 8%, 100% 92%, 0% 100%)",
                }}
              />

              {/* Photo Viewport */}
              <div className="w-full aspect-[4/5] bg-[#f2ede6] rounded-[2px] overflow-hidden relative border border-black/5 shadow-inner">
                <img
                  src="/assets/gg_human.png"
                  alt="Ganesh - Me"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.02] transition-transform duration-700 hover:scale-105"
                />
                {/* Subtle vintage photo grain/vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Polaroid Bottom Handwritten Label */}
              <div className="w-full pt-2.5 text-center">
                <span
                  className="text-lg text-[#333333] tracking-wide"
                  style={{
                    fontFamily: "var(--font-caveat), cursive",
                    fontWeight: 600,
                  }}
                >
                  me :)
                </span>
              </div>
            </div>
          </div>

          {/* ──────── 2. Center Narrative Story with Graphic Highlights ──────── */}
          <div
            ref={centerTextRef}
            className="lg:col-span-6 flex flex-col items-center px-2 sm:px-4 order-1 lg:order-2 will-change-transform opacity-0 select-none text-center"
            style={{
              fontFamily: "var(--font-sora), sans-serif",
            }}
          >
            <div className="flex flex-col items-center gap-3.5 sm:gap-4 max-w-xl mx-auto w-full">
              {/* Block 1: Intro */}
              <div className="text-base sm:text-lg md:text-[1.2rem] font-normal leading-[1.65] text-center w-full">
                <span className="block fill-line-item fill-line-1 py-0.5">An M.Com graduate who took a detour</span>
                <span className="block fill-line-item fill-line-2 py-0.5">into design — and never looked back.</span>
              </div>

              {/* Block 2: Career Path with Yellow Highlighters & Spark */}
              <div className="relative inline-flex flex-col items-center my-0.5 sm:my-1">
                {/* Yellow Hand-Drawn Doodle Rays (Top-Right) */}
                <div
                  className="spark-yellow absolute -top-3.5 -right-6 sm:-right-8 pointer-events-none opacity-0"
                  style={{ opacity: 0, transform: "scale(0)", transformOrigin: "center center" }}
                >
                  <svg
                    className="w-5 h-5 text-[#F59E0B]"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="4" y1="5" x2="16" y2="1.5" />
                    <line x1="3" y1="10" x2="17" y2="10" />
                    <line x1="4" y1="15" x2="16" y2="18.5" />
                  </svg>
                </div>

                <div className="text-base sm:text-[1.18rem] md:text-[1.3rem] font-bold tracking-tight text-center leading-[1.5]">
                  {/* Line 3 with Highlighter */}
                  <div className="relative inline-block px-1">
                    <span className="relative z-10 fill-line-item fill-line-3 py-0.5">Graphic Designer → UI/UX Designer →</span>
                    <span
                      className="highlighter-line-1 absolute -bottom-0.5 left-0 right-0 h-[6px] sm:h-[7px] bg-[#FDE047]/90 rounded-full z-0 origin-left"
                      style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
                    />
                  </div>

                  {/* Line 4 with Highlighter */}
                  <div className="relative inline-block px-1 mt-1">
                    <span className="relative z-10 fill-line-item fill-line-4 py-0.5">Team Lead at Webnox.</span>
                    <span
                      className="highlighter-line-2 absolute -bottom-0.5 left-0 right-0 h-[6px] sm:h-[7px] bg-[#FDE047]/90 rounded-full z-0 origin-left"
                      style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
                    />
                  </div>
                </div>
              </div>

              {/* Block 3: Philosophy */}
              <div className="text-base sm:text-lg md:text-[1.2rem] font-normal leading-[1.65] text-center w-full">
                <span className="block fill-line-item fill-line-5 py-0.5">Every step taught me something new,</span>
                <span className="block fill-line-item fill-line-6 py-0.5">and every project shaped the designer I am today.</span>
              </div>

              {/* Block 4: Closer with Blue Accent & Spark */}
              <div className="text-base sm:text-lg md:text-[1.2rem] font-normal leading-[1.65] text-center w-full">
                <span className="block fill-line-item fill-line-7 py-0.5">This portfolio? Built from that journey —</span>
                <span className="relative inline-flex items-center justify-center gap-1.5 flex-wrap">
                  <span className="fill-line-item fill-line-8-black py-0.5">powered by</span>
                  <span className="fill-line-item fill-line-8-blue font-bold py-0.5">AI and vibe coding.</span>
                  {/* Blue Hand-Drawn Doodle Rays (Bottom-Right) */}
                  <span
                    className="spark-blue absolute -bottom-2 -right-6 sm:-right-7 pointer-events-none opacity-0 inline-block"
                    style={{ opacity: 0, transform: "scale(0)", transformOrigin: "center center" }}
                  >
                    <svg
                      className="w-4 h-4 text-[#2563EB]"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <line x1="4" y1="5" x2="16" y2="1.5" />
                      <line x1="3" y1="10" x2="17" y2="10" />
                      <line x1="4" y1="15" x2="16" y2="18.5" />
                    </svg>
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* ──────── 3. Right Object ("my stuffs" box) ──────── */}
          <div className="lg:col-span-3 flex justify-center order-3">
            <div
              ref={rightPolaroidRef}
              className="relative opacity-0 will-change-transform"
              style={{
                width: "260px",
                maxWidth: "100%",
                transformOrigin: "center center",
              }}
            >
              <div
                className="group relative cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 drop-shadow-[0_16px_28px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_26px_40px_rgba(0,0,0,0.22)]"
              >
                <img
                  src="/assets/stuff_box.png"
                  alt="My Stuffs"
                  className="w-full h-auto object-contain select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
