import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { championships, standings, rankByGoals } from "@/lib/mock-data";
import { Trophy, Medal } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/campeonatos")({ component: CampPage });

function CampPage() {
  const [selected, setSelected] = useState(championships[0].id);
  const c = championships.find(x => x.id === selected)!;
  const top = rankByGoals().slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Campeonatos</h1>
        <p className="text-muted-foreground mt-1">Acompanhe ligas, copas e torneios.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {championships.map((ch, i) => (
          <motion.button key={ch.id} onClick={() => setSelected(ch.id)}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className={`glass rounded-3xl p-5 text-left relative overflow-hidden border-2 transition-colors ${
              selected === ch.id ? "border-primary/50 glow-neon" : "border-transparent"
            }`}>
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />
            <Trophy className="h-7 w-7 text-gold mb-3" fill="currentColor" />
            <h3 className="font-black text-lg">{ch.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{ch.format} • {ch.teams} times</p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-bold text-primary">{ch.round}</span>
              <span className="text-muted-foreground">{ch.status}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-4">
        <div className="glass rounded-3xl p-5">
          <h3 className="font-black mb-4">Tabela — {c.name}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  <th className="text-left py-2 pl-2">#</th>
                  <th className="text-left">Time</th>
                  <th className="num-display">P</th>
                  <th className="num-display">J</th>
                  <th className="num-display">V</th>
                  <th className="num-display">E</th>
                  <th className="num-display">D</th>
                  <th className="num-display">GP</th>
                  <th className="num-display">GC</th>
                  <th className="num-display pr-2">SG</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((s, i) => (
                  <motion.tr key={s.team} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                    className="border-t border-white/5 hover:bg-white/5">
                    <td className="py-3 pl-2">
                      <span className={`num-display inline-grid h-6 w-6 place-items-center rounded-md text-xs font-black ${
                        i < 2 ? "bg-primary/20 text-primary" : i < 4 ? "bg-accent/20 text-accent" : i >= standings.length - 1 ? "bg-destructive/20 text-destructive" : "bg-white/5"
                      }`}>{s.pos}</span>
                    </td>
                    <td className="font-bold">{s.team}</td>
                    <td className="num-display text-center font-black text-primary">{s.p}</td>
                    <td className="num-display text-center text-muted-foreground">{s.j}</td>
                    <td className="num-display text-center text-muted-foreground">{s.v}</td>
                    <td className="num-display text-center text-muted-foreground">{s.e}</td>
                    <td className="num-display text-center text-muted-foreground">{s.d}</td>
                    <td className="num-display text-center text-muted-foreground">{s.gp}</td>
                    <td className="num-display text-center text-muted-foreground">{s.gc}</td>
                    <td className="num-display text-center font-bold pr-2">{s.gp - s.gc}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass rounded-3xl p-5">
          <h3 className="font-black mb-4 flex items-center gap-2"><Medal className="h-4 w-4 text-gold" /> Artilharia</h3>
          <div className="space-y-2">
            {top.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className={`num-display w-6 text-center font-black ${i === 0 ? "text-gold" : "text-muted-foreground"}`}>{i + 1}</span>
                <img src={p.avatar} className="h-9 w-9 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{p.nick}</p>
                  <p className="text-[10px] text-muted-foreground">{p.position}</p>
                </div>
                <span className="num-display text-xl font-black text-primary">{p.goals}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
