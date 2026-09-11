import { prisma } from "../src/lib/prisma";

async function main() {
  const students = await prisma.student.findMany({
    take: 10,
    include: { school: true, classRoom: true }
  });
  console.log("Students count:", await prisma.student.count());
  console.log("Sample students:", students.map(s => ({
    id: s.id,
    name: s.name,
    parentPhone: s.parentPhone,
    parentName: s.parentName,
    school: s.school?.name,
    class: s.classRoom?.name
  })));

  const teachers = await prisma.teacher.findMany({
    include: { school: true }
  });
  console.log("Teachers count:", teachers.length);
  console.log("Teachers:", teachers.map(t => ({ id: t.id, name: t.name, school: t.school?.name })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
