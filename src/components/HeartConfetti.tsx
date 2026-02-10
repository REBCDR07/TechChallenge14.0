import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  emoji: string;
  delay: number;
  duration: number;
  size: number;
}

interface HeartConfettiProps {
  isActive: boolean;
  originX?: number;
  originY?: number;
}

/**
 * HeartConfetti - Animation de confettis en forme de cœurs
 * Se déclenche sur les clics CTA
 */
const HeartConfetti = ({ isActive, originX = 50, originY = 50 }: HeartConfettiProps) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (isActive) {
      const newHearts: Heart[] = [];
      const emojis = ['💕', '❤️', '💖', '💝', '💗', '✨', '🎉', '💓'];
      
      for (let i = 0; i < 30; i++) {
        newHearts.push({
          id: Date.now() + i,
          x: originX + (Math.random() - 0.5) * 40,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          delay: Math.random() * 0.3,
          duration: Math.random() * 1.5 + 1,
          size: Math.random() * 1.5 + 0.5,
        });
      }
      
      setHearts(newHearts);
      
      // Nettoyer après l'animation
      const timer = setTimeout(() => setHearts([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive, originX, originY]);

  return (
    <AnimatePresence>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            x: `${heart.x}vw`,
            y: `${originY}vh`,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            y: '-100vh',
            scale: heart.size,
            opacity: [1, 1, 0],
            rotate: Math.random() * 360,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: 'easeOut',
          }}
          className="fixed pointer-events-none z-[100] text-2xl sm:text-4xl"
          style={{ left: 0, top: 0 }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default HeartConfetti;
