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

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline when section enters view
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
          { opacity: 1, x: 0, rotate: -2.8, scale: 1, duration: 0.9, ease: "back.out(1.2)" }
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
      // 2. PINNED SCROLL CHOREOGRAPHY (+=250%)
      // Video scrubs smoothly through its timeline while text
      // lines sweep through the Spidey Red & Blue gradient into solid black!
      // ─────────────────────────────────────────────────────────────
      if (textContainerRef.current) {
        const lineElements = textContainerRef.current.querySelectorAll(".fill-editorial-line");

        // Mathematically calibrated 320% Spidey Suit Ramp:
        // Visible window at 100% position is [68.75%, 100%] => 100% pure ghost gray (zero blue bleed!)
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
            end: "+=250%",
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            onUpdate: (self) => {
              // Video scrub synchronized to scroll progress
              if (video && Number.isFinite(video.duration) && video.duration > 0) {
                const targetTime = self.progress * video.duration;
                if (Math.abs(video.currentTime - targetTime) > 0.04) {
                  video.currentTime = targetTime;
                }
              }
            },
          },
        });

        // ── Paragraph 1: 5 lines (Scroll progress 0.00 -> 0.45) ──
        pinTl.to(".fill-p1-1", { backgroundPositionX: "0%", ease: "none", duration: 1.0 });
        pinTl.to(".fill-p1-2", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.35");
        pinTl.to(".fill-p1-3", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.35");
        pinTl.to(".fill-p1-4", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.35");
        pinTl.to(".fill-p1-5", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.35");

        // ── Paragraph 2: 5 lines (Scroll progress 0.45 -> 0.85) ──
        pinTl.to(".fill-p2-1", { backgroundPositionX: "0%", ease: "none", duration: 1.0 });
        pinTl.to(".fill-p2-2", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.35");
        pinTl.to(".fill-p2-3", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.35");
        pinTl.to(".fill-p2-4", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.35");
        pinTl.to(".fill-p2-5", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.35");

        // ── Last 1 line: Punchline (Scroll progress 0.85 -> 1.00) ──
        pinTl.to(".fill-punchline", { backgroundPositionX: "0%", ease: "none", duration: 1.1 });

        // Brief hold so user appreciates the complete composition
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

      {/* Main Content Stage: Balanced 2-Column Cinema Layout matching Reference Image */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 px-4 sm:px-6">
        
        {/* ──────── 1. LEFT COLUMN: 1:1 SQUARE LIVING POLAROID ──────── */}
        <div className="w-full lg:w-auto flex justify-center items-center flex-shrink-0">
          <div
            ref={polaroidContainerRef}
            onMouseEnter={() => setHoveredPolaroid(true)}
            onMouseLeave={() => setHoveredPolaroid(false)}
            className={`relative bg-white p-3.5 sm:p-4 pb-8 sm:pb-9 rounded-[4px] shadow-[0_20px_45px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.05)] border border-black/[0.07] transition-all duration-500 ease-out cursor-pointer ${
              hoveredPolaroid
                ? "!rotate-0 scale-[1.02] shadow-[0_28px_56px_rgba(0,0,0,0.16)] -translate-y-1.5"
                : "rotate-[-2.8deg] scale-100"
            }`}
            style={{
              width: "360px",
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

            {/* Polaroid Moving Video Viewport (Strict 1:1 Square) */}
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

        {/* ──────── 2. RIGHT COLUMN: 2 PARAGRAPHS + LAST 1 LINE ──────── */}
        <div
          ref={textContainerRef}
          className="w-full max-w-[620px] flex flex-col justify-center text-left will-change-transform select-text"
          style={{
            fontFamily: "var(--font-inter), var(--font-sora), sans-serif",
          }}
        >
          {/* Paragraph 1 (5 Lines) */}
          <p className="text-[17.5px] sm:text-[18px] lg:text-[18.5px] font-normal leading-[1.62] text-zinc-800 tracking-[-0.015em]">
            <span className="block fill-editorial-line fill-p1-1">
              My journey wasn’t shaped by traditional design schools, but by
            </span>
            <span className="block fill-editorial-line fill-p1-2">
              vision, intention, and obsession. Starting with an M.Com degree
            </span>
            <span className="block fill-editorial-line fill-p1-3">
              and commerce ledgers, I took an unexpected detour into visual
            </span>
            <span className="block fill-editorial-line fill-p1-4">
              craft—mastering design independently through relentless practice
            </span>
            <span className="block fill-editorial-line fill-p1-5">
              and a refusal to settle.
            </span>
          </p>

          {/* Paragraph 2 (5 Lines — "and leading product teams" continuous without breaking) */}
          <p className="mt-6 sm:mt-7 text-[17.5px] sm:text-[18px] lg:text-[18.5px] font-normal leading-[1.62] text-zinc-800 tracking-[-0.015em]">
            <span className="block fill-editorial-line fill-p2-1">
              That difference is felt in every interface I touch. From crafting raw
            </span>
            <span className="block fill-editorial-line fill-p2-2">
              visual identities to architecting scalable UI/UX systems
            </span>
            <span className="block fill-editorial-line fill-p2-3">
              and leading product teams as Team Lead at Webnox, each chapter
            </span>
            <span className="block fill-editorial-line fill-p2-4">
              sharpened my instincts. Today, I build at the frontier of design
            </span>
            <span className="block fill-editorial-line fill-p2-5">
              and technology—fusing cinematic kinetics with AI and vibe coding.
            </span>
          </p>

          {/* Last 1 Line (Punchline) */}
          <div className="mt-6 sm:mt-7">
            <p className="text-[17.5px] sm:text-[18px] lg:text-[18.5px] font-normal leading-[1.62] text-zinc-900 tracking-[-0.015em]">
              <span className="block fill-editorial-line fill-punchline">
                I build digital experiences that can’t be ignored.
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
