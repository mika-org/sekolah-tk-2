"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  GraduationCap,
  Bell,
  CreditCard,
  FileCheck,
  FileText,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "schools"
    | "users"
    | "ppdb"
    | "programs"
    | "teachers"
    | "students"
    | "attendance"
    | "spp"
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

  // Multi-School & Admin Users States
  const [schoolsList, setSchoolsList] = useState<any[]>([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>("ALL");
  const [editingSchool, setEditingSchool] = useState<any | null>(null);

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

  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [editingAttendance, setEditingAttendance] = useState<any | null>(null);

  const [sppList, setSppList] = useState<any[]>([]);
  const [editingSpp, setEditingSpp] = useState<any | null>(null);

  const [announcementsList, setAnnouncementsList] = useState<any[]>([]);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any | null>(null);

  const [leaveRequestsList, setLeaveRequestsList] = useState<any[]>([]);

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

      const [resPpdb, resProg, resTeach, resGal, resTest, resProf, resStud, resSched, resAtt, resLeave, resAnn, resSpp] = await Promise.all([
        fetch(`/api/ppdb${queryParam}`).then((r) => r.json()),
        fetch(`/api/programs${queryParam}`).then((r) => r.json()),
        fetch(`/api/teachers${queryParam}`).then((r) => r.json()),
        fetch(`/api/gallery${queryParam}`).then((r) => r.json()),
        fetch(`/api/testimonials${queryParam}`).then((r) => r.json()),
        fetch(`/api/site-profile${queryParam}`).then((r) => r.json()),
        fetch(`/api/students${queryParam}`).then((r) => r.json()),
        fetch(`/api/schedules${queryParam}`).then((r) => r.json()),
        fetch(`/api/attendance`).then((r) => r.json()),
        fetch(`/api/leave-requests`).then((r) => r.json()),
        fetch(`/api/announcements${queryParam}`).then((r) => r.json()),
        fetch(`/api/spp`).then((r) => r.json()),
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
    } catch (err: any) {
      showMessage("Gagal memuat data", "error");
    } finally {
      setLoading(false);
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

  const uploadFile = async (file: File, folder: "uploads" | "profile" | "ppdb"): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

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

      showMessage(`Status PPDB diperbarui menjadi ${status}`, "success");
      setPpdbList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      if (selectedPpdb?.id === id) {
        setSelectedPpdb({ ...selectedPpdb, status });
      }
    } catch (err: any) {
      showMessage(err.message || "Gagal mengubah status PPDB", "error");
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
      const res = await fetch("/api/spp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSpp),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      showMessage("Catatan SPP berhasil ditambahkan", "success");
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
          folder: "uploads",
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
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-lg shadow-emerald-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-emerald-400 text-sm">
              YAP
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-lg text-white tracking-tight">
                YAPCHI CMS
              </h1>
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Multi-Sekolah
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Pusat Pengelolaan Yayasan & Cabang Sekolah</p>
          </div>
        </div>

        {/* CENTER: SCHOOL BRANCH SWITCHER PILL */}
        <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 px-4 py-2 rounded-2xl w-full lg:w-auto shadow-inner transition-all">
          <Building className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
          <span className="text-xs font-bold text-slate-400 shrink-0">Sekolah:</span>
          <select
            value={selectedSchoolId}
            onChange={(e) => setSelectedSchoolId(e.target.value)}
            className="bg-transparent text-xs font-extrabold text-emerald-300 focus:outline-none cursor-pointer flex-1 lg:w-64"
          >
            <option value="ALL" className="bg-slate-900 text-white font-bold">
              🏢 Semua Sekolah (Yayasan Level)
            </option>
            {schoolsList.map((sch) => (
              <option key={sch.id} value={sch.id} className="bg-slate-900 text-white">
                🏫 {sch.name} ({sch.code})
              </option>
            ))}
          </select>
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
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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

            {(admin?.role === "ADMIN_PUSAT" || admin?.role === "SUPER_ADMIN") && (
              <button
                onClick={() => setActiveTab("users")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "users"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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

            <button
              onClick={() => setActiveTab("ppdb")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "ppdb"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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

            <button
              onClick={() => setActiveTab("programs")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "programs"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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

            <button
              onClick={() => setActiveTab("teachers")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "teachers"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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

            <button
              onClick={() => setActiveTab("students")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "students"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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

            <button
              onClick={() => setActiveTab("attendance")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "attendance"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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

            <button
              onClick={() => setActiveTab("spp")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "spp"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>SPP & Keuangan</span>
              </div>
              <span className="bg-slate-800 text-slate-400 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700">
                {sppList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("announcements")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "announcements"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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

            <button
              onClick={() => setActiveTab("leave-requests")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "leave-requests"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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

            <button
              onClick={() => setActiveTab("schedules")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "schedules"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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

            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "gallery"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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

            <button
              onClick={() => setActiveTab("testimonials")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "testimonials"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
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

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Pengaturan Website</span>
            </button>
          </nav>
        </aside>

        {/* FULL-WIDTH BODY DISPLAY */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 w-full">
              {/* HERO BANNER CARD WITH GRADIENT BACKGROUND */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/60 via-slate-900 to-slate-900 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                
                <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Selamat Datang Kembali, {admin?.name}!</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Dashboard Pengelolaan {activeSchoolName}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    Kelola data pendaftaran PPDB, program pembelajaran, foto galeri, ulasan testimoni orang tua, dan profil website dalam satu pusat kontrol terpadu.
                  </p>
                </div>
              </div>

              {/* STAT CARDS FULL WIDTH GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
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
                            {item.school?.name || "DeKeraton"}
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
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
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
                        placeholder="TK Smart Kids Cikarang"
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
                        placeholder="cikarang"
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
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
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
                        placeholder="admin_dekeraton"
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
                      <select
                        value={editingAdminUser.role}
                        onChange={(e) =>
                          setEditingAdminUser({ ...editingAdminUser, role: e.target.value })
                        }
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="SUPER_ADMIN">👑 SUPER_ADMIN (Akses Semua Yayasan)</option>
                        <option value="SCHOOL_ADMIN">🏫 SCHOOL_ADMIN (Khusus Cabang)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                        Cabang Sekolah (Khusus School Admin)
                      </label>
                      <select
                        disabled={editingAdminUser.role === "SUPER_ADMIN"}
                        value={editingAdminUser.role === "SUPER_ADMIN" ? "ALL" : editingAdminUser.schoolId || ""}
                        onChange={(e) =>
                          setEditingAdminUser({ ...editingAdminUser, schoolId: e.target.value })
                        }
                        className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:border-purple-500 focus:outline-none disabled:opacity-50"
                      >
                        <option value="ALL">🏢 Semua Sekolah (Yayasan Level)</option>
                        {schoolsList.map((sch) => (
                          <option key={sch.id} value={sch.id}>
                            🏫 {sch.name}
                          </option>
                        ))}
                      </select>
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
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                userItem.role === "SUPER_ADMIN"
                                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              }`}
                            >
                              {userItem.role === "SUPER_ADMIN" ? "👑 SUPER ADMIN" : "🏫 SCHOOL ADMIN"}
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
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-bold hidden md:inline">Tampilkan:</span>
                    <select
                      value={ppdbItemsPerPage}
                      onChange={(e) => {
                        setPpdbItemsPerPage(Number(e.target.value));
                        setPpdbPage(1);
                      }}
                      className="bg-slate-900 border border-slate-700 text-xs text-white rounded-2xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-bold"
                    >
                      <option value={5}>5 / hlm</option>
                      <option value={10}>10 / hlm</option>
                      <option value={25}>25 / hlm</option>
                      <option value={50}>50 / hlm</option>
                    </select>
                  </div>

                  <select
                    value={ppdbStatusFilter}
                    onChange={(e) => {
                      setPpdbStatusFilter(e.target.value);
                      setPpdbPage(1);
                    }}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-2xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 font-bold"
                  >
                    <option value="ALL">Semua Status</option>
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>

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
                              {item.school?.name || "DeKeraton"}
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

                    {/* Dokumen Terunggah */}
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
                      <p className="font-bold text-amber-400 uppercase text-[10px] tracking-wider">
                        Dokumen & Berkas Terunggah
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {selectedPpdb.docKkUrl ? (
                          <a
                            href={selectedPpdb.docKkUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-emerald-400 font-bold flex items-center gap-1.5 transition-all text-[11px]"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span className="truncate">Kartu Keluarga</span>
                          </a>
                        ) : (
                          <span className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 text-[11px]">
                            KK: Belum ada
                          </span>
                        )}

                        {selectedPpdb.docAktaUrl ? (
                          <a
                            href={selectedPpdb.docAktaUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-emerald-400 font-bold flex items-center gap-1.5 transition-all text-[11px]"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span className="truncate">Akta Kelahiran</span>
                          </a>
                        ) : (
                          <span className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 text-[11px]">
                            Akta: Belum ada
                          </span>
                        )}

                        {selectedPpdb.docFotoUrl ? (
                          <a
                            href={selectedPpdb.docFotoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-emerald-400 font-bold flex items-center gap-1.5 transition-all text-[11px]"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span className="truncate">Foto Anak</span>
                          </a>
                        ) : (
                          <span className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 text-[11px]">
                            Foto: Belum ada
                          </span>
                        )}

                        {selectedPpdb.docKtpUrl ? (
                          <a
                            href={selectedPpdb.docKtpUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-emerald-400 font-bold flex items-center gap-1.5 transition-all text-[11px]"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span className="truncate">KTP Ortu</span>
                          </a>
                        ) : (
                          <span className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 text-[11px]">
                            KTP: Belum ada
                          </span>
                        )}

                        {selectedPpdb.buktiBayarUrl ? (
                          <a
                            href={selectedPpdb.buktiBayarUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-emerald-400 font-bold flex items-center gap-1.5 transition-all text-[11px]"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span className="truncate">Bukti Bayar</span>
                          </a>
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

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                      <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        {prog.school?.name}
                      </span>
                      <h3 className="font-extrabold text-lg text-white group-hover:text-emerald-400 transition-colors">{prog.title}</h3>
                      <span className="inline-block text-xs font-semibold text-slate-300 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                        {prog.ageRange}
                      </span>
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

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  const url = await uploadFile(file, "profile");
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
                        </div>

                        {teacher.bio && (
                          <p className="text-xs text-slate-300 italic bg-slate-950/80 p-3 rounded-2xl border border-slate-800 w-full">
                            &quot;{teacher.bio}&quot;
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                        <span className="text-slate-500 text-[11px]">Urutan: #{teacher.orderIndex}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingTeacher(teacher)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl"
                            title="Edit Data Guru"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTeacher(teacher.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl"
                            title="Hapus Guru"
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
                      attendanceRate: 95.0,
                      averageGrade: 88.5,
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
                <form onSubmit={handleSaveStudent} className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl w-full">
                  <h3 className="font-bold text-white text-base">{editingStudent.id ? "Edit Data Siswa" : "Tambah Siswa Baru"}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Nama Siswa</label>
                      <input type="text" required value={editingStudent.name} onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">NISN / No Induk</label>
                      <input type="text" required value={editingStudent.nisn} onChange={(e) => setEditingStudent({ ...editingStudent, nisn: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Kelas</label>
                      <input type="text" required value={editingStudent.className} onChange={(e) => setEditingStudent({ ...editingStudent, className: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Nama Orang Tua</label>
                      <input type="text" value={editingStudent.parentName} onChange={(e) => setEditingStudent({ ...editingStudent, parentName: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">No WhatsApp Ortu</label>
                      <input type="text" value={editingStudent.parentPhone} onChange={(e) => setEditingStudent({ ...editingStudent, parentPhone: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Jenis Kelamin</label>
                      <select value={editingStudent.gender} onChange={(e) => setEditingStudent({ ...editingStudent, gender: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white">
                        <option value="L">Laki-laki (L)</option>
                        <option value="P">Perempuan (P)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setEditingStudent(null)} className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl">Batal</button>
                    <button type="submit" disabled={saving} className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30">Simpan Siswa</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {studentsList.map((s) => (
                  <div key={s.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{s.name}</h4>
                        <p className="text-xs text-slate-400">{s.nisn} • <span className="text-emerald-400 font-semibold">{s.className}</span></p>
                        <p className="text-[11px] text-slate-500">Ortu: {s.parentName} ({s.parentPhone})</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingStudent(s)} className="p-2 bg-slate-800 text-slate-300 rounded-xl"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteStudent(s.id)} className="p-2 bg-red-500/10 text-red-400 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PRESENSI SISWA */}
          {activeTab === "attendance" && (
            <div className="space-y-6 w-full">
              <div className="border-b border-slate-800/80 pb-4">
                <h2 className="text-2xl font-black text-white tracking-tight">Presensi Siswa Harian</h2>
                <p className="text-xs text-slate-400">Catatan kehadiran murid (Hadir, Sakit, Izin, Alfa).</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {attendanceList.map((att) => (
                  <div key={att.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{att.studentName}</h4>
                      <p className="text-xs text-slate-400">{att.className} • Tanggal: {att.date}</p>
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

          {/* TAB: SPP & KEUANGAN */}
          {activeTab === "spp" && (
            <div className="space-y-6 w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">SPP & Catatan Keuangan</h2>
                  <p className="text-xs text-slate-400">Kelola status pembayaran SPP bulanan siswa.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingSpp({
                      studentName: studentsList[0]?.name || "Siswa Smart Kids",
                      nisn: studentsList[0]?.nisn || "123456789",
                      className: studentsList[0]?.className || "TK A",
                      month: "Juli 2026",
                      amount: 350000,
                      status: "lunas",
                      paymentDate: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
                    })
                  }
                  className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Catatan SPP</span>
                </button>
              </div>

              {editingSpp && (
                <form onSubmit={handleSaveSpp} className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl w-full">
                  <h3 className="font-bold text-white text-base">Tambah Pembayaran SPP</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Nama Siswa</label>
                      <input type="text" required value={editingSpp.studentName} onChange={(e) => setEditingSpp({ ...editingSpp, studentName: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Bulan SPP</label>
                      <input type="text" required value={editingSpp.month} onChange={(e) => setEditingSpp({ ...editingSpp, month: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Nominal (Rp)</label>
                      <input type="number" required value={editingSpp.amount} onChange={(e) => setEditingSpp({ ...editingSpp, amount: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setEditingSpp(null)} className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl">Batal</button>
                    <button type="submit" disabled={saving} className="px-6 py-2.5 bg-amber-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-600/30">Simpan SPP</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {sppList.map((spp) => (
                  <div key={spp.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{spp.studentName}</h4>
                      <p className="text-xs text-slate-400">{spp.month} • Rp {Number(spp.amount).toLocaleString("id-ID")}</p>
                      {spp.paymentDate && <p className="text-[11px] text-emerald-400">Bayar: {spp.paymentDate}</p>}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${spp.status === "lunas" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
                        {spp.status}
                      </span>
                      <button onClick={() => handleDeleteSpp(spp.id)} className="p-1.5 bg-red-500/10 text-red-400 rounded-xl"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PENGUMUMAN */}
          {activeTab === "announcements" && (
            <div className="space-y-6 w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Pengumuman Sekolah</h2>
                  <p className="text-xs text-slate-400">Terbitkan pengumuman resmi ke aplikasi mobile guru dan wali murid.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingAnnouncement({
                      title: "",
                      content: "",
                      targetRole: "Semua",
                      sender: "Pengelola Sekolah",
                      schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
                    })
                  }
                  className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buat Pengumuman</span>
                </button>
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
                      <select value={editingAnnouncement.targetRole} onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, targetRole: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white">
                        <option value="Semua">Semua (Guru & Ortu)</option>
                        <option value="Guru">Khusus Guru</option>
                        <option value="Siswa">Khusus Ortu/Siswa</option>
                      </select>
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
                      <button onClick={() => handleDeleteAnnouncement(ann.id)} className="p-1.5 bg-red-500/10 text-red-400 rounded-xl"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: IZIN & CUTI GURU */}
          {activeTab === "leave-requests" && (
            <div className="space-y-6 w-full">
              <div className="border-b border-slate-800/80 pb-4">
                <h2 className="text-2xl font-black text-white tracking-tight">Pengajuan Izin & Cuti Guru</h2>
                <p className="text-xs text-slate-400">Verifikasi dan beri persetujuan atas pengajuan izin/cuti dari guru.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {leaveRequestsList.map((leave) => (
                  <div key={leave.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-base">{leave.teacherName}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${leave.status === "disetujui" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : leave.status === "ditolak" ? "bg-red-500/20 text-red-300 border border-red-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`}>
                        {leave.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">Tipe: <span className="font-bold text-emerald-400 uppercase">{leave.type}</span> ({leave.startDate} - {leave.endDate})</p>
                    <p className="text-xs text-slate-400 italic bg-slate-950 p-3 rounded-2xl border border-slate-800">&quot;{leave.reason}&quot;</p>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                      <button onClick={() => handleUpdateLeaveStatus(leave.id, "disetujui")} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /><span>Setujui</span></button>
                      <button onClick={() => handleUpdateLeaveStatus(leave.id, "ditolak")} className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" /><span>Tolak</span></button>
                      <button onClick={() => handleDeleteLeaveRequest(leave.id)} className="p-2 bg-slate-800 text-slate-400 rounded-xl"><Trash2 className="w-3.5 h-3.5" /></button>
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
                  <p className="text-xs text-slate-400">Atur alokasi waktu dan materi pelajaran harian.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingSchedule({
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
              </div>

              {editingSchedule && (
                <form onSubmit={handleSaveSchedule} className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl w-full">
                  <h3 className="font-bold text-white text-base">Tambah Jadwal Pelajaran</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Waktu (Jam)</label>
                      <input type="text" required value={editingSchedule.timeRange} onChange={(e) => setEditingSchedule({ ...editingSchedule, timeRange: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Kelas</label>
                      <input type="text" required value={editingSchedule.className} onChange={(e) => setEditingSchedule({ ...editingSchedule, className: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Ruangan</label>
                      <input type="text" required value={editingSchedule.room} onChange={(e) => setEditingSchedule({ ...editingSchedule, room: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Materi / Subjek</label>
                      <input type="text" required value={editingSchedule.subject} onChange={(e) => setEditingSchedule({ ...editingSchedule, subject: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Aktivitas Belajar</label>
                      <input type="text" required value={editingSchedule.activities} onChange={(e) => setEditingSchedule({ ...editingSchedule, activities: e.target.value })} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
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
                  <div key={sch.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">{sch.timeRange}</span>
                        <span className="text-xs text-slate-400">{sch.className} • {sch.room}</span>
                      </div>
                      <h4 className="font-bold text-white text-base">{sch.subject}</h4>
                      <p className="text-xs text-slate-400">{sch.activities}</p>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                      <button onClick={() => handleDeleteSchedule(sch.id)} className="p-2 bg-red-500/10 text-red-400 rounded-xl"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
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
                  Unggah gambar dokumentasi kegiatan sekolah. (Folder storage: uploads/)
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
                      Pilih File Gambar (uploads/)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const url = await uploadFile(file, "uploads");
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
                    <div className="relative h-44 w-full bg-slate-950">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
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
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
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
                      initials: "BE",
                      content: "",
                      rating: 5,
                      bgColor: "emerald",
                      schoolId: selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id,
                    })
                  }
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Testimoni</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                {testimonialsList.map((testi) => (
                  <div
                    key={testi.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3 flex flex-col justify-between shadow-xl"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-white text-sm">{testi.parentName}</h4>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {testi.school?.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 italic leading-relaxed">&quot;{testi.content}&quot;</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => handleDeleteTestimonial(testi.id)}
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
                    <select
                      value={siteProfile.schoolId || (selectedSchoolId !== "ALL" ? selectedSchoolId : schoolsList[0]?.id)}
                      onChange={(e) =>
                        setSiteProfile({ ...siteProfile, schoolId: e.target.value })
                      }
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white font-bold focus:border-emerald-500 focus:outline-none"
                    >
                      {schoolsList.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.code})
                        </option>
                      ))}
                    </select>
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
                    className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center gap-2"
                  >
                    {saving ? "Menyimpan..." : "Simpan Pengaturan Cabang"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
