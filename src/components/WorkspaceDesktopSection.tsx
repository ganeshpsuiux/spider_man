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
  Calendar as CalendarIcon,
  BookUser,
  RefreshCw,
  X,
  Volume2,
  VolumeX,
  CheckCircle2,
} from "lucide-react";
import PaperCrumple from "./PaperCrumple";

// ─────────────────────────────────────────────────────────────
// Authentic macOS Blue Desktop Folder SVG
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
// Authentic macOS Trash Can SVG
// ─────────────────────────────────────────────────────────────
const MacTrashIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-11" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="16" width="36" height="6" rx="2" fill="#8E8E93" />
    <path
      d="M26 24H54L51 68C50.9 70.2 49 72 46.8 72H33.2C31 72 29.1 70.2 29 68L26 24Z"
      fill="url(#trash-body-elena)"
      stroke="#7C7C80"
      strokeWidth="1.5"
    />
    <line x1="34" y1="32" x2="35" y2="62" stroke="#636366" strokeWidth="2" strokeLinecap="round" />
    <line x1="40" y1="32" x2="40" y2="62" stroke="#636366" strokeWidth="2" strokeLinecap="round" />
    <line x1="46" y1="32" x2="45" y2="62" stroke="#636366" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="trash-body-elena" x1="40" y1="24" x2="40" y2="72" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D1D1D6" />
        <stop offset="1" stopColor="#AEAEB2" />
      </linearGradient>
    </defs>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Desktop Folders Data (Matching Elena's 5 Vertical Icons on Right)
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
    name: "QA Agent Loop",
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
    name: "Product Mgmt",
    count: "19 Shipped",
    tag: "Production Live",
    description: "End-to-end product design leadership: roadmap execution, client delivery milestones, and high-impact web apps.",
    items: ["Skull Ninja Brand Launch", "Modular SaaS Landing", "Audio Hub Studio Engine", "Global Payment Portal"],
  },
  {
    id: "customer-success",
    name: "Customer Success",
    count: "Recycle Bin",
    tag: "Drop Paper Here",
    description: "Drop your crumpled sticky notes here to recycle. Clean workspace, clear mind.",
    items: ["Old wireframes.fig", "Discarded palette v1.ase", "Scrap sticky notes", "Legacy CSS resets"],
  },
];

// ─────────────────────────────────────────────────────────────
// 2x5 Tool Arsenal Definitions (Elena's Exact Bottom-Right Box)
// ─────────────────────────────────────────────────────────────
interface ToolItem {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
}

