# Desain Tabel Sistem Multi-Sekolah (1 Yayasan - Multi Sekolah)

Dokumen ini berisi desain struktur tabel database PostgreSQL untuk sistem Multi-Sekolah di bawah 1 Yayasan Pendidikan (YAPCHI Foundation) menggunakan Prisma ORM.

---

## 1. Skema Multi-Sekolah (Prisma ERD Diagram)

```mermaid
erDiagram
    Foundation {
        string id PK
        string name
        string tagline
        string logoUrl
        string phone
        string email
        string address
        datetime createdAt
        datetime updatedAt
    }

    School {
        string id PK
        string foundationId FK
        string code UK
        string name
        string level
        string address
        string phone
        string logoUrl
        int orderIndex
        datetime createdAt
        datetime updatedAt
    }

    AdminUser {
        string id PK
        string schoolId FK
        string username UK
        string passwordHash
        string name
        string role
        datetime createdAt
        datetime updatedAt
    }

    SiteProfile {
        string id PK
        string schoolId FK UK
        string heroBadge
        string heroTitle
        string heroSubtitle
        string heroMascotUrl
        string ctaTitle
        string ctaSubtitle
        string phone
        string instagram
        string facebook
        string address
        datetime updatedAt
    }

    Program {
        string id PK
        string schoolId FK
        string title
        string ageRange
        string iconUrl
        string features
        int orderIndex
        datetime createdAt
        datetime updatedAt
    }

    GalleryItem {
        string id PK
        string schoolId FK
        string title
        string imageUrl
        string folder
        int orderIndex
        datetime createdAt
    }

    Testimonial {
        string id PK
        string schoolId FK
        string parentName
        string role
        string initials
        string content
        int rating
        string bgColor
        int orderIndex
        datetime createdAt
    }

    PpdbRegistration {
        string id PK
        string schoolId FK
        string registrationNo UK
        string namaAnak
        string jenisKelamin
        string agama
        string tempatLahir
        string tanggalLahir
        string usiaAnak
        string program
        string namaOrtu
        string noWhatsapp
        string email
        string alamatRumah
        string docKkUrl
        string docAktaUrl
        string docFotoUrl
        string docKtpUrl
        string buktiBayarUrl
        string paymentMethod
        string status
        datetime createdAt
        datetime updatedAt
    }

    Foundation ||--|{ School : "memiliki banyak"
    School ||--|{ AdminUser : "memiliki pengelola"
    School ||--|| SiteProfile : "memiliki profil website"
    School ||--|{ Program : "memiliki program"
    School ||--|{ GalleryItem : "memiliki galeri"
    School ||--|{ Testimonial : "memiliki testimoni"
    School ||--|{ PpdbRegistration : "memiliki pendaftaran PPDB"
```

---

## 2. Detail Rincian Tabel Multi-Sekolah

### A. Tabel `Foundation` (`foundations`)
Menyimpan informasi pusat Yayasan Pendidikan.

| Nama Kolom | Tipe Data | Atribut | Keterangan |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(191) | Primary Key ('default') | ID Yayasan |
| `name` | VARCHAR(191) | Not Null | Nama Yayasan (contoh: YAPCHI Foundation) |
| `tagline` | TEXT | Not Null | Slogan / Deskripsi Yayasan |
| `logoUrl` | TEXT | Nullable | Logo Resmi Yayasan |
| `phone` | VARCHAR(50) | Nullable | Telepon Pusat Yayasan |
| `email` | VARCHAR(191) | Nullable | Email Resmi Yayasan |
| `address` | TEXT | Nullable | Alamat Kantor Pusat Yayasan |
| `createdAt` | TIMESTAMP | Default: NOW() | Tanggal Dibuat |
| `updatedAt` | TIMESTAMP | Auto Update | Tanggal Diperbarui |

---

### B. Tabel `School` (`schools`)
Menyimpan daftar sekolah-sekolah di bawah naungan Yayasan.

