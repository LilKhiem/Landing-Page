import React from 'react';
import { motion } from 'motion/react';

export const Features = () => (
  <section id="features" className="py-24 px-10 max-w-7xl mx-auto">
    <div className="mb-16">
      <div className="font-['JetBrains_Mono'] text-[11px] tracking-[0.2em] uppercase text-[#F0B429] mb-4">Features</div>
      <h2 className="text-5xl font-bold tracking-tighter mb-5">Everything you need.<br />Nothing you don't.</h2>
      <p className="text-[#7A8BA0] text-base leading-relaxed max-w-xl">Built for quant traders, algorithmic developers, and anyone who wants institutional-grade strategy validation.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-[#1A2333] rounded-xl overflow-hidden">
      {[
        { tag: 'Core — P0', title: 'NL2S — Natural Language to Strategy', desc: 'The breakthrough feature. Describe your trading idea in plain English. NEXUS translates it into executable code, validates it, and delivers a certified result.', color: 'text-[#F0B429]' },
        { tag: 'Core — P0', title: 'Continuous Validation Loop', desc: 'Every edit to your strategy triggers an automatic re-validation. Real-time health dashboard shows Green, Yellow, or Red across all 5 validation layers.', color: 'text-[#00D4FF]' },
        { tag: 'Core — P0', title: 'Agentic Research Crew', desc: '24 AI agents working in parallel. ATLAS generates hypotheses, ECHO cross-validates, CIPHER assesses risk, SYNTHESIS enforces the constitution.', color: 'text-[#00E676]' },
        { tag: 'Growth — P1', title: 'Strategy Marketplace', desc: 'Publish your certified strategies. Buy proven ones. Every listing comes with the full validation chain — not just metrics, but proof.', color: 'text-[#A78BFA]' },
        { tag: 'Growth — P1', title: 'Evidence Ledger', desc: 'Every experiment, every result, every kill — logged immutably with SHA-256 fingerprints. 50,702+ records already.', color: 'text-[#F0B429]' },
        { tag: 'Growth — P1', title: 'Collaborative Research Rooms', desc: 'Real-time collaboration on strategy research. Comment on equity curves, fork successful configurations, and build together.', color: 'text-[#00D4FF]' },
        { tag: 'Institutional — P2', title: 'White-Label Risk OS', desc: 'Banks, hedge funds, and prop firms deploy NEXUS under their own brand. Custom risk parameters, private evidence ledgers, API access.', color: 'text-[#A78BFA]' },
        { tag: 'Institutional — P2', title: 'Strategy Audit Service', desc: 'Submit any existing strategy — yours or one you\'re evaluating. NEXUS runs the full 5-layer certification and delivers an institutional-grade report.', color: 'text-[#00E676]' },
      ].map((feat, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-[#0D1117] p-9 relative"
        >
          <div className={`font-['JetBrains_Mono'] text-[10px] tracking-[0.15em] uppercase mb-4 px-2.5 py-1 rounded inline-block bg-[rgba(240,180,41,0.12)] ${feat.color}`}>{feat.tag}</div>
          <h3 className="text-2xl font-bold tracking-tighter mb-3">{feat.title}</h3>
          <p className="text-sm text-[#7A8BA0] leading-relaxed mb-5">{feat.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);
