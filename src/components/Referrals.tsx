import React, { useState } from 'react';
import { motion } from 'motion/react';

const tiers = [
  { count: 1, reward: 'NEXUS Research Papers', desc: 'Full arXiv methodology pack' },
  { count: 3, reward: 'Priority Access', desc: 'Skip to front 10% of waitlist' },
  { count: 5, reward: 'Founding Member Badge', desc: 'Permanent badge + 1st month free' },
  { count: 10, reward: '1-on-1 with Jack Pham', desc: '30-minute strategy session' },
  { count: 25, reward: 'Lifetime Founding Member', desc: 'Permanent Pro access at $79/mo' },
  { count: 50, reward: 'Founding 50 Wall', desc: 'Your name on the website' },
];

export const Referrals = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="referral" className="py-24 px-10 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-5xl font-bold tracking-tighter mb-5">Referrals</h2>
        <p className="text-[#7A8BA0] text-base leading-relaxed max-w-xl">Share your unique referral link. Every person you bring earns you rewards — and moves you closer to the front.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-16 relative">
        <div className="h-4 bg-[#1A2333] rounded-full overflow-hidden">
          <motion.div initial={{ width: '0%' }} whileInView={{ width: '40%' }} className="h-full bg-[#00D4FF]" />
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-['JetBrains_Mono'] text-[#3A4A5C] uppercase tracking-widest">
          {tiers.map(t => <span key={t.count}>{t.count} {t.count === 1 ? 'Referral' : 'Referrals'}</span>)}
        </div>
      </div>

      {/* Reward Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="bg-[#0D1117] p-8 rounded-xl border border-[#1A2333] relative cursor-pointer hover:border-[#00D4FF] transition-colors"
          >
            <div className="text-4xl font-bold text-[#00D4FF] mb-4">
              {tier.count} <span className="text-xl">{tier.count === 1 ? 'Referral' : 'Referrals'}</span>
            </div>
            <div className="text-sm font-bold mb-2">{tier.reward}</div>
            <p className="text-xs text-[#7A8BA0]">{tier.desc}</p>
            
            {hovered === i && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-16 left-0 bg-[#00D4FF] text-black p-4 rounded-lg text-xs font-bold w-full shadow-xl"
              >
                Unlock {tier.reward} at {tier.count} {tier.count === 1 ? 'Referral' : 'Referrals'}!
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
