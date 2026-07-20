"use client";

import Image from "next/image";
import { UserPlus, Home } from "lucide-react";

interface NavbarProps {
  currentTab: "home" | "ppdb";
  setCurrentTab: (tab: "home" | "ppdb") => void;
  ppdbStep?: number;
}

export default function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
  const navItems = [
    { label: "Beranda", id: "home", href: "#hero" },
    { label: "Program", id: "program", href: "#program" },
    { label: "Galeri", id: "galeri", href: "#galeri" },
    { label: "Testimoni", id: "testimoni", href: "#testimoni" },
    { label: "Kontak", id: "kontak", href: "#footer" },
  ];

  const handleNavClick = (id: string, href: string) => {
    if (currentTab !== "home") {
      setCurrentTab("home");
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Logo */}
        <button
          onClick={() => setCurrentTab("home")}
          className="flex items-center gap-3 group focus:outline-none text-left"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md group-hover:scale-105 transition-transform bg-amber-50 flex items-center justify-center">
            <Image
              src="/images/smart_kids_logo.png"
              alt="Smart Kids Logo"
              width={48}
              height={48}
              className="object-contain p-0.5"
            />
          </div>
          <div className="hidden xs:block">
            <span className="font-extrabold text-emerald-800 text-lg tracking-wide block leading-tight">
              SMART KIDS
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 tracking-wider uppercase block">
              DeKeraton Preschool
            </span>
          </div>
        </button>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = currentTab === "home" && item.id === "home";
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-full ${
                  isActive
                    ? "text-emerald-700 font-bold"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-600 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button & Secondary Logo */}
        <div className="flex items-center gap-3">
          {currentTab === "home" ? (
            <button
              onClick={() => setCurrentTab("ppdb")}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar PPDB</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentTab("home")}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              <span>Ke Beranda</span>
            </button>
          )}

          {/* Secondary Logo (Yapchi) */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 p-0.5 bg-white shadow-sm hidden sm:block">
            <Image
              src="/images/yapchi_logo.png"
              alt="YAPCHI Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
