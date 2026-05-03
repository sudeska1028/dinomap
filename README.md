# DinoMap 3D 🦖🌍

**Global Paleontology Navigator**

DinoMap 3D is an immersive, interactive 3D globe application built with React and Three.js that brings the prehistoric world to life. Explore global natural history museums, compare stunning fossil exhibits with their realistic reconstructions, and navigate the ancient habitats of iconic dinosaurs.

## ✨ Features

- **Interactive 3D Globe:** Smooth, hardware-accelerated 3D Earth visualization with realistic sun lighting, ocean specular highlights, and atmospheric glow.
- **Museum Explorer:** Discover famous natural history museums worldwide. Click on glowing amber pins to view their curated collections of dinosaur fossils.
- **Dinosaur Life Map:** Filter by era (Triassic, Jurassic, Cretaceous) to see where your favorite dinosaurs roamed. Features a dynamic "force-directed" repulsion effect so 3D miniature figurines never overlap.
- **Side-by-Side Comparison:** A sleek visual interface allowing you to compare authentic museum fossil records with AI-enhanced realistic 3D reconstructions.
- **Cinematic UI:** A premium, space-themed glassmorphism interface featuring dynamic lighting, elegant typography (Cinzel & Montserrat), and bioluminescent teal aesthetics.

## 🚀 Tech Stack

- **Frontend Framework:** React 18 + Vite
- **3D Rendering:** `react-globe.gl`, `three.js`
- **Styling:** Vanilla CSS (Responsive, Flexbox/Grid, Glassmorphism, CSS Animations)
- **Icons:** `lucide-react`

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/dinomap-3d.git
   cd dinomap-3d
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🎨 Asset Generation Note

The project includes programmatic Node.js/Python scripts (`generate_global_museums.cjs`, `fix_images.cjs`, etc.) used to scrape, generate, and perform background removal on the 3D high-fidelity assets and museum data.

---
*Built with passion for paleontology and modern web design.*
