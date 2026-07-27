import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    const teachers = await prisma.teacher.findMany({ include: { school: true, classRoom: true } });
    console.log("=== TEACHERS ===");
    teachers.forEach((t) => console.log(`[${t.school.name}] ${t.name} - ${t.role} (${t.assignedClass})`));

    const students = await prisma.student.findMany({ include: { school: true, classRoom: true } });
    console.log("\n=== STUDENTS ===");
    students.forEach((s) => console.log(`[${s.school.name}] ${s.name} (NISN: ${s.nisn}) -> Kelas: ${s.className} (Wali: ${s.classRoom?.homeroomTeacherName || "-"})`));
  } catch (err) {
    console.error("DB Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
