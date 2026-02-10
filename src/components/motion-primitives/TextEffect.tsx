import { motion, Variants } from 'framer-motion';

interface TextEffectProps {
  children: string;
  preset?: 'fade' | 'blur' | 'slide';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  speedReveal?: number;
}

const presets: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.05 },
    }),
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: (i: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: { delay: i * 0.03, duration: 0.4 },
    }),
  },
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, type: 'spring', bounce: 0.3 },
    }),
  },
};

/**
 * TextEffect - Animation de texte caractère par caractère
 */
const TextEffect = ({
  children,
  preset = 'blur',
  as: Component = 'p',
  className = '',
  delay = 0,
  speedReveal = 1,
}: TextEffectProps) => {
  const words = children.split(' ');

  const MotionComponent = motion[Component] as typeof motion.p;

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      animate="visible"
      aria-label={children}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => {
            const index = (wordIndex * 10 + charIndex) * speedReveal + delay;
            return (
              <motion.span
                key={charIndex}
                custom={index}
                variants={presets[preset]}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </MotionComponent>
  );
};

export default TextEffect;
