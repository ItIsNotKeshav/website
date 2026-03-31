"use client";

import * as React from "react";
import { useState, useRef, useCallback } from "react";
import {
  Menu,
  X,
  Zap,
  Layers,
  Monitor,
  Cpu,
  ImageIcon,
  Mail,
  Send,
  User,
  Play,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const NAV_ITEMS = [
  { title: "FEATURES", href: "#features-v11" },
  { title: "ABOUT", href: "#about-v11" },
  { title: "CONTACT", href: "#contact-v11" },
  { title: "HELP & DOCS", href: "/help", external: true },
  { title: "JOIN WAITLIST", href: "#early-access-v11" },
];

const FEATURES = [
  {
    title: "Real-Time Prompt Optimization",
    description:
      "Refines your prompts instantly as you write, transforming rough ideas into clear, high-impact instructions.",
    icon: Zap,
    rotate: "-1.5deg",
    video: null as string | null, // Replace with video URL, e.g. "/videos/feature-1.mp4"
  },
  {
    title: "Persistent Prompt Library",
    description:
      "Save, organize, and revisit your best prompts in structured collections you can access anytime.",
    icon: Layers,
    rotate: "2deg",
    video: null as string | null,
  },
  {
    title: "Seamless Overlay Access",
    description:
      "Optimize text from anywhere on your system with a single shortcut — no tab switching, no friction.",
    icon: Monitor,
    rotate: "-2.5deg",
    video: null as string | null,
  },
  {
    title: "Personalized AI Guidance",
    description:
      "Adapts to your writing style and preferences over time, delivering tailored enhancements for every task.",
    icon: Cpu,
    rotate: "1.8deg",
    video: null as string | null,
  },
  {
    title: "Smart Image Optimization",
    description:
      "Transform uploaded images using AI-powered enhancement — sharper, cleaner, ready for any context.",
    icon: ImageIcon,
    rotate: "-1deg",
    video: null as string | null,
  },
];

function StampLabel({
  children,
  rotate = "0deg",
  className = "",
}: {
  children: React.ReactNode;
  rotate?: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        border: "3px solid #232629",
        padding: "4px 14px",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: "0.62rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        transform: `rotate(${rotate})`,
        color: "#232629",
        background: "#FFF4ED",
        position: "relative",
      }}
    >
      {children}
    </span>
  );
}

