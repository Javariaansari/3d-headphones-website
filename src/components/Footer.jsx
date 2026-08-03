import React from 'react';
import { Sparkles, Globe, Heart, ShieldCheck, Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white/50 text-xs border-t border-white/10 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Branding Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <span className="font-black tracking-widest text-2xl text-white">SONY</span>
            <span className="text-white/20">|</span>
            <span className="text-sm font-semibold tracking-wider text-white/80">Audio Innovation Division</span>
          </div>

          <div className="flex items-center space-x-6 text-white/60 font-mono text-[11px]">
            <span className="flex items-center space-x-1.5 text-emerald-400">
              <Leaf className="w-3.5 h-3.5" />
              <span>Road to Zero 2050 Packaging</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-[#00D6FF]" />
              <span>Global / English</span>
            </span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider">Product Lineup</div>
            <ul className="space-y-2 text-white/60">
              <li><a href="#overview" className="hover:text-white transition-colors">WH-1000XM6 Flagship</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">WF-1000XM5 Earbuds</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">ULT Power Sound Series</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Professional Monitor Headphones</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider">Audio Technology</div>
            <ul className="space-y-2 text-white/60">
              <li><a href="#technology" className="hover:text-white transition-colors">HD Processor QN2</a></li>
              <li><a href="#anc-demo" className="hover:text-white transition-colors">Adaptive Noise Cancelling</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">LDAC™ High-Res Audio</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">360 Reality Audio Spatializer</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider">Customer Support</div>
            <ul className="space-y-2 text-white/60">
              <li><a href="#specs" className="hover:text-white transition-colors">Product Specifications</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Firmware Updates</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Warranty & Repairs</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Sony Headphones Connect App</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider">Sustainability & Corporate</div>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Zero Environmental Footprint</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recycled Polymers Program</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sony Design Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press & Media Assets</a></li>
            </ul>
          </div>
        </div>

        {/* Legal Disclosures */}
        <div className="pt-8 border-t border-white/5 space-y-3 text-[10px] text-white/40 leading-relaxed font-mono">
          <p>
            * Battery life up to 40 hours with Active Noise Cancellation enabled. Actual performance may vary based on volume levels and environmental temperature.
          </p>
          <p>
            "Sony", "WH-1000XM6", "DSEE Extreme", "360 Reality Audio" and their respective logos are registered trademarks of Sony Group Corporation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 text-white/50">
            <div>© 2026 Sony Electronics Inc. All rights reserved.</div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Use</a>
              <a href="#" className="hover:text-white">Legal Notice</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
