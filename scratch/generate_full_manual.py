# -*- coding: utf-8 -*-
"""
Full User Manual Generator for Smart Kids - YAPCHI Foundation Multi-School System
Produces the complete user manual in DOCX format with text and marked image placeholders.
"""

import os
import sys
from manual_builder import ManualBookBuilder

def build_full_manual():
    b = ManualBookBuilder()

    # =========================================================================
    # COVER PAGE
    # =========================================================================
    b.add_cover_page()

    # =========================================================================
    # KATA PENGANTAR & DAFTAR ISI
    # =========================================================================
    b.add_heading_1("KATA PENGANTAR")
    b.add_paragraph(
        "Puji dan syukur kami panjatkan ke hadirat Tuhan Yang Maha Esa atas selesainya penyusunan Buku Panduan Penggunaan (User Manual) "
        "Sistem Informasi Manajemen Multi-Sekolah dan Pendaftaran Peserta Didik Baru (PPDB) Online Smart Kids di bawah naungan Yayasan Pendidikan Anak Indonesia (YAPCHI Foundation).",
        bold_prefix="Salam Pendidikan Bermutu, "
    )
    b.add_paragraph(
        "Buku manual ini disusun sebagai pedoman operasional standar yang komprehensif bagi seluruh pemangku kepentingan (stakeholders) "
        "yang berinteraksi dengan ekosistem digital Smart Kids. Platform ini dirancang khusus guna menyatukan administrasi multi-cabang sekolah, "
        "mengotomatisasi proses pendaftaran siswa baru, memfasilitasi transparansi pembayaran SPP, mencatat presensi digital berbasis QR Code, "
        "hingga menyajikan laporan penilaian perkembangan anak secara interaktif kepada orang tua."
    )
    b.add_paragraph(
        "Dokumen ini memuat langkah-langkah terperinci untuk setiap hak akses (peran), mulai dari Pengunjung Publik, Calon Wali Murid, "
        "Super Administrator Yayasan, Administrator Cabang Sekolah, Tenaga Pendidik (Guru), hingga Orang Tua / Wali Murid aktif. "
        "Diharapkan buku ini dapat mempercepat adaptasi pengguna serta menjaga kelancaran operasional pendidikan di lingkungan Smart Kids."
    )
    b.add_callout(
        "Setiap bab dalam buku panduan ini telah dilengkapi dengan kotak penanda gambar (Image Placeholder) bersimbol 🖼️. "
        "Bagi penyusun atau staf dokumentasi, silakan letakkan tangkapan layar (screenshot) aplikasi sesuai petunjuk dan deskripsi yang tercantum pada masing-masing kotak.",
        title="PETUNJUK PENGGUNAAN BUKU MANUAL BAGI PENYUSUN DOKUMEN",
        callout_type="info"
    )

    b.add_page_break()
    b.add_heading_1("RINGKASAN DAFTAR ISI")
    toc_data = [
        ("BAB 1", "PENGENALAN SISTEM & ARSITEKTUR MULTI-SEKOLAH", "Latar belakang, konsep yayasan multi-cabang, matriks peran, spesifikasi sistem"),
        ("BAB 2", "PORTAL PUBLIK & PENDAFTARAN ONLINE", "Navigasi landing page, selector cabang, alur pendaftaran PPDB TK (Langkah 1-6), pendaftaran Les SD"),
        ("BAB 3", "AUTENTIKASI & KEAMANAN AKUN", "Portal login terpadu multi-role, mode gelap/terang, keamanan sesi JWT & pergantian akun"),
        ("BAB 4", "PANDUAN LENGKAP ADMINISTRATOR", "Dashboard stats, master cabang, manajemen user, kelas & plotting, verifikasi PPDB, siswa, presensi QR, progresif guru, SPP, QRIS & CMS"),
        ("BAB 5", "PANDUAN GURU / TENAGA PENDIDIK", "Dashboard guru, presensi kelas, input nilai perkembangan anak, jadwal mengajar, cuti online, PIC bimbingan Les SD"),
        ("BAB 6", "PANDUAN ORANG TUA / WALI MURID", "Beranda ananda, monitoring nilai rapor, presensi kehadiran, pembayaran SPP online via transfer/QRIS, kwitansi digital"),
        ("BAB 7", "TANYA JAWAB (FAQ) & PEMECAHAN MASALAH", "Panduan pemulihan akun, troubleshooting upload berkas 1 MB, pemindai kamera QR, konfirmasi pembayaran"),
        ("BAB 8", "LAMPIRAN SOP & DAFTAR PERIKSA OPERASIONAL", "SOP PPDB, siklus penagihan SPP, presensi QR, penilaian rapor PAUD, checklist rutin admin/guru, glosarium teknis")
    ]
    b.add_table(["Bab", "Judul Bab", "Cakupan Materi Pokok"], toc_data, [1.0, 2.5, 2.77])

    # =========================================================================
    # BAB 1
    # =========================================================================
    b.add_page_break()
    b.add_heading_1("BAB 1: PENGENALAN SISTEM & ARSITEKTUR MULTI-SEKOLAH")
    
    b.add_heading_2("1.1 Latar Belakang & Visi Digitalisasi Smart Kids")
    b.add_paragraph(
        "Smart Kids merupakan institusi pendidikan usia dini dan bimbingan belajar anak di bawah naungan YAPCHI Foundation (Yayasan Pendidikan Anak Indonesia). "
        "Seiring dengan bertambahnya cabang operasional sekolah dan tingginya animo masyarakat, diperlukan transformasi tata kelola dari sistem konvensional "
        "menjadi ekosistem digital modern yang terpusat, cepat, transparan, dan akuntabel."
    )
    b.add_paragraph(
        "Platform Smart Kids Cloud Management System dibangun untuk menghadirkan pengalaman terpadu, mulai dari pencitraan lembaga di ranah publik, "
        "kemudahan pendaftaran peserta didik baru (PPDB) tanpa harus datang langsung ke lokasi, hingga integrasi operasional akademik dan keuangan harian."

    )

    b.add_heading_2("1.2 Konsep Arsitektur Multi-Sekolah (One Foundation - Multi Branch)")
    b.add_paragraph(
        "Sistem ini dirancang menggunakan konsep arsitektur Multi-Sekolah (Multi-Tenant Architecture) pada tingkat database terpadu. "
        "Satu yayasan menaungi banyak unit sekolah atau cabang (misalnya Cabang Sadjati dan Cabang BCL), dengan keunggulan sebagai berikut:"
    )
    b.add_bullet("Setiap cabang sekolah memiliki profil mandiri, nomor telepon, alamat, program belajar, struktur biaya SPP, dan nomor rekening pembayaran yang independen.", bold_prefix="Otonomi Cabang: ")
    b.add_bullet("Super Administrator Yayasan memiliki kemampuan pengawasan menyeluruh (helicopter view), dapat beralih konteks antar cabang secara instan, serta memantau ringkasan statistik yayasan.", bold_prefix="Sentralisasi Pengawasan: ")
    b.add_bullet("Administrator Cabang hanya memiliki hak akses pada data siswa, guru, kelas, dan keuangan di cabang sekolahnya sendiri tanpa dapat melihat cabang lain.", bold_prefix="Isolasi Data Aman: ")
    b.add_bullet("Pengunjung website dapat memilih cabang sekolah melalui pemilih cabang di bilah navigasi, atau secara otomatis diarahkan melalui subdomain resmi sekolah.", bold_prefix="Fleksibilitas Akses Publik: ")

    b.add_heading_2("1.3 Matriks Peran Pengguna & Hak Akses (Role Matrix)")
    b.add_paragraph(
        "Keamanan dan pembagian tugas dalam sistem Smart Kids diatur melalui 5 (lima) peran pengguna utama dengan wewenang sebagai berikut:"
    )
    role_matrix = [
        ("Super Admin (Yayasan)", "Semua Cabang", "Hak akses penuh ke seluruh modul sistem, kelola cabang sekolah, kelola akun pengguna admin, pemantauan seluruh data akademik & keuangan yayasan."),
        ("Admin Cabang (Sekolah)", "1 Cabang Tertentu", "Kelola PPDB cabang, master kelas & plotting siswa, data guru & presensi guru, presensi siswa, jadwal KBM, verifikasi SPP cabang, rekening & profil web cabang."),
        ("Guru / Tenaga Pendidik", "Kelas Binaan / PIC", "Presensi harian siswa kelas binaan, input nilai perkembangan anak, cek jadwal KBM, absensi mengajar mandiri, pengajuan cuti, serta kelola murid bimbingan Les SD bagi PIC."),
        ("Orang Tua / Wali Murid", "Data Ananda Sendiri", "Melihat profil ananda, pantau nilai & catatan guru, pantau presensi kehadiran anak, bayar tagihan SPP online (upload bukti/QRIS), unduh kwitansi, pendaftaran Les SD."),
        ("Pengunjung Publik", "Landing Page", "Melihat profil sekolah, fasilitas, video profil, galeri, testimoni, mengisi formulir pendaftaran PPDB online, mengisi formulir pendaftaran Les SD online.")
    ]
    b.add_table(["Peran Pengguna (Role)", "Cakupan Akses", "Wewenang & Deskripsi Tanggung Jawab"], role_matrix, [1.5, 1.3, 3.47])

    b.add_heading_2("1.4 Kebutuhan Perangkat & Kompatibilitas Browser")
    b.add_paragraph(
        "Aplikasi web Smart Kids dibangun dengan teknologi Next.js terkini yang responsif di berbagai resolusi layar, baik komputer desktop, laptop, tablet, hingga smartphone Android dan iOS."
    )
    b.add_bullet("Browser yang Didukung: Google Chrome (versi 100+), Mozilla Firefox (versi 100+), Microsoft Edge (versi 100+), dan Apple Safari (versi 15+).", bold_prefix="Peramban Web: ")
    b.add_bullet("Koneksi Internet: Minimal 1 Mbps untuk akses umum; disarankan minimal 5 Mbps untuk fitur pemindaian kamera QR Code dan unggah dokumen berkas.", bold_prefix="Konektivitas: ")
    b.add_bullet("Perangkat Keras Tambahan: Kamera webcam pada laptop atau kamera smartphone yang berfungsi normal untuk pemindaian kartu QR Code presensi siswa.", bold_prefix="Perangkat Kamera: ")

    b.add_heading_2("1.5 Aturan Penyimpanan & Batas Unggah Berkas")
    b.add_paragraph(
        "Seluruh berkas dokumen pendaftaran PPDB, pas foto, slip bukti transfer SPP, dan lampiran surat dokter disimpan pada struktur direktori penyimpanan aman berbasis kategori tanggal unggahan."
    )
    b.add_callout(
        "Batas ukuran berkas yang diperbolehkan untuk diunggah oleh sistem adalah MAKSIMAL 1 MB per berkas. "
        "Format file yang didukung mencakup gambar (JPG, JPEG, PNG, WEBP) serta dokumen PDF untuk Kartu Keluarga dan Akta Kelahiran. "
        "Sistem akan menolak secara otomatis apabila file melebihi kapasitas 1 MB demi menjaga performa server.",
        title="KETENTUAN UPLOAD DOKUMEN & UKURAN BERKAS",
        callout_type="warning"
    )

    # =========================================================================
    # BAB 2
    # =========================================================================
    b.add_page_break()
    b.add_heading_1("BAB 2: PORTAL PUBLIK & PENDAFTARAN ONLINE")
    b.add_paragraph(
        "Portal publik merupakan gerbang informasi digital bagi masyarakat umum, orang tua calon siswa, maupun pihak sponsor. "
        "Halaman ini dirancang menarik, interaktif, serta menyajikan informasi program pendidikan secara transparan."
    )

    b.add_heading_2("2.1 Mengakses Halaman Utama & Memilih Cabang Sekolah")
    b.add_paragraph(
        "Pengguna dapat membuka peramban web dan memasukkan alamat domain resmi sekolah (contoh: https://smartkids.elevore.web.id). "
        "Pada bagian atas bilah navigasi (Navbar), terdapat tombol pemilih cabang (School Selector). "
        "Pengguna dapat berpindah antara Smart Kids Sadjati dan Smart Kids BCL. Saat cabang dipilih, seluruh konten program belajar, "
        "galeri foto, nomor telepon, dan lokasi sekolah akan otomatis disesuaikan dengan cabang yang dipilih."
    )
    b.add_image_placeholder(
        "Halaman Beranda Utama Website Publik Smart Kids",
        "Tampilan landing page utama menampilkan logo Smart Kids, tombol navigasi, lencana pendaftaran PPDB dibuka, judul hero, dan maskot sekolah.",
        "/ (Root Homepage)",
        "Buka halaman utama website pada komputer/laptop, pastikan bilah navigasi dan hero section terlihat lengkap dengan pencahayaan jelas."
    )
    b.add_image_placeholder(
        "Dropdown Pemilih Cabang Sekolah pada Navbar",
        "Tampilan dropdown pemilih cabang (Smart Kids Sadjati dan Smart Kids BCL) pada bilah navigasi bagian atas.",
        "/ (Root Homepage - Navbar)",
        "Klik tombol pemilih cabang di header hingga menu pilihan cabang muncul, lalu ambil screenshot area navbar."
    )

    b.add_heading_2("2.2 Eksplorasi Program Belajar, Galeri & Video Profil")
    b.add_paragraph(
        "Halaman depan menyajikan beragam komponen interaktif untuk mengenal ekosistem sekolah lebih dalam:"
    )
    b.add_bullet("Program Belajar: Kartu program yang menampilkan jenjang usia (3-8 tahun), fasilitas belajar sentra, dan estimasi biaya SPP bulanan.", bold_prefix="Daftar Program: ")
    b.add_bullet("Video Profil Interaktif: Tautan video YouTube resmi sekolah yang dapat diputar langsung di halaman tanpa harus beralih aplikasi.", bold_prefix="Video Edukasi: ")
    b.add_bullet("Galeri Dokumentasi: Foto kegiatan harian siswa, sarana bermain, kegiatan luar ruangan (outing), dan pentas seni.", bold_prefix="Galeri Fasilitas: ")
    b.add_bullet("Ulasan & Testimoni: Kutipan testimoni nyata dari para orang tua murid mengenai perkembangan putra-putrinya di Smart Kids.", bold_prefix="Testimoni Orang Tua: ")

    b.add_image_placeholder(
        "Bagian Program Belajar TK & Fitur Unggulan",
        "Tampilan bagian 'Program Belajar' yang menampilkan pilihan program Daycare, Playgroup, TK A, dan TK B beserta kartu fitur dan tarif SPP.",
        "/ (Homepage - Section Program)",
        "Gulir halaman ke bagian 'Program Pilihan', ambil screenshot yang memperlihatkan kartu program dengan tombol 'Daftar Sekarang'."
    )
    b.add_image_placeholder(
        "Galeri Foto Kegiatan & Fasilitas Sekolah",
        "Tampilan grid galeri foto kegiatan bermain dan belajar anak di Smart Kids.",
        "/ (Homepage - Section Galeri)",
        "Gulir halaman ke bagian galeri, ambil screenshot grid foto yang rapi."
    )

    b.add_heading_2("2.3 Panduan Lengkap Pendaftaran PPDB Online (Langkah 1 s/d 6)")
    b.add_paragraph(
        "Untuk mendaftarkan putra-putri secara online, calon wali murid cukup mengklik tombol 'Daftar Sekarang' atau tab 'PPDB' pada navigasi atas. "
        "Formulir PPDB dirancang dalam 6 langkah (wizard) sistematis agar orang tua dapat mengisi formulir dengan nyaman:"
    )

    b.add_heading_3("Langkah 1: Pengisian Data Calon Siswa")
    b.add_paragraph(
        "Pada langkah pertama, orang tua mengisi identitas dasar calon peserta didik baru. Kolom yang wajib diisi meliputi:"
    )
    b.add_bullet("Nama Lengkap Anak (sesuai Akta Kelahiran)", bold_prefix="Nama Anak: ")
    b.add_bullet("Pilihan Jenis Kelamin (Laki-laki / Perempuan)", bold_prefix="Jenis Kelamin: ")
    b.add_bullet("Agama yang dianut calon siswa", bold_prefix="Agama: ")
    b.add_bullet("Tempat Lahir dan Tanggal Lahir (menggunakan date picker)", bold_prefix="Tempat & Tgl Lahir: ")
    b.add_bullet("Usia anak saat mendaftar (terhitung otomatis atau diisi)", bold_prefix="Usia: ")
    b.add_bullet("Pilihan Program Belajar yang dituju (misal: Sentra TK A, Playgroup, atau Daycare)", bold_prefix="Program: ")

    b.add_image_placeholder(
        "Formulir Pendaftaran PPDB - Langkah 1 (Data Calon Siswa)",
        "Formulir langkah 1 menampilkan kolom Nama Anak, Jenis Kelamin, Agama, Tempat & Tanggal Lahir, serta Pilihan Program Belajar.",
        "/?tab=ppdb (Langkah 1)",
        "Klik tab PPDB di halaman utama, pastikan indikator langkah 1 aktif, ambil screenshot formulir data siswa."
    )

    b.add_heading_3("Langkah 2: Pengisian Data Orang Tua / Wali Murid")
    b.add_paragraph(
        "Pada langkah kedua, orang tua memasukkan informasi kontak penanggung jawab siswa. "
        "Nomor WhatsApp sangat krusial karena seluruh notifikasi pendaftaran dan nomor registrasi akan dikirimkan ke nomor ini:"
    )
    b.add_bullet("Nama Lengkap Ayah / Ibu / Wali", bold_prefix="Nama Orang Tua: ")
    b.add_bullet("Nomor WhatsApp aktif diawali dengan angka 08 (misal: 081234567890)", bold_prefix="No. WhatsApp: ")
    b.add_bullet("Alamat email aktif untuk penerimaan dokumen digital", bold_prefix="Email: ")
    b.add_bullet("Alamat domisili tempat tinggal lengkap saat ini", bold_prefix="Alamat Rumah: ")

    b.add_image_placeholder(
        "Formulir Pendaftaran PPDB - Langkah 2 (Data Orang Tua / Kontak)",
        "Formulir langkah 2 menampilkan kolom Nama Orang Tua, Nomor WhatsApp, Email, dan Alamat Rumah.",
        "/?tab=ppdb (Langkah 2)",
        "Lanjutkan ke langkah 2, ambil screenshot formulir data kontak orang tua."
    )

    b.add_heading_3("Langkah 3: Unggah Berkas Persyaratan Administrasi")
    b.add_paragraph(
        "Orang tua diminta mengunggah dokumen administrasi dalam bentuk foto atau dokumen scan digital. "
        "Masing-masing berkas memiliki batas maksimal 1 MB:"
    )
    b.add_bullet("Scan Kartu Keluarga (KK) yang masih berlaku", bold_prefix="Kartu Keluarga: ")
    b.add_bullet("Scan Akta Kelahiran resmi anak", bold_prefix="Akta Kelahiran: ")
    b.add_bullet("Pas foto berwarna terbaru calon anak (latar belakang bebas rapi)", bold_prefix="Pas Foto 3x4: ")
    b.add_bullet("Foto KTP salah satu orang tua / wali", bold_prefix="KTP Orang Tua: ")

    b.add_image_placeholder(
        "Formulir Pendaftaran PPDB - Langkah 3 (Unggah Berkas Persyaratan)",
        "Formulir langkah 3 menampilkan empat area upload file dokumen (KK, Akta Kelahiran, Pas Foto, dan KTP Ortu).",
        "/?tab=ppdb (Langkah 3)",
        "Lanjutkan ke langkah 3, ambil screenshot tampilan kolom unggah dokumen persyaratan."
    )

    b.add_heading_3("Langkah 4: Rincian Biaya & Pemilihan Komponen Biaya Tambahan")
    b.add_paragraph(
        "Sistem secara transparan menghitung estimasi biaya pendaftaran. Biaya awal meliputi SPP bulan pertama dari program yang dipilih. "
        "Selain itu, orang tua dapat memilih komponen tambahan opsional (seperti Seragam Sekolah, Buku Paket Tematik, atau Outing Class). "
        "Total tagihan pembayaran akan terkalkulasi secara otomatis secara real-time di layar."
    )
    b.add_image_placeholder(
        "Formulir Pendaftaran PPDB - Langkah 4 (Rincian Biaya & Komponen)",
        "Tampilan rincian biaya pendaftaran, checkbox pemilihan seragam/buku, serta total nominal pembayaran.",
        "/?tab=ppdb (Langkah 4)",
        "Lanjutkan ke langkah 4, ambil screenshot rincian biaya beserta kotak pilihan komponen tambahan."
    )

    b.add_heading_3("Langkah 5: Metode Pembayaran & Unggah Bukti Transfer")
    b.add_paragraph(
        "Orang tua memilih metode pembayaran pendaftaran resmi sekolah:"
    )
    b.add_bullet("Transfer Bank Resmi: Sistem menampilkan nomor rekening resmi cabang sekolah (misal: BCA, Mandiri, BRI) beserta nama pemilik rekening.", bold_prefix="Transfer Bank: ")
    b.add_bullet("Scan QRIS: Sistem menyajikan kode QRIS resmi yang dapat dipindai langsung melalui aplikasi mobile banking atau e-wallet apa saja (GoPay, OVO, Dana, ShopeePay).", bold_prefix="QRIS Instan: ")
    b.add_paragraph(
        "Setelah melakukan transfer, orang tua mengunggah foto / screenshot struk bukti pembayaran pada kolom yang disediakan, lalu menekan tombol 'Kirim Pendaftaran'."
    )
    b.add_image_placeholder(
        "Formulir Pendaftaran PPDB - Langkah 5 (Pembayaran & Bukti Transfer)",
        "Tampilan informasi rekening bank, gambar QRIS sekolah, dan kolom unggah foto bukti transfer.",
        "/?tab=ppdb (Langkah 5)",
        "Lanjutkan ke langkah 5, pilih metode bayar bank/QRIS, lalu ambil screenshot tampilan pembayaran dan kolom upload bukti."
    )

    b.add_heading_3("Langkah 6: Bukti Registrasi & Nomor Pendaftaran")
    b.add_paragraph(
        "Setelah data terkirim, sistem menghasilkan tanda terima pendaftaran online yang memuat:"
    )
    b.add_bullet("Nomor Registrasi Unik Resmi (contoh format: REG-2026-0812)", bold_prefix="Nomor Registrasi: ")
    b.add_bullet("Rincian biodata anak dan kontak orang tua yang telah didaftarkan", bold_prefix="Ringkasan Data: ")
    b.add_bullet("Status pendaftaran: PENDING (Menunggu Verifikasi Pembayaran & Berkas oleh Admin)", bold_prefix="Status Berkas: ")
    b.add_bullet("Tombol 'Konfirmasi WhatsApp' untuk membuka chat WhatsApp langsung ke admin pendaftaran sekolah dengan pesan otomatis.", bold_prefix="Konfirmasi WhatsApp: ")

    b.add_image_placeholder(
        "Tanda Bukti Pendaftaran PPDB Berhasil",
        "Tampilan layar sukses pendaftaran dengan Nomor Registrasi, badge PENDING, rincian biaya, dan tombol konfirmasi WhatsApp.",
        "/?tab=ppdb (Langkah 6 / Sukses)",
        "Ambil screenshot kartu bukti pendaftaran sukses yang memuat nomor registrasi unik."
    )

    b.add_heading_2("2.4 Panduan Pendaftaran Bimbingan Belajar Les SD Online")
    b.add_paragraph(
        "Selain jenjang TK dan Playgroup, Smart Kids menyediakan unit Bimbingan Belajar Les SD bagi siswa kelas 1 hingga kelas 6 SD. "
        "Masyarakat dapat mendaftarkan siswa SD melalui modal khusus 'Daftar Les SD' yang tersedia di beranda:"
    )
    b.add_bullet("Identitas Siswa SD: Nama lengkap anak, jenis kelamin, kelas SD saat ini (Kelas 1 - 6 SD), dan nama sekolah asal SD.", bold_prefix="Data Siswa: ")
    b.add_bullet("Pilihan Paket Belajar: Frekuensi pertemuan (misal: 1 Minggu 3x Pertemuan - Semua Mata Pelajaran).", bold_prefix="Paket Bimbingan: ")
    b.add_bullet("Pilihan Waktu Belajar: Hari dan jam les yang diinginkan (misal: Senin, Rabu, Jumat pukul 14:00 - 15:30 WIB).", bold_prefix="Jadwal Les: ")
    b.add_bullet("Data Orang Tua: Nama orang tua, nomor WhatsApp, email, dan alamat rumah.", bold_prefix="Kontak Wali: ")
    b.add_bullet("Setelah formulir disubmit, sistem akan menerbitkan nomor registrasi les SD (misal: LSD-2026-0045) dan diteruskan ke tim pengajar.", bold_prefix="Nomor Registrasi Les: ")

    b.add_image_placeholder(
        "Modal Formulir Pendaftaran Bimbingan Belajar Les SD",
        "Pop-up modal pendaftaran Les SD dengan pilihan kelas SD 1-6, pilihan paket belajar, hari les, dan informasi orang tua.",
        "Homepage -> Modal Pendaftaran Les SD",
        "Klik tombol 'Daftar Les SD' di beranda hingga modal pop-up muncul, lalu ambil screenshot modal pendaftaran."
    )

    b.add_heading_2("2.5 Layanan Bantuan & Integrasi Kontak Sekolah")
    b.add_paragraph(
        "Pada bagian bawah halaman website (Footer), sekolah menyajikan informasi lengkap mencakup alamat fisik sekolah, jam operasional layanan (Senin - Sabtu | 08.00 - 17.00 WIB), "
        "serta tautan media sosial resmi (Instagram, Facebook). Terdapat pula tombol pintas WhatsApp yang memungkinkan orang tua berkomunikasi langsung dengan petugas penerimaan siswa."
    )

    # =========================================================================
    # BAB 3
    # =========================================================================
    b.add_page_break()
    b.add_heading_1("BAB 3: PANDUAN AUTENTIKASI & KEAMANAN AKUN")
    b.add_paragraph(
        "Keamanan sistem informasi Smart Kids dilindungi dengan mekanisme autentikasi terpusat berbasis JSON Web Token (JWT) yang disimpan di peramban "
        "secara aman melalui cookie terenkripsi. Modul ini menjadi pintu masuk tunggal bagi seluruh pemegang akun."
    )

    b.add_heading_2("3.1 Mengakses Portal Login Terpadu")
    b.add_paragraph(
        "Untuk masuk ke dalam sistem, buka tautan resmi: /admin/login (atau klik tombol 'Masuk Portal' pada bilah navigasi website). "
        "Pengguna tidak perlu memilih halaman terpisah antara guru, wali murid, maupun admin sekolah. Sistem secara otomatis mendeteksi "
        "tingkat hak akses (role) pengguna berdasarkan kredensial yang dimasukkan."
    )
    b.add_image_placeholder(
        "Halaman Portal Login Akun Terpadu Smart Kids",
        "Tampilan form login elegan dengan logo Smart Kids, kolom input Username/WhatsApp/Email, kolom Kata Sandi, dan tombol Masuk.",
        "/admin/login",
        "Buka rute /admin/login di peramban dalam keadaan belum login (incognito), ambil screenshot form login di tengah layar."
    )

    b.add_heading_2("3.2 Prosedur Masuk Sistem (Multi-Identifier Login)")
    b.add_paragraph(
        "Sistem Smart Kids mendukung kemudahan login dengan multi-identifier. Pengguna dapat mengisi kolom nama pengguna dengan salah satu opsi:"
    )
    b.add_bullet("Username resmi yang didaftarkan oleh administrator (misal: 'admin_pusat', 'guru_ayu', 'budi_sadjati').", bold_prefix="Username: ")
    b.add_bullet("Nomor WhatsApp yang terdaftar pada profil akun (misal: '081234567890').", bold_prefix="Nomor WhatsApp: ")
    b.add_bullet("Alamat email aktif yang terdaftar di sistem (misal: 'orangtua@gmail.com').", bold_prefix="Email: ")
    b.add_paragraph(
        "Langkah-langkah login:"
    )
    b.add_bullet("Ketik kredensial login (Username / WhatsApp / Email) pada kolom pertama.", bold_prefix="1. Masukkan Identitas: ")
    b.add_bullet("Ketik kata sandi (password). Klik ikon 'Mata' jika ingin memeriksa ketepatan karakter yang diketik.", bold_prefix="2. Masukkan Kata Sandi: ")
    b.add_bullet("Klik tombol 'Masuk ke Portal'. Jika berhasil, sistem akan mengarahkan pengguna secara otomatis ke halaman dashboard sesuai perannya.", bold_prefix="3. Konfirmasi Masuk: ")

    b.add_heading_2("3.3 Fitur Beralih Tema Tampilan (Dark Mode & Light Mode)")
    b.add_paragraph(
        "Untuk kenyamanan visual pengguna saat bekerja di berbagai kondisi pencahayaan, sistem Smart Kids menyediakan fitur tema ganda:"
    )
    b.add_bullet("Mode Gelap (Dark Mode): Dirancang dengan nuansa slate modern yang nyaman untuk mata saat bekerja di malam hari atau ruangan redup.", bold_prefix="Dark Theme: ")
    b.add_bullet("Mode Terang (Light Mode): Dirancang dengan latar bersih dan kontras tinggi yang sangat cocok saat digunakan di siang hari atau saat presentasi.", bold_prefix="Light Theme: ")
    b.add_paragraph(
        "Pengguna dapat berpindah tema kapan saja dengan mengklik tombol ikon 'Matahari' / 'Bulan' pada sudut kanan atas bilah header aplikasi. Pilihan tema disimpan otomatis di peramban."
    )
    b.add_image_placeholder(
        "Perbandingan Tampilan Antarmuka Dark Mode vs Light Mode",
        "Tampilan header dan menu dashboard dalam mode gelap (gelap slate) dan mode terang (putih abu-abu terang).",
        "/admin/dashboard (Header Area)",
        "Ambil screenshot area header dashboard saat mode gelap aktif, lalu beralih ke mode terang dan ambil perbandingannya."
    )

    b.add_heading_2("3.4 Tombol Pintasan 'Lihat Website'")
    b.add_paragraph(
        "Pada bilah header dashboard administrator maupun pengguna, tersedia tombol 'Lihat Website' dengan ikon tautan eksternal. "
        "Tombol ini mempermudah pengguna untuk membuka halaman depan website sekolah di tab baru peramban tanpa harus logout dari sesi administrasi."
    )

    b.add_heading_2("3.5 Prosedur Keluar Akun (Logout) & Keamanan Sesi")
    b.add_paragraph(
        "Setelah menyelesaikan seluruh tugas administrasi atau monitoring, pengguna SANGAT DIANJURKAN untuk keluar dari sistem:"
    )
    b.add_bullet("Klik tombol 'Keluar' (berwarna merah dengan ikon LogOut) di pojok kanan atas header.", bold_prefix="Langkah Logout: ")
    b.add_bullet("Sistem akan menghapus token otentikasi di cookie dan segera mengalihkan layar kembali ke halaman login.", bold_prefix="Penghapusan Sesi: ")
    b.add_callout(
        "Hindari menggunakan fitur 'Simpan Kata Sandi' otomatis pada peramban bersama (seperti komputer kantor atau warnet) "
        "untuk mencegah penyalahgunaan hak akses data siswa dan keuangan.",
        title="PERINGATAN KEAMANAN INFORMASI",
        callout_type="warning"
    )

    # =========================================================================
    # BAB 4
    # =========================================================================
    b.add_page_break()
    b.add_heading_1("BAB 4: PANDUAN LENGKAP PENGELOLA (SUPER ADMIN & ADMIN CABANG)")
    b.add_paragraph(
        "Bab ini memuat panduan komprehensif bagi Administrator Pusat Yayasan (Super Admin) dan Administrator Cabang Sekolah (Admin Cabang). "
        "Modul pengelolaan mencakup seluruh operasional dari akademik, data siswa, presensi digital, kepegawaian, hingga tata kelola keuangan."
    )

    b.add_heading_2("4.1 Dashboard Utama & Pemantauan Statistik (Overview)")
    b.add_paragraph(
        "Saat login sebagai Administrator, layar pertama yang tampil adalah Ringkasan Dashboard (Overview). Modul ini menyajikan ringkasan metrik penting:"
    )
    b.add_bullet("Kartu Total Siswa Aktif: Jumlah seluruh anak yang berstatus aktif di cabang yang dipilih.", bold_prefix="Total Siswa: ")
    b.add_bullet("Kartu Pendaftar PPDB Baru: Jumlah pendaftar baru yang memerlukan verifikasi administrasi.", bold_prefix="Pendaftar PPDB: ")
    b.add_bullet("Kartu Tenaga Pendidik & Staf: Jumlah guru aktif yang bertugas di sekolah.", bold_prefix="Total Guru: ")
    b.add_bullet("Kartu Penerimaan SPP Bulan Berjalan: Total akumulasi pembayaran SPP yang telah lunas bulan ini.", bold_prefix="Penerimaan SPP: ")
    b.add_bullet("Grafik Tren Kehadiran & Status Pembayaran: Visualisasi rasio presensi siswa dan grafik pelunasan tagihan SPP.", bold_prefix="Grafik Analitik: ")

    b.add_image_placeholder(
        "Dashboard Utama Administrator (Overview & Statistik)",
        "Tampilan layar penuh overview dashboard dengan kartu metrik statistik, grafik tren, dan daftar aktivitas terbaru.",
        "/admin/dashboard -> Tab 'overview'",
        "Buka tab Ringkasan & Stats di dashboard admin, pastikan seluruh kartu angka statistik terlihat jelas."
    )

    b.add_heading_2("4.2 Penggantian Konteks Cabang Sekolah (Branch Switcher)")
    b.add_paragraph(
        "Khusus bagi Super Admin Yayasan, pada bagian tengah header aplikasi terdapat dropdown 'School Branch Switcher' dengan ikon gedung. "
        "Super Admin dapat memilih 'Semua Sekolah (Yayasan Level)' untuk melihat agregat seluruh data, atau memilih cabang spesifik "
        "(Smart Kids Sadjati atau Smart Kids BCL). Seluruh data tabel pada tab-tab lainnya akan langsung tersaring otomatis mengikuti cabang terpilih."
    )
    b.add_image_placeholder(
        "Dropdown Pemilih Konteks Cabang Sekolah di Header Admin",
        "Dropdown interaktif di header yang menampilkan daftar cabang sekolah di bawah yayasan beserta opsi 'Semua Sekolah'.",
        "/admin/dashboard (Header Tengah)",
        "Klik dropdown pemilih cabang di header hingga daftar cabang terbuka, lalu ambil screenshot."
    )

    b.add_heading_2("4.3 Manajemen Multi-Sekolah / Cabang (Khusus Super Admin)")
    b.add_paragraph(
        "Menu 'Kelola Sekolah / Cabang' (Tab 'schools') digunakan oleh Super Admin Yayasan untuk menambah, mengubah, atau menonaktifkan unit sekolah binaan yayasan:"
    )
    b.add_bullet("Menambah Cabang Baru: Klik tombol 'Tambah Sekolah', isi Kode unik (huruf kecil tanpa spasi, misal: 'sadjati'), Nama Sekolah, Jenjang (TK/KB), Alamat fisik, Nomor Telepon resmi, Urutan tampil, dan unggah Logo Sekolah.", bold_prefix="Tambah Cabang: ")
    b.add_bullet("Mengedit Profil Cabang: Mengubah kontak atau alamat sekolah yang berpindah lokasi.", bold_prefix="Perbarui Cabang: ")
    b.add_bullet("Menghapus Cabang: Menghapus cabang sekolah (hanya dapat dilakukan jika tidak ada data siswa atau transaksi yang tertaut).", bold_prefix="Hapus Cabang: ")

    b.add_image_placeholder(
        "Halaman Manajemen Sekolah / Cabang Yayasan",
        "Tabel daftar cabang sekolah (Sadjati, BCL) lengkap dengan kode cabang, jenjang, alamat, kontak, dan tombol aksi edit/hapus.",
        "/admin/dashboard -> Tab 'schools'",
        "Buka menu 'Kelola Sekolah / Cabang' dengan akun Super Admin, ambil screenshot tabel daftar cabang."
    )

    b.add_heading_2("4.4 Manajemen Pengguna & Hak Akses Akun (Khusus Super Admin)")
    b.add_paragraph(
        "Menu 'User Admin & Akses' (Tab 'users') mengelola seluruh akun pengguna di dalam sistem Smart Kids:"
    )
    b.add_bullet("Klik tombol 'Tambah Pengguna Baru'.", bold_prefix="1. Tambah Akun: ")
    b.add_bullet("Pilih Peran Akun (Role): SUPER_ADMIN, ADMIN_SEKOLAH (Admin Cabang), GURU, atau ORANG_TUA.", bold_prefix="2. Tetapkan Peran: ")
    b.add_bullet("Pilih Penempatan Cabang Sekolah: Mengunci akses akun admin atau guru ke cabang tertentu.", bold_prefix="3. Cabang Sekolah: ")
    b.add_bullet("Pilih Kelas Binaan: Khusus untuk guru wali kelas, tentukan kelas yang diampu.", bold_prefix="4. Penugasan Kelas: ")
    b.add_bullet("Isi Username, Password Baru, Nama Lengkap, Nomor Telepon/WhatsApp, dan Email pengguna.", bold_prefix="5. Kredensial: ")
    b.add_bullet("Fitur Reset Sandi: Admin dapat mereset kata sandi pengguna sewaktu-waktu jika pengguna lupa kata sandi.", bold_prefix="Reset Password: ")

    b.add_image_placeholder(
        "Halaman Manajemen User & Formulir Penugasan Hak Akses",
        "Tabel daftar user admin, guru, dan ortu beserta modal pembuatan user baru dengan pilihan peran (role) dan cabang sekolah.",
        "/admin/dashboard -> Tab 'users'",
        "Buka menu 'User Admin & Akses', klik tombol 'Tambah Pengguna' hingga modal input terbuka, lalu ambil screenshot."
    )

    b.add_heading_2("4.5 Pengelolaan Master Kelas & Plotting Siswa")
    b.add_paragraph(
        "Menu 'Master Kelas & Plotting' (Tab 'classes') mengatur rombongan belajar (rombel) di sekolah:"
    )
    b.add_bullet("Membuat Kelas Baru: Klik 'Tambah Kelas', masukkan Nama Kelas (misal: 'TK A - Sentra Imtaq'), Tingkat (TK A / TK B / Daycare), Tahun Ajaran (misal: '2026/2027'), Kapasitas Maksimal Siswa (misal: 20 anak), serta pilih Guru Wali Kelas dari daftar guru.", bold_prefix="Master Kelas: ")
    b.add_bullet("Plotting Siswa ke Kelas: Pada bagian bawah tabel kelas, terdapat daftar siswa yang 'Belum Memiliki Kelas'. Admin cukup memilih siswa dan menentukan kelas tujuan dengan 1 klik agar siswa masuk ke rombel yang sesuai.", bold_prefix="Plotting Siswa: ")

    b.add_image_placeholder(
        "Halaman Master Kelas & Fitur Plotting Pembagian Siswa",
        "Tampilan kartu/tabel daftar kelas, informasi kapasitas & wali kelas, serta antarmuka penempatan siswa ke dalam kelas.",
        "/admin/dashboard -> Tab 'classes'",
        "Buka menu 'Master Kelas & Plotting', ambil screenshot yang memperlihatkan daftar kelas dan area plotting siswa."
    )

    b.add_heading_2("4.6 Pengelolaan Pendaftaran PPDB & Verifikasi Berkas")
    b.add_paragraph(
        "Menu 'Pendaftaran PPDB' (Tab 'ppdb') merupakan pusat pengolahan calon peserta didik baru:"
    )
    b.add_bullet("Penyaringan & Pencarian: Filter pendaftar berdasarkan cabang sekolah, status pendaftaran (Semua, Menunggu Verifikasi, Diterima, Ditolak), dan pencarian nama/nomor registrasi.", bold_prefix="Filter Cepat: ")
    b.add_bullet("Pratinjau Dokumen Berkas: Klik baris pendaftar untuk membuka modal rincian lengkap. Admin dapat mengeklik tombol pratinjau untuk melihat dokumen KK, Akta Kelahiran, Pas Foto, KTP, dan bukti transfer pembayaran dengan modal resolusi tinggi.", bold_prefix="Verifikasi Dokumen: ")
    b.add_bullet("Pembaruan Status Pendaftaran: Ubah status menjadi 'Diterima' (ACCEPTED) setelah berkas dan pembayaran valid, atau 'Ditolak' (REJECTED) dengan menuliskan catatan alasan kekurangan berkas.", bold_prefix="Ubah Status: ")
    b.add_bullet("Konfirmasi WhatsApp Otomatis: Klik tombol WhatsApp dengan logo hijau untuk mengirim pesan template resmi ke nomor orang tua siswa yang mengabarkan status penerimaan berkas.", bold_prefix="Notifikasi WhatsApp: ")
    b.add_bullet("Konversi Menjadi Siswa Aktif: Saat pendaftar disetujui, admin dapat menekan tombol 'Jadikan Siswa Aktif' untuk mengenerate NISN dan akun portal siswa/wali murid secara otomatis.", bold_prefix="Aktivasi Siswa: ")

    b.add_image_placeholder(
        "Tabel Data Pendaftaran PPDB & Filter Status",
        "Tabel pendaftar PPDB menampilkan Nomor Registrasi, Nama Anak, Pilihan Program, Status Pembayaran, Status Berkas, dan tombol aksi.",
        "/admin/dashboard -> Tab 'ppdb'",
        "Buka menu 'Pendaftaran PPDB', ambil screenshot tabel data pendaftar."
    )
    b.add_image_placeholder(
        "Modal Detail Verifikasi Dokumen & Bukti Bayar PPDB",
        "Pop-up rincian pendaftar PPDB menampilkan biodata anak, orang tua, pratinjau gambar bukti transfer, dan dokumen persyaratan.",
        "/admin/dashboard -> Tab 'ppdb' (Modal Detail)",
        "Klik salah satu baris pendaftar PPDB hingga modal detail terbuka, lalu ambil screenshot modal verifikasi berkas."
    )

    b.add_heading_2("4.7 Manajemen Data Siswa Aktif & Kartu QR Code")
    b.add_paragraph(
        "Menu 'Kelola Data Siswa' (Tab 'students') mengelola basis data seluruh siswa yang sedang menempuh pendidikan di sekolah:"
    )
    b.add_bullet("Input Siswa Manual: Menambahkan data siswa baru lengkap dengan NISN unik, username login wali murid, nama orang tua, nomor telepon, alamat, dan foto avatar.", bold_prefix="Tambah Siswa: ")
    b.add_bullet("Pengaturan Bobot Penilaian: Admin dapat mengatur persentase pembobotan penilaian akhir siswa: Bobot Kehadiran (%), Bobot Nilai Harian (%), dan Bobot Nilai Semester/Rapor (%). Default sistem: 20% Kehadiran, 40% Harian, 40% Semester.", bold_prefix="Bobot Nilai: ")
    b.add_bullet("Generate & Cetak Kartu Pelajar QR Code: Sistem secara otomatis menghasilkan barcode QR Code unik berbasis NISN siswa. Admin dapat mengklik tombol 'Cetak Kartu QR' untuk mencetak kartu fisik yang dapat dikalungkan oleh siswa saat hadir ke sekolah.", bold_prefix="Kartu Pelajar QR: ")

    b.add_image_placeholder(
        "Halaman Manajemen Data Siswa & Pengaturan Bobot Penilaian",
        "Tabel siswa aktif dengan kolom NISN, Nama, Kelas, Kontak Ortu, Persentase Kehadiran, Nilai Rata-rata, dan tombol aksi.",
        "/admin/dashboard -> Tab 'students'",
        "Buka menu 'Kelola Data Siswa', ambil screenshot tabel siswa."
    )
    b.add_image_placeholder(
        "Tampilan Cetak Kartu Pelajar Siswa dengan QR Code",
        "Desain kartu pelajar siswa lengkap dengan logo Smart Kids, foto anak, nama, NISN, kelas, dan QR Code presensi.",
        "/admin/dashboard -> Tab 'students' (Modal Kartu Pelajar)",
        "Klik tombol cetak kartu QR pada salah satu siswa hingga modal pratinjau kartu pelajar terbuka, lalu ambil screenshot."
    )

    b.add_heading_2("4.8 Pengelolaan Presensi Siswa (Scan QR & Manual)")
    b.add_paragraph(
        "Menu 'Presensi Siswa' (Tab 'attendance') menyediakan 2 (dua) metode pencatatan kehadiran yang sangat praktis:"
    )
    b.add_bullet("Pemindai Kamera QR Code (Live Scanner): Nyalakan kamera laptop atau HP dengan mengklik tombol 'Buka Kamera Scanner'. Arahkan kartu QR Code siswa ke lensa kamera. Dalam hitungan detik, sistem akan berbunyi beep dan langsung mencatat kehadiran siswa sebagai 'Hadir' lengkap dengan jam kedatangan.", bold_prefix="Metode Scanner QR: ")
    b.add_bullet("Pencatatan Presensi Manual: Admin atau guru dapat memilih tanggal dan kelas, lalu mencentang status kehadiran setiap anak: Hadir, Izin, Sakit, atau Alpa. Jika memilih Izin atau Sakit, kolom catatan keterangan dapat diisi.", bold_prefix="Metode Input Manual: ")
    b.add_bullet("Rekapitulasi Kehadiran: Tinjau total kehadiran kelas per hari atau per bulan untuk laporan bulanan.", bold_prefix="Rekap Presensi: ")

    b.add_image_placeholder(
        "Fitur Presensi Siswa & Pemindai Kamera QR Code Terintegrasi",
        "Tampilan antarmuka presensi siswa dengan kotak kamera pemindai QR Code di atas dan tabel rekapan kehadiran di bawahnya.",
        "/admin/dashboard -> Tab 'attendance'",
        "Buka menu 'Presensi Siswa', klik tombol buka pemindai QR Code, lalu ambil screenshot tampilan scanner dan tabel presensi."
    )

    b.add_heading_2("4.9 Manajemen Tenaga Pendidik / Guru")
    b.add_paragraph(
        "Menu 'Kelola Guru & Pengajar' (Tab 'teachers') memuat profil seluruh pengajar dan staf sekolah:"
    )
    b.add_bullet("Tambah Guru Baru: Isi Nama Lengkap, Jabatan (Kepala Sekolah, Guru Kelas, Guru Sentra, Guru Pendamping), Penugasan Cabang, Penugasan Kelas Binaan, Email, Telepon/WhatsApp, Pendidikan Terakhir, Bio profil, dan unggah Foto Profil.", bold_prefix="Data Guru: ")
    b.add_bullet("Kartu Identitas QR Guru: Menghasilkan barcode QR Code untuk presensi mengajar guru secara mandiri.", bold_prefix="QR Guru: ")

    b.add_image_placeholder(
        "Halaman Manajemen Tenaga Pendidik / Guru",
        "Tabel daftar guru pengajar lengkap dengan foto, nama, jabatan, kelas ditugaskan, kontak, dan tombol cetak QR.",
        "/admin/dashboard -> Tab 'teachers'",
        "Buka menu 'Kelola Guru & Pengajar', ambil screenshot tabel profil guru."
    )

    b.add_heading_2("4.10 Pemantauan Presensi Guru")
    b.add_paragraph(
        "Menu 'Presensi Guru' (Tab 'teacher-attendance') memantau kedisiplinan kehadiran staf pengajar. "
        "Admin dapat memfilter catatan presensi berdasarkan tanggal tertentu, memilih nama guru spesifik, serta melihat status kehadiran "
        "(Hadir, Izin, Sakit, Terlambat, Alpa) beserta catatan alasan ketidakhadiran."
    )
    b.add_image_placeholder(
        "Halaman Pemantauan Rekapitulasi Presensi Mengajar Guru",
        "Tabel catatan presensi kehadiran guru lengkap dengan tanggal, jam hadir, status kehadiran, dan catatan keterangan.",
        "/admin/dashboard -> Tab 'teacher-attendance'",
        "Buka menu 'Presensi Guru', ambil screenshot tabel presensi guru dengan filter tanggal."
    )

    b.add_heading_2("4.11 Pusat Progresif Fitur Guru & Ekspor Laporan CSV")
    b.add_paragraph(
        "Menu 'Pusat Progresif Fitur' (Tab 'teacher-progress') merupakan sistem evaluasi kinerja profesional guru berbasis metrik kuantitatif terpadu:"
    )
    b.add_bullet("Perhitungan Jam Mengajar: Menghitung akumulasi hari hadir guru dikalikan standar jam mengajar (3 jam/hari).", bold_prefix="Akumulasi Jam: ")
    b.add_bullet("Rasio SPP Program Belajar: Menghitung bobot rasio program kelas yang diampu guru terhadap tarif dasar SPP cabang.", bold_prefix="Rasio Program: ")
    b.add_bullet("Modal Evaluasi Kinerja Bulanan: Kepala sekolah/admin dapat membuka modal evaluasi untuk menginput target jam, jumlah siswa yang dievaluasi perkembangannya, poin progresif, dan catatan apresiasi/pembinaan.", bold_prefix="Evaluasi Bulanan: ")
    b.add_bullet("Ekspor Laporan CSV ke Excel: Klik tombol 'Unduh Riwayat CSV' untuk mengekspor seluruh rekapan kinerja progresif guru ke dalam berkas berformat .CSV (kompatibel penuh dengan Microsoft Excel) untuk pelaporan kepada pimpinan Yayasan YAPCHI.", bold_prefix="Ekspor Laporan CSV: ")

    b.add_image_placeholder(
        "Halaman Pusat Progresif Kinerja Guru & Tombol Ekspor CSV",
        "Tampilan tabel metrik jam mengajar guru, rasio SPP, evaluasi siswa, dan tombol ekspor data ke format CSV.",
        "/admin/dashboard -> Tab 'teacher-progress'",
        "Buka menu 'Pusat Progresif Fitur', ambil screenshot tabel progresif beserta tombol ekspor CSV di sudut kanan."
    )

    b.add_heading_2("4.12 Pengelolaan Persetujuan Izin & Cuti Guru")
    b.add_paragraph(
        "Menu 'Izin & Cuti Guru' (Tab 'leave-requests') menampung permohonan dispensasi tidak mengajar yang diajukan oleh guru:"
    )
    b.add_bullet("Admin memeriksa tanggal cuti, jenis izin (Sakit, Cuti Tahunan, Keperluan Pribadi, Cuti Melahirkan), dan alasan yang tertulis.", bold_prefix="Verifikasi Cuti: ")
    b.add_bullet("Admin dapat mengeklik tombol pratinjau lampiran untuk memeriksa keabsahan surat keterangan dokter atau dokumen pendukung.", bold_prefix="Pratinjau Surat: ")
    b.add_bullet("Admin memutuskan persetujuan dengan mengklik 'Setujui' (Approved) atau 'Tolak' (Rejected) disertai catatan.", bold_prefix="Keputusan Approval: ")

    b.add_image_placeholder(
        "Halaman Pengelolaan Permohonan Izin & Cuti Guru",
        "Tabel permohonan izin/cuti guru dengan tombol pratinjau surat lampiran serta tombol aksi Setujui / Tolak.",
        "/admin/dashboard -> Tab 'leave-requests'",
        "Buka menu 'Izin & Cuti Guru', ambil screenshot tabel daftar permohonan izin guru."
    )

    b.add_heading_2("4.13 Penjadwalan Kegiatan Belajar Mengajar (KBM)")
    b.add_paragraph(
        "Menu 'Jadwal KBM' (Tab 'schedules') menyusun kalender pembelajaran kelas:"
    )
    b.add_bullet("Klik 'Tambah Jadwal Baru', pilih Cabang Sekolah dan Kelas tujuan.", bold_prefix="1. Pilih Kelas: ")
    b.add_bullet("Tentukan Hari / Tanggal, Rentang Waktu (misal: 08:00 - 09:30 WIB), dan Nama Ruangan (misal: Ruang Sentra Imtaq).", bold_prefix="2. Waktu & Ruang: ")
    b.add_bullet("Ketik Tema / Mata Pelajaran (misal: 'Pengenalan Huruf Hijaiyah & Praktik Berdoa').", bold_prefix="3. Tema Pelajaran: ")
    b.add_bullet("Tuliskan Deskripsi Rencana Kegiatan / RPP ringkas yang akan dilaksanakan bersama anak.", bold_prefix="4. Rencana Aktivitas: ")
    b.add_bullet("Fitur Centang Selesai: Guru atau admin dapat menandai jadwal yang telah terlaksana.", bold_prefix="5. Status KBM: ")

    b.add_image_placeholder(
        "Halaman Pengaturan Jadwal Kegiatan Belajar Mengajar (KBM)",
        "Tabel jadwal KBM menampilkan Hari, Jam, Kelas, Ruang, Mata Pelajaran, Rencana Aktivitas, dan status selesai.",
        "/admin/dashboard -> Tab 'schedules'",
        "Buka menu 'Jadwal KBM', ambil screenshot tabel jadwal kegiatan belajar."
    )

    b.add_heading_2("4.14 Pengelolaan Keuangan SPP TK & Verifikasi Pembayaran")
    b.add_paragraph(
        "Menu 'SPP Siswa' (Tab 'spp') merupakan modul penatausahaan tagihan iuran bulanan siswa:"
    )
    b.add_bullet("Matriks Tagihan Bulanan: Menyajikan daftar tagihan siswa untuk 12 bulan (Juli hingga Juni).", bold_prefix="Daftar Tagihan: ")
    b.add_bullet("Status Tagihan: Tiga status utama: 'Lunas' (hijau), 'Belum Bayar' (merah), dan 'Menunggu Verifikasi' (kuning).", bold_prefix="Indikator Status: ")
    b.add_bullet("Verifikasi Slip Transfer Ortu: Saat orang tua mengunggah bukti bayar melalui portal wali murid, status berubah menjadi 'Menunggu Verifikasi'. Admin membuka modal verifikasi, memeriksa foto bukti transfer, lalu mengklik 'Konfirmasi Pembayaran Lunas'.", bold_prefix="Verifikasi Transfer: ")
    b.add_bullet("Pembayaran Tunai di Kasir Sekolah: Jika orang tua membayar langsung secara tunai ke bendahara sekolah, admin dapat mencatat pembayaran dengan metode 'TUNAI' dan langsung menandai lunas.", bold_prefix="Bayar Tunai: ")
    b.add_bullet("Cetak Kwitansi Digital Resmi: Sistem menyediakan tombol 'Cetak Kwitansi' dengan nomor transaksi unik, stempel digital sekolah, dan rincian nominal pembayaran yang siap dicetak atau disimpan sebagai PDF.", bold_prefix="Kwitansi Digital: ")

    b.add_image_placeholder(
        "Halaman Manajemen Tagihan SPP Siswa & Modal Verifikasi Bukti Bayar",
        "Tabel tagihan SPP bulanan siswa beserta modal verifikasi slip bukti transfer bank yang diunggah orang tua.",
        "/admin/dashboard -> Tab 'spp'",
        "Buka menu 'SPP Siswa', klik salah satu data pembayaran hingga modal verifikasi terbuka, lalu ambil screenshot."
    )
    b.add_image_placeholder(
        "Tampilan Pratinjau Kwitansi Digital Resmi Pembayaran SPP",
        "Format cetak kwitansi resmi Smart Kids lengkap dengan nomor bukti bayar, nama siswa, NISN, bulan tagihan, dan nominal lunas.",
        "/admin/dashboard -> Tab 'spp' (Modal Kwitansi)",
        "Klik tombol 'Cetak Kwitansi' pada siswa yang telah lunas, ambil screenshot tampilan kwitansi resmi."
    )

    b.add_heading_2("4.15 Pengelolaan Tagihan Biaya Tambahan Siswa")
    b.add_paragraph(
        "Menu 'Biaya Tambahan' (Tab 'additional-fees') digunakan untuk membebankan tagihan non-SPP, seperti:"
    )
    b.add_bullet("Pembelian Paket Seragam Sekolah (Batik, Olahraga, Muslim).", bold_prefix="Seragam: ")
    b.add_bullet("Buku Paket Modul Belajar dan Buku Gambar Siswa.", bold_prefix="Buku & Modul: ")
    b.add_bullet("Biaya Kegiatan Outing Class, Field Trip, atau Kunjungan Edukatif.", bold_prefix="Outing Class: ")
    b.add_bullet("Pentas Seni Akhir Tahun dan Wisuda Kelulusan.", bold_prefix="Pentas Seni: ")
    b.add_paragraph(
        "Admin dapat membuat tagihan perorangan atau secara kolektif (massal) untuk satu kelas sekaligus lengkap dengan tanggal jatuh tempo (due date). "
        "Siswa dan wali murid akan melihat tagihan ini di portal mereka."
    )
    b.add_image_placeholder(
        "Halaman Pengelolaan Tagihan Biaya Tambahan Siswa",
        "Tabel tagihan biaya tambahan menampilkan nama siswa, jenis biaya, nominal, tenggat waktu, status bayar, dan aksi.",
        "/admin/dashboard -> Tab 'additional-fees'",
        "Buka menu 'Biaya Tambahan', ambil screenshot tabel data tagihan biaya tambahan."
    )

    b.add_heading_2("4.16 Pengaturan Metode Pembayaran (Master Rekening & QRIS)")
    b.add_paragraph(
        "Menu 'Metode Pembayaran' (Tab 'payment-settings') mengatur saluran transaksi pembayaran resmi cabang sekolah:"
    )
    b.add_bullet("Master Rekening Bank: Menambahkan akun bank sekolah (Nama Bank, Nomor Rekening, Atas Nama Pemilik Rekening, Logo Bank, serta toggle Aktif/Nonaktif).", bold_prefix="Rekening Bank: ")
    b.add_bullet("Master QRIS Cabang: Mengunggah gambar barcode QRIS resmi sekolah dan mengaktifkan statusnya agar tampil di formulir PPDB dan portal SPP.", bold_prefix="Master QRIS: ")
    b.add_bullet("Komponen Biaya Sekolah: Menentukan daftar tarif pendaftaran PPDB wajib maupun biaya tambahan opsional.", bold_prefix="Master Komponen: ")

    b.add_image_placeholder(
        "Halaman Pengaturan Rekening Bank Resmi & Gambar QRIS",
        "Tampilan kartu rekening bank resmi (BCA, Mandiri) dan area unggah barcode QRIS resmi sekolah.",
        "/admin/dashboard -> Tab 'payment-settings'",
        "Buka menu 'Metode Pembayaran', ambil screenshot kartu rekening dan area barcode QRIS."
    )

    b.add_heading_2("4.17 Pengelolaan Bimbingan Belajar Les SD (Admin)")
    b.add_paragraph(
        "Menu 'Kelola Les SD' (Tab 'les-sd') terbagi menjadi 2 subtab penting:"
    )
    b.add_bullet("Subtab Pendaftaran Siswa Les: Menampilkan seluruh anak SD yang mendaftar. Admin dapat menugaskan Guru PIC (Penanggung Jawab) yang akan membimbing anak tersebut, serta mengaktifkan status siswa menjadi AKTIF.", bold_prefix="Pendaftaran & Penunjukan PIC: ")
    b.add_bullet("Subtab SPP Les SD: Memantau tagihan bulanan les SD (Rp 200.000 / paket), memeriksa slip bukti bayar transfer dari orang tua, dan memverifikasi pelunasan.", bold_prefix="SPP Les SD: ")

    b.add_image_placeholder(
        "Halaman Manajemen Pendaftaran & Guru PIC Bimbingan Les SD",
        "Tabel peserta les SD menampilkan Nama Anak, Kelas SD, Sekolah Asal, Pilihan Paket, Guru PIC yang ditugaskan, dan status pendaftaran.",
        "/admin/dashboard -> Tab 'les-sd'",
        "Buka menu 'Kelola Les SD', ambil screenshot tabel data pendaftar les SD."
    )

    b.add_heading_2("4.18 Publikasi Pengumuman & Edaran Sekolah")
    b.add_paragraph(
        "Menu 'Pengumuman' (Tab 'announcements') memfasilitasi siaran edaran digital resmi sekolah:"
    )
    b.add_bullet("Klik tombol 'Buat Pengumuman Baru'.", bold_prefix="1. Buat Pengumuman: ")
    b.add_bullet("Ketik Judul Pengumuman (misal: 'Pemberitahuan Libur Hari Raya Idul Fitri 1447 H').", bold_prefix="2. Judul Edaran: ")
    b.add_bullet("Pilih Sasaran Penerima (Target Role): 'Semua Pengguna', 'Khusus Guru', atau 'Khusus Orang Tua'.", bold_prefix="3. Target Sasaran: ")
    b.add_bullet("Tuliskan Isi Pengumuman secara lengkap dan cantumkan Nama Pengirim (misal: 'Kepala Sekolah Smart Kids Sadjati').", bold_prefix="4. Konten Edaran: ")
    b.add_bullet("Pengumuman akan langsung tampil di dashboard guru dan dashboard wali murid sesuai target sasaran.", bold_prefix="5. Siaran Langsung: ")

    b.add_image_placeholder(
        "Formulir Publikasi Pengumuman & Penentuan Target Role Penerima",
        "Modal pembuatan pengumuman baru dengan pilihan target role (Semua / Guru / Orang Tua) dan tabel riwayat pengumuman aktif.",
        "/admin/dashboard -> Tab 'announcements'",
        "Buka menu 'Pengumuman', klik tombol buat pengumuman hingga modal terbuka, lalu ambil screenshot."
    )

    b.add_heading_2("4.19 Pengelolaan Konten Website (CMS: Program, Galeri & Testimoni)")
    b.add_paragraph(
        "Administrator dapat memperbarui konten publik tanpa perlu memahami kode pemrograman:"
    )
    b.add_bullet("Kelola Program Belajar (Tab 'programs'): Mengubah nama program, rentang usia, fasilitas unggulan, dan tarif SPP default.", bold_prefix="Program Belajar: ")
    b.add_bullet("Kelola Galeri (Tab 'gallery'): Mengunggah dokumentasi foto kegiatan baru, menentukan judul dan kategori album.", bold_prefix="Galeri Foto: ")
    b.add_bullet("Kelola Testimoni (Tab 'testimonials'): Memasukkan kutipan kepuasan orang tua, nama wali murid, rating bintang (1-5), dan warna latar kartu.", bold_prefix="Testimoni Ortu: ")

    b.add_image_placeholder(
        "Halaman Pengelolaan Konten Program Belajar, Galeri & Testimoni",
        "Tampilan antarmuka CMS untuk mengedit kartu program belajar, mengunggah foto galeri, dan menambah ulasan testimoni.",
        "/admin/dashboard -> Tab 'programs' / 'gallery'",
        "Buka menu 'Kelola Program Belajar' atau 'Kelola Galeri', ambil screenshot antarmuka pengelolaan konten."
    )

    b.add_heading_2("4.20 Kustomisasi Profil Website Sekolah")
    b.add_paragraph(
        "Menu 'Pengaturan Website' (Tab 'profile') menyesuaikan profil fisik dan digital cabang sekolah:"
    )
    b.add_bullet("Teks Hero Banner: Lencana teks, judul utama banner hero, dan subjudul ajakan belajar.", bold_prefix="Hero Section: ")
    b.add_bullet("Tautan Video YouTube: Memperbarui link video profil YouTube resmi cabang sekolah.", bold_prefix="Video Profil: ")
    b.add_bullet("Informasi Kontak & Medsos: Nomor telepon, nomor WhatsApp, akun Instagram, akun Facebook, dan alamat lengkap fisik sekolah.", bold_prefix="Kontak & Alamat: ")
    b.add_bullet("Layanan Bantuan & Jam Operasional: Judul dan jam operasional layanan orang tua yang tampil di footer website.", bold_prefix="Jam Operasional: ")

    b.add_image_placeholder(
        "Halaman Pengaturan Profil Website & Teks Informasi Sekolah",
        "Formulir pengaturan website mencakup teks hero, URL video YouTube, nomor WhatsApp, Instagram, dan alamat sekolah.",
        "/admin/dashboard -> Tab 'profile'",
        "Buka menu 'Pengaturan Website', ambil screenshot formulir konfigurasi profil website."
    )

    # =========================================================================
    # BAB 5
    # =========================================================================
    b.add_page_break()
    b.add_heading_1("BAB 5: PANDUAN GURU / TENAGA PENDIDIK")
    b.add_paragraph(
        "Portal Guru dirancang khusus untuk memfasilitasi aktivitas belajar-mengajar harian para tenaga pendidik. "
        "Guru memiliki antarmuka khusus yang bersih dan fokus pada kegiatan kelas, presensi anak, penilaian perkembangan, dan absensi mengajar."
    )

    b.add_heading_2("5.1 Dashboard Guru & Tinjauan Aktivitas Harian")
    b.add_paragraph(
        "Saat guru login ke dalam sistem, dashboard menyajikan ringkasan tugas hari ini:"
    )
    b.add_bullet("Nama Kelas Binaan yang diampu (misal: 'Wali Kelas: TK A Sentra Imtaq').", bold_prefix="Kelas Binaan: ")
    b.add_bullet("Jadwal Mengajar Hari Ini beserta tema pembelajaran dan ruangan kelas.", bold_prefix="Jadwal Hari Ini: ")
    b.add_bullet("Status Presensi Mengajar Diri Sendiri hari ini (apakah sudah absen atau belum).", bold_prefix="Status Absensi: ")
    b.add_bullet("Pusat Pengumuman Sekolah terbaru dari yayasan atau kepala sekolah.", bold_prefix="Pengumuman: ")

    b.add_image_placeholder(
        "Tampilan Dashboard Khusus Guru & Agenda Mengajar Harian",
        "Dashboard guru menampilkan kartu informasi kelas binaan, jadwal mengajar hari ini, status presensi guru, dan pengumuman.",
        "/admin/dashboard (Login Akun Guru)",
        "Login menggunakan akun dengan role GURU, ambil screenshot tampilan beranda guru."
    )

    b.add_heading_2("5.2 Pencatatan Presensi Siswa Kelas (Scan QR & Manual)")
    b.add_paragraph(
        "Guru kelas bertugas mencatat kehadiran anak didiknya setiap pagi:"
    )
    b.add_bullet("Pencatatan Cepat Scan QR: Buka tab 'Presensi Siswa', klik 'Buka Kamera Scanner', lalu scan kartu QR anak saat anak memasuki ruangan kelas.", bold_prefix="Scan QR Siswa: ")
    b.add_bullet("Pencatatan Manual: Guru dapat menandai anak yang izin atau sakit dan menyertakan keterangan (misal: 'Demam sejak semalam').", bold_prefix="Catatan Sakit/Izin: ")

    b.add_image_placeholder(
        "Antarmuka Presensi Siswa oleh Guru Kelas",
        "Tampilan presensi siswa di akun guru dengan daftar anak kelas binaan dan opsi status kehadiran Hadir/Sakit/Izin/Alpa.",
        "/admin/dashboard -> Tab 'attendance' (Akun Guru)",
        "Pada akun guru, buka menu 'Presensi Siswa', ambil screenshot formulir absensi harian kelas binaan."
    )

    b.add_heading_2("5.3 Penginputan Nilai Harian & Catatan Perkembangan Anak")
    b.add_paragraph(
        "Pendidikan anak usia dini mengutamakan evaluasi perkembangan karakter, motorik, dan kognitif. "
        "Guru menginput nilai harian dan catatan deskriptif pada menu 'Master Kelas & Siswa' / 'Catatan Nilai':"
    )
    b.add_bullet("Aspek Nilai Agama & Moral: Perkembangan ibadah, doa harian, dan akhlak santun anak.", bold_prefix="Nilai Moral & Agama: ")
    b.add_bullet("Aspek Kognitif & Berpikir: Daya nalar, pengenalan bentuk, angka, dan pemecahan masalah sederhana.", bold_prefix="Nilai Kognitif: ")
    b.add_bullet("Aspek Fisik & Motorik: Keterampilan motorik halus (menggunting, menggambar) dan motorik kasar (berlari, melompat).", bold_prefix="Nilai Motorik: ")
    b.add_bullet("Aspek Bahasa & Komunikasi: Kemampuan berbicara, mengungkapkan ide, dan menyimak cerita.", bold_prefix="Nilai Bahasa: ")
    b.add_bullet("Aspek Sosial Emosional: Kemandirian, kerja sama antarteman, dan empati.", bold_prefix="Sosial Emosional: ")
    b.add_bullet("Catatan Evaluasi Guru: Guru menuliskan rangkuman catatan positif dan arahan stimulasi bagi orang tua di rumah.", bold_prefix="Catatan Rapor: ")

    b.add_image_placeholder(
        "Halaman Input Nilai Harian & Evaluasi Perkembangan Anak",
        "Formulir pengisian skor nilai harian berdasarkan aspek perkembangan serta kolom catatan narasi perkembangan anak oleh guru.",
        "/admin/dashboard -> Tab 'classes' / 'student-grades' (Akun Guru)",
        "Buka formulir input nilai siswa di akun guru, ambil screenshot tampilan input nilai per aspek perkembangan."
    )

    b.add_heading_2("5.4 Memeriksa Jadwal Mengajar KBM Harian")
    b.add_paragraph(
        "Guru dapat membuka menu 'Jadwal Mengajar KBM' untuk meninjau materi pelajaran, ruangan, dan rencana kegiatan yang telah disusun. "
        "Setelah jam mengajar selesai, guru dapat mencentang status 'Selesai' sebagai laporan terlaksananya KBM."
    )

    b.add_heading_2("5.5 Presensi Mandiri Mengajar Guru")
    b.add_paragraph(
        "Guru wajib melakukan absensi kedatangan dan kepulangan pada menu 'Presensi Mengajar Guru'. "
        "Sistem mencatat waktu (jam dan menit) kedatangan guru yang secara otomatis akan diakumulasikan ke dalam laporan pusat progresif bulanan."
    )
    b.add_image_placeholder(
        "Antarmuka Presensi Kehadiran Mandiri Guru",
        "Layar presensi mengajar guru dengan tombol presensi kehadiran harian dan riwayat absensi mengajar pribadi.",
        "/admin/dashboard -> Tab 'teacher-attendance' (Akun Guru)",
        "Buka menu presensi guru pada akun pengajar, ambil screenshot tampilan presensi mandiri."
    )

    b.add_heading_2("5.6 Pengajuan Permohonan Izin / Cuti Online")
    b.add_paragraph(
        "Bila guru berhalangan mengajar karena sakit atau ada keperluan mendesak, guru tidak perlu membuat surat fisik manual:"
    )
    b.add_bullet("Buka tab 'Pengajuan Izin & Cuti', klik 'Ajukan Cuti Baru'.", bold_prefix="1. Buka Menu: ")
    b.add_bullet("Pilih Jenis Permohonan: Izin Sakit, Cuti Tahunan, Keperluan Pribadi, atau Cuti Melahirkan.", bold_prefix="2. Jenis Cuti: ")
    b.add_bullet("Pilih Tanggal Mulai dan Tanggal Selesai permohonan dispensasi.", bold_prefix="3. Tanggal Cuti: ")
    b.add_bullet("Tuliskan Alasan Ketidakhadiran secara jelas.", bold_prefix="4. Alasan: ")
    b.add_bullet("Unggah Berkas Bukti (misal: Surat Keterangan Istirahat dari Dokter) dengan batas maksimal 1 MB.", bold_prefix="5. Unggah Surat: ")
    b.add_bullet("Klik 'Kirim Pengajuan'. Guru dapat memantau status persetujuan (Pending, Disetujui, Ditolak) secara langsung di tabel.", bold_prefix="6. Pantau Status: ")

    b.add_image_placeholder(
        "Formulir Pengajuan Izin / Cuti Online oleh Guru",
        "Modal permohonan izin/cuti dengan input tanggal mulai-selesai, jenis izin, alasan, dan kolom upload surat dokter.",
        "/admin/dashboard -> Tab 'leave-requests' (Akun Guru)",
        "Buka menu izin & cuti pada akun guru, klik tombol ajukan cuti hingga formulir modal muncul, lalu ambil screenshot."
    )

    b.add_heading_2("5.7 Tugas Bimbingan Belajar Les SD (Khusus Guru PIC)")
    b.add_paragraph(
        "Bagi guru yang ditunjuk sebagai Penanggung Jawab (PIC) Bimbingan Belajar Les SD, akan muncul tab 'Bimbingan Les SD (PIC)'. "
        "Guru PIC dapat memantau nama-nama anak SD asuhannya, jadwal les mingguan, kontak WhatsApp orang tua siswa les, "
        "serta mencatat kemajuan belajar mata pelajaran sekolah dasar anak asuhannya."
    )
    b.add_image_placeholder(
        "Halaman Pembimbingan Les SD Khusus Guru PIC",
        "Tampilan dashboard pembimbingan les SD bagi guru PIC memuat daftar murid asuhan, paket bimbingan, dan jadwal pertemuan.",
        "/admin/dashboard -> Tab 'les-sd' (Akun Guru PIC)",
        "Buka menu bimbingan les SD pada akun guru yang bertindak sebagai PIC, ambil screenshot tabel anak bimbingan."
    )

    b.add_heading_2("5.8 Mengakses Pusat Pengumuman Sekolah")
    b.add_paragraph(
        "Pada menu 'Pengumuman Sekolah', guru dapat membaca surat edaran penting dari yayasan dan manajemen sekolah. "
        "Pengumuman disajikan lengkap dengan tanggal rilis, nama pengirim, dan isi edaran resmi."
    )

    # =========================================================================
    # BAB 6
    # =========================================================================
    b.add_page_break()
    b.add_heading_1("BAB 6: PANDUAN ORANG TUA / WALI MURID")
    b.add_paragraph(
        "Portal Wali Murid dirancang khusus untuk memberikan ketenangan pikiran dan transparansi bagi para orang tua. "
        "Orang tua dapat memantau perkembangan ananda tercinta, memastikan kehadiran di sekolah, membayar tagihan SPP online tanpa harus mengantre, "
        "hingga mengunduh bukti kwitansi resmi kapan saja dan di mana saja."
    )

    b.add_heading_2("6.1 Beranda Ananda: Memantau Profil & Ringkasan Pendidikan")
    b.add_paragraph(
        "Saat orang tua berhasil login, halaman utama menampilkan 'Beranda Ananda' dengan kartu informasi ramah keluarga:"
    )
    b.add_bullet("Foto dan Nama Lengkap Ananda beserta NISN resmi.", bold_prefix="Identitas Anak: ")
    b.add_bullet("Cabang Sekolah dan Kelas saat ini (misal: 'TK A - Sentra Imtaq | Smart Kids Sadjati').", bold_prefix="Kelas & Cabang: ")
    b.add_bullet("Nama Guru Wali Kelas beserta nomor kontak yang dapat dihubungi.", bold_prefix="Wali Kelas: ")
    b.add_bullet("Ringkasan Cepat: Persentase kehadiran bulan ini, status pembayaran SPP bulan berjalan (Lunas / Belum Bayar), dan rata-rata perkembangan belajar.", bold_prefix="Kartu Ringkasan: ")

    b.add_image_placeholder(
        "Tampilan Beranda Ananda pada Portal Wali Murid",
        "Layar beranda portal ortu menampilkan profil ananda, foto anak, wali kelas, kartu status SPP, dan ringkasan kehadiran.",
        "/admin/dashboard -> Tab 'overview' (Login Akun Ortu)",
        "Login menggunakan akun dengan role ORANG_TUA, ambil screenshot beranda ananda yang memuat data siswa."
    )

    b.add_heading_2("6.2 Monitoring Nilai Harian & Rapor Perkembangan Ananda")
    b.add_paragraph(
        "Orang tua dapat membuka menu 'Monitoring Nilai Ananda' (Tab 'student-grades') untuk melihat evaluasi belajar secara mendalam:"
    )
    b.add_bullet("Grafik Capaian Aspek: Nilai Moral & Agama, Kognitif, Fisik-Motorik, Bahasa, dan Sosial Emosional.", bold_prefix="Grafik Perkembangan: ")
    b.add_bullet("Catatan Harian Guru: Guru menuliskan catatan deskriptif mengenai kemajuan anak (misal: 'Ananda hari ini sangat percaya diri saat bercerita di depan kelas').", bold_prefix="Catatan Ibu Guru: ")
    b.add_bullet("Nilai Rapor Akhir Semester: Akumulasi nilai akhir berbobot yang dapat dijadikan bahan evaluasi orang tua di rumah.", bold_prefix="Rapor Digital: ")

    b.add_image_placeholder(
        "Tampilan Monitoring Nilai & Catatan Perkembangan Anak (Portal Ortu)",
        "Layar nilai siswa di portal wali murid menampilkan grafik batang capaian aspek perkembangan anak dan catatan narasi guru.",
        "/admin/dashboard -> Tab 'student-grades' (Akun Ortu)",
        "Buka menu monitoring nilai pada akun orang tua, ambil screenshot tampilan grafik nilai dan catatan guru."
    )

    b.add_heading_2("6.3 Memantau Catatan Presensi Kehadiran Anak")
    b.add_paragraph(
        "Pada menu 'Presensi Kehadiran' (Tab 'attendance'), orang tua dapat melihat kalender kehadiran ananda. "
        "Setiap kali ananda melakukan scan QR di gerbang sekolah, catatan waktu hadir otomatis tercatat di halaman ini, "
        "sehingga orang tua merasa aman dan yakin bahwa anak telah tiba di sekolah dengan selamat."
    )
    b.add_image_placeholder(
        "Riwayat Presensi Kehadiran Ananda pada Akun Orang Tua",
        "Tabel catatan kehadiran anak menampilkan tanggal, jam kedatangan di sekolah, status (Hadir/Sakit/Izin), dan persentase kehadiran.",
        "/admin/dashboard -> Tab 'attendance' (Akun Ortu)",
        "Buka menu presensi pada akun orang tua, ambil screenshot tabel riwayat kehadiran anak."
    )

    b.add_heading_2("6.4 Mengetahui Jadwal Kegiatan Belajar Mengajar (KBM)")
    b.add_paragraph(
        "Menu 'Jadwal Belajar KBM' (Tab 'schedules') menyajikan kalender aktivitas belajar ananda. "
        "Orang tua dapat mengetahui tema pelajaran esok hari, perlengkapan yang perlu dipersiapkan dari rumah, "
        "hingga jadwal kegiatan luar ruangan atau cooking class."
    )

    b.add_heading_2("6.5 Panduan Pembayaran SPP TK Online & Cetak Kwitansi Digital")
    b.add_paragraph(
        "Menu 'Pembayaran SPP TK' (Tab 'spp') mempermudah pembayaran SPP bulanan tanpa perlu datang ke kasir sekolah:"
    )
    b.add_bullet("Buka tab 'Pembayaran SPP TK'. Di layar tersaji 12 kartu bulan tagihan (Juli hingga Juni).", bold_prefix="1. Pilih Bulan Tagihan: ")
    b.add_bullet("Pilih bulan yang berstatus 'Belum Bayar' (ditandai warna merah/kuning). Klik tombol 'Bayar Sekarang'.", bold_prefix="2. Klik Bayar: ")
    b.add_bullet("Layar akan menampilkan informasi nomor rekening resmi sekolah (misal: BCA 123-456-7890 atas nama Smart Kids) atau Gambar Kode QRIS Sekolah.", bold_prefix="3. Info Rekening / QRIS: ")
    b.add_bullet("Lakukan transfer dana melalui Mobile Banking, ATM, atau scan QRIS melalui dompet digital.", bold_prefix="4. Lakukan Transfer: ")
    b.add_bullet("Ambil foto atau screenshot struk bukti transfer yang berhasil, lalu unggah pada kolom 'Unggah Bukti Pembayaran' (maks 1 MB).", bold_prefix="5. Upload Struk: ")
    b.add_bullet("Klik 'Kirim Konfirmasi Pembayaran'. Status tagihan akan berubah menjadi 'Menunggu Konfirmasi' (kuning).", bold_prefix="6. Verifikasi Admin: ")
    b.add_bullet("Setelah diverifikasi oleh pihak bendahara sekolah, status tagihan otomatis berubah menjadi 'LUNAS' (hijau).", bold_prefix="7. Status Lunas: ")
    b.add_bullet("Orang tua dapat mengklik tombol 'Unduh Kwitansi' untuk mencetak bukti pelunasan SPP berstempel digital resmi.", bold_prefix="8. Kwitansi Digital: ")

    b.add_image_placeholder(
        "Halaman Pembayaran SPP Online & Unggah Bukti Bayar (Wali Murid)",
        "Tampilan kartu tagihan SPP bulanan di portal ortu lengkap dengan tombol bayar, rincian rekening, dan form unggah struk transfer.",
        "/admin/dashboard -> Tab 'spp' (Akun Ortu)",
        "Buka menu pembayaran SPP pada akun orang tua, klik tombol bayar hingga modal transfer muncul, lalu ambil screenshot."
    )
    b.add_image_placeholder(
        "Tampilan Kwitansi Resmi Pembayaran SPP di Portal Wali Murid",
        "Pratinjau kwitansi digital pembayaran SPP yang siap diunduh atau dicetak oleh orang tua.",
        "/admin/dashboard -> Tab 'spp' (Unduh Kwitansi Ortu)",
        "Klik tombol kwitansi pada bulan yang telah lunas di akun orang tua, ambil screenshot kwitansi resmi."
    )

    b.add_heading_2("6.6 Pendaftaran & Pemantauan Program Les SD Ananda")
    b.add_paragraph(
        "Bagi orang tua yang memiliki kakak atau ananda yang telah memasuki usia sekolah dasar, orang tua dapat langsung mendaftarkan "
        "bimbingan belajar pada tab 'Program Les SD'. Di halaman ini, orang tua dapat memantau perkembangan belajar les SD anak dan "
        "membayar iuran les SD secara terintegrasi."
    )

    b.add_heading_2("6.7 Membaca Pengumuman & Agenda Penting Sekolah")
    b.add_paragraph(
        "Menu 'Pengumuman Sekolah' memastikan orang tua tidak tertinggal informasi penting, seperti tanggal pembagian rapor, jadwal outing class, "
        "surat edaran hari libur nasional, hingga agenda parenting school bersama para pakar pendidikan anak."
    )

    # =========================================================================
    # BAB 7
    # =========================================================================
    b.add_page_break()
    b.add_heading_1("BAB 7: TANYA JAWAB (FAQ) & PANDUAN PEMECAHAN MASALAH")
    b.add_paragraph(
        "Bab ini menyajikan solusi praktis terhadap kendala operasional yang paling sering ditemui oleh pengguna sistem:"
    )

    b.add_heading_2("7.1 Lupa Kata Sandi Akun / Akun Terkunci")
    b.add_paragraph(
        "Kendala: Pengguna tidak dapat masuk karena lupa kata sandi atau salah memasukkan kata sandi.",
        bold_prefix="Gejala: "
    )
    b.add_paragraph(
        "Solusi: Orang tua atau guru dapat menghubungi pihak Administrator Sekolah melalui nomor WhatsApp layanan bantuan resmi. "
        "Administrator Cabang atau Super Admin dapat membuka menu 'User Admin & Akses' (Tab 'users'), mencari nama pengguna, "
        "dan melakukan reset kata sandi menjadi kata sandi sementara.",
        bold_prefix="Solusi Perbaikan: "
    )

    b.add_heading_2("7.2 Gagal Mengunggah Berkas / Dokumen Pendaftaran")
    b.add_paragraph(
        "Kendala: Muncul pesan kesalahan 'Ukuran file melebihi batas maksimal' atau file tidak dapat diproses saat pendaftaran PPDB atau upload bukti bayar.",
        bold_prefix="Gejala: "
    )
    b.add_paragraph(
        "Solusi: Sistem membatasi ukuran berkas maksimal sebesar 1 MB (1024 KB). Pastikan file foto atau dokumen PDF Anda tidak melebihi 1 MB. "
        "Jika foto diambil dengan kamera HP resolusi tinggi yang menghasilkan file 3-5 MB, silakan kompres foto terlebih dahulu "
        "(dapat menggunakan aplikasi kompres foto, kirim foto ke WhatsApp sendiri lalu unduh kembali, atau menggunakan web kompresi online). "
        "Pastikan pula format file adalah JPG, PNG, atau PDF.",
        bold_prefix="Solusi Perbaikan: "
    )

    b.add_heading_2("7.3 Kamera Pemindai QR Code Tidak Aktif di Browser")
    b.add_paragraph(
        "Kendala: Kotak pemindai kamera QR Code di menu presensi berwarna hitam atau muncul peringatan 'Izin kamera ditolak'.",
        bold_prefix="Gejala: "
    )
    b.add_paragraph(
        "Solusi: 1) Periksa izin akses kamera pada peramban web Anda (klik ikon gembok di bilah alamat browser, lalu aktifkan opsi Camera: Allow). "
        "2) Pastikan kamera tidak sedang digunakan oleh aplikasi lain (seperti Zoom, Google Meet, atau Camera App). "
        "3) Muat ulang (Refresh) halaman peramban.",
        bold_prefix="Solusi Perbaikan: "
    )

    b.add_heading_2("7.4 Bukti Pembayaran SPP Belum Terverifikasi")
    b.add_paragraph(
        "Kendala: Orang tua sudah mengunggah slip bukti transfer, namun status tagihan masih bertuliskan 'Menunggu Konfirmasi'.",
        bold_prefix="Gejala: "
    )
    b.add_paragraph(
        "Solusi: Proses verifikasi pembayaran dilakukan secara manual oleh bendahara sekolah pada jam kerja operasional "
        "(Senin - Sabtu pukul 08.00 - 17.00 WIB). Jika transfer dilakukan di luar jam kerja atau hari libur, verifikasi akan diproses "
        "pada hari kerja berikutnya. Bila mendesak, orang tua dapat mengirim konfirmasi ke WhatsApp bendahara sekolah.",
        bold_prefix="Solusi Perbaikan: "
    )

    b.add_heading_2("7.5 Halaman Aplikasi Terasa Lambat atau Tampilan Tidak Berubah")
    b.add_paragraph(
        "Kendala: Perubahan data atau gambar yang baru diunggah belum tampil sempurna di layar.",
        bold_prefix="Gejala: "
    )
    b.add_paragraph(
        "Solusi: Lakukan pembersihan cache peramban dengan menekan kombinasi tombol Ctrl + F5 (pada Windows) atau Cmd + Shift + R (pada Mac) "
        "untuk memaksa browser memuat versi terbaru aplikasi tanpa menggunakan cache lama.",
        bold_prefix="Solusi Perbaikan: "
    )

    b.add_heading_2("7.6 Layanan Bantuan & Kontak Dukungan Teknis")
    b.add_paragraph(
        "Apabila Anda menemui kendala teknis yang belum tercantum dalam buku panduan ini, silakan menghubungi tim pusat bantuan Smart Kids:"
    )
    support_data = [
        ("Helpdesk IT & Sistem", "Pusat Teknologi YAPCHI Foundation", "0812 3456 7890", "it-support@yapchi.or.id"),
        ("Administrasi Cabang Sadjati", "Smart Kids Cabang Sadjati", "0812 3456 7891", "sadjati@smartkids.sch.id"),
        ("Administrasi Cabang BCL", "Smart Kids Cabang BCL", "0812 3456 7892", "bcl@smartkids.sch.id"),
        ("Jam Operasional Layanan", "Senin s/d Sabtu (08:00 - 17:00 WIB)", "Respons Cepat WhatsApp", "Hari Minggu / Libur Nasional Tutup")
    ]
    b.add_table(["Unit Layanan", "Penanggung Jawab", "Kontak Telepon / WA", "Email Resmi"], support_data, [1.5, 1.8, 1.4, 1.57])


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

    # Save final file in workspace root
    output_filename = "Buku_Manual_Panduan_Sistem_Smart_Kids.docx"
    b.save(output_filename)
    return output_filename

if __name__ == "__main__":
    out = build_full_manual()
    print(f"Generated manual book successfully: {out}")
