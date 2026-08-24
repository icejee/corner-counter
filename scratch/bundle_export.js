const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('Building production distribution directory:', distDir);

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy top-level files
const filesToCopy = [
  'index.html',
  'manifest.json',
  'service-worker.js',
  'DEPLOYMENT_AND_OFFLINE_GUIDE.md',
  'README.md'
];

filesToCopy.forEach(f => {
  const src = path.join(rootDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, f));
  }
});

// Copy directories
['css', 'js', 'icons'].forEach(d => {
  const src = path.join(rootDir, d);
  if (fs.existsSync(src)) {
    copyRecursive(src, path.join(distDir, d));
  }
});

console.log('Files successfully copied to dist/.');

// Create ZIP file using powershell Compress-Archive
const zipPath = path.join(rootDir, 'corner-counter-pos-production.zip');
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

try {
  execSync(`powershell -Command "Compress-Archive -Path '${distDir}\\*' -DestinationPath '${zipPath}' -Force"`, { stdio: 'inherit' });
  console.log('ZIP bundle generated successfully at:', zipPath);
} catch (e) {
  console.error('Error creating ZIP:', e.message);
}
