import fs from 'fs';
import path from 'path';
import { removeBackground } from '@imgly/background-removal-node';
import https from 'https';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
            reject(new Error('timeout'));
        });
    });
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function run() {
    const dinosModule = await import('./src/data.js');
    const dinos = dinosModule.dinosaurs;
    
    const assetsDir = path.join(__dirname, 'public', 'assets', 'chibis');
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
    
    const targetDinos = dinos.filter(d => d.locations && d.locations.length > 0);
    
    console.log("Starting generation of 3D miniature figurines...");

    for (const dino of targetDinos) {
        const speciesName = dino.species.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const imgKey = `3d_cutout_${speciesName}.png`;
        const destPng = path.join(assetsDir, imgKey);
        
        if (fs.existsSync(destPng)) continue;
        
        const tempJpg = path.join(assetsDir, `temp_${speciesName}.jpg`);
        
        let success = false;
        let attempts = 0;
        
        while (!success && attempts < 3) {
            attempts++;
            const seed = Math.floor(Math.random() * 100000);
            const prompt = `A single cute chibi miniature 3D toy figure of a ${dino.species} dinosaur. Stylized plastic figurine on a plain solid white background. Clean, adorable, high quality.`;
            const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=256&height=256&nologo=true&enhance=false&seed=${seed}`;
            
            try {
                console.log(`[${dino.species}] Downloading image from AI... (Attempt ${attempts})`);
                await downloadImage(url, tempJpg);
                
                console.log(`[${dino.species}] Removing background locally...`);
                const sourceUrl = 'file:///' + tempJpg.replace(/\\/g, '/');
                const blob = await removeBackground(sourceUrl, {
                    model: 'small', // Use small model for speed, it works well since it's just 256x256 image
                    output: { format: 'image/png', quality: 1 }
                });
                
                const buffer = Buffer.from(await blob.arrayBuffer());
                fs.writeFileSync(destPng, buffer);
                
                // Cleanup temp
                if (fs.existsSync(tempJpg)) fs.unlinkSync(tempJpg);
                console.log(`[SUCCESS] Created miniature for ${dino.species}!`);
                success = true;
                
            } catch (e) {
                console.log(`[ERROR] ${dino.species}: ${e.message}`);
                await delay(3000);
            }
        }
    }
    
    console.log("All unique 3D miniature generation complete.");
}

run();
