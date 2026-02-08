"use client";

import * as React from "react";
import {
  ArrowRight,
  Menu,
  Sparkles,
  Zap,
  Globe,
  Keyboard,
  Layers,
  Users,
  Cpu,
  Monitor
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedButton from "@/components/ui/animated-button";
import { Glow } from "@/components/ui/glow";
import { WaitlistForm } from "@/components/waitlist-form";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "FEATURES", href: "#features" },
  { title: "PRICING", href: "#" },
  { title: "BLOG", href: "#" },
  { title: "CONTACT", href: "#" },
];

const labels = [
  { icon: Globe, label: "Works Everywhere" },
  { icon: Zap, label: "Real-time" },
  { icon: Keyboard, label: "Zero Friction" },
];

const features = [
  {
    icon: Layers,
    title: "Universal Integration",
    description: "Seamlessly works with Chrome, VSCode, Notion, and Slack. Prompt lives where you work.",
    visual: "bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20"
  },
  {
    icon: Cpu,
    title: "Context-Aware Intelligence",
    description: "Prompt reads your screen to provide intelligent, context-aware assistance exactly when needed.",
    visual: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20"
  },
  {
    icon: Zap,
    title: "Instant Accessibility",
    description: "Appears instantly when you copy, highlight, or select text anywhere on your system.",
    visual: "bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20"
  },
];

export default function Index() {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const titleWords = [
    "THE",
    "AI",
    "REVOLUTION",
    "FOR",
    "PROMPT",
    "ENGINEERING",
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden text-foreground selection:bg-cyan-500/20">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Glow
          variant="center"
          className="opacity-40 scale-125 blur-3xl animate-appear-zoom"
        />
      </div>

      <header className="relative z-50 w-full overflow-visible">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex h-20 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="font-groote text-3xl font-bold tracking-tight">prmpt</span>
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="text-sm font-mono text-muted-foreground hover:text-cyan-400 transition-colors"
              >
                {item.title}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:inline-flex pr-1">
              <AnimatedButton text="Join Waitlist" onClick={() => { }} />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-6 mt-6">
                  {navigationItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="text-sm font-mono text-foreground hover:text-cyan-400 transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                  <Button className="cursor-pointer rounded-none bg-cyan-500 hover:bg-cyan-600 font-mono w-full">
                    GET STARTED <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="relative z-10 text-foreground">
        {/* HERO SECTION */}
        <section className="container mx-auto px-4 py-32 md:py-48 min-h-[90vh] flex flex-col justify-center">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative font-mono text-4xl font-bold sm:text-6xl md:text-7xl lg:text-8xl max-w-[90rem] mx-auto leading-none tracking-tighter"
            >
              {titleWords.map((text, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6
                  }}
                  className="inline-block mx-2 md:mx-4 text-white drop-shadow-2xl filter"
                >
                  {text}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mx-auto mt-8 max-w-[800px] text-xl sm:text-2xl font-medium text-[#F5F5F5] font-mono leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            >
              Make your desktop smarter. Prompt is an AI desktop assistant that optimizes your workflow locally.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-6"
            >
              {labels.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.5 + (index * 0.1),
                    duration: 0.6
                  }}
                  className="flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg hover:bg-white/15 transition-all cursor-default"
                >
                  <feature.icon className="h-8 w-8 text-cyan-300" />
                  <span className="text-xl font-mono text-white">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              className="mt-16 w-full max-w-lg"
            >
              <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground font-mono text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                373 developers joined the waitlist today
              </div>
              <WaitlistForm className="max-w-lg" />
            </motion.div>
          </div>
        </section>

        {/* FEATURES SECTION - Inspired by Reference Image 1 */}
        <section id="features" className="container mx-auto px-4 py-24" ref={ref}>
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-mono font-bold tracking-tight text-white/90">
              Engineered to perfection
            </h2>
            <p className="mt-4 text-xl text-zinc-300 font-mono max-w-2xl">
              Every feature is purposefully crafted to enhance your productivity.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.2 + (index * 0.15),
                  duration: 0.5
                }}
                className="group flex flex-col h-full rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-cyan-500/30 transition-colors"
              >
                <div className="p-8 pb-0 flex-1">
                  <h3 className="text-xl font-mono font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* Visual Placeholder Area - Inspired by reference screenshots */}
                <div className="w-full h-48 px-8 pb-8">
                  <div className={`w-full h-full rounded-lg border ${feature.visual} flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}>
                    <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
                    {/* Simulating UI elements */}
                    <div className="w-3/4 h-2/3 bg-black/40 rounded border border-white/5 backdrop-blur-md flex flex-col p-3 gap-2">
                      <div className="w-1/3 h-2 bg-white/20 rounded-full" />
                      <div className="w-full h-full bg-white/5 rounded" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* BIG CTA BANNER - Inspired by Reference Image 3 */}
        <section className="py-32 container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 px-8 py-24 md:py-32 text-center">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-mono font-bold text-white tracking-tighter leading-tight">
                The only assistant you'll ever need.
              </h2>
              <p className="text-xl text-muted-foreground">
                Stop searching for tools. Prompt delivers everything you need, directly to your desktop.
              </p>
              <div className="pt-4 flex justify-center">
                <AnimatedButton text="Get Unlimited Access" onClick={() => { }} />
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 px-4 border-t border-white/5 mt-12 bg-black/20 backdrop-blur-xl">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground font-mono">
            <div className="flex flex-col gap-1 items-center md:items-start">
              <div className="font-bold text-white font-mono text-lg">PROMPT</div>
              <div className="text-xs text-white/40">Made by developers, for developers.</div>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Discord</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Email</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
