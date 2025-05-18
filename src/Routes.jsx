import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ExperimentalPortfolio from './pages/ExperimentalPortfolio';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/experimental" element={<ExperimentalPortfolio />} />
    </RouterRoutes>
  );
};

export default Routes; 