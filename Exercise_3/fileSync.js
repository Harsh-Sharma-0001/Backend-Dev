const fs = require("fs");
const path = require("path");

const sourceDir = process.argv[2];
const targetDir = process.argv[3];

if (!sourceDir || !targetDir) {
  console.log("Usage: node fileSync.js <sourceDir> <targetDir>");
  process.exit(1);
}

syncDirectories(sourceDir, targetDir);

function syncDirectories(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);

  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    const srcStat = fs.statSync(srcPath);

    if (srcStat.isDirectory()) {
      syncDirectories(srcPath, destPath);
    } else {
      if (
        !fs.existsSync(destPath) ||
        fs.statSync(destPath).size !== srcStat.size
      ) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Synced: ${file}`);
      }
    }
  });
}
