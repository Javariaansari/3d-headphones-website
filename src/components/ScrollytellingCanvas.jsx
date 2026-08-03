import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Volume2, ShieldCheck, Cpu, Mic, Disc3, Radio } from 'lucide-react';

const TOTAL_FRAMES = 121;

export default function ScrollytellingCanvas({ onOpenBuy, onScrollToSection }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const lastRenderedFrame = useRef(-1);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeFrame, setActiveFrame] = useState(0);

  // Render a specific frame index to canvas
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgArray = imagesRef.current;
    if (!imgArray || imgArray.length === 0) return;

    const safeIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, frameIndex));
    const img = imgArray[safeIndex];

    if (!img || !img.complete || !img.naturalWidth || !img.naturalHeight) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width <= 0 || height <= 0) return;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Deep charcoal background matching frame background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    // Calculate aspect ratio fit (contain)
    const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight) * 0.88;
    const x = (width - img.naturalWidth * scale) / 2;
    const y = (height - img.naturalHeight * scale) / 2;

    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    ctx.restore();

    lastRenderedFrame.current = safeIndex;
  }, []);

  // Preload frames with onload handler attached BEFORE img.src assignment
  useEffect(() => {
    let loadedCounter = 0;
    const imgArray = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');

      const onFrameLoad = () => {
        loadedCounter++;
        setLoadProgress(Math.round((loadedCounter / TOTAL_FRAMES) * 100));
        if (loadedCounter === TOTAL_FRAMES) {
          imagesRef.current = imgArray;
          setImagesLoaded(true);
        }
      };

      img.onload = onFrameLoad;
      img.onerror = onFrameLoad;
      img.src = `/sequence/frame_${numStr}_delay-0.042s.jpg`;

      imgArray[i] = img;
    }
  }, []);

  // Handle scroll sequence calculation
  useEffect(() => {
    if (!imagesLoaded) return;

    let animFrameId;

    const updateCanvasOnScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;

      if (totalScrollableHeight <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollableHeight, 0), 1);
      setCurrentProgress(progress);

      const frame = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));
      setActiveFrame(frame);

      animFrameId = requestAnimationFrame(() => {
        renderFrame(frame);
      });
    };

    window.addEventListener('scroll', updateCanvasOnScroll, { passive: true });
    window.addEventListener('resize', updateCanvasOnScroll, { passive: true });

    // Render frame 0 immediately upon load
    updateCanvasOnScroll();

    return () => {
      window.removeEventListener('scroll', updateCanvasOnScroll);
      window.removeEventListener('resize', updateCanvasOnScroll);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [imagesLoaded, renderFrame]);

  return (
    <div id="overview" ref={containerRef} className="relative h-[450vh] bg-[#050505]">
      {/* Loading Overlay */}
      {!imagesLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
          <div className="relative flex flex-col items-center space-y-6">
            <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-[#0050FF] border-r-[#00D6FF] animate-spin flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#00D6FF] animate-pulse" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-[#00D6FF] font-mono text-xs tracking-widest uppercase">
                Sony Interactive Engine
              </h3>
              <p className="text-2xl font-light tracking-wider">
                Loading WH-1000XM6 <span className="font-bold text-gradient">{loadProgress}%</span>
              </p>
              <p className="text-xs text-white/40">Preparing 121 8K explosive render frames...</p>
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] transition-all duration-200"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Soft Ambient Radial Glow Behind Canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,80,255,0.07)_0%,_rgba(5,5,5,0)_70%)] pointer-events-none" />

        {/* Canvas Render Element */}
        <canvas
          ref={canvasRef}
          className="relative z-10 block touch-none select-none"
        />

        {/* Floating Scrollytelling Narrative Overlays */}
        {imagesLoaded && (
          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-12 md:p-16">
            {/* Top Indicator */}
            <div className="flex justify-between items-center text-xs tracking-widest uppercase text-white/40 font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#00D6FF] animate-pulse" />
                <span>SCROLLYTELLING ENGINE</span>
              </div>
              <div>FRAME {String(activeFrame + 1).padStart(3, '0')} / {TOTAL_FRAMES}</div>
            </div>

            {/* Story Beats Container */}
            <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-center justify-center">
              
              {/* BEAT 1: HERO / INTRO (0% - 18%) */}
              <AnimatePresence>
                {currentProgress >= 0 && currentProgress <= 0.18 && (
                  <motion.div
                    key="beat-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl space-y-4 pointer-events-auto"
                  >
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-[#00D6FF] mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Next-Gen Flagship Audio</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-gradient">
                      Sony WH-1000XM6
                    </h1>

                    <p className="text-2xl sm:text-3xl font-light tracking-wide text-white/90">
                      Silence, perfected.
                    </p>

                    <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto font-normal leading-relaxed">
                      Flagship wireless noise cancelling, re-engineered for a world that never stops.
                    </p>

                    <div className="pt-4 flex items-center justify-center space-x-3 text-xs text-white/40 font-mono">
                      <span>Scroll to disassemble</span>
                      <ChevronDown className="w-4 h-4 animate-bounce text-[#00D6FF]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BEAT 2: ENGINEERING REVEAL (18% - 42%) */}
              <AnimatePresence>
                {currentProgress > 0.18 && currentProgress <= 0.42 && (
                  <motion.div
                    key="beat-2"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex justify-start pointer-events-auto"
                  >
                    <div className="glass-card p-6 sm:p-8 rounded-3xl max-w-md space-y-4 border border-white/10 shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0050FF]/10 rounded-full blur-2xl group-hover:bg-[#00D6FF]/20 transition-all" />
                      
                      <div className="flex items-center space-x-2 text-xs font-mono text-[#00D6FF] uppercase tracking-widest">
                        <Cpu className="w-4 h-4" />
                        <span>Acoustic Engineering</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Precision-engineered for silence.
                      </h2>

                      <p className="text-sm text-white/70 leading-relaxed">
                        Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
                      </p>

                      <p className="text-xs text-white/50 leading-relaxed border-t border-white/10 pt-3">
                        Every component is tuned for balance, power, and comfort—hour after hour.
                      </p>

                      <div className="pt-2 flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-mono text-white/80 border border-white/10">
                          QN2 HD Processor
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-mono text-white/80 border border-white/10">
                          Carbon Dome Driver
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-mono text-white/80 border border-white/10">
                          Acoustic Seal
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BEAT 3: NOISE CANCELLING & MICROPHONES (42% - 68%) */}
              <AnimatePresence>
                {currentProgress > 0.42 && currentProgress <= 0.68 && (
                  <motion.div
                    key="beat-3"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex justify-end pointer-events-auto"
                  >
                    <div className="glass-card p-6 sm:p-8 rounded-3xl max-w-md space-y-4 border border-white/10 shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-[#00D6FF]/10 rounded-full blur-2xl group-hover:bg-[#0050FF]/20 transition-all" />

                      <div className="flex items-center space-x-2 text-xs font-mono text-[#00D6FF] uppercase tracking-widest">
                        <Mic className="w-4 h-4" />
                        <span>Multi-Mic Array</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Adaptive noise cancelling, redefined.
                      </h2>

                      <ul className="space-y-2.5 text-xs text-white/70">
                        <li className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D6FF] mt-1.5 flex-shrink-0" />
                          <span>Multi-microphone array listens in every direction.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D6FF] mt-1.5 flex-shrink-0" />
                          <span>Real-time noise analysis adjusts dynamically to your environment.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D6FF] mt-1.5 flex-shrink-0" />
                          <span>Your music stays pure—planes, trains, and crowds fade away completely.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BEAT 4: SOUND & UPSCALING (68% - 85%) */}
              <AnimatePresence>
                {currentProgress > 0.68 && currentProgress <= 0.85 && (
                  <motion.div
                    key="beat-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex justify-start pointer-events-auto"
                  >
                    <div className="glass-card p-6 sm:p-8 rounded-3xl max-w-md space-y-4 border border-white/10 shadow-2xl">
                      <div className="flex items-center space-x-2 text-xs font-mono text-[#00D6FF] uppercase tracking-widest">
                        <Volume2 className="w-4 h-4" />
                        <span>Audiophile Sound Engine</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Immersive, lifelike sound.
                      </h2>

                      <p className="text-sm text-white/70 leading-relaxed">
                        High-performance drivers unlock detail, depth, and texture in every single track.
                      </p>

                      <p className="text-xs text-white/50 leading-relaxed border-t border-white/10 pt-3">
                        AI-enhanced DSEE Extreme™ upscaling restores spatial clarity to compressed audio files, so every note feels alive.
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center space-x-2">
                          <Disc3 className="w-4 h-4 text-[#00D6FF] animate-spin" />
                          <span className="text-[11px] font-mono text-white/80">LDAC™ Hi-Res Audio</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#00D6FF] bg-[#0050FF]/20 px-2 py-0.5 rounded">
                          32-bit / 96kHz
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BEAT 5: REASSEMBLY & FINAL CTA (85% - 100%) */}
              <AnimatePresence>
                {currentProgress > 0.85 && (
                  <motion.div
                    key="beat-5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl space-y-6 pointer-events-auto"
                  >
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#0050FF]/20 to-[#00D6FF]/20 border border-[#00D6FF]/30 text-xs font-mono text-[#00D6FF]">
                      <Radio className="w-3.5 h-3.5" />
                      <span>Reassembled & Locked in Position</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                      Hear everything. <br />
                      <span className="text-gradient">Feel nothing else.</span>
                    </h2>

                    <p className="text-base sm:text-lg text-white/70 font-light">
                      WH-1000XM6. Designed for focus, crafted for comfort.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                      <button
                        onClick={onOpenBuy}
                        className="w-full sm:w-auto btn-gradient px-8 py-4 rounded-full font-bold text-sm tracking-wider text-white uppercase shadow-lg"
                      >
                        Experience WH-1000XM6
                      </button>
                      <button
                        onClick={() => onScrollToSection('specs')}
                        className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-sm text-white/80 hover:text-white border border-white/20 hover:border-white/50 transition-colors"
                      >
                        See Full Specs
                      </button>
                    </div>

                    <p className="text-xs text-white/40 font-mono">
                      Engineered for airports, offices, and everything in between.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Bottom Scroll Progress Bar */}
            <div className="w-full flex items-center justify-between pt-4 border-t border-white/10 text-[10px] font-mono text-white/40">
              <span>EXPLODED TECHNICAL DIAGRAM</span>
              <div className="flex-1 max-w-xs mx-6 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF]"
                  style={{ width: `${currentProgress * 100}%` }}
                />
              </div>
              <span>{Math.round(currentProgress * 100)}% DISASSEMBLY</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
