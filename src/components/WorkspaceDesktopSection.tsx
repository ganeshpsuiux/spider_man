"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Sun,
  CloudSun,
  Trash2,
  Sparkles,
  RefreshCw,
  X,
  Volume2,
  VolumeX,
  Code2,
  CheckCircle2,
  Wifi,
  Battery,
  Sliders,
  Search,
  Laptop,
  Maximize2,
} from "lucide-react";
import PaperCrumple from "./PaperCrumple";

// ─────────────────────────────────────────────────────────────
// Authentic macOS Blue Folder SVG
// ─────────────────────────────────────────────────────────────
const MacFolderIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-10" }) => (
  <svg viewBox="0 0 100 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 14C4 9.58172 7.58172 6 12 6H34.5858C36.7076 6 38.7427 6.84285 40.2426 8.34285L45.657 13.7571C47.1569 15.2571 49.192 16.1 51.3138 16.1H88C92.4183 16.1 96 19.6817 96 24.1V66C96 70.4183 92.4183 74 88 74H12C7.58172 74 4 70.4183 4 66V14Z"
      fill="url(#folder-back)"
    />
    <rect x="8" y="22" width="84" height="48" rx="6" fill="#FBFDFF" fillOpacity="0.9" />
    <path
      d="M4 25.5C4 20.8056 7.80558 17 12.5 17H87.5C92.1944 17 96 20.8056 96 25.5V66.5C96 71.1944 92.1944 75 87.5 75H12.5C7.80558 75 4 71.1944 4 66.5V25.5Z"
      fill="url(#folder-front)"
    />
    <defs>
      <linearGradient id="folder-back" x1="50" y1="6" x2="50" y2="74" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5AC8FA" />
        <stop offset="1" stopColor="#007AFF" />
      </linearGradient>
      <linearGradient id="folder-front" x1="50" y1="17" x2="50" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#64D2FF" />
        <stop offset="1" stopColor="#0A84FF" />
      </linearGradient>
    </defs>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Authentic macOS Trash Can SVG
// ─────────────────────────────────────────────────────────────
const MacTrashIcon: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="16" width="36" height="6" rx="2" fill="#8E8E93" />
    <path
      d="M26 24H54L51 68C50.9 70.2 49 72 46.8 72H33.2C31 72 29.1 70.2 29 68L26 24Z"
      fill="url(#trash-body)"
      stroke="#7C7C80"
      strokeWidth="1.5"
    />
    <line x1="34" y1="32" x2="35" y2="62" stroke="#636366" strokeWidth="2" strokeLinecap="round" />
    <line x1="40" y1="32" x2="40" y2="62" stroke="#636366" strokeWidth="2" strokeLinecap="round" />
    <line x1="46" y1="32" x2="45" y2="62" stroke="#636366" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="trash-body" x1="40" y1="24" x2="40" y2="72" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D1D1D6" />
        <stop offset="1" stopColor="#AEAEB2" />
      </linearGradient>
    </defs>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Apple Logo SVG
