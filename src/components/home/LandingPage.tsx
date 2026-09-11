"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageModal from "@/components/common/ImageModal";
import LesSdRegistrationModal from "@/components/les-sd/LesSdRegistrationModal";
import {
  Users,
  BookOpen,
  Star,
  Trophy,
  GraduationCap,
  Heart,
  ArrowRight,
  CheckCircle2,
  Eye,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Lock,
  Key,
  X,
} from "lucide-react";

interface LandingPageProps {
  onStartRegistration: () => void;
  selectedSchoolCode?: string;
  schools?: any[];
}

const DEFAULT_GALLERY = [
  {
    id: "default-gal-1",
    title: "Kegiatan Belajar Sentra Sains & Motorik",
    imageUrl: "/images/gallery1.png",
    folder: "gallery",
    orderIndex: 1,
  },
  {
    id: "default-gal-2",
    title: "Keceriaan Bermain Outdoor & Interaksi",
    imageUrl: "/images/gallery2.png",
    folder: "gallery",
    orderIndex: 2,
  },
  {
    id: "default-gal-3",
    title: "Kemandirian & Kreasi Seni Melipat Origami",
    imageUrl: "/images/gallery3.png",
    folder: "gallery",
    orderIndex: 3,
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    id: "default-test-1",
    parentName: "Bunda Rayyan (Ibu Maya)",
    role: "Orang Tua Siswa",
    initials: "BM",
    content: "Metode bermain sambil belajar di Smart Kids sangat menyenangkan! Rayyan jadi lebih mandiri dan berani berbicara di depan umum.",
    rating: 5,
    bgColor: "emerald",
    orderIndex: 1,
  },
  {
    id: "default-test-2",
    parentName: "Bapak Hendra Pratama",
    role: "Orang Tua Siswa",
    initials: "BP",
    content: "Program bimbingan belajarnya sangat intensif dan guru-gurunya sabar sekali membimbing anak. Nilai dan pemahaman anak meningkat pesat!",
    rating: 5,
    bgColor: "blue",
    orderIndex: 2,
  },
  {
    id: "default-test-3",
    parentName: "Mama Alif (Ibu Dian)",
    role: "Orang Tua Siswa",
    initials: "MD",
    content: "Fasilitas lengkap, kelasnya nyaman dan aman. Anak saya selalu antusias berangkat ke sekolah setiap hari.",
    rating: 5,
    bgColor: "amber",
    orderIndex: 3,
  },
];

