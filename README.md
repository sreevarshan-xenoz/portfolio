# The Stickman's Quest: Interactive Portfolio Game

An interactive portfolio game where visitors can navigate through a platformer as a customizable stickman character, unlocking projects and skills as they progress.

## Overview

"The Stickman's Quest" is an innovative way to showcase your portfolio through an interactive game experience. Visitors can click the "My World" button to enter a platformer game where they control a stickman character. By overcoming obstacles and completing challenges, they unlock your projects, case studies, and skill demonstrations.

## Features

- **Interactive Platformer**: Navigate through different zones representing various skills and projects
- **Dynamic Obstacles**: Each obstacle presents a challenge related to real-world problems
- **Stickman Customization**: Collect and equip accessories to customize your character
- **Project Unlocking**: Complete challenges to unlock and view portfolio projects
- **Responsive Design**: Works on both desktop and mobile devices
- **Immersive UI**: Game-like interface with quest log, inventory, and map

## Game Zones

1. **UX Forest**: Showcases UI/UX design skills and projects
2. **Code Mountains**: Features programming and development projects
3. **Writing River**: Displays content creation and writing skills
4. **Masterpiece Citadel**: Highlights major portfolio pieces and achievements

## Technologies Used

- React
- Material-UI
- Framer Motion for animations
- React Router for navigation
- Custom game physics and collision detection

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/stickman-quest.git
   cd stickman-quest
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## How to Play

1. Click the "My World" button in the navigation bar
2. Use arrow keys to move your stickman character:
   - Left/Right arrows to move horizontally
   - Up arrow to jump
3. Click on obstacles to start challenges
4. Complete challenges to progress through zones
5. Unlock projects and accessories as you advance
6. Use the UI buttons to access the Quest Log, Inventory, and Map

## Customization

You can customize the game by modifying the following files:

- `src/data/gameData.js`: Edit game zones, obstacles, projects, and accessories
- `src/components/game/`: Modify game components to change visuals and mechanics
- `src/pages/StickmanQuest.jsx`: Adjust game logic and physics

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by classic platformer games
- Built with React and Material-UI
- Animations powered by Framer Motion