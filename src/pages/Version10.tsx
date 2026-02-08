"use client";

import * as React from "react";
import {
  ArrowRight,
  ArrowLeft,
  Menu,
  Globe,
  Zap,
  Keyboard,
  Layers,
  Cpu,
  Check,
  X,
  Leaf,
  Mail,
  Users,
  Monitor,
  ImageIcon,
} from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useState, useRef } from "react";

/*
 * VERSION 10 — raeai.app-inspired layout + V9 blue organic theme
 *
 * LAYOUT (from raeai.app):
 *   1. Clean navbar — logo left, links right, CTA button
 *   2. Hero — centered, big italic serif headline, subtitle, dual CTA buttons,
 *      concentric circle arc decorations in background
 *   3. Features — left-aligned header, horizontal scrollable cards with
 *      screenshot placeholders and arrow navigation
 *   4. About — full-width text block, story-driven copy
 *   5. Waitlist CTA — centered, concentric circles bg, email input
 *   6. Footer — dark bg, split: contact info left, decorative card right
 *
 * COLOR PALETTE (V10/V9 hybrid):
 *   Background:    Stone White    #F5F5F0
 *   Cards:         Pure White     #FFFFFF
 *   Text primary:  Graphite       #1A1A1A
 *   Text muted:    Slate          #71717A
 *   Accent:        Electric Blue  #2563EB
 *   Accent dark:   Deep Blue      #1D4ED8
 *   Borders:       Mist           #E5E5E0
 *   Dark surface:  Charcoal       #111116
 *
 * Typography: Lora (serif display) + DM Sans (body sans)
 */

const NAV_ITEMS = [
  { title: "Features", href: "#features-v10" },
  { title: "About", href: "#about-v10" },
  { title: "Contact", href: "#contact-v10" },
];

const FEATURES = [
  {
    title: "Real-Time Prompt Optimization",
    description:
      "Refines your prompts instantly as you write, transforming rough ideas into clear, high-impact instructions without interrupting your workflow.",
    icon: Zap,
  },
  {
    title: "Persistent Prompt Library",
    description:
      "Save, organize, and revisit your best prompts in structured collections, ensuring your most effective ideas are always within reach.",
    icon: Layers,
  },
  {
    title: "Seamless Overlay Access",
    description:
      "Optimize text from anywhere on your system with a single shortcut—no tab switching, no friction, just instant improvement.",
    icon: Monitor,
  },
  {
    title: "Personalized AI Guidance",
    description:
      "Adapts to your writing style and preferences over time, delivering consistently tailored prompt enhancements for every task.",
    icon: Cpu,
  },
  {
    title: "Smart Image Optimization",
    description:
      "Transform any uploaded image into a polished, high-end visual using advanced AI enhancement, detail correction, and intelligent refinement.",
    icon: ImageIcon,
  },
];

function WaitlistInput({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => { setStatus("success"); setEmail(""); }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className={`flex items-center gap-3 p-2.5 rounded-2xl border-2 shadow-lg transition-all ${
        dark
          ? "bg-[#1a1a22] border-[#2a2a32] shadow-black/20"
          : "bg-white border-[#E5E5E0] shadow-[#1A1A1A]/5 focus-within:border-[#2563EB]/40 focus-within:shadow-[#2563EB]/10"
      }`}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status !== "idle"}
          className={`flex-1 px-5 py-4 text-lg bg-transparent focus:outline-none ${
            dark
              ? "text-white placeholder:text-white/25"
              : "text-[#1A1A1A] placeholder:text-[#71717A]/35"
          }`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        <button
          type="submit"
          disabled={status !== "idle"}
          className="flex items-center gap-2.5 px-8 py-4 bg-[#1A1A1A] text-white text-base font-bold rounded-xl hover:bg-[#2563EB] transition-colors disabled:opacity-40 shadow-md"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {status === "success" ? (
            <><Check className="w-5 h-5" /> Done</>
          ) : status === "loading" ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <><Users className="w-5 h-5" /> Let's go</>
          )}
        </button>
      </div>
    </form>
  );
}

