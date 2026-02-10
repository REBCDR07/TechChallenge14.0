import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Benefit } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';

// Import des images
import plushLifestyle from '@/assets/plush-lifestyle.jpg';
import plushHands from '@/assets/plush-hands.jpg';
import plushCouple from '@/assets/plush-couple.jpg';

/**
 * Section Bénéfices et valeur émotionnelle
 * Projette l'acheteur dans l'expérience
 */
const EmotionalBenefits = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const benefits: Benefit[] = [
    {
      id: 1,
      icon: '🌙',
      title: t('emotional_benefits.benefit1_title'),
      description: t('emotional_benefits.benefit1_desc'),
      image: plushLifestyle,
    },
    {
      id: 2,
      icon: '💞',
      title: t('emotional_benefits.benefit2_title'),
      description: t('emotional_benefits.benefit2_desc'),
      image: plushHands,
    },
    {
      id: 3,
      icon: '✨',
      title: t('emotional_benefits.benefit3_title'),
      description: t('emotional_benefits.benefit3_desc'),
      image: plushCouple,
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="benefits"
      ref={ref}
      className="py-12 lg:py-20 px-4 lg:px-8 bg-background"
    >
      <div className="container">
        {/* Titre de section */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-rajdhani font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-center text-primary mb-12 lg:mb-16"
        >
          {t('emotional_benefits.title')}
        </motion.h2>

        {/* Grille des bénéfices */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.id}
              variants={itemVariants}
              className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-secondary ${idx % 2 === 1 ? 'lg:bg-secondary/5' : ''
                }`}
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full aspect-video object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-500"
                  loading="lazy"
                />
              </div>

              {/* Contenu */}
              <div className="p-6 lg:p-8">
                {/* Icône et titre */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{benefit.icon}</span>
                  <h3 className="font-montserrat font-extrabold text-xl sm:text-2xl text-card-foreground">
                    {benefit.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-roboto text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EmotionalBenefits;