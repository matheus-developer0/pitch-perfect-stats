import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { rankByGoals, rankByAssists, rankByMVP, rankByCleanSheets, rankByWinRate, rankByOverall } from "@/lib/mock-data";
import { Trophy, Crown, Medal } from "lucide-react";

export const Route = createFileRoute("/ranking")({ component: RankingPage });

const cats = [
  { k: "overall", l: "Overall", fn: rankByOverall, key: "overall", suf: "" },
  { k: "goals", l: "Artilheiros", fn: rankByGoals, key: "goals", suf: "G" },
  { k: "assists", l: "Assistências", fn: rankByAssists, key: "assists", suf: "A" },
  { k: "mvp", l: "MVPs", fn: rankByMVP, key: "mvps", suf: " MVP" },
  { k: "winrate", l: "Win Rate", fn: rankByWinRate, key: "winrate", suf: "%" },
  { k: "clean", l: "Goleiros", fn: rankByCleanSheets, key: "cleanSheets", suf: " CS" },
] as const;

function RankingPage() {
  const [cat, setCat] = useState<typeof cats[number]["k"]>("overall");
  const conf = cats.find(c => c.k === cat)!;
  const list = conf.fn();
  const top3 = list.slice(0, 3);
  const rest = list.slice(3, 15);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Ranking</h1>
        <p className="text-muted-foreground mt-1">Os melhores da liga, atualizado em tempo real.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {cats.map(c => (
          <button key={c.k} onClick={() => setCat(c.k)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              cat === c.k ? "gradient-neon text-neon-foreground glow-neon" : "glass text-muted-foreground hover:text-foreground"
            }`}>
            {c.l}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 lg:gap-6 items-end">
        {[top3[1], top3[0], top3[2]].map((p, idx) => {
          if (!p) return <div key={idx} />;
          const realIdx = idx === 0 ? 1 : idx === 1 ? 0 : 2;
          const heights = ["h-40 lg:h-56", "h-52 lg:h-72", "h-32 lg:h-44"];
          const colors = ["text-silver", "text-gold", "text-bronze"];
          const grad = ["linear-gradient(180deg, oklch(0.82 0.02 240 / 0.3), transparent)", "linear-gradient(180deg, oklch(0.85 0.16 90 / 0.4), transparent)", "linear-gradient(180deg, oklch(0.65 0.13 50 / 0.3), transparent)"];
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="flex flex-col items-center">
              <div className="relative">
                {realIdx === 0 && <Crown className="absolute -top-7 left-1/2 -translate-x-1/2 h-7 w-7 text-gold" fill="currentColor" />}
                <img src={p.avatar} className={`h-20 w-20 lg:h-28 lg:w-28 rounded-2xl object-cover ring-4 ${realIdx === 0 ? "ring-gold" : realIdx === 1 ? "ring-silver" : "ring-bronze"}`} />
              </div>
              <p className="mt-3 text-center font-black text-sm lg:text-base truncate max-w-full px-1">{p.nick}</p>
              <p className={`num-display font-black text-2xl lg:text-4xl ${colors[idx]}`}>
                {(p as any)[conf.key === "winrate" ? "wins" : conf.key]}{conf.key === "winrate" ? `/${p.matches}` : conf.suf}
              </p>
              <div className={`mt-2 w-full ${heights[idx]} rounded-t-2xl glass-strong relative overflow-hidden`} style={{ background: grad[idx] }}>
                <div className="absolute inset-x-0 top-2 text-center">
                  <span className="num-display text-3xl lg:text-5xl font-black opacity-50">{realIdx + 1}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Rest */}
      <div className="glass rounded-3xl divide-y divide-white/5 overflow-hidden">
        {rest.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
            className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors">
            <span className="num-display w-8 text-center text-lg font-black text-muted-foreground">{i + 4}</span>
            <img src={p.avatar} className="h-11 w-11 rounded-xl object-cover ring-2 ring-white/10" />
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.position} • OVR {p.overall}</p>
            </div>
            <div className="text-right">
              <p className="num-display text-2xl font-black text-primary">
                {conf.key === "winrate" ? `${Math.round((p.wins / p.matches) * 100)}%` : (p as any)[conf.key]}
              </p>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">{conf.l}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
