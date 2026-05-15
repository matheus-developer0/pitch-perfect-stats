import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { players, type Position } from "@/lib/mock-data";
import { PlayerCard } from "@/components/PlayerCard";
import { Search } from "lucide-react";

export const Route = createFileRoute("/jogadores")({ component: JogadoresPage });

function JogadoresPage() {
  const [pos, setPos] = useState<Position | "ALL">("ALL");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"overall" | "goals" | "assists">("overall");

  const filtered = players
    .filter(p => pos === "ALL" || p.position === pos)
    .filter(p => p.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (b as any)[sort] - (a as any)[sort]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Jogadores</h1>
        <p className="text-muted-foreground mt-1">{filtered.length} atletas no plantel.</p>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 glass rounded-xl px-3 py-2 flex-1 min-w-[220px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar jogador..." className="bg-transparent outline-none text-sm flex-1" />
        </div>

        <div className="flex gap-2">
          {(["ALL", "ATA", "MEI", "ZAG", "GOL"] as const).map(p => (
            <button key={p} onClick={() => setPos(p)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                pos === p ? "gradient-neon text-neon-foreground glow-neon" : "glass text-muted-foreground"
              }`}>
              {p === "ALL" ? "Todos" : p}
            </button>
          ))}
        </div>

        <select value={sort} onChange={e => setSort(e.target.value as any)} className="glass rounded-xl px-3 py-2 text-xs font-bold bg-transparent">
          <option value="overall">Overall</option>
          <option value="goals">Gols</option>
          <option value="assists">Assistências</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
        {filtered.map((p, i) => (
          <PlayerCard key={p.id} player={p} size="sm" to="/perfil" index={i} />
        ))}
      </div>
    </div>
  );
}
