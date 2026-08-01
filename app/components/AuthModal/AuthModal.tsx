import { LogIn, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import GoogleAuthButton from "../GoogleAuthButton/GoogleAuthButton";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-center flex flex-col items-center">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/60 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 mb-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
          <LogIn className="w-7 h-7" />
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          Faça login para favoritar
        </h3>
        <p className="text-slate-400 text-sm md:text-base mb-6 leading-relaxed">
          Sua lista de favoritos é salva na sua conta para que você possa
          acessá-la em qualquer dispositivo.
        </p>

        <div className="w-full flex justify-center">
          <GoogleAuthButton />
        </div>
      </div>
    </div>,
    document.body,
  );
}
