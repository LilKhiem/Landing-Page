import { useState } from "react";
import { motion } from "motion/react";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Explorer",
    price: { monthly: 0, yearly: 0 },
    desc: "For individual researchers.",
    features: ["5 strategy generations / mo", "Basic IS/OOS validation", "Community access", "Standard compute"],
    cta: "Start for Free",
    popular: false
  },
  {
    name: "Pro",
    price: { monthly: 99, yearly: 79 },
    desc: "For serious quants.",
    features: ["Unlimited generations", "Full 8-gate certification", "Evidence Ledger access", "Priority GPU compute", "Full NEXUS Metrics dashboard"],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Institutional",
    price: { monthly: 499, yearly: 399 },
    desc: "For funds and professional desks.",
    features: ["Unlimited generations", "White-label Risk OS", "Private ledger instance", "NEXUS Keys & CLI", "Custom risk gates"],
    cta: "Contact Sales",
    popular: false
  }
];

import { trackCTA } from '../lib/analytics';
import { signup } from '../lib/api';
import { toast } from 'sonner';

export const Pricing = ({ onOpenWaitlist, onOpenCheckout }: { onOpenWaitlist: () => void, onOpenCheckout: (plan: string, price: number, isYearly: boolean) => void }) => {
  const [isYearly, setIsYearly] = useState(true);

  const handlePlanClick = async (plan: typeof plans[0]) => {
    const ctaId = plan.name === 'Explorer' ? 'pricing_explorer_start' : 
                  plan.name === 'Pro' ? 'pricing_pro_get_started' : 
                  'pricing_institutional_contact';
    
    trackCTA(ctaId as any, { plan: plan.name, isYearly });

    if (plan.name === 'Institutional') {
      onOpenWaitlist(); // Open modal for contact
      return;
    }

    // Open mock checkout
    onOpenCheckout(plan.name, isYearly ? plan.price.yearly : plan.price.monthly, isYearly);
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
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F0B429] text-black text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase">MOST POPULAR</div>
              )}
              
              <div className="mb-8">
                <h4 className="text-2xl font-bold mb-3 font-display">{plan.name}</h4>
                <p className="text-xs text-[#7A8BA0] mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold font-display tracking-tight">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="text-xs text-[#4A5568] font-bold uppercase tracking-widest">/ mo</span>
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

              {plan.name === 'Institutional' ? (
                <button 
                  onClick={() => handlePlanClick(plan)}
                  className={`w-full py-4 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${plan.popular ? 'bg-[#F0B429] text-black hover:shadow-[0_0_20px_rgba(240,180,41,0.4)]' : 'bg-white text-black hover:bg-[#F0B429]'}`}
                >
                  {plan.cta}
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => handlePlanClick(plan)}
                    className={`lemonsqueezy-button block text-center w-full py-4 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${plan.popular ? 'bg-[#F0B429] text-black hover:shadow-[0_0_20px_rgba(240,180,41,0.4)]' : 'bg-white text-black hover:bg-[#F0B429]'}`}
                  >
                    {plan.cta}
                  </button>
                  <p className="text-[9px] text-[#4A5568] text-center mt-1">Instant access after checkout. Cancel anytime.</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-[#4A5568] font-bold tracking-widest uppercase mb-2">
            Secured checkout by Lemon Squeezy (VAT & tax handled for you).
          </p>
          <p className="text-[10px] text-[#4A5568] font-bold tracking-widest uppercase">
            <Zap className="w-3 h-3 inline-block mr-2 text-[#F0B429]" />
            All plans include a 14-day money-back guarantee. No questions asked.
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
