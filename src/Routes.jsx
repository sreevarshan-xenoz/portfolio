import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import StickmanQuest from './pages/StickmanQuest';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/stickman-quest" element={<StickmanQuest />} />
    </RouterRoutes>
  );
};

export default Routes; 