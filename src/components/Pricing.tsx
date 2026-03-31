import React from 'react';

export const Pricing = ({ onOpenWaitlist }: { onOpenWaitlist: () => void }) => (
  <section id="pricing" className="py-24 px-10 max-w-7xl mx-auto">
    <div className="mb-16 text-center">
      <h2 className="text-5xl font-bold tracking-tighter mb-5">Start free. Scale when it works.</h2>
      <p className="text-[#7A8BA0] text-base leading-relaxed">No credit card required for the waitlist. Founding Member pricing locked permanently on launch day.</p>
      <div className="mt-8 flex justify-center items-center gap-4 text-sm font-['JetBrains_Mono']">
        <span>Monthly</span>
        <div className="w-12 h-6 bg-[#1A2333] rounded-full p-1 cursor-pointer">
          <div className="w-4 h-4 bg-[#00D4FF] rounded-full"></div>
        </div>
        <span>Yearly <span className="text-[#00D4FF]">(Coming Soon)</span></span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      {[
        { 
          tier: 'FREE', 
          price: '$0', 
          period: 'forever', 
          features: ['3 strategy generations/month', 'Basic IS validation', 'Evidence ledger viewer', 'Public marketplace browsing'],
          disabled: ['Walk-forward validation', 'SYNTHESIS gate access', 'Strategy export', 'Marketplace selling']
        },
        { 
          tier: 'PRO', 
          price: '$99', 
          period: '/month', 
          sub: 'Founding Rate: $79/mo for waitlist',
          features: ['Unlimited strategy generations', 'Full 5-layer validation (IS+WFA+OOS+LOYO+Stress)', 'SYNTHESIS gate + 8 hard constraints', 'DSR + PBO multiple testing correction', 'Strategy export (MT5, IBKR, Python)', 'Marketplace selling (70% rev share)', 'Real-time validation dashboard', 'Evidence ledger full access'], 
          featured: true 
        },
        { 
          tier: 'INSTITUTIONAL', 
          price: '$499', 
          period: '/month', 
          sub: 'White-label from $5K/mo',
          features: ['Everything in Pro', 'API access — all endpoints', 'Custom risk parameters', 'Private evidence ledger', 'Strategy Audit reports ($2K value/each)', 'White-label deployment option', 'Dedicated research cycles', 'SLA + direct access to Jack'] 
        },
      ].map((plan, i) => (
        <div key={i} className={`p-8 rounded-xl border ${plan.featured ? 'border-[#00D4FF] bg-[#111820] md:p-10 shadow-2xl shadow-[#00D4FF]/10 relative' : 'border-[#1A2333] bg-[#0D1117]'}`}>
          {plan.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00D4FF] text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">Most Popular</div>}
          <div className="font-['JetBrains_Mono'] text-[10px] text-[#3A4A5C] uppercase tracking-widest mb-4">{plan.tier}</div>
          <div className="text-5xl font-bold text-[#00D4FF] mb-1">{plan.price}</div>
          <div className="text-sm text-[#7A8BA0] mb-8">{plan.period} {plan.sub && <span className="block text-[10px] mt-1 text-[#00D4FF]">· {plan.sub}</span>}</div>
          <ul className="space-y-4 mb-8">
            {plan.features.map(f => <li key={f} className="text-sm flex gap-2"><span>✓</span> {f}</li>)}
            {plan.disabled && plan.disabled.map(f => <li key={f} className="text-sm flex gap-2 text-[#3A4A5C]"><span>✗</span> {f}</li>)}
          </ul>
          <button onClick={onOpenWaitlist} className={`w-full py-3 rounded font-bold ${plan.featured ? 'bg-[#00D4FF] text-black' : 'bg-[#111820] text-white border border-[#1A2333]'}`}>
            {plan.featured ? 'Get Founding Rate →' : plan.tier === 'INSTITUTIONAL' ? 'Contact Sales' : 'Join Waitlist'}
          </button>
        </div>
      ))}
    </div>
  </section>
);
