"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, X, ZoomIn, ZoomOut, Download, ExternalLink, FileText, Image as ImageIcon } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string | null;
  title?: string;
  alt?: string;
  allowDownload?: boolean;
}

export default function ImageModal({
  isOpen,
  onClose,
  src,
  title = "Pratinjau Berkas",
  alt = "Gambar Berkas",
  allowDownload = true,
}: ImageModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    const handleCloseEvent = () => {
      if (isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("close-child-modals", handleCloseEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("close-child-modals", handleCloseEvent);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    setIsZoomed(false);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !src) return null;

  const isPdf = src.toLowerCase().endsWith(".pdf") || src.toLowerCase().includes(".pdf?");

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-stretch sm:items-center justify-center p-0 sm:p-6 animate-fadeIn transition-all duration-300"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="bg-slate-900 border-0 sm:border border-slate-700/80 w-full max-w-5xl h-[100dvh] sm:h-auto sm:max-h-[92dvh] rounded-none sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 bg-slate-950/90 border-b border-slate-800/80 z-10 shrink-0">
          <div className="flex items-center gap-3 truncate pr-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              {isPdf ? <FileText className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
            </div>
            <div className="truncate">
              <h3 className="text-sm sm:text-base font-extrabold text-white truncate">{title}</h3>
              <p className="text-[11px] text-slate-400 truncate">
                {isPdf ? "Dokumen PDF" : "Berkas Gambar"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isPdf && (
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-slate-700/50 hidden sm:flex items-center gap-1.5 text-xs font-semibold"
                title={isZoomed ? "Perkecil Ukuran" : "Perbesar Ukuran"}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                <span className="hidden md:inline">{isZoomed ? "Zoom Out" : "Zoom In"}</span>
              </button>
            )}

            {allowDownload && (
              <>
                <a
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-slate-700/50 flex items-center gap-1.5 text-xs font-semibold"
                  title="Buka di Tab Baru"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Tab Baru</span>
                </a>

                <a
                  href={src}
                  download
                  className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold shadow-md shadow-emerald-600/20"
                  title="Unduh Berkas"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Unduh</span>
                </a>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-2 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-xl transition-all ml-1 border border-slate-700/50 flex items-center gap-1.5 text-xs font-bold"
              title="Tutup (ESC)"
              aria-label="Kembali dan tutup pratinjau"
            >
              <ArrowLeft className="w-4 h-4 sm:hidden" />
              <span className="sm:hidden">Kembali</span>
              <X className="hidden sm:block w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-auto bg-slate-950 p-2 sm:p-6 flex items-center justify-center relative select-none">
          {isPdf ? (
            <iframe
              src={src}
              className="w-full h-full min-h-[70dvh] sm:h-[68dvh] sm:min-h-0 rounded-xl sm:rounded-2xl border border-slate-800 shadow-inner"
              title={title}
            />
          ) : (
            <div
              className={`relative transition-all duration-300 flex items-center justify-center select-none ${
                isZoomed ? "w-full min-h-full cursor-zoom-out" : "w-full h-full max-w-full cursor-zoom-in"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              onContextMenu={(e) => {
                if (!allowDownload) e.preventDefault();
              }}
            >
              {/* Standard img tag for optimal responsive view within modal */}
              {/* eslint-disable-next-html-element-for-img */}
              <img
                src={src}
                alt={alt}
                draggable={allowDownload}
                onContextMenu={(e) => {
                  if (!allowDownload) e.preventDefault();
                }}
                className={`max-w-full rounded-xl sm:rounded-2xl object-contain shadow-2xl border border-slate-800/60 max-h-[calc(100dvh-5rem)] sm:max-h-[72dvh] transition-transform duration-200 select-none ${
                  isZoomed ? "scale-125 my-8 max-h-none" : "scale-100"
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
