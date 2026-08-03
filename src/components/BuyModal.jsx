import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check, Sparkles, CreditCard, Lock } from 'lucide-react';

export default function BuyModal({ isOpen, onClose }) {
  const [selectedColor, setSelectedColor] = useState('black');
  const [isOrdered, setIsOrdered] = useState(false);
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const colorOptions = [
    { id: 'black', name: 'Matte Charcoal Black', hex: '#0D0D11' },
    { id: 'silver', name: 'Platinum Silver', hex: '#E2E4E8' },
    { id: 'blue', name: 'Midnight Indigo Blue', hex: '#0F172A' },
  ];

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setIsOrdered(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#0A0A0C] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isOrdered ? (
            <>
              {/* Header */}
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#00D6FF]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sony Official Reservation</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Reserve Sony WH-1000XM6
                </h3>
                <p className="text-xs text-white/60">
                  Priority batch dispatching with complimentary express delivery.
                </p>
              </div>

              {/* Product Pricing Summary */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-base font-bold text-white">WH-1000XM6 Flagship Wireless</div>
                  <div className="text-xs text-white/50">Includes Magnetic Hardshell Case & Cables</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-gradient">$449.99</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Free Priority Shipping</div>
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/60 uppercase">Select Finish:</label>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center space-x-3 ${
                        selectedColor === c.id
                          ? 'bg-[#0050FF]/20 border-[#00D6FF] text-white'
                          : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                      <span className="text-xs font-semibold truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-white/60 block mb-1">Email Address for Confirmation:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00D6FF] transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full btn-gradient py-4 rounded-xl font-bold uppercase tracking-wider text-xs text-white flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Confirm Priority Pre-Order - $449.99</span>
                  </button>
                </div>
              </form>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-[11px] text-white/50 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D6FF]" />
                  <span>2-Yr Sony Warranty</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-[#00D6FF]" />
                  <span>Free 2-Day Express</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <RotateCcw className="w-3.5 h-3.5 text-[#00D6FF]" />
                  <span>30-Day Risk Free</span>
                </div>
              </div>
            </>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-extrabold text-white">
                Pre-order Confirmed!
              </h3>
              <p className="text-sm text-white/70 max-w-md mx-auto">
                Thank you. We have sent your order confirmation receipt and priority tracking code to <strong className="text-[#00D6FF]">{email}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsOrdered(false);
                    onClose();
                  }}
                  className="btn-gradient px-6 py-2.5 rounded-full text-xs font-semibold text-white"
                >
                  Return to Store
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
