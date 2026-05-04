import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const prompts = {
  "Mean Reversion": {
    text: "mean reversion USDJPY, London session, target Sharpe > 2, MaxDD < 3%, min 500 trades.",
    logs: [
      "NEXUS Chat ›",
      "You: Build a mean‑reversion strategy on USDJPY, London session only.",
      "NEXUS: Analyzing. Most backtests ignore real slippage. I'll stress-test this.",
      "",
      "USER_PROMPT:",
      "\"Mean reversion USDJPY, London session, target Sharpe > 2, MaxDD < 3%\"",
      "",
      "AGENT_LOGS:",
      "[ATLAS] Scanning regime shifts (2018-2026)...",
      "[ECHO] Running walk‑forward validation...",
      "[DELTA] Injecting 45bps slippage & funding flips...",
      "[SYNTH] Aggregating gates and computing robustness...",
      "",
      "VALIDATION_GATES:",
      "IS_PASS ✓  WFA_PASS ✓  OOS_FAIL ✗  COST_STRESS FAIL ✗",
      "",
      "NEXUS: Your strategy died in the gauntlet. Reason: Profit was 90% funding-dependent. In a regime flip, you bleed 4.5% daily.",
      "REPORT: Kill report generated. Evidence trail stored."
    ]
  },
  "Momentum": {
    text: "momentum breakout BTCUSD, 1h timeframe, Volatility adjusted, WinRate > 60%",
    logs: [
      "NEXUS Chat ›",
      "You: Create a momentum breakout strategy for BTCUSD.",
      "NEXUS: Initializing. Probing parameter space for overfit signatures.",
      "",
      "USER_PROMPT:",
      "\"momentum breakout BTCUSD, 1h timeframe, Volatility adjusted\"",
      "",
      "AGENT_LOGS:",
      "[ATLAS] Scanning volatility regimes...",
      "[ECHO] Testing liquidation cascade sensitivity...",
      "[DELTA] Stress testing slippage 5bps + Binance wick simulation...",
      "[SYNTH] Computing robustness score...",
      "",
      "VALIDATION_GATES:",
      "IS_PASS ✓  WFA_PASS ✓  OOS_PASS ✓  COST_STRESS ✓  ROBUSTNESS 0.94",
      "",
      "STRATEGY_CERTIFIED ✓",
      "REPORT: Interactive equity & drawdown charts generated. Certified Badge issued."
    ]
  },
  "Portfolio": {
    text: "multi-asset portfolio, ETH/SOL/BTC, Risk Parity, Monthly rebalance",
    logs: [
      "NEXUS Chat ›",
      "You: Optimize a multi-asset crypto portfolio.",
      "NEXUS: Processing. Running historical stress scenarios and correlation breakdowns.",
      "",
      "USER_PROMPT:",
      "\"multi-asset portfolio, ETH/SOL/BTC, Risk Parity\"",
      "",
      "AGENT_LOGS:",
      "[ATLAS] Optimizing covariance matrix...",
      "[ECHO] Running 2022/2026 Replay stress test...",
      "[DELTA] Liquidity vacuum stress test...",
      "[SYNTH] Aggregating gates...",
      "",
      "VALIDATION_GATES:",
      "SHARPE: 1.8 | SORTINO: 2.2 | MAXDD: 8% | PASS",
      "",
      "STRATEGY_CERTIFIED ✓",
      "REPORT: Interactive equity & drawdown charts generated. Research trail stored."
    ]
  }
};

const Counter = ({ value, isVisible }: { value: string, isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  if (typeof value !== 'string') return null;
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const hasComma = value.includes(',');
  const suffix = value.replace(/[0-9,]|^\$/g, '');
  const prefix = value.startsWith('$') ? '$' : '';

  useEffect(() => {
    if (!isVisible || isNaN(numericValue)) return;

    let startTime: number;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const currentCount = Math.floor(progress * numericValue);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, numericValue]);

  if (isNaN(numericValue) || value === "24/7") return <span>{value}</span>;

  return (
    <span>
      {prefix}
      {hasComma ? count.toLocaleString() : count}
      {suffix}
    </span>
  );
};

interface StatProps {
  value: string;
  label: string;
  description: string;
}

const StatCard: React.FC<{ stat: StatProps, index: number }> = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      whileHover="hover"
      className="group relative flex flex-col bg-[#0A101A] border border-[#1A2333] p-8 rounded-[2.5rem] transition-all duration-500 hover:border-[#F0B429]/40 hover:shadow-[0_0_50px_rgba(240,180,41,0.1)] h-full overflow-hidden"
    >
      <div className="relative mb-6">
        <motion.div 
          variants={{
            hover: { 
              scale: 1.05, 
              filter: "drop-shadow(0 0 30px rgba(240, 180, 41, 0.8))"
            }
          }}
          className="text-[#F0B429] text-5xl md:text-6xl font-black font-display tracking-tighter transition-all duration-300"
        >
          <Counter value={stat.value} isVisible={isInView} />
        </motion.div>
        
        {/* Animated Underline */}
        <motion.div 
          initial={{ scaleX: 0 }}
          variants={{
            hover: { scaleX: 1 }
          }}
          className="absolute -bottom-2 left-0 right-12 h-[3px] bg-gradient-to-r from-[#F0B429] to-transparent origin-left transition-transform duration-500 ease-out"
        />
      </div>

      <div className="text-[13px] font-black text-white uppercase tracking-[0.2em] mb-4 leading-tight group-hover:text-[#F0B429] transition-colors">
        {stat.label}
      </div>

      <div className="text-[11px] text-[#7A8BA0] font-medium leading-relaxed group-hover:text-gray-300 transition-colors">
        {stat.description}
      </div>

      {/* Subtle background pulse animation on hover */}
      <motion.div 
        variants={{
          hover: { opacity: 1, scale: 1.4 }
        }}
        initial={{ opacity: 0, scale: 1 }}
        className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#F0B429]/[0.05] rounded-full blur-[80px] pointer-events-none transition-all duration-700"
      />
    </motion.div>
  );
};

