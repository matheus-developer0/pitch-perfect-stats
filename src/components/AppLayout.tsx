import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Trophy, Users, BarChart3, Calendar, User, Settings, Medal, Search, Bell } from "lucide-react";
import { motion } from "motion/react";
import { me } from "@/lib/mock-data";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/partidas", label: "Partidas", icon: Calendar },
  { to: "/ranking", label: "Ranking", icon: Trophy },
  { to: "/jogadores", label: "Jogadores", icon: Users },
  { to: "/estatisticas", label: "Estatísticas", icon: BarChart3 },
  { to: "/campeonatos", label: "Campeonatos", icon: Medal },
  { to: "/perfil", label: "Perfil", icon: User },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
];

const mobileNav = nav.slice(0, 5);

export function AppLayout() {
  const path = useRouterState({ select: s => s.location.pathname });

  return (
    <div className="dark min-h-screen text-foreground">
      {/* Sidebar - desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border/60 bg-sidebar/70 backdrop-blur-xl lg:flex">
        <div className="flex h-16 items-center gap-2 px-6 border-b border-border/60">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-neon glow-neon">
            <Trophy className="h-5 w-5 text-neon-foreground" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">EA Pelada</span>
            <span className="text-base font-bold tracking-tight">PRO CLUB</span>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map(item => {
            const active = path === item.to || (item.to !== "/" && path.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl border border-primary/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="h-4 w-4 relative" />
                <span className="relative">{item.label}</span>
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary glow-neon relative" />}
              </Link>
            );
          })}
        </nav>
        <div className="m-3 rounded-2xl glass p-3 flex items-center gap-3">
          <img src={me.avatar} alt="" className="h-10 w-10 rounded-xl object-cover ring-2 ring-primary/40" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate">{me.name}</p>
            <p className="text-[11px] text-muted-foreground">OVR {me.overall} • {me.position}</p>
          </div>
        </div>
      </aside>

      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/40 bg-background/60 px-4 backdrop-blur-xl lg:pl-72 lg:pr-8">
        <div className="flex items-center gap-2 lg:hidden">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-neon glow-neon">
            <Trophy className="h-5 w-5 text-neon-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold tracking-tight">PRO CLUB</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 glass rounded-xl px-3 py-2 text-sm text-muted-foreground w-72">
            <Search className="h-4 w-4" />
            <span>Buscar jogadores, partidas...</span>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-xl glass relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary glow-neon" />
          </button>
          <img src={me.avatar} alt="" className="h-10 w-10 rounded-xl object-cover ring-2 ring-primary/40" />
        </div>
      </header>

      <main className="lg:pl-64 pb-24 lg:pb-8">
        <div className="px-4 py-6 lg:px-8 lg:py-8 max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Bottom nav - mobile */}
      <nav className="fixed bottom-3 left-3 right-3 z-40 lg:hidden">
        <div className="glass-strong rounded-2xl px-2 py-2 flex items-center justify-around">
          {mobileNav.map(item => {
            const active = path === item.to || (item.to !== "/" && path.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {active && (
                  <motion.div layoutId="mobileActive" className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/30" />
                )}
                <Icon className="h-5 w-5 relative" />
                <span className="text-[10px] font-medium relative">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
