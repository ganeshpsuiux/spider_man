"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundManager } from "@/lib/sound";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  client: string;
  timeline: string;
  role: string;
  challenge: string;
  solution: string;
  metrics: { value: string; label: string }[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  image: string;
  tags: string[];
  accentColor: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "prepy-ai",
    badge: "AI PRODUCT ARCHITECTURE",
    title: "Prepy AI: From Cognitive Overload to 1-Tap Mastery",
    subtitle: "Re-architecting dynamic learning graphs for 120,000+ active students.",
    client: "Prepy Learning Inc.",
    timeline: "6 Months",
    role: "Lead Product Designer & Prototyping Lead",
    challenge:
      "Traditional edtech platforms drown students in static PDFs and disconnected multiple-choice quizzes, causing 64% drop-off in the first week.",
    solution:
      "Designed an AI-native interface that generates contextual micro-modules and interactive knowledge nodes, providing instant real-time feedback with zero friction.",
    metrics: [
      { value: "+140%", label: "30-Day User Retention" },
      { value: "-42%", label: "Onboarding Drop-off" },
      { value: "4.9★", label: "App Store Rating (50K+)" },
    ],
    quote:
      "Ganesh didn’t just redesign our UI—he completely transformed the cognitive ergonomics of how students learn with generative AI.",
    quoteAuthor: "Kavitha Ramanathan",
    quoteRole: "VP of Product, Prepy AI",
    image: "/assets/showcase/s_img_7.png",
    tags: ["UX Research", "Figma Design System", "React Native", "AI Copilot"],
    accentColor: "#00f0ff",
  },
  {
    id: "suitup-3d",
    badge: "SPATIAL 3D & E-COMMERCE",
    title: "SuitUp: Procedural 3D Athletic Apparel Customizer",
    subtitle: "Empowering athletes to configure bespoke team uniforms in real-time WebGL.",
    client: "SuitUp Global Athletics",
    timeline: "4 Months",
    role: "Creative Director & UI Architect",
    challenge:
      "Custom sportswear orders required tedious back-and-forth emails, sample proofs taking weeks, and a high cart abandonment rate of 78%.",
    solution:
      "Built a photorealistic 3D configurator with procedural fabric bump maps, live collar/cuff customizers, and one-click bulk team rosters.",
    metrics: [
      { value: "2.8M+", label: "Custom Uniforms Rendered" },
      { value: "0.4s", label: "3D Shader Init Time" },
      { value: "+68%", label: "Average Order Value (AOV)" },
    ],
    quote:
      "Our customer conversion doubled in the first 30 days. The 3D interaction feels like handling real apparel in a high-end showroom.",
    quoteAuthor: "Marcus Chen",
    quoteRole: "Head of Growth, SuitUp",
    image: "/assets/showcase/s_img_4.png",
    tags: ["Three.js", "WebGL Shaders", "3D Modeling", "Shopify Headless"],
    accentColor: "#ff7b00",
  },
  {
    id: "spiderverse-os",
    badge: "EXPERIMENTAL LAB",
    title: "Spiderverse OS: Tactile Multi-Touch Spatial Interfaces",
    subtitle: "Fusing kinetic gesture physics, chromatic shaders, and synesthetic sound.",
    client: "GG Creative Studio",
    timeline: "Ongoing Lab",
    role: "Creative Technologist & Vibe Coder",
    challenge:
      "Most web experiences are sterile, predictable rectangles lacking emotional feedback, sensory texture, or tactile playfulness.",
    solution:
      "Constructed a multi-plane canvas architecture featuring liquid glass refraction, chromatic dispersion shaders, and Web Audio API synthesized haptics.",
    metrics: [
      { value: "60 FPS", label: "Locked Smooth Refresh" },
      { value: "< 16ms", label: "Touch-to-Response Latency" },
      { value: "100%", label: "Synthesizer Audio Reactivity" },
    ],
    quote:
      "Ganesh proves that web software can evoke the sensory thrill of tactile comic book ink and fluid film motion.",
    quoteAuthor: "Alex Vance",
    quoteRole: "Design Partner, Webnox",
    image: "/assets/showcase/s_img_1.png",
    tags: ["GLSL Shaders", "Web Audio API", "GSAP Motion", "Zero-Latency"],
    accentColor: "#ef4444",
  },
];

