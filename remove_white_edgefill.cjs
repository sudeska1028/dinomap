// Edge flood-fill background removal v2.
// BFS from all 4 edges removes connected near-white/grey pixels (ground shadows).
// Bottom 20% of image uses a lower threshold to catch cast shadows aggressively.
const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const chibiDir = path.join(__dirname, 'public', 'assets', 'chibis');
const files = fs.readdirSync(chibiDir).filter(f => f.endsWith('.png'));

const GLOBAL_THRESHOLD = 215;  // nuclear pass — pure white
const EDGE_THRESHOLD   = 200;  // flood-fill from edges
const BOTTOM_THRESHOLD = 170;  // aggressive bottom-strip (cast shadows)

function brightness(d, i) { return (d[i] + d[i+1] + d[i+2]) / 3; }

async function removeBg(filePath) {
  const image = await Jimp.read(filePath);
  const { width, height } = image.bitmap;
  const data  = image.bitmap.data;
  const total = width * height;
  const bottomStart = Math.floor(height * 0.80); // bottom 20%

  // Pass 1: global nuclear
  for (let pos = 0; pos < total; pos++) {
    const i = pos * 4;
    if (data[i] >= GLOBAL_THRESHOLD && data[i+1] >= GLOBAL_THRESHOLD && data[i+2] >= GLOBAL_THRESHOLD) {
      data[i+3] = 0;
    }
  }

  // Pass 2: BFS flood-fill from image edges
  const visited = new Uint8Array(total);
  const queue   = [];

  const tryAdd = (pos) => {
    if (pos < 0 || pos >= total || visited[pos]) return;
    visited[pos] = 1;
    if (data[pos * 4 + 3] === 0) return; // already transparent
    const y = Math.floor(pos / width);
    const thresh = y >= bottomStart ? BOTTOM_THRESHOLD : EDGE_THRESHOLD;
    if (brightness(data, pos * 4) >= thresh) queue.push(pos);
  };

  for (let x = 0; x < width; x++) {
    tryAdd(x);
    tryAdd((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    tryAdd(y * width);
    tryAdd(y * width + width - 1);
  }

  let head = 0;
  while (head < queue.length) {
    const pos = queue[head++];
    data[pos * 4 + 3] = 0;
    const x = pos % width;
    const y = Math.floor(pos / width);
    const ns = [
      x > 0         ? pos - 1     : -1,
      x < width - 1 ? pos + 1     : -1,
      y > 0         ? pos - width : -1,
      y < height-1  ? pos + width : -1,
    ];
    for (const n of ns) {
      if (n < 0 || visited[n]) continue;
      visited[n] = 1;
      if (data[n * 4 + 3] === 0) continue;
      const ny = Math.floor(n / width);
      const thresh = ny >= bottomStart ? BOTTOM_THRESHOLD : EDGE_THRESHOLD;
      if (brightness(data, n * 4) >= thresh) queue.push(n);
    }
  }

  // Pass 3: fringe softening (2 iterations)
  for (let pass = 0; pass < 2; pass++) {
    for (let pos = 0; pos < total; pos++) {
      const i = pos * 4;
      if (data[i+3] === 0) continue;
      const b = brightness(data, i);
      if (b < 130) continue;
      const x = pos % width;
      const y = Math.floor(pos / width);
      const ns = [
        x > 0         ? pos - 1     : -1,
        x < width - 1 ? pos + 1     : -1,
        y > 0         ? pos - width : -1,
        y < height-1  ? pos + width : -1,
      ];
      if (ns.some(n => n >= 0 && data[n*4+3] === 0)) {
        const t = Math.max(0, (b - 130) / 125);
        data[i+3] = Math.round(data[i+3] * (1 - t * 0.9));
      }
    }
  }

  await image.write(filePath);
}

async function run() {
  console.log(`\n🌊 Edge flood-fill v2 — ${files.length} files\n`);
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
