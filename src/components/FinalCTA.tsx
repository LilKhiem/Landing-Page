import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { useFormValidation } from '../hooks/useFormValidation';

import { trackCTA } from '../lib/analytics';
import { signup } from '../lib/api';
import { toast } from 'sonner';

export const FinalCTA = ({ onOpenWaitlist }: { onOpenWaitlist?: () => void }) => {
  const [market, setMarket] = useState<string>('');
  const [marketError, setMarketError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { email, emailError, handleEmailChange, handleSubmit, resetForm } = useFormValidation();
  const markets = ['Crypto', 'FX', 'Gold', 'Prop Firm', 'SPX Option'];

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!market) {
      setMarketError('Please select a market');
      return;
    }

    handleSubmit(async (validEmail) => {
      setLoading(true);
      try {
        trackCTA('footer_join_waitlist', { email: validEmail, market });
        await signup({ email: validEmail, source: 'footer_waitlist', plan_intent: 'waitlist' });
        toast.success('You’re in. Check your email for your invite link.');
        setTimeout(() => {
          resetForm();
          setMarket('');
        }, 1500);
      } catch (error) {
        toast.error('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <section className="py-20 px-10 bg-[#F0B429]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 border border-black/10 text-black text-[10px] font-black tracking-[0.2em] uppercase mb-6"
        >
          <ShieldCheck className="w-3 h-3" />
          Founding Member Access
        </motion.div>
        
        <h2 className="text-5xl md:text-8xl font-bold text-black tracking-[-0.04em] font-display mb-8 leading-[1.0]">
          The future of quant <br />is agentic.
        </h2>
        
        <p className="text-black/70 text-xl font-medium mb-10 max-w-2xl mx-auto">
          Join 12,000+ quants waiting for the next batch of invites. <br />Launch: April 5, 2026.
        </p>

        <div className="max-w-xl mx-auto">
          <form onSubmit={onFormSubmit} noValidate className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-3 relative">
              <div className="flex-1 relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="Enter your professional email"
                  className={`w-full px-6 py-4 rounded-xl bg-black/5 border text-black placeholder:text-black/40 focus:outline-none font-medium transition-all duration-300 ${
                    emailError 
                      ? 'border-red-600/50 focus:border-red-600' 
                      : 'border-black/10 focus:border-black focus:shadow-[0_0_20px_rgba(0,0,0,0.1)]'
                  }`}
                />
                <AnimatePresence>
                  {emailError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full left-0 mt-1 flex items-center gap-1 text-red-700 text-[9px] font-black uppercase tracking-wider"
                    >
                      <AlertCircle size={10} /> {emailError}
                    </motion.div>
                  )}
                  {!emailError && email.length > 5 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40"
                    >
                      <CheckCircle2 size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="px-8 py-4 rounded-xl bg-black text-[#F0B429] font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 min-w-[180px]"
              >
                {loading ? 'Joining...' : <>Join Waitlist <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>

            <div className="relative">
              <div className="flex flex-wrap justify-center gap-2">
                {markets.map((m) => (
                  <motion.button
                    key={m}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setMarket(m);
                      setMarketError(null);
                    }}
                    className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                      market === m 
                        ? 'bg-black text-[#F0B429] border-black shadow-lg' 
                        : 'bg-transparent border-black/20 text-black/60 hover:border-black/50 hover:text-black'
                    }`}
                  >
                    {m}
                  </motion.button>
                ))}
              </div>
              <AnimatePresence>
                {marketError && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex items-center gap-1 text-red-700 text-[9px] font-black uppercase tracking-wider"
                  >
                    <AlertCircle size={10} /> {marketError}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
          
          <p className="mt-12 text-[10px] text-black/50 font-bold tracking-widest uppercase">
            Free to join · No credit card · Instant referral link
          </p>
        </div>
      </div>
    </section>
  );
};
