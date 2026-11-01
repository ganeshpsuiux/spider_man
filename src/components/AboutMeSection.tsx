"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AboutMeSection: React.FC = () => {
  const [hoveredPolaroid, setHoveredPolaroid] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const polaroidContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const paragraphsContainerRef = useRef<HTMLDivElement>(null);
  const punchlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline when section scrolls near viewport
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      if (polaroidContainerRef.current) {
        entranceTl.fromTo(
          polaroidContainerRef.current,
          { opacity: 0, x: -50, rotate: -8, scale: 0.94 },
          { opacity: 1, x: 0, rotate: -2.5, scale: 1, duration: 0.9, ease: "back.out(1.2)" }
        );
      }

      if (textContainerRef.current) {
        entranceTl.fromTo(
          textContainerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );
      }

      // ─────────────────────────────────────────────────────────────
      // 2. PINNED SCROLL TIMELINE (+=280%)
      // Phase 1 (0.00 -> 0.70): Dual-chromatic text reveal & synchronized video scrub (Image 1)
      // Phase 2 (0.75 -> 1.00): Continuity Bridge — Polaroid & paragraphs dissolve,
      // and "By Bringing Pixels to life." glides dead-center into the viewport (Image 2)
      // ─────────────────────────────────────────────────────────────
      if (textContainerRef.current) {
        const lineElements = textContainerRef.current.querySelectorAll(".fill-editorial-line");

        // Signature Spidey Suit Chromatic Ramp:
        // Visible window at 100% position is [68.75%, 100%] => 100% pure ghost gray
        // Visible window at 0% position is [0%, 31.25%] => 100% pure obsidian black
        gsap.set(lineElements, {
          backgroundImage:
            "linear-gradient(to right, #09090b 0%, #09090b 34%, #18181b 38%, #dc2626 46%, #ef4444 52%, #3b82f6 57%, #2563eb 60%, #d4d4d8 64%, #e4e4e7 100%)",
          backgroundSize: "320% 100%",
          backgroundPositionX: "100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          display: "inline-block",
        });

        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=280%",
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Video scrub synchronized to scroll progress (completes full reel by ~75% of timeline)
              if (video && Number.isFinite(video.duration) && video.duration > 0) {
                const targetTime = Math.min(self.progress * 1.3, 1) * video.duration;
                if (Math.abs(video.currentTime - targetTime) > 0.04) {
                  video.currentTime = targetTime;
                }
              }
            },
          },
        });

        // ── Paragraph 1: Origin & Spark (Progress 0.00 -> 0.35) ──
        pinTl.to(".fill-p1-1", { backgroundPositionX: "0%", ease: "none", duration: 0.8 });
        pinTl.to(".fill-p1-2", { backgroundPositionX: "0%", ease: "none", duration: 0.8 }, "-=0.35");
        pinTl.to(".fill-p1-3", { backgroundPositionX: "0%", ease: "none", duration: 0.8 }, "-=0.35");
        pinTl.to(".fill-p1-4", { backgroundPositionX: "0%", ease: "none", duration: 0.8 }, "-=0.35");
        pinTl.to(".fill-p1-5", { backgroundPositionX: "0%", ease: "none", duration: 0.8 }, "-=0.35");

        // ── Paragraph 2: Detour & Beyond the Screen (Progress 0.35 -> 0.68) ──
        pinTl.to(".fill-p2-1", { backgroundPositionX: "0%", ease: "none", duration: 0.85 });
        pinTl.to(".fill-p2-2", { backgroundPositionX: "0%", ease: "none", duration: 0.85 }, "-=0.35");
        pinTl.to(".fill-p2-3", { backgroundPositionX: "0%", ease: "none", duration: 0.85 }, "-=0.35");
        pinTl.to(".fill-p2-4", { backgroundPositionX: "0%", ease: "none", duration: 0.85 }, "-=0.35");

        // ── Closing Statement Reveal (Progress 0.65 -> 0.78) ──
        pinTl.to(".fill-punchline", { backgroundPositionX: "0%", ease: "none", duration: 0.95 }, "-=0.2");

        // ── CONTINUITY BRIDGE: Image 1 ➔ Image 2 Phase (Progress 0.78 -> 0.95) ──
        pinTl.addLabel("bridge", ">0.1");

        // 1. Polaroid dissolves and floats gently upward
        if (polaroidContainerRef.current) {
          pinTl.to(
            polaroidContainerRef.current,
            {
              opacity: 0,
              y: -40,
              scale: 0.96,
              ease: "power2.inOut",
              duration: 1.0,
            },
            "bridge"
          );
        }

        // 2. Paragraphs 1 & 2 dissolve and float gently upward
        if (paragraphsContainerRef.current) {
          pinTl.to(
            paragraphsContainerRef.current,
            {
              opacity: 0,
              y: -30,
              ease: "power2.inOut",
              duration: 1.0,
            },
            "bridge"
          );
        }

        // 3. "By Bringing Pixels to life." glides from right column into dead center of the viewport
        if (punchlineRef.current) {
          pinTl.to(
            punchlineRef.current,
            {
              x: () => {
                const s = sectionRef.current?.getBoundingClientRect();
                const p = punchlineRef.current?.getBoundingClientRect();
                if (!s || !p) return 0;
                const curX = (gsap.getProperty(punchlineRef.current, "x") as number) || 0;
                return s.left + s.width / 2 - (p.left - curX + p.width / 2);
              },
              y: () => {
                const s = sectionRef.current?.getBoundingClientRect();
                const p = punchlineRef.current?.getBoundingClientRect();
                if (!s || !p) return 0;
                const curY = (gsap.getProperty(punchlineRef.current, "y") as number) || 0;
                return s.top + s.height / 2 - (p.top - curY + p.height / 2);
              },
              scale: 1.25,
              ease: "power2.inOut",
              duration: 1.2,
            },
            "bridge"
          );
        }

        // Brief hold beat in Image 2 state before unpinning into next section
        pinTl.to({}, { duration: 0.6 });
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
      {/* Dynamic Spidey Text Shader Styles */}
      <style>{`
        .fill-editorial-line {
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

        @media (min-width: 1024px) {
          .fill-editorial-line {
            white-space: nowrap;
          }
        }
      `}</style>

      {/* Main Content Stage: 2-Column Grid (Image 1) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* ──────── 1. LEFT COLUMN: 1:1 SQUARE LIVING POLAROID (Image 1) ──────── */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div
            ref={polaroidContainerRef}
            onMouseEnter={() => setHoveredPolaroid(true)}
            onMouseLeave={() => setHoveredPolaroid(false)}
            className={`relative bg-white p-3.5 sm:p-4 pb-8 sm:pb-9 rounded-[4px] shadow-[0_20px_45px_rgba(0,0,0,0.12)] border border-black/[0.07] transition-all duration-500 ease-out cursor-pointer ${
              hoveredPolaroid
                ? "!rotate-0 scale-[1.02] shadow-[0_28px_56px_rgba(0,0,0,0.16)] -translate-y-1.5"
                : "rotate-[-2.5deg] scale-100"
            }`}
            style={{
              width: "350px",
              maxWidth: "100%",
              transformOrigin: "center center",
            }}
          >
            {/* Top-Left Blue/Cyan Washi Tape */}
            <div
              className="absolute -top-3.5 -left-3.5 w-14 h-7 bg-[#9db4ff]/85 backdrop-blur-[0.5px] -rotate-[36deg] shadow-sm pointer-events-none rounded-[1px] border border-white/20 z-20"
              style={{
                clipPath: "polygon(0% 12%, 100% 0%, 94% 88%, 6% 100%, 0% 78%)",
              }}
            />

            {/* Top-Right Yellow/Amber Washi Tape */}
            <div
              className="absolute -top-3 -right-3 w-12 h-6 bg-[#ffe380]/90 backdrop-blur-[0.5px] rotate-[26deg] shadow-sm pointer-events-none rounded-[1px] border border-white/20 z-20"
              style={{
                clipPath: "polygon(4% 0%, 96% 10%, 100% 90%, 0% 100%)",
              }}
            />

            {/* Video Viewport: Strictly 1:1 Square */}
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
            </div>

            {/* Polaroid Bottom Chin: Handwritten "me :)" + Tag */}
            <div className="w-full pt-3 px-1 flex items-center justify-between">
              <span
                className="text-2xl sm:text-[1.7rem] text-[#1e1e1e] tracking-wide select-none"
                style={{
                  fontFamily: "var(--font-caveat), cursive",
                  fontWeight: 700,
                }}
              >
                me :)
              </span>
              <span className="text-[10.5px] sm:text-[11px] font-mono tracking-wider text-zinc-400 select-none">
                Here&apos;s the Story
              </span>
            </div>
          </div>
        </div>

        {/* ──────── 2. RIGHT COLUMN: EDITORIAL TYPOGRAPHY & SCROLL BRIDGE ──────── */}
        <div
          ref={textContainerRef}
          className="lg:col-span-7 flex flex-col justify-center text-left will-change-transform select-text"
          style={{
            fontFamily: "var(--font-inter), var(--font-sora), sans-serif",
          }}
        >
          {/* Paragraphs Container (Dissolves during Bridge Transition to Image 2) */}
          <div ref={paragraphsContainerRef} className="space-y-6 sm:space-y-8 will-change-transform">
            {/* Paragraph 1: Origin & Spark */}
            <p className="text-[17px] sm:text-[18px] lg:text-[19px] font-normal leading-[1.65] text-zinc-800 tracking-[-0.01em]">
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

            {/* Paragraph 2: Detour & Beyond the Screen */}
            <p className="text-[17px] sm:text-[18px] lg:text-[19px] font-normal leading-[1.65] text-zinc-800 tracking-[-0.01em]">
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

          {/* Closing Statement: Glides to Dead Center of Viewport (Image 2) */}
          <div className="mt-6 sm:mt-8 will-change-transform">
            <h3
              ref={punchlineRef}
              className="inline-block text-xl sm:text-2xl lg:text-[1.75rem] font-semibold text-black tracking-tight leading-snug will-change-transform"
              style={{ transformOrigin: "center center" }}
            >
              <span className="fill-editorial-line fill-punchline">
                By Bringing Pixels to life.
              </span>
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
};
