import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WhyGiftSection from '@/components/WhyGiftSection';
import ProductPresentation from '@/components/ProductPresentation';
import EmotionalBenefits from '@/components/EmotionalBenefits';
import PricingGrid from '@/components/PricingGrid';
import ReassuranceSection from '@/components/ReassuranceSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import StickyBottomBar from '@/components/StickyBottomBar';
import ScrollToTop from '@/components/ScrollToTop';
import LoadingScreen from '@/components/LoadingScreen';
import ExitIntentModal from '@/components/ExitIntentModal';
import HeartConfetti from '@/components/HeartConfetti';
import NeuralBackground from '@/components/ui/flow-field-background';
import { useHeartConfetti } from '@/hooks/useHeartConfetti';

/**
 * Page d'accueil - Landing Page Saint-Valentin
 * Structure : 8 sections + navigation + éléments flottants
 */
const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isActive, position, triggerConfetti } = useHeartConfetti();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Écran de chargement */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Confettis globaux */}
      <HeartConfetti isActive={isActive} originX={position.x} originY={position.y} />

      {/* Animation de fond Neural Flow */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <NeuralBackground
          color="#E11D48" // Brand Primary Red
          trailOpacity={0.2}
          speed={0.6}
          particleCount={800}
        />
      </div>

      {/* Modal exit-intent */}
      <ExitIntentModal />

      <div className={`min-h-screen overflow-x-hidden ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        {/* Navigation sticky */}
        <Navigation />

        {/* Contenu principal */}
        <main>
          {/* 1. Hero Section */}
          <HeroSection onCtaClick={triggerConfetti} />

          {/* 2. Pourquoi offrir cette peluche */}
          <WhyGiftSection />

          {/* 3. Présentation de la peluche */}
          <ProductPresentation />

          {/* 4. Bénéfices émotionnels */}
          <EmotionalBenefits />

          {/* 5. Prix et offres */}
          <PricingGrid onCtaClick={triggerConfetti} />

          {/* 6. Éléments de réassurance */}
          <ReassuranceSection />

          {/* 7. Témoignages */}
          <TestimonialsSection />

          {/* 8. CTA Final avec compte à rebours */}
          <FinalCTA onCtaClick={triggerConfetti} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Éléments flottants */}
        <StickyBottomBar onCtaClick={triggerConfetti} />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
