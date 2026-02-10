import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';

/**
 * LoadingScreen - Écran de chargement avec compte à rebours 3-2-1-BOOM
 * Animation festive et immersive
 */
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const { t } = useTranslation();
  const [count, setCount] = useState(3);
  const [showBoom, setShowBoom] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const hasCompletedRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setIsVisible(false);
    // Délai pour l'animation de sortie (200ms)
    const exitTimer = setTimeout(() => {
      onComplete();
    }, 200);
    return () => clearTimeout(exitTimer);
  }, [onComplete]);

  useEffect(() => {
    if (count > 0) {
      // Compte à rebours plus rapide (500ms par chiffre)
      const timer = setTimeout(() => setCount(count - 1), 500);
      return () => clearTimeout(timer);
    } else if (count === 0 && !showBoom) {
      setShowBoom(true);
    }
  }, [count, showBoom]);

  // Timer séparé pour la fin du BOOM (1000ms)
  useEffect(() => {
    if (showBoom && !hasCompletedRef.current) {
      const boomTimer = setTimeout(() => {
        handleComplete();
      }, 1000);
      return () => clearTimeout(boomTimer);
    }
  }, [showBoom, handleComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden"
        >
          {/* Cœurs flottants en arrière-plan */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: -100,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'linear',
                }}
                className="absolute text-2xl sm:text-4xl opacity-30"
              >
                {['💕', '❤️', '💖', '💝', '💗'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>

          {/* Cercle pulsant */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-background/20"
          />
          <motion.div
            animate={{
              scale: [1.2, 1.4, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
            className="absolute w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-background/10"
          />

          {/* Compte à rebours */}
          <AnimatePresence mode="wait">
            {count > 0 && (
              <motion.div
                key={count}
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 2, opacity: 0, rotate: 180 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
                className="relative z-10"
              >
                <span className="font-rajdhani font-bold text-[12rem] sm:text-[16rem] text-background drop-shadow-2xl">
                  {count}
                </span>
              </motion.div>
            )}

            {showBoom && (
              <motion.div
                key="boom"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.6 }}
                className="relative z-10 text-center"
              >
                {/* Explosion de particules */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((i * 30 * Math.PI) / 180) * 200,
                      y: Math.sin((i * 30 * Math.PI) / 180) * 200,
                    }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-6xl"
                  >
                    {['💖', '✨', '💕', '🎉', '💝', '❤️'][i % 6]}
                  </motion.div>
                ))}

                {/* BOOM Text */}
                <motion.div
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255,255,255,0.8)',
                      '0 0 60px rgba(255,255,255,1)',
                      '0 0 20px rgba(255,255,255,0.8)',
                    ],
                  }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  <span className="font-rajdhani font-bold text-6xl sm:text-9xl text-background">
                    {t('loading.boom')}
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-montserrat font-extrabold text-xl sm:text-2xl text-background/90 mt-4"
                >
                  {t('loading.subtitle')}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
