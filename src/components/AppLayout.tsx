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
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/5 bg-sidebar/80 backdrop-blur-2xl lg:flex">
        <div className="flex h-20 items-center gap-3 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 rotate-3">
            <Trophy className="h-6 w-6 text-white -rotate-3" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">Premium</span>
            <span className="font-heading text-xl tracking-tight">Pitch Stats</span>
          </div>
        </div>
        <nav className="flex-1 space-y-1.5 p-4">
          {nav.map(item => {
            const active = path === item.to || (item.to !== "/" && path.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold tracking-wide transition-all ${
                  active
                    ? "bg-white/5 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-y-1 left-0 w-1 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`h-5 w-5 relative transition-colors ${active ? "text-primary" : "group-hover:text-foreground"}`} />
                <span className="relative uppercase text-[12px]">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="m-4 rounded-2xl glass p-4 flex items-center gap-3 border-white/5">
          <div className="relative">
            <img src={me.avatar} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-primary" />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-primary border-2 border-sidebar flex items-center justify-center text-[8px] font-bold text-white">
              {me.overall}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold truncate tracking-tight">{me.name}</p>
            <p className="text-[10px] text-muted-foreground uppercase font-black">{me.position}</p>
          </div>
        </div>
      </aside>

      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-white/5 bg-background/50 px-4 backdrop-blur-2xl lg:pl-72 lg:pr-8">
        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary rotate-3">
            <Trophy className="h-6 w-6 text-white -rotate-3" strokeWidth={2.5} />
          </div>
          <span className="font-heading text-lg tracking-tight">Pitch Stats</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-muted-foreground w-80 focus-within:ring-2 ring-primary/20 transition-all">
            <Search className="h-4 w-4" />
            <span className="font-medium">Procurar tudo...</span>
          </div>
          <button className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors relative group">
            <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
            <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary" />
          </button>
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
