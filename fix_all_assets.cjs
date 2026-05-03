const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const assetDir = path.join(__dirname, 'public', 'assets');
const chibiDir = path.join(assetDir, 'chibis');

// Shared chibi style suffix - matches the good Diplodocus/Triceratops/Iguanodon style
const CHIBI = 'cute 3D chibi dinosaur toy figure, colorful plastic toy, kawaii big eyes, friendly pose, full body visible, white transparent background, game icon style, single character, no text';

// ── CHIBI TASKS ──────────────────────────────────────────────────────────────
// Keep: diplodocus, triceratops, iguanodon (already correct chibi style)
const chibiTasks = [
  { name: '3d_cutout_tyrannosaurus_rex.png',   prompt: `${CHIBI}, Tyrannosaurus Rex, large head, tiny arms, bipedal, orange and brown` },
  { name: '3d_cutout_stegosaurus.png',          prompt: `${CHIBI}, Stegosaurus, kite-shaped diamond plates along back, spiky tail thagomizer, quadrupedal, green and orange` },
  { name: '3d_cutout_giraffatitan.png',         prompt: `${CHIBI}, Giraffatitan sauropod, very tall upright neck, long neck raised high, four legs, brown and yellow` },
  { name: '3d_cutout_patagotitan.png',          prompt: `${CHIBI}, giant Patagotitan titanosaur sauropod, massive long neck and body, four legs, grey and beige` },
  { name: '3d_cutout_allosaurus.png',           prompt: `${CHIBI}, Allosaurus theropod, large three-fingered clawed hands, bipedal, dark green and red stripes` },
  { name: '3d_cutout_albertosaurus.png',        prompt: `${CHIBI}, Albertosaurus tyrannosaurid, slender build, bipedal, tiny arms, dark grey and green` },
  { name: '3d_cutout_borealopelta.png',         prompt: `${CHIBI}, Borealopelta nodosaur, armored body with osteoderms, no tail club, quadrupedal tank shape, brown and reddish` },
  { name: '3d_cutout_archaeopteryx.png',        prompt: `${CHIBI}, Archaeopteryx, feathered wings spread, bird-like with teeth and clawed wings, perching, black and gold feathers` },
  { name: '3d_cutout_kentrosaurus.png',         prompt: `${CHIBI}, Kentrosaurus, pointed spines on back and tail, small plates on shoulders, quadrupedal, grey and orange` },
  { name: '3d_cutout_sue_the_t_rex.png',        prompt: `${CHIBI}, Tyrannosaurus Rex named SUE, robust muscular build, large skull, bipedal, dark brown and amber` },
  { name: '3d_cutout_omeisaurus.png',           prompt: `${CHIBI}, Omeisaurus Chinese sauropod, extremely long neck, long tail, quadrupedal, light green and yellow` },
  { name: '3d_cutout_giganotosaurus.png',       prompt: `${CHIBI}, Giganotosaurus large theropod, massive skull, bipedal, longer than T-Rex, olive green and tan` },
  { name: '3d_cutout_futabasaurus.png',         prompt: `${CHIBI}, Futabasaurus plesiosaur, long flippers, long neck, marine reptile, teal blue and white` },
  { name: '3d_cutout_spinosaurus.png',          prompt: `${CHIBI}, Spinosaurus, very tall neural spine sail on back, long crocodile-like snout, bipedal, blue and orange sail` },
  { name: '3d_cutout_velociraptor.png',         prompt: `${CHIBI}, Velociraptor, small turkey-sized feathered raptor, sickle claw on foot, feathered arms, single character, blue and brown feathers` },
  { name: '3d_cutout_brachiosaurus.png',        prompt: `${CHIBI}, Brachiosaurus sauropod, front legs taller than hind legs, long neck, quadrupedal, green and brown` },
  { name: '3d_cutout_ankylosaurus.png',         prompt: `${CHIBI}, Ankylosaurus, completely armored with round bony osteoderms, massive bone club tail, very low quadrupedal, dark grey armor` },
  { name: '3d_cutout_carnotaurus.png',          prompt: `${CHIBI}, Carnotaurus, two thick bull horns above eyes, very short tiny arms, bipedal, red and brown` },
  { name: '3d_cutout_parasaurolophus.png',      prompt: `${CHIBI}, Parasaurolophus, long backwards sweeping tubular crest on head, duck bill, bipedal, green and orange crest` },
  { name: '3d_cutout_mosasaurus.png',           prompt: `${CHIBI}, Mosasaurus marine reptile, long jaws full of teeth, four flippers, serpentine tail, dark blue and grey, ocean creature` },
  { name: '3d_cutout_pteranodon.png',           prompt: `${CHIBI}, Pteranodon flying reptile, large pointed crest on head, huge wings spread, long toothless beak, orange and brown` },
  { name: '3d_cutout_gallimimus.png',           prompt: `${CHIBI}, Gallimimus ostrich dinosaur, long legs, long neck, toothless beak, bipedal, tan and light brown` },
  { name: '3d_cutout_baryonyx.png',             prompt: `${CHIBI}, Baryonyx spinosaurid, long narrow crocodile snout, large curved thumb claw, bipedal, dark green and brown` },
  { name: '3d_cutout_compsognathus.png',        prompt: `${CHIBI}, Compsognathus tiny dinosaur, very small body, long tail, bipedal, single character much smaller than other dinosaurs, olive green` },
  { name: '3d_cutout_utahraptor.png',           prompt: `${CHIBI}, Utahraptor large raptor, feathered body, large sickle claw on foot, bipedal, orange and brown feathers` },
  { name: '3d_cutout_therizinosaurus.png',      prompt: `${CHIBI}, Therizinosaurus, enormous long scythe-like claws on hands, pot-bellied herbivore, bipedal, pale yellow and green` },
  { name: '3d_cutout_quetzalcoatlus.png',       prompt: `${CHIBI}, Quetzalcoatlus giant pterosaur, giraffe-sized with huge wings folded, long stork-like neck and beak, standing, orange and white` },
  { name: '3d_cutout_dilophosaurus.png',        prompt: `${CHIBI}, Dilophosaurus, two parallel thin crests on top of skull, slender bipedal theropod, single character, teal and yellow crests` },
  { name: '3d_cutout_styracosaurus.png',        prompt: `${CHIBI}, Styracosaurus ceratopsian, large nose horn, six long spikes around frill, quadrupedal, purple and orange frill` },
  { name: '3d_cutout_mantellisaurus.png',       prompt: `${CHIBI}, Mantellisaurus iguanodontian, slender build, thumb spike, bipedal and quadrupedal pose, light brown and green` },
  { name: '3d_cutout_apatosaurus.png',          prompt: `${CHIBI}, Apatosaurus sauropod, massive heavy body, whip-like long tail, small head on long neck, quadrupedal, grey and brown` },
  { name: '3d_cutout_edmontosaurus.png',        prompt: `${CHIBI}, Edmontosaurus hadrosaur, flat duck-like bill, large body, bipedal, green and brown` },
  { name: '3d_cutout_dicraeosaurus.png',        prompt: `${CHIBI}, Dicraeosaurus sauropod, tall bifurcated neural spines on back forming V-shapes, shorter neck than Diplodocus, quadrupedal, brown and gold` },
  { name: '3d_cutout_shunosaurus.png',          prompt: `${CHIBI}, Shunosaurus Chinese sauropod, tail club at end of tail, moderate length neck, quadrupedal, green and yellow` },
  { name: '3d_cutout_carcharodontosaurus.png',  prompt: `${CHIBI}, Carcharodontosaurus huge theropod, enormous skull with serrated teeth, bipedal, dark brown and sand colored` },
  { name: '3d_cutout_ouranosaurus.png',         prompt: `${CHIBI}, Ouranosaurus, tall neural spine sail or hump on back, duck-like bill, bipedal or four legs, sandy brown and orange sail` },
  { name: '3d_cutout_muttaburrasaurus.png',     prompt: `${CHIBI}, Muttaburrasaurus Australian ornithopod, bulging hollow bony snout crest, bipedal herbivore, green and blue` },
  { name: '3d_cutout_minmi.png',                prompt: `${CHIBI}, Minmi small ankylosaur, low flat armored body with belly plates, very small size, quadrupedal, brown and orange` },
  { name: '3d_cutout_australovenator.png',      prompt: `${CHIBI}, Australovenator megaraptorid, long arms with large hook-like hand claws, lightweight bipedal predator, red and dark brown` },
  { name: '3d_cutout_amargasaurus.png',         prompt: `${CHIBI}, Amargasaurus sauropod, two rows of long parallel neck spines forming a double sail, long neck, quadrupedal, grey and orange spines` },
  { name: '3d_cutout_herrerasaurus.png',        prompt: `${CHIBI}, Herrerasaurus early Triassic predator, slender primitive theropod, bipedal, three-fingered hands, dark green` },
  { name: '3d_cutout_argentinosaurus.png',      prompt: `${CHIBI}, Argentinosaurus titanosaur, absolutely massive sauropod, huge round body, very long neck and tail, quadrupedal, grey and beige` },
  { name: '3d_cutout_microraptor.png',          prompt: `${CHIBI}, Microraptor four-winged dinosaur, wings on both arms and legs, small size, gliding pose, iridescent black feathers` },
  { name: '3d_cutout_protoceratops.png',        prompt: `${CHIBI}, Protoceratops small ceratopsian, large neck frill, beak, no horns, sheep-sized quadrupedal, tan and brown` },
  { name: '3d_cutout_mamenchisaurus.png',       prompt: `${CHIBI}, Mamenchisaurus sauropod, neck makes up half the body length extremely long neck, quadrupedal, light brown and cream` },
];

