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
| Nama Kolom | Tipe Data | Atribut | Keterangan |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(191) | Primary Key, CUID | ID Admin |
| `schoolId` | VARCHAR(191) | Foreign Key, Nullable | ID Sekolah (Null = SUPER_ADMIN Yayasan) |
| `username` | VARCHAR(191) | Unique, Not Null | Username Login |
| `passwordHash` | TEXT | Not Null | Hash Kata Sandi |
| `name` | VARCHAR(191) | Not Null | Nama Pengelola |
| `role` | VARCHAR(50) | Default: 'SUPER_ADMIN' | Role (`SUPER_ADMIN` / `SCHOOL_ADMIN`) |
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

### E. Relasi `Program`, `GalleryItem`, `Testimonial`, & `PpdbRegistration`
Setiap entitas memuat kolom `schoolId` (Foreign Key ke `School`):
- `Program.schoolId`: Memisahkan program belajar antar sekolah.
- `GalleryItem.schoolId`: Memisahkan foto galeri antar sekolah.
- `Testimonial.schoolId`: Memisahkan testimoni orang tua antar sekolah.
- `PpdbRegistration.schoolId`: Memisahkan data pendaftaran siswa baru antar sekolah.

---

## 3. Endpoints API Pengaturan User Admin

| Method | Endpoint | Access Role | Keterangan |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin-users` | `ALL_ADMIN` | Mengambil seluruh daftar pengguna admin |
| `POST` | `/api/admin-users` | `SUPER_ADMIN` | Menambahkan pengguna admin baru (dengan hashing bcrypt) |
| `PUT` | `/api/admin-users/[id]` | `SUPER_ADMIN` | Memperbarui data pengguna admin, role, dan password |
| `DELETE` | `/api/admin-users/[id]` | `SUPER_ADMIN` | Menghapus pengguna admin (dengan proteksi self-delete) |

