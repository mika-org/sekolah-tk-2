import { prisma } from "../src/lib/prisma";

async function main() {
  const galleries = await prisma.galleryItem.findMany({
    include: { school: true }
  });
  console.log("Gallery Items count:", galleries.length);
  for (const g of galleries) {
    console.log({
      id: g.id,
      school: g.school?.code,
      title: g.title,
      imageUrl: g.imageUrl,
      folder: g.folder
    });
  }

  const testimonials = await prisma.testimonial.findMany({
    include: { school: true }
  });
  console.log("Testimonials count:", testimonials.length);
  for (const t of testimonials) {
    console.log({
      id: t.id,
      school: t.school?.code,
      parentName: t.parentName,
      role: t.role,
      content: t.content
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
