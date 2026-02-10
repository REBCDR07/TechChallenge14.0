import { useState } from 'react';
import { Instagram, Facebook, Music2, Pin, Mail, Phone, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * Footer complet avec colonnes d'information
 */
const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'inscription newsletter
    alert(`Merci ! Vous êtes inscrit avec ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-secondary/5 border-t-2 border-primary pt-12 lg:pt-16 pb-8 px-4 lg:px-8">
      <div className="container">
        {/* Grille principale */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
          
          {/* Colonne 1 : À propos */}
          <div>
            <h3 className="font-rajdhani font-bold text-xl text-primary mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-primary" />
              Sweetheart's Plush
            </h3>
            <p className="font-roboto text-sm text-muted-foreground leading-relaxed">
              Offrez des moments de tendresse inoubliables. Nos peluches sont
              conçues avec amour pour créer des souvenirs éternels.
            </p>
          </div>

          {/* Colonne 2 : Liens utiles */}
          <div>
            <h4 className="font-montserrat font-extrabold text-sm text-card-foreground mb-4 uppercase tracking-wide">
              Liens utiles
            </h4>
            <ul className="space-y-2">
              {['Livraison', 'Retours', 'FAQ', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-roboto text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Légal */}
          <div>
            <h4 className="font-montserrat font-extrabold text-sm text-card-foreground mb-4 uppercase tracking-wide">
              Informations légales
            </h4>
            <ul className="space-y-2">
              {[
                'CGV',
                'Mentions légales',
                'Politique de confidentialité',
                'Cookies',
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-roboto text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Contact & Réseaux */}
          <div>
            <h4 className="font-montserrat font-extrabold text-sm text-card-foreground mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3 mb-4">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                <a
                  href="mailto:contact@sweetheartplush.com"
                  className="font-roboto text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  contact@sweetheartplush.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary" />
                <a
                  href="tel:+33123456789"
                  className="font-roboto text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  01 23 45 67 89
                </a>
              </li>
            </ul>

            {/* Réseaux sociaux */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Music2, label: 'TikTok' },
                { icon: Pin, label: 'Pinterest' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-montserrat font-extrabold text-lg text-card-foreground mb-3">
              Restez informé de nos nouveautés 💌
            </h4>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 font-roboto"
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-secondary text-primary-foreground font-montserrat font-extrabold"
              >
                S'inscrire
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-roboto text-xs text-muted-foreground">
            © 2025 Sweetheart's Plush. Fait avec ❤️ pour la Saint-Valentin.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;