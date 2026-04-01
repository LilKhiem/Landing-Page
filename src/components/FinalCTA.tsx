import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const FinalCTA = ({ onOpenWaitlist }: { onOpenWaitlist?: () => void }) => {
  const [market, setMarket] = useState<string>('');
  const markets = ['Crypto', 'FX', 'Gold', 'Prop Firm', 'SPX Option'];

  return (
    <section className="py-20 px-10 bg-[#F0B429]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 border border-black/10 text-black text-[10px] font-black tracking-[0.2em] uppercase mb-6"
        >
          <ShieldCheck className="w-3 h-3" />
          Founding Member Access
        </motion.div>
        
        <h2 className="text-5xl md:text-8xl font-bold text-black tracking-[-0.04em] font-display mb-8 leading-[1.0]">
          The future of quant <br />is agentic.
        </h2>
        
        <p className="text-black/70 text-xl font-medium mb-10 max-w-2xl mx-auto">
          Join 12,000+ quants waiting for the next batch of invites. <br />Launch: April 5, 2026.
        </p>

        <div className="max-w-xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your professional email"
                className="flex-1 px-6 py-4 rounded-xl bg-black/5 border border-black/10 text-black placeholder:text-black/40 focus:outline-none focus:border-black focus:shadow-[0_0_20px_rgba(0,0,0,0.1)] font-medium transition-all duration-300"
              />
              <button 
                onClick={onOpenWaitlist}
                className="px-8 py-4 rounded-xl bg-black text-[#F0B429] font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Join Waitlist <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {markets.map((m) => (
                <motion.button
                  key={m}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMarket(m)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                    market === m 
                      ? 'bg-black text-[#F0B429] border-black shadow-lg' 
                      : 'bg-transparent border-black/20 text-black/60 hover:border-black/50 hover:text-black'
                  }`}
                >
                  {m}
                </motion.button>
              ))}
            </div>
          </div>
          
          <p className="mt-8 text-[10px] text-black/50 font-bold tracking-widest uppercase">
            Free to join · No credit card · Instant referral link
          </p>
        </div>
      </div>
    </section>
  );
};
