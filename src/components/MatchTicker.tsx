import { motion } from "motion/react";
import { matches } from "@/lib/mock-data";

export function MatchTicker() {
  const finished = matches.filter(m => m.status === "Finalizada");
  
  return (
    <div className="w-full bg-surface border-y border-white/5 overflow-hidden py-3">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-12 whitespace-nowrap px-4"
      >
        {[...finished, ...finished].map((m, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">{m.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold">{m.teamA}</span>
              <span className="num-display text-lg font-black bg-white/5 px-2 rounded-md">{m.scoreA} - {m.scoreB}</span>
              <span className="text-xs font-bold">{m.teamB}</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-white/20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