// ─────────────────────────────────────────────────────────────
const AppleLogo: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 170 170" className={className} fill="currentColor">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.56-7.71-11.61-14.01-6.19-9.59-10.96-20.76-14.3-33.51-3.34-12.76-5.01-24.37-5.01-34.84 0-14.43 3.65-26.44 10.96-36.03 7.31-9.59 16.48-14.48 27.5-14.67 4.93 0 10.3 1.25 16.12 3.75 5.82 2.5 9.77 3.86 11.84 4.09 2.52-.33 6.64-1.78 12.35-4.35 5.72-2.57 10.79-3.75 15.22-3.53 11.44.55 20.65 4.68 27.63 12.39-10.01 6.09-14.89 14.79-14.63 26.11.26 9.36 4.03 17.18 11.31 23.47 7.28 6.29 15.93 9.9 25.96 10.84-2.18 6.75-4.8 13.59-7.87 20.52zM119.22 33.72c0-7.72 2.76-14.97 8.28-21.75 5.53-6.77 12.32-11.16 20.39-13.17.22 1.3.33 2.5.33 3.6 0 7.73-2.94 15.19-8.82 22.38-5.88 7.18-12.87 11.53-20.97 13.05-.11-1.3-.21-2.4-.21-3.31z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Desktop Folders Data
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
    id: "design-systems",
    name: "01_Design_Systems",
    count: "14 Kits",
    tag: "Figma Tokens",
    description: "Production UI component libraries, scalable design tokens, and light/dark mode themes built for Webnox clients.",
    items: ["Spiderverse Design Kit", "Modular Bento Architecture", "Iridescent Glass Components", "Design Token Compiler"],
  },
  {
    id: "webnox-os",
    name: "02_Webnox_Vault",
    count: "28 Sprints",
    tag: "Design Leadership",
    description: "End-to-end design leadership: user journeys, responsive architectures, design-to-code pipelines, and QA reviews.",
    items: ["Enterprise Analytics Platform", "Fintech Mobile Onboarding", "Brand Identity Guidelines", "Creative Direction Playbook"],
  },
  {
    id: "vibe-lab",
    name: "03_Vibe_Lab",
    count: "42 Experiments",
    tag: "AI & 3D WebGL",
    description: "Frontier experiments in creative technology: Three.js physics solvers, GSAP kinetic scroll, and agentic AI prompt loops.",
    items: ["3D Paper Crumple Mesh", "Fluid Spider-Sense Canvas", "Kinetic Typography Shader", "Autonomous AI Agents"],
  },
  {
    id: "client-proof",
    name: "04_Client_Proof",
    count: "19 Shipped",
    tag: "Production Live",
    description: "Real-world web apps and high-conversion client products currently operating live in production.",
    items: ["Skull Ninja Brand Showcase", "Modular SaaS Landing", "Audio Hub Studio Engine", "Global Payment Portal"],
  },
  {
    id: "recycle-bin",
    name: "Recycle_Bin",
    count: "Trash",
    tag: "Drop Paper Here",
    description: "Drop your crumpled sticky notes here to recycle. Clean workspace, clear mind.",
    items: ["Old wireframes.fig", "Discarded palette v1.ase", "Scrap sticky notes", "Legacy CSS resets"],
  },
];

// ─────────────────────────────────────────────────────────────
// Dock App Definitions (10 Core Daily Drivers + Trash)
// ─────────────────────────────────────────────────────────────
interface DockApp {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  isOpen?: boolean;
}

