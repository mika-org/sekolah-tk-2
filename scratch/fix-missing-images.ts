import fs from "fs";
import path from "path";

const imagesDir = path.join(process.cwd(), "public", "images");

// Create a nice default avatar SVG image buffer
const defaultAvatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <rect width="300" height="300" fill="#e2e8f0" rx="30"/>
  <circle cx="150" cy="110" r="50" fill="#057a44"/>
  <path d="M75 250c0-41.421 33.579-75 75-75s75 33.579 75 75" fill="#057a44"/>
</svg>`;

const missingImages = [
  "teacher1.png",
  "teacher2.png",
  "teacher3.png",
  "teacher_default.png"
];

for (const imgName of missingImages) {
  const filePath = path.join(imagesDir, imgName);
  if (!fs.existsSync(filePath)) {
    // Write SVG (or copy if exists)
    fs.writeFileSync(filePath.replace(".png", ".svg"), defaultAvatarSvg);
    // Also write png placeholder if referenced as .png
    fs.writeFileSync(filePath, defaultAvatarSvg);
    console.log("Created missing image:", imgName);
  }
}

console.log("All missing teacher images created successfully!");
