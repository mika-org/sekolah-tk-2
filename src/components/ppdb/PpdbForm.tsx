"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import {
  User,
  FileText,
  Upload,
  Check,
  CheckCircle2,
  Copy,
  Info,
  ShieldCheck,
  CreditCard,
  QrCode,
  Wallet,
  ArrowLeft,
  Sparkles,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

interface PpdbFormProps {
  onBackToHome: () => void;
}

export default function PpdbForm({ onBackToHome }: PpdbFormProps) {
  const [step, setStep] = useState<number>(1);

  // Form State prefilled with realistic data matching image 3 reference
  const [formData, setFormData] = useState({
    namaAnak: "Eti Sulastri",
    jenisKelamin: "Perempuan",
    agama: "Islam",
    tempatLahir: "Jombang",
    tanggalLahir: "17 Agustus 2021",
    usiaAnak: "5 Tahun",
    program: "Kindergarten",
    namaOrtu: "Agus Mulyana",
    noWhatsapp: "0812 3456 7890",
    email: "agusmulyana1945@gmail.com",
    alamatRumah:
      "Jl. Turangga No. 25E RT 03 RW 09, Kelurahan Lingkar Selatan, Kecamatan Lengkong, Kota Bandung, Jawa Barat 40263",
    agreedTerms: true,
  });

  // Uploaded files simulation state
  const [documents, setDocuments] = useState<{ [key: string]: string | null }>({
    kk: "kk_eti_sulastri.pdf",
    akta: "akta_kelahiran.pdf",
    foto: "foto_anak_eti.jpg",
    ktp: "ktp_agus_mulyana.jpg",
    buktiBayar: null,
  });

  // Payment tab state
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "qris" | "tunai">(
    "bank"
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [regId, setRegId] = useState<string>("PPDB-2026-8821");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (docKey: string, fileName: string) => {
    setDocuments((prev) => ({ ...prev, [docKey]: fileName }));
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("1310012345678");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFinish = () => {
    setRegId(`PPDB-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    // Trigger confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* HEADER & HERO BANNER */}
      <div className="bg-[#e8f4ec] rounded-3xl p-6 sm:p-8 border border-emerald-100 mb-8 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Form Pendaftaran
            </h1>
            <p className="text-sm font-semibold text-emerald-800">
              {step === 1 && "Isi data berikut untuk mendaftarkan si kecil"}
              {step === 2 && "Konfirmasi data sebelum dikirim"}
              {step === 3 && "Lakukan pembayaran sebelum selesai"}
            </p>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              {step === 1 &&
                "Langkah pertama menuju pengalaman belajar yang seru, berkualitas, dan penuh makna"}
              {step === 2 &&
                "Periksa kembali data anda. Pastikan semua informasi sudah benar sebelum menyelesaikan pendaftaran anda"}
              {step === 3 &&
                "Pilih metode pembayaran dan lakukan pembayaran sesuai instruksi yang tersedia"}
            </p>
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end items-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 shrink-0 md:-my-4">
              <Image
                src="/images/owl_mascot_ppdb-removebg-preview.png"
                alt="Smart Kids Owl Mascot PPDB"
                fill
                sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
                priority
                className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* STEPPER PROGRESS BAR */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs mb-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 relative">
          {/* Step 1 */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 transition-all ${
                step >= 1
                  ? "bg-[#057a44] text-white ring-4 ring-emerald-100"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {step > 1 ? <Check className="w-5 h-5" /> : "1"}
            </div>
            <div className="hidden sm:block">
              <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                Isi Data
              </h4>
              <p className="text-[11px] text-slate-500">Lengkapi data pendaftaran</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 transition-all ${
                step >= 2
                  ? "bg-[#057a44] text-white ring-4 ring-emerald-100"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {step > 2 ? <Check className="w-5 h-5" /> : "2"}
            </div>
            <div className="hidden sm:block">
              <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                Konfirmasi
              </h4>
              <p className="text-[11px] text-slate-500">Cek kembali data anda</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 transition-all ${
                step === 3
                  ? "bg-[#057a44] text-white ring-4 ring-emerald-100"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              3
            </div>
            <div className="hidden sm:block">
              <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                Pembayaran
              </h4>
              <p className="text-[11px] text-slate-500">Lakukan pembayaran</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FORM CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Step-specific form elements) */}
        <div className="lg:col-span-8 space-y-6">
          {/* ==================== STEP 1: ISI DATA ==================== */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Form Data Pendaftar Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    Data Pendaftar
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Nama Anak */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Nama Anak
                    </label>
                    <input
                      type="text"
                      name="namaAnak"
                      value={formData.namaAnak}
                      onChange={handleInputChange}
                      placeholder="Masukan nama lengkap anak"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
                    />
                  </div>

                  {/* Row: Jenis Kelamin & Agama */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Jenis Kelamin
                      </label>
                      <select
                        name="jenisKelamin"
                        value={formData.jenisKelamin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
                      >
                        <option value="">Pilih jenis kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Agama
                      </label>
                      <select
                        name="agama"
                        value={formData.agama}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
                      >
                        <option value="">Pilih agama</option>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Khonghucu">Khonghucu</option>
                      </select>
                    </div>
                  </div>

                  {/* Row: Tempat Lahir & Tanggal Lahir */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Tempat Lahir
                      </label>
                      <input
                        type="text"
                        name="tempatLahir"
                        value={formData.tempatLahir}
                        onChange={handleInputChange}
                        placeholder="Masukan tempat lahir"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Tanggal Lahir
                      </label>
                      <input
                        type="text"
                        name="tanggalLahir"
                        value={formData.tanggalLahir}
                        onChange={handleInputChange}
                        placeholder="Masukan tanggal lahir"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Row: Usia Anak & Program */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Usia Anak
                      </label>
                      <input
                        type="text"
                        name="usiaAnak"
                        value={formData.usiaAnak}
                        onChange={handleInputChange}
                        placeholder="Masukan usia anak"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Program
                      </label>
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
                      >
                        <option value="">Pilih program</option>
                        <option value="Playground">Playground (3-4 Thn)</option>
                        <option value="Kindergarten">Kindergarten (4-5 Thn)</option>
                        <option value="Pre Kindergarten">Pre Kindergarten (5-6 Thn)</option>
                      </select>
                    </div>
                  </div>

                  {/* Nama Orang Tua/Wali */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Nama Orang Tua/Wali
                    </label>
                    <input
                      type="text"
                      name="namaOrtu"
                      value={formData.namaOrtu}
                      onChange={handleInputChange}
                      placeholder="Masukan nama orang tua/wali"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
                    />
                  </div>

                  {/* Row: No WhatsApp & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        No. Whatsapp
                      </label>
                      <input
                        type="text"
                        name="noWhatsapp"
                        value={formData.noWhatsapp}
                        onChange={handleInputChange}
                        placeholder="masukan no whatsapp"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="masukan email"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Alamat Rumah */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Alamat Rumah
                    </label>
                    <textarea
                      name="alamatRumah"
                      rows={3}
                      value={formData.alamatRumah}
                      onChange={handleInputChange}
                      placeholder="Masukan alamat rumah lengkap"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Dokumen Pendaftar Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    Dokumen Pendaftar
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Dropzone 1: Kartu Keluarga */}
                  <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center min-h-[120px]">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs block">
                      Kartu Keluarga
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {documents.kk ? (
                        <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {documents.kk}
                        </span>
                      ) : (
                        "Unggah kartu keluarga"
                      )}
                    </span>
                  </div>

                  {/* Dropzone 2: Akta Kelahiran */}
                  <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center min-h-[120px]">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs block">
                      Akta Kelahiran
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {documents.akta ? (
                        <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {documents.akta}
                        </span>
                      ) : (
                        "Unggah akta kelahiran"
                      )}
                    </span>
                  </div>

                  {/* Dropzone 3: Foto Anak */}
                  <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center min-h-[120px]">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs block">
                      Foto Anak
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {documents.foto ? (
                        <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {documents.foto}
                        </span>
                      ) : (
                        "Unggah foto anak"
                      )}
                    </span>
                  </div>

                  {/* Dropzone 4: KTP Orang Tua/Wali */}
                  <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center min-h-[120px]">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs block">
                      KTP Orang Tua/Wali
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {documents.ktp ? (
                        <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {documents.ktp}
                        </span>
                      ) : (
                        "Unggah KTP orang tua/wali"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkbox Terms & Navigation */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.agreedTerms}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, agreedTerms: e.target.checked }))
                    }
                    className="w-4 h-4 text-emerald-700 border-slate-300 rounded focus:ring-emerald-500"
                  />
                  <span>
                    Saya menyetujui Syarat & ketentuan dan Kebijakan Privasi Smart Kids
                  </span>
                </label>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    onClick={onBackToHome}
                    className="px-8 py-3 rounded-full border border-emerald-600 text-emerald-700 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-colors"
                  >
                    Kembali
                  </button>

                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3 rounded-full bg-[#057a44] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STEP 2: KONFIRMASI DATA ==================== */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    Ringkasan Data Pendaftaran
                  </h3>
                </div>

                {/* Grid summary details */}
                <div className="space-y-3.5 text-xs text-slate-700">
                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Nama Lengkap Anak
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.namaAnak}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Jenis Kelamin
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.jenisKelamin}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Agama
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.agama}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Tempat Lahir
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.tempatLahir}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Tanggal Lahir
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.tanggalLahir}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Usia Anak
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.usiaAnak}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Program
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                      {formData.program}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Nama Orang Tua/Wali
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.namaOrtu}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      No. Whatsapp
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.noWhatsapp}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Email
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.email}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Alamat Lengkap
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900 leading-relaxed">
                      {formData.alamatRumah}
                    </span>
                  </div>
                </div>

                {/* Perhatian Warning Box */}
                <div className="bg-[#fff8e7] rounded-2xl p-4 border border-amber-200 flex items-start gap-3 text-xs">
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 font-bold">
                    i
                  </div>
                  <div>
                    <h5 className="font-extrabold text-amber-950 mb-0.5">
                      Perhatian
                    </h5>
                    <p className="text-amber-900/80">
                      Pastikan semua data sudah benar. Data yang sudah dikirim tidak dapat diubah
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-3 rounded-full border border-emerald-600 text-emerald-700 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-colors"
                  >
                    Kembali
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-3 rounded-full bg-[#057a44] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    Selanjutnya
                  </button>
                </div>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-slate-400 inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Data anda aman dan hanya digunakan untuk keperluan pendaftaran
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STEP 3: PEMBAYARAN ==================== */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    Detail Pembayaran
                  </h3>
                </div>

                {/* Table of cost breakdown */}
                <div className="space-y-2 text-xs text-slate-700 border-b border-slate-100 pb-4">
                  <div className="flex justify-between items-center py-1">
                    <span className="font-semibold text-slate-700">
                      Biaya Pendaftaran
                    </span>
                    <span className="font-semibold text-slate-400">:</span>
                    <span className="font-bold text-slate-900">
                      Rp 250.000,00
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-semibold text-slate-700">Seragam</span>
                    <span className="font-semibold text-slate-400">:</span>
                    <span className="font-bold text-slate-900">
                      Rp 150.000,00
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-sm">
                    <span className="font-extrabold text-slate-900">Total</span>
                    <span className="font-semibold text-slate-400">:</span>
                    <span className="font-extrabold text-emerald-700 text-base">
                      Rp 400.000,00
                    </span>
                  </div>
                </div>

                {/* Payment Methods Selector (3 Cards) */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 rounded-2xl border text-center font-bold text-xs transition-all ${
                      paymentMethod === "bank"
                        ? "bg-[#057a44] text-white border-[#057a44] shadow-md"
                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1.5 opacity-90" />
                    <span>Bank Transfer</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("qris")}
                    className={`p-4 rounded-2xl border text-center font-bold text-xs transition-all ${
                      paymentMethod === "qris"
                        ? "bg-[#057a44] text-white border-[#057a44] shadow-md"
                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1.5 opacity-90" />
                    <span>Qris/E-Wallet</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("tunai")}
                    className={`p-4 rounded-2xl border text-center font-bold text-xs transition-all ${
                      paymentMethod === "tunai"
                        ? "bg-[#057a44] text-white border-[#057a44] shadow-md"
                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <Wallet className="w-5 h-5 mx-auto mb-1.5 opacity-90" />
                    <span>Tunai</span>
                  </button>
                </div>

                {/* Active Payment Method Details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left Account Card */}
                  <div className="md:col-span-7 bg-[#e8f1fd] rounded-2xl p-5 border border-blue-200 space-y-2">
                    <span className="text-xs font-bold text-slate-600 block">
                      Bank Mandiri
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-wider">
                        131 00 1234567 8
                      </span>
                      <button
                        onClick={handleCopyAccount}
                        className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-blue-700 transition-colors relative"
                        title="Salin No. Rekening"
                      >
                        <Copy className="w-4 h-4" />
                        {copied && (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow">
                            Tersalin!
                          </span>
                        )}
                      </button>
                    </div>
                    <span className="text-xs text-slate-600 block">
                      a.n. Smart Kids
                    </span>
                  </div>

                  {/* Right Upload Bukti Dropzone */}
                  <div className="md:col-span-5 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-1.5">
                      <Upload className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs block">
                      Bukti Pembayaran / KTP
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {documents.buktiBayar ? (
                        <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1 mt-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {documents.buktiBayar}
                        </span>
                      ) : (
                        "Unggah bukti pembayaran"
                      )}
                    </span>
                  </div>
                </div>

                {/* Perhatian Transfer Note */}
                <div className="bg-[#fff8e7] rounded-2xl p-4 border border-amber-200 flex items-start gap-3 text-xs">
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 font-bold">
                    i
                  </div>
                  <div>
                    <h5 className="font-extrabold text-amber-950 mb-0.5">
                      Perhatian
                    </h5>
                    <p className="text-amber-900/80">
                      Tulis berita transfer: PPDB Smart Kids - Nama anak. Contoh: &quot;PPDB Smart Kids - {formData.namaAnak}&quot;
                    </p>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3 rounded-full border border-emerald-600 text-emerald-700 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-colors"
                  >
                    Kembali
                  </button>

                  <button
                    onClick={handleFinish}
                    className="px-10 py-3 rounded-full bg-[#057a44] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    Selesai
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Shared Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>

      {/* SUCCESS CONFIRMATION MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-6 border border-emerald-100 shadow-2xl relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <Sparkles className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900">
                Pendaftaran Berhasil! 🎉
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Terima kasih telah mendaftarkan <strong className="text-emerald-800">{formData.namaAnak}</strong> di TK Smart Kids DeKeraton. Tim kami akan segera melakukan verifikasi dan menghubungi Anda via WhatsApp.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-600 border border-slate-100 text-left space-y-1">
              <p>
                <strong>No. Registrasi:</strong> {regId}
              </p>
              <p>
                <strong>Program:</strong> {formData.program}
              </p>
              <p>
                <strong>Orang Tua:</strong> {formData.namaOrtu} ({formData.noWhatsapp})
              </p>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                onBackToHome();
              }}
              className="w-full py-3.5 bg-[#057a44] hover:bg-emerald-800 text-white font-bold text-sm rounded-full shadow-md transition-all"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
