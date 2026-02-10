import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollPosition } from '@/hooks/useScrollPosition';

/**
 * Navigation sticky avec hamburger mobile
 */
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 100;

  const menuItems = [
    { label: 'Accueil', href: '#hero' },
    { label: "Pourquoi l'offrir", href: '#why' },
    { label: 'La peluche', href: '#product' },
    { label: 'Témoignages', href: '#testimonials' },
  ];

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
          }`}
      >
        <div className="container flex items-center justify-between h-16 px-4">
          {/* Hamburger mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -ml-2"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>

          {/* Logo */}
          <a
            href="#hero"
            onClick={() => scrollToSection('#hero')}
            className="font-rajdhani font-bold text-xl sm:text-2xl text-primary flex items-center gap-2"
          >
            <Heart className="w-6 h-6 fill-primary" />
            <span className="hidden sm:inline">Sweetheart's Plush</span>
          </a>

          {/* Menu desktop */}
          <ul className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="font-roboto font-medium text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA desktop */}
          <Button
            onClick={() => scrollToSection('#pricing')}
            className="hidden lg:flex bg-primary hover:bg-secondary text-primary-foreground font-montserrat font-extrabold"
          >
            Commander
          </Button>

          {/* Panier mobile */}
          <button
            onClick={() => scrollToSection('#pricing')}
            className="lg:hidden relative p-2 -mr-2"
            aria-label="Panier"
          >
            <Heart className="w-6 h-6 text-primary" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-xs font-bold text-secondary-foreground">
              1
            </span>
          </button>
        </div>
      </nav>

      {/* Menu mobile overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="absolute top-16 left-0 bottom-0 w-3/4 max-w-sm bg-background shadow-2xl p-6"
            >
              <ul className="space-y-6">
                {menuItems.map((item, idx) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="font-montserrat font-extrabold text-lg text-card-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <Button
                  onClick={() => scrollToSection('#pricing')}
                  className="w-full bg-primary hover:bg-secondary text-primary-foreground font-montserrat font-extrabold py-4"
                >
                  Commander maintenant 💝
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;