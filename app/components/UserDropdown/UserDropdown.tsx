import { User as UserIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "~/context/AuthContext";
import { LogoutButton } from "../LogoutButton";

export function UserDropdown() {
  const { userProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!userProfile) return null;

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center p-0.5 rounded-full border-2 border-transparent hover:border-cyan-500 focus:border-cyan-500 transition-all duration-200 outline-none group"
        aria-label="Menu do usuário"
      >
        {userProfile.avatarUrl ? (
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            className="w-9 h-9 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700">
            <UserIcon className="w-5 h-5" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2 border-b border-slate-800 mb-1">
            <p className="text-sm font-semibold text-white truncate">
              {userProfile.name}
            </p>
            {userProfile.email && (
              <p className="text-xs text-slate-400 truncate">
                {userProfile.email}
              </p>
            )}
          </div>

          <div onClick={() => setIsOpen(false)}>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
