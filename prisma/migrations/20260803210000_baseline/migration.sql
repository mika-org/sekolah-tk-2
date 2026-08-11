-- CreateTable
CREATE TABLE "biaya_tambahan" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT,
    "id_siswa" TEXT,
    "nama_siswa" TEXT NOT NULL,
    "nisn" TEXT,
    "nama_kelas" TEXT,
    "nama_biaya" TEXT NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'belum_lunas',
    "tanggal_pembayaran" TEXT,
    "tenggat_waktu" TEXT,
    "url_bukti_bayar" TEXT,
    "metode_pembayaran" TEXT DEFAULT 'TRANSFER',
    "catatan" TEXT,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "biaya_tambahan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capaian_progresif_guru" (
    "id" TEXT NOT NULL,
    "id_guru" TEXT,
    "nama_guru" TEXT NOT NULL,
    "id_sekolah" TEXT,
    "bulan" TEXT NOT NULL,
    "judul_program" TEXT NOT NULL,
    "jam_mengajar" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "target_jam" DOUBLE PRECISION NOT NULL DEFAULT 40.0,
    "persentase_capaian" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "jumlah_siswa_dievaluasi" INTEGER NOT NULL DEFAULT 0,
    "poin_progresif" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "catatan_capaian" TEXT,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capaian_progresif_guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catatan_nilai_harian" (
    "id" TEXT NOT NULL,
    "id_siswa" TEXT NOT NULL,
    "mata_pelajaran" TEXT NOT NULL DEFAULT 'Moral & Agama',
    "nilai" DOUBLE PRECISION NOT NULL DEFAULT 85.0,
    "tanggal" TEXT NOT NULL,
    "catatan" TEXT,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "catatan_nilai_harian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catatan_spp" (
    "id" TEXT NOT NULL,
    "id_siswa" TEXT,
    "nama_siswa" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "nama_kelas" TEXT NOT NULL,
    "bulan" TEXT NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL DEFAULT 350000,
    "status" TEXT NOT NULL DEFAULT 'lunas',
    "tanggal_pembayaran" TEXT,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "catatan" TEXT,
    "metode_pembayaran" TEXT DEFAULT 'TRANSFER',
    "url_bukti_bayar" TEXT,

    CONSTRAINT "catatan_spp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guru" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT NOT NULL,
    "id_kelas" TEXT,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "kelas_ditugaskan" TEXT,
    "kode_qr" TEXT,
    "url_foto" TEXT NOT NULL DEFAULT '/images/teacher_default.png',
    "bio" TEXT,
    "pendidikan" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "telepon" TEXT,

    CONSTRAINT "guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_galeri" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "url_gambar" TEXT NOT NULL,
    "folder" TEXT NOT NULL DEFAULT 'uploads',
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jadwal_kbm" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT NOT NULL,
    "id_kelas" TEXT,
    "rentang_waktu" TEXT NOT NULL,
    "nama_kelas" TEXT NOT NULL,
    "ruangan" TEXT NOT NULL,
    "mata_pelajaran" TEXT NOT NULL,
    "aktivitas" TEXT NOT NULL,
    "selesai" BOOLEAN NOT NULL DEFAULT false,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,
    "tanggal" TEXT DEFAULT '2026-07-27',

    CONSTRAINT "jadwal_kbm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kelas" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT NOT NULL,
    "nama_kelas" TEXT NOT NULL,
    "tingkat" TEXT NOT NULL DEFAULT 'TK A',
    "tahun_ajaran" TEXT NOT NULL DEFAULT '2026/2027',
    "kapasitas" INTEGER NOT NULL DEFAULT 20,
    "id_guru_wali" TEXT,
    "nama_guru_wali" TEXT,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_unggahan" (
    "id" TEXT NOT NULL,
    "nama_berkas" TEXT NOT NULL,
    "folder_berkas" TEXT NOT NULL,
    "url_berkas" TEXT NOT NULL,
    "ukuran_berkas" INTEGER,
    "tipe_mime" TEXT,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_unggahan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendaftaran_ppdb" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT NOT NULL,
    "nomor_pendaftaran" TEXT NOT NULL,
    "nama_anak" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "tempat_lahir" TEXT NOT NULL,
    "tanggal_lahir" TEXT NOT NULL,
    "usia_anak" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "nama_ortu" TEXT NOT NULL,
    "no_whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "alamat_rumah" TEXT NOT NULL,
    "url_doc_kk" TEXT,
    "url_doc_akta" TEXT,
    "url_doc_foto" TEXT,
    "url_doc_ktp" TEXT,
    "url_bukti_bayar" TEXT,
    "metode_pembayaran" TEXT NOT NULL DEFAULT 'bank',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,
    "jumlah_spp" DOUBLE PRECISION DEFAULT 200000,
    "item_terpilih" TEXT,
    "total_biaya" DOUBLE PRECISION DEFAULT 200000,

    CONSTRAINT "pendaftaran_ppdb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengajuan_cuti" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT,
    "nama_guru" TEXT NOT NULL,
    "jenis" TEXT NOT NULL DEFAULT 'izin',
    "tanggal_mulai" TEXT NOT NULL,
    "tanggal_selesai" TEXT NOT NULL,
    "alasan" TEXT NOT NULL,
    "lampiran" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengajuan_cuti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengguna_admin" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT,
    "nama_pengguna" TEXT NOT NULL,
    "kata_sandi_hash" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "peran" TEXT NOT NULL DEFAULT 'SUPER_ADMIN',
    "kelas_ditugaskan" TEXT,
    "id_kelas" TEXT,
    "telepon" TEXT,
    "email" TEXT,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengguna_admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumuman" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "target_peran" TEXT NOT NULL DEFAULT 'Semua',
    "pengirim" TEXT NOT NULL DEFAULT 'Pengelola Sekolah',
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presensi_guru" (
    "id" TEXT NOT NULL,
    "id_guru" TEXT NOT NULL,
    "nama_guru" TEXT NOT NULL,
    "id_sekolah" TEXT,
    "nama_kelas" TEXT,
    "status" TEXT NOT NULL DEFAULT 'hadir',
    "waktu" TEXT,
    "alasan" TEXT,
    "tanggal" TEXT NOT NULL,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "presensi_guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presensi_siswa" (
    "id" TEXT NOT NULL,
    "id_siswa" TEXT NOT NULL,
    "nama_siswa" TEXT NOT NULL,
    "nama_kelas" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'hadir',
    "waktu" TEXT,
    "alasan" TEXT,
    "tanggal" TEXT NOT NULL,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "presensi_siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profil_situs" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT NOT NULL,
    "lencana_pahlawan" TEXT NOT NULL DEFAULT 'Pendaftaran PPDB 2026/2027 Telah Dibuka!',
    "judul_pahlawan" TEXT NOT NULL DEFAULT 'Belajar Seru, Tumbuh Bahagia',
    "subjudul_pahlawan" TEXT NOT NULL DEFAULT 'Bimbingan belajar untuk anak usia 3-8 tahun dengan metode bermain sambil belajar yang menyenangkan',
    "url_maskot_pahlawan" TEXT NOT NULL DEFAULT '/images/owl_mascot.png',
    "judul_panggilan_aksi" TEXT NOT NULL DEFAULT 'Yuk, Daftarkan Si Kecil Sekarang!',
    "subjudul_panggilan_aksi" TEXT NOT NULL DEFAULT 'Bergabunglah bersama Smart Kids dan berikan pengalaman belajar terbaik untuk masa depan cerah mereka',
    "telepon" TEXT NOT NULL DEFAULT '0812 3456 7890',
    "instagram" TEXT NOT NULL DEFAULT 'smartkids',
    "facebook" TEXT NOT NULL DEFAULT 'Smart Kids',
    "alamat" TEXT DEFAULT 'DeKeraton, Karawang',
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,
    "url_gambar_qris" TEXT DEFAULT '/images/qris_default.png',

    CONSTRAINT "profil_situs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "rentang_usia" TEXT NOT NULL,
    "url_ikon" TEXT NOT NULL,
    "fitur" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,
    "jumlah_spp" DOUBLE PRECISION NOT NULL DEFAULT 200000,

    CONSTRAINT "program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rekening_bank" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT,
    "nama_bank" TEXT NOT NULL,
    "nomor_rekening" TEXT NOT NULL,
    "atas_nama" TEXT NOT NULL,
    "url_logo_bank" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rekening_bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sekolah" (
    "id" TEXT NOT NULL,
    "id_yayasan" TEXT NOT NULL DEFAULT 'default',
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenjang" TEXT NOT NULL DEFAULT 'TK',
    "alamat" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "logo_url" TEXT DEFAULT '/images/smart_kids_logo.png',
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sekolah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "siswa" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT NOT NULL,
    "id_kelas" TEXT,
    "nama" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "nama_pengguna" TEXT,
    "kata_sandi_hash" TEXT,
    "nama_kelas" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL DEFAULT 'L',
    "kode_qr" TEXT,
    "url_avatar" TEXT NOT NULL DEFAULT 'https://i.pravatar.cc/150',
    "tempat_tanggal_lahir" TEXT NOT NULL,
    "nama_orang_tua" TEXT NOT NULL,
    "telepon_orang_tua" TEXT NOT NULL,
    "email_orang_tua" TEXT,
    "alamat" TEXT NOT NULL,
    "persentase_kehadiran" DOUBLE PRECISION NOT NULL DEFAULT 95.0,
    "rata_rata_nilai" DOUBLE PRECISION NOT NULL DEFAULT 88.5,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,
    "bobot_harian" DOUBLE PRECISION NOT NULL DEFAULT 40.0,
    "bobot_semester" DOUBLE PRECISION NOT NULL DEFAULT 40.0,
    "nilai_harian" DOUBLE PRECISION NOT NULL DEFAULT 85.0,
    "nilai_semester" DOUBLE PRECISION NOT NULL DEFAULT 90.0,
    "bobot_kehadiran" DOUBLE PRECISION NOT NULL DEFAULT 20.0,

    CONSTRAINT "siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimoni" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT NOT NULL,
    "nama_orang_tua" TEXT NOT NULL,
    "peran" TEXT NOT NULL DEFAULT 'Orang Tua Siswa',
    "inisial" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "penilaian" INTEGER NOT NULL DEFAULT 5,
    "warna_latar" TEXT NOT NULL DEFAULT 'emerald',
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testimoni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yayasan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL DEFAULT 'YAPCHI Foundation',
    "tagline" TEXT NOT NULL DEFAULT 'Yayasan Pendidikan Anak Indonesia',
    "logo_url" TEXT DEFAULT '/images/yapchi_logo.png',
    "telepon" TEXT DEFAULT '0812 3456 7890',
    "email" TEXT DEFAULT 'info@yapchi.or.id',
    "alamat" TEXT DEFAULT 'Jl. Raya DeKeraton No. 1, Karawang',
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "yayasan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pendaftaran_ppdb_nomor_pendaftaran_key" ON "pendaftaran_ppdb"("nomor_pendaftaran" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "pengguna_admin_nama_pengguna_key" ON "pengguna_admin"("nama_pengguna" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "profil_situs_id_sekolah_key" ON "profil_situs"("id_sekolah" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "sekolah_kode_key" ON "sekolah"("kode" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "siswa_nama_pengguna_key" ON "siswa"("nama_pengguna" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "siswa_nisn_key" ON "siswa"("nisn" ASC);

-- AddForeignKey
ALTER TABLE "biaya_tambahan" ADD CONSTRAINT "biaya_tambahan_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "biaya_tambahan" ADD CONSTRAINT "biaya_tambahan_id_siswa_fkey" FOREIGN KEY ("id_siswa") REFERENCES "siswa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catatan_nilai_harian" ADD CONSTRAINT "catatan_nilai_harian_id_siswa_fkey" FOREIGN KEY ("id_siswa") REFERENCES "siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catatan_spp" ADD CONSTRAINT "catatan_spp_id_siswa_fkey" FOREIGN KEY ("id_siswa") REFERENCES "siswa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guru" ADD CONSTRAINT "guru_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "kelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guru" ADD CONSTRAINT "guru_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_galeri" ADD CONSTRAINT "item_galeri_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_kbm" ADD CONSTRAINT "jadwal_kbm_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "kelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_kbm" ADD CONSTRAINT "jadwal_kbm_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kelas" ADD CONSTRAINT "kelas_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran_ppdb" ADD CONSTRAINT "pendaftaran_ppdb_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengajuan_cuti" ADD CONSTRAINT "pengajuan_cuti_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengguna_admin" ADD CONSTRAINT "pengguna_admin_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman" ADD CONSTRAINT "pengumuman_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presensi_siswa" ADD CONSTRAINT "presensi_siswa_id_siswa_fkey" FOREIGN KEY ("id_siswa") REFERENCES "siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profil_situs" ADD CONSTRAINT "profil_situs_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program" ADD CONSTRAINT "program_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rekening_bank" ADD CONSTRAINT "rekening_bank_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sekolah" ADD CONSTRAINT "sekolah_id_yayasan_fkey" FOREIGN KEY ("id_yayasan") REFERENCES "yayasan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "siswa" ADD CONSTRAINT "siswa_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "kelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "siswa" ADD CONSTRAINT "siswa_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimoni" ADD CONSTRAINT "testimoni_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;
