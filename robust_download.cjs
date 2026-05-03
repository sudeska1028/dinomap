const https = require('https');
const fs = require('fs');

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
    { name: 'therizinosaurus_fossil_ai.png', prompt: 'Photorealistic 8K complete Therizinosaurus fossil skeleton museum display' },
    { name: 'therizinosaurus_art_ai.png', prompt: 'Cinematic 8K 3D render living Therizinosaurus thick forest' },
    { name: 'quetzalcoatlus_fossil_ai.png', prompt: 'Photorealistic 8K complete Quetzalcoatlus fossil skeleton museum display' },
    { name: 'quetzalcoatlus_art_ai.png', prompt: 'Cinematic 8K 3D render massive Quetzalcoatlus prehistoric scrubland' },
    { name: 'dilophosaurus_fossil_ai.png', prompt: 'Photorealistic 8K complete Dilophosaurus fossil skeleton museum display' },
    { name: 'dilophosaurus_art_ai.png', prompt: 'Cinematic 8K 3D render living Dilophosaurus prehistoric jungle' },
    { name: 'styracosaurus_fossil_ai.png', prompt: 'Photorealistic 8K complete Styracosaurus fossil skeleton museum display' },
    { name: 'styracosaurus_art_ai.png', prompt: 'Cinematic 8K 3D render living Styracosaurus prehistoric plain' }
];

const delay = ms => new Promise(res => setTimeout(res, ms));

async function downloadWithRetry(task, attempts = 6) {
    const url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(task.prompt) + '?width=1024&height=1024&nologo=true&seed=' + Math.floor(Math.random()*100000);
    for (let i = 0; i < attempts; i++) {
        console.log(`Downloading ${task.name} (Attempt ${i+1})...`);
        const success = await new Promise((resolve) => {
            https.get(url, (res) => {
                const handleResponse = (response) => {
                    if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
                        console.log('Got JSON (Rate limit/Queue full)');
                        response.on('data', () => {}); // consume stream to free memory
                        resolve(false);
                        return;
                    }
                    if (response.statusCode >= 400) {
                        console.log(`HTTP ${response.statusCode}`);
                        response.on('data', () => {});
                        resolve(false);
                        return;
                    }
                    const file = fs.createWriteStream('./public/assets/' + task.name);
                    response.pipe(file);
                    file.on('finish', () => {
                        const stats = fs.statSync('./public/assets/' + task.name);
                        if (stats.size > 5000) {
                            resolve(true); // Image is good!
                        } else {
                            console.log(`File too small (${stats.size} bytes). Possibly corrupted.`);
                            resolve(false); // Bad file
                        }
                    });
                };

                if(res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    https.get(res.headers.location, handleResponse).on('error', (err)=> {
                        console.error('Redirect err:', err.message);
                        resolve(false);
                    });
                } else {
                    handleResponse(res);
                }
            }).on('error', (err) => {
                console.error('Request err:', err.message);
                resolve(false);
            });
        });

        if (success) {
            console.log(`Successfully downloaded ${task.name}`);
            return true;
        } else {
            console.log(`Failed ${task.name}. Waiting 8s...`);
            await delay(8000);
        }
    }
    console.log(`Exhausted retries for ${task.name}`);
    return false;
}

async function run() {
    for (const task of tasks) {
        await downloadWithRetry(task);
        await delay(3000); // Wait 3s before next prompt
    }
    console.log("All done.");
}
run();