| Nama Kolom | Tipe Data | Atribut | Keterangan |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(191) | Primary Key, CUID | ID Unik Sekolah |
| `foundationId` | VARCHAR(191) | Foreign Key -> Foundation | ID Yayasan Pemilik |
| `code` | VARCHAR(191) | Unique, Not Null | Kode / Slug Sekolah (contoh: `dekeraton`, `cikarang`) |
| `name` | VARCHAR(191) | Not Null | Nama Sekolah (contoh: TK Smart Kids DeKeraton) |
| `level` | VARCHAR(50) | Default: 'TK' | Jenjang (TK, KB, PAUD, SD) |
| `address` | TEXT | Not Null | Alamat Cabang Sekolah |
| `phone` | VARCHAR(50) | Not Null | Kontak Cabang Sekolah |
| `logoUrl` | TEXT | Nullable | Logo Khusus Sekolah |
| `orderIndex` | INT | Default: 0 | Urutan Tampilan |
| `createdAt` | TIMESTAMP | Default: NOW() | Waktu Dibuat |
| `updatedAt` | TIMESTAMP | Auto Update | Tanggal Diperbarui |

---

### C. Tabel `AdminUser` (`admin_users`)
Tabel kredensial dan hak akses pengguna multi-role dalam 1 Yayasan.

| Nama Kolom | Tipe Data | Atribut | Keterangan |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(191) | Primary Key, CUID | ID Pengguna |
| `schoolId` | VARCHAR(191) | Foreign Key, Nullable | ID Sekolah (Null = `ADMIN_PUSAT` Yayasan) |
| `username` | VARCHAR(191) | Unique, Not Null | Username Login |
| `passwordHash` | TEXT | Not Null | Hash Kata Sandi (Bcrypt) |
| `name` | VARCHAR(191) | Not Null | Nama Lengkap Pengguna |
| `role` | VARCHAR(50) | Default: 'ADMIN_PUSAT' | Role (`ADMIN_PUSAT`, `ADMIN_SEKOLAH`, `GURU`, `ORTU`) |
| `phone` | VARCHAR(50) | Nullable | Nomor Telepon / WA |
| `email` | VARCHAR(191) | Nullable | Alamat Email |
| `createdAt` | TIMESTAMP | Default: NOW() | Waktu Dibuat |
| `updatedAt` | TIMESTAMP | Auto Update | Tanggal Diperbarui |

---

### D. Tabel `SiteProfile` (`site_profiles`)
Setiap Sekolah memiliki 1 profil tampilan halaman website tersendiri.

| Nama Kolom | Tipe Data | Atribut | Keterangan |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(191) | Primary Key, CUID | ID Profile |
| `schoolId` | VARCHAR(191) | Foreign Key, Unique | Relasi Ke Sekolah (1 to 1) |
| `heroBadge` | TEXT | Not Null | Badge Hero Sekolah |
| `heroTitle` | TEXT | Not Null | Judul Hero |
| `heroSubtitle` | TEXT | Not Null | Deskripsi Hero |
| `heroMascotUrl` | TEXT | Not Null | Maskot Sekolah |
| `ctaTitle` | TEXT | Not Null | Judul Banner CTA |
| `ctaSubtitle` | TEXT | Not Null | Deskripsi Banner CTA |
| `phone` | VARCHAR(50) | Not Null | Kontak Sekolah |
| `instagram` | VARCHAR(100) | Not Null | Instagram Sekolah |
| `facebook` | VARCHAR(100) | Not Null | Facebook Sekolah |
| `address` | TEXT | Nullable | Alamat Sekolah |
| `updatedAt` | TIMESTAMP | Auto Update | Tanggal Pembaruan |

---

### E. Tabel `Teacher` (`teachers`)
| Nama Kolom | Tipe Data | Atribut | Keterangan |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(191) | Primary Key, CUID | ID Guru |
| `schoolId` | VARCHAR(191) | Foreign Key -> School | ID Sekolah Tempat Mengajar |
| `name` | VARCHAR(191) | Not Null | Nama Lengkap & Gelar |
| `role` | VARCHAR(191) | Not Null | Jabatan / Peran Pengajar |
| `photoUrl` | TEXT | Default: '/images/teacher_default.png' | URL Foto Guru |
| `bio` | TEXT | Nullable | Deskripsi / Kutipan Singkat |
| `education` | VARCHAR(191) | Nullable | Pendidikan Terakhir |
| `orderIndex` | INT | Default: 0 | Urutan Tampilan |
| `createdAt` | TIMESTAMP | Default: NOW() | Tanggal Dibuat |
| `updatedAt` | TIMESTAMP | Auto Update | Tanggal Pembaruan |

---

