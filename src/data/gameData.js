// Game Zones
export const gameZones = [
  {
    id: 'ux-forest',
    name: 'UX Forest',
    description: 'Navigate through the UX Forest where design challenges await.',
    background: 'linear-gradient(135deg, #1a472a 0%, #2d5a3f 100%)',
    obstacles: ['platform-1', 'spike-1', 'moving-1'],
    projectId: 'project-1',
    position: { x: 0, y: 0 },
  },
  {
    id: 'code-mountains',
    name: 'Code Mountains',
    description: 'Climb the Code Mountains and solve programming puzzles.',
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    obstacles: ['platform-2', 'spike-2', 'moving-2'],
    projectId: 'project-2',
    position: { x: 1, y: 0 },
  },
  {
    id: 'writing-river',
    name: 'Writing River',
    description: 'Cross the Writing River by arranging words in the correct order.',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    obstacles: ['platform-3', 'spike-3', 'moving-3'],
    projectId: 'project-3',
    position: { x: 2, y: 0 },
  },
  {
    id: 'masterpiece-citadel',
    name: 'Masterpiece Citadel',
    description: 'Enter the Masterpiece Citadel to see the best work.',
    background: 'linear-gradient(135deg, #4b2e83 0%, #6a3eb8 100%)',
    obstacles: ['platform-4', 'spike-4', 'moving-4'],
    projectId: 'project-4',
    position: { x: 3, y: 0 },
  },
];

// Obstacles
export const obstacles = {
  // UX Forest Obstacles
  'platform-1': {
    id: 'platform-1',
    name: 'Layout Maze',
    description: 'Rearrange UI elements to fix a broken layout.',
    type: 'platform',
    position: { x: 100, y: 350 },
    width: 300,
    height: 20,
    color: '#64ffda',
    challenge: {
      type: 'drag-drop',
      elements: [
        { id: 'header', text: 'Header', correctPosition: 0 },
        { id: 'nav', text: 'Navigation', correctPosition: 1 },
        { id: 'content', text: 'Content', correctPosition: 2 },
        { id: 'sidebar', text: 'Sidebar', correctPosition: 3 },
        { id: 'footer', text: 'Footer', correctPosition: 4 },
      ],
    },
  },
  'spike-1': {
    id: 'spike-1',
    name: 'Color Harmony',
    description: 'Choose the right color palette for the design.',
    type: 'spike',
    position: { x: 450, y: 350 },
    width: 100,
    height: 20,
    color: '#ff6b6b',
    challenge: {
      type: 'multiple-choice',
      question: 'Which color palette is most accessible?',
      options: [
        { id: 'a', text: 'Red text on green background' },
        { id: 'b', text: 'Yellow text on white background' },
        { id: 'c', text: 'Black text on white background' },
        { id: 'd', text: 'Blue text on red background' },
      ],
      correctAnswer: 'c',
    },
  },
  'moving-1': {
    id: 'moving-1',
    name: 'Responsive Design',
    description: 'Adjust the layout for different screen sizes.',
    type: 'moving',
    position: { x: 600, y: 350 },
    width: 200,
    height: 20,
    color: '#64ffda',
    speed: 2,
    challenge: {
      type: 'slider',
      question: 'Set the breakpoint for mobile devices',
      min: 320,
      max: 768,
      correctValue: 480,
    },
  },
  
  // Code Mountains Obstacles
  'platform-2': {
    id: 'platform-2',
    name: 'Bug Bridge',
    description: 'Fix the bugs in the code to cross the bridge.',
    type: 'platform',
    position: { x: 100, y: 350 },
    width: 300,
    height: 20,
    color: '#64ffda',
    challenge: {
      type: 'code-editor',
      code: `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`,
      bugs: [
        { line: 3, description: 'Missing check for null items' },
        { line: 4, description: 'Missing check for invalid price' },
      ],
    },
  },
  'spike-2': {
    id: 'spike-2',
    name: 'Algorithm Valley',
    description: 'Solve the algorithm challenge to pass.',
    type: 'spike',
    position: { x: 450, y: 350 },
    width: 100,
    height: 20,
    color: '#ff6b6b',
    challenge: {
      type: 'multiple-choice',
      question: 'What is the time complexity of binary search?',
      options: [
        { id: 'a', text: 'O(1)' },
        { id: 'b', text: 'O(log n)' },
        { id: 'c', text: 'O(n)' },
        { id: 'd', text: 'O(n²)' },
      ],
      correctAnswer: 'b',
    },
  },
  'moving-2': {
    id: 'moving-2',
    name: 'Performance Optimization',
    description: 'Optimize the code for better performance.',
    type: 'moving',
    position: { x: 600, y: 350 },
    width: 200,
    height: 20,
    color: '#64ffda',
    speed: 2,
    challenge: {
      type: 'code-editor',
      code: `function findDuplicates(array) {
  const duplicates = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        duplicates.push(array[i]);
      }
    }
  }
  return duplicates;
}`,
      task: 'Optimize this function to have better time complexity',
    },
  },
  
  // Writing River Obstacles
  'platform-3': {
    id: 'platform-3',
    name: 'Sentence Structure',
    description: 'Arrange the words to form a coherent sentence.',
    type: 'platform',
    position: { x: 100, y: 350 },
    width: 300,
    height: 20,
    color: '#64ffda',
    challenge: {
      type: 'drag-drop',
      elements: [
        { id: 'word1', text: 'The', correctPosition: 0 },
        { id: 'word2', text: 'user', correctPosition: 1 },
        { id: 'word3', text: 'experience', correctPosition: 2 },
        { id: 'word4', text: 'was', correctPosition: 3 },
        { id: 'word5', text: 'seamless', correctPosition: 4 },
      ],
    },
  },
  'spike-3': {
    id: 'spike-3',
    name: 'Grammar Check',
    description: 'Identify and fix the grammatical errors.',
    type: 'spike',
    position: { x: 450, y: 350 },
    width: 100,
    height: 20,
    color: '#ff6b6b',
    challenge: {
      type: 'multiple-choice',
      question: 'Which sentence is grammatically correct?',
      options: [
        { id: 'a', text: 'Their going to the store.' },
        { id: 'b', text: 'They\'re going to the store.' },
        { id: 'c', text: 'There going to the store.' },
        { id: 'd', text: 'They going to the store.' },
      ],
      correctAnswer: 'b',
    },
  },
  'moving-3': {
    id: 'moving-3',
    name: 'Content Strategy',
    description: 'Create a compelling headline for the product.',
    type: 'moving',
    position: { x: 600, y: 350 },
    width: 200,
    height: 20,
    color: '#64ffda',
    speed: 2,
    challenge: {
      type: 'text-input',
      question: 'Write a compelling headline for a productivity app',
      minLength: 10,
      maxLength: 60,
    },
  },
  
  // Masterpiece Citadel Obstacles
  'platform-4': {
    id: 'platform-4',
    name: 'Portfolio Showcase',
    description: 'Select the best projects to showcase.',
    type: 'platform',
    position: { x: 100, y: 350 },
    width: 300,
    height: 20,
    color: '#64ffda',
    challenge: {
      type: 'drag-drop',
      elements: [
        { id: 'project1', text: 'E-commerce Redesign', correctPosition: 0 },
        { id: 'project2', text: 'Mobile App Development', correctPosition: 1 },
        { id: 'project3', text: 'Brand Identity', correctPosition: 2 },
        { id: 'project4', text: 'Content Strategy', correctPosition: 3 },
      ],
    },
  },
  'spike-4': {
    id: 'spike-4',
    name: 'Client Dragon',
    description: 'Answer the client\'s questions to defeat the dragon.',
    type: 'spike',
    position: { x: 450, y: 350 },
    width: 100,
    height: 20,
    color: '#ff6b6b',
    challenge: {
      type: 'multiple-choice',
      question: 'What is the most important factor in a successful project?',
      options: [
        { id: 'a', text: 'Meeting deadlines' },
        { id: 'b', text: 'Staying within budget' },
        { id: 'c', text: 'Understanding client needs' },
        { id: 'd', text: 'Using the latest technology' },
      ],
      correctAnswer: 'c',
    },
  },
  'moving-4': {
    id: 'moving-4',
    name: 'Final Challenge',
    description: 'Complete the final challenge to unlock the portfolio.',
    type: 'moving',
    position: { x: 600, y: 350 },
    width: 200,
    height: 20,
    color: '#64ffda',
    speed: 2,
    challenge: {
      type: 'code-editor',
      code: `function portfolio() {
  const skills = ['design', 'development', 'writing'];
  const projects = [];
  
  for (let i = 0; i < skills.length; i++) {
    projects.push(skills[i]);
  }
  
  return projects;
}`,
      task: 'Enhance this function to showcase a portfolio with more details',
    },
  },
};

