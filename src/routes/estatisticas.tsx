import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import { performanceData, players, me } from "@/lib/mock-data";

export const Route = createFileRoute("/estatisticas")({ component: EstatPage });

function EstatPage() {
  const radar = [
    { stat: "Finalização", v: me.attrs.finishing },
    { stat: "Velocidade", v: me.attrs.pace },
    { stat: "Drible", v: me.attrs.dribble },
    { stat: "Passe", v: me.attrs.pass },
    { stat: "Defesa", v: me.attrs.defense },
    { stat: "Força", v: me.attrs.strength },
  ];
  const byPos = [
    { pos: "ATA", v: players.filter(p => p.position === "ATA").reduce((a, p) => a + p.goals, 0) },
    { pos: "MEI", v: players.filter(p => p.position === "MEI").reduce((a, p) => a + p.goals, 0) },
    { pos: "ZAG", v: players.filter(p => p.position === "ZAG").reduce((a, p) => a + p.goals, 0) },
    { pos: "GOL", v: players.filter(p => p.position === "GOL").reduce((a, p) => a + p.goals, 0) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Estatísticas</h1>
        <p className="text-muted-foreground mt-1">Análise completa de desempenho.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Evolução do Overall" subtitle="Últimos 5 meses">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.86 0.22 150)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.86 0.22 150)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="oklch(0.68 0.03 240)" fontSize={11} />
              <YAxis stroke="oklch(0.68 0.03 240)" fontSize={11} domain={[70, 90]} />
              <Tooltip contentStyle={{ background: "oklch(0.21 0.035 245)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="overall" stroke="oklch(0.86 0.22 150)" strokeWidth={3} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Gols por Mês" subtitle="Performance ofensiva">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={performanceData}>
              <XAxis dataKey="month" stroke="oklch(0.68 0.03 240)" fontSize={11} />
              <YAxis stroke="oklch(0.68 0.03 240)" fontSize={11} />
              <Tooltip contentStyle={{ background: "oklch(0.21 0.035 245)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
              <Bar dataKey="goals" fill="oklch(0.86 0.22 150)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Perfil de Atributos" subtitle="Suas qualidades técnicas">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radar}>
              <PolarGrid stroke="oklch(1 0 0 / 0.1)" />
              <PolarAngleAxis dataKey="stat" tick={{ fill: "oklch(0.68 0.03 240)", fontSize: 11 }} />
              <Radar dataKey="v" stroke="oklch(0.86 0.22 150)" fill="oklch(0.86 0.22 150)" fillOpacity={0.4} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Gols por Posição" subtitle="Distribuição da liga">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byPos} layout="vertical">
              <XAxis type="number" stroke="oklch(0.68 0.03 240)" fontSize={11} />
              <YAxis type="category" dataKey="pos" stroke="oklch(0.68 0.03 240)" fontSize={11} width={40} />
              <Tooltip contentStyle={{ background: "oklch(0.21 0.035 245)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
              <Bar dataKey="v" fill="oklch(0.55 0.22 260)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="MVPs por Mês" subtitle="Quantas vezes você foi destaque">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={performanceData}>
            <XAxis dataKey="month" stroke="oklch(0.68 0.03 240)" fontSize={11} />
            <YAxis stroke="oklch(0.68 0.03 240)" fontSize={11} />
            <Tooltip contentStyle={{ background: "oklch(0.21 0.035 245)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
            <Line type="monotone" dataKey="mvps" stroke="oklch(0.85 0.16 90)" strokeWidth={3} dot={{ fill: "oklch(0.85 0.16 90)", r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-5">
      <h3 className="font-black">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground mb-4">{subtitle}</p>}
      {children}
    </motion.div>
  );
}
