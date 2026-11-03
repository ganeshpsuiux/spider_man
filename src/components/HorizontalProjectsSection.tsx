"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundManager } from "@/lib/sound";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  metricBadge: string;
  role: string;
  timeline: string;
  description: string;
  tags: string[];
  image: string;
  secondaryImage?: string;
  accentColor: string;
  glowColor: string;
  linkText: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "prepy-ai",
    number: "01",
    title: "Prepy AI",
    subtitle: "Adaptive Learning Ecosystem",
    category: "EdTech AI & UX Architecture",
    metricBadge: "120K+ Active Students",
    role: "Lead Product Designer & UX Architect",
    timeline: "2025 – 2026",
    description:
      "Engineered an intelligent learning platform that dynamically generates bespoke curriculum trees and contextual micro-quizzes based on real-time comprehension tracking.",
    tags: ["Generative AI", "Design System", "Next.js 16", "Mobile & Web"],
    image: "/assets/showcase/s_img_7.png",
    secondaryImage: "/assets/showcase/s_img_5.png",
    accentColor: "#00f0ff",
    glowColor: "rgba(0, 240, 255, 0.18)",
    linkText: "Explore Prepy System",
  },
  {
    id: "suitup-3d",
    number: "02",
    title: "SuitUp",
    subtitle: "3D Custom Apparel WebGL",
    category: "E-Commerce & Spatial 3D",
    metricBadge: "+140% Conversion Lift",
    role: "Creative Director & UI Architect",
    timeline: "2024 – 2025",
    description:
      "A high-speed 3D product configurator empowering teams and athletes to customize performance garments in real-time with procedural fabric shaders and instant checkout.",
    tags: ["Three.js", "WebGL Shaders", "3D Configurator", "Shopify Headless"],
    image: "/assets/showcase/s_img_4.png",
    secondaryImage: "/assets/showcase/s_img_2.png",
    accentColor: "#ff7b00",
    glowColor: "rgba(255, 123, 0, 0.18)",
    linkText: "Launch 3D Configurator",
  },
  {
    id: "spiderverse-os",
    number: "03",
    title: "Spiderverse OS",
    subtitle: "Kinetic Spatial UI System",
    category: "Experimental Creative Tech",
    metricBadge: "60 FPS Gesture Physics",
    role: "Creative Technologist & Vibe Coder",
    timeline: "2026 Edition",
    description:
      "A zero-compromise spatial interface laboratory exploring fluid multi-touch physics, real-time chromatic dispersion shaders, and synesthetic audio reactivity.",
    tags: ["Spatial UI", "GLSL Shaders", "Web Audio API", "GSAP Motion"],
    image: "/assets/showcase/s_img_1.png",
    secondaryImage: "/assets/showcase/s_img_3.png",
    accentColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.22)",
    linkText: "Inspect Spatial Lab",
  },
];

