"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  CloudSun,
  Folder,
  Trash2,
  Wifi,
  Battery,
  Sparkles,
  RefreshCw,
  X,
  ExternalLink,
  Volume2,
} from "lucide-react";
import PaperCrumple from "./PaperCrumple";

// ─────────────────────────────────────────────────────────────
// Creative Tools Stack Definition for Bottom Dock
// ─────────────────────────────────────────────────────────────
interface DockApp {
  id: string;
  name: string;
  role: string;
  color: string;
  badge: string;
  iconSvg: React.ReactNode;
}

const DOCK_APPS: DockApp[] = [
  {
    id: "figma",
    name: "Figma",
    role: "5+ Yrs • Daily Driver & Systems Architect",
    color: "#F24E1E",
    badge: "5+ Yrs",
    iconSvg: (
      <svg viewBox="0 0 38 57" className="w-6 h-6">
        <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
        <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
        <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
        <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
        <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
      </svg>
    ),
  },
  {
    id: "photoshop",
    name: "Photoshop",
    role: "7+ Yrs • Master of Pixels & Manipulation",
    color: "#31A8FF",
    badge: "7+ Yrs",
    iconSvg: (
      <div className="w-7 h-7 rounded-lg bg-[#001E36] border border-[#31A8FF]/60 flex items-center justify-center font-black text-[#31A8FF] text-[13px] tracking-tighter">
        Ps
      </div>
    ),
  },
  {
    id: "illustrator",
    name: "Illustrator",
    role: "6+ Yrs • Vector Craft & Brand Identity",
    color: "#FF9A00",
    badge: "6+ Yrs",
    iconSvg: (
      <div className="w-7 h-7 rounded-lg bg-[#330000] border border-[#FF9A00]/60 flex items-center justify-center font-black text-[#FF9A00] text-[13px] tracking-tighter">
        Ai
      </div>
    ),
  },
  {
    id: "aftereffects",
    name: "After Effects",
    role: "3+ Yrs • Kinetic Motion & UI Transitions",
    color: "#9999FF",
    badge: "3+ Yrs",
    iconSvg: (
      <div className="w-7 h-7 rounded-lg bg-[#00005B] border border-[#9999FF]/60 flex items-center justify-center font-black text-[#9999FF] text-[13px] tracking-tighter">
        Ae
      </div>
    ),
  },
  {
    id: "antigravity",
    name: "Antigravity AI",
    role: "Frontier Vibe Coding & Agentic Dev",
    color: "#8B5CF6",
    badge: "AI Agent",
    iconSvg: (
      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-900 via-indigo-900 to-sky-900 border border-purple-400/60 flex items-center justify-center text-purple-200">
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>
    ),
  },
  {
    id: "nextjs",
    name: "Next.js & React",
    role: "Production-Grade Interactive Frontends",
    color: "#000000",
    badge: "Frontend",
    iconSvg: (
      <div className="w-7 h-7 rounded-lg bg-black border border-white/20 flex items-center justify-center font-black text-white text-[12px]">
        N
      </div>
    ),
  },
  {
    id: "blender",
    name: "Blender & 3D",
    role: "3D Spatial Dimensions & Lighting",
    color: "#EA7600",
    badge: "3D Motion",
    iconSvg: (
      <div className="w-7 h-7 rounded-lg bg-[#222222] border border-[#EA7600]/60 flex items-center justify-center font-bold text-[#EA7600] text-[11px]">
        3D
      </div>
    ),
  },
];

// ─────────────────────────────────────────────────────────────
// Desktop Folders Data
// ─────────────────────────────────────────────────────────────
interface FolderItem {
  id: string;
  name: string;
  tag: string;
  count: string;
  description: string;
  items: string[];
}

