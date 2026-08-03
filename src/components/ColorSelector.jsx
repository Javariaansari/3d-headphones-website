import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Shield, Palette } from 'lucide-react';

const finishes = [
  {
    id: 'black',
    name: 'Matte Charcoal Black',
    colorHex: '#0D0D11',
    accentHex: '#0050FF',
    tagline: 'Stealth & Timeless Tech',
    description: 'Deep non-reflective matte coating with subtle metallic copper accent ring around the microphone grilles.',
    badge: 'Signature Edition'
  },
  {
    id: 'silver',
    name: 'Platinum Silver',
    colorHex: '#E2E4E8',
    accentHex: '#94A3B8',
    tagline: 'Refined Metallic Elegance',
    description: 'Anodized pearl finish with soft silver highlights, resistant to fingerprints and daily wear.',
    badge: 'Limited Craft'
  },
  {
    id: 'blue',
    name: 'Midnight Indigo Blue',
    colorHex: '#0F172A',
    accentHex: '#00D6FF',
    tagline: 'Sony Heritage Dark Navy',
    description: 'Rich deep blue matte hue with electric cyan micro-accent details, inspired by high-end studio gear.',
    badge: 'Special Release'
  }
];

export default function ColorSelector({ onOpenBuy }) {
  const [selectedFinish, setSelectedFinish] = useState('black');
  const current = finishes.find(f => f.id === selectedFinish);

  return (
    <section id="colors" className="py-24 bg-[#0A0A0C] relative border-t border-white/5 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(0,80,255,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00D6FF]">
            <Palette className="w-3.5 h-3.5" />
            <span>Finish & Craftsmanship</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Designed for <span className="text-gradient">Every Aesthetic.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg">
            Crafted from high-grade recycled polymers with tactile anti-fingerprint coatings.
          </p>
        </div>

        {/* Studio Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Color Swatches & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono text-[#00D6FF] uppercase tracking-widest">
                {current.badge}
              </span>
              <h3 className="text-3xl font-bold text-white mt-1 mb-2">
                {current.name}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Color Swatch Picker */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                Select Finish:
              </label>

              <div className="flex items-center space-x-4">
                {finishes.map((f) => {
                  const isSelected = f.id === selectedFinish;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFinish(f.id)}
                      className={`relative p-1.5 rounded-full transition-all duration-300 ${
                        isSelected ? 'ring-2 ring-[#00D6FF] scale-110' : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full border border-white/20 shadow-inner flex items-center justify-center"
                        style={{ backgroundColor: f.colorHex }}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tagline Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-3 text-xs text-white/80">
              <Sparkles className="w-4 h-4 text-[#00D6FF] flex-shrink-0" />
              <span>{current.tagline}</span>
            </div>

            {/* Order CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenBuy}
                className="btn-gradient px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-2"
              >
                <span>Select {current.name}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Product Preview Box */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 relative flex flex-col items-center justify-center min-h-[380px] shadow-2xl overflow-hidden">
              
              {/* Dynamic Aura Glow */}
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute w-72 h-72 rounded-full blur-3xl"
                style={{ backgroundColor: current.accentHex }}
              />

              {/* Product Visual Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 text-center space-y-6"
                >
                  <div className="w-64 h-64 mx-auto rounded-3xl bg-gradient-to-b from-white/10 to-transparent p-6 border border-white/10 flex flex-col items-center justify-center shadow-2xl backdrop-blur-md">
                    <div 
                      className="w-44 h-44 rounded-full border-4 border-white/10 shadow-2xl flex items-center justify-center relative group"
                      style={{ backgroundColor: current.colorHex }}
                    >
                      <div className="w-24 h-24 rounded-full border border-white/20 animate-ping opacity-20" />
                      <div className="absolute text-center space-y-1">
                        <span className="text-xs font-mono font-bold text-white/90 block">XM6</span>
                        <span className="text-[10px] font-mono text-[#00D6FF] uppercase block">{current.badge}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-white/50 tracking-wider">
                    360° ACOUSTIC MATTE FINISH // ANTI-FINGERPRINT NANOTEX
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