const TOOL_ARSENAL: ToolItem[] = [
  // Row 1: Notion, Cursor, Figma/Brand, Terminal, Claude
  {
    id: "notion",
    name: "Notion",
    role: "Product Specs & Sprint Backlog",
    icon: (
      <div className="w-7 h-7 rounded-lg bg-white border border-black/10 flex items-center justify-center shadow-sm">
        <span className="font-serif font-black text-black text-sm">N</span>
      </div>
    ),
  },
  {
    id: "cursor",
    name: "Cursor",
    role: "AI-Native Code Editor",
    icon: (
      <div className="w-7 h-7 rounded-lg bg-white border border-black/10 flex items-center justify-center shadow-sm text-sky-500 font-bold text-sm">
        &gt;
      </div>
    ),
  },
  {
    id: "green-spiral",
    name: "Antigravity",
    role: "Autonomous Agent Engine",
    icon: (
      <div className="w-7 h-7 rounded-lg bg-[#95D600] flex items-center justify-center shadow-sm text-black">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
          <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2.5" fill="none" />
          <circle cx="12" cy="12" r="4" fill="black" />
        </svg>
      </div>
    ),
  },
  {
    id: "terminal",
    name: "Terminal",
    role: "CLI & Deployment Pipelines",
    icon: (
      <div className="w-7 h-7 rounded-lg bg-black border border-white/20 flex items-center justify-center shadow-sm text-white font-mono text-xs font-bold">
        &gt;_
      </div>
    ),
  },
  {
    id: "claude",
    name: "Claude",
    role: "Anthropic Reasoning Engine",
    icon: (
      <div className="w-7 h-7 rounded-lg bg-[#D97757] flex items-center justify-center shadow-sm text-white">
        <Sparkles className="w-3.5 h-3.5 text-white" />
      </div>
    ),
  },
  // Row 2: ChatGPT, LinkedIn, Gmail, Apple Calendar, X
  {
    id: "chatgpt",
    name: "ChatGPT",
    role: "OpenAI GPT-4o Model",
    icon: (
      <div className="w-7 h-7 rounded-lg bg-white border border-black/10 flex items-center justify-center shadow-sm text-zinc-900">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-zinc-900">
          <path d="M20.5 10.5a4.5 4.5 0 0 0-3.8-4.4 4.5 4.5 0 0 0-8.2-1.6 4.5 4.5 0 0 0-4.4 3.8 4.5 4.5 0 0 0 1.6 8.2 4.5 4.5 0 0 0 3.8 4.4 4.5 4.5 0 0 0 8.2 1.6 4.5 4.5 0 0 0 4.4-3.8 4.5 4.5 0 0 0-1.6-8.2zm-8.5 7.5a6 6 0 1 1 6-6 6 6 0 0 1-6 6z" />
        </svg>
      </div>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    role: "Professional Network & Reach",
    icon: (
      <div className="w-7 h-7 rounded-lg bg-[#0077B5] flex items-center justify-center shadow-sm text-white font-bold text-xs">
        in
      </div>
    ),
  },
  {
    id: "gmail",
    name: "Gmail",
    role: "Direct Client Inquiries",
    icon: (
      <div className="w-7 h-7 rounded-lg bg-white border border-black/10 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 24 24" className="w-4 h-4">
          <path fill="#4285F4" d="M2 5v14h4V9l6 4.5L18 9v10h4V5l-10 7.5z" />
          <path fill="#EA4335" d="M2 5l10 7.5L22 5h-20z" />
        </svg>
      </div>
    ),
  },
  {
    id: "cal",
    name: "Calendar",
    role: "Discovery Calls & Office Hours",
    icon: (
      <div className="w-7 h-7 rounded-lg bg-white border border-black/10 flex flex-col items-center justify-center shadow-sm overflow-hidden">
        <div className="w-full bg-[#FF3B30] h-2 flex items-center justify-center text-[5px] text-white font-bold uppercase">
          NOV
        </div>
        <span className="text-[10px] font-bold text-zinc-900 leading-none mt-0.5">7</span>
      </div>
    ),
  },
  {
    id: "x",
    name: "X",
    role: "Design Engineering Thoughts",
    icon: (
      <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center shadow-sm text-white font-bold text-xs">
        𝕏
      </div>
    ),
  },
];

export const WorkspaceDesktopSection: React.FC = () => {
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

  // Bottom Right Tool Hover
  const [hoveredTool, setHoveredTool] = useState<ToolItem | null>(null);

  // Paper Crumple Sticky Note State
  const [paperResetKey, setPaperResetKey] = useState<number>(0);
  const [paperState, setPaperState] = useState<string>("flat");
  const [recycledToast, setRecycledToast] = useState<boolean>(false);

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

  const handleRecycleDrop = () => {
    setPaperResetKey((prev) => prev + 1);
    setRecycledToast(true);
    setTimeout(() => setRecycledToast(false), 3000);
  };

  return (
    <section
      id="workspace-desktop-section"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[960px] lg:min-h-[700px] bg-[#F9F9FB] flex flex-col justify-between select-none overflow-hidden"
      style={{
        fontFamily: "var(--font-sora), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. EXACT TOP STATUS BAR (Elena Gonci Benchmark)
          Left: EG  Elena Gonci  Head of Product
          Right: Sat, Nov 7 12:07 PM
      ───────────────────────────────────────────────────────────── */}
      <header className="relative z-30 w-full pt-3 pb-2 px-6 sm:px-10 flex items-center justify-between text-xs text-zinc-600">
        {/* Left Monogram & Identity */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-zinc-900 tracking-tight text-xs sm:text-sm">EG</span>
          <span className="font-semibold text-zinc-900 text-xs sm:text-sm">Ganesh PS</span>
          <span className="text-zinc-400 font-normal text-xs hidden sm:inline-block">
            Lead Product Designer &amp; Creative Technologist @ Webnox
          </span>
        </div>

        {/* Right Live Time & Date */}
        <div className="font-normal text-zinc-500 text-xs sm:text-sm">
          <span>{liveDateString}&nbsp; {liveTimeString}</span>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN DESKTOP STAGE (Exact Spatial Architecture of Reference Image)
          - Left: 4 Tactile White Widget Cards
          - Center: Large Hero Typography & 3D Interactive Sticky Note
          - Right: 5 Vertical macOS Desktop Folders
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex-1 max-w-[1440px] mx-auto px-6 sm:px-10 py-2 sm:py-4 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 overflow-y-auto lg:overflow-visible my-auto">
        
        {/* ──────── COLUMN 1: LEFT WIDGET CLUSTER (Exact 310px Stack) ──────── */}
        <div className="w-full lg:w-[310px] shrink-0 flex flex-col gap-3.5 max-w-[340px] mx-auto lg:mx-0">
          
          {/* Row 1: Analog Clock (Left) + Calendar Card (Right) */}
          <div className="grid grid-cols-2 gap-3.5">
            
            {/* Widget 1: Minimalist Analog Clock ("MIAMI" / "COIMBATORE") */}
            <div className="bg-white rounded-[24px] p-3.5 border border-black/[0.04] shadow-[0_6px_24px_rgba(0,0,0,0.03)] flex flex-col items-center justify-between aspect-square relative">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400 font-medium">
                COIMBATORE
              </span>

              {/* Minimalist Clock Face */}
              <div className="relative w-18 h-18 rounded-full flex items-center justify-center">
                {/* 12 Hour Ticks */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-1.5 bg-zinc-300 rounded-full origin-bottom"
                    style={{
                      transform: `rotate(${i * 30}deg) translateY(-32px)`,
                    }}
                  />
                ))}

                {/* Hour Hand */}
                <div
                  className="absolute w-1 h-5 bg-zinc-800 rounded-full origin-bottom transition-transform duration-300 ease-out"
                  style={{
                    transform: `rotate(${analogTime.hours * 30 + analogTime.minutes * 0.5}deg) translateY(-50%)`,
                  }}
                />

                {/* Minute Hand */}
                <div
                  className="absolute w-0.5 h-7 bg-zinc-700 rounded-full origin-bottom transition-transform duration-300 ease-out"
                  style={{
                    transform: `rotate(${analogTime.minutes * 6}deg) translateY(-50%)`,
                  }}
                />

                {/* Second Hand (Vibrant Red) */}
                <div
                  className="absolute w-[1.5px] h-8 bg-[#FF3B30] rounded-full origin-bottom"
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
            </div>

            {/* Widget 2: Apple Calendar Card ("SATURDAY 7", 7-Col Matrix) */}
            <div className="bg-white rounded-[24px] p-3.5 border border-black/[0.04] shadow-[0_6px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between aspect-square">
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
            </div>

          </div>

          {/* Row 2: Weather Forecast Card ("Madrid 31°", 7-Day Forecast Row) */}
          <div className="bg-white rounded-[24px] p-3.5 border border-black/[0.04] shadow-[0_6px_24px_rgba(0,0,0,0.03)]">
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
          </div>

          {/* Row 3: Personal Photo Card (Ganesh with Sunglasses / Workstation) */}
          <div className="w-24 h-24 rounded-[24px] overflow-hidden bg-zinc-100 border border-black/[0.04] shadow-[0_6px_24px_rgba(0,0,0,0.03)] relative group">
            <img
              src="/assets/concepts/about_me_spiderverse_ui_1793291690442.jpg"
              alt="Ganesh Setup"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Row 4: Spider-Verse Music Player Widget (Sunflower) */}
          <div className="bg-white rounded-[24px] p-3.5 border border-black/[0.04] shadow-[0_6px_24px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-3">
              {/* Vibrant Orange-Red Square Album Art */}
              <div className="w-11 h-11 rounded-xl bg-[#FF4500] bg-gradient-to-tr from-[#FF3B30] to-[#FF8C00] overflow-hidden shadow-sm shrink-0 flex items-center justify-center relative">
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

                {/* Audio Controls (Prev, Play, Next) */}
                <div className="flex items-center gap-3 mt-1.5">
                  <button
                    type="button"
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
            <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center gap-2 text-[9px] font-mono text-zinc-400">
              <span>0:{musicProgress < 10 ? `0${musicProgress}` : musicProgress}</span>
              <div className="flex-1 h-0.5 bg-zinc-200 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-zinc-800 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (musicProgress / 158) * 100)}%` }}
                />
              </div>
              <span>-2:08</span>
            </div>
          </div>

        </div>

        {/* ──────── COLUMN 2: CENTER HERO TYPOGRAPHY & 3D STICKY NOTE ──────── */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-2 max-w-[540px] mx-auto">
          
          {/* Main Display Headline (Elena Gonci Exact Styling) */}
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#111111] tracking-[-0.035em] leading-[1.08] text-center">
            This is where I live.
            <br />
            I craft systems at{" "}
            <span className="relative inline-block underline decoration-black/25 underline-offset-[10px] decoration-[2px] hover:decoration-black transition-colors">
              Webnox.
            </span>
          </h1>

          {/* Subtext Paragraph */}
          <p className="mt-4 max-w-[460px] mx-auto text-center text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed">
            Where design precision meets vibe coding. Orchestrating design systems, AI agents, and interactive motion to build living digital products.
          </p>

          {/* ─────────────────────────────────────────────────────────
              REACT BITS <PaperCrumple /> 3D INTERACTIVE STICKY NOTE
              Proportionately scaled to fit cleanly within vertical space
          ───────────────────────────────────────────────────────── */}
          <div className="relative mt-4 sm:mt-5 flex flex-col items-center">
            
            {/* 3D Paper Component */}
            <div className="relative rounded-2xl overflow-visible filter drop-shadow-md">
              <PaperCrumple
                src="/assets/sticky_note.png"
                alt="Ganesh's Daily Sticky Note Memo"
                width={195}
                height={245}
                sceneHeight={255}
                releaseBehavior="creased"
                crumpleAmount={0.85}
                crumpleDuration={0.55}
                releaseDuration={0.4}
                foldCount={5}
                foldSharpness={0.65}
                wrinkleDepth={0.7}
                creaseStrength={0.22}
                paperColor="#fef08a"
                paperTexture={0.12}
                lightIntensity={1.9}
                lightAngle={-35}
                shadow={true}
                shadowOpacity={0.12}
                draggable={true}
                dragRotation={12}
                dragRadius={180}
                returnToOrigin={true}
                resetKey={paperResetKey}
                onStateChange={(state) => setPaperState(state)}
              />
            </div>

            {/* Instruction Micro-HUD */}
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                {paperState === "holding"
                  ? "Crumpling 3D paper..."
                  : paperState === "creased"
                  ? "Creased & Unfolded"
                  : "Touch & drag to crumple"}
              </span>

              {/* Reset Note Button */}
              <button
                type="button"
                onClick={() => setPaperResetKey((prev) => prev + 1)}
                className="flex items-center gap-1 text-[9px] font-mono text-zinc-600 hover:text-black bg-zinc-100 hover:bg-zinc-200 px-2 py-0.5 rounded-full transition-colors cursor-pointer"
                title="Reset note to flat"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

        </div>

        {/* ──────── COLUMN 3: RIGHT MACOS DESKTOP FOLDERS (Elena Exact Right Edge) ──────── */}
        <div className="w-full lg:w-[110px] shrink-0 flex lg:flex-col flex-wrap gap-5 sm:gap-6 justify-center lg:items-end">
          
          {DESKTOP_FOLDERS.map((folder) => {
            const isSelected = selectedFolderId === folder.id;
            const isRecycleBin = folder.id === "customer-success";

            return (
              <div
                key={folder.id}
                onClick={() => {
                  setSelectedFolderId(folder.id);
                  if (isRecycleBin) {
                    handleRecycleDrop();
                  } else {
                    setQuickLookFolder(folder);
                  }
                }}
                className="flex flex-col items-center cursor-pointer group select-none transition-transform active:scale-95"
                style={{ width: "96px" }}
              >
                {/* Folder Icon */}
                <div className="relative mb-1 transition-transform group-hover:scale-105 duration-200">
                  {isRecycleBin ? (
                    <MacTrashIcon className="w-12 h-11" />
                  ) : (
                    <MacFolderIcon className="w-14 h-11" />
                  )}
                </div>

                {/* Folder Label Centered Under Icon */}
                <span
                  className={`text-[11px] font-normal text-center leading-tight transition-all duration-150 max-w-[88px] ${
                    isSelected
                      ? "text-black font-semibold"
                      : "text-zinc-700 group-hover:text-black"
                  }`}
                >
                  {folder.name}
                </span>
              </div>
            );
          })}

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM FLOATING BAR (Exact Elena Gonci Layout)
          - Center: Translucent Capsule Dock (6 App Icons: G, Folder, Sparkles, Heart, Sat 7, Contacts)
          - Right: 2x5 Tool Arsenal Launcher Box
      ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 w-full pb-5 px-6 sm:px-10 flex items-center justify-between">
        
        {/* Left balance placeholder */}
        <div className="hidden lg:block w-[310px]" />

        {/* ──────── BOTTOM-CENTER: CAPSULE DOCK (6 Icons from Elena's Dock) ──────── */}
        <div className="bg-white/85 backdrop-blur-xl border border-black/[0.06] shadow-[0_12px_36px_rgba(0,0,0,0.08)] rounded-[22px] px-3 py-1.5 flex items-center gap-2.5 mx-auto">
          {[
            // 1. Monogram Icon (ε / G)
            {
              id: "monogram",
              name: "GaneshOS",
              icon: (
                <div className="w-9 h-9 rounded-xl bg-white border border-black/10 flex items-center justify-center font-bold text-zinc-900 text-sm shadow-sm">
                  G
                </div>
              ),
            },
            // 2. Blue Folder Icon
            {
              id: "finder",
              name: "Projects",
              icon: (
                <div className="w-9 h-9 rounded-xl bg-[#007AFF] flex items-center justify-center shadow-sm">
                  <MacFolderIcon className="w-6 h-5" />
                </div>
              ),
            },
            // 3. Purple Sparkles Icon
            {
              id: "sparkles",
              name: "AI & Motion",
              icon: (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-sm">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              ),
            },
            // 4. Red Heart Icon
            {
              id: "heart",
              name: "Vibe & Passion",
              icon: (
                <div className="w-9 h-9 rounded-xl bg-[#FF3B30] flex items-center justify-center text-white shadow-sm">
                  <Heart className="w-4 h-4 fill-white text-white" />
                </div>
              ),
            },
            // 5. White Calendar Icon (SAT 7)
            {
              id: "calendar-icon",
              name: "Schedule",
              icon: (
                <div className="w-9 h-9 rounded-xl bg-white border border-black/10 flex flex-col items-center justify-center shadow-sm overflow-hidden">
                  <span className="text-[7px] font-bold text-[#FF3B30] uppercase leading-none">
                    {new Date().toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}
                  </span>
                  <span className="text-[12px] font-bold text-zinc-900 leading-none mt-0.5">
                    {new Date().getDate()}
                  </span>
                </div>
              ),
            },
            // 6. Green Contacts/Notebook Icon
            {
              id: "contacts",
              name: "Contacts",
              icon: (
                <div className="w-9 h-9 rounded-xl bg-[#34C759] flex items-center justify-center text-white shadow-sm">
                  <BookUser className="w-4 h-4 text-white" />
                </div>
              ),
            },
          ].map((dockItem, index) => {
            const isHovered = hoveredDockIndex === index;
            const isNeighbor =
              hoveredDockIndex !== null && Math.abs(hoveredDockIndex - index) === 1;
            const scale = isHovered ? 1.3 : isNeighbor ? 1.15 : 1.0;

            return (
              <motion.div
                key={dockItem.id}
                onMouseEnter={() => setHoveredDockIndex(index)}
                onMouseLeave={() => setHoveredDockIndex(null)}
                onClick={() => {
                  if (dockItem.id === "finder") {
                    setQuickLookFolder(DESKTOP_FOLDERS[0]);
                  }
                }}
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="cursor-pointer select-none"
                title={dockItem.name}
              >
                {dockItem.icon}
              </motion.div>
            );
          })}
        </div>

        {/* ──────── BOTTOM-RIGHT: 2x5 TOOL ARSENAL LAUNCHER CARD ──────── */}
        <div className="relative bg-white/95 backdrop-blur-md border border-black/[0.06] shadow-[0_12px_36px_rgba(0,0,0,0.08)] rounded-[22px] p-2.5 shrink-0 hidden sm:block">
          
          {/* Active Tooltip Popover */}
          <AnimatePresence>
            {hoveredTool && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: -38 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute -top-1 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-900 text-white text-[10px] font-mono shadow-xl border border-white/10 whitespace-nowrap pointer-events-none z-30"
              >
                <span className="font-bold text-white">{hoveredTool.name}</span>
                <span className="text-zinc-400 mx-1">•</span>
                <span className="text-zinc-300">{hoveredTool.role}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2x5 Tool Grid */}
          <div className="grid grid-cols-5 gap-1.5">
            {TOOL_ARSENAL.map((tool) => (
              <div
                key={tool.id}
                onMouseEnter={() => setHoveredTool(tool)}
                onMouseLeave={() => setHoveredTool(null)}
                className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
              >
                {tool.icon}
              </div>
            ))}
          </div>
        </div>

      </footer>

      {/* ─────────────────────────────────────────────────────────────
          4. FOLDER "QUICK LOOK" MODAL (macOS Spacebar Preview)
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
                    <h3 className="font-bold text-base text-zinc-900">
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

      {/* ─────────────────────────────────────────────────────────────
          5. TRASH RECYCLED TOAST ALERT
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {recycledToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 text-white backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2 text-xs font-mono"
          >
            <Trash2 className="w-4 h-4 text-emerald-400" />
            <span>Sticky note recycled into trash! Workspace cleaned.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
