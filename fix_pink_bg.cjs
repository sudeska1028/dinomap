const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const chibisDir = path.join(__dirname, 'public', 'assets', 'chibis');
const files = fs.readdirSync(chibisDir).filter(f => f.endsWith('.png'));

async function fix() {
    for (const f of files) {
        const filePath = path.join(chibisDir, f);
        try {
            const image = await Jimp.read(filePath);
            let hasPink = false;
            
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
                const r = this.bitmap.data[idx + 0];
                const g = this.bitmap.data[idx + 1];
                const b = this.bitmap.data[idx + 2];
                const a = this.bitmap.data[idx + 3];
                
                if (a === 0) return; // already transparent
                
                // Aggressive magenta/pink detection
                // If red is high and blue is high and green is low
                const isMagenta = (r > 150 && b > 150) && (g < Math.max(r, b) * 0.7);
                // Catch lighter pink halos
                const isPinkHalo = (r > 180 && b > 180) && (g < 200) && (Math.abs(r - b) < 60);

                if (isMagenta || isPinkHalo) {
                    this.bitmap.data[idx + 3] = 0; // transparent
                    hasPink = true;
                }
            });
            
            if (hasPink) {
                await image.write(filePath);
                console.log(`Cleaned pink from ${f}`);
            }
        } catch (e) {
            console.log(`Could not process ${f}: ${e.message}`);
        }
    }
    console.log("Done checking all files.");
}
fix();
