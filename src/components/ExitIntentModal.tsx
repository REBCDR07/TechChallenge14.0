import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/LanguageContext';

/**
 * ExitIntentModal - Modal popup de sortie avec offre spéciale
 * Détecte l'intention de quitter la page (mouvement vers le haut)
 * S'affiche au centre de l'écran
 */
const ExitIntentModal = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Déclencher quand la souris quitte vers le haut (fermeture onglet/navigation)
    if (e.clientY <= 0 && !hasTriggered) {
      setIsOpen(true);
      setHasTriggered(true);
    }
  }, [hasTriggered]);

  // Détecter aussi quand l'utilisateur essaie de changer d'onglet
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden' && !hasTriggered) {
      // Ne pas ouvrir immédiatement, mais préparer pour le retour
    }
  }, [hasTriggered]);

  useEffect(() => {
    // Vérifier si déjà affiché dans cette session
    const hasShown = sessionStorage.getItem('exitIntentShown');
    if (hasShown) {
      setHasTriggered(true);
      return;
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleMouseLeave, handleVisibilityChange]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('exitIntentShown', 'true');
  };

  const scrollToOffer = () => {
    handleClose();
    const element = document.getElementById('pricing');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay sombre - centré sur la page */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-foreground/70 backdrop-blur-md z-[200]"
          />

          {/* Modal centrée au milieu de l'écran */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 0 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
            className="fixed inset-0 flex items-center justify-center z-[201] p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto bg-gradient-to-br from-background via-background to-secondary/20 rounded-3xl shadow-2xl overflow-hidden border-4 border-primary">
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/10 pointer-events-none" />

              {/* Bouton fermer */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted/80 hover:bg-muted-foreground/20 transition-colors z-10"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              {/* Contenu */}
              <div className="relative p-8 sm:p-10 text-center">
                {/* Emoji animé avec effet de rebond */}
                <motion.div
                  animate={{
                    rotate: [0, -15, 15, -15, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }}
                  className="text-7xl sm:text-8xl mb-6"
                >
                  💔
                </motion.div>

                {/* Titre avec animation */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-rajdhani font-bold text-3xl sm:text-4xl text-primary mb-3"
                >
                  {t('exit_modal.title')}
                </motion.h2>

                {/* Sous-titre */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-montserrat font-extrabold text-xl text-foreground mb-6"
                >
                  {t('exit_modal.subtitle')}
                </motion.p>

                {/* Offre spéciale avec animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="bg-gradient-to-r from-primary/15 via-secondary/20 to-primary/15 rounded-2xl p-6 mb-6 border border-primary/30"
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-montserrat font-extrabold shadow-lg"
                    >
                      {t('exit_modal.badge')}
                    </motion.span>
                  </div>
                  <p className="font-rajdhani font-bold text-5xl sm:text-6xl text-primary mb-2">
                    -15%
                  </p>
                  <p className="font-montserrat font-extrabold text-lg text-foreground mb-1">
                    {t('exit_modal.discount_type')}
                  </p>
                  <p className="font-roboto text-base text-muted-foreground">
                    {t('exit_modal.code')} <span className="font-bold text-primary text-lg">RESTEZ15</span>
                  </p>
                </motion.div>

                {/* Texte urgence */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-roboto text-sm text-muted-foreground mb-6"
                >
                  {t('exit_modal.urgency').replace('{minutes}', '10')}
                </motion.p>

                {/* CTA principal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={scrollToOffer}
                    size="lg"
                    className="w-full py-7 text-xl font-montserrat font-extrabold bg-primary hover:bg-secondary text-primary-foreground hover:scale-105 transition-all duration-300 shadow-xl rounded-2xl"
                  >
                    {t('exit_modal.button')}
                  </Button>
                </motion.div>

                {/* Lien secondaire */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={handleClose}
                  className="mt-5 font-roboto text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  {t('exit_modal.close')}
                </motion.button>
              </div>

              {/* Décoration flottante */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [12, 15, 12] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 text-6xl opacity-20"
              >
                💕
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [-12, -15, -12] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 text-5xl opacity-20"
              >
                ❤️
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentModal;
