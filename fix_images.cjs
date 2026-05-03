const https = require('https');
const fs = require('fs');
const path = require('path');

const assetDir = path.join(__dirname, 'public', 'assets');

// Tasks define the missing 3D renders and fossils.
const tasks = [
    { name: 'spinosaurus_fossil_ai.png', prompt: 'Photorealistic 8K complete Spinosaurus fossil skeleton museum display dramatic lighting' },
    { name: 'spinosaurus_art_ai.png', prompt: 'Cinematic 8K 3D render living Spinosaurus standing by prehistoric river' },
    { name: 'velociraptor_fossil_ai.png', prompt: 'Photorealistic 8K complete Velociraptor fossil skeleton museum display dramatic' },
    { name: 'velociraptor_art_ai.png', prompt: 'Cinematic 8K 3D render living Velociraptor pack hunting desert' },
    { name: 'brachiosaurus_fossil_ai.png', prompt: 'Photorealistic 8K complete Brachiosaurus fossil skeleton museum display tall' },
    { name: 'brachiosaurus_art_ai.png', prompt: 'Cinematic 8K 3D render massive living Brachiosaurus prehistoric jungle' },
    { name: 'ankylosaurus_fossil_ai.png', prompt: 'Photorealistic 8K complete Ankylosaurus fossil skeleton museum display' },
    { name: 'ankylosaurus_art_ai.png', prompt: 'Cinematic 8K 3D render living Ankylosaurus in prehistoric forest' },
    { name: 'parasaurolophus_art_ai.png', prompt: 'Cinematic 8K 3D render living Parasaurolophus prehistoric swamp' },
    // Parasaurolophus fossil exists but just verifying
    { name: 'therizinosaurus_fossil_ai.png', prompt: 'Photorealistic 8K complete Therizinosaurus fossil skeleton museum display scythe claws' },
    { name: 'therizinosaurus_art_ai.png', prompt: 'Cinematic 8K 3D render living Therizinosaurus thick forest scythe claws' },
    { name: 'quetzalcoatlus_fossil_ai.png', prompt: 'Photorealistic 8K complete Quetzalcoatlus fossil skeleton museum display pterosaur' },
    { name: 'quetzalcoatlus_art_ai.png', prompt: 'Cinematic 8K 3D render massive Quetzalcoatlus prehistoric scrubland pterosaur' },
    { name: 'dilophosaurus_fossil_ai.png', prompt: 'Photorealistic 8K complete Dilophosaurus fossil skeleton museum display twin crests' },
    { name: 'dilophosaurus_art_ai.png', prompt: 'Cinematic 8K 3D render living Dilophosaurus prehistoric jungle twin crests' },
    { name: 'styracosaurus_fossil_ai.png', prompt: 'Photorealistic 8K complete Styracosaurus fossil skeleton museum display spiked frill' },
    { name: 'styracosaurus_art_ai.png', prompt: 'Cinematic 8K 3D render living Styracosaurus prehistoric plain spiked frill' },

    // The locally perfect ones that were missing entirely
    { name: 'fossil_sue_trex.png', prompt: 'Photorealistic 8K complete Tyrannosaurus Rex fossil skeleton museum display Chicago Sue robust' },
    { name: 'real_sue_trex.png', prompt: 'Cinematic 8K 3D render massive robust Tyrannosaurus Rex in a prehistoric forest clearing' },
    { name: 'fossil_omeisaurus.png', prompt: 'Photorealistic 8K complete Omeisaurus fossil skeleton museum display massive long neck' },
    { name: 'real_omeisaurus.png', prompt: 'Cinematic 8K 3D render living Omeisaurus towering long neck in a prehistoric Asian jungle' },
    { name: 'fossil_giganotosaurus.png', prompt: 'Photorealistic 8K complete Giganotosaurus fossil skeleton museum display terrifying' },
    { name: 'real_giganotosaurus.png', prompt: 'Cinematic 8K 3D render living apex predator Giganotosaurus in prehistoric South America' },
    { name: 'fossil_futabasaurus.png', prompt: 'Photorealistic 8K complete Futabasaurus plesiosaur fossil skeleton museum display' },
    { name: 'real_futabasaurus.png', prompt: 'Cinematic 8K 3D render living Futabasaurus plesiosaur swimming in a prehistoric ocean' },
];

const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchImage(url, dest) {
    return new Promise((resolve) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (res) => {
            const handleResponse = (response) => {
                if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
                    response.on('data', () => {}); 
                    resolve(false);
                    return;
                }
                if (response.statusCode >= 400) {
                    response.on('data', () => {});
                    resolve(false);
                    return;
                }
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    const stats = fs.statSync(dest);
                    if (stats.size > 5000) {
                        resolve(true); 
                    } else {
                        resolve(false); 
                    }
                });
            };

            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                https.get(res.headers.location, handleResponse).on('error', () => resolve(false));
            } else {
                handleResponse(res);
            }
        }).on('error', () => {
            fs.unlink(dest, () => {});
            resolve(false);
        });
    });
}

async function downloadWithRetry(task, attempts = 5) {
    const dest = path.join(assetDir, task.name);

    if (fs.existsSync(dest)) {
        const stats = fs.statSync(dest);
        if (stats.size < 5000) {
            console.log(`Removing corrupted file ${task.name} (${stats.size} bytes)`);
            fs.unlinkSync(dest);
        } else {
            console.log(`Skipping ${task.name}, valid file already exists.`);
            return true;
        }
    }

    // Try multiple seed permutations to avoid server cache hits
    for (let i = 0; i < attempts; i++) {
        console.log(`Downloading ${task.name} (Attempt ${i + 1})...`);
        const seed = Math.floor(Math.random() * 999999);
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(task.prompt)}?width=768&height=768&nologo=true&seed=${seed}`;
        
        const success = await fetchImage(url, dest);

        if (success) {
            console.log(`✅ Successfully downloaded ${task.name}`);
            return true;
        } else {
            console.log(`❌ Failed ${task.name}. Waiting 5s...`);
            if (fs.existsSync(dest)) fs.unlinkSync(dest); // clean up partials
            await delay(5000);
        }
    }
    console.log(`⚠️ Exhausted retries for ${task.name}`);
    return false;
}

async function run() {
    console.log("Starting robust asset repair and regeneration process...");
    let successCount = 0;
    for (const task of tasks) {
        const s = await downloadWithRetry(task);
        if (s) successCount++;
        await delay(2000); 
    }
    console.log(`\nFinished! Successfully processed ${successCount} / ${tasks.length} images.`);
}
run();
