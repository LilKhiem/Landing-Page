import React from 'react';
import { Pencil, Beaker, CheckSquare } from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorks = () => (
  <section id="how" className="py-24 px-10 max-w-7xl mx-auto">
    <div className="mb-16">
      <h2 className="font-['Syne'] text-5xl font-extrabold tracking-tighter mb-5">From idea to certified strategy.<br />In 3 minutes.</h2>
      <p className="text-[#7A8BA0] text-base leading-relaxed max-w-xl">No code required. No quant PhD needed. Describe your strategy in plain English — NEXUS does the rest.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { 
          num: '01', 
          icon: Pencil, 
          title: 'Describe in English', 
          desc: 'Type what you want: asset, timeframe, style, risk tolerance. NEXUS understands the full context — "mean reversion EURUSD, Asia session, max 3% drawdown" is enough to start.', 
          time: '~10 seconds' 
        },
        { 
          num: '02', 
          icon: Beaker, 
          title: 'NEXUS Researches', 
          desc: '24 AI agents scan 50,000+ validated experiments, generate code, run IS→WFA→OOS validation, stress test at 2× costs, and apply 8 hard certification gates autonomously.', 
          time: '~2 minutes' 
        },
        { 
          num: '03', 
          icon: CheckSquare, 
          title: 'Certified or Killed', 
          desc: 'Either your strategy passes all 8 gates and is certified deployment-ready — or it\'s killed with exact reasons. No cherry-picking. No false positives. The gate doesn\'t negotiate.', 
          time: '~30 seconds' 
        },
      ].map((step, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className="bg-[#0D1117] p-8 rounded-xl border border-[#1A2333] relative"
        >
          <div className="font-['JetBrains_Mono'] text-[11px] text-[#00D4FF] tracking-widest mb-6">STEP {step.num}</div>
          <step.icon className="w-8 h-8 text-[#00D4FF] mb-6" />
          <h3 className="font-['Syne'] text-2xl font-bold tracking-tighter mb-4">{step.title}</h3>
          <p className="text-sm text-[#7A8BA0] leading-relaxed mb-6">{step.desc}</p>
          <div className="font-['JetBrains_Mono'] text-[10px] text-[#00D4FF] bg-[rgba(0,212,255,0.1)] px-3 py-1 rounded inline-block">{step.time}</div>
        </motion.div>
      ))}
    </div>
  </section>
);
