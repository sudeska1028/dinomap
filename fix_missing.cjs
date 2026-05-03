const https = require('https');
const fs = require('fs');

const tasks = [
    { name: 'herrerasaurus_art.png', prompt: 'A cinematic 8K photorealistic paleoart of Herrerasaurus dinosaur alive in its natural prehistoric habitat, highly detailed, wildlife photography style, dynamic lighting.' },
    { name: 'microraptor_art.png', prompt: 'A cinematic 8K photorealistic paleoart of Microraptor dinosaur alive in its natural prehistoric habitat, highly detailed, wildlife photography style, dynamic lighting.' },
    { name: 'protoceratops_art.png', prompt: 'A cinematic 8K photorealistic paleoart of Protoceratops dinosaur alive in its natural prehistoric habitat, highly detailed, wildlife photography style, dynamic lighting.' },
    { name: 'mamenchisaurus_art.png', prompt: 'A cinematic 8K photorealistic paleoart of Mamenchisaurus dinosaur alive in its natural prehistoric habitat, highly detailed, wildlife photography style, dynamic lighting.' }
];

const delay = ms => new Promise(res => setTimeout(res, ms));

async function downloadWithRetry(task, attempts = 10) {
    const url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(task.prompt) + '?width=1024&height=1024&nologo=true&seed=' + Math.floor(Math.random()*100000);
    const dest = './public/assets/' + task.name;
    
    for (let i = 0; i < attempts; i++) {
        console.log(`Downloading ${task.name} (Attempt ${i+1})...`);
        const success = await new Promise((resolve) => {
            const req = https.get(url, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            }, (res) => {
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
                    const file = fs.createWriteStream(dest);
                    response.pipe(file);
                    file.on('finish', () => {
                        const stats = fs.statSync(dest);
                        if (stats.size > 5000) {
                            resolve(true);
                        } else {
                            console.log(`File too small (${stats.size} bytes). Possibly corrupted.`);
                            resolve(false);
                        }
                    });
                };

                if(res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, handleResponse).on('error', (err)=> {
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
        await delay(3000); 
    }
    console.log("All done.");
}
run();
