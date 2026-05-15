import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { matches, players, type Match } from "@/lib/mock-data";
import { Plus, MapPin, Clock, Users, Lock, Globe, Calendar, Play, X } from "lucide-react";

export const Route = createFileRoute("/partidas")({ component: PartidasPage });

function PartidasPage() {
  const [tab, setTab] = useState<"todas" | "agendadas" | "aovivo" | "finalizadas">("todas");
  const [showModal, setShowModal] = useState(false);

  const filtered = matches.filter(m => {
    if (tab === "todas") return true;
    if (tab === "agendadas") return m.status === "Agendada";
    if (tab === "aovivo") return m.status === "Ao Vivo";
    return m.status === "Finalizada";
  });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Partidas</h1>
          <p className="text-muted-foreground mt-1">Organize peladas, confirme presença e jogue.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 rounded-xl gradient-neon px-4 py-2.5 text-sm font-bold text-neon-foreground glow-neon hover:scale-105 transition-transform">
          <Plus className="h-4 w-4" /> Criar Partida
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {([
          ["todas", "Todas"], ["aovivo", "Ao Vivo"], ["agendadas", "Agendadas"], ["finalizadas", "Finalizadas"],
        ] as const).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k as any)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              tab === k ? "gradient-neon text-neon-foreground glow-neon" : "glass text-muted-foreground hover:text-foreground"
            }`}>
            {l}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
      </div>

      {showModal && <CreateMatchModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function MatchCard({ match, index }: { match: Match; index: number }) {
  const isLive = match.status === "Ao Vivo";
  const isFinished = match.status === "Finalizada";

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="relative glass rounded-3xl p-5 overflow-hidden group">
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors" />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{match.type}</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
              {match.privacy === "Privada" ? <Lock className="h-2.5 w-2.5" /> : <Globe className="h-2.5 w-2.5" />} {match.privacy}
            </span>
          </div>
          <h3 className="text-lg font-black">{match.name}</h3>
        </div>
        {isLive && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/20 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-destructive">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" /> Ao Vivo
          </span>
        )}
        {isFinished && (
          <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Final</span>
        )}
      </div>

      {(isLive || isFinished) && (
        <div className="relative mt-4 glass-strong rounded-2xl p-4 flex items-center justify-around">
          <div className="text-center flex-1">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{match.teamA}</p>
            <p className="num-display text-4xl font-black text-primary">{match.scoreA}</p>
          </div>
          <div className="text-xs text-muted-foreground font-bold">VS</div>
          <div className="text-center flex-1">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{match.teamB}</p>
            <p className="num-display text-4xl font-black text-accent">{match.scoreB}</p>
          </div>
        </div>
      )}

      <div className="relative mt-4 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {match.location}</div>
        <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {new Date(match.date).toLocaleDateString("pt-BR")} • {match.time}</div>
      </div>

      <div className="relative mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {players.slice(0, 4).map(p => (
              <img key={p.id} src={p.avatar} className="h-7 w-7 rounded-full border-2 border-background object-cover" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground"><Users className="inline h-3 w-3 mr-1" />{match.confirmed}/{match.capacity}</span>
        </div>

        {isLive ? (
          <Link to="/partidas/$id" params={{ id: match.id }} className="inline-flex items-center gap-1.5 rounded-xl bg-destructive px-3 py-2 text-xs font-bold text-destructive-foreground hover:scale-105 transition-transform">
            <Play className="h-3 w-3 fill-current" /> Entrar
          </Link>
        ) : isFinished ? (
          <button className="rounded-xl glass px-3 py-2 text-xs font-bold">Súmula</button>
        ) : (
          <button className="rounded-xl gradient-neon text-neon-foreground px-3 py-2 text-xs font-bold hover:scale-105 transition-transform">Confirmar</button>
        )}
      </div>
    </motion.div>
  );
}

function CreateMatchModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={e => e.stopPropagation()}
        className="glass-strong rounded-3xl p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10"><X className="h-4 w-4" /></button>
        <h2 className="text-2xl font-black">Nova Partida</h2>
        <p className="text-sm text-muted-foreground">Configure sua próxima pelada.</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Field label="Nome" full><input className="field" placeholder="Pelada de Quarta" /></Field>
          <Field label="Local" full><input className="field" placeholder="Arena Champions" /></Field>
          <Field label="Data"><input type="date" className="field" /></Field>
          <Field label="Horário"><input type="time" className="field" /></Field>
          <Field label="Duração"><input className="field" placeholder="90 min" /></Field>
          <Field label="Limite"><input className="field" placeholder="14" /></Field>
          <Field label="Tipo">
            <select className="field"><option>Society</option><option>Futsal</option><option>Campo</option></select>
          </Field>
          <Field label="Modo">
            <select className="field"><option>Pública</option><option>Privada</option></select>
          </Field>
        </div>

        <button onClick={onClose} className="mt-6 w-full rounded-xl gradient-neon py-3 text-sm font-bold text-neon-foreground glow-neon hover:scale-[1.02] transition-transform">Criar Partida</button>

        <style>{`.field { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:10px 12px; font-size:14px; color:inherit; outline:none; }
        .field:focus { border-color: oklch(0.86 0.22 150 / 0.5); box-shadow: 0 0 0 3px oklch(0.86 0.22 150 / 0.15); }`}</style>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`space-y-1.5 ${full ? "col-span-2" : ""}`}>
      <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
