const museums = [
    {
        id: "m1",
        name: "Natural History Museum",
        location: "London, UK",
        coordinates: { lat: 51.4967, lng: -0.1764 },
        description: "Home to one of the world's most famous dinosaur collections, including 'Dippy' the Diplodocus.",
        thumbnail_url: "assets/natural_history_museum_london.png", // AI Generated
        exhibits: ["e1", "e2", "e7", "e8"]
    },
    {
        id: "m2",
        name: "American Museum of Natural History",
        location: "New York, USA",
        coordinates: { lat: 40.7813, lng: -73.9740 },
        description: "Famous for its fossil halls and the towering Barosaurus mount.",
        thumbnail_url: "assets/amnh_new_york.png", // AI Generated
        exhibits: ["e3", "e4", "e9", "e10"]
    },
    {
        id: "m3",
        name: "Royal Tyrrell Museum",
        location: "Drumheller, Canada",
        coordinates: { lat: 51.4781, lng: -112.7903 },
        description: "Canada's only museum dedicated exclusively to the science of palaeontology.",
        thumbnail_url: "assets/royal_tyrrell_museum.png", // AI Generated
        exhibits: ["e5", "e11", "e12"]
    },
    {
        id: "m4",
        name: "Museum für Naturkunde",
        location: "Berlin, Germany",
        coordinates: { lat: 52.5306, lng: 13.3794 },
        description: "Houses the largest mounted dinosaur skeleton in the world, the Giraffatitan.",
        thumbnail_url: "https://commons.wikimedia.org/wiki/Special:FilePath/Berlin,_Mitte,_Invalidenstrasse_43,_Museum_für_Naturkunde.jpg",
        exhibits: ["e6", "e13", "e14"]
    }
];

const dinosaurs = [
    {
        id: "d1",
        species: "Tyrannosaurus Rex",
        period: "Late Cretaceous",
        diet: "Carnivore",
        length: "12m",
        weight: "8,000kg",
        description: "One of the largest land carnivores of all time, famous for its massive jaws and tiny arms.",
        image_url: "https://commons.wikimedia.org/wiki/Special:FilePath/Tyrannosaurus_Rex_Holotype.jpg",
        animation_url: "assets/trex_reconstruction.png" // AI Generated Reconstruction
    },
    {
        id: "d2",
        species: "Diplodocus",
        period: "Late Jurassic",
        diet: "Herbivore",
        length: "26m",
        weight: "15,000kg",
        description: "A gigantic long-necked dinosaur with a whip-like tail.",
        image_url: "https://commons.wikimedia.org/wiki/Special:FilePath/Diplodocus_(replica).001_-_London.JPG",
        animation_url: "assets/diplodocus_reconstruction.png" // AI Generated Reconstruction
    },
    {
        id: "d3",
        species: "Triceratops",
        period: "Late Cretaceous",
        diet: "Herbivore",
        length: "9m",
        weight: "10,000kg",
        description: "Recognizable by its three horns and large bony frill.",
        image_url: "https://commons.wikimedia.org/wiki/Special:FilePath/Naturalis_Biodiversity_Center_-_Museum_-_Exhibition_Research_in_Progress_06_-_Fossil_skull_of_a_Triceratops.jpg",
        animation_url: "assets/triceratops_reconstruction.png" // AI Generated Reconstruction
    },
    {
        id: "d4",
        species: "Giraffatitan",
        period: "Late Jurassic",
        diet: "Herbivore",
        length: "22m",
        weight: "30,000kg",
        description: "A sauropod with a giraffe-like build, formerly known as Brachiosaurus brancai.",
        image_url: "https://commons.wikimedia.org/wiki/Special:FilePath/Giraffatitan_skeleton_in_Museum_für_Naturkunde_Berlin_0816.jpg",
        animation_url: "assets/giraffatitan_reconstruction.png" // AI Generated Reconstruction
    },
    {
        id: "d5",
        species: "Stegosaurus",
        period: "Late Jurassic",
        diet: "Herbivore",
        length: "9m",
        weight: "5,000kg",
        description: "Famous for the kite-shaped plates along its back and spikes on its tail.",
        image_url: "assets/stegosaurus_fossil.jpg",
        animation_url: "assets/stegosaurus_reconstruction.png" // AI Generated
    },
    {
        id: "d6",
        species: "Iguanodon",
        period: "Early Cretaceous",
        diet: "Herbivore",
        length: "10m",
        weight: "4,500kg",
        description: "A large herbivore that could shift between bipedal and quadrupedal movement.",
        image_url: "assets/iguanodon_fossil.jpg",
        animation_url: "assets/iguanodon_reconstruction.png" // AI Generated
    },
    {
        id: "d7",
        species: "Patagotitan",
        period: "Late Cretaceous",
        diet: "Herbivore",
        length: "37m",
        weight: "70,000kg",
        description: "One of the largest animals to ever walk the Earth.",
        image_url: "assets/patagotitan_fossil.jpg",
        animation_url: "assets/patagotitan_reconstruction.png" // AI Generated
    },
    {
        id: "d8",
        species: "Allosaurus",
        period: "Late Jurassic",
        diet: "Carnivore",
        length: "8.5m",
        weight: "2,300kg",
        description: "The apex predator of the Jurassic, known for its serrated teeth.",
        image_url: "assets/allosaurus_fossil.jpg",
        animation_url: "assets/allosaurus_reconstruction.png" // AI Generated
    },
    {
        id: "d9",
        species: "Albertosaurus",
        period: "Late Cretaceous",
        diet: "Carnivore",
        length: "9m",
        weight: "2,500kg",
        description: "A tyrannosaurid predator, smaller and faster than T-Rex.",
        image_url: "assets/albertosaurus_fossil.jpg",
        animation_url: "assets/albertosaurus_reconstruction.png" // AI Generated
    },
    {
        id: "d10",
        species: "Borealopelta",
        period: "Early Cretaceous",
        diet: "Herbivore",
        length: "5.5m",
        weight: "1,300kg",
        description: "An armored nodosaur, famous for being found as a 'mummy' with skin intact.",
        image_url: "assets/borealopelta_fossil.jpg",
        animation_url: "assets/borealopelta_reconstruction.png" // AI Generated
    },
    {
        id: "d11",
        species: "Archaeopteryx",
        period: "Late Jurassic",
        diet: "Carnivore",
        length: "0.5m",
        weight: "1kg",
        description: "The famous 'first bird', showing the link between dinosaurs and birds.",
        image_url: "assets/archaeopteryx_fossil.jpg",
        animation_url: "assets/archaeopteryx_reconstruction.png" // AI Generated
    },
    {
        id: "d12",
        species: "Kentrosaurus",
        period: "Late Jurassic",
        diet: "Herbivore",
        length: "4.5m",
        weight: "1,100kg",
        description: "A smaller relative of Stegosaurus with sharp spikes on its shoulders and tail.",
        image_url: "assets/kentrosaurus_fossil.jpg",
        animation_url: "assets/kentrosaurus_reconstruction.png" // AI Generated Realistic
    }
];