const DESKTOP_FOLDERS: FolderItem[] = [
  {
    id: "design-systems",
    name: "01_Design_Systems",
    tag: "Figma Tokens",
    count: "14 Projects",
    description: "Production UI component libraries, scalable tokens, and dark/light mode themes built at Webnox.",
    items: ["Spiderverse Design Kit", "Modular Bento Architecture", "Neo-SaaS Component Library", "Mobile Micro-Interactions"],
  },
  {
    id: "webnox-vault",
    name: "02_Webnox_Vault",
    tag: "Lead Case Studies",
    count: "28 Sprints",
    description: "End-to-end design leadership: wireframes, user testing, high-fidelity prototypes, and design handoffs.",
    items: ["Enterprise Analytics Dashboard", "Fintech Mobile Onboarding", "Brand Identity Guidelines", "E-Commerce Experience"],
  },
  {
    id: "vibe-lab",
    name: "03_Vibe_Lab",
    tag: "AI & 3D Motion",
    count: "42 Experiments",
    description: "Explorations at the frontier of creative technology — Three.js physics, GSAP kinetic scroll, and AI agents.",
    items: ["3D Paper Crumple Solver", "Fluid Spider-Sense Canvas", "Kinetic Typography Engine", "Autonomous Prompt Agents"],
  },
];