export default function Version10() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  const scrollFeatures = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

        @font-face {
          font-family: 'Geist Pixel Square';
          src: url('/fonts/geist-pixel/GeistPixel-Square.woff2') format('woff2');
          font-weight: 500;
          font-display: swap;
        }
        @font-face {
          font-family: 'Geist Pixel Grid';
          src: url('/fonts/geist-pixel/GeistPixel-Grid.woff2') format('woff2');
          font-weight: 500;
          font-display: swap;
        }
        @font-face {
          font-family: 'Geist Pixel Circle';
          src: url('/fonts/geist-pixel/GeistPixel-Circle.woff2') format('woff2');
          font-weight: 500;
          font-display: swap;
        }
        @font-face {
          font-family: 'Geist Pixel Triangle';
          src: url('/fonts/geist-pixel/GeistPixel-Triangle.woff2') format('woff2');
          font-weight: 500;
          font-display: swap;
        }
        @font-face {
          font-family: 'Geist Pixel Line';
          src: url('/fonts/geist-pixel/GeistPixel-Line.woff2') format('woff2');
          font-weight: 500;
          font-display: swap;
        }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes hero-blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(80px, -50px) scale(1.15) rotate(5deg); }
          50% { transform: translate(-30px, 60px) scale(0.9) rotate(-3deg); }
          75% { transform: translate(50px, 30px) scale(1.08) rotate(2deg); }
        }
        @keyframes hero-blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(-70px, 40px) scale(1.1) rotate(-4deg); }
          50% { transform: translate(50px, -70px) scale(0.95) rotate(6deg); }
          75% { transform: translate(-40px, -20px) scale(1.12) rotate(-2deg); }
        }
        @keyframes hero-blob-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, 50px) scale(1.1); }
          66% { transform: translate(-50px, -40px) scale(0.92); }
        }
        @keyframes hero-shimmer {
          0% { opacity: 0.04; }
          50% { opacity: 0.08; }
          100% { opacity: 0.04; }
        }
      `}</style>

      <div
        className="min-h-screen relative overflow-x-hidden selection:bg-[#2563EB]/12 selection:text-[#1A1A1A]"
        style={{
          backgroundColor: "#F5F5F0",
          color: "#1A1A1A",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ━━━━━━━━━━━ HEADER ━━━━━━━━━━━ */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#F5F5F0]/90 backdrop-blur-xl border-b border-[#E5E5E0]/60">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex h-20 items-center justify-between">
            {/* Left — Logo */}
            <a href="#" className="flex items-center gap-2.5">
              <Leaf className="w-6 h-6 text-[#2563EB]" />
              <span className="text-2xl font-bold text-[#1A1A1A]"
                style={{ fontFamily: "'Geist Pixel Square', 'Lora', serif" }}>
                Prmpt
              </span>
            </a>

            {/* Center — Nav links */}
            <nav className="hidden md:flex items-center gap-10">
              {NAV_ITEMS.map((item) => (
                <a key={item.title} href={item.href}
                  className="text-lg font-semibold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors">
                  {item.title}
                </a>
              ))}
            </nav>

            {/* Right — CTA */}
            <div className="flex items-center gap-3">
              <a href="#waitlist-v10"
                className="hidden md:inline-flex items-center gap-2.5 text-base font-bold px-7 py-3 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#2563EB] transition-colors border border-[#1A1A1A] hover:border-[#2563EB] shadow-sm">
                <Mail className="w-5 h-5" /> Join waitlist
              </a>
              <button className="md:hidden text-[#71717A]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="md:hidden bg-white border-b border-[#E5E5E0] px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <a key={item.title} href={item.href}
                  className="block py-3 text-base font-medium text-[#71717A] hover:text-[#1A1A1A] border-b border-[#E5E5E0] last:border-0">
                  {item.title}
                </a>
              ))}
            </motion.div>
          )}
        </header>

        <main className="relative z-10 pt-20">
          {/* ━━━━━━━━━━━ HERO ━━━━━━━━━━━ */}
          <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 md:px-10 py-32 overflow-hidden">

            {/* Animated aurora blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Primary blue blob — large, top-right drift */}
              <div
                className="absolute -top-[5%] right-[-5%] w-[550px] h-[550px] md:w-[700px] md:h-[700px] rounded-full blur-[60px] md:blur-[80px]"
                style={{
                  background: "radial-gradient(circle, rgba(37,99,235,0.55) 0%, rgba(37,99,235,0.2) 40%, transparent 70%)",
                  animation: "hero-blob-1 18s ease-in-out infinite",
                }}
              />
              {/* Secondary blue blob — left, mid-page */}
              <div
                className="absolute top-[10%] -left-[8%] w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full blur-[60px] md:blur-[80px]"
                style={{
                  background: "radial-gradient(circle, rgba(96,165,250,0.45) 0%, rgba(37,99,235,0.15) 40%, transparent 70%)",
                  animation: "hero-blob-2 22s ease-in-out infinite",
                }}
              />
              {/* Accent blob — bottom center */}
              <div
                className="absolute -bottom-[5%] left-[20%] w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full blur-[60px] md:blur-[70px]"
                style={{
                  background: "radial-gradient(circle, rgba(147,180,240,0.4) 0%, rgba(96,165,250,0.12) 40%, transparent 65%)",
                  animation: "hero-blob-3 15s ease-in-out infinite",
                }}
              />
              {/* Shimmer pulse — center breathing glow */}
              <div
                className="absolute top-[20%] left-[30%] w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full blur-[50px]"
                style={{
                  background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, rgba(96,165,250,0.1) 40%, transparent 60%)",
                  animation: "hero-shimmer 6s ease-in-out infinite",
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-w-4xl mx-auto"
            >
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-[-0.02em] mb-8 text-[#2563EB]"
                style={{ fontFamily: "'Geist Pixel Square', 'Lora', serif", fontWeight: 500 }}
              >
                Your AI is only as smart as your prompt
              </h1>

              <p className="text-lg md:text-xl text-[#71717A] max-w-2xl mx-auto leading-relaxed mb-3">
                Optimize, refine, and manage prompts across all AI tools—without breaking your flow.
              </p>
              <p className="text-lg md:text-xl text-[#1A1A1A]/70 font-semibold mb-10">
                Stop guessing prompts. Start engineering them.
              </p>

              {/* Dual CTA buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <a
                  href="#waitlist-v10"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white text-base font-semibold rounded-lg hover:bg-[#2563EB] transition-colors shadow-md"
                >
                  <Mail className="w-5 h-5" /> Join the waitlist
                </a>
                <a
                  href="#about-v10"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#E5E5E0] text-[#1A1A1A] text-base font-semibold rounded-lg hover:bg-[#d5d5d0] transition-colors"
                >
                  <Users className="w-4 h-4" /> Join our community
                </a>
              </div>

              <p className="text-sm text-[#71717A]/50">
                Coming soon for Windows and macOS
              </p>
            </motion.div>
          </section>

          {/* ━━━━━━━━━━━ FEATURES — Horizontal scroll ━━━━━━━━━━━ */}
          <section id="features-v10" className="py-20 border-t border-[#E5E5E0]" ref={ref}>
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              {/* Header row */}
              <div className="flex items-start justify-between mb-10">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-3xl md:text-4xl lg:text-5xl text-[#2563EB] mb-4"
                    style={{ fontFamily: "'Geist Pixel Square', 'Lora', serif", fontWeight: 500 }}
                  >
                    Engineered to perfection
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-lg text-[#71717A] max-w-xl"
                  >
                    Every feature is purposefully crafted to enhance your productivity
                    and streamline your digital experience.
                  </motion.p>
                </div>

                {/* Navigation arrows */}
                <div className="hidden md:flex items-center gap-2 pt-2">
                  <button
                    onClick={() => scrollFeatures("left")}
                    className="w-10 h-10 rounded-lg border border-[#E5E5E0] flex items-center justify-center text-[#71717A] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollFeatures("right")}
                    className="w-10 h-10 rounded-lg border border-[#E5E5E0] flex items-center justify-center text-[#71717A] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable feature cards */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto hide-scrollbar px-6 md:px-10 pb-4"
            >
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + index * 0.1, duration: 0.6 }}
                  className="group flex-shrink-0 w-[380px] md:w-[420px]"
                >
                  {/* Text */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {feature.title}
                    </h3>
                    <p className="text-base text-[#71717A] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Screenshot placeholder */}
                  <div className="w-full aspect-[4/3] bg-[#1A1A1A] rounded-xl overflow-hidden flex items-center justify-center relative group-hover:shadow-xl group-hover:shadow-[#1A1A1A]/10 transition-shadow duration-500">
                    {/* Simulated UI */}
                    <div className="absolute inset-4 rounded-lg border border-white/5 bg-white/[0.03] flex flex-col">
                      {/* Title bar */}
                      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
                        <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                        <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                        <div className="flex-1" />
                        <div className="w-16 h-1.5 bg-white/10 rounded-full" />
                      </div>
                      {/* Content area */}
                      <div className="flex-1 p-4 flex flex-col gap-2">
                        <div className="w-2/3 h-2 bg-white/10 rounded-full" />
                        <div className="w-full h-2 bg-white/5 rounded-full" />
                        <div className="w-4/5 h-2 bg-white/5 rounded-full" />
                        <div className="flex-1" />
                        <div className="self-center">
                          <feature.icon className="w-8 h-8 text-[#2563EB]/30" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ━━━━━━━━━━━ ABOUT ━━━━━━━━━━━ */}
          <section id="about-v10" className="py-20 border-t border-[#E5E5E0]">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <h2
                className="text-3xl md:text-4xl text-[#2563EB] mb-8"
                style={{ fontFamily: "'Geist Pixel Square', 'Lora', serif", fontWeight: 500 }}
              >
                About us
              </h2>

              <div className="max-w-4xl space-y-6">
                <p className="text-lg md:text-xl text-[#1A1A1A] leading-[1.8] font-medium">
                  Tired of seeing creators search endlessly for the right tools, we gathered
                  everything into a single, seamless experience—delivered exactly when you need it.
                </p>
                <p className="text-lg md:text-xl text-[#1A1A1A]/60 leading-[1.8]">
                  The idea began while building a product of our own. When we couldn't find
                  tools that worked fast enough or well enough, we decided to create them ourselves.
                </p>
                <p className="text-lg md:text-xl text-[#1A1A1A] leading-[1.8] font-medium">
                  Built by developers who live the grind, Prmpt is the assistant we always
                  wanted by our side.
                </p>
              </div>
            </div>
          </section>

          {/* ━━━━━━━━━━━ WAITLIST CTA ━━━━━━━━━━━ */}
          <section
            id="waitlist-v10"
            className="relative py-32 border-t border-[#E5E5E0] overflow-hidden"
          >
            <div className="relative z-10 max-w-2xl mx-auto text-center px-6 md:px-10">
              <h2
                className="text-3xl md:text-5xl text-[#2563EB] mb-4"
                style={{ fontFamily: "'Geist Pixel Square', 'Lora', serif", fontWeight: 500 }}
              >
                Get notified when we launch
              </h2>
              <WaitlistInput />
            </div>
          </section>

          {/* ━━━━━━━━━━━ FOOTER ━━━━━━━━━━━ */}
          <footer id="contact-v10" style={{ backgroundColor: "#111116" }}>
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 gap-12 items-start">
              {/* Left — Contact info */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Leaf className="w-5 h-5 text-[#2563EB]" />
                  <span className="text-xl text-white font-semibold"
                    style={{ fontFamily: "'Lora', serif" }}>
                    Prmpt
                  </span>
                </div>

                <div className="space-y-1 text-base text-white/40 mb-8">
                  <p>teamprmpt@gmail.com</p>
                  <p>Made by developers, for developers.</p>
                </div>

                <p className="text-base text-white font-semibold mb-3">Follow for updates</p>
                <div className="space-y-2 text-base text-white/40">
                  <a href="#" className="block hover:text-[#2563EB] transition-colors">
                    💬 Join our discord server
                  </a>
                  <a href="#" className="block hover:text-[#2563EB] transition-colors">
                    𝕏 @thisisPrompt
                  </a>
                  <a href="#" className="block hover:text-[#2563EB] transition-colors">
                    📷 @prompt.dev
                  </a>
                </div>
              </div>

              {/* Right — Decorative hero card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2563EB]/20 to-[#1D4ED8]/10 border border-white/5 p-10 flex items-end min-h-[280px]">
                <h3
                  className="relative z-10 text-3xl md:text-4xl text-white/90 leading-tight"
                  style={{ fontFamily: "'Lora', serif", fontWeight: 400 }}
                >
                  The only assistant you'll ever need
                </h3>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/5">
              <div className="max-w-7xl mx-auto px-6 md:px-10 py-5">
                <p className="text-xs text-white/20">
                  Copyright ©2026 Prompt. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
