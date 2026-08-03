import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenBuy, onScrollToSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', id: 'overview' },
    { name: 'Technology', id: 'technology' },
    { name: 'Noise Cancelling', id: 'anc-demo' },
    { name: 'Colors', id: 'colors' },
    { name: 'Specs', id: 'specs' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-nav py-3'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand / Model */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <span className="font-extrabold tracking-widest text-lg sm:text-xl text-white group-hover:text-[#00D6FF] transition-colors">
              SONY
            </span>
            <span className="text-white/30 font-light">|</span>
            <span className="text-sm font-semibold tracking-wider text-white/90 group-hover:text-white transition-colors">
              WH-1000XM6
            </span>
          </div>

          {/* Center: Apple-Style Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.id)}
                className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#0050FF] to-[#00D6FF] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right: Primary CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="hidden lg:inline-flex items-center space-x-1.5 text-xs text-emerald-400/90 font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>In Stock • Ready to Ship</span>
            </span>

            <button
              onClick={onOpenBuy}
              className="btn-gradient px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white flex items-center space-x-2 group"
            >
              <span>Experience WH-1000XM6</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={onOpenBuy}
              className="btn-gradient px-3 py-1.5 rounded-full text-xs font-semibold text-white"
            >
              Pre-order
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[60px] z-40 bg-[#050505]/95 backdrop-blur-2xl md:hidden px-6 py-8 flex flex-col justify-between border-t border-white/10"
          >
            <div className="space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.id)}
                  className="block w-full text-left text-xl font-medium tracking-wide text-white/90 hover:text-[#00D6FF] transition-colors py-2 border-b border-white/5"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBuy();
                }}
                className="w-full btn-gradient py-3.5 rounded-xl font-semibold text-center text-white flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pre-order WH-1000XM6 - $449.99</span>
              </button>
              
              <div className="flex items-center justify-center space-x-2 text-xs text-white/50">
                <ShieldCheck className="w-4 h-4 text-[#00D6FF]" />
                <span>Includes 2-Year Sony Premium Warranty</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
