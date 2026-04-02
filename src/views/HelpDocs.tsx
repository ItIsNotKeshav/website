"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, Menu, X, ArrowLeft, Search } from "lucide-react";

const TOC = [
  { id: "s1",  label: "What Does Prmpt Actually Do?" },
  { id: "s2",  label: "Getting Started" },
  { id: "s3",  label: "The Overlay Panel" },
  { id: "s4",  label: "Optimization Modes" },
  { id: "s5",  label: "Skills" },
  { id: "s6",  label: "Attach Files or Images" },
  { id: "s7",  label: "Voice Input" },
  { id: "s8",  label: "Chat Context" },
  { id: "s9",  label: "Your Conversation History" },
  { id: "s10", label: "Prompt Library" },
  { id: "s11", label: "Sharing" },
  { id: "s12", label: "App Memory" },
  { id: "s13", label: "Settings" },
  { id: "s14", label: "Sign In & Account" },
  { id: "s15", label: "Keyboard Shortcuts" },
  { id: "s16", label: "Common Questions" },
  { id: "s17", label: "Contact Us" },
];

function SectionHeading({ id, num, children }: { id: string; num: number; children: React.ReactNode }) {
  return (
    <div className="mt-16 mb-6 scroll-mt-28" id={id}>
      <h2
        className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-[#1E2A3B] uppercase tracking-wide"
        style={{ fontFamily: "'Lora', serif" }}
      >
        <span
          className="inline-flex items-center justify-center w-10 h-10 shrink-0 text-sm font-bold text-[#FFF4ED]"
          style={{
            background: "#232629",
            border: "3px solid #232629",
            boxShadow: "3px 3px 0px #E8D0C3",
          }}
        >
          {num}
        </span>
        {children}
      </h2>
      <div className="mt-4" style={{ height: 4, background: "#232629" }} />
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-lg font-bold text-[#1E2A3B] mt-8 mb-3 uppercase tracking-wider"
      style={{ fontFamily: "'Lora', serif" }}
    >
      {children}
    </h3>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 px-5 py-4 my-5 text-[#1E2A3B] text-sm leading-relaxed"
      style={{
        background: "#FFF9F6",
        borderLeft: "5px solid #232629",
        border: "3px solid #232629",
        borderLeftWidth: 6,
      }}
    >
      <span className="shrink-0 mt-0.5 text-[#232629] font-bold">ℹ</span>
      <div>{children}</div>
    </div>
  );
}

function BeforeAfterTable({ rows }: { rows: { before: string; after: string }[] }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
        <tbody>
          {rows.map((r, i) => (
            <React.Fragment key={i}>
              <tr>
                <td
                  className="w-24 align-top px-4 py-3 font-bold whitespace-nowrap"
                  style={{ background: "#FFF4ED", border: "3px solid #232629", color: "#D63232" }}
                >
                  ❌ Before
                </td>
                <td
                  className="px-4 py-3 italic text-[#1E2A3B]/70"
                  style={{ background: "#FFF4ED", border: "3px solid #232629", borderLeft: "none" }}
                >
                  {r.before}
                </td>
              </tr>
              <tr>
                <td
                  className="align-top px-4 py-3 font-bold text-emerald-700 whitespace-nowrap"
                  style={{ background: "#FFF9F6", border: "3px solid #232629", borderTop: "none" }}
                >
                  ✅ After
                </td>
                <td
                  className="px-4 py-3 text-[#1E2A3B]"
                  style={{ background: "#FFF9F6", border: "3px solid #232629", borderLeft: "none", borderTop: "none" }}
                >
                  {r.after}
                </td>
              </tr>
              {i < rows.length - 1 && <tr><td colSpan={2} className="h-4" /></tr>}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-5">
      <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 font-bold"
                style={{
                  background: "#232629",
                  color: "#FFF4ED",
                  border: "3px solid #232629",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-[#1E2A3B]/80 leading-relaxed"
                  style={{
                    background: i % 2 === 0 ? "#FFF9F6" : "#FFF4ED",
                    border: "3px solid #232629",
                  }}
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StepList({ steps }: { steps: React.ReactNode[] }) {
  return (
    <ol className="space-y-2 my-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3 text-[#1E2A3B]/80 text-sm leading-relaxed">
          <span
            className="shrink-0 w-6 h-6 text-xs font-bold flex items-center justify-center mt-0.5"
            style={{
              background: "#232629",
              color: "#FFF4ED",
              border: "2px solid #232629",
            }}
          >
            {i + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-1.5 my-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-[#1E2A3B]/80 text-sm leading-relaxed">
          <span
            className="shrink-0 mt-1 w-2 h-2"
            style={{ background: "#232629" }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Divider() {
  return <div className="my-10" style={{ height: 4, background: "#232629" }} />;
}

function StampLabel({ children, rotate = "0deg" }: { children: React.ReactNode; rotate?: string }) {
  return (
    <span
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
      }}
    >
      {children}
    </span>
  );
}

export default function HelpDocs() {
  const [activeId, setActiveId] = useState("s1");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setSidebarOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredTOC = TOC.filter((t) =>
    t.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarNav = (mobile: boolean) => (
    <>
      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#526070]" />
        <input
          type="text"
          placeholder="Search sections…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm text-[#1E2A3B] placeholder:text-[#526070]/50"
          style={{
            background: "#FFF4ED",
            border: "3px solid #232629",
            outline: "none",
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
      </div>

      {/* Back to site — mobile only */}
      {mobile && (
        <a
          href="/"
          className="flex items-center gap-2 px-3 py-3 mb-4 text-sm font-bold uppercase"
          style={{
            background: "#232629",
            color: "#FFF4ED",
            textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.08em",
            border: "3px solid #232629",
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </a>
      )}

      {/* Contents stamp label */}
      <div className="mb-3 px-1">
        <StampLabel rotate="-1.5deg">◆ CONTENTS ◆</StampLabel>
      </div>

      <nav className="space-y-0">
        {filteredTOC.map((item, i) => {
          const isActive = !mobile && activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-all"
              style={{
                background: isActive ? "#232629" : "transparent",
                color: isActive ? "#FFF4ED" : "#526070",
                fontWeight: isActive ? 700 : 500,
                fontFamily: "'DM Sans', sans-serif",
                borderBottom: "1px solid #F2D9CE",
              }}
            >
              <span
                className="shrink-0 text-[10px] font-bold w-5 h-5 flex items-center justify-center"
                style={{
                  background: isActive ? "#FFF4ED" : "#232629",
                  color: isActive ? "#232629" : "#FFF4ED",
                  border: isActive ? "none" : "2px solid #232629",
                }}
              >
                {i + 1}
              </span>
              <span className="truncate">{item.label}</span>
              {isActive && <ChevronRight className="w-3 h-3 ml-auto shrink-0" />}
            </button>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        html { scroll-behavior: smooth; scroll-padding-top: 100px; }
        code { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
        @media (max-width: 640px) {
          .hd-header-logo { height: 34px !important; }
          .hd-header-title { font-size: 0.8rem !important; padding: 8px 12px !important; }
          .hd-logo-area { padding: 0 12px !important; }
        }
      `}</style>

      <div
        className="min-h-screen"
        style={{ backgroundColor: "#FFF4ED", color: "#1E2A3B", fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Grid background like Version11 */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage:
              "linear-gradient(#F2D9CE 1px, transparent 1px), linear-gradient(90deg, #F2D9CE 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.35,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── TOP BAR ── */}
        <header
          className="sticky top-0 z-50 flex items-center justify-between gap-4"
          style={{
            background: "#FFF4ED",
            borderBottom: "5px solid #232629",
            padding: "0",
          }}
        >
          <div className="flex items-center h-full" style={{ gap: 0 }}>
            {/* Logo area */}
            <div
              className="hd-logo-area flex items-center px-5 self-stretch"
              style={{ background: "#FFF4ED", borderRight: "5px solid #232629" }}
            >
              <img src="/logos/dark-logo-svg.svg" alt="Prmpt" className="hd-header-logo" style={{ height: 42 }} />
            </div>

            {/* Title */}
            <div className="hd-header-title px-5 py-3 flex items-center gap-3" style={{ borderRight: "3px solid #232629" }}>
              <span
                className="text-base font-bold text-[#1E2A3B] uppercase tracking-wider"
                style={{ fontFamily: "'Lora', serif", letterSpacing: "0.1em" }}
              >
                Help & Docs
              </span>
            </div>

            {/* Back to site — hidden on very small screens, shown in mobile sidebar instead */}
            <a
              href="/"
              className="hidden sm:flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase self-stretch"
              style={{
                color: "#1E2A3B",
                textDecoration: "none",
                letterSpacing: "0.1em",
                fontFamily: "'DM Sans', sans-serif",
                borderRight: "3px solid #232629",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#232629"; e.currentTarget.style.color = "#FFF4ED"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1E2A3B"; }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to site
            </a>
          </div>

          {/* Mobile sidebar toggle */}
          <button
            className="md:hidden mr-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "3px solid #232629",
              padding: 8,
              cursor: "pointer",
              color: "#232629",
            }}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        <div className="max-w-7xl mx-auto flex" style={{ position: "relative", zIndex: 1 }}>

          {/* ── SIDEBAR — Desktop ── */}
          <aside
            className="hidden md:block w-64 lg:w-72 shrink-0 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto py-6 px-4"
            style={{
              borderRight: "4px solid #232629",
              background: "#FFF9F6",
            }}
          >
            {sidebarNav(false)}
          </aside>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
              <aside
                className="absolute left-0 top-[73px] bottom-0 w-72 overflow-y-auto py-6 px-4 z-50"
                style={{
                  background: "#FFF9F6",
                  borderRight: "4px solid #232629",
                }}
              >
                {sidebarNav(true)}
              </aside>
            </div>
          )}

          {/* ── MAIN CONTENT ── */}
          <main ref={contentRef} className="flex-1 min-w-0 px-6 md:px-10 lg:px-16 py-12 max-w-4xl">

            {/* Hero */}
            <div className="mb-14">
              <StampLabel rotate="-2deg">◆ DOCUMENTATION ◆</StampLabel>
              <h1
                className="text-4xl md:text-5xl text-[#1E2A3B] mb-5 leading-tight mt-4 uppercase"
                style={{ fontFamily: "'Lora', serif", fontWeight: 700, letterSpacing: "0.04em" }}
              >
                Help &{" "}
                <span
                  style={{
                    background: "#232629",
                    color: "#FFF4ED",
                    padding: "0 12px",
                    display: "inline-block",
                    transform: "rotate(-1deg)",
                  }}
                >
                  Documentation
                </span>
              </h1>
              <p className="text-lg text-[#526070] max-w-2xl leading-relaxed">
                <strong className="text-[#1E2A3B]">Prmpt</strong> turns your rough prompt ideas into clear, detailed, AI-ready prompts — from inside any app on your computer, in seconds.
              </p>
            </div>

            <Divider />

            {/* ── SECTION 1 ── */}
            <SectionHeading id="s1" num={1}>What Does Prmpt Actually Do?</SectionHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-4">
              Most people type a quick, vague idea when asking an AI tool something. The AI gets a vague question and gives a vague answer.
            </p>
            <p className="text-[#1E2A3B] font-semibold mb-5">
              <strong>Prmpt fixes that.</strong> You write your rough idea, Prmpt rewrites it into a well-structured, detailed prompt — and you paste that polished version into ChatGPT, Claude, Midjourney, or anywhere else.
            </p>

            <SubHeading>Before & After Examples</SubHeading>

            <p className="text-xs font-bold uppercase tracking-widest text-[#526070]/60 mb-2">Example 1 — Writing</p>
            <BeforeAfterTable rows={[{
              before: "write a blog post about productivity",
              after: "Write a 600-word blog post for busy professionals titled 'The 3 Habits That Separate Productive People From Everyone Else'. Use a conversational tone, open with a relatable story about feeling overwhelmed, and end with a clear 3-step action plan the reader can start today. Avoid generic advice — make it feel personal and actionable."
            }]} />

            <p className="text-xs font-bold uppercase tracking-widest text-[#526070]/60 mb-2 mt-6">Example 2 — Coding</p>
            <BeforeAfterTable rows={[{
              before: "write python code to read a csv",
              after: "Write a Python function that reads a CSV file from a given file path using the pandas library. The function should: handle missing values by filling them with 0, skip the first row if it's a header, return a cleaned DataFrame, and raise a clear error message if the file is not found. Include a usage example at the bottom."
            }]} />

            <p className="text-xs font-bold uppercase tracking-widest text-[#526070]/60 mb-2 mt-6">Example 3 — Image Generation</p>
            <BeforeAfterTable rows={[{
              before: "a city at night",
              after: "A futuristic Tokyo street at night, heavy rain, neon signs reflecting in puddles, cinematic lighting, a lone figure in a hooded jacket walking away from camera, shot on 35mm film, shallow depth of field, moody atmosphere, cyberpunk aesthetic — ultra-detailed, 8K"
            }]} />

            <p className="text-[#1E2A3B] font-semibold mt-6">That's the difference Prmpt makes every single time.</p>

            <Divider />

            {/* ── SECTION 2 ── */}
            <SectionHeading id="s2" num={2}>Getting Started</SectionHeading>

            <SubHeading>Create an Account</SubHeading>
            <StepList steps={[
              "Open Prmpt from your desktop or system tray.",
              <>Click <strong>Sign up</strong> on the welcome screen.</>,
              <>Enter your name, date of birth, email, and a password — or click <strong>Continue with Google</strong> / <strong>Continue with GitHub</strong> to sign up in one click.</>,
              "You're in — no email verification required.",
            ]} />

            <SubHeading>Sign In</SubHeading>
            <BulletList items={[
              "Use your email and password, or use the Google / GitHub buttons.",
              "Prmpt keeps you signed in between sessions.",
            ]} />

            <SubHeading>Your First Optimization</SubHeading>
            <StepList steps={[
              "Open the main app window.",
              <>Click <strong>New Chat</strong> in the sidebar.</>,
              <>Type a rough idea (e.g., <em>"email to my boss asking for a raise"</em>).</>,
              "Press Enter.",
              "Prmpt returns a detailed, polished version of your prompt — ready to paste anywhere.",
            ]} />

            <Divider />

            {/* ── SECTION 3 ── */}
            <SectionHeading id="s3" num={3}>The Overlay Panel</SectionHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-5">
              The Overlay is Prmpt's signature feature. It's a small floating panel that pops up <strong>over whatever app you're using</strong> — so you never have to stop what you're doing.
            </p>

            <SubHeading>Three Ways to Open It</SubHeading>
            <DataTable
              headers={["Method", "How"]}
              rows={[
                ["<strong>Type <code class='bg-[#1E2A3B]/8 px-1.5 py-0.5 text-[#232629] text-xs'>@prompt</code></strong>", "Type <code class='bg-[#1E2A3B]/8 px-1.5 py-0.5 text-[#232629] text-xs'>@prompt</code> in any text field on your computer — a browser, Word, Slack, anything. The overlay appears right next to your cursor."],
                ["<strong>Keyboard shortcut</strong>", "Press <code class='bg-[#1E2A3B]/8 px-1.5 py-0.5 text-xs'>Ctrl+5</code> (Windows) or <code class='bg-[#1E2A3B]/8 px-1.5 py-0.5 text-xs'>Cmd+5</code> (Mac) from anywhere."],
                ["<strong>System tray</strong>", "Right-click the Prmpt icon in your taskbar → <strong>Toggle Overlay</strong>."],
              ]}
            />

            <SubHeading>How It Works</SubHeading>
            <StepList steps={[
              "Type your rough idea into the overlay.",
              "Press Enter to optimize.",
              "Read the polished result.",
              <>Click <strong>Replace</strong> to swap your <code className="bg-[#1E2A3B]/8 px-1.5 py-0.5 text-[#232629] text-xs">@prompt</code> text with the result — right in the app you were using.</>,
              <>Or click <strong>Copy</strong> to copy it to your clipboard.</>,
              <>Press <kbd className="px-1.5 py-0.5 bg-[#FFF4ED] border-2 border-[#232629] text-xs font-bold">Esc</kbd> or click <strong>✕</strong> to close.</>,
            ]} />

            <Callout>
              <strong>Replace</strong> is available when you opened the overlay by typing <code>@prompt</code>. It automatically puts the optimized text back where your cursor was.
            </Callout>

            <SubHeading>No Internet?</SubHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed">
              If you go offline, a banner appears at the top of the overlay. Optimization resumes automatically once you're back online.
            </p>

            <Divider />

            {/* ── SECTION 4 ── */}
            <SectionHeading id="s4" num={4}>Optimization Modes</SectionHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-5">
              Choose how deeply you want Prmpt to think before it rewrites your prompt.
            </p>
            <DataTable
              headers={["Mode", "Best For"]}
              rows={[
                ["⚡ <strong>Fast</strong>", "Quick everyday tasks — emails, social posts, simple coding questions. Results in seconds."],
                ["🧠 <strong>Thinking</strong>", "Complex requests — detailed documents, tricky code, nuanced creative writing. Takes a few extra seconds but goes deeper."],
              ]}
            />
            <p className="text-[#1E2A3B]/70 text-sm mt-3">
              Click the mode button (bottom-left of the input box) to switch. When in doubt, start with <strong>Fast</strong>.
            </p>

            <Divider />

            {/* ── SECTION 5 ── */}
            <SectionHeading id="s5" num={5}>Skills</SectionHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-5">
              Skills tell Prmpt what type of task you're working on so it can apply the right style and approach.
            </p>

            <SubHeading>Available Skills</SubHeading>
            <DataTable
              headers={["Skill", "Good For"]}
              rows={[
                ["<strong>Technical</strong>", "Code, APIs, databases, algorithms"],
                ["<strong>Creative</strong>", "Stories, blog posts, social content, brainstorming"],
                ["<strong>Business</strong>", "Strategy, market analysis, reports, pitches"],
                ["<strong>Communication</strong>", "Emails, messages, memos, presentations"],
                ["<strong>Educational</strong>", "Tutorials, explanations, study guides"],
                ["<strong>Visual</strong>", "Image generation prompts, design briefs"],
                ["<strong>Automation</strong>", "Workflows, scripts, task instructions"],
                ["<strong>Research</strong>", "Analysis, summaries, literature review"],
              ]}
            />

            <SubHeading>How to Pick a Skill</SubHeading>
            <StepList steps={[
              <>Click the <strong>+</strong> button in the input area.</>,
              <>Choose <strong>Choose skill</strong>.</>,
              "Click the skill that fits your task (hover to see a description).",
              <>A small tag appears in the input bar to show it's selected. Click <strong>✕</strong> to remove it.</>,
            ]} />
            <Callout>Don't worry if you're not sure — Prmpt picks a good default on its own.</Callout>

            <Divider />

            {/* ── SECTION 6 ── */}
            <SectionHeading id="s6" num={6}>Attach Files or Images</SectionHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-4">
              Give Prmpt more context by sharing a document or screenshot alongside your request.
            </p>

            <SubHeading>What you can attach</SubHeading>
            <BulletList items={[
              "Images — PNG, JPG, WebP",
              "Documents — PDF (up to 32 MB each)",
              "Up to 5 files at a time",
            ]} />

            <SubHeading>How to attach</SubHeading>
            <StepList steps={[
              <>Click the <strong>+</strong> button in the input area.</>,
              <>Choose <strong>Add photos &amp; files</strong>.</>,
              "Pick your files.",
              <>They appear as small cards above the input box. Click <strong>✕</strong> on any card to remove it.</>,
            ]} />
            <Callout>
              <strong>Useful when:</strong> You want to say <em>"rewrite this document in a friendlier tone"</em> and attach the original PDF, or <em>"describe this image for an AI image generator"</em> and attach a photo.
            </Callout>

            <Divider />

            {/* ── SECTION 7 ── */}
            <SectionHeading id="s7" num={7}>Voice Input</SectionHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-4">Rather than typing, you can just speak your idea.</p>
            <StepList steps={[
              <>Click the <strong>microphone</strong> icon (right side of the input bar).</>,
              "The icon turns red — you're recording.",
              "Say your idea out loud.",
              "Your words appear in the input box as you speak.",
              "Click the icon again to stop.",
              "Review what was captured, then press Enter to optimize.",
            ]} />
            <Callout>Works great when you're away from your keyboard or just think faster out loud.</Callout>

            <Divider />

            {/* ── SECTION 8 ── */}
            <SectionHeading id="s8" num={8}>Chat Context</SectionHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-4">
              Already had a conversation with Prmpt? You can attach it as context for your next request so Prmpt knows what you've already worked on.
            </p>
            <StepList steps={[
              <>In the input area, click <strong>Attach Chat Context</strong>.</>,
              "Pick a recent conversation from the list.",
              "A tag appears showing the chat name.",
              "Prmpt will factor that conversation into its next response.",
              <>Click <strong>✕</strong> on the tag to detach it.</>,
            ]} />

            <Divider />

            {/* ── SECTION 9 ── */}
            <SectionHeading id="s9" num={9}>Your Conversation History</SectionHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-5">
              Every time you optimize something, Prmpt saves it as a conversation so you can come back to it later.
            </p>
            <DataTable
              headers={["Action", "How"]}
              rows={[
                ["<strong>Browse old versions</strong>", "Click the ← → arrows on any message to flip between different versions"],
                ["<strong>Edit a past message</strong>", "Click the pencil icon on any of your messages to change it and re-optimize from there"],
                ["<strong>Get a fresh result</strong>", "Click <strong>regenerate</strong> on any Prmpt response to try again"],
                ["<strong>Start fresh</strong>", "Click <strong>New Chat</strong> in the sidebar"],
                ["<strong>Rename a chat</strong>", "Hover over it in the sidebar → click ⋯ → <strong>Rename</strong>"],
                ["<strong>Delete a chat</strong>", "Hover over it → click ⋯ → <strong>Delete</strong>"],
              ]}
            />
            <p className="text-[#1E2A3B]/70 text-sm mt-3">Your recent chats are always visible in the left sidebar for quick access.</p>

            <Divider />

            {/* ── SECTION 10 ── */}
            <SectionHeading id="s10" num={10}>Prompt Library</SectionHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-4">
              The Library is where you save your best prompts so you can reuse them anytime.
            </p>

            <SubHeading>Saving a Prompt</SubHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-4">
              After getting a result you like, click the <strong>save</strong> icon on the response. Give it a name and choose a collection (folder) to put it in.
            </p>

            <SubHeading>Organizing with Collections</SubHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-3">
              Collections are like folders. You can create as many as you want — for example: <em>Work Emails</em>, <em>Creative Writing</em>, <em>Code Snippets</em>.
            </p>
            <BulletList items={[
              <><strong>All Prompts</strong> and <strong>Favorites</strong> are always available by default.</>,
              <>Create a new collection with the <strong>+ New Collection</strong> button.</>,
              <>Rename or delete collections from the <strong>⋯</strong> menu.</>,
            ]} />

            <SubHeading>What You Can Do With a Saved Prompt</SubHeading>
            <DataTable
              headers={["Action", "What it does"]}
              rows={[
                ["<strong>Open</strong>", "Load it back into chat to keep refining"],
                ["<strong>Copy</strong>", "Copy the text to paste anywhere"],
                ["<strong>Download</strong>", "Save it as a .txt file on your computer"],
                ["<strong>Edit</strong>", "Rename it or move it to another collection"],
                ["<strong>Delete</strong>", "Remove it permanently"],
                ["<strong>Share</strong>", "Create a link others can view"],
              ]}
            />

            <SubHeading>Searching</SubHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed">
              Use the search bar at the top of the library to find any prompt by its title or content.
            </p>

            <Divider />

            {/* ── SECTION 11 ── */}
            <SectionHeading id="s11" num={11}>Sharing</SectionHeading>

            <SubHeading>Share a Collection</SubHeading>
            <StepList steps={[
              <>Open the <strong>Prompt Library</strong>.</>,
              <>Click the <strong>share</strong> icon next to any collection name.</>,
              "A link is copied to your clipboard — share it with anyone.",
              "Anyone with the link can see the collection and save it to their own Prmpt library.",
            ]} />

            <SubHeading>Share a Single Prompt</SubHeading>
            <StepList steps={[
              <>Hover over any saved prompt card and click the <strong>share</strong> icon.</>,
              "Copy the link — anyone can open it and read or copy the prompt, no account needed.",
            ]} />

            <Divider />

            {/* ── SECTION 12 ── */}
            <SectionHeading id="s12" num={12}>App Memory</SectionHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-5">
              Prmpt quietly learns from how you use it, so your results get better and more personal over time.
            </p>

            <SubHeading>What It Remembers</SubHeading>
            <DataTable
              headers={["Category", "What gets stored"]}
              rows={[
                ["<strong>About You</strong>", "Things you tell it directly — your job, your preferred writing style, your field"],
                ["<strong>Usage Patterns</strong>", "Habits it picks up on — like always wanting short answers, or always needing code examples"],
                ["<strong>Recurring Themes</strong>", "Topics that come up in your prompts often"],
              ]}
            />

            <SubHeading>Viewing & Editing Your Memory</SubHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-3">Go to <strong>Settings → Memory</strong> to see everything stored about you.</p>
            <BulletList items={[
              <>Click the <strong>pencil icon</strong> on any item to change it.</>,
              <>Click the <strong>trash icon</strong> to delete it.</>,
              <>Click <strong>+ Add fact</strong> to manually tell Prmpt something about yourself.</>,
              <>Things you add yourself are marked <strong>"You set this"</strong> and are always trusted first.</>,
            ]} />

            <SubHeading>Turning It Off</SubHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-3">
              Toggle <strong>Learn from my usage</strong> at the top of the Memory screen to pause automatic learning. Your manually added facts are still used even when learning is off.
            </p>
            <Callout>Everything in memory lives only on your device — it is never sold or shared.</Callout>

            <Divider />

            {/* ── SECTION 13 ── */}
            <SectionHeading id="s13" num={13}>Settings</SectionHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-5">Open settings by clicking your profile picture or name at the bottom of the sidebar.</p>

            <SubHeading>Profile Tab</SubHeading>
            <BulletList items={[
              "Change your profile photo — click the avatar and upload a new one.",
              "Update your display name.",
              "Link or manage your Google account.",
              <><strong>Delete Account</strong> — removes everything permanently (this cannot be undone).</>,
            ]} />

            <SubHeading>Customize Tab</SubHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-3">
              <strong>Custom Instructions</strong> — Write a short note that gets added to every single optimization. For example:
            </p>
            <BulletList items={[
              <><em>"Always write in British English"</em></>,
              <><em>"I'm a nurse — avoid overly technical jargon"</em></>,
              <><em>"Keep all responses under 150 words"</em></>,
            ]} />
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mt-4 mb-1">
              <strong>Appearance</strong> — Switch between <strong>Dark</strong> and <strong>Light</strong> mode.
            </p>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed">
              <strong>Typography</strong> — Change the font size (Small / Medium / Large) and font family (Default / Monospace / Serif).
            </p>

            <SubHeading>Memory Tab</SubHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed">
              See the <button onClick={() => scrollTo("s12")} className="text-[#232629] hover:underline font-bold uppercase tracking-wider text-xs" style={{ border: "2px solid #232629", padding: "2px 8px", background: "transparent" }}>App Memory</button> section above.
            </p>

            <Divider />

            {/* ── SECTION 14 ── */}
            <SectionHeading id="s14" num={14}>Sign In & Account</SectionHeading>

            <SubHeading>Sign Up</SubHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-4">
              Fill in your name, date of birth, email, and password on the welcome screen. Or use one of the social sign-in buttons for instant access.
            </p>

            <SubHeading>Sign In with Google</SubHeading>
            <StepList steps={[
              <>Click <strong>Continue with Google</strong>.</>,
              "Your browser opens — sign in with your Google account.",
              "The tab closes by itself and you're signed in to Prmpt.",
            ]} />

            <SubHeading>Sign In with GitHub</SubHeading>
            <StepList steps={[
              <>Click <strong>Continue with GitHub</strong>.</>,
              "Your browser opens — authorize Prmpt.",
              "The tab closes by itself and you're signed in.",
            ]} />

            <SubHeading>Sign Out</SubHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed">
              Click your name at the bottom of the sidebar → <strong>Sign Out</strong>.
            </p>

            <Divider />

            {/* ── SECTION 15 ── */}
            <SectionHeading id="s15" num={15}>Keyboard Shortcuts</SectionHeading>
            <DataTable
              headers={["Shortcut", "What it does"]}
              rows={[
                ["Type <code class='bg-[#1E2A3B]/8 px-1.5 py-0.5 text-[#232629] text-xs'>@prompt</code> anywhere", "Opens the overlay next to your cursor"],
                ["<code class='bg-[#1E2A3B]/8 px-1.5 py-0.5 text-xs'>Ctrl+5</code> / <code class='bg-[#1E2A3B]/8 px-1.5 py-0.5 text-xs'>Cmd+5</code>", "Toggle the overlay on/off"],
                ["<code class='bg-[#1E2A3B]/8 px-1.5 py-0.5 text-xs'>Enter</code>", "Send your message / optimize"],
                ["<code class='bg-[#1E2A3B]/8 px-1.5 py-0.5 text-xs'>Shift+Enter</code>", "New line in the input box"],
                ["<code class='bg-[#1E2A3B]/8 px-1.5 py-0.5 text-xs'>Esc</code>", "Close the overlay"],
              ]}
            />

            <Divider />

            {/* ── SECTION 16 ── */}
            <SectionHeading id="s16" num={16}>Common Questions</SectionHeading>

            <div className="space-y-5">
              {[
                {
                  q: "Does Prmpt work with ChatGPT, Claude, Midjourney, etc.?",
                  a: "Yes — Prmpt is not an AI itself. It polishes your prompt, which you then paste into whatever AI tool you use. It works with any AI tool.",
                },
                {
                  q: "Is my data private?",
                  a: "Your prompts and memory are stored securely and are never sold or shared with third parties. Memory data lives on your own device.",
                },
                {
                  q: "Can I use it without creating an account?",
                  a: "The overlay works in a limited mode without signing in. To save prompts, use history, and enable memory, you'll need a free account.",
                },
                {
                  q: "The overlay opened on the wrong screen — what do I do?",
                  a: "The overlay appears near your mouse cursor. Move your cursor to the screen you want before triggering it.",
                },
                {
                  q: "I accidentally deleted a prompt — can I get it back?",
                  a: "Unfortunately, deletions are permanent. We recommend using the Download option to keep a backup of your most important prompts.",
                },
                {
                  q: "My microphone isn't working with voice input — what should I check?",
                  a: "Make sure Prmpt has microphone permission in your computer's system settings (Windows: Settings → Privacy → Microphone / Mac: System Preferences → Security & Privacy → Microphone).",
                },
                {
                  q: "Can I share prompts with people who don't have Prmpt?",
                  a: "Yes — shared prompt links open in a browser and anyone can read or copy the prompt without an account.",
                },
              ].map(({ q, a }, i) => (
                <div
                  key={q}
                  style={{
                    border: "3px solid #232629",
                    boxShadow: "5px 5px 0px #232629",
                    background: "#FFF9F6",
                    overflow: "hidden",
                    transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                  }}
                >
                  <div
                    className="px-5 py-4"
                    style={{
                      background: "#232629",
                      borderBottom: "3px solid #232629",
                    }}
                  >
                    <p className="font-bold text-sm uppercase tracking-wide" style={{ color: "#FFF4ED", fontFamily: "'DM Sans', sans-serif" }}>{q}</p>
                  </div>
                  <p className="px-5 py-4 text-sm text-[#1E2A3B]/80 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>

            <Divider />

            {/* ── SECTION 17 ── */}
            <SectionHeading id="s17" num={17}>Contact Us</SectionHeading>
            <p className="text-[#1E2A3B]/80 text-sm leading-relaxed mb-6">
              Have a question that isn't answered here, found something that isn't working, or just want to share feedback? We'd love to hear from you.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: "🌐",
                  label: "Website",
                  value: "tryprmpt.vercel.app",
                  href: "https://tryprmpt.vercel.app",
                },
                {
                  icon: "📧",
                  label: "Email",
                  value: "tryprmpt@gmail.com",
                  href: "mailto:tryprmpt@gmail.com",
                },
                {
                  icon: "📷",
                  label: "Instagram",
                  value: "@tryprmpt",
                  href: "https://www.instagram.com/tryprmpt/",
                },
                {
                  icon: "𝕏",
                  label: "X (Twitter)",
                  value: "@TryPrmpt",
                  href: "https://x.com/TryPrmpt",
                },
              ].map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 group"
                  style={{
                    border: "3px solid #232629",
                    boxShadow: "5px 5px 0px #232629",
                    background: "#FFF9F6",
                    textDecoration: "none",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-2px, -2px)"; e.currentTarget.style.boxShadow = "7px 7px 0px #232629"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "5px 5px 0px #232629"; }}
                >
                  <span
                    className="text-2xl flex items-center justify-center shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      background: "#E8D0C3",
                      border: "3px solid #232629",
                    }}
                  >
                    {icon}
                  </span>
                  <div>
                    <p
                      className="mb-0.5"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.62rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#526070",
                      }}
                    >
                      {label}
                    </p>
                    <p className="text-sm font-bold text-[#1E2A3B]">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <Callout>
              We read every message and aim to respond within 1 business day.
            </Callout>

            {/* Footer note */}
            <div className="mt-16 pt-8 text-center" style={{ borderTop: "4px solid #232629" }}>
              <StampLabel rotate="1.5deg">✦ THANK YOU ✦</StampLabel>
              <p className="text-sm text-[#526070] mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Thank you for using Prmpt — we're just getting started, and your feedback shapes every update.
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
