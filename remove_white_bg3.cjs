const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const chibiDir = path.join(__dirname, 'public', 'assets', 'chibis');
const files = fs.readdirSync(chibiDir).filter(f => f.endsWith('.png'));

async function removeBg(filePath) {
  const image = await Jimp.read(filePath);
  const { width, height } = image.bitmap;
  const data = image.bitmap.data;
  const total = width * height;

  // Pass 1: Edge flood-fill — remove connected white/near-white background
  const EDGE_THRESHOLD = 235;
  const visited = new Uint8Array(total);
  const remove  = new Uint8Array(total);

  const isEdgeWhite = (pos) => {
    const i = pos * 4;
    return data[i] >= EDGE_THRESHOLD && data[i+1] >= EDGE_THRESHOLD && data[i+2] >= EDGE_THRESHOLD;
  };

  const stack = [];
  const seed = (x, y) => {
    const pos = y * width + x;
    if (visited[pos]) return;
    visited[pos] = 1;
    if (isEdgeWhite(pos)) { remove[pos] = 1; stack.push(pos); }
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
      if (isEdgeWhite(n)) { remove[n] = 1; stack.push(n); }
    }
  }

  // Pass 2: Global bright-pixel removal — catches isolated interior white patches
  // (between legs, under belly) that flood-fill can't reach from edges.
  // Only pixels with ALL channels >= 245 are removed globally; this is safe
  // because photorealistic dinosaur skin/scales are never this bright.
  const GLOBAL_THRESHOLD = 245;
  for (let pos = 0; pos < total; pos++) {
    if (remove[pos]) continue;
    const i = pos * 4;
    if (data[i+3] === 0) continue; // already transparent
    if (data[i] >= GLOBAL_THRESHOLD && data[i+1] >= GLOBAL_THRESHOLD && data[i+2] >= GLOBAL_THRESHOLD) {
      remove[pos] = 1;
    }
  }

  // Pass 3: Apply transparency
  for (let pos = 0; pos < total; pos++) {
    if (!remove[pos]) continue;
    data[pos * 4 + 3] = 0;
  }

  // Pass 4: Anti-aliasing fringe softening
  for (let pos = 0; pos < total; pos++) {
    if (remove[pos]) continue;
    const i = pos * 4;
    if (data[i+3] === 0) continue;
    const r = data[i], g = data[i+1], b = data[i+2];
    const brightness = (r + g + b) / 3;
    if (brightness < 195) continue;
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
      const t = (brightness - 195) / 60; // 0..1
      data[i+3] = Math.round(data[i+3] * (1 - t));
    }
  }

  await image.write(filePath);
}

async function run() {
  console.log(`\n🎨 Aggressive background removal (${files.length} files)...\n`);
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
