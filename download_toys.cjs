const fs = require('fs');
const https = require('https');
const path = require('path');

const toys = [
    { id: 'toy_theropod', prompt: 'A single cute chibi miniature 3D toy figurine of a T-rex. The figurine is made of smooth colorful plastic. PURE SOLID PITCH BLACK BACKGROUND ONLY, #000000 environment. Isometric view. Glowing dynamic rim lighting. adorable and stylized collectible toy.' },
    { id: 'toy_sauropod', prompt: 'A single cute chibi miniature 3D toy figurine of a Brachiosaurus long neck. The figurine is made of smooth green plastic. PURE SOLID PITCH BLACK BACKGROUND ONLY, #000000 environment. Isometric view. Glowing dynamic rim lighting. adorable and stylized collectible toy.' },
    { id: 'toy_ceratopsian', prompt: 'A single cute chibi miniature 3D toy figurine of a Triceratops. The figurine is made of smooth blue plastic. PURE SOLID PITCH BLACK BACKGROUND ONLY, #000000 environment. Isometric view. Glowing dynamic rim lighting. adorable and stylized collectible toy.' },
    { id: 'toy_armored', prompt: 'A single cute chibi miniature 3D toy figurine of a Stegosaurus. The figurine is made of smooth yellow plastic. PURE SOLID PITCH BLACK BACKGROUND ONLY, #000000 environment. Isometric view. Glowing dynamic rim lighting. adorable and stylized collectible toy.' },
    { id: 'toy_marine', prompt: 'A single cute chibi miniature 3D toy figurine of a Plesiosaur marine reptile. The figurine is made of smooth Cyan plastic. PURE SOLID PITCH BLACK BACKGROUND ONLY, #000000 environment. Isometric view. Glowing dynamic rim lighting. adorable and stylized collectible toy.' },
    { id: 'toy_pterosaur', prompt: 'A single cute chibi miniature 3D toy figurine of a Pterodactyl. The figurine is made of smooth purple plastic. PURE SOLID PITCH BLACK BACKGROUND ONLY, #000000 environment. Isometric view. Glowing dynamic rim lighting. adorable and stylized collectible toy.' },
    { id: 'toy_raptor', prompt: 'A single cute chibi miniature 3D toy figurine of a Velociraptor. The figurine is made of smooth red plastic. PURE SOLID PITCH BLACK BACKGROUND ONLY, #000000 environment. Isometric view. Glowing dynamic rim lighting. adorable and stylized collectible toy.' }
];

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const req = https.get(url, { timeout: 15000 }, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                downloadImage(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download, status: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        }).on('timeout', () => {
            req.destroy();
            fs.unlink(dest, () => {});
            reject(new Error('Request timed out'));
        });
    });
}

async function run() {
    const assetsDir = path.join(__dirname, 'public', 'assets');
    for (const toy of toys) {
        const dest = path.join(assetsDir, toy.id + '.png');
        if (fs.existsSync(dest)) {
           const stat = fs.statSync(dest);
           if (stat.size > 1000) {
               console.log(`Skipping ${toy.id}.png, already exists and >1kb`);
               continue;
           }
        }
        
        let success = false;
        for (let tries = 0; tries < 3 && !success; tries++) {
            try {
                const seed = Math.floor(Math.random() * 100000);
                const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(toy.prompt)}?seed=${seed}&width=256&height=256&noflogo=true&enhance=false`;
                console.log(`Downloading ${toy.id}.png (attempt ${tries+1})...`);
                await downloadImage(url, dest);
                console.log(`Downloaded ${toy.id}.png successfully.`);
                success = true;
            } catch (e) {
                console.log(`Error on ${toy.id}: ${e.message}`);
                await new Promise(r => setTimeout(r, 2000));
            }
        }
    }
    console.log("Done");
}

run();
