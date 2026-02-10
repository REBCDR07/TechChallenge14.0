import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Undo2, Gift, Sparkles, Lock } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useTranslation } from '@/contexts/LanguageContext';
import { Guarantee } from '@/types';

/**
 * Section Éléments de réassurance
 * Lève les objections et construit la confiance avec un design professionnel
 */
const ReassuranceSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const guarantees = [
    {
      id: 1,
      icon: Truck,
      title: t('reassurance.g1_title'),
      description: t('reassurance.g1_desc'),
    },
    {
      id: 2,
      icon: Lock,
      title: t('reassurance.g2_title'),
      description: t('reassurance.g2_desc'),
    },
    {
      id: 3,
      icon: Undo2,
      title: t('reassurance.g3_title'),
      description: t('reassurance.g3_desc'),
    },
    {
      id: 4,
      icon: Gift,
      title: t('reassurance.g4_title'),
      description: t('reassurance.g4_desc'),
    },
    {
      id: 5,
      icon: Sparkles,
      title: t('reassurance.g5_title'),
      description: t('reassurance.g5_desc'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section
      ref={ref}
      className="py-16 lg:py-24 px-4 lg:px-8 bg-background border-t border-secondary/10"
    >
      <div className="container max-w-7xl mx-auto">
        {/* Titre de section */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-rajdhani font-medium text-2xl sm:text-3xl text-center text-primary/80 mb-12 lg:mb-16 tracking-wide uppercase"
        >
          {t('reassurance.title')}
        </motion.h2>

        {/* Grille des garanties */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-16"
        >
          {guarantees.map((guarantee) => (
            <motion.div
              key={guarantee.id}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              {/* Icône Container */}
              <div className="w-16 h-16 rounded-full bg-secondary/5 flex items-center justify-center mb-4 group-hover:bg-primary/5 transition-colors duration-300">
                <guarantee.icon className="w-8 h-8 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Titre */}
              <h3 className="font-montserrat font-bold text-sm lg:text-base text-foreground mb-2">
                {guarantee.title}
              </h3>

              {/* Description */}
              <p className="font-roboto text-xs lg:text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                {guarantee.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Separator */}
        <div className="w-full h-px bg-border/50 max-w-2xl mx-auto mb-12" />

        {/* Logos paiement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="font-roboto text-sm font-medium">
              {t('reassurance.payment_secure')}
            </span>
          </div>
          <div className="flex items-center gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((payment) => (
              <div
                key={payment}
                className="h-8 px-3 bg-card border border-border rounded flex items-center justify-center"
              >
                <span className="font-bold text-[10px] lg:text-xs">
                  {payment}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReassuranceSection;