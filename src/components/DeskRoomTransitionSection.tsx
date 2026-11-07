"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WorkspaceDesktopSection } from "@/components/WorkspaceDesktopSection";
import {
  Sparkles,
  ExternalLink,
  ChevronDown,
  Pin,
  Layers,
  Code2,
  Workflow,
  CheckCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// Jar Sequence Frames (P1 -> P5 Ideas Filling Sequence)
// ─────────────────────────────────────────────────────────────
const JAR_FRAMES = [
  "/assets/room/Jar P1.png",
  "/assets/room/Jar P2.png",
  "/assets/room/Jar P3.png",
  "/assets/room/Jar P4.png",
  "/assets/room/Jar P5.png",
];

// Preload jar frames to prevent any flash during scrubbing
if (typeof window !== "undefined") {
  JAR_FRAMES.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

export const DeskRoomTransitionSection: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const pinViewportRef = useRef<HTMLDivElement | null>(null);
  const cameraRigRef = useRef<HTMLDivElement | null>(null);
  const greenBoardRef = useRef<HTMLDivElement | null>(null);
  const boardContentRef = useRef<HTMLDivElement | null>(null);
  const monitorBezelRef = useRef<HTMLDivElement | null>(null);
  const screenDisplayRef = useRef<HTMLDivElement | null>(null);
  const lampRef = useRef<HTMLDivElement | null>(null);
  const lampGlowRef = useRef<HTMLDivElement | null>(null);
  const jarStackRef = useRef<HTMLDivElement | null>(null);

  // Active Jar Frame Index (0 to 4)
  const [currentJarIndex, setCurrentJarIndex] = useState<number>(0);
  const [stageScale, setStageScale] = useState<number>(1);
  const [isBoardInteractive, setIsBoardInteractive] = useState<boolean>(false);

  // ─────────────────────────────────────────────────────────────
  // Dynamic Responsive Scale for 1920x1080 Stage
  // Guarantees zero letterboxing across all displays & mobile
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scaleX = vw / 1920;
      const scaleY = vh / 1080;
      // Use cover scale so the 1920x1080 camera stage fills 100% of the screen
      const scale = Math.max(scaleX, scaleY);
      setStageScale(scale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // GSAP ScrollTrigger Master Timeline (Pinned Scrub: 1)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const trigger = triggerRef.current;
    const pinViewport = pinViewportRef.current;
    const cameraRig = cameraRigRef.current;
    const greenBoard = greenBoardRef.current;
    const boardContent = boardContentRef.current;
    const monitorBezel = monitorBezelRef.current;
    const lamp = lampRef.current;
    const lampGlow = lampGlowRef.current;

    if (!trigger || !pinViewport || !cameraRig) return;

    const ctx = gsap.context(() => {
      // 1. Initial State:
      // Start camera zoomed in to monitor screen (49.5%, 55.5% origin)
      // Scale: 3.18 makes the 710px iMac display fill 100% of viewport
      gsap.set(cameraRig, {
        scale: 3.18,
        xPercent: 0,
        yPercent: 0,
        transformOrigin: "49.5% 55.5%",
        willChange: "transform",
      });

      // Layer 2: Green Notice Board initial parallax offset
      if (greenBoard) {
        gsap.set(greenBoard, {
          y: -35,
          rotation: -1,
          transformOrigin: "top left",
          willChange: "transform",
        });
      }

      // Layer 2 Content: Initially hidden until Phase 3 zoom
      if (boardContent) {
        gsap.set(boardContent, {
          opacity: 0,
          scale: 0.96,
        });
      }

      // Foreground Desk & Lamp
      if (lamp) {
        gsap.set(lamp, {
          y: 25,
          willChange: "transform",
        });
      }

      // Lamp Glow Spotlight
      if (lampGlow) {
        gsap.set(lampGlow, {
          opacity: 0,
          scale: 0.9,
        });
      }

      // Master Scrubbed Timeline pinned for 350vh travel
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "+=350%",
          pin: pinViewport,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // Map jar ideas filling sequence between 0.20 and 0.65
            if (p < 0.25) {
              setCurrentJarIndex(0);
            } else if (p < 0.35) {
              setCurrentJarIndex(1);
            } else if (p < 0.45) {
              setCurrentJarIndex(2);
            } else if (p < 0.58) {
              setCurrentJarIndex(3);
            } else {
              setCurrentJarIndex(4);
            }

            // Enable board interaction only when zoomed in (p > 0.82)
            setIsBoardInteractive(p > 0.82);
          },
        },
      });

      // ─────────────────────────────────────────────────────────
      // PHASE 1: Macro-to-Studio Pullback (Progress 0.00 ➔ 0.55)
      // Desktop pulls back from 3.18x down to 1.0x, docking in iMac
      // ─────────────────────────────────────────────────────────
      masterTl.to(
        cameraRig,
        {
          scale: 1.0,
          xPercent: 0,
          yPercent: 0,
          ease: "power2.inOut",
          duration: 0.55,
        },
        0
      );

      // Parallax settling of Green Board & Desk Lamp
      if (greenBoard) {
        masterTl.to(
          greenBoard,
          {
            y: 0,
            rotation: 0,
            ease: "power1.out",
            duration: 0.45,
          },
          0.1
        );
      }

      if (lamp) {
        masterTl.to(
          lamp,
          {
            y: 0,
            ease: "power1.out",
            duration: 0.45,
          },
          0.1
        );
      }

      // Subtle monitor bezel edge illumination as it pulls back
      if (monitorBezel) {
        masterTl.fromTo(
          monitorBezel,
          { filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
          {
            filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.65))",
            ease: "power2.out",
            duration: 0.35,
          },
          0.2
        );
      }

      // ─────────────────────────────────────────────────────────
      // PHASE 2: Studio Rest & Jar Sequence (Progress 0.55 ➔ 0.65)
      // Brief cinematic pause where visitor takes in the full room
      // ─────────────────────────────────────────────────────────
      masterTl.to({}, { duration: 0.1 }, 0.55);

      // ─────────────────────────────────────────────────────────
      // PHASE 3: Cross-Scroll Pan to Green Notice Board (0.65 ➔ 1.00)
      // Camera smoothly pans (x: +30%, y: +16.5%) & zooms to 1.92x
      // Framing Green Board dead center as the interactive next canvas
      // ─────────────────────────────────────────────────────────
      masterTl.to(
        cameraRig,
        {
          scale: 1.92,
          xPercent: 29.8,
          yPercent: 16.5,
          ease: "power2.inOut",
          duration: 0.35,
        },
        0.65
      );

      // Desk lamp spotlight illuminates the green board
      if (lampGlow) {
        masterTl.to(
          lampGlow,
          {
            opacity: 1,
            scale: 1.15,
            ease: "power2.inOut",
            duration: 0.25,
          },
          0.7
        );
      }

      // Board Content (polaroids, post-its, sketches) fade in crisply
      if (boardContent) {
        masterTl.to(
          boardContent,
          {
            opacity: 1,
            scale: 1.0,
            ease: "power2.out",
            duration: 0.28,
          },
          0.72
        );
      }
    }, trigger);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={triggerRef}
      id="desk-room-transition-section"
      className="relative w-full h-[350vh] bg-[#121214] select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          STICKY FULL-SCREEN PINNED VIEWPORT
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={pinViewportRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#101014]"
      >
        {/* ───────────────────────────────────────────────────────────
            3D CAMERA RIG STAGE (1920x1080 Native Creative Canvas)
            Scaled dynamically to fill screen with zero letterboxing
        ─────────────────────────────────────────────────────────── */}
        <div
          className="relative shrink-0 flex items-center justify-center pointer-events-auto"
          style={{
            width: "1920px",
            height: "1080px",
            transform: `scale(${stageScale})`,
            transformOrigin: "center center",
          }}
        >
          <div
            ref={cameraRigRef}
            className="relative w-full h-full origin-center will-change-transform"
            style={{
              transformOrigin: "49.5% 55.5%",
            }}
          >
            {/* ───────────────────────────────────────────────────────
                LAYER 1: Studio Wall & Wooden Desk Base Canvas (z-10)
            ─────────────────────────────────────────────────────── */}
            <img
              src="/assets/room/Wall.png"
              alt="Creative Studio Wall & Desk"
              className="absolute inset-0 w-full h-full object-cover z-10 select-none pointer-events-none"
              draggable={false}
            />

            {/* Atmospheric Window Sunlight Shafts (z-15) */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-200/10 to-amber-100/25 mix-blend-screen pointer-events-none z-15"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 90% 65% at 92% 20%, rgba(254, 240, 138, 0.22) 0%, rgba(251, 191, 36, 0.08) 50%, transparent 80%)",
              }}
            />

            {/* ───────────────────────────────────────────────────────
                LAYER 2: Green Notice Board (z-20)
                Position: left: 5.2%, top: 7.7%, w: 29.2%, h: 52%
            ─────────────────────────────────────────────────────── */}
            <div
              ref={greenBoardRef}
              className="absolute left-[5.2%] top-[7.7%] w-[29.2%] h-[52%] z-20 will-change-transform"
            >
              {/* Wooden Frame & Green Board Base Image */}
              <img
                src="/assets/room/Green board 1.png"
                alt="Green Felt Notice Board"
                className="w-full h-full object-contain filter drop-shadow-[0_24px_45px_rgba(0,0,0,0.45)] pointer-events-none select-none"
                draggable={false}
              />

              {/* ─────────────────────────────────────────────────────
                  Interactive Notice Board Surface (Pins, Notes, Polaroids)
                  Reveals fully during Phase 3 Camera Pan into Board
              ───────────────────────────────────────────────────── */}
              <div
                ref={boardContentRef}
                className={`absolute inset-[7%] z-30 transition-opacity duration-300 ${
                  isBoardInteractive ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                {/* Notice Board Felt Texture Grid & Pin-Holes */}
                <div className="relative w-full h-full p-4 flex flex-col justify-between">
                  {/* Top Header Strip */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      {/* Brass 3D Push Pin */}
                      <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-[0_3px_6px_rgba(0,0,0,0.6)] border border-amber-100/60" />
                      <span className="font-mono text-[10px] tracking-widest text-amber-100/90 font-semibold uppercase">
                        IDEATION BOARD • CHAPTER 03
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/30 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      PHYSICAL ARCHIVE
                    </div>
                  </div>

                  {/* Main Pinned Cards Cluster */}
                  <div className="grid grid-cols-2 gap-3.5 my-auto">
                    {/* Polaroid 1: Spider-Man Spatial Project */}
                    <div className="group relative bg-[#FDFDFC] p-2.5 pb-3 rounded shadow-[0_12px_24px_rgba(0,0,0,0.45)] rotate-[-3deg] hover:rotate-0 transition-transform duration-300 cursor-pointer border border-black/5">
                      {/* Red Push Pin */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-red-400 via-red-600 to-red-900 shadow-[0_4px_8px_rgba(0,0,0,0.7)] border border-red-200/60 flex items-center justify-center z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-200/80" />
                      </div>

                      {/* Photo Thumbnail */}
                      <div className="w-full aspect-[4/3] rounded bg-gradient-to-br from-zinc-900 to-red-950/80 overflow-hidden relative">
                        <img
                          src="/assets/desktop_wallpaper.jpg"
                          alt="Spider-Man Project"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-white/90">
                          Spider-Sense OS
                        </span>
                      </div>

                      {/* Handwritten Caption */}
                      <p className="mt-2 text-[10px] font-semibold text-zinc-800 leading-tight">
                        Spatial 3D &amp; WebGL Motion
                      </p>
                      <p className="text-[9px] text-zinc-500 font-mono mt-0.5">
                        Elena OS &rarr; Studio Room
                      </p>
                    </div>

                    {/* Polaroid 2: Living Design Systems */}
                    <div className="group relative bg-[#FDFDFC] p-2.5 pb-3 rounded shadow-[0_12px_24px_rgba(0,0,0,0.45)] rotate-[2.5deg] hover:rotate-0 transition-transform duration-300 cursor-pointer border border-black/5">
                      {/* Translucent Scotch Tape at Top */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-amber-100/50 backdrop-blur-xs border border-white/20 shadow-xs rotate-[-2deg] z-10" />

                      {/* Photo Thumbnail */}
                      <div className="w-full aspect-[4/3] rounded bg-gradient-to-br from-blue-950 to-indigo-950 overflow-hidden relative p-2 flex flex-col justify-between">
                        <div className="flex items-center gap-1">
                          <Layers className="w-3 h-3 text-cyan-400" />
                          <span className="text-[9px] font-mono text-cyan-200">
                            Webnox Systems
                          </span>
                        </div>
                        <div className="text-[11px] font-bold text-white leading-tight">
                          120+ Components
                        </div>
                        <span className="text-[8px] font-mono text-zinc-400">
                          Figma &amp; React 19 Tokens
                        </span>
                      </div>

                      {/* Caption */}
                      <p className="mt-2 text-[10px] font-semibold text-zinc-800 leading-tight">
                        Living Token Architecture
                      </p>
                      <p className="text-[9px] text-zinc-500 font-mono mt-0.5">
                        Tactile precision feel
                      </p>
                    </div>

                    {/* Yellow Post-It Note: Vibe Coding Checklist */}
                    <div className="relative bg-[#FEF08A] p-2.5 rounded shadow-[0_10px_20px_rgba(0,0,0,0.35)] rotate-[-1.5deg] text-zinc-900 border-t border-yellow-200">
                      {/* Brass Push Pin */}
                      <div className="absolute -top-1.5 right-3 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-200 via-amber-500 to-amber-800 shadow-md" />
                      <div className="font-bold text-[10px] uppercase tracking-wider text-amber-950 flex items-center gap-1 mb-1">
                        <Code2 className="w-3 h-3 text-amber-900" />
                        VIBE CODING LAB
                      </div>
                      <ul className="text-[8.5px] space-y-0.5 text-zinc-800 leading-tight">
                        <li className="flex items-center gap-1">
                          <CheckCircle className="w-2.5 h-2.5 text-emerald-700 shrink-0" />
                          <span>GSAP 3 Scrubbed Timeline</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <CheckCircle className="w-2.5 h-2.5 text-emerald-700 shrink-0" />
                          <span>60fps Multi-Plane Parallax</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <CheckCircle className="w-2.5 h-2.5 text-emerald-700 shrink-0" />
                          <span>Agentic Autonomous QA</span>
                        </li>
                      </ul>
                    </div>

                    {/* Orange Index Card: Transition Gateway */}
                    <div className="relative bg-gradient-to-br from-orange-100 to-amber-200 p-2.5 rounded shadow-[0_10px_20px_rgba(0,0,0,0.35)] rotate-[2deg] text-zinc-900 flex flex-col justify-between">
                      {/* Silver Pin */}
                      <div className="absolute -top-1.5 left-3 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-700 shadow-md" />
                      <div>
                        <div className="font-bold text-[10px] text-orange-950 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Workflow className="w-3 h-3 text-orange-800" />
                          NEXT CHAPTER
                        </div>
                        <p className="text-[8.5px] text-zinc-800 leading-snug">
                          The way design should&apos;ve been done.
                        </p>
                      </div>

                      {/* Smooth Scroll Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const nextSec = document.getElementById("design-showcase-section");
                          if (nextSec) {
                            nextSec.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="mt-2 flex items-center justify-between px-2 py-1 rounded bg-black text-white text-[8.5px] font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <span>Explore Work</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Footer Note */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[8px] font-mono text-emerald-200/70">
                    <span>PINNED BY GANESH PS</span>
                    <span>STUDIO DESK TRANSITION v2.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ───────────────────────────────────────────────────────
                LAYER 3: Wooden Shelf & Glass Jar Sequencer (z-25)
                Position: left: 50.8%, top: 23.5%, w: 5.5% (~105px wide)
            ─────────────────────────────────────────────────────── */}
            <div
              ref={jarStackRef}
              className="absolute left-[50.8%] top-[23.5%] w-[5.5%] z-25 pointer-events-none select-none"
            >
              {/* Stacked Jar Frames (Preloaded) */}
              <div className="relative w-full aspect-[463/613]">
                {JAR_FRAMES.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Jar idea state ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)] transition-opacity duration-150 ${
                      currentJarIndex === idx ? "opacity-100" : "opacity-0"
                    }`}
                    draggable={false}
                  />
                ))}

                {/* Creative Ideas Glowing Sparkle Aura when filled */}
                <div
                  className={`absolute -inset-2 bg-radial from-amber-400/25 via-amber-300/10 to-transparent blur-md rounded-full pointer-events-none transition-opacity duration-500 ${
                    currentJarIndex >= 3 ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </div>

            {/* ───────────────────────────────────────────────────────
                LAYER 4: Apple 27" iMac Monitor Chassis (z-30)
                Position: left: 30.5%, top: 35.5%, w: 38%
            ─────────────────────────────────────────────────────── */}
            <div
              ref={monitorBezelRef}
              className="absolute left-[30.5%] top-[35.5%] w-[38%] z-30 will-change-transform"
            >
              {/* iMac Aluminum Chassis & Glass Bezel */}
              <div className="relative w-full rounded-[14px] bg-[#0c0c0e] p-[5px] shadow-[0_28px_60px_rgba(0,0,0,0.7),0_12px_24px_rgba(0,0,0,0.4)] border border-zinc-700/60 flex flex-col">
                {/* 16:9 Inner Screen Display Housing Live WorkspaceDesktopSection */}
                <div
                  ref={screenDisplayRef}
                  className="w-full aspect-[16/9] rounded-[8px] overflow-hidden bg-black relative shadow-inner"
                >
                  {/* Scaled Live macOS Desktop OS Component */}
                  <div
                    className="w-[1920px] h-[1080px] origin-top-left"
                    style={{
                      transform: "scale(0.3745)",
                      transformOrigin: "top left",
                    }}
                  >
                    <WorkspaceDesktopSection isEmbedded />
                  </div>

                  {/* Realistic Screen Glass Glare Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-transparent pointer-events-none z-40" />
                </div>

                {/* iMac Apple Aluminum Chin */}
                <div className="h-6 sm:h-7 w-full bg-gradient-to-b from-[#E8E8ED] to-[#D1D1D6] rounded-b-[8px] flex items-center justify-center border-t border-zinc-400/50 relative mt-[1px]">
                  <svg
                    className="w-3.5 h-3.5 fill-zinc-600/85"
                    viewBox="0 0 170 170"
                    aria-label="Apple logo"
                  >
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.72-7.87-12.06-14.37-6.28-9.44-11.28-20.06-15-31.86-3.72-11.8-5.58-23.01-5.58-33.64 0-14.88 3.73-27.18 11.2-36.9 7.46-9.72 16.89-14.69 28.29-14.92 5.03 0 10.51 1.34 16.44 4.02 5.92 2.68 9.77 4.07 11.55 4.18 1.45 0 5.47-1.42 12.06-4.27 6.59-2.85 12.44-4.14 17.57-3.88 13.51.67 24.28 5.75 32.32 15.24-11.84 7.15-17.65 16.92-17.44 29.31.21 9.83 4.02 18.04 11.43 24.62 7.41 6.59 16.2 10.36 26.38 11.32-2.12 6.59-4.7 13.32-7.74 20.19zM119.22 33.56c0-7.37 2.68-14.24 8.04-20.61 5.36-6.37 11.96-10.45 19.8-12.25.33 1.79.5 3.52.5 5.19 0 7.37-2.79 14.35-8.38 20.94-5.58 6.59-12.39 10.5-20.44 11.75-.45-1.68-.67-3.36-.67-5.02z" />
                  </svg>
                </div>
              </div>

              {/* iMac Aluminum Stand Pedestal connecting to Wooden Desk */}
              <div className="absolute top-[96%] left-1/2 -translate-x-1/2 w-[22%] h-14 bg-gradient-to-b from-[#C4C4C9] via-[#E1E1E6] to-[#9D9DA2] rounded-b-[4px] shadow-lg -z-10 border-x border-zinc-400/40" />
            </div>

            {/* ───────────────────────────────────────────────────────
                LAYER 5: Foreground Desk Lamp & Peripherals (z-40)
            ─────────────────────────────────────────────────────── */}
            <div
              ref={lampRef}
              className="absolute inset-0 w-full h-full z-40 pointer-events-none select-none will-change-transform"
            >
              <img
                src="/assets/room/Table lap.png"
                alt="Studio Desk Lamp and Peripherals"
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* Warm Lamp Spotlight Glow Cone (Illuminates Green Board in Phase 3) */}
              <div
                ref={lampGlowRef}
                className="absolute left-[7%] top-[18%] w-[580px] h-[580px] rounded-full bg-gradient-to-tr from-amber-400/35 via-amber-300/15 to-transparent blur-3xl pointer-events-none opacity-0 z-35 mix-blend-screen transition-opacity duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

