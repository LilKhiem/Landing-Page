import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [email, setEmail] = useState('');
  const [market, setMarket] = useState<string>('');

  const markets = ['Crypto', 'FX', 'Gold', 'Prop Firm', 'SPX Option'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#0D1117] border border-[#1A2333] p-8 rounded-2xl max-w-md w-full relative shadow-2xl shadow-[#F0B429]/5">
              <button onClick={onClose} className="absolute top-4 right-4 text-[#7A8BA0] hover:text-[#F0B429] transition-colors">
                <X size={20} />
              </button>
              <h2 className="text-3xl font-bold mb-3 font-display tracking-tight">Join the Waitlist</h2>
              <p className="text-[#7A8BA0] text-base mb-10 leading-relaxed font-light">Get early access to NEXUS IDE. Founding Member pricing locked permanently on launch day.</p>
              
              <form onSubmit={(e) => { e.preventDefault(); console.log('Email:', email, 'Market:', market); onClose(); }}>
                <div className="mb-6">
                  <label className="block text-[10px] font-bold text-[#4A5568] uppercase tracking-[0.2em] mb-3">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-[#1A2333] rounded-xl px-4 py-4 text-sm focus:border-[#F0B429] focus:shadow-[0_0_20px_rgba(240,180,41,0.15)] outline-none transition-all duration-300 placeholder:text-[#4A5568]"
                    placeholder="your@professional-email.com"
                    required
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-[10px] font-bold text-[#4A5568] uppercase tracking-[0.2em] mb-4">Preferred Market</label>
                  <div className="flex flex-wrap gap-2">
                    {markets.map((m) => (
                      <motion.button
                        key={m}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMarket(m)}
                        className={`py-2.5 px-4 rounded-xl border text-[11px] font-bold transition-all duration-300 ${
                          market === m 
                            ? 'bg-[#F0B429] border-[#F0B429] text-black shadow-[0_0_15px_rgba(240,180,41,0.3)]' 
                            : 'bg-black/40 border-[#1A2333] text-[#7A8BA0] hover:border-[#F0B429]/30 hover:text-white'
                        }`}
                      >
                        {m}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#F0B429] text-black font-black py-4 rounded-xl hover:shadow-[0_0_30px_rgba(240,180,41,0.4)] transition-all uppercase tracking-[0.2em] text-[11px]"
                >
                  Join Waitlist →
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
