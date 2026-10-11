import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ReactPlayer from "react-player";
import { Badge } from "~/components/Badge";
import type { TMDBVideo } from "~/core/lib/TMDB/types";

export type VideoModalProps = {
  isOpen: boolean;
  video: TMDBVideo | null;
  onClose: () => void;
};

export function VideoModal({ isOpen, video, onClose }: VideoModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted || !video || !video.url) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md transition-opacity"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="relative w-full max-w-4xl lg:max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <h3
              id="video-modal-title"
              className="text-base sm:text-lg font-semibold text-slate-100 truncate"
              title={video.name}
            >
              {video.name}
            </h3>
            <div className="flex items-center gap-1.5 shrink-0">
              {video.type && <Badge>{video.type}</Badge>}
              {video.official && (
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                  Oficial
                </Badge>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            aria-label="Fechar vídeo"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full aspect-video bg-black">
          <ReactPlayer
            src={video.url}
            controls={true}
            playing={true}
            width="100%"
            height="100%"
            pip={true}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