export const WorkspaceDesktopSection: React.FC = () => {
  // Live Clock & System Time
  const [currentTime, setCurrentTime] = useState<string>("8:20:00 PM");
  const [currentDate, setCurrentDate] = useState<string>("Tue, Nov 3");
  const [analogTime, setAnalogTime] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 8,
    minutes: 20,
    seconds: 0,
  });

  // Music Widget State with Real Audio Controller
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Folder Preview Modal State
  const [activeFolderModal, setActiveFolderModal] = useState<FolderItem | null>(null);

  // Paper Crumple Reset Key & Trash Alert
  const [paperResetKey, setPaperResetKey] = useState<number>(0);
  const [paperState, setPaperState] = useState<string>("flat");
  const [showTrashToast, setShowTrashToast] = useState<boolean>(false);

  // Dock Hovered Item
  const [hoveredDockIndex, setHoveredDockIndex] = useState<number | null>(null);

  // Audio Lifecycle Effect for Sunflower (/assets/spiderman.mp3)
  useEffect(() => {
    const audio = new Audio("/assets/spiderman.mp3");
    audio.loop = true;
    audio.volume = 0.65;
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlay = () => setIsPlayingMusic(true);
    const onPause = () => setIsPlayingMusic(false);
    const onEnded = () => setIsPlayingMusic(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("[WorkspaceDesktop] Audio playback error:", err);
      });
    }
  };

  // Live Timer Effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
      setAnalogTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Crumple / Trash
  const handleCrumpleIntoBin = () => {
    setPaperResetKey((prev) => prev + 1);
    setShowTrashToast(true);
    setTimeout(() => setShowTrashToast(false), 3500);
  };

  return (
    <section
      id="workspace-desktop-section"
      className="relative w-full min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-between select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TOP SYSTEM MENU BAR (macOS / Spider-OS Bar)
      ───────────────────────────────────────────────────────────── */}
      <header className="relative z-30 w-full max-w-[1240px] mx-auto mb-6 sm:mb-8">
        <div className="w-full bg-white/85 backdrop-blur-xl border border-black/[0.08] rounded-2xl px-4 sm:px-6 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.04)] flex items-center justify-between text-xs font-mono text-zinc-700">
          {/* Left Brand Identifier */}
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-lg bg-black text-white font-bold flex items-center justify-center text-[10px] tracking-tight shadow-sm">
              G
            </span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-900 font-sora">GaneshOS</span>
              <span className="text-[10px] text-zinc-400">v2.6</span>
              <span className="hidden sm:inline-block text-zinc-300">•</span>
              <span className="hidden sm:inline-block text-zinc-500">Team Lead @ Webnox</span>
            </div>
          </div>

          {/* Right System Indicators */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Flow State Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[10px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>In the Flow State</span>
            </div>

            {/* Date & Time */}
            <div className="hidden sm:flex items-center gap-2 font-medium text-zinc-800">
              <span>{currentDate}</span>
              <span className="text-zinc-300">•</span>
              <span>{currentTime}</span>
            </div>

            {/* Hardware Status */}
            <div className="flex items-center gap-2 text-zinc-500">
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-1">
                <Battery className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px]">100%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN DESKTOP ENVIRONMENT STAGE
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
        
        {/* ──────── COLUMN A: LEFT WIDGET CLUSTER (Cols 1-4) ──────── */}
        <div className="lg:col-span-4 flex flex-col gap-4 w-full">
          
          {/* Row 1: Analog Clock & Calendar Mini-Bento */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            
            {/* Analog Clock Widget */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3.5 border border-black/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.05)] flex flex-col items-center justify-between aspect-square">
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                COIMBATORE
              </span>

              {/* Minimal Dial Face */}
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full border border-zinc-200 flex items-center justify-center shadow-inner">
                {/* 12, 3, 6, 9 Ticks */}
                <div className="absolute top-1 w-0.5 h-1.5 bg-zinc-300" />
                <div className="absolute bottom-1 w-0.5 h-1.5 bg-zinc-300" />
                <div className="absolute left-1 w-1.5 h-0.5 bg-zinc-300" />
                <div className="absolute right-1 w-1.5 h-0.5 bg-zinc-300" />

                {/* Hour Hand */}
                <div
                  className="absolute w-1 h-5 sm:h-6 bg-zinc-800 rounded-full origin-bottom"
                  style={{
                    transform: `rotate(${analogTime.hours * 30 + analogTime.minutes * 0.5}deg) translateY(-50%)`,
                  }}
                />

                {/* Minute Hand */}
                <div
                  className="absolute w-0.5 h-7 sm:h-8 bg-zinc-600 rounded-full origin-bottom"
                  style={{
                    transform: `rotate(${analogTime.minutes * 6}deg) translateY(-50%)`,
                  }}
                />

                {/* Second Hand (Spider-Red) */}
                <div
                  className="absolute w-[1.5px] h-8 sm:h-9 bg-red-500 rounded-full origin-bottom"
                  style={{
                    transform: `rotate(${analogTime.seconds * 6}deg) translateY(-50%)`,
                  }}
                />

                {/* Center Pin */}
                <div className="w-2 h-2 rounded-full bg-red-600 border border-white z-10" />
              </div>

              <span className="text-[10px] font-mono text-zinc-500">
                {analogTime.hours > 12 ? analogTime.hours - 12 : analogTime.hours}:
                {analogTime.minutes < 10 ? `0${analogTime.minutes}` : analogTime.minutes} PM
              </span>
            </div>

            {/* Calendar Widget */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3.5 border border-black/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.05)] flex flex-col justify-between aspect-square">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-red-500 font-semibold tracking-wider">
                  NOVEMBER
                </span>
                <span className="text-xl font-sora font-extrabold text-zinc-900">
                  {new Date().getDate()}
                </span>
              </div>

              {/* Mini Calendar Dot Matrix */}
              <div className="grid grid-cols-7 gap-1 text-[8px] font-mono text-center text-zinc-400 py-1">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                {[...Array(30)].map((_, i) => {
                  const day = i + 1;
                  const isToday = day === new Date().getDate();
                  return (
                    <span
                      key={day}
                      className={`h-3.5 flex items-center justify-center rounded-full ${
                        isToday ? "bg-red-500 text-white font-bold" : "text-zinc-600"
                      }`}
                    >
                      {day}
                    </span>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Row 2: Spider-Verse Music Player Widget */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 border border-black/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3.5">
              {/* Album Art */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-red-600 via-amber-500 to-indigo-600 overflow-hidden shadow-sm shrink-0 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-black/40 border border-white/20 flex items-center justify-center">
                  <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
                </div>
              </div>

              {/* Track Metadata */}
              <div className="flex-1 min-w-0">
                <h4 className="font-sora text-xs font-semibold text-zinc-900 truncate">
                  Sunflower
                </h4>
                <p className="text-[10px] font-mono text-zinc-500 truncate">
                  Post Malone, Swae Lee • Spider-Verse
                </p>

                {/* Animated Audio Frequency Bars */}
                <div className="flex items-center gap-0.5 mt-2 h-2.5">
                  {[40, 90, 60, 100, 75, 45, 85, 55, 95, 30].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full ${
                        isPlayingMusic ? "bg-red-500 animate-pulse" : "bg-zinc-300"
                      }`}
                      style={{
                        height: isPlayingMusic ? `${h}%` : "30%",
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Play/Pause Toggle with Real Audio Controller */}
              <button
                type="button"
                onClick={toggleMusic}
                className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-red-600 text-white flex items-center justify-center shadow-md transition-colors shrink-0 cursor-pointer active:scale-95"
                aria-label={isPlayingMusic ? "Pause Sunflower" : "Play Sunflower"}
                title={isPlayingMusic ? "Pause Sunflower" : "Play Sunflower"}
              >
                {isPlayingMusic ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Row 3: Live Weather & Desk Polaroid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            
            {/* Weather Widget */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 border border-black/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.05)] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shrink-0">
                <CloudSun className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-sora font-bold text-zinc-900">28°C</div>
                <div className="text-[9px] font-mono text-zinc-400 truncate">Flow Weather</div>
              </div>
            </div>

            {/* Desk Workspace Memory */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-2.5 border border-black/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.05)] flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-black shrink-0 relative">
                <img
                  src="/assets/concepts/about_me_spiderverse_ui_1793291690442.jpg"
                  alt="Workspace Rig"
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-sora font-semibold text-zinc-900 truncate">Workspace</div>
                <div className="text-[9px] font-mono text-emerald-600">Dual Monitors</div>
              </div>
            </div>

          </div>

        </div>

        {/* ──────── COLUMN B: CENTER HERO TYPOGRAPHY & 3D PAPER CRUMPLE (Cols 5-9) ──────── */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center px-2 py-2">
          
          {/* Option 4 Benchmark Copy */}
          <div className="mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-500 font-semibold mb-1 block">
              WORKSPACE HEADQUARTERS
            </span>

            <h2 className="font-sora font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0a0a0a] tracking-tight leading-tight">
              This is where I live.
            </h2>

            <h3 className="font-sora text-base sm:text-lg font-bold text-zinc-700 mt-1 tracking-tight">
              From rough drafts to ship-ready interfaces.
            </h3>

            <p className="max-w-md mx-auto text-zinc-500 text-xs sm:text-sm font-normal leading-relaxed mt-1.5">
              A transparent look at my daily setup — the software, shortcuts, and creative clutter behind every product I design.
            </p>
          </div>

          {/* ─────────────────────────────────────────────────────────
              REACT BITS <PaperCrumple /> 3D INTERACTIVE STICKY NOTE
          ───────────────────────────────────────────────────────── */}
          <div className="relative w-full max-w-[280px] sm:max-w-[300px] flex flex-col items-center">
            
            {/* Interactive 3D Paper Component */}
            <div className="relative w-full rounded-2xl overflow-visible">
              <PaperCrumple
                src="/assets/sticky_note.png"
                alt="Ganesh's Daily Manifesto Note"
                width={260}
                height={325}
                sceneHeight={335}
                releaseBehavior="creased"
                crumpleAmount={0.85}
                crumpleDuration={0.55}
                releaseDuration={0.4}
                foldCount={5}
                foldSharpness={0.65}
                wrinkleDepth={0.7}
                creaseStrength={0.25}
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
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                {paperState === "holding"
                  ? "Crushing note..."
                  : paperState === "creased"
                  ? "Creased & Unfolded"
                  : "Hold & drag to crumple"}
              </span>

              {/* Reset Sticky Note Pill */}
              <button
                type="button"
                onClick={() => setPaperResetKey((prev) => prev + 1)}
                className="flex items-center gap-1 text-[10px] font-mono text-red-500 hover:text-red-600 bg-red-50 border border-red-200/60 px-2 py-0.5 rounded-full transition-colors cursor-pointer"
                title="Reset note to flat"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

        </div>

        {/* ──────── COLUMN C: RIGHT SYSTEM FOLDERS (Cols 10-12) ──────── */}
        <div className="lg:col-span-3 flex lg:flex-col flex-wrap gap-3 sm:gap-4 justify-center lg:items-end w-full">
          
          {DESKTOP_FOLDERS.map((folder) => (
            <div
              key={folder.id}
              onClick={() => setActiveFolderModal(folder)}
              className="group cursor-pointer flex items-center gap-3 p-3 bg-white/85 hover:bg-white backdrop-blur-xl border border-black/[0.08] hover:border-black/[0.18] rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 w-full max-w-[260px]"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform shrink-0">
                <Folder className="w-5 h-5 fill-blue-500/20" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-sora text-xs font-semibold text-zinc-900 truncate group-hover:text-blue-600 transition-colors">
                  {folder.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] font-mono text-zinc-400">{folder.count}</span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-[9px] font-mono text-blue-600 font-medium">{folder.tag}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Interactive Recycle Bin / Trash Folder */}
          <div
            onClick={handleCrumpleIntoBin}
            className="group cursor-pointer flex items-center gap-3 p-3 bg-white/85 hover:bg-red-50/50 backdrop-blur-xl border border-black/[0.08] hover:border-red-300 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.04)] transition-all duration-300 w-full max-w-[260px]"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-100 group-hover:bg-red-100/70 border border-zinc-200/60 group-hover:border-red-300 flex items-center justify-center text-zinc-500 group-hover:text-red-500 transition-colors shrink-0">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-sora text-xs font-semibold text-zinc-800 group-hover:text-red-600 transition-colors">
                Recycle_Bin
              </h4>
              <p className="text-[9px] font-mono text-zinc-400 truncate">
                Click to clear scrap notes
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM CREATIVE TOOLS DOCK (macOS Magnification Effect)
      ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-30 w-full max-w-[1240px] mx-auto mt-8 sm:mt-12 mb-6 sm:mb-8 flex justify-center">
        <div className="relative bg-white/85 backdrop-blur-2xl border border-black/10 rounded-3xl p-2.5 sm:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-2 sm:gap-3.5">
          
          {DOCK_APPS.map((app, index) => {
            // macOS Magnification curve calculation
            const isHovered = hoveredDockIndex === index;
            const isNeighbor =
              hoveredDockIndex !== null && Math.abs(hoveredDockIndex - index) === 1;

            const scale = isHovered ? 1.35 : isNeighbor ? 1.15 : 1.0;

            return (
              <div
                key={app.id}
                onMouseEnter={() => setHoveredDockIndex(index)}
                onMouseLeave={() => setHoveredDockIndex(null)}
                className="relative group cursor-pointer"
              >
                {/* Active Tooltip Popover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: -48, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-[11px] font-mono shadow-xl border border-white/10 whitespace-nowrap pointer-events-none z-50 flex items-center gap-1.5"
                    >
                      <span className="font-bold text-white">{app.name}</span>
                      <span className="text-zinc-400">—</span>
                      <span className="text-zinc-300">{app.role}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dock Icon Tile with Dynamic Magnification Scale */}
                <motion.div
                  animate={{ scale }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-black/[0.08] shadow-[0_8px_16px_rgba(0,0,0,0.06)] flex items-center justify-center p-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow"
                >
                  {app.iconSvg}
                </motion.div>

                {/* Dot Indicator below active tools */}
                <div className="w-1 h-1 rounded-full bg-zinc-400 mx-auto mt-1 opacity-70" />
              </div>
            );
          })}

        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          4. FOLDER "QUICK LOOK" MODAL (macOS Spacebar Preview)
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeFolderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveFolderModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-black/10 select-text"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500">
                    <Folder className="w-5 h-5 fill-blue-500/20" />
                  </div>
                  <div>
                    <h3 className="font-sora text-base font-bold text-zinc-900">
                      {activeFolderModal.name}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400">
                      {activeFolderModal.count} • {activeFolderModal.tag}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveFolderModal(null)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="py-4 text-sm text-zinc-600 font-sans leading-relaxed">
                {activeFolderModal.description}
              </p>

              {/* Items List */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Enclosed Files & Deliverables
                </span>
                {activeFolderModal.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/60 text-xs font-mono text-zinc-800"
                  >
                    <span>{item}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => setActiveFolderModal(null)}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-sora font-semibold text-xs transition-colors"
              >
                Close Preview (Esc)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          5. TRASH NOTIFICATION TOAST
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showTrashToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-zinc-900 text-white text-xs font-mono shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>Sticky note cleared & refreshed!</span>
            <button
              onClick={() => setPaperResetKey((prev) => prev + 1)}
              className="text-red-400 underline font-semibold ml-1"
            >
              Undo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
