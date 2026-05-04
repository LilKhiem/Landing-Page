import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Zap, BarChart3, Binary, AlertCircle, TrendingDown } from 'lucide-react';

const pains = [
  {
    icon: ShieldAlert,
    title: "Funding Rates Are Silently Bleeding You Dry",
    desc: "Perps aren't spot trading. Your 'infinite alpha' disappears the second funding rates flip against you. One violent 0.1%+ swing can wipe days of profit in hours. NEXUS models real-time funding decay so you see the bleeding before it kills your account.",
    tag: "Execution Risk"
  },
  {
    icon: Zap,
    title: "Slippage & Partial Fills Are Quiet Account Killers",
    desc: "Backtests assume perfect fills. Reality? Deep order-book wicks and liquidation cascades slaughter your entries. Most strategies lose 30-60% of edge live. NEXUS simulates brutal, venue-specific execution—not optimistic averages.",
    tag: "Liquidity Gap"
  },
  {
    icon: BarChart3,
    title: "Regime Shifts Will Destroy Your Edge Overnight",
    desc: "Born in a bull market? It will bleed out in ranging chop or high-vol deleveraging. Crypto doesn't stay in one regime. NEXUS stress-tests across crashes and liquidity black holes so you're not blindsided again.",
    tag: "Market Context"
  },
  {
    icon: Binary,
    title: "The Overfitting Illusion & False Confidence Trap",
    desc: "You tweaked parameters until it looked perfect. Now you have beautiful curve-fit garbage that will blow up live. NEXUS runs probabilistic Sharpe and Monte Carlo attacks to expose hidden overfitting before you risk real capital.",
    tag: "Statistical Bias"
  }
];

export const PainPoints = ({ onOpenWaitlist }: { onOpenWaitlist?: () => void }) => {
  return (
    <section className="py-24 px-6 md:px-10 bg-[#020408] relative overflow-hidden">
      {/* Background Danger Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-950/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black tracking-widest uppercase mb-6"
          >
            <AlertCircle className="w-3 h-3" />
            Fatal Execution Errors
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-[-0.04em] mb-6 font-display text-white max-w-4xl mx-auto leading-[1.1]"
          >
            Your Strategy Will <span className="text-red-600">Die in Live Crypto</span> — Here’s Exactly Why.
          </motion.h2>
          <p className="text-[#7A8BA0] font-['JetBrains_Mono'] text-sm uppercase tracking-widest max-w-2xl mx-auto">
            95% of prop challenge strategies fail within 30 days. The brutal truth most quants refuse to accept.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map((pain, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="p-8 rounded-[2rem] border border-[#1A2333] bg-[#0A101A]/50 backdrop-blur-sm hover:border-red-600/40 hover:shadow-[0_0_40px_rgba(220,38,38,0.1)] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-[8px] font-black text-red-600/40 uppercase tracking-widest border border-red-600/20 px-2 py-0.5 rounded-full">
                Real 2026
              </div>

              <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center mb-8 group-hover:bg-red-600/20 group-hover:border-red-600/40 transition-all duration-500 relative">
                <pain.icon className="w-7 h-7 text-red-600 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-red-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="text-[10px] font-black text-[#F0B429] uppercase tracking-[0.2em] mb-3">
                {pain.tag}
              </div>

              <h4 className="text-xl font-bold mb-4 font-display text-white leading-tight">
                {pain.title.split(' ').map((word, idx) => (
                  <span key={idx} className={['Bleeding', 'Killers', 'Destroy', 'Trap', 'Slaughter', 'Dead'].includes(word.replace(/[.,]/g,'')) ? 'text-red-500' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h4>
              
              <p className="text-sm text-[#7A8BA0] leading-relaxed font-medium">
                {pain.desc}
              </p>

              {/* Decorative mini chart bg */}
              <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <TrendingDown className="w-32 h-32 text-red-600" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 pt-10 border-t border-[#1A2333] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
             <div className="p-3 bg-red-500/10 rounded-xl">
               <AlertCircle className="w-6 h-6 text-red-500" />
             </div>
             <div>
               <div className="text-white font-bold">The Hardest Truth in Trading</div>
               <div className="text-xs text-[#7A8BA0]">Most alpha isn't alpha. It's lucky gambling masked as statistics.</div>
             </div>
          </div>
          <button 
            onClick={() => onOpenWaitlist?.()}
            className="px-8 py-3 rounded-xl bg-white text-black font-black text-xs tracking-widest uppercase hover:bg-[#F0B429] transition-all shadow-xl"
          >
            Verify Your Strategy Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

