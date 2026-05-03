const https = require('https');
const fs = require('fs');
const path = require('path');

const assetDir = path.join(__dirname, 'public', 'assets');

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

async function run() {
    for (const d of missingSprites) {
        const pFossil = `A beautiful, 8K ultra-detailed museum display of ${d.name} fossil bones, highly professional photography, dark dramatic lighting background, paleontology museum exhibit, photorealistic.`;
        const pArt = `A cinematic 8K photorealistic paleoart of ${d.name} dinosaur alive in its natural prehistoric habitat, highly detailed, wildlife photography style, dynamic lighting.`;
        
        const fossilDest = path.join(assetDir, d.fossil);
        const artDest = path.join(assetDir, d.art);

        console.log(`Downloading ${d.name}...`);
        
        await download(pFossil, fossilDest);
        await download(pArt, artDest);
    }
    console.log("Done downloading global background assets.");
}

async function download(prompt, dest) {
    let success = false;
    while (!success) {
        try {
            const seed = Math.floor(Math.random() * 999999);
            const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&seed=${seed}`;
            
            await new Promise((resolve, reject) => {
                https.get(url, (res) => {
                    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                        https.get(res.headers.location, (r) => save(r, dest, resolve, reject)).on('error', reject);
                    } else {
                        save(res, dest, resolve, reject);
                    }
                }).on('error', reject);
            });
            success = true;
        } catch (e) {
            console.log("Retrying...");
        }
    }
}

function save(res, dest, resolve, reject) {
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', resolve).on('error', reject);
}

run();
