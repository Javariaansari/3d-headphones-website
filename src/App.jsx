import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import ScrollytellingCanvas from './components/ScrollytellingCanvas';
import InteractiveExplodedSpecs from './components/InteractiveExplodedSpecs';
import NoiseCancellingDemo from './components/NoiseCancellingDemo';
import ColorSelector from './components/ColorSelector';
import TechSpecsDrawer from './components/TechSpecsDrawer';
import Footer from './components/Footer';
import BuyModal from './components/BuyModal';

export default function App() {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  // Initialize Lenis buttery smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#0050FF] selection:text-white">
      {/* Apple-Style Glass Navbar */}
      <Navbar
        onOpenBuy={() => setIsBuyModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Scrollytelling Canvas Section */}
      <main>
        <ScrollytellingCanvas
          onOpenBuy={() => setIsBuyModalOpen(true)}
          onScrollToSection={handleScrollToSection}
        />

        {/* Component Tech Breakdown */}
        <InteractiveExplodedSpecs />

        {/* ANC Interactive Simulator */}
        <NoiseCancellingDemo />

        {/* Craftsmanship & Color Finish Selector */}
        <ColorSelector
          onOpenBuy={() => setIsBuyModalOpen(true)}
        />

        {/* Detailed Datasheet Specs */}
        <TechSpecsDrawer
          onOpenBuy={() => setIsBuyModalOpen(true)}
        />
      </main>

      {/* Sony Corporate Footer */}
      <Footer />

      {/* Pre-Order Modal */}
      <BuyModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
      />
    </div>
  );
}
