"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageModal from "@/components/common/ImageModal";
import SearchableSelect from "@/components/common/SearchableSelect";
import Image from "next/image";
import {
  DOCUMENT_UPLOAD_ACCEPT,
  IMAGE_UPLOAD_ACCEPT,
  type UploadCategory,
  validateUploadFile,
} from "@/lib/upload-config";
import {
  Users,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Upload,
  Search,
  Eye,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Building,
  Sparkles,
  School as SchoolIcon,
  TrendingUp,
  Award,
  Calendar,
  Layers,
  Filter,
  ArrowUpRight,
  Clock,
  Video,
  GraduationCap,
  Bell,
  CreditCard,
  FileCheck,
  FileText,
  Key,
  Copy,
  Send,
  QrCode,
  Camera,
  Check,
  X,
  UserCheck,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "schools"
    | "classes"
    | "users"
    | "ppdb"
    | "programs"
    | "teachers"
    | "students"
    | "attendance"
    | "teacher-attendance"
    | "spp"
    | "additional-fees"
    | "payment-settings"
    | "announcements"
    | "leave-requests"
    | "schedules"
    | "gallery"
    | "testimonials"
    | "profile"
  >("overview");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Image & Document Modal Preview State
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; src: string | null; title: string }>({
    isOpen: false,
    src: null,
    title: "Pratinjau Berkas",
  });

  const handleOpenPreview = (src: string | null, title: string = "Pratinjau Berkas") => {
    if (src) {
      setPreviewModal({ isOpen: true, src, title });
    }
  };

  // Multi-School & Admin Users States
  const [schoolsList, setSchoolsList] = useState<any[]>([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>("ALL");
  const [editingSchool, setEditingSchool] = useState<any | null>(null);

  // Master Kelas & Class Filter States
  const [classesList, setClassesList] = useState<any[]>([]);
  const [editingClassRoom, setEditingClassRoom] = useState<any | null>(null);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>("ALL");

  const [adminUsersList, setAdminUsersList] = useState<any[]>([]);
  const [editingAdminUser, setEditingAdminUser] = useState<any | null>(null);

  // Data States & Pagination
  const [ppdbList, setPpdbList] = useState<any[]>([]);
  const [ppdbStatusFilter, setPpdbStatusFilter] = useState("ALL");
  const [ppdbSearch, setPpdbSearch] = useState("");
  const [selectedPpdb, setSelectedPpdb] = useState<any | null>(null);
  const [ppdbPage, setPpdbPage] = useState(1);
  const [ppdbItemsPerPage, setPpdbItemsPerPage] = useState(10);

  const [programsList, setProgramsList] = useState<any[]>([]);
  const [editingProgram, setEditingProgram] = useState<any | null>(null);

  const [teachersList, setTeachersList] = useState<any[]>([]);
  const [editingTeacher, setEditingTeacher] = useState<any | null>(null);

  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [studentSearchQuery, setStudentSearchQuery] = useState<string>("");
  const [sppSearchQuery, setSppSearchQuery] = useState<string>("");
  const [selectedHomeroomFilter, setSelectedHomeroomFilter] = useState<string>("ALL");
  const [teacherProgressList, setTeacherProgressList] = useState<any[]>([]);
  const [selectedProgressMonth, setSelectedProgressMonth] = useState<string>("ALL");
  const [teacherProgressModal, setTeacherProgressModal] = useState<{
    isOpen: boolean;
    teacherId: string;
    teacherName: string;
    month: string;
    programTitle: string;
    hoursTaught: number;
    targetHours: number;
    evaluatedStudentsCount: number;
    notes: string;
  }>({
    isOpen: false,
    teacherId: "",
    teacherName: "",
    month: "Juli 2026",
    programTitle: "Program Belajar Sentra TK A",
    hoursTaught: 36,
    targetHours: 40,
    evaluatedStudentsCount: 15,
    notes: "",
  });
  const [teacherCredentialModal, setTeacherCredentialModal] = useState<{
    isOpen: boolean;
    loading: boolean;
    teacherId: string;
    teacherName: string;
    role: string;
    assignedClass: string;
    schoolName: string;
    username: string;
    password: string;
    passwordAvailable: boolean;
    qrCode: string;
  }>({
    isOpen: false,
    loading: false,
    teacherId: "",
    teacherName: "",
    role: "",
    assignedClass: "",
    schoolName: "",
    username: "",
    password: "",
    passwordAvailable: false,
    qrCode: "",
  });
  const [dailyGradesList, setDailyGradesList] = useState<any[]>([]);
  const [dailyGradeModal, setDailyGradeModal] = useState<{
    isOpen: boolean;
    studentId: string;
    studentName: string;
    subject: string;
    score: number;
    date: string;
    notes: string;
  }>({
    isOpen: false,
    studentId: "",
    studentName: "",
    subject: "Moral & Agama",
    score: 85,
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });
  const [sendingAccount, setSendingAccount] = useState<boolean>(false);

  // Additional Fees States
  const [additionalFeesList, setAdditionalFeesList] = useState<any[]>([]);
  const [additionalFeeSearch, setAdditionalFeeSearch] = useState<string>("");
  const [additionalFeeStatusFilter, setAdditionalFeeStatusFilter] = useState<string>("ALL");
  const [additionalFeeCategoryFilter, setAdditionalFeeCategoryFilter] = useState<string>("ALL");
  const [editingAdditionalFee, setEditingAdditionalFee] = useState<any | null>(null);
  const [feeComponentsList, setFeeComponentsList] = useState<any[]>([]);
  const [editingFeeComponent, setEditingFeeComponent] = useState<any | null>(null);

  // Bank Accounts & Payment Methods States
  const [bankAccountsList, setBankAccountsList] = useState<any[]>([]);
  const [editingBankAccount, setEditingBankAccount] = useState<any | null>(null);
  const [uploadingQris, setUploadingQris] = useState<boolean>(false);
  const [selectedCredentialModal, setSelectedCredentialModal] = useState<{
    studentName: string;
    username: string;
    password: string;
    parentEmail?: string;
    parentPhone?: string;
    waUrl?: string | null;
    emailSent?: boolean;
  } | null>(null);
  const [credentialsCopied, setCredentialsCopied] = useState<boolean>(false);

  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [editingAttendance, setEditingAttendance] = useState<any | null>(null);

  const [sppList, setSppList] = useState<any[]>([]);
  const [editingSpp, setEditingSpp] = useState<any | null>(null);
  const [sppStatusFilter, setSppStatusFilter] = useState<string>("ALL");
  const [sppPaymentModal, setSppPaymentModal] = useState<{
    isOpen: boolean;
    studentId: string;
    studentName: string;
    nisn: string;
    className: string;
    month: string;
    amount: number;
    paymentMethod: string;
    proofUrl: string;
    note: string;
    uploading: boolean;
  }>({
    isOpen: false,
    studentId: "",
    studentName: "",
    nisn: "",
    className: "",
    month: "Juli 2026",
    amount: 350000,
    paymentMethod: "TRANSFER_BCA",
    proofUrl: "",
    note: "",
    uploading: false,
  });

  const [announcementsList, setAnnouncementsList] = useState<any[]>([]);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any | null>(null);

  const [leaveRequestsList, setLeaveRequestsList] = useState<any[]>([]);
  const [editingLeaveRequest, setEditingLeaveRequest] = useState<any | null>(null);
  const [leaveStatusFilter, setLeaveStatusFilter] = useState<string>("ALL");
  const [leaveUploading, setLeaveUploading] = useState<boolean>(false);
  const [teacherAttendanceList, setTeacherAttendanceList] = useState<any[]>([]);

  // QR Code Presensi Modal State
  const [qrModal, setQrModal] = useState<{
    isOpen: boolean;
    type: "STUDENT" | "TEACHER";
    inputCode: string;
    scanning: boolean;
    result: any | null;
    error: string | null;
  }>({
    isOpen: false,
    type: "STUDENT",
    inputCode: "",
    scanning: false,
    result: null,
    error: null,
  });

  // Detail Plotting Kelas Modal State
  const [selectedDetailClass, setSelectedDetailClass] = useState<any | null>(null);
  const [addStudentToClassModal, setAddStudentToClassModal] = useState<boolean>(false);
  const [selectedStudentToAdd, setSelectedStudentToAdd] = useState<string>("");

  const handlePlotStudent = async (studentId: string, targetClassId: string | null, action?: "REMOVE") => {
    try {
      const res = await fetch("/api/classes/plot-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, targetClassId, action }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(data.message, "success");
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  // Plotting Wali Kelas Modal State
  const [plottingModal, setPlottingModal] = useState<{
    isOpen: boolean;
    teacherId: string;
    teacherName: string;
    assignedClass: string;
  }>({
    isOpen: false,
    teacherId: "",
    teacherName: "",
    assignedClass: "",
  });

  const [schedulesList, setSchedulesList] = useState<any[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<any | null>(null);

  const [galleryList, setGalleryList] = useState<any[]>([]);
  const [newGalleryTitle, setNewGalleryTitle] = useState("");
  const [newGalleryImage, setNewGalleryImage] = useState("");

  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);

  const [siteProfile, setSiteProfile] = useState<any>({
    heroBadge: "",
    heroTitle: "",
    heroSubtitle: "",
    heroMascotUrl: "",
    ctaTitle: "",
    ctaSubtitle: "",
    phone: "",
    instagram: "",
    facebook: "",
    address: "",
  });

  // QR Code Camera scanner integration using html5-qrcode
  useEffect(() => {
    let html5QrCode: any = null;
    let isActive = true;

    if (qrModal.isOpen) {
      const initScanner = () => {
        const readerElement = document.getElementById("reader");
        if (!readerElement) {
          if (isActive) {
            setTimeout(initScanner, 100);
          }
          return;
        }

        import("html5-qrcode").then((module) => {
          if (!isActive) return;
          try {
            html5QrCode = new module.Html5Qrcode("reader");
            html5QrCode.start(
              { facingMode: "environment" },
              {
                fps: 10,
                qrbox: { width: 220, height: 220 },
              },
              (decodedText: string) => {
                setQrModal((prev) => ({ ...prev, inputCode: decodedText }));
                handleScanQr(decodedText, qrModal.type);
                if (html5QrCode && html5QrCode.isScanning) {
                  html5QrCode.stop().catch((err: any) => console.error("Error stopping scanner", err));
                }
              },
              (errorMessage: string) => {
                // Quiet
              }
            ).catch((err: any) => {
              console.error("Error starting Html5Qrcode camera", err);
              setQrModal((prev) => ({ ...prev, error: "Kamera diblokir atau tidak tersedia. Masukkan kode secara manual di bawah." }));
            });
          } catch (e) {
            console.error("Html5Qrcode constructor error", e);
          }
        }).catch((err: any) => {
          console.error("Html5Qrcode dynamic import failed:", err);
        });
      };

      initScanner();
    }

    return () => {
      isActive = false;
      if (html5QrCode) {
        try {
          if (html5QrCode.isScanning) {
            html5QrCode.stop().catch((err: any) => console.error("Error stopping scanner on cleanup", err));
          }
        } catch (e) {
          console.error("Error stopping scanner during cleanup", e);
        }
      }
    };
  }, [qrModal.isOpen, qrModal.type]);

  // Real-time clock display
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }) + " • " + now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check auth session
  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          router.push("/admin/login");
        } else {
          setAdmin(data.admin);
          if (data.admin?.schoolId) {
            setSelectedSchoolId(data.admin.schoolId);
          }
          loadSchools();
          loadAdminUsers();
        }
      })
      .catch(() => router.push("/admin/login"));
  }, [router]);

  const loadSchools = async () => {
    try {
      const res = await fetch("/api/schools");
      const data = await res.json();
      if (data.success && data.data) {
        setSchoolsList(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadAdminUsers = async () => {
    try {
      const res = await fetch("/api/admin-users");
      const data = await res.json();
      if (data.success && data.data) {
        setAdminUsersList(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Admin User Handlers
  const handleSaveAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingAdminUser?.id;
      const url = isEdit ? `/api/admin-users/${editingAdminUser.id}` : "/api/admin-users";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingAdminUser),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(isEdit ? "User admin diperbarui" : "User admin baru ditambahkan", "success");
      setEditingAdminUser(null);
      loadAdminUsers();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAdminUser = async (id: string) => {
    if (!confirm("Hapus akun user admin ini?")) return;
    try {
      const res = await fetch(`/api/admin-users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("User admin dihapus", "success");
      loadAdminUsers();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  useEffect(() => {
    if (admin) {
      loadDataForSelectedSchool();
    }
  }, [selectedSchoolId, admin]);

  const loadDataForSelectedSchool = async () => {
    setLoading(true);
    try {
      const queryParam = selectedSchoolId && selectedSchoolId !== "ALL" ? `?schoolId=${selectedSchoolId}` : "";

      const [resPpdb, resProg, resTeach, resGal, resTest, resProf, resStud, resSched, resAtt, resLeave, resAnn, resSpp, resTeachAtt, resClasses, resDailyGrades, resTeachProg, resAddFees, resBanks, resFeeComponents] = await Promise.all([
        fetch(`/api/ppdb${queryParam}`).then((r) => r.json()),
        fetch(`/api/programs${queryParam}`).then((r) => r.json()),
        fetch(`/api/teachers${queryParam}`).then((r) => r.json()),
        fetch(`/api/gallery${queryParam}`).then((r) => r.json()),
        fetch(`/api/testimonials${queryParam}`).then((r) => r.json()),
        fetch(`/api/site-profile${queryParam}`).then((r) => r.json()),
        fetch(`/api/students${queryParam}`).then((r) => r.json()),
        fetch(`/api/schedules${queryParam}`).then((r) => r.json()),
        fetch(`/api/attendance${queryParam}`).then((r) => r.json()),
        fetch(`/api/leave-requests${queryParam}`).then((r) => r.json()),
        fetch(`/api/announcements${queryParam}`).then((r) => r.json()),
        fetch(`/api/spp${queryParam}`).then((r) => r.json()),
        fetch(`/api/teacher-attendance${queryParam}`).then((r) => r.json()),
        fetch(`/api/classes${queryParam}`).then((r) => r.json()),
        fetch(`/api/daily-grades${queryParam}`).then((r) => r.json()),
        fetch(`/api/teacher-progress${queryParam}`).then((r) => r.json()),
        fetch(`/api/additional-fees${queryParam}`).then((r) => r.json()),
        fetch(`/api/bank-accounts${queryParam}`).then((r) => r.json()),
        fetch(`/api/fee-components${queryParam}${queryParam ? "&" : "?"}includeInactive=true`).then((r) => r.json()),
      ]);

      if (resPpdb.success) setPpdbList(resPpdb.data || []);
      if (resProg.success) setProgramsList(resProg.data || []);
      if (resTeach.success) setTeachersList(resTeach.data || []);
      if (resGal.success) setGalleryList(resGal.data || []);
      if (resTest.success) setTestimonialsList(resTest.data || []);
      if (resProf.success && resProf.data) setSiteProfile(resProf.data);
      if (resStud.success) setStudentsList(resStud.data || []);
      if (resSched.success) setSchedulesList(resSched.data || []);
      if (resAtt.success) setAttendanceList(resAtt.data || []);
      if (resLeave.success) setLeaveRequestsList(resLeave.data || []);
      if (resAnn.success) setAnnouncementsList(resAnn.data || []);
      if (resSpp.success) setSppList(resSpp.data || []);
      if (resTeachAtt.success) setTeacherAttendanceList(resTeachAtt.data || []);
      if (resClasses.success) setClassesList(resClasses.data || []);
      if (resDailyGrades.success) setDailyGradesList(resDailyGrades.data || []);
      if (resTeachProg && resTeachProg.success) setTeacherProgressList(resTeachProg.data || []);
      if (resAddFees && resAddFees.success) setAdditionalFeesList(resAddFees.data || []);
      if (resBanks && resBanks.success) setBankAccountsList(resBanks.data || []);
      if (resFeeComponents && resFeeComponents.success) setFeeComponentsList(resFeeComponents.data || []);
    } catch (err: any) {
      showMessage("Gagal memuat data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClassRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingClassRoom?.id;
      const url = isEdit ? `/api/classes/${editingClassRoom.id}` : "/api/classes";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingClassRoom),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(isEdit ? "Master kelas diperbarui" : "Master kelas baru ditambahkan", "success");
      setEditingClassRoom(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClassRoom = async (id: string) => {
    if (!confirm("Hapus master kelas ini?")) return;
    try {
      const res = await fetch(`/api/classes/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Master kelas dihapus", "success");
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  // QR Code Presensi Scanner Handlers
  const handleScanQr = async (qrText: string, type: "STUDENT" | "TEACHER") => {
    if (!qrText) return;
    setQrModal((prev) => ({ ...prev, scanning: true, error: null, result: null }));
    try {
      const endpoint = type === "STUDENT" ? "/api/attendance/scan-qr" : "/api/teacher-attendance/scan-qr";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrData: qrText, adminRole: admin?.role }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setQrModal((prev) => ({
        ...prev,
        scanning: false,
        result: data,
        inputCode: "",
      }));

      showMessage(data.message, "success");
      loadDataForSelectedSchool();
    } catch (err: any) {
      setQrModal((prev) => ({
        ...prev,
        scanning: false,
        error: err.message,
      }));
    }
  };

  // Batch Attendance for Wali Kelas
  const handleBatchAttendanceWaliKelas = async (targetClassName: string) => {
    const classStudents = studentsList.filter(
      (s) => s.className?.toLowerCase() === targetClassName?.toLowerCase()
    );
    if (classStudents.length === 0) {
      showMessage(`Tidak ada siswa terdaftar pada ${targetClassName}`, "error");
      return;
    }

    if (!confirm(`Tandai HADIR seluruh ${classStudents.length} murid di ${targetClassName}?`)) return;

    try {
      const batchData = classStudents.map((s) => ({
        studentId: s.id,
        studentName: s.name,
        className: s.className,
        status: "hadir",
        time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        date: new Date().toISOString().split("T")[0],
      }));

      const res = await fetch("/api/attendance/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendance: batchData }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(`Absensi Wali Kelas Berhasil! ${classStudents.length} murid ${targetClassName} dicatat HADIR.`, "success");
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  // Save Teacher Plotting (Wali Kelas)
  const handleSaveTeacherPlotting = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const teacher = teachersList.find((t) => t.id === plottingModal.teacherId);
      if (!teacher) throw new Error("Guru tidak ditemukan");

      const res = await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: teacher.id,
          name: teacher.name,
          role: teacher.role,
          assignedClass: plottingModal.assignedClass,
          photoUrl: teacher.photoUrl,
          bio: teacher.bio,
          education: teacher.education,
          orderIndex: teacher.orderIndex,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(`Berhasil plotting ${teacher.name} sebagai Wali Kelas ${plottingModal.assignedClass}`, "success");
      setPlottingModal({ isOpen: false, teacherId: "", teacherName: "", assignedClass: "" });
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const uploadFile = async (file: File, category: UploadCategory): Promise<string> => {
    const validationError = validateUploadFile(file, category);
    if (validationError) throw new Error(validationError);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Gagal mengunggah file");
    }
    return data.url;
  };

  // School Handlers
  const handleSaveSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingSchool?.id;
      const url = isEdit ? `/api/schools/${editingSchool.id}` : "/api/schools";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSchool),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(isEdit ? "Cabang sekolah diperbarui" : "Cabang sekolah baru ditambahkan", "success");
      setEditingSchool(null);
      loadSchools();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSchool = async (id: string) => {
    if (!confirm("Hapus cabang sekolah ini beserta seluruh datanya?")) return;
    try {
      const res = await fetch(`/api/schools/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Cabang sekolah dihapus", "success");
      if (selectedSchoolId === id) setSelectedSchoolId("ALL");
      loadSchools();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  // PPDB Handlers
  const handleUpdatePpdbStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/ppdb/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setPpdbList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      if (selectedPpdb?.id === id) {
        setSelectedPpdb({ ...selectedPpdb, status });
      }

      if (status === "APPROVED") {
        // Automatically reload students list so the new student appears in Kelola Murid immediately
        const queryParam = selectedSchoolId && selectedSchoolId !== "ALL" ? `?schoolId=${selectedSchoolId}` : "";
        const resStud = await fetch(`/api/students${queryParam}`).then((r) => r.json());
        if (resStud.success) setStudentsList(resStud.data || []);

        if (data.accountInfo && data.accountInfo.username) {
          const ppdbItem = ppdbList.find((p) => p.id === id) || selectedPpdb;
          const cleanPhone = (ppdbItem?.noWhatsapp || "").replace(/[^0-9]/g, "");
          const formattedPhone = cleanPhone.startsWith("0") ? `62${cleanPhone.slice(1)}` : cleanPhone;
          const appUrl = window.location.origin;
          const waMsg = `Halo Bapak/Ibu ${ppdbItem?.namaOrtu || "Orang Tua"},\n\nPendaftaran PPDB ananda *${ppdbItem?.namaAnak}* telah DITERIMA!\n\nBerikut akun Portal Orang Tua:\n👤 Username: *${data.accountInfo.username}*\n🔑 Password: *${data.accountInfo.passwordStr}*\n\nSilakan login di: ${appUrl}/login`;

          setSelectedCredentialModal({
            studentName: ppdbItem?.namaAnak || "Siswa",
            username: data.accountInfo.username,
            password: data.accountInfo.passwordStr,
            parentEmail: ppdbItem?.email || "",
            parentPhone: ppdbItem?.noWhatsapp || "",
            emailSent: true,
            waUrl: formattedPhone ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(waMsg)}` : null,
          });
        }
        showMessage("PPDB disetujui & Akun Siswa otomatis dibuat!", "success");
      } else {
        showMessage(`Status PPDB diperbarui menjadi ${status}`, "success");
      }
    } catch (err: any) {
      showMessage(err.message || "Gagal mengubah status PPDB", "error");
    }
  };

  const handleSendStudentCredentials = async (studentId: string) => {
    setSendingAccount(true);
    try {
      const res = await fetch(`/api/students/${studentId}/send-credentials`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setSelectedCredentialModal({
        studentName: data.data.student.name,
        username: data.data.username,
        password: data.data.password,
        parentEmail: data.data.parentEmail || "",
        parentPhone: data.data.parentPhone || "",
        waUrl: data.data.waUrl,
        emailSent: data.data.emailSent,
      });
      showMessage("Akun ortu berhasil dibuat & dikirim!", "success");
    } catch (err: any) {
      showMessage(err.message || "Gagal mengirim akun ortu", "error");
    } finally {
      setSendingAccount(false);
    }
  };

  const handleDeletePpdb = async (id: string) => {
    if (!confirm("Hapus data pendaftaran ini?")) return;
    try {
      const res = await fetch(`/api/ppdb/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Data pendaftaran dihapus", "success");
      setPpdbList((prev) => prev.filter((item) => item.id !== id));
      if (selectedPpdb?.id === id) setSelectedPpdb(null);
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  // Program Handlers
  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingProgram?.id;
      const url = isEdit ? `/api/programs/${editingProgram.id}` : "/api/programs";
      const method = isEdit ? "PUT" : "POST";

      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingProgram,
          schoolId: editingProgram.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(isEdit ? "Program diperbarui" : "Program baru ditambahkan", "success");
      setEditingProgram(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!confirm("Hapus program ini?")) return;
    try {
      const res = await fetch(`/api/programs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Program dihapus", "success");
      setProgramsList((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  const handleUploadProgramIcon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProgram) return;
    try {
      setSaving(true);
      const url = await uploadFile(file, "programs");
      setEditingProgram((prev: any) => ({ ...prev, iconUrl: url }));
      showMessage("Icon program berhasil diunggah!", "success");
    } catch (err: any) {
      showMessage(err.message || "Gagal mengunggah icon program", "error");
    } finally {
      setSaving(false);
    }
  };

  // Teacher Handlers
  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingTeacher?.id;
      const url = isEdit ? `/api/teachers/${editingTeacher.id}` : "/api/teachers";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingTeacher,
          schoolId: editingTeacher.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(isEdit ? "Data guru diperbarui" : "Guru baru ditambahkan", "success");
      setEditingTeacher(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    if (!confirm("Hapus data guru ini?")) return;
    try {
      const res = await fetch(`/api/teachers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Data guru dihapus", "success");
      setTeachersList((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  const handleShowTeacherCredentials = async (teacherId: string) => {
    setTeacherCredentialModal({
      isOpen: true,
      loading: true,
      teacherId: "",
      teacherName: "",
      role: "",
      assignedClass: "",
      schoolName: "",
      username: "",
      password: "",
      passwordAvailable: false,
      qrCode: "",
    });

    try {
      const res = await fetch(`/api/teachers/${teacherId}/credentials`);
      const data = await res.json();
      if (data.success && data.data) {
        setTeacherCredentialModal({
          isOpen: true,
          loading: false,
          ...data.data,
        });
      } else {
        showMessage(data.error || "Gagal memuat akun guru", "error");
        setTeacherCredentialModal((prev) => ({ ...prev, isOpen: false }));
      }
    } catch (err: any) {
      showMessage("Gagal memuat akun guru", "error");
      setTeacherCredentialModal((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const handleResetTeacherPassword = async () => {
    if (!teacherCredentialModal.teacherId) return;
    if (!confirm("Reset password guru dan buat password sementara baru?")) return;

    setTeacherCredentialModal((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch(
        `/api/teachers/${teacherCredentialModal.teacherId}/credentials`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setTeacherCredentialModal((prev) => ({
        ...prev,
        loading: false,
        username: data.data.username,
        password: data.data.password,
        passwordAvailable: true,
      }));
      showMessage("Password guru berhasil di-reset dengan bcrypt", "success");
    } catch (err: any) {
      showMessage(err.message || "Gagal mereset password guru", "error");
      setTeacherCredentialModal((prev) => ({ ...prev, loading: false }));
    }
  };

  // Student Handlers
  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingStudent?.id;
      const url = isEdit ? `/api/students/${editingStudent.id}` : "/api/students";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingStudent,
          schoolId: editingStudent.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(isEdit ? "Data siswa diperbarui" : "Siswa baru ditambahkan", "success");
      setEditingStudent(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm("Hapus data siswa ini?")) return;
    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Data siswa dihapus", "success");
      setStudentsList((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  const handleSaveDailyGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/daily-grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dailyGradeModal),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(`Nilai harian ${dailyGradeModal.studentName} (${dailyGradeModal.subject}: ${dailyGradeModal.score}) berhasil disimpan & Nilai Akhir terkalkulasi!`, "success");
      setDailyGradeModal((prev) => ({ ...prev, isOpen: false, notes: "" }));
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDailyGrade = async (id: string) => {
    if (!confirm("Hapus catatan nilai harian ini?")) return;
    try {
      const res = await fetch(`/api/daily-grades/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Catatan nilai harian dihapus & Nilai Akhir dikalkulasi ulang!", "success");
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };
  // Attendance Handler
  const handleSaveAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingAttendance,
          schoolId: editingAttendance.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Presensi siswa berhasil dicatat!", "success");
      setEditingAttendance(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Schedule Handlers
  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingSchedule?.id;
      const url = isEdit ? `/api/schedules/${editingSchedule.id}` : "/api/schedules";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingSchedule,
          schoolId: editingSchedule.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(isEdit ? "Jadwal diperbarui" : "Jadwal baru ditambahkan", "success");
      setEditingSchedule(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!confirm("Hapus jadwal ini?")) return;
    try {
      const res = await fetch(`/api/schedules/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Jadwal dihapus", "success");
      setSchedulesList((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  // Announcement Handlers
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingAnnouncement,
          schoolId: editingAnnouncement.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Pengumuman berhasil diterbitkan", "success");
      setEditingAnnouncement(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm("Hapus pengumuman ini?")) return;
    try {
      const res = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Pengumuman dihapus", "success");
      setAnnouncementsList((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  // Leave Request Handlers
  const handleSaveLeaveRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/leave-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingLeaveRequest,
          schoolId: editingLeaveRequest.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Pengajuan izin/cuti mengajar berhasil dikirim!", "success");
      setEditingLeaveRequest(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleUploadLeaveAttachment = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLeaveUploading(true);
      const url = await uploadFile(file, "leave");
      setEditingLeaveRequest((prev: any) => ({ ...prev, attachment: url }));
      showMessage("Lampiran berhasil diunggah!", "success");
    } catch (err: any) {
      showMessage(err.message || "Gagal mengunggah lampiran", "error");
    } finally {
      setLeaveUploading(false);
    }
  };

  const handleUpdateLeaveStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/leave-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(`Status izin diubah menjadi ${status}`, "success");
      setLeaveRequestsList((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  const handleDeleteLeaveRequest = async (id: string) => {
    if (!confirm("Hapus pengajuan izin ini?")) return;
    try {
      const res = await fetch(`/api/leave-requests/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Pengajuan izin dihapus", "success");
      setLeaveRequestsList((prev) => prev.filter((l) => l.id !== id));
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  // SPP Handlers
  const handleSaveSpp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingSpp.id;
      const url = isEdit ? `/api/spp/${editingSpp.id}` : "/api/spp";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSpp),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(isEdit ? "Detail Pembayaran SPP berhasil diperbarui" : "Catatan SPP berhasil ditambahkan", "success");
      setEditingSpp(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateSppStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/spp/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(`Status SPP diperbarui menjadi ${status}`, "success");
      setSppList((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  const handleDeleteSpp = async (id: string) => {
    if (!confirm("Hapus data SPP ini?")) return;
    try {
      const res = await fetch(`/api/spp/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Data SPP dihapus", "success");
      setSppList((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  const handleUploadSppProof = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setSppPaymentModal((prev) => ({ ...prev, uploading: true }));
      const url = await uploadFile(file, "spp");
      setSppPaymentModal((prev) => ({ ...prev, proofUrl: url, uploading: false }));
      showMessage("Foto bukti transfer berhasil diunggah!", "success");
    } catch (err: any) {
      setSppPaymentModal((prev) => ({ ...prev, uploading: false }));
      showMessage(err.message || "Gagal mengunggah bukti transfer", "error");
    }
  };

  const handleSubmitSppPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sppPaymentModal.proofUrl && !sppPaymentModal.paymentMethod.includes("TUNAI")) {
      showMessage("Harap unggah foto bukti transfer/pembayaran terlebih dahulu", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/spp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: sppPaymentModal.studentId || undefined,
          studentName: sppPaymentModal.studentName || admin?.name || "Siswa",
          nisn: sppPaymentModal.nisn || "123456789",
          className: sppPaymentModal.className || "TK A",
          month: sppPaymentModal.month,
          amount: Number(sppPaymentModal.amount),
          status: "menunggu_konfirmasi",
          paymentMethod: sppPaymentModal.paymentMethod,
          proofUrl: sppPaymentModal.proofUrl || null,
          note: sppPaymentModal.note || null,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Konfirmasi pembayaran SPP berhasil dikirim! Menunggu verifikasi admin.", "success");
      setSppPaymentModal((prev) => ({ ...prev, isOpen: false, proofUrl: "", note: "" }));
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Teacher Progress Handlers
  const handleSaveTeacherProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/teacher-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...teacherProgressModal,
          schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        showMessage("Record raihan mengajar guru berhasil disimpan!", "success");
        setTeacherProgressList((prev) => [data.data, ...prev]);
        setTeacherProgressModal((prev) => ({ ...prev, isOpen: false }));
      } else {
        showMessage(data.error || "Gagal menyimpan raihan mengajar", "error");
      }
    } catch (err: any) {
      showMessage("Terjadi kesalahan jaringan", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTeacherProgress = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus record raihan mengajar ini?")) return;
    try {
      const res = await fetch(`/api/teacher-progress/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showMessage("Record raihan mengajar berhasil dihapus", "success");
        setTeacherProgressList((prev) => prev.filter((item) => item.id !== id));
      } else {
        showMessage(data.error || "Gagal menghapus record", "error");
      }
    } catch (err) {
      showMessage("Gagal menghapus record", "error");
    }
  };

  // Gallery Handlers
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryImage) {
      showMessage("Pilih gambar terlebih dahulu", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
          title: newGalleryTitle || "Kegiatan Belajar",
          imageUrl: newGalleryImage,
          folder: "gallery",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Foto galeri ditambahkan", "success");
      setNewGalleryTitle("");
      setNewGalleryImage("");
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Hapus foto galeri ini?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Foto galeri dihapus", "success");
      setGalleryList((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  // Testimonial Handlers
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingTestimonial?.id;
      const url = isEdit ? `/api/testimonials/${editingTestimonial.id}` : "/api/testimonials";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingTestimonial,
          schoolId: editingTestimonial.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(isEdit ? "Testimoni diperbarui" : "Testimoni ditambahkan", "success");
      if (data.data) {
        if (isEdit) {
          setTestimonialsList((prev) =>
            prev.map((item) => (item.id === data.data.id ? data.data : item))
          );
        } else {
          setTestimonialsList((prev) => [data.data, ...prev]);
        }
      }
      setEditingTestimonial(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Hapus testimoni ini?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Testimoni dihapus", "success");
      setTestimonialsList((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  // Site Profile Handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const targetSchoolId = siteProfile.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id);

      const res = await fetch("/api/site-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...siteProfile,
          schoolId: targetSchoolId,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Pengaturan website cabang sekolah berhasil disimpan!", "success");
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Fee component master handlers (soft-disable only; historical snapshots are retained).
  const handleSaveFeeComponent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingFeeComponent?.id;
      const response = await fetch("/api/fee-components", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingFeeComponent,
          schoolId:
            editingFeeComponent.schoolId ||
            (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id),
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error);

      showMessage(data.message || "Komponen biaya berhasil disimpan", "success");
      setEditingFeeComponent(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message || "Gagal menyimpan komponen biaya", "error");
    } finally {
      setSaving(false);
    }
  };

  // Additional Fees Handlers
  const handleSaveAdditionalFee = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingAdditionalFee?.id;
      const url = "/api/additional-fees";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingAdditionalFee,
          schoolId: editingAdditionalFee.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(data.message || (isEdit ? "Biaya tambahan diperbarui" : "Tagihan biaya tambahan dibuat"), "success");
      setEditingAdditionalFee(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAdditionalFee = async (id: string) => {
    if (!confirm("Hapus tagihan biaya tambahan ini?")) return;
    try {
      const res = await fetch(`/api/additional-fees?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Tagihan biaya tambahan dihapus", "success");
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  const handleUpdateAdditionalFeeStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/additional-fees", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status,
          paymentDate: status === "lunas" ? new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : null,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(`Status tagihan diperbarui ke ${status.replace("_", " ")}`, "success");
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  // Bank Account & QRIS Handlers
  const handleSaveBankAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingBankAccount?.id;
      const url = "/api/bank-accounts";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingBankAccount,
          schoolId: editingBankAccount.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(data.message || (isEdit ? "Rekening bank diperbarui" : "Rekening bank ditambahkan"), "success");
      setEditingBankAccount(null);
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBankAccount = async (id: string) => {
    if (!confirm("Hapus nomor rekening bank ini?")) return;
    try {
      const res = await fetch(`/api/bank-accounts?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Rekening bank berhasil dihapus", "success");
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  const handleToggleBankAccountStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/bank-accounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage(`Rekening bank ${!currentStatus ? "diaktifkan" : "dinonaktifkan"}`, "success");
      loadDataForSelectedSchool();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  const handleUploadQrisImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingQris(true);
    try {
      const newUrl = await uploadFile(file, "qris");
      const targetSchoolId = siteProfile.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id);

      const resProf = await fetch("/api/site-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...siteProfile,
          schoolId: targetSchoolId,
          qrisImageUrl: newUrl,
        }),
      });
      const dataProf = await resProf.json();
      if (!resProf.ok || !dataProf.success) throw new Error(dataProf.error);

      setSiteProfile((prev: any) => ({ ...prev, qrisImageUrl: newUrl }));
      showMessage("Gambar QRIS barcode berhasil diperbarui!", "success");
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setUploadingQris(false);
    }
  };

  // Filtered PPDB List & Pagination Calculations
  const filteredPpdb = ppdbList.filter((item) => {
    const matchesStatus =
      ppdbStatusFilter === "ALL" || item.status === ppdbStatusFilter;
    const q = ppdbSearch.toLowerCase();
    const matchesSearch =
      !q ||
      item.namaAnak?.toLowerCase().includes(q) ||
      item.namaOrtu?.toLowerCase().includes(q) ||
      item.registrationNo?.toLowerCase().includes(q) ||
      item.noWhatsapp?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const totalPpdbPages = Math.ceil(filteredPpdb.length / ppdbItemsPerPage) || 1;
  const paginatedPpdb = filteredPpdb.slice(
    (ppdbPage - 1) * ppdbItemsPerPage,
    ppdbPage * ppdbItemsPerPage
  );

  const additionalFeeComponents = feeComponentsList.filter(
    (component) => component.category === "ADDITIONAL" && component.isActive !== false
  );
  const defaultAdditionalFeeComponent = additionalFeeComponents[0];

  const activeSchoolName = schoolsList.find((s) => s.id === selectedSchoolId)?.name || "Semua Sekolah (Yayasan Level)";

  if (loading && !admin) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white text-sm space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center animate-pulse">
          <RefreshCw className="w-7 h-7 text-emerald-400 animate-spin" />
        </div>
        <p className="font-extrabold tracking-wider text-slate-300">Memuat Dashboard CMS YAPCHI...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* ULTRA-PREMIUM GLASSMORPHISM HEADER */}
      <header className="bg-slate-900/80 border-b border-slate-800/80 sticky top-0 z-30 backdrop-blur-xl px-6 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-4 w-full shadow-2xl">
        {/* BRAND TITLE & BADGES */}
        <div className="flex items-center gap-3.5 w-full lg:w-auto">
          <div className="relative w-11 h-11 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-700 p-0.5 shadow-lg shadow-emerald-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-emerald-400 text-sm">
              YAP
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-lg text-white tracking-tight">
                YAPCHI CMS
              </h1>
              <span className="inline-flex items-center gap-1 bg-linear-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Multi-Sekolah
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Pusat Pengelolaan Yayasan & Cabang Sekolah</p>
          </div>
        </div>

        {/* CENTER: SCHOOL BRANCH SWITCHER PILL */}
        <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-2xl px-3 py-1.5 w-full lg:w-72 shadow-inner">
          <Building className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex-1">
            <SearchableSelect
              options={[
                { value: "ALL", label: "🏢 Semua Sekolah (Yayasan Level)" },
                ...schoolsList.map((sch) => ({
                  value: sch.id,
                  label: `🏫 ${sch.name}`,
                  sublabel: `Kode: ${sch.code}`,
                })),
              ]}
              value={selectedSchoolId}
              onChange={(val) => setSelectedSchoolId(val)}
              placeholder="Pilih cabang..."
              searchPlaceholder="Cari sekolah..."
            />
          </div>
        </div>

        {/* RIGHT CONTROL ACTIONS */}
        <div className="flex items-center gap-3.5 w-full lg:w-auto justify-between lg:justify-end">
          <div className="hidden xl:flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{currentTime}</span>
          </div>

          <a
            href="/"
            target="_blank"
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all bg-slate-800/80 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700 hover:border-emerald-500/40 shadow-sm"
          >
            <span>Lihat Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </a>

          <div className="flex items-center gap-2 bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs">
              {admin?.name?.charAt(0) || "A"}
            </div>
            <span className="text-xs font-bold text-slate-200">{admin?.name || admin?.username}</span>
            <span
              className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap inline-flex items-center ${
                admin?.role === "ADMIN_PUSAT" || admin?.role === "SUPER_ADMIN"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : admin?.role === "ADMIN_SEKOLAH"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : admin?.role === "GURU"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              }`}
            >
              {admin?.role === "ADMIN_PUSAT" || admin?.role === "SUPER_ADMIN"
                ? "Super Admin"
                : admin?.role === "ADMIN_SEKOLAH"
                ? "Admin Cabang"
                : admin?.role === "GURU"
                ? "Guru"
                : "Wali Murid"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-3.5 py-2 rounded-xl border border-red-500/20 transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* FEEDBACK TOAST NOTIFICATION */}
      {message && (
        <div
          className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl border text-sm font-semibold flex items-center gap-3 transition-all animate-bounce ${
            message.type === "success"
              ? "bg-emerald-950/95 text-emerald-200 border-emerald-500/40 shadow-emerald-900/30"
              : "bg-red-950/95 text-red-200 border-red-500/40 shadow-red-900/30"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* MAIN BODY LAYOUT */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 bg-slate-900/60 border-r border-slate-800/80 p-4 space-y-2 shrink-0 hidden md:block backdrop-blur-md">
          <div className="px-3 py-2 text-[10px] font-black uppercase text-slate-400 tracking-wider">
            Menu Utama CMS
          </div>
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "overview"
                  ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Ringkasan & Stats</span>
            </button>

            {(admin?.role === "ADMIN_PUSAT" || admin?.role === "SUPER_ADMIN") && (
              <button
                onClick={() => setActiveTab("schools")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "schools"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <SchoolIcon className="w-4 h-4 text-emerald-400" />
                  <span>Kelola Sekolah</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[11px] px-2 py-0.5 rounded-full font-black border border-emerald-500/30">
                  {schoolsList.length}
                </span>
              </button>
            )}

            {admin?.role !== "ORTU" && (
              <button
                onClick={() => setActiveTab("classes")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "classes"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Master Kelas & Plotting</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[11px] px-2 py-0.5 rounded-full font-black border border-emerald-500/30">
                  {classesList.length}
                </span>
              </button>
            )}

            {(admin?.role === "ADMIN_PUSAT" || admin?.role === "SUPER_ADMIN") && (
              <button
                onClick={() => setActiveTab("users")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "users"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Pengaturan User Admin</span>
                </div>
                <span className="bg-purple-500/20 text-purple-300 text-[11px] px-2 py-0.5 rounded-full font-black border border-purple-500/30">
                  {adminUsersList.length}
                </span>
              </button>
            )}

            {admin?.role !== "GURU" && admin?.role !== "ORTU" && (
              <button
                onClick={() => setActiveTab("ppdb")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "ppdb"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>Pendaftaran PPDB</span>
                </div>
                <span className="bg-slate-800 text-emerald-400 text-[11px] px-2.5 py-0.5 rounded-full font-bold border border-slate-700">
                  {ppdbList.length}
                </span>
              </button>
            )}

            {admin?.role !== "GURU" && admin?.role !== "ORTU" && (
              <button
                onClick={() => setActiveTab("programs")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "programs"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4" />
                  <span>Kelola Program</span>
                </div>
                <span className="bg-slate-800 text-slate-400 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                  {programsList.length}
                </span>
              </button>
            )}

            {admin?.role !== "GURU" && admin?.role !== "ORTU" && (
              <button
                onClick={() => setActiveTab("teachers")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "teachers"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Kelola Guru & Pengajar</span>
                </div>
                <span className="bg-slate-800 text-slate-400 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                  {teachersList.length}
                </span>
              </button>
            )}

            {admin?.role !== "ORTU" && (
              <button
                onClick={() => setActiveTab("students")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "students"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>Kelola Data Siswa</span>
                </div>
                <span className="bg-slate-800 text-slate-400 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                  {studentsList.length}
                </span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("attendance")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "attendance"
                  ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Presensi Siswa</span>
              </div>
              <span className="bg-slate-800 text-slate-400 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                {attendanceList.length}
              </span>
            </button>

            {admin?.role !== "ORTU" && (
              <button
                onClick={() => setActiveTab("teacher-attendance")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "teacher-attendance"
                    ? "bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4 text-purple-400" />
                  <span>Presensi Guru</span>
                </div>
                <span className="bg-slate-800 text-slate-400 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                  {teacherAttendanceList.length}
                </span>
              </button>
            )}

            {admin?.role !== "GURU" && (
              <button
                onClick={() => setActiveTab("spp")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "spp"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>SPP Utama</span>
                </div>
                <span className="bg-slate-800 text-slate-400 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                  {sppList.length}
                </span>
              </button>
            )}

            {admin?.role !== "GURU" && (
              <button
                onClick={() => setActiveTab("additional-fees")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "additional-fees"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Biaya Tambahan</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[11px] px-2.5 py-0.5 rounded-full font-black border border-emerald-500/30">
                  {additionalFeesList.length}
                </span>
              </button>
            )}

            {admin?.role !== "GURU" && admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA" && (
              <button
                onClick={() => setActiveTab("payment-settings")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "payment-settings"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <QrCode className="w-4 h-4 text-cyan-400" />
                  <span>Metode Pembayaran</span>
                </div>
                <span className="bg-slate-800 text-cyan-300 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                  {bankAccountsList.length}
                </span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("announcements")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "announcements"
                  ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-purple-400" />
                <span>Pengumuman</span>
              </div>
              <span className="bg-slate-800 text-slate-400 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                {announcementsList.length}
              </span>
            </button>

            {admin?.role !== "ORTU" && (
              <button
                onClick={() => setActiveTab("leave-requests")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "leave-requests"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileCheck className="w-4 h-4 text-rose-400" />
                  <span>Izin & Cuti Guru</span>
                </div>
                <span className="bg-slate-800 text-slate-400 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                  {leaveRequestsList.length}
                </span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("schedules")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "schedules"
                  ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Jadwal KBM</span>
              </div>
              <span className="bg-slate-800 text-slate-400 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                {schedulesList.length}
              </span>
            </button>

            {admin?.role !== "GURU" && admin?.role !== "ORTU" && (
              <button
                onClick={() => setActiveTab("gallery")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "gallery"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-4 h-4" />
                  <span>Kelola Galeri</span>
                </div>
                <span className="bg-slate-800 text-slate-400 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                  {galleryList.length}
                </span>
              </button>
            )}

            {admin?.role !== "GURU" && admin?.role !== "ORTU" && (
              <button
                onClick={() => setActiveTab("testimonials")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "testimonials"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4" />
                  <span>Kelola Testimoni</span>
                </div>
                <span className="bg-slate-800 text-slate-400 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                  {testimonialsList.length}
                </span>
              </button>
            )}

            {admin?.role !== "GURU" && admin?.role !== "ORTU" && (
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "profile"
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Pengaturan Website</span>
              </button>
            )}
          </nav>
        </aside>

        {/* FULL-WIDTH BODY DISPLAY */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full space-y-8">
          {/* MOBILE HORIZONTAL NAVIGATION TABS */}
          <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition ${
                activeTab === "overview" ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400 border border-slate-800"
              }`}
            >
              Ringkasan
            </button>
            {admin?.role !== "GURU" && admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA" && (
              <button
                onClick={() => setActiveTab("ppdb")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition ${
                  activeTab === "ppdb" ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                PPDB
              </button>
            )}
            {admin?.role !== "GURU" && admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA" && (
              <button
                onClick={() => setActiveTab("programs")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition ${
                  activeTab === "programs" ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                Program
              </button>
            )}
            {admin?.role !== "GURU" && admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA" && (
              <button
                onClick={() => setActiveTab("teachers")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition ${
                  activeTab === "teachers" ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                Guru
              </button>
            )}
            {admin?.role !== "GURU" && admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA" && (
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition ${
                  activeTab === "gallery" ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                Galeri
              </button>
            )}
            {admin?.role !== "GURU" && admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA" && (
              <button
                onClick={() => setActiveTab("testimonials")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition ${
                  activeTab === "testimonials" ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                Testimoni
              </button>
            )}
            {admin?.role !== "GURU" && admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA" && (
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition ${
                  activeTab === "profile" ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                Pengaturan
              </button>
            )}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 w-full">
              {/* HERO BANNER CARD WITH GRADIENT BACKGROUND */}
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-900/60 via-slate-900 to-slate-900 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                
                <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Selamat Datang Kembali, {admin?.name}!</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {admin?.role === "GURU"
                      ? `Portal Pembelajaran & Presensi - ${activeSchoolName}`
                      : admin?.role === "ORTU"
                      ? `Portal Informasi Wali Murid - ${activeSchoolName}`
                      : `Dashboard Pengelolaan ${activeSchoolName}`}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    {admin?.role === "GURU"
                      ? "Kelola presensi harian siswa, jadwal kegiatan belajar mengajar, pengumuman kelas, serta permohonan izin/cuti mengajar."
                      : admin?.role === "ORTU"
                      ? "Pantau catatan kehadiran ananda, jadwal belajar harian, pengumuman sekolah, serta informasi status pembayaran SPP."
                      : "Kelola data pendaftaran PPDB, program pembelajaran, presensi murid, data pengajar, serta pengumuman sekolah secara terpadu."}
                  </p>
                </div>
              </div>

              {/* SPECIAL PARENT STUDENT DETAILS CARD (Khusus Wali Murid / Ortu) */}
              {(() => {
                if (admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA") return null;

                const parentStudent = studentsList.find(
                  (s) =>
                    (s.parentPhone && admin?.phone && s.parentPhone === admin.phone) ||
                    (s.username && admin?.username && s.username === admin.username) ||
                    (s.parentName && admin?.name && s.parentName.toLowerCase().includes(admin.name.toLowerCase()))
                ) || studentsList[0];

                if (!parentStudent) return null;

                return (
                  <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xl border border-emerald-500/30 shrink-0">
                          👶
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                            Ringkasan Siswa Terdaftar
                          </span>
                          <h3 className="text-xl font-black text-white mt-1">{parentStudent.name}</h3>
                        </div>
                      </div>

                      <button
                        onClick={() => setEditingStudent(parentStudent)}
                        className="px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                      >
                        <Edit className="w-4 h-4 text-emerald-400" />
                        <span>Edit Data Siswa & Ortu</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* SUB CARD 1: INFORMASI SISWA */}
                      <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 space-y-3">
                        <h4 className="text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          <span>Informasi Murid / Siswa</span>
                        </h4>
                        <div className="space-y-2 text-xs divide-y divide-slate-800/60">
                          <div className="flex justify-between py-1.5 text-slate-300">
                            <span className="text-slate-400">Nama Lengkap:</span>
                            <span className="font-bold text-white">{parentStudent.name}</span>
                          </div>
                          <div className="flex justify-between py-1.5 text-slate-300">
                            <span className="text-slate-400">NISN / No Induk:</span>
                            <span className="font-mono font-bold text-emerald-300">{parentStudent.nisn}</span>
                          </div>
                          <div className="flex justify-between py-1.5 text-slate-300">
                            <span className="text-slate-400">Master Kelas:</span>
                            <span className="font-bold text-emerald-400">{parentStudent.className}</span>
                          </div>
                          <div className="flex justify-between py-1.5 text-slate-300">
                            <span className="text-slate-400">Jenis Kelamin:</span>
                            <span className="font-bold text-slate-200">{parentStudent.gender === "L" ? "Laki-laki (L)" : "Perempuan (P)"}</span>
                          </div>
                          <div className="flex justify-between py-1.5 text-slate-300">
                            <span className="text-slate-400">Tempat, Tgl Lahir:</span>
                            <span className="font-medium text-slate-300">{parentStudent.birthPlaceDate || "-"}</span>
                          </div>
                        </div>
                      </div>

                      {/* SUB CARD 2: INFORMASI ORANG TUA / WALI */}
                      <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 space-y-3">
                        <h4 className="text-xs font-black uppercase text-purple-400 tracking-wider flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Informasi Orang Tua / Wali</span>
                        </h4>
                        <div className="space-y-2 text-xs divide-y divide-slate-800/60">
                          <div className="flex justify-between py-1.5 text-slate-300">
                            <span className="text-slate-400">Nama Orang Tua:</span>
                            <span className="font-bold text-white">{parentStudent.parentName || admin?.name || "-"}</span>
                          </div>
                          <div className="flex justify-between py-1.5 text-slate-300">
                            <span className="text-slate-400">No. WhatsApp / HP:</span>
                            <span className="font-mono font-bold text-emerald-300">{parentStudent.parentPhone || admin?.phone || "-"}</span>
                          </div>
                          <div className="flex justify-between py-1.5 text-slate-300">
                            <span className="text-slate-400">Email Orang Tua:</span>
                            <span className="font-medium text-slate-300">{parentStudent.parentEmail || admin?.email || "-"}</span>
                          </div>
                          <div className="flex justify-between py-1.5 text-slate-300">
                            <span className="text-slate-400">Alamat Rumah:</span>
                            <span className="font-medium text-slate-300">{parentStudent.address || "-"}</span>
                          </div>
                        </div>
                      </div>

                      {/* SUB CARD 3: STATUS KEUANGAN & SPP */}
                      <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                        <div className="space-y-3">
                          <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span>SPP & Catatan Keuangan</span>
                          </h4>
                          
                          {(() => {
                            const childSpp = sppList.filter(
                              (s) =>
                                s.studentId === parentStudent.id ||
                                (s.studentName && s.studentName.toLowerCase().includes(parentStudent.name.toLowerCase()))
                            );
                            const lunasCount = childSpp.filter((s) => s.status === "lunas").length;
                            const pendingCount = childSpp.filter((s) => s.status === "menunggu_konfirmasi").length;

                            return (
                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between items-center py-1">
                                  <span className="text-slate-400">Total Record SPP:</span>
                                  <span className="font-bold text-white">{childSpp.length} Bulan</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                  <span className="text-slate-400">Status Terakhir:</span>
                                  <span className="font-bold text-emerald-400">
                                    {lunasCount} Lunas • {pendingCount > 0 ? `${pendingCount} Menunggu` : "0 Pending"}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-tight pt-1">
                                  Upload bukti pembayaran untuk konfirmasi transaksi SPP ananda.
                                </p>
                              </div>
                            );
                          })()}
                        </div>

                        <button
                          onClick={() => {
                            setActiveTab("spp");
                            setSppPaymentModal({
                              isOpen: true,
                              studentId: parentStudent.id,
                              studentName: parentStudent.name,
                              nisn: parentStudent.nisn,
                              className: parentStudent.className,
                              month: "Juli 2026",
                              amount: 350000,
                              paymentMethod: "TRANSFER_BCA",
                              proofUrl: "",
                              note: "",
                              uploading: false,
                            });
                          }}
                          className="w-full py-2.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                        >
                          <Upload className="w-4 h-4 text-amber-400" />
                          <span>Bayar & Upload Bukti SPP</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* STAT CARDS FULL WIDTH GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 w-full">
                <div className="bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/40 rounded-3xl p-6 transition-all shadow-xl group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">Cabang Sekolah</span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-500/20">
                      <Building className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-white tracking-tight">{schoolsList.length}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Terdaftar di YAPCHI Foundation</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/40 rounded-3xl p-6 transition-all shadow-xl group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">Total Pendaftar PPDB</span>
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform border border-blue-500/20">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-white tracking-tight">{ppdbList.length}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Status verifikasi dokumen & bayar</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/40 rounded-3xl p-6 transition-all shadow-xl group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">Status Menunggu</span>
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform border border-amber-500/20">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-amber-400 tracking-tight">
                    {ppdbList.filter((p) => p.status === "PENDING").length}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Perlu persetujuan admin</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/40 rounded-3xl p-6 transition-all shadow-xl group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">Total Program</span>
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform border border-purple-500/20">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-white tracking-tight">{programsList.length}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Program belajar aktif</p>
                </div>

                {admin?.role !== "GURU" && admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA" && (
                  <div 
                    onClick={() => setActiveTab("testimonials")}
                    className="bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/40 rounded-3xl p-6 transition-all shadow-xl group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-400">Testimoni Orang Tua</span>
                      <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform border border-teal-500/20">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-3xl font-black text-white tracking-tight">{testimonialsList.length}</p>
                    <p className="text-[11px] text-teal-400 mt-1 font-bold group-hover:underline">Klik untuk kelola &rarr;</p>
                  </div>
                )}
              </div>

              {/* PUSAT PROGRESIF FITUR SISTEM & VIDEO DEMONSTRASI CARD */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                {/* LEFT (7 COLS): PUSAT PROGRESIF FITUR SISTEM */}
                <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/70 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black border border-indigo-500/30">
                        🚀
                      </div>
                      <div>
                        <h3 className="font-extrabold text-lg text-white">Pusat Progresif Fitur Sistem</h3>
                        <p className="text-xs text-slate-400">Analisis progresif skema SPP & alokasi jam program belajar</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-black uppercase text-indigo-400 bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 rounded-full">
                      Realtime Metrics
                    </span>
                  </div>

                  {/* CAPAIAN RAIHAN MENGAJAR GURU PER BULAN (AUTOMATIC TRACKING FROM PRESENSI) */}
                  <div className="space-y-4 relative z-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center gap-2">
                          <Award className="w-4 h-4 text-emerald-400" />
                          <span>Capaian Raihan Mengajar Guru Per Bulan (Auto-Tracked Presensi)</span>
                        </h4>
                        <p className="text-[11px] text-slate-400">Otomatis dihitung berdasarkan kehadiran presensi guru & rasio SPP program per bulan.</p>
                      </div>

                      <button
                        onClick={() =>
                          setTeacherProgressModal({
                            isOpen: true,
                            teacherId: teachersList[0]?.id || "",
                            teacherName: teachersList[0]?.name || admin?.name || "Guru Pengajar",
                            month: "Juli 2026",
                            programTitle: programsList[0]?.title || "Program TK A - Sentra Kognitif",
                            hoursTaught: 36,
                            targetHours: 40,
                            evaluatedStudentsCount: 15,
                            notes: "Diinput manual oleh admin.",
                          })
                        }
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border border-slate-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Input Manual</span>
                      </button>
                    </div>

                    {/* TEACHER PROGRESS CARDS WITH AUTO SPP RATIO & ESTIMATED MONTHLY RESULTS */}
                    {(() => {
                      const sppAmounts = programsList.map((p) => Number(p.sppAmount || 200000)).filter((a) => a > 0);
                      const minSpp = sppAmounts.length > 0 ? Math.min(...sppAmounts) : 200000;

                      return (
                        <div className="space-y-3">
                          {/* DISPLAY PER TEACHER AUTO RESULT CARDS */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {teachersList.map((teacher) => {
                              // Find teacher's progress record or generate real-time metrics from attendance
                              const tpRecord = teacherProgressList.find(
                                (tp) => tp.teacherId === teacher.id || (tp.teacherName && tp.teacherName.toLowerCase() === teacher.name.toLowerCase())
                              );

                              // Find teacher's assigned class/room and matched program SPP
                              const assignedCls = classesList.find(
                                (c) => c.homeroomTeacherId === teacher.id || (c.homeroomTeacherName && c.homeroomTeacherName.toLowerCase() === teacher.name.toLowerCase()) || c.id === teacher.classId
                              );
                              const plottedClass = assignedCls?.name || teacher.classRoom?.name || teacher.assignedClass || teacher.role;
                              const plottedGrade = assignedCls?.gradeLevel || "";

                              const schoolProgs = programsList.filter((p) => !p.schoolId || p.schoolId === teacher.schoolId);

                              const matchedProgram =
                                schoolProgs.find((p) => {
                                  const t = p.title.toLowerCase();
                                  return (
                                    (plottedGrade && t.includes(plottedGrade.toLowerCase())) ||
                                    (plottedClass && (t.includes(plottedClass.toLowerCase()) || plottedClass.toLowerCase().includes(t))) ||
                                    (teacher.assignedClass && (t.includes(teacher.assignedClass.toLowerCase()) || teacher.assignedClass.toLowerCase().includes(t)))
                                  );
                                }) || schoolProgs[0] || programsList[0];

                              const teacherSpp = Number(matchedProgram?.sppAmount || minSpp);
                              const sppRatio = Math.max(Math.round((teacherSpp / Math.max(minSpp, 1)) * 100) / 100, 1.0);

                              // Count teacher attendance
                              const teacherAtts = teacherAttendanceList.filter(
                                (att) => att.teacherId === teacher.id && att.status === "hadir"
                              );
                              const hadirDays = teacherAtts.length || (tpRecord ? Math.round(Number(tpRecord.hoursTaught || 0) / 3) : 12);
                              const hoursTaught = tpRecord ? Number(tpRecord.hoursTaught) : hadirDays * 3;
                              const targetHours = tpRecord ? Number(tpRecord.targetHours) : 40;
                              const pct = Math.min(Math.round((hoursTaught / targetHours) * 100), 100);

                              // Monthly progressive result
                              const baseRate = 50000;
                              const monthlyResult = Math.round(hadirDays * baseRate * sppRatio);

                              return (
                                <div
                                  key={teacher.id}
                                  className="bg-slate-950/90 border border-slate-800/90 hover:border-emerald-500/40 p-4 rounded-2xl space-y-3 shadow-xl transition-all relative overflow-hidden group"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-500/30 shrink-0">
                                        👩‍🏫
                                      </div>
                                      <div>
                                        <h5 className="font-extrabold text-white text-xs leading-tight">{teacher.name}</h5>
                                        <p className="text-[10px] text-slate-400">📍 {plottedClass} • {matchedProgram?.title || "Program Belajar"}</p>
                                      </div>
                                    </div>
                                    <span className="text-[10px] font-mono font-black text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full shrink-0">
                                      {sppRatio.toFixed(2)}x Rasio SPP
                                    </span>
                                  </div>

                                  {/* SPP PROGRESS RATIO DETAILS */}
                                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80 space-y-1 text-[11px]">
                                    <div className="flex justify-between text-slate-300">
                                      <span>SPP Program Guru: <strong className="text-emerald-400 font-mono">Rp {teacherSpp.toLocaleString("id-ID")}</strong></span>
                                      <span className="text-slate-400 text-[10px]">Basis: Rp {minSpp.toLocaleString("id-ID")}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-300 border-t border-slate-800/80 pt-1 mt-1">
                                      <span>Presensi Hadir Bulan Ini:</span>
                                      <strong className="text-amber-300 font-mono">{hadirDays} Hari ({hoursTaught} Jam)</strong>
                                    </div>
                                  </div>

                                  {/* ESTIMATED MONTHLY PROGRESSIVE RESULT */}
                                  <div className="flex items-center justify-between bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/30 p-2.5 rounded-xl">
                                    <div className="text-[10px] text-emerald-200">
                                      <span className="block font-bold">Hasil Progresif Bulanan:</span>
                                      <span className="text-[9px] text-slate-400">({hadirDays} Hari × 50rb × {sppRatio.toFixed(2)}x)</span>
                                    </div>
                                    <span className="text-sm font-black font-mono text-emerald-400">
                                      Rp {monthlyResult.toLocaleString("id-ID")}
                                    </span>
                                  </div>

                                  <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] text-slate-400">
                                      <span>Target Mengajar ({pct}%)</span>
                                      <span>{hoursTaught} / {targetHours} Jam</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: `${pct}%` }} />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* RIGHT (5 COLS): VIDEO PLAYER DEMONSTRASI DASHBOARD */}
                <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-black border border-red-500/30">
                          ▶️
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-white">Video Demonstrasi System</h3>
                          <p className="text-[11px] text-slate-400">Profil & Panduan Fitur Portal Sekolah TK</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full">
                        Interactive Video
                      </span>
                    </div>

                    {/* HTML5 VIDEO PLAYER WITH CONTROLS & POSTER */}
                    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black aspect-video group shadow-xl">
                      <video
                        controls
                        poster="/images/yapchi_logo.png"
                        className="w-full h-full object-cover"
                      >
                        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                        Browser Anda tidak mendukung pemutar video HTML5.
                      </video>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
                      <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Panduan Lengkap Fitur Portal System</span>
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Tonton video demonstrasi di atas untuk mempelajari alur pendaftaran PPDB, kelola data murid, presensi QR code, dan pencatatan pembayaran SPP.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RECENT REGISTRATIONS TABLE CARD */}
              <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl w-full">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div>
                    <h3 className="font-extrabold text-lg text-white">
                      Pendaftaran PPDB Terbaru
                    </h3>
                    <p className="text-xs text-slate-400">5 pendaftar terakhir di {activeSchoolName}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("ppdb")}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Kelola Semua ({ppdbList.length})</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="p-4 rounded-l-xl">No. Pendaftaran</th>
                        <th className="p-4">Cabang Sekolah</th>
                        <th className="p-4">Nama Anak</th>
                        <th className="p-4">Program</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right rounded-r-xl">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {ppdbList.slice(0, 5).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-mono text-emerald-400 font-bold">
                            {item.registrationNo}
                          </td>
                          <td className="p-4 font-bold text-slate-300">
                            {item.school?.name || "Sadjati"}
                          </td>
                          <td className="p-4 font-bold text-white">{item.namaAnak}</td>
                          <td className="p-4">{item.program}</td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                item.status === "APPROVED"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : item.status === "REJECTED"
                                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                  : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedPpdb(item);
                                setActiveTab("ppdb");
                              }}
                              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: KELOLA MASTER KELAS & PLOTTING */}
          {activeTab === "classes" && (
            <div className="space-y-6 w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Master Kelas & Plotting Wali Kelas
                  </h2>
                  <p className="text-xs text-slate-400">
                    Kelola data master kelas per cabang sekolah dan atur penugasan Wali Kelas.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setEditingClassRoom({
                      schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
                      name: "",
                      gradeLevel: "TK A",
                      academicYear: "2026/2027",
                      capacity: 20,
                      homeroomTeacherId: "",
                      homeroomTeacherName: "",
                    })
                  }
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Master Kelas</span>
                </button>
              </div>

              {/* FORM TAMBAH / EDIT MASTER KELAS */}
              {editingClassRoom && (
                <form
                  onSubmit={handleSaveClassRoom}
                  className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl w-full"
                >
                  <h3 className="font-bold text-white text-base">
                    {editingClassRoom.id ? "Edit Master Kelas" : "Tambah Master Kelas Baru"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Pilih Cabang Sekolah
                      </label>
                      <SearchableSelect
                        options={schoolsList.map((s) => ({
                          value: s.id,
                          label: s.name,
                        }))}
                        value={editingClassRoom.schoolId || schoolsList[0]?.id || ""}
                        onChange={(val) => setEditingClassRoom({ ...editingClassRoom, schoolId: val })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Nama Kelas
                      </label>
                      <input
                        type="text"
                        required
                        value={editingClassRoom.name}
                        onChange={(e) => setEditingClassRoom({ ...editingClassRoom, name: e.target.value })}
                        placeholder="Contoh: Kelas TK A - Melati"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Kelompok / Kelas (TKA & TKB)
                      </label>
                      <SearchableSelect
                        options={[
                          { value: "TK A", label: "TKA (Tingkat TK A - Usia 4-5 Thn)" },
                          { value: "TK B", label: "TKB (Tingkat TK B - Usia 5-6 Thn)" },
                        ]}
                        value={editingClassRoom.gradeLevel || "TK A"}
                        onChange={(val) => setEditingClassRoom({ ...editingClassRoom, gradeLevel: val })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        TA (Tahun Ajaran)
                      </label>
                      <input
                        type="text"
                        required
                        value={editingClassRoom.academicYear || "2026/2027"}
                        onChange={(e) => setEditingClassRoom({ ...editingClassRoom, academicYear: e.target.value })}
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Kapasitas Siswa
                      </label>
                      <input
                        type="number"
                        required
                        value={editingClassRoom.capacity || 20}
                        onChange={(e) => setEditingClassRoom({ ...editingClassRoom, capacity: e.target.value })}
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Plotting Wali Kelas
                      </label>
                      <SearchableSelect
                        options={[
                          { value: "", label: "-- Belum Ditentukan --" },
                          ...teachersList.map((t) => ({
                            value: t.id,
                            label: t.name,
                            sublabel: t.role,
                          })),
                        ]}
                        value={editingClassRoom.homeroomTeacherId || ""}
                        onChange={(teacherId) => {
                          const t = teachersList.find((item) => item.id === teacherId);
                          setEditingClassRoom({
                            ...editingClassRoom,
                            homeroomTeacherId: teacherId,
                            homeroomTeacherName: t ? t.name : "",
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingClassRoom(null)}
                      className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      Simpan Master Kelas
                    </button>
                  </div>
                </form>
              )}

              {/* LIST OF MASTER CLASSES */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {classesList.map((cls) => {
                  const studentCount = studentsList.filter((s) => s.className?.toLowerCase() === cls.name?.toLowerCase()).length;
                  const capacity = Number(cls.capacity || 20);
                  const isFull = studentCount >= capacity;
                  return (
                    <div key={cls.id} className={`bg-slate-900/80 border hover:border-emerald-500/40 rounded-3xl p-6 space-y-4 shadow-xl transition-all ${isFull ? "border-red-500/40 bg-red-950/10" : "border-slate-800"}`}>
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                              {cls.gradeLevel}
                            </span>
                            {isFull ? (
                              <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-500/20 px-2.5 py-0.5 rounded-full border border-red-500/40 flex items-center gap-1">
                                🔴 KELAS PENUH
                              </span>
                            ) : (
                              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                                🟢 Tersedia
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-black text-white mt-1">{cls.name}</h3>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingClassRoom(cls)}
                            className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClassRoom(cls.id)}
                            className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-400 font-medium">Wali Kelas:</span>
                          <span className="font-bold text-emerald-300">{cls.homeroomTeacherName || "Belum di-plot"}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-400 font-medium">Jumlah Murid:</span>
                          <span className={`font-bold ${isFull ? "text-red-400 font-mono" : "text-white"}`}>
                            {studentCount} / {capacity} Siswa {isFull && "(Maksimal)"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-400 font-medium">Tahun Ajaran:</span>
                          <span className="font-bold text-slate-400">{cls.academicYear}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex justify-end">
                        <button
                          onClick={() => setSelectedDetailClass(cls)}
                          className="w-full py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <Users className="w-4 h-4 text-emerald-400" />
                          <span>Lihat Detail & Plotting Siswa</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* MODAL DETAIL PLOTTING KELAS */}
              {selectedDetailClass && (
                <div className="fixed inset-0 z-100 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl animate-fadeIn">
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          {selectedDetailClass.gradeLevel} • {selectedDetailClass.academicYear}
                        </span>
                        <h3 className="text-2xl font-black text-white mt-1">{selectedDetailClass.name}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Wali Kelas: <span className="font-bold text-emerald-300">{selectedDetailClass.homeroomTeacherName || "Belum ditentukan"}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedDetailClass(null)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                      >
                        Tutup
                      </button>
                    </div>

                    {/* Stats & Add Button */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <div>
                        <span className="text-xs text-slate-400">Total Siswa Terdaftar:</span>
                        <h4 className="text-xl font-extrabold text-white">
                          {studentsList.filter((s) => s.classId === selectedDetailClass.id || s.className?.toLowerCase() === selectedDetailClass.name?.toLowerCase()).length} / {selectedDetailClass.capacity} Siswa
                        </h4>
                      </div>
                      <button
                        onClick={() => setAddStudentToClassModal(true)}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Siswa ke Kelas Ini</span>
                      </button>
                    </div>

                    {/* Modal Inner: Add Student Picker */}
                    {addStudentToClassModal && (
                      <div className="bg-slate-950 border border-emerald-500/30 p-5 rounded-2xl space-y-4">
                        <h4 className="font-bold text-white text-sm">Pilih Siswa untuk Ditambahkan / Dipindahkan</h4>
                        <SearchableSelect
                          options={studentsList
                            .filter((s) => s.classId !== selectedDetailClass.id && s.className?.toLowerCase() !== selectedDetailClass.name?.toLowerCase())
                            .map((s) => ({
                              value: s.id,
                              label: `${s.name} (NISN: ${s.nisn})`,
                              sublabel: `Kelas Saat Ini: ${s.className || "Belum Berkelas"}`,
                            }))}
                          value={selectedStudentToAdd}
                          onChange={(val) => setSelectedStudentToAdd(val)}
                          placeholder="Cari nama atau NISN siswa..."
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setAddStudentToClassModal(false);
                              setSelectedStudentToAdd("");
                            }}
                            className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                          >
                            Batal
                          </button>
                          <button
                            onClick={async () => {
                              if (selectedStudentToAdd) {
                                await handlePlotStudent(selectedStudentToAdd, selectedDetailClass.id);
                                setAddStudentToClassModal(false);
                                setSelectedStudentToAdd("");
                              }
                            }}
                            disabled={!selectedStudentToAdd}
                            className="px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl disabled:opacity-50"
                          >
                            Plotkan ke Kelas Ini
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Student List in Class */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-white text-sm">Daftar Siswa dalam Kelas</h4>
                      {studentsList.filter((s) => s.classId === selectedDetailClass.id || s.className?.toLowerCase() === selectedDetailClass.name?.toLowerCase()).length === 0 ? (
                        <div className="text-center py-8 bg-slate-950/60 rounded-2xl border border-dashed border-slate-800">
                          <p className="text-xs text-slate-400">Belum ada siswa yang terdaftar di kelas ini.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {studentsList
                            .filter((s) => s.classId === selectedDetailClass.id || s.className?.toLowerCase() === selectedDetailClass.name?.toLowerCase())
                            .map((st) => (
                              <div key={st.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 flex flex-col justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center text-sm border border-emerald-500/30">
                                    {st.name?.substring(0, 2).toUpperCase()}
                                  </div>
                                  <div>
                                    <h5 className="font-bold text-white text-sm">{st.name}</h5>
                                    <p className="text-[11px] text-slate-400">NISN: {st.nisn} • Ortu: {st.parentName || "-"} ({st.parentPhone || "-"})</p>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                                  {/* Select target class to move */}
                                  <div className="w-48">
                                    <SearchableSelect
                                      options={[
                                        { value: "", label: "Pindah Kelas..." },
                                        ...classesList
                                          .filter((c) => c.id !== selectedDetailClass.id)
                                          .map((c) => ({ value: c.id, label: c.name })),
                                      ]}
                                      value=""
                                      onChange={(targetClsId) => {
                                        if (targetClsId) {
                                          handlePlotStudent(st.id, targetClsId);
                                        }
                                      }}
                                    />
                                  </div>

                                  <button
                                    onClick={() => handlePlotStudent(st.id, null, "REMOVE")}
                                    className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-all border border-red-500/20 shrink-0"
                                  >
                                    Keluarkan
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: KELOLA SEKOLAH */}
          {activeTab === "schools" && (
            <div className="space-y-8 w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Kelola Cabang Sekolah
                  </h2>
                  <p className="text-xs text-slate-400">
                    Tambah dan atur cabang sekolah di bawah naungan YAPCHI Foundation.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingSchool({
                      code: "",
                      name: "",
                      level: "TK",
                      address: "",
                      phone: "",
                      logoUrl: "/images/smart_kids_logo.png",
                    })
                  }
                  className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Cabang Sekolah</span>
                </button>
              </div>

              {/* EDIT / CREATE FORM CARD */}
              {editingSchool && (
                <form
                  onSubmit={handleSaveSchool}
                  className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl w-full"
                >
                  <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                    <Building className="w-5 h-5 text-emerald-400" />
                    {editingSchool.id ? "Edit Cabang Sekolah" : "Tambah Cabang Sekolah Baru"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Nama Sekolah
                      </label>
                      <input
                        type="text"
                        required
                        value={editingSchool.name}
                        onChange={(e) =>
                          setEditingSchool({ ...editingSchool, name: e.target.value })
                        }
                        placeholder="Smart Kids BCL"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Kode / Slug Unik
                      </label>
                      <input
                        type="text"
                        required
                        value={editingSchool.code}
                        onChange={(e) =>
                          setEditingSchool({ ...editingSchool, code: e.target.value })
                        }
                        placeholder="bcl"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-400 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Jenjang Sekolah
                      </label>
                      <input
                        type="text"
                        value={editingSchool.level}
                        onChange={(e) =>
                          setEditingSchool({ ...editingSchool, level: e.target.value })
                        }
                        placeholder="TK"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        No. Telepon / WA Cabang
                      </label>
                      <input
                        type="text"
                        required
                        value={editingSchool.phone}
                        onChange={(e) =>
                          setEditingSchool({ ...editingSchool, phone: e.target.value })
                        }
                        placeholder="0813 9876 5432"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Alamat Lengkap Cabang
                      </label>
                      <input
                        type="text"
                        required
                        value={editingSchool.address}
                        onChange={(e) =>
                          setEditingSchool({ ...editingSchool, address: e.target.value })
                        }
                        placeholder="Kawasan Jababeka Cikarang, Bekasi"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingSchool(null)}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {saving ? "Menyimpan..." : "Simpan Cabang Sekolah"}
                    </button>
                  </div>
                </form>
              )}

              {/* SCHOOLS CARDS FULL WIDTH GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {schoolsList.map((sch) => (
                  <div
                    key={sch.id}
                    className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 space-y-4 flex flex-col justify-between transition-all shadow-xl group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-2xl bg-slate-950 p-1 flex items-center justify-center border border-slate-800 shrink-0">
                          <Image
                            src={sch.logoUrl || "/images/smart_kids_logo.png"}
                            alt={sch.name}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-white group-hover:text-emerald-400 transition-colors">
                            {sch.name}
                          </h3>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            code: {sch.code}
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-950/80 p-3.5 rounded-2xl space-y-1.5 text-xs text-slate-300 border border-slate-800/80">
                        <p>📍 Alamat: {sch.address}</p>
                        <p>📞 Telepon: {sch.phone}</p>
                        <p>🏫 Jenjang: {sch.level}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => {
                          setSelectedSchoolId(sch.id);
                          setActiveTab("overview");
                        }}
                        className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>Kelola Cabang Ini</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingSchool(sch)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSchool(sch.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: USERS MANAGEMENT */}
          {activeTab === "users" && (
            <div className="space-y-8 w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <ShieldCheck className="w-7 h-7 text-purple-400" />
                    <span>Pengaturan User Admin</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Tambah, ubah, dan atur akun pengguna admin untuk Yayasan dan Cabang Sekolah.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingAdminUser({
                      name: "",
                      username: "",
                      password: "",
                      role: "SCHOOL_ADMIN",
                      schoolId: schoolsList[0]?.id || "",
                    })
                  }
                  className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah User Admin</span>
                </button>
              </div>

              {/* EDIT / CREATE ADMIN USER FORM CARD */}
              {editingAdminUser && (
                <form
                  onSubmit={handleSaveAdminUser}
                  className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl w-full animate-fadeIn"
                >
                  <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                    {editingAdminUser.id ? "Edit Akun User Admin" : "Tambah Akun User Admin Baru"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Nama Lengkap Admin
                      </label>
                      <input
                        type="text"
                        required
                        value={editingAdminUser.name}
                        onChange={(e) =>
                          setEditingAdminUser({ ...editingAdminUser, name: e.target.value })
                        }
                        placeholder="Contoh: Budi Santoso"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Username Login
                      </label>
                      <input
                        type="text"
                        required
                        value={editingAdminUser.username}
                        onChange={(e) =>
                          setEditingAdminUser({ ...editingAdminUser, username: e.target.value })
                        }
                        placeholder="admin_sadjati"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-purple-300 focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Password {editingAdminUser.id ? "(Kosongkan jika tidak diubah)" : ""}
                      </label>
                      <input
                        type="password"
                        required={!editingAdminUser.id}
                        value={editingAdminUser.password || ""}
                        onChange={(e) =>
                          setEditingAdminUser({ ...editingAdminUser, password: e.target.value })
                        }
                        placeholder="••••••••"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Role / Hak Akses
                      </label>
                      <SearchableSelect
                        options={[
                          { value: "SUPER_ADMIN", label: "👑 Super Admin (Akses Yayasan)" },
                          { value: "ADMIN_CABANG", label: "🏫 Admin Cabang (Khusus Sekolah)" },
                          { value: "GURU", label: "👩‍🏫 Guru (Wali Kelas / Pengajar)" },
                          { value: "ORANG_TUA", label: "👨‍👩‍👧 Orang Tua (Wali Murid)" },
                          { value: "BELUM_MASUK", label: "⏳ Belum Masuk (Akses Dibatasi)" },
                        ]}
                        value={editingAdminUser.role}
                        onChange={(val) => setEditingAdminUser({ ...editingAdminUser, role: val })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Cabang Sekolah (Khusus School Admin)
                      </label>
                      <SearchableSelect
                        disabled={editingAdminUser.role === "SUPER_ADMIN"}
                        options={[
                          { value: "ALL", label: "🏢 Semua Sekolah (Yayasan Level)" },
                          ...schoolsList.map((sch) => ({
                            value: sch.id,
                            label: `🏫 ${sch.name}`,
                          })),
                        ]}
                        value={editingAdminUser.role === "SUPER_ADMIN" ? "ALL" : editingAdminUser.schoolId || ""}
                        onChange={(val) => setEditingAdminUser({ ...editingAdminUser, schoolId: val })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingAdminUser(null)}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30"
                    >
                      {saving ? "Menyimpan..." : "Simpan User Admin"}
                    </button>
                  </div>
                </form>
              )}

              {/* ADMIN USERS TABLE FULL WIDTH */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl w-full">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold">
                      <tr>
                        <th className="p-4">Nama Lengkap</th>
                        <th className="p-4">Username</th>
                        <th className="p-4">Role Hak Akses</th>
                        <th className="p-4">Cabang Sekolah Assigned</th>
                        <th className="p-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {adminUsersList.map((userItem) => (
                        <tr key={userItem.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-black text-sm border border-purple-500/30">
                                {userItem.name?.charAt(0) || "A"}
                              </div>
                              <span className="font-extrabold text-white text-sm">{userItem.name}</span>
                            </div>
                          </td>
                          <td className="p-4 font-mono font-bold text-purple-300">
                            {userItem.username}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap ${
                                userItem.role === "SUPER_ADMIN" || userItem.role === "ADMIN_PUSAT"
                                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                  : userItem.role === "GURU"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : userItem.role === "ORTU" || userItem.role === "ORANG_TUA"
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              }`}
                            >
                              {userItem.role === "SUPER_ADMIN" || userItem.role === "ADMIN_PUSAT"
                                ? "👑 Super Admin"
                                : userItem.role === "GURU"
                                ? "👨‍🏫 Guru / Pengajar"
                                : userItem.role === "ORTU" || userItem.role === "ORANG_TUA"
                                ? "👨‍👩‍👧 Wali Murid"
                                : "🏫 Admin Cabang"}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-slate-300">
                            {userItem.role === "SUPER_ADMIN"
                              ? "🏢 Semua Sekolah (Yayasan Level)"
                              : userItem.school?.name || "Cabang Belum Diset"}
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => setEditingAdminUser(userItem)}
                                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAdminUser(userItem.id)}
                                disabled={admin?.id === userItem.id}
                                className="p-2 text-red-400 hover:bg-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition-colors"
                                title={admin?.id === userItem.id ? "Tidak dapat menghapus diri sendiri" : "Hapus User Admin"}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PPDB REGISTRATIONS */}
          {activeTab === "ppdb" && (
            <div className="space-y-6 w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Data Pendaftaran PPDB
                  </h2>
                  <p className="text-xs text-slate-400">
                    Kelola data pendaftaran murid baru. Konteks: <span className="font-bold text-emerald-400">{activeSchoolName}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2 min-w-30">
                    <span className="text-[11px] text-slate-400 font-bold hidden md:inline">Tampilkan:</span>
                    <SearchableSelect
                      options={[
                        { value: "5", label: "5 / hlm" },
                        { value: "10", label: "10 / hlm" },
                        { value: "25", label: "25 / hlm" },
                        { value: "50", label: "50 / hlm" },
                      ]}
                      value={String(ppdbItemsPerPage)}
                      onChange={(val) => {
                        setPpdbItemsPerPage(Number(val));
                        setPpdbPage(1);
                      }}
                    />
                  </div>

                  <div className="min-w-37.5">
                    <SearchableSelect
                      options={[
                        { value: "ALL", label: "Semua Status" },
                        { value: "PENDING", label: "PENDING" },
                        { value: "APPROVED", label: "APPROVED" },
                        { value: "REJECTED", label: "REJECTED" },
                      ]}
                      value={ppdbStatusFilter}
                      onChange={(val) => {
                        setPpdbStatusFilter(val);
                        setPpdbPage(1);
                      }}
                    />
                  </div>

                  <div className="relative flex-1 sm:w-72">
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari nama anak / no reg..."
                      value={ppdbSearch}
                      onChange={(e) => {
                        setPpdbSearch(e.target.value);
                        setPpdbPage(1);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 text-xs text-white rounded-2xl focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* TABLE CONTAINER FULL WIDTH */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl w-full">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold">
                      <tr>
                        <th className="p-4">No. Pendaftaran</th>
                        <th className="p-4">Cabang Sekolah</th>
                        <th className="p-4">Nama Anak</th>
                        <th className="p-4">Program</th>
                        <th className="p-4">Orang Tua / Wali</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {paginatedPpdb.length > 0 ? (
                        paginatedPpdb.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-4 font-mono font-bold text-emerald-400">
                              {item.registrationNo}
                            </td>
                            <td className="p-4 font-bold text-slate-300">
                              {item.school?.name || "Sadjati"}
                            </td>
                            <td className="p-4 font-bold text-white">{item.namaAnak}</td>
                            <td className="p-4">{item.program}</td>
                            <td className="p-4">{item.namaOrtu}</td>
                            <td className="p-4">
                              <span
                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                  item.status === "APPROVED"
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : item.status === "REJECTED"
                                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setSelectedPpdb(item)}
                                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Detail</span>
                                </button>
                                <button
                                  onClick={() => handleDeletePpdb(item.id)}
                                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400 italic">
                            Tidak ada data pendaftaran PPDB yang ditemukan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* PAGINATION CONTROLS FOOTER */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-950/90 border-t border-slate-800 text-xs">
                  <div className="text-slate-400">
                    Menampilkan <span className="font-bold text-white">{filteredPpdb.length > 0 ? (ppdbPage - 1) * ppdbItemsPerPage + 1 : 0}</span> -{" "}
                    <span className="font-bold text-white">{Math.min(ppdbPage * ppdbItemsPerPage, filteredPpdb.length)}</span> dari{" "}
                    <span className="font-bold text-emerald-400">{filteredPpdb.length}</span> pendaftar
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={ppdbPage === 1}
                      onClick={() => setPpdbPage((p) => Math.max(p - 1, 1))}
                      className="px-3.5 py-1.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all"
                    >
                      ← Sebelumnya
                    </button>
                    <span className="px-3 py-1.5 bg-slate-900 text-slate-300 rounded-xl font-mono text-[11px] border border-slate-800 font-semibold">
                      Halaman <strong className="text-emerald-400">{ppdbPage}</strong> dari <strong>{totalPpdbPages}</strong>
                    </span>
                    <button
                      disabled={ppdbPage >= totalPpdbPages}
                      onClick={() => setPpdbPage((p) => Math.min(p + 1, totalPpdbPages))}
                      className="px-3.5 py-1.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all"
                    >
                      Selanjutnya →
                    </button>
                  </div>
                </div>
              </div>

              {/* DETAIL MODAL */}
              {selectedPpdb && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-3xl p-6 sm:p-8 space-y-6 my-8 text-slate-200 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <h3 className="text-xl font-black text-white flex items-center gap-2">
                          Detail PPDB #{selectedPpdb.registrationNo}
                        </h3>
                        <p className="text-xs text-slate-400">
                          Cabang Sekolah: <span className="font-bold text-emerald-400">{selectedPpdb.school?.name}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedPpdb(null)}
                        className="text-slate-400 hover:text-white p-2 text-lg font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-950 p-4 rounded-2xl space-y-1.5 border border-slate-800">
                        <p className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider">Data Murid</p>
                        <p className="text-sm font-bold text-white">{selectedPpdb.namaAnak}</p>
                        <p>Jenis Kelamin: {selectedPpdb.jenisKelamin}</p>
                        <p>TTL: {selectedPpdb.tempatLahir}, {selectedPpdb.tanggalLahir}</p>
                        <p>Program: <span className="font-bold text-emerald-300">{selectedPpdb.program}</span></p>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-2xl space-y-1.5 border border-slate-800">
                        <p className="font-bold text-blue-400 uppercase text-[10px] tracking-wider">Data Orang Tua</p>
                        <p className="text-sm font-bold text-white">{selectedPpdb.namaOrtu}</p>
                        <p>WhatsApp: {selectedPpdb.noWhatsapp}</p>
                        <p>Email: {selectedPpdb.email}</p>
                      </div>
                    </div>

                    {/* Snapshot biaya dipertahankan agar perubahan master tidak mengubah histori PPDB. */}
                    <div className="bg-emerald-950/20 p-4 rounded-2xl border border-emerald-500/30 space-y-3 text-xs">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider">
                          Komponen Paket PPDB Terpilih
                        </p>
                        <span className="font-black text-emerald-300 text-sm">
                          Rp {Number(selectedPpdb.totalAmount || 0).toLocaleString("id-ID")}
                        </span>
                      </div>
                      {selectedPpdb.feeSelections?.length ? (
                        <div className="space-y-1.5">
                          {selectedPpdb.feeSelections.map((selection: any) => (
                            <div
                              key={selection.id}
                              className="flex items-center justify-between gap-3 border-b border-emerald-900/50 pb-1.5"
                            >
                              <span className="text-slate-300">{selection.componentName}</span>
                              <span className="font-bold text-white">
                                Rp {Number(selection.amount).toLocaleString("id-ID")}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-400">
                          Data lama: {selectedPpdb.selectedItems || "Rincian item belum tersimpan"}
                        </p>
                      )}
                    </div>

                    {/* Dokumen Terunggah */}
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
                      <p className="font-bold text-amber-400 uppercase text-[10px] tracking-wider">
                        Dokumen & Berkas Terunggah
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {selectedPpdb.docKkUrl ? (
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(selectedPpdb.docKkUrl, `Kartu Keluarga - ${selectedPpdb.namaAnak}`)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-emerald-400 font-bold flex items-center gap-1.5 transition-all text-[11px] text-left cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">Kartu Keluarga</span>
                          </button>
                        ) : (
                          <span className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 text-[11px]">
                            KK: Belum ada
                          </span>
                        )}

                        {selectedPpdb.docAktaUrl ? (
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(selectedPpdb.docAktaUrl, `Akta Kelahiran - ${selectedPpdb.namaAnak}`)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-emerald-400 font-bold flex items-center gap-1.5 transition-all text-[11px] text-left cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">Akta Kelahiran</span>
                          </button>
                        ) : (
                          <span className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 text-[11px]">
                            Akta: Belum ada
                          </span>
                        )}

                        {selectedPpdb.docFotoUrl ? (
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(selectedPpdb.docFotoUrl, `Foto Anak - ${selectedPpdb.namaAnak}`)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-emerald-400 font-bold flex items-center gap-1.5 transition-all text-[11px] text-left cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">Foto Anak</span>
                          </button>
                        ) : (
                          <span className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 text-[11px]">
                            Foto: Belum ada
                          </span>
                        )}

                        {selectedPpdb.docKtpUrl ? (
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(selectedPpdb.docKtpUrl, `KTP Ortu - ${selectedPpdb.namaOrtu}`)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-emerald-400 font-bold flex items-center gap-1.5 transition-all text-[11px] text-left cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">KTP Ortu</span>
                          </button>
                        ) : (
                          <span className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 text-[11px]">
                            KTP: Belum ada
                          </span>
                        )}

                        {selectedPpdb.buktiBayarUrl ? (
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(selectedPpdb.buktiBayarUrl, `Bukti Bayar - ${selectedPpdb.namaAnak}`)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-emerald-400 font-bold flex items-center gap-1.5 transition-all text-[11px] text-left cursor-pointer"
                          >
                            <CreditCard className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">Bukti Bayar</span>
                          </button>
                        ) : (
                          <span className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 text-[11px]">
                            Bukti Bayar: Belum ada
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                      <div className="text-xs">
                        <span>Status: </span>
                        <span className="font-bold text-white">{selectedPpdb.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdatePpdbStatus(selectedPpdb.id, "APPROVED")}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Setuju (APPROVE)</span>
                        </button>
                        <button
                          onClick={() => handleUpdatePpdbStatus(selectedPpdb.id, "REJECTED")}
                          className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-600/30"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Tolak (REJECT)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROGRAM */}
          {activeTab === "programs" && (
            <div className="space-y-6 w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Kelola Program Pembelajaran
                  </h2>
                  <p className="text-xs text-slate-400">
                    Tambah dan atur program kelas per cabang sekolah.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingProgram({
                      title: "",
                      ageRange: "",
                      iconUrl: "/images/program_playground.png",
                      features: JSON.stringify(["Materi 1", "Materi 2"]),
                      orderIndex: programsList.length + 1,
                      schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
                    })
                  }
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Program</span>
                </button>
              </div>

              {editingProgram && (
                <form
                  onSubmit={handleSaveProgram}
                  className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl w-full"
                >
                  <h3 className="font-bold text-white text-base">
                    {editingProgram.id ? "Edit Program" : "Tambah Program Baru"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Pilih Cabang Sekolah
                      </label>
                      <select
                        value={editingProgram.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id)}
                        onChange={(e) =>
                          setEditingProgram({ ...editingProgram, schoolId: e.target.value })
                        }
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      >
                        {schoolsList.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Nama Program
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProgram.title}
                        onChange={(e) =>
                          setEditingProgram({ ...editingProgram, title: e.target.value })
                        }
                        placeholder="Contoh: Playground"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Kategori Usia
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProgram.ageRange}
                        onChange={(e) =>
                          setEditingProgram({ ...editingProgram, ageRange: e.target.value })
                        }
                        placeholder="Contoh: Usia 3-4 Tahun"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Nominal SPP (Rp)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={editingProgram.sppAmount || 200000}
                        onChange={(e) =>
                          setEditingProgram({ ...editingProgram, sppAmount: Number(e.target.value) })
                        }
                        placeholder="Contoh: 250000"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-mono font-bold focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Upload Icon Program
                      </label>
                      <div className="flex items-center gap-2">
                        <label className="flex-1 px-3 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold flex items-center justify-between cursor-pointer transition-all">
                          <span className="truncate text-[11px]">
                            {editingProgram.iconUrl ? "🖼️ Ganti Icon" : "📁 Unggah File"}
                          </span>
                          <Upload className="w-4 h-4 text-emerald-400 shrink-0" />
                          <input
                            type="file"
                            accept={IMAGE_UPLOAD_ACCEPT}
                            onChange={handleUploadProgramIcon}
                            className="hidden"
                          />
                        </label>
                        {editingProgram.iconUrl && (
                          <div className="w-11 h-11 rounded-xl bg-slate-950 p-1 border border-emerald-500/40 relative overflow-hidden shrink-0">
                            <img
                              src={editingProgram.iconUrl}
                              alt="Icon"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingProgram(null)}
                      className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      Simpan Program
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
                {programsList.map((prog) => (
                  <div
                    key={prog.id}
                    className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 space-y-4 flex flex-col justify-between transition-all shadow-xl group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {prog.iconUrl ? (
                          <div className="w-10 h-10 rounded-2xl bg-slate-950 p-1.5 border border-slate-800 flex items-center justify-center shrink-0">
                            <img src={prog.iconUrl} alt={prog.title} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center border border-emerald-500/30 shrink-0">
                            🎨
                          </div>
                        )}
                        <div>
                          <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                            {prog.school?.name}
                          </span>
                          <h3 className="font-extrabold text-base text-white group-hover:text-emerald-400 transition-colors mt-0.5">{prog.title}</h3>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 pt-1">
                        <span className="inline-block text-xs font-semibold text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                          👶 Usia: {prog.ageRange}
                        </span>
                        <span className="inline-block text-xs font-extrabold text-emerald-300 font-mono bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800/80">
                          💳 SPP: Rp {Number(prog.sppAmount || 200000).toLocaleString("id-ID")}/Bulan
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => setEditingProgram(prog)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProgram(prog.id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: GURU & PENGAJAR */}
          {activeTab === "teachers" && (
            <div className="space-y-6 w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Kelola Guru & Tenaga Pendidik
                  </h2>
                  <p className="text-xs text-slate-400">
                    Tambah, perbarui profil, foto, serta informasi guru per cabang sekolah.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingTeacher({
                      name: "",
                      role: "",
                      photoUrl: "/images/teacher1.png",
                      education: "S1 Pendidikan PAUD",
                      bio: "",
                      orderIndex: teachersList.length + 1,
                      schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
                    })
                  }
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Guru</span>
                </button>
              </div>

              {editingTeacher && (
                <form
                  onSubmit={handleSaveTeacher}
                  className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl w-full"
                >
                  <h3 className="font-bold text-white text-base">
                    {editingTeacher.id ? "Edit Data Guru" : "Tambah Guru Baru"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Pilih Cabang Sekolah
                      </label>
                      <select
                        value={editingTeacher.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id)}
                        onChange={(e) =>
                          setEditingTeacher({ ...editingTeacher, schoolId: e.target.value })
                        }
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      >
                        {schoolsList.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Nama Lengkap & Gelar
                      </label>
                      <input
                        type="text"
                        required
                        value={editingTeacher.name}
                        onChange={(e) =>
                          setEditingTeacher({ ...editingTeacher, name: e.target.value })
                        }
                        placeholder="Bunda Siti Rahma, S.Pd."
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Jabatan / Peran
                      </label>
                      <input
                        type="text"
                        required
                        value={editingTeacher.role}
                        onChange={(e) =>
                          setEditingTeacher({ ...editingTeacher, role: e.target.value })
                        }
                        placeholder="Kepala Sekolah / Wali Kelas Kindergarten"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Email Guru
                      </label>
                      <input
                        type="email"
                        value={editingTeacher.email || ""}
                        onChange={(e) =>
                          setEditingTeacher({ ...editingTeacher, email: e.target.value })
                        }
                        placeholder="guru.ani@gmail.com"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        No. Telepon / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={editingTeacher.phone || ""}
                        onChange={(e) =>
                          setEditingTeacher({ ...editingTeacher, phone: e.target.value })
                        }
                        placeholder="08123456789"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Pendidikan Terakhir
                      </label>
                      <input
                        type="text"
                        value={editingTeacher.education || ""}
                        onChange={(e) =>
                          setEditingTeacher({ ...editingTeacher, education: e.target.value })
                        }
                        placeholder="S1 Pendidikan PAUD"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        URL Foto Profil Guru (atau upload)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editingTeacher.photoUrl || ""}
                          onChange={(e) =>
                            setEditingTeacher({ ...editingTeacher, photoUrl: e.target.value })
                          }
                          placeholder="/images/teacher1.png"
                          className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                        />
                        <label className="px-3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer shrink-0 border border-slate-700 flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept={IMAGE_UPLOAD_ACCEPT}
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  const url = await uploadFile(file, "profiles");
                                  setEditingTeacher({ ...editingTeacher, photoUrl: url });
                                  showMessage("Foto guru diunggah!", "success");
                                } catch (err: any) {
                                  showMessage(err.message, "error");
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Urutan Tampilan
                      </label>
                      <input
                        type="number"
                        value={editingTeacher.orderIndex || 0}
                        onChange={(e) =>
                          setEditingTeacher({ ...editingTeacher, orderIndex: e.target.value })
                        }
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Kutipan / Deskripsi Singkat
                    </label>
                    <textarea
                      rows={2}
                      value={editingTeacher.bio || ""}
                      onChange={(e) =>
                        setEditingTeacher({ ...editingTeacher, bio: e.target.value })
                      }
                      placeholder="Mendidik dengan penuh rasa kasih sayang..."
                      className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingTeacher(null)}
                      className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      Simpan Data Guru
                    </button>
                  </div>
                </form>
              )}

              {teachersList.length === 0 ? (
                <div className="text-center py-12 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
                  <p className="text-sm text-slate-400">Belum ada data guru untuk cabang sekolah ini.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                  {teachersList.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 space-y-4 flex flex-col justify-between transition-all shadow-xl group"
                    >
                      <div className="space-y-3 flex flex-col items-center text-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500/30 bg-slate-950 flex items-center justify-center">
                          {teacher.photoUrl ? (
                            <Image
                              src={teacher.photoUrl}
                              alt={teacher.name}
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          ) : (
                            <Users className="w-10 h-10 text-emerald-400" />
                          )}
                        </div>

                        <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          {teacher.school?.name}
                        </span>

                        <div>
                          <h3 className="font-extrabold text-base text-white group-hover:text-emerald-400 transition-colors">
                            {teacher.name}
                          </h3>
                          <p className="text-xs text-emerald-300 font-semibold mt-0.5">{teacher.role}</p>
                          {teacher.education && (
                            <p className="text-[11px] text-slate-400 mt-1">{teacher.education}</p>
                          )}
                          {(teacher.email || teacher.phone) && (
                            <div className="flex flex-col gap-0.5 mt-1.5 text-[10px] text-slate-300 font-mono bg-slate-950/60 px-2 py-1 rounded-lg border border-slate-800/80">
                              {teacher.email && <span>📧 {teacher.email}</span>}
                              {teacher.phone && <span>📞 {teacher.phone}</span>}
                            </div>
                          )}
                        </div>

                        {teacher.bio && (
                          <p className="text-xs text-slate-300 italic bg-slate-950/80 p-3 rounded-2xl border border-slate-800 w-full">
                            &quot;{teacher.bio}&quot;
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-800/80">
                        <button
                          onClick={() => handleShowTeacherCredentials(teacher.id)}
                          className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer mb-2"
                        >
                          <Key className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Akun Login & QR Presensi</span>
                        </button>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 text-[11px]">Urutan: #{teacher.orderIndex}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingTeacher(teacher)}
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl cursor-pointer"
                              title="Edit Data Guru"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTeacher(teacher.id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl cursor-pointer"
                              title="Hapus Guru"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: DATA SISWA */}
          {activeTab === "students" && (
            <div className="space-y-6 w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Kelola Data Siswa / Murid</h2>
                  <p className="text-xs text-slate-400">Daftar seluruh siswa terdaftar per cabang sekolah.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingStudent({
                      name: "",
                      nisn: `2122${Math.floor(1000 + Math.random() * 9000)}`,
                      className: "Kelas TK A",
                      gender: "L",
                      avatarUrl: "https://i.pravatar.cc/150",
                      birthPlaceDate: "Karawang, 01 Jan 2021",
                      parentName: "",
                      parentPhone: "",
                      address: "",
                      attendanceRate: 0.0,
                      averageGrade: 0.0,
                      schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
                    })
                  }
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Siswa</span>
                </button>
              </div>

              {editingStudent && (
                <form onSubmit={handleSaveStudent} className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl w-full">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-base">{editingStudent.id ? "Edit Data Siswa & Orang Tua" : "Tambah Siswa & Orang Tua Baru"}</h3>
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      ID: {editingStudent.id || "BARU"}
                    </span>
                  </div>

                  {/* SECTION 1: DATA SISWA */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase text-emerald-400 tracking-wider">👶 Informasi Murid / Siswa</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Nama Siswa</label>
                        <input type="text" required value={editingStudent.name || ""} onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" placeholder="Nama lengkap siswa" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">NISN / No Induk</label>
                        <input type="text" required value={editingStudent.nisn || ""} onChange={(e) => setEditingStudent({ ...editingStudent, nisn: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" placeholder="1001" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Master Kelas</label>
                        <SearchableSelect
                          options={classesList.map((c) => ({
                            value: c.id,
                            label: c.name,
                            sublabel: `Wali: ${c.homeroomTeacherName || "-"}`,
                          }))}
                          value={editingStudent.classId || classesList.find((c) => c.name === editingStudent.className)?.id || ""}
                          onChange={(selectedClassId) => {
                            const foundClass = classesList.find((c) => c.id === selectedClassId);
                            if (foundClass) {
                              setEditingStudent({
                                ...editingStudent,
                                classId: foundClass.id,
                                className: foundClass.name,
                              });
                            }
                          }}
                          placeholder="Pilih Master Kelas..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Jenis Kelamin</label>
                        <SearchableSelect
                          options={[
                            { value: "L", label: "Laki-laki (L)" },
                            { value: "P", label: "Perempuan (P)" },
                          ]}
                          value={editingStudent.gender || "L"}
                          onChange={(val) => setEditingStudent({ ...editingStudent, gender: val })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Tempat, Tanggal Lahir Siswa</label>
                        <input type="text" value={editingStudent.birthPlaceDate || ""} onChange={(e) => setEditingStudent({ ...editingStudent, birthPlaceDate: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" placeholder="Karawang, 15 Mei 2021" />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: DATA ORANG TUA / WALI */}
                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <h4 className="text-xs font-black uppercase text-purple-400 tracking-wider">👨‍👩‍👧 Data Orang Tua / Wali</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Nama Orang Tua / Wali</label>
                        <input type="text" value={editingStudent.parentName || ""} onChange={(e) => setEditingStudent({ ...editingStudent, parentName: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" placeholder="Bapak Budi Santoso" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">No. WhatsApp / HP Ortu</label>
                        <input type="text" value={editingStudent.parentPhone || ""} onChange={(e) => setEditingStudent({ ...editingStudent, parentPhone: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" placeholder="081234567890" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Email Orang Tua</label>
                        <input type="email" value={editingStudent.parentEmail || ""} onChange={(e) => setEditingStudent({ ...editingStudent, parentEmail: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" placeholder="ortu.budi@gmail.com" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Alamat Rumah Orang Tua / Wali</label>
                      <input type="text" value={editingStudent.address || ""} onChange={(e) => setEditingStudent({ ...editingStudent, address: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" placeholder="Sadjati, Karawang" />
                    </div>
                  </div>

                  {/* SECTION 3: INPUT NILAI HARIAN, SEMESTER, TRANSKRIP NILAI -> NILAI AKHIR */}
                  <div className="space-y-4 pt-3 border-t border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-amber-400" />
                          <span>Kalkulasi Nilai Akhir & Transkrip Akademik</span>
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Kalkulasi otomatis dari Persentase Kehadiran, Nilai Harian yang tersimpan, dan Nilai Semester.
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setDailyGradeModal({
                              isOpen: true,
                              studentId: editingStudent.id || "",
                              studentName: editingStudent.name || "Siswa",
                              subject: "Moral & Agama",
                              score: 85,
                              date: new Date().toISOString().split("T")[0],
                              notes: "",
                            })
                          }
                          className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Input Nilai Harian Siswa</span>
                        </button>
                        <span className="text-sm font-black text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 shadow-sm">
                          Nilai Akhir: {editingStudent.averageGrade ?? 88.5}
                        </span>
                      </div>
                    </div>

                    {/* METRIK RINCIAN KOMPONEN NILAI */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          📊 Kehadiran (%) <span className="text-emerald-400 font-mono">[{editingStudent.attendanceRate ?? 0}%]</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editingStudent.attendanceRate ?? 0.0}
                          onChange={(e) => setEditingStudent({ ...editingStudent, attendanceRate: Number(e.target.value) })}
                          className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          📝 Rata-Rata Nilai Harian <span className="text-amber-400 font-mono">[{editingStudent.dailyGrade ?? 85}]</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editingStudent.dailyGrade ?? 85}
                          onChange={(e) => setEditingStudent({ ...editingStudent, dailyGrade: Number(e.target.value) })}
                          className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          🎓 Nilai Semester / Ujian <span className="text-purple-400 font-mono">[{editingStudent.semesterGrade ?? 90}]</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editingStudent.semesterGrade ?? 90}
                          onChange={(e) => setEditingStudent({ ...editingStudent, semesterGrade: Number(e.target.value) })}
                          className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          ⚖️ Komposisi Bobot (%)
                        </label>
                        <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                          <span>20% Att</span> + <span>40% Har</span> + <span>40% Sem</span>
                        </div>
                      </div>
                    </div>

                    {/* RIWAYAT CATATAN NILAI HARIAN SISWA TERDAFTAR */}
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-300 pb-2 border-b border-slate-800">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-emerald-400" />
                          <span>Riwayat Catatan Nilai Harian Siswa</span>
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          Total {dailyGradesList.filter((g) => g.studentId === editingStudent.id).length} Inputan Harian
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-300">
                          <thead>
                            <tr className="text-slate-500 border-b border-slate-800/60 uppercase text-[10px] tracking-wider">
                              <th className="py-2.5">Tanggal</th>
                              <th className="py-2.5">Aspek Perkembangan</th>
                              <th className="py-2.5 text-center">Nilai Harian</th>
                              <th className="py-2.5">Catatan Evaluasi</th>
                              <th className="py-2.5 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/40 text-[11px]">
                            {dailyGradesList.filter((g) => g.studentId === editingStudent.id).length === 0 ? (
                              <tr>
                                <td colSpan={5} className="py-4 text-center text-slate-500 italic">
                                  Belum ada catatan nilai harian untuk siswa ini. Klik tombol &quot;+ Input Nilai Harian Siswa&quot; di atas.
                                </td>
                              </tr>
                            ) : (
                              dailyGradesList
                                .filter((g) => g.studentId === editingStudent.id)
                                .map((g) => (
                                  <tr key={g.id} className="hover:bg-slate-900/40 transition">
                                    <td className="py-2.5 font-mono text-slate-400">{g.date}</td>
                                    <td className="py-2.5 font-bold text-white">{g.subject}</td>
                                    <td className="py-2.5 text-center font-extrabold text-amber-400 text-xs">
                                      {g.score}
                                    </td>
                                    <td className="py-2.5 text-slate-300 italic max-w-xs truncate">{g.notes || "-"}</td>
                                    <td className="py-2.5 text-right">
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteDailyGrade(g.id)}
                                        className="p-1 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition"
                                        title="Hapus Nilai Harian Ini"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </td>
                                  </tr>
                                ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                    <button type="button" onClick={() => setEditingStudent(null)} className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700 cursor-pointer">Batal</button>
                    <button type="submit" disabled={saving} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 cursor-pointer">
                      {saving ? "Menyimpan..." : "Simpan Data Siswa & Transkrip"}
                    </button>
                  </div>
                </form>
              )}

              {/* MODAL INPUT NILAI HARIAN (POPUP) */}
              {dailyGradeModal.isOpen && (
                <form onSubmit={handleSaveDailyGrade} className="bg-slate-900/95 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl w-full">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
                        📝
                      </div>
                      <div>
                        <h3 className="font-extrabold text-white text-base">Input Nilai Harian Siswa</h3>
                        <p className="text-xs text-slate-400">Catat perkembangan harian siswa per tanggal & aspek belajar.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDailyGradeModal((prev) => ({ ...prev, isOpen: false }))}
                      className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Pilih Siswa / Murid</label>
                      <SearchableSelect
                        options={studentsList.map((s) => ({
                          value: s.id,
                          label: s.name,
                          sublabel: `NISN: ${s.nisn} • ${s.className}`,
                        }))}
                        value={dailyGradeModal.studentId}
                        onChange={(selectedId) => {
                          const found = studentsList.find((s) => s.id === selectedId);
                          if (found) {
                            setDailyGradeModal((prev) => ({
                              ...prev,
                              studentId: found.id,
                              studentName: found.name,
                            }));
                          }
                        }}
                        placeholder="Pilih nama siswa..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Tanggal Penilaian</label>
                      <input
                        type="date"
                        required
                        value={dailyGradeModal.date}
                        onChange={(e) => setDailyGradeModal((prev) => ({ ...prev, date: e.target.value }))}
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Aspek Perkembangan / Matpel</label>
                      <SearchableSelect
                        options={[
                          { value: "Moral & Agama", label: "🕋 Moral & Agama" },
                          { value: "Kognitif & Motorik", label: "🧩 Kognitif & Motorik" },
                          { value: "Seni & Bahasa", label: "🎨 Seni & Bahasa" },
                          { value: "Sosial Emosional", label: "🤝 Sosial Emosional" },
                        ]}
                        value={dailyGradeModal.subject}
                        onChange={(val) => setDailyGradeModal((prev) => ({ ...prev, subject: val }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Nilai Harian (0 - 100) <span className="text-amber-400 font-bold">→ Score: {dailyGradeModal.score}</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        required
                        value={dailyGradeModal.score}
                        onChange={(e) => setDailyGradeModal((prev) => ({ ...prev, score: Number(e.target.value) }))}
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Catatan Evaluasi Guru (Opsional)</label>
                      <input
                        type="text"
                        placeholder="Misal: Sangat antusias dalam mengikuti hafalan surat pendek."
                        value={dailyGradeModal.notes}
                        onChange={(e) => setDailyGradeModal((prev) => ({ ...prev, notes: e.target.value }))}
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setDailyGradeModal((prev) => ({ ...prev, isOpen: false }))}
                      className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-600/30 flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{saving ? "Menyimpan..." : "Simpan Nilai Harian & Kalkulasi"}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* FILTER & SEARCH BAR SISWA (NIM/NISN & WALI KELAS) */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-3xl border border-slate-800 shadow-lg w-full">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                    placeholder="🔍 Cari nama siswa, NIM / NISN, atau nama orang tua..."
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <select
                  value={selectedHomeroomFilter}
                  onChange={(e) => setSelectedHomeroomFilter(e.target.value)}
                  className="w-full sm:w-auto p-2.5 bg-slate-950 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500"
                >
                  <option value="ALL">👥 Semua Wali Kelas</option>
                  {Array.from(
                    new Set(
                      classesList
                        .map((c) => c.homeroomTeacherName)
                        .filter(Boolean)
                        .concat(teachersList.map((t) => t.name))
                    )
                  ).map((tName) => (
                    <option key={tName} value={tName}>
                      👤 Wali Kelas: {tName}
                    </option>
                  ))}
                </select>
              </div>

              {/* DAFTAR KARTU SISWA TERDAFTAR */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {studentsList
                  .filter((s) => {
                    const matchSearch =
                      !studentSearchQuery ||
                      s.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
                      (s.nisn && s.nisn.toLowerCase().includes(studentSearchQuery.toLowerCase())) ||
                      (s.parentName && s.parentName.toLowerCase().includes(studentSearchQuery.toLowerCase())) ||
                      (s.username && s.username.toLowerCase().includes(studentSearchQuery.toLowerCase()));

                    const teacherName = s.classRoom?.homeroomTeacherName || s.homeroomTeacherName || "";
                    const teacherId = s.classRoom?.homeroomTeacherId || s.homeroomTeacherId || "";
                    const matchHomeroom =
                      selectedHomeroomFilter === "ALL" ||
                      teacherId === selectedHomeroomFilter ||
                      teacherName === selectedHomeroomFilter;

                    return matchSearch && matchHomeroom;
                  })
                  .map((s) => (
                    <div key={s.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3.5 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
                            onClick={() => handleOpenPreview(s.avatarUrl || "https://i.pravatar.cc/150", `Avatar Siswa: ${s.name}`)}
                            title="Klik untuk melihat foto avatar"
                          >
                            {s.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm">{s.name}</h4>
                            <p className="text-xs text-slate-400">
                              NIM/NISN: <span className="font-mono text-emerald-300 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60">{s.nisn}</span> • <span className="text-emerald-400 font-semibold">{s.className}</span>
                            </p>
                            <p className="text-[11px] text-cyan-300 font-medium mt-0.5">
                              👤 Wali Kelas: <span className="font-bold text-white">{s.classRoom?.homeroomTeacherName || s.homeroomTeacherName || "Guru Wali"}</span>
                            </p>
                          <p className="text-[11px] text-slate-500">Ortu: {s.parentName} ({s.parentPhone})</p>
                          {s.username && (
                            <span className="inline-block text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 mt-1">
                              User: {s.username}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Presensi</span>
                        <span className="font-extrabold text-emerald-400">{s.attendanceRate ?? 0}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Rata Harian</span>
                        <span className="font-extrabold text-amber-400">{s.dailyGrade ?? 85}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Nilai Akhir</span>
                        <span className="font-extrabold text-purple-400">{s.averageGrade ?? 88.5}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-slate-800/80">
                      <button
                        onClick={() =>
                          setDailyGradeModal({
                            isOpen: true,
                            studentId: s.id,
                            studentName: s.name,
                            subject: "Moral & Agama",
                            score: 85,
                            date: new Date().toISOString().split("T")[0],
                            notes: "",
                          })
                        }
                        className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                        title="Input Nilai Harian Hari Ini"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Input Nilai</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleSendStudentCredentials(s.id)}
                          disabled={sendingAccount}
                          className="px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1 transition-all disabled:opacity-50 cursor-pointer"
                          title="Kirim Akun Login Ortu"
                        >
                          <Key className="w-3.5 h-3.5" />
                          <span>Akun</span>
                        </button>
                        <button onClick={() => setEditingStudent(s)} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl cursor-pointer" title="Edit Data & Transkrip Siswa"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteStudent(s.id)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl cursor-pointer" title="Hapus Siswa"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PRESENSI SISWA */}
          {activeTab === "attendance" && (
            <div className="space-y-6 w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Presensi Siswa Harian</h2>
                  <p className="text-xs text-slate-400">Catatan kehadiran murid (Hadir, Sakit, Izin, Alfa).</p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  {/* Scan QR Murid Button */}
                  <button
                    onClick={() => setQrModal({ isOpen: true, type: "STUDENT", inputCode: "", scanning: false, result: null, error: null })}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
                  >
                    <QrCode className="w-4 h-4 text-emerald-300" />
                    <span>Scan QR Murid</span>
                  </button>

                  {/* Absensi Kolektif Wali Kelas (Khusus Guru) */}
                  {admin?.role === "GURU" && admin?.assignedClass && (
                    <button
                      onClick={() => handleBatchAttendanceWaliKelas(admin.assignedClass)}
                      className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Absensi Kolektif {admin.assignedClass}</span>
                    </button>
                  )}

                  {admin?.role !== "ORTU" && (
                    <button
                      onClick={() =>
                        setEditingAttendance({
                          studentId: studentsList[0]?.id,
                          studentName: studentsList[0]?.name || "Siswa Smart Kids",
                          className: studentsList[0]?.className || "TK A",
                          date: new Date().toISOString().split("T")[0],
                          status: "hadir",
                          reason: "",
                          schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
                        })
                      }
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Input Manual</span>
                    </button>
                  )}
                </div>
              </div>

              {editingAttendance && (
                <form onSubmit={handleSaveAttendance} className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl w-full">
                  <h3 className="font-bold text-white text-base">Input Presensi Kehadiran Siswa</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Pilih Murid / Siswa</label>
                      <SearchableSelect
                        options={studentsList.map((s) => ({
                          value: s.id,
                          label: s.name,
                          sublabel: `NISN: ${s.nisn} • ${s.className}`,
                        }))}
                        value={
                          editingAttendance.studentId ||
                          studentsList.find((s) => s.name === editingAttendance.studentName)?.id ||
                          ""
                        }
                        onChange={(selectedId) => {
                          const found = studentsList.find((s) => s.id === selectedId);
                          if (found) {
                            setEditingAttendance({
                              ...editingAttendance,
                              studentId: found.id,
                              studentName: found.name,
                              className: found.className,
                            });
                          }
                        }}
                        placeholder="Pilih atau cari nama siswa..."
                        searchPlaceholder="Ketik nama siswa..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Tanggal Presensi</label>
                      <input type="date" required value={editingAttendance.date} onChange={(e) => setEditingAttendance({ ...editingAttendance, date: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Status Kehadiran</label>
                      <SearchableSelect
                        options={[
                          { value: "hadir", label: "Hadir (Masuk)" },
                          { value: "sakit", label: "Sakit" },
                          { value: "izin", label: "Izin" },
                          { value: "alfa", label: "Alfa (Tanpa Keterangan)" },
                        ]}
                        value={editingAttendance.status}
                        onChange={(val) => setEditingAttendance({ ...editingAttendance, status: val })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Catatan / Keterangan (Opsional)</label>
                    <input type="text" placeholder="Misal: Demam, Izin acara keluarga, dll" value={editingAttendance.reason || ""} onChange={(e) => setEditingAttendance({ ...editingAttendance, reason: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setEditingAttendance(null)} className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl">Batal</button>
                    <button type="submit" disabled={saving} className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30">Simpan Presensi</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {attendanceList
                  .filter((att) => {
                    const teacherName = att.student?.classRoom?.homeroomTeacherName || "";
                    const teacherId = att.student?.classRoom?.homeroomTeacherId || "";
                    const matchHomeroom =
                      selectedHomeroomFilter === "ALL" ||
                      teacherId === selectedHomeroomFilter ||
                      teacherName === selectedHomeroomFilter;

                    if (!matchHomeroom) return false;

                    if (admin?.role !== "ORTU") return true;
                    const u = (admin?.username || "").toLowerCase();
                    const n = (admin?.name || "").toLowerCase();
                    const sName = (att.studentName || "").toLowerCase();
                    const sUser = (att.student?.username || "").toLowerCase();

                    return (
                      (u && (sName.includes(u) || sUser.includes(u))) ||
                      (n && (n.includes(sName) || sName.includes(n.replace("wali", "").trim()))) ||
                      att.studentId === admin?.id
                    );
                  })
                  .map((att) => (
                    <div key={att.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">{att.studentName}</h4>
                        <p className="text-xs text-slate-400">{att.className} • Tanggal: {att.date}</p>
                        <p className="text-[11px] text-cyan-300 font-medium mt-0.5">👤 Wali Kelas: <span className="font-bold text-white">{att.student?.classRoom?.homeroomTeacherName || "Guru Wali"}</span></p>
                        {att.reason && <p className="text-[11px] text-amber-400 italic">Keterangan: {att.reason}</p>}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${att.status === "hadir" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : att.status === "sakit" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
                        {att.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB: PRESENSI GURU */}
          {activeTab === "teacher-attendance" && (
            <div className="space-y-6 w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Presensi Guru Harian</h2>
                  <p className="text-xs text-slate-400">Catatan kehadiran dan riwayat presensi guru & pengajar sekolah.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  {/* Scan QR Guru Button */}
                  {(admin?.role === "SUPER_ADMIN" || admin?.role === "ADMIN_PUSAT" || admin?.role === "ADMIN_SEKOLAH") && (
                    <button
                      onClick={() => setQrModal({ isOpen: true, type: "TEACHER", inputCode: "", scanning: false, result: null, error: null })}
                      className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
                    >
                      <QrCode className="w-4 h-4 text-purple-300" />
                      <span>Scan QR Guru</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {teacherAttendanceList
                  .filter((att) => {
                    if (admin?.role === "GURU") {
                      const u = (admin?.username || "").toLowerCase();
                      const n = (admin?.name || "").toLowerCase();
                      const tName = (att.teacherName || "").toLowerCase();
                      return (
                        (u && tName.includes(u)) ||
                        (n && (tName.includes(n) || n.includes(tName))) ||
                        att.teacherId === admin?.id
                      );
                    }
                    return true;
                  })
                  .map((att) => (
                    <div key={att.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">{att.teacherName}</h4>
                        <p className="text-xs text-slate-400">{att.className || "Guru"} • Tanggal: {att.date} • Jam: {att.time}</p>
                        {att.reason && <p className="text-[11px] text-amber-400 italic">Keterangan: {att.reason}</p>}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${att.status === "hadir" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : att.status === "sakit" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : att.status === "izin" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
                        {att.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB: SPP & KEUANGAN */}
          {activeTab === "spp" && (
            <div className="space-y-6 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-white tracking-tight">SPP & Catatan Keuangan</h2>
                    {sppList.filter((s) => s.status === "menunggu_konfirmasi").length > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30 animate-pulse">
                        {sppList.filter((s) => s.status === "menunggu_konfirmasi").length} Menunggu Konfirmasi
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    {admin?.role === "ORTU" || admin?.role === "ORANG_TUA"
                      ? "Status, riwayat pembayaran SPP ananda, serta fitur unggah bukti transfer."
                      : "Kelola status dan verifikasi bukti pembayaran SPP bulanan siswa."}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {(admin?.role === "ORTU" || admin?.role === "ORANG_TUA") && (
                    <button
                      onClick={() => {
                        const child = studentsList.find(
                          (s) =>
                            (s.parentPhone && admin?.phone && s.parentPhone === admin.phone) ||
                            (s.username && admin?.username && s.username === admin.username) ||
                            (s.parentName && admin?.name && s.parentName.toLowerCase().includes(admin.name.toLowerCase()))
                        ) || studentsList[0];
                        setSppPaymentModal({
                          isOpen: true,
                          studentId: child?.id || "",
                          studentName: child?.name || admin?.name || "Siswa Smart Kids",
                          nisn: child?.nisn || "123456789",
                          className: child?.className || "S3",
                          month: "Juli 2026",
                          amount: 200000,
                          paymentMethod: "TRANSFER_BCA",
                          proofUrl: "",
                          note: "",
                          uploading: false,
                        });
                      }}
                      className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4 text-emerald-200" />
                      <Upload className="w-4 h-4 text-emerald-200" />
                      <span>Bayar SPP & Upload Bukti</span>
                    </button>
                  )}

                  {admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA" && (
                    <button
                      onClick={() =>
                        setEditingSpp({
                          studentName: studentsList[0]?.name || "Siswa Smart Kids",
                          nisn: studentsList[0]?.nisn || "123456789",
                          className: studentsList[0]?.className || "S3",
                          month: "Juli 2026",
                          amount: 200000,
                          status: "lunas",
                          paymentDate: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
                        })
                      }
                      className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Catatan SPP</span>
                    </button>
                  )}
                </div>
              </div>

              {/* MODAL / FORM PEMBAYARAN & UPLOAD BUKTI UNTUK ORANG TUA */}
              {sppPaymentModal.isOpen && (
                <div className="bg-slate-900/95 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl w-full">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
                        💳
                      </div>
                      <div>
                        <h3 className="font-extrabold text-white text-base">Pembayaran SPP & Unggah Bukti Transfer</h3>
                        <p className="text-xs text-slate-400">Silakan lakukan pembayaran lalu unggah foto bukti transfer di bawah ini.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSppPaymentModal((prev) => ({ ...prev, isOpen: false }))}
                      className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmitSppPayment} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Nama Siswa / Ananda</label>
                        <SearchableSelect
                          options={studentsList.map((s) => ({
                            value: s.id,
                            label: s.name,
                            sublabel: `NISN: ${s.nisn} • ${s.className}`,
                          }))}
                          value={sppPaymentModal.studentId}
                          onChange={(selectedId) => {
                            const found = studentsList.find((s) => s.id === selectedId);
                            if (found) {
                              setSppPaymentModal((prev) => ({
                                ...prev,
                                studentId: found.id,
                                studentName: found.name,
                                nisn: found.nisn,
                                className: found.className,
                              }));
                            }
                          }}
                          placeholder="Pilih nama anak..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Bulan Pembayaran SPP</label>
                        <SearchableSelect
                          options={[
                            { value: "Juli 2026", label: "Juli 2026" },
                            { value: "Agustus 2026", label: "Agustus 2026" },
                            { value: "September 2026", label: "September 2026" },
                            { value: "Oktober 2026", label: "Oktober 2026" },
                            { value: "November 2026", label: "November 2026" },
                            { value: "Desember 2026", label: "Desember 2026" },
                            { value: "Januari 2027", label: "Januari 2027" },
                            { value: "Februari 2027", label: "Februari 2027" },
                            { value: "Maret 2027", label: "Maret 2027" },
                          ]}
                          value={sppPaymentModal.month}
                          onChange={(val) => setSppPaymentModal((prev) => ({ ...prev, month: val }))}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">
                          Nominal SPP (Rp)
                        </label>
                        <input
                          type="number"
                          required
                          value={sppPaymentModal.amount}
                          onChange={(e) => setSppPaymentModal((prev) => ({ ...prev, amount: Number(e.target.value) }))}
                          className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* METODE PEMBAYARAN & INSTRUKSI METODE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Metode Pembayaran</label>
                        <SearchableSelect
                          options={[
                            { value: "TRANSFER_BCA", label: "🏦 Transfer Bank BCA" },
                            { value: "TRANSFER_MANDIRI", label: "🏦 Transfer Bank Mandiri" },
                            { value: "QRIS", label: "📱 QRIS (Scan QR Code)" },
                            { value: "TUNAI", label: "💵 Tunai di Kasir Sekolah" },
                          ]}
                          value={sppPaymentModal.paymentMethod}
                          onChange={(val) => setSppPaymentModal((prev) => ({ ...prev, paymentMethod: val }))}
                        />
                      </div>

                      {/* INFORMASI REKENING TUJUAN */}
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                        <span className="font-bold uppercase text-emerald-400 text-[11px] tracking-wider block">
                          📌 Instruksi Pembayaran Tujuan:
                        </span>
                        {sppPaymentModal.paymentMethod === "TRANSFER_BCA" && (
                          <div className="space-y-1 text-slate-300">
                            <p>Bank: <strong className="text-white">Bank BCA</strong></p>
                            <p>No. Rekening: <strong className="font-mono text-emerald-300 text-sm">8830-123-456</strong></p>
                            <p>Atas Nama: <strong className="text-white">Yayasan Pendidikan YAPCHI</strong></p>
                          </div>
                        )}
                        {sppPaymentModal.paymentMethod === "TRANSFER_MANDIRI" && (
                          <div className="space-y-1 text-slate-300">
                            <p>Bank: <strong className="text-white">Bank Mandiri</strong></p>
                            <p>No. Rekening: <strong className="font-mono text-emerald-300 text-sm">137-00-98765-43</strong></p>
                            <p>Atas Nama: <strong className="text-white">Yayasan Pendidikan YAPCHI</strong></p>
                          </div>
                        )}
                        {sppPaymentModal.paymentMethod === "QRIS" && (
                          <div className="space-y-1 text-slate-300">
                            <p>QRIS Name: <strong className="text-white">YAPCHI Smart Kids School</strong></p>
                            <p className="text-[11px] text-amber-300">Scan melalui BCA Mobile, GoPay, OVO, ShopeePay, DANA, dll.</p>
                          </div>
                        )}
                        {sppPaymentModal.paymentMethod === "TUNAI" && (
                          <div className="space-y-1 text-slate-300">
                            <p>Lokasi: <strong className="text-white">Kasir Keuangan Sekolah</strong></p>
                            <p className="text-[11px] text-slate-400">Pembayaran langsung saat jam kerja sekolah (07.30 - 14.00 WIB).</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* FIELD UPLOAD BUKTI BAYAR */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-400">
                        Bukti Transfer / Pembayaran <span className="text-amber-400 font-normal">(Foto / Screenshot / Struk PDF)</span>
                      </label>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <label className="flex-1 w-full flex items-center justify-center gap-2 p-4 bg-slate-950 hover:bg-slate-800 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl cursor-pointer transition">
                          <Upload className="w-5 h-5 text-emerald-400" />
                          <span className="text-xs text-slate-300 font-medium">
                            {sppPaymentModal.uploading
                              ? "Mengunggah foto..."
                              : sppPaymentModal.proofUrl
                              ? "Ganti File Bukti Transfer"
                              : "Pilih / Ambil Foto Bukti Transfer"}
                          </span>
                          <input
                            type="file"
                            accept={DOCUMENT_UPLOAD_ACCEPT}
                            onChange={handleUploadSppProof}
                            className="hidden"
                          />
                        </label>

                        {sppPaymentModal.proofUrl && (
                          <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-2xl border border-emerald-500/30 shrink-0">
                            <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                              <img
                                src={sppPaymentModal.proofUrl}
                                alt="Bukti Transfer"
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() => handleOpenPreview(sppPaymentModal.proofUrl, "Pratinjau Bukti Transfer")}
                              />
                            </div>
                            <div className="text-xs">
                              <span className="text-emerald-400 font-bold block">✓ File Berhasil Diunggah</span>
                              <button
                                type="button"
                                onClick={() => handleOpenPreview(sppPaymentModal.proofUrl, "Pratinjau Bukti Transfer")}
                                className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
                              >
                                Lihat Gambar Full
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Catatan Tambahan (Opsional)</label>
                      <input
                        type="text"
                        placeholder="Misal: Transfer dari BCA a.n Budi Santoso"
                        value={sppPaymentModal.note}
                        onChange={(e) => setSppPaymentModal((prev) => ({ ...prev, note: e.target.value }))}
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSppPaymentModal((prev) => ({ ...prev, isOpen: false }))}
                        className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700 cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={saving || sppPaymentModal.uploading}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{saving ? "Mengirim..." : "Kirim Konfirmasi Pembayaran"}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ADMIN FORM EDIT SPP */}
              {editingSpp && (
                <form onSubmit={handleSaveSpp} className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl w-full">
                  <h3 className="font-bold text-white text-base">{editingSpp.id ? "Edit Detail Pembayaran SPP" : "Tambah Record SPP Siswa"}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Pilih Murid / Siswa</label>
                      <SearchableSelect
                        options={studentsList.map((s) => ({
                          value: s.id,
                          label: s.name,
                          sublabel: `NISN: ${s.nisn} • ${s.className}`,
                        }))}
                        value={
                          editingSpp.studentId ||
                          studentsList.find((s) => s.name === editingSpp.studentName)?.id ||
                          ""
                        }
                        onChange={(selectedId) => {
                          const selectedStudent = studentsList.find((s) => s.id === selectedId);
                          if (selectedStudent) {
                            setEditingSpp({
                              ...editingSpp,
                              studentId: selectedStudent.id,
                              studentName: selectedStudent.name,
                              nisn: selectedStudent.nisn,
                              className: selectedStudent.className,
                            });
                          }
                        }}
                        placeholder="Pilih atau cari nama siswa..."
                        searchPlaceholder="Ketik nama siswa, NISN, atau kelas..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Bulan SPP</label>
                      <input type="text" required value={editingSpp.month} onChange={(e) => setEditingSpp({ ...editingSpp, month: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Nominal (Rp) <span className="text-amber-400 font-normal">→ Rp {Number(editingSpp.amount || 0).toLocaleString("id-ID")}</span>
                      </label>
                      <input type="number" required value={editingSpp.amount} onChange={(e) => setEditingSpp({ ...editingSpp, amount: Number(e.target.value) })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Status Pembayaran</label>
                      <SearchableSelect
                        options={[
                          { value: "lunas", label: "Lunas (Sudah Bayar)" },
                          { value: "menunggu_konfirmasi", label: "Menunggu Konfirmasi Admin" },
                          { value: "belum_bayar", label: "Belum Bayar" },
                          { value: "ditolak", label: "Ditolak / Bukti Tidak Valid" },
                        ]}
                        value={editingSpp.status}
                        onChange={(val) => setEditingSpp({ ...editingSpp, status: val })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Tanggal Pembayaran</label>
                      <input type="text" value={editingSpp.paymentDate || ""} onChange={(e) => setEditingSpp({ ...editingSpp, paymentDate: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" placeholder="26 Juli 2026" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setEditingSpp(null)} className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl cursor-pointer">Batal</button>
                    <button type="submit" disabled={saving} className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-600/30 cursor-pointer">
                      {editingSpp.id ? "Update Detail Pembayaran" : "Simpan Record SPP"}
                    </button>
                  </div>
                </form>
              )}

              {/* SEARCH & WALI KELAS FILTER BAR UNTUK SPP */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-3xl border border-slate-800 shadow-lg w-full">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={sppSearchQuery}
                    onChange={(e) => setSppSearchQuery(e.target.value)}
                    placeholder="🔍 Cari nama siswa, NIM / NISN, atau kelas SPP..."
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <select
                  value={selectedHomeroomFilter}
                  onChange={(e) => setSelectedHomeroomFilter(e.target.value)}
                  className="w-full sm:w-auto p-2.5 bg-slate-950 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-500"
                >
                  <option value="ALL">👥 Semua Wali Kelas</option>
                  {Array.from(
                    new Set(
                      classesList
                        .map((c) => c.homeroomTeacherName)
                        .filter(Boolean)
                        .concat(teachersList.map((t) => t.name))
                    )
                  ).map((tName) => (
                    <option key={tName} value={tName}>
                      👤 Wali Kelas: {tName}
                    </option>
                  ))}
                </select>
              </div>

              {/* FILTER STATUS TABS FOR ADMIN & ORTU */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSppStatusFilter("ALL")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    sppStatusFilter === "ALL"
                      ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  Semua Record ({sppList.length})
                </button>
                <button
                  onClick={() => setSppStatusFilter("menunggu_konfirmasi")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                    sppStatusFilter === "menunggu_konfirmasi"
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30"
                      : "bg-slate-900 text-amber-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  <span>⏳ Menunggu Konfirmasi</span>
                  {sppList.filter((s) => s.status === "menunggu_konfirmasi").length > 0 && (
                    <span className="bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                      {sppList.filter((s) => s.status === "menunggu_konfirmasi").length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setSppStatusFilter("lunas")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    sppStatusFilter === "lunas"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-slate-900 text-emerald-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  ✓ Lunas ({sppList.filter((s) => s.status === "lunas").length})
                </button>
                <button
                  onClick={() => setSppStatusFilter("belum_bayar")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    sppStatusFilter === "belum_bayar"
                      ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                      : "bg-slate-900 text-red-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  ✕ Belum Bayar ({sppList.filter((s) => s.status === "belum_bayar").length})
                </button>
              </div>

              {/* SPP RECORDS CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {sppList
                  .filter((spp) => {
                    if (sppStatusFilter !== "ALL" && spp.status !== sppStatusFilter) return false;

                    const matchSearch =
                      !sppSearchQuery ||
                      (spp.studentName && spp.studentName.toLowerCase().includes(sppSearchQuery.toLowerCase())) ||
                      (spp.nisn && spp.nisn.toLowerCase().includes(sppSearchQuery.toLowerCase())) ||
                      (spp.className && spp.className.toLowerCase().includes(sppSearchQuery.toLowerCase()));

                    const teacherName =
                      spp.homeroomTeacherName ||
                      studentsList.find((st) => st.id === spp.studentId || st.nisn === spp.nisn)?.classRoom?.homeroomTeacherName ||
                      "";
                    const teacherId =
                      spp.homeroomTeacherId ||
                      studentsList.find((st) => st.id === spp.studentId || st.nisn === spp.nisn)?.classRoom?.homeroomTeacherId ||
                      "";

                    const matchHomeroom =
                      selectedHomeroomFilter === "ALL" ||
                      teacherId === selectedHomeroomFilter ||
                      teacherName === selectedHomeroomFilter;

                    if (!matchSearch || !matchHomeroom) return false;

                    if (admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA") return true;
                    const u = (admin?.username || "").toLowerCase();
                    const n = (admin?.name || "").toLowerCase();
                    const sName = (spp.studentName || "").toLowerCase();

                    return (
                      (u && sName.includes(u)) ||
                      (n && (n.includes(sName) || sName.includes(n.replace("wali", "").trim()))) ||
                      spp.studentId === admin?.id
                    );
                  })
                  .map((spp) => {
                    const hTeacherName =
                      spp.homeroomTeacherName ||
                      studentsList.find((st) => st.id === spp.studentId || st.nisn === spp.nisn)?.classRoom?.homeroomTeacherName ||
                      "Guru Wali";
                    return (
                      <div
                        key={spp.id}
                        className={`bg-slate-900/90 border rounded-3xl p-5 space-y-3.5 transition-all shadow-xl ${
                          spp.status === "menunggu_konfirmasi"
                            ? "border-amber-500/50 bg-amber-950/20"
                            : spp.status === "lunas"
                            ? "border-slate-800 hover:border-emerald-500/40"
                            : "border-red-500/30"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                              {spp.month}
                            </span>
                            <h4 className="font-extrabold text-white text-base mt-1.5">{spp.studentName}</h4>
                            <p className="text-xs text-slate-400">
                              NIM/NISN: <span className="font-mono text-emerald-300 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60">{spp.nisn}</span> • {spp.className}
                            </p>
                            <p className="text-[11px] text-cyan-300 font-medium mt-1">
                              👤 Wali Kelas: <span className="font-bold text-white">{hTeacherName}</span>
                            </p>
                          </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-center shrink-0 ${
                            spp.status === "lunas"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : spp.status === "menunggu_konfirmasi"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
                              : spp.status === "ditolak"
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : "bg-red-500/20 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {spp.status === "menunggu_konfirmasi"
                            ? "Menunggu Konfirmasi"
                            : spp.status}
                        </span>
                      </div>

                      <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 space-y-1.5 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Nominal SPP:</span>
                          <span className="font-extrabold text-amber-400">
                            Rp {Number(spp.amount).toLocaleString("id-ID")}
                          </span>
                        </div>
                        {spp.paymentMethod && (
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-400">Metode:</span>
                            <span className="font-bold text-slate-200 uppercase bg-slate-800 px-2 py-0.5 rounded-md">
                              {spp.paymentMethod.replace("_", " ")}
                            </span>
                          </div>
                        )}
                        {spp.paymentDate && (
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-400">Tgl Bayar:</span>
                            <span className="font-bold text-emerald-400">{spp.paymentDate}</span>
                          </div>
                        )}
                        {spp.note && (
                          <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                            <span className="text-slate-400 italic">Catatan: </span>
                            <span>{spp.note}</span>
                          </div>
                        )}
                      </div>

                      {/* BUKTI TRANSFER & VERIFIKASI ADMIN */}
                      <div className="flex items-center justify-between pt-1">
                        {spp.proofUrl ? (
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(spp.proofUrl, `Bukti Transfer SPP: ${spp.studentName} (${spp.month})`)}
                            className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Lihat Bukti Transfer</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-500 italic">Belum ada foto bukti</span>
                        )}

                        {admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA" && (
                          <div className="flex items-center gap-1.5">
                            {spp.status === "menunggu_konfirmasi" && (
                              <>
                                <button
                                  onClick={() => handleUpdateSppStatus(spp.id, "lunas")}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                                  title="Setujui Pembayaran SPP (Lunas)"
                                >
                                  Setujui
                                </button>
                                <button
                                  onClick={() => handleUpdateSppStatus(spp.id, "ditolak")}
                                  className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                                  title="Tolak Bukti Pembayaran"
                                >
                                  Tolak
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => setEditingSpp(spp)}
                              className="p-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl cursor-pointer"
                              title="Edit Detail Pembayaran"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteSpp(spp.id)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl cursor-pointer"
                              title="Hapus Data SPP"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: BIAYA TAMBAHAN (TERPISAH DARI SPP) */}
          {activeTab === "additional-fees" && (
            <div className="space-y-6 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-white tracking-tight">Biaya Tambahan (Terpisah dari SPP)</h2>
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-500/30">
                      Kelompok Biaya Khusus
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Kelola tagihan biaya kegiatan, edukasi, wisuda, dan tes tahap siswa yang terpisah dari tagihan bulanan SPP.
                  </p>
                </div>

                {admin?.role !== "ORTU" && admin?.role !== "ORANG_TUA" && (
                  <button
                    onClick={() =>
                      setEditingAdditionalFee({
                        studentId: studentsList[0]?.id || "",
                        studentName: studentsList[0]?.name || "",
                        nisn: studentsList[0]?.nisn || "",
                        className: studentsList[0]?.className || "TK A",
                        feeComponentId: defaultAdditionalFeeComponent?.id || "",
                        feeName: defaultAdditionalFeeComponent?.name || "",
                        amount: defaultAdditionalFeeComponent?.amount || 0,
                        status: "belum_lunas",
                        dueDate: "30 Agustus 2026",
                        isBatchForClass: false,
                      })
                    }
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Buat Tagihan Biaya Tambahan</span>
                  </button>
                )}
              </div>

              {/* MASTER KOMPONEN BIAYA: tersimpan per sekolah dan dapat diubah tanpa migrasi baru. */}
              <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-5 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-black text-white text-sm">Master Komponen Biaya</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Harga PPDB dan biaya tambahan dibaca langsung dari database. Menonaktifkan item tidak mengubah histori tagihan.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingFeeComponent({
                        name: "",
                        code: "",
                        category: "ADDITIONAL",
                        description: "",
                        amount: 0,
                        isRequired: false,
                        isActive: true,
                        orderIndex: feeComponentsList.length * 10 + 10,
                      })
                    }
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Komponen
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {["PPDB", "ADDITIONAL"].map((category) => (
                    <div key={category} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                      <p className="text-[10px] font-black tracking-wider text-emerald-400 uppercase">
                        {category === "PPDB" ? "Paket PPDB" : "Biaya Tambahan"}
                      </p>
                      {feeComponentsList
                        .filter((component) => component.category === category)
                        .map((component) => (
                          <button
                            type="button"
                            key={component.id}
                            onClick={() => setEditingFeeComponent({ ...component })}
                            className="w-full flex items-center justify-between gap-3 p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-left"
                          >
                            <div className="min-w-0">
                              <p className={`text-xs font-bold truncate ${component.isActive ? "text-white" : "text-slate-500 line-through"}`}>
                                {component.name}
                              </p>
                              <p className="text-[10px] text-slate-500 truncate">
                                {component.school?.name || "Sekolah"} • {component.code}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[11px] font-black text-emerald-400">
                                Rp {Number(component.amount).toLocaleString("id-ID")}
                              </span>
                              <Edit className="w-3.5 h-3.5 text-slate-500" />
                            </div>
                          </button>
                        ))}
                    </div>
                  ))}
                </div>

                {editingFeeComponent && (
                  <form
                    onSubmit={handleSaveFeeComponent}
                    className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-white">
                        {editingFeeComponent.id ? "Edit Komponen Biaya" : "Komponen Biaya Baru"}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingFeeComponent(null)}
                        className="p-1.5 bg-slate-800 text-slate-400 rounded-lg"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <input
                        required
                        value={editingFeeComponent.name || ""}
                        onChange={(e) => setEditingFeeComponent({ ...editingFeeComponent, name: e.target.value })}
                        placeholder="Nama komponen"
                        className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                      />
                      <input
                        required
                        value={editingFeeComponent.code || ""}
                        onChange={(e) => setEditingFeeComponent({ ...editingFeeComponent, code: e.target.value })}
                        placeholder="Kode unik"
                        className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                      />
                      <select
                        value={editingFeeComponent.category || "ADDITIONAL"}
                        onChange={(e) => setEditingFeeComponent({ ...editingFeeComponent, category: e.target.value })}
                        className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                      >
                        <option value="PPDB">Paket PPDB</option>
                        <option value="ADDITIONAL">Biaya Tambahan</option>
                      </select>
                      <input
                        type="number"
                        min="0"
                        required
                        value={editingFeeComponent.amount ?? 0}
                        onChange={(e) => setEditingFeeComponent({ ...editingFeeComponent, amount: Number(e.target.value) })}
                        placeholder="Nominal"
                        className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3 items-center">
                      <input
                        value={editingFeeComponent.description || ""}
                        onChange={(e) => setEditingFeeComponent({ ...editingFeeComponent, description: e.target.value })}
                        placeholder="Deskripsi komponen"
                        className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                      />
                      <label className="flex items-center gap-2 text-xs text-slate-300">
                        <input
                          type="checkbox"
                          checked={editingFeeComponent.isRequired === true}
                          onChange={(e) => setEditingFeeComponent({ ...editingFeeComponent, isRequired: e.target.checked })}
                        />
                        Wajib
                      </label>
                      <label className="flex items-center gap-2 text-xs text-slate-300">
                        <input
                          type="checkbox"
                          checked={editingFeeComponent.isActive !== false}
                          onChange={(e) => setEditingFeeComponent({ ...editingFeeComponent, isActive: e.target.checked })}
                        />
                        Aktif
                      </label>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold"
                      >
                        {saving ? "Menyimpan..." : "Simpan Master Komponen"}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* QUICK SHORTCUT CARDS UNTUK 5 PAKET BIAYA TAMBAHAN */}
              <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-5 space-y-3 shadow-xl">
                <span className="text-[11px] font-black uppercase text-emerald-400 tracking-wider block">
                  ⚡ Pintasan Cepat Paket Biaya Tambahan (Klik untuk Buat Tagihan):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {additionalFeeComponents.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() =>
                        setEditingAdditionalFee({
                          studentId: studentsList[0]?.id || "",
                          studentName: studentsList[0]?.name || "",
                          nisn: studentsList[0]?.nisn || "",
                          className: studentsList[0]?.className || "TK A",
                          feeComponentId: pkg.id,
                          feeName: pkg.name,
                          amount: pkg.amount,
                          status: "belum_lunas",
                          dueDate: "30 Agustus 2026",
                          isBatchForClass: false,
                        })
                      }
                      className="p-3 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 rounded-2xl text-left transition-all text-xs group shadow-xs cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-base mb-1">
                        <span>💳</span>
                        <Plus className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                      </div>
                      <div className="font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                        {pkg.name}
                      </div>
                      <div className="text-[11px] font-extrabold text-emerald-400 mt-0.5">
                        Rp {pkg.amount.toLocaleString("id-ID")}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* FORM CREATE / EDIT ADDITIONAL FEE MODAL */}
              {editingAdditionalFee && (
                <form
                  onSubmit={handleSaveAdditionalFee}
                  className="bg-slate-900/95 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl w-full"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-base">
                      {editingAdditionalFee.id ? "Edit Tagihan Biaya Tambahan" : "Buat Tagihan Biaya Tambahan Baru"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingAdditionalFee(null)}
                      className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Batch Choice */}
                  {!editingAdditionalFee.id && (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl flex items-center gap-3 text-xs text-emerald-300 font-semibold">
                      <input
                        type="checkbox"
                        id="batchCheck"
                        checked={editingAdditionalFee.isBatchForClass || false}
                        onChange={(e) =>
                          setEditingAdditionalFee({ ...editingAdditionalFee, isBatchForClass: e.target.checked })
                        }
                        className="w-4 h-4 text-emerald-600 rounded border-slate-700"
                      />
                      <label htmlFor="batchCheck" className="cursor-pointer">
                        Buat tagihan sekaligus untuk <strong>Seluruh Siswa dalam 1 Kelas</strong> (Batch Class)
                      </label>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {!editingAdditionalFee.isBatchForClass ? (
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Pilih Murid / Siswa</label>
                        <SearchableSelect
                          options={studentsList.map((s) => ({
                            value: s.id,
                            label: s.name,
                            sublabel: `NISN: ${s.nisn} • ${s.className}`,
                          }))}
                          value={
                            editingAdditionalFee.studentId ||
                            studentsList.find((s) => s.name === editingAdditionalFee.studentName)?.id ||
                            ""
                          }
                          onChange={(selectedId) => {
                            const found = studentsList.find((s) => s.id === selectedId);
                            if (found) {
                              setEditingAdditionalFee({
                                ...editingAdditionalFee,
                                studentId: found.id,
                                studentName: found.name,
                                nisn: found.nisn,
                                className: found.className,
                              });
                            }
                          }}
                          placeholder="Pilih nama siswa..."
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Pilih Kelas Sasaran</label>
                        <SearchableSelect
                          options={classesList.map((c) => ({
                            value: c.name,
                            label: c.name,
                            sublabel: `Tingkat: ${c.gradeLevel}`,
                          }))}
                          value={editingAdditionalFee.className || "TK A"}
                          onChange={(val) => setEditingAdditionalFee({ ...editingAdditionalFee, className: val })}
                          placeholder="Pilih kelas..."
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Jenis / Nama Biaya</label>
                      <SearchableSelect
                        options={additionalFeeComponents.map((component) => ({
                          value: component.id,
                          label: `${component.name} (Rp${Number(component.amount).toLocaleString("id-ID")})`,
                        }))}
                        value={
                          editingAdditionalFee.feeComponentId ||
                          additionalFeeComponents.find(
                            (component) => component.name === editingAdditionalFee.feeName
                          )?.id ||
                          ""
                        }
                        onChange={(val) => {
                          const component = additionalFeeComponents.find(
                            (item) => item.id === val
                          );
                          if (!component) return;
                          setEditingAdditionalFee({
                            ...editingAdditionalFee,
                            feeComponentId: component.id,
                            feeName: component.name,
                            amount: component.amount,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Nominal (Rp)</label>
                      <input
                        type="number"
                        required
                        value={editingAdditionalFee.amount}
                        onChange={(e) =>
                          setEditingAdditionalFee({ ...editingAdditionalFee, amount: Number(e.target.value) })
                        }
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Status Tagihan</label>
                      <SearchableSelect
                        options={[
                          { value: "belum_lunas", label: "Belum Lunas" },
                          { value: "lunas", label: "Lunas (Sudah Dibayar)" },
                          { value: "menunggu_konfirmasi", label: "Menunggu Konfirmasi" },
                        ]}
                        value={editingAdditionalFee.status || "belum_lunas"}
                        onChange={(val) => setEditingAdditionalFee({ ...editingAdditionalFee, status: val })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Tenggat Waktu / Catatan</label>
                      <input
                        type="text"
                        value={editingAdditionalFee.dueDate || ""}
                        onChange={(e) => setEditingAdditionalFee({ ...editingAdditionalFee, dueDate: e.target.value })}
                        placeholder="Contoh: 30 Agustus 2026"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingAdditionalFee(null)}
                      className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {saving ? "Memproses..." : "Simpan Tagihan Biaya Tambahan"}
                    </button>
                  </div>
                </form>
              )}

              {/* SEARCH & CATEGORY FILTER BAR */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-3xl border border-slate-800 shadow-lg w-full">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={additionalFeeSearch}
                    onChange={(e) => setAdditionalFeeSearch(e.target.value)}
                    placeholder="🔍 Cari nama siswa, NISN, atau jenis biaya tambahan..."
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <SearchableSelect
                    options={[
                      { value: "ALL", label: "Semua Kategori Biaya" },
                      ...additionalFeeComponents.map((component) => ({
                        value: component.name,
                        label: component.name,
                      })),
                    ]}
                    value={additionalFeeCategoryFilter}
                    onChange={(val) => setAdditionalFeeCategoryFilter(val)}
                  />

                  <SearchableSelect
                    options={[
                      { value: "ALL", label: "Semua Status" },
                      { value: "lunas", label: "Lunas" },
                      { value: "belum_lunas", label: "Belum Lunas" },
                      { value: "menunggu_konfirmasi", label: "Menunggu Konfirmasi" },
                    ]}
                    value={additionalFeeStatusFilter}
                    onChange={(val) => setAdditionalFeeStatusFilter(val)}
                  />
                </div>
              </div>

              {/* ADDITIONAL FEES CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {additionalFeesList
                  .filter((fee) => {
                    const matchStatus =
                      additionalFeeStatusFilter === "ALL" || fee.status === additionalFeeStatusFilter;
                    const matchCat =
                      additionalFeeCategoryFilter === "ALL" ||
                      fee.feeName?.toLowerCase().includes(additionalFeeCategoryFilter.toLowerCase());
                    const q = additionalFeeSearch.toLowerCase();
                    const matchSearch =
                      !q ||
                      fee.studentName?.toLowerCase().includes(q) ||
                      fee.feeName?.toLowerCase().includes(q) ||
                      fee.nisn?.toLowerCase().includes(q) ||
                      fee.className?.toLowerCase().includes(q);

                    return matchStatus && matchCat && matchSearch;
                  })
                  .map((fee) => (
                    <div
                      key={fee.id}
                      className={`bg-slate-900/90 border rounded-3xl p-5 space-y-3.5 transition-all shadow-xl ${
                        fee.status === "lunas"
                          ? "border-slate-800 hover:border-emerald-500/40"
                          : fee.status === "menunggu_konfirmasi"
                          ? "border-amber-500/50 bg-amber-950/20"
                          : "border-red-500/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                            {fee.feeName}
                          </span>
                          <h4 className="font-extrabold text-white text-base mt-1.5">{fee.studentName}</h4>
                          <p className="text-xs text-slate-400">
                            NISN: <span className="font-mono text-emerald-300 font-bold">{fee.nisn || "-"}</span> • Kelas: {fee.className || "-"}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-center shrink-0 ${
                            fee.status === "lunas"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : fee.status === "menunggu_konfirmasi"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
                              : "bg-red-500/20 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {fee.status === "lunas" ? "✓ Lunas" : fee.status === "menunggu_konfirmasi" ? "Menunggu Konfirmasi" : "Belum Lunas"}
                        </span>
                      </div>

                      <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 space-y-1.5 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Nominal Biaya:</span>
                          <span className="font-extrabold text-emerald-400 text-sm">
                            Rp {Number(fee.amount).toLocaleString("id-ID")}
                          </span>
                        </div>
                        {fee.dueDate && (
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-400">Tenggat Waktu:</span>
                            <span className="font-bold text-slate-300">{fee.dueDate}</span>
                          </div>
                        )}
                        {fee.paymentDate && (
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-400">Tgl Bayar:</span>
                            <span className="font-bold text-emerald-400">{fee.paymentDate}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                        {fee.proofUrl ? (
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(fee.proofUrl, `Bukti Bayar ${fee.feeName}: ${fee.studentName}`)}
                            className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Lihat Bukti</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-500 italic">Belum ada bukti</span>
                        )}

                        <div className="flex items-center gap-1.5">
                          {fee.status !== "lunas" && (
                            <button
                              onClick={() => handleUpdateAdditionalFeeStatus(fee.id, "lunas")}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                            >
                              Set Lunas
                            </button>
                          )}
                          <button
                            onClick={() => setEditingAdditionalFee(fee)}
                            className="p-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteAdditionalFee(fee.id)}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB: METODE PEMBAYARAN (QRIS & DAFTAR REKENING BANK) */}
          {activeTab === "payment-settings" && (
            <div className="space-y-8 w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <QrCode className="w-7 h-7 text-cyan-400" />
                    <span>Pengaturan Metode Pembayaran</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Kelola Gambar Barcode QRIS & Daftar Nomor Rekening Bank Cabang Sekolah.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingBankAccount({
                      schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
                      bankName: "Bank Mandiri",
                      accountNumber: "",
                      accountHolder: "Smart Kids / YAPCHI Foundation",
                      isActive: true,
                    })
                  }
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah No. Rekening Bank</span>
                </button>
              </div>

              {/* SECTION 1: QRIS IMAGE UPLOAD CARD */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl w-full">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold border border-cyan-500/30">
                      📱
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-base">Gambar Barcode QRIS Pembayaran</h3>
                      <p className="text-xs text-slate-400">Gambar barcode QRIS ini akan tampil otomatis di formulir PPDB dan portal bayar wali murid.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
                    <div className="relative w-48 h-48 bg-white rounded-2xl p-3 border-2 border-emerald-500 shadow-xl overflow-hidden group">
                      <Image
                        src={siteProfile.qrisImageUrl || "/images/qris_default.png"}
                        alt="QRIS Barcode"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleOpenPreview(siteProfile.qrisImageUrl || "/images/qris_default.png", "QRIS Barcode Pembayaran")}
                      className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Perbesar Gambar QRIS</span>
                    </button>
                  </div>

                  <div className="md:col-span-8 space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <h4 className="font-bold text-white text-sm">Unggah Gambar Barcode QRIS Baru</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Format file yang didukung: PNG, JPG, WEBP. Pastikan barcode terlihat jelas agar mudah di-scan menggunakan aplikasi m-Banking atau E-Wallet.
                    </p>

                    <label className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition shadow-lg shadow-emerald-600/20">
                      <Upload className="w-4 h-4" />
                      <span>{uploadingQris ? "Mengunggah QRIS..." : "Pilih File Gambar QRIS"}</span>
                      <input
                        type="file"
                        accept={IMAGE_UPLOAD_ACCEPT}
                        className="hidden"
                        disabled={uploadingQris}
                        onChange={handleUploadQrisImage}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* SECTION 2: DAFTAR REKENING BANK */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-white text-lg flex items-center gap-2">
                    <Building className="w-5 h-5 text-emerald-400" />
                    <span>Daftar Nomor Rekening Bank</span>
                  </h3>
                  <span className="text-xs text-slate-400">
                    Total: <strong className="text-white">{bankAccountsList.length}</strong> Rekening
                  </span>
                </div>

                {editingBankAccount && (
                  <form
                    onSubmit={handleSaveBankAccount}
                    className="bg-slate-900/95 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl w-full"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="font-bold text-white text-base">
                        {editingBankAccount.id ? "Edit Rekening Bank" : "Tambah Rekening Bank Baru"}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingBankAccount(null)}
                        className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Nama Bank</label>
                        <SearchableSelect
                          options={[
                            { value: "Bank Mandiri", label: "Bank Mandiri" },
                            { value: "Bank BCA", label: "Bank BCA" },
                            { value: "Bank BRI", label: "Bank BRI" },
                            { value: "Bank BNI", label: "Bank BNI" },
                            { value: "Bank BSI", label: "Bank BSI (Syariah)" },
                            { value: "Bank CIMB Niaga", label: "Bank CIMB Niaga" },
                          ]}
                          value={editingBankAccount.bankName}
                          onChange={(val) => setEditingBankAccount({ ...editingBankAccount, bankName: val })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Nomor Rekening</label>
                        <input
                          type="text"
                          required
                          value={editingBankAccount.accountNumber}
                          onChange={(e) => setEditingBankAccount({ ...editingBankAccount, accountNumber: e.target.value })}
                          placeholder="131 00 1234567 8"
                          className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Atas Nama (A.N.)</label>
                        <input
                          type="text"
                          required
                          value={editingBankAccount.accountHolder}
                          onChange={(e) => setEditingBankAccount({ ...editingBankAccount, accountHolder: e.target.value })}
                          placeholder="Smart Kids / YAPCHI Foundation"
                          className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingBankAccount.isActive}
                          onChange={(e) => setEditingBankAccount({ ...editingBankAccount, isActive: e.target.checked })}
                          className="w-4 h-4 text-emerald-600 rounded border-slate-700"
                        />
                        <span>Aktifkan Rekening Ini untuk Pembayaran PPDB & SPP</span>
                      </label>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setEditingBankAccount(null)}
                          className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                        >
                          {saving ? "Memproses..." : "Simpan Rekening Bank"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* BANK ACCOUNTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                  {bankAccountsList.map((acc) => (
                    <div
                      key={acc.id}
                      className={`bg-slate-900/90 border rounded-3xl p-6 space-y-4 shadow-xl transition-all ${
                        acc.isActive ? "border-slate-800 hover:border-emerald-500/40" : "border-slate-800/40 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-extrabold text-white text-base">{acc.bankName}</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            acc.isActive
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-slate-800 text-slate-500"
                          }`}
                        >
                          {acc.isActive ? "Aktif" : "Non-Aktif"}
                        </span>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          No. Rekening
                        </span>
                        <span className="font-mono font-extrabold text-emerald-400 text-lg tracking-wider block">
                          {acc.accountNumber}
                        </span>
                        <span className="text-xs text-slate-300 block font-medium">
                          a.n. {acc.accountHolder}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => handleToggleBankAccountStatus(acc.id, acc.isActive)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                            acc.isActive
                              ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          }`}
                        >
                          {acc.isActive ? "Non-Aktifkan" : "Aktifkan"}
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingBankAccount(acc)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBankAccount(acc.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PENGUMUMAN */}
          {activeTab === "announcements" && (
            <div className="space-y-6 w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Pengumuman Sekolah</h2>
                  <p className="text-xs text-slate-400">
                    {admin?.role === "ORTU"
                      ? "Informasi dan pengumuman resmi terbaru dari sekolah."
                      : "Terbitkan pengumuman resmi ke aplikasi mobile guru dan wali murid."}
                  </p>
                </div>
                {admin?.role !== "ORTU" && (
                  <button
                    onClick={() =>
                      setEditingAnnouncement({
                        title: "",
                        content: "",
                        targetRole: "Semua",
                        sender: admin?.name || "Pengelola Sekolah",
                        schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
                      })
                    }
                    className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Buat Pengumuman</span>
                  </button>
                )}
              </div>

              {editingAnnouncement && (
                <form onSubmit={handleSaveAnnouncement} className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl w-full">
                  <h3 className="font-bold text-white text-base">Terbitkan Pengumuman Baru</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Judul Pengumuman</label>
                      <input type="text" required value={editingAnnouncement.title} onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Target Penerima</label>
                      <SearchableSelect
                        options={[
                          { value: "Semua", label: "Semua (Guru & Ortu)" },
                          { value: "Guru", label: "Khusus Guru" },
                          { value: "Siswa", label: "Khusus Ortu/Siswa" },
                        ]}
                        value={editingAnnouncement.targetRole}
                        onChange={(val) => setEditingAnnouncement({ ...editingAnnouncement, targetRole: val })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Isi Pengumuman</label>
                    <textarea rows={3} required value={editingAnnouncement.content} onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setEditingAnnouncement(null)} className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl">Batal</button>
                    <button type="submit" disabled={saving} className="px-6 py-2.5 bg-purple-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30">Terbitkan</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {announcementsList.map((ann) => (
                  <div key={ann.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">{ann.targetRole}</span>
                        <span className="text-xs text-slate-500">{ann.date}</span>
                      </div>
                      <h4 className="font-extrabold text-white text-base">{ann.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{ann.content}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-500">
                      <span>Pengirim: {ann.sender}</span>
                      {admin?.role !== "ORTU" && (
                        <button onClick={() => handleDeleteAnnouncement(ann.id)} className="p-1.5 bg-red-500/10 text-red-400 rounded-xl"><Trash2 className="w-3.5 h-3.5" /></button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: IZIN & CUTI GURU */}
          {activeTab === "leave-requests" && (
            <div className="space-y-6 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-white tracking-tight">Pengajuan Izin & Cuti Guru</h2>
                    {leaveRequestsList.filter((l) => l.status === "pending" || l.status === "PENDING").length > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30 animate-pulse">
                        {leaveRequestsList.filter((l) => l.status === "pending" || l.status === "PENDING").length} Menunggu Persetujuan
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    {admin?.role === "GURU"
                      ? "Kelola dan pantau status pengajuan izin atau cuti mengajar Anda."
                      : "Verifikasi, periksa lampiran, dan beri persetujuan atas pengajuan izin/cuti guru."}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setEditingLeaveRequest({
                      teacherName: admin?.role === "GURU" ? (admin?.name || "Guru") : (teachersList[0]?.name || "Guru Smart Kids"),
                      type: "Izin Sakit",
                      startDate: new Date().toISOString().split("T")[0],
                      endDate: new Date().toISOString().split("T")[0],
                      reason: "",
                      attachment: "",
                      schoolId: admin?.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id),
                    })
                  }
                  className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajukan Izin / Cuti Baru</span>
                </button>
              </div>

              {/* FORM MODAL PENGAJUAN IZIN & CUTI GURU */}
              {editingLeaveRequest && (
                <form onSubmit={handleSaveLeaveRequest} className="bg-slate-900/95 border border-rose-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl w-full">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold border border-rose-500/30">
                        📑
                      </div>
                      <div>
                        <h3 className="font-extrabold text-white text-base">Form Permohonan Izin & Cuti Mengajar</h3>
                        <p className="text-xs text-slate-400">Isi rincian izin dan unggah surat keterangan dokter/lampiran pendukung jika ada.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingLeaveRequest(null)}
                      className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Nama Guru / Pengajar</label>
                      {admin?.role === "GURU" ? (
                        <input
                          type="text"
                          readOnly
                          value={editingLeaveRequest.teacherName}
                          className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white opacity-80"
                        />
                      ) : (
                        <SearchableSelect
                          options={teachersList.map((t) => ({
                            value: t.name,
                            label: t.name,
                            sublabel: t.role || "Guru Pengajar",
                          }))}
                          value={editingLeaveRequest.teacherName}
                          onChange={(val) => setEditingLeaveRequest({ ...editingLeaveRequest, teacherName: val })}
                          placeholder="Pilih nama guru..."
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Jenis Izin / Cuti</label>
                      <SearchableSelect
                        options={[
                          { value: "Izin Sakit", label: "🏥 Izin Sakit (Surat Dokter)" },
                          { value: "Cuti Tahunan", label: "🏖️ Cuti Tahunan" },
                          { value: "Izin Acara Keluarga", label: "🏠 Izin Kepentingan Keluarga" },
                          { value: "Cuti Melahirkan", label: "👶 Cuti Melahirkan / Bersalin" },
                          { value: "Izin Duka Cita", label: "🕊️ Izin Duka Cita" },
                          { value: "Izin Mendesak", label: "⚠️ Izin Keperluan Mendesak" },
                        ]}
                        value={editingLeaveRequest.type}
                        onChange={(val) => setEditingLeaveRequest({ ...editingLeaveRequest, type: val })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Tanggal Mulai</label>
                      <input
                        type="date"
                        required
                        value={editingLeaveRequest.startDate}
                        onChange={(e) => setEditingLeaveRequest({ ...editingLeaveRequest, startDate: e.target.value })}
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Tanggal Selesai</label>
                      <input
                        type="date"
                        required
                        value={editingLeaveRequest.endDate}
                        onChange={(e) => setEditingLeaveRequest({ ...editingLeaveRequest, endDate: e.target.value })}
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Alasan Permohonan Izin / Cuti</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Jelaskan alasan pengajuan izin atau keterlibatan tugas luar mengajar..."
                      value={editingLeaveRequest.reason}
                      onChange={(e) => setEditingLeaveRequest({ ...editingLeaveRequest, reason: e.target.value })}
                      className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>

                  {/* FIELD UPLOAD LAMPIRAN SURAT DOKTER / BERKAS */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400">
                      Upload Lampiran Berkas / Surat Dokter <span className="text-rose-400 font-normal">(Foto Surat Keterangan / Dokumen PDF)</span>
                    </label>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <label className="flex-1 w-full flex items-center justify-center gap-2 p-4 bg-slate-950 hover:bg-slate-800 border-2 border-dashed border-slate-700 hover:border-rose-500 rounded-2xl cursor-pointer transition">
                        <Upload className="w-5 h-5 text-rose-400" />
                        <span className="text-xs text-slate-300 font-medium">
                          {leaveUploading
                            ? "Mengunggah berkas..."
                            : editingLeaveRequest.attachment
                            ? "Ganti Berkas Lampiran"
                            : "Pilih / Ambil Foto Surat Keterangan"}
                        </span>
                        <input
                          type="file"
                          accept={DOCUMENT_UPLOAD_ACCEPT}
                          onChange={handleUploadLeaveAttachment}
                          className="hidden"
                        />
                      </label>

                      {editingLeaveRequest.attachment && (
                        <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-2xl border border-rose-500/30 shrink-0">
                          <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-400 font-bold text-xs">
                            📷
                          </div>
                          <div className="text-xs">
                            <span className="text-rose-400 font-bold block">✓ Lampiran Terunggah</span>
                            <button
                              type="button"
                              onClick={() => handleOpenPreview(editingLeaveRequest.attachment, "Pratinjau Surat Lampiran Izin")}
                              className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
                            >
                              Lihat Berkas Full
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingLeaveRequest(null)}
                      className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={saving || leaveUploading}
                      className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{saving ? "Kirimkan..." : "Kirim Pengajuan Izin"}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* FILTER STATUS TAB FOR LEAVE REQUESTS */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setLeaveStatusFilter("ALL")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    leaveStatusFilter === "ALL"
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  Semua Pengajuan ({leaveRequestsList.length})
                </button>
                <button
                  onClick={() => setLeaveStatusFilter("pending")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                    leaveStatusFilter === "pending"
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30"
                      : "bg-slate-900 text-amber-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  <span>⏳ Menunggu Persetujuan</span>
                  {leaveRequestsList.filter((l) => l.status === "pending" || l.status === "PENDING").length > 0 && (
                    <span className="bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                      {leaveRequestsList.filter((l) => l.status === "pending" || l.status === "PENDING").length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setLeaveStatusFilter("disetujui")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    leaveStatusFilter === "disetujui"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-slate-900 text-emerald-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  ✓ Disetujui ({leaveRequestsList.filter((l) => l.status === "disetujui" || l.status === "APPROVED").length})
                </button>
                <button
                  onClick={() => setLeaveStatusFilter("ditolak")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    leaveStatusFilter === "ditolak"
                      ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                      : "bg-slate-900 text-red-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  ✕ Ditolak ({leaveRequestsList.filter((l) => l.status === "ditolak" || l.status === "REJECTED").length})
                </button>
              </div>

              {/* LEAVE REQUESTS GRID DISPLAY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {leaveRequestsList
                  .filter((leave) => {
                    if (leaveStatusFilter !== "ALL") {
                      if (leaveStatusFilter === "pending" && leave.status !== "pending" && leave.status !== "PENDING") return false;
                      if (leaveStatusFilter === "disetujui" && leave.status !== "disetujui" && leave.status !== "APPROVED") return false;
                      if (leaveStatusFilter === "ditolak" && leave.status !== "ditolak" && leave.status !== "REJECTED") return false;
                    }
                    if (admin?.role === "GURU") {
                      const teacherName = (leave.teacherName || "").toLowerCase();
                      const myName = (admin?.name || "").toLowerCase();
                      return teacherName.includes(myName) || myName.includes(teacherName);
                    }
                    return true;
                  })
                  .map((leave) => (
                    <div
                      key={leave.id}
                      className={`bg-slate-900/90 border rounded-3xl p-5 space-y-3.5 transition-all shadow-xl ${
                        leave.status === "pending" || leave.status === "PENDING"
                          ? "border-amber-500/50 bg-amber-950/20"
                          : leave.status === "disetujui" || leave.status === "APPROVED"
                          ? "border-slate-800 hover:border-emerald-500/40"
                          : "border-red-500/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                            {leave.type || "Izin Mengajar"}
                          </span>
                          <h4 className="font-extrabold text-white text-base mt-1.5">{leave.teacherName}</h4>
                          <p className="text-xs text-slate-400">
                            Periode: <span className="font-mono text-emerald-300 font-bold">{leave.startDate}</span> s/d <span className="font-mono text-emerald-300 font-bold">{leave.endDate}</span>
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 ${
                            leave.status === "disetujui" || leave.status === "APPROVED"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : leave.status === "pending" || leave.status === "PENDING"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
                              : "bg-red-500/20 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {leave.status === "pending" || leave.status === "PENDING" ? "Menunggu Approval" : leave.status}
                        </span>
                      </div>

                      <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-1 text-xs">
                        <span className="text-slate-400 font-bold block text-[11px] uppercase tracking-wider">Alasan Pengajuan:</span>
                        <p className="text-slate-200 italic leading-relaxed">&quot;{leave.reason}&quot;</p>
                      </div>

                      {/* LAMPIRAN BERKAS SURAT & AKSI PERSUTUJUAN ADMIN */}
                      <div className="flex items-center justify-between pt-1">
                        {leave.attachment ? (
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(leave.attachment, `Lampiran Surat Izin: ${leave.teacherName}`)}
                            className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-rose-400" />
                            <span>Lihat Surat Dokter / Lampiran</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-500 italic">Tanpa lampiran berkas</span>
                        )}

                        {admin?.role !== "GURU" && (
                          <div className="flex items-center gap-1.5">
                            {(leave.status === "pending" || leave.status === "PENDING") && (
                              <>
                                <button
                                  onClick={() => handleUpdateLeaveStatus(leave.id, "disetujui")}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1 cursor-pointer"
                                  title="Setujui Izin Guru"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>Setujui</span>
                                </button>
                                <button
                                  onClick={() => handleUpdateLeaveStatus(leave.id, "ditolak")}
                                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1 cursor-pointer"
                                  title="Tolak Pengajuan Izin"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Tolak</span>
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDeleteLeaveRequest(leave.id)}
                              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl cursor-pointer"
                              title="Hapus Record Izin"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB: JADWAL KBM */}
          {activeTab === "schedules" && (
            <div className="space-y-6 w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Jadwal Kegiatan Belajar (KBM)</h2>
                  <p className="text-xs text-slate-400">
                    {admin?.role === "ORTU"
                      ? "Jadwal dan alokasi kegiatan belajar harian ananda."
                      : "Atur alokasi waktu dan materi pelajaran harian."}
                  </p>
                </div>
                {admin?.role !== "ORTU" && (
                  <button
                    onClick={() =>
                      setEditingSchedule({
                        date: new Date().toISOString().split("T")[0],
                        timeRange: "08.00 - 09.30",
                        className: "Kelas TK A",
                        room: "Ruang Melati",
                        subject: "",
                        activities: "",
                        isCompleted: false,
                        schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
                      })
                    }
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/30"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Jadwal</span>
                  </button>
                )}
              </div>

              {editingSchedule && (
                <form onSubmit={handleSaveSchedule} className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl w-full">
                  <h3 className="font-bold text-white text-base">
                    {editingSchedule.id ? "Edit Jadwal Pelajaran" : "Tambah Jadwal Pelajaran Baru"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Pilih Sekolah</label>
                      <SearchableSelect
                        options={schoolsList.map((sch) => ({
                          value: sch.id,
                          label: sch.name,
                        }))}
                        value={editingSchedule.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id || "")}
                        onChange={(selectedSchId) => {
                          setEditingSchedule({
                            ...editingSchedule,
                            schoolId: selectedSchId,
                            classId: "",
                            className: "",
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Pilih Master Kelas</label>
                      <SearchableSelect
                        options={classesList
                          .filter((c) => !editingSchedule.schoolId || editingSchedule.schoolId === "ALL" || c.schoolId === editingSchedule.schoolId)
                          .map((c) => ({
                            value: c.id,
                            label: c.name,
                            sublabel: `Wali: ${c.homeroomTeacherName || "-"}`,
                          }))}
                        value={editingSchedule.classId || classesList.find((c) => c.name === editingSchedule.className)?.id || ""}
                        onChange={(selectedClassId) => {
                          const foundClass = classesList.find((c) => c.id === selectedClassId);
                          if (foundClass) {
                            setEditingSchedule({
                              ...editingSchedule,
                              classId: foundClass.id,
                              className: foundClass.name,
                            });
                          }
                        }}
                        placeholder="Pilih Kelas..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Tanggal KBM</label>
                      <input type="date" required value={editingSchedule.date || new Date().toISOString().split("T")[0]} onChange={(e) => setEditingSchedule({ ...editingSchedule, date: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Waktu (Jam)</label>
                      <input type="text" required value={editingSchedule.timeRange} onChange={(e) => setEditingSchedule({ ...editingSchedule, timeRange: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold" placeholder="08.00 - 09.30" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Ruangan / Tempat</label>
                      <input type="text" required value={editingSchedule.room} onChange={(e) => setEditingSchedule({ ...editingSchedule, room: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold" placeholder="Ruang Kelas Melati" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Materi / Mata Pelajaran</label>
                      <input type="text" required value={editingSchedule.subject} onChange={(e) => setEditingSchedule({ ...editingSchedule, subject: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold" placeholder="Contoh: Mengenal Abjad & Bernyanyi" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Aktivitas Belajar</label>
                      <input type="text" required value={editingSchedule.activities} onChange={(e) => setEditingSchedule({ ...editingSchedule, activities: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold" placeholder="Contoh: Bernyanyi, menebalkan huruf vokal" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setEditingSchedule(null)} className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl">Batal</button>
                    <button type="submit" disabled={saving} className="px-6 py-2.5 bg-cyan-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-600/30">Simpan Jadwal</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {schedulesList.map((sch) => (
                  <div key={sch.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                          <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                          <span>{sch.date || "2026-07-27"}</span>
                          <span>•</span>
                          <span>{sch.timeRange}</span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{sch.className} • {sch.room}</span>
                      </div>
                      <h4 className="font-bold text-white text-base mt-1">{sch.subject}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{sch.activities}</p>
                    </div>
                    {admin?.role !== "ORTU" && (
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                        <button onClick={() => setEditingSchedule(sch)} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl cursor-pointer" title="Edit Jadwal KBM"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDeleteSchedule(sch.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl cursor-pointer" title="Hapus Jadwal"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY */}
          {activeTab === "gallery" && (
            <div className="space-y-6 w-full">
              <div className="border-b border-slate-800/80 pb-4">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Kelola Galeri Foto
                </h2>
                <p className="text-xs text-slate-400">
                  Unggah gambar dokumentasi kegiatan sekolah. File disimpan per tanggal di uploads/gallery/.
                </p>
              </div>

              <form
                onSubmit={handleAddGallery}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                      Judul Foto
                    </label>
                    <input
                      type="text"
                      placeholder="Kegiatan Belajar"
                      value={newGalleryTitle}
                      onChange={(e) => setNewGalleryTitle(e.target.value)}
                      className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                      Pilih File Gambar (maksimal 1 MB)
                    </label>
                    <input
                      type="file"
                      accept={IMAGE_UPLOAD_ACCEPT}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const url = await uploadFile(file, "gallery");
                            setNewGalleryImage(url);
                            showMessage("Gambar berhasil diunggah!", "success");
                          } catch (err: any) {
                            showMessage(err.message, "error");
                          }
                        }
                      }}
                      className="text-xs text-slate-400"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={saving || !newGalleryImage}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Tambahkan Ke Galeri</span>
                    </button>
                  </div>
                </div>
              </form>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 w-full">
                {galleryList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group relative shadow-xl"
                  >
                    <div
                      className="relative h-44 w-full bg-slate-950 cursor-pointer group/img"
                      onClick={() => handleOpenPreview(item.imageUrl, `Galeri Foto: ${item.title}`)}
                      title="Klik untuk memperbesar gambar"
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white drop-shadow-md" />
                      </div>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <span className="text-xs text-slate-300 font-bold truncate">
                        {item.title}
                      </span>
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="p-1 text-red-400 hover:bg-red-500/20 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-6 w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Kelola Testimoni Orang Tua
                  </h2>
                  <p className="text-xs text-slate-400">
                    Ulasan & testimoni orang tua murid per cabang sekolah.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingTestimonial({
                      parentName: "",
                      role: "Orang Tua Siswa",
                      initials: "",
                      content: "",
                      rating: 5,
                      bgColor: "emerald",
                      orderIndex: testimonialsList.length + 1,
                      schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
                    })
                  }
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Testimoni</span>
                </button>
              </div>

              {editingTestimonial && (
                <form
                  onSubmit={handleSaveTestimonial}
                  className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl w-full"
                >
                  <h3 className="font-bold text-white text-base">
                    {editingTestimonial.id ? "Edit Testimoni" : "Tambah Testimoni Baru"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Pilih Cabang Sekolah
                      </label>
                      <select
                        value={editingTestimonial.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id || "")}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, schoolId: e.target.value })
                        }
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        {schoolsList.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Nama Orang Tua
                      </label>
                      <input
                        type="text"
                        required
                        value={editingTestimonial.parentName || ""}
                        onChange={(e) => {
                          const name = e.target.value;
                          const autoInitials = name.trim().length >= 2
                            ? name.trim().substring(0, 2).toUpperCase()
                            : editingTestimonial.initials;
                          setEditingTestimonial({
                            ...editingTestimonial,
                            parentName: name,
                            initials: editingTestimonial.id ? editingTestimonial.initials : autoInitials,
                          });
                        }}
                        placeholder="Contoh: Ibu Sarah / Bpk. Rudi"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Peran / Status
                      </label>
                      <input
                        type="text"
                        value={editingTestimonial.role || "Orang Tua Siswa"}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, role: e.target.value })
                        }
                        placeholder="Contoh: Orang Tua Ananda Kenzie (TK B)"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Inisial (2-3 Karakter)
                      </label>
                      <input
                        type="text"
                        maxLength={3}
                        value={editingTestimonial.initials || ""}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, initials: e.target.value.toUpperCase() })
                        }
                        placeholder="Contoh: SR"
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Rating (1 - 5)
                      </label>
                      <select
                        value={editingTestimonial.rating || 5}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })
                        }
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                        <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                        <option value={2}>⭐⭐ (2 Bintang)</option>
                        <option value={1}>⭐ (1 Bintang)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Warna Tema Card
                      </label>
                      <select
                        value={editingTestimonial.bgColor || "emerald"}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, bgColor: e.target.value })
                        }
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="emerald">Hijau (Emerald)</option>
                        <option value="blue">Biru (Sky/Blue)</option>
                        <option value="amber">Kuning (Amber)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Urutan Tampil
                      </label>
                      <input
                        type="number"
                        value={editingTestimonial.orderIndex ?? 0}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, orderIndex: Number(e.target.value) })
                        }
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Isi Testimoni
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={editingTestimonial.content || ""}
                      onChange={(e) =>
                        setEditingTestimonial({ ...editingTestimonial, content: e.target.value })
                      }
                      placeholder="Tuliskan testimoni atau ulasan kesan pesan orang tua di sini..."
                      className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl text-xs font-bold transition"
                    >
                      {saving ? "Menyimpan..." : "Simpan Testimoni"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial(null)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-3 rounded-xl text-xs font-bold transition"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}

              {testimonialsList.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800/80 p-8 space-y-4 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-base">Belum Ada Testimoni</h3>
                    <p className="text-slate-400 text-xs max-w-sm">
                      Belum ada ulasan testimoni orang tua murid untuk cabang sekolah ini. Silakan tambahkan testimoni baru.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingTestimonial({
                        parentName: "",
                        role: "Orang Tua Siswa",
                        initials: "",
                        content: "",
                        rating: 5,
                        bgColor: "emerald",
                        orderIndex: 1,
                        schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
                      })
                    }
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Testimoni Pertama</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                  {testimonialsList.map((testi) => (
                    <div
                      key={testi.id}
                      className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between shadow-xl relative group hover:border-slate-700 transition"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                testi.bgColor === "blue"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                  : testi.bgColor === "amber"
                                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              }`}
                            >
                              {testi.initials || "OT"}
                            </div>
                            <div>
                              <h4 className="font-extrabold text-white text-sm leading-tight">{testi.parentName}</h4>
                              <p className="text-[11px] text-slate-400">{testi.role || "Orang Tua Siswa"}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                          <div className="flex items-center text-amber-400 text-xs">
                            {"★".repeat(Math.max(1, Math.min(5, testi.rating || 5)))}
                            <span className="text-[10px] text-slate-500 ml-1">({testi.rating || 5}/5)</span>
                          </div>
                          {testi.school?.name && (
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              {testi.school?.name}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-950/50 p-3 rounded-2xl border border-slate-800/50">
                          &quot;{testi.content}&quot;
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-500">Urutan: #{testi.orderIndex ?? 0}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingTestimonial(testi)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition"
                            title="Edit Testimoni"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(testi.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition"
                            title="Hapus Testimoni"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: SITE PROFILE SETTINGS FULL WIDTH */}
          {activeTab === "profile" && (
            <div className="space-y-6 w-full">
              <div className="border-b border-slate-800/80 pb-4">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Pengaturan Website Cabang Sekolah
                </h2>
                <p className="text-xs text-slate-400">
                  Ubah teks Hero, gambar maskot (`profile/`), kontak, dan CTA untuk cabang:{" "}
                  <span className="font-bold text-emerald-400">
                    {schoolsList.find((s) => s.id === (siteProfile.schoolId || selectedSchoolId))?.name || "Pilih Cabang"}
                  </span>
                </p>
              </div>

              <form
                onSubmit={handleSaveProfile}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl w-full"
              >
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                      Pilih Cabang Sekolah
                    </label>
                    <SearchableSelect
                      options={schoolsList.map((s) => ({
                        value: s.id,
                        label: s.name,
                        sublabel: `Slug: ${s.code}`,
                      }))}
                      value={siteProfile.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id)}
                      onChange={(val) => setSiteProfile({ ...siteProfile, schoolId: val })}
                      placeholder="Pilih cabang sekolah..."
                      searchPlaceholder="Cari sekolah..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Hero Headline (Judul Utama)
                      </label>
                      <input
                        type="text"
                        value={siteProfile.heroTitle || ""}
                        onChange={(e) =>
                          setSiteProfile({ ...siteProfile, heroTitle: e.target.value })
                        }
                        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white font-bold focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Badge Text Pengumuman
                      </label>
                      <input
                        type="text"
                        value={siteProfile.heroBadge || ""}
                        onChange={(e) =>
                          setSiteProfile({ ...siteProfile, heroBadge: e.target.value })
                        }
                        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                      Deskripsi Hero (Sub-headline)
                    </label>
                    <textarea
                      rows={3}
                      value={siteProfile.heroSubtitle || ""}
                      onChange={(e) =>
                        setSiteProfile({ ...siteProfile, heroSubtitle: e.target.value })
                      }
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Telepon / WA Kontak
                      </label>
                      <input
                        type="text"
                        value={siteProfile.phone || ""}
                        onChange={(e) =>
                          setSiteProfile({ ...siteProfile, phone: e.target.value })
                        }
                        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={siteProfile.instagram || ""}
                        onChange={(e) =>
                          setSiteProfile({ ...siteProfile, instagram: e.target.value })
                        }
                        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                        Facebook
                      </label>
                      <input
                        type="text"
                        value={siteProfile.facebook || ""}
                        onChange={(e) =>
                          setSiteProfile({ ...siteProfile, facebook: e.target.value })
                        }
                        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end border-t border-slate-800">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-3.5 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center gap-2"
                  >
                    {saving ? "Menyimpan..." : "Simpan Pengaturan Cabang"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Credential Details Modal */}
      {selectedCredentialModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">Akun Portal Orang Tua</h3>
                  <p className="text-xs text-slate-400">Siswa: {selectedCredentialModal.studentName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCredentialModal(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">Username:</span>
                <span className="text-sm text-emerald-400 font-mono font-bold">{selectedCredentialModal.username}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">Password:</span>
                <span className="text-sm text-emerald-400 font-mono font-bold">{selectedCredentialModal.password}</span>
              </div>
              {selectedCredentialModal.parentEmail && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-500">Email Ortu:</span>
                  <span className="text-[11px] text-slate-300 font-semibold">{selectedCredentialModal.parentEmail}</span>
                </div>
              )}
              {selectedCredentialModal.parentPhone && (
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">No WA Ortu:</span>
                  <span className="text-[11px] text-slate-300 font-semibold">{selectedCredentialModal.parentPhone}</span>
                </div>
              )}
            </div>

            {selectedCredentialModal.emailSent && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Email pemberitahuan akun telah dikirim ke {selectedCredentialModal.parentEmail}</span>
              </div>
            )}

            <div className="flex flex-col gap-2.5 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Akun Portal Ortu Smart Kids:\nSiswa: ${selectedCredentialModal.studentName}\nUsername: ${selectedCredentialModal.username}\nPassword: ${selectedCredentialModal.password}\nLogin: ${window.location.origin}/login`);
                  setCredentialsCopied(true);
                  setTimeout(() => setCredentialsCopied(false), 2500);
                }}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Copy className="w-4 h-4" />
                <span>{credentialsCopied ? "Berhasil Disalin!" : "Salin Akun Login"}</span>
              </button>

              {selectedCredentialModal.waUrl && (
                <a
                  href={selectedCredentialModal.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30 text-center"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim via WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* QR Code Presensi Scanner Modal Overlay */}
      {qrModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">
                  {qrModal.type === "STUDENT" ? "Scan QR Presensi Murid" : "Scan QR Presensi Guru"}
                </h3>
              </div>
              <button
                onClick={() => setQrModal({ isOpen: false, type: "STUDENT", inputCode: "", scanning: false, result: null, error: null })}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-center">
              <div id="reader" className="w-full bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col items-center justify-center p-6 space-y-3 min-h-[240px] relative">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-pulse">
                  <Camera className="w-7 h-7" />
                </div>
                <p className="text-xs text-slate-300">
                  Mengaktifkan kamera scanner presensi...
                </p>
                <p className="text-[10px] text-slate-500">
                  Arahkan Kode QR kartu siswa / guru ke depan webcam Anda.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleScanQr(qrModal.inputCode, qrModal.type);
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  autoFocus
                  placeholder={qrModal.type === "STUDENT" ? "Ketik NISN atau QR Code Murid (cth: STUDENT:123)..." : "Ketik ID atau QR Code Guru (cth: TEACHER:abc)..."}
                  value={qrModal.inputCode}
                  onChange={(e) => setQrModal((prev) => ({ ...prev, inputCode: e.target.value }))}
                  className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-emerald-500 focus:outline-none font-medium"
                />
                <button
                  type="submit"
                  disabled={qrModal.scanning || !qrModal.inputCode}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  {qrModal.scanning ? "Memproses Scan..." : "Proses Scan QR Presensi"}
                </button>
              </form>

              {qrModal.result && (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-xs text-emerald-200 space-y-1 text-left">
                  <p className="font-bold flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Presensi Berhasil Dicatat!
                  </p>
                  <p>{qrModal.result.message}</p>
                </div>
              )}

              {qrModal.error && (
                <div className="p-4 bg-red-950/80 border border-red-500/40 rounded-2xl text-xs text-red-200 space-y-1 text-left">
                  <p className="font-bold flex items-center gap-1.5 text-red-300">
                    <XCircle className="w-4 h-4 text-red-400" />
                    Scan Gagal!
                  </p>
                  <p>{qrModal.error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Input Raihan Bulanan Guru */}
      {teacherProgressModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Input Raihan Mengajar Bulanan Guru</h3>
              </div>
              <button
                type="button"
                onClick={() => setTeacherProgressModal((prev) => ({ ...prev, isOpen: false }))}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacherProgress} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Pilih Guru / Pengajar</label>
                <SearchableSelect
                  options={teachersList.map((t) => ({
                    value: t.id,
                    label: t.name,
                    sublabel: `Jabatan: ${t.role} • ${t.assignedClass || "Guru"}`,
                  }))}
                  value={teacherProgressModal.teacherId}
                  onChange={(selectedId) => {
                    const found = teachersList.find((t) => t.id === selectedId);
                    if (found) {
                      setTeacherProgressModal((prev) => ({
                        ...prev,
                        teacherId: found.id,
                        teacherName: found.name,
                      }));
                    }
                  }}
                  placeholder="Pilih nama guru..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Bulan Capaian</label>
                  <input
                    type="text"
                    required
                    value={teacherProgressModal.month}
                    onChange={(e) => setTeacherProgressModal((prev) => ({ ...prev, month: e.target.value }))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    placeholder="Juli 2026"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Judul Program</label>
                  <SearchableSelect
                    options={programsList.map((p) => ({
                      value: p.title,
                      label: p.title,
                    }))}
                    value={teacherProgressModal.programTitle}
                    onChange={(val) => setTeacherProgressModal((prev) => ({ ...prev, programTitle: val }))}
                    placeholder="Pilih program..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Jam Mengajar (Aktual)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={teacherProgressModal.hoursTaught}
                    onChange={(e) => setTeacherProgressModal((prev) => ({ ...prev, hoursTaught: Number(e.target.value) }))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Target Jam</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={teacherProgressModal.targetHours}
                    onChange={(e) => setTeacherProgressModal((prev) => ({ ...prev, targetHours: Number(e.target.value) }))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Evaluasi Siswa (Anak)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={teacherProgressModal.evaluatedStudentsCount}
                    onChange={(e) => setTeacherProgressModal((prev) => ({ ...prev, evaluatedStudentsCount: Number(e.target.value) }))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Catatan Raihan Mengajar (Opsional)</label>
                <input
                  type="text"
                  value={teacherProgressModal.notes}
                  onChange={(e) => setTeacherProgressModal((prev) => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  placeholder="Misal: Sangat aktif dalam menyampaikan sentra kognitif..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setTeacherProgressModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{saving ? "Menyimpan..." : "Simpan Raihan Mengajar"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Account Credentials Modal Overlay */}
      {teacherCredentialModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Akun Login & QR Presensi Guru</h3>
              </div>
              <button
                onClick={() => setTeacherCredentialModal((prev) => ({ ...prev, isOpen: false }))}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {teacherCredentialModal.loading ? (
              <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
                Memuat data akun login guru...
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">Nama Guru:</span>
                    <strong className="text-white font-bold">{teacherCredentialModal.teacherName}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">Jabatan & Kelas:</span>
                    <strong className="text-emerald-300 font-bold">{teacherCredentialModal.role} ({teacherCredentialModal.assignedClass})</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">Email & Telepon:</span>
                    <strong className="text-slate-300 font-mono text-[11px]">
                      {(teacherCredentialModal as any).email || "-"} • {(teacherCredentialModal as any).phone || "-"}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">Username Login:</span>
                    <strong className="text-amber-300 font-mono font-black">{teacherCredentialModal.username}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Password:</span>
                    <strong className="text-emerald-400 font-mono font-black text-right">
                      {teacherCredentialModal.passwordAvailable
                        ? teacherCredentialModal.password
                        : "Tersimpan aman (bcrypt)"}
                    </strong>
                  </div>
                </div>

                {/* QR CODE PRESENSI DISPLAY */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Kode QR Presensi Guru
                  </span>
                  <div className="w-36 h-36 mx-auto bg-white p-2.5 rounded-2xl shadow-inner flex items-center justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(teacherCredentialModal.qrCode)}`}
                      alt="QR Presensi Guru"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[10px] font-mono text-emerald-400 font-bold">
                    {teacherCredentialModal.qrCode}
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={handleResetTeacherPassword}
                    className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset & Buat Password Baru</span>
                  </button>

                  {teacherCredentialModal.passwordAvailable && (
                    <>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `Akun Portal Guru TK Smart Kids:\nNama: ${teacherCredentialModal.teacherName}\nUsername: ${teacherCredentialModal.username}\nPassword: ${teacherCredentialModal.password}\nLogin: ${window.location.origin}/login`
                          );
                          showMessage("Akun login guru berhasil disalin!", "success");
                        }}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Salin Akun Login Guru</span>
                      </button>

                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `Halo Ibu/Bapak ${teacherCredentialModal.teacherName},\nBerikut akun login Portal Guru Smart Kids:\n\nUsername: ${teacherCredentialModal.username}\nPassword: ${teacherCredentialModal.password}\n\nSilakan login di: ${window.location.origin}/login`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30 text-center"
                      >
                        <Send className="w-4 h-4" />
                        <span>Kirim Akun via WhatsApp</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            )}
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
