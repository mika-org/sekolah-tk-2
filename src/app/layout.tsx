import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Smart Kids - Penerimaan Peserta Didik Baru (PPDB)",
  description:
    "Bimbingan belajar dan pendidikan anak usia 3-8 tahun dengan metode bermain sambil belajar yang menyenangkan di Smart Kids.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased bg-slate-50 text-slate-800 min-h-screen flex flex-col selection:bg-emerald-200 selection:text-emerald-900"
        suppressHydrationWarning
      >
        {children}

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5K42067XGY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5K42067XGY');
          `}
        </Script>
      </body>
    </html>
  );
}

