"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  Trash2,
  Sparkles,
  Heart,
  BookUser,
  X,
  Volume2,
  VolumeX,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Authentic macOS Blue Desktop Folder SVG (Elena Exact Style)
// ─────────────────────────────────────────────────────────────
const MacFolderIcon: React.FC<{ className?: string }> = ({ className = "w-14 h-11" }) => (
  <svg viewBox="0 0 100 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 14C4 9.58172 7.58172 6 12 6H34.5858C36.7076 6 38.7427 6.84285 40.2426 8.34285L45.657 13.7571C47.1569 15.2571 49.192 16.1 51.3138 16.1H88C92.4183 16.1 96 19.6817 96 24.1V66C96 70.4183 92.4183 74 88 74H12C7.58172 74 4 70.4183 4 66V14Z"
      fill="url(#folder-back-elena)"
    />
    <rect x="8" y="22" width="84" height="48" rx="6" fill="#FBFDFF" fillOpacity="0.9" />
    <path
      d="M4 25.5C4 20.8056 7.80558 17 12.5 17H87.5C92.1944 17 96 20.8056 96 25.5V66.5C96 71.1944 92.1944 75 87.5 75H12.5C7.80558 75 4 71.1944 4 66.5V25.5Z"
      fill="url(#folder-front-elena)"
    />
    <defs>
      <linearGradient id="folder-back-elena" x1="50" y1="6" x2="50" y2="74" gradientUnits="userSpaceOnUse">
        <stop stopColor="#67D5FD" />
        <stop offset="1" stopColor="#007AFF" />
      </linearGradient>
      <linearGradient id="folder-front-elena" x1="50" y1="17" x2="50" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#75DCFE" />
        <stop offset="1" stopColor="#1B87FD" />
      </linearGradient>
    </defs>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Desktop Folders Data (Exact 5 Vertical Folders from Reference Image)
// ─────────────────────────────────────────────────────────────
interface DesktopFolder {
  id: string;
  name: string;
  count: string;
  tag: string;
  description: string;
  items: string[];
}

const DESKTOP_FOLDERS: DesktopFolder[] = [
  {
    id: "qa-agent",
    name: "QA Agent\nLoop",
    count: "14 Kits",
    tag: "Autonomous QA",
    description: "Self-healing test agents, visual regression loops, and automated design-to-code compliance checking across breakpoints.",
    items: ["Spiderverse QA Runner", "Visual Diff Validator", "Design Token Auditor", "Lighthouse Pipeline"],
  },
  {
    id: "eleyyva",
    name: "Eleyyva",
    count: "28 Sprints",
    tag: "Design Systems",
    description: "Unified token architecture, Figma component kits, and living styleguides crafted for enterprise design scale.",
    items: ["Spider-Sense Component Kit", "Fluid Bento System", "Iridescent Glass Tokens", "Semantic Color Compiler"],
  },
  {
    id: "engineering",
    name: "Engineering",
    count: "42 Experiments",
    tag: "Creative Tech",
    description: "Spatial 3D shaders, Three.js physics solvers, GSAP kinetic interactions, and agentic AI prompt loops.",
    items: ["3D Paper Crumple Solver", "WebGL Fluid Cursor Canvas", "Kinetic Typography Engine", "AI Pair Agent Bridge"],
  },
  {
    id: "product-mgmt",
    name: "Product\nMgmt",
    count: "19 Shipped",
    tag: "Production Live",
    description: "End-to-end product design leadership: roadmap execution, client delivery milestones, and high-impact web apps.",
    items: ["Skull Ninja Brand Launch", "Modular SaaS Landing", "Audio Hub Studio Engine", "Global Payment Portal"],
  },
  {
    id: "customer-success",
    name: "Customer\nSuccess",
    count: "Client Portal",
    tag: "Client Proof",
    description: "Client feedback loops, production telemetry, and interactive case study demonstrations.",
    items: ["Live Product Metrics", "Client Proof Showcase", "Sprint Retrospectives", "Release Notes"],
  },
];



// ─────────────────────────────────────────────────────────────
// 5 Core Daily Tools from Assets
// ─────────────────────────────────────────────────────────────
interface DockTool {
  id: string;
  name: string;
  role: string;
  src: string;
}

const DOCK_TOOLS: DockTool[] = [
  {
    id: "photoshop",
    name: "Photoshop",
    role: "Pixel Craft & Compositing",
    src: "/assets/tools/photoshop.png",
  },
  {
    id: "illustrator",
    name: "Illustrator",
    role: "Vector Architecture & Identity",
    src: "/assets/tools/illustrator.png",
  },
  {
    id: "after_effects",
    name: "After Effects",
    role: "Motion Graphics & UI Dynamics",
    src: "/assets/tools/after_effects.png",
  },
  {
    id: "figma",
    name: "Figma",
    role: "Design Systems & Token Libraries",
    src: "/assets/tools/figma.png",
  },
  {
    id: "blender",
    name: "Blender",
    role: "3D Spatial Modeling & Shaders",
    src: "/assets/tools/blender.png",
  },
];

export interface WorkspaceDesktopSectionProps {
  isEmbedded?: boolean;
  className?: string;
}

export const WorkspaceDesktopSection: React.FC<WorkspaceDesktopSectionProps> = ({
  isEmbedded = false,
  className = "",
}) => {
  // Container constraint reference for dragging
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Live Date & Time
  const [liveDateString, setLiveDateString] = useState<string>("Sat, Nov 7");
  const [liveTimeString, setLiveTimeString] = useState<string>("12:07 PM");
  const [analogTime, setAnalogTime] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 12,
    minutes: 7,
    seconds: 0,
  });

  // Active selected folder
  const [selectedFolderId, setSelectedFolderId] = useState<string>("qa-agent");
  const [quickLookFolder, setQuickLookFolder] = useState<DesktopFolder | null>(null);

  // Music Player State & Real Audio Element
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [musicProgress, setMusicProgress] = useState<number>(30); // 30s default
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Bottom Center Dock Hover
  const [hoveredDockIndex, setHoveredDockIndex] = useState<number | null>(null);


  // Dynamic Z-Index elevation on drag so recently moved widget is on top
  const [highestZ, setHighestZ] = useState<number>(30);
  const [widgetZ, setWidgetZ] = useState<{ [key: string]: number }>({
    clock: 25,
    calendar: 25,
    weather: 24,
    photo: 23,
    music: 22,
  });

  // Reset key to restore widgets back to their initial positions if needed
  const [resetLayoutKey, setResetLayoutKey] = useState<number>(0);

  const bringToFront = (widgetId: string) => {
    setHighestZ((prev) => {
      const nextZ = prev + 1;
      setWidgetZ((current) => ({ ...current, [widgetId]: nextZ }));
      return nextZ;
    });
  };

  // Clock Update Interval
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveDateString(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
      setLiveTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
      setAnalogTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Audio setup for "Sunflower" (/assets/spiderman.mp3)
  useEffect(() => {
    const audio = new Audio("/assets/spiderman.mp3");
    audio.loop = true;
    audio.volume = 0.65;
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlay = () => setIsPlayingMusic(true);
    const onPause = () => setIsPlayingMusic(false);
    const onTimeUpdate = () => {
      if (audio.duration) {
        setMusicProgress(Math.floor(audio.currentTime));
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.pause();
    };
  }, []);

  const togglePlayMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("[WorkspaceDesktop] Audio play request handled:", err);
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="workspace-desktop-section"
      className={`relative w-full select-none overflow-hidden ${
        isEmbedded
          ? "w-[1920px] h-[1080px]"
          : "h-screen min-h-[720px] max-h-[960px]"
      } bg-[#111116] ${className}`}
      style={{
        fontFamily: "var(--font-sora), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP BACKGROUND WALLPAPER (Spider-Man Split Eye Art)
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/assets/desktop_wallpaper.jpg"
          alt="Spider-Man Desktop Wallpaper"
          className="w-full h-full object-cover select-none"
        />
        {/* Subtle cinematic gradient overlay for desktop depth & contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. EXACT TOP STATUS BAR (Elena Gonci Benchmark)
          Left: EG  Elena Gonci  Head of Product
          Right: Reset Layout Button + Live Time & Date
      ───────────────────────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 h-10 px-8 lg:px-12 flex items-center justify-between text-xs text-white/90 z-30 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        {/* Left Monogram & Identity */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-white tracking-tight text-xs sm:text-sm">EG</span>
          <span className="font-semibold text-white text-xs sm:text-sm">Ganesh PS</span>
          <span className="text-white/60 font-normal text-xs hidden sm:inline-block">
            Lead Product Designer &amp; Creative Technologist @ Webnox
          </span>
        </div>

        {/* Right Controls: Reset Layout + Live Time & Date */}
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          {/* Subtle Reset Layout Pill */}
          <button
            type="button"
            onClick={() => setResetLayoutKey((k) => k + 1)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all text-[11px] font-medium cursor-pointer"
            title="Reset widgets to original positions"
          >
            <RotateCcw className="w-3 h-3 text-white/60" />
            <span className="hidden sm:inline">Reset Layout</span>
          </button>

          <span className="font-normal text-white/80">
            {liveDateString}&nbsp; {liveTimeString}
          </span>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. DRAGGABLE WIDGET CLUSTER (Moveable Anywhere with Cursor)
          - Each widget is static at its initial position
          - Can be dragged anywhere across the section
          - dragMomentum={false} keeps it static wherever it is dropped
          - Elevated z-index while dragging
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-12 left-8 lg:left-12 w-[305px] flex flex-col gap-3 pointer-events-none z-20">
        
        {/* Row 1: Dual Square Widgets (Clock + Calendar) */}
        <div className="grid grid-cols-2 gap-3 pointer-events-none">
          
          {/* Widget 1: Minimalist Analog Clock */}
          <motion.div
            key={`clock-${resetLayoutKey}`}
            drag
            dragConstraints={sectionRef}
            dragElastic={0.06}
            dragMomentum={false}
            onDragStart={() => bringToFront("clock")}
            whileHover={{ scale: 1.02 }}
            whileDrag={{
              scale: 1.05,
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12), 0 8px 16px -6px rgba(0,0,0,0.06)",
              cursor: "grabbing",
            }}
            style={{ zIndex: widgetZ["clock"] || 25 }}
            className="pointer-events-auto cursor-grab active:cursor-grabbing bg-white rounded-[24px] p-3.5 border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center justify-between aspect-square relative select-none transition-shadow"
            title="Drag to move clock anywhere"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400 font-medium">
              COIMBATORE
            </span>

            {/* Minimalist Clock Face */}
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center">
              {/* 12 Hour Ticks */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-1.5 bg-zinc-300 rounded-full origin-bottom"
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(-28px)`,
                  }}
                />
              ))}

              {/* Hour Hand */}
              <div
                className="absolute w-1 h-4 bg-zinc-800 rounded-full origin-bottom transition-transform duration-300 ease-out"
                style={{
                  transform: `rotate(${analogTime.hours * 30 + analogTime.minutes * 0.5}deg) translateY(-50%)`,
                }}
              />

              {/* Minute Hand */}
              <div
                className="absolute w-0.5 h-6 bg-zinc-700 rounded-full origin-bottom transition-transform duration-300 ease-out"
                style={{
                  transform: `rotate(${analogTime.minutes * 6}deg) translateY(-50%)`,
                }}
              />

              {/* Second Hand (Vibrant Red) */}
              <div
                className="absolute w-[1.5px] h-7 bg-[#FF3B30] rounded-full origin-bottom"
                style={{
                  transform: `rotate(${analogTime.seconds * 6}deg) translateY(-50%)`,
                }}
              />

              {/* Center Axis Pin */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] border border-white z-10 shadow-sm" />
            </div>

            {/* Sub-label */}
            <span className="text-[9px] font-mono text-zinc-400">
              IST • UTC+5:30
            </span>
          </motion.div>

          {/* Widget 2: Apple Calendar Card */}
          <motion.div
            key={`cal-${resetLayoutKey}`}
            drag
            dragConstraints={sectionRef}
            dragElastic={0.06}
            dragMomentum={false}
            onDragStart={() => bringToFront("calendar")}
            whileHover={{ scale: 1.02 }}
            whileDrag={{
              scale: 1.05,
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12), 0 8px 16px -6px rgba(0,0,0,0.06)",
              cursor: "grabbing",
            }}
            style={{ zIndex: widgetZ["calendar"] || 25 }}
            className="pointer-events-auto cursor-grab active:cursor-grabbing bg-white rounded-[24px] p-3.5 border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between aspect-square select-none transition-shadow"
            title="Drag to move calendar anywhere"
          >
            <div>
              <span className="text-[10px] font-mono uppercase text-[#FF3B30] font-bold tracking-wider block">
                {new Date().toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()}
              </span>
              <span className="text-3xl font-bold text-zinc-900 leading-tight block">
                {new Date().getDate()}
              </span>
            </div>

            {/* 7-Column Mini Month Matrix */}
            <div className="grid grid-cols-7 gap-0.5 text-[8px] font-mono text-center text-zinc-400 pt-1 border-t border-zinc-100">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const isToday = day === new Date().getDate();
                return (
                  <span
                    key={day}
                    className={`h-3 flex items-center justify-center rounded-full text-[8px] ${
                      isToday ? "bg-black text-white font-bold" : "text-zinc-600"
                    }`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Row 2: Weather Forecast Card (Madrid / Coimbatore, 7 Days) */}
        <motion.div
          key={`weather-${resetLayoutKey}`}
          drag
          dragConstraints={sectionRef}
          dragElastic={0.06}
          dragMomentum={false}
          onDragStart={() => bringToFront("weather")}
          whileHover={{ scale: 1.015 }}
          whileDrag={{
            scale: 1.04,
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12), 0 8px 16px -6px rgba(0,0,0,0.06)",
            cursor: "grabbing",
          }}
          style={{ zIndex: widgetZ["weather"] || 24 }}
          className="pointer-events-auto cursor-grab active:cursor-grabbing bg-white rounded-[24px] p-3.5 border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.03)] select-none transition-shadow"
          title="Drag to move weather anywhere"
        >
          <div className="text-xs font-semibold text-zinc-800 mb-2">
            Coimbatore
          </div>

          {/* 7-Day Weather Row */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {[
              { day: "We", icon: <Sun className="w-3.5 h-3.5 text-amber-500 mx-auto" />, temp: "31°" },
              { day: "Th", icon: <Sun className="w-3.5 h-3.5 text-amber-500 mx-auto" />, temp: "33°" },
              { day: "Fr", icon: <CloudSun className="w-3.5 h-3.5 text-zinc-400 mx-auto" />, temp: "29°" },
              { day: "Sa", icon: <Cloud className="w-3.5 h-3.5 text-zinc-400 mx-auto" />, temp: "28°" },
              { day: "Su", icon: <Sun className="w-3.5 h-3.5 text-amber-500 mx-auto" />, temp: "30°" },
              { day: "Mo", icon: <Sun className="w-3.5 h-3.5 text-amber-500 mx-auto" />, temp: "32°" },
              { day: "Tu", icon: <CloudRain className="w-3.5 h-3.5 text-sky-400 mx-auto" />, temp: "27°" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-zinc-400 font-medium">{item.day}</span>
                {item.icon}
                <span className="text-[11px] text-zinc-700 font-medium">{item.temp}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Row 3: Square Photo Card */}
        <motion.div
          key={`photo-${resetLayoutKey}`}
          drag
          dragConstraints={sectionRef}
          dragElastic={0.06}
          dragMomentum={false}
          onDragStart={() => bringToFront("photo")}
          whileHover={{ scale: 1.02 }}
          whileDrag={{
            scale: 1.05,
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12), 0 8px 16px -6px rgba(0,0,0,0.06)",
            cursor: "grabbing",
          }}
          style={{ zIndex: widgetZ["photo"] || 23 }}
          className="pointer-events-auto cursor-grab active:cursor-grabbing w-24 h-24 rounded-[24px] overflow-hidden bg-zinc-100 border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative group select-none transition-shadow"
          title="Drag to move photo anywhere"
        >
          <img
            src="/assets/concepts/about_me_spiderverse_ui_1793291690442.jpg"
            alt="Ganesh Setup"
            className="w-full h-full object-cover pointer-events-none"
          />
        </motion.div>

        {/* Row 4: Music Player Card (Sunflower) */}
        <motion.div
          key={`music-${resetLayoutKey}`}
          drag
          dragConstraints={sectionRef}
          dragElastic={0.06}
          dragMomentum={false}
          onDragStart={() => bringToFront("music")}
          whileHover={{ scale: 1.015 }}
          whileDrag={{
            scale: 1.04,
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12), 0 8px 16px -6px rgba(0,0,0,0.06)",
            cursor: "grabbing",
          }}
          style={{ zIndex: widgetZ["music"] || 22 }}
          className="pointer-events-auto cursor-grab active:cursor-grabbing bg-white rounded-[24px] p-3.5 border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.03)] select-none transition-shadow"
          title="Drag to move music player anywhere"
        >
          <div className="flex items-center gap-3">
            {/* Red-Orange Square Album Art */}
            <div className="w-11 h-11 rounded-xl bg-[#E85D45] overflow-hidden shadow-sm shrink-0 flex items-center justify-center relative pointer-events-none">
              <div className="w-5 h-5 rounded-full bg-black/30 border border-white/20 flex items-center justify-center">
                {isPlayingMusic ? (
                  <Volume2 className="w-3 h-3 text-white animate-pulse" />
                ) : (
                  <VolumeX className="w-3 h-3 text-white/80" />
                )}
              </div>
            </div>

            {/* Track Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-zinc-900 truncate">
                Sunflower
              </h4>
              <p className="text-[10px] text-zinc-400 truncate">
                Post Malone, Swae Lee — Spider-Verse
              </p>

              {/* Audio Controls (Prev, Play, Next) with stopPropagation so clicks don't drag */}
              <div className="flex items-center gap-3 mt-1.5">
                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => {
                    if (audioRef.current) audioRef.current.currentTime = 0;
                  }}
                  className="text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer"
                  title="Restart Track"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={togglePlayMusic}
                  className="text-zinc-800 hover:text-black transition-colors cursor-pointer active:scale-95"
                  title={isPlayingMusic ? "Pause" : "Play Sunflower"}
                >
                  {isPlayingMusic ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-zinc-800" />
                  )}
                </button>

                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => {
                    if (audioRef.current) audioRef.current.currentTime += 15;
                  }}
                  className="text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer"
                  title="Fast Forward 15s"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrubber Bar */}
          <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center gap-2 text-[9px] font-mono text-zinc-400 pointer-events-none">
            <span>0:{musicProgress < 10 ? `0${musicProgress}` : musicProgress}</span>
            <div className="flex-1 h-0.5 bg-zinc-200 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-zinc-800 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (musicProgress / 158) * 100)}%` }}
              />
            </div>
            <span>-2:08</span>
          </div>
        </motion.div>

      </div>



      {/* ─────────────────────────────────────────────────────────────
          4. RIGHT MACOS DESKTOP FOLDERS (Draggable onto Desktop)
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-14 right-8 lg:right-12 flex flex-col gap-6 items-center z-20">
        {DESKTOP_FOLDERS.map((folder) => {
          const isSelected = selectedFolderId === folder.id;

          return (
            <motion.div
              key={`${folder.id}-${resetLayoutKey}`}
              drag
              dragConstraints={sectionRef}
              dragElastic={0.06}
              dragMomentum={false}
              whileHover={{ scale: 1.05 }}
              whileDrag={{ scale: 1.1, zIndex: 60, cursor: "grabbing" }}
              onClick={() => {
                setSelectedFolderId(folder.id);
                setQuickLookFolder(folder);
              }}
              className="flex flex-col items-center cursor-grab active:cursor-grabbing group select-none transition-shadow"
              style={{ width: "90px" }}
              title="Drag to place folder anywhere on desktop"
            >
              {/* Folder Icon */}
              <div className="relative mb-1 pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                <MacFolderIcon className="w-14 h-11" />
              </div>

              {/* Folder Label Centered Under Icon */}
              <span
                className={`text-[11px] font-medium text-center leading-tight whitespace-pre-line transition-all duration-150 max-w-[85px] pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] px-1.5 py-0.5 rounded-[5px] ${
                  isSelected
                    ? "bg-[#007AFF] text-white font-semibold"
                    : "text-white group-hover:bg-black/40"
                }`}
              >
                {folder.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. BOTTOM CENTER DOCK (5 Core Tools from Assets)
          Photoshop, Illustrator, After Effects, Figma, Blender
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-white/85 backdrop-blur-xl border border-black/[0.06] shadow-[0_12px_36px_rgba(0,0,0,0.08)] rounded-[24px] px-3.5 py-2 flex items-center gap-2.5 sm:gap-3">
          {DOCK_TOOLS.map((tool, index) => {
            const isHovered = hoveredDockIndex === index;
            const isNeighbor =
              hoveredDockIndex !== null && Math.abs(hoveredDockIndex - index) === 1;
            const scale = isHovered ? 1.35 : isNeighbor ? 1.15 : 1.0;
            const translateY = isHovered ? -8 : isNeighbor ? -3 : 0;

            return (
              <div key={tool.id} className="relative flex flex-col items-center">
                {/* Active Tooltip Popover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: -42 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute -top-1 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-900/95 text-white text-[10px] font-mono shadow-xl border border-white/10 whitespace-nowrap pointer-events-none z-40"
                    >
                      <span className="font-bold text-white">{tool.name}</span>
                      <span className="text-zinc-400 mx-1">•</span>
                      <span className="text-zinc-300">{tool.role}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tool Icon Tile */}
                <motion.div
                  onMouseEnter={() => setHoveredDockIndex(index)}
                  onMouseLeave={() => setHoveredDockIndex(null)}
                  animate={{ scale, y: translateY }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] overflow-hidden shadow-sm cursor-pointer select-none active:scale-95 transition-shadow bg-transparent"
                  title={tool.name}
                >
                  <img
                    src={tool.src}
                    alt={tool.name}
                    className="w-full h-full object-contain pointer-events-none select-none rounded-[14px]"
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>


      {/* ─────────────────────────────────────────────────────────────
          7. FOLDER "QUICK LOOK" MODAL (macOS Spacebar Preview)
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {quickLookFolder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setQuickLookFolder(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-black/10 select-text"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center">
                    <MacFolderIcon className="w-6 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 whitespace-pre-line">
                      {quickLookFolder.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      {quickLookFolder.tag} • {quickLookFolder.count}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setQuickLookFolder(null)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Folder Description */}
              <p className="text-sm text-zinc-600 mt-4 leading-relaxed">
                {quickLookFolder.description}
              </p>

              {/* Folder Project Items */}
              <div className="mt-5">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  CONTAINS:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickLookFolder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-center gap-2 text-xs font-medium text-zinc-800"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400">
                  Press ESC or click outside to dismiss
                </span>
                <button
                  type="button"
                  onClick={() => setQuickLookFolder(null)}
                  className="px-4 py-1.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
