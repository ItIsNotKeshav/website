"use client";

import * as React from "react";
import {
  Menu,
  Zap,
  Layers,
  Cpu,
  Check,
  X,
  Mail,
  Users,
  Monitor,
  ImageIcon,
} from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ButtonBrutalist } from "@/components/ui/button-brutalist";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
 * COLOR PALETTE (Warm Peach):
 *   Background:    Warm Peach     #FFF4ED
 *   Cards:         Cream White    #FFF9F6
 *   Text primary:  Navy           #1E2A3B
 *   Text muted:    Slate Blue     #526070
 *   Primary:       Charcoal       #232629
 *   Borders:       Peach Mist     #F2D9CE
 *   Accent:        Blush          #E8D0C3
 *   Dark surface:  Charcoal       #232629
 *
 * Typography: Lora (serif display) + DM Sans (body sans)
 */

const NAV_ITEMS = [
  { title: "Features", href: "#features-v10" },
  { title: "About", href: "#about-v10" },
  { title: "Early Access", href: "#early-access-v10" },
  { title: "Contact", href: "#contact-v10" },
  { title: "Help & Docs", href: "/help", external: true },
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

function WaitlistCard() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const LAUNCH_DATE = new Date("2026-04-01T00:00:00").getTime();

  const calcTimeLeft = () => {
    const now = Date.now();
    const diff = Math.max(0, LAUNCH_DATE - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);

    try {
      // 1. Check if email already exists
      const { data: existing } = await supabase
        .from("waitlist")
        .select("id")
        .eq("email", email.toLowerCase().trim())
        .maybeSingle();

      if (existing) {
        toast.info("You're already on the waitlist!", {
          description: "We'll notify you as soon as we launch.",
        });
        setIsLoading(false);
        return;
      }

      // 2. Insert email into Supabase "waitlist" table
      const { error: insertError } = await supabase.from("waitlist").insert({
        email: email.toLowerCase().trim(),
        signed_up_at: new Date().toISOString(),
        source: "landing_page",
      });

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        toast.error("Something went wrong", {
          description: "Please try again in a moment.",
        });
        setIsLoading(false);
        return;
      }

      // 3. Call Edge Function to send welcome email
      try {
        await supabase.functions.invoke("send-welcome-email", {
          body: { email: email.toLowerCase().trim() },
        });
      } catch (emailErr) {
        // Don't block success — email sending is best-effort
        console.warn("Welcome email failed (non-blocking):", emailErr);
      }

      // 4. Show success
      setIsSubmitted(true);
      toast.success("You're on the list! 🎉", {
        description: "Check your inbox for a welcome email from us.",
      });
    } catch (err) {
      console.error("Waitlist submission error:", err);
      toast.error("Connection error", {
        description: "Please check your internet and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Glow behind card */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#E8C8B7]/25 to-[#F2D9CE]/20 blur-2xl scale-110 -z-10" />

      <div className="relative backdrop-blur-xl bg-[#FFF9F6]/50 border-2 border-[#F2D9CE]/60 rounded-[2rem] p-10 md:p-14 w-full max-w-[580px] mx-auto shadow-2xl shadow-[#1E2A3B]/5">
        {/* Inner gradient overlay */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FFF4ED]/80 to-transparent pointer-events-none" />

        <div className="relative z-10">
          {!isSubmitted ? (
            <>
              <div className="mb-10 text-center">
                <h2
                  className="text-4xl md:text-5xl text-[#232629] mb-5 tracking-wide font-bold"
                  style={{ fontFamily: "'Geist Pixel Square', 'Lora', serif" }}
                >
                  Join the waitlist
                </h2>
                <p className="text-[#526070] text-lg md:text-xl leading-relaxed font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Get early access to Prmpt — the intelligent<br />
                  AI prompt assistant built for modern creators
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="flex-1 bg-[#FFF9F6]/70 border-2 border-[#F2D9CE] text-[#1E2A3B] placeholder:text-[#526070]/40 focus:border-[#232629]/50 focus:ring-2 focus:ring-[#232629]/10 focus:outline-none h-14 px-5 rounded-xl backdrop-blur-sm text-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="h-14 px-8 bg-[#1E2A3B] hover:bg-[#232629] text-white font-bold cursor-pointer rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Joining...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </form>

              {/* Countdown */}
              <div className="flex items-center justify-center gap-6 text-center">
                {[
                  { value: timeLeft.days, label: "DAYS" },
                  { value: timeLeft.hours, label: "HOURS" },
                  { value: timeLeft.minutes, label: "MINUTES" },
                  { value: timeLeft.seconds, label: "SECONDS" },
                ].map((item, i) => (
                  <React.Fragment key={item.label}>
                    {i > 0 && <div className="text-[#F2D9CE] text-xl font-light">|</div>}
                    <div>
                      <div className="text-3xl md:text-4xl font-semibold text-[#1E2A3B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {item.value}
                      </div>
                      <div className="text-[11px] text-[#526070] uppercase tracking-widest mt-1 font-semibold">
                        {item.label}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center border-2 border-emerald-300 shadow-lg shadow-emerald-100">
                <Check className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E2A3B] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                You're on the list! 🎉
              </h3>
              <p className="text-[#526070] text-base leading-relaxed mb-2">
                We've sent a welcome email to your inbox.
              </p>
              <p className="text-[#526070] text-sm">
                Keep an eye out — early access invites are coming soon.
              </p>
            </motion.div>
          )}
        </div>

        {/* Top shine */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-white/10 to-white/20 pointer-events-none" />
      </div>
    </div>
  );
}

export default function Version10() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  /* ── Smooth scroll handler ── */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
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

        html { scroll-behavior: smooth; scroll-padding-top: 100px; }
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
        className="min-h-screen relative overflow-x-hidden selection:bg-[#232629]/12 selection:text-[#1E2A3B]"
        style={{
          backgroundColor: "#FFF4ED",
          color: "#1E2A3B",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ━━━━━━━ HERO ANIMATED BLOBS ━━━━━━━ */}
        {/* ━━━━━━━━━━━ NAVBAR — Logo left, pill center, CTA right ━━━━━━━━━━━ */}
        <div className="fixed top-0 left-0 right-0 z-50">
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between px-8 lg:px-12 py-6">
            {/* Left — Logo outside pill */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-3"
            >
              <img src="/logos/dark-logo-svg.svg" alt="Prmpt logo" className="h-10 w-auto" />
            </a>

            {/* Center — Pill with nav links only */}
            <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#FFF9F6]/85 backdrop-blur-md border border-[#F2D9CE]/60 rounded-full px-3 py-2 shadow-lg shadow-[#1E2A3B]/5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={item.external ? undefined : (e) => handleNavClick(e, item.href)}
                  className="text-base font-semibold text-[#1E2A3B]/80 hover:text-[#1E2A3B] px-6 py-2.5 rounded-full transition-colors hover:bg-[#FFF4ED]/80"
                >
                  {item.title}
                </a>
              ))}
            </nav>

            {/* Right — CTA outside pill */}
            <ButtonBrutalist
              variant="default"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(e as any, "#waitlist-v10");
              }}
              className="text-base font-bold"
            >
              <Mail className="w-5 h-5" />
              Join waitlist
            </ButtonBrutalist>
          </div>

          {/* Mobile */}
          <div className="md:hidden px-5 py-5">
            <div className="flex items-center justify-between">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="flex items-center gap-2.5">
                <img src="/logos/dark-logo-svg.svg" alt="Prmpt logo" className="h-9 w-auto" />
              </a>
              <button
                className="text-[#526070] p-2 bg-[#FFF9F6]/85 backdrop-blur-md border border-[#F2D9CE]/60 rounded-full shadow-sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="mt-3 bg-[#FFF9F6]/90 backdrop-blur-md border border-[#F2D9CE]/60 rounded-2xl px-4 py-3 shadow-xl shadow-[#1E2A3B]/5"
              >
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    onClick={item.external ? undefined : (e) => handleNavClick(e, item.href)}
                    className="block py-3 text-base font-semibold text-[#1E2A3B]/80 hover:text-[#1E2A3B] border-b border-[#F2D9CE]/40 last:border-0 transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
                <div className="mt-3">
                  <ButtonBrutalist
                    variant="default"
                    size="lg"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(e as any, "#waitlist-v10");
                    }}
                    className="w-full text-base font-bold"
                  >
                    <Mail className="w-5 h-5" />
                    Join waitlist
                  </ButtonBrutalist>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <main className="relative z-10 pt-24">
          {/* ━━━━━━━━━━━ HERO ━━━━━━━━━━━ */}
          <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 md:px-10 py-32 overflow-hidden">

            {/* Animated aurora blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute -top-[5%] right-[-5%] w-[550px] h-[550px] md:w-[700px] md:h-[700px] rounded-full blur-[60px] md:blur-[80px]"
                style={{
                  background: "radial-gradient(circle, rgba(240,147,51,0.30) 0%, rgba(232,208,195,0.18) 40%, transparent 70%)",
                  animation: "hero-blob-1 18s ease-in-out infinite",
                }}
              />
              <div
                className="absolute top-[10%] -left-[8%] w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full blur-[60px] md:blur-[80px]"
                style={{
                  background: "radial-gradient(circle, rgba(232,200,183,0.40) 0%, rgba(240,147,51,0.12) 40%, transparent 70%)",
                  animation: "hero-blob-2 22s ease-in-out infinite",
                }}
              />
              <div
                className="absolute -bottom-[5%] left-[20%] w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full blur-[60px] md:blur-[70px]"
                style={{
                  background: "radial-gradient(circle, rgba(242,217,206,0.45) 0%, rgba(232,200,183,0.15) 40%, transparent 65%)",
                  animation: "hero-blob-3 15s ease-in-out infinite",
                }}
              />
              <div
                className="absolute top-[20%] left-[30%] w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full blur-[50px]"
                style={{
                  background: "radial-gradient(circle, rgba(240,147,51,0.18) 0%, rgba(232,208,195,0.10) 40%, transparent 60%)",
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
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-[-0.02em] mb-8 text-[#232629]"
                style={{ fontFamily: "'Geist Pixel Square', 'Lora', serif", fontWeight: 500 }}
              >
                Your AI is only as smart as your prompt
              </h1>

              <p className="text-lg md:text-xl text-[#526070] max-w-2xl mx-auto leading-relaxed mb-3">
                Optimize, refine, and manage prompts across all AI tools—without breaking your flow.
              </p>
              <p className="text-lg md:text-xl text-[#1E2A3B]/70 font-semibold mb-10">
                Stop guessing prompts. Start engineering them.
              </p>

              {/* Dual CTA buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <a
                  href="#waitlist-v10"
                  onClick={(e) => handleNavClick(e, "#waitlist-v10")}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E2A3B] text-white text-base font-semibold rounded-lg hover:bg-[#232629] transition-colors shadow-md"
                >
                  <Mail className="w-5 h-5" /> Join the waitlist
                </a>
                <a
                  href="#about-v10"
                  onClick={(e) => handleNavClick(e, "#about-v10")}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#F2D9CE] text-[#1E2A3B] text-base font-semibold rounded-lg hover:bg-[#E8C8B7] transition-colors"
                >
                  <Users className="w-4 h-4" /> Join our community
                </a>
              </div>

              <p className="text-sm text-[#526070]/50">
                Coming soon for Windows and macOS
              </p>
            </motion.div>
          </section>

          {/* ━━━━━━━━━━━ FEATURES — Grid Layout ━━━━━━━━━━━ */}
          <section id="features-v10" className="py-20 border-t border-[#F2D9CE]" ref={ref}>
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              {/* Header */}
              <div className="mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7 }}
                  className="text-3xl md:text-4xl lg:text-5xl text-[#232629] mb-4"
                  style={{ fontFamily: "'Geist Pixel Square', 'Lora', serif", fontWeight: 500 }}
                >
                  Engineered to perfection
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-lg text-[#526070] max-w-xl"
                >
                  Every feature is purposefully crafted to enhance your productivity
                  and streamline your digital experience.
                </motion.p>
              </div>

              {/* Grid of feature cards — 3 per row, last row centered */}
              <div className="flex flex-wrap justify-center gap-8">
                {FEATURES.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + index * 0.1, duration: 0.6 }}
                    className="group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] lg:max-w-[400px]"
                  >
                    {/* Text */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-[#1E2A3B] mb-3"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {feature.title}
                      </h3>
                      <p className="text-base text-[#526070] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Screenshot placeholder — bigger aspect ratio */}
                    <div className="w-full aspect-[16/11] bg-[#1E2A3B] rounded-xl overflow-hidden flex items-center justify-center relative group-hover:shadow-xl group-hover:shadow-[#1E2A3B]/10 transition-shadow duration-500">
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
                            <feature.icon className="w-10 h-10 text-[#232629]/30" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ━━━━━━━━━━━ ABOUT ━━━━━━━━━━━ */}
          <section id="about-v10" className="py-20 border-t border-[#F2D9CE]">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <h2
                className="text-3xl md:text-4xl text-[#232629] mb-8"
                style={{ fontFamily: "'Geist Pixel Square', 'Lora', serif", fontWeight: 500 }}
              >
                About us
              </h2>

              <div className="max-w-4xl space-y-6">
                <p className="text-lg md:text-xl text-[#1E2A3B] leading-[1.8] font-medium">
                  Everyone's running.<br />
                  Same race. Same finish line.<br />
                  Another dollar. Another day.
                </p>
                <p className="text-lg md:text-xl text-[#1E2A3B] leading-[1.8] font-semibold">
                  We stepped off the track.
                </p>
                <p className="text-lg md:text-xl text-[#1E2A3B]/70 leading-[1.8]">
                  Idea after idea—nothing stuck.<br />
                  Nothing meant anything.<br />
                  Until one project stopped being just a project…<br />
                  and became a vision.<br />
                  Something that made us feel alive again.
                </p>
                <p className="text-lg md:text-xl text-[#1E2A3B] leading-[1.8] font-medium">
                  That's how we got here.<br />
                  Not by following the crowd—<br />
                  but by building something we actually give a damn about.
                </p>
                <p className="text-xl md:text-2xl text-[#232629] leading-[1.8] font-bold mt-8">
                  Welcome to Prmpt.
                </p>
                <p className="text-base md:text-lg text-[#526070] leading-[1.8] italic">
                  Brought to you by Aarush and Prabhat
                </p>
              </div>
            </div>
          </section>

          {/* ━━━━━━━━━━━ BETA INVITE / EARLY ACCESS ━━━━━━━━━━━ */}
          <section id="early-access-v10" className="relative py-28 md:py-36 border-t border-[#F2D9CE] overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[100px]"
                style={{ background: "radial-gradient(circle, rgba(240,147,51,0.08) 0%, transparent 65%)" }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-w-2xl mx-auto px-6 md:px-10"
            >
              <div className="relative backdrop-blur-xl bg-[#FFF9F6]/60 border border-[#F2D9CE]/60 rounded-[2rem] p-10 md:p-14 shadow-xl shadow-[#1E2A3B]/5 text-center">
                {/* Inner gradient overlay */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FFF4ED]/70 via-white/30 to-[#FFF4ED]/40 pointer-events-none" />

                <div className="relative z-10">
                  <h2
                    className="text-3xl md:text-4xl lg:text-5xl text-[#232629] mb-6 font-bold leading-tight"
                    style={{ fontFamily: "'Geist Pixel Square', 'Lora', serif" }}
                  >
                    Help Shape What We're Building
                  </h2>

                  <div className="space-y-4 mb-10">
                    <p className="text-lg md:text-xl text-[#526070] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Your feedback means everything to us.<br />
                      If you'd like early access and want to help shape the product, we'd love to hear from you.
                    </p>
                    <p className="text-lg md:text-xl text-[#1E2A3B]/70 leading-relaxed font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Be among the first to test it, break it, and tell us what actually matters.
                    </p>
                  </div>

                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=tryprmpt@gmail.com&su=${encodeURIComponent("Early Access Request for Prmpt Beta")}&body=${encodeURIComponent("Hello,\n\nI'd love to request early access to the Prmpt beta.\nI'm interested in exploring the product, testing its features, and sharing feedback to help improve the experience before public launch.\n\nLooking forward to hearing from you.\n\nBest regards.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-10 py-4 text-lg font-bold text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#232629]/25 hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg, #232629 0%, #1E2A3B 50%, #232629 100%)",
                      backgroundSize: "200% 200%",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <Mail className="w-5 h-5 transition-transform group-hover:rotate-[-8deg]" />
                    Request Early Access
                  </a>
                </div>

                {/* Top shine */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-transparent via-white/5 to-white/20 pointer-events-none" />
              </div>
            </motion.div>
          </section>

          {/* ━━━━━━━━━━━ WAITLIST CTA ━━━━━━━━━━━ */}
          <section
            id="waitlist-v10"
            className="relative py-28 md:py-36 border-t border-[#F2D9CE] overflow-hidden"
          >
            {/* Ambient background blobs for this section */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute top-[10%] left-[15%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full blur-[80px]"
                style={{ background: "radial-gradient(circle, rgba(240,147,51,0.10) 0%, transparent 70%)" }}
              />
              <div
                className="absolute bottom-[5%] right-[10%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full blur-[80px]"
                style={{ background: "radial-gradient(circle, rgba(232,200,183,0.12) 0%, transparent 70%)" }}
              />
            </div>

            <div className="relative z-10 px-6 md:px-10 flex items-center justify-center">
              <WaitlistCard />
            </div>
          </section>

          {/* ━━━━━━━━━━━ FOOTER ━━━━━━━━━━━ */}
          <footer id="contact-v10" style={{ backgroundColor: "#232629" }}>
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 gap-12 items-start">
              {/* Left — Contact info */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <img src="/logos/dark-logo-svg.svg" alt="Prmpt logo" className="h-8 w-auto brightness-0 invert" />
                  <span className="text-xl text-white font-semibold"
                    style={{ fontFamily: "'Lora', serif" }}>
                    Prmpt
                  </span>
                </div>

                <div className="space-y-1 text-base text-white/40 mb-8">
                  <p>tryprmpt@gmail.com</p>
                  <p>Made by developers, for developers.</p>
                </div>

                <p className="text-base text-white font-semibold mb-3">Follow for updates</p>
                <div className="space-y-2 text-base text-white/40">
                  <a href="#" className="block hover:text-[#F2D9CE] transition-colors">
                    💬 Join our discord server
                  </a>
                  <a href="https://x.com/TryPrmpt" target="_blank" rel="noopener noreferrer" className="block hover:text-[#F2D9CE] transition-colors">
                    𝕏 @TryPrmpt
                  </a>
                  <a href="https://www.instagram.com/tryprmpt/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#F2D9CE] transition-colors">
                    📷 @tryprmpt
                  </a>
                </div>
              </div>

              {/* Right — Decorative hero card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#E8C8B7]/20 to-[#F2D9CE]/10 border border-white/5 p-10 flex items-end min-h-[280px]">
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
