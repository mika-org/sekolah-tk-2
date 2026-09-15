const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanOrders() {
  console.log('--- Cleaning Duplicate Orders Across All Schools ---');

  const schools = await prisma.school.findMany({ select: { id: true, name: true } });

  for (const school of schools) {
    console.log(`\nProcessing School: ${school.name} (${school.id})`);

    // 1. Testimonials
    const testies = await prisma.testimonial.findMany({
      where: { schoolId: school.id },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'asc' }],
    });
    console.log(`Found ${testies.length} testimonials.`);
    for (let i = 0; i < testies.length; i++) {
      const targetOrder = i + 1;
      if (testies[i].orderIndex !== targetOrder) {
        await prisma.testimonial.update({
          where: { id: testies[i].id },
          data: { orderIndex: targetOrder },
        });
        console.log(`  Updated Testimonial "${testies[i].parentName}": order ${testies[i].orderIndex} -> ${targetOrder}`);
      }
    }

    // 2. Teachers
    const teachers = await prisma.teacher.findMany({
      where: { schoolId: school.id },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'asc' }],
    });
    console.log(`Found ${teachers.length} teachers.`);
    for (let i = 0; i < teachers.length; i++) {
      const targetOrder = i + 1;
      if (teachers[i].orderIndex !== targetOrder) {
        await prisma.teacher.update({
          where: { id: teachers[i].id },
          data: { orderIndex: targetOrder },
        });
        console.log(`  Updated Teacher "${teachers[i].name}": order ${teachers[i].orderIndex} -> ${targetOrder}`);
      }
    }

    // 3. Programs
    const progs = await prisma.program.findMany({
      where: { schoolId: school.id },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'asc' }],
    });
    console.log(`Found ${progs.length} programs.`);
    for (let i = 0; i < progs.length; i++) {
      const targetOrder = i + 1;
      if (progs[i].orderIndex !== targetOrder) {
        await prisma.program.update({
          where: { id: progs[i].id },
          data: { orderIndex: targetOrder },
        });
        console.log(`  Updated Program "${progs[i].title}": order ${progs[i].orderIndex} -> ${targetOrder}`);
      }
    }

    // 4. Gallery Items
    const gallery = await prisma.galleryItem.findMany({
      where: { schoolId: school.id },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'asc' }],
    });
    console.log(`Found ${gallery.length} gallery items.`);
    for (let i = 0; i < gallery.length; i++) {
      const targetOrder = i + 1;
      if (gallery[i].orderIndex !== targetOrder) {
        await prisma.galleryItem.update({
          where: { id: gallery[i].id },
          data: { orderIndex: targetOrder },
        });
        console.log(`  Updated Gallery Item "${gallery[i].title}": order ${gallery[i].orderIndex} -> ${targetOrder}`);
      }
    }
  }

  console.log('\n--- Duplicate order cleanup completed! ---');
}

cleanOrders().catch(console.error).finally(() => process.exit(0));
