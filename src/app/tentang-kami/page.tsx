"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Award, Compass, Heart, Shield, BookOpen, ArrowRight, Star } from "lucide-react";

export default function TentangKamiPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [selectedSchoolCode, setSelectedSchoolCode] = useState<string>("dekeraton");

  useEffect(() => {
    let detectedCode = "";

    if (typeof window !== "undefined") {
      const host = window.location.hostname.toLowerCase();
      const hostParts = host.split(".");
      if (hostParts.length >= 3 && hostParts[0] !== "www" && hostParts[0] !== "localhost" && hostParts[0] !== "127") {
        detectedCode = hostParts[0];
      }

      if (!detectedCode) {
        if (host.includes("cikarang")) detectedCode = "cikarang";
        else if (host.includes("dekeraton")) detectedCode = "dekeraton";
      }

      const params = new URLSearchParams(window.location.search);
      const qSchool = params.get("school") || params.get("code") || params.get("cabang");
      if (qSchool) {
        detectedCode = qSchool.toLowerCase();
      }
    }

    fetch("/api/schools")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data?.length) {
          const loadedSchools = data.data;
          setSchools(loadedSchools);

          if (detectedCode) {
            const matched = loadedSchools.find(
              (s: any) =>
                s.code.toLowerCase() === detectedCode ||
                s.code.toLowerCase().includes(detectedCode) ||
                detectedCode.includes(s.code.toLowerCase()) ||
                s.name.toLowerCase().includes(detectedCode)
            );
            if (matched) {
              setSelectedSchoolCode(matched.code);
              return;
            }
          }
          if (!loadedSchools.some((s: any) => s.code === selectedSchoolCode)) {
            setSelectedSchoolCode(loadedSchools[0].code);
          }
        }
      })
      .catch((err) => console.error("Error loading schools:", err));
  }, [selectedSchoolCode]);

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-emerald-500" />,
      title: "Kasih Sayang",
      desc: "Menciptakan lingkungan yang hangat, aman, dan penuh kasih sayang bagi setiap anak.",
    },
    {
      icon: <Compass className="w-6 h-6 text-amber-500" />,
      title: "Eksplorasi Aktif",
      desc: "Mendorong rasa ingin tahu anak melalui metode bermain sambil belajar yang menyenangkan.",
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: "Integritas & Karakter",
      desc: "Menanamkan nilai-nilai moral, keagamaan, dan etika sejak usia dini.",
    },
    {
      icon: <Award className="w-6 h-6 text-purple-500" />,
      title: "Kreativitas",
      desc: "Mendukung kebebasan berekspresi seni dan bahasa guna mengasah bakat unik anak.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navbar */}
      <Navbar
        selectedSchoolCode={selectedSchoolCode}
        onSelectSchool={setSelectedSchoolCode}
        schools={schools}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white py-20 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/25 border border-emerald-400/30 text-xs font-black uppercase tracking-wider text-emerald-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" /> Profil Yayasan & Sekolah
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
                  Tentang Kami
                </h1>
                <p className="text-lg sm:text-xl text-emerald-100/90 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                  Mengenal lebih dekat YAPCHI Foundation dan komitmen kami dalam menghadirkan pendidikan anak usia dini yang berkualitas, inovatif, dan penuh kegembiraan.
                </p>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-white/10 rounded-full flex items-center justify-center border border-white/20 shadow-2xl backdrop-blur-sm">
                  <Image
                    src="/images/yapchi_logo.png"
                    alt="YAPCHI Foundation Logo"
                    width={220}
                    height={220}
                    className="object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* YAYASAN HISTORY & INTRO */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  YAPCHI Foundation
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  YAPCHI Foundation (Yayasan Pendidikan Anak Indonesia) didirikan dengan satu misi luhur: memberikan fondasi pendidikan terbaik bagi anak-anak Indonesia pada masa emas (golden age) mereka. Kami percaya bahwa setiap anak terlahir cerdas, unik, dan memiliki potensi luar biasa.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Melalui unit sekolah <strong>Smart Kids</strong>, kami mengintegrasikan kurikulum nasional yang disesuaikan dengan pendekatan modern berbasis stimulasi motorik, kognitif, seni, serta pembentukan karakter moral-keagamaan yang kuat.
                </p>
                <div className="flex items-center gap-6 pt-2">
                  <div className="text-center">
                    <span className="block text-3xl font-extrabold text-emerald-600 font-mono">2+</span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Cabang Sekolah</span>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <div className="text-center">
                    <span className="block text-3xl font-extrabold text-emerald-600 font-mono">500+</span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Alumni Siswa</span>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <div className="text-center">
                    <span className="block text-3xl font-extrabold text-emerald-600 font-mono">100%</span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Kasih Sayang</span>
                  </div>
                </div>
              </div>
              <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-50">
                <Image
                  src="/images/landing_hero_mascot.png"
                  alt="Aktivitas Belajar Anak"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white text-sm font-semibold italic">
                    &ldquo;Belajar seru, bermain ceria, tumbuh mandiri bersama Smart Kids.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Visi */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/5 rounded-full group-hover:scale-125 transition-transform" />
                <h3 className="text-xl font-black text-emerald-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-emerald-500 block" /> Visi Kami
                </h3>
                <p className="text-slate-700 leading-relaxed text-base">
                  Menjadi lembaga pendidikan anak usia dini percontohan yang menghasilkan generasi cerdas secara akademis, kreatif, mandiri, dan memiliki landasan akhlak mulia berlandaskan kasih sayang.
                </p>
              </div>

              {/* Misi */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/5 rounded-full group-hover:scale-125 transition-transform" />
                <h3 className="text-xl font-black text-amber-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-amber-500 block" /> Misi Kami
                </h3>
                <ul className="space-y-3.5 text-slate-700 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs shrink-0 mt-0.5">1</span>
                    <span>Menyelenggarakan pembelajaran aktif berbasis bermain yang disesuaikan dengan tahap perkembangan usia anak.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs shrink-0 mt-0.5">2</span>
                    <span>Menanamkan pembiasaan karakter positif, sopan santun, kemandirian, dan ketaatan ibadah sejak usia dini.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs shrink-0 mt-0.5">3</span>
                    <span>Menjalin kemitraan yang erat dengan orang tua guna memantau tumbuh kembang anak secara optimal.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Nilai-Nilai Utama Kami
              </h2>
              <p className="text-slate-500 text-sm">
                Empat pilar utama yang mendasari setiap proses belajar-mengajar di seluruh cabang Smart Kids.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200/50 rounded-3xl p-6 hover:translate-y-[-4px] transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-5">
                    {v.icon}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-2">{v.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BRANCHES LIST */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Cabang Sekolah Kami
              </h2>
              <p className="text-slate-500 text-sm">
                Smart Kids saat ini mengelola cabang sekolah berikut di bawah naungan YAPCHI Foundation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {schools.map((school) => (
                <div key={school.id} className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center p-2 border border-emerald-100">
                        <Image
                          src={school.logoUrl || "/images/smart_kids_logo.png"}
                          alt={school.name}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-lg">{school.name}</h4>
                        <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-wider">
                          Jenjang {school.level}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {school.address}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-bold">Hubungi: {school.phone}</span>
                    <button
                      onClick={() => {
                        setSelectedSchoolCode(school.code);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-emerald-600 font-extrabold flex items-center gap-1 hover:text-emerald-700 transition-colors"
                    >
                      Aktifkan Cabang <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA PPDB BANNER */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-[20%] translate-y-[-20%] w-96 h-96 bg-white/5 rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Mari Bergabung Bersama Smart Kids!
            </h2>
            <p className="text-emerald-100 text-base max-w-2xl mx-auto leading-relaxed font-medium">
              Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 telah dibuka. Berikan ananda pengalaman belajar terbaik dengan metode bermain sambil belajar yang menyenangkan.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/?tab=ppdb"
                className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-2xl shadow-xl shadow-amber-500/25 transition-all text-sm flex items-center gap-2"
              >
                Daftar PPDB Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="px-8 py-3.5 bg-emerald-700/50 hover:bg-emerald-700/80 border border-emerald-400/30 text-white font-extrabold rounded-2xl transition-all text-sm"
              >
                Lihat Beranda Utama
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer selectedSchoolCode={selectedSchoolCode} />
    </div>
  );
}
