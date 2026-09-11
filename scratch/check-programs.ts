import { prisma } from "../src/lib/prisma";

async function main() {
  const schools = await prisma.school.findMany();
  console.log("Schools:", schools.map(s => ({ id: s.id, code: s.code, name: s.name })));

  const programs = await prisma.program.findMany({
    include: { school: true }
  });
  console.log("Programs in DB (total: " + programs.length + "):");
  for (const p of programs) {
    console.log({
      id: p.id,
      schoolCode: p.school?.code,
      title: p.title,
      ageRange: p.ageRange,
      sppAmount: p.sppAmount,
      orderIndex: p.orderIndex
    });
  }

  const lesSdRegs = await prisma.lesSdRegistration.findMany({
    include: { school: true }
  });
  console.log("Les SD Registrations (total: " + lesSdRegs.length + "):");
  for (const r of lesSdRegs) {
    console.log({
      id: r.id,
      regNo: r.registrationNo,
      studentName: r.studentName,
      sdGrade: r.sdGrade,
      status: r.status,
      school: r.school?.name
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
