export type Position = "ATA" | "MEI" | "ZAG" | "GOL";

export interface Player {
  id: string;
  name: string;
  nick: string;
  avatar: string;
  position: Position;
  secondary: Position[];
  overall: number;
  overallByPos: Record<Position, number>;
  shirt: number;
  foot: "Destro" | "Canhoto";
  goals: number;
  assists: number;
  matches: number;
  wins: number;
  losses: number;
  draws: number;
  mvps: number;
  cleanSheets: number;
  streak: number;
  attrs: {
    finishing: number;
    pace: number;
    dribble: number;
    pass: number;
    vision: number;
    control: number;
    defense: number;
    strength: number;
    reflex: number;
    positioning: number;
  };
  trend: number; // overall delta
}

const FIRST = ["João", "Carlos", "Pedro", "Lucas", "Mateus", "Rafael", "Gabriel", "Thiago", "Bruno", "Felipe", "Diego", "André", "Vinícius", "Rodrigo", "Marcelo", "Ricardo", "Henrique", "Gustavo", "Fernando", "Eduardo", "Caio", "Igor", "Davi", "Murilo", "Leonardo"];
const LAST = ["Silva", "Santos", "Oliveira", "Souza", "Costa", "Ferreira", "Alves", "Pereira", "Lima", "Gomes", "Ribeiro", "Carvalho", "Almeida", "Nunes", "Mendes"];
const POS: Position[] = ["ATA", "MEI", "ZAG", "GOL"];

function rng(seed: number) { return () => (seed = (seed * 9301 + 49297) % 233280) / 233280; }
const r = rng(42);
const pick = <T,>(arr: T[]) => arr[Math.floor(r() * arr.length)];
const range = (a: number, b: number) => Math.floor(r() * (b - a + 1)) + a;

export const players: Player[] = Array.from({ length: 24 }, (_, i) => {
  const first = FIRST[i % FIRST.length];
  const last = pick(LAST);
  const pos = i < 4 ? "GOL" : pick(POS);
  const overall = range(62, 92);
  const matches = range(20, 80);
  const goals = pos === "GOL" ? range(0, 2) : range(5, 60);
  const wins = Math.floor(matches * (r() * 0.4 + 0.35));
  const draws = Math.floor(matches * (r() * 0.15 + 0.05));
  return {
    id: `p${i + 1}`,
    name: `${first} ${last}`,
    nick: first,
    avatar: `https://i.pravatar.cc/300?img=${(i * 3 + 5) % 70 + 1}`,
    position: pos,
    secondary: [pick(POS.filter(p => p !== pos))],
    overall,
    overallByPos: {
      ATA: pos === "ATA" ? overall : Math.max(50, overall - range(8, 20)),
      MEI: pos === "MEI" ? overall : Math.max(50, overall - range(6, 18)),
      ZAG: pos === "ZAG" ? overall : Math.max(50, overall - range(8, 20)),
      GOL: pos === "GOL" ? overall : Math.max(45, overall - range(15, 30)),
    },
    shirt: range(1, 99),
    foot: r() > 0.25 ? "Destro" : "Canhoto",
    goals,
    assists: pos === "GOL" ? 0 : range(2, 35),
    matches,
    wins,
    draws,
    losses: matches - wins - draws,
    mvps: range(0, 12),
    cleanSheets: pos === "GOL" ? range(2, 18) : range(0, 5),
    streak: range(0, 7),
    attrs: {
      finishing: range(50, 95),
      pace: range(55, 95),
      dribble: range(50, 92),
      pass: range(55, 92),
      vision: range(50, 90),
      control: range(55, 92),
      defense: range(45, 92),
      strength: range(55, 90),
      reflex: range(45, 95),
      positioning: range(50, 92),
    },
    trend: range(-2, 4),
  };
});

export const me = players[0];

export interface Match {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  type: "Society" | "Futsal" | "Campo";
  status: "Agendada" | "Ao Vivo" | "Finalizada";
  confirmed: number;
  capacity: number;
  privacy: "Pública" | "Privada";
  scoreA?: number;
  scoreB?: number;
  teamA?: string;
  teamB?: string;
}