### F. Relasi `Program`, `Teacher`, `GalleryItem`, `Testimonial`, & `PpdbRegistration`
Setiap entitas memuat kolom `schoolId` (Foreign Key ke `School`):
- `Program.schoolId`: Memisahkan program belajar antar sekolah.
- `Teacher.schoolId`: Memisahkan data guru & tenaga pendidik antar sekolah.
- `GalleryItem.schoolId`: Memisahkan foto galeri antar sekolah.
- `Testimonial.schoolId`: Memisahkan testimoni orang tua antar sekolah.
- `PpdbRegistration.schoolId`: Memisahkan data pendaftaran siswa baru antar sekolah.

---

## 3. Endpoints API Pengaturan User Admin & Guru

| Method | Endpoint | Access Role | Keterangan |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin-users` | `ALL_ADMIN` | Mengambil seluruh daftar pengguna admin |
| `POST` | `/api/admin-users` | `SUPER_ADMIN` | Menambahkan pengguna admin baru (dengan hashing bcrypt) |
| `PUT` | `/api/admin-users/[id]` | `SUPER_ADMIN` | Memperbarui data pengguna admin, role, dan password |
| `DELETE` | `/api/admin-users/[id]` | `SUPER_ADMIN` | Menghapus pengguna admin (dengan proteksi self-delete) |
| `GET` | `/api/teachers` | `PUBLIC / ALL` | Mengambil daftar guru (filter param `schoolId` / `schoolCode`) |
| `POST` | `/api/teachers` | `ALL_ADMIN` | Menambahkan data guru baru |
| `PUT` | `/api/teachers/[id]` | `ALL_ADMIN` | Memperbarui data guru |
| `DELETE` | `/api/teachers/[id]` | `ALL_ADMIN` | Menghapus data guru |
| `GET` | `/api/students` | `PUBLIC / ALL` | Mengambil daftar siswa/murid (filter param `schoolId` / `schoolCode`) |
| `POST` | `/api/students` | `ALL_ADMIN` | Menambahkan data siswa baru |
| `PUT` | `/api/students/[id]` | `ALL_ADMIN` | Memperbarui data siswa |
| `DELETE` | `/api/students/[id]` | `ALL_ADMIN` | Menghapus data siswa |
| `GET` | `/api/schedules` | `PUBLIC / ALL` | Mengambil jadwal KBM (filter param `schoolId` / `schoolCode`) |
| `POST` | `/api/schedules` | `ALL_ADMIN` | Menambahkan jadwal KBM |
| `PUT` | `/api/schedules/[id]` | `ALL_ADMIN` | Memperbarui jadwal KBM |
| `DELETE` | `/api/schedules/[id]` | `ALL_ADMIN` | Menghapus jadwal KBM |
| `GET` | `/api/announcements` | `PUBLIC / ALL` | Mengambil pengumuman (filter param `schoolId` / `schoolCode`) |
| `POST` | `/api/announcements` | `ALL_ADMIN` | Menerbitkan pengumuman baru |
| `DELETE` | `/api/announcements/[id]` | `ALL_ADMIN` | Menghapus pengumuman |
| `GET` | `/api/attendance` | `ALL_ADMIN / GURU` | Mengambil data presensi siswa |
| `POST` | `/api/attendance` | `ALL_ADMIN / GURU` | Mencatat presensi siswa baru |
| `DELETE` | `/api/attendance/[id]` | `ALL_ADMIN` | Menghapus record presensi |
| `GET` | `/api/leave-requests` | `ALL_ADMIN / GURU` | Mengambil data pengajuan izin/cuti guru |
| `POST` | `/api/leave-requests` | `GURU / ALL` | Mengajukan izin/cuti baru |
| `PATCH` | `/api/leave-requests/[id]` | `ALL_ADMIN` | Memperbarui status persetujuan izin/cuti |
| `DELETE` | `/api/leave-requests/[id]` | `ALL_ADMIN` | Menghapus pengajuan izin/cuti |
| `GET` | `/api/spp` | `ALL_ADMIN / ORTU` | Mengambil data pembayaran SPP |
| `POST` | `/api/spp` | `ALL_ADMIN` | Menambahkan catatan SPP baru |
| `PATCH` | `/api/spp/[id]` | `ALL_ADMIN` | Memperbarui status pembayaran SPP |
| `DELETE` | `/api/spp/[id]` | `ALL_ADMIN` | Menghapus catatan SPP |


