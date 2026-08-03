import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Disc3, Mic, Layers, ShieldCheck, Zap, ArrowUpRight, Activity } from 'lucide-react';

const componentsList = [
  {
    id: 'processor',
    title: 'HD Noise Cancelling Processor QN2',
    icon: Cpu,
    category: 'Core Processor',
    badge: '32-Bit Dual Engine',
    description: 'Custom-designed chip analyzing ambient noise at 48,000 samples per second. Dynamically adjusts noise cancelling filters in microsecond intervals.',
    specs: [
      { label: 'Sampling Rate', value: '48kHz / 32-bit' },
      { label: 'Latency Reduction', value: '< 0.2 ms' },
      { label: 'Power Efficiency', value: '+35% vs QN1' },
    ],
    detail: 'Dedicated multi-core audio DSP calculates complex inverse acoustic waves before ambient sound penetrates the earcup.'
  },
  {
    id: 'driver',
    title: '40mm Precision Carbon Fiber Driver',
    icon: Disc3,
    category: 'Acoustic Transducer',
    badge: '40kHz High-Res',
    description: 'Specially engineered light diaphragm with a rigid carbon fiber dome that renders pristine highs and deep, punchy sub-bass without distortion.',
    specs: [
      { label: 'Frequency Range', value: '4Hz - 40,000Hz' },
      { label: 'Diaphragm Material', value: 'Carbon Composite' },
      { label: 'Impedance', value: '48 Ohms' },
    ],
    detail: 'High-compliance edge delivers rich low frequencies while the ultra-light dome reproduces delicate high-frequency overtone details.'
  },
  {
    id: 'mic-array',
    title: '8-Microphone Spatial Matrix',
    icon: Mic,
    category: 'Acoustic Array',
    badge: 'Beamforming Matrix',
    description: 'Four external beamforming mics and four internal feed-forward/feedback mics capture precise spatial voice while isolating environmental noise.',
    specs: [
      { label: 'Total Microphones', value: '8 Microphones' },
      { label: 'Wind Noise Filter', value: 'Mesh Acoustic Structure' },
      { label: 'Voice Isolation', value: 'AI Beamforming' },
    ],
    detail: 'Bone-conduction sensors and AI voice pickup algorithm separate your voice from ambient chatter, even in heavy wind.'
  },
  {
    id: 'cushions',
    title: 'Ergonomic Synthetic Leather Earpads',
    icon: Layers,
    category: 'Comfort & Isolation',
    badge: 'Zero-Pressure Fit',
    description: 'Soft-fit synthetic leather earpads with memory foam core evenly distribute pressure across the head while providing exceptional passive acoustic seal.',
    specs: [
      { label: 'Material', value: 'Ultra-soft Synthetic Leather' },
      { label: 'Foam Type', value: 'Low-density Memory Foam' },
      { label: 'Passive Reduction', value: '-14dB Noise Isolation' },
    ],
    detail: 'Redesigned ear cavity shape avoids pressure points around glasses frames while ensuring zero sound leakage.'
  }
];

export default function InteractiveExplodedSpecs() {
  const [activeTab, setActiveTab] = useState('processor');
  const activeComp = componentsList.find(c => c.id === activeTab);

  return (
    <section id="technology" className="py-24 bg-[#0A0A0C] relative border-t border-white/5 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0050FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00D6FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0050FF]/10 border border-[#0050FF]/30 text-xs font-mono text-[#00D6FF]">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Engineering Explorer</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Architecture of <span className="text-gradient">Pure Silence.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg">
            Hover or select an internal component below to inspect Sony's precision audio engineering.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Component Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {componentsList.map((comp) => {
              const Icon = comp.icon;
              const isSelected = comp.id === activeTab;
              return (
                <button
                  key={comp.id}
                  onClick={() => setActiveTab(comp.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0050FF]/20 to-transparent border-[#00D6FF]/50 shadow-lg shadow-[#0050FF]/10'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#00D6FF] text-black' : 'bg-white/10 text-white/70'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[#00D6FF] uppercase tracking-wider">
                        {comp.category}
                      </div>
                      <div className="text-base font-semibold text-white">
                        {comp.title}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
                      {comp.badge}
                    </span>
                    <ArrowUpRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#00D6FF] translate-x-0.5 -translate-y-0.5' : 'text-white/30'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Telemetry Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeComp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden space-y-6 shadow-2xl"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <activeComp.icon className="w-48 h-48 text-[#00D6FF]" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#00D6FF] bg-[#0050FF]/20 px-3 py-1 rounded-full border border-[#0050FF]/30">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    <span>COMPONENT TELEMETRY</span>
                  </div>

                  <span className="text-xs font-mono text-white/40">
                    ID: {activeComp.id.toUpperCase()} // 006-XM6
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {activeComp.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {activeComp.description}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10">
                  {activeComp.specs.map((s, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-[11px] font-mono text-white/40 uppercase">{s.label}</div>
                      <div className="text-sm font-bold text-white tracking-wide">{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Micro Detail */}
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-xs text-white/60 space-y-1">
                  <div className="text-[10px] font-mono text-[#00D6FF] uppercase tracking-wider">Acoustic Insight</div>
                  <p>{activeComp.detail}</p>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between text-xs text-white/40 font-mono pt-2">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Sony Precision Calibration Passed</span>
                  </div>
                  <span>STATUS: OPTIMAL</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
