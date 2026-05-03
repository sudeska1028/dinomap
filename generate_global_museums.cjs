const https = require('https');
const fs = require('fs');
const path = require('path');

const assetDir = path.join(__dirname, 'public', 'assets');

const tasks = [
    { name: 'museum_iziko_3d.png', prompt: 'A gorgeous dark cinematic 8K 3D isometric render of the Iziko South African Museum exterior architecture, glowing dramatic lights at night, premium modern design, dark background, photorealistic.' },
    { name: 'museum_winton_3d.png', prompt: 'A gorgeous dark cinematic 8K 3D isometric render of the Australian Age of Dinosaurs Museum in the outback, glowing dramatic lights at night, premium modern design, dark background, photorealistic.' },
    { name: 'museum_rio_3d.png', prompt: 'A gorgeous dark cinematic 8K 3D isometric render of the Museu Nacional in Brazil Rio exterior architecture, glowing dramatic lights at night, premium modern design, dark background, photorealistic.' },
    { name: 'museum_kolkata_3d.png', prompt: 'A gorgeous dark cinematic 8K 3D isometric render of the Indian Museum Kolkata exterior architecture, glowing dramatic lights at night, premium modern design, dark background, photorealistic.' }
];

async function run() {
    for (const task of tasks) {
        let success = false;
        while (!success) {
            try {
                const seed = Math.floor(Math.random() * 999999);
                const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(task.prompt)}?width=768&height=768&nologo=true&seed=${seed}`;
                const dest = path.join(assetDir, task.name);
                
                console.log(`Downloading ${task.name}...`);
                await new Promise((resolve, reject) => {
                    const req = https.get(url, (res) => {
                        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                            https.get(res.headers.location, (redirectRes) => {
                                const file = fs.createWriteStream(dest);
                                redirectRes.pipe(file);
                                file.on('finish', () => resolve());
                            }).on('error', reject);
                        } else {
                            const file = fs.createWriteStream(dest);
                            res.pipe(file);
                            file.on('finish', () => resolve());
                        }
                    }).on('error', reject);
                });
                success = true;
            } catch (e) {
                console.log("Retrying", task.name);
            }
        }
    }
    console.log("Done downloading new 3D museum images.");
}
run();
