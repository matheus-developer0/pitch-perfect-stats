import React, { memo } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string | number;
  delta?: number;
  icon?: LucideIcon;
  accent?: "neon" | "gold" | "accent" | "destructive";
  index?: number;
}

const accentMap = {
  neon: "text-primary",
  gold: "text-gold",
  accent: "text-accent",
  destructive: "text-destructive",
};

export const StatCard = memo(function StatCard({ label, value, delta, icon: Icon, accent = "neon", index = 0 }: Props) {
  const positive = (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="sport-card rounded-3xl p-6 group cursor-default"
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
          {label}
        </p>
        {Icon && (
          <div className="text-muted-foreground group-hover:text-primary transition-colors">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-end justify-between gap-2">
        <h3 className={`num-display text-4xl font-black ${accentMap[accent]}`}>
          {value}
        </h3>
        
        {delta !== undefined && (
          <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider mb-1 ${positive ? "text-primary" : "text-accent"}`}>
            {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {positive ? "+" : ""}{delta}%
          </div>
        )}
      </div>
    </motion.div>
  );
});
