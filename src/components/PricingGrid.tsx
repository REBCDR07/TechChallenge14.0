import { motion } from 'framer-motion';
import { Check, Star, Sparkles, Zap, Crown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { PricingOption } from '@/types';
import { ElectricCard } from '@/components/ui/electric-card';

// Import des images
import plushFront from '@/assets/plush-front.jpg';
import plushGiftBox from '@/assets/plush-gift-box.jpg';
import plushPremium from '@/assets/plush-premium.jpg';

interface PricingGridProps {
  onCtaClick?: (event: React.MouseEvent) => void;
}

/**
 * Section Prix et Offre
 * Présente la peluche sous différentes formules avec un design premium
 */
const PricingGrid = ({ onCtaClick }: PricingGridProps) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const pricingOptions: PricingOption[] = [
    {
      id: 1,
      title: "L'Essentielle",
      subtitle: 'La douceur à l\'état pur',
      price: 29.9,
      features: [
        'La peluche premium 35cm',
        'Emballage soigné',
        'Certificat d\'authenticité',
      ],
      image: plushFront,
      ctaText: 'Choisir la douceur',
      icon: Heart,
    },
    {
      id: 2,
      title: 'La Romantique',
      subtitle: 'Pour faire chavirer son cœur',
      price: 34.9,
      originalPrice: 39.9,
      badge: 'COUP DE CŒUR ❤️',
      recommended: true,
      features: [
        'Tout de la formule Essentielle',
        'Boîte cadeau luxe magnétique',
        'Carte personnalisable',
        'Pétales de roses éternelles',
        'Livraison Express Offerte 🚀',
      ],
      image: plushGiftBox,
      ctaText: 'Je veux l\'émouvoir 💝',
      icon: Sparkles,
    },
    {
      id: 3,
      title: 'L\'Inoubliable',
      subtitle: 'L\'expérience ultime',
      price: 49.9,
      badge: 'ÉDITION PRESTIGE',
      features: [
        'Signature "Romantique" incluse',
        'Coffret Chocolats d\'Artisan',
        'Bougie "Nuit d\'Amour" (180g)',
        'Bracelet en pierre naturelle',
        'Service Conciergerie 24/7',
      ],
      image: plushPremium,
      ctaText: 'Offrir l\'exception',
      icon: Crown,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      },
    },
  };

  const handleCtaClick = (event: React.MouseEvent) => {
    onCtaClick?.(event);
  };

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative py-20 lg:py-32 px-4 lg:px-8 bg-background overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 -translate-y-1/2 -z-10 blur-3xl" />

      <div className="container max-w-7xl mx-auto">
        {/* Header de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-4 font-montserrat">
            OFFRE LIMITÉE SAINT-VALENTIN
          </span>
          <h2 className="font-rajdhani font-bold text-4xl sm:text-5xl lg:text-6xl text-primary mb-6 leading-tight">
            Offrez plus qu'un cadeau,<br />
            <span className="text-secondary">offrez une émotion</span> 🎁
          </h2>
          <p className="font-roboto text-lg text-muted-foreground max-w-2xl mx-auto">
            Chaque formule est conçue avec soin pour créer un moment magique lors du déballage.
            <br />
            <span className="font-bold text-primary">📦 Livraison garantie avant le 14 février.</span>
          </p>
        </motion.div>

        {/* Grille des prix */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {pricingOptions.map((option) => (
            <motion.div
              key={option.id}
              variants={itemVariants}
              className={`relative flex flex-col transition-all duration-500 group z-0 ${option.recommended ? 'scale-105 z-10' : 'hover:-translate-y-2'}`}
            >
              {/* Badge Recommended */}
              {option.recommended && (
                <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-primary text-primary-foreground px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-montserrat font-bold text-[10px] sm:text-sm shadow-xl flex items-center gap-2 whitespace-nowrap">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current animate-pulse" />
                    {option.badge}
                  </div>
                </div>
              )}

              {/* Badge Standard/Premium */}
              {!option.recommended && option.badge && (
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
                  <span className="bg-secondary/10 text-secondary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold font-montserrat">
                    {option.badge}
                  </span>
                </div>
              )}

              <ElectricCard className="h-full">

                {/* Image Header with Overlay */}
                <div className="relative h-48 overflow-hidden rounded-t-[22px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-6 z-20 text-white">
                    <option.icon className="w-8 h-8 mb-2 opacity-90" />
                    <h3 className="font-montserrat font-bold text-2xl">{option.title}</h3>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6 lg:p-8 flex-1 flex flex-col">
                  <p className="font-roboto text-sm text-muted-foreground mb-6 h-10">
                    {option.subtitle}
                  </p>

                  {/* Prix */}
                  <div className="flex items-end gap-2 mb-8">
                    <span className="font-rajdhani font-bold text-5xl text-primary">
                      {Math.floor(option.price)}
                      <span className="text-2xl">.{(option.price % 1).toFixed(2).substring(2)}€</span>
                    </span>
                    {option.originalPrice && (
                      <span className="font-rajdhani text-xl text-muted-foreground line-through mb-2 decoration-2 decoration-secondary/50">
                        {option.originalPrice.toFixed(0)}€
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-1">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 group/item">
                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${option.recommended ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="font-roboto text-sm text-foreground/80 group-hover/item:text-foreground transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={handleCtaClick}
                    className={`w-full py-6 text-base rounded-xl font-montserrat font-extrabold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${option.recommended
                      ? 'bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 hover:to-rose-600/90 text-white border-0'
                      : option.id === 3
                        ? 'bg-secondary hover:bg-secondary/90 text-white'
                        : 'bg-white border-2 border-primary/20 text-primary hover:border-primary hover:bg-primary/5'
                      }`}
                  >
                    {option.ctaText}
                    {option.recommended && <Zap className="w-4 h-4 ml-2 fill-current" />}
                  </Button>
                </div>
              </ElectricCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingGrid;
