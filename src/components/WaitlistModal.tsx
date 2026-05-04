import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertCircle, CheckCircle2, ShieldCheck, Mail, User, Briefcase, BarChart3, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

import { signup } from '../lib/api';
import { trackCTA } from '../lib/analytics';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const markets = [
  "Crypto (Perps & Spot)",
  "Forex (FX)",
  "Equities / SPX",
  "Prop Trading Firms",
  "Hedge Fund / Asset Management",
  "DeFi / On-chain",
  "Other"
];

const roles = [
  "Independent Quant Trader",
  "Quant Developer / Researcher",
  "Prop Trader",
  "Quantitative Researcher",
  "Hedge Fund Quant",
  "Algo Trader",
  "Portfolio Manager",
  "Other"
];

export const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    market: '',
    marketOther: '',
    role: '',
    roleOther: '',
    frustration: '',
    consent: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    
    if (!formData.market) newErrors.market = 'Please select your primary market';
    if (!formData.role) newErrors.role = 'Please select your role';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Real API Integration
      await signup({
        email: formData.email,
        source: 'waitlist_modal',
        plan_intent: 'waitlist',
        metadata: {
          name: formData.fullName,
          market: formData.market === 'Other' ? formData.marketOther : formData.market,
          role: formData.role === 'Other' ? formData.roleOther : formData.role,
          frustration: formData.frustration
        }
      });

      trackCTA('waitlist_signup_complete', {
        role: formData.role,
        market: formData.market
      });

      setIsSubmitted(true);
      toast.success('Waitlist application received!');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after closing animation
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        market: '',
        marketOther: '',
        role: '',
        roleOther: '',
        frustration: '',
        consent: true
      });
      setErrors({});
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[#0A101A] border border-[#1A2333] w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Header Decor */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F0B429] via-[#F0B429]/50 to-[#F0B429]" />
            
            <button 
              onClick={handleClose} 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-black text-white mb-3">Join the NEXUS Waitlist</h2>
                      <p className="text-[#7A8BA0] text-sm">Secure early access, verification credits, and Founding Member benefits.</p>
                    </div>

                    <form onSubmit={onFormSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            <User size={12} className="text-[#F0B429]" /> Full Name
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="John Doe"
                            className="w-full bg-black/40 border border-[#1A2333] focus:border-[#F0B429] rounded-xl px-4 py-3 text-sm transition-all outline-none"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            <Mail size={12} className="text-[#F0B429]" /> Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => {
                              setFormData({ ...formData, email: e.target.value });
                              if (errors.email) setErrors(prev => {
                                const next = { ...prev };
                                delete next.email;
                                return next;
                              });
                            }}
                            placeholder="john@example.com"
                            className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-sm transition-all outline-none ${
                              errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-[#1A2333] focus:border-[#F0B429]'
                            }`}
                          />
                          {errors.email && <p className="text-[10px] font-bold text-red-500 mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Market */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            <BarChart3 size={12} className="text-[#F0B429]" /> Primary Market <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={formData.market}
                            onChange={e => setFormData({ ...formData, market: e.target.value })}
                            className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-sm transition-all outline-none appearance-none ${
                              errors.market ? 'border-red-500/50 focus:border-red-500' : 'border-[#1A2333] focus:border-[#F0B429]'
                            }`}
                          >
                            <option value="">Select Market</option>
                            {markets.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          {formData.market === 'Other' && (
                            <input
                              type="text"
                              placeholder="Specify market..."
                              className="w-full mt-2 bg-black/40 border border-[#1A2333] focus:border-[#F0B429] rounded-xl px-4 py-3 text-sm transition-all outline-none"
                              value={formData.marketOther}
                              onChange={e => setFormData({ ...formData, marketOther: e.target.value })}
                            />
                          )}
                          {errors.market && <p className="text-[10px] font-bold text-red-500 mt-1">{errors.market}</p>}
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            <Briefcase size={12} className="text-[#F0B429]" /> Your Role <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                            className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-sm transition-all outline-none appearance-none ${
                              errors.role ? 'border-red-500/50 focus:border-red-500' : 'border-[#1A2333] focus:border-[#F0B429]'
                            }`}
                          >
                            <option value="">Select Role</option>
                            {roles.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                          {formData.role === 'Other' && (
                            <input
                              type="text"
                              placeholder="Specify role..."
                              className="w-full mt-2 bg-black/40 border border-[#1A2333] focus:border-[#F0B429] rounded-xl px-4 py-3 text-sm transition-all outline-none"
                              value={formData.roleOther}
                              onChange={e => setFormData({ ...formData, roleOther: e.target.value })}
                            />
                          )}
                          {errors.role && <p className="text-[10px] font-bold text-red-500 mt-1">{errors.role}</p>}
                        </div>
                      </div>

                      {/* Frustrations */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                          <MessageSquare size={12} className="text-[#F0B429]" /> Common Frustrations
                        </label>
                        <textarea
                          placeholder="What is your biggest frustration with current strategy testing tools?"
                          className="w-full bg-black/40 border border-[#1A2333] focus:border-[#F0B429] rounded-xl px-4 py-3 text-sm transition-all outline-none min-h-[100px] resize-none"
                          value={formData.frustration}
                          onChange={e => setFormData({ ...formData, frustration: e.target.value })}
                        />
                      </div>

                      {/* Consent */}
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="mt-1">
                          <input
                            type="checkbox"
                            checked={formData.consent}
                            onChange={e => setFormData({ ...formData, consent: e.target.checked })}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                            formData.consent ? 'bg-[#F0B429] border-[#F0B429]' : 'bg-black/40 border-[#1A2333] group-hover:border-[#F0B429]/50'
                          }`}>
                            {formData.consent && <CheckCircle2 size={12} className="text-black" />}
                          </div>
                        </div>
                        <span className="text-xs text-[#7A8BA0] font-medium leading-tight">
                          I want to receive early access, verification credits, and product updates.
                        </span>
                      </label>

                      {/* Submit */}
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-4 bg-[#F0B429] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_40px_rgba(240,180,41,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          {loading ? (
                            <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          ) : (
                            "Reserve My Spot – Get Free Verification Credits"
                          )}
                        </button>
                        <p className="text-center text-[10px] text-gray-500 mt-4 font-medium uppercase tracking-widest">
                          Your email is safe. No spam. Ever.
                        </p>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                      <ShieldCheck className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">You're on the list!</h2>
                    <p className="text-[#7A8BA0] font-medium max-w-sm mx-auto mb-10">
                      Thank you! You're in. Check your email for early access details and your verification credits voucher.
                    </p>
                    <button 
                      onClick={handleClose}
                      className="px-10 py-4 bg-[#1A2333] text-white rounded-xl font-bold hover:bg-[#252f3f] transition-all text-sm"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

