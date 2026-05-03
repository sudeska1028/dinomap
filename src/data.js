export const museums = [
    {
        id: "m1",
        name: "Natural History Museum",
        location: "London, UK",
        coordinates: { lat: 51.4967, lng: -0.1764 },
        description: "Home to one of the world's most famous dinosaur collections, including the stunning Hintze Hall.",
        thumbnail_url: "/assets/museum_london_3d.png",
        exhibits: ["e1", "e2", "e7", "e8", "e19", "e25", "e30", "e39"]
    },
    {
        id: "m2",
        name: "American Museum of Natural History",
        location: "New York, USA",
        coordinates: { lat: 40.7813, lng: -73.9740 },
        description: "Famous for its world-renowned fossil halls and the towering Barosaurus mount.",
        thumbnail_url: "/assets/museum_amnh_3d.png",
        exhibits: ["e3", "e4", "e9", "e10", "e20", "e26", "e31", "e40", "e41"]
    },
    {
        id: "m3",
        name: "Royal Tyrrell Museum",
        location: "Drumheller, Canada",
        coordinates: { lat: 51.4781, lng: -112.7903 },
        description: "Canada's only museum dedicated exclusively to the science of palaeontology.",
        thumbnail_url: "/assets/museum_tyrrell_3d.png",
        exhibits: ["e5", "e11", "e12", "e21", "e27", "e32", "e42"]
    },
    {
        id: "m4",
        name: "Museum für Naturkunde",
        location: "Berlin, Germany",
        coordinates: { lat: 52.5306, lng: 13.3794 },
        description: "Houses the largest mounted dinosaur skeleton in the world, the Giraffatitan.",
        thumbnail_url: "/assets/museum_berlin_3d.png",
        exhibits: ["e6", "e13", "e14", "e22", "e28", "e33", "e43"]
    },
    {
        id: "m5",
        name: "Field Museum",
        location: "Chicago, USA",
        coordinates: { lat: 41.8663, lng: -87.6170 },
        description: "Home to SUE, the most complete and best-preserved Tyrannosaurus rex ever discovered.",
        thumbnail_url: "/assets/museum_field_chicago_3d.png",
        exhibits: ["e15", "e23", "e29", "e34", "e46"]
    },
    {
        id: "m6",
        name: "Zigong Dinosaur Museum",
        location: "Sichuan, China",
        coordinates: { lat: 29.3900, lng: 104.8329 },
        description: "Built over an actual excavation site from the Middle Jurassic, revealing a huge mass death assemblage.",
        thumbnail_url: "/assets/museum_zigong_china_3d.png",
        exhibits: ["e16", "e24", "e35", "e44"]
    },
    {
        id: "m7",
        name: "Museo Paleontológico Egidio Feruglio",
        location: "Trelew, Argentina",
        coordinates: { lat: -43.2483, lng: -65.3115 },
        description: "One of the most important paleontological museums in South America, housing gigantic Patagonian discoveries.",
        thumbnail_url: "/assets/museum_mef_argentina_3d.png",
        exhibits: ["e17", "e36", "e37"]
    },
    {
        id: "m8",
        name: "National Museum of Nature and Science",
        location: "Tokyo, Japan",
        coordinates: { lat: 35.7163, lng: 139.7766 },
        description: "A profound collection in Ueno Park showcasing the evolutionary history of Earth, including famous marine reptiles.",
        thumbnail_url: "/assets/museum_tokyo_3d.png",
        exhibits: ["e18", "e38", "e45"]
    },
    {
        id: "m9",
        name: "Iziko South African Museum",
        location: "Cape Town, South Africa",
        coordinates: { lat: -33.9249, lng: 18.4140 },
        description: "An incredible collection of Karoo fossils revealing ancient African life before and during the age of dinosaurs.",
        thumbnail_url: "/assets/museum_iziko_3d.png",
        exhibits: ["e47", "e48", "e58"]
    },
    {
        id: "m10",
        name: "Australian Age of Dinosaurs",
        location: "Winton, Australia",
        coordinates: { lat: -22.3888, lng: 143.0375 },
        description: "The world's largest collection of Australian dinosaur fossils, positioned beautifully in the Queensland outback.",
        thumbnail_url: "/assets/museum_winton_3d.png",
        exhibits: ["e49", "e50", "e51"]
    },
    {
        id: "m11",
        name: "Museu Nacional",
        location: "Rio de Janeiro, Brazil",
        coordinates: { lat: -22.9056, lng: -43.2255 },
        description: "South America's oldest historical scientific institution, holding stunning Patagonian and Brazilian mega-fossils.",
        thumbnail_url: "/assets/museum_rio_3d.png",
        exhibits: ["e52", "e53", "e54"]
    },
    {
        id: "m12",
        name: "Indian Museum",
        location: "Kolkata, India",
        coordinates: { lat: 22.5579, lng: 88.3511 },
        description: "A monumental heritage museum displaying the rich prehistoric lineage of the Indian subcontinent and greater Asia.",
        thumbnail_url: "/assets/museum_kolkata_3d.png",
        exhibits: ["e55", "e56", "e57"]
    }
];

