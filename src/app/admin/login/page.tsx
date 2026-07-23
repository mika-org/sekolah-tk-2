"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, User, LogIn, AlertCircle, Eye, EyeOff, KeyRound, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUsername, password: cleanPassword }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login gagal");
      }

      // Perform full location replace/assign to ensure fresh cookies in Next.js App Router
      window.location.href = "/admin/dashboard";
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat login");
      setLoading(false);
    }
  };

  const handleQuickFill = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10">
        {/* Header Branding */}
        <div className="text-center space-y-3 mb-6">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-slate-700/50 rounded-2xl p-2 border border-slate-600 shadow-inner">
            <Image
              src="/images/smart_kids_logo.png"
              alt="Smart Kids Logo"
              width={70}
              height={70}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Dashboard Admin CMS
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Masuk untuk mengelola data sekolah, program, & pendaftaran PPDB TK Smart Kids
          </p>
        </div>

        {error && (
          <div className="mb-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Username / Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username atau Email"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan kata sandi"
                className="w-full pl-10 pr-10 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                title={showPassword ? "Sembunyikan Password" : "Tampilkan Password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>Memproses...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Masuk Ke Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Accounts Selection */}
        <div className="mt-6 pt-5 border-t border-slate-700/60">
          <div className="flex items-center gap-1.5 mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
            <span>Akun Uji Coba (Demo Quick Login)</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickFill("admin", "admin123")}
              className="p-2.5 bg-slate-900/60 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500/50 rounded-xl text-left transition-all group"
            >
              <div className="font-bold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Super Admin
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">admin / admin123</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill("admin_dekeraton", "admin123")}
              className="p-2.5 bg-slate-900/60 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500/50 rounded-xl text-left transition-all group"
            >
              <div className="font-bold text-blue-400 group-hover:text-blue-300">
                Admin Cabang
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">admin_dekeraton / admin123</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill("guru_dekeraton", "guru123")}
              className="p-2.5 bg-slate-900/60 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500/50 rounded-xl text-left transition-all group"
            >
              <div className="font-bold text-amber-400 group-hover:text-amber-300">
                Guru / Pengajar
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">guru_dekeraton / guru123</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill("ortu_rizky", "ortu123")}
              className="p-2.5 bg-slate-900/60 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500/50 rounded-xl text-left transition-all group"
            >
              <div className="font-bold text-purple-400 group-hover:text-purple-300">
                Orang Tua Siswa
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">ortu_rizky / ortu123</div>
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700/40 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TK Smart Kids DeKeraton CMS</p>
        </div>
      </div>
    </div>
  );
}

