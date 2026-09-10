"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageModal from "@/components/common/ImageModal";
import SearchableSelect from "@/components/common/SearchableSelect";
import {
  DOCUMENT_UPLOAD_ACCEPT,
  MAX_UPLOAD_SIZE_LABEL,
  validateUploadFile,
} from "@/lib/upload-config";
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
  PackageCheck,
  Download,
  Building2,
} from "lucide-react";
import confetti from "canvas-confetti";

interface PpdbFormProps {
  onBackToHome: () => void;
  selectedSchoolCode?: string;
  schools?: any[];
}

interface FeeComponent {
  id: string;
  code: string;
  name: string;
  amount: number;
  description?: string | null;
  isRequired: boolean;
}

export default function PpdbForm({
  onBackToHome,
  selectedSchoolCode = "sadjati",
  schools = [],
}: PpdbFormProps) {
  const [step, setStep] = useState<number>(1);

  // Dynamic school/branch selection state
  const [currentSchoolCode, setCurrentSchoolCode] = useState<string>(
    selectedSchoolCode || (schools && schools.length > 0 ? schools[0].code : "sadjati")
  );
  const [availableSchools, setAvailableSchools] = useState<any[]>(schools || []);

  useEffect(() => {
    if (selectedSchoolCode) {
      setCurrentSchoolCode(selectedSchoolCode);
    }
  }, [selectedSchoolCode]);

  useEffect(() => {
    if (schools && schools.length > 0) {
      setAvailableSchools(schools);
    } else {
      fetch("/api/schools")
        .then((r) => r.json())
        .then((d) => {
          if (d.success && Array.isArray(d.data) && d.data.length > 0) {
            setAvailableSchools(d.data);
          }
        })
        .catch((err) => console.error("Error loading schools in PpdbForm:", err));
    }
  }, [schools]);

  // Form State initialized as empty
  const [formData, setFormData] = useState({
    namaAnak: "",
    jenisKelamin: "",
    agama: "",
    tempatLahir: "",
    tanggalLahir: "",
    usiaAnak: "",
    program: "",
    sppAmount: 200000,
    namaOrtu: "",
    noWhatsapp: "",
    email: "",
    alamatRumah: "",
    agreedTerms: false,
  });

  const [programsList, setProgramsList] = useState<any[]>([]);

  // Package definitions come from the database; selected values are stored per registration.
  const [ppdbPackageItems, setPpdbPackageItems] = useState<FeeComponent[]>([]);
  const [selectedPackageIds, setSelectedPackageIds] = useState<string[]>([]);
  const [loadingFeeComponents, setLoadingFeeComponents] = useState(true);
  const [feeComponentsError, setFeeComponentsError] = useState("");

  // Bank accounts & QRIS state
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [selectedBankId, setSelectedBankId] = useState<string>("");
  const [qrisImageUrl, setQrisImageUrl] = useState<string>("/images/qris_default.png");
  const [siteProfile, setSiteProfile] = useState<any>(null);

  // Fetch school programs, bank accounts, site profile
  useEffect(() => {
    if (!currentSchoolCode) return;
    setLoadingFeeComponents(true);

    // Fetch Programs
    fetch(`/api/programs?schoolCode=${currentSchoolCode}`)
      .then((r) => {
        const contentType = r.headers.get("content-type");
        if (r.ok && contentType && contentType.includes("application/json")) {
          return r.json();
        }
        return { success: false, data: [] };
      })
      .then((data) => {
        if (data.success && data.data?.length) {
          setProgramsList(data.data);
        }
      })
      .catch((err) => console.error("Error fetching programs for PPDB:", err));

    // Fetch active PPDB fee components for this school.
    fetch(`/api/fee-components?schoolCode=${currentSchoolCode}&category=PPDB`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Gagal memuat komponen biaya PPDB");
        }
        return data;
      })
      .then((data) => {
        const components = (data.data || []) as FeeComponent[];
        setPpdbPackageItems(components);
        setSelectedPackageIds(components.map((component) => component.id));
        setFeeComponentsError("");
      })
      .catch((err) => {
        console.error("Error fetching PPDB fee components:", err);
        setPpdbPackageItems([]);
        setSelectedPackageIds([]);
        setFeeComponentsError(err.message || "Komponen biaya PPDB belum tersedia");
      })
      .finally(() => setLoadingFeeComponents(false));

    // Fetch Bank Accounts
    fetch(`/api/bank-accounts?schoolCode=${currentSchoolCode}&publicOnly=true`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setBankAccounts(data.data);
          if (data.data.length > 0) {
            setSelectedBankId(data.data[0].id);
          }
        }
      })
      .catch((err) => console.error("Error fetching bank accounts:", err));

    // Fetch Site Profile (for QRIS image & Sidebar)
    fetch(`/api/site-profile?schoolCode=${currentSchoolCode}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data) {
          setSiteProfile(data.data);
          if (data.data.qrisImageUrl) {
            setQrisImageUrl(data.data.qrisImageUrl);
          }
        }
      })
      .catch((err) => console.error("Error fetching site profile:", err));
  }, [currentSchoolCode]);

  const togglePackageItem = (id: string) => {
    const item = ppdbPackageItems.find((component) => component.id === id);
    if (item?.isRequired) return;
    setSelectedPackageIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const totalPpdbPackageAmount = selectedPackageIds.reduce((sum, id) => {
    const item = ppdbPackageItems.find((component) => component.id === id);
    return sum + (item ? Number(item.amount) : 0);
  }, 0);

  // Selected file objects stored in local state (deferred batch upload)
  const [selectedFileObjects, setSelectedFileObjects] = useState<{
    [key: string]: File | null;
  }>({
    kk: null,
    akta: null,
    foto: null,
    ktp: null,
    buktiBayar: null,
  });

  // Payment tab state
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "qris" | "tunai">(
    "bank"
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [regId, setRegId] = useState<string>("PPDB-2026-8821");
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Image Modal State for document previews
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    src: string | null;
    title: string;
  }>({
    isOpen: false,
    src: null,
    title: "Pratinjau Berkas",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (docKey: string, file: File) => {
    const validationError = validateUploadFile(file, "ppdb");
    if (validationError) {
      alert(validationError);
      return;
    }
    setSelectedFileObjects((prev) => ({ ...prev, [docKey]: file }));
  };

  const handleCopyAccount = (accountNo: string) => {
    navigator.clipboard.writeText(accountNo.replace(/\s+/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const selectedBank =
    bankAccounts.find((b) => b.id === selectedBankId) ||
    bankAccounts[0] || {
      bankName: "Bank Mandiri",
      accountNumber: "1310012345678",
      accountHolder: "Smart Kids / YAPCHI Foundation",
    };

  const handleFinish = async () => {
    if (selectedPackageIds.length === 0) {
      alert("Pilih minimal satu komponen biaya PPDB yang ingin dibayar.");
      return;
    }

    setSubmitting(true);
    const newRegNo = `PPDB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setRegId(newRegNo);

    // 1. Batch Upload all selected files at once
    const uploadedUrls: { [key: string]: string | null } = {
      kk: null,
      akta: null,
      foto: null,
      ktp: null,
      buktiBayar: null,
    };

    for (const docKey of Object.keys(selectedFileObjects)) {
      const fileObj = selectedFileObjects[docKey];
      if (fileObj) {
        try {
          const formDataUpload = new FormData();
          formDataUpload.append("file", fileObj);
          formDataUpload.append("category", "ppdb");

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formDataUpload,
          });
          const data = await res.json();
          if (data.success && data.url) {
            uploadedUrls[docKey] = data.url;
          } else if (data.error) {
            alert(`Gagal mengunggah ${docKey}: ${data.error}`);
          }
        } catch (uploadErr: any) {
          console.error(`Error uploading ${docKey}:`, uploadErr);
          alert(`Gagal mengunggah berkas ${docKey}: ${uploadErr.message}`);
        }
      }
    }

    // 2. Submit complete PPDB form data with uploaded file URLs and chosen package items
    try {
      const response = await fetch("/api/ppdb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolCode: currentSchoolCode,
          registrationNo: newRegNo,
          namaAnak: formData.namaAnak,
          jenisKelamin: formData.jenisKelamin,
          agama: formData.agama,
          tempatLahir: formData.tempatLahir,
          tanggalLahir: formData.tanggalLahir,
          usiaAnak: formData.usiaAnak,
          program: formData.program,
          sppAmount: formData.sppAmount,
          selectedFeeComponentIds: selectedPackageIds,
          namaOrtu: formData.namaOrtu,
          noWhatsapp: formData.noWhatsapp,
          email: formData.email,
          alamatRumah: formData.alamatRumah,
          docKkUrl: uploadedUrls.kk,
          docAktaUrl: uploadedUrls.akta,
          docFotoUrl: uploadedUrls.foto,
          docKtpUrl: uploadedUrls.ktp,
          buktiBayarUrl: uploadedUrls.buktiBayar,
          paymentMethod,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Gagal menyimpan pendaftaran PPDB");
      }

      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error("Error submitting PPDB:", err);
      alert(err.message || "Gagal menyimpan pendaftaran PPDB. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* HEADER & HERO BANNER */}
      <div className="bg-[#e8f4ec] rounded-3xl p-6 sm:p-8 border border-emerald-100 mb-8 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Form Pendaftaran PPDB
            </h1>
            <p className="text-sm font-semibold text-emerald-800">
              {step === 1 && "Isi data & pilih komponen paket biaya pendaftaran"}
              {step === 2 && "Konfirmasi data dan rincian rincian biaya"}
              {step === 3 && "Lakukan pembayaran paket pendaftaran"}
            </p>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              {step === 1 &&
                "Lengkapi data siswa dan pilih komponen paket pendaftaran/seragam sesuai kebutuhan Anda."}
              {step === 2 &&
                "Periksa kembali data diri dan paket item pendaftaran yang Anda pilih sebelum melanjutkan."}
              {step === 3 &&
                "Pilih metode pembayaran (Bank Transfer, QRIS, atau Tunai) lalu upload bukti transaksi."}
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
                Data & Paket Biaya
              </h4>
              <p className="text-[11px] text-slate-500">Pilih komponen & data anak</p>
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
              <p className="text-[11px] text-slate-500">Cek kembali data & rincian</p>
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
              <p className="text-[11px] text-slate-500">Transfer & upload bukti</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FORM CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Step-specific form elements) */}
        <div className="lg:col-span-8 space-y-6">
          {/* ==================== STEP 1: ISI DATA & PAKET BIAYA ==================== */}
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
                  {/* PILIHAN CABANG / UNIT SEKOLAH */}
                  <div className="bg-emerald-50/60 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <label className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-600" />
                        <span>Pilih Cabang / Unit Belajar Sekolah</span>
                        <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200 self-start sm:self-auto">
                        Unit Terpilih: {availableSchools.find((s) => s.code === currentSchoolCode)?.name || "Smart Kids Sadjati"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Silakan tentukan cabang sekolah terdekat untuk kegiatan belajar ananda:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {(availableSchools.length > 0
                        ? availableSchools
                        : [
                            { code: "sadjati", name: "Smart Kids Sadjati", address: "Sadjati" },
                            { code: "bumi-cipta-laras", name: "Smart Kids BCL", address: "Bumi Cipta Laras" },
                          ]
                      ).map((school: any) => {
                        const isSelected = school.code === currentSchoolCode;
                        return (
                          <button
                            key={school.code || school.id}
                            type="button"
                            onClick={() => {
                              setCurrentSchoolCode(school.code);
                              setFormData((prev) => ({ ...prev, program: "" }));
                            }}
                            className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                              isSelected
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500/20"
                                : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40"
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                                isSelected ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              🏫
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className={`font-extrabold text-xs sm:text-sm truncate ${isSelected ? "text-white" : "text-slate-900"}`}>
                                {school.name}
                              </h4>
                              <p className={`text-[10px] truncate ${isSelected ? "text-emerald-100" : "text-slate-500"}`}>
                                {school.address || "Cabang TK Smart Kids"}
                              </p>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

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
                      <SearchableSelect
                        options={[
                          { value: "Laki-laki", label: "Laki-laki" },
                          { value: "Perempuan", label: "Perempuan" },
                        ]}
                        value={formData.jenisKelamin}
                        onChange={(val) =>
                          setFormData((prev) => ({ ...prev, jenisKelamin: val }))
                        }
                        variant="light"
                        placeholder="Pilih jenis kelamin..."
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Agama
                      </label>
                      <SearchableSelect
                        options={[
                          { value: "Islam", label: "Islam" },
                          { value: "Kristen", label: "Kristen" },
                          { value: "Katolik", label: "Katolik" },
                          { value: "Hindu", label: "Hindu" },
                          { value: "Buddha", label: "Buddha" },
                          { value: "Khonghucu", label: "Khonghucu" },
                        ]}
                        value={formData.agama}
                        onChange={(val) =>
                          setFormData((prev) => ({ ...prev, agama: val }))
                        }
                        variant="light"
                        placeholder="Pilih agama..."
                      />
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
                        Program Belajar
                      </label>
                      <SearchableSelect
                        options={
                          programsList.length > 0
                            ? programsList.map((p: any) => ({
                                value: p.title,
                                label: `${p.title} (${p.ageRange})`,
                                sublabel: `SPP Rp ${Number(
                                  p.sppAmount || 200000
                                ).toLocaleString("id-ID")}/bulan`,
                                sppAmount: Number(p.sppAmount || 200000),
                              }))
                            : [
                                {
                                  value: "S3",
                                  label: "S3 (1 Minggu 3X Pertemuan)",
                                  sublabel: "SPP Rp 200.000/bulan",
                                  sppAmount: 200000,
                                },
                                {
                                  value: "S4",
                                  label: "S4 (1 Minggu 4X Pertemuan)",
                                  sublabel: "SPP Rp 250.000/bulan",
                                  sppAmount: 250000,
                                },
                                {
                                  value: "S5",
                                  label: "S5 (1 Minggu 5X Pertemuan)",
                                  sublabel: "SPP Rp 300.000/bulan",
                                  sppAmount: 300000,
                                },
                                {
                                  value: "BEST PROGRAM",
                                  label: "BEST PROGRAM (1 Guru 1 Siswa)",
                                  sublabel: "SPP Rp 300.000/bulan",
                                  sppAmount: 300000,
                                },
                              ]
                        }
                        value={formData.program}
                        onChange={(val) => {
                          const availableOptions =
                            programsList.length > 0
                              ? programsList.map((p: any) => ({
                                  value: p.title,
                                  sppAmount: Number(p.sppAmount || 200000),
                                }))
                              : [
                                  { value: "S3", sppAmount: 200000 },
                                  { value: "S4", sppAmount: 250000 },
                                  { value: "S5", sppAmount: 300000 },
                                  { value: "BEST PROGRAM", sppAmount: 300000 },
                                ];
                          const matched = availableOptions.find(
                            (opt) => opt.value === val
                          );
                          setFormData((prev) => ({
                            ...prev,
                            program: val,
                            sppAmount: matched ? matched.sppAmount : 200000,
                          }));
                        }}
                        variant="light"
                        placeholder="Pilih program belajar..."
                      />
                      {formData.program && (
                        <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                          <span className="font-semibold">Tarif SPP Bulanan:</span>
                          <span className="font-extrabold text-emerald-700 text-sm">
                            Rp {formData.sppAmount.toLocaleString("id-ID")} / bulan
                          </span>
                        </div>
                      )}
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
                      <label className="block font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                        <span>Email Orang Tua</span>
                        <span className="text-slate-400 font-normal text-[10px]">(Opsional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Contoh: orangtua@gmail.com (opsional)"
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
                      rows={2}
                      value={formData.alamatRumah}
                      onChange={handleInputChange}
                      placeholder="Masukan alamat rumah lengkap"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* ================= NEW FEATURE: PAKET BIAYA PPDB CHECKLIST ================= */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <PackageCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg">
                        Paket Biaya Pendaftaran (PPDB)
                      </h3>
                      <p className="text-xs text-slate-500">
                        Pilih komponen item yang ingin Anda ambil (Opsional per item)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-slate-500 block">Subtotal Paket:</span>
                    <span className="text-lg font-extrabold text-emerald-700">
                      Rp {totalPpdbPackageAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {loadingFeeComponents && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500">
                    Memuat komponen biaya PPDB dari database...
                  </div>
                )}
                {feeComponentsError && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                    {feeComponentsError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {ppdbPackageItems.map((item) => {
                    const isChecked = selectedPackageIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => togglePackageItem(item.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                          isChecked
                            ? "bg-emerald-50/50 border-emerald-500 shadow-xs"
                            : "bg-slate-50/40 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={item.isRequired}
                          onChange={() => togglePackageItem(item.id)}
                          onClick={(event) => event.stopPropagation()}
                          className="w-5 h-5 mt-0.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 accent-emerald-600 shrink-0 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {item.name}
                            </span>
                            {item.isRequired && (
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                                Utama / Wajib
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {item.description}
                          </p>
                          <span className="font-extrabold text-emerald-700 text-xs mt-1.5 block">
                            Rp {Number(item.amount).toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-900 font-medium">
                    <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      Item terhitung: <strong>{selectedPackageIds.length} dari {ppdbPackageItems.length} item</strong> terpilih.
                    </span>
                  </div>
                  <div className="font-extrabold text-emerald-800 text-sm shrink-0">
                    Total PPDB: Rp {totalPpdbPackageAmount.toLocaleString("id-ID")}
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

                <p className="text-xs text-slate-500">
                  Format JPG, PNG, WEBP, atau PDF. Maksimal {MAX_UPLOAD_SIZE_LABEL} per file.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Dropzone 1: Kartu Keluarga */}
                  <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center min-h-30">
                    <input
                      type="file"
                      accept={DOCUMENT_UPLOAD_ACCEPT}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0])
                          handleFileSelect("kk", e.target.files[0]);
                      }}
                    />
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs block">
                      Kartu Keluarga
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {selectedFileObjects.kk ? (
                        <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />{" "}
                          {selectedFileObjects.kk.name}
                        </span>
                      ) : (
                        "Unggah KK (PDF / Gambar, Maks. 10MB)"
                      )}
                    </span>
                  </label>

                  {/* Dropzone 2: Akta Kelahiran */}
                  <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center min-h-30">
                    <input
                      type="file"
                      accept={DOCUMENT_UPLOAD_ACCEPT}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0])
                          handleFileSelect("akta", e.target.files[0]);
                      }}
                    />
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs block">
                      Akta Kelahiran
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {selectedFileObjects.akta ? (
                        <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />{" "}
                          {selectedFileObjects.akta.name}
                        </span>
                      ) : (
                        "Unggah Akta (PDF / Gambar, Maks. 10MB)"
                      )}
                    </span>
                  </label>

                  {/* Dropzone 3: Foto Anak */}
                  <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center min-h-30">
                    <input
                      type="file"
                      accept={DOCUMENT_UPLOAD_ACCEPT}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0])
                          handleFileSelect("foto", e.target.files[0]);
                      }}
                    />
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs block">
                      Foto Anak
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {selectedFileObjects.foto ? (
                        <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />{" "}
                          {selectedFileObjects.foto.name}
                        </span>
                      ) : (
                        "Unggah Foto Anak (Maks. 10MB)"
                      )}
                    </span>
                  </label>

                  {/* Dropzone 4: KTP Orang Tua/Wali */}
                  <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center min-h-30">
                    <input
                      type="file"
                      accept={DOCUMENT_UPLOAD_ACCEPT}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0])
                          handleFileSelect("ktp", e.target.files[0]);
                      }}
                    />
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs block">
                      KTP Ortu
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {selectedFileObjects.ktp ? (
                        <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />{" "}
                          {selectedFileObjects.ktp.name}
                        </span>
                      ) : (
                        "Unggah KTP Ortu (Maks. 10MB)"
                      )}
                    </span>
                  </label>
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
                    onClick={() => {
                      if (!formData.namaAnak || !formData.namaOrtu) {
                        alert("Harap isi nama anak dan nama orang tua terlebih dahulu");
                        return;
                      }
                      if (loadingFeeComponents || selectedPackageIds.length === 0) {
                        alert("Pilih minimal satu komponen biaya PPDB terlebih dahulu");
                        return;
                      }
                      setStep(2);
                    }}
                    className="px-8 py-3 rounded-full bg-[#057a44] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STEP 2: KONFIRMASI DATA & PAKET BIAYA ==================== */}
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
                <div className="space-y-3 text-xs text-slate-700">
                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Nama Lengkap Anak
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.namaAnak || "-"}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Jenis Kelamin / Agama
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.jenisKelamin || "-"} / {formData.agama || "-"}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Tempat, Tgl Lahir / Usia
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.tempatLahir}, {formData.tanggalLahir} ({formData.usiaAnak})
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Program & SPP Bulanan
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded inline-block">
                      {formData.program || "S3"} (SPP Rp {formData.sppAmount.toLocaleString("id-ID")}/bulan)
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Nama Ortu & WA
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {formData.namaOrtu} ({formData.noWhatsapp})
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-50">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Komponen Paket PPDB
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-semibold text-slate-900">
                      {selectedPackageIds
                        .map((id) => ppdbPackageItems.find((item) => item.id === id)?.name)
                        .join(", ")}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <span className="col-span-5 sm:col-span-4 font-bold text-slate-800">
                      Total Biaya PPDB
                    </span>
                    <span className="col-span-1 text-slate-400 text-center">:</span>
                    <span className="col-span-6 sm:col-span-7 font-extrabold text-emerald-700 text-sm">
                      Rp {totalPpdbPackageAmount.toLocaleString("id-ID")}
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
                      Pastikan semua data dan paket item yang dipilih sudah sesuai.
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
                    Lanjut Pembayaran
                  </button>
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
                    Detail Pembayaran PPDB
                  </h3>
                </div>

                {/* Table of cost breakdown */}
                <div className="space-y-2 text-xs text-slate-700 border-b border-slate-100 pb-4">
                  <div className="font-bold text-slate-900 mb-1">Rincian Paket PPDB yang Dipilih:</div>
                  {selectedPackageIds.map((id) => {
                    const item = ppdbPackageItems.find((component) => component.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex justify-between items-center py-1 border-b border-slate-50 text-slate-600">
                        <span>• {item.name}</span>
                        <span className="font-semibold text-slate-900">
                          Rp {Number(item.amount).toLocaleString("id-ID")}
                        </span>
                      </div>
                    );
                  })}

                  <div className="flex justify-between items-center pt-3 text-sm">
                    <span className="font-extrabold text-slate-900">Total Pembayaran PPDB</span>
                    <span className="font-extrabold text-emerald-700 text-lg">
                      Rp {totalPpdbPackageAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Payment Methods Selector */}
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
                    <span>QRIS Image</span>
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
                {paymentMethod === "bank" && (
                  <div className="space-y-3">
                    {/* Bank selector dropdown if multiple banks exist */}
                    {bankAccounts.length > 1 && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-700">Pilih Rekening Bank:</span>
                        <select
                          value={selectedBankId}
                          onChange={(e) => setSelectedBankId(e.target.value)}
                          className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        >
                          {bankAccounts.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.bankName} - {b.accountNumber} ({b.accountHolder})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Left Bank Card */}
                      <div className="md:col-span-7 bg-[#e8f1fd] rounded-2xl p-5 border border-blue-200 space-y-2 relative">
                        <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider block">
                          {selectedBank.bankName}
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-wider">
                            {selectedBank.accountNumber}
                          </span>
                          <button
                            onClick={() => handleCopyAccount(selectedBank.accountNumber)}
                            className="p-2 rounded-lg bg-white hover:bg-blue-50 text-blue-700 transition-colors relative shadow-xs"
                            title="Salin No. Rekening"
                          >
                            <Copy className="w-4 h-4" />
                            {copied && (
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                                Tersalin!
                              </span>
                            )}
                          </button>
                        </div>
                        <span className="text-xs text-slate-700 block font-medium">
                          a.n. {selectedBank.accountHolder}
                        </span>
                      </div>

                      {/* Right Upload Bukti Dropzone */}
                      <label className="md:col-span-5 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center">
                        <input
                          type="file"
                          accept={DOCUMENT_UPLOAD_ACCEPT}
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0])
                              handleFileSelect("buktiBayar", e.target.files[0]);
                          }}
                        />
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-1.5">
                          <Upload className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-slate-800 text-xs block">
                          Upload Bukti Pembayaran
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          {selectedFileObjects.buktiBayar ? (
                            <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1 mt-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />{" "}
                              {selectedFileObjects.buktiBayar.name}
                            </span>
                          ) : (
                            "Unggah Bukti Transfer (PDF / Gambar, Maks. 10MB)"
                          )}
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* QRIS Tab */}
                {paymentMethod === "qris" && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-6 bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center space-y-3">
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                        Scan QRIS Pembayaran
                      </h4>
                      <div className="relative w-48 h-48 mx-auto border-2 border-emerald-500 rounded-2xl overflow-hidden shadow-md bg-white p-2">
                        <Image
                          src={qrisImageUrl || "/images/qris_default.png"}
                          alt="QRIS Barcode"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            setPreviewModal({
                              isOpen: true,
                              src: qrisImageUrl || "/images/qris_default.png",
                              title: "QRIS Barcode Pembayaran PPDB",
                            })
                          }
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline inline-flex items-center gap-1"
                        >
                          <QrCode className="w-3.5 h-3.5" /> Perbesar QRIS
                        </button>
                      </div>
                    </div>

                    <label className="md:col-span-6 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center min-h-48">
                      <input
                        type="file"
                        accept={DOCUMENT_UPLOAD_ACCEPT}
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0])
                            handleFileSelect("buktiBayar", e.target.files[0]);
                        }}
                      />
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-2">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-800 text-xs block">
                        Upload Tangkapan Layar QRIS
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        {selectedFileObjects.buktiBayar ? (
                          <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />{" "}
                            {selectedFileObjects.buktiBayar.name}
                          </span>
                        ) : (
                          "Upload bukti transaksi QRIS Anda di sini (Maks. 10MB)"
                        )}
                      </span>
                    </label>
                  </div>
                )}

                {/* Tunai Tab */}
                {paymentMethod === "tunai" && (
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-amber-900 text-xs space-y-1">
                    <h5 className="font-bold">Pembayaran Tunai di Lokasi Sekolah</h5>
                    <p>
                      Silakan lakukan pembayaran langsung ke bagian tata usaha / keuangan sekolah saat menyerahkan kelengkapan berkas fisik.
                    </p>
                  </div>
                )}

                {/* Perhatian Transfer Note */}
                <div className="bg-[#fff8e7] rounded-2xl p-4 border border-amber-200 flex items-start gap-3 text-xs">
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 font-bold">
                    i
                  </div>
                  <div>
                    <h5 className="font-extrabold text-amber-950 mb-0.5">
                      Catatan Pembayaran
                    </h5>
                    <p className="text-amber-900/80">
                      Sebutkan berita transfer: PPDB Smart Kids - {formData.namaAnak || "Nama Anak"}.
                    </p>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    onClick={() => setStep(2)}
                    disabled={submitting}
                    className="px-8 py-3 rounded-full border border-emerald-600 text-emerald-700 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-colors disabled:opacity-40"
                  >
                    Kembali
                  </button>

                  <button
                    onClick={handleFinish}
                    disabled={submitting}
                    className="px-10 py-3 rounded-full bg-[#057a44] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Mengunggah Berkas & Memproses...</span>
                      </>
                    ) : (
                      <span>Selesai & Kirim Pendaftaran</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Shared Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar siteProfile={siteProfile} selectedSchoolCode={currentSchoolCode} />
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
                Terima kasih telah mendaftarkan{" "}
                <strong className="text-emerald-800">{formData.namaAnak}</strong> di Smart Kids. Tim kami akan segera melakukan verifikasi dan menghubungi Anda via WhatsApp.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-600 border border-slate-100 text-left space-y-1">
              <p>
                <strong>No. Registrasi:</strong> {regId}
              </p>
              <p>
                <strong>Program:</strong> {formData.program || "S3"}
              </p>
              <p>
                <strong>Total PPDB:</strong> Rp {totalPpdbPackageAmount.toLocaleString("id-ID")}
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
