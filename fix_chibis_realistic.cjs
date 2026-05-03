const https = require('https');
const fs = require('fs');
const path = require('path');

const chibiDir = path.join(__dirname, 'public', 'assets', 'chibis');

// Realistic miniature figurine style — no cartoon, no frame, no base
const S = 'realistic 3D rendered dinosaur miniature figurine, photorealistic skin texture, natural pose, isolated on pure white background, no frame no border no base no platform no shadow no text, full body visible, side view, single specimen, high detail';

const tasks = [
  { name: '3d_cutout_tyrannosaurus_rex.png',   prompt: `${S}, Tyrannosaurus Rex, massive skull with tiny arms, powerful bipedal stance, rough scaly skin` },
  { name: '3d_cutout_diplodocus.png',           prompt: `${S}, Diplodocus sauropod, very long whip-like tail, small head, extremely long horizontal neck, four legs` },
  { name: '3d_cutout_triceratops.png',          prompt: `${S}, Triceratops, three large horns, wide bone frill behind head, stocky quadruped, beaked snout` },
  { name: '3d_cutout_giraffatitan.png',         prompt: `${S}, Giraffatitan sauropod, front legs taller than rear legs making body slope, very tall upright neck, four legs` },
  { name: '3d_cutout_stegosaurus.png',          prompt: `${S}, Stegosaurus, large kite-shaped bony plates along spine, four spiked tail thagomizer, low head, quadruped` },
  { name: '3d_cutout_iguanodon.png',            prompt: `${S}, Iguanodon ornithopod, thumb spike on hand, beaked mouth, semi-bipedal large body` },
  { name: '3d_cutout_patagotitan.png',          prompt: `${S}, Patagotitan titanosaur, enormous massive sauropod body, extremely long neck and tail, four pillar legs` },
  { name: '3d_cutout_allosaurus.png',           prompt: `${S}, Allosaurus theropod, large head with brow ridges, three-fingered clawed arms, bipedal` },
  { name: '3d_cutout_albertosaurus.png',        prompt: `${S}, Albertosaurus tyrannosaurid, slender build compared to T-Rex, bipedal, two-fingered small forelimbs` },
  { name: '3d_cutout_borealopelta.png',         prompt: `${S}, Borealopelta nodosaur, armored body covered in osteoderms no tail club, broad low quadruped tank shape` },
  { name: '3d_cutout_archaeopteryx.png',        prompt: `${S}, Archaeopteryx, feathered wings extended, toothed beak, clawed wingtips, bird-like but with long bony tail` },
  { name: '3d_cutout_kentrosaurus.png',         prompt: `${S}, Kentrosaurus stegosaurid, alternating spines and small plates along back, pairs of long tail spines, quadruped` },
  { name: '3d_cutout_sue_the_t_rex.png',        prompt: `${S}, robust Tyrannosaurus Rex, extremely massive skull, thick powerful legs, bipedal predator` },
  { name: '3d_cutout_omeisaurus.png',           prompt: `${S}, Omeisaurus sauropod, extremely long neck taking up half total length, medium body, four legs, Chinese species` },
  { name: '3d_cutout_giganotosaurus.png',       prompt: `${S}, Giganotosaurus large theropod, massive skull longer than T-Rex skull, bipedal South American predator` },
  { name: '3d_cutout_futabasaurus.png',         prompt: `${S}, Futabasaurus plesiosaur, long flexible neck, four paddle flippers, streamlined body, marine reptile` },
  { name: '3d_cutout_spinosaurus.png',          prompt: `${S}, Spinosaurus, very tall neural spine sail along entire back, long narrow crocodile-like snout, bipedal` },
  { name: '3d_cutout_velociraptor.png',         prompt: `${S}, Velociraptor dromaeosaurid, turkey-sized small feathered body, large sickle claw on hind foot, lightweight bipedal` },
  { name: '3d_cutout_brachiosaurus.png',        prompt: `${S}, Brachiosaurus sauropod, front legs longer than hind legs causing upward slope, very tall upright neck, four legs` },
  { name: '3d_cutout_ankylosaurus.png',         prompt: `${S}, Ankylosaurus, low wide body covered in round flat bony armor scutes, massive bone club at tail end, quadruped` },
  { name: '3d_cutout_carnotaurus.png',          prompt: `${S}, Carnotaurus, two thick bull-like horns above eyes, very short vestigial arms, bipedal abelisaurid` },
  { name: '3d_cutout_parasaurolophus.png',      prompt: `${S}, Parasaurolophus hadrosaur, long backward curving hollow tubular crest extending from skull, bipedal duck-billed` },
  { name: '3d_cutout_mosasaurus.png',           prompt: `${S}, Mosasaurus, elongated marine reptile body, four paddle flippers, long jaws with rows of teeth, vertical tail fin` },
  { name: '3d_cutout_pteranodon.png',           prompt: `${S}, Pteranodon pterosaur, large long pointed backward crest, huge wingspan, long toothless beak, standing pose with wings folded` },
  { name: '3d_cutout_gallimimus.png',           prompt: `${S}, Gallimimus ornithomimid, long neck, toothless beak, very long slender legs, ostrich-like bipedal build` },
  { name: '3d_cutout_baryonyx.png',             prompt: `${S}, Baryonyx spinosaurid, long narrow jaw with conical teeth, enormous curved thumb claw, bipedal fish-eater` },
  { name: '3d_cutout_compsognathus.png',        prompt: `${S}, Compsognathus, very small chicken-sized dinosaur, slender lightweight bipedal build, long tail` },
  { name: '3d_cutout_utahraptor.png',           prompt: `${S}, Utahraptor dromaeosaurid, large sickle claw on foot, feathered body, powerful bipedal raptor much larger than velociraptor` },
  { name: '3d_cutout_therizinosaurus.png',      prompt: `${S}, Therizinosaurus, enormous scythe-like claws on each hand up to 1 meter long, pot-bellied herbivore theropod, bipedal` },
  { name: '3d_cutout_quetzalcoatlus.png',       prompt: `${S}, Quetzalcoatlus azhdarchid pterosaur, giraffe-sized standing height, folded wings, long stiff neck, long toothless beak, standing on all fours` },
  { name: '3d_cutout_dilophosaurus.png',        prompt: `${S}, Dilophosaurus, two thin parallel crests running along top of skull, slender theropod bipedal build` },
  { name: '3d_cutout_styracosaurus.png',        prompt: `${S}, Styracosaurus ceratopsian, large nasal horn, six long sharp spikes radiating from neck frill, quadruped` },
  { name: '3d_cutout_mantellisaurus.png',       prompt: `${S}, Mantellisaurus iguanodontian, slender relative of Iguanodon, thumb spike, semi-bipedal ornithopod` },
  { name: '3d_cutout_apatosaurus.png',          prompt: `${S}, Apatosaurus diplodocid, very heavy muscular neck, whip-like thin tail, massive low body, four legs` },
  { name: '3d_cutout_edmontosaurus.png',        prompt: `${S}, Edmontosaurus hadrosaur, large flat duck-like bill, bulky body, bipedal stance` },
  { name: '3d_cutout_dicraeosaurus.png',        prompt: `${S}, Dicraeosaurus sauropod, bifurcated tall neural spines forming V-shape ridges along back, shorter neck than Diplodocus, four legs` },
  { name: '3d_cutout_shunosaurus.png',          prompt: `${S}, Shunosaurus sauropod, bony club at tail tip, moderate-length neck, four legs, Chinese Middle Jurassic` },
  { name: '3d_cutout_carcharodontosaurus.png',  prompt: `${S}, Carcharodontosaurus, enormous skull with blade-like serrated teeth, massive bipedal theropod Africa` },
  { name: '3d_cutout_ouranosaurus.png',         prompt: `${S}, Ouranosaurus iguanodontian, tall neural spines forming sail or hump along back, duck-like bill, semi-bipedal` },
  { name: '3d_cutout_muttaburrasaurus.png',     prompt: `${S}, Muttaburrasaurus ornithopod, distinctive inflated hollow bony snout crest, large bipedal herbivore, Australian` },
  { name: '3d_cutout_minmi.png',                prompt: `${S}, Minmi ankylosaur, very small flat low armored body with belly armor, no tail club, tiny Australian quadruped` },
  { name: '3d_cutout_australovenator.png',      prompt: `${S}, Australovenator megaraptorid, large hook-like hand claws, lightweight slender bipedal predator, Australian` },
  { name: '3d_cutout_amargasaurus.png',         prompt: `${S}, Amargasaurus sauropod, two dramatic rows of long parallel neural spines along entire neck forming double sail, four legs` },
  { name: '3d_cutout_herrerasaurus.png',        prompt: `${S}, Herrerasaurus primitive early theropod, slender bipedal Triassic predator, three-fingered clawed hands` },
  { name: '3d_cutout_argentinosaurus.png',      prompt: `${S}, Argentinosaurus titanosaur sauropod, absolutely enormous round body, very thick pillar legs, long neck and tail` },
  { name: '3d_cutout_microraptor.png',          prompt: `${S}, Microraptor, four wings with feathers on both arms and hind legs, small crow-sized body, iridescent feathers` },
  { name: '3d_cutout_protoceratops.png',        prompt: `${S}, Protoceratops, large neck frill, parrot-like beak, no horns, small sheep-sized quadruped ceratopsian` },
  { name: '3d_cutout_mamenchisaurus.png',       prompt: `${S}, Mamenchisaurus sauropod, neck comprises half of total body length making it extremely long, four legs` },
];

