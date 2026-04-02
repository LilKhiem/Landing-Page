import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { signup } from '../lib/api';
import { trackCTA } from '../lib/analytics';
import { toast } from 'sonner';

interface BetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  source: string;
}

export const BetaModal = ({ isOpen, onClose, title = "NEXUS Marketplace and live exports are in private beta.", source }: BetaModalProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      trackCTA('navbar_join_waitlist', { source, email });
      await signup({ email, source, plan_intent: 'waitlist' });
      setSuccess(true);
      toast.success('You’re in. Check your email for your invite link.');
      setTimeout(() => {
        onClose();
        window.location.href = `/referral?ref=ALPHA_QUANT`; // Mock referral redirect
      }, 2000);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0A101A] border border-[#1A2333] rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F0B429]/10 blur-[60px] rounded-full pointer-events-none"></div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#4A5568] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F0B429]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-[#F0B429]" />
              </div>
              
              <h3 className="text-2xl font-bold font-display mb-4 tracking-tight">{title}</h3>
              <p className="text-[#7A8BA0] text-sm mb-8 leading-relaxed">
                Join the waitlist to get early access to the marketplace, live exports, and advanced quant tools.
              </p>

              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex flex-col items-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-500 mb-3" />
                  <div className="text-green-500 font-bold uppercase tracking-widest text-xs">Success!</div>
                  <div className="text-white/80 text-xs mt-1">Redirecting to referral dashboard...</div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A5568]" />
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-[#1A2333] rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#F0B429]/50 transition-colors"
                    />
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full py-4 bg-[#F0B429] text-black rounded-xl font-black text-xs tracking-widest uppercase hover:shadow-[0_0_30px_rgba(240,180,41,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Join Waitlist'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
