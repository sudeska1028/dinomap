const https = require('https');
const fs = require('fs');

const tasks = [
  {
    name: '3d_cutout_argentinosaurus.png',
    prompt: 'Photorealistic 3D render of a titanosaur sauropod dinosaur like Argentinosaurus, full body, isolated on pure white background. It is an enormous four-legged dinosaur with four thick pillar-like legs all on the ground, a very large barrel-shaped body, a long neck stretching forward, and a long tail. Quadruped, NOT bipedal. The largest land animal ever. High quality render, dramatic lighting.'
  },
  {
    name: '3d_cutout_futabasaurus.png',
    prompt: 'Photorealistic 3D render of a plesiosaur, a prehistoric marine reptile, full body, isolated on pure white background. A plesiosaur has a round body like a turtle or seal, four large flat paddle flippers, a very long flexible neck with a tiny head, and a short tail. It is a sea creature, not a dinosaur, and does not walk on land. Full body visible. High quality render, dramatic rim lighting.'
  }
];

const delay = ms => new Promise(res => setTimeout(res, ms));

async function downloadWithRetry(task, attempts = 6) {
  const dest = `./public/assets/chibis/${task.name}`;
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
    await delay(3000);
  }
  console.log('Done. Run remove_white_nuclear.cjs next.');
}
run();