const exhibits = [
    {
        id: "e1",
        museum_id: "m1",
        dinosaur_id: "d2",
        type: "Skeleton",
        description: "The famous 'Dippy' cast that greeted visitors for decades."
    },
    {
        id: "e2",
        museum_id: "m1",
        dinosaur_id: "d1",
        type: "Animatronic",
        description: "A lifelike moving T-Rex model that roars at visitors."
    },
    {
        id: "e7",
        museum_id: "m1",
        dinosaur_id: "d5",
        type: "Skeleton",
        description: "Sophie, the most complete Stegosaurus skeleton ever found."
    },
    {
        id: "e8",
        museum_id: "m1",
        dinosaur_id: "d6",
        type: "Skeleton",
        description: "One of the first dinosaurs ever discovered, known for its thumb spike."
    },
    {
        id: "e3",
        museum_id: "m2",
        dinosaur_id: "d1",
        type: "Skeleton",
        description: "A mounted skeleton posed in a dynamic stalking position."
    },
    {
        id: "e4",
        museum_id: "m2",
        dinosaur_id: "d3",
        type: "Fossil",
        description: "A pristine skull specimen showing the intricate frill structure."
    },
    {
        id: "e9",
        museum_id: "m2",
        dinosaur_id: "d7",
        type: "Cast",
        description: "A massive cast of the Titanosaur, so large it extends into the hallway."
    },
    {
        id: "e10",
        museum_id: "m2",
        dinosaur_id: "d8",
        type: "Skeleton",
        description: "A fierce Jurassic predator, often shown attacking Apatosaurus."
    },
    {
        id: "e5",
        museum_id: "m3",
        dinosaur_id: "d1",
        type: "Fossil",
        description: "The 'Black Beauty' T-Rex skull, known for its dark mineralization."
    },
    {
        id: "e11",
        museum_id: "m3",
        dinosaur_id: "d9",
        type: "Skeleton",
        description: "A smaller relative of the T-Rex, but just as deadly."
    },
    {
        id: "e12",
        museum_id: "m3",
        dinosaur_id: "d10",
        type: "Fossil",
        description: "The best-preserved armored dinosaur ever found, looking like a statue."
    },
    {
        id: "e6",
        museum_id: "m4",
        dinosaur_id: "d4",
        type: "Skeleton",
        description: "The tallest mounted dinosaur skeleton in the world."
    },
    {
        id: "e13",
        museum_id: "m4",
        dinosaur_id: "d11",
        type: "Fossil",
        description: "The 'Berlin Specimen', the most famous link between dinosaurs and birds."
    },
    {
        id: "e14",
        museum_id: "m4",
        dinosaur_id: "d12",
        type: "Skeleton",
        description: "A spiky stegosaurian from Tanzania, known for its shoulder spikes."
    }
];
