import { NavLink } from "@remix-run/react";

export function SwitchTrends(props: { isTodayActive: boolean }) {
  const { isTodayActive } = props;

  return (
    <div className="px-12 py-5 mb-10 flex flex-col md:flex-row items-center">
      <h3 className="text-2xl text-slate-300">Tendências</h3>
      <nav className="relative mt-2 md:mt-0 md:ml-10 flex bg-slate-300 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 bottom-0 rounded-full bg-cyan-500 w-full z-10 transition-all ease-in-out duration-200 ${
            isTodayActive ? "-translate-x-32" : "translate-x-16"
          }`}
        ></div>
        <NavLink
          to="?tendencias=hoje"
          className={`px-4 py-1 rounded-full bg-transparent z-10 ${
            isTodayActive && "text-slate-200"
          }`}
        >
          Hoje
        </NavLink>
        <NavLink
          to="?tendencias=semana"
          className={`px-4 py-1 whitespace-nowrap rounded-full bg-transparent z-10 ${
            !isTodayActive && "text-slate-200"
          }`}
        >
          Nesta semana
        </NavLink>
      </nav>
    </div>
  );
}
