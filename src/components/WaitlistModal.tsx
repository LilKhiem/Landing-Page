import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useFormValidation } from '../hooks/useFormValidation';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
}

import { trackCTA } from '../lib/analytics';
import { signup } from '../lib/api';
import { toast } from 'sonner';

export const WaitlistModal = ({ isOpen, onClose, planName }: WaitlistModalProps) => {
  const { email, emailError, handleEmailChange, handleSubmit, isSubmitted } = useFormValidation();
  const [market, setMarket] = useState<string>('');
  const [marketError, setMarketError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const markets = ['Crypto', 'FX', 'Gold', 'Prop Firm', 'SPX Option'];

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!market) {
      setMarketError('Please select a preferred market');
      return;
    }

    handleSubmit(async (validEmail) => {
      setLoading(true);
      try {
        const payloadPlanIntent = (planName ? planName.toLowerCase() : 'waitlist') as 'explorer' | 'pro' | 'institutional' | 'waitlist';
        trackCTA('navbar_join_waitlist', { email: validEmail, market, plan: planName });
        await signup({ email: validEmail, source: 'modal', plan_intent: payloadPlanIntent });
        toast.success('You’re in. Check your email for your invite link.');
        setTimeout(() => {
          onClose();
          window.location.href = `/referral?ref=ALPHA_QUANT`;
        }, 1500);
      } catch (error) {
        toast.error('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    });
  };

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
              
              <form onSubmit={onFormSubmit} noValidate>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-[10px] font-bold text-[#4A5568] uppercase tracking-[0.2em]">Email Address</label>
                    <AnimatePresence>
                      {emailError && (
                        <motion.span 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="text-[9px] font-bold text-red-500 flex items-center gap-1 uppercase tracking-wider"
                        >
                          <AlertCircle size={10} /> {emailError}
                        </motion.span>
                      )}
                      {!emailError && email.length > 5 && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-[#27C93F]"
                        >
                          <CheckCircle2 size={12} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`w-full bg-black/40 border rounded-xl px-4 py-4 text-sm outline-none transition-all duration-300 placeholder:text-[#4A5568] ${
                      emailError 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-[#1A2333] focus:border-[#F0B429] focus:shadow-[0_0_20px_rgba(240,180,41,0.15)]'
                    }`}
                    placeholder="your@professional-email.com"
                  />
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-[10px] font-bold text-[#4A5568] uppercase tracking-[0.2em]">Preferred Market</label>
                    <AnimatePresence>
                      {marketError && (
                        <motion.span 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="text-[9px] font-bold text-red-500 flex items-center gap-1 uppercase tracking-wider"
                        >
                          <AlertCircle size={10} /> {marketError}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {markets.map((m) => (
                      <motion.button
                        key={m}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setMarket(m);
                          setMarketError(null);
                        }}
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
                  disabled={loading}
                  className="w-full bg-[#F0B429] text-black font-black py-4 rounded-xl hover:shadow-[0_0_30_rgba(240,180,41,0.4)] transition-all uppercase tracking-[0.2em] text-[11px] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {loading ? 'Joining...' : 'Join Waitlist →'}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
