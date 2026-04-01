import { useState } from "react";
import { motion } from "motion/react";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Explorer",
    price: { monthly: 0, yearly: 0 },
    desc: "For individual researchers testing the waters.",
    features: ["5 strategy generations / mo", "Basic IS/OOS validation", "Community access", "Standard compute"],
    cta: "Start for Free",
    popular: false
  },
  {
    name: "Pro",
    price: { monthly: 99, yearly: 79 },
    desc: "For serious quants building a portfolio.",
    features: ["Unlimited generations", "Full 8-gate certification", "Evidence Ledger access", "Priority GPU compute", "Strategy forking"],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Institutional",
    price: { monthly: 499, yearly: 399 },
    desc: "For funds and professional trading desks.",
    features: ["White-label Risk OS", "Private ledger instance", "API access", "Dedicated support", "Custom risk gates"],
    cta: "Contact Sales",
    popular: false
  }
];

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section className="py-24 px-10 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">PRICING</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-['Syne'] mb-8">Founding member rates. <br />Locked in for life.</h3>
          
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
                <h4 className="text-xl font-bold mb-2 font-['Syne']">{plan.name}</h4>
                <p className="text-xs text-[#7A8BA0] mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black font-['Syne']">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="text-xs text-[#4A5568] font-bold uppercase tracking-widest">/ mo</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-[#7A8BA0]">
                    <Check className="w-4 h-4 text-[#F0B429] shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${plan.popular ? 'bg-[#F0B429] text-black hover:shadow-[0_0_20px_rgba(240,180,41,0.4)]' : 'bg-white text-black hover:bg-[#F0B429]'}`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[10px] text-[#4A5568] font-bold tracking-widest uppercase">
            <Zap className="w-3 h-3 inline-block mr-2 text-[#F0B429]" />
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};
