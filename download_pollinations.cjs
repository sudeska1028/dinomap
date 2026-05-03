const https = require('https');
const fs = require('fs');

const tasks = [
    { name: 'parasaurolophus_art_ai.png', prompt: 'A cinematic, 8K ultra-realistic 3D render of a living Parasaurolophus in a prehistoric swamp. Dynamic pose, highly detailed skin, dramatic sunset lighting, naturalistic environment.' },
    { name: 'therizinosaurus_fossil_ai.png', prompt: 'A photorealistic 8K image of a complete Therizinosaurus fossil skeleton displayed in a state-of-the-art modern natural history museum. Dramatic spotlighting, dark background, premium cinematic museum display.' },
    { name: 'therizinosaurus_art_ai.png', prompt: 'A cinematic, 8K ultra-realistic 3D render of a living Therizinosaurus in a prehistoric dense forest. Dynamic pose, highly detailed feathers and giant claws, dramatic sunlight through leaves, naturalistic.' },
    { name: 'quetzalcoatlus_fossil_ai.png', prompt: 'A photorealistic 8K image of a complete Quetzalcoatlus fossil skeleton displayed dominating the room in a state-of-the-art modern natural history museum. Dramatic spotlighting, dark background, premium cinematic museum display.' },
    { name: 'quetzalcoatlus_art_ai.png', prompt: 'A cinematic, 8K ultra-realistic 3D render of a massive living Quetzalcoatlus on the ground in a prehistoric scrubland. Dynamic pose, highly detailed, tall as a giraffe, dramatic lighting, naturalistic.' },
    { name: 'dilophosaurus_fossil_ai.png', prompt: 'A photorealistic 8K image of a complete Dilophosaurus fossil skeleton displayed in a state-of-the-art modern natural history museum. Dramatic spotlighting, dark background, premium cinematic museum display.' },
    { name: 'dilophosaurus_art_ai.png', prompt: 'A cinematic, 8K ultra-realistic 3D render of a living Dilophosaurus in a prehistoric jungle. Dynamic pose, highly detailed twin crests, dramatic sunlight, naturalistic.' },
    { name: 'styracosaurus_fossil_ai.png', prompt: 'A photorealistic 8K image of a complete Styracosaurus fossil skeleton displayed in a state-of-the-art modern natural history museum. Dramatic spotlighting, dark background, premium cinematic museum display.' },
    { name: 'styracosaurus_art_ai.png', prompt: 'A cinematic, 8K ultra-realistic 3D render of a living Styracosaurus in a prehistoric plain. Dynamic pose, highly detailed spiky frill, dramatic sunlight, naturalistic.' }
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
