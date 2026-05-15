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

export function PlayerCard({ player, size = "md", variant = "neon", to, index = 0 }: Props) {
  const isGold = variant === "gold" || player.overall >= 85;
  const Wrapper: any = to ? Link : "div";
  const props = to ? { to } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 200, damping: 22 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group"
    >
      <Wrapper {...props}>
        <div
          className={`relative ${sizeMap[size]} rounded-3xl overflow-hidden border ${
            isGold ? "border-gold/40 gradient-card-gold" : "border-primary/30 gradient-card-fifa"
          }`}
          style={{
            boxShadow: isGold
              ? "0 30px 60px -20px oklch(0.85 0.16 90 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.1)"
              : "0 30px 60px -20px oklch(0.86 0.22 150 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.1)",
          }}
        >
          {/* shine */}
          <div className="absolute inset-0 opacity-60 pointer-events-none bg-grid" />
          <div className="absolute -inset-x-10 -top-10 h-40 bg-gradient-to-b from-white/10 to-transparent blur-2xl" />

          {/* Top: OVR + POS */}
          <div className="relative z-10 flex items-start justify-between p-4">
            <div className="flex flex-col items-center">
              <span className={`num-display text-5xl font-black leading-none ${isGold ? "text-gold text-glow-gold" : "text-primary text-glow-neon"}`}>
                {player.overall}
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-foreground/80 mt-1">
                {player.position}
              </span>
            </div>
            <div className="text-right text-[10px] font-bold tracking-wider text-muted-foreground">
              <div>#{player.shirt}</div>
              <div className="mt-1">{player.foot === "Destro" ? "PD" : "PE"}</div>
            </div>
          </div>

          {/* Player image */}
          <div className="relative z-10 mx-auto -mt-2 h-1/2 w-full px-6">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/20 to-transparent blur-2xl" />
              <img
                src={player.avatar}
                alt={player.name}
                className="relative h-full w-full object-cover object-top rounded-2xl"
              />
            </div>
          </div>

          {/* Name */}
          <div className="relative z-10 px-4 mt-3 text-center">
            <p className={`font-black tracking-wide uppercase ${size === "xl" ? "text-2xl" : size === "lg" ? "text-lg" : "text-sm"}`}>
              {player.nick}
            </p>
            <div className={`my-2 h-px ${isGold ? "bg-gold/40" : "bg-primary/40"}`} />
          </div>

          {/* Stats */}
          {size !== "sm" && (
            <div className="relative z-10 px-4 grid grid-cols-3 gap-1 text-[10px] font-bold">
              {[
                ["GOL", player.goals],
                ["AST", player.assists],
                ["VIT", player.wins],
              ].map(([l, v]) => (
                <div key={l as string} className="flex flex-col items-center">
                  <span className="num-display text-base font-black text-foreground">{v}</span>
                  <span className="text-muted-foreground tracking-widest">{l}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Wrapper>
    </motion.div>
  );
}
