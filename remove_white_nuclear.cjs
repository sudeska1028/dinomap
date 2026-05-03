// Nuclear background removal: globally removes ALL pixels with brightness > 215
// on all 3 channels. Photorealistic dinosaur skin/scales never reach this level.
const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const chibiDir = path.join(__dirname, 'public', 'assets', 'chibis');
const files = fs.readdirSync(chibiDir).filter(f => f.endsWith('.png'));

const GLOBAL_THRESHOLD = 215;  // any pixel brighter than this → transparent
const FRINGE_THRESHOLD = 190;  // start fading here

async function removeBg(filePath) {
  const image = await Jimp.read(filePath);
  const { width, height } = image.bitmap;
  const data = image.bitmap.data;
  const total = width * height;

  // Pass 1: nuclear global removal
  for (let pos = 0; pos < total; pos++) {
    const i = pos * 4;
    if (data[i+3] === 0) continue;
    if (data[i] >= GLOBAL_THRESHOLD && data[i+1] >= GLOBAL_THRESHOLD && data[i+2] >= GLOBAL_THRESHOLD) {
      data[i+3] = 0;
    }
  }

  // Pass 2: fringe softening — fade pixels adjacent to transparent areas
  // Run twice to handle thicker anti-aliasing bands
  for (let pass = 0; pass < 2; pass++) {
    for (let pos = 0; pos < total; pos++) {
      const i = pos * 4;
      if (data[i+3] === 0) continue;
      const r = data[i], g = data[i+1], b = data[i+2];
      const brightness = (r + g + b) / 3;
      if (brightness < FRINGE_THRESHOLD) continue;
      const x = pos % width;
      const y = Math.floor(pos / width);
      const ns = [
        x > 0          ? pos - 1     : -1,
        x < width - 1  ? pos + 1     : -1,
        y > 0          ? pos - width : -1,
        y < height - 1 ? pos + width : -1,
      ];
      const nearTransparent = ns.some(n => n >= 0 && data[n*4+3] === 0);
      if (nearTransparent) {
        const t = (brightness - FRINGE_THRESHOLD) / (255 - FRINGE_THRESHOLD);
        data[i+3] = Math.round(data[i+3] * (1 - t));
      }
    }
  }

  await image.write(filePath);
}

async function run() {
  console.log(`\n☢️  Nuclear background removal (threshold: ${GLOBAL_THRESHOLD}) — ${files.length} files\n`);
  let ok = 0;
  for (const f of files) {
    try {
      await removeBg(path.join(chibiDir, f));
      console.log(`  ✅ ${f}`);
      ok++;
    } catch (e) {
      console.log(`  ❌ ${f}: ${e.message}`);
    }
  }
  console.log(`\n🏁 Done: ${ok}/${files.length}\n`);
}

run();
