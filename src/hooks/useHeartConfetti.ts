import { useState, useCallback } from 'react';

/**
 * Hook pour gérer l'animation de confettis
 */
export const useHeartConfetti = () => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const triggerConfetti = useCallback((event?: React.MouseEvent) => {
    if (event) {
      setPosition({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    }
    setIsActive(true);
    setTimeout(() => setIsActive(false), 100);
  }, []);

  return { isActive, position, triggerConfetti };
};
