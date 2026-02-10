import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useTranslation } from '@/contexts/LanguageContext';

/**
 * Navigation sticky avec hamburger mobile
 */
const Navigation = () => {
  const { t, language, setLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 100;

  const menuItems = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.why'), href: '#why' },
    { label: t('nav.product'), href: '#product' },
    { label: t('nav.testimonials'), href: '#testimonials' },
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

          {/* Language Switcher & CTA desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex bg-muted/50 rounded-full p-1 border border-border/50">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'fr'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('fon')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'fon'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                FON
              </button>
            </div>

            <Button
              onClick={() => scrollToSection('#pricing')}
              className="bg-primary hover:bg-secondary text-primary-foreground font-montserrat font-extrabold"
            >
              {t('nav.cta')}
            </Button>
          </div>

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

              <div className="flex flex-col gap-6 mt-10">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Languages className="w-5 h-5" />
                    <span className="text-sm font-medium">Langue / Gbewigbe</span>
                  </div>
                  <div className="flex bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setLanguage('fr')}
                      className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${language === 'fr' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'
                        }`}
                    >
                      FR
                    </button>
                    <button
                      onClick={() => setLanguage('fon')}
                      className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${language === 'fon' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'
                        }`}
                    >
                      FON
                    </button>
                  </div>
                </div>

                <Button
                  onClick={() => scrollToSection('#pricing')}
                  className="w-full bg-primary hover:bg-secondary text-primary-foreground font-montserrat font-extrabold py-4"
                >
                  {t('nav.cta')} {language === 'fr' ? 'maintenant 💝' : 'dinvie 💝'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;