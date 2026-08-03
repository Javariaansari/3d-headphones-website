import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Volume2, VolumeX, Plane, Train, Coffee, Wind, Sliders, Play, Pause } from 'lucide-react';

const environments = [
  {
    id: 'plane',
    name: 'Airplane Cabin',
    decibels: '85 dB',
    icon: Plane,
    desc: 'Low-frequency jet engine rumble & cabin pressure noise.',
    reduction: '-38 dB'
  },
  {
    id: 'train',
    name: 'Subway Transit',
    decibels: '78 dB',
    icon: Train,
    desc: 'High-frequency rail screeches & tunnel reverberation.',
    reduction: '-34 dB'
  },
  {
    id: 'cafe',
    name: 'Open Office',
    decibels: '68 dB',
    icon: Coffee,
    desc: 'Human chatter, mechanical keyboards, & ambient echo.',
    reduction: '-30 dB'
  },
  {
    id: 'wind',
    name: 'Wind Storm',
    decibels: '74 dB',
    icon: Wind,
    desc: 'Turbulent gust airflow across outer microphone grilles.',
    reduction: '-36 dB'
  }
];

export default function NoiseCancellingDemo() {
  const [activeEnv, setActiveEnv] = useState('plane');
  const [ancEnabled, setAncEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const selectedEnv = environments.find(e => e.id === activeEnv);

  return (
    <section id="anc-demo" className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(0,80,255,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00D6FF]/10 border border-[#00D6FF]/30 text-xs font-mono text-[#00D6FF]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Interactive Noise Cancellation Simulator</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Experience <span className="text-gradient">Total Isolation.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg">
            Test how Sony WH-1000XM6 neutralizes extreme ambient environments in real time.
          </p>
        </div>

        {/* Interactive ANC Box */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
          
          {/* Top Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            
            {/* Environment Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
              {environments.map((env) => {
                const Icon = env.icon;
                const isSelected = env.id === activeEnv;
                return (
                  <button
                    key={env.id}
                    onClick={() => setActiveEnv(env.id)}
                    className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center space-x-2.5 transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#0050FF] to-[#00D6FF] text-white shadow-lg shadow-[#0050FF]/25'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{env.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Toggle ANC Switch */}
            <div className="flex items-center space-x-4 bg-black/40 px-5 py-2.5 rounded-full border border-white/10">
              <span className={`text-xs font-mono tracking-wider ${!ancEnabled ? 'text-rose-400 font-bold' : 'text-white/40'}`}>
                ANC OFF
              </span>

              <button
                onClick={() => setAncEnabled(!ancEnabled)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 p-1 ${
                  ancEnabled ? 'bg-gradient-to-r from-[#0050FF] to-[#00D6FF]' : 'bg-white/20'
                }`}
                aria-label="Toggle Active Noise Cancellation"
              >
                <motion.div
                  animate={{ x: ancEnabled ? 28 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-black"
                >
                  {ancEnabled ? <ShieldCheck className="w-3 h-3 text-[#0050FF]" /> : <VolumeX className="w-3 h-3 text-rose-500" />}
                </motion.div>
              </button>

              <span className={`text-xs font-mono tracking-wider ${ancEnabled ? 'text-[#00D6FF] font-bold' : 'text-white/40'}`}>
                ANC ON
              </span>
            </div>

          </div>

          {/* Waveform Visualization Area */}
          <div className="py-10 flex flex-col items-center justify-center relative min-h-[220px]">
            
            {/* Environment Metadata */}
            <div className="flex items-center space-x-4 text-xs font-mono text-white/50 mb-6">
              <span>ENVIRONMENT: <strong className="text-white">{selectedEnv.name}</strong></span>
              <span>•</span>
              <span>AMBIENT NOISE: <strong className="text-amber-400">{selectedEnv.decibels}</strong></span>
              <span>•</span>
              <span>REDUCTION DEPTH: <strong className="text-[#00D6FF]">{ancEnabled ? selectedEnv.reduction : '0 dB'}</strong></span>
            </div>

            {/* SVG Audio Waveforms */}
            <div className="w-full h-24 flex items-center justify-center space-x-1.5 overflow-hidden px-4">
              {Array.from({ length: 48 }).map((_, i) => {
                // Wave height depends on ANC state
                const baseHeight = ancEnabled ? 8 + Math.sin(i * 0.5) * 6 : 25 + Math.sin(i * 0.4) * 45;
                return (
                  <motion.div
                    key={i}
                    animate={{
                      height: isPlaying ? [baseHeight * 0.6, baseHeight * 1.4, baseHeight * 0.8] : baseHeight,
                      backgroundColor: ancEnabled ? '#00D6FF' : '#F43F5E'
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'mirror',
                      duration: ancEnabled ? 1.8 : 0.6,
                      delay: i * 0.02
                    }}
                    className="w-1.5 rounded-full opacity-80"
                  />
                );
              })}
            </div>

            {/* Center Status Pill */}
            <div className="mt-6 inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 rounded-full bg-[#0050FF] text-white hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <span className="text-white/80">
                {ancEnabled
                  ? `QN2 Processor Active — ${selectedEnv.reduction} Ambient Isolation`
                  : 'Pass-through Ambient Noise Mode — Full Bleed'}
              </span>
            </div>

          </div>

          {/* Footer Note */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center sm:text-left text-xs text-white/50">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#00D6FF]" />
              <span>Auto NC Optimizer adjusts to pressure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-[#00D6FF]" />
              <span>20-Level Ambient Sound Control</span>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-[#00D6FF]" />
              <span>Speak-to-Chat Auto Pause</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
