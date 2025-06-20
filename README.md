# This is my Portfolio Website

A modern, interactive portfolio website built with React and Vite, featuring dynamic animations, interactive elements, and a responsive design.

## Features

- **Modern UI Components** - Built with Material-UI (MUI) for a polished, professional look
- **Dynamic Animations** - Implemented using Framer Motion and React Spring for engaging user interactions
- **Interactive Elements** - Feature-rich components including:
  - 3D Flip Cards
  - Interactive Skill Radar Charts
  - Particle Text Animations
  - Code Typewriter Effects
  - Terminal-style Easter Eggs
  - Interactive Timeline
- **Theme Switching** - Toggle between dark and light themes
- **Responsive Design** - Fully responsive layout that works seamlessly across all devices
- **Fast Performance** - Optimized build with Vite for quick loading and smooth navigation
- **Component-Based Architecture** - Organized and maintainable React component structure
- **Route Management** - Clean URL routing with React Router
- **Intersection Observer** - Smart loading and animations triggered by scroll position
- **Accessibility** - Support for reduced motion preferences

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **UI Library**: Material-UI v5
- **Animation Libraries**:
  - Framer Motion
  - React Spring
- **Routing**: React Router DOM v6
- **Data Visualization**: Chart.js with React-ChartJS-2
- **Intersection Detection**: React Intersection Observer
- **Icons**: MUI Icons

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

- `/src` - Source code
  - `/pages` - Main page components (Home, About, Projects, Contact)
  - `/components` - Reusable UI components
    - Interactive elements (FlipCard3D, CodeTypeWriter, ParticleText, etc.)
    - Navigation and layout components
  - `/hooks` - Custom React hooks
  - `/context` - React context providers for state management
  - `/styles` - Global styles and theme configuration
  - `/assets` - Static assets (images, icons, etc.)
- `/public` - Static files served directly

## Development Features

- Hot Module Replacement (HMR)
- ESLint configuration for code quality
- Source maps for debugging
- Optimized production builds with code splitting
- PWA support via Vite PWA plugin

## Key Components

- **Interactive Skill Chart** - Radar chart visualization of technical skills
- **3D Flip Cards** - Interactive cards with front/back views and 3D rotation
- **Particle Text Animation** - Dynamic text with particle effects
- **Code Typewriter** - Animated code typing effect
- **Terminal Easter Eggs** - Command-line style interactive features
- **Interactive Timeline** - Visual representation of experience and milestones

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

# Experimental Portfolio Concepts

This project showcases innovative portfolio concepts that push the boundaries of web design and user experience. It demonstrates how portfolios can evolve beyond static presentations to become dynamic, interactive experiences.

## Features

### The Self-Modifying Portfolio
A website that rewrites its own code in real time based on user behavior, trends, or cosmic radiation.

- **Key Interactions:**
  - Hover over a project → The layout glitches and rebuilds itself using a different CSS framework (e.g., Bootstrap → Tailwind).
  - Visit during a solar flare? The site auto-generates a "space-punk" theme using NASA's live radiation API.
  - Tech: Service Workers for runtime code swaps + TensorFlow.js for behavior-driven UI shifts.
  - Twist: Add a "chaos toggle" that forces the site to mutate wildly — useful for stress-testing your design adaptability.

### The AI Collaborator Portfolio (Coming Soon)
A portfolio co-created by you and an AI art bot, where both contributions are indistinguishable.

- **Key Interactions:**
  - Click "Who Made This?" to see a heat map guessing which pixels were human/AI-generated.
  - Challenge: "Improve this design" → Users tweak a UI; the AI learns and evolves the homepage.
  - Tech: Run a local LLaMA instance + Canvas API for collaborative editing.
  - Twist: Let the AI "take over" the site for 1 hour/day — visitors get its experimental portfolio instead of yours.

### The Data-Driven Identity Portfolio (Coming Soon)
Your identity and projects shift based on live global data streams (e.g., stock markets, climate, or social media trends).

- **Key Interactions:**
  - Visit during a heatwave? The site becomes an eco-designer's portfolio with climate-themed projects.
  - Bitcoin surges? Switch to a crypto-focused layout with blockchain case studies.
  - Tech: APIs like OpenWeatherMap, Twitter, or CoinGecko + dynamic React state management.
  - Twist: Add a "data shadow" toggle — show visitors how their own browsing habits influence the content they see.

### The Infinite Scroll Paradox
A portfolio that breaks the scrollbar by blending projects into an endless, looping timeline. Inspired by anime and cyberpunk aesthetics, this page features:

- **Seamless Infinite Scroll:** Projects appear in a timeline that never ends, with no repeats in view.
- **Parallax Effects:** Multi-layered backgrounds and cards move at different speeds for depth.
- **Animated Portal Rings:** Neon SVG rings pulse and rotate around each project card, creating a portal effect.
- **Glowing Timeline Connector:** A vertical, animated neon line connects the cards, with pulsing data nodes.
- **Particle/Glyph Background:** Animated katakana, Latin, and numeric glyphs drift behind the timeline, glowing in neon colors.
- **Scanline Overlay:** Subtle animated scanlines add a holographic, high-tech vibe.
- **Futuristic UI:** Glassy cards, glowing edges, and vibrant gradients for a next-gen look.

**Tech Stack:** React, Framer Motion, Material-UI, custom CSS/SVG for effects and animation.

- **Key Interactions:**
  - Scroll with your mouse wheel to cycle through unique, imaginative projects.
  - Enjoy the immersive, animated, and interactive experience—straight out of an anime world!

### The Quantum Entanglement Portfolio
A portfolio where projects are linked in quantum pairs—interacting with one instantly alters the style and content of its twin, visualizing quantum entanglement.

- **Entangled Project Pairs:** Each project is paired with a twin. Hovering or clicking one changes both its own and its twin's style and description.
- **Animated Entanglement Lines:** Glowing, animated SVG lines visually link each pair, pulsing with quantum energy.
- **Wave/Collapse Shimmer:** Interacting with a project triggers a quantum "collapse" shimmer effect, inspired by wave/particle duality.
- **Quantum Particle Background:** Floating quantum glyphs and symbols drift in the background for a mysterious, high-tech vibe.
- **Cyberpunk/Quantum Theme:** Neon colors, glowing borders, and a futuristic UI.

**Tech Stack:** React, Framer Motion, Material-UI, custom CSS/SVG for effects and animation.

- **Key Interactions:**
  - Hover or click a project to see its entangled twin change in real time.
  - Enjoy the immersive, animated, and interactive quantum experience!

## Other Concepts (Planned)

- **The Infinite Remix Portfolio:** Every visit feels like a fresh design — the site remixes your projects, fonts, and colors algorithmically.
- **The Sentient Code Portfolio:** Your codebase is alive — it debates its own quality and evolves based on feedback.
- **The Holographic Timeline Portfolio:** A 4D timeline where projects appear as layered holograms that shift with scroll speed.
- **The Decentralized Reputation Portfolio:** Your skills are verified by a blockchain-based reputation system powered by peer reviews.
- **The Anti-Static Portfolio:** No two page loads are the same — even the text is generated live.
- **The Ephemeral Portfolio:** Projects self-destruct after a set number of views, like a digital Snapchat.
- **The Zero-Knowledge Portfolio:** Prove you're skilled without revealing anything.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/experimental-portfolio.git
cd experimental-portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Technologies Used
- React
- Material UI
- Framer Motion
- GSAP
- Three.js
- React Router
- Vite

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Inspired by the future of web design and user experience
- Special thanks to the open-source community for the amazing tools and libraries