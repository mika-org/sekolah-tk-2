"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, Clock, AlertTriangle, ExternalLink } from "lucide-react";

interface SidebarProps {
  siteProfile?: any;
  selectedSchoolCode?: string;
}

export default function Sidebar({
  siteProfile: initialSiteProfile,
  selectedSchoolCode = "sadjati",
}: SidebarProps) {
  const [profile, setProfile] = useState<any>(initialSiteProfile || null);

  useEffect(() => {
    if (initialSiteProfile) {
      setProfile(initialSiteProfile);
      return;
    }

    if (selectedSchoolCode) {
      fetch(`/api/site-profile?schoolCode=${selectedSchoolCode}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.success && data.data) {
            setProfile(data.data);
          }
        })
        .catch(() => {});
    }
  }, [initialSiteProfile, selectedSchoolCode]);

  const helpTitle = profile?.helpTitle || "Butuh Bantuan?";
  const helpSubtitle = profile?.helpSubtitle || "Tim kami siap membantu anda setiap hari!";
  const phone = profile?.phone || "0812 3456 7890";
  const instagram = profile?.instagram || "smartkids";
  const facebook = profile?.facebook || "Smart Kids";
  const helpHours = profile?.helpHours || "Senin - Sabtu | 08.00 - 17.00 WIB";
  const importantNotice =
    profile?.importantNotice || "Pastikan data yang dimasukan pada form pendaftaran sudah sesuai";

  // Format WhatsApp Link
  const rawDigits = phone.replace(/[^0-9]/g, "");
  const waNumber = rawDigits.startsWith("0")
    ? "62" + rawDigits.substring(1)
    : rawDigits.startsWith("62")
    ? rawDigits
    : "62" + rawDigits;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Halo Admin Sekolah, saya membutuhkan bantuan terkait pendaftaran PPDB / informasi sekolah."
  )}`;

  const igHandle = instagram.replace(/^@/, "").trim();
  const igUrl = `https://instagram.com/${igHandle}`;
  const fbUrl = facebook.startsWith("http")
    ? facebook
    : `https://facebook.com/search/top?q=${encodeURIComponent(facebook)}`;

  return (
    <div className="space-y-6">
      {/* Butuh Bantuan? Card */}
      <div className="bg-[#e8f4ec] rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-lg">{helpTitle}</h3>
          <p className="text-xs text-slate-600">{helpSubtitle}</p>
        </div>

        <div className="bg-white/90 rounded-2xl p-4 space-y-3 border border-emerald-100 shadow-xs">
          {/* WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-emerald-50/70 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-700 block leading-tight">
                  Whatsapp
                </span>
                <span className="text-xs text-emerald-700 font-semibold group-hover:underline">
                  {phone}
                </span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
          </a>

          {/* Instagram */}
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-emerald-50/70 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-700 block leading-tight">
                  Instagram
                </span>
                <span className="text-xs text-slate-600 font-semibold group-hover:text-pink-600">
                  @{igHandle}
                </span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-600 shrink-0" />
          </a>

          {/* Facebook */}
          <a
            href={fbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-emerald-50/70 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-700 block leading-tight">
                  Facebook
                </span>
                <span className="text-xs text-slate-600 font-semibold group-hover:text-blue-600">
                  {facebook}
                </span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
          </a>

          {/* Jam Operasional */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{helpHours}</span>
          </div>
        </div>
      </div>

      {/* Penting!! Card */}
      <div className="bg-[#fff9e6] rounded-3xl p-6 border border-amber-200/80 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 text-amber-800 font-extrabold text-base mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Penting!!</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {importantNotice}
          </p>
        </div>

        <div className="relative w-full h-36 flex items-center justify-center">
          <Image
            src="/images/school_house.png"
            alt="School house graphic"
            fill
            sizes="(max-width: 1024px) 100vw, 360px"
            className="object-contain drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
