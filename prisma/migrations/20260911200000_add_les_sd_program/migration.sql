-- Migration: add_les_sd_program
-- Description: Migrasi tabel pendaftaran dan pembayaran SPP Les SD serta penambahan data program Les SD.

-- 1. Create table pendaftaran_les_sd
CREATE TABLE IF NOT EXISTS "pendaftaran_les_sd" (
    "id" TEXT NOT NULL,
    "id_sekolah" TEXT NOT NULL,
    "nomor_pendaftaran" TEXT NOT NULL,
    "nama_siswa" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL DEFAULT 'L',
    "kelas_sd" TEXT NOT NULL DEFAULT 'Kelas 1 SD',
    "sekolah_asal" TEXT,
    "nama_orang_tua" TEXT NOT NULL,
    "telepon_orang_tua" TEXT NOT NULL,
    "email_orang_tua" TEXT,
    "alamat" TEXT,
    "paket_program" TEXT NOT NULL DEFAULT '1 Minggu 3x Pertemuan - Semua Mata Pelajaran',
    "hari_jadwal" TEXT DEFAULT 'Senin, Rabu, Jumat',
    "waktu_jadwal" TEXT DEFAULT '14:00 - 15:30 WIB',
    "jumlah_spp" DOUBLE PRECISION NOT NULL DEFAULT 200000,
    "id_guru_pic" TEXT,
    "nama_guru_pic" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "catatan" TEXT,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pendaftaran_les_sd_pkey" PRIMARY KEY ("id")
);

-- 2. Create table pembayaran_spp_les_sd
CREATE TABLE IF NOT EXISTS "pembayaran_spp_les_sd" (
    "id" TEXT NOT NULL,
    "id_pendaftaran_les" TEXT NOT NULL,
    "nama_siswa" TEXT NOT NULL,
    "bulan" TEXT NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL DEFAULT 200000,
    "status" TEXT NOT NULL DEFAULT 'menunggu_konfirmasi',
    "tanggal_pembayaran" TEXT,
    "metode_pembayaran" TEXT DEFAULT 'TRANSFER',
    "url_bukti_bayar" TEXT,
    "nama_bank" TEXT,
    "catatan" TEXT,
    "diverifikasi_oleh" TEXT,
    "diverifikasi_pada" TIMESTAMP(3),
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pembayaran_spp_les_sd_pkey" PRIMARY KEY ("id")
);

-- 3. Create Unique Index on nomor_pendaftaran
CREATE UNIQUE INDEX IF NOT EXISTS "pendaftaran_les_sd_nomor_pendaftaran_key" ON "pendaftaran_les_sd"("nomor_pendaftaran");

-- 4. Safe Foreign Keys setup
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pendaftaran_les_sd_id_sekolah_fkey') THEN
    ALTER TABLE "pendaftaran_les_sd" ADD CONSTRAINT "pendaftaran_les_sd_id_sekolah_fkey"
      FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pendaftaran_les_sd_id_guru_pic_fkey') THEN
    ALTER TABLE "pendaftaran_les_sd" ADD CONSTRAINT "pendaftaran_les_sd_id_guru_pic_fkey"
      FOREIGN KEY ("id_guru_pic") REFERENCES "guru"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pembayaran_spp_les_sd_id_pendaftaran_les_fkey') THEN
    ALTER TABLE "pembayaran_spp_les_sd" ADD CONSTRAINT "pembayaran_spp_les_sd_id_pendaftaran_les_fkey"
      FOREIGN KEY ("id_pendaftaran_les") REFERENCES "pendaftaran_les_sd"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- 5. Insert Program Data for "LES SD" for every school if not exists
INSERT INTO "program" (
  "id", "id_sekolah", "judul", "rentang_usia", "url_ikon", "fitur", "jumlah_spp", "urutan", "dibuat_pada", "diperbarui_pada"
)
SELECT
  md5(s."id" || ':program:les_sd'),
  s."id",
  'LES SD',
  '1 Minggu 3X Pertemuan (Semua Mata Pelajaran)',
  '/images/program_kindergarten.png',
  '["1 Minggu 3x Pertemuan","Semua Mata Pelajaran SD","SPP Perbulan Rp 200.000","Bimbingan Guru PIC Berpengalaman"]',
  200000,
  5,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "sekolah" s
WHERE NOT EXISTS (
  SELECT 1 FROM "program" p WHERE p."id_sekolah" = s."id" AND UPPER(p."judul") = 'LES SD'
);

-- 6. Ensure the 7 PPDB Fee Components match the official packages
INSERT INTO "komponen_biaya" (
  "id", "id_sekolah", "kode", "nama", "kategori", "deskripsi", "jumlah", "wajib", "aktif", "urutan", "dibuat_pada", "diperbarui_pada"
)
SELECT
  md5(s."id" || ':komponen_biaya:' || defaults."kode"),
  s."id",
  defaults."kode",
  defaults."nama",
  'PPDB',
  defaults."deskripsi",
  defaults."jumlah",
  defaults."wajib",
  true,
  defaults."urutan",
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "sekolah" s
CROSS JOIN (
  VALUES
    ('pendaftaran', 'Biaya Pendaftaran', 'Biaya pendaftaran dan administrasi utama', 200000::double precision, true, 10),
    ('seragam_kuning', 'Seragam Kuning', 'Stelan seragam khas kuning Smart Kids', 150000::double precision, false, 20),
    ('seragam_abu_abu', 'Seragam Abu-abu', 'Stelan seragam formal abu-abu', 170000::double precision, false, 30),
    ('seragam_olahraga', 'Seragam Olahraga', 'Stelan kaos dan celana olahraga', 130000::double precision, false, 40),
    ('raport', 'Raport', 'Buku laporan hasil capaian belajar anak', 50000::double precision, false, 50),
    ('buku_penghubung', 'Buku Penghubung', 'Buku komunikasi harian orang tua dan guru', 15000::double precision, true, 60),
    ('spp_bulan_pertama', 'SPP S-3', 'spp bulan pertama', 200000::double precision, true, 70)
) AS defaults("kode", "nama", "deskripsi", "jumlah", "wajib", "urutan")
ON CONFLICT ("id_sekolah", "kode") DO UPDATE
SET
  "nama" = EXCLUDED."nama",
  "deskripsi" = EXCLUDED."deskripsi",
  "jumlah" = EXCLUDED."jumlah",
  "wajib" = EXCLUDED."wajib",
  "aktif" = true,
  "urutan" = EXCLUDED."urutan",
  "diperbarui_pada" = CURRENT_TIMESTAMP;