function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Version11() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [featureIdx, setFeatureIdx] = useState(0);

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isLoading) return;

    if (!email.trim() || !isValidEmail(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
        }),
      });

      const data = await res.json();

      if (res.status === 429) {
        toast.error("Too many attempts", {
          description: "Please wait a moment before trying again.",
        });
        return;
      }

      if (!res.ok) {
        toast.error("Something went wrong", {
          description: data.error || "Please try again in a moment.",
        });
        return;
      }

      if (data.already_registered) {
        toast.info("You're already on the waitlist!", {
          description: "We'll notify you as soon as we launch.",
        });
        return;
      }

      setSubmittedName(name.trim());
      setSubmitted(true);
      setName("");
      setEmail("");
    } catch (err) {
      console.error("Waitlist submission error:", err);
      toast.error("Connection error", {
        description: "Please check your internet and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileOpen(false);
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@400;500;700&display=swap');
        html { scroll-behavior: smooth; scroll-padding-top: 70px; }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-shadow {
          0%, 100% { box-shadow: 8px 8px 0px #232629; }
          50% { box-shadow: 6px 6px 0px #232629; }
        }
      `}</style>

      <div
        style={{
          background: "#FFF4ED",
          color: "#1E2A3B",
          fontFamily: "'DM Sans', sans-serif",
          minHeight: "100vh",
          position: "relative",
          overflowX: "clip",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage:
              "linear-gradient(#F2D9CE 1px, transparent 1px), linear-gradient(90deg, #F2D9CE 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.45,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ═══════ NAVBAR ═══════ */}
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "#FFF4ED",
            borderBottom: "5px solid #232629",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 24px",
            }}
          >
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img src="/logos/dark-logo-svg.svg" alt="Prmpt logo" style={{ height: 42 }} />
            </a>

            {/* Desktop links */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
              }}
              className="hidden md:flex"
            >
              {NAV_ITEMS.map((item, idx) => {
                const isLast = idx === NAV_ITEMS.length - 1;
                const isWaitlist = item.href === "#early-access-v11";
                return (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    onClick={item.external ? undefined : (e) => scrollTo(e, item.href)}
                    whileHover={isWaitlist
                      ? { backgroundColor: "#D63232", borderColor: "#D63232" }
                      : { backgroundColor: "#232629", color: "#FFF4ED" }
                    }
                    transition={{ duration: 0.15 }}
                    style={{
                      padding: isWaitlist ? "9px 20px" : "9px 16px",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: isWaitlist ? "#FFF4ED" : "#1E2A3B",
                      background: isWaitlist ? "#232629" : "transparent",
                      textDecoration: "none",
                      borderRight: isLast ? "none" : "3px solid #232629",
                      border: isWaitlist ? "3px solid #232629" : undefined,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {isWaitlist ? `${item.title} →` : item.title}
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "none",
                border: "3px solid #232629",
                padding: 8,
                cursor: "pointer",
                color: "#232629",
              }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden"
                style={{
                  borderTop: "3px solid #232629",
                  background: "#FFF4ED",
                }}
              >
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    onClick={item.external ? () => setMobileOpen(false) : (e) => scrollTo(e, item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    style={{
                      display: "block",
                      padding: "14px 24px",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#1E2A3B",
                      textDecoration: "none",
                      borderBottom: "3px solid #232629",
                    }}
                  >
                    → {item.title}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* ═══════ HERO ═══════ */}
        <section
          style={{
            position: "relative",
            zIndex: 1,
            padding: "100px 24px 80px",
            maxWidth: 1280,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 8vw, 7rem)",
              lineHeight: 0.95,
              textTransform: "uppercase",
              color: "#1E2A3B",
              marginBottom: 16,
              position: "relative",
            }}
          >
            YOUR AI IS{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              ONLY
              <span
                style={{
                  position: "absolute",
                  left: "-4%",
                  right: "-4%",
                  top: "55%",
                  height: 6,
                  background: "#D63232",
                  transform: "rotate(-1deg)",
                }}
              />
            </span>{" "}
            AS SMART AS YOUR{" "}
            <span
              style={{
                fontStyle: "italic",
                background: "#232629",
                color: "#FFF4ED",
                padding: "0 16px",
                display: "inline-block",
                transform: "rotate(-1deg)",
              }}
            >
              PROMPT
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
              color: "#526070",
              maxWidth: 580,
              margin: "20px auto 12px",
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Optimize, refine, and manage prompts across all AI tools — without breaking your flow.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.78rem, 1.3vw, 0.9rem)",
              color: "#1E2A3B",
              fontWeight: 700,
              marginBottom: 32,
              letterSpacing: "0.05em",
            }}
          >
            Stop guessing prompts. Start engineering them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", gap: 0, justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.a
              href="#early-access-v11"
              onClick={(e) => scrollTo(e, "#early-access-v11")}
              whileHover={{ backgroundColor: "#D63232", borderColor: "#D63232" }}
              transition={{ duration: 0.15 }}
              style={{
                padding: "13px 30px",
                background: "#232629",
                color: "#FFF4ED",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "4px solid #232629",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              JOIN THE WAITLIST →
            </motion.a>
            <motion.a
              href="#features-v11"
              onClick={(e) => scrollTo(e, "#features-v11")}
              whileHover={{ backgroundColor: "#232629", color: "#FFF4ED" }}
              transition={{ duration: 0.15 }}
              style={{
                padding: "13px 30px",
                background: "#FFF4ED",
                color: "#232629",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "4px solid #232629",
                borderLeft: "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              SEE FEATURES
            </motion.a>
          </motion.div>
        </section>

        {/* ═══════ MARQUEE DIVIDER ═══════ */}
        <div
          style={{
            borderTop: "5px solid #232629",
            borderBottom: "5px solid #232629",
            overflow: "hidden",
            padding: "12px 0",
            background: "#232629",
            color: "#FFF4ED",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              animation: "marquee-scroll 20s linear infinite",
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {Array(8)
              .fill(null)
              .map((_, i) => (
                <span key={i} style={{ paddingRight: 48 }}>
                  ✦ OPTIMIZE ✦ REFINE ✦ MANAGE ✦ PROMPT ✦ REPEAT ◆
                </span>
              ))}
          </div>
        </div>

        {/* ═══════ FEATURES ═══════ */}
        <section
          id="features-v11"
          style={{
            position: "relative",
            zIndex: 1,
            padding: "80px 24px",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          <SectionReveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
              <div>
                <StampLabel rotate="-2deg">◆ CORE FEATURES ◆</StampLabel>
                <h2
                  style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    marginTop: 16,
                    color: "#1E2A3B",
                  }}
                >
                  WHAT PRMPT DOES
                </h2>
              </div>

              {/* Nav buttons */}
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setFeatureIdx((p) => Math.max(0, p - 1))}
                  disabled={featureIdx === 0}
                  style={{
                    width: 48,
                    height: 48,
                    border: "3px solid",
                    borderColor: featureIdx === 0 ? "#E8D0C3" : "#232629",
                    background: featureIdx === 0 ? "#FFF4ED" : "#FFF9F6",
                    cursor: featureIdx === 0 ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s",
                  }}
                >
                  <ArrowLeft size={20} color={featureIdx === 0 ? "#E8D0C3" : "#232629"} strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setFeatureIdx((p) => Math.min(FEATURES.length - 1, p + 1))}
                  disabled={featureIdx === FEATURES.length - 1}
                  style={{
                    width: 48,
                    height: 48,
                    border: "3px solid",
                    borderColor: featureIdx === FEATURES.length - 1 ? "#E8D0C3" : "#D63232",
                    background: featureIdx === FEATURES.length - 1 ? "#FFF4ED" : "#FFF9F6",
                    cursor: featureIdx === FEATURES.length - 1 ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s",
                  }}
                >
                  <ArrowRight size={20} color={featureIdx === FEATURES.length - 1 ? "#E8D0C3" : "#D63232"} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </SectionReveal>

          {/* Feature Card */}
          <AnimatePresence mode="wait">
            {FEATURES.map((f, i) =>
              i === featureIdx ? (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: 40,
                      background: "#FFF9F6",
                      border: "4px solid #232629",
                      boxShadow: "8px 8px 0px #232629",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    className="md:!grid-cols-2"
                  >
                    {/* Left — Info */}
                    <div style={{ padding: "40px 36px" }}>
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          border: "3px solid #232629",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 20,
                          background: i % 2 === 0 ? "#E8D0C3" : "#FFF4ED",
                        }}
                      >
                        <f.icon size={24} strokeWidth={2.5} color="#232629" />
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Lora', serif",
                          fontWeight: 700,
                          fontSize: "1.4rem",
                          textTransform: "uppercase",
                          marginBottom: 12,
                          color: "#1E2A3B",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {f.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.9rem",
                          color: "#526070",
                          lineHeight: 1.65,
                          maxWidth: 440,
                        }}
                      >
                        {f.description}
                      </p>

                      {/* Progress indicator */}
                      <div style={{ display: "flex", gap: 6, marginTop: 32 }}>
                        {FEATURES.map((_, j) => (
                          <button
                            key={j}
                            onClick={() => setFeatureIdx(j)}
                            style={{
                              width: j === featureIdx ? 32 : 10,
                              height: 10,
                              border: "2px solid #232629",
                              background: j === featureIdx ? "#232629" : "transparent",
                              cursor: "pointer",
                              padding: 0,
                              transition: "all 0.2s",
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right — Video placeholder */}
                    <div
                      style={{
                        background: "#232629",
                        position: "relative",
                        minHeight: 320,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {f.video ? (
                        <video
                          src={f.video}
                          muted
                          loop
                          playsInline
                          autoPlay
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            inset: 0,
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 12,
                            background:
                              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,244,237,0.03) 10px, rgba(255,244,237,0.03) 20px)",
                          }}
                        >
                          <div
                            style={{
                              width: 64,
                              height: 64,
                              border: "3px solid #FFF4ED",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Play size={28} color="#FFF4ED" fill="#FFF4ED" />
                          </div>
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: "#E8D0C3",
                            }}
                          >
                            DEMO COMING SOON
                          </span>
                        </div>
                      )}

                      {/* Stamp number overlay */}
                      <div
                        style={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          background: "#FFF4ED",
                          color: "#232629",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          padding: "4px 12px",
                          fontFamily: "'DM Sans', sans-serif",
                          letterSpacing: "0.1em",
                        }}
                      >
                        0{i + 1} / 0{FEATURES.length}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </section>

        {/* ═══════ ABOUT ═══════ */}
        <section
          id="about-v11"
          style={{
            position: "relative",
            zIndex: 1,
            background: "#232629",
            color: "#FFF4ED",
            borderTop: "5px solid #232629",
            borderBottom: "5px solid #232629",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "80px 24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
            className="!grid-cols-1 md:!grid-cols-2"
          >
            <SectionReveal>
              <StampLabel rotate="-2deg" className="mb-4 inline-block">
                ★ OUR STORY ★
              </StampLabel>
              <h2
                style={{
                  fontFamily: "'Lora', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  textTransform: "uppercase",
                  lineHeight: 1.05,
                  marginTop: 14,
                  marginBottom: 20,
                  color: "#FFF4ED",
                }}
              >
                ABOUT US
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.92rem",
                  lineHeight: 1.8,
                  color: "#E8D0C3",
                  maxWidth: 480,
                }}
              >
                Everyone's running.<br />
                Same race. Same finish line.<br />
                Another dollar. Another day.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  color: "#FFF4ED",
                  fontWeight: 600,
                  marginTop: 16,
                  maxWidth: 480,
                }}
              >
                We stepped off the track.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.92rem",
                  lineHeight: 1.8,
                  color: "#E8D0C3",
                  opacity: 0.8,
                  marginTop: 14,
                  maxWidth: 480,
                }}
              >
                Idea after idea—nothing stuck.<br />
                Nothing meant anything.<br />
                Until one project stopped being just a project…<br />
                and became a vision.<br />
                Something that made us feel alive again.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.92rem",
                  lineHeight: 1.8,
                  color: "#E8D0C3",
                  marginTop: 14,
                  maxWidth: 480,
                }}
              >
                That's how we got here.<br />
                Not by following the crowd—<br />
                but by building something we actually give a damn about.
              </p>
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: "#FFF4ED",
                  fontWeight: 700,
                  marginTop: 22,
                  maxWidth: 480,
                }}
              >
                Welcome to Prmpt.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  color: "#E8D0C3",
                  fontStyle: "italic",
                  marginTop: 10,
                  maxWidth: 480,
                }}
              >
                Brought to you by <strong style={{ color: "#FFF4ED" }}>Aarush</strong> and{" "}
                <strong style={{ color: "#FFF4ED" }}>Prabhat</strong>
              </p>
            </SectionReveal>

            <SectionReveal>
              <div
                style={{
                  border: "5px solid #FFF4ED",
                  padding: 40,
                  transform: "rotate(1.5deg)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -16,
                    left: 24,
                    background: "#D63232",
                    color: "#FFF4ED",
                    padding: "4px 16px",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  MANIFESTO
                </div>
                <blockquote
                  style={{
                    fontFamily: "'Lora', serif",
                    fontStyle: "italic",
                    fontSize: "1.25rem",
                    lineHeight: 1.5,
                    color: "#FFF4ED",
                  }}
                >
                  "Don't just use AI — command it. The gap between a mediocre output and a
                  brilliant one is a single, well-crafted prompt."
                </blockquote>
                <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
                  {["✦", "✦", "✦", "✦", "✦"].map((s, i) => (
                    <span key={i} style={{ color: "#E8D0C3", fontSize: "1.2rem" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* ═══════ EARLY ACCESS / WAITLIST ═══════ */}
        <section
          id="early-access-v11"
          style={{
            position: "relative",
            zIndex: 1,
            padding: "100px 24px",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <SectionReveal>
            <div
              style={{
                border: "5px solid #232629",
                background: "#FFF9F6",
                padding: "56px 40px",
                boxShadow: "12px 12px 0px #232629",
                position: "relative",
              }}
            >
              {/* Decorative torn-edge top */}
              <div
                style={{
                  position: "absolute",
                  top: -3,
                  left: 40,
                  right: 40,
                  height: 6,
                  background:
                    "repeating-linear-gradient(90deg, #FFF4ED 0px, #FFF4ED 8px, transparent 8px, transparent 16px)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ textAlign: "center" }}>
                <StampLabel rotate="2deg">→ JOIN THE WAITLIST ←</StampLabel>
                <h2
                  style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)",
                    textTransform: "uppercase",
                    lineHeight: 1.1,
                    marginTop: 20,
                    marginBottom: 10,
                    color: "#1E2A3B",
                  }}
                >
                  GET ON THE LIST.
                </h2>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#526070",
                    fontSize: "0.9rem",
                    maxWidth: 440,
                    margin: "0 auto 28px",
                    lineHeight: 1.6,
                  }}
                >
                  Join the waitlist for early access to Prmpt. We'll notify you the moment
                  we're ready to ship.
                </p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.9, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        border: "4px solid #232629",
                        background: "#232629",
                        color: "#FFF4ED",
                        padding: "40px 36px",
                        maxWidth: 500,
                        margin: "0 auto",
                        boxShadow: "10px 10px 0px #D63232",
                        position: "relative",
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 15 }}
                        style={{
                          position: "absolute",
                          top: -18,
                          right: 20,
                          background: "#D63232",
                          color: "#FFF4ED",
                          padding: "5px 14px",
                          fontWeight: 700,
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        ✦ CONFIRMED ✦
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        style={{
                          fontFamily: "'Lora', serif",
                          fontSize: "1.6rem",
                          fontWeight: 700,
                          lineHeight: 1.2,
                          marginBottom: 16,
                        }}
                      >
                        Welcome aboard{submittedName ? `, ${submittedName}` : ""}.
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.4 }}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.88rem",
                          lineHeight: 1.7,
                          color: "#E8D0C3",
                          marginBottom: 20,
                        }}
                      >
                        You're officially on the Prmpt waitlist. We'll send you
                        an email the moment we're ready to let you in. Keep an
                        eye on your inbox.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        style={{
                          borderTop: "3px solid #FFF4ED",
                          paddingTop: 16,
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#E8D0C3",
                          }}
                        >
                          WHILE YOU WAIT
                        </p>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <a
                            href="https://x.com/TryPrmpt"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: "8px 16px",
                              border: "2px solid #FFF4ED",
                              color: "#FFF4ED",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              textDecoration: "none",
                              textTransform: "uppercase",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF4ED"; e.currentTarget.style.color = "#232629"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#FFF4ED"; }}
                          >
                            FOLLOW ON X →
                          </a>
                          <a
                            href="https://www.instagram.com/tryprmpt/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: "8px 16px",
                              border: "2px solid #FFF4ED",
                              color: "#FFF4ED",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              textDecoration: "none",
                              textTransform: "uppercase",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF4ED"; e.currentTarget.style.color = "#232629"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#FFF4ED"; }}
                          >
                            INSTAGRAM →
                          </a>
                        </div>
                      </motion.div>

                      <div style={{ display: "flex", gap: 6, marginTop: 20, justifyContent: "flex-end" }}>
                        {["✦", "✦", "✦", "✦", "✦"].map((s, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + i * 0.08, type: "spring", stiffness: 400, damping: 15 }}
                            style={{ color: "#D63232", fontSize: "0.9rem", fontWeight: 700 }}
                          >
                            {s}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        maxWidth: 500,
                        margin: "0 auto",
                        position: "relative",
                        zIndex: 10,
                      }}
                    >
                      {/* Name field */}
                      <div style={{
                        display: "flex",
                        border: "4px solid #232629",
                        marginBottom: 0,
                      }}>
                        <div style={{
                          padding: "12px 14px",
                          background: "#232629",
                          display: "flex",
                          alignItems: "center",
                          flexShrink: 0,
                        }}>
                          <User size={16} color="#FFF4ED" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="YOUR NAME"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          style={{
                            flex: 1,
                            padding: "12px 18px",
                            border: "none",
                            outline: "none",
                            background: "#FFF4ED",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            letterSpacing: "0.08em",
                            color: "#1E2A3B",
                          }}
                        />
                      </div>

                      {/* Email + submit */}
                      <div style={{
                        display: "flex",
                        border: "4px solid #232629",
                        borderTop: "none",
                      }}>
                        <div style={{
                          padding: "12px 14px",
                          background: "#232629",
                          display: "flex",
                          alignItems: "center",
                          flexShrink: 0,
                        }}>
                          <Mail size={16} color="#FFF4ED" />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="YOUR EMAIL ADDRESS"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{
                            flex: 1,
                            padding: "12px 18px",
                            border: "none",
                            outline: "none",
                            background: "#FFF4ED",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            letterSpacing: "0.08em",
                            color: "#1E2A3B",
                          }}
                        />
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          whileHover={isLoading ? {} : { backgroundColor: "#D63232" }}
                          transition={{ duration: 0.15 }}
                          style={{
                            padding: "12px 28px",
                            background: "#232629",
                            color: "#FFF4ED",
                            border: "none",
                            borderLeft: "4px solid #232629",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            cursor: isLoading ? "wait" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            opacity: isLoading ? 0.7 : 1,
                          }}
                        >
                          {isLoading ? "SENDING..." : "SUBMIT"} {!isLoading && <Send size={16} />}
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Corner decorations */}
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: 24,
                  fontFamily: "'Lora', serif",
                  fontWeight: 700,
                  fontSize: "4rem",
                  color: "#F2D9CE",
                  lineHeight: 1,
                  opacity: 0.5,
                  pointerEvents: "none",
                }}
              >
                ◆
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* ═══════ CONTACT / FOOTER ═══════ */}
        <footer
          id="contact-v11"
          style={{
            position: "relative",
            zIndex: 1,
            borderTop: "5px solid #232629",
            background: "#232629",
            color: "#FFF4ED",
          }}
        >
          {/* Contact Hero Banner */}
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "80px 24px 0",
            }}
          >
            <SectionReveal>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 64,
                  paddingBottom: 60,
                  borderBottom: "4px solid #FFF4ED",
                }}
                className="md:!grid-cols-2"
              >
                {/* Left — Big CTA */}
                <div>
                  <StampLabel rotate="-1.5deg" className="mb-6 inline-block">
                    ✦ GET IN TOUCH ✦
                  </StampLabel>
                  <h2
                    style={{
                      fontFamily: "'Lora', serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                      textTransform: "uppercase",
                      lineHeight: 1.05,
                      marginTop: 14,
                      marginBottom: 20,
                    }}
                  >
                    GET IN TOUCH.
                  </h2>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.88rem",
                      lineHeight: 1.7,
                      color: "#E8D0C3",
                      maxWidth: 400,
                    }}
                  >
                    Have a question, feedback, or just want to say hi?
                    We'd love to hear from you. Reach out through any of the
                    channels below.
                  </p>
                </div>

                {/* Right — Contact Cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Email Card */}
                  <motion.a
                    href="mailto:tryprmpt@gmail.com"
                    whileHover={{ x: 6, backgroundColor: "#1E2A3B" }}
                    transition={{ duration: 0.15 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      padding: "20px 24px",
                      border: "3px solid #FFF4ED",
                      textDecoration: "none",
                      color: "#FFF4ED",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        background: "#D63232",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Mail size={22} color="#FFF4ED" />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.62rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#E8D0C3",
                          marginBottom: 3,
                        }}
                      >
                        EMAIL US
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "0.88rem",
                        }}
                      >
                        tryprmpt@gmail.com
                      </div>
                    </div>
                  </motion.a>

                  {/* X / Twitter Card */}
                  <motion.a
                    href="https://x.com/TryPrmpt"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6, backgroundColor: "#1E2A3B" }}
                    transition={{ duration: 0.15 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      padding: "20px 24px",
                      border: "3px solid #FFF4ED",
                      textDecoration: "none",
                      color: "#FFF4ED",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        background: "#FFF4ED",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: "1.3rem", color: "#232629", fontWeight: 700 }}>𝕏</span>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.62rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#E8D0C3",
                          marginBottom: 3,
                        }}
                      >
                        FOLLOW ON X
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "0.88rem",
                        }}
                      >
                        @TryPrmpt
                      </div>
                    </div>
                  </motion.a>

                  {/* Instagram Card */}
                  <motion.a
                    href="https://www.instagram.com/tryprmpt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6, backgroundColor: "#1E2A3B" }}
                    transition={{ duration: 0.15 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      padding: "20px 24px",
                      border: "3px solid #FFF4ED",
                      textDecoration: "none",
                      color: "#FFF4ED",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        background: "#E8D0C3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: "1.3rem" }}>📷</span>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.62rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#E8D0C3",
                          marginBottom: 3,
                        }}
                      >
                        FOLLOW ON INSTAGRAM
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "0.88rem",
                        }}
                      >
                        @tryprmpt
                      </div>
                    </div>
                  </motion.a>

                  {/* Discord Card */}
                  <motion.a
                    href="#"
                    whileHover={{ x: 6, backgroundColor: "#1E2A3B" }}
                    transition={{ duration: 0.15 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      padding: "20px 24px",
                      border: "3px solid #FFF4ED",
                      textDecoration: "none",
                      color: "#FFF4ED",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        background: "#526070",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: "1.3rem" }}>💬</span>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.62rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#E8D0C3",
                          marginBottom: 3,
                        }}
                      >
                        JOIN OUR DISCORD
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "0.88rem",
                        }}
                      >
                        Community Server — Coming Soon
                      </div>
                    </div>
                  </motion.a>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "24px 24px 32px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img
                  src="/logos/dark-logo-svg.svg"
                  alt="Prmpt logo"
                  style={{ height: 22, filter: "brightness(0) invert(1)" }}
                />
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "#E8D0C3",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  © 2026 PRMPT. ALL RIGHTS RESERVED.
                </p>
              </div>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "#526070",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                }}
              >
                MADE BY DEVELOPERS, FOR DEVELOPERS. ◆
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
