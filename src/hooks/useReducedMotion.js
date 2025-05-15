import { useState, useEffect, useMemo } from 'react';

const useReducedMotion = () => {
  // Get initial state from media query if available
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Default to false if window is not available (e.g., during SSR)
    if (typeof window === 'undefined') return false;
    
    // Check for the media query support
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Also check if it's a mobile device with potentially limited performance
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );
    
    // Enable reduced motion for both explicit user preference and mobile devices
    return query.matches || isMobileDevice;
  });

  useEffect(() => {
    // Make sure we're running in the browser
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Check if it's a mobile device with potentially limited performance
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );
    
    // Update state based on the current preference
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches || isMobileDevice);
    };
    
    // Listen for changes
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // For older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Provide animation options based on preference
  const motionProps = useMemo(() => {
    // Default animation settings
    const defaults = {
      animate: true,
      transition: { duration: 0.6 }
    };
    
    // Reduced animation settings for better performance
    const reduced = {
      animate: false,
      transition: { duration: 0.1 }
    };
    
    return prefersReducedMotion ? reduced : defaults;
  }, [prefersReducedMotion]);

  return {
    prefersReducedMotion,
    motionProps,
    // Helper for framer-motion
    transition: prefersReducedMotion 
      ? { duration: 0.1, ease: 'linear' } 
      : { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    // No animation for reduced motion
    animate: (animation) => prefersReducedMotion ? {} : animation
  };
};

export default useReducedMotion; 