export default function LandingPage({
  onStartRegistration,
  selectedSchoolCode = "sadjati",
  schools = [],
}: LandingPageProps) {
  const [isLesSdModalOpen, setIsLesSdModalOpen] = useState(false);
  const [isLesSdClosedModalOpen, setIsLesSdClosedModalOpen] = useState(false);
  const [siteProfile, setSiteProfile] = useState<any>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>(DEFAULT_GALLERY);
  const [testimonials, setTestimonials] = useState<any[]>(DEFAULT_TESTIMONIALS);
  const [loading, setLoading] = useState(true);

  // Program Slider States (5 items visible per view on desktop)
  const [programSliderIndex, setProgramSliderIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setItemsPerView(1);
        } else if (window.innerWidth < 768) {
          setItemsPerView(2);
        } else if (window.innerWidth < 1024) {
          setItemsPerView(3);
        } else {
          setItemsPerView(5);
        }
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxProgramIndex = Math.max(0, programs.length - itemsPerView);

  useEffect(() => {
    if (programSliderIndex > maxProgramIndex) {
      setProgramSliderIndex(maxProgramIndex);
    }
  }, [maxProgramIndex, programSliderIndex]);

  const handlePrevProgram = () => {
    setProgramSliderIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextProgram = () => {
    setProgramSliderIndex((prev) => Math.min(maxProgramIndex, prev + 1));
  };

  // Image Modal State
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; src: string | null; title: string }>({
    isOpen: false,
    src: null,
    title: "Pratinjau Foto",
  });

  const handleOpenPreview = (src: string | null, title: string = "Pratinjau Foto") => {
    if (src) setPreviewModal({ isOpen: true, src, title });
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const safeFetch = async (url: string) => {
          const res = await fetch(url);
          const contentType = res.headers.get("content-type");
          if (res.ok && contentType && contentType.includes("application/json")) {
            return await res.json();
          }
          return { success: false, data: null };
        };

        const query = `?schoolCode=${selectedSchoolCode}`;
        const [resProf, resProg, resTeach, resGal, resTest] = await Promise.all([
          safeFetch(`/api/site-profile${query}`),
          safeFetch(`/api/programs${query}`),
          safeFetch(`/api/teachers${query}`),
          safeFetch(`/api/gallery${query}`),
          safeFetch(`/api/testimonials${query}`),
        ]);

        if (resProf?.success && resProf?.data) setSiteProfile(resProf.data);
        if (resProg?.success && resProg?.data) setPrograms(resProg.data);
        if (resTeach?.success && resTeach?.data) setTeachers(resTeach.data);
        if (resGal?.success && Array.isArray(resGal.data) && resGal.data.length > 0) {
          setGallery(resGal.data);
        } else {
          setGallery(DEFAULT_GALLERY);
        }
        if (resTest?.success && Array.isArray(resTest.data) && resTest.data.length > 0) {
          setTestimonials(resTest.data);
        } else {
          setTestimonials(DEFAULT_TESTIMONIALS);
        }
      } catch (err) {
        console.error("Failed to load CMS data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedSchoolCode]);

  const schoolName = siteProfile?.school?.name || "Smart Kids";
  const heroBadge = siteProfile?.heroBadge || `Pendaftaran PPDB ${schoolName} Telah Dibuka!`;
  const heroTitle = siteProfile?.heroTitle || "Belajar Seru, Tumbuh Bahagia";
  const heroSubtitle =
    siteProfile?.heroSubtitle ||
    `Bimbingan belajar untuk anak usia 3-8 tahun di ${schoolName} dengan metode bermain yang menyenangkan`;
  const heroMascotUrl = siteProfile?.heroMascotUrl || "/images/owl_mascot.png";
  const ctaTitle = siteProfile?.ctaTitle || `Yuk, Daftarkan Si Kecil di ${schoolName}!`;
  const ctaSubtitle =
    siteProfile?.ctaSubtitle ||
    `Bergabunglah bersama ${schoolName} dan berikan pengalaman belajar terbaik untuk masa depan cerah mereka`;

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-16 overflow-hidden">
      {/* 1. HERO SECTION (SOFT BLUE GRADIENT BACKGROUND) */}
      <section id="hero" className="relative pt-8 md:pt-12 pb-6 bg-gradient-to-b from-blue-50/80 via-slate-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-extrabold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                {heroBadge}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                {heroTitle.includes(",") ? (
                  <>
                    {heroTitle.split(",")[0]}, <br className="hidden sm:inline" />
                    <span className="text-[#1d4ed8] underline decoration-amber-400 decoration-wavy underline-offset-8">
                      {heroTitle.split(",").slice(1).join(",")}
                    </span>
                  </>
                ) : (
                  <span className="text-[#1d4ed8]">{heroTitle}</span>
                )}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onStartRegistration}
                  className="bg-[#1d4ed8] hover:bg-blue-800 text-white font-bold text-base px-8 py-3.5 rounded-full shadow-lg shadow-blue-700/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Daftar Sekarang
                </button>

                <a
                  href="#program"
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-base px-8 py-3.5 rounded-full border border-amber-300 shadow-sm transition-all cursor-pointer"
                >
                  Lihat Program
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-blue-300/40 rounded-full blur-2xl transform -rotate-6 animate-pulse" />
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-300/50 rounded-full blur-md" />

                <Image
                  src={heroMascotUrl}
                  alt={`Mascot ${schoolName}`}
                  fill
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 384px"
                  priority
                  className="object-contain relative z-10 drop-shadow-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 sm:mt-16">
            <div className="bg-white rounded-2xl p-5 border-2 border-blue-100 shadow-md flex items-start gap-4 hover:border-amber-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-1">Kelas Ideal</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Rasio guru dan murid pada kelas yang ideal untuk perhatian maksimal
                </p>
              </div>
            </div>

            <div className="bg-[#fffdf0] rounded-2xl p-5 border-2 border-amber-200 shadow-md flex items-start gap-4 hover:border-blue-400 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-1">Kurikulum Terstruktur</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Materi belajar dirancang sesuai tahap pengembangan anak
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border-2 border-blue-100 shadow-md flex items-start gap-4 hover:border-amber-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-1">Pengembangan Holistik</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fokus pada kognitif, motorik, sosial, dan emosional anak
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROGRAM KAMI SECTION (WARM YELLOW BACKGROUND WRAPPER) */}
      <section id="program" className="bg-[#fffbeb] py-14 border-y border-amber-200/80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Program {schoolName}
            </h2>
            <p className="text-xs font-extrabold text-blue-700 uppercase tracking-widest">
              Lihat Program • Informasi Kelas • {schoolName}
            </p>
          </div>

          <div className="relative group/slider">
            {/* FLOATING NAVIGATION ARROWS */}
            {programs.length > itemsPerView && (
              <>
                <button
                  type="button"
                  onClick={handlePrevProgram}
                  disabled={programSliderIndex === 0}
                  className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-slate-800 border-2 border-amber-300 shadow-xl flex items-center justify-center hover:bg-amber-400 hover:text-slate-950 transition-all disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
                  aria-label="Previous Program"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNextProgram}
                  disabled={programSliderIndex >= maxProgramIndex}
                  className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-slate-800 border-2 border-amber-300 shadow-xl flex items-center justify-center hover:bg-amber-400 hover:text-slate-950 transition-all disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
                  aria-label="Next Program"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* SLIDER VIEWPORT */}
            <div
              className="overflow-hidden px-1 py-3"
              onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchStartX === null) return;
                const diffX = touchStartX - e.changedTouches[0].clientX;
                if (diffX > 50) handleNextProgram();
                if (diffX < -50) handlePrevProgram();
                setTouchStartX(null);
              }}
            >
              <div
                className="flex transition-transform duration-500 ease-out -mx-2 sm:-mx-2.5"
                style={{
                  transform: `translateX(-${programSliderIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {programs.map((prog: any) => {
                  let featuresList: string[] = [];
                  try {
                    featuresList = typeof prog.features === "string" ? JSON.parse(prog.features) : prog.features;
                  } catch {
                    featuresList = ["Materi Belajar Interaktif", "Kemandirian"];
                  }

                  const sppDisplay = prog.sppAmount ? `Rp ${Number(prog.sppAmount).toLocaleString("id-ID")}` : "Rp 200.000";

                  return (
                    <div
                      key={prog.id}
                      style={{ width: `${100 / itemsPerView}%` }}
                      className="shrink-0 px-2 sm:px-2.5 flex flex-col"
                    >
                      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-blue-200 flex flex-col justify-between hover:shadow-xl hover:border-amber-400 transition-all group h-full">
                        <div>
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                            <Image
                              src={prog.iconUrl || "/images/program_playground.png"}
                              alt={prog.title}
                              fill
                              sizes="80px"
                              className="object-contain"
                            />
                          </div>
                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1">{prog.title}</h3>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {(prog.title?.toUpperCase().includes("LES SD") || prog.title?.toUpperCase().includes("SD")) && (
                              <span className="w-full inline-block text-[10px] font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 text-center mb-0.5">
                                🔒 Khusus Terdaftar di Akun Ortu
                              </span>
                            )}
                            <span className="inline-block text-[10px] sm:text-[11px] font-bold text-blue-900 bg-blue-100 px-2 sm:px-2.5 py-0.5 rounded-full border border-blue-200">
                              {prog.ageRange}
                            </span>
                            <span className="inline-block text-[10px] sm:text-[11px] font-extrabold text-slate-950 bg-amber-400 px-2 sm:px-2.5 py-0.5 rounded-full shadow-sm">
                              SPP {sppDisplay}/bln
                            </span>
                          </div>

                          <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-600">
                            {featuresList.map((feat: string, idx: number) => (
                              <li key={idx} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => {
                            if (prog.title?.toUpperCase().includes("LES SD") || prog.title?.toUpperCase().includes("SD")) {
                              setIsLesSdClosedModalOpen(true);
                            } else {
                              onStartRegistration();
                            }
                          }}
                          className={`mt-5 sm:mt-6 w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer ${
                            prog.title?.toUpperCase().includes("LES SD") || prog.title?.toUpperCase().includes("SD")
                              ? "bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 shadow-amber-500/10"
                              : "bg-[#1d4ed8] hover:bg-blue-800 text-white shadow-blue-600/20"
                          }`}
                        >
                          {prog.title?.toUpperCase().includes("LES SD") || prog.title?.toUpperCase().includes("SD") ? (
                            <>
                              <Lock className="w-3.5 h-3.5 text-amber-400" />
                              <span>Khusus Akun Ortu (Info)</span>
                            </>
                          ) : (
                            <>
                              <span>Daftar Program Ini</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SLIDER DOT INDICATORS */}
            {programs.length > itemsPerView && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: maxProgramIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setProgramSliderIndex(idx)}
                    className={`transition-all duration-300 cursor-pointer ${
                      programSliderIndex === idx
                        ? "w-8 h-2.5 rounded-full bg-amber-500 shadow-sm"
                        : "w-2.5 h-2.5 rounded-full bg-amber-200 hover:bg-amber-300"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* FEATURED BANNER: PROGRAM LES SD */}
          <div className="mt-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 border-2 border-emerald-400/40 p-6 sm:p-8 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Program Khusus Murid Terdaftar: Bimbel Les SD</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Les SD: 1 Minggu 3x Pertemuan (Semua Mata Pelajaran)
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  Bimbingan belajar komprehensif untuk siswa SD (Kelas 1 s/d 6) mencakup Matematika, IPA, IPS, Bahasa Indonesia, dan Bahasa Inggris. Dampingi ananda meraih prestasi maksimal dengan SPP hanya{" "}
                  <strong className="text-amber-300 font-bold">Rp 200.000 / bulan</strong> bersama Guru PIC berpengalaman.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-950/60 border border-amber-500/30 text-[11px] text-amber-300 font-semibold">
                  <span>🔒 Pendaftaran Depan Ditutup untuk Umum • Mendaftar Hanya Melalui Akun Orang Tua</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-200 pt-1">
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <Calendar className="w-4 h-4 text-emerald-400" /> 3x Pertemuan / Minggu
                  </span>
                  <span className="flex items-center gap-1.5 text-teal-300">
                    <BookOpen className="w-4 h-4 text-teal-400" /> Semua Mapel SD & Bimbingan PR
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> SPP Rp 200.000 / Bulan
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <button
                  onClick={() => setIsLesSdClosedModalOpen(true)}
                  className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-full shadow-xl shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>Pendaftaran di Akun Ortu</span>
                </button>
                <a
                  href="/admin/login"
                  className="px-6 py-2.5 bg-slate-950/80 hover:bg-slate-900 text-amber-300 hover:text-white font-bold text-xs rounded-full border border-amber-500/40 transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>Masuk Akun Orang Tua</span>
                </a>
              </div>
            </div>
          </div>

          {/* STATS BANNER IN ROYAL BLUE */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 md:p-8 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-blue-700 shadow-xl text-white">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mb-2 border border-amber-400/30">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">500+</span>
              <span className="text-xs font-bold text-white">Siswa Bahagia</span>
              <span className="text-[11px] text-blue-200 hidden sm:block">Telah bergabung bersama kami</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mb-2 border border-amber-400/30">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">10+</span>
              <span className="text-xs font-bold text-white">Tahun Pengalaman</span>
              <span className="text-[11px] text-blue-200 hidden sm:block">Membantu anak tumbuh & berkembang</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mb-2 border border-amber-400/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">60+</span>
              <span className="text-xs font-bold text-white">Pengajar Hebat</span>
              <span className="text-[11px] text-blue-200 hidden sm:block">Berpengalaman dan bersertifikasi</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mb-2 border border-amber-400/30">
                <Heart className="w-6 h-6 fill-amber-400 text-amber-300" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">99%</span>
              <span className="text-xs font-bold text-white">Orang Tua Puas</span>
              <span className="text-[11px] text-blue-200 hidden sm:block">Dengan perkembangan anak mereka</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GURU & TENAGA PENDIDIK SECTION (SOFT ICE BLUE BACKGROUND WRAPPER) */}
      <section id="guru" className="bg-[#eff6ff] py-14 border-b border-blue-200/80 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200">
              <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
              <span>Tim Pengajar Profesional</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Guru & Tenaga Pendidik {schoolName}
            </h2>
            <p className="text-xs font-semibold text-slate-500 max-w-xl mx-auto">
              Didukung oleh pendidik penyayang, berpengalaman, dan berdedikasi tinggi dalam membimbing tumbuh kembang si kecil.
            </p>
          </div>

          {teachers.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-sm text-slate-500">Belum ada data pengajar yang ditambahkan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachers.map((teacher: any) => (
                <div
                  key={teacher.id}
                  className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-md hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
                >
                  <div
                    className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 rounded-full overflow-hidden border-4 border-amber-400 bg-amber-50 shadow-md group-hover:border-blue-600 transition-colors flex items-center justify-center select-none"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    {teacher.photoUrl ? (
                      <>
                        <Image
                          src={teacher.photoUrl}
                          alt={teacher.name}
                          fill
                          sizes="128px"
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          className="object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                        />
                        {/* Protection overlay to prevent right-click save and drag */}
                        <div
                          className="absolute inset-0 z-10 select-none cursor-default"
                          onContextMenu={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                        />
                      </>
                    ) : (
                      <Users className="w-12 h-12 text-blue-600" />
                    )}
                  </div>

                  <span className="text-[11px] font-extrabold text-slate-950 bg-amber-400 px-3.5 py-1 rounded-full mb-2 shadow-sm">
                    {teacher.role}
                  </span>

                  <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                    {teacher.name}
                  </h3>

                  {teacher.education && (
                    <p className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600 inline" />
                      <span>{teacher.education}</span>
                    </p>
                  )}

                  {teacher.bio && (
                    <p className="text-xs text-slate-600 italic bg-[#fffdf0] p-3 rounded-2xl w-full border border-amber-200/80 leading-relaxed mt-auto">
                      &quot;{teacher.bio}&quot;
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. GALERI & TESTIMONI SECTION (CLEAN WHITE BACKGROUND WITH YELLOW & BLUE CARDS) */}
      <section id="galeri" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-[#fffbeb] rounded-3xl p-6 sm:p-8 border-2 border-amber-300 flex flex-col justify-between shadow-md">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-1">
                Galeri {schoolName}
              </h2>
              <p className="text-xs text-slate-600 text-center mb-6">
                Lihat dokumentasi dari kegiatan kami
              </p>

              <div className="grid grid-cols-3 gap-3">
                {(gallery.length > 0 ? gallery : DEFAULT_GALLERY).slice(0, 3).map((g: any) => (
                  <div
                    key={g.id}
                    className="relative h-44 sm:h-52 rounded-2xl overflow-hidden shadow-sm bg-amber-200 cursor-pointer group/img"
                    onClick={() => handleOpenPreview(g.imageUrl, `Galeri: ${g.title || 'Dokumentasi Sekolah'}`)}
                    title="Klik untuk memperbesar foto"
                  >
                    <Image
                      src={g.imageUrl}
                      alt={g.title || "Galeri Foto"}
                      fill
                      sizes="(max-width: 768px) 33vw, 250px"
                      className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md transition-colors cursor-pointer">
                Lihat Galeri Lainnya
              </button>
            </div>
          </div>

          <div id="testimoni" className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Testimoni Orang Tua
              </h2>

              {(testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS).map((t: any, index: number) => (
                <div
                  key={t.id}
                  className={`rounded-2xl p-5 border-2 space-y-3 shadow-sm ${
                    index % 2 === 0
                      ? "bg-[#eff6ff] border-blue-200"
                      : "bg-[#fffbeb] border-amber-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                        index % 2 === 0
                          ? "bg-blue-200 text-blue-900"
                          : "bg-amber-400 text-slate-950"
                      }`}
                    >
                      {t.initials || "TK"}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{t.parentName}</h4>
                      <p className="text-[11px] text-slate-500">{t.role || "Orang Tua Siswa"}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    &quot;{t.content}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER (ROYAL BLUE WITH AMBER BUTTON) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 border-2 border-amber-400/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl text-white">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
              <Image
                src="/images/school_house.png"
                alt="Gedung Sekolah Smart Kids"
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-contain"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {ctaTitle}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 max-w-lg leading-relaxed">
                {ctaSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onStartRegistration}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-amber-400/30 transition-all shrink-0 cursor-pointer transform hover:-translate-y-0.5"
          >
            Daftar Sekarang
          </button>
        </div>
      </section>

      {/* Image & Document Modal Preview */}
      <ImageModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ ...previewModal, isOpen: false })}
        src={previewModal.src}
        title={previewModal.title}
      />

      {/* Les SD Registration Modal (Fallback) */}
      <LesSdRegistrationModal
        isOpen={isLesSdModalOpen}
        onClose={() => setIsLesSdModalOpen(false)}
        schools={schools}
      />

      {/* MODAL PEMBERITAHUAN PENDAFTARAN LES SD DITUTUP UNTUK UMUM */}
      {isLesSdClosedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsLesSdClosedModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl font-black border border-amber-500/30 shrink-0">
                🔒
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  Khusus Murid Terdaftar
                </span>
                <h3 className="font-black text-white text-base sm:text-lg mt-1">
                  Pendaftaran Les SD Depan Ditutup
                </h3>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                Mohon maaf, pendaftaran bimbingan <strong>Les SD</strong> di halaman depan saat ini <strong>telah ditutup untuk umum</strong>.
              </p>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Pendaftaran Melalui Akun Orang Tua</span>
                </div>
                <p className="text-xs text-slate-400">
                  Program bimbingan belajar intensif Les SD (1 minggu 3x pertemuan, SPP Rp 200.000/bln) hanya dapat didaftarkan oleh siswa & orang tua yang telah memiliki akun terdaftar di Smart Kids.
                </p>
                <p className="text-xs text-emerald-400 font-semibold">
                  Silakan masuk ke <strong>Portal Akun Orang Tua</strong> untuk memilih jadwal bimbingan dan mendaftarkan ananda.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <a
                href="/admin/login"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition text-center"
              >
                <Key className="w-4 h-4" />
                <span>Masuk ke Akun Orang Tua</span>
              </a>
              <button
                type="button"
                onClick={() => setIsLesSdClosedModalOpen(false)}
                className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-2xl font-bold text-xs transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
