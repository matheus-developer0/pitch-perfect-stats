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

export function StatCard({ label, value, delta, icon: Icon, accent = "neon", index = 0 }: Props) {
  const positive = (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="relative glass rounded-2xl p-4 overflow-hidden group"
    >
      <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full ${accent === "gold" ? "bg-gold/10" : accent === "accent" ? "bg-accent/10" : "bg-primary/10"} blur-3xl group-hover:scale-150 transition-transform duration-700`} />
      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
          <p className={`num-display text-3xl font-black ${accentMap[accent]}`}>{value}</p>
        </div>
        {Icon && (
          <div className={`grid h-9 w-9 place-items-center rounded-xl bg-white/5 ${accentMap[accent]}`}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      {delta !== undefined && (
        <div className={`relative mt-3 flex items-center gap-1 text-xs font-semibold ${positive ? "text-primary" : "text-destructive"}`}>
          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {positive ? "+" : ""}{delta}% no mês
        </div>
      )}
    </motion.div>
  );
}
