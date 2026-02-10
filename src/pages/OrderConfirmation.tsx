import { motion } from 'framer-motion';
import { Check, Package, Truck, Home, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * Page de confirmation de commande
 * Affiche le récapitulatif et le suivi de livraison
 */
const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Simuler les données de commande
  const orderNumber = searchParams.get('order') || 'SV-2025-0214-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  const orderData = {
    orderNumber,
    date: new Date().toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }),
    estimatedDelivery: '13-14 février 2025',
    status: 'processing', // processing, shipped, in-transit, delivered
    statusProgress: 25,
    items: [
      {
        name: 'Peluche Romantique Premium',
        variant: 'Blanc avec cœur brodé',
        quantity: 1,
        price: 49.99,
        image: '🧸',
      },
      {
        name: 'Coffret cadeau Premium',
        variant: 'Ruban satin + Carte personnalisée',
        quantity: 1,
        price: 0, // Inclus
        image: '🎁',
      },
    ],
    subtotal: 49.99,
    shipping: 0,
    discount: -7.50,
    total: 42.49,
    shippingAddress: {
      name: 'Destinataire',
      address: 'Adresse de livraison',
      city: 'Ville',
      postalCode: 'Code postal',
    },
  };

  const trackingSteps = [
    { id: 'confirmed', label: 'Commande confirmée', icon: Check, completed: true },
    { id: 'processing', label: 'En préparation', icon: Package, completed: true },
    { id: 'shipped', label: 'Expédiée', icon: Truck, completed: false },
    { id: 'delivered', label: 'Livrée', icon: Home, completed: false },
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
    <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-background py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Bouton retour */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-roboto text-sm">Retour à la boutique</span>
        </motion.button>

        {/* En-tête de confirmation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
            className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4"
          >
            <Heart className="w-10 h-10 text-primary fill-primary" />
          </motion.div>
          <h1 className="font-rajdhani font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-2">
            Merci pour votre commande ! 💕
          </h1>
          <p className="font-roboto text-muted-foreground">
            Votre commande <span className="font-bold text-primary">{orderData.orderNumber}</span> a été confirmée
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Suivi de commande */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-lg border border-secondary/30"
          >
            <h2 className="font-montserrat font-extrabold text-lg text-card-foreground mb-6">
              📦 Suivi de votre commande
            </h2>

            {/* Barre de progression */}
            <div className="mb-8">
              <Progress value={orderData.statusProgress} className="h-2 mb-4" />
              <div className="grid grid-cols-4 gap-2">
                {trackingSteps.map((step, idx) => (
                  <div key={step.id} className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${
                        step.completed 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </motion.div>
                    <p className={`font-roboto text-xs ${
                      step.completed ? 'text-primary font-bold' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Informations de livraison */}
            <div className="bg-secondary/10 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-primary" />
                <span className="font-montserrat font-extrabold text-sm text-card-foreground">
                  Livraison estimée
                </span>
              </div>
              <p className="font-rajdhani font-bold text-2xl text-primary">
                {orderData.estimatedDelivery}
              </p>
              <p className="font-roboto text-sm text-muted-foreground mt-1">
                ✅ Livraison garantie avant la Saint-Valentin !
              </p>
            </div>

            {/* Articles commandés */}
            <h3 className="font-montserrat font-extrabold text-sm text-card-foreground mb-4">
              Articles commandés
            </h3>
            <div className="space-y-4">
              {orderData.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 bg-background rounded-xl border border-secondary/20"
                >
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center text-3xl">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-montserrat font-extrabold text-sm text-card-foreground">
                      {item.name}
                    </h4>
                    <p className="font-roboto text-xs text-muted-foreground">
                      {item.variant}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-montserrat font-extrabold text-sm text-primary">
                      {item.price === 0 ? 'Inclus' : `${item.price.toFixed(2)} €`}
                    </p>
                    <p className="font-roboto text-xs text-muted-foreground">
                      Qté: {item.quantity}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Récapitulatif */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Récapitulatif financier */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-secondary/30">
              <h2 className="font-montserrat font-extrabold text-lg text-card-foreground mb-4">
                💰 Récapitulatif
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between font-roboto text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="text-card-foreground">{orderData.subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between font-roboto text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="text-primary font-bold">GRATUITE</span>
                </div>
                {orderData.discount < 0 && (
                  <div className="flex justify-between font-roboto text-sm">
                    <span className="text-muted-foreground">Réduction</span>
                    <span className="text-primary font-bold">{orderData.discount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="border-t border-secondary/30 pt-3">
                  <div className="flex justify-between">
                    <span className="font-montserrat font-extrabold text-card-foreground">Total</span>
                    <span className="font-rajdhani font-bold text-2xl text-primary">
                      {orderData.total.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations de commande */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-secondary/30">
              <h2 className="font-montserrat font-extrabold text-lg text-card-foreground mb-4">
                📋 Informations
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="font-roboto text-xs text-muted-foreground">N° de commande</p>
                  <p className="font-montserrat font-extrabold text-sm text-primary">{orderData.orderNumber}</p>
                </div>
                <div>
                  <p className="font-roboto text-xs text-muted-foreground">Date de commande</p>
                  <p className="font-roboto text-sm text-card-foreground">{orderData.date}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-primary hover:bg-secondary text-primary-foreground font-montserrat font-extrabold"
              >
                📧 Confirmation par email
              </Button>
              <Button 
                variant="outline"
                className="w-full font-montserrat font-extrabold border-primary text-primary hover:bg-primary/10"
                onClick={() => navigate('/')}
              >
                Continuer mes achats
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Message de remerciement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-6"
        >
          <p className="font-rajdhani font-bold text-xl text-primary mb-2">
            💕 Merci de faire partie de notre histoire d'amour !
          </p>
          <p className="font-roboto text-sm text-muted-foreground">
            Vous recevrez un email de confirmation avec tous les détails de votre commande.
            <br />
            Une question ? Contactez-nous à <span className="text-primary">support@sweethearts-plush.fr</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
