import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Smart Kids - PAUD, TK & Bimbel Karawang",
    short_name: "Smart Kids",
    description: "Pendidikan anak usia dini (PAUD/TK) dan bimbingan belajar Les SD terpercaya di Karawang",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1d4ed8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
