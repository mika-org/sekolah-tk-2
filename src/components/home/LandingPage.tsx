"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Users,
  BookOpen,
  Star,
  Trophy,
  GraduationCap,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface LandingPageProps {
  onStartRegistration: () => void;
  selectedSchoolCode?: string;
}

export default function LandingPage({
  onStartRegistration,
  selectedSchoolCode = "dekeraton",
}: LandingPageProps) {
  const [siteProfile, setSiteProfile] = useState<any>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const query = `?schoolCode=${selectedSchoolCode}`;
        const [resProf, resProg, resGal, resTest] = await Promise.all([
          fetch(`/api/site-profile${query}`).then((r) => r.json()),
          fetch(`/api/programs${query}`).then((r) => r.json()),
          fetch(`/api/gallery${query}`).then((r) => r.json()),
          fetch(`/api/testimonials${query}`).then((r) => r.json()),
        ]);

        if (resProf.success && resProf.data) setSiteProfile(resProf.data);
        if (resProg.success && resProg.data) setPrograms(resProg.data);
        if (resGal.success && resGal.data) setGallery(resGal.data);
        if (resTest.success && resTest.data) setTestimonials(resTest.data);
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
    <div className="flex flex-col gap-16 md:gap-24 pb-16">
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-8 md:pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                {heroBadge}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                {heroTitle.includes(",") ? (
                  <>
                    {heroTitle.split(",")[0]}, <br className="hidden sm:inline" />
                    <span className="text-[#057a44] underline decoration-emerald-300 decoration-wavy underline-offset-8">
                      {heroTitle.split(",").slice(1).join(",")}
                    </span>
                  </>
                ) : (
                  <span className="text-[#057a44]">{heroTitle}</span>
                )}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onStartRegistration}
                  className="bg-[#057a44] hover:bg-emerald-800 text-white font-bold text-base px-8 py-3.5 rounded-full shadow-lg shadow-emerald-700/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Daftar Sekarang
                </button>

                <a
                  href="#program"
                  className="bg-white hover:bg-slate-100 text-slate-700 font-bold text-base px-8 py-3.5 rounded-full border border-slate-300 shadow-sm transition-all"
                >
                  Lihat Program
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-emerald-200/40 rounded-full blur-2xl transform -rotate-6 animate-pulse" />
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400/20 rounded-full blur-md" />

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
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-md flex items-start gap-4 hover:shadow-lg transition-shadow">
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

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-md flex items-start gap-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-1">Kurikulum Terstruktur</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Materi belajar dirancang sesuai tahap pengembangan anak
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-md flex items-start gap-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Star className="w-6 h-6" />
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

      {/* 2. PROGRAM KAMI SECTION */}
      <section id="program" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Program {schoolName}
          </h2>
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
            Lihat Program • Informasi Kelas • {schoolName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((prog: any) => {
            let featuresList: string[] = [];
            try {
              featuresList = typeof prog.features === "string" ? JSON.parse(prog.features) : prog.features;
            } catch {
              featuresList = ["Materi Belajar Interaktif", "Kemandirian"];
            }

            return (
              <div
                key={prog.id}
                className="bg-[#f0f7f4] rounded-3xl p-6 border border-emerald-100 flex flex-col justify-between hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="relative w-24 h-24 mb-4 group-hover:scale-110 transition-transform">
                    <Image
                      src={prog.iconUrl || "/images/program_playground.png"}
                      alt={prog.title}
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{prog.title}</h3>
                  <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full mb-4">
                    {prog.ageRange}
                  </span>

                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {featuresList.map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onStartRegistration}
                  className="mt-6 w-full py-2.5 px-4 bg-[#057a44] hover:bg-emerald-800 text-white rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Daftar Program Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-[#ebf4fa] rounded-3xl p-6 md:p-8 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-blue-100">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">500+</span>
            <span className="text-xs font-bold text-slate-700">Siswa Bahagia</span>
            <span className="text-[11px] text-slate-500 hidden sm:block">Telah bergabung bersama kami</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">10+</span>
            <span className="text-xs font-bold text-slate-700">Tahun Pengalaman</span>
            <span className="text-[11px] text-slate-500 hidden sm:block">Membantu anak tumbuh & berkembang</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">60+</span>
            <span className="text-xs font-bold text-slate-700">Pengajar Hebat</span>
            <span className="text-[11px] text-slate-500 hidden sm:block">Berpengalaman dan bersertifikasi</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-2">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">99%</span>
            <span className="text-xs font-bold text-slate-700">Orang Tua Puas</span>
            <span className="text-[11px] text-slate-500 hidden sm:block">Dengan perkembangan anak mereka</span>
          </div>
        </div>
      </section>

      {/* 4. GALERI & TESTIMONI SECTION */}
      <section id="galeri" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-[#fff8e7] rounded-3xl p-6 sm:p-8 border border-amber-100 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-1">
                Galeri {schoolName}
              </h2>
              <p className="text-xs text-slate-600 text-center mb-6">
                Lihat dokumentasi dari kegiatan kami
              </p>

              <div className="grid grid-cols-3 gap-3">
                {gallery.slice(0, 3).map((g: any) => (
                  <div
                    key={g.id}
                    className="relative h-44 sm:h-52 rounded-2xl overflow-hidden shadow-sm bg-amber-200"
                  >
                    <Image
                      src={g.imageUrl}
                      alt={g.title || "Galeri Foto"}
                      fill
                      sizes="(max-width: 768px) 33vw, 250px"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-bold px-6 py-2.5 rounded-full shadow-sm transition-colors">
                Lihat Galeri Lainnya
              </button>
            </div>
          </div>

          <div id="testimoni" className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Testimoni Orang Tua
              </h2>

              {testimonials.map((t: any) => (
                <div
                  key={t.id}
                  className={`rounded-2xl p-5 border space-y-3 ${
                    t.bgColor === "blue"
                      ? "bg-[#ebf1fa] border-blue-100"
                      : t.bgColor === "amber"
                      ? "bg-[#fffdf0] border-amber-100"
                      : "bg-[#eaf4eb] border-emerald-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                        t.bgColor === "blue"
                          ? "bg-blue-200 text-blue-800"
                          : t.bgColor === "amber"
                          ? "bg-amber-200 text-amber-800"
                          : "bg-emerald-200 text-emerald-800"
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

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#e2f0e7] rounded-3xl p-6 sm:p-8 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
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
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {ctaTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
                {ctaSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onStartRegistration}
            className="bg-[#057a44] hover:bg-emerald-800 text-white font-bold text-sm px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all shrink-0"
          >
            Daftar Sekarang
          </button>
        </div>
      </section>
    </div>
  );
}
