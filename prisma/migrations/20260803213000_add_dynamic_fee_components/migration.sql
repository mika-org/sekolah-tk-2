-- Additive migration for dynamic PPDB and additional fee components.
-- No existing table or row is dropped by this migration.

ALTER TABLE "profil_situs"
  ADD COLUMN IF NOT EXISTS "url_gambar_qris" TEXT DEFAULT '/images/qris_default.png';

ALTER TABLE "pendaftaran_ppdb"
  ADD COLUMN IF NOT EXISTS "item_terpilih" TEXT,
  ADD COLUMN IF NOT EXISTS "total_biaya" DOUBLE PRECISION DEFAULT 200000;

CREATE TABLE IF NOT EXISTS "rekening_bank" (
  "id" TEXT NOT NULL,
  "id_sekolah" TEXT,
  "nama_bank" TEXT NOT NULL,
  "nomor_rekening" TEXT NOT NULL,
  "atas_nama" TEXT NOT NULL,
  "url_logo_bank" TEXT,
  "aktif" BOOLEAN NOT NULL DEFAULT true,
  "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "diperbarui_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "rekening_bank_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "komponen_biaya" (
  "id" TEXT NOT NULL,
  "id_sekolah" TEXT NOT NULL,
  "kode" TEXT NOT NULL,
  "nama" TEXT NOT NULL,
  "kategori" TEXT NOT NULL,
  "deskripsi" TEXT,
  "jumlah" DOUBLE PRECISION NOT NULL,
  "wajib" BOOLEAN NOT NULL DEFAULT false,
  "aktif" BOOLEAN NOT NULL DEFAULT true,
  "urutan" INTEGER NOT NULL DEFAULT 0,
  "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "diperbarui_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "komponen_biaya_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "komponen_biaya_id_sekolah_kode_key"
  ON "komponen_biaya"("id_sekolah", "kode");
CREATE INDEX IF NOT EXISTS "komponen_biaya_id_sekolah_kategori_aktif_idx"
  ON "komponen_biaya"("id_sekolah", "kategori", "aktif");

CREATE TABLE IF NOT EXISTS "pilihan_biaya_ppdb" (
  "id" TEXT NOT NULL,
  "id_pendaftaran" TEXT NOT NULL,
  "id_komponen_biaya" TEXT,
  "kode_komponen" TEXT NOT NULL,
  "nama_komponen" TEXT NOT NULL,
  "jumlah" DOUBLE PRECISION NOT NULL,
  "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "pilihan_biaya_ppdb_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "pilihan_biaya_ppdb_id_pendaftaran_kode_komponen_key"
  ON "pilihan_biaya_ppdb"("id_pendaftaran", "kode_komponen");
CREATE INDEX IF NOT EXISTS "pilihan_biaya_ppdb_id_pendaftaran_idx"
  ON "pilihan_biaya_ppdb"("id_pendaftaran");
CREATE INDEX IF NOT EXISTS "pilihan_biaya_ppdb_id_komponen_biaya_idx"
  ON "pilihan_biaya_ppdb"("id_komponen_biaya");

CREATE TABLE IF NOT EXISTS "biaya_tambahan" (
  "id" TEXT NOT NULL,
  "id_sekolah" TEXT,
  "id_siswa" TEXT,
  "id_komponen_biaya" TEXT,
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
  "diperbarui_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "biaya_tambahan_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "biaya_tambahan"
  ADD COLUMN IF NOT EXISTS "id_komponen_biaya" TEXT;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'rekening_bank_id_sekolah_fkey') THEN
    ALTER TABLE "rekening_bank" ADD CONSTRAINT "rekening_bank_id_sekolah_fkey"
      FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'komponen_biaya_id_sekolah_fkey') THEN
    ALTER TABLE "komponen_biaya" ADD CONSTRAINT "komponen_biaya_id_sekolah_fkey"
      FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pilihan_biaya_ppdb_id_pendaftaran_fkey') THEN
    ALTER TABLE "pilihan_biaya_ppdb" ADD CONSTRAINT "pilihan_biaya_ppdb_id_pendaftaran_fkey"
      FOREIGN KEY ("id_pendaftaran") REFERENCES "pendaftaran_ppdb"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pilihan_biaya_ppdb_id_komponen_biaya_fkey') THEN
    ALTER TABLE "pilihan_biaya_ppdb" ADD CONSTRAINT "pilihan_biaya_ppdb_id_komponen_biaya_fkey"
      FOREIGN KEY ("id_komponen_biaya") REFERENCES "komponen_biaya"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'biaya_tambahan_id_sekolah_fkey') THEN
    ALTER TABLE "biaya_tambahan" ADD CONSTRAINT "biaya_tambahan_id_sekolah_fkey"
      FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'biaya_tambahan_id_siswa_fkey') THEN
    ALTER TABLE "biaya_tambahan" ADD CONSTRAINT "biaya_tambahan_id_siswa_fkey"
      FOREIGN KEY ("id_siswa") REFERENCES "siswa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'biaya_tambahan_id_komponen_biaya_fkey') THEN
    ALTER TABLE "biaya_tambahan" ADD CONSTRAINT "biaya_tambahan_id_komponen_biaya_fkey"
      FOREIGN KEY ("id_komponen_biaya") REFERENCES "komponen_biaya"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

