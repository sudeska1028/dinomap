const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const chibiDir = path.join(__dirname, 'public', 'assets', 'chibis');
const files = fs.readdirSync(chibiDir).filter(f => f.endsWith('.png'));

async function removeBg(filePath) {
  const image = await Jimp.read(filePath);
  const { width, height } = image.bitmap;
  const data = image.bitmap.data;

  // ── Step 1: BFS flood-fill from all 4 edges ──────────────────────────────
  // Remove connected white/near-white background pixels
  const total = width * height;
  const visited = new Uint8Array(total);
  const remove  = new Uint8Array(total);

  const THRESHOLD = 228; // pixels above this on all channels = background

  const isWhite = (pos) => {
    const i = pos * 4;
    return data[i] >= THRESHOLD && data[i+1] >= THRESHOLD && data[i+2] >= THRESHOLD;
  };

  // Stack-based DFS (avoids large queue memory issues)
  const stack = [];

  const seed = (x, y) => {
    const pos = y * width + x;
    if (visited[pos]) return;
    visited[pos] = 1;
    if (isWhite(pos)) { remove[pos] = 1; stack.push(pos); }
  };

  for (let x = 0; x < width;  x++) { seed(x, 0); seed(x, height - 1); }
  for (let y = 0; y < height; y++) { seed(0, y); seed(width - 1, y); }

  while (stack.length) {
    const pos = stack.pop();
    const x   = pos % width;
    const y   = Math.floor(pos / width);

    const neighbors = [
      x > 0          ? pos - 1     : -1,
      x < width - 1  ? pos + 1     : -1,
      y > 0          ? pos - width : -1,
      y < height - 1 ? pos + width : -1,
    ];

    for (const n of neighbors) {
      if (n < 0 || visited[n]) continue;
      visited[n] = 1;
      if (isWhite(n)) { remove[n] = 1; stack.push(n); }
    }
  }

  // ── Step 2: Apply transparency ────────────────────────────────────────────
  for (let pos = 0; pos < total; pos++) {
    if (!remove[pos]) continue;
    data[pos * 4 + 3] = 0;
  }

  // ── Step 3: Soften anti-aliasing fringe ──────────────────────────────────
  for (let pos = 0; pos < total; pos++) {
    if (remove[pos]) continue;
    const i = pos * 4;
    if (data[i+3] === 0) continue;

    const r = data[i], g = data[i+1], b = data[i+2];
    const brightness = (r + g + b) / 3;
    if (brightness < 210) continue; // not near-white, skip

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
      // Fade proportionally to how bright the pixel is
      const t = (brightness - 210) / 45; // 0..1
      data[i+3] = Math.round(data[i+3] * (1 - t));
    }
  }

  await image.write(filePath);
}

async function run() {
  console.log(`\n🎨 Removing white backgrounds (${files.length} files)...\n`);
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
