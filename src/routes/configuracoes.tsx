import { createFileRoute } from "@tanstack/react-router";
import { Bell, Moon, Globe, Shield, User, Trophy } from "lucide-react";

export const Route = createFileRoute("/configuracoes")({ component: ConfigPage });

function ConfigPage() {
  const sections = [
    { icon: User, title: "Conta", desc: "Nome, foto, número da camisa" },
    { icon: Bell, title: "Notificações", desc: "Partidas, MVPs, atualizações de overall" },
    { icon: Trophy, title: "Preferências de Jogo", desc: "Posição principal, pé dominante" },
    { icon: Moon, title: "Aparência", desc: "Tema escuro (ativado)" },
    { icon: Globe, title: "Idioma", desc: "Português (Brasil)" },
    { icon: Shield, title: "Privacidade", desc: "Visibilidade do perfil e estatísticas" },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-1">Personalize sua experiência.</p>
      </div>

      <div className="space-y-3">
        {sections.map(s => (
          <button key={s.title} className="w-full glass rounded-2xl p-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold">{s.title}</p>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
            <span className="text-muted-foreground">›</span>
          </button>
        ))}
      </div>

      <button className="w-full rounded-xl bg-destructive/20 border border-destructive/40 text-destructive px-4 py-3 text-sm font-bold hover:bg-destructive/30 transition-colors">
        Sair da Conta
      </button>
    </div>
  );
}
