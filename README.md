# Portfolio Website

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