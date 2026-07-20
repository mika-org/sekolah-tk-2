import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "TK Smart Kids DeKeraton - Penerimaan Peserta Didik Baru (PPDB)",
  description:
    "Bimbingan belajar dan pendidikan anak usia 3-8 tahun dengan metode bermain sambil belajar yang menyenangkan di Smart Kids DeKeraton.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-800 min-h-screen flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}