export const ClientCaseStudiesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTabMap, setActiveTabMap] = useState<{ [key: string]: number }>({
    "prepy-ai": 0,
    "suitup-3d": 0,
    "spiderverse-os": 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const caseBlocks = container.querySelectorAll(".case-study-block");
      caseBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="client-case-studies-section"
      className="relative w-full bg-[#050507] text-white py-20 lg:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
    >
      {/* Top Divider Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background Ambient Radial Glows */}
      <div className="absolute top-1/4 right-10 w-[650px] h-[450px] bg-purple-600/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-[700px] h-[500px] bg-cyan-600/[0.04] rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="w-full text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-[11px] font-mono tracking-widest uppercase text-amber-300 mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            02 / DEEP-DIVE CASE STUDIES
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-[1.15]"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Proof In The Pixels. Verified In The Shipped Impact.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Real problems diagnosed, bespoke design systems engineered, and quantitative business growth delivered.
          </p>
        </div>

        {/* Case Studies Staggered Stack */}
        <div className="w-full space-y-20 lg:space-y-28">
          {CASE_STUDIES.map((study, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={study.id}
                className="case-study-block w-full rounded-[36px] p-6 sm:p-10 lg:p-12 bg-white/[0.025] backdrop-blur-2xl border border-white/[0.10] hover:border-white/[0.22] transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.7)] flex flex-col opacity-0 will-change-transform"
              >
                {/* Header Row: Badge & Client Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: `${study.accentColor}15`,
                        color: study.accentColor,
                        borderColor: `${study.accentColor}35`,
                      }}
                    >
                      {study.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      CLIENT: <strong className="text-zinc-200">{study.client}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                    <span>TIMELINE: {study.timeline}</span>
                    <span>•</span>
                    <span className="text-zinc-300">{study.role}</span>
                  </div>
                </div>

                {/* 2-Column Content Grid */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8 ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                  
                  {/* Text Story & Tabs (Cols 1-6) */}
                  <div className={`lg:col-span-6 flex flex-col justify-between space-y-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug"
                        style={{ fontFamily: "var(--font-sora), sans-serif" }}
                      >
                        {study.title}
                      </h3>
                      <p className="text-sm font-mono text-zinc-400 mt-2">
                        {study.subtitle}
                      </p>
                    </div>

                    {/* Interactive Tab Switcher */}
                    <div className="flex gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/10 w-fit">
                      {["The Challenge", "The Solution"].map((tabLabel, tIdx) => (
                        <button
                          key={tabLabel}
                          onClick={() => {
                            soundManager.playClick();
                            setActiveTabMap((prev) => ({ ...prev, [study.id]: tIdx }));
                          }}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 ${
                            activeTabMap[study.id] === tIdx
                              ? "bg-white text-black font-semibold shadow-md"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          {tabLabel}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content Display */}
                    <div className="min-h-[110px] p-4 rounded-2xl bg-black/30 border border-white/[0.06]">
                      <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-300">
                        {activeTabMap[study.id] === 0 ? study.challenge : study.solution}
                      </p>
                    </div>

                    {/* Verified Quantitative Metrics */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {study.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center"
                        >
                          <div
                            className="text-xl sm:text-2xl font-bold font-mono tracking-tight"
                            style={{ color: study.accentColor }}
                          >
                            {metric.value}
                          </div>
                          <div className="text-[10px] font-mono text-zinc-400 mt-1 uppercase tracking-wide">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Client Quote Box */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border-l-2 border-white/30 text-xs sm:text-[13px] text-zinc-300 italic">
                      &ldquo;{study.quote}&rdquo;
                      <div className="mt-2 not-italic text-[11px] font-mono text-zinc-400">
                        — <strong className="text-zinc-200">{study.quoteAuthor}</strong>, {study.quoteRole}
                      </div>
                    </div>
                  </div>

                  {/* Device Artwork & Mockup (Cols 7-12) */}
                  <div className={`lg:col-span-6 relative h-[340px] sm:h-[440px] rounded-[28px] overflow-hidden bg-black/60 border border-white/[0.12] flex items-center justify-center group/artwork ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover object-center filter contrast-[1.04] transition-transform duration-700 ease-out group-hover/artwork:scale-105"
                    />

                    {/* Translucent Corner Pill */}
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-mono text-zinc-300">
                      LIVE INTERACTIVE SYSTEM
                    </div>
                  </div>

                </div>

                {/* Footer Tag Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-white/[0.08]">
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-zinc-400 border border-white/[0.08]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => soundManager.playThwip()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>Read Full Architecture</span>
                    <span>→</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
