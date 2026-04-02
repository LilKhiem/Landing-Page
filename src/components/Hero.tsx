import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useFormValidation } from '../hooks/useFormValidation';

const prompts = {
  "Mean Reversion": {
    text: "mean reversion USDJPY, London session, Sharpe > 2, MaxDD < 2%",
    logs: [
      "[04:21:02] ATLAS generating candidate pool (n=1,024)...",
      "[04:21:15] ECHO dual-model validation active...",
      "[04:21:45] Metrics: IS: 2.4 | WFA: 2.1 | OOS: 1.9 | LOYO: PASS",
      "[04:22:10] Stress Test: 2x Costs | DSR: 0.94 | PBO: 0.08",
      "[04:23:15] SYNTHESIS gate check: 8/8 PASSED"
    ]
  },
  "Momentum": {
    text: "momentum breakout BTCUSD, 1h timeframe, Volatility adjusted, WinRate > 60%",
    logs: [
      "[10:05:12] ATLAS scanning volatility regimes...",
      "[10:05:30] ECHO testing breakout sensitivity...",
      "[10:06:10] Metrics: IS: 3.1 | WFA: 2.8 | OOS: 2.5 | LOYO: PASS",
      "[10:06:45] Stress Test: Slippage 5bps | DSR: 0.96 | PBO: 0.04",
      "[10:07:20] SYNTHESIS gate check: 8/8 PASSED"
    ]
  },
  "Portfolio": {
    text: "multi-asset portfolio, SPY/TLT/GLD, Risk Parity, Monthly rebalance",
    logs: [
      "[14:10:05] ATLAS optimizing covariance matrix...",
      "[14:10:25] ECHO running historical stress scenarios...",
      "[14:11:15] Metrics: Sharpe: 1.8 | Sortino: 2.2 | MaxDD: 8%",
      "[14:11:50] Stress Test: 2008/2020 Replay | PASS",
      "[14:12:30] SYNTHESIS gate check: 8/8 PASSED"
    ]
  }
};

