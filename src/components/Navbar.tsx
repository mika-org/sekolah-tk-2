"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { UserPlus, Home, Menu, X } from "lucide-react";

interface NavbarProps {
  currentTab: "home" | "ppdb";
  setCurrentTab: (tab: "home" | "ppdb") => void;
  ppdbStep?: number;
}

export default function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const navItems = [
    { label: "Beranda", id: "home", href: "#hero" },
    { label: "Program", id: "program", href: "#program" },
    { label: "Galeri", id: "galeri", href: "#galeri" },
    { label: "Testimoni", id: "testimoni", href: "#testimoni" },
    { label: "Kontak", id: "kontak", href: "#footer" },
  ];

  // Dynamic Scroll spy for active section tracking
  useEffect(() => {
    if (currentTab !== "home") return;

    const sectionIds = ["hero", "program", "galeri", "testimoni", "footer"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            const mappedId = sectionId === "hero" ? "home" : sectionId === "footer" ? "kontak" : sectionId;
            setActiveSection(mappedId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentTab]);

  const handleNavClick = (id: string, href: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Left Logo */}
        <button
          onClick={() => {
            setActiveSection("home");
            setIsMobileMenuOpen(false);
            setCurrentTab("home");
          }}
          className="flex items-center gap-3.5 group focus:outline-none text-left"
        >
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
            <Image
              src="/images/smart_kids_logo.png"
              alt="Smart Kids Logo"
              width={68}
              height={68}
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-extrabold text-emerald-800 text-base sm:text-xl tracking-wide block leading-tight">
              SMART KIDS
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 tracking-wider uppercase block">
              DeKeraton Preschool
            </span>
          </div>
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map((item) => {
            const isActive = currentTab === "home" && activeSection === item.id;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`relative px-4 py-2 text-sm transition-all duration-200 ${
                  isActive
                    ? "text-[#057a44] font-extrabold"
                    : "text-slate-600 hover:text-emerald-700 font-semibold"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#057a44] rounded-full transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button & Secondary Logo */}
        <div className="flex items-center gap-3">
          <div className="hidden xs:flex items-center gap-3">
            {currentTab === "home" ? (
              <button
                onClick={() => setCurrentTab("ppdb")}
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar PPDB</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentTab("home")}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <Home className="w-4 h-4" />
                <span>Ke Beranda</span>
              </button>
            )}
          </div>

          {/* Secondary Logo (Yapchi) */}
          <div className="relative w-12 h-12 shrink-0 hidden sm:block">
            <Image
              src="/images/yapchi_logo.png"
              alt="YAPCHI Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-2xl text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-emerald-800" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-emerald-100 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === "home" && activeSection === item.id;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    )}
                  </span>
                  <span className="text-xs text-slate-400">→</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100">
            {currentTab === "home" ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentTab("ppdb");
                }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold py-3.5 rounded-full shadow-md transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Form Pendaftaran PPDB</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentTab("home");
                }}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold py-3.5 rounded-full shadow-md transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Kembali Ke Beranda</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


