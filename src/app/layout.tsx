import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://smartkids.elevore.web.id";
const cleanSiteUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;

export const viewport: Viewport = {
  themeColor: "#1d4ed8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(cleanSiteUrl),
  title: {
    default: "Smart Kids - PAUD, TK & Bimbingan Belajar Anak Karawang | PPDB Online",
    template: "%s | Smart Kids Karawang",
  },
  description:
    "Pusat pendidikan anak usia dini (PAUD, TK A, TK B) dan bimbingan belajar Les SD terpercaya di Karawang (Sadjati & Bumi Cipta Laras). Belajar seru, guru berdedikasi, dan fasilitas lengkap. Daftar PPDB online sekarang!",
  keywords: [
    "Smart Kids",
    "Smart Kids Karawang",
    "Smart Kids Sadjati",
    "Smart Kids BCL",
    "TK Smart Kids",
    "PAUD Karawang",
    "TK Karawang",
    "PPDB TK Karawang 2026",
    "Pendaftaran TK Karawang",
    "PPDB Online Karawang",
    "Bimbel Anak Karawang",
    "Les SD Karawang",
    "Les Calistung Karawang",
    "Les Baca Tulis Karawang",
    "Sekolah TK Majalaya Karawang",
    "Bumi Cipta Laras",
    "Sadjati Garden City",
    "Yayasan Smart Kids",
  ],
  authors: [{ name: "Yayasan Smart Kids", url: cleanSiteUrl }],
  creator: "Yayasan Smart Kids",
  publisher: "Yayasan Smart Kids",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Smart Kids - PAUD, TK & Bimbingan Belajar Les SD Karawang",
    description:
      "Pendidikan anak usia dini (PAUD, TK) dan bimbingan belajar Les SD terbaik di Karawang dengan metode bermain sambil belajar yang menyenangkan. Daftar PPDB online sekarang!",
    url: cleanSiteUrl,
    siteName: "Smart Kids Karawang",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/school_house.png",
        width: 1200,
        height: 630,
        alt: "Gedung Sekolah Smart Kids Karawang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Kids - PAUD, TK & Bimbingan Belajar Anak Karawang",
    description:
      "Pusat pendidikan anak usia dini & bimbingan belajar Les SD terbaik di Karawang. Daftarkan si kecil sekarang!",
    images: ["/images/school_house.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: "Smart Kids",
  alternateName: "PAUD & TK Smart Kids Karawang",
  url: cleanSiteUrl,
  logo: `${cleanSiteUrl}/images/smart_kids_logo.png`,
  image: `${cleanSiteUrl}/images/school_house.png`,
  description:
    "Pusat pendidikan anak usia dini (PAUD, TK A, TK B) dan bimbingan belajar intensif Les SD di Karawang dengan kurikulum terstruktur dan lingkungan bermain yang ramah anak.",
  telephone: "+6285148293343",
  priceRange: "Rp 200.000 - Rp 300.000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Perum Sadjati Garden City Blok A No 02 & Perum Bumi Cipta Laras Blok E No 02",
    addressLocality: "Karawang",
    addressRegion: "Jawa Barat",
    postalCode: "41371",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -6.3146,
    longitude: 107.3195,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  department: [
    {
      "@type": "EducationalOrganization",
      name: "Smart Kids Sadjati",
      address: "Perum Sadjati Garden City Blok A No 02 Majalaya Karawang",
      telephone: "085148293343",
    },
    {
      "@type": "EducationalOrganization",
      name: "Smart Kids Bumi Cipta Laras (BCL)",
      address: "Perum Bumi Cipta Laras Blok E No.02 Karawang",
      telephone: "085148293343",
    },
  ],
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

        {/* Schema.org Structured Data (JSON-LD) for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />

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