export const HorizontalProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Pinned Horizontal Track on Desktop (>= 1024px)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const totalScrollWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -totalScrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${totalScrollWidth + 300}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                PROJECTS.length - 1,
                Math.floor(self.progress * PROJECTS.length)
              );
              setActiveIdx(idx);
            },
          },
        });
      });

      // Ambient subtle header fade-in
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    soundManager.playWhoosh();
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    soundManager.playWhoosh();
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="horizontal-projects-section"
      className="relative w-full bg-[#070709] text-white overflow-hidden select-none"
    >
      {/* Top Transition Border from Previous Section */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent z-30" />

      {/* Dark Ambient Grid Texture */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="projects-dark-grid"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="18" cy="18" r="1.2" fill="#ffffff" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#projects-dark-grid)" />
        </svg>
      </div>

      {/* Glowing Spiderverse Stage Fog */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[450px] bg-red-600/[0.04] rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between py-12 lg:py-16">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-[11px] font-mono tracking-widest uppercase text-cyan-400 mb-3 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              01 / SELECTED WORKS · 2024–2026
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-2xl leading-[1.12]"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              Architecting Products Across Dimensions.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase hidden sm:inline-block">
              PROJECT {activeIdx + 1} OF {PROJECTS.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 flex items-center justify-center transition-all duration-300 active:scale-95 text-zinc-300 hover:text-white"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                aria-label="Next project"
                className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 flex items-center justify-center transition-all duration-300 active:scale-95 text-zinc-300 hover:text-white"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Project Cards Carousel Track */}
        <div
          ref={trackRef}
          className="w-full flex gap-6 lg:gap-10 px-6 sm:px-10 lg:px-14 overflow-x-auto lg:overflow-visible scrollbar-none snap-x snap-mandatory will-change-transform"
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="group relative shrink-0 w-[88vw] sm:w-[620px] lg:w-[840px] rounded-[32px] p-6 sm:p-8 lg:p-10 bg-[#0d0d12]/90 backdrop-blur-2xl border border-white/[0.12] hover:border-white/[0.28] transition-all duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.65)] hover:shadow-[0_32px_80px_rgba(0,0,0,0.85)] snap-center flex flex-col justify-between"
              style={{
                boxShadow: `0 24px 60px rgba(0,0,0,0.65), 0 0 45px ${project.glowColor}`,
              }}
              onMouseEnter={() => soundManager.playHudBeep(900 + idx * 200)}
            >
              {/* Card Top Row: Number & Metrics */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <span
                    className="text-2xl sm:text-3xl font-mono font-bold"
                    style={{ color: project.accentColor }}
                  >
                    /{project.number}
                  </span>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                      style={{ fontFamily: "var(--font-sora), sans-serif" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                <div
                  className="px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold border backdrop-blur-md"
                  style={{
                    backgroundColor: `${project.accentColor}18`,
                    color: project.accentColor,
                    borderColor: `${project.accentColor}40`,
                  }}
                >
                  ✦ {project.metricBadge}
                </div>
              </div>

              {/* Card Body: Split Grid (Narrative + Media Mockups) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center py-6 sm:py-8">
                {/* Left Description & Metadata (Cols 1-5) */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                  <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-300 font-normal">
                    {project.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    <div className="flex justify-between text-xs text-zinc-400 font-mono">
                      <span>ROLE</span>
                      <span className="text-zinc-200">{project.role}</span>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-400 font-mono">
                      <span>TIMELINE</span>
                      <span className="text-zinc-200">{project.timeline}</span>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.05] border border-white/10 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => soundManager.playThwip()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider font-semibold uppercase text-black transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: project.accentColor,
                        boxShadow: `0 0 20px ${project.accentColor}80`,
                      }}
                    >
                      <span>{project.linkText}</span>
                      <span>↗</span>
                    </button>
                  </div>
                </div>

                {/* Right Interactive Visual Showcase (Cols 6-12) */}
                <div className="md:col-span-7 relative h-[280px] sm:h-[340px] lg:h-[380px] rounded-[24px] overflow-hidden bg-black/40 border border-white/[0.10] flex items-center justify-center group/card">
                  {/* Primary Mockup Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center filter contrast-[1.04] transition-transform duration-700 ease-out group-hover/card:scale-105"
                  />

                  {/* Secondary Staggered Floating Overlay */}
                  {project.secondaryImage && (
                    <div className="absolute -bottom-4 -right-4 w-[160px] sm:w-[200px] aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/20 transition-transform duration-500 group-hover/card:-translate-y-2 group-hover/card:-translate-x-2">
                      <img
                        src={project.secondaryImage}
                        alt={`${project.title} sub-asset`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Subtle Gradient Shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                </div>
              </div>

              {/* Card Bottom Progress Pill */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/[0.06]">
                <span>CATEGORY: {project.category}</span>
                <span className="text-zinc-400">HORIZONTAL SCROLL ➔</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Interactive Navigation Footnote */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between text-xs font-mono text-zinc-400 pt-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ALL SYSTEMS PROTOTYPED & PRODUCTION READY</span>
          </div>
          <span className="hidden sm:inline-block text-zinc-400">
            CONTINUE SCROLLING FOR CLIENT CASE STUDIES ↓
          </span>
        </div>

      </div>
    </section>
  );
};
