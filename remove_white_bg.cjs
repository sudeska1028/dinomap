const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const chibiDir = path.join(__dirname, 'public', 'assets', 'chibis');
const files = fs.readdirSync(chibiDir).filter(f => f.endsWith('.png'));

// Flood-fill from all 4 edges to find connected white/near-white regions
function floodFill(bitmap, width, height, tolerance) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const isWhite = (idx) => {
    const r = bitmap.data[idx];
    const g = bitmap.data[idx + 1];
    const b = bitmap.data[idx + 2];
    const a = bitmap.data[idx + 3];
    if (a < 10) return true; // already transparent
    return r >= 255 - tolerance && g >= 255 - tolerance && b >= 255 - tolerance;
  };

  // Seed from all border pixels
  for (let x = 0; x < width; x++) {
    queue.push(x, 0);
    queue.push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    queue.push(0, y);
    queue.push(width - 1, y);
  }

  while (queue.length) {
    const y = queue.pop();
    const x = queue.pop();
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    const pos = y * width + x;
    if (visited[pos]) continue;
    visited[pos] = 1;
    const idx = pos * 4;
    if (!isWhite(idx)) continue;
    // Mark as transparent
    bitmap.data[idx + 3] = 0;
    queue.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }

  // Second pass: remove near-white anti-aliasing fringe
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = y * width + x;
      if (visited[pos]) continue;
      const idx = pos * 4;
      const a = bitmap.data[idx + 3];
      if (a === 0) continue;
      const r = bitmap.data[idx];
      const g = bitmap.data[idx + 1];
      const b = bitmap.data[idx + 2];
      // Partially transparent fringe (anti-alias zone near already-removed pixels)
      const bright = (r + g + b) / 3;
      if (bright > 230) {
        // Check if any neighbor is already transparent
        const neighbors = [
          (y > 0 ? (y-1)*width+x : -1),
          (y < height-1 ? (y+1)*width+x : -1),
          (x > 0 ? y*width+(x-1) : -1),
          (x < width-1 ? y*width+(x+1) : -1),
        ];
        const nearTransparent = neighbors.some(n => n >= 0 && bitmap.data[n*4+3] === 0);
        if (nearTransparent) {
          // Fade out based on brightness
          const alpha = Math.round((1 - (bright - 200) / 55) * a);
          bitmap.data[idx + 3] = Math.max(0, alpha);
        }
      }
    }
  }
}

async function processAll() {
  console.log(`\n🎨 Removing white backgrounds from ${files.length} chibi images...\n`);
  let ok = 0;

  for (const file of files) {
    const filePath = path.join(chibiDir, file);
    try {
      const image = await Jimp.read(filePath);
      const { width, height, data } = image.bitmap;

      floodFill(image.bitmap, width, height, 20);

      await image.write(filePath);
      console.log(`  ✅ ${file}`);
      ok++;
    } catch (e) {
      console.log(`  ❌ ${file}: ${e.message}`);
    }
  }

  console.log(`\n🏁 Done: ${ok}/${files.length} processed\n`);
}

processAll();
