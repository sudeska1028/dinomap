const fs = require('fs');

const dinoClassData = {
    "Tyrannosaurus Rex": { family: "Tyrannosauridae", discovery: "1902" },
    "Diplodocus": { family: "Diplodocidae", discovery: "1878" },
    "Triceratops": { family: "Ceratopsidae", discovery: "1889" },
    "Giraffatitan": { family: "Brachiosauridae", discovery: "1914" },
    "Stegosaurus": { family: "Stegosauridae", discovery: "1877" },
    "Iguanodon": { family: "Iguanodontidae", discovery: "1825" },
    "Patagotitan": { family: "Titanosauria", discovery: "2014" },
    "Allosaurus": { family: "Allosauridae", discovery: "1877" },
    "Albertosaurus": { family: "Tyrannosauridae", discovery: "1884" },
    "Borealopelta": { family: "Nodosauridae", discovery: "2011" },
    "Archaeopteryx": { family: "Avialae", discovery: "1861" },
    "Kentrosaurus": { family: "Stegosauridae", discovery: "1915" },
    "SUE the T-Rex": { family: "Tyrannosauridae", discovery: "1990" },
    "Omeisaurus": { family: "Mamenchisauridae", discovery: "1939" },
    "Giganotosaurus": { family: "Carcharodontosauridae", discovery: "1993" },
    "Futabasaurus": { family: "Elasmosauridae", discovery: "2006" },
    "Spinosaurus": { family: "Spinosauridae", discovery: "1915" },
    "Velociraptor": { family: "Dromaeosauridae", discovery: "1924" },
    "Brachiosaurus": { family: "Brachiosauridae", discovery: "1903" },
    "Ankylosaurus": { family: "Ankylosauridae", discovery: "1908" },
    "Carnotaurus": { family: "Abelisauridae", discovery: "1985" },
    "Parasaurolophus": { family: "Hadrosauridae", discovery: "1922" },
    "Mosasaurus": { family: "Mosasauridae", discovery: "1764" },
    "Pteranodon": { family: "Pteranodontidae", discovery: "1876" },
    "Gallimimus": { family: "Ornithomimidae", discovery: "1972" },
    "Baryonyx": { family: "Spinosauridae", discovery: "1983" },
    "Compsognathus": { family: "Compsognathidae", discovery: "1859" },
    "Utahraptor": { family: "Dromaeosauridae", discovery: "1993" },
    "Therizinosaurus": { family: "Therizinosauridae", discovery: "1954" },
    "Quetzalcoatlus": { family: "Azhdarchidae", discovery: "1971" },
    "Dilophosaurus": { family: "Dilophosauridae", discovery: "1942" },
    "Styracosaurus": { family: "Ceratopsidae", discovery: "1913" },
    "Mantellisaurus": { family: "Iguanodontidae", discovery: "1917" },
    "Apatosaurus": { family: "Diplodocidae", discovery: "1877" },
    "Edmontosaurus": { family: "Hadrosauridae", discovery: "1917" },
    "Dicraeosaurus": { family: "Dicraeosauridae", discovery: "1914" },
    "Shunosaurus": { family: "Cetiosauridae", discovery: "1979" }
};

let content = fs.readFileSync('src/data.js', 'utf-8');

// Update Museum Thumbnails
content = content.replace(/\/assets\/natural_history_museum_london\.png/g, '/assets/museum_london_3d.png');
content = content.replace(/\/assets\/amnh_new_york\.png/g, '/assets/museum_amnh_3d.png');
content = content.replace(/\/assets\/royal_tyrrell_museum\.png/g, '/assets/museum_tyrrell_3d.png');

// Update Dinosaur Clade/Discovery
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    for (const [species, data] of Object.entries(dinoClassData)) {
        if (lines[i].includes(`species: "${species}"`)) {
            // we inject family and discovery right before description
            lines[i] = lines[i].replace(
                /description:/, 
                `family: "${data.family}", discovery: "${data.discovery}", description:`
            );
            break;
        }
    }
}

fs.writeFileSync('src/data.js', lines.join('\n'));
console.log("Data updated successfully!");
