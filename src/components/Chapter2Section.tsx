"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Ferrofluid from "@/components/Ferrofluid";
import ShinyText from "@/components/ShinyText";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────── */
/* Quote text for background scrolling rows                */
/* ─────────────────────────────────────────────────────── */
const QUOTE = "WITH GREAT POWER COMES GREAT RESPONSIBILITY.";
const PHRASE_COUNT = 14;

/* ─────────────────────────────────────────────────────── */
/* Chapter2Section — Zoom-Out Scroll Effect & Stacking Card*/
/*                                                         */
/* Wraps children (LandoHeroSection) and scales them down  */
/* on scroll, revealing 2 middle text lines moving only    */
/* during active scroll via GSAP ScrollTrigger. Section 2  */
/* stays pinned while Section 3 rolls over like a card.    */
/* ─────────────────────────────────────────────────────── */
export const Chapter2Section: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const depthOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const heroContainer = heroContainerRef.current;
    const bg = bgRef.current;
    const textLayer = textLayerRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    const depthOverlay = depthOverlayRef.current;
    if (!section || !sticky || !heroContainer || !bg || !textLayer || !row1 || !row2) return;

    const ctx = gsap.context(() => {
      /* ── Scroll-Driven Animation with Custom Bezier Transitions ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: sticky,
          pinSpacing: false,
        },
      });

      // ─────────────────────────────────────────────────────────────
      // 1. HERO ZOOM-OUT WITH RESPONSIVE WIDTH REDUCTION (0.0 → 0.45):
      // Scales down and trims excess lateral width without stretching!
      // ─────────────────────────────────────────────────────────────
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const targetScale = isMobile ? 0.54 : 0.38;
      const targetWidth = isMobile ? "90vw" : "72vw";
      const microScale = isMobile ? 0.48 : 0.34;

      // ─────────────────────────────────────────────────────────────
      // PERIPHERAL UI FADE-OUT (0.00 → 0.18):
      // Header, side cards, and audio controls dissolve early and swiftly
      // so ONLY the clean central portrait remains inside the scaled card!
      // ─────────────────────────────────────────────────────────────
      tl.to(
        ".hero-header-fade",
        {
          opacity: 0,
          y: -25,
          autoAlpha: 0,
          pointerEvents: "none",
          ease: "power1.out",
          duration: 0.16,
        },
        0
      );

      tl.to(
        ".hero-side-fade",
        {
          opacity: 0,
          y: 25,
          scale: 0.96,
          autoAlpha: 0,
          pointerEvents: "none",
          ease: "power1.out",
          duration: 0.18,
        },
        0
      );

      tl.fromTo(
        heroContainer,
        {
          scale: 1,
          width: "100vw",
          borderRadius: "0px",
          filter: "brightness(1)",
        },
        {
          scale: targetScale,
          width: targetWidth,
          borderRadius: "24px",
          filter: "brightness(1)",
          ease: "power2.out",
          duration: 0.45,
        },
        0
      );

      // Background overlay fades in during initial zoom
      tl.fromTo(
        bg,
        { opacity: 0 },
        { opacity: 1, ease: "none", duration: 0.35 },
        0
      );

      // Text layer fades in smoothly right at the start
      tl.fromTo(
        textLayer,
        { opacity: 0 },
        { opacity: 1, ease: "none", duration: 0.18 },
        0.02
      );

      // ─────────────────────────────────────────────────────────────
      // 2. SMOOTH GSAP SCROLLING QUOTE ROWS (0.0 → 0.60):
      // Dynamic kinetic translation across the hero card
      // ─────────────────────────────────────────────────────────────
      tl.fromTo(
        row1,
        { xPercent: -4 },
        { xPercent: -34, ease: "none", duration: 0.60 },
        0
      );

      tl.fromTo(
        row2,
        { xPercent: -34 },
        { xPercent: -4, ease: "none", duration: 0.60 },
        0
      );

      // ─────────────────────────────────────────────────────────────
      // 3. FADE OUT TEXT 1ST (0.45 → 0.60)
      // Background quote text rows dissolve completely while hero is crisp
      // ─────────────────────────────────────────────────────────────
      tl.to(
        textLayer,
        {
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.15,
        },
        0.45
      );

      // ─────────────────────────────────────────────────────────────
      // 4. SUBTLE PARALLAX & DEPTH CUES AS SECTION 3 COVERS (0.64 → 1.00)
      // As Section 3 (#white-canvas-wrapper) physically slides over Section 2:
      // - Micro-scale down from targetScale (0.38) down to 0.34
      // - Subtle brightness dip (filter: brightness(0.65))
      // - Soft depth vignette simulates shadow cast by the overlapping canvas
      // - Hero card & dark ferrofluid remain crisp and visible (NEVER fade to 0)
      // ─────────────────────────────────────────────────────────────
      tl.to(
        heroContainer,
        {
          scale: microScale,
          filter: "brightness(0.65)",
          ease: "power1.out",
          duration: 0.36,
        },
        0.64
      );

      if (depthOverlay) {
        tl.fromTo(
          depthOverlay,
          { opacity: 0 },
          {
            opacity: 0.45,
            ease: "power1.out",
            duration: 0.36,
          },
          0.64
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Line 1 Phrases — Marvel cinematic font with ShinyText effect
  const row1Phrases = Array.from({ length: PHRASE_COUNT }, (_, i) => (
    <span
      key={i}
      className="inline-block whitespace-nowrap px-6 sm:px-10 lg:px-14 font-black uppercase select-none leading-none"
      style={{
        fontSize: "clamp(2.8rem, 5.8vw, 6rem)",
        fontFamily: "var(--font-bebas), var(--font-marvel), sans-serif",
        letterSpacing: "0.05em",
        lineHeight: "1",
      }}
      aria-hidden={i > 0 ? true : undefined}
    >
      <ShinyText
        text={QUOTE}
        speed={2}
        delay={0}
        color="#b5b5b5"
        shineColor="#ffffff"
        spread={120}
        direction="left"
        yoyo={false}
        pauseOnHover={false}
      />
    </span>
  ));

  // Line 2 Phrases — Comic handwritten font with ShinyText effect
  const row2Phrases = Array.from({ length: PHRASE_COUNT }, (_, i) => (
    <span
      key={i}
      className="inline-block whitespace-nowrap px-6 sm:px-10 lg:px-14 select-none leading-none"
      style={{
        fontSize: "clamp(2.2rem, 4.5vw, 4.8rem)",
        fontFamily: "var(--font-handwritten), 'Permanent Marker', cursive",
        letterSpacing: "0.02em",
        lineHeight: "1",
      }}
      aria-hidden={i > 0 ? true : undefined}
    >
      <ShinyText
        text={QUOTE}
        speed={2}
        delay={0}
        color="#b5b5b5"
        shineColor="#ffffff"
        spread={120}
        direction="right"
        yoyo={false}
        pauseOnHover={false}
      />
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="chapter-2-scroll"
      className="relative w-full z-10"
      style={{ height: "280vh" }}
    >
      {/* Sticky Viewport — stays pinned for scroll choreography */}
      <div
        ref={stickyRef}
        className="relative w-full overflow-hidden z-10"
        style={{ height: "100vh" }}
      >
        {/* ────────────────────────────────────────────── */}
        {/* LAYER 1: Dark Background (fades in on scroll) */}
        {/* ────────────────────────────────────────────── */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden"
          style={{ background: "#0a0a0a", opacity: 0 }}
        >
          {/* Ferrofluid Liquid Metal Background Animation (React Bits) */}
          <div className="absolute inset-0 w-full h-full pointer-events-auto opacity-25">
            <Ferrofluid
              colors={["#ffffff", "#ffffff", "#ffffff"]}
              speed={0.2}
              scale={1}
              turbulence={1}
              fluidity={0.06}
              rimWidth={0.18}
              sharpness={1.8}
              shimmer={1}
              glow={2}
              flowDirection="up"
              opacity={0.25}
              mouseInteraction={true}
              mouseStrength={1}
              mouseRadius={0.6}
            />
          </div>
        </div>

        {/* ────────────────────────────────────────────── */}
        {/* LAYER 2: Middle 2 Text Lines                   */}
        {/* Balanced spacing between lines, No Glow        */}
        {/* Scrolls during zoom & for 1 scroll after       */}
        {/* ────────────────────────────────────────────── */}
        <div
          ref={textLayerRef}
          className="absolute inset-0 w-full h-full z-10 flex flex-col justify-center items-center gap-3 sm:gap-4 lg:gap-5 pointer-events-none select-none overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Line 1 — Marvel Font (translates left on scroll) */}
          <div className="w-full overflow-hidden flex items-center py-1 my-0 leading-none">
            <div
              ref={row1Ref}
              className="flex flex-nowrap will-change-transform"
              style={{ width: "max-content" }}
            >
              {row1Phrases}
            </div>
          </div>

          {/* Line 2 — Handwritten Font (translates right on scroll) */}
          <div className="w-full overflow-hidden flex items-center py-1 my-0 leading-none">
            <div
              ref={row2Ref}
              className="flex flex-nowrap will-change-transform"
              style={{ width: "max-content" }}
            >
              {row2Phrases}
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────── */}
        {/* LAYER 3: Hero Container (scales down on scroll)*/}
        {/* The children (LandoHeroSection) live inside    */}
        {/* ────────────────────────────────────────────── */}
        <div className="absolute inset-0 w-full h-full z-20 flex items-center justify-center pointer-events-none">
          <div
            ref={heroContainerRef}
            className="relative h-full overflow-hidden will-change-transform pointer-events-auto shadow-2xl flex items-center justify-center"
            style={{
              width: "100vw",
              transformOrigin: "center center",
              transform: "translate3d(0,0,0)",
            }}
          >
            {/* Aspect-Preserving Content Stage: Never squashes or stretches the hero section */}
            <div className="relative w-screen min-w-[100vw] h-full flex items-center justify-center shrink-0">
              {children}
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────── */}
        {/* LAYER 4: Depth Vignette Overlay               */}
        {/* Soft shadow cast by overlapping Section 3     */}
        {/* ────────────────────────────────────────────── */}
        <div
          ref={depthOverlayRef}
          className="absolute inset-0 w-full h-full z-25 pointer-events-none will-change-[opacity]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)",
            opacity: 0,
          }}
        />
      </div>
    </section>
  );
};
