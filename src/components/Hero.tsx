import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { 
  AlertCircle, 
  CheckCircle2, 
  Skull, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  ArrowDownRight, 
  ShieldAlert, 
  Search, 
  Activity 
} from 'lucide-react';
import { toast } from 'sonner';

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

const RealityComparison = () => {
  return (
    <div className="relative w-full aspect-[4/5] bg-[#05070A] border border-[#1A2333] rounded-[3rem] overflow-hidden shadow-2xl shadow-[#F0B429]/5">
      {/* Background Grid & Candlesticks (Overall) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-12 h-full w-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-[#7A8BA0] h-full flex flex-col justify-end p-1">
              <div className="w-full bg-[#7A8BA0] opacity-20" style={{ height: `${Math.random() * 40 + 10}%` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Top Half: Beautiful Backtest */}
      <div className="h-1/2 relative border-b border-[#1A2333] bg-gradient-to-b from-[#0A101A] to-transparent overflow-hidden">
        {/* Subtle Candlestick Background */}
        <div className="absolute inset-0 opacity-[0.04] flex items-center justify-around px-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px h-12 bg-green-500" />
              <div className="w-2 h-6 bg-green-500 rounded-sm" />
            </div>
          ))}
        </div>

        <div className="absolute top-8 left-10 z-10 text-left">
          <div className="text-[10px] text-[#F0B429] font-black uppercase tracking-[0.3em] mb-2">THE BEAUTIFUL LIE</div>
          <h3 className="text-3xl font-black text-white font-display uppercase tracking-tight">BACKTEST</h3>
        </div>

        <div className="absolute top-8 right-10 z-10 flex gap-6">
          {[
            { label: 'SHARPE', val: '2.8', color: 'text-green-400' },
            { label: 'WIN RATE', val: '68%', color: 'text-white' },
            { label: 'MAX DD', val: '-8%', color: 'text-white' }
          ].map((m, i) => (
            <div key={i} className="text-right">
              <div className="text-[9px] text-[#7A8BA0] font-black uppercase tracking-wider mb-0.5">{m.label}</div>
              <div className={`text-sm font-black font-mono ${m.color}`}>{m.val}</div>
            </div>
          ))}
        </div>

        {/* Smooth Equity Curve (Top) */}
        <svg viewBox="0 0 400 200" className="absolute bottom-0 left-0 w-full h-[160px]">
          <motion.path
            d="M 0 180 Q 40 170 80 155 T 160 130 T 240 100 T 320 60 T 400 30"
            fill="none"
            stroke="#10B981"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M 0 180 Q 40 170 80 155 T 160 130 T 240 100 T 320 60 T 400 30 L 400 200 L 0 200 Z"
            fill="url(#greenGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 2 }}
          />
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Badges (Top) */}
        <motion.div 
          animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-[15%] bg-[#0D1521]/80 backdrop-blur-md border border-green-500/40 px-4 py-2 rounded-full flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_12px_#10B981]" />
          <span className="text-[10px] text-green-400 font-black uppercase tracking-[0.2em]">OPTIMIZED EDGE</span>
        </motion.div>
      </div>

      {/* Center Transition Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 3, -3, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="relative group cursor-pointer"
        >
          <div className="absolute -inset-6 bg-[#F0B429]/25 blur-2xl rounded-full animate-pulse" />
          <div className="relative bg-[#05070A] border-[3px] border-[#F0B429] p-5 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(240,180,41,0.4)]">
            <Skull className="w-10 h-10 text-[#F0B429] mb-1.5" />
            <div className="text-[10px] text-[#F0B429] font-black uppercase text-center tracking-tighter leading-none">
              NEXUS<br />VERIFIED
            </div>
          </div>
          
          <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 whitespace-nowrap hidden lg:block group-hover:scale-105 transition-transform">
            <div className="bg-[#1A2333]/90 backdrop-blur-xl border-2 border-[#F0B429]/40 px-5 py-3 rounded-2xl shadow-xl">
              <div className="text-[12px] text-[#F0B429] font-black uppercase tracking-widest mb-1">Killed by Real Market Conditions</div>
              <div className="text-[10px] text-[#E8EDF5] font-['JetBrains_Mono'] opacity-80 italic">Overfit artifacts purged from logic.</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Half: Brutal Reality */}
      <div className="h-1/2 relative bg-[#05070A] overflow-hidden">
        {/* Subtle Red Volatility Background */}
        <div className="absolute inset-x-0 top-0 h-full opacity-[0.05] pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-red-600">
            {[...Array(15)].map((_, i) => (
              <rect key={i} x={i * 7} y={Math.random() * 50 + 50} width="2" height={Math.random() * 30 + 10} />
            ))}
          </svg>
        </div>

        <div className="absolute bottom-20 left-10 z-10 text-left">
          <div className="text-[10px] text-red-500 font-black uppercase tracking-[0.3em] mb-2">THE BRUTAL TRUTH</div>
          <h3 className="text-3xl font-black text-red-500 font-display uppercase tracking-tight">LIVE REALITY</h3>
        </div>

        {/* Aggressive Crashing Curve (Bottom) */}
        <svg viewBox="0 0 400 200" className="absolute top-0 left-0 w-full h-full">
          <motion.path
            d="M 0 0 L 80 25 L 120 18 L 160 45 L 180 140 L 220 125 L 280 185 L 400 195"
            fill="none"
            stroke="#EF4444"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1, ease: "anticipate" }}
          />
          <motion.path
            d="M 0 0 L 80 25 L 120 18 L 160 45 L 180 140 L 220 125 L 280 185 L 400 195 L 400 0 L 0 0 Z"
            fill="url(#redGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1.5, delay: 1.5 }}
          />
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* High-Impact Failure Points */}
        {[
          { x: '165px', y: '45px', label: 'FUNDING RATE FLIP', sub: '-41% in 11 days' },
          { x: '215px', y: '125px', label: '45BPS SLIPPAGE', sub: 'Impact: $42k/exec' },
          { x: '275px', y: '180px', label: 'REGIME SHIFT', sub: 'Model Drift: CRITICAL' }
        ].map((ann, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5 + i * 0.4, type: "spring", stiffness: 200 }}
            style={{ left: ann.x, top: ann.y }}
            className="absolute z-10"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-red-600/30 rounded-full animate-ping" />
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_15px_#EF4444] border-2 border-white" />
              <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap">
                <div className="bg-black/90 backdrop-blur-md border border-red-500/50 p-2 rounded shadow-2xl">
                  <div className="text-[9px] text-red-500 font-black uppercase tracking-tighter leading-none mb-1">
                    {ann.label}
                  </div>
                  <div className="text-[8px] text-white font-mono opacity-80 leading-none">
                    {ann.sub}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Aggressive Death Text */}
        <motion.div 
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-28 right-16 z-10 pointer-events-none"
        >
          <div className="text-red-700 font-black text-6xl tracking-tighter uppercase rotate-[-8deg] italic">
            STRATEGY DIED HERE
          </div>
        </motion.div>

        {/* Fail Badges (Bottom) */}
        <div className="absolute bottom-24 right-10 flex flex-col gap-2.5 scale-90 lg:scale-100 items-end">
          {[
            { label: 'OVERFIT DETECTED', icon: ShieldAlert },
            { label: 'EXECUTION FAILED', icon: AlertCircle },
            { label: 'REGIME VULNERABLE', icon: Search }
          ].map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.5 + i * 0.2 }}
              className="bg-red-950/60 border-2 border-red-500/30 px-4 py-2 rounded-xl flex items-center gap-3 backdrop-blur-md shadow-lg"
            >
              <b.icon className="w-4 h-4 text-red-500" />
              <span className="text-[10px] text-red-400 font-black uppercase tracking-[0.2em]">{b.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium Analysis Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-14 border-t-2 border-[#1A2333] bg-[#0A101A] px-8 flex items-center justify-between z-30">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] text-[#7A8BA0] font-black uppercase tracking-widest leading-none mb-1">ROBUSTNESS SCORE</span>
            <span className="text-xl font-black text-red-500 font-mono tracking-tighter leading-none animate-pulse">21 / 100</span>
          </div>
          <div className="h-8 w-px bg-[#1A2333]" />
          <div className="flex flex-col">
            <span className="text-[9px] text-[#7A8BA0] font-black uppercase tracking-widest leading-none mb-1">PREDICTION CONFIDENCE</span>
            <span className="text-sm font-black text-[#F0B429] font-mono leading-none">LOW - HIGH VARIANCE</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-lg">
            <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="text-[10px] text-white font-black uppercase tracking-widest">REALITY DECIMATED REPORT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero = ({ onOpenWaitlist, onOpenCheckout }: { onOpenWaitlist: () => void, onOpenCheckout: () => void }) => {
  return (
    <section className="relative pt-20 pb-16 px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] leading-[1.1] mb-6 font-display"
          >
            AI Floods Market with <br />
            Beautiful Backtest<br />
            <span className="text-[#F0B429] mt-2 block text-left">NEXUS Verifies Which Ones Deserve Capital.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-[#E8EDF5] text-xl font-bold mb-4 leading-tight text-left"
          >
            Independent, Brutal Verification & Trust Layer for Serious Crypto Quants & Prop Traders.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl text-[#7A8BA0] text-lg mb-10 leading-relaxed font-medium text-left"
          >
            Stop burning capital on pretty backtests that collapse under live market risk. AI makes strategy creation cheap — but markets punish weakness with real losses. NEXUS is the ruthless verification layer: exposing hidden fragility with execution reality, regime stress, and funding simulation. Only strategies that survive our kill‑tests deserve capital.
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
                <div className="flex flex-col text-left">
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

        {/* Right Visual Panel: Reality Comparison */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#F0B429]/20 to-transparent blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
          <RealityComparison />
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
