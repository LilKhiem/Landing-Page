import { useState } from "react";
import { motion } from "motion/react";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    badge: "Founding — 50 seats left",
    price: { monthly: 29, yearly: 247 },
    oldPrice: { monthly: null, yearly: 297 },
    suffix: { monthly: "/ mo", yearly: "/ year" },
    desc: "For independent developers validating core ideas.",
    features: ["50 Strategy Slots", "Full IS → WFA → OOS validation", "Evidence Ledger export", "Community support"],
    cta: "Start 14-Day Free Trial",
    ctaNote: "Card required. Cancel before day 14 — no charge.",
    popular: false
  },
  {
    name: "Pro",
    badge: "Founding — 30 seats left",
    price: { monthly: 99, yearly: 797 },
    oldPrice: { monthly: null, yearly: 997 },
    suffix: { monthly: "/ mo", yearly: "/ year" },
    desc: "For active quants needing full research depth.",
    features: ["Everything in Starter", "30 Strategy Slots", "Private code exports (Python / C++ / MQL5)", "Full Evidence Ledger + certification reports", "Priority generation queue"],
    cta: "Start 14-Day Free Trial",
    ctaNote: "Card required. Cancel before day 14 — no charge.",
    popular: true
  },
  {
    name: "Elite",
    badge: "Founding — 10 seats left",
    price: { monthly: 2497, yearly: 3997 },
    oldPrice: { monthly: null, yearly: 4997 },
    suffix: { monthly: "/ year", yearly: "Lifetime" },
    desc: "One-time access. No renewals. Forever.",
    features: ["Everything in Pro", "10 Strategy Slots", "Lifetime access — no renewals", "Priority support & generation", "Early access to all future features"],
    cta: "Get Lifetime Access",
    ctaNote: "Card required. 14-day free trial included.",
    popular: false
  }
];

import { trackCTA } from '../lib/analytics';
import { signup } from '../lib/api';
import { toast } from 'sonner';

