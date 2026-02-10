import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCountdown } from '@/hooks/useCountdown';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import plushGiftBox from '@/assets/plush-gift-box.jpg';

interface FinalCTAProps {
  onCtaClick?: (event: React.MouseEvent) => void;
}

/**
 * Section CTA Final
 * Compte à rebours + urgence + appel à l'action
 */
const FinalCTA = ({ onCtaClick }: FinalCTAProps) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  // Compte à rebours jusqu'au 14 février 23h59
  const targetDate = new Date(new Date().getFullYear(), 1, 14, 23, 59, 59);
  // Si on est après le 14 février, on prend l'année suivante
  if (targetDate < new Date()) {
    targetDate.setFullYear(targetDate.getFullYear() + 1);
  }
  
  const timeLeft = useCountdown(targetDate);

  const scrollToOffer = (event: React.MouseEvent) => {
    onCtaClick?.(event);
    const element = document.getElementById('pricing');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative py-16 lg:py-24 px-4 lg:px-8 bg-gradient-to-br from-primary via-secondary to-primary rounded-t-3xl overflow-hidden"
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-background/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-10 -left-10 w-32 h-32 bg-background/10 rounded-full"
        />
      </div>

      <div className="container relative z-10">
        {/* Titre */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-rajdhani font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-center text-primary-foreground mb-4"
        >
          Ne manquez pas ce moment unique 💝
        </motion.h2>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-montserrat font-extrabold text-xl sm:text-2xl text-center text-primary-foreground/90 mb-8"
        >
          La Saint-Valentin approche...
        </motion.p>

        {/* Compte à rebours */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-3 sm:gap-4 lg:gap-6 mb-10"
        >
          {[
            { value: timeLeft.days, label: 'Jours' },
            { value: timeLeft.hours, label: 'Heures' },
            { value: timeLeft.minutes, label: 'Min' },
            { value: timeLeft.seconds, label: 'Sec' },
          ].map((unit, idx) => (
            <div key={idx} className="text-center">
              <div className="bg-background rounded-xl p-3 sm:p-4 lg:p-6 shadow-xl min-w-[60px] sm:min-w-[80px] lg:min-w-[100px]">
                <span className="font-rajdhani font-bold text-3xl sm:text-4xl lg:text-6xl text-primary">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="font-roboto text-xs sm:text-sm text-primary-foreground/80 mt-2 block">
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Récap produit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
        >
          <img
            src={plushGiftBox}
            alt="Peluche Saint-Valentin formule romantique"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-xl"
            loading="lazy"
          />
          <div className="text-center sm:text-left">
            <p className="font-montserrat font-extrabold text-lg text-primary-foreground">
              Formule Romantique
            </p>
            <p className="font-rajdhani font-bold text-4xl text-background">
              34,90€
            </p>
          </div>
        </motion.div>

        {/* Badge urgence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-6"
        >
          <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-roboto font-medium text-sm animate-pulse">
            ⚡ Plus que 23 exemplaires disponibles
          </span>
        </motion.div>

        {/* CTA géant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Button
            onClick={scrollToOffer}
            size="lg"
            className="w-full sm:w-auto px-10 sm:px-16 py-6 text-xl sm:text-2xl font-montserrat font-extrabold bg-background text-primary hover:bg-background/90 hover:scale-105 transition-all duration-300 shadow-2xl animate-pulse-slow"
          >
            J'offre l'amour maintenant 💝
          </Button>
        </motion.div>

        {/* Micro-texte réassurance */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="font-roboto text-xs text-center text-primary-foreground/60"
        >
          Livraison rapide • Paiement sécurisé • Satisfait ou remboursé
        </motion.p>
      </div>
    </section>
  );
};

export default FinalCTA;