export const dinosaurs = [
    {
        id: "d1", species: "Tyrannosaurus Rex", period: "Late Cretaceous", diet: "Carnivore",
        length: "12m", weight: "8,000kg", family: "Tyrannosauridae", discovery: "1902",
        locations: [{"lat":45,"lng":-106,"region":"Hell Creek Formation, MT, USA"},{"lat":43.5,"lng":-103.5,"region":"South Dakota, USA"}],
        description: "One of the largest land predators in Earth's history, T-Rex had banana-sized serrated teeth and bone-crushing jaws that could exert the strongest bite force of any terrestrial animal. Its tiny arms were deceptively strong, and it likely hunted using an explosive ambush strategy rather than sustained pursuit.",
        image_url: "/assets/fossil_trex.png", animation_url: "/assets/real_trex.png",
        wiki_query: "Tyrannosaurus"
    },
    {
        id: "d2", species: "Diplodocus", period: "Late Jurassic", diet: "Herbivore",
        length: "26m", weight: "15,000kg", family: "Diplodocidae", discovery: "1878",
        locations: [{"lat":39,"lng":-105,"region":"Morrison Formation, CO, USA"},{"lat":41.5,"lng":-106,"region":"Wyoming, USA"}],
        description: "One of the longest dinosaurs ever discovered, Diplodocus used its pencil-like teeth solely for stripping leaves from branches. Its iconic whip-like tail — half the total body length — could potentially crack at supersonic speed as both a weapon and a sonic signaling device.",
        image_url: "/assets/fossil_diplodocus.png", animation_url: "/assets/real_diplodocus.png",
        wiki_query: "Diplodocus"
    },
    {
        id: "d3", species: "Triceratops", period: "Late Cretaceous", diet: "Herbivore",
        length: "9m", weight: "10,000kg", family: "Ceratopsidae", discovery: "1889",
        locations: [{"lat":47,"lng":-106,"region":"Hell Creek Formation, MT, USA"},{"lat":51,"lng":-112,"region":"Alberta, Canada"}],
        description: "The iconic three-horned giant of the Late Cretaceous, Triceratops used its massive bony frill for display and species recognition. Evidence of healed bite marks from T-Rex suggests it actively defended itself, possibly charging like a modern rhinoceros when threatened.",
        image_url: "/assets/fossil_triceratops.png", animation_url: "/assets/real_triceratops.png",
        wiki_query: "Triceratops"
    },
    {
        id: "d4", species: "Giraffatitan", period: "Late Jurassic", diet: "Herbivore",
        length: "22m", weight: "34,000kg", family: "Brachiosauridae", discovery: "1914",
        locations: [{"lat":-9,"lng":39,"region":"Tendaguru Formation, Tanzania"}],
        description: "Formerly classified as Brachiosaurus brancai, Giraffatitan held its neck almost vertically like a giraffe, allowing it to browse treetops no other dinosaur could reach. The Berlin specimen at the Museum für Naturkunde is the tallest mounted dinosaur skeleton in the world at over 13 meters high.",
        image_url: "/assets/fossil_giraffatitan.png", animation_url: "/assets/real_giraffatitan.png",
        wiki_query: "Giraffatitan"
    },
    {
        id: "d5", species: "Stegosaurus", period: "Late Jurassic", diet: "Herbivore",
        length: "9m", weight: "5,000kg", family: "Stegosauridae", discovery: "1877",
        locations: [{"lat":39,"lng":-105,"region":"Morrison Formation, CO, USA"},{"lat":39.5,"lng":-8,"region":"Batalha Formation, Portugal"}],
        description: "Famous for the kite-shaped plates running along its back, Stegosaurus likely used them for temperature regulation and colorful display rather than defense. Its true weapons were four deadly tail spikes — called a thagomizer — capable of punching through the bone of an Allosaurus.",
        image_url: "/assets/fossil_stegosaurus.png", animation_url: "/assets/real_stegosaurus.png",
        wiki_query: "Stegosaurus"
    },
    {
        id: "d6", species: "Iguanodon", period: "Early Cretaceous", diet: "Herbivore",
        length: "10m", weight: "4,500kg", family: "Iguanodontidae", discovery: "1825",
        locations: [{"lat":51.5,"lng":0.1,"region":"London Clay, UK"},{"lat":50.5,"lng":4.5,"region":"Bernissart, Belgium"}],
        description: "One of the first dinosaurs ever formally named and described, Iguanodon was a highly adaptable herbivore. It could switch between walking on two or four legs depending on speed, and its distinctive conical thumb spike was likely used for defense and foraging rather than grasping.",
        image_url: "/assets/fossil_iguanodon.png", animation_url: "/assets/real_iguanodon.png",
        wiki_query: "Iguanodon"
    },
    {
        id: "d7", species: "Patagotitan", period: "Late Cretaceous", diet: "Herbivore",
        length: "37m", weight: "70,000kg", family: "Titanosauria", discovery: "2014",
        locations: [{"lat":-43,"lng":-65,"region":"Cerro Barcino Formation, Patagonia, Argentina"}],
        description: "One of the largest animals to ever walk the Earth, Patagotitan mayorum was so massive its femur alone stood taller than a human. Discovered by a farm worker in Argentine Patagonia in 2014, its cast stretches so long at the AMNH that its head pokes out of the main hall into the elevator lobby.",
        image_url: "/assets/fossil_patagotitan.png", animation_url: "/assets/real_patagotitan.png",
        wiki_query: "Patagotitan"
    },
    {
        id: "d8", species: "Allosaurus", period: "Late Jurassic", diet: "Carnivore",
        length: "8.5m", weight: "2,300kg", family: "Allosauridae", discovery: "1877",
        locations: [{"lat":39,"lng":-105,"region":"Morrison Formation, CO, USA"},{"lat":41,"lng":-110,"region":"Utah, USA"}],
        description: "The apex predator of the Jurassic, Allosaurus hunted massive sauropods using a hatchet-like attack — slamming its skull downward to tear chunks of flesh rather than biting down. Evidence of pack hunting has been found at some bone beds, suggesting sophisticated cooperative predation.",
        image_url: "/assets/fossil_allosaurus.png", animation_url: "/assets/real_allosaurus.png",
        wiki_query: "Allosaurus"
    },
    {
        id: "d9", species: "Albertosaurus", period: "Late Cretaceous", diet: "Carnivore",
        length: "9m", weight: "2,500kg", family: "Tyrannosauridae", discovery: "1884",
        locations: [{"lat":52,"lng":-113,"region":"Horseshoe Canyon Formation, Alberta, Canada"}],
        description: "A tyrannosaurid predator closely related to T-Rex but smaller and faster. A mass bone bed in Alberta containing over 25 individuals strongly suggests Albertosaurus hunted in coordinated packs — a revelation that changed how scientists view tyrannosaur behavior.",
        image_url: "/assets/fossil_albertosaurus.png", animation_url: "/assets/real_albertosaurus.png",
        wiki_query: "Albertosaurus"
    },
    {
        id: "d10", species: "Borealopelta", period: "Early Cretaceous", diet: "Herbivore",
        length: "5.5m", weight: "1,300kg", family: "Nodosauridae", discovery: "2011",
        locations: [{"lat":56.5,"lng":-111.5,"region":"Suncor Millennium Mine, Alberta, Canada"}],
        description: "The best-preserved armored dinosaur ever found, Borealopelta was discovered by a mine worker in 2011 and is so perfectly fossilized that it still retains its original reddish-brown skin color and armor. Scientists even identified the contents of its last meal — ferns consumed hours before death.",
        image_url: "/assets/fossil_borealopelta.png", animation_url: "/assets/real_borealopelta.png",
        wiki_query: "Borealopelta"
    },
    {
        id: "d11", species: "Archaeopteryx", period: "Late Jurassic", diet: "Carnivore",
        length: "0.5m", weight: "1kg", family: "Avialae", discovery: "1861",
        locations: [{"lat":48.9,"lng":11,"region":"Solnhofen Limestone, Germany"}],
        description: "The pivotal evolutionary link between feathered dinosaurs and modern birds, Archaeopteryx possessed flight feathers and wings alongside unmistakably reptilian features like teeth, clawed fingers, and a long bony tail. Discovered just two years after Darwin published On the Origin of Species, it became instant evidence for evolution.",
        image_url: "/assets/fossil_archaeopteryx.png", animation_url: "/assets/real_archaeopteryx.png",
        wiki_query: "Archaeopteryx"
    },
    {
        id: "d12", species: "Kentrosaurus", period: "Late Jurassic", diet: "Herbivore",
        length: "4.5m", weight: "1,100kg", family: "Stegosauridae", discovery: "1915",
        locations: [{"lat":-9.5,"lng":39.5,"region":"Tendaguru Formation, Tanzania"}],
        description: "An African relative of Stegosaurus, Kentrosaurus was heavily armed with alternating pairs of flat plates near the shoulders and long, sharp spikes running down its back and tail. A powerful shoulder spike pointed outward and backward, providing devastating lateral defense against any predator attempting to flank it.",
        image_url: "/assets/fossil_kentrosaurus.png", animation_url: "/assets/real_kentrosaurus.png",
        wiki_query: "Kentrosaurus"
    },

    {
        id: "d13", species: "SUE the T-Rex", period: "Late Cretaceous", diet: "Carnivore",
        length: "12.3m", weight: "9,000kg", family: "Tyrannosauridae", discovery: "1990",
        locations: [{"lat":44.5,"lng":-102,"region":"Faith, South Dakota, USA"}],
        description: "The most complete, best-preserved, and largest Tyrannosaurus rex ever found, SUE is named after discoverer Sue Hendrickson. Its skeleton is 90% complete and shows evidence of a dramatic life — healed injuries, signs of gout, and infections. SUE stands as the centrepiece of the Field Museum in Chicago.",
        image_url: "/assets/real_fossil_sue.png", animation_url: "/assets/real_art_sue.png",
        wiki_query: "Sue (dinosaur)"
    },
    {
        id: "d14", species: "Omeisaurus", period: "Middle Jurassic", diet: "Herbivore",
        length: "15m", weight: "10,000kg", family: "Mamenchisauridae", discovery: "1939",
        locations: [{"lat":29.5,"lng":103.5,"region":"Dashanpu Formation, Sichuan, China"}],
        description: "A Chinese sauropod with an extraordinarily long neck that accounts for nearly a third of its total body length. First discovered at the Dashanpu quarry in Sichuan — one of the richest Jurassic fossil sites in the world — multiple complete skeletons have given scientists deep insight into Chinese sauropod evolution.",
        image_url: "/assets/real_fossil_omeisaurus.png", animation_url: "/assets/real_art_omeisaurus.png",
        wiki_query: "Omeisaurus"
    },
    {
        id: "d15", species: "Giganotosaurus", period: "Late Cretaceous", diet: "Carnivore",
        length: "13m", weight: "8,500kg", family: "Carcharodontosauridae", discovery: "1993",
        locations: [{"lat":-39,"lng":-69,"region":"Candeleros Formation, Patagonia, Argentina"}],
        description: "A gigantic apex predator from South America that rivaled or exceeded T-Rex in size, Giganotosaurus hunted enormous titanosaur sauropods across the ancient Patagonian floodplains. Unlike T-Rex, its long and narrow skull was built for slicing flesh with blade-like teeth rather than crushing bone.",
        image_url: "/assets/real_fossil_giganotosaurus.png", animation_url: "/assets/real_art_giganotosaurus.png",
        wiki_query: "Giganotosaurus"
    },
    {
        id: "d16", species: "Futabasaurus", period: "Late Cretaceous", diet: "Piscivore",
        length: "7m", weight: "2,000kg", family: "Elasmosauridae", discovery: "2006",
        locations: [{"lat":37,"lng":140.8,"region":"Fukushima, Japan"}],
        description: "A late-surviving elasmosaurid plesiosaur discovered in the Futaba Group of Fukushima Prefecture, Japan. Originally found by a high school student in 1968, it was formally described in 2006. Its long neck, small head and conical teeth were perfectly adapted for snatching fish from below in shallow coastal seas.",
        image_url: "/assets/real_fossil_futaba.png", animation_url: "/assets/real_art_futaba.png",
        wiki_query: "Futabasaurus"
    },

    {
        id: "d17", species: "Spinosaurus", period: "Late Cretaceous", diet: "Piscivore",
        length: "15m", weight: "7,400kg", family: "Spinosauridae", discovery: "1915",
        locations: [{"lat":25,"lng":30,"region":"Bahariya Formation, Egypt"},{"lat":30,"lng":-5,"region":"Kem Kem Beds, Morocco"}],
        description: "The largest known carnivorous dinosaur, Spinosaurus was a semi-aquatic ambush predator that waded into rivers to snatch giant fish with its crocodile-like jaws. Its dense bones suggest it spent much of its time submerged, and its iconic 1.5-meter neural spines likely formed a large sail for display or thermoregulation.",
        image_url: "/assets/spinosaurus_fossil_ai.png", animation_url: "/assets/spinosaurus_art_ai.png",
        wiki_query: "Spinosaurus"
    },
    {
        id: "d18", species: "Velociraptor", period: "Late Cretaceous", diet: "Carnivore",
        length: "2m", weight: "15kg", family: "Dromaeosauridae", discovery: "1924",
        locations: [{"lat":44,"lng":104,"region":"Djadochta Formation, Gobi Desert, Mongolia"},{"lat":41,"lng":108,"region":"Inner Mongolia, China"}],
        description: "A small, feathered, turkey-sized pack hunter of the Gobi Desert — nothing like its Hollywood portrayal. Velociraptor used its sickle-shaped claw not to slash prey but to pin and grip struggling animals while delivering killing bites. A famous 'fighting dinosaurs' fossil shows one locked in combat with a Protoceratops.",
        image_url: "/assets/velociraptor_fossil_ai.png", animation_url: "/assets/velociraptor_art_ai.png",
        wiki_query: "Velociraptor"
    },
    {
        id: "d19", species: "Brachiosaurus", period: "Late Jurassic", diet: "Herbivore",
        length: "21m", weight: "58,000kg", family: "Brachiosauridae", discovery: "1903",
        locations: [{"lat":39,"lng":-108,"region":"Colorado River Valley, CO, USA"},{"lat":40,"lng":-110,"region":"Utah, USA"}],
        description: "One of the largest land animals of all time, Brachiosaurus had front legs longer than its hind legs — the opposite of most dinosaurs — giving it a permanently raised, giraffe-like posture. Its nostrils sat high on its skull, and it would have needed an enormous heart to pump blood up its 9-meter neck.",
        image_url: "/assets/brachiosaurus_fossil_ai.png", animation_url: "/assets/brachiosaurus_art_ai.png",
        wiki_query: "Brachiosaurus"
    },
    {
        id: "d20", species: "Ankylosaurus", period: "Late Cretaceous", diet: "Herbivore",
        length: "8m", weight: "6,000kg", family: "Ankylosauridae", discovery: "1908",
        locations: [{"lat":47,"lng":-106,"region":"Hell Creek Formation, MT, USA"},{"lat":51,"lng":-112,"region":"Scollard Formation, Alberta, Canada"}],
        description: "A walking tank covered from snout to tail in thick bony plates called osteoderms, Ankylosaurus was virtually impenetrable from above. Its massive tail club — a fused mass of bone weighing up to 30kg — could swing with enough force to shatter the leg bones of an attacking Tyrannosaurus rex.",
        image_url: "/assets/ankylosaurus_fossil_ai.png", animation_url: "/assets/ankylosaurus_art_ai.png",
        wiki_query: "Ankylosaurus"
    },
    {
        id: "d21", species: "Carnotaurus", period: "Late Cretaceous", diet: "Carnivore",
        length: "8m", weight: "1,500kg", family: "Abelisauridae", discovery: "1985",
        locations: [{"lat":-43,"lng":-67,"region":"La Colonia Formation, Chubut, Argentina"}],
        description: "A fast-running abelisaurid predator named for the thick horns above its eyes — unique among large theropods. Carnotaurus had the most extreme arm reduction of any large theropod and relied entirely on its strong neck and powerful bite to subdue prey. Exceptional skin impressions reveal a pebbly, scale-covered hide.",
        image_url: "/assets/carnotaurus_fossil_ai.png", animation_url: "/assets/carnotaurus_art_ai.png",
        wiki_query: "Carnotaurus"
    },
    {
        id: "d22", species: "Parasaurolophus", period: "Late Cretaceous", diet: "Herbivore",
        length: "10m", weight: "2,500kg", family: "Hadrosauridae", discovery: "1922",
        locations: [{"lat":51,"lng":-112,"region":"Dinosaur Park Formation, Alberta, Canada"},{"lat":36,"lng":-108,"region":"New Mexico, USA"}],
        description: "Famous for the long, hollow tubular crest sweeping back from its skull, Parasaurolophus could produce deep, resonant calls by channelling air through the crest — functioning like a trombone. Different crest shapes between species and sexes suggest these calls were vital for species recognition and mating displays.",
        image_url: "/assets/parasaurolophus_fossil_ai.png", animation_url: "/assets/parasaurolophus_art_ai.png",
        wiki_query: "Parasaurolophus"
    },
    {
        id: "d23", species: "Mosasaurus", period: "Late Cretaceous", diet: "Carnivore",
        length: "17m", weight: "14,000kg", family: "Mosasauridae", discovery: "1764",
        locations: [{"lat":50.8,"lng":5.7,"region":"Maastricht, Netherlands"},{"lat":44,"lng":-100,"region":"Pierre Shale, South Dakota, USA"}],
        description: "A colossal apex predator of the Late Cretaceous seas, Mosasaurus was essentially a giant marine lizard closely related to modern monitor lizards. At up to 17 meters long it dominated the oceans, capable of eating virtually anything — sharks, plesiosaurs, seabirds, and other mosasaurs. Its forked tongue likely detected prey chemically.",
        image_url: "/assets/mosasaurus_fossil_ai.png", animation_url: "/assets/mosasaurus_art_ai.png",
        wiki_query: "Mosasaurus"
    },
    {
        id: "d24", species: "Pteranodon", period: "Late Cretaceous", diet: "Piscivore",
        length: "7m (wingspan)", weight: "35kg", family: "Pteranodontidae", discovery: "1876",
        locations: [{"lat":38,"lng":-98,"region":"Niobrara Formation, Kansas, USA"},{"lat":43,"lng":-100,"region":"South Dakota, USA"}],
        description: "One of the largest flying reptiles ever discovered, Pteranodon soared over the Western Interior Seaway on wings spanning up to 7 meters. Despite its terrifying appearance its toothless beak was used to scoop fish like a modern pelican. Males bore dramatically longer crests for display, while females had shorter rounded crests.",
        image_url: "/assets/pteranodon_fossil_ai.png", animation_url: "/assets/pteranodon_art_ai.png",
        wiki_query: "Pteranodon"
    },
    {
        id: "d25", species: "Gallimimus", period: "Late Cretaceous", diet: "Omnivore",
        length: "6m", weight: "400kg", family: "Ornithomimidae", discovery: "1972",
        locations: [{"lat":43,"lng":103,"region":"Nemegt Formation, Gobi Desert, Mongolia"}],
        description: "An ostrich-like ornithomimid built for exceptional speed, Gallimimus could reach an estimated 50–70 km/h over open terrain. Its long, toothless beak and large eyes suggest it was an opportunistic omnivore, eating small animals, insects, eggs, and vegetation depending on availability across the Mongolian plains.",
        image_url: "/assets/gallimimus_fossil_ai.png", animation_url: "/assets/gallimimus_art_ai.png",
        wiki_query: "Gallimimus"
    },
    {
        id: "d26", species: "Baryonyx", period: "Early Cretaceous", diet: "Piscivore",
        length: "10m", weight: "1,700kg", family: "Spinosauridae", discovery: "1983",
        locations: [{"lat":51.1,"lng":-0.3,"region":"Weald Clay, Surrey, UK"},{"lat":39.5,"lng":-9,"region":"Papod Seco Formation, Portugal"}],
        description: "Discovered in a Surrey clay pit in 1983, Baryonyx stunned palaeontologists with its crocodile-like skull, conical teeth, and enormous 30cm thumb claw. Fish scales and bones found in its stomach confirmed it was a specialist fish-hunter — the first definitive spinosaurid evidence found in Europe.",
        image_url: "/assets/baryonyx_fossil_ai.png", animation_url: "/assets/baryonyx_art_ai.png",
        wiki_query: "Baryonyx"
    },
    {
        id: "d27", species: "Compsognathus", period: "Late Jurassic", diet: "Carnivore",
        length: "1m", weight: "3kg", family: "Compsognathidae", discovery: "1859",
        locations: [{"lat":48.9,"lng":11.2,"region":"Solnhofen Limestone, Germany"},{"lat":43.8,"lng":6.2,"region":"Canjuers, France"}],
        description: "One of the smallest known non-avian dinosaurs, Compsognathus was an agile, ground-running predator of small lizards and insects. Preserved in exceptional Solnhofen limestone, one specimen was found with the remains of a lizard in its stomach — providing direct evidence of its diet preserved for 150 million years.",
        image_url: "/assets/compsognathus_fossil_ai.png", animation_url: "/assets/compsognathus_art_ai.png",
        wiki_query: "Compsognathus"
    },
    {
        id: "d28", species: "Utahraptor", period: "Early Cretaceous", diet: "Carnivore",
        length: "7m", weight: "500kg", family: "Dromaeosauridae", discovery: "1993",
        locations: [{"lat":38.5,"lng":-109.5,"region":"Cedar Mountain Formation, Utah, USA"}],
        description: "The largest dromaeosaurid ever discovered, Utahraptor wielded a sickle claw measuring up to 38cm — longer than a kitchen knife. Unlike its small raptor cousins, it was built more like a bear in agility and power. A remarkable bone bed in Utah preserves multiple individuals trapped in quicksand alongside a sauropod, hinting at pack predation.",
        image_url: "/assets/utahraptor_fossil_ai.png", animation_url: "/assets/utahraptor_art_ai.png",
        wiki_query: "Utahraptor"
    },
    {
        id: "d29", species: "Therizinosaurus", period: "Late Cretaceous", diet: "Herbivore",
        length: "10m", weight: "5,000kg", family: "Therizinosauridae", discovery: "1954",
        locations: [{"lat":43.5,"lng":105,"region":"Nemegt Formation, Gobi Desert, Mongolia"}],
        description: "One of the most bizarre dinosaurs ever found, Therizinosaurus possessed the longest claws of any animal in Earth's history — up to 1 meter each — yet it was a peaceful herbivore. These enormous scythe-like claws were almost certainly used to hook and drag down tree branches to reach high foliage.",
        image_url: "/assets/therizinosaurus_fossil_ai.png", animation_url: "/assets/therizinosaurus_art_ai.png",
        wiki_query: "Therizinosaurus"
    },
    {
        id: "d30", species: "Quetzalcoatlus", period: "Late Cretaceous", diet: "Carnivore",
        length: "11m (wingspan)", weight: "200kg", family: "Azhdarchidae", discovery: "1971",
        locations: [{"lat":29.5,"lng":-103,"region":"Javelina Formation, Texas, USA"}],
        description: "The largest flying animal in Earth's history, Quetzalcoatlus stood as tall as a giraffe at 5.5 meters when walking on all fours. Despite its enormous wingspan of 11 meters it could launch itself into the air and soar thousands of kilometers. It likely stalked prey on land like a giant stork, impaling animals with its lance-like beak.",
        image_url: "/assets/quetzalcoatlus_fossil_ai.png", animation_url: "/assets/quetzalcoatlus_art_ai.png",
        wiki_query: "Quetzalcoatlus"
    },
    {
        id: "d31", species: "Dilophosaurus", period: "Early Jurassic", diet: "Carnivore",
        length: "7m", weight: "400kg", family: "Dilophosauridae", discovery: "1942",
        locations: [{"lat":36,"lng":-111,"region":"Kayenta Formation, Arizona, USA"}],
        description: "One of the largest predators of the Early Jurassic, Dilophosaurus is instantly recognised by its two parallel bony crests running the length of its skull — used for display rather than combat. Despite its terrifying size, it had a relatively weak jaw compared to later theropods, suggesting it may have specialized in smaller, faster prey.",
        image_url: "/assets/dilophosaurus_fossil_ai.png", animation_url: "/assets/dilophosaurus_art_ai.png",
        wiki_query: "Dilophosaurus"
    },
    {
        id: "d32", species: "Styracosaurus", period: "Late Cretaceous", diet: "Herbivore",
        length: "5.5m", weight: "1,800kg", family: "Ceratopsidae", discovery: "1913",
        locations: [{"lat":51,"lng":-111.5,"region":"Dinosaur Park Formation, Alberta, Canada"}],
        description: "A spectacular ceratopsian bearing a single long nasal horn and a frill adorned with up to six large, radiating spikes that could span nearly 2 meters in total width. Its dramatic headdress was almost certainly used for species recognition and sexual selection. Bone beds show it lived in large herds that migrated seasonally.",
        image_url: "/assets/styracosaurus_fossil_ai.png", animation_url: "/assets/styracosaurus_art_ai.png",
        wiki_query: "Styracosaurus"
    },

    {
        id: "d33", species: "Mantellisaurus", period: "Early Cretaceous", diet: "Herbivore",
        length: "7m", weight: "750kg", family: "Iguanodontidae", discovery: "1917",
        locations: [{"lat":50.6,"lng":-1.3,"region":"Wessex Formation, Isle of Wight, UK"}],
        description: "A lightly built iguanodontian originally classified as Iguanodon atherfieldensis before being re-described in its own genus. More gracile than Iguanodon, Mantellisaurus was better adapted for bipedal running, and multiple complete skeletons recovered from the Isle of Wight have made it one of the best-understood Early Cretaceous ornithopods.",
        image_url: "/assets/mantellisaurus_fossil.png", animation_url: "/assets/mantellisaurus_art.png",
        wiki_query: "Mantellisaurus"
    },
    {
        id: "d34", species: "Apatosaurus", period: "Late Jurassic", diet: "Herbivore",
        length: "22m", weight: "22,000kg", family: "Diplodocidae", discovery: "1877",
        locations: [{"lat":39,"lng":-105.5,"region":"Morrison Formation, CO, USA"},{"lat":41,"lng":-106,"region":"Wyoming, USA"}],
        description: "Long confused with Brontosaurus in one of palaeontology's most famous naming controversies, Apatosaurus was a massively-built diplodocid sauropod. Despite its huge size it had a relatively small skull and used its whip-like tail — which studies suggest could crack at supersonic speeds — as a defensive weapon.",
        image_url: "/assets/apatosaurus_fossil.png", animation_url: "/assets/apatosaurus_art.png",
        wiki_query: "Apatosaurus"
    },
    {
        id: "d35", species: "Edmontosaurus", period: "Late Cretaceous", diet: "Herbivore",
        length: "12m", weight: "4,000kg", family: "Hadrosauridae", discovery: "1917",
        locations: [{"lat":52,"lng":-112.5,"region":"Horseshoe Canyon Formation, Alberta, Canada"},{"lat":45,"lng":-100,"region":"South Dakota, USA"}],
        description: "A large duck-billed hadrosaur that lived alongside T-Rex, Edmontosaurus is known from remarkable 'dinosaur mummy' specimens preserving dried skin, tendons, and even stomach contents. Evidence of healed T-Rex bite marks on its tail shows it survived at least one predator attack — making it one of the most fascinating living-evidence fossils known.",
        image_url: "/assets/edmontosaurus_fossil.png", animation_url: "/assets/edmontosaurus_art.png",
        wiki_query: "Edmontosaurus"
    },
    {
        id: "d36", species: "Dicraeosaurus", period: "Late Jurassic", diet: "Herbivore",
        length: "14m", weight: "3,000kg", family: "Dicraeosauridae", discovery: "1914",
        locations: [{"lat":-9.5,"lng":39,"region":"Tendaguru Formation, Tanzania"}],
        description: "An unusual diplodocoid sauropod notable for its relatively short neck and the tall forked neural spines rising from its vertebrae that may have supported a fleshy hump or sail for thermoregulation. Discovered at Tendaguru alongside Giraffatitan, its shorter neck suggests it occupied a different feeding niche, browsing lower vegetation.",
        image_url: "/assets/dicraeosaurus_fossil.png", animation_url: "/assets/dicraeosaurus_art.png",
        wiki_query: "Dicraeosaurus"
    },
    {
        id: "d37", species: "Shunosaurus", period: "Middle Jurassic", diet: "Herbivore",
        length: "9.5m", weight: "3,000kg", family: "Cetiosauridae", discovery: "1979",
        locations: [{"lat":29.5,"lng":104.5,"region":"Dashanpu Formation, Sichuan, China"}],
        description: "A remarkable Chinese sauropod unique among its kind for having a bony club at the end of its tail — a defensive weapon convergently evolved with ankylosaurids millions of years later. Discovered at the Dashanpu site in Sichuan with multiple complete skeletons, Shunosaurus is one of the best-known sauropods from Asia.",
        image_url: "/assets/shunosaurus_fossil.png", animation_url: "/assets/shunosaurus_art.png",
        wiki_query: "Shunosaurus"
    },

    {
        id: "d38", species: "Carcharodontosaurus", period: "Late Cretaceous", diet: "Carnivore",
        length: "12.5m", weight: "6,000kg", family: "Carcharodontosauridae", discovery: "1924",
        locations: [{"lat":30.5,"lng":-4.5,"region":"Kem Kem Group, Morocco"}],
        description: "Named after the great white shark for its serrated, blade-like teeth, Carcharodontosaurus was one of the largest carnivorous dinosaurs — rivalling T-Rex in length and possibly Giganotosaurus in skull size. It hunted across the river deltas of prehistoric North Africa alongside Spinosaurus, sharing an ecosystem filled with enormous prey.",
        image_url: "/assets/carcharodontosaurus_fossil.png", animation_url: "/assets/carcharodontosaurus_art.png",
        wiki_query: "Carcharodontosaurus"
    },
    {
        id: "d39", species: "Ouranosaurus", period: "Early Cretaceous", diet: "Herbivore",
        length: "8m", weight: "2,200kg", family: "Iguanodontidae", discovery: "1965",
        locations: [{"lat":16.7,"lng":4.8,"region":"Elrhaz Formation, Niger"}],
        description: "A West African iguanodontian distinguished by extraordinarily tall neural spines rising from its back vertebrae, forming either a large sail for thermoregulation in the hot Saharan climate or a fatty hump like a bison for energy storage during dry seasons. Two near-complete skeletons make it one of the best-known African ornithopods.",
        image_url: "/assets/ouranosaurus_fossil.png", animation_url: "/assets/ouranosaurus_art.png",
        wiki_query: "Ouranosaurus"
    },

    {
        id: "d40", species: "Muttaburrasaurus", period: "Early Cretaceous", diet: "Herbivore",
        length: "8m", weight: "2,800kg", family: "Muttaburrasauridae", discovery: "1963",
        locations: [{"lat":-22.6,"lng":144.5,"region":"Mackunda Formation, Queensland, Australia"}],
        description: "One of Australia's most iconic dinosaurs, Muttaburrasaurus had a distinctive bulbous hollow snout crest that may have been used to amplify calls or enhance its sense of smell. First discovered near Muttaburra, Queensland, it gives its name to its own family and remains one of the most complete dinosaur skeletons ever found in Australia.",
        image_url: "/assets/muttaburrasaurus_fossil.png", animation_url: "/assets/muttaburrasaurus_art.png",
        wiki_query: "Muttaburrasaurus"
    },
    {
        id: "d41", species: "Minmi", period: "Early Cretaceous", diet: "Herbivore",
        length: "3m", weight: "300kg", family: "Ankylosauria", discovery: "1964",
        locations: [{"lat":-26.6,"lng":148.8,"region":"Bungil Formation, Queensland, Australia"}],
        description: "A small but remarkably well-armored Australian ankylosaur, Minmi is notable for having bony plates not just along its back but also across its belly — an adaptation almost unique among armored dinosaurs. A spectacularly preserved specimen still retaining soft tissue reveals it ate plant material including seeds, fruits, and soft leaves.",
        image_url: "/assets/minmi_fossil.png", animation_url: "/assets/minmi_art.png",
        wiki_query: "Minmi (dinosaur)"
    },
    {
        id: "d42", species: "Australovenator", period: "Early Cretaceous", diet: "Carnivore",
        length: "6m", weight: "500kg", family: "Megaraptoridae", discovery: "2006",
        locations: [{"lat":-22.3,"lng":143.0,"region":"Winton Formation, Queensland, Australia"}],
        description: "Australia's most complete theropod and its most fearsome known predator, Australovenator was nicknamed 'Banjo' after its discovery in outback Queensland. It bore three enormous, meat-hook hand claws and was built for explosive speed and agility — likely ambushing prey in the same river system where its sauropod contemporaries were trapped.",
        image_url: "/assets/australovenator_fossil.png", animation_url: "/assets/australovenator_art.png",
        wiki_query: "Australovenator"
    },

    {
        id: "d43", species: "Amargasaurus", period: "Early Cretaceous", diet: "Herbivore",
        length: "10m", weight: "2,600kg", family: "Dicraeosauridae", discovery: "1984",
        locations: [{"lat":-39.1,"lng":-70.0,"region":"La Amarga Formation, Argentina"}],
        description: "One of the most visually striking sauropods ever found, Amargasaurus bore two parallel rows of dramatically tall spines running from its neck to its mid-back. These spines likely supported a twin-sailed crest for thermoregulation or display, making it unmistakable among the diverse sauropods of Early Cretaceous Argentina.",
        image_url: "/assets/amargasaurus_fossil.png", animation_url: "/assets/amargasaurus_art.png",
        wiki_query: "Amargasaurus"
    },
    {
        id: "d44", species: "Herrerasaurus", period: "Late Triassic", diet: "Carnivore",
        length: "6m", weight: "350kg", family: "Herrerasauridae", discovery: "1959",
        locations: [{"lat":-30.1,"lng":-67.8,"region":"Ischigualasto Formation, Argentina"}],
        description: "One of the earliest and most primitive true dinosaurs known, Herrerasaurus lived 231 million years ago when dinosaurs were just beginning to diversify. This fast and lethal Triassic hunter already showed the hallmarks of later theropods — bipedal stance, grasping hands, and recurved teeth — making it a crucial evolutionary window.",
        image_url: "/assets/herrerasaurus_fossil.png", animation_url: "/assets/herrerasaurus_art.png",
        wiki_query: "Herrerasaurus"
    },
    {
        id: "d45", species: "Argentinosaurus", period: "Late Cretaceous", diet: "Herbivore",
        length: "35m", weight: "75,000kg", family: "Titanosauria", discovery: "1987",
        locations: [{"lat":-38.6,"lng":-69.2,"region":"Huincul Formation, Patagonia, Argentina"}],
        description: "Possibly the heaviest land animal in Earth's entire history, Argentinosaurus was so massive that a single vertebra stood 1.5 meters tall. Its enormous size was its primary defense — even Giganotosaurus would struggle to bring down a healthy adult. Growth studies suggest juveniles gained up to 40kg per day in their fastest growth phases.",
        image_url: "/assets/argentinosaurus_fossil.png", animation_url: "/assets/argentinosaurus_art.png",
        wiki_query: "Argentinosaurus"
    },

    {
        id: "d46", species: "Microraptor", period: "Early Cretaceous", diet: "Carnivore",
        length: "1m", weight: "1kg", family: "Dromaeosauridae", discovery: "2000",
        locations: [{"lat":41.5,"lng":120.3,"region":"Jiufotang Formation, Liaoning, China"}],
        description: "A revolutionary discovery, Microraptor possessed four wings — feathered arms and feathered legs — representing an intermediate stage between ground-running theropods and birds capable of powered flight. Studies of its preserved feathers reveal an iridescent black plumage similar to a modern crow, and gut contents show it ate fish, birds, and small lizards.",
        image_url: "/assets/microraptor_fossil.png", animation_url: "/assets/microraptor_art.png",
        wiki_query: "Microraptor"
    },
    {
        id: "d47", species: "Protoceratops", period: "Late Cretaceous", diet: "Herbivore",
        length: "1.8m", weight: "180kg", family: "Protoceratopsidae", discovery: "1923",
        locations: [{"lat":44.1,"lng":104.2,"region":"Djadochta Formation, Mongolia"}],
        description: "A sheep-sized ceratopsian that roamed the Gobi Desert in enormous herds, Protoceratops is best known from the 'fighting dinosaurs' specimen — a Protoceratops and Velociraptor locked in battle, fossilized in an instant by a collapsing sand dune. Their nests and eggs, also found at Djadochta, provided some of the first evidence of dinosaur brooding behavior.",
        image_url: "/assets/protoceratops_fossil.png", animation_url: "/assets/protoceratops_art.png",
        wiki_query: "Protoceratops"
    },
    {
        id: "d48", species: "Mamenchisaurus", period: "Late Jurassic", diet: "Herbivore",
        length: "25m", weight: "27,000kg", family: "Mamenchisauridae", discovery: "1952",
        locations: [{"lat":30.8,"lng":105.1,"region":"Suining Formation, Sichuan, China"}],
        description: "Renowned for possessing the longest neck of any dinosaur relative to body size — accounting for up to half its entire length — Mamenchisaurus used this extraordinary reach to browse across wide swathes of vegetation without moving its massive body. Some species may have reached 35 meters total length, rivalling the largest South American titanosaurs.",
        image_url: "/assets/mamenchisaurus_fossil.png", animation_url: "/assets/mamenchisaurus_art.png",
        wiki_query: "Mamenchisaurus"
    }
];

