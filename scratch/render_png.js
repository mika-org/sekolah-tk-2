const fs = require('fs');
const path = require('path');
let sharp;

try {
  sharp = require('sharp');
} catch (e) {
  console.log('Sharp not installed, using alternative method');
}

const publicDir = path.join(__dirname, '..', 'public', 'images');

const files = ['owl_mascot', 'school_house', 'smart_kids_logo', 'yapchi_logo'];

async function convert() {
  if (sharp) {
    for (const name of files) {
      const svgPath = path.join(publicDir, `${name}.svg`);
      const pngPath = path.join(publicDir, `${name}.png`);
      if (fs.existsSync(svgPath)) {
        await sharp(svgPath)
          .png()
          .toFile(pngPath);
        console.log(`Successfully converted ${name}.svg to transparent ${name}.png`);
      }
    }
  }
}

convert().catch(console.error);
