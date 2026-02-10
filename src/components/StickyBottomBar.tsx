import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useScrollPosition } from '@/hooks/useScrollPosition';

interface StickyBottomBarProps {
  onCtaClick?: (event: React.MouseEvent) => void;
}

/**
 * Barre flottante mobile avec prix et CTA
 * Visible uniquement sur mobile après scroll
 */
const StickyBottomBar = ({ onCtaClick }: StickyBottomBarProps) => {
  const scrollPosition = useScrollPosition();
  const isVisible = scrollPosition > 500;

  const scrollToOffer = (event: React.MouseEvent) => {
    onCtaClick?.(event);
    const element = document.getElementById('pricing');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t-2 border-secondary shadow-2xl p-4 safe-area-bottom"
        >
          <div className="flex items-center justify-between gap-4">
            {/* Prix */}
            <div>
              <p className="font-roboto text-xs text-muted-foreground">
                À partir de
              </p>
              <p className="font-rajdhani font-bold text-2xl text-primary">
                29,90€
              </p>
            </div>

            {/* CTA */}
            <Button
              onClick={scrollToOffer}
              className="flex-1 max-w-[200px] py-4 bg-primary hover:bg-secondary text-primary-foreground font-montserrat font-extrabold"
            >
              Offrir maintenant
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBottomBar;
