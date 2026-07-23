"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserPlus, Home, Menu, X, Building, LogIn, Lock } from "lucide-react";

interface NavbarProps {
  currentTab: "home" | "ppdb";
  setCurrentTab: (tab: "home" | "ppdb") => void;
  ppdbStep?: number;
  selectedSchoolCode?: string;
  onSelectSchool?: (code: string) => void;
  schools?: any[];
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  selectedSchoolCode = "dekeraton",
  onSelectSchool,
  schools = [],
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const navItems = [
    { label: "Beranda", id: "home", href: "#hero" },
    { label: "Program", id: "program", href: "#program" },
    { label: "Galeri", id: "galeri", href: "#galeri" },
    { label: "Testimoni", id: "testimoni", href: "#testimoni" },
    { label: "Kontak", id: "kontak", href: "#footer" },
  ];

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
            const mappedId =
              sectionId === "hero"
                ? "home"
                : sectionId === "footer"
                ? "kontak"
                : sectionId;
            setActiveSection(mappedId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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

  const activeSchool = schools.find((s) => s.code === selectedSchoolCode) || schools[0];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Left Logo (Icon Image Only) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setActiveSection("home");
              setIsMobileMenuOpen(false);
              setCurrentTab("home");
            }}
            className="flex items-center group focus:outline-none"
            title="Smart Kids - Ke Beranda"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
              <Image
                src={activeSchool?.logoUrl || "/images/smart_kids_logo.png"}
                alt="Smart Kids Logo"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
          </button>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
          {navItems.map((item) => {
            const isActive = currentTab === "home" && activeSection === item.id;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`relative px-3.5 py-2 text-sm transition-all duration-200 ${
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

        {/* Right Action Buttons (School Selector, Login Admin, Daftar PPDB) */}
        <div className="flex items-center gap-2.5">
          {/* SCHOOL BRANCH SELECTOR DROPDOWN (FAR RIGHT SEPARATED) */}
          {schools.length > 1 && onSelectSchool && (
            <div className="hidden lg:flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/80 px-3.5 py-2 rounded-full transition-colors">
              <Building className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <select
                value={selectedSchoolCode}
                onChange={(e) => onSelectSchool(e.target.value)}
                className="bg-transparent text-xs font-extrabold text-emerald-900 focus:outline-none cursor-pointer"
              >
                {schools.map((s) => (
                  <option key={s.id} value={s.code}>
                    📍 {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* LOGIN ADMIN BUTTON */}
          <Link
            href="/admin/login"
            className="flex items-center gap-1.5 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-full border border-slate-200 transition-all"
            title="Masuk Ke Dashboard Admin CMS"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Login Admin</span>
          </Link>

          {/* DAFTAR PPDB / KE BERANDA BUTTON */}
          <div className="flex items-center gap-2">
            {currentTab === "home" ? (
              <button
                onClick={() => setCurrentTab("ppdb")}
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 sm:px-6 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar PPDB</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentTab("home")}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold px-4 py-2.5 sm:px-6 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <Home className="w-4 h-4" />
                <span>Ke Beranda</span>
              </button>
            )}
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-2xl text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors focus:outline-none"
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

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-emerald-100 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {schools.length > 1 && onSelectSchool && (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800">Pilih Cabang Sekolah:</span>
              <select
                value={selectedSchoolCode}
                onChange={(e) => {
                  onSelectSchool(e.target.value);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-white border border-emerald-300 text-xs font-bold text-emerald-900 rounded-xl px-2 py-1 focus:outline-none"
              >
                {schools.map((s) => (
                  <option key={s.id} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}

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
                    {isActive && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                  </span>
                  <span className="text-xs text-slate-400">→</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <Link
              href="/admin/login"
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold py-3 rounded-full border border-slate-300 transition-all"
            >
              <LogIn className="w-4 h-4 text-emerald-700" />
              <span>Login Admin CMS</span>
            </Link>

            {currentTab === "home" ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentTab("ppdb");
                }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold py-3.5 rounded-full shadow-md"
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
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold py-3.5 rounded-full shadow-md"
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
