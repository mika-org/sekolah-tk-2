"use client";

import { useState, useEffect } from "react";
import {
  Users,
  GraduationCap,
  CheckCircle2,
  Clock,
  Clock3,
  AlertCircle,
  CreditCard,
  Search,
  Filter,
  UserCheck,
  Plus,
  Trash2,
  Edit,
  Eye,
  Phone,
  Printer,
  Download,
  Check,
  X,
  Calendar,
  Building,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import LesSdRegistrationModal from "./LesSdRegistrationModal";

interface LesSdAdminTabProps {
  admin: any;
  schools: any[];
  teachers: any[];
  onOpenPreview?: (src: string | null, title?: string) => void;
}

export default function LesSdAdminTab({
  admin,
  schools = [],
  teachers = [],
  onOpenPreview,
}: LesSdAdminTabProps) {
  const [subTab, setSubTab] = useState<"students" | "payments">("students");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [schoolFilter, setSchoolFilter] = useState("ALL");
  const [gradeFilter, setGradeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState("ALL");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("ALL");

  // Modal States
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  // Assign PIC Modal
  const [assignPicModal, setAssignPicModal] = useState<{
    isOpen: boolean;
    registrationId: string;
    studentName: string;
    currentPicId: string;
    selectedPicId: string;
    saving: boolean;
  }>({
    isOpen: false,
    registrationId: "",
    studentName: "",
    currentPicId: "",
    selectedPicId: "",
    saving: false,
  });

  // Manual Payment Record Modal
  const [manualPaymentModal, setManualPaymentModal] = useState<{
    isOpen: boolean;
    registrationId: string;
    studentName: string;
    month: string;
    amount: number;
    paymentMethod: string;
    notes: string;
    saving: boolean;
  }>({
    isOpen: false,
    registrationId: "",
    studentName: "",
    month: "Juli 2026",
    amount: 200000,
    paymentMethod: "TUNAI",
    notes: "Pembayaran langsung di tata usaha",
    saving: false,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (schoolFilter !== "ALL") queryParams.append("schoolId", schoolFilter);
      if (gradeFilter !== "ALL") queryParams.append("sdGrade", gradeFilter);
      if (statusFilter !== "ALL") queryParams.append("status", statusFilter);
      if (searchQuery) queryParams.append("search", searchQuery);

      const [resReg, resPay] = await Promise.all([
        fetch(`/api/les-sd?${queryParams.toString()}`),
        fetch(`/api/les-sd/payments`),
      ]);

      const dataReg = await resReg.json();
      const dataPay = await resPay.json();

      if (dataReg.success) setRegistrations(dataReg.data || []);
      if (dataPay.success) setPayments(dataPay.data || []);
    } catch (err) {
      console.error("Failed to load Les SD admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [schoolFilter, gradeFilter, statusFilter, searchQuery]);

  // Handle Quick Status Change
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/les-sd/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Handle Assign Teacher PIC Submit
  const handleAssignPicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAssignPicModal((prev) => ({ ...prev, saving: true }));

    const selectedTeacher = teachers.find((t) => t.id === assignPicModal.selectedPicId);

    try {
      const res = await fetch(`/api/les-sd/${assignPicModal.registrationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherPicId: assignPicModal.selectedPicId || null,
          teacherPicName: selectedTeacher?.name || null,
        }),
      });

      if (res.ok) {
        setAssignPicModal((prev) => ({ ...prev, isOpen: false, saving: false }));
        fetchData();
      }
    } catch (err) {
      console.error("Failed to assign PIC:", err);
      setAssignPicModal((prev) => ({ ...prev, saving: false }));
    }
  };

  // Handle Verify Payment (Approve or Reject)
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
                  verifiedBy: admin?.name || "Admin",
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

  // Handle Manual Payment Submit
  const handleManualPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setManualPaymentModal((prev) => ({ ...prev, saving: true }));

    try {
      const res = await fetch("/api/les-sd/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: manualPaymentModal.registrationId,
          studentName: manualPaymentModal.studentName,
          month: manualPaymentModal.month,
          amount: manualPaymentModal.amount,
          paymentMethod: manualPaymentModal.paymentMethod,
          status: "lunas",
          notes: manualPaymentModal.notes,
        }),
      });

      if (res.ok) {
        setManualPaymentModal((prev) => ({ ...prev, isOpen: false, saving: false }));
        fetchData();
      }
    } catch (err) {
      console.error("Failed to record manual payment:", err);
      setManualPaymentModal((prev) => ({ ...prev, saving: false }));
    }
  };

  // Handle Delete Registration
  const handleDeleteRegistration = async (id: string, studentName: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus data pendaftaran Les SD untuk ${studentName}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/les-sd/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete registration:", err);
    }
  };

  // Calculations for KPI Cards
  const totalStudents = registrations.length;
  const activeStudents = registrations.filter((r) => r.status === "AKTIF").length;
  const pendingRegistrations = registrations.filter((r) => r.status === "PENDING").length;

  const totalRevenue = payments
    .filter((p) => p.status === "lunas")
    .reduce((sum, p) => sum + Number(p.amount || 200000), 0);

  const pendingPaymentsCount = payments.filter((p) => p.status === "menunggu_konfirmasi").length;

  // Filtered Payments List
  const filteredPayments = payments.filter((p) => {
    if (monthFilter !== "ALL" && !p.month?.toLowerCase().includes(monthFilter.toLowerCase())) {
      return false;
    }
    if (paymentStatusFilter !== "ALL" && p.status !== paymentStatusFilter) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.studentName?.toLowerCase().includes(q);
      const matchParent = p.registration?.parentName?.toLowerCase().includes(q);
      const matchRegNo = p.registration?.registrationNo?.toLowerCase().includes(q);
      if (!matchName && !matchParent && !matchRegNo) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 w-full">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-black text-white tracking-tight">Kelola Program Les SD</h2>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              1 Minggu 3x • Semua Mapel SD
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Rekapitulasi data murid, penetapan Guru PIC, dan pengawasan pembayaran SPP Les SD (Rp 200.000/bln).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setRegisterModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Siswa Les SD</span>
          </button>
        </div>
      </div>

      {/* KPI STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1 */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold">Total Pendaftar</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalStudents}</div>
          <div className="text-[10px] text-slate-500">Semua cabang terdaftar</div>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold">Siswa Aktif</span>
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-teal-400">{activeStudents}</div>
          <div className="text-[10px] text-slate-500">Sedang menjalani bimbingan</div>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold">Pending Konfirmasi</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{pendingRegistrations}</div>
          <div className="text-[10px] text-slate-500">Perlu penugasan PIC & aktifkan</div>
        </div>

        {/* Card 4 */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold">Penerimaan SPP</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono">
            Rp {totalRevenue.toLocaleString("id-ID")}
          </div>
          <div className="text-[10px] text-slate-500">Total pembayaran terverifikasi</div>
        </div>

        {/* Card 5 */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold">Verifikasi SPP</span>
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">{pendingPaymentsCount}</div>
          <div className="text-[10px] text-slate-500">Menunggu konfirmasi bukti</div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setSubTab("students")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            subTab === "students"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Rekap Murid & Pendaftaran Les SD ({totalStudents})</span>
        </button>

        <button
          onClick={() => setSubTab("payments")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            subTab === "payments"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Rekap Pembayaran SPP Les SD</span>
          {pendingPaymentsCount > 0 && (
            <span className="px-1.5 py-0.5 text-[9px] rounded-full bg-rose-500 text-white font-bold animate-pulse">
              {pendingPaymentsCount}
            </span>
          )}
        </button>
      </div>

      {/* SUB-TAB 1: REKAP MURID & PENDAFTARAN */}
      {subTab === "students" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari murid, ortu, no reg, asal SD..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
                />
              </div>

              {schools.length > 1 && (
                <select
                  value={schoolFilter}
                  onChange={(e) => setSchoolFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                >
                  <option value="ALL">Semua Cabang</option>
                  {schools.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              )}

              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              >
                <option value="ALL">Semua Kelas SD</option>
                <option value="Kelas 1 SD">Kelas 1 SD</option>
                <option value="Kelas 2 SD">Kelas 2 SD</option>
                <option value="Kelas 3 SD">Kelas 3 SD</option>
                <option value="Kelas 4 SD">Kelas 4 SD</option>
                <option value="Kelas 5 SD">Kelas 5 SD</option>
                <option value="Kelas 6 SD">Kelas 6 SD</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              >
                <option value="ALL">Semua Status</option>
                <option value="PENDING">Pending (Menunggu)</option>
                <option value="AKTIF">Aktif</option>
                <option value="SELESAI">Selesai</option>
                <option value="BATAL">Batal</option>
              </select>
            </div>
          </div>

          {/* Table Data */}
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-xs">Memuat data pendaftar Les SD...</div>
          ) : registrations.length === 0 ? (
            <div className="py-12 bg-slate-900/50 border border-slate-800 rounded-2xl text-center text-slate-400 text-xs">
              Tidak ada data siswa Les SD yang cocok dengan filter.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3.5">No. Registrasi & Siswa</th>
                    <th className="px-4 py-3.5">Tingkat & Sekolah Asal</th>
                    <th className="px-4 py-3.5">Orang Tua / Kontak WA</th>
                    <th className="px-4 py-3.5">Jadwal (3x Seminggu)</th>
                    <th className="px-4 py-3.5">Guru PIC Pengampu</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-900/50 transition">
                      {/* Siswa & Reg No */}
                      <td className="px-4 py-3.5">
                        <div className="font-extrabold text-white text-sm">{reg.studentName}</div>
                        <div className="text-[10px] font-mono text-emerald-400 font-bold">
                          {reg.registrationNo}
                        </div>
                      </td>

                      {/* Kelas SD & Asal SD */}
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-200">{reg.sdGrade}</div>
                        <div className="text-[11px] text-slate-400">{reg.schoolOrigin || "-"}</div>
                      </td>

                      {/* Ortu & WA */}
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-200">{reg.parentName}</div>
                        <a
                          href={`https://wa.me/${reg.parentPhone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-mono font-bold mt-0.5"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{reg.parentPhone}</span>
                        </a>
                      </td>

                      {/* Jadwal 3x Seminggu */}
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-300">{reg.scheduleDays || "Senin, Rabu, Jumat"}</div>
                        <div className="text-[10px] text-slate-400">{reg.scheduleTime || "14:00 - 15:30 WIB"}</div>
                      </td>

                      {/* Guru PIC */}
                      <td className="px-4 py-3.5">
                        {reg.teacherPicName ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-purple-300">{reg.teacherPicName}</span>
                            <button
                              onClick={() =>
                                setAssignPicModal({
                                  isOpen: true,
                                  registrationId: reg.id,
                                  studentName: reg.studentName,
                                  currentPicId: reg.teacherPicId || "",
                                  selectedPicId: reg.teacherPicId || "",
                                  saving: false,
                                })
                              }
                              className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
                            >
                              Ganti
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setAssignPicModal({
                                isOpen: true,
                                registrationId: reg.id,
                                studentName: reg.studentName,
                                currentPicId: "",
                                selectedPicId: teachers[0]?.id || "",
                                saving: false,
                              })
                            }
                            className="px-2.5 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <UserCheck className="w-3 h-3" />
                            <span>Tugaskan PIC</span>
                          </button>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <select
                          value={reg.status}
                          onChange={(e) => handleUpdateStatus(reg.id, e.target.value)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border outline-none bg-slate-950 cursor-pointer ${
                            reg.status === "AKTIF"
                              ? "text-emerald-400 border-emerald-500/40"
                              : reg.status === "PENDING"
                              ? "text-amber-400 border-amber-500/40"
                              : "text-slate-400 border-slate-700"
                          }`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="AKTIF">AKTIF</option>
                          <option value="SELESAI">SELESAI</option>
                          <option value="BATAL">BATAL</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Catat Bayar SPP Manual Button */}
                          <button
                            title="Catat Pembayaran SPP"
                            onClick={() =>
                              setManualPaymentModal({
                                isOpen: true,
                                registrationId: reg.id,
                                studentName: reg.studentName,
                                month: "Juli 2026",
                                amount: reg.sppAmount || 200000,
                                paymentMethod: "TUNAI",
                                notes: "Pembayaran tunai di kantor",
                                saving: false,
                              })
                            }
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition cursor-pointer"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                          </button>

                          <button
                            title="Hapus Data"
                            onClick={() => handleDeleteRegistration(reg.id, reg.studentName)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: REKAP PEMBAYARAN SPP LES SD */}
      {subTab === "payments" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari murid / nama ortu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              >
                <option value="ALL">Semua Bulan</option>
                {[
                  "Januari 2026", "Februari 2026", "Maret 2026", "April 2026",
                  "Mei 2026", "Juni 2026", "Juli 2026", "Agustus 2026",
                  "September 2026", "Oktober 2026", "November 2026", "Desember 2026",
                ].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              >
                <option value="ALL">Semua Status Bayar</option>
                <option value="menunggu_konfirmasi">Menunggu Konfirmasi Bukti</option>
                <option value="lunas">Lunas</option>
                <option value="belum_bayar">Belum Bayar</option>
                <option value="ditolak">Ditolak</option>
              </select>
            </div>
          </div>

          {/* Table Data */}
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-xs">Memuat data pembayaran SPP...</div>
          ) : filteredPayments.length === 0 ? (
            <div className="py-12 bg-slate-900/50 border border-slate-800 rounded-2xl text-center text-slate-400 text-xs">
              Tidak ada catatan pembayaran SPP Les SD yang cocok dengan filter.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3.5">Nama Murid SD</th>
                    <th className="px-4 py-3.5">Bulan Tagihan</th>
                    <th className="px-4 py-3.5">Nominal SPP</th>
                    <th className="px-4 py-3.5">Status Pembayaran</th>
                    <th className="px-4 py-3.5">Metode & Tanggal</th>
                    <th className="px-4 py-3.5">Bukti Bayar</th>
                    <th className="px-4 py-3.5">Diverifikasi Oleh</th>
                    <th className="px-4 py-3.5 text-right">Aksi Verifikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredPayments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-slate-900/50 transition">
                      {/* Murid */}
                      <td className="px-4 py-3.5">
                        <div className="font-extrabold text-white text-sm">{pay.studentName}</div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {pay.registration?.registrationNo || "-"} • {pay.registration?.sdGrade || "SD"}
                        </div>
                      </td>

                      {/* Bulan */}
                      <td className="px-4 py-3.5 font-bold text-slate-200">
                        {pay.month}
                      </td>

                      {/* Nominal */}
                      <td className="px-4 py-3.5 font-mono font-bold text-emerald-400">
                        Rp {Number(pay.amount || 200000).toLocaleString("id-ID")}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
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
                              <span>Perlu Verifikasi</span>
                            </>
                          ) : pay.status === "ditolak" ? (
                            <span>Ditolak</span>
                          ) : (
                            <span>Belum Bayar</span>
                          )}
                        </span>
                      </td>

                      {/* Metode & Tanggal */}
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-300">{pay.paymentMethod || "Transfer"}</div>
                        <div className="text-[10px] text-slate-500">{pay.paymentDate || "-"}</div>
                      </td>

                      {/* Bukti Bayar */}
                      <td className="px-4 py-3.5">
                        {pay.proofUrl ? (
                          <button
                            onClick={() =>
                              onOpenPreview
                                ? onOpenPreview(pay.proofUrl, `Bukti Transfer SPP ${pay.month} - ${pay.studentName}`)
                                : window.open(pay.proofUrl, "_blank")
                            }
                            className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 underline font-medium cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Lihat Foto</span>
                          </button>
                        ) : (
                          <span className="text-slate-500 text-[10px]">Tanpa bukti</span>
                        )}
                      </td>

                      {/* Diverifikasi */}
                      <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                        {pay.verifiedBy ? (
                          <div>
                            <span className="font-bold text-slate-300">{pay.verifiedBy}</span>
                          </div>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>

                      {/* Aksi Verifikasi */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {pay.status !== "lunas" && (
                            <button
                              onClick={() => handleVerifyPayment(pay.id, "lunas")}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer shadow-sm shadow-emerald-600/30"
                            >
                              <Check className="w-3 h-3" />
                              <span>Setujui</span>
                            </button>
                          )}

                          {pay.status !== "ditolak" && pay.status !== "lunas" && (
                            <button
                              onClick={() => handleVerifyPayment(pay.id, "ditolak")}
                              className="px-2.5 py-1 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                              <span>Tolak</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODAL PENUGASAN GURU PIC */}
      {assignPicModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-purple-500/40 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Tugaskan Guru PIC Les SD</h3>
                  <p className="text-[11px] text-slate-400">{assignPicModal.studentName}</p>
                </div>
              </div>
              <button
                onClick={() => setAssignPicModal((prev) => ({ ...prev, isOpen: false }))}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAssignPicSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Pilih Guru Pengampu (PIC)</label>
                <select
                  value={assignPicModal.selectedPicId}
                  onChange={(e) =>
                    setAssignPicModal((prev) => ({ ...prev, selectedPicId: e.target.value }))
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                >
                  <option value="">-- Belum Ditugaskan / Hapus Penugasan --</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.role || "Guru"})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setAssignPicModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={assignPicModal.saving}
                  className="px-5 py-2 rounded-xl text-xs font-extrabold text-white bg-purple-600 hover:bg-purple-500 transition shadow-lg shadow-purple-600/30 cursor-pointer disabled:opacity-50"
                >
                  {assignPicModal.saving ? "Menyimpan..." : "Simpan Penugasan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CATAT PEMBAYARAN MANUAL OLEH ADMIN */}
      {manualPaymentModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                  💵
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Catat SPP Les SD (Manual)</h3>
                  <p className="text-[11px] text-slate-400">{manualPaymentModal.studentName}</p>
                </div>
              </div>
              <button
                onClick={() => setManualPaymentModal((prev) => ({ ...prev, isOpen: false }))}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleManualPaymentSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Bulan Tagihan</label>
                <select
                  value={manualPaymentModal.month}
                  onChange={(e) =>
                    setManualPaymentModal((prev) => ({ ...prev, month: e.target.value }))
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
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

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Nominal SPP</label>
                  <input
                    type="number"
                    value={manualPaymentModal.amount}
                    onChange={(e) =>
                      setManualPaymentModal((prev) => ({ ...prev, amount: Number(e.target.value) }))
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Metode Bayar</label>
                  <select
                    value={manualPaymentModal.paymentMethod}
                    onChange={(e) =>
                      setManualPaymentModal((prev) => ({ ...prev, paymentMethod: e.target.value }))
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  >
                    <option value="TUNAI">Tunai / Cash</option>
                    <option value="TRANSFER_BCA">Transfer BCA</option>
                    <option value="TRANSFER_BRI">Transfer BRI</option>
                    <option value="TRANSFER_MANDIRI">Transfer Mandiri</option>
                    <option value="QRIS">QRIS</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Catatan</label>
                <input
                  type="text"
                  value={manualPaymentModal.notes}
                  onChange={(e) =>
                    setManualPaymentModal((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setManualPaymentModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={manualPaymentModal.saving}
                  className="px-5 py-2 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/30 cursor-pointer disabled:opacity-50"
                >
                  {manualPaymentModal.saving ? "Menyimpan..." : "Simpan Pembayaran Lunas"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REGISTRATION MODAL */}
      <LesSdRegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        schools={schools}
        onSuccess={() => {
          fetchData();
        }}
      />
    </div>
  );
}
