import React from 'react';

import { trackCTA } from '../lib/analytics';

export const Navbar = ({ 
  onOpenWaitlist, 
  onOpenAuth, 
  isLoggedIn, 
  onOpenProfile 
}: { 
  onOpenWaitlist: () => void,
  onOpenAuth: (mode: 'login' | 'register') => void,
  isLoggedIn: boolean,
  onOpenProfile: () => void
}) => {
  const handleJoinWaitlist = () => {
    trackCTA('navbar_join_waitlist');
    onOpenWaitlist();
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-40 px-10 py-4 flex items-center justify-between bg-black/85 backdrop-blur-lg border-b border-[#1A2333]">
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-display text-2xl font-bold tracking-[-0.03em] text-white hover:opacity-80 transition cursor-pointer"
      >
        NEXUS IDE
      </button>
      <ul className="hidden xl:flex gap-8 list-none text-xs tracking-widest text-[#7A8BA0] uppercase font-['JetBrains_Mono']">
        <li><a href="#how" className="hover:text-white transition">How it Works</a></li>
        <li><a href="#features" className="hover:text-white transition">Features</a></li>
        <li><a href="#marketplace" className="hover:text-white transition">Marketplace</a></li>
        <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
        <li><a href="#referral" className="hover:text-white transition">Referral</a></li>
      </ul>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <a 
            href="/dashboard"
            className="text-[#7A8BA0] hover:text-white font-['JetBrains_Mono'] text-[11px] font-bold tracking-widest uppercase transition"
          >
            Dashboard
          </a>
        ) : (
          <>
            <button 
              onClick={() => onOpenAuth('login')}
              className="text-[#7A8BA0] hover:text-white font-['JetBrains_Mono'] text-[11px] font-bold tracking-widest uppercase transition"
            >
              Sign In
            </button>
            <button 
              onClick={() => onOpenAuth('register')}
              className="text-indigo-400 hover:text-indigo-300 font-['JetBrains_Mono'] text-[11px] font-bold tracking-widest uppercase transition ml-2"
            >
              Sign Up
            </button>
          </>
        )}
        <button 
          onClick={handleJoinWaitlist}
          className="bg-[#F0B429] text-black font-['JetBrains_Mono'] text-[11px] font-bold tracking-widest uppercase px-5 py-2 rounded hover:opacity-85 transition"
        >
          Join Waitlist
        </button>
      </div>
    </nav>
  );
};

