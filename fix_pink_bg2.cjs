const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const chibisDir = path.join(__dirname, 'public', 'assets', 'chibis');
const files = fs.readdirSync(chibisDir).filter(f => f.endsWith('.png'));

function isMagentaOrPink(r, g, b) {
    if (r === 0 && b === 0) return false;
    
    // Convert to crude HSL or just check ratio
    // Magenta means Red and Blue dominate Green.
    // So if Green is significantly lower than both Red and Blue.
    const max = Math.max(r, b);
    const min = Math.min(r, b);
    
    // R and B should be somewhat close to each other for it to be magenta
    if (Math.abs(r - b) > max * 0.5) return false;
    
    // Green must be lower than R and B. The larger the difference, the more saturated magenta.
    // Even very dark magenta has r=50, b=50, g=0.
    if (g < min * 0.85) return true;
    
    // Very light pink? e.g., r=250, b=250, g=200
    if (r > 200 && b > 200 && g < 220 && (Math.abs(r - b) < 40)) return true;
    
    // Pure or near pure magenta (any shade of grey-magenta)
    if (r > 30 && b > 30 && g < min * 0.9) return true;

    return false;
}

async function fix() {
    for (const f of files) {
        const filePath = path.join(chibisDir, f);
        try {
            const image = await Jimp.read(filePath);
            let modified = false;
            
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
                const r = this.bitmap.data[idx + 0];
                const g = this.bitmap.data[idx + 1];
                const b = this.bitmap.data[idx + 2];
                const a = this.bitmap.data[idx + 3];
                
                if (a === 0) return; // already transparent
                
                if (isMagentaOrPink(r, g, b)) {
                    this.bitmap.data[idx + 3] = 0; // completely transparent
                    modified = true;
                } else if (r > 100 && b > 100 && g < Math.min(r, b)) {
                    // Soften slightly pinkish pixels (anti-aliasing)
                    this.bitmap.data[idx + 3] = Math.max(0, this.bitmap.data[idx + 3] - 100);
                    modified = true;
                }
            });
            
            if (modified) {
                await image.write(filePath);
                console.log(`Deep cleaned pink from ${f}`);
            }
        } catch (e) {
            console.log(`Could not process ${f}: ${e.message}`);
        }
    }
    console.log("Done checking all files.");
}
fix();
