import { prisma } from "../src/lib/prisma";

const DEFAULT_GALLERY = [
  {
    title: "Kegiatan Belajar Sentra Sains & Motorik",
    imageUrl: "/images/gallery1.png",
    folder: "gallery",
    orderIndex: 1,
  },
  {
    title: "Keceriaan Bermain Outdoor & Interaksi",
    imageUrl: "/images/gallery2.png",
    folder: "gallery",
    orderIndex: 2,
  },
  {
    title: "Kemandirian & Kreasi Seni Melipat Origami",
    imageUrl: "/images/gallery3.png",
    folder: "gallery",
    orderIndex: 3,
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    parentName: "Bunda Rayyan (Ibu Maya)",
    role: "Orang Tua Siswa",
    initials: "BM",
    content: "Metode bermain sambil belajar di Smart Kids sangat menyenangkan! Rayyan jadi lebih mandiri dan berani berbicara di depan umum.",
    rating: 5,
    bgColor: "emerald",
    orderIndex: 1,
  },
  {
    parentName: "Bapak Hendra Pratama",
    role: "Orang Tua Siswa",
    initials: "BP",
    content: "Program bimbingan belajarnya sangat intensif dan guru-gurunya sabar sekali membimbing anak. Nilai dan pemahaman anak meningkat pesat!",
    rating: 5,
    bgColor: "blue",
    orderIndex: 2,
  },
  {
    parentName: "Mama Alif (Ibu Dian)",
    role: "Orang Tua Siswa",
    initials: "MD",
    content: "Fasilitas lengkap, kelasnya nyaman dan aman. Anak saya selalu antusias berangkat ke sekolah setiap hari.",
    rating: 5,
    bgColor: "amber",
    orderIndex: 3,
  },
];

async function main() {
  const schools = await prisma.school.findMany();
  console.log(`Processing ${schools.length} schools...`);

  for (const school of schools) {
    console.log(`\n--- School: ${school.name} (${school.code}) ---`);

    // Check gallery
    const existingGallery = await prisma.galleryItem.findMany({
      where: { schoolId: school.id },
    });
    console.log(`Existing gallery count: ${existingGallery.length}`);

    if (existingGallery.length === 0) {
      console.log(`Seeding default gallery items for ${school.name}...`);
      for (const g of DEFAULT_GALLERY) {
        await prisma.galleryItem.create({
          data: {
            schoolId: school.id,
            title: g.title,
            imageUrl: g.imageUrl,
            folder: g.folder,
            orderIndex: g.orderIndex,
          },
        });
      }
    } else if (existingGallery.length < 3) {
      console.log(`Adding additional gallery items for ${school.name}...`);
      const existingUrls = new Set(existingGallery.map((i) => i.imageUrl));
      for (const g of DEFAULT_GALLERY) {
        if (!existingUrls.has(g.imageUrl)) {
          await prisma.galleryItem.create({
            data: {
              schoolId: school.id,
              title: g.title,
              imageUrl: g.imageUrl,
              folder: g.folder,
              orderIndex: existingGallery.length + g.orderIndex,
            },
          });
        }
      }
    }

    // Check testimonials
    const existingTestimonials = await prisma.testimonial.findMany({
      where: { schoolId: school.id },
    });
    console.log(`Existing testimonials count: ${existingTestimonials.length}`);

    if (existingTestimonials.length === 0) {
      console.log(`Seeding default testimonials for ${school.name}...`);
      for (const t of DEFAULT_TESTIMONIALS) {
        await prisma.testimonial.create({
          data: {
            schoolId: school.id,
            parentName: t.parentName,
            role: t.role,
            initials: t.initials,
            content: t.content,
            rating: t.rating,
            bgColor: t.bgColor,
            orderIndex: t.orderIndex,
          },
        });
      }
    }
  }

  console.log("\nGallery and Testimonials database seed complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
