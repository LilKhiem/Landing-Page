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
          <ul className="flex flex-wrap gap-6 list-none">
            <li><a href="/privacy" className="text-[10px] text-[#3A4A5C] font-['JetBrains_Mono'] hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="text-[10px] text-[#3A4A5C] font-['JetBrains_Mono'] hover:text-white transition">Terms of Service</a></li>
            <li><a href="/risk-disclosure" className="text-[10px] text-[#3A4A5C] font-['JetBrains_Mono'] hover:text-white transition">Risk Disclosure</a></li>
            <li><a href="mailto:admin@algoxpert.org" className="text-[10px] text-[#3A4A5C] font-['JetBrains_Mono'] hover:text-white transition">Contact</a></li>
            <li><a href="https://linkedin.com/company/algoxpert" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#3A4A5C] font-['JetBrains_Mono'] hover:text-white transition">LinkedIn</a></li>
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

