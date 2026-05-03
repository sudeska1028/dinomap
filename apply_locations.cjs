const fs = require('fs');

const dinoLocationData = {
    "Tyrannosaurus Rex": [ { lat: 45.0, lng: -106.0, region: "Hell Creek Formation, MT, USA" }, { lat: 43.5, lng: -103.5, region: "South Dakota, USA" } ],
    "Diplodocus": [ { lat: 39.0, lng: -105.0, region: "Morrison Formation, CO, USA" }, { lat: 41.5, lng: -106.0, region: "Wyoming, USA" } ],
    "Triceratops": [ { lat: 47.0, lng: -106.0, region: "Hell Creek Formation, MT, USA" }, { lat: 51.0, lng: -112.0, region: "Alberta, Canada" } ],
    "Giraffatitan": [ { lat: -9.0, lng: 39.0, region: "Tendaguru Formation, Tanzania" } ],
    "Stegosaurus": [ { lat: 39.0, lng: -105.0, region: "Morrison Formation, CO, USA" }, { lat: 39.5, lng: -8.0, region: "Batalha formation, Portugal" } ],
    "Iguanodon": [ { lat: 51.5, lng: 0.1, region: "London Clay, UK" }, { lat: 50.5, lng: 4.5, region: "Bernissart, Belgium" } ],
    "Patagotitan": [ { lat: -43.0, lng: -65.0, region: "Cerro Barcino Formation, Patagonia, Argentina" } ],
    "Allosaurus": [ { lat: 39.0, lng: -105.0, region: "Morrison Formation, CO, USA" }, { lat: 41.0, lng: -110.0, region: "Utah, USA" } ],
    "Albertosaurus": [ { lat: 52.0, lng: -113.0, region: "Horseshoe Canyon Formation, Alberta, Canada" } ],
    "Borealopelta": [ { lat: 56.5, lng: -111.5, region: "Suncor Millennium Mine, Alberta, Canada" } ],
    "Archaeopteryx": [ { lat: 48.9, lng: 11.0, region: "Solnhofen Limestone, Germany" } ],
    "Kentrosaurus": [ { lat: -9.5, lng: 39.5, region: "Tendaguru Formation, Tanzania" } ],
    "SUE the T-Rex": [ { lat: 44.5, lng: -102.0, region: "Faith, South Dakota, USA" } ],
    "Omeisaurus": [ { lat: 29.5, lng: 103.5, region: "Dashanpu Formation, Sichuan, China" } ],
    "Giganotosaurus": [ { lat: -39.0, lng: -69.0, region: "Candeleros Formation, Patagonia, Argentina" } ],
    "Futabasaurus": [ { lat: 37.0, lng: 140.8, region: "Fukushima, Japan" } ],
    "Spinosaurus": [ { lat: 25.0, lng: 30.0, region: "Bahariya Formation, Egypt" }, { lat: 30.0, lng: -5.0, region: "Kem Kem Beds, Morocco" } ],
    "Velociraptor": [ { lat: 44.0, lng: 104.0, region: "Djadochta Formation, Gobi Desert, Mongolia" }, { lat: 41.0, lng: 108.0, region: "Inner Mongolia, China" } ],
    "Brachiosaurus": [ { lat: 39.0, lng: -108.0, region: "Colorado River Valley, CO, USA" }, { lat: 40.0, lng: -110.0, region: "Utah, USA" } ],
    "Ankylosaurus": [ { lat: 47.0, lng: -106.0, region: "Hell Creek Formation, MT, USA" }, { lat: 51.0, lng: -112.0, region: "Scollard Formation, Alberta, Canada" } ],
    "Carnotaurus": [ { lat: -43.0, lng: -67.0, region: "La Colonia Formation, Chubut, Argentina" } ],
    "Parasaurolophus": [ { lat: 51.0, lng: -112.0, region: "Dinosaur Park Formation, Alberta, Canada" }, { lat: 36.0, lng: -108.0, region: "New Mexico, USA" } ],
    "Mosasaurus": [ { lat: 50.8, lng: 5.7, region: "Maastricht, Netherlands" }, { lat: 44.0, lng: -100.0, region: "Pierre Shale, South Dakota, USA" } ],
    "Pteranodon": [ { lat: 38.0, lng: -98.0, region: "Niobrara Formation, Kansas, USA" }, { lat: 43.0, lng: -100.0, region: "South Dakota, USA" } ],
    "Gallimimus": [ { lat: 43.0, lng: 103.0, region: "Nemegt Formation, Gobi Desert, Mongolia" } ],
    "Baryonyx": [ { lat: 51.1, lng: -0.3, region: "Weald Clay, Surrey, UK" }, { lat: 39.5, lng: -9.0, region: "Papod Seco Formation, Portugal" } ],
    "Compsognathus": [ { lat: 48.9, lng: 11.2, region: "Solnhofen Limestone, Germany" }, { lat: 43.8, lng: 6.2, region: "Canjuers, France" } ],
    "Utahraptor": [ { lat: 38.5, lng: -109.5, region: "Cedar Mountain Formation, Utah, USA" } ],
    "Therizinosaurus": [ { lat: 43.5, lng: 105.0, region: "Nemegt Formation, Gobi Desert, Mongolia" } ],
    "Quetzalcoatlus": [ { lat: 29.5, lng: -103.0, region: "Javelina Formation, Texas, USA" } ],
    "Dilophosaurus": [ { lat: 36.0, lng: -111.0, region: "Kayenta Formation, Arizona, USA" } ],
    "Styracosaurus": [ { lat: 51.0, lng: -111.5, region: "Dinosaur Park Formation, Alberta, Canada" } ],
    "Mantellisaurus": [ { lat: 50.6, lng: -1.3, region: "Wessex Formation, Isle of Wight, UK" } ],
    "Apatosaurus": [ { lat: 39.0, lng: -105.5, region: "Morrison Formation, CO, USA" }, { lat: 41.0, lng: -106.0, region: "Wyoming, USA" } ],
    "Edmontosaurus": [ { lat: 52.0, lng: -112.5, region: "Horseshoe Canyon Formation, Alberta, Canada" }, { lat: 45.0, lng: -100.0, region: "South Dakota, USA" } ],
    "Dicraeosaurus": [ { lat: -9.5, lng: 39.0, region: "Tendaguru Formation, Tanzania" } ],
    "Shunosaurus": [ { lat: 29.5, lng: 104.5, region: "Dashanpu Formation, Sichuan, China" } ]
};

let content = fs.readFileSync('src/data.js', 'utf-8');
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
    for (const [species, locs] of Object.entries(dinoLocationData)) {
        if (lines[i].includes(`species: "${species}"`) && !lines[i].includes('locations:')) {
            // Append locations array literal exactly at the end, right before the closing brace '}'
            const replacementString = `locations: ${JSON.stringify(locs)}, description:`;
            lines[i] = lines[i].replace(/description:/, replacementString);
            break;
        }
    }
}

fs.writeFileSync('src/data.js', lines.join('\n'));
console.log("Locations injected successfully!");
