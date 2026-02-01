import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Menu } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
    { name: "Features", href: "#features" },
    { name: "About Us", href: "#about-us" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const yOffset = -100; // Offset for fixed header
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
                isScrolled
                    ? "bg-black/10 backdrop-blur-md border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
                    : "bg-transparent py-5"
            )}
        >
            <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#"
                    onClick={(e) => scrollToSection(e, "#")}
                    className="flex items-center gap-2 group"
                >
                    <div className="relative flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-cyan-400 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-cyan-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <span className="font-mono text-xl font-bold tracking-tighter text-white">PROMPT</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="relative text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-white transition-colors duration-200 group py-1"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                        </a>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block transform hover:scale-105 transition-transform duration-200">
                        <AnimatedButton text="Join Waitlist" onClick={() => { }} />
                    </div>

                    {/* Mobile Toggle */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-zinc-950/95 backdrop-blur-xl border-l border-white/10">
                            <nav className="flex flex-col gap-8 mt-12 items-center">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-lg font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="pt-4">
                                    <AnimatedButton text="Join Waitlist" onClick={() => { }} />
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
