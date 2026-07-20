const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\aditiam23\\.gemini\\antigravity-ide\\brain\\9ab76e7e-dd99-4bfe-a655-22e80a960dad';
const targetDir = path.join(__dirname, '..', 'public', 'images');

const mapping = {
  'owl_mascot_1784516940230.png': 'owl_mascot.png',
  'school_house_1784516953718.png': 'school_house.png',
  'smart_kids_logo_1784516964378.png': 'smart_kids_logo.png',
  'yapchi_logo_1784516973838.png': 'yapchi_logo.png',
  'gallery1_1784517140417.png': 'gallery1.png',
  'gallery2_1784517151513.png': 'gallery2.png',
  'gallery3_1784517163020.png': 'gallery3.png',
};

for (const [src, dest] of Object.entries(mapping)) {
  const srcPath = path.join(brainDir, src);
  const destPath = path.join(targetDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Restored original PNG: ${dest} (${fs.statSync(destPath).size} bytes)`);
  } else {
    console.error(`Source not found: ${srcPath}`);
  }
}
