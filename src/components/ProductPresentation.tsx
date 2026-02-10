import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Gift,
  ShieldCheck,
  Feather,
  ArrowRight,
  Check
} from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Import des images
import plushFront from '@/assets/plush-front.jpg';
import plushSide from '@/assets/plush-side.jpg';
import plushTexture from '@/assets/plush-texture.jpg';
import plushGiftBox from '@/assets/plush-gift-box.jpg';
import plushLifestyle from '@/assets/plush-lifestyle.jpg';

interface Step {
  number: number;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
}

const steps: Step[] = [
  {
    number: 1,
    icon: Feather,
    title: "Douceur Absolue",
    subtitle: "Toucher Velours",
    description: "Une caresse infinie grâce à notre tissu premium hypoallergénique. Conçue pour offrir un réconfort immédiat au premier contact.",
    image: plushTexture,
    features: ["Coton Bio Certifié", "Texture Nuage", "0% Allergène"]
  },
  {
    number: 2,
    icon: Heart,
    title: "Design Romantique",
    subtitle: "Création Originale",
    description: "Chaque courbe a été pensée pour inspirer la tendresse. Son expression bienveillante et son cœur brodé en font le messager idéal.",
    image: plushFront,
    features: ["Yeux Pétillants", "Cœur Brodé Main", "Sourire Apaisant"]
  },
  {
    number: 3,
    icon: ShieldCheck,
    title: "Qualité Premium",
    subtitle: "Finitions Main",
    description: "Pas de compromis sur la qualité. Des coutures renforcées et des matériaux durables pour que votre amour traverse le temps.",
    image: plushSide,
    features: ["Coutures Doubles", "Rembourrage Haute Densité", "Lavable 30°C"]
  },
  {
    number: 4,
    icon: Gift,
    title: "Expérience Cadeau",
    subtitle: "Unboxing Magique",
    description: "Bien plus qu'un objet, c'est une expérience. Livrée dans une boîte luxe avec papier de soie et parfum subtil.",
    image: plushGiftBox,
    features: ["Boîte Magnétique", "Ruban Satin", "Carte Incluse"]
  },
  {
    number: 5,
    icon: Sparkles,
    title: "Magie du Moment",
    subtitle: "Souvenir Éternel",
    description: "Imaginez son sourire en découvrant ce compagnon. Un cadeau qui reste et qui rappelle votre amour chaque jour.",
    image: plushLifestyle,
    features: ["Effet WOW Garanti", "Compagnon de Vie", "Symbole d'Amour"]
  },
];

const ProductPresentation = () => {
  const { ref } = useIntersectionObserver({ threshold: 0.1 });
  const [active, setActive] = useState(0);
  const totalSteps = steps.length;

  const handleNext = () => {
    setActive((prev) => (prev + 1) % totalSteps);
  };

  // Rayon dynamique selon la taille d'écran
  const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : 220;
  const baseRotation = -90;
  const stepAngle = 360 / totalSteps;
  const rotation = baseRotation - active * stepAngle;

  return (
    <section
      id="product"
      ref={ref}
      className="w-full bg-background py-16 lg:py-32 px-4 overflow-hidden min-h-[800px] flex items-center justify-center relative"
    >
      {/* Background Elements - Theme Light/Romantic */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-primary/5 opacity-50 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full max-w-[400px] h-[400px] bg-secondary/10 opacity-40 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="font-rajdhani font-bold text-4xl sm:text-5xl lg:text-6xl text-primary mb-4 leading-tight">
            L'excellence dans <br />
            <span className="text-secondary">chaque détail</span> ✨
          </h2>
          <p className="font-roboto text-lg text-muted-foreground max-w-xl mx-auto">
            Une conception unique pour une émotion inoubliable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20"
        >
          {/* --- ORBITAL SYSTEM (Left) --- */}
          <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] shrink-0 flex items-center justify-center mx-auto lg:mx-0">

            {/* Orbital Container Scaled */}
            <div className="absolute inset-0 flex items-center justify-center scale-[0.8] sm:scale-[0.85] lg:scale-100 transition-transform duration-500">

              {/* Anneaux décoratifs */}
              <div className="absolute inset-0 rounded-full border border-primary/10" />
              <div className="absolute inset-[15%] rounded-full border border-primary/10 border-dashed animate-[spin_60s_linear_infinite]" />

              {/* ROTATING CONTAINER */}
              <motion.div
                className="absolute inset-0 rounded-full will-change-transform"
                animate={{ rotate: rotation }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 20,
                  mass: 1,
                }}
              >
                {steps.map((step, index) => {
                  const angle = index * stepAngle;
                  const finalAngle = angle + rotation;
                  // Calcul de position standard sur le cercle
                  const x = Math.cos((finalAngle * Math.PI) / 180) * radius;
                  const y = Math.sin((finalAngle * Math.PI) / 180) * radius;

                  return (
                    <motion.div
                      key={step.number}
                      className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-20 sm:h-20 -ml-7 -mt-7 sm:-ml-10 sm:-mt-10 flex items-center justify-center rounded-full cursor-pointer z-20"
                      animate={{
                        x: x,
                        y: y,
                        rotate: -rotation, // Contre-rotation pour garder l'icône droite
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 70,
                        damping: 20,
                        mass: 1,
                      }}
                      onClick={() => setActive(index)}
                    >
                      {/* Cercle de l'étape */}
                      <div
                        className={`relative w-full h-full rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-background shadow-lg ${active === index
                          ? "border-primary shadow-[0_0_30px_rgba(225,29,72,0.2)] scale-110"
                          : "border-primary/10 hover:border-primary/30 hover:bg-secondary/5"
                          }`}
                      >
                        <step.icon
                          className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 ${active === index ? "text-primary fill-primary/10" : "text-muted-foreground"
                            }`}
                        />

                        {/* Badge Numéro */}
                        <div className={`absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center text-[10px] sm:text-xs font-bold z-10 transition-colors ${active === index ? "bg-primary text-white border-primary" : "bg-white text-muted-foreground border-border"
                          }`}>
                          {step.number}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* CENTER CORE */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="text-center z-10 p-4 sm:p-8 rounded-full bg-white/50 backdrop-blur-sm"
                  >
                    <h3 className="text-4xl sm:text-7xl font-rajdhani font-bold text-primary/10 select-none">
                      0{steps[active].number}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* --- CONTENT PANEL (Right side) --- */}
          <div className="flex-1 w-full max-w-2xl relative min-h-[400px] lg:min-h-[500px] z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="w-full bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-2xl border border-primary/10 flex flex-col md:flex-row gap-8 items-center"
              >
                {/* Image Dynamique */}
                <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-inner relative group">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
                  <img
                    src={steps[active].image}
                    alt={steps[active].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                      {steps[active].subtitle}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground font-montserrat mb-4">
                    {steps[active].title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed mb-6 font-roboto">
                    {steps[active].description}
                  </p>

                  {/* Caractéristiques Liste */}
                  <ul className="mb-8 space-y-3">
                    {steps[active].features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-sm font-medium text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bouton Next */}
                  <div className="mt-auto pt-4 border-t border-border/50 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="group flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors"
                    >
                      Caractéristique suivante
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8 lg:hidden">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${active === i
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-primary/20"
                    }`}
                  aria-label={`Aller à l'étape ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPresentation;