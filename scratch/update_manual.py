# -*- coding: utf-8 -*-
import sys

with open('scratch/generate_full_manual.py', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update TOC to include BAB 8
old_toc_snippet = '''        ("BAB 7", "TANYA JAWAB (FAQ) & PEMECAHAN MASALAH", "Panduan pemulihan akun, troubleshooting upload berkas 1 MB, pemindai kamera QR, konfirmasi pembayaran")
    ]'''

new_toc_snippet = '''        ("BAB 7", "TANYA JAWAB (FAQ) & PEMECAHAN MASALAH", "Panduan pemulihan akun, troubleshooting upload berkas 1 MB, pemindai kamera QR, konfirmasi pembayaran"),
        ("BAB 8", "LAMPIRAN SOP & DAFTAR PERIKSA OPERASIONAL", "SOP PPDB, siklus penagihan SPP, presensi QR, penilaian rapor PAUD, checklist rutin admin/guru, glosarium teknis")
    ]'''

if old_toc_snippet in content:
    content = content.replace(old_toc_snippet, new_toc_snippet, 1)
    print("TOC updated with BAB 8")
else:
    print("WARNING: old_toc_snippet not found!")

# 2. Add page breaks before headings
headings_to_break = [
    '    b.add_heading_1("RINGKASAN DAFTAR ISI")',
    '    b.add_heading_1("BAB 1: PENGENALAN SISTEM & ARSITEKTUR MULTI-SEKOLAH")',
    '    b.add_heading_1("BAB 2: PORTAL PUBLIK & PENDAFTARAN ONLINE")',
    '    b.add_heading_1("BAB 3: PANDUAN AUTENTIKASI & KEAMANAN AKUN")',
    '    b.add_heading_1("BAB 4: PANDUAN LENGKAP PENGELOLA (SUPER ADMIN & ADMIN CABANG)")',
    '    b.add_heading_1("BAB 5: PANDUAN GURU / TENAGA PENDIDIK")',
    '    b.add_heading_1("BAB 6: PANDUAN ORANG TUA / WALI MURID")',
    '    b.add_heading_1("BAB 7: TANYA JAWAB (FAQ) & PANDUAN PEMECAHAN MASALAH")',
]

for h in headings_to_break:
    if f"    b.add_page_break()\n{h}" not in content and h in content:
        content = content.replace(h, f"    b.add_page_break()\n{h}", 1)
        print(f"Added page break before: {h.strip()}")

# 3. Add BAB 8 before output_filename = "Buku_Manual_Panduan_Sistem_Smart_Kids.docx"
bab8_content = '''
    # =========================================================================
    # BAB 8: LAMPIRAN STANDAR OPERASIONAL PROSEDUR (SOP) & DAFTAR PERIKSA
    # =========================================================================
    b.add_page_break()
    b.add_heading_1("BAB 8: LAMPIRAN STANDAR OPERASIONAL PROSEDUR (SOP) & DAFTAR PERIKSA")
    b.add_paragraph(
        "Bab penutup ini memuat protokol operasional standar (SOP), jadwal siklus administrasi, "
        "daftar periksa kepatuhan kerja harian/bulanan bagi administrator maupun guru, serta glosarium terminologi sistem Smart Kids."
    )

    b.add_heading_2("8.1 SOP Alur Penerimaan Peserta Didik Baru (PPDB) Online & Verifikasi")
    b.add_paragraph(
        "Standar operasional prosedur pengelolaan pendaftaran siswa baru dirancang untuk menjamin kecepatan layanan serta validitas dokumen calon peserta didik:"
    )
    ppdb_sop_data = [
        ("Tahap 1", "Pengisian Formulir Online", "Calon Wali Murid", "Melengkapi biodata siswa, data orang tua, mengunggah KK, Akta Kelahiran, Pas Foto, serta bukti transfer biaya formulir.", "Maks. 1x24 jam sejak draf dibuat"),
        ("Tahap 2", "Verifikasi Berkas Dokumen", "Admin Cabang", "Memeriksa keterbacaan berkas KK/Akta, kecocokan NIK, validasi transfer ke rekening yayasan, dan cek komponen biaya.", "Maks. 2x24 jam kerja"),
        ("Tahap 3", "Penetapan Status PPDB", "Admin Cabang", "Mengubah status pendaftaran menjadi 'Diterima' atau 'Ditolak' disertai catatan perbaikan jika dokumen buram.", "Seketika verifikasi selesai"),
        ("Tahap 4", "Pengiriman Akun Otomatis", "Sistem / Admin", "Menekan tombol 'Kirim Akun WhatsApp' untuk mengirim kredensial (NISN & password sementara) langsung ke WA orang tua.", "Maks. 1 jam setelah berstatus Diterima"),
        ("Tahap 5", "Plotting Rombel Siswa", "Admin Cabang", "Menempatkan siswa baru yang diterima ke dalam rombongan belajar (kelas) yang sesuai pada menu 'Master Kelas & Plotting'.", "H-7 sebelum tahun ajaran baru dimulai")
    ]
    b.add_table(["Tahap", "Aktivitas SOP", "Pelaksana", "Uraian Prosedur", "Batas Waktu / SLA"], ppdb_sop_data, [0.8, 1.3, 1.1, 2.1, 1.0])

    b.add_heading_2("8.2 SOP Siklus Penagihan, Pembayaran & Rekonsiliasi SPP Bulanan")
    b.add_paragraph(
        "Alur tata kelola keuangan SPP bulanan dirancang transparan dan tertib administrasi dengan siklus bulanan sebagai berikut:"
    )
    spp_sop_data = [
        ("Tanggal 01", "Penerbitan Tagihan Otomatis", "Sistem Otomatis", "Sistem menerbitkan draf tagihan SPP untuk seluruh siswa aktif di setiap cabang sesuai besaran iuran cabang masing-masing.", "Tersedia di portal ortu"),
        ("Tgl 01 - 10", "Masa Pembayaran Rutin", "Wali Murid", "Orang tua melakukan pembayaran melalui transfer bank resmi sekolah atau scan QRIS dinamis, lalu mengunggah slip bukti transfer.", "Batas pembayaran reguler"),
        ("Tgl 01 - 12", "Verifikasi & Rekonsiliasi", "Bendahara / Admin", "Petugas mencocokkan mutasi rekening bank dengan slip unggahan wali murid. Jika valid, klik 'Verifikasi / Lunas'.", "Maks. 1x24 jam sejak bukti diunggah"),
        ("Real-time", "Penerbitan Kwitansi Digital", "Sistem Smart Kids", "Kwitansi digital bertanda tangan dan stempel resmi instansi otomatis terbit dan dapat diunduh/dicetak langsung oleh orang tua.", "Seketika status berubah Lunas"),
        ("Tgl 11 - 15", "Notifikasi Pengingat Tagihan", "Admin Cabang", "Pengiriman pesan pengingat sopan melalui WhatsApp resmi kepada wali murid yang belum melakukan pembayaran melewati tempo tanggal 10.", "Sebelum tanggal 15 setiap bulan")
    ]
    b.add_table(["Siklus Waktu", "Aktivitas Finansial", "Penanggung Jawab", "Uraian Prosedur", "Keluaran / Output"], spp_sop_data, [0.9, 1.3, 1.1, 2.0, 1.0])

    b.add_heading_2("8.3 SOP Prosedur Absensi Harian Siswa & Guru Berbasis QR Code")
    b.add_paragraph(
        "Presensi digital menggunakan kartu QR Code siswa dirancang cepat dan akurat dengan ketentuan berikut:"
    )
    b.add_bullet("Kamera scanner gerbang atau kelas diaktifkan mulai pukul 06.45 WIB. Setiap siswa memperlihatkan kartu QR Code ke kamera.", bold_prefix="1. Jam Kedatangan: ")
    b.add_bullet("Siswa yang memindai QR Code di atas pukul 07.45 WIB secara sistem akan tercatat dengan status 'Terlambat'.", bold_prefix="2. Toleransi Keterlambatan: ")
    b.add_bullet("Apabila kartu tertinggal atau kamera scanner mengalami gangguan teknis, guru wali kelas wajib melakukan presensi manual melalui akun guru sebelum pukul 08.30 WIB.", bold_prefix="3. Presensi Manual Darurat: ")
    b.add_bullet("Saat penjemputan anak (pukul 11.00 - 12.30 WIB), pemindaian QR kepulangan dicatat untuk memastikan keamanan penjemputan.", bold_prefix="4. Kepulangan Siswa: ")
    b.add_bullet("Guru melakukan presensi kehadiran mandiri di menu 'Presensi Guru' setiap hari kerja sebelum kegiatan belajar mengajar dimulai.", bold_prefix="5. Presensi Kehadiran Guru: ")

    b.add_heading_2("8.4 SOP Penginputan Nilai & Penerbitan Rapor Perkembangan PAUD")
    b.add_paragraph(
        "Penilaian perkembangan anak usia dini di Smart Kids mengacu pada standar PAUD terpadu:"
    )
    b.add_bullet("Penilaian harian/mingguan mencakup 6 bidang: Nilai Agama & Moral (NAM), Fisik Motorik (FM), Kognitif (KOG), Bahasa (BHS), Sosial Emosional (SOSEM), dan Seni (SN).", bold_prefix="6 Aspek Perkembangan: ")
    b.add_bullet("Skala capaian menggunakan kriteria resmi: BB (Belum Berkembang), MB (Mulai Berkembang), BSH (Berkembang Sesuai Harapan), dan BSB (Berkembang Sangat Baik).", bold_prefix="Skala Penilaian: ")
    b.add_bullet("Guru wajib menambahkan catatan narasi personal mengenai perkembangan unik, bakat, serta area pendampingan yang disarankan kepada orang tua.", bold_prefix="Catatan Guru: ")
    b.add_bullet("Seluruh nilai semester wajib diselesaikan dan diverifikasi oleh Kepala Sekolah paling lambat 7 hari kalender sebelum jadwal pembagian rapor.", bold_prefix="Batas Akhir Rapor: ")

    b.add_heading_2("8.5 Checklist Pemeliharaan & Operasional Petugas Administrator")
    b.add_paragraph(
        "Tabel checklist berikut menjadi panduan harian, mingguan, dan bulanan bagi Administrator Cabang dan Super Admin:"
    )
    admin_checklist = [
        ("Harian", "Cek pendaftar PPDB baru dan verifikasi berkas yang masuk", "Maks. 2x24 Jam", "Menu PPDB"),
        ("Harian", "Cek unggahan bukti transfer SPP dan lakukan rekonsiliasi bank", "Pukul 09.00 & 15.00 WIB", "Menu SPP"),
        ("Harian", "Pantau rekap kehadiran harian siswa dan guru", "Pukul 08.30 WIB", "Menu Presensi"),
        ("Mingguan", "Periksa permohonan izin/cuti guru yang tertunda", "Setiap Jumat", "Menu Pengajuan Cuti"),
        ("Mingguan", "Perbarui galeri kegiatan belajar & pengumuman agenda sekolah", "Setiap Sabtu", "Menu Galeri & Pengumuman"),
        ("Bulanan", "Ekspor laporan penerimaan SPP dan rekap presensi (CSV/Excel)", "Akhir Bulan", "Menu SPP / Guru Progress"),
        ("Bulanan", "Kirim pesan pengingat tagihan SPP bagi yang menunggak", "Tanggal 11 setiap bulan", "Menu SPP WhatsApp"),
        ("Semester", "Audit kelengkapan plotting siswa dan penerbitan rapor", "Akhir Semester", "Menu Kelas & Nilai")
    ]
    b.add_table(["Frekuensi", "Aktivitas Pengawasan Administrasi", "Target SLA / Waktu", "Modul Sistem"], admin_checklist, [1.1, 2.7, 1.4, 1.1])

    b.add_heading_2("8.6 Checklist Rutin Harian Tenaga Pendidik (Guru Kelas)")
    b.add_paragraph(
        "Checklist kegiatan operasional digital bagi setiap guru wali kelas:"
    )
    teacher_checklist = [
        ("Pagi (07.00 - 07.45)", "Lakukan presensi kehadiran mandiri guru di portal", "Wajib setiap hari kerja", "Menu Presensi Guru"),
        ("Pagi (07.15 - 08.00)", "Buka kamera scanner presensi siswa atau absensi manual di kelas binaan", "Sebelum KBM dimulai", "Menu Presensi Siswa"),
        ("Siang (11.00 - 12.00)", "Catat absensi kepulangan siswa saat ananda dijemput wali murid", "Saat jam kepulangan", "Menu Presensi Siswa"),
        ("Siang (12.00 - 13.00)", "Input catatan observasi harian atau skor aspek capaian pembelajaran", "Berkala setiap minggu", "Menu Nilai Siswa"),
        ("Jumat Sore", "Cek agenda jadwal mengajar KBM untuk minggu berikutnya", "Jumat pukul 14.00", "Menu Jadwal KBM"),
        ("Insidental", "Ajukan surat permohonan izin/sakit online jika berhalangan", "H-1 atau pagi hari H", "Menu Pengajuan Cuti")
    ]
    b.add_table(["Waktu Pelaksanaan", "Aktivitas Guru", "Ketentuan", "Lokasi Menu"], teacher_checklist, [1.4, 2.5, 1.2, 1.2])

    b.add_heading_2("8.7 Glosarium Terminologi Sistem & Singkatan Teknis")
    b.add_paragraph(
        "Daftar istilah dan singkatan yang digunakan di dalam sistem Smart Kids:"
    )
    glossary_data = [
        ("PPDB Online", "Penerimaan Peserta Didik Baru secara daring melalui website resmi."),
        ("Multi-Tenant / Multi-Sekolah", "Arsitektur perangkat lunak yang melayani banyak unit sekolah dalam 1 basis data terpusat yayasan dengan pemisahan data aman."),
        ("NISN", "Nomor Induk Siswa Nasional, kode pengenal unik siswa yang digunakan sekaligus sebagai ID login portal siswa/ortu."),
        ("QRIS", "Quick Response Code Indonesian Standard, standar kode QR nasional untuk pembayaran non-tunai dari seluruh dompet digital/m-banking."),
        ("Plotting Siswa", "Proses penempatan atau pembagian siswa baru ke dalam rombongan belajar (rombel) kelas tertentu."),
        ("PIC Les SD", "Person in Charge, guru yang ditugaskan khusus membimbing dan mengelola data murid bimbingan belajar Les SD."),
        ("Sentra Belajar", "Metode pembelajaran tematik PAUD (contoh: Sentra Balok, Sentra Seni, Sentra Imtaq, Sentra Bahan Alam)."),
        ("NAM / FM / KOG / BHS / SOSEM / SN", "Enam aspek perkembangan anak: Nilai Agama Moral, Fisik Motorik, Kognitif, Bahasa, Sosial Emosional, Seni."),
        ("BB / MB / BSH / BSB", "Tingkat capaian nilai: Belum Berkembang, Mulai Berkembang, Berkembang Sesuai Harapan, Berkembang Sangat Baik."),
        ("JWT (JSON Web Token)", "Protokol otorisasi keamanan berbasis token yang menjaga sesi login pengguna tetap aman dan terenkripsi.")
    ]
    b.add_table(["Istilah / Singkatan", "Definisi & Penjelasan Teknis"], glossary_data, [2.2, 4.07])
'''

target_marker = '    # Save final file in workspace root'
if target_marker in content:
    content = content.replace(target_marker, bab8_content + "\n" + target_marker, 1)
    print("BAB 8 appended successfully")
else:
    print("WARNING: target_marker not found!")

with open('scratch/generate_full_manual.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("generate_full_manual.py updated successfully!")
