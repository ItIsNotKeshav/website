import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function WaitlistForm({ className }: { className?: string }) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1500);
    };

    return (
        <div className={cn("w-full max-w-sm mx-auto", className)}>
            <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "success" || status === "loading"}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-6 pr-20 text-lg text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-sm"
                />
                <button
                    type="submit"
                    disabled={status === "success" || status === "loading"}
                    className="absolute right-2 p-4 bg-[#00A3FF] hover:bg-[#0082CC] rounded-full text-white hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20"
                >
                    {status === "success" ? (
                        <Check className="w-5 h-5" />
                    ) : status === "loading" ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                    ) : (
                        <ArrowRight className="w-6 h-6" />
                    )}
                </button>
            </form>
            {status === "success" && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-xs text-cyan-400 mt-2"
                >
                    You're on the list! We'll be in touch soon.
                </motion.p>
            )}
        </div>
    );
}
