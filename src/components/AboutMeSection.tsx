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

                // Dynamic HUD timecode badge update (e.g. 0:07 / 0:14)
                if (timecodeRef.current) {
                  const curSec = Math.floor(targetTime);
                  const totalSec = Math.floor(video.duration) || 14;
                  const formatted = `0:${curSec < 10 ? "0" : ""}${curSec} / 0:${totalSec < 10 ? "0" : ""}${totalSec}`;
                  if (timecodeRef.current.textContent !== formatted) {
                    timecodeRef.current.textContent = formatted;
                  }
                }
              }
            },
          },
        });

        // ── Paragraph 1: Origin & Detour (Scroll progress 0.00 -> 0.40) ──
        pinTl.to(".fill-p1-1", { backgroundPositionX: "0%", ease: "none", duration: 1.0 });
        pinTl.to(".fill-p1-2", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.3");
        pinTl.to(".fill-p1-3", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.3");
        pinTl.to(".fill-p1-4", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.3");

        // ── Paragraph 2: Evolution & Frontier (Scroll progress 0.40 -> 0.80) ──
        pinTl.to(".fill-p2-1", { backgroundPositionX: "0%", ease: "none", duration: 1.0 });
        pinTl.to(".fill-p2-2", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.3");
        pinTl.to(".fill-p2-3", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.3");
        pinTl.to(".fill-p2-4", { backgroundPositionX: "0%", ease: "none", duration: 1.0 }, "-=0.3");

        // ── Paragraph 3: Punchline (Scroll progress 0.80 -> 1.00) ──
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
      `}</style>

      {/* Main Content Stage: Balanced 2-Column Editorial Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 px-4 sm:px-6">
        
        {/* ──────── 1. LEFT COLUMN: 1:1 SQUARE LIVING POLAROID (SCRUBBED VIDEO VIEWPORT) ──────── */}
        <div className="w-full lg:w-auto flex justify-center items-center flex-shrink-0">
          <div
            ref={polaroidContainerRef}
            onMouseEnter={() => setHoveredPolaroid(true)}
            onMouseLeave={() => setHoveredPolaroid(false)}
            className={`relative bg-white p-3.5 sm:p-4 pb-10 sm:pb-12 rounded-[4px] shadow-[0_24px_50px_rgba(0,0,0,0.14),0_4px_12px_rgba(0,0,0,0.06)] border border-black/[0.07] transition-all duration-500 ease-out cursor-pointer ${
              hoveredPolaroid
                ? "!rotate-0 scale-[1.02] shadow-[0_32px_64px_rgba(0,0,0,0.18)] -translate-y-1.5"
                : "rotate-[-2.5deg] scale-100"
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

              {/* Subtle CRT / Film Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15 pointer-events-none" />

              {/* Subtle Video HUD Timecode Badge (0:07 / 0:14) in Top-Right Corner */}
              <div
                ref={timecodeRef}
                className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md border border-white/15 text-white/90 pointer-events-none z-10"
              >
                0:07 / 0:14
              </div>
            </div>

            {/* Polaroid Bottom Thick Chin: Handwritten "me :)" + Tag */}
            <div className="w-full pt-3 sm:pt-4 px-1 flex items-center justify-between">
              <span
                className="text-2xl sm:text-[1.75rem] text-[#1e1e1e] tracking-wide select-none"
                style={{
                  fontFamily: "var(--font-caveat), cursive",
                  fontWeight: 700,
                }}
              >
                me :)
              </span>
              <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase select-none">
                SCROLL TO REEL
              </span>
            </div>
          </div>
        </div>

        {/* ──────── 2. RIGHT COLUMN: IMAGE 2 EDITORIAL TEXT ALIGNMENT ──────── */}
        <div
          ref={textContainerRef}
          className="w-full max-w-[620px] lg:max-w-[660px] flex flex-col justify-center text-left will-change-transform select-text"
          style={{
            fontFamily: "var(--font-sora), var(--font-inter), sans-serif",
          }}
        >
          {/* Subtle Top Kicker / Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-400">
              ORIGIN STORY // GANESH PS
            </span>
          </div>

          {/* Paragraph 1: Origin & Detour (Natural wide 60-75 character lines) */}
          <p className="text-[17px] sm:text-[18px] lg:text-[19.5px] font-normal leading-[1.58] lg:leading-[1.62] text-zinc-800 tracking-[-0.015em]">
            <span className="block fill-editorial-line fill-p1-1">
              My journey wasn’t shaped by traditional design schools, but by vision,
            </span>
            <span className="block fill-editorial-line fill-p1-2">
              intention, and obsession. Starting with an M.Com degree and commerce
            </span>
            <span className="block fill-editorial-line fill-p1-3">
              ledgers, I took an unexpected detour into visual craft — mastering design
            </span>
            <span className="block fill-editorial-line fill-p1-4">
              independently through relentless practice and a refusal to settle.
            </span>
          </p>

          {/* Paragraph 2: Evolution & Frontier (Natural wide 60-75 character lines) */}
          <p className="mt-7 sm:mt-8 text-[17px] sm:text-[18px] lg:text-[19.5px] font-normal leading-[1.58] lg:leading-[1.62] text-zinc-800 tracking-[-0.015em]">
            <span className="block fill-editorial-line fill-p2-1">
              That difference is felt in every interface I touch. From crafting raw visual
            </span>
            <span className="block fill-editorial-line fill-p2-2">
              identities to architecting scalable UI/UX systems and leading product teams
            </span>
            <span className="block fill-editorial-line fill-p2-3">
              as Team Lead at Webnox, each chapter sharpened my instincts. Today, I build
            </span>
            <span className="block fill-editorial-line fill-p2-4">
              at the frontier of design and technology — fusing cinematic kinetics with AI and vibe coding.
            </span>
          </p>

          {/* Punchline (Display Weight matching Image 2) */}
          <div className="mt-8">
            <h3 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold tracking-tight text-black leading-snug">
              <span className="block fill-editorial-line fill-punchline">
                I build digital experiences that can’t be ignored.
              </span>
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
};
