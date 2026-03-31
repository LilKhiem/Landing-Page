import React from 'react';

export const FinalCTA = ({ onOpenWaitlist }: { onOpenWaitlist: () => void }) => (
  <section id="waitlist" className="py-24 px-10 text-center">
    <h2 className="text-6xl font-bold tracking-tighter mb-6">The quant revolution starts April 5.</h2>
    <p className="text-lg text-[#7A8BA0] max-w-lg mx-auto mb-10">Join 2,847 traders and developers already on the waitlist.</p>
    <div className="flex gap-2 max-w-md w-full mx-auto mb-4">
      <button onClick={onOpenWaitlist} className="w-full bg-[#00D4FF] text-black font-bold px-7 py-3 rounded hover:opacity-90 transition">Join Waitlist →</button>
    </div>
    <p className="text-xs text-[#3A4A5C] font-['JetBrains_Mono']">No spam. No credit card. Unsubscribe anytime.</p>
  </section>
);
