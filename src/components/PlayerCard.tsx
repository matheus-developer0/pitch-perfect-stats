import { motion } from "motion/react";
import { Player } from "@/lib/mock-data";
import { Link } from "@tanstack/react-router";

interface Props {
  player: Player;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "neon" | "gold";
  to?: string;
  index?: number;
}

const sizeMap = {
  sm: "w-[140px] h-[200px]",
  md: "w-[180px] h-[260px]",
  lg: "w-[240px] h-[340px]",
  xl: "w-full max-w-[320px] h-[460px]",
};

export function PlayerCard({ player, size = "md", variant = "neon", to, index = 0, className }: Props & { className?: string }) {
  const isGold = variant === "gold" || player.overall >= 85;
  const Wrapper: any = to ? Link : "div";
  const props = to ? { to } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ y: -12, scale: 1.05 }}
      className={`group cursor-pointer ${className}`}
    >
      <Wrapper {...props}>
        <div
          className={`relative ${sizeMap[size]} rounded-[2rem] overflow-hidden border-2 transition-all duration-500 ${
            isGold ? "border-gold/50" : "border-primary/50"
          }`}
          style={{
            background: isGold 
              ? "linear-gradient(165deg, oklch(0.25 0.06 70), oklch(0.12 0.02 240))" 
              : "linear-gradient(165deg, oklch(0.25 0.08 260), oklch(0.12 0.02 240))",
            boxShadow: isGold
              ? "0 40px 80px -20px oklch(0.78 0.15 85 / 0.3)"
              : "0 40px 80px -20px oklch(0.65 0.28 260 / 0.3)",
          }}
        >
          {/* Holographic Shine */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full" />
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          {/* Card Header */}
          <div className="relative z-10 flex flex-col items-center pt-6">
            <span className={`num-display leading-none ${size === "xl" ? "text-7xl" : "text-5xl"} font-black ${isGold ? "text-gold" : "text-primary"}`}>
              {player.overall}
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/60">
              {player.position}
            </span>
          </div>

          {/* Player Avatar with Glow */}
          <div className="relative z-10 mx-auto mt-4 px-6 h-1/2">
            <div className="relative h-full aspect-square mx-auto">
              <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 ${isGold ? "bg-gold" : "bg-primary"}`} />
              <img
                src={player.avatar}
                alt={player.name}
                className="relative h-full w-full object-cover rounded-3xl border-2 border-white/5 shadow-2xl"
              />
            </div>
          </div>

          {/* Name & Stats */}
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent pt-12">
            <h3 className={`font-heading text-center leading-tight mb-4 ${size === "xl" ? "text-3xl" : "text-xl"}`}>
              {player.nick}
            </h3>
            
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
              {[
                { l: "GOL", v: player.goals },
                { l: "AST", v: player.assists },
                { l: "MVP", v: player.mvps },
              ].map((s) => (
                <div key={s.l} className="flex flex-col items-center">
                  <span className="num-display text-lg font-black">{s.v}</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
}