export const matches: Match[] = [
  { id: "m1", name: "Pelada de Quarta", date: "2026-05-20", time: "20:00", location: "Arena Champions", type: "Society", status: "Agendada", confirmed: 14, capacity: 16, privacy: "Pública" },
  { id: "m2", name: "Clássico do Bairro", date: "2026-05-22", time: "19:30", location: "Quadra Central", type: "Futsal", status: "Agendada", confirmed: 8, capacity: 10, privacy: "Privada" },
  { id: "m3", name: "Racha do Sábado", date: "2026-05-17", time: "16:00", location: "Campo do Léo", type: "Campo", status: "Ao Vivo", confirmed: 22, capacity: 22, privacy: "Pública", scoreA: 3, scoreB: 2, teamA: "Time Verde", teamB: "Time Azul" },
  { id: "m4", name: "Liga dos Amigos", date: "2026-05-10", time: "20:00", location: "Arena Champions", type: "Society", status: "Finalizada", confirmed: 14, capacity: 14, privacy: "Pública", scoreA: 5, scoreB: 2, teamA: "Time Verde", teamB: "Time Azul" },
  { id: "m5", name: "Pelada Premium", date: "2026-05-08", time: "21:00", location: "Soccer Hub", type: "Society", status: "Finalizada", confirmed: 16, capacity: 16, privacy: "Privada", scoreA: 4, scoreB: 4, teamA: "Time Verde", teamB: "Time Azul" },
  { id: "m6", name: "Quinta Maluca", date: "2026-05-05", time: "20:30", location: "Quadra Central", type: "Futsal", status: "Finalizada", confirmed: 10, capacity: 10, privacy: "Pública", scoreA: 6, scoreB: 3, teamA: "Time Verde", teamB: "Time Azul" },
];

export const feed = [
  { id: 1, type: "goal", text: "João Silva marcou 4 gols", time: "há 2h", icon: "⚽" },
  { id: 2, type: "mvp", text: "Carlos Santos virou MVP da rodada", time: "há 4h", icon: "🏆" },
  { id: 3, type: "level", text: "Pedro Oliveira subiu para overall 82", time: "há 6h", icon: "📈" },
  { id: 4, type: "match", text: "Time Verde venceu por 5x2", time: "ontem", icon: "🔥" },
  { id: 5, type: "streak", text: "Lucas atingiu 5 vitórias seguidas", time: "ontem", icon: "⚡" },
  { id: 6, type: "clean", text: "Mateus fechou o gol — clean sheet", time: "2d", icon: "🧤" },
];

export const performanceData = [
  { month: "Jan", overall: 76, goals: 4, mvps: 1 },
  { month: "Fev", overall: 77, goals: 6, mvps: 2 },
  { month: "Mar", overall: 79, goals: 5, mvps: 1 },
  { month: "Abr", overall: 81, goals: 8, mvps: 3 },
  { month: "Mai", overall: 84, goals: 11, mvps: 4 },
];

export const championships = [
  { id: "c1", name: "Liga Champions 2026", format: "Pontos Corridos", teams: 8, round: "Rodada 6/14", status: "Em andamento" },
  { id: "c2", name: "Copa do Bairro", format: "Mata-Mata", teams: 16, round: "Quartas", status: "Em andamento" },
  { id: "c3", name: "Torneio de Verão", format: "Mata-Mata", teams: 8, round: "Final", status: "Finalizado" },
];

export const standings = [
  { pos: 1, team: "Time Verde", p: 18, j: 6, v: 6, e: 0, d: 0, gp: 24, gc: 8 },
  { pos: 2, team: "Time Azul", p: 13, j: 6, v: 4, e: 1, d: 1, gp: 18, gc: 11 },
  { pos: 3, team: "Time Vermelho", p: 10, j: 6, v: 3, e: 1, d: 2, gp: 14, gc: 12 },
  { pos: 4, team: "Time Amarelo", p: 7, j: 6, v: 2, e: 1, d: 3, gp: 9, gc: 13 },
  { pos: 5, team: "Time Preto", p: 4, j: 6, v: 1, e: 1, d: 4, gp: 7, gc: 16 },
  { pos: 6, team: "Time Branco", p: 1, j: 6, v: 0, e: 1, d: 5, gp: 5, gc: 17 },
];

export function rankByGoals() { return [...players].sort((a, b) => b.goals - a.goals); }
export function rankByAssists() { return [...players].sort((a, b) => b.assists - a.assists); }
export function rankByMVP() { return [...players].sort((a, b) => b.mvps - a.mvps); }
export function rankByOverall() { return [...players].sort((a, b) => b.overall - a.overall); }
export function rankByCleanSheets() { return [...players].filter(p => p.position === "GOL").sort((a, b) => b.cleanSheets - a.cleanSheets); }
export function rankByWinRate() {
  return [...players].sort((a, b) => (b.wins / b.matches) - (a.wins / a.matches));
}
