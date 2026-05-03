const { dinosaurs } = require('./src/data.js');
const fs = require('fs');

let html = '<html><body style="background:#111; color:white; display:flex; flex-wrap:wrap;">';
for (const dino of dinosaurs) {
  html += `<div style="margin:10px; text-align:center;">
    <img src="${dino.animation_url}" width="200" height="200" style="object-fit:contain;" />
    <br/>${dino.species}
  </div>`;
}
html += '</body></html>';
fs.writeFileSync('./public/gallery.html', html);
