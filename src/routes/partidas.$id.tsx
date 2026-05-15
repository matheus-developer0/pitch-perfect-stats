import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "motion/react";
import { matches, players } from "@/lib/mock-data";
import { ArrowLeft, Plus, Award, Square } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/partidas/$id")({ component: LiveMatch });

function LiveMatch() {
  const { id } = useParams({ from: "/partidas/$id" });
  const match = matches.find(m => m.id === id) ?? matches.find(m => m.status === "Ao Vivo")!;
  const teamA = players.slice(0, 7);
  const teamB = players.slice(7, 14);
  const [scoreA, setScoreA] = useState(match.scoreA ?? 0);
  const [scoreB, setScoreB] = useState(match.scoreB ?? 0);
  const [seconds, setSeconds] = useState(34 * 60);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return (
    <div className="space-y-6">
      <Link to="/partidas" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Voltar</Link>

      {/* Scoreboard */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative glass-strong rounded-3xl p-6 lg:p-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[80%] rounded-full bg-primary/20 blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-destructive">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" /> AO VIVO
            </span>
            <span className="text-xs text-muted-foreground">{match.location}</span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 lg:gap-12">
            <div className="text-center">
              <p className="text-xs lg:text-sm font-bold uppercase tracking-widest text-primary">Time Verde</p>
              <p className="num-display text-7xl lg:text-9xl font-black text-primary text-glow-neon">{scoreA}</p>
              <button onClick={() => setScoreA(s => s + 1)} className="mt-2 inline-flex items-center gap-1 rounded-xl bg-primary/10 border border-primary/30 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20"><Plus className="h-3 w-3" /> Gol</button>
            </div>

            <div className="text-center">
              <p className="num-display text-2xl lg:text-4xl font-black tracking-tight">{mins}:{secs}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">2º Tempo</p>
            </div>

            <div className="text-center">
              <p className="text-xs lg:text-sm font-bold uppercase tracking-widest text-accent">Time Azul</p>
              <p className="num-display text-7xl lg:text-9xl font-black text-accent" style={{ textShadow: "0 0 24px oklch(0.55 0.22 260 / 0.6)" }}>{scoreB}</p>
              <button onClick={() => setScoreB(s => s + 1)} className="mt-2 inline-flex items-center gap-1 rounded-xl bg-accent/10 border border-accent/30 px-3 py-1.5 text-xs font-bold text-accent hover:bg-accent/20"><Plus className="h-3 w-3" /> Gol</button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Teams */}
      <div className="grid lg:grid-cols-2 gap-4">
        <TeamPanel name="Time Verde" color="primary" team={teamA} />
        <TeamPanel name="Time Azul" color="accent" team={teamB} />
      </div>

      <div className="flex gap-3 justify-center">
        <button className="rounded-xl glass px-5 py-3 text-sm font-bold">Definir MVP</button>
        <button className="rounded-xl bg-destructive/20 border border-destructive/40 text-destructive px-5 py-3 text-sm font-bold hover:bg-destructive/30">Encerrar Partida</button>
      </div>
    </div>
  );
}

function TeamPanel({ name, color, team }: { name: string; color: "primary" | "accent"; team: typeof players }) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-black ${color === "primary" ? "text-primary" : "text-accent"}`}>{name}</h3>
        <span className="text-xs text-muted-foreground">OVR médio {Math.round(team.reduce((a, p) => a + p.overall, 0) / team.length)}</span>
      </div>
      <div className="space-y-2">
        {team.map(p => (
          <div key={p.id} className="flex items-center gap-3 rounded-2xl glass p-2 hover:bg-white/5 cursor-pointer transition-colors group">
            <span className="num-display w-8 text-center text-xs font-black text-muted-foreground">#{p.shirt}</span>
            <img src={p.avatar} className="h-9 w-9 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{p.nick}</p>
              <p className="text-[10px] text-muted-foreground">{p.position} • OVR {p.overall}</p>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary text-xs font-black hover:bg-primary/20" title="Gol">⚽</button>
              <button className="grid h-7 w-7 place-items-center rounded-lg bg-accent/10 text-accent text-xs hover:bg-accent/20" title="Assistência">🎯</button>
              <button className="grid h-7 w-7 place-items-center rounded-lg bg-gold/10 text-gold hover:bg-gold/20" title="MVP"><Award className="h-3 w-3" /></button>
              <button className="grid h-7 w-7 place-items-center rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30" title="Cartão"><Square className="h-3 w-3 fill-current" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
