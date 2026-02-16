import { NavLink } from "react-router";

export function SwitchTrends(props: { isTodayActive: boolean }) {
  const { isTodayActive } = props;

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center px-4">
      <h3 className="text-2xl text-slate-300">Tendências</h3>
      <nav className="relative flex gap-3 px-2 py-1 bg-slate-300 text-slate-500 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 bottom-0 rounded-full bg-cyan-600 w-full z-10 transition-all ${isTodayActive ? "-translate-x-32" : "translate-x-10"}`}
        ></div>

        <NavLink
          to="?trends=day"
          className={`rounded-full bg-transparent z-10 ${isTodayActive && "text-slate-200"}`}
        >
          Hoje
        </NavLink>
        <NavLink
          to="?trends=week"
          className={`whitespace-nowrap rounded-full bg-transparent z-10 ${!isTodayActive && "text-slate-200"}`}
        >
          Nesta semana
        </NavLink>
      </nav>
    </div>
  );
}
