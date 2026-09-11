"use client";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  Calendar,
  Clock,
  CreditCard,
  Upload,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Copy,
  Check,
  Phone,
  Plus,
  BookOpen,
  Sparkles,
  ChevronRight,
  Eye,
  X,
  FileText,
} from "lucide-react";
import LesSdRegistrationModal from "./LesSdRegistrationModal";

interface LesSdParentTabProps {
  admin: any;
  schools: any[];
  bankAccounts: any[];
  onOpenPreview?: (src: string | null, title?: string) => void;
}

export default function LesSdParentTab({
  admin,
  schools = [],
  bankAccounts = [],
  onOpenPreview,
}: LesSdParentTabProps) {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [registeredStudents, setRegisteredStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  // Payment Modal State
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    registrationId: string;
    studentName: string;
    month: string;
    amount: number;
    paymentMethod: string;
    bankName: string;
    proofUrl: string;
    notes: string;
    uploading: boolean;
    submitting: boolean;
    errorMsg: string;
  }>({
    isOpen: false,
    registrationId: "",
    studentName: "",
    month: "Juli 2026",
    amount: 200000,
    paymentMethod: "TRANSFER_BCA",
    bankName: "BCA",
    proofUrl: "",
    notes: "",
    uploading: false,
    submitting: false,
    errorMsg: "",
  });

  const [copiedBankNo, setCopiedBankNo] = useState<string | null>(null);
  const handleCopyBank = (accNo: string) => {
    navigator.clipboard.writeText(accNo.replace(/\s+/g, ""));
    setCopiedBankNo(accNo);
    setTimeout(() => setCopiedBankNo(null), 2500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const cleanPhone = (admin?.phone || "").replace(/\D/g, "");
      const [resReg, resPay, resStu] = await Promise.all([
        fetch("/api/les-sd"),
        fetch("/api/les-sd/payments"),
        cleanPhone ? fetch(`/api/students?parentPhone=${cleanPhone}`) : Promise.resolve(null),
      ]);

      const dataReg = await resReg.json();
      const dataPay = await resPay.json();

      let stuList: any[] = [];
      if (resStu) {
        const dataStu = await resStu.json();
        if (dataStu?.success) stuList = dataStu.data || [];
      }
      if (stuList.length === 0 && Array.isArray(admin?.students)) {
        stuList = admin.students;
      }

      if (dataReg.success) setRegistrations(dataReg.data || []);
      if (dataPay.success) setPayments(dataPay.data || []);
      setRegisteredStudents(stuList);
    } catch (err) {
      console.error("Error fetching parent Les SD data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenPayment = (reg: any) => {
    const currentMonthName = new Date().toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    });

    setPaymentModal({
      isOpen: true,
      registrationId: reg.id,
      studentName: reg.studentName,
      month: currentMonthName || "Juli 2026",
      amount: reg.sppAmount || 200000,
      paymentMethod: "TRANSFER_BCA",
      bankName: "BCA",
      proofUrl: "",
      notes: "",
      uploading: false,
      submitting: false,
      errorMsg: "",
    });
  };

  const handleUploadProof = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPaymentModal((prev) => ({ ...prev, uploading: true, errorMsg: "" }));
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", "les-sd");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengunggah bukti transfer");
      }
      setPaymentModal((prev) => ({
        ...prev,
        proofUrl: data.fileUrl || data.url,
        uploading: false,
      }));
    } catch (err: any) {
      setPaymentModal((prev) => ({
        ...prev,
        errorMsg: err.message || "Gagal upload bukti bayar",
        uploading: false,
      }));
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentModal.proofUrl) {
      setPaymentModal((prev) => ({
        ...prev,
        errorMsg: "Silakan unggah foto bukti transfer terlebih dahulu!",
      }));
      return;
    }

    setPaymentModal((prev) => ({ ...prev, submitting: true, errorMsg: "" }));
    try {
      const res = await fetch("/api/les-sd/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: paymentModal.registrationId,
          studentName: paymentModal.studentName,
          month: paymentModal.month,
          amount: paymentModal.amount,
          paymentMethod: paymentModal.paymentMethod,
          bankName: paymentModal.bankName,
          proofUrl: paymentModal.proofUrl,
          notes: paymentModal.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengirim pembayaran");
      }

      setPaymentModal((prev) => ({ ...prev, isOpen: false, submitting: false }));
      fetchData();
    } catch (err: any) {
      setPaymentModal((prev) => ({
        ...prev,
        errorMsg: err.message || "Terjadi kesalahan saat memproses pembayaran",
        submitting: false,
      }));
    }
  };

  return (
    <div className="space-y-8 w-full">
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/60 via-slate-900 to-teal-900/60 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Program Unggulan Bimbel SD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Bimbingan Belajar & Les SD
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Fasilitas bimbingan belajar komprehensif tingkat Sekolah Dasar (Kelas 1-6 SD) dengan jadwal{" "}
              <strong className="text-emerald-300">1 Minggu 3x Pertemuan</strong> mencakup{" "}
              <strong className="text-emerald-300">Semua Mata Pelajaran</strong> dan didampingi langsung oleh Guru PIC berpengalaman.
            </p>
          </div>

          <button
            onClick={() => setRegisterModalOpen(true)}
            className="self-start sm:self-center px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Daftar Les SD Baru</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400 text-xs">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span>Memuat data program Les SD ananda...</span>
        </div>
      ) : registrations.length === 0 ? (
        /* EMPTY STATE: BELUM ADA ANAK TERDAFTAR */
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 max-w-3xl mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
            📚
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white">Ananda Belum Terdaftar di Program Les SD</h3>
            <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
              Tingkatkan prestasi belajar ananda di sekolah dengan bimbingan intensif 3 kali seminggu bersama pengajar terbaik kami.
            </p>
          </div>

          {/* BENEFIT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl">
              <span className="text-emerald-400 font-black text-sm block mb-1">📅 1 Minggu 3x</span>
              <span className="text-xs text-slate-300">Jadwal fleksibel (Senin/Rabu/Jumat atau Selasa/Kamis/Sabtu)</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl">
              <span className="text-teal-400 font-black text-sm block mb-1">📖 Semua Mapel SD</span>
              <span className="text-xs text-slate-300">Matematika, IPA, B. Indonesia, B. Inggris, IPS & PR Harian</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl">
              <span className="text-amber-400 font-black text-sm block mb-1">💰 SPP Terjangkau</span>
              <span className="text-xs text-slate-300">Hanya Rp 200.000 / bulan tanpa biaya tersembunyi</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Daftarkan Ananda ke Les SD Sekarang</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* DATA STATE: ADA SISWA TERDAFTAR */
        <div className="space-y-8">
          {registrations.map((reg) => {
            const childPayments = payments.filter((p) => p.registrationId === reg.id);
            const currentMonthName = new Date().toLocaleDateString("id-ID", {
              month: "long",
              year: "numeric",
            });
            const latestPayment = childPayments[0];

            return (
              <div
                key={reg.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl transition-all"
              >
                {/* TOP BAR: STUDENT PROFILE & BADGE */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-600/20">
                      {reg.studentName?.charAt(0) || "S"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-xl font-black text-white">{reg.studentName}</h3>
                        <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
                          {reg.registrationNo}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            reg.status === "AKTIF"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : reg.status === "PENDING"
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          {reg.status === "AKTIF" ? "Aktif Belajar" : reg.status === "PENDING" ? "Menunggu Konfirmasi" : reg.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {reg.sdGrade} • Asal: {reg.schoolOrigin || "Sekolah Dasar"} • Cabang: {reg.school?.name || "Smart Kids"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                      onClick={() => handleOpenPayment(reg)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4 text-emerald-200" />
                      <span>Bayar SPP Les SD</span>
                    </button>
                  </div>
                </div>

                {/* INFO CARDS (JADWAL, MAPEL, GURU PIC) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* CARD 1: JADWAL 3X MINGGU */}
                  <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <Calendar className="w-4 h-4" />
                      <span>Jadwal Bimbingan (3x Seminggu)</span>
                    </div>
                    <div className="text-sm font-extrabold text-white">
                      {reg.scheduleDays || "Senin, Rabu, Jumat"}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{reg.scheduleTime || "14:00 - 15:30 WIB"}</span>
                    </div>
                  </div>

                  {/* CARD 2: MATERI MAPEL */}
                  <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                      <BookOpen className="w-4 h-4" />
                      <span>Mata Pelajaran Bimbingan</span>
                    </div>
                    <div className="text-sm font-extrabold text-white">
                      Semua Mata Pelajaran SD
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Matematika, IPA, IPS, Bahasa Indonesia, B. Inggris & Bimbingan PR.
                    </p>
                  </div>

                  {/* CARD 3: GURU PIC */}
                  <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
                      <GraduationCap className="w-4 h-4" />
                      <span>Guru PIC Bimbingan</span>
                    </div>
                    <div className="text-sm font-extrabold text-white flex items-center justify-between">
                      <span>{reg.teacherPicName || reg.teacherPic?.name || "Segera Ditugaskan"}</span>
                      {reg.teacherPic?.phone && (
                        <a
                          href={`https://wa.me/${reg.teacherPic.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Chat WA</span>
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      {reg.teacherPicName
                        ? "Guru pembimbing yang mendampingi ananda selama sesi les."
                        : "Admin akan mengkonfirmasi Guru PIC pengampu les ananda."}
                    </p>
                  </div>
                </div>

                {/* SPP OVERVIEW & PAYMENT HISTORY FOR THIS STUDENT */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-white">Status & Riwayat Pembayaran SPP Les SD</h4>
                      <span className="text-xs font-bold text-emerald-400">
                        (Rp {Number(reg.sppAmount || 200000).toLocaleString("id-ID")}/bln)
                      </span>
                    </div>
                  </div>

                  {childPayments.length === 0 ? (
                    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 text-center text-xs text-slate-400">
                      Belum ada catatan pembayaran SPP. Klik tombol "Bayar SPP Les SD" untuk membayar tagihan.
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                          <tr>
                            <th className="px-4 py-3">Bulan Tagihan</th>
                            <th className="px-4 py-3">Jumlah SPP</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Metode Bayar</th>
                            <th className="px-4 py-3">Tanggal Bayar</th>
                            <th className="px-4 py-3">Bukti Bayar</th>
                            <th className="px-4 py-3 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80">
                          {childPayments.map((pay) => (
                            <tr key={pay.id} className="hover:bg-slate-900/50 transition">
                              <td className="px-4 py-3 font-bold text-white whitespace-nowrap">
                                {pay.month}
                              </td>
                              <td className="px-4 py-3 font-mono font-bold text-emerald-400">
                                Rp {Number(pay.amount || 200000).toLocaleString("id-ID")}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                    pay.status === "lunas"
                                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                      : pay.status === "menunggu_konfirmasi"
                                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse"
                                      : pay.status === "ditolak"
                                      ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                                      : "bg-slate-800 text-slate-400 border-slate-700"
                                  }`}
                                >
                                  {pay.status === "lunas" ? (
                                    <>
                                      <CheckCircle2 className="w-3 h-3" />
                                      <span>Lunas</span>
                                    </>
                                  ) : pay.status === "menunggu_konfirmasi" ? (
                                    <>
                                      <Clock3 className="w-3 h-3" />
                                      <span>Menunggu Konfirmasi</span>
                                    </>
                                  ) : pay.status === "ditolak" ? (
                                    <>
                                      <AlertCircle className="w-3 h-3" />
                                      <span>Ditolak / Unggah Ulang</span>
                                    </>
                                  ) : (
                                    <span>Belum Bayar</span>
                                  )}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-slate-300">
                                {pay.paymentMethod || "Transfer Bank"}
                              </td>
                              <td className="px-4 py-3 text-slate-400">
                                {pay.paymentDate || "-"}
                              </td>
                              <td className="px-4 py-3">
                                {pay.proofUrl ? (
                                  <button
                                    onClick={() =>
                                      onOpenPreview
                                        ? onOpenPreview(pay.proofUrl, `Bukti SPP ${pay.month} - ${reg.studentName}`)
                                        : window.open(pay.proofUrl, "_blank")
                                    }
                                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 underline font-medium cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Lihat Foto</span>
                                  </button>
                                ) : (
                                  <span className="text-slate-500">-</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-right">
                                {pay.status !== "lunas" && (
                                  <button
                                    onClick={() => handleOpenPayment(reg)}
                                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold transition cursor-pointer"
                                  >
                                    {pay.status === "ditolak" ? "Unggah Ulang" : "Bayar"}
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL PEMBAYARAN SPP LES SD */}
      {paymentModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl font-bold">
                  💳
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Pembayaran SPP Les SD</h3>
                  <p className="text-xs text-emerald-100">
                    {paymentModal.studentName} • SPP Rp 200.000 / Bulan
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPaymentModal((prev) => ({ ...prev, isOpen: false }))}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPayment} className="p-6 sm:p-8 space-y-6">
              {paymentModal.errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                  {paymentModal.errorMsg}
                </div>
              )}

              {/* Bulan Tagihan & Nominal */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Bulan Tagihan</label>
                  <select
                    value={paymentModal.month}
                    onChange={(e) => setPaymentModal({ ...paymentModal, month: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    {[
                      "Januari 2026", "Februari 2026", "Maret 2026", "April 2026",
                      "Mei 2026", "Juni 2026", "Juli 2026", "Agustus 2026",
                      "September 2026", "Oktober 2026", "November 2026", "Desember 2026",
                    ].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Nominal SPP</label>
                  <div className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-400">
                    Rp {Number(paymentModal.amount).toLocaleString("id-ID")}
                  </div>
                </div>
              </div>

              {/* REKENING PEMBAYARAN RESMI SEKOLAH */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Pilih Rekening Tujuan Transfer:
                </label>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {bankAccounts.length > 0 ? (
                    bankAccounts.map((acc: any) => (
                      <div
                        key={acc.id}
                        onClick={() =>
                          setPaymentModal({
                            ...paymentModal,
                            bankName: acc.bankName,
                            paymentMethod: `TRANSFER_${acc.bankName}`,
                          })
                        }
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          paymentModal.bankName === acc.bankName
                            ? "bg-emerald-950/40 border-emerald-500 text-white"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{acc.bankName}</div>
                          <div className="text-[11px] font-mono text-slate-300 font-semibold">
                            {acc.accountNumber} a.n {acc.accountHolder}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyBank(acc.accountNumber);
                          }}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold rounded-lg transition flex items-center gap-1"
                        >
                          {copiedBankNo === acc.accountNumber ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>{copiedBankNo === acc.accountNumber ? "Tersalin" : "Salin"}</span>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                      BCA: <span className="font-mono font-bold text-emerald-400">123-456-7890</span> a.n Yayasan Smart Kids
                    </div>
                  )}
                </div>
              </div>

              {/* UPLOAD FOTO BUKTI TRANSFER */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Unggah Foto Bukti Transfer <span className="text-rose-400">*</span>
                </label>
                {paymentModal.proofUrl ? (
                  <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Bukti transfer berhasil diunggah</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPaymentModal((prev) => ({ ...prev, proofUrl: "" }))}
                      className="text-xs text-rose-400 hover:underline"
                    >
                      Ganti Foto
                    </button>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl p-6 text-center cursor-pointer transition bg-slate-950/40">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadProof}
                      disabled={paymentModal.uploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                      <Upload className="w-6 h-6 text-emerald-400 animate-bounce" />
                      <span className="text-xs font-bold text-white">
                        {paymentModal.uploading ? "Sedang Mengunggah Foto..." : "Klik untuk Memilih Bukti Transfer"}
                      </span>
                      <span className="text-[10px] text-slate-500">Format PNG, JPG, JPEG (Maks. 5 MB)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* CATATAN */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Catatan Pembayaran (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: Transfer via m-BCA a.n Ibu Maya"
                  value={paymentModal.notes}
                  onChange={(e) => setPaymentModal({ ...paymentModal, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={paymentModal.submitting || paymentModal.uploading || !paymentModal.proofUrl}
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/30 transition disabled:opacity-50 cursor-pointer"
                >
                  {paymentModal.submitting ? "Mengirim Konfirmasi..." : "Kirim Bukti Pembayaran"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL REGISTRASI LES SD */}
      <LesSdRegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        schools={schools}
        registeredStudents={registeredStudents}
        defaultParentName={admin?.name?.replace(/^wali\s+/i, "") || ""}
        defaultParentPhone={admin?.phone || ""}
        defaultParentEmail={admin?.email || ""}
        onSuccess={() => {
          fetchData();
        }}
      />
    </div>
  );
}
