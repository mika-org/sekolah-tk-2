const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\aditiam23\\.gemini\\antigravity-ide\\brain\\9ab76e7e-dd99-4bfe-a655-22e80a960dad';
const targetDir = path.join(__dirname, '..', 'public', 'images');

const ppdbOwlArtifact = path.join(brainDir, 'owl_mascot_1784517615941.png');
const defaultOwlArtifact = path.join(brainDir, 'owl_mascot_1784516940230.png');
const destPath = path.join(targetDir, 'owl_mascot_ppdb.png');

if (fs.existsSync(ppdbOwlArtifact)) {
  fs.copyFileSync(ppdbOwlArtifact, destPath);
  console.log(`Copied ${ppdbOwlArtifact} -> ${destPath} (${fs.statSync(destPath).size} bytes)`);
} else if (fs.existsSync(defaultOwlArtifact)) {
  fs.copyFileSync(defaultOwlArtifact, destPath);
  console.log(`Copied ${defaultOwlArtifact} -> ${destPath} (${fs.statSync(destPath).size} bytes)`);
} else {
  console.error('No source artifact found!');
}