export const exhibits = [
    { id: "e1", museum_id: "m1", dinosaur_id: "d2", type: "Skeleton", description: "The famous 'Dippy' cast." },
    { id: "e2", museum_id: "m1", dinosaur_id: "d1", type: "Animatronic", description: "A lifelike moving T-Rex model." },
    { id: "e7", museum_id: "m1", dinosaur_id: "d5", type: "Skeleton", description: "Sophie, the most complete Stegosaurus skeleton ever found." },
    { id: "e8", museum_id: "m1", dinosaur_id: "d6", type: "Skeleton", description: "One of the first dinosaurs ever discovered." },
    { id: "e3", museum_id: "m2", dinosaur_id: "d1", type: "Skeleton", description: "A mounted skeleton in a dynamic stalking position." },
    { id: "e4", museum_id: "m2", dinosaur_id: "d3", type: "Fossil", description: "A pristine skull specimen." },
    { id: "e9", museum_id: "m2", dinosaur_id: "d7", type: "Cast", description: "A massive cast of the Titanosaur." },
    { id: "e10", museum_id: "m2", dinosaur_id: "d8", type: "Skeleton", description: "A fierce Jurassic predator." },
    { id: "e5", museum_id: "m3", dinosaur_id: "d1", type: "Fossil", description: "The 'Black Beauty' T-Rex skull." },
    { id: "e11", museum_id: "m3", dinosaur_id: "d9", type: "Skeleton", description: "A smaller relative of the T-Rex, but just as deadly." },
    { id: "e12", museum_id: "m3", dinosaur_id: "d10", type: "Fossil", description: "The best-preserved armored dinosaur ever found." },
    { id: "e6", museum_id: "m4", dinosaur_id: "d4", type: "Skeleton", description: "The tallest mounted dinosaur skeleton in the world." },
    { id: "e13", museum_id: "m4", dinosaur_id: "d11", type: "Fossil", description: "The 'Berlin Specimen', the famous link between dinosaurs and birds." },
    { id: "e14", museum_id: "m4", dinosaur_id: "d12", type: "Skeleton", description: "A spiky stegosaurian from Tanzania." },
    { id: "e15", museum_id: "m5", dinosaur_id: "d13", type: "Skeleton", description: "SUE, the massive T-Rex centerpiece." },
    { id: "e16", museum_id: "m6", dinosaur_id: "d14", type: "Fossil", description: "The incredible Dashanpu fossil assemblage." },
    { id: "e17", museum_id: "m7", dinosaur_id: "d15", type: "Fossil", description: "The apex predator of ancient Patagonia." },
    { id: "e18", museum_id: "m8", dinosaur_id: "d16", type: "Skeleton", description: "The iconic plesiosaur skeleton of Japan." },

    { id: "e19", museum_id: "m1", dinosaur_id: "d26", type: "Fossil", description: "Discovered in Surrey, revealing specific fishing adaptations." },
    { id: "e20", museum_id: "m2", dinosaur_id: "d20", type: "Skeleton", description: "An armored tank heavily guarded from apex predators." },
    { id: "e21", museum_id: "m3", dinosaur_id: "d32", type: "Fossil", description: "An almost complete ceratopsian frill showcasing its majestic horns." },
    { id: "e22", museum_id: "m4", dinosaur_id: "d27", type: "Skeleton", description: "The delicate Solnhofen limestone cast of the tiny predator." },
    { id: "e23", museum_id: "m5", dinosaur_id: "d19", type: "Skeleton", description: "A spectacular towering display that greets visitors in the hall." },
    { id: "e24", museum_id: "m6", dinosaur_id: "d29", type: "Fossil Cast", description: "Replica of the intimidating, giant scythe-claws." },
    { id: "e25", museum_id: "m1", dinosaur_id: "d23", type: "Fossil", description: "The jaws of the great sea serpent, dominating the exhibit." },
    { id: "e26", museum_id: "m2", dinosaur_id: "d18", type: "Fossil", description: "Famous findings from the Flaming Cliffs of Mongolia." },
    { id: "e27", museum_id: "m3", dinosaur_id: "d21", type: "Skeleton", description: "The distinct horned theropod showcasing remarkable skin impressions." },
    { id: "e28", museum_id: "m4", dinosaur_id: "d25", type: "Fossil", description: "An ancient runner with an aerodynamic build." },
    { id: "e29", museum_id: "m5", dinosaur_id: "d30", type: "Skeleton", description: "A flying giant suspended from the towering ceiling." },
    { id: "e30", museum_id: "m1", dinosaur_id: "d24", type: "Skeleton", description: "A classic late Cretaceous flyer dominating the skies." },
    { id: "e31", museum_id: "m2", dinosaur_id: "d22", type: "Fossil", description: "The acoustic crest of the hadrosaur family." },
    { id: "e32", museum_id: "m3", dinosaur_id: "d28", type: "Skeleton", description: "The colossal king of the raptors, ready to strike." },
    { id: "e33", museum_id: "m4", dinosaur_id: "d31", type: "Fossil", description: "The twin-crested predator from early Jurassic formations." },
    { id: "e34", museum_id: "m5", dinosaur_id: "d17", type: "Skeleton", description: "The river monster showcasing its incredible dorsal sail." },
    { id: "e35", museum_id: "m6", dinosaur_id: "d19", type: "Skeleton", description: "An alternative sauropod structure comparing against native species." },
    { id: "e36", museum_id: "m7", dinosaur_id: "d21", type: "Skeleton", description: "A highly celebrated native Patagonian hunting dinosaur." },
    { id: "e37", museum_id: "m7", dinosaur_id: "d15", type: "Skeleton", description: "One of the most fierce theropods to rival the northern T-Rex." },
    { id: "e38", museum_id: "m8", dinosaur_id: "d23", type: "Fossil", description: "A comprehensive look at marine adaptation in the ancient seas." },

    { id: "e39", museum_id: "m1", dinosaur_id: "d33", type: "Skeleton", description: "The highly complete skeleton of the gracefully built relative of Iguanodon." },
    { id: "e40", museum_id: "m2", dinosaur_id: "d34", type: "Skeleton", description: "One of the most famous long-necked sauropods towering in the dinosaur halls." },
    { id: "e41", museum_id: "m2", dinosaur_id: "d5", type: "Fossil", description: "The famous 'Apex' specimen showcasing Stegosaurid defense mechanisms." },
    { id: "e42", museum_id: "m3", dinosaur_id: "d35", type: "Skeleton", description: "An incredibly well-preserved duck-billed dinosaur from Albertan deposits." },
    { id: "e43", museum_id: "m4", dinosaur_id: "d36", type: "Skeleton", description: "A distinct, short-necked sauropod from the famous Tendaguru expedition." },
    { id: "e44", museum_id: "m6", dinosaur_id: "d37", type: "Skeleton", description: "Showcasing the unique tail club evolved convergently by this Chinese sauropod." },
    { id: "e45", museum_id: "m8", dinosaur_id: "d3", type: "Fossil", description: "A magnificent Triceratops specimen highlighting North American fauna." },
    { id: "e46", museum_id: "m5", dinosaur_id: "d7", type: "Cast", description: "'Maximo' the Titanosaur, a colossal cast dominating the main hall." },

    { id: "e47", museum_id: "m9", dinosaur_id: "d38", type: "Skeleton", description: "The massive skull of a Carcharodontosaurus." },
    { id: "e48", museum_id: "m9", dinosaur_id: "d39", type: "Fossil", description: "A nearly complete skeleton showing the sail-like back." },
    { id: "e49", museum_id: "m10", dinosaur_id: "d40", type: "Skeleton", description: "The iconic Australian Muttaburrasaurus mounted dynamically." },
    { id: "e50", museum_id: "m10", dinosaur_id: "d41", type: "Fossil", description: "Well-preserved Minmi scutes and dermal armor." },
    { id: "e51", museum_id: "m10", dinosaur_id: "d42", type: "Skeleton", description: "The apex predator of Queensland in a sprinting pose." },
    { id: "e52", museum_id: "m11", dinosaur_id: "d43", type: "Fossil", description: "The striking elongated cervical spines of Amargasaurus." },
    { id: "e53", museum_id: "m11", dinosaur_id: "d44", type: "Skeleton", description: "A pivotal Triassic skeleton showing early theropod evolution." },
    { id: "e54", museum_id: "m11", dinosaur_id: "d45", type: "Skeleton", description: "A massive recreation of the Argentinosaurus." },
    { id: "e55", museum_id: "m12", dinosaur_id: "d46", type: "Fossil", description: "Incredible feathered Microraptor impressions preserved in rock." },
    { id: "e56", museum_id: "m12", dinosaur_id: "d47", type: "Fossil", description: "A famous 'fighting dinosaur' display of Protoceratops." },
    { id: "e57", museum_id: "m12", dinosaur_id: "d48", type: "Skeleton", description: "The impossibly long-necked Mamenchisaurus stretching across." },
    { id: "e58", museum_id: "m9", dinosaur_id: "d17", type: "Fossil", description: "Spinosaurus fragments showcasing its African roots." }
];