export const WorkspaceDesktopSection: React.FC = () => {
  // Live Date & Time
  const [liveDateString, setLiveDateString] = useState<string>("Sat, Nov 7");
  const [liveTimeString, setLiveTimeString] = useState<string>("12:04 PM");
  const [analogTime, setAnalogTime] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 12,
    minutes: 4,
    seconds: 0,
  });

  // Active selected folder (macOS blue selection pill)
  const [selectedFolderId, setSelectedFolderId] = useState<string>("design-systems");
  const [quickLookFolder, setQuickLookFolder] = useState<DesktopFolder | null>(null);

  // Music Player State & Real Audio Element
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [musicProgress, setMusicProgress] = useState<number>(30); // 30s default
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Dock Hover Index for Smooth macOS Magnification
  const [hoveredDockIndex, setHoveredDockIndex] = useState<number | null>(null);

  // Paper Crumple Sticky Note State
  const [paperResetKey, setPaperResetKey] = useState<number>(0);
  const [paperState, setPaperState] = useState<string>("flat");
  const [recycledToast, setRecycledToast] = useState<boolean>(false);
  const [actionToast, setActionToast] = useState<string | null>(null);

  // Real-time Clock Update
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

  const showToast = (message: string) => {
    setActionToast(message);
    setTimeout(() => setActionToast(null), 2500);
  };

  // 10 Core Dock Applications with Authentic High-Res Styling
  const DOCK_APPS: DockApp[] = [
    {
      id: "finder",
      name: "Finder",
      role: "GaneshOS File System",
      isOpen: true,
      icon: (
        <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#64D2FF] via-[#0A84FF] to-[#0051D5] p-1.5 flex flex-col items-center justify-center text-white shadow-inner">
          <span className="font-black text-sm tracking-tighter">G</span>
        </div>
      ),
    },
    {
      id: "figma",
      name: "Figma",
      role: "Design Systems & Token Libraries",
      isOpen: true,
      icon: (
        <div className="w-full h-full rounded-xl bg-white border border-black/10 flex items-center justify-center shadow-inner p-1.5">
          <svg viewBox="0 0 38 57" className="w-5 h-5">
            <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
            <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
            <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
            <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
            <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
          </svg>
        </div>
      ),
    },
    {
      id: "photoshop",
      name: "Photoshop",
      role: "Compositing & Pixel Perfection",
      isOpen: false,
      icon: (
        <div className="w-full h-full rounded-xl bg-[#001E36] border border-[#31A8FF]/60 flex items-center justify-center font-black text-[#31A8FF] text-xs tracking-tight shadow-inner">
          Ps
        </div>
      ),
    },
    {
      id: "illustrator",
      name: "Illustrator",
      role: "Vector Icons & Brand Identity",
      isOpen: false,
      icon: (
        <div className="w-full h-full rounded-xl bg-[#330000] border border-[#FF9A00]/60 flex items-center justify-center font-black text-[#FF9A00] text-xs tracking-tight shadow-inner">
          Ai
        </div>
      ),
    },
    {
      id: "aftereffects",
      name: "After Effects",
      role: "Motion Design & UI Dynamics",
      isOpen: false,
      icon: (
        <div className="w-full h-full rounded-xl bg-[#00005B] border border-[#9999FF]/60 flex items-center justify-center font-black text-[#9999FF] text-xs tracking-tight shadow-inner">
          Ae
        </div>
      ),
    },
    {
      id: "antigravity",
      name: "Antigravity AI",
      role: "Agentic AI Pair Programmer",
      isOpen: true,
      icon: (
        <div className="w-full h-full rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-blue-500 border border-purple-300/40 flex items-center justify-center text-white shadow-inner">
          <Sparkles className="w-4 h-4 text-purple-200 animate-pulse" />
        </div>
      ),
    },
    {
      id: "vscode",
      name: "VS Code / Cursor",
      role: "Codebase & Terminal Workspace",
      isOpen: true,
      icon: (
        <div className="w-full h-full rounded-xl bg-[#1E1E1E] border border-sky-500/40 flex items-center justify-center text-sky-400 font-mono text-xs font-bold shadow-inner">
          {`>_`}
        </div>
      ),
    },
    {
      id: "nextjs",
      name: "Next.js",
      role: "Full-Stack Web Architecture",
      isOpen: false,
      icon: (
        <div className="w-full h-full rounded-xl bg-black border border-white/20 flex items-center justify-center font-black text-white text-xs shadow-inner">
          N
        </div>
      ),
    },
    {
      id: "threejs",
      name: "Three.js",
      role: "3D Spatial Physics & Shaders",
      isOpen: false,
      icon: (
        <div className="w-full h-full rounded-xl bg-zinc-900 border border-white/20 flex items-center justify-center text-white text-[11px] font-bold shadow-inner">
          3D
        </div>
      ),
    },
    {
      id: "spotify",
      name: "Spotify",
      role: "Sunflower (Spider-Verse OST)",
      isOpen: isPlayingMusic,
      icon: (
        <div className="w-full h-full rounded-xl bg-[#1DB954] flex items-center justify-center text-black shadow-inner">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.794-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.808-.87 7.076-.496 9.723 1.115.294.18.386.562.207.855zm1.225-2.723c-.226.367-.708.482-1.075.257-2.69-1.653-6.79-2.131-9.97-1.165-.413.125-.849-.107-.975-.521-.125-.414.108-.849.522-.975 3.633-1.103 8.147-.568 11.24 1.33.368.225.483.707.258 1.074zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.494.15-1.018-.129-1.167-.622-.15-.494.129-1.019.622-1.168 3.532-1.072 9.404-.866 13.115 1.338.445.264.59.838.327 1.282-.264.444-.838.59-1.282.326z" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section
      id="workspace-desktop-section"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[960px] lg:min-h-[700px] bg-[#F7F7FA] flex flex-col justify-between select-none overflow-hidden"
      style={{
        fontFamily: "var(--font-sora), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. AUTHENTIC APPLE MACOS MENU BAR (TOP STRIP)
          Full-width translucent frosted glass strip with authentic Mac items
      ───────────────────────────────────────────────────────────── */}
      <header className="relative z-30 w-full h-7 bg-white/75 backdrop-blur-xl border-b border-black/[0.06] px-3 sm:px-4 flex items-center justify-between text-[11px] font-medium text-zinc-700 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        {/* Left macOS Menus */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Apple Monogram */}
          <div className="flex items-center gap-1.5 font-bold text-zinc-900 cursor-pointer hover:opacity-75 transition-opacity">
            <AppleLogo className="w-3 h-3 text-zinc-900" />
            <span className="font-semibold text-xs tracking-tight">GaneshOS</span>
          </div>

          {/* Menubar Items */}
          <nav className="hidden md:flex items-center gap-3 text-zinc-600 font-normal">
            <span className="hover:text-black cursor-pointer transition-colors">File</span>
            <span className="hover:text-black cursor-pointer transition-colors">Edit</span>
            <span className="hover:text-black cursor-pointer transition-colors">View</span>
            <span className="hover:text-black cursor-pointer transition-colors">Window</span>
            <span className="hover:text-black cursor-pointer transition-colors">Help</span>
          </nav>

          <span className="text-zinc-300 hidden lg:inline">|</span>

          {/* Creator Role Subtitle */}
          <span className="hidden lg:inline text-zinc-500 font-normal text-[11px] truncate max-w-[280px]">
            Lead Product Designer &amp; Technologist @ Webnox
          </span>
        </div>

        {/* Right Status Control Center */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 text-zinc-600 font-medium">
          {/* Flow State Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-medium text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Flow State Active</span>
          </div>

          {/* Music Playing Waves in Menubar */}
          {isPlayingMusic && (
            <div
              onClick={togglePlayMusic}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-md hover:bg-black/5 cursor-pointer text-zinc-800"
              title="Sunflower is playing — click to pause"
            >
              <div className="flex items-end gap-0.5 h-2.5">
                <span className="w-0.5 h-2 bg-emerald-600 animate-pulse" />
                <span className="w-0.5 h-3 bg-emerald-600 animate-bounce" />
                <span className="w-0.5 h-1.5 bg-emerald-600 animate-pulse" />
              </div>
              <span className="text-[10px] hidden md:inline font-mono">Sunflower</span>
            </div>
          )}

          {/* Wi-Fi & Battery */}
          <Wifi className="w-3.5 h-3.5 text-zinc-600" />
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono">100%</span>
            <Battery className="w-3.5 h-3.5 text-zinc-700" />
          </div>

          {/* Control Center Icon */}
          <Sliders className="w-3 h-3 text-zinc-600 hidden sm:block" />

          {/* Date & Time */}
          <span className="font-semibold text-zinc-800 text-[11px] ml-1">
            {liveDateString} &nbsp;{liveTimeString}
          </span>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN DESKTOP STAGE (Precise 3-Column macOS Spatial Architecture)
          - Left: Authentic Apple Desktop Widgets (Clock, Calendar, Weather, Sunflower)
          - Center: Refined Editorial Headline & Interactive 3D Sticky Note
          - Right: Authentic macOS Desktop Folder Files
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 overflow-y-auto lg:overflow-visible">
        
        {/* ──────── COLUMN 1: LEFT MACOS DESKTOP WIDGETS (Sonoma Style) ──────── */}
        <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-3 max-w-[340px] mx-auto lg:mx-0">
          
          {/* Row 1: Dual 2x2 Square Apple Widgets (Clock + Calendar) */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Widget 1: Minimalist Apple World Clock */}
            <div className="bg-white/90 backdrop-blur-md rounded-[20px] p-3 border border-black/[0.06] shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex flex-col items-center justify-between aspect-square">
              <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-zinc-400 font-semibold">
                COIMBATORE
              </span>

              {/* Minimalist Clock Face */}
              <div className="relative w-16 h-16 rounded-full flex items-center justify-center">
                {/* 12 Hour Ticks */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-1 bg-zinc-300 rounded-full origin-bottom"
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

                {/* Second Hand (Orange-Red Apple Sweep) */}
                <div
                  className="absolute w-[1px] h-7 bg-[#FF3B30] rounded-full origin-bottom"
                  style={{
                    transform: `rotate(${analogTime.seconds * 6}deg) translateY(-50%)`,
                  }}
                />

                {/* Center Pin */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] border border-white z-10" />
              </div>

              {/* Digital Subtext */}
              <span className="text-[9px] font-mono text-zinc-400">
                IST · UTC+5:30
              </span>
            </div>

            {/* Widget 2: Apple Calendar Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-[20px] p-3 border border-black/[0.06] shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between aspect-square">
              <div>
                <span className="text-[9px] font-mono uppercase text-[#FF3B30] font-bold tracking-wider block">
                  {new Date().toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}
                </span>
                <span className="text-2xl font-bold text-zinc-900 leading-none mt-0.5 block">
                  {new Date().getDate()}
                </span>
              </div>

              {/* 7-Col Mini Month Matrix */}
              <div className="grid grid-cols-7 gap-0.5 text-[7px] font-mono text-center text-zinc-400 pt-1 border-t border-zinc-100">
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
                      className={`h-2.5 flex items-center justify-center rounded-full text-[7px] ${
                        isToday ? "bg-[#FF3B30] text-white font-bold" : "text-zinc-600"
                      }`}
                    >
                      {day}
                    </span>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Row 2: Apple Music "Sunflower" Player Widget */}
          <div className="bg-white/90 backdrop-blur-md rounded-[20px] p-3 border border-black/[0.06] shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2.5">
              {/* Vibrant Spider-Verse Album Cover */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E11D48] via-[#FF3B30] to-[#F59E0B] overflow-hidden shadow-sm shrink-0 flex items-center justify-center relative">
                <div className="w-5 h-5 rounded-full bg-black/40 border border-white/20 flex items-center justify-center">
                  {isPlayingMusic ? (
                    <Volume2 className="w-3 h-3 text-white animate-pulse" />
                  ) : (
                    <VolumeX className="w-3 h-3 text-white/70" />
                  )}
                </div>
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] font-semibold text-zinc-900 truncate leading-tight">
                  Sunflower
                </h4>
                <p className="text-[9px] text-zinc-400 truncate">
                  Post Malone, Swae Lee
                </p>

                {/* Mini Controls */}
                <div className="flex items-center gap-2.5 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (audioRef.current) audioRef.current.currentTime = 0;
                    }}
                    className="text-zinc-400 hover:text-black transition-colors cursor-pointer"
                    title="Restart"
                  >
                    <SkipBack className="w-3 h-3" />
                  </button>

                  <button
                    type="button"
                    onClick={togglePlayMusic}
                    className="w-5 h-5 rounded-full bg-black hover:bg-[#FF3B30] text-white flex items-center justify-center shadow transition-colors cursor-pointer active:scale-95"
                    title={isPlayingMusic ? "Pause" : "Play"}
                  >
                    {isPlayingMusic ? (
                      <Pause className="w-2.5 h-2.5" />
                    ) : (
                      <Play className="w-2.5 h-2.5 ml-0.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (audioRef.current) audioRef.current.currentTime += 15;
                    }}
                    className="text-zinc-400 hover:text-black transition-colors cursor-pointer"
                    title="Forward 15s"
                  >
                    <SkipForward className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrubber Progress Bar */}
            <div className="mt-2 pt-1.5 border-t border-zinc-100 flex items-center gap-1.5 text-[8px] font-mono text-zinc-400">
              <span>0:{musicProgress < 10 ? `0${musicProgress}` : musicProgress}</span>
              <div className="flex-1 h-1 bg-zinc-100 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-zinc-800 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (musicProgress / 158) * 100)}%` }}
                />
              </div>
              <span>-2:08</span>
            </div>
          </div>

          {/* Row 3: Dual Compact Bento Cards (Weather + Setup Status) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Weather Widget */}
            <div className="bg-white/90 backdrop-blur-md rounded-[18px] p-2.5 border border-black/[0.06] shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex items-center gap-2">
              <Sun className="w-6 h-6 text-amber-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-zinc-800 leading-tight">32°C</div>
                <div className="text-[9px] text-zinc-400 font-medium truncate">Coimbatore</div>
              </div>
            </div>

            {/* Workspace Setup Status */}
            <div className="bg-white/90 backdrop-blur-md rounded-[18px] p-2.5 border border-black/[0.06] shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex items-center gap-2">
              <Laptop className="w-5 h-5 text-indigo-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-zinc-800 leading-tight truncate">Dual Displays</div>
                <div className="text-[8px] text-emerald-600 font-medium truncate">M3 Max Setup</div>
              </div>
            </div>
          </div>

        </div>

        {/* ──────── COLUMN 2: CENTER STAGE (Headline & 3D Interactive Sticky Note) ──────── */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-1 max-w-[560px] mx-auto">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-500/[0.08] text-[#FF3B30] text-[10px] font-mono font-semibold tracking-wider uppercase mb-2 border border-red-500/10">
            <span>WORKSPACE HEADQUARTERS</span>
          </div>

          {/* Balanced Editorial Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111111] tracking-[-0.03em] leading-[1.12]">
            This is where I live.
            <br />
            I craft systems at{" "}
            <span className="relative inline-block underline decoration-black/20 underline-offset-[8px] decoration-[2px] hover:decoration-black transition-colors">
              Webnox.
            </span>
          </h1>

          {/* Subtext Paragraph */}
          <p className="mt-2.5 text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed max-w-[440px]">
            Where design precision meets vibe coding. Orchestrating design systems, AI agents, and interactive motion to build living digital products.
          </p>

          {/* ─────────────────────────────────────────────────────────
              REACT BITS <PaperCrumple /> 3D INTERACTIVE STICKY NOTE
              Proportionately scaled to fit comfortably within viewport!
          ───────────────────────────────────────────────────────── */}
          <div className="relative mt-4 sm:mt-5 flex flex-col items-center">
            
            {/* 3D Paper Component */}
            <div className="relative rounded-2xl overflow-visible filter drop-shadow-md">
              <PaperCrumple
                src="/assets/sticky_note.png"
                alt="Ganesh's Daily Sticky Note Memo"
                width={205}
                height={255}
                sceneHeight={265}
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
                title="Reset note"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

        </div>

        {/* ──────── COLUMN 3: RIGHT MACOS DESKTOP FOLDERS ──────── */}
        <div className="w-full lg:w-[120px] shrink-0 flex lg:flex-col flex-wrap gap-4 sm:gap-5 justify-center lg:items-end">
          
          {DESKTOP_FOLDERS.map((folder) => {
            const isSelected = selectedFolderId === folder.id;
            const isRecycleBin = folder.id === "recycle-bin";

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
                    <MacTrashIcon className="w-11 h-11" />
                  ) : (
                    <MacFolderIcon className="w-12 h-10" />
                  )}

                  {/* Micro badge indicator */}
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-white/95 border border-black/10 text-[8px] font-mono text-zinc-500 shadow-sm">
                    {folder.count}
                  </span>
                </div>

                {/* Folder Label (Turns into Apple Blue Pill on Select / Hover) */}
                <span
                  className={`text-[11px] font-medium text-center leading-tight transition-all duration-150 ${
                    isSelected
                      ? "bg-[#007AFF] text-white px-2 py-0.5 rounded-[4px] shadow-sm font-semibold"
                      : "text-zinc-800 group-hover:bg-[#007AFF]/15 group-hover:text-[#007AFF] px-2 py-0.5 rounded-[4px]"
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
          3. AUTHENTIC SINGLE APPLE MACOS FLOATING DOCK (CENTER BOTTOM)
          Single frosted glass capsule with smooth spring magnification
      ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-30 w-full pb-3 flex justify-center items-center pointer-events-none">
        
        {/* The Single Frosted Glass Dock Container */}
        <div className="pointer-events-auto bg-white/75 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 sm:gap-2 relative">
          
          {DOCK_APPS.map((app, index) => {
            const isHovered = hoveredDockIndex === index;
            const isNeighbor =
              hoveredDockIndex !== null && Math.abs(hoveredDockIndex - index) === 1;
            const scale = isHovered ? 1.38 : isNeighbor ? 1.18 : 1.0;
            const translateY = isHovered ? -8 : isNeighbor ? -3 : 0;

            return (
              <div key={app.id} className="relative flex flex-col items-center">
                
                {/* Active Tooltip Popover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: -42 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute -top-1 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-900/95 text-white text-[10px] font-mono shadow-xl border border-white/10 whitespace-nowrap pointer-events-none z-40"
                    >
                      <span className="font-bold text-white">{app.name}</span>
                      <span className="text-zinc-400 mx-1">•</span>
                      <span className="text-zinc-300">{app.role}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* App Icon Tile */}
                <motion.div
                  onMouseEnter={() => setHoveredDockIndex(index)}
                  onMouseLeave={() => setHoveredDockIndex(null)}
                  onClick={() => {
                    if (app.id === "spotify") {
                      togglePlayMusic();
                    } else if (app.id === "finder") {
                      setQuickLookFolder(DESKTOP_FOLDERS[0]);
                    } else {
                      showToast(`Launched ${app.name} — ${app.role}`);
                    }
                  }}
                  animate={{ scale, y: translateY }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl cursor-pointer select-none active:scale-90 transition-transform"
                >
                  {app.icon}
                </motion.div>

                {/* macOS Open App Active Dot Indicator */}
                <div className="h-1 flex items-center justify-center mt-0.5">
                  {app.isOpen && (
                    <span className="w-1 h-1 rounded-full bg-zinc-800" />
                  )}
                </div>
              </div>
            );
          })}

          {/* Vertical Divider */}
          <div className="w-[1px] h-7 bg-zinc-300/80 mx-0.5 sm:mx-1" />

          {/* Dock Trash Can Item */}
          <div className="relative flex flex-col items-center">
            {hoveredDockIndex === 99 && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-900/95 text-white text-[10px] font-mono shadow-xl border border-white/10 whitespace-nowrap pointer-events-none z-40">
                <span className="font-bold">Trash</span>
                <span className="text-zinc-400 mx-1">•</span>
                <span className="text-zinc-300">Clean scrap paper</span>
              </div>
            )}
            <motion.div
              onMouseEnter={() => setHoveredDockIndex(99)}
              onMouseLeave={() => setHoveredDockIndex(null)}
              onClick={handleRecycleDrop}
              animate={{
                scale: hoveredDockIndex === 99 ? 1.35 : 1.0,
                y: hoveredDockIndex === 99 ? -8 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer select-none active:scale-90"
              title="Recycle scrap paper"
            >
              <MacTrashIcon className="w-8 h-8" />
            </motion.div>
            <div className="h-1" />
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
          5. TOAST ALERTS (Recycle & Launch Feedback)
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {recycledToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 text-white backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2 text-xs font-mono"
          >
            <Trash2 className="w-4 h-4 text-emerald-400" />
            <span>Sticky note recycled into trash! Workspace cleaned.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {actionToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 text-white backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2 text-xs font-mono"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>{actionToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
