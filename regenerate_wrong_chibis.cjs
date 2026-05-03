const https = require('https');
const fs = require('fs');

// Re-generate chibi figurine images that had wrong visual identity.
// Style target: photorealistic 3D render, isolated on pure white background,
// dramatic rim lighting, full body visible, recognizable dinosaur shape.

const tasks = [
  {
    name: '3d_cutout_spinosaurus.png',
    prompt: 'Photorealistic 3D render of a Spinosaurus dinosaur, full body side view, isolated on pure white background. Spinosaurus has a very large neural spine sail on its back, long crocodile-like jaws, semi-aquatic build, shorter hind legs than forelimbs. High detail, dramatic rim lighting, no shadows on background.'
  },
  {
    name: '3d_cutout_diplodocus.png',
    prompt: 'Photorealistic 3D render of a Diplodocus dinosaur, full body, isolated on pure white background. Diplodocus is a massive four-legged sauropod with an extremely long horizontal neck, tiny head, very long whip-like tail that drags on the ground, all four legs on ground. High detail, dramatic rim lighting.'
  },
  {
    name: '3d_cutout_brachiosaurus.png',
    prompt: 'Photorealistic 3D render of a Brachiosaurus dinosaur, full body, isolated on pure white background. Brachiosaurus is a massive four-legged sauropod with a very tall upright neck like a giraffe, front legs longer than hind legs, small head on top of tall neck, all four legs firmly on ground. High detail, dramatic rim lighting.'
  },
  {
    name: '3d_cutout_amargasaurus.png',
    prompt: 'Photorealistic 3D render of an Amargasaurus dinosaur, full body, isolated on pure white background. Amargasaurus is a four-legged sauropod with two dramatic parallel rows of very tall neural spines running along its neck forming a double crest or sail, medium-length neck, all four legs on ground. High detail, dramatic rim lighting.'
  },
  {
    name: '3d_cutout_mamenchisaurus.png',
    prompt: 'Photorealistic 3D render of a Mamenchisaurus dinosaur, full body, isolated on pure white background. Mamenchisaurus is a massive four-legged sauropod with an impossibly long neck that is half the total body length, small head, long tail, all four legs on ground. The neck is the most distinctive feature. High detail, dramatic rim lighting.'
  },
  {
    name: '3d_cutout_argentinosaurus.png',
    prompt: 'Photorealistic 3D render of an Argentinosaurus dinosaur, full body, isolated on pure white background. Argentinosaurus is the largest dinosaur ever, a massive four-legged titanosaur sauropod with a huge barrel-shaped body, thick pillar-like legs, long neck and tail, all four legs on ground. Enormous scale. High detail, dramatic rim lighting.'
  },
  {
    name: '3d_cutout_mosasaurus.png',
    prompt: 'Photorealistic 3D render of a Mosasaurus, full body, isolated on pure white background. Mosasaurus is a giant marine reptile like a huge sea serpent with a long streamlined body, four paddle-like flippers, a long powerful tail with a tail fin, and a massive crocodile-like head with huge jaws. Not a dinosaur, it is a giant ocean predator. High detail, dramatic rim lighting.'
  },
  {
    name: '3d_cutout_quetzalcoatlus.png',
    prompt: 'Photorealistic 3D render of a Quetzalcoatlus pterosaur, full body, isolated on pure white background. Quetzalcoatlus is a giant flying reptile as tall as a giraffe, with enormous bat-like wings spanning 11 meters, long toothless beak, large backward-pointing head crest, standing on all four limbs with wings folded. High detail, dramatic rim lighting.'
  },
  {
    name: '3d_cutout_parasaurolophus.png',
    prompt: 'Photorealistic 3D render of a Parasaurolophus dinosaur, full body, isolated on pure white background. Parasaurolophus is a large bipedal hadrosaur with a very distinctive long hollow tubular crest sweeping backward from the top of its head, duck-like flat beak, bipedal stance. The backward-sweeping tube crest is its most important feature. High detail, dramatic rim lighting.'
  },
  {
    name: '3d_cutout_borealopelta.png',
    prompt: 'Photorealistic 3D render of a Borealopelta nodosaur dinosaur, full body, isolated on pure white background. Borealopelta is a low wide heavily armored dinosaur walking on all four legs, covered in bony osteoderms and scutes across its back, broad flat body close to the ground, no tail club, armored like a living tank. High detail, dramatic rim lighting.'
  },
  {
    name: '3d_cutout_protoceratops.png',
    prompt: 'Photorealistic 3D render of a Protoceratops dinosaur, full body, isolated on pure white background. Protoceratops is a small sheep-sized ceratopsian dinosaur walking on four legs, with a large bony neck frill, a parrot-like beak, no horns, round stocky body, short tail. It is similar to a small Triceratops without horns. High detail, dramatic rim lighting.'
  },
  {
    name: '3d_cutout_futabasaurus.png',
    prompt: 'Photorealistic 3D render of a Futabasaurus plesiosaur, full body, isolated on pure white background. Futabasaurus is an elasmosaurid marine reptile with a very long flexible neck, small head with conical teeth, large round body, four broad paddle-like flippers, short tail. It lives in the ocean. High detail, dramatic rim lighting.'
  }
];

const delay = ms => new Promise(res => setTimeout(res, ms));

async function downloadWithRetry(task, attempts = 5) {
  const dest = `./public/assets/chibis/${task.name}`;
  const seed = Math.floor(Math.random() * 999999);
  const url = 'https://image.pollinations.ai/prompt/' +
    encodeURIComponent(task.prompt) +
    `?width=1024&height=1024&nologo=true&seed=${seed}&model=flux`;

  for (let i = 0; i < attempts; i++) {
    console.log(`[${task.name}] Attempt ${i + 1}...`);
    const success = await new Promise((resolve) => {
      https.get(url, (res) => {
        const handle = (response) => {
          if (response.headers['content-type']?.includes('application/json')) {
            console.log('  → Rate limited, retrying...');
            response.resume(); resolve(false); return;
          }
          if (response.statusCode >= 400) {
            console.log(`  → HTTP ${response.statusCode}`);
            response.resume(); resolve(false); return;
          }
          const file = fs.createWriteStream(dest);
          response.pipe(file);
          file.on('finish', () => {
            const size = fs.statSync(dest).size;
            if (size > 10000) { resolve(true); }
            else { console.log(`  → File too small (${size}b)`); resolve(false); }
          });
        };
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          https.get(res.headers.location, handle).on('error', () => resolve(false));
        } else { handle(res); }
      }).on('error', (e) => { console.log('  → Error:', e.message); resolve(false); });
    });

    if (success) { console.log(`  ✓ Saved ${task.name}`); return; }
    await delay(8000);
  }
  console.log(`  ✗ Failed all attempts for ${task.name}`);
}

async function run() {
  console.log(`Regenerating ${tasks.length} wrong chibi images via Pollinations.ai...\n`);
  for (const task of tasks) {
    await downloadWithRetry(task);
    await delay(4000);
  }
  console.log('\nDone! Run the nuclear white-bg removal script afterward.');
}

run();
