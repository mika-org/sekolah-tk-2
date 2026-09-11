"use client";

import { useState } from "react";
import {
  X,
  BookOpen,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Award,
  Phone,
  User,
  GraduationCap,
  Building,
  Check,
  Copy,
  ArrowRight,
} from "lucide-react";

interface LesSdRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools?: any[];
  defaultSchoolId?: string;
  defaultParentName?: string;
  defaultParentPhone?: string;
  defaultParentEmail?: string;
  registeredStudents?: any[];
  onSuccess?: () => void;
}

export default function LesSdRegistrationModal({
  isOpen,
  onClose,
  schools = [],
  defaultSchoolId,
  defaultParentName = "",
  defaultParentPhone = "",
  defaultParentEmail = "",
  registeredStudents = [],
  onSuccess,
}: LesSdRegistrationModalProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    nisn: "",
    gender: "L",
    sdGrade: "Kelas 1 SD",
    schoolOrigin: "",
    parentName: defaultParentName,
    parentPhone: defaultParentPhone,
    parentEmail: defaultParentEmail,
    address: "",
    schoolId: defaultSchoolId || (schools[0]?.id ?? ""),
    scheduleDays: "Senin, Rabu, Jumat",
    scheduleTime: "14:00 - 15:30 WIB",
    notes: "",
  });

  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState<{
    registrationNo: string;
    studentName: string;
    accountInfo?: { username: string; password: string } | null;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // If registeredStudents is passed and changes, handle auto-selection
  const handleSelectRegisteredStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    if (!studentId) return;

    const student = registeredStudents.find((s) => s.id === studentId);
    if (student) {
      setFormData((prev) => ({
        ...prev,
        studentName: student.name || prev.studentName,
        nisn: student.nisn || prev.nisn,
        gender: student.gender || prev.gender,
        schoolId: student.schoolId || prev.schoolId,
        parentName: student.parentName || prev.parentName,
        parentPhone: student.parentPhone || prev.parentPhone,
        parentEmail: student.parentEmail || prev.parentEmail,
        address: student.address || prev.address,
        schoolOrigin: student.className ? `Smart Kids (${student.className})` : prev.schoolOrigin,
      }));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.studentName.trim()) {
      setErrorMsg("Nama siswa SD wajib diisi!");
      return;
    }
    if (!formData.parentName.trim()) {
      setErrorMsg("Nama orang tua/wali wajib diisi!");
      return;
    }
    if (!formData.parentPhone.trim()) {
      setErrorMsg("Nomor WhatsApp orang tua wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/les-sd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sppAmount: 200000,
          programPackage: "1 Minggu 3x Pertemuan - Semua Mata Pelajaran",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengirim pendaftaran");
      }

      setSuccessData({
        registrationNo: data.data.registrationNo,
        studentName: data.data.studentName,
        accountInfo: data.accountInfo,
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan saat pendaftaran");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRegNo = () => {
    if (successData?.registrationNo) {
      navigator.clipboard.writeText(successData.registrationNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-xl shadow-inner border border-white/30">
              📚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight">Formulir Pendaftaran Les SD</h3>
                <span className="text-[10px] uppercase font-black tracking-wider bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full shadow-sm">
                  1 Minggu 3x
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-medium">
                Bimbel SD Semua Mapel • Biaya SPP Rp 200.000 / Bulan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feature Highlights Banner */}
        <div className="bg-slate-950/60 border-b border-slate-800/80 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Semua Mata Pelajaran (Matematika, IPA, IPS, B.Indo, B.Inggris)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <span className="flex items-center gap-1 font-mono font-bold text-amber-400">
              <Calendar className="w-3.5 h-3.5" /> 3x Pertemuan / Minggu
            </span>
            <span className="text-emerald-400 font-black">
              SPP Rp 200.000 / bln
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {successData ? (
            /* SUCCESS STATE */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-3xl shadow-xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-black text-white tracking-tight">
                  Pendaftaran Les SD Berhasil!
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Data ananda <strong className="text-emerald-400">{successData.studentName}</strong> telah berhasil kami terima.
                </p>
              </div>

              {/* Registration Number Card */}
              <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Nomor Registrasi Les SD</div>
                  <div className="text-base font-mono font-extrabold text-emerald-400">
                    {successData.registrationNo}
                  </div>
                </div>
                <button
                  onClick={handleCopyRegNo}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin!" : "Salin"}</span>
                </button>
              </div>

              {/* Login Info Card if Account Created */}
              {successData.accountInfo && (
                <div className="max-w-md mx-auto bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 text-left space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                    <Award className="w-4 h-4" />
                    <span>Akun Portal Orang Tua Telah Aktif:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Username/No WA:</span>
                      <span className="text-emerald-400 font-bold">{successData.accountInfo.username}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Password:</span>
                      <span className="text-emerald-400 font-bold">{successData.accountInfo.password}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Gunakan akun ini untuk masuk ke portal orang tua, melihat jadwal belajar ananda, dan melakukan pembayaran SPP bulanan.
                  </p>
                </div>
              )}

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition cursor-pointer"
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                  {errorMsg.toLowerCase().includes("terdaftar") && (
                    <div className="pt-1">
                      <a
                        href="/admin/login"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-white font-bold text-[11px] transition"
                      >
                        <span>Masuk ke Portal Orang Tua</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* EXCLUSIVE BADGE NOTICE */}
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3.5 flex items-start gap-3 text-xs">
                <span className="text-base shrink-0">🔒</span>
                <div className="space-y-1">
                  <p className="font-extrabold text-emerald-300">
                    Program Eksklusif: Khusus Murid & Orang Tua Terdaftar Smart Kids
                  </p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Pendaftaran bimbingan belajar Les SD diverifikasi dengan Nomor WhatsApp atau Nama Murid yang sudah tercatat resmi di database sekolah.
                    {registeredStudents.length === 0 && (
                      <> Sudah terdaftar? <a href="/admin/login" className="text-amber-400 hover:underline font-bold inline-flex items-center gap-0.5">Masuk ke Portal Orang Tua &rarr;</a></>
                    )}
                  </p>
                </div>
              </div>

              {/* NOTICE JIKA DIBUKA DI LUAR AKUN ORTU */}
              {!defaultParentPhone && registeredStudents.length === 0 && (
                <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4 flex items-start gap-3 text-xs">
                  <span className="text-xl shrink-0">⚠️</span>
                  <div className="space-y-1.5 flex-1">
                    <p className="font-extrabold text-amber-300 text-sm">
                      Pendaftaran Depan Ditutup: Khusus Melalui Akun Orang Tua
                    </p>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Pendaftaran program Les SD hanya dapat dilakukan oleh orang tua/wali siswa yang telah terdaftar di sekolah. Silakan login ke Akun Orang Tua Anda untuk memilih jadwal dan mendaftarkan ananda.
                    </p>
                    <div className="pt-1">
                      <a
                        href="/admin/login"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md"
                      >
                        <span>Masuk ke Akun Orang Tua &rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* REGISTERED STUDENT SELECTOR (IF PARENT IS LOGGED IN) */}
              {registeredStudents.length > 0 && (
                <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-3.5 space-y-1.5 shadow-inner">
                  <label className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pilih Ananda yang Sudah Terdaftar:</span>
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => handleSelectRegisteredStudent(e.target.value)}
                    className="w-full bg-slate-900 border border-emerald-500/40 focus:border-emerald-400 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  >
                    <option value="">-- Pilih Ananda Terdaftar (Otomatis Isi Data) --</option>
                    {registeredStudents.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.className || "Siswa Terdaftar"} {s.school?.name ? `• ${s.school.name}` : ""})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* SEKSI 1: DATA SISWA SD */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Data Siswa / Ananda (Tingkat SD)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Nama Lengkap Anak <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Muhammad Rayyan"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      NISN / No. Induk <span className="text-slate-500 font-normal">(Siswa Terdaftar)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 1001"
                      value={formData.nisn}
                      onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Tingkat Kelas SD <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={formData.sdGrade}
                      onChange={(e) => setFormData({ ...formData, sdGrade: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
                    >
                      <option value="Kelas 1 SD">Kelas 1 SD</option>
                      <option value="Kelas 2 SD">Kelas 2 SD</option>
                      <option value="Kelas 3 SD">Kelas 3 SD</option>
                      <option value="Kelas 4 SD">Kelas 4 SD</option>
                      <option value="Kelas 5 SD">Kelas 5 SD</option>
                      <option value="Kelas 6 SD">Kelas 6 SD</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Jenis Kelamin</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
                    >
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300">
                      Nama Asal Sekolah SD
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: SDN 1 DeKeraton / SDN Cikarang Pusat"
                      value={formData.schoolOrigin}
                      onChange={(e) => setFormData({ ...formData, schoolOrigin: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* SEKSI 2: DATA ORANG TUA / WALI */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-400 border-b border-slate-800 pb-2">
                  <User className="w-4 h-4" />
                  <span>Data Orang Tua / Wali Murid</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300">
                      Nama Orang Tua / Wali <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bapak Hendra / Ibu Maya"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      No. WhatsApp (WA) Aktif <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Email Orang Tua (Opsional)</label>
                    <input
                      type="email"
                      placeholder="contoh: orangtua@gmail.com"
                      value={formData.parentEmail}
                      onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Alamat Tempat Tinggal</label>
                    <input
                      type="text"
                      placeholder="Alamat domisili saat ini"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* SEKSI 3: CABANG SEKOLAH & JADWAL PILIHAN (3X SEMINGGU) */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Pilihan Cabang & Jadwal (1 Minggu 3x Pertemuan)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {schools.length > 0 && (
                    <div className="space-y-1.5 sm:col-span-3">
                      <label className="text-xs font-bold text-slate-300">Cabang Belajar Les</label>
                      <select
                        value={formData.schoolId}
                        onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
                      >
                        {schools.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.code.toUpperCase()})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300">
                      Pilihan Hari Bimbingan (3x Seminggu)
                    </label>
                    <select
                      value={formData.scheduleDays}
                      onChange={(e) => setFormData({ ...formData, scheduleDays: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
                    >
                      <option value="Senin, Rabu, Jumat">Senin, Rabu, Jumat (3x Pertemuan)</option>
                      <option value="Selasa, Kamis, Sabtu">Selasa, Kamis, Sabtu (3x Pertemuan)</option>
                      <option value="Jadwal Fleksibel (Koordinasi dengan Guru PIC)">
                        Jadwal Fleksibel (Koordinasi dengan Guru PIC)
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Sesi Jam Bimbingan</label>
                    <select
                      value={formData.scheduleTime}
                      onChange={(e) => setFormData({ ...formData, scheduleTime: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
                    >
                      <option value="14:00 - 15:30 WIB">14:00 - 15:30 WIB (Sore 1)</option>
                      <option value="15:30 - 17:00 WIB">15:30 - 17:00 WIB (Sore 2)</option>
                      <option value="18:30 - 20:00 WIB">18:30 - 20:00 WIB (Malam)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-3">
                    <label className="text-xs font-bold text-slate-300">
                      Catatan Belajar Khusus / Mapel Prioritas (Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Fokus penguatan Matematika berhitung dan B. Inggris"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* RINGKASAN BIAYA SPP */}
              <div className="bg-gradient-to-r from-emerald-950/40 via-slate-950 to-teal-950/40 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Biaya SPP Les SD Bulanan:
                  </span>
                  <span className="text-xl font-black text-emerald-400">
                    Rp 200.000 <span className="text-xs font-normal text-slate-400">/ bulan</span>
                  </span>
                </div>
                <div className="text-xs text-slate-400 text-center sm:text-right">
                  <span>Semua Mata Pelajaran • 3x Pertemuan / Minggu</span>
                </div>
              </div>

              {/* TOMBOL SUBMIT */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Mengirim Data...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Kirim Pendaftaran Les SD</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
