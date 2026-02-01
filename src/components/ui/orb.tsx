import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OrbProps {
    className?: string;
}

export function Orb({ className }: OrbProps) {
    return (
        <div className={cn("relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]", className)}>
            {/* Core Orb */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 blur-3xl"
            />

            {/* Inner Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute inset-10 rounded-full bg-gradient-to-tr from-cyan-400/30 to-purple-500/30 blur-2xl"
            />

            {/* Surface Detail (Abstract) */}
            <motion.div
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-white/5 opacity-30 mask-image-radial"
                style={{
                    background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(255,255,255,0.1) 100%)",
                }}
            />
        </div>
    );
}
