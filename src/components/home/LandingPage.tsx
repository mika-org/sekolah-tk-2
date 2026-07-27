"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageModal from "@/components/common/ImageModal";
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
} from "lucide-react";

interface LandingPageProps {
  onStartRegistration: () => void;
  selectedSchoolCode?: string;
}

export default function LandingPage({
  onStartRegistration,
  selectedSchoolCode = "sadjati",
}: LandingPageProps) {
  const [siteProfile, setSiteProfile] = useState<any>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
        const query = `?schoolCode=${selectedSchoolCode}`;
        const [resProf, resProg, resTeach, resGal, resTest] = await Promise.all([
          fetch(`/api/site-profile${query}`).then((r) => r.json()),
          fetch(`/api/programs${query}`).then((r) => r.json()),
          fetch(`/api/teachers${query}`).then((r) => r.json()),
          fetch(`/api/gallery${query}`).then((r) => r.json()),
          fetch(`/api/testimonials${query}`).then((r) => r.json()),
        ]);

        if (resProf.success && resProf.data) setSiteProfile(resProf.data);
        if (resProg.success && resProg.data) setPrograms(resProg.data);
        if (resTeach.success && resTeach.data) setTeachers(resTeach.data);
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Program {schoolName}
            </h2>
            <p className="text-xs font-extrabold text-blue-700 uppercase tracking-widest">
              Lihat Program • Informasi Kelas • {schoolName}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="bg-white rounded-3xl p-5 border-2 border-blue-200 flex flex-col justify-between hover:shadow-xl hover:border-amber-400 transition-all group"
                >
                  <div>
                    <div className="relative w-20 h-20 mb-4 group-hover:scale-110 transition-transform">
                      <Image
                        src={prog.iconUrl || "/images/program_playground.png"}
                        alt={prog.title}
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1">{prog.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="inline-block text-[11px] font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {prog.ageRange}
                      </span>
                      <span className="inline-block text-[11px] font-extrabold text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full shadow-sm">
                        SPP {sppDisplay}/bln
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600">
                      {featuresList.map((feat: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={onStartRegistration}
                    className="mt-6 w-full py-2.5 px-4 bg-[#1d4ed8] hover:bg-blue-800 text-white rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    <span>Daftar Program Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
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
                    className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 rounded-full overflow-hidden border-4 border-amber-400 bg-amber-50 shadow-md group-hover:border-blue-600 transition-colors flex items-center justify-center cursor-pointer"
                    onClick={() => teacher.photoUrl && handleOpenPreview(teacher.photoUrl, `Tim Pengajar: ${teacher.name}`)}
                    title="Klik untuk memperbesar foto"
                  >
                    {teacher.photoUrl ? (
                      <Image
                        src={teacher.photoUrl}
                        alt={teacher.name}
                        fill
                        sizes="128px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
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
                {gallery.slice(0, 3).map((g: any) => (
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

              {testimonials.map((t: any, index: number) => (
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
    </div>
  );
}