// ── MUSEUM FOSSIL / ART TASKS ────────────────────────────────────────────────
const museumTasks = [
  {
    name: 'spinosaurus_art_ai.png',
    prompt: 'Photorealistic 8K 3D render living Spinosaurus dinosaur, massive tall neural spine sail on back, long narrow crocodile snout, wading in prehistoric river, dramatic lighting',
  },
  {
    name: 'spinosaurus_fossil_ai.png',
    prompt: 'Photorealistic 8K museum display Spinosaurus fossil skeleton, distinctive tall neural spine sail visible on skeleton, mounted skeleton in dramatic museum lighting, dark background',
  },
  {
    name: 'ankylosaurus_art_ai.png',
    prompt: 'Photorealistic 8K 3D render living Ankylosaurus dinosaur, completely covered in round flat bony osteoderms armor plating, massive bone club at tail tip, low to the ground quadrupedal, prehistoric forest',
  },
  {
    name: 'ankylosaurus_fossil_ai.png',
    prompt: 'Photorealistic 8K museum display Ankylosaurus fossil skeleton, wide low tank-like skeleton, tail club bone visible, mounted in natural history museum dramatic lighting, dark background',
  },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────
const delay = ms => new Promise(res => setTimeout(res, ms));

function fetchImage(url, dest) {
  return new Promise((resolve) => {
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);

    const handleResponse = (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlink(dest, () => {});
        fetchImage(res.headers.location, dest).then(resolve);
        return;
      }
      if (res.statusCode >= 400) {
        res.resume();
        file.close();
        fs.unlink(dest, () => {});
        resolve(false);
        return;
      }
      if (res.headers['content-type']?.includes('application/json')) {
        res.resume();
        file.close();
        fs.unlink(dest, () => {});
        resolve(false);
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        try {
          const size = fs.statSync(dest).size;
          resolve(size > 5000);
        } catch {
          resolve(false);
        }
      });
    };

    proto.get(url, handleResponse).on('error', () => {
      fs.unlink(dest, () => {});
      resolve(false);
    });
  });
}

