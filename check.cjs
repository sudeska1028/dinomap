const fs = require('fs');
const path = require('path');
import('./src/data.js').then(module => {
    const { dinosaurs, exhibits } = module;
    let missing = [];
    dinosaurs.forEach(d => {
        if (!fs.existsSync(path.join(__dirname, 'public', d.image_url))) missing.push(d.image_url);
        if (!fs.existsSync(path.join(__dirname, 'public', d.animation_url))) missing.push(d.animation_url);
        
        const speciesName = d.species.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const imgKey = `assets/chibis/3d_cutout_${speciesName}.png`;
        if (!fs.existsSync(path.join(__dirname, 'public', imgKey))) missing.push(imgKey);
    });
    console.log('Missing files:', missing);
});