export const Pricing = ({ onOpenWaitlist, onOpenCheckout }: { onOpenWaitlist: (plan?: string) => void, onOpenCheckout: (plan: string, price: number, isYearly: boolean) => void }) => {
  const [isYearly, setIsYearly] = useState(true);

  const handlePlanClick = async (plan: typeof plans[0]) => {
    const ctaId = `pricing_${plan.name.toLowerCase()}_click`;
    trackCTA(ctaId as any, { plan: plan.name, isYearly });

    const price = isYearly ? plan.price.yearly : plan.price.monthly;
    onOpenCheckout(plan.name, price, isYearly);
  };

  return (
    <section id="pricing" className="py-20 px-10 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">PRICING</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] font-display mb-4">Founding member rates. <br />Locked in for life.</h3>
          <p className="text-[#7A8BA0] text-sm mb-10">Billing handled by Lemon Squeezy (Merchant of Record), including global taxes and invoices.</p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={`text-xs font-bold tracking-widest uppercase ${!isYearly ? 'text-white' : 'text-[#4A5568]'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 rounded-full bg-[#0A101A] border border-[#1A2333] relative p-1 transition-all"
            >
              <motion.div 
                animate={{ x: isYearly ? 24 : 0 }}
                className="w-4 h-4 rounded-full bg-[#F0B429]"
              />
            </button>
            <span className={`text-xs font-bold tracking-widest uppercase ${isYearly ? 'text-white' : 'text-[#4A5568]'}`}>Yearly <span className="text-[#F0B429] text-[9px] ml-1">(-20%)</span></span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl border transition-all relative flex flex-col ${plan.popular ? 'border-[#F0B429] bg-[#F0B429]/5 shadow-[0_0_30px_rgba(240,180,41,0.1)]' : 'border-[#1A2333] bg-[#0A101A]'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F0B429] text-black text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase w-max">MOST POPULAR</div>
              )}
              
              <div className="mb-8 mt-2">
                <div className="inline-block px-2 py-1 bg-[#1A2333] border border-[#3A4A5C] rounded-md text-[#F0B429] text-[10px] font-bold tracking-wider uppercase mb-4">{plan.badge}</div>
                <h4 className="text-2xl font-bold mb-3 font-display">{plan.name}</h4>
                <p className="text-xs text-[#7A8BA0] mb-6">{plan.desc}</p>
                
                <div className="flex flex-col gap-1">
                  {isYearly && plan.oldPrice.yearly && (
                    <span className="text-sm text-[#4A5568] line-through font-['JetBrains_Mono']">${plan.oldPrice.yearly}</span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold font-display tracking-tight">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                    <span className="text-xs text-[#4A5568] font-bold uppercase tracking-widest">{isYearly ? plan.suffix.yearly : plan.suffix.monthly}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-[#7A8BA0]">
                    <Check className="w-4 h-4 text-[#F0B429] shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handlePlanClick(plan)}
                  className={`block text-center w-full py-4 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${plan.popular ? 'bg-[#F0B429] text-black hover:shadow-[0_0_20px_rgba(240,180,41,0.4)]' : 'bg-white text-black hover:bg-[#F0B429]'}`}
                >
                  {plan.cta}
                </button>
                <p className="text-[10px] text-[#4A5568] text-center mt-1">{plan.ctaNote}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto bg-[#0A101A] border border-[#1A2333] rounded-2xl p-6">
          <ul className="text-xs text-[#7A8BA0] space-y-3 text-left list-none">
            <li className="flex gap-2 items-start"><span className="text-[#F0B429]">✦</span> Founding rates locked forever — cancel = lose rate permanently.</li>
            <li className="flex gap-2 items-start"><span className="text-[#F0B429]">✦</span> Monthly plans available (Starter $29/mo, Pro $99/mo) — regular rate, no founding discount.</li>
            <li className="flex gap-2 items-start"><span className="text-[#F0B429]">✦</span> Upgrade from Monthly to Annual Founding anytime while seats last.</li>
            <li className="flex gap-2 items-start"><span className="text-[#F0B429]">✦</span> Enterprise / Institutional: contact <a href="mailto:admin@algoxpert.org" className="text-white underline">admin@algoxpert.org</a></li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <p className="text-[10px] text-[#4A5568] uppercase max-w-3xl mx-auto">
            DISCLAIMER: NOT FINANCIAL ADVICE. NEXUS IDE is a strategy research and validation tool for educational and software development purposes only. Trading involves substantial risk of loss. Past results not indicative of future performance.
          </p>
        </div>

        {/* Teaser Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-10 rounded-3xl border border-[#1A2333] bg-[#0A101A] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4">
            <span className="px-3 py-1 rounded-full bg-[#F0B429]/10 border border-[#F0B429]/30 text-[#F0B429] text-[9px] font-bold tracking-widest uppercase">Coming Soon</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-bold mb-4 font-display">NEXUS Credits & Token Economy</h4>
              <p className="text-[#7A8BA0] text-sm leading-relaxed mb-6">
                We're building a unified economy to power the next generation of decentralized quant research.
              </p>
              <ul className="space-y-3">
                {[
                  { title: "NEXUS Credits", desc: "Unified meter for AI, backtests, and research." },
                  { title: "NEXUS Token", desc: "Internal governance + power‑user perks." },
                  { title: "NEXUS Hub", desc: "Central dashboard for usage, billing, and team limits." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F0B429] mt-1.5 shrink-0" />
                    <span className="text-[#E8EDF5] font-bold">{item.title}</span>
                    <span className="text-[#4A5568]"> – {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video rounded-2xl bg-black border border-[#1A2333] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F0B429]/5 to-transparent"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#F0B429] mb-2 font-display">$NXS</div>
                <div className="text-[10px] text-[#4A5568] font-bold tracking-[0.3em] uppercase">Genesis Mint Q3 2026</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
