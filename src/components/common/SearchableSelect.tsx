"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check, X } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  searchPlaceholder?: string;
  variant?: "dark" | "light";
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Pilih salah satu...",
  className = "",
  disabled = false,
  searchPlaceholder = "Cari opsi...",
  variant = "dark",
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opt.sublabel && opt.sublabel.toLowerCase().includes(searchTerm.toLowerCase())) ||
      opt.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const isLight = variant === "light";

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3.5 border rounded-xl text-xs text-left font-bold flex items-center justify-between transition-all gap-2 ${
          isLight
            ? "bg-white border-slate-300 text-slate-800 hover:border-emerald-500"
            : "bg-slate-950 border-slate-800 text-white hover:border-slate-700"
        } ${
          isOpen
            ? "border-emerald-500 ring-2 ring-emerald-500/20"
            : ""
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`truncate ${
            selectedOption
              ? isLight
                ? "text-slate-900"
                : "text-white"
              : isLight
              ? "text-slate-400 font-normal"
              : "text-slate-500 font-normal"
          }`}
        >
          {selectedOption ? (
            <span className="flex items-center gap-1.5 truncate">
              <span className="truncate">{selectedOption.label}</span>
              {selectedOption.sublabel && (
                <span
                  className={`text-[10px] font-normal truncate ${
                    isLight ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  ({selectedOption.sublabel})
                </span>
              )}
            </span>
          ) : (
            placeholder
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isLight ? "text-slate-500" : "text-slate-400"
          } ${isOpen ? "rotate-180 text-emerald-500" : ""}`}
        />
      </button>

      {/* Dropdown Menu Overlay */}
      {isOpen && (
        <div
          className={`absolute z-50 left-0 right-0 mt-2 border rounded-2xl shadow-2xl overflow-hidden animate-fadeIn ${
            isLight
              ? "bg-white border-slate-200 text-slate-800"
              : "bg-slate-900 border-slate-700/90 text-slate-200"
          }`}
        >
          {/* Search Box Header */}
          <div
            className={`p-2.5 border-b flex items-center gap-2 ${
              isLight ? "bg-slate-50 border-slate-200" : "bg-slate-950 border-slate-800"
            }`}
          >
            <Search
              className={`w-4 h-4 shrink-0 ml-1 ${
                isLight ? "text-slate-400" : "text-slate-400"
              }`}
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className={`w-full bg-transparent text-xs focus:outline-none font-medium py-1 ${
                isLight
                  ? "text-slate-900 placeholder-slate-400"
                  : "text-white placeholder-slate-500"
              }`}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className={`p-1 ${
                  isLight ? "text-slate-400 hover:text-slate-600" : "text-slate-400 hover:text-white"
                }`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Options List */}
          <div
            className={`max-h-56 overflow-y-auto p-1.5 space-y-1 divide-y ${
              isLight ? "divide-slate-100" : "divide-slate-800/40"
            }`}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      isSelected
                        ? isLight
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : isLight
                        ? "hover:bg-slate-100/80 text-slate-800"
                        : "hover:bg-slate-800/80 text-slate-200"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="truncate font-bold">{opt.label}</div>
                      {opt.sublabel && (
                        <div
                          className={`text-[10px] font-normal truncate mt-0.5 ${
                            isLight ? "text-slate-500" : "text-slate-400"
                          }`}
                        >
                          {opt.sublabel}
                        </div>
                      )}
                    </div>
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 shrink-0 ${
                          isLight ? "text-emerald-700" : "text-emerald-400"
                        }`}
                      />
                    )}
                  </button>
                );
              })
            ) : (
              <div
                className={`p-4 text-center text-xs italic ${
                  isLight ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Tidak ada opsi yang cocok &quot;{searchTerm}&quot;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
