const fs = require('fs');
const https = require('https');
const path = require('path');

const dinos = [
  "Spinosaurus", "Velociraptor", "Brachiosaurus", "Ankylosaurus", 
  "Carnotaurus", "Parasaurolophus", "Mosasaurus", "Pteranodon", 
  "Gallimimus", "Baryonyx", "Compsognathus", "Utahraptor", 
  "Therizinosaurus", "Quetzalcoatlus", "Dilophosaurus", "Styracosaurus"
];

const fetchJson = (url) => new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'DinoMapApp/1.0 (contact@example.com)' } }, res => {
        let body = '';
        res.on('data', d => body += d);
        res.on('end', () => resolve(JSON.parse(body)));
    }).on('error', reject);
});

const downloadImage = (url, filepath) => new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'DinoMapApp/1.0' } }, res => {
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 307 || res.statusCode === 308) {
            return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        }
        res.pipe(fs.createWriteStream(filepath))
           .on('finish', resolve)
           .on('error', reject);
    }).on('error', reject);
});

async function run() {
    let dataFile = fs.readFileSync('./src/data.js', 'utf-8');

    // Make sure public/assets directory exists
    if (!fs.existsSync('./public/assets')) {
        fs.mkdirSync('./public/assets', { recursive: true });
    }

    for (const dino of dinos) {
        console.log(`Processing ${dino}...`);
        
        try {
            const fossilSearch = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${dino}+fossil&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`;
            const fData = await fetchJson(fossilSearch);
            let fossilUrl = null;
            if (fData.query && fData.query.pages) {
                const pages = Object.values(fData.query.pages);
                if (pages.length > 0) fossilUrl = pages[0].imageinfo[0].url;
            }

            const artSearch = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${dino}+restoration&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`;
            const aData = await fetchJson(artSearch);
            let artUrl = null;
            if (aData.query && aData.query.pages) {
                const pages = Object.values(aData.query.pages);
                if (pages.length > 0) artUrl = pages[0].imageinfo[0].url;
            }

            // Generic fallbacks just in case
            if (!fossilUrl) fossilUrl = `https://upload.wikimedia.org/wikipedia/commons/e/e0/Placeholder_image.png`;
            if (!artUrl) artUrl = `https://upload.wikimedia.org/wikipedia/commons/e/e0/Placeholder_image.png`;

            const fossilPath = `./public/assets/${dino.toLowerCase()}_fossil.jpg`;
            const artPath = `./public/assets/${dino.toLowerCase()}_art.jpg`;

            console.log(`Downloading Fossil for ${dino}...`);
            await downloadImage(fossilUrl, fossilPath);
            console.log(`Downloading Art for ${dino}...`);
            await downloadImage(artUrl, artPath);

            // Using regex to replace the urls in data.js
            const regex = new RegExp(`(species:\\s*"${dino}"[\\s\\S]*?image_url:\\s*")[^"]+("[\\s\\S]*?animation_url:\\s*")[^"]+(")`);
            dataFile = dataFile.replace(regex, `$1/assets/${dino.toLowerCase()}_fossil.jpg$2/assets/${dino.toLowerCase()}_art.jpg$3`);
        } catch(e) { console.log(`Failed ${dino}:`, e.message); }
    }

    fs.writeFileSync('./src/data.js', dataFile);
    console.log("Done upgrading data.js with local downloaded assets!");
}
run();
