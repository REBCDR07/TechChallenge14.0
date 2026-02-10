import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

const stats = [
  { value: '1 247', label: 'peluches offertes' },
  { value: '4.9/5', label: 'étoiles moyennes' },
  { value: '100%', label: 'bonheur garanti' },
  { value: '24h', label: 'expédition rapide' },
];

const testimonials = [
  {
    quote: "J'ai offert cette peluche à Marc pour notre premier anniversaire. Sa réaction était inestimable ! La qualité est incroyable, bien au-delà de ce que j'espérais.",
    name: "Sophie M.",
    designation: "Amoureuse comblée",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3687&auto=format&fit=crop",
  },
  {
    quote: "La douceur de cette peluche est juste magique. Ma copine ne la quitte plus ! L'emballage cadeau était aussi très soigné. Merci pour ce moment.",
    name: "Thomas D.",
    designation: "Achat Vérifié",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3687&auto=format&fit=crop",
  },
  {
    quote: "C'est bien plus qu'une simple peluche, c'est un vrai messager d'amour. Elle est devenue la mascotte de notre couple. Je recommande à 100% !",
    name: "Léa & Julien",
    designation: "Couple heureux",
    src: "https://images.unsplash.com/photo-1623582854594-19607174620f?q=80&w=3540&auto=format&fit=crop",
  },
  {
    quote: "Service client au top et livraison éclair avant la Saint-Valentin. Le produit est conforme aux photos, voire mieux en vrai avec cette texture si douce.",
    name: "Alexandre P.",
    designation: "Client fidèle",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3600&auto=format&fit=crop",
  },
  {
    quote: "Je cherchais un cadeau original et touchant, j'ai trouvé la perle rare. L'expression de la peluche est adorable. Un grand merci !",
    name: "Camille R.",
    designation: "Romantique",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.4 },
  },
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="testimonials" className="py-20 lg:py-32 bg-secondary/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-montserrat font-bold tracking-wider text-sm uppercase">
            Ils ont craqué
          </span>
          <h2 className="font-rajdhani font-bold text-3xl sm:text-4xl lg:text-5xl mt-2 mb-6">
            Des histoires d'amour <span className="text-primary">partagées</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-roboto">
            Rejoignez les milliers de couples qui ont choisi notre peluche pour exprimer leurs sentiments.
          </p>
        </motion.div>

        {/* New Animated Testimonials Component */}
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />

        {/* Stats Grid - Kept for reassurance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-10 border-t border-primary/10"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="text-center"
            >
              <div className="font-rajdhani font-bold text-4xl sm:text-5xl text-primary mb-2">
                {stat.value}
              </div>
              <div className="font-montserrat font-medium text-muted-foreground uppercase text-xs tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;