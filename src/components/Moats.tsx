import React from 'react';

export const Moats = () => (
  <section className="py-24 px-10 max-w-7xl mx-auto">
    <h2 className="text-5xl font-bold tracking-tighter mb-16">Four moats. 12–18 months to replicate each.</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { title: 'Evidence', desc: '50,702 Experiments Already Run', time: '12–18 months' },
        { title: 'Standard', desc: 'NEXUS Certified Gold Standard', time: 'Network effect' },
        { title: 'Network', desc: 'Two-Sided Marketplace Flywheel', time: 'Compounds quarterly' },
        { title: 'Integration', desc: 'Broker API Lock-In', time: 'Increases over time' },
      ].map((moat, i) => (
        <div key={i} className="bg-[#0D1117] p-8 rounded-xl border border-[#1A2333]">
          <div className="font-['JetBrains_Mono'] text-[10px] text-[#F0B429] mb-3">LAYER 0{i+1} — {moat.title}</div>
          <h3 className="text-xl font-bold mb-2">{moat.desc}</h3>
          <div className="text-xs text-[#FF4444] bg-[rgba(255,68,68,0.1)] px-2 py-1 rounded inline-block mt-2">{moat.time} to replicate</div>
        </div>
      ))}
    </div>
  </section>
);
