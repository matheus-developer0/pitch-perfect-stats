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
    <div className="space-y-8">
      {/* Hero */}
      <section className="grid lg:grid-cols-[auto_1fr] gap-6 items-stretch">
        <PlayerCard player={me} size="xl" variant="gold" to="/perfil" />

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-strong rounded-3xl p-6 lg:p-8 relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                <Crown className="h-3 w-3" /> Sua Carreira
              </span>
              <h1 className="mt-3 text-3xl lg:text-5xl font-black tracking-tight">
                Bem-vindo de volta, <span className="text-primary text-glow-neon">{me.nick}</span>
              </h1>
              <p className="mt-2 text-muted-foreground">Você está em uma sequência de <span className="text-primary font-bold">{me.streak} vitórias</span> consecutivas. Continue dominando.</p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { l: "OVERALL", v: me.overall, sub: `+${me.trend} no mês`, c: "text-gold" },
                  { l: "GOLS", v: me.goals, sub: "Temporada", c: "text-primary" },
                  { l: "ASSIST.", v: me.assists, sub: "Temporada", c: "text-accent" },
                  { l: "RANKING", v: `#${rankByOverall().findIndex(p => p.id === me.id) + 1}`, sub: "Geral", c: "text-foreground" },
                ].map((s, i) => (
                  <motion.div key={s.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="glass rounded-2xl p-3 text-center">
                    <p className="text-[10px] tracking-widest text-muted-foreground font-semibold">{s.l}</p>
                    <p className={`num-display text-3xl font-black ${s.c}`}>{s.v}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{s.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Next match */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-5 lg:p-6 relative overflow-hidden"
          >
            {live && <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-destructive/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-destructive"><span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" /> Ao Vivo</span>}
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold">Próxima Partida</p>
            <h3 className="mt-1 text-2xl font-black">{next.name}</h3>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {next.location}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {new Date(next.date).toLocaleDateString("pt-BR")} • {next.time}</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {next.confirmed}/{next.capacity} confirmados</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {players.slice(0, 6).map(p => (
                  <img key={p.id} src={p.avatar} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" />
                ))}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 border-2 border-background text-[10px] font-bold">+{next.confirmed - 6}</span>
              </div>
              <Link to="/partidas" className="ml-auto inline-flex items-center gap-2 rounded-xl gradient-neon px-4 py-2.5 text-sm font-bold text-neon-foreground glow-neon hover:scale-105 transition-transform">
                Entrar na Partida <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats grid */}
      <section>
        <SectionHeader title="Estatísticas da Temporada" subtitle="Sua evolução em tempo real" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 mt-4">
          <StatCard label="Jogos" value={me.matches} delta={8} icon={Activity} index={0} />
          <StatCard label="Gols" value={me.goals} delta={12} icon={Goal} accent="neon" index={1} />
          <StatCard label="Assistências" value={me.assists} delta={6} icon={Target} accent="accent" index={2} />
          <StatCard label="Vitórias" value={me.wins} delta={9} icon={Trophy} accent="gold" index={3} />
          <StatCard label="Derrotas" value={me.losses} delta={-3} icon={Shield} accent="destructive" index={4} />
          <StatCard label="Win Rate" value={`${Math.round((me.wins / me.matches) * 100)}%`} delta={4} icon={Flame} accent="gold" index={5} />
          <StatCard label="MVPs" value={me.mvps} delta={20} icon={Award} accent="gold" index={6} />
          <StatCard label="Sequência" value={`${me.streak}V`} delta={15} icon={Zap} accent="neon" index={7} />
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
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl lg:text-2xl font-black tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <Link to={action.to} className="text-xs font-bold uppercase tracking-widest text-primary hover:text-glow-neon flex items-center gap-1 shrink-0">
          {action.label} <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}