import { trackCTA } from '../lib/analytics';
import { signup } from '../lib/api';
import { toast } from 'sonner';

export const Hero = ({ onOpenWaitlist, onOpenCheckout }: { onOpenWaitlist: () => void, onOpenCheckout: () => void }) => {
  const [activeTab, setActiveTab] = useState<keyof typeof prompts>("Mean Reversion");
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

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

  return (
    <section className="relative pt-20 pb-16 px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.0] mb-6 font-display"
          >
            We Kill Your Strategy <br />
            <span className="text-[#F0B429]">Before the Market Does.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-[#E8EDF5] text-xl font-bold mb-4 leading-tight"
          >
            Independent, Brutal Verification for Serious Crypto Quants & Prop Traders.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl text-[#7A8BA0] text-lg mb-10 leading-relaxed font-medium"
          >
            Stop losing money on pretty backtests that fail the moment real capital is deployed. NEXUS exposes hidden weaknesses with realistic execution, regime stress, and funding simulation — so you only trade what actually survives.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="w-full max-w-lg flex flex-col gap-6"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onOpenWaitlist()}
                className="bg-[#F0B429] text-black px-10 py-5 rounded-2xl font-black text-sm tracking-widest uppercase hover:shadow-[0_0_50px_rgba(240,180,41,0.5)] transition-all active:scale-[0.98] flex items-center justify-center min-w-[280px]"
              >
                JOIN WAITLIST – GET FREE VERIFICATION CREDITS
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Opening Interactive Demo...");
                }}
                className="bg-transparent border border-[#1A2333] text-white px-10 py-5 rounded-2xl font-bold text-sm tracking-widest uppercase hover:border-[#F0B429] transition-colors active:scale-[0.98] flex items-center justify-center whitespace-nowrap"
              >
                WATCH DEMO
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-[#0A101A] flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <p className="text-[11px] text-white font-bold uppercase tracking-widest">
                      12,402 quants joined
                    </p>
                  </div>
                  <p className="text-[10px] text-[#4A5568] font-['JetBrains_Mono'] mt-0.5">
                    Verified Alpha. Zero Hallucinations.
                  </p>
                </div>
              </div>
            </div>
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
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[#4A5568]"
                    >
                      {log === "NEXUS Chat ›" ? (
                        <span className="text-[#F0B429] font-bold">{log}</span>
                      ) : (typeof log === 'string' && log.startsWith("You:")) ? (
                        <span className="text-white"><span className="text-[#F0B429]">You:</span> {log.replace("You:", "")}</span>
                      ) : (typeof log === 'string' && log.startsWith("NEXUS:")) ? (
                        <span className="text-[#7A8BA0]"><span className="text-[#F0B429]">NEXUS:</span> {log.replace("NEXUS:", "")}</span>
                      ) : (typeof log === 'string' && (log.includes('✓') || log.includes('PASSED') || log.includes('CERTIFIED'))) ? (
                        <span className="text-[#27C93F]">{log}</span>
                      ) : (typeof log === 'string' && (log.includes('✗') || log.includes('FAIL') || log.includes('Kill') || log.includes('died'))) ? (
                        <span className="text-red-500">{log}</span>
                      ) : (typeof log === 'string' && (log.includes('[ATLAS]') || log.includes('[ECHO]') || log.includes('[DELTA]') || log.includes('[SYNTH]'))) ? (
                        <>
                          {log.split(' ').map((word, i) => 
                            ['[ATLAS]', '[ECHO]', '[DELTA]', '[SYNTH]'].includes(word) ? 
                            <span key={i} className="text-[#F0B429]">{word} </span> : 
                            word + ' '
                          )}
                        </>
                      ) : (typeof log === 'string' && log.endsWith(':')) ? (
                        <span className="text-[#F0B429] font-bold">{log}</span>
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

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mt-32 mb-12 px-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-black text-white uppercase tracking-[0.2em] font-display text-center lg:text-left"
        >
          Battle-Tested by Thousands in <span className="text-[#F0B429]">2026 Crypto Markets</span>
        </motion.h2>
      </div>

      {/* Metrics Strip */}
      <div className="w-full max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { 
            value: "50,817", 
            label: "EXPERIMENTS VALIDATED", 
            description: "Real strategies brutally tested across perps, funding regimes, and live-like execution conditions." 
          },
          { 
            value: "97%", 
            label: "KILL RATE", 
            description: "By design. 97% of tested ideas are eliminated before they can destroy capital." 
          },
          { 
            value: "11", 
            label: "CERTIFIED CHAMPIONS", 
            description: "Institutional-grade strategies currently surviving live deployment in today’s volatile markets." 
          },
          { 
            value: "24/7", 
            label: "R&D VALIDATION LOOP", 
            description: "Continuous regime monitoring, execution simulation, and robustness re-testing — so your edge never goes blind." 
          },
          { 
            value: "$19/MO", 
            label: "REPLACED AT", 
            description: "The average monthly cost of prop failures, blown accounts, and dead strategies we help you avoid." 
          }
        ].map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
};
