"use client";

import { useState, useEffect } from "react";
import {
  Users,
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
  CreditCard,
  BookOpen,
  Eye,
  Check,
  X,
  FileEdit,
  Save,
} from "lucide-react";

interface LesSdTeacherTabProps {
  admin: any;
  onOpenPreview?: (src: string | null, title?: string) => void;
}

export default function LesSdTeacherTab({
  admin,
  onOpenPreview,
}: LesSdTeacherTabProps) {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Note editing per student
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState<string>("");
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resReg, resPay] = await Promise.all([
        fetch("/api/les-sd"),
        fetch("/api/les-sd/payments"),
      ]);

      const dataReg = await resReg.json();
      const dataPay = await resPay.json();

      if (dataReg.success) setRegistrations(dataReg.data || []);
      if (dataPay.success) setPayments(dataPay.data || []);
    } catch (err) {
      console.error("Failed to load teacher Les SD data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveNotes = async (id: string) => {
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/les-sd/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notesText }),
      });
      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, notes: notesText } : r))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error("Failed to save student notes:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleVerifyPayment = async (paymentId: string, newStatus: "lunas" | "ditolak") => {
    try {
      const res = await fetch(`/api/les-sd/payments/${paymentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setPayments((prev) =>
          prev.map((p) =>
            p.id === paymentId
              ? {
                  ...p,
                  status: newStatus,
                  verifiedBy: admin?.name || "Guru PIC",
                  verifiedAt: new Date().toISOString(),
                }
              : p
          )
        );
      }
    } catch (err) {
      console.error("Failed to verify payment:", err);
    }
  };

  // Filter students assigned to this teacher PIC (or all if not filtered)
  const myStudents = registrations;
  const currentMonth = new Date().toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  // Calculate current month SPP status
  const totalMyStudents = myStudents.length;
  const lunasCount = myStudents.filter((s) => {
    const pay = payments.find((p) => p.registrationId === s.id && p.status === "lunas");
    return !!pay;
  }).length;
  const unpaidCount = totalMyStudents - lunasCount;

  return (
    <div className="space-y-6 w-full">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-black text-white tracking-tight">
              Bimbingan Belajar Les SD (Portal Guru PIC)
            </h2>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Guru Pengampu PIC
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Rekapitulasi siswa bimbingan Les SD binaan Anda, koordinasi WhatsApp orang tua, dan pemantauan status SPP bulanan.
          </p>
        </div>
      </div>

      {/* METRIC KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Total Murid Bimbingan</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalMyStudents}</div>
          <div className="text-[10px] text-slate-500">1 Minggu 3x pertemuan bimbingan</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">SPP Lunas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{lunasCount}</div>
          <div className="text-[10px] text-slate-500">Murid dengan pembayaran terverifikasi</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Belum Bayar / Menunggu</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{unpaidCount}</div>
          <div className="text-[10px] text-slate-500">Dapat dibantu diingatkan via WA</div>
        </div>
      </div>

      {/* STUDENT LIST & SPP RECAP */}
      {loading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Memuat data bimbingan Les SD...</div>
      ) : myStudents.length === 0 ? (
        <div className="py-12 bg-slate-900/50 border border-slate-800 rounded-3xl text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-xl">
            📚
          </div>
          <div className="text-sm font-bold text-white">Belum Ada Murid Les SD yang Ditugaskan</div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Admin akan segera menugaskan murid bimbingan Les SD kepada akun Anda.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Daftar Murid Bimbingan & Rekap SPP Bulanan
          </div>

          <div className="grid grid-cols-1 gap-4">
            {myStudents.map((student) => {
              const studentPayments = payments.filter((p) => p.registrationId === student.id);
              const currentPayment = studentPayments[0];

              const isEditingNotes = editingNotesId === student.id;

              return (
                <div
                  key={student.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 rounded-3xl p-6 space-y-5 shadow-xl transition-all"
                >
                  {/* TOP ROW: STUDENT INFO & WHATSAPP LINK */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-purple-600/20">
                        {student.studentName?.charAt(0) || "S"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-black text-white">{student.studentName}</h4>
                          <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                            {student.registrationNo}
                          </span>
                          <span className="text-[10px] font-extrabold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                            {student.sdGrade}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Asal Sekolah: {student.schoolOrigin || "Sekolah Dasar"} • Ortu: {student.parentName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <a
                        href={`https://wa.me/${student.parentPhone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Chat Ortu ({student.parentPhone})</span>
                      </a>
                    </div>
                  </div>

                  {/* DETAILS GRID: JADWAL & SPP STATUS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Col 1: Jadwal */}
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Jadwal (3x Seminggu)</span>
                      </div>
                      <div className="text-xs font-extrabold text-white">
                        {student.scheduleDays || "Senin, Rabu, Jumat"}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {student.scheduleTime || "14:00 - 15:30 WIB"}
                      </div>
                    </div>

                    {/* Col 2: Mapel */}
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Mata Pelajaran</span>
                      </div>
                      <div className="text-xs font-extrabold text-white">
                        Semua Mapel SD
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Matematika, IPA, IPS, B.Indo, B.Inggris
                      </div>
                    </div>

                    {/* Col 3: Status SPP */}
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Status SPP Bulan Ini</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          Rp {Number(student.sppAmount || 200000).toLocaleString("id-ID")}
                        </span>
                      </div>

                      {currentPayment ? (
                        <div className="flex items-center justify-between gap-2 pt-1">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              currentPayment.status === "lunas"
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                : currentPayment.status === "menunggu_konfirmasi"
                                ? "bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse"
                                : "bg-slate-800 text-slate-400 border-slate-700"
                            }`}
                          >
                            {currentPayment.status === "lunas"
                              ? "Lunas"
                              : currentPayment.status === "menunggu_konfirmasi"
                              ? "Menunggu Konfirmasi Bukti"
                              : "Belum Bayar"}
                          </span>

                          {currentPayment.status === "menunggu_konfirmasi" && (
                            <div className="flex items-center gap-1">
                              {currentPayment.proofUrl && (
                                <button
                                  onClick={() =>
                                    onOpenPreview
                                      ? onOpenPreview(currentPayment.proofUrl, `Bukti Transfer SPP - ${student.studentName}`)
                                      : window.open(currentPayment.proofUrl, "_blank")
                                  }
                                  className="p-1 text-slate-300 hover:text-white"
                                  title="Lihat Bukti"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => handleVerifyPayment(currentPayment.id, "lunas")}
                                className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold transition"
                              >
                                Setujui
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 pt-1">Belum ada tagihan terbit</div>
                      )}
                    </div>
                  </div>

                  {/* JURNAL / CATATAN PROGRES BELAJAR GURU */}
                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <FileEdit className="w-3.5 h-3.5 text-purple-400" />
                        <span>Catatan Progres Belajar Siswa (Guru PIC):</span>
                      </span>

                      {!isEditingNotes && (
                        <button
                          onClick={() => {
                            setEditingNotesId(student.id);
                            setNotesText(student.notes || "");
                          }}
                          className="text-[11px] text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
                        >
                          <FileEdit className="w-3 h-3" />
                          <span>{student.notes ? "Edit Catatan" : "+ Tambah Catatan"}</span>
                        </button>
                      )}
                    </div>

                    {isEditingNotes ? (
                      <div className="space-y-2 pt-1">
                        <textarea
                          rows={2}
                          value={notesText}
                          onChange={(e) => setNotesText(e.target.value)}
                          placeholder="Catat perkembangan belajar ananda (misal: Pemahaman matematika perkalian sudah baik, perlu latihan IPA bab 3)..."
                          className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl p-3 text-xs text-white outline-none"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingNotesId(null)}
                            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            disabled={savingNotes}
                            onClick={() => handleSaveNotes(student.id)}
                            className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition disabled:opacity-50"
                          >
                            <Save className="w-3 h-3" />
                            <span>{savingNotes ? "Menyimpan..." : "Simpan Catatan"}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        {student.notes || "Belum ada catatan progres. Klik '+ Tambah Catatan' untuk mencatat perkembangan materi les."}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
