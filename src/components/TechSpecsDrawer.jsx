import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BatteryCharging, Volume2, ShieldCheck, Bluetooth, Sliders, CheckCircle2, ChevronRight } from 'lucide-react';

const specsCategories = [
  {
    id: 'audio',
    name: 'Audio Performance',
    icon: Volume2,
    specs: [
      { name: 'Driver Unit', value: 'Custom 40mm Carbon Fiber Dome' },
      { name: 'Frequency Response (Active)', value: '4 Hz - 40,000 Hz (JEITA)' },
      { name: 'Frequency Response (Bluetooth)', value: '20 Hz - 40,000 Hz (LDAC 990kbps)' },
      { name: 'Audio Codecs Supported', value: 'LDAC, AAC, SBC, LC3 (LE Audio)' },
      { name: 'Audio Engine', value: 'DSEE Extreme™ AI Audio Upscaling' },
      { name: 'Immersive Audio', value: '360 Reality Audio & Head Tracking' },
    ]
  },
  {
    id: 'anc',
    name: 'Noise Cancellation',
    icon: ShieldCheck,
    specs: [
      { name: 'NC Processor', value: 'HD Noise Cancelling Processor QN2 + V2' },
      { name: 'Microphone Array', value: '8 Microphones (4 Feed-Forward, 4 Feedback)' },
      { name: 'Auto NC Optimizer', value: 'Real-time Atmospheric & Wearer Adjustment' },
      { name: 'Ambient Sound Mode', value: '20-Level Adjustable with Voice Focus' },
      { name: 'Wind Reduction', value: 'Acoustic Mesh Structure & AI Filter' },
    ]
  },
  {
    id: 'battery',
    name: 'Battery & Power',
    icon: BatteryCharging,
    specs: [
      { name: 'Battery Life (ANC ON)', value: 'Up to 40 Hours Continuous' },
      { name: 'Battery Life (ANC OFF)', value: 'Up to 50 Hours Continuous' },
      { name: 'Quick Charge', value: '3 Minutes = 5 Hours Playback (USB-PD)' },
      { name: 'Full Charge Time', value: 'Approx. 3.0 Hours via USB-C' },
      { name: 'Charging Method', value: 'USB Type-C® Fast Charge' },
    ]
  },
  {
    id: 'connectivity',
    name: 'Connectivity & Smart',
    icon: Bluetooth,
    specs: [
      { name: 'Bluetooth Version', value: 'Bluetooth® Version 5.4' },
      { name: 'Multipoint Connection', value: 'Pair 2 Devices Simultaneously' },
      { name: 'Fast Pairing', value: 'Google Fast Pair & Windows Swift Pair' },
      { name: 'Smart Features', value: 'Speak-to-Chat, Quick Attention Mode' },
      { name: 'Voice Assistants', value: 'Built-in Google Assistant & Alexa' },
    ]
  }
];

export default function TechSpecsDrawer({ onOpenBuy }) {
  const [activeTab, setActiveTab] = useState('audio');
  const currentCategory = specsCategories.find(c => c.id === activeTab);

  return (
    <section id="specs" className="py-24 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0050FF]/10 border border-[#0050FF]/30 text-xs font-mono text-[#00D6FF]">
            <Sliders className="w-3.5 h-3.5" />
            <span>Full Engineering Datasheet</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Technical <span className="text-gradient">Specifications.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg">
            Every detail calculated for uncompromised acoustic fidelity.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {specsCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all ${
                  isSelected
                    ? 'btn-gradient text-white shadow-lg'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Specs Table Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
                <currentCategory.icon className="w-6 h-6 text-[#00D6FF]" />
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {currentCategory.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentCategory.specs.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-start justify-between space-x-4"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-white/50">{item.name}</div>
                      <div className="text-sm font-semibold text-white">{item.value}</div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#00D6FF] flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Bar */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBuy}
            className="btn-gradient px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider text-white flex items-center space-x-2"
          >
            <span>Pre-order WH-1000XM6 Now</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
