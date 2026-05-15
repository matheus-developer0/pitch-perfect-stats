import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Trophy, Target, Zap, Award, Activity, Goal, Shield, Users, MapPin, Clock, ArrowRight, Crown, Flame } from "lucide-react";
import { me, players, feed, matches, rankByGoals, rankByMVP, rankByOverall } from "@/lib/mock-data";
import { PlayerCard } from "@/components/PlayerCard";
import { StatCard } from "@/components/StatCard";

export const Route = createFileRoute("/")({ component: Dashboard });

function Dashboard() {
  const next = matches.find(m => m.status === "Agendada")!;
  const live = matches.find(m => m.status === "Ao Vivo");
  const topScorers = rankByGoals().slice(0, 5);
  const topMvps = rankByMVP().slice(0, 3);
  const topOverall = rankByOverall().slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero / Featured */}
      <section className="relative min-h-[400px] rounded-[2.5rem] overflow-hidden border border-white/5 bg-surface shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        
        <div className="relative h-full grid lg:grid-cols-2 items-center p-8 lg:p-12 gap-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary"
            >
              <Crown className="h-3 w-3" /> Player of the Month
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-5xl lg:text-7xl font-heading leading-none">
                Dominando a <br />
                <span className="gradient-text">Temporada</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-md font-medium leading-relaxed">
                Você subiu <span className="text-primary font-bold">+{me.trend} pontos</span> no ranking geral este mês. Continue assim para alcançar o topo da liga.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link to="/perfil" className="btn-premium">
                Ver Minha Carreira
              </Link>
              <Link to="/partidas" className="px-6 py-3 rounded-xl font-bold uppercase tracking-wider border border-white/10 hover:bg-white/5 transition-all">
                Próximos Jogos
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="hidden lg:flex justify-end"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all" />
              <PlayerCard player={me} size="xl" variant="gold" className="relative transform hover:scale-105 transition-transform duration-500 shadow-2xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats grid */}
      <section>
        <SectionHeader title="Performance Flash" subtitle="Estatísticas em tempo real" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-6">
          <StatCard label="Jogos" value={me.matches} delta={8} icon={Activity} index={0} />
          <StatCard label="Gols" value={me.goals} delta={12} icon={Goal} accent="neon" index={1} />
          <StatCard label="Assistências" value={me.assists} delta={6} icon={Target} accent="accent" index={2} />
          <StatCard label="Win Rate" value={`${Math.round((me.wins / me.matches) * 100)}%`} delta={4} icon={Flame} accent="gold" index={3} />
        </div>
      </section>

      {/* Ranking + Feed */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <SectionHeader title="Top 3 Overall" subtitle="Os melhores da liga" action={{ label: "Ver Ranking", to: "/ranking" }} />
            <div className="mt-4 grid grid-cols-3 gap-3">
              {topOverall.map((p, i) => (
                <div key={p.id} className="relative">
                  <div className="absolute -top-2 -left-2 z-20 grid h-8 w-8 place-items-center rounded-full font-black text-sm"
                    style={{
                      background: i === 0 ? "linear-gradient(135deg,#FFD86B,#C89B2A)" : i === 1 ? "linear-gradient(135deg,#E5E5E5,#9CA3AF)" : "linear-gradient(135deg,#D7935C,#8B5A2B)",
                      color: "#1a1a1a",
                    }}>
                    {i + 1}
                  </div>
                  <PlayerCard player={p} size="sm" variant={i === 0 ? "gold" : "neon"} to="/perfil" index={i} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Artilheiros" subtitle="Top 5 da temporada" action={{ label: "Ver Tudo", to: "/ranking" }} />
            <div className="mt-4 glass rounded-3xl divide-y divide-white/5 overflow-hidden">
              {topScorers.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors">
                  <span className={`num-display w-7 text-center text-lg font-black ${i === 0 ? "text-gold" : "text-muted-foreground"}`}>{i + 1}</span>
                  <img src={p.avatar} className="h-11 w-11 rounded-xl object-cover ring-2 ring-white/10" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.position} • OVR {p.overall}</p>
                  </div>
                  <div className="text-right">
                    <p className="num-display text-2xl font-black text-primary">{p.goals}</p>
                    <p className="text-[10px] text-muted-foreground tracking-widest">GOLS</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <SectionHeader title="Atividade Recente" subtitle="O que está acontecendo" />
          <div className="mt-4 glass rounded-3xl p-2 space-y-1">
            {feed.map((f, i) => (
              <motion.div key={f.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex items-start gap-3 rounded-2xl p-3 hover:bg-white/5 transition-colors">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-lg shrink-0">{f.icon}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug">{f.text}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{f.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6">
            <SectionHeader title="MVPs" />
            <div className="mt-4 space-y-2">
              {topMvps.map((p, i) => (
                <Link key={p.id} to="/perfil" className="flex items-center gap-3 glass rounded-2xl p-3 hover:bg-white/5 transition-colors">
                  <span className={`num-display w-6 text-center font-black ${i === 0 ? "text-gold" : "text-muted-foreground"}`}>{i + 1}</span>
                  <img src={p.avatar} className="h-10 w-10 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{p.nick}</p>
                    <p className="text-[11px] text-muted-foreground">{p.mvps} MVPs</p>
                  </div>
                  <Award className="h-4 w-4 text-gold" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: { label: string; to: string } }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-white/5 pb-4">
      <div>
        <h2 className="text-2xl lg:text-3xl font-heading tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1 font-medium">{subtitle}</p>}
      </div>
      {action && (
        <Link to={action.to} className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-glow-neon flex items-center gap-2 shrink-0 transition-all hover:gap-3">
          {action.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
