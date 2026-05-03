import fs from 'fs';
import path from 'path';
import { Jimp } from 'jimp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const delay = ms => new Promise(res => setTimeout(res, ms));

async function downloadImage(url, dest) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            throw new Error('Rate Limited (JSON response)');
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        if (buffer.length < 5000) {
            throw new Error('File too small, possibly corrupted API response');
        }
        
        fs.writeFileSync(dest, buffer);
    } catch (e) {
        throw e;
    } finally {
        clearTimeout(id);
    }
}

async function removeMagentaScreen(srcPath, destPath) {
    const image = await Jimp.read(srcPath);
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        // Magenta is high R and high B, relatively low G.
        const isMagenta = (r > 120 && b > 120) && (g < r * 0.8 && g < b * 0.8) && (Math.abs(r - b) < 60);
        
        if (isMagenta) {
            this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
        }
    });

    return new Promise((resolve, reject) => {
        image.write(destPath, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

async function run() {
    console.log("Starting 3D miniature generation script...");
    const dinosModule = await import('./src/data.js');
    const dinos = dinosModule.dinosaurs;
    
    const assetsDir = path.join(__dirname, 'public', 'assets', 'chibis');
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
    
    const targetDinos = dinos.filter(d => d.locations && d.locations.length > 0);
    let successCount = 0;
    
    for (const dino of targetDinos) {
        const speciesName = dino.species.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const imgKey = `3d_cutout_${speciesName}.png`;
        const destPng = path.join(assetsDir, imgKey);
        
        if (fs.existsSync(destPng)) continue; // skip already generated
        
        const tempJpg = path.join(assetsDir, `temp_${speciesName}.jpg`);
        let success = false;
        let attempts = 0;
        
        while (!success && attempts < 8) {
            attempts++;
            console.log(`[${dino.species}] Generating... (Attempt ${attempts})`);
            const seed = Math.floor(Math.random() * 1000000);
            const prompt = `A highly detailed cute low-poly isometric 3D miniature toy figure of a ${dino.species} dinosaur. Chibi adorable stylized figurine made of plastic standing on the ground. SOLID PURE MAGENTA BACKGROUND, rgb(255,0,255), #FF00FF background ONLY. Cinematic rim lighting. no shadows on the ground.`;
            const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=384&height=384&nologo=true&enhance=false&seed=${seed}`;
            
            try {
                await downloadImage(url, tempJpg);
                await removeMagentaScreen(tempJpg, destPng);
                if (fs.existsSync(tempJpg)) fs.unlinkSync(tempJpg);
                console.log(`[${dino.species}] SUCCESS: ${destPng}`);
                success = true;
                successCount++;
            } catch (e) {
                console.log(`[${dino.species}] Error: ${e.message}`);
                if (fs.existsSync(tempJpg)) fs.unlinkSync(tempJpg);
                await delay(3000); // Wait before retrying
            }
        }
        if (!success) {
            console.log(`[${dino.species}] FAILED after multiple attempts.`);
        } else {
            await delay(2000); // Be polite to API
        }
    }
    console.log(`All operations complete. Generated ${successCount} new miniatures.`);
}

run().catch(console.error);
