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
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl lg:text-5xl font-heading tracking-tight leading-none">Partidas</h1>
          <p className="text-muted-foreground mt-2 font-medium">Organize, jogue e acompanhe seus resultados.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-premium flex items-center gap-2">
          <Plus className="h-5 w-5" /> Criar Partida
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {([
          ["todas", "Todas"], ["aovivo", "Ao Vivo"], ["agendadas", "Agendadas"], ["finalizadas", "Finalizadas"],
        ] as const).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k as any)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              tab === k ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground border border-white/5"
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="sport-card rounded-[2rem] p-6 group cursor-default">
      
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{match.type}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{match.privacy}</span>
          </div>
          <h3 className="text-2xl font-heading leading-tight group-hover:text-primary transition-colors">{match.name}</h3>
        </div>
        {isLive && (
          <div className="flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 animate-pulse">
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Ao Vivo</span>
          </div>
        )}
      </div>

      {(isLive || isFinished) && (
        <div className="mt-6 flex items-center justify-between gap-4 py-4 border-y border-white/5">
          <div className="text-center flex-1">
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">{match.teamA}</p>
            <p className="num-display text-5xl font-black text-foreground">{match.scoreA}</p>
          </div>
          <div className="text-xs font-black text-muted-foreground bg-white/5 rounded-lg px-2 py-1 italic">VS</div>
          <div className="text-center flex-1">
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">{match.teamB}</p>
            <p className="num-display text-5xl font-black text-foreground">{match.scoreB}</p>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" /> 
          <span className="uppercase tracking-wide">{match.location}</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" /> 
          <span className="uppercase tracking-wide">{new Date(match.date).toLocaleDateString("pt-BR")} • {match.time}</span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {players.slice(0, 4).map(p => (
              <img key={p.id} src={p.avatar} className="h-8 w-8 rounded-full border-2 border-surface object-cover shadow-xl" />
            ))}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{match.confirmed}/{match.capacity}</span>
        </div>

        {isLive ? (
          <Link to="/partidas/$id" params={{ id: match.id }} className="bg-accent text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
            Entrar
          </Link>
        ) : isFinished ? (
          <button className="bg-white/5 text-foreground px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5">
            Súmula
          </button>
        ) : (
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            Confirmar
          </button>
        )}
      </div>
    </motion.div>
  );
}

function CreateMatchModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 grid place-items-center bg-background/90 backdrop-blur-md p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} onClick={e => e.stopPropagation()}
        className="bg-surface rounded-[2.5rem] p-8 w-full max-w-xl relative border border-white/5 shadow-3xl">
        <button onClick={onClose} className="absolute top-6 right-6 grid h-10 w-10 place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"><X className="h-5 w-5" /></button>
        
        <h2 className="text-4xl font-heading tracking-tight leading-none">Agendar Pelada</h2>
        <p className="text-sm text-muted-foreground mt-2 font-medium">Preencha os detalhes do próximo confronto.</p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <Field label="Título do Match" full><input className="field" placeholder="Ex: Pelada dos Amigos" /></Field>
          <Field label="Localização" full><input className="field" placeholder="Ex: Arena Champions" /></Field>
          <Field label="Data"><input type="date" className="field" /></Field>
          <Field label="Horário Inicial"><input type="time" className="field" /></Field>
          <Field label="Máx. Jogadores"><input className="field" placeholder="14" /></Field>
          <Field label="Formato">
            <select className="field"><option>Society</option><option>Futsal</option><option>Campo</option></select>
          </Field>
        </div>

        <button onClick={onClose} className="mt-8 w-full btn-premium py-4">Confirmar Agendamento</button>

        <style>{`.field { width:100%; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); border-radius:16px; padding:12px 16px; font-size:14px; color:inherit; outline:none; transition: all 0.2s; font-weight: 500; }
        .field:focus { border-color: var(--color-primary); background:rgba(255,255,255,0.06); }`}</style>
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
