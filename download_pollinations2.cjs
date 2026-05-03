const https = require('https');
const fs = require('fs');

const tasks = [
    { name: 'spinosaurus_fossil_ai.png', prompt: 'A photorealistic 8K image of a complete Spinosaurus fossil skeleton displayed in a state-of-the-art modern natural history museum. Dramatic spotlighting, dark background, premium cinematic museum display.' },
    { name: 'spinosaurus_art_ai.png', prompt: 'A cinematic, 8K ultra-realistic 3D render of a living Spinosaurus standing by a prehistoric river. Dynamic pose, highly detailed sail, dramatic sunlight, naturalistic.' },
    { name: 'velociraptor_fossil_ai.png', prompt: 'A photorealistic 8K image of a complete Velociraptor fossil skeleton displayed in a state-of-the-art modern natural history museum. Dramatic spotlighting, dark background, premium cinematic museum display.' },
    { name: 'velociraptor_art_ai.png', prompt: 'A cinematic, 8K ultra-realistic 3D render of a living Velociraptor pack hunting in a prehistoric desert. Dynamic pose, highly detailed feathers, dramatic sunset lighting, naturalistic.' },
    { name: 'brachiosaurus_fossil_ai.png', prompt: 'A photorealistic 8K image of a complete Brachiosaurus fossil skeleton displayed towering in a state-of-the-art modern natural history museum. Dramatic spotlighting, dark background, premium cinematic museum display.' },
    { name: 'brachiosaurus_art_ai.png', prompt: 'A cinematic, 8K ultra-realistic 3D render of a massive living Brachiosaurus reaching for leaves in a prehistoric jungle. Dynamic pose, highly detailed, tall as a building, dramatic lighting, naturalistic.' },
    { name: 'ankylosaurus_fossil_ai.png', prompt: 'A photorealistic 8K image of a complete Ankylosaurus fossil skeleton displayed in a state-of-the-art modern natural history museum. Dramatic spotlighting, dark background, premium cinematic museum display.' },
    { name: 'ankylosaurus_art_ai.png', prompt: 'A cinematic, 8K ultra-realistic 3D render of a living Ankylosaurus in a prehistoric forest. Dynamic pose, highly detailed armor and club tail, dramatic dappled sunlight, naturalistic.' }
];

async function run() {
    for (const task of tasks) {
        const url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(task.prompt) + '?width=1024&height=1024&nologo=true';
        console.log(`Downloading ${task.name}...`);
        await new Promise((resolve) => {
            https.get(url, (res) => {
                const handleResponse = (response) => {
                    const file = fs.createWriteStream('./public/assets/' + task.name);
                    response.pipe(file);
                    file.on('finish', () => resolve());
                };
                
                if(res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    https.get(res.headers.location, handleResponse);
                } else {
                    handleResponse(res);
                }
            }).on('error', (err) => {
                console.error(err);
                resolve();
            });
        });
    }
    console.log("Done downloading missing AI images.");
}
run();
