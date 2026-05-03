import fs from 'fs';
import path from 'path';
import { removeBackground } from '@imgly/background-removal-node';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
    const dinosModule = await import('./src/data.js');
    const dinos = dinosModule.dinosaurs;
    
    const assetsDir = path.join(__dirname, 'public', 'assets');
    const chibisDir = path.join(assetsDir, 'chibis');
    if (!fs.existsSync(chibisDir)) fs.mkdirSync(chibisDir, { recursive: true });
    
    console.log("Starting LOCAL background removal for 37 Dinosaurs! This uses ONNX CPU models.");

    for (const dino of dinos) {
        if (!dino.locations || dino.locations.length === 0) continue;
        
        const speciesName = dino.species.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const imgKey = `3d_cutout_${speciesName}.png`;
        const destPng = path.join(chibisDir, imgKey);
        
        if (fs.existsSync(destPng)) continue;
        
        // Use the existing beautiful cinematic art renders
        const sourcePath = path.join(__dirname, 'public', dino.animation_url);
        const sourceUrl = 'file:///' + sourcePath.replace(/\\/g, '/');
        
        if (!fs.existsSync(sourcePath)) {
            console.log(`Missing source image: ${sourcePath}`);
            continue;
        }

        try {
            console.log(`Processing: ${dino.species}...`);
            const blob = await removeBackground(sourceUrl, {
                model: 'medium', // Expected 'small' | 'medium' | 'large'
                output: {
                    format: 'image/png',
                    quality: 1
                }
            });
            const buffer = Buffer.from(await blob.arrayBuffer());
            fs.writeFileSync(destPng, buffer);
            console.log(`[SUCCESS] Cutout saved: ${destPng}`);
        } catch (e) {
            console.log(`[ERROR] Failed to process ${dino.species}: ${e.message}`);
        }
    }
    
    console.log("Processing complete!");
}

run();