const delay = ms => new Promise(r => setTimeout(r, ms));

function fetchImage(url, dest) {
  return new Promise(resolve => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      const handle = response => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          file.close(); fs.unlink(dest, () => {});
          fetchImage(response.headers.location, dest).then(resolve);
          return;
        }
        if (response.statusCode >= 400 || response.headers['content-type']?.includes('json')) {
          response.resume(); file.close(); fs.unlink(dest, () => {}); resolve(false); return;
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          try { resolve(fs.statSync(dest).size > 5000); } catch { resolve(false); }
        });
      };
      handle(res);
    }).on('error', () => { fs.unlink(dest, () => {}); resolve(false); });
  });
}

async function run() {
  console.log(`\n🦕 Realistic Miniature Chibi Regeneration — ${tasks.length} species\n`);
  let ok = 0;
  for (const task of tasks) {
    const dest = path.join(chibiDir, task.name);
    if (fs.existsSync(dest)) { fs.unlinkSync(dest); console.log(`  🗑  ${task.name}`); }

    let done = false;
    for (let i = 1; i <= 5 && !done; i++) {
      process.stdout.write(`  ⬇  ${task.name} (${i})... `);
      const seed = Math.floor(Math.random() * 999999);
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(task.prompt)}?width=768&height=768&nologo=true&seed=${seed}`;
      done = await fetchImage(url, dest);
      console.log(done ? '✅' : '❌');
      if (!done) { if (fs.existsSync(dest)) fs.unlinkSync(dest); await delay(5000); }
    }
    if (done) ok++;
    await delay(1500);
  }
  console.log(`\n🏁 Done: ${ok}/${tasks.length}\n`);
}
run();
