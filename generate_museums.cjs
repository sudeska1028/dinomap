const https = require('https');
const fs = require('fs');
const path = require('path');

const assetDir = path.join(__dirname, 'public', 'assets');

const tasks = [
    { name: 'museum_london_3d.png', prompt: 'A gorgeous dark cinematic 8K 3D isometric render of the Natural History Museum London exterior architecture, glowing dramatic lights at night, premium modern design, dark background, photorealistic.' },
    { name: 'museum_amnh_3d.png', prompt: 'A gorgeous dark cinematic 8K 3D isometric render of the American Museum of Natural History New York exterior architecture, glowing dramatic lights at night, premium modern design, dark background, photorealistic.' },
    { name: 'museum_tyrrell_3d.png', prompt: 'A gorgeous dark cinematic 8K 3D isometric render of the modern Royal Tyrrell Museum exterior architecture, nestled in a prehistoric badlands landscape glowing dramatic lights at night, premium modern design, dark background, photorealistic.' }
];

async function run() {
    for (const task of tasks) {
        // Use nologo=true to remove wait and watermarks, standard size
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
    console.log("Done downloading new 3D museum images.");
}
run();
