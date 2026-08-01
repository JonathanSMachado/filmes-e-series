import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { supabase } from "~/utils/supabase.client";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="group flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-rose-400 hover:bg-slate-800/80 rounded-lg transition-colors w-full text-left"
      title="Sair da conta"
    >
      <LogOut className="w-4 h-4 text-rose-400/80 group-hover:text-rose-400 shrink-0 transition-colors" />
      <span>Sair da conta</span>
    </button>
  );
}
