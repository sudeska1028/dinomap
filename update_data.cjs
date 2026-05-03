const fs = require('fs');

let dataFile = fs.readFileSync('./src/data.js', 'utf-8');

const newDinos = [
    "Spinosaurus", "Velociraptor", "Brachiosaurus", "Ankylosaurus", 
    "Carnotaurus", "Parasaurolophus", "Mosasaurus", "Pteranodon", 
    "Gallimimus", "Baryonyx", "Compsognathus", "Utahraptor", 
    "Therizinosaurus", "Quetzalcoatlus", "Dilophosaurus", "Styracosaurus"
];

for (const dino of newDinos) {
    const fossilUrl = `/assets/${dino.toLowerCase()}_fossil_ai.png`;
    const artUrl = `/assets/${dino.toLowerCase()}_art_ai.png`;

    // To be extremely safe, we read line by line and replace in the matched line
    let lines = dataFile.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`species: "${dino}"`)) {
            // Replace old image_url and animation_url, handling both null and "/assets/...jpg"
            lines[i] = lines[i].replace(/image_url:\s*[^,]+,/, `image_url: "${fossilUrl}",`);
            lines[i] = lines[i].replace(/animation_url:\s*[^,]+((,\s*wiki_query)|(})|(\s*}))/, `animation_url: "${artUrl}"$1`);
            break;
        }
    }
    dataFile = lines.join('\n');
}

fs.writeFileSync('./src/data.js', dataFile);
console.log("Updated data.js with AI image paths!");
