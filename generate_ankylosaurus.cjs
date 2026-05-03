const https = require('https');
const fs = require('fs');
const path = require('path');

const assetDir = path.join(__dirname, 'public', 'assets');

const tasks = [
    { 
      name: 'ankylosaurus_fossil_ai.png', 
      prompt: 'A photorealistic 8K image of a complete Ankylosaurus fossil skeleton. It features a wide, completely flat armored back covered in horizontal osteoderm plates, and a massive heavy bone tail club. ABSOLUTELY NO vertical back plates. Museum hall display, dramatic lighting at night, dark ambiance.' 
    },
    { 
      name: 'ankylosaurus_art_ai.png', 
      prompt: 'A cinematic, 8K ultra-realistic 3D render of a living Ankylosaurus in a prehistoric forest. It resembles a heavily armored tank with a flat wide back covered in horizontal scale armor, and a massive heavy bone tail club. ABSOLUTELY NO vertical back plates on its spine. Realistic dappled sunlight, highly detailed.' 
    }
];

async function run() {
    for (const task of tasks) {
        const seed = Math.floor(Math.random() * 999999);
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(task.prompt)}?width=768&height=768&nologo=true&seed=${seed}`;
        const dest = path.join(assetDir, task.name);
        
        console.log(`Downloading ${task.name}...`);
        await new Promise((resolve) => {
            https.get(url, (res) => {
                const handleResponse = (response) => {
                    const file = fs.createWriteStream(dest);
                    response.pipe(file);
                    file.on('finish', () => resolve());
                };
                if(res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    https.get(res.headers.location, handleResponse).on('error', ()=>resolve());
                } else {
                    handleResponse(res);
                }
            }).on('error', (err) => {
                console.error(err);
                resolve();
            });
        });
    }
    console.log("Done generating corrected Ankylosaurus images.");
}
run();
