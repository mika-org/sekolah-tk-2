const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:\\Users\\aditiam23\\.gemini\\antigravity-ide\\brain\\9ab76e7e-dd99-4bfe-a655-22e80a960dad\\media__1784519850946.png';
const outputDir = path.join(__dirname, '..', 'public', 'images');

async function processIcons() {
  const metadata = await sharp(inputPath).metadata();
  console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);

  const width = metadata.width;
  const height = metadata.height;
  const itemWidth = Math.floor(width / 3);

  // 1. Playground (Left)
  await sharp(inputPath)
    .extract({ left: 30, top: 120, width: 300, height: 400 })
    .toFile(path.join(outputDir, 'program_playground.png'));

  // 2. Kindergarten (Middle)
  await sharp(inputPath)
    .extract({ left: 360, top: 120, width: 300, height: 400 })
    .toFile(path.join(outputDir, 'program_kindergarten.png'));

  // 3. Pre Kindergarten (Right)
  await sharp(inputPath)
    .extract({ left: 690, top: 120, width: 300, height: 400 })
    .toFile(path.join(outputDir, 'program_pre_kindergarten.png'));

  console.log('Successfully cropped 3 program icon images!');
}

processIcons().catch(console.error);
