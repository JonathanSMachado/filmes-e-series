import { CalendarDays, Flame } from "lucide-react";
import { NavLink } from "react-router";

export function SwitchTrends(props: { isTodayActive: boolean }) {
  const { isTodayActive } = props;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 border-b border-slate-800/60 pb-4">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
          <Flame className="w-5 h-5 fill-cyan-400/20" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            Em Tendência
          </h3>
          <p className="text-xs text-slate-400">
            Os títulos mais populares assistidos no momento
          </p>
        </div>
      </div>

      <nav className="inline-flex p-1 rounded-full bg-slate-900/90 border border-slate-800/80 backdrop-blur-md shadow-inner text-sm font-medium">
        <NavLink
          to="?trends=day"
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-300 ${
            isTodayActive
              ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-semibold shadow-md shadow-cyan-500/25"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          Hoje
        </NavLink>
        <NavLink
          to="?trends=week"
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-300 ${
            !isTodayActive
              ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-semibold shadow-md shadow-cyan-500/25"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          Nesta semana
        </NavLink>
      </nav>
    </div>
  );
}
