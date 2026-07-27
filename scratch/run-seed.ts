import { GET } from "../src/app/api/seed/route";

async function main() {
  console.log("Running seed...");
  const res = await GET();
  const json = await res.json();
  console.log("Seed response:", json);
}

main().catch(console.error);