INSERT INTO "komponen_biaya" (
  "id", "id_sekolah", "kode", "nama", "kategori", "deskripsi",
  "jumlah", "wajib", "aktif", "urutan", "dibuat_pada", "diperbarui_pada"
)
SELECT
  md5(sekolah."id" || ':komponen_biaya:' || defaults."kode"),
  sekolah."id",
  defaults."kode",
  defaults."nama",
  defaults."kategori",
  defaults."deskripsi",
  defaults."jumlah",
  false,
  true,
  defaults."urutan",
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "sekolah"
CROSS JOIN (
  VALUES
    ('pendaftaran', 'Biaya Pendaftaran', 'PPDB', 'Biaya pendaftaran dan administrasi utama', 200000::double precision, 10),
    ('seragam_kuning', 'Seragam Kuning', 'PPDB', 'Stelan seragam khas kuning Smart Kids', 150000::double precision, 20),
    ('seragam_abu_abu', 'Seragam Abu-abu', 'PPDB', 'Stelan seragam formal abu-abu', 170000::double precision, 30),
    ('seragam_olahraga', 'Seragam Olahraga', 'PPDB', 'Stelan kaos dan celana olahraga', 130000::double precision, 40),
    ('raport', 'Raport', 'PPDB', 'Buku laporan hasil capaian belajar anak', 50000::double precision, 50),
    ('buku_penghubung', 'Buku Penghubung', 'PPDB', 'Buku komunikasi harian orang tua dan guru', 15000::double precision, 60),
    ('edukasi', 'Biaya Edukasi', 'ADDITIONAL', 'Tagihan edukasi di luar SPP bulanan', 900000::double precision, 110),
    ('wisuda', 'Biaya Wisuda', 'ADDITIONAL', 'Tagihan kegiatan wisuda', 850000::double precision, 120),
    ('agustusan', 'Biaya Agustusan', 'ADDITIONAL', 'Tagihan kegiatan Agustusan', 75000::double precision, 130),
    ('cooking_class', 'Biaya Cooking Class', 'ADDITIONAL', 'Tagihan kegiatan cooking class', 250000::double precision, 140),
    ('sertifikat_tes_tahap', 'Biaya Sertifikat Tes Tahap', 'ADDITIONAL', 'Tagihan sertifikat tes tahap', 25000::double precision, 150)
) AS defaults("kode", "nama", "kategori", "deskripsi", "jumlah", "urutan")
ON CONFLICT ("id_sekolah", "kode") DO NOTHING;

-- Link legacy additional-fee rows to their matching master without changing snapshots.
UPDATE "biaya_tambahan" AS biaya
SET "id_komponen_biaya" = komponen."id"
FROM "komponen_biaya" AS komponen
WHERE biaya."id_komponen_biaya" IS NULL
  AND biaya."id_sekolah" = komponen."id_sekolah"
  AND biaya."nama_biaya" = komponen."nama"
  AND komponen."kategori" = 'ADDITIONAL';