// Projects
export const projects = [
  {
    id: 'project-1',
    name: 'UX Case Study: E-commerce Redesign',
    description: 'A comprehensive case study of an e-commerce website redesign that increased conversion rates by 200%.',
    image: '/project-images/ux-case-study.jpg',
    link: '/projects/ux-case-study',
    skills: ['UX Design', 'UI Design', 'User Research', 'Prototyping'],
  },
  {
    id: 'project-2',
    name: 'Code Repository: Task Management App',
    description: 'A full-stack task management application built with React, Node.js, and MongoDB.',
    image: '/project-images/task-management-app.jpg',
    link: '/projects/task-management-app',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'RESTful API'],
  },
  {
    id: 'project-3',
    name: 'Writing Sample: Content Strategy',
    description: 'A content strategy document for a SaaS company that increased user engagement by 150%.',
    image: '/project-images/content-strategy.jpg',
    link: '/projects/content-strategy',
    skills: ['Content Strategy', 'Copywriting', 'SEO', 'User Research'],
  },
  {
    id: 'project-4',
    name: 'Portfolio Masterpiece',
    description: 'The complete portfolio showcasing all skills and projects.',
    image: '/project-images/portfolio.jpg',
    link: '/portfolio',
    skills: ['All Skills'],
  },
];

// Accessories
export const accessories = [
  {
    id: 'paintbrush-hat',
    name: 'Paintbrush Hat',
    description: 'Allows you to paint bridges to cross gaps.',
    image: '/accessories/paintbrush-hat.png',
    effect: 'paint-bridge',
  },
  {
    id: 'code-wand',
    name: 'Code Wand',
    description: 'Allows you to cast spells to fix bugs mid-air.',
    image: '/accessories/code-wand.png',
    effect: 'fix-bug',
  },
  {
    id: 'grammar-glasses',
    name: 'Grammar Glasses',
    description: 'Helps you spot grammatical errors.',
    image: '/accessories/grammar-glasses.png',
    effect: 'spot-error',
  },
  {
    id: 'design-compass',
    name: 'Design Compass',
    description: 'Guides you to the best design solutions.',
    image: '/accessories/design-compass.png',
    effect: 'guide-design',
  },
]; 