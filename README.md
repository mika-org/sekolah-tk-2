This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Upload storage

Semua upload baru disimpan di satu akar storage dengan format:

```text
/var/www/storage-sekolah/uploads/<kategori>/<tahun>/<bulan>/<tanggal>/<nama-file>
```

Atur environment produksi berikut (nilai URL tidak boleh berakhir dengan `/storage`):

```dotenv
STORAGE_PATH=/var/www/storage-sekolah
NEXT_PUBLIC_STORAGE_URL=https://smartkids.elevore.web.id/uploads
```

Nginx harus melayani akar upload yang sama. Batas body dibuat sedikit lebih besar untuk overhead multipart; aplikasi tetap membatasi isi file maksimal 1 MB.

Pastikan direktori dimiliki user yang menjalankan PM2, bukan `www-data`. Nginx hanya memerlukan akses baca:

```bash
sudo chown -R "$(id -un)":www-data /var/www/storage-sekolah
sudo find /var/www/storage-sekolah -type d -exec chmod 775 {} \;
sudo find /var/www/storage-sekolah -type f -exec chmod 664 {} \;
test -w /var/www/storage-sekolah/uploads
```

```nginx
client_max_body_size 2m;

location ^~ /uploads/ {
    alias /var/www/storage-sekolah/uploads/;
    try_files $uri =404;
    autoindex off;
    add_header X-Content-Type-Options nosniff always;
}
```

URL `/storage/...` lama tetap dilayani oleh route kompatibilitas Next.js. Workflow deployment membuat direktori upload, menerapkan migrasi Prisma, menyalin file legacy yang terlacak tanpa menimpa file VPS, lalu memeriksa `/api/health`.
