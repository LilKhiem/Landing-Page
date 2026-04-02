import React from 'react';

import { trackCTA } from '../lib/analytics';

export const Footer = ({ onOpenWaitlist }: { onOpenWaitlist?: () => void }) => {
  const handleJoinWaitlist = () => {
    trackCTA('footer_join_waitlist');
    onOpenWaitlist?.();
  };

  return (
    <footer className="border-t border-[#1A2333] py-12 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-8 mb-12">
          <div className="font-display text-lg font-bold tracking-tight">NEXUS<span className="text-[#F0B429]">IDE</span> <span className="text-[#3A4A5C] font-normal text-[13px]">by AlgoXpert</span></div>
          <ul className="flex gap-6 list-none">
            <li><a href="#" className="text-xs text-[#3A4A5C] font-['JetBrains_Mono'] hover:text-white transition">Platform</a></li>
            <li><a href="https://github.com/algoxpert/nexus" className="text-xs text-[#3A4A5C] font-['JetBrains_Mono'] hover:text-white transition">GitHub</a></li>
          </ul>
          <button 
            onClick={handleJoinWaitlist}
            className="px-6 py-3 bg-[#0A101A] border border-[#1A2333] text-[#F0B429] text-[10px] font-black tracking-widest uppercase rounded-lg hover:border-[#F0B429]/50 transition-all"
          >
            Join Waitlist
          </button>
          <div className="text-xs text-[#3A4A5C] font-['JetBrains_Mono']">© 2026 AlgoXpert. admin@algoxpert.org</div>
        </div>
        <div className="pt-8 border-t border-[#1A2333]/50 text-center">
          <p className="text-[10px] text-[#3A4A5C] font-['JetBrains_Mono'] uppercase tracking-[0.2em]">
            NEXUS is an integrated IDE, AI engine, DevOps pipeline, and credit system — not a mix‑and‑match stack.
          </p>
        </div>
      </div>
    </footer>
  );
};

