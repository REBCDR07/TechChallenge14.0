import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Sparkles, Gift } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

/**
 * Section "Pourquoi offrir cette peluche"
 * Crée une connexion émotionnelle forte avec un design premium
 */
const WhyGiftSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const reasons = [
    {
      id: 1,
      icon: Heart,
      color: "text-rose-500",
      title: 'Un Amour Éternel',
      description: 'Plus qu\'un simple cadeau, c\'est un symbole de tendresse qui traverse les années sans jamais perdre sa douceur.',
    },
    {
      id: 2,
      icon: Sparkles,
      color: "text-amber-400",
      title: 'Présence Réconfortante',
      description: 'Conçue pour offrir un apaisement immédiat, elle devient la gardienne de vos plus beaux secrets et moments de paix.',
    },
    {
      id: 3,
      icon: Gift,
      color: "text-primary",
      title: 'Souvenir Inoubliable',
      description: 'Transformez la Saint-Valentin en une émotion palpable que votre moitié pourra serrer contre son cœur chaque jour.',
    },
    {
      id: 4,
      icon: ShieldCheck,
      color: "text-emerald-500",
      title: 'Qualité d\'Exception',
      description: 'Chaque couture est une promesse de durabilité, utilisant des matériaux nobles et hypoallergéniques pour un respect total.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      },
    },
  };

  return (
    <section
      id="why"
      ref={ref}
      className="relative py-20 lg:py-32 px-4 lg:px-8 overflow-hidden bg-background"
    >
      {/* Mesh Gradient Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10" />

      <div className="container max-w-7xl mx-auto">
        {/* Titre de section */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-montserrat font-bold mb-6"
          >
            <Heart className="w-4 h-4 fill-primary" />
            L'excellence du cadeau
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-rajdhani font-bold text-4xl sm:text-5xl lg:text-6xl text-primary leading-tight"
          >
            Pourquoi cette peluche <br className="hidden sm:block" />
            <span className="text-secondary">ravira son cœur</span> ❤️
          </motion.h2>
        </div>

        {/* Grille des raisons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              variants={itemVariants}
              className="group relative bg-card/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10" />
              
              {/* Icône Container */}
              <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-background shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                <reason.icon className={`w-8 h-8 lg:w-10 lg:h-10 ${reason.color}`} />
              </div>

              {/* Titre */}
              <h3 className="font-montserrat font-extrabold text-xl lg:text-2xl text-card-foreground mb-4">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="font-roboto text-sm lg:text-base text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyGiftSection;