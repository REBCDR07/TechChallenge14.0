import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Check, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TextEffect from '@/components/motion-primitives/TextEffect';
import AnimatedGroup from '@/components/motion-primitives/AnimatedGroup';
import { useTranslation } from '@/contexts/LanguageContext';
import heroPlush from '@/assets/hero-plush.jpg';

interface HeroSectionProps {
  onCtaClick?: (event: React.MouseEvent) => void;
}

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

/**
 * Section Hero - Design moderne inspiré avec animations fluides
 * Mobile-first avec CTA percutant et effets Waouh (Tilt 3D + Heartbeat)
 */
const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  const { t } = useTranslation();
  const scrollToOffer = (event: React.MouseEvent) => {
    onCtaClick?.(event);
    const element = document.getElementById('pricing');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Fond avec dégradé radial */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] max-w-[800px] aspect-square rounded-full bg-primary/10 blur-[80px] lg:blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Conteneur principal */}
      <div className="container relative pt-24 pb-12 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-5xl">
          {/* Badge d'introduction */}
          <AnimatedGroup
            className="flex justify-center mb-8"
            variants={{ item: transitionVariants.item }}
          >
            <motion.a
              href="#pricing"
              onClick={scrollToOffer}
              className="group inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 shadow-lg backdrop-blur-sm hover:bg-primary/10 transition-all duration-300"
            >
              <span className="bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-sm font-montserrat font-extrabold">
                {t('hero.badge_event')}
              </span>
              <span className="font-roboto text-sm text-foreground flex items-center gap-1">
                {t('hero.badge_offer')}
                <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          </AnimatedGroup>

          {/* Titre principal avec animation de texte */}
          <div className="text-center mb-6">
            <TextEffect
              preset="blur"
              as="h1"
              className="font-rajdhani font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance text-foreground leading-tight"
              speedReveal={0.8}
            >
              {t('hero.title')}
            </TextEffect>
          </div>

          {/* Sous-titre */}
          <AnimatedGroup
            className="text-center mb-10"
            variants={{ item: transitionVariants.item }}
          >
            <p className="font-montserrat font-extrabold text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
              {t('hero.subtitle')}
            </p>
          </AnimatedGroup>

          {/* Boutons CTA avec effet Heartbeat */}
          <AnimatedGroup
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            variants={{ item: transitionVariants.item }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: ["0 0 0 0 rgba(225, 29, 72, 0)", "0 0 0 10px rgba(225, 29, 72, 0)", "0 0 0 0 rgba(225, 29, 72, 0)"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <Button
                onClick={scrollToOffer}
                size="lg"
                className="w-full sm:w-auto px-10 py-6 text-lg font-montserrat font-extrabold bg-primary hover:bg-secondary text-primary-foreground transition-all duration-300 shadow-xl rounded-full group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  {t('hero.cta_primary')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
              </Button>
            </motion.div>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-6 text-lg font-montserrat font-extrabold text-foreground hover:text-primary transition-colors rounded-full"
            >
              {t('hero.cta_secondary')}
            </Button>
          </AnimatedGroup>

          {/* Image hero avec effets 3D Tilt */}
          <AnimatedGroup
            className="relative mx-auto max-w-3xl perspective-1000"
            variants={{ item: transitionVariants.item }}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-[2.5rem] overflow-visible cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-secondary/20 bg-card">
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent z-20 pointer-events-none mix-blend-overlay" />

                {/* Image principale */}
                <motion.div
                  className="relative z-10"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <img
                    src={heroPlush}
                    alt="Peluche Saint-Valentin romantique avec cœur"
                    className="w-full h-auto"
                    loading="eager"
                  />
                </motion.div>
              </div>

              {/* Badge de confiance flottant en 3D */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                style={{ transform: "translateZ(60px)" }} // Pop out in 3D
                className="absolute bottom-6 -right-6 hidden lg:flex bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-2xl items-center gap-4 z-30 border border-primary/10"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600 stroke-[3]" />
                </div>
                <div>
                  <p className="font-montserrat font-extrabold text-sm text-foreground">
                    {t('hero.trust_stock')}
                  </p>
                  <p className="font-roboto text-xs text-muted-foreground">
                    {t('hero.trust_shipping')}
                  </p>
                </div>
              </motion.div>

              {/* Mobile Badge (Static) */}
              <div className="lg:hidden absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3 z-30">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-montserrat font-extrabold text-sm text-card-foreground">
                    {t('hero.trust_delivery')}
                  </p>
                  <p className="font-roboto text-xs text-muted-foreground">
                    {t('hero.trust_date')}
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatedGroup>

          {/* Indicateurs de confiance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-16"
          >
            {[
              { icon: '⭐', label: t('hero.trust_rating') },
              { icon: '🚚', label: t('hero.trust_free_shipping') },
              { icon: '💯', label: t('hero.trust_guarantee') },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-muted-foreground px-4 py-2 rounded-full border border-border/50 bg-secondary/5"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-roboto text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Éléments décoratifs flottants */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 left-[10%] text-4xl opacity-20 hidden lg:block select-none pointer-events-none"
      >
        💕
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-32 right-[10%] text-5xl opacity-20 hidden lg:block select-none pointer-events-none"
      >
        ❤️
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 right-[5%] text-3xl opacity-15 hidden lg:block select-none pointer-events-none"
      >
        🧸
      </motion.div>
    </section>
  );
};

export default HeroSection;