const Sparkline = ({ data }: { data: any[] }) => (
  <div className="h-6 w-full mt-2 opacity-50">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line type="monotone" dataKey="v" stroke="#F0B429" strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

import { trackCTA } from '../lib/analytics';
import { signup } from '../lib/api';
import { toast } from 'sonner';

export const Hero = ({ onOpenWaitlist }: { onOpenWaitlist: () => void }) => {
  const [activeTab, setActiveTab] = useState<keyof typeof prompts>("Mean Reversion");
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const { email, emailError, handleEmailChange, handleSubmit } = useFormValidation();

  useEffect(() => {
    setDisplayedLogs([]);
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < prompts[activeTab].logs.length) {
        setDisplayedLogs(prev => [...prev, prompts[activeTab].logs[i]]);
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [activeTab]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(async (validEmail) => {
      setLoading(true);
      try {
        trackCTA('hero_get_early_access', { email: validEmail });
        await signup({ email: validEmail, source: 'hero', plan_intent: 'waitlist' });
        toast.success('You’re in. Check your email for your invite link.');
        setTimeout(() => {
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
    <section className="relative pt-20 pb-16 px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-left">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-block px-4 py-1 border border-[#F0B429]/30 bg-[#F0B429]/10 text-[#F0B429] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full"
          >
            LAUNCHING APRIL 5, 2026 — JOIN THE WAITLIST
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.0] mb-6 font-display"
          >
            NEXUS IDE — 3 MINUTES. <br />
            <span className="text-[#F0B429]">Build Certified Alpha For Any Market</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-[#7A8BA0] text-xl mb-10 leading-relaxed font-light"
          >
            The first AI IDE that turns your idea into a certified, fully backtested strategy with live equity & drawdown charts in any market.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-md flex flex-col gap-4 mb-4"
          >
            <form onSubmit={onFormSubmit} noValidate className="w-full">
              <div className={`w-full flex p-1 bg-[#0A101A] border rounded-lg transition-all duration-300 relative ${
                emailError 
                  ? 'border-red-500/50 focus-within:border-red-500' 
                  : 'border-[#1A2333] focus-within:border-[#F0B429] focus-within:shadow-[0_0_15px_rgba(240,180,41,0.2)]'
              }`}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="Enter your email address" 
                  className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-[#F0B429] text-black px-6 py-3 rounded-md font-bold text-sm hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center min-w-[160px]"
                >
                  {loading ? 'Joining...' : 'Get Early Access →'}
                </button>
                
                <AnimatePresence>
                  {emailError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 flex items-center gap-1 text-red-500 text-[10px] font-bold uppercase tracking-wider"
                    >
                      <AlertCircle size={10} /> {emailError}
                    </motion.div>
                  )}
                  {!emailError && email.length > 5 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-[160px] top-1/2 -translate-y-1/2 text-[#27C93F]"
                    >
                      <CheckCircle2 size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
            <p className="text-[11px] text-[#4A5568] font-['JetBrains_Mono'] uppercase tracking-widest mt-4">
              Free to join · No credit card · Launch: April 5, 2026
            </p>
          </motion.div>
        </div>

        {/* Interactive Prompt Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#F0B429]/20 to-transparent blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-[#05070A] border border-[#1A2333] rounded-xl overflow-hidden shadow-2xl shadow-[#F0B429]/5">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1A2333] bg-[#0D1521]">
              <div className="flex gap-4">
                {(Object.keys(prompts) as Array<keyof typeof prompts>).map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest transition-colors ${activeTab === tab ? 'text-[#F0B429]' : 'text-[#4A5568] hover:text-white'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
              </div>
            </div>
            <div className="p-6 text-left font-['JetBrains_Mono'] text-sm leading-relaxed min-h-[320px] flex flex-col">
              <div className="flex gap-3 mb-6">
                <span className="text-[#F0B429]">❯</span>
                <span className="text-white">
                  {prompts[activeTab].text}
                  <span className="inline-block w-2 h-4 bg-[#F0B429] ml-1 animate-pulse align-middle"></span>
                </span>
              </div>
              <div className="space-y-2 text-[12px] flex-1">
                <AnimatePresence mode="popLayout">
                  {displayedLogs.map((log, idx) => (
                    <motion.div 
                      key={log}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[#4A5568]"
                    >
                      {log.includes('PASSED') || log.includes('CERTIFIED') ? (
                        <span className="text-[#27C93F]">{log}</span>
                      ) : log.includes('ATLAS') || log.includes('ECHO') || log.includes('SYNTHESIS') ? (
                        <>
                          {log.split(' ').map((word, i) => 
                            ['ATLAS', 'ECHO', 'SYNTHESIS'].includes(word) ? 
                            <span key={i} className="text-[#F0B429]">{word} </span> : 
                            word + ' '
                          )}
                        </>
                      ) : log}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {!isTyping && displayedLogs.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-[#27C93F] font-bold"
                  >
                    STRATEGY CERTIFIED ✓ — Deployment Ready
                  </motion.div>
                )}
              </div>
              <div className="mt-auto pt-4 flex justify-end">
                <div className="bg-[#F0B429]/10 border border-[#F0B429]/20 px-3 py-1 rounded text-[10px] text-[#F0B429] font-bold tracking-widest uppercase">
                  Validated in 2m 47s
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Metrics Strip as Micro-Dashboard */}
      <div className="w-full max-w-7xl mt-20 grid grid-cols-2 md:grid-cols-5 gap-4 border-t border-[#1A2333] pt-10">
        {[
          { label: "EXPERIMENTS VALIDATED", value: "50,817", trend: [{v:10},{v:15},{v:12},{v:18},{v:25},{v:22},{v:30}], hint: "Total unique strategies tested across all market regimes." },
          { label: "KILL RATE", value: "97%", trend: [{v:95},{v:96},{v:97},{v:97},{v:98},{v:97},{v:97}], hint: "97% of tested ideas never reach certification – by design." },
          { label: "CERTIFIED CHAMPIONS", value: "11", trend: [{v:2},{v:3},{v:5},{v:6},{v:8},{v:9},{v:11}], hint: "Institutional-grade strategies currently in live deployment." },
          { label: "IDEA → CERTIFIED", value: "3 min", trend: [{v:10},{v:8},{v:7},{v:5},{v:4},{v:3},{v:3}], hint: "Average time from plain English prompt to certified result." },
          { label: "REPLACED AT", value: "$99/MO", trend: [{v:50},{v:50},{v:50},{v:50},{v:50},{v:50},{v:50}], hint: "Replaces a $500K/year quant team for the cost of a SaaS subscription." }
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5 }}
            className="bg-[#0A101A] border border-[#1A2333] p-5 rounded-xl hover:border-[#F0B429]/50 transition-all group relative"
          >
            <div className="text-[#F0B429] text-3xl font-bold font-display mb-1 tracking-tight">{stat.value}</div>
            <div className="text-[9px] text-[#4A5568] font-bold tracking-widest uppercase leading-tight mb-2">{stat.label}</div>
            <Sparkline data={stat.trend} />
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-[#0D1521] border border-[#1A2333] rounded-lg text-[10px] text-[#7A8BA0] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
              {stat.hint}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
