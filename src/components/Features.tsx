import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Globe, Zap, Search, Database, ShieldCheck } from "lucide-react";

const featureGroups = [
  {
    id: "engine",
    label: "Research Engine",
    features: [
      { icon: Search, title: "NL2S Engine", desc: "Natural Language to Strategy. Describe logic, get code." },
      { icon: Database, title: "Evidence Ledger", desc: "Every decision logged with full mathematical proof." },
      { icon: ShieldCheck, title: "8-Gate Synthesis", desc: "Deterministic validation that kills weak ideas." }
    ]
  },
  {
    id: "agents",
    label: "Agentic Crew",
    features: [
      { icon: Cpu, title: "ATLAS Agent", desc: "Specializes in mean reversion and statistical arbitrage." },
      { icon: Globe, title: "ECHO Agent", desc: "Analyzes cross-asset correlations and macro flows." },
      { icon: Zap, title: "SYNTH Agent", desc: "Optimizes execution parameters and slippage models." }
    ]
  }
];

export const Features = () => {
  const [activeTab, setActiveTab] = useState("engine");

  return (
    <section className="py-20 px-10 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">FEATURES</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] font-display mb-12">Built for the next <br />generation of quants.</h3>
          
          <div className="flex justify-center gap-4 mb-16">
            {featureGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${activeTab === group.id ? 'bg-[#F0B429] text-black' : 'bg-[#0A101A] text-[#4A5568] border border-[#1A2333]'}`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6"
              >
                {featureGroups.find(g => g.id === activeTab)?.features.map((f, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-[#1A2333] bg-[#0A101A] group hover:border-[#F0B429]/30 transition-all">
                    <f.icon className="w-6 h-6 text-[#F0B429] mb-4" />
                    <h4 className="text-xl font-bold mb-3 font-display">{f.title}</h4>
                    <p className="text-sm text-[#7A8BA0] leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative aspect-square rounded-3xl border border-[#1A2333] bg-[#05080D] overflow-hidden p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F0B429]/5 to-transparent"></div>
            
            {/* Agentic Crew Illustration */}
            <div className="relative h-full flex flex-col justify-center items-center">
              <div className="w-32 h-32 rounded-full border-2 border-[#F0B429]/20 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-2 border-[#F0B429] border-t-transparent animate-spin"></div>
                <Cpu className="w-12 h-12 text-[#F0B429]" />
                
                {/* Orbiting Agents */}
                {[0, 120, 240].map((angle, i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10 + i * 2, ease: "linear" }}
                    className="absolute inset-0"
                    style={{ rotate: angle }}
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-lg bg-[#0A101A] border border-[#F0B429]/30 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-[#F0B429]" />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <div className="text-[10px] font-bold text-[#F0B429] tracking-[0.3em] uppercase mb-2">AGENTIC RESEARCH CREW</div>
                <p className="text-xs text-[#4A5568] max-w-[200px]">24 specialized AI agents working in parallel to validate your intuition.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
