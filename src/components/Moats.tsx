import { motion } from "motion/react";
import { Shield, Zap, Database, Lock } from "lucide-react";

export const Moats = () => (
  <section className="py-24 px-10 bg-[#05080D]">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">WHY WE WIN</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-['Syne'] mb-6">Built to be uncopyable.</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            title: "The 50K Experiment Moat",
            desc: "NEXUS isn't just LLM-wrapped. It's trained on 50,000+ proprietary quant experiments. It knows why strategies fail before they even run.",
            icon: Database
          },
          {
            title: "The Evidence Ledger",
            desc: "Every certified strategy is hashed on a private SHA-256 ledger. This creates an immutable proof-of-research that institutions require for allocation.",
            icon: Lock
          },
          {
            title: "SYNTHESIS Gate",
            desc: "Our deterministic safety layer. It's a hard-coded mathematical gate that rejects 100% of strategies that show signs of curve-fitting or data leakage.",
            icon: Shield
          },
          {
            title: "NL2S Engine",
            desc: "Natural Language to Strategy. We've built the most advanced compiler that turns human intent into high-performance C++ and Python execution code.",
            icon: Zap
          }
        ].map((moat, i) => (
          <div key={i} className="p-10 rounded-3xl bg-[#0A101A] border border-[#1A2333] hover:border-[#F0B429]/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#F0B429]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <moat.icon className="w-6 h-6 text-[#F0B429]" />
            </div>
            <h4 className="text-xl font-bold mb-4 font-['Syne']">{moat.title}</h4>
            <p className="text-[#7A8BA0] leading-relaxed">{moat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
