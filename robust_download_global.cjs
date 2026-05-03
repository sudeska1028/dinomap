const https = require('https');
const fs = require('fs');

const missingSprites = [
    { fossil: 'carcharodontosaurus_fossil.png', art: 'carcharodontosaurus_art.png', name: 'Carcharodontosaurus' },
    { fossil: 'ouranosaurus_fossil.png', art: 'ouranosaurus_art.png', name: 'Ouranosaurus' },
    { fossil: 'muttaburrasaurus_fossil.png', art: 'muttaburrasaurus_art.png', name: 'Muttaburrasaurus' },
    { fossil: 'minmi_fossil.png', art: 'minmi_art.png', name: 'Minmi' },
    { fossil: 'australovenator_fossil.png', art: 'australovenator_art.png', name: 'Australovenator' },
    { fossil: 'amargasaurus_fossil.png', art: 'amargasaurus_art.png', name: 'Amargasaurus' },
    { fossil: 'herrerasaurus_fossil.png', art: 'herrerasaurus_art.png', name: 'Herrerasaurus' },
    { fossil: 'argentinosaurus_fossil.png', art: 'argentinosaurus_art.png', name: 'Argentinosaurus' },
    { fossil: 'microraptor_fossil.png', art: 'microraptor_art.png', name: 'Microraptor' },
    { fossil: 'protoceratops_fossil.png', art: 'protoceratops_art.png', name: 'Protoceratops' },
    { fossil: 'mamenchisaurus_fossil.png', art: 'mamenchisaurus_art.png', name: 'Mamenchisaurus' }
];

const tasks = [];
for (const d of missingSprites) {
    tasks.push({ 
        name: d.fossil, 
        prompt: `Photorealistic 8K complete ${d.name} fossil skeleton museum display dramatic lighting` 
    });
    tasks.push({ 
        name: d.art, 
        prompt: `Cinematic 8K 3D render living ${d.name} standing by prehistoric natural environment highly detailed` 
    });
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function downloadWithRetry(task, attempts = 5) {
    const url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(task.prompt) + '?width=1024&height=1024&nologo=true&seed=' + Math.floor(Math.random()*100000);
    for (let i = 0; i < attempts; i++) {
        console.log(`Downloading ${task.name} (Attempt ${i+1})...`);
        const success = await new Promise((resolve) => {
            https.get(url, (res) => {
                const handleResponse = (response) => {
                    if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
                        console.log('Got JSON (Rate limit/Queue full)');
                        response.on('data', () => {}); 
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
                        if (stats.size > 50000) {
                            resolve(true); 
                        } else {
                            console.log(`File too small (${stats.size} bytes). Corrupted API Response.`);
                            resolve(false); 
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
            console.log(`Failed ${task.name}. Waiting 5s...`);
            await delay(5000);
        }
    }
    console.log(`Exhausted retries for ${task.name}`);
    return false;
}

async function run() {
    for (const task of tasks) {
        await downloadWithRetry(task);
        await delay(2000); 
    }
    console.log("All robust downloads complete.");
}
run();