async function downloadTask(dir, task, force = false) {
  const dest = path.join(dir, task.name);

  if (force && fs.existsSync(dest)) {
    fs.unlinkSync(dest);
    console.log(`  🗑  Deleted old: ${task.name}`);
  }

  if (fs.existsSync(dest)) {
    const size = fs.statSync(dest).size;
    if (size > 5000) {
      console.log(`  ⏭  Already OK: ${task.name}`);
      return true;
    }
    fs.unlinkSync(dest);
  }

  for (let attempt = 1; attempt <= 5; attempt++) {
    console.log(`  ⬇  ${task.name} (attempt ${attempt})...`);
    const seed = Math.floor(Math.random() * 999999);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(task.prompt)}?width=768&height=768&nologo=true&seed=${seed}`;
    const ok = await fetchImage(url, dest);
    if (ok) {
      console.log(`  ✅ Done: ${task.name}`);
      return true;
    }
    console.log(`  ❌ Failed, retrying in 5s...`);
    if (fs.existsSync(dest)) fs.unlinkSync(dest);
    await delay(5000);
  }

  console.log(`  ⚠️  Exhausted retries: ${task.name}`);
  return false;
}

async function run() {
  console.log('\n═══════════════════════════════════════════');
  console.log('  DinoMap Asset Fix — Chibis + Museum Images');
  console.log('═══════════════════════════════════════════\n');

  // 1. Chibis — force regenerate all 45 wrong ones
  console.log(`\n▶ CHIBIS (${chibiTasks.length} to regenerate)\n`);
  let chibiOk = 0;
  for (const task of chibiTasks) {
    const ok = await downloadTask(chibiDir, task, true); // force=true deletes old file
    if (ok) chibiOk++;
    await delay(1500);
  }

  // 2. Museum images — force regenerate confirmed wrong ones
  console.log(`\n▶ MUSEUM IMAGES (${museumTasks.length} to regenerate)\n`);
  let museumOk = 0;
  for (const task of museumTasks) {
    const ok = await downloadTask(assetDir, task, true); // force=true
    if (ok) museumOk++;
    await delay(1500);
  }

  console.log('\n═══════════════════════════════════════════');
  console.log(`  Chibis:  ${chibiOk}/${chibiTasks.length} OK`);
  console.log(`  Museum:  ${museumOk}/${museumTasks.length} OK`);
  console.log('═══════════════════════════════════════════\n');
}

run();
