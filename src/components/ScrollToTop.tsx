import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';

/**
 * Bouton Scroll-to-top
 * Apparaît après 500px de scroll
 */
const ScrollToTop = () => {
  const scrollPosition = useScrollPosition();
  const isVisible = scrollPosition > 500;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-20 lg:bottom-6 right-4 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-secondary hover:bg-primary text-secondary-foreground shadow-xl flex items-center justify-center transition-colors duration-300"
          aria-label="Remonter en haut de page"
        >
          <ArrowUp className="w-5 h-5 lg:w-6 lg:h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;