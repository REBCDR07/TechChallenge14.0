import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { useTranslation } from '@/contexts/LanguageContext';

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: '1 247', label: t('testimonials.stat1_label') },
    { value: '4.9/5', label: t('testimonials.stat2_label') },
    { value: '100%', label: t('testimonials.stat3_label') },
    { value: '24h', label: t('testimonials.stat4_label') },
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

  const testimonials = [
    {
      quote: t('testimonials.t1_quote'),
      name: "Sophie M.",
      designation: t('testimonials.t1_desc'),
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
    },
    {
      quote: t('testimonials.t2_quote'),
      name: "Thomas D.",
      designation: t('testimonials.t2_desc'),
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop",
    },
    {
      quote: t('testimonials.t3_quote'),
      name: "Léa & Julien",
      designation: t('testimonials.t3_desc'),
      src: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2670&auto=format&fit=crop",
    },
    {
      quote: t('testimonials.t4_quote'),
      name: "Alexandre P.",
      designation: t('testimonials.t4_desc'),
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3600&auto=format&fit=crop",
    },
    {
      quote: t('testimonials.t5_quote'),
      name: "Camille R.",
      designation: t('testimonials.t5_desc'),
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3688&auto=format&fit=crop",
    },
  ];

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
            {t('testimonials.badge')}
          </span>
          <h2 className="font-rajdhani font-bold text-3xl sm:text-4xl lg:text-5xl mt-2 mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-roboto">
            {t('testimonials.subtitle')}
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