import fs from 'fs';
import path from 'path';

const dinos = [
    { name: 'microraptor_art.png', prompt: 'A cinematic 8K photorealistic paleoart of small feathered raptor dinosaur alive in its natural prehistoric habitat, highly detailed, wildlife photography style, dynamic lighting.' },
    { name: 'protoceratops_art.png', prompt: 'A cinematic 8K photorealistic paleoart of small horned dinosaur alive in its natural prehistoric habitat, highly detailed, wildlife photography style, dynamic lighting.' },
    { name: 'mamenchisaurus_art.png', prompt: 'A cinematic 8K photorealistic paleoart of huge extremely long necked sauropod dinosaur alive in its natural prehistoric habitat, highly detailed, wildlife photography style, dynamic lighting.' }
];

async function run() {
    for (const task of dinos) {
        let success = false;
        let attempts = 0;
        const dest = path.join(process.cwd(), 'public', 'assets', task.name);
        
        while (!success && attempts < 10) {
            attempts++;
            const seed = Math.floor(Math.random() * 999999);
            const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(task.prompt)}?width=1024&height=1024&seed=${seed}&nologo=true`;
            console.log(`Downloading ${task.name}... Attempt ${attempts}`);
            
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('HTTP ' + response.status);
                
                const type = response.headers.get('content-type');
                if (type && type.includes('application/json')) {
                    throw new Error('Rate limit JSON');
                }
                
                const buffer = Buffer.from(await response.arrayBuffer());
                if (buffer.length < 5000) {
                    throw new Error('File too small');
                }
                
                fs.writeFileSync(dest, buffer);
                console.log(`[SUCCESS] ${task.name} downloaded.`);
                success = true;
            } catch (e) {
                console.log(`[FAILED] ${e.message}`);
                await new Promise(r => setTimeout(r, 3000));
            }
        }
    }
}
run();
