const https = require('https');
const fs = require('fs');

const tasks = [
  {
    name: 'minmi_art.png',
    prompt: 'Cinematic 8k photorealistic 3D render of a Minmi dinosaur in an Early Cretaceous lush Australian forest. Minmi is a very small, quadrupedal armored dinosaur (a basal ankylosaur) with thick bony plates (osteoderms) covering its back, neck, and tail. It has a short neck, short strong legs, and a turtle-like beak. It walks close to the ground and does NOT have a club on its tail. Highly detailed, photorealistic, national geographic photography, dramatic lighting.'
  }
];

const delay = ms => new Promise(res => setTimeout(res, ms));

async function downloadWithRetry(task, attempts = 6) {
  const dest = `./public/assets/${task.name}`;
  for (let i = 0; i < attempts; i++) {
    const seed = Math.floor(Math.random() * 999999);
    const url = 'https://image.pollinations.ai/prompt/' +
      encodeURIComponent(task.prompt) +
      `?width=1024&height=1024&nologo=true&seed=${seed}&model=flux`;
    console.log(`[${task.name}] Attempt ${i + 1}...`);
    const success = await new Promise((resolve) => {
      https.get(url, (res) => {
        const handle = (response) => {
          if (response.headers['content-type']?.includes('application/json')) {
            response.resume(); resolve(false); return;
          }
          if (response.statusCode >= 400) { response.resume(); resolve(false); return; }
          const file = fs.createWriteStream(dest);
          response.pipe(file);
          file.on('finish', () => {
            const size = fs.statSync(dest).size;
            resolve(size > 10000);
          });
        };
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          https.get(res.headers.location, handle).on('error', () => resolve(false));
        } else { handle(res); }
      }).on('error', () => resolve(false));
    });
    if (success) { console.log(`  ✓ Saved ${task.name}`); return; }
    await delay(8000);
  }
  console.log(`  ✗ Failed ${task.name}`);
}

async function run() {
  for (const task of tasks) {
    await downloadWithRetry(task);
  }
  console.log('Done.');
}
run();
