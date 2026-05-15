import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { me, players } from "@/lib/mock-data";
import { PlayerCard } from "@/components/PlayerCard";
import { Share2, Crown, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/perfil")({ component: PerfilPage });

function PerfilPage() {
  const p = me;
  const positions = [["ATA", p.overallByPos.ATA], ["MEI", p.overallByPos.MEI], ["ZAG", p.overallByPos.ZAG], ["GOL", p.overallByPos.GOL]] as const;

  const attrGroups = [
    { l: "Atacante", items: [["Finalização", p.attrs.finishing], ["Velocidade", p.attrs.pace], ["Drible", p.attrs.dribble]] },
    { l: "Meio-Campo", items: [["Passe", p.attrs.pass], ["Visão", p.attrs.vision], ["Controle", p.attrs.control]] },
    { l: "Defesa", items: [["Marcação", p.attrs.defense], ["Força", p.attrs.strength]] },
    { l: "Goleiro", items: [["Reflexo", p.attrs.reflex], ["Posicionamento", p.attrs.positioning]] },
  ] as const;

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
        <PlayerCard player={p} size="xl" variant="gold" />

        <div className="space-y-4">
          <div className="glass-strong rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                  <Crown className="h-3 w-3" /> Lenda da Liga
                </span>
                <h1 className="mt-2 text-4xl lg:text-5xl font-black tracking-tight">{p.name}</h1>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                  <span><b className="text-foreground">Posição:</b> {p.position}</span>
                  <span><b className="text-foreground">Secundárias:</b> {p.secondary.join(", ")}</span>
                  <span><b className="text-foreground">Pé:</b> {p.foot}</span>
                  <span><b className="text-foreground">Camisa:</b> #{p.shirt}</span>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl glass px-3 py-2 text-xs font-bold"><Share2 className="h-3 w-3" /> Compartilhar</button>
            </div>
          </div>

          {/* Overall por posição */}
          <div className="glass rounded-3xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Overall por Posição</h3>
              <span className="inline-flex items-center gap-1 text-xs text-primary font-bold"><TrendingUp className="h-3 w-3" /> +{p.trend} este mês</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {positions.map(([pos, val]) => (
                <div key={pos} className={`glass rounded-2xl p-3 text-center border ${pos === p.position ? "border-primary/50 glow-neon" : "border-transparent"}`}>
                  <p className="text-[10px] font-bold tracking-widest text-muted-foreground">{pos}</p>
                  <p className={`num-display text-3xl font-black ${pos === p.position ? "text-primary" : ""}`}>{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              ["Jogos", p.matches], ["Gols", p.goals], ["Assist.", p.assists],
              ["Vitórias", p.wins], ["Derrotas", p.losses], ["MVPs", p.mvps],
            ].map(([l, v]) => (
              <div key={l as string} className="glass rounded-2xl p-3 text-center">
                <p className="num-display text-2xl font-black">{v}</p>
                <p className="text-[10px] tracking-widest text-muted-foreground uppercase">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attributes */}
      <section>
        <h2 className="text-2xl font-black tracking-tight">Atributos</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {attrGroups.map(g => (
            <div key={g.l} className="glass rounded-3xl p-5">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-3">{g.l}</h3>
              <div className="space-y-3">
                {g.items.map(([k, v]) => (
                  <div key={k as string}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold">{k}</span>
                      <span className="num-display text-sm font-black text-primary">{v}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full gradient-neon glow-neon rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Histórico */}
      <section>
        <h2 className="text-2xl font-black tracking-tight">Últimos Adversários</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-4 justify-items-center">
          {players.slice(2, 8).map((pl, i) => (
            <PlayerCard key={pl.id} player={pl} size="sm" to="/perfil" index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
