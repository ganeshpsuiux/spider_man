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
  const timecodeRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline when section scrolls near viewport
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      if (polaroidContainerRef.current) {
        entranceTl.fromTo(
          polaroidContainerRef.current,
          { opacity: 0, x: -40, rotate: -7, scale: 0.95 },
          { opacity: 1, x: 0, rotate: -2.5, scale: 1, duration: 0.85, ease: "back.out(1.2)" }
        );
      }

      if (textContainerRef.current) {
        entranceTl.fromTo(
          textContainerRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );
      }

      // ─────────────────────────────────────────────────────────────
      // 2. KINETIC SCROLL TIMELINE (start: "top center", end: "bottom center")
      // - Frame-by-frame video scrub
      // - Staggered dual-chromatic Spidey text illumination into solid obsidian (#111111)
      // ─────────────────────────────────────────────────────────────
      if (textContainerRef.current) {
        const lineElements = textContainerRef.current.querySelectorAll(".fill-editorial-line");

        // Signature Spidey Chromatic Ramp:
        // Visible window at 100% position => 100% faint ghost gray (#d4d4d8 / #e4e4e7)
        // Sweeps through Spider-Man Electric Blue (#3b82f6) and Webhead Red (#ef4444)
        // Visible window at 0% position => 100% pure obsidian black (#111111)
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

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Frame-by-frame video scrub
              if (video && Number.isFinite(video.duration) && video.duration > 0) {
                const targetTime = self.progress * video.duration;
                if (Math.abs(video.currentTime - targetTime) > 0.04) {
                  video.currentTime = targetTime;
                }
              }

              // Monospace HUD timecode update (0:00 / 0:14)
              if (timecodeRef.current && video && Number.isFinite(video.duration) && video.duration > 0) {
                const curSec = Math.min(Math.floor(self.progress * video.duration), Math.floor(video.duration));
                const totalSec = Math.floor(video.duration) || 14;
                const formatted = `0:${curSec < 10 ? "0" : ""}${curSec} / 0:${totalSec < 10 ? "0" : ""}${totalSec}`;
                if (timecodeRef.current.textContent !== formatted) {
                  timecodeRef.current.textContent = formatted;
                }
              }
            },
          },
        });

        // ── Paragraph 1: 5 lines (Scroll progress 0.00 -> 0.45) ──
        scrollTl.to(".fill-p1-1", { backgroundPositionX: "0%", ease: "none", duration: 0.8 });
        scrollTl.to(".fill-p1-2", { backgroundPositionX: "0%", ease: "none", duration: 0.8 }, "-=0.35");
        scrollTl.to(".fill-p1-3", { backgroundPositionX: "0%", ease: "none", duration: 0.8 }, "-=0.35");
        scrollTl.to(".fill-p1-4", { backgroundPositionX: "0%", ease: "none", duration: 0.8 }, "-=0.35");
        scrollTl.to(".fill-p1-5", { backgroundPositionX: "0%", ease: "none", duration: 0.8 }, "-=0.35");

        // ── Paragraph 2: 4 lines (Scroll progress 0.45 -> 0.82) ──
        scrollTl.to(".fill-p2-1", { backgroundPositionX: "0%", ease: "none", duration: 0.85 }, "-=0.2");
        scrollTl.to(".fill-p2-2", { backgroundPositionX: "0%", ease: "none", duration: 0.85 }, "-=0.35");
        scrollTl.to(".fill-p2-3", { backgroundPositionX: "0%", ease: "none", duration: 0.85 }, "-=0.35");
        scrollTl.to(".fill-p2-4", { backgroundPositionX: "0%", ease: "none", duration: 0.85 }, "-=0.35");

        // ── Closing Statement: 1 line (Scroll progress 0.80 -> 1.00) ──
        scrollTl.to(".fill-punchline", { backgroundPositionX: "0%", ease: "none", duration: 0.95 }, "-=0.2");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-me-section"
      className="relative w-full min-h-screen flex items-center justify-center bg-transparent py-16 px-6 lg:px-12 select-none"
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

      {/* Main Content Stage: 2-Column Grid (Image 1 Benchmark) */}
      <div className="relative z-10 w-full max-w-[1020px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* ──────── 1. LEFT COLUMN: 1:1 SQUARE LIVING POLAROID (Image 1) ──────── */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div
            ref={polaroidContainerRef}
            onMouseEnter={() => setHoveredPolaroid(true)}
            onMouseLeave={() => setHoveredPolaroid(false)}
            className={`relative bg-white p-3.5 pb-10 rounded-[3px] shadow-[0_20px_45px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] border border-black/[0.06] transition-all duration-500 ease-out cursor-pointer w-[310px] sm:w-[330px] lg:w-[350px] ${
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

              {/* Floating Translucent Glass HUD Badge (0:14 / 0:14) */}
              <div
                ref={timecodeRef}
                className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-sm border border-white/15 text-white/85 pointer-events-none z-10"
              >
                0:14 / 0:14
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

        {/* ──────── 2. RIGHT COLUMN: SORA EDITORIAL TYPOGRAPHY (Matching Image 1 Scale & Height) ──────── */}
        <div
          ref={textContainerRef}
          className="lg:col-span-7 flex flex-col justify-between text-left h-full max-w-[580px] select-text font-sora"
          style={{
            fontFamily: "var(--font-sora), sans-serif",
          }}
        >
          {/* Paragraph 1: Origin & Spark (5 lines strictly matching Image 1) */}
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

          {/* Paragraph 2: Detour & Beyond the Screen (4 lines strictly matching Image 1) */}
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

          {/* Closing Statement (Sora Bold Display Line) */}
          <div className="mt-6 sm:mt-7">
            <h3 className="font-bold text-[22px] sm:text-[24px] lg:text-[26px] text-black tracking-tight leading-snug">
              <span className="block fill-editorial-line fill-punchline">
                By Bringing Pixels to life.
              </span>
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
};
