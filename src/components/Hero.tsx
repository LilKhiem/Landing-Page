import React from 'react';
import { motion } from 'motion/react';

export const Hero = ({ onOpenWaitlist }: { onOpenWaitlist: () => void }) => (
  <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 text-center z-10">
    <div className="inline-flex items-center gap-2 bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] px-4 py-1.5 rounded-full font-['JetBrains_Mono'] text-[11px] text-[#00D4FF] tracking-widest uppercase mb-8">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse"></span>
      Launching April 5, 2026 — Join the Waitlist
    </div>

    <h1 className="text-6xl md:text-8xl font-bold leading-[0.95] tracking-tighter mb-7">
      <span className="text-[#7A8BA0]">Turn Your Trading Idea into</span><br />
      <span className="text-[#00D4FF]">Certified Alpha In Just 3 Minutes</span><br />
      <span className="text-[#7A8BA0]">Across Any Market</span>
    </h1>

    <p className="text-lg text-[#7A8BA0] max-w-2xl leading-relaxed mb-6">
      The first AI platform that turns plain English into validated, deployment-ready trading strategies. Powered by 50,000+ experiments.
    </p>

    <div className="flex flex-col gap-4 max-w-md w-full mb-12">
      <div className="flex gap-2">
        <input type="email" className="flex-1 bg-[#0D1117] border border-[#222E40] rounded px-4 py-3 text-sm focus:border-[#00D4FF] outline-none" placeholder="your@email.com" />
        <button onClick={onOpenWaitlist} className="bg-[#F0B429] text-black font-bold px-7 py-3 rounded hover:opacity-90 transition">Get Early Access →</button>
      </div>
      <p className="text-[10px] text-[#3A4A5C] font-['JetBrains_Mono'] uppercase tracking-widest">Free to join · No credit card · Launch: April 5, 2026</p>
    </div>

    {/* Metric Strip */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 border-t border-[#1A2333] pt-12 mb-12">
      {[
        { val: '50,707', label: 'Experiments' },
        { val: '97%', label: 'Kill Rate' },
        { val: '11', label: 'Champions' },
        { val: '3 min', label: 'Idea → Alpha' },
        { val: '$500K', label: 'Value' },
      ].map((stat, i) => (
        <div key={i} className="bg-[#0D1117] border border-[#1A2333] p-4 rounded-lg">
          <div className="text-xl font-bold text-[#00D4FF]">{stat.val}</div>
          <div className="text-[10px] text-[#3A4A5C] font-['JetBrains_Mono'] uppercase tracking-widest mt-1">{stat.label}</div>
          {/* Placeholder for sparkline */}
          <div className="h-4 w-full bg-[#1A2333] mt-2 rounded"></div>
        </div>
      ))}
    </div>

    {/* Code Window */}
    <motion.div 
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      className="max-w-3xl w-full bg-[#080B10] border border-[#1A2333] rounded-xl p-6 shadow-2xl shadow-[#00D4FF]/10"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="font-['JetBrains_Mono'] text-sm text-[#7A8BA0] text-left">
        <p>$ nexus validate --strategy "mean-reversion-v1"</p>
        <p className="text-[#00D4FF]">✓ Strategy parsed</p>
        <p className="text-[#00D4FF]">✓ 50,000 backtests completed</p>
        <p className="text-[#00D4FF]">✓ Robustness check passed</p>
        <div className="w-full h-1 bg-[#1A2333] mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-[#00D4FF] w-3/4 animate-pulse"></div>
        </div>
        <p className="text-xs mt-2">Validating... 2m 47s</p>
      </div>
    </motion.div>
  </div>
);
