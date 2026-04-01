import React from 'react';

export const Footer = () => (
  <footer className="border-t border-[#1A2333] p-10 flex flex-wrap items-center justify-between gap-5">
    <div className="font-display text-lg font-bold tracking-tight">NEXUS<span className="text-[#F0B429]">IDE</span> <span className="text-[#3A4A5C] font-normal text-[13px]">by AlgoXpert</span></div>
    <ul className="flex gap-6 list-none">
      <li><a href="#" className="text-xs text-[#3A4A5C] font-['JetBrains_Mono'] hover:text-white transition">Platform</a></li>
      <li><a href="#" className="text-xs text-[#3A4A5C] font-['JetBrains_Mono'] hover:text-white transition">GitHub</a></li>
    </ul>
    <div className="text-xs text-[#3A4A5C] font-['JetBrains_Mono']">© 2026 AlgoXpert. admin@algoxpert.org</div>
  </footer>
);
