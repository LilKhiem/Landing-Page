import { Search, Database, ShieldCheck, Cpu, Zap, Lock, MessageSquare } from "lucide-react";

const researchEngineFeatures = [
  { 
    icon: MessageSquare, 
    title: "NEXUS Chat – your in‑IDE AI quant", 
    desc: "Ask questions like ‘What breaks this strategy?’ or ‘Why did 2022 underperform?’. NEXUS answers in context, linking you directly to the relevant equity curve, gates, and reports inside the IDE." 
  },
  { 
    icon: Search, 
    title: "NL2S Engine – from idea to audited backtest", 
    desc: "Describe the trade, NEXUS does the rest: compiles strategy code, runs IS/WFA/OOS, x2 cost stress, and returns a full backtest report with equity & drawdown curves, trade stats, and regime breakdown." 
  },
  { 
    icon: ShieldCheck, 
    title: "Continuous Validation Loop – production‑grade research hygiene", 
    desc: "Certified strategies are not ‘set and forget’. NEXUS keeps re‑validating them on rolling windows; when risk or Sharpe drift, they’re auto‑flagged and pushed back into research with updated reports." 
  },
  { 
    icon: Database, 
    title: "Evidence Ledger – every run is evidence", 
    desc: "Every experiment — including dead ends — is stamped into the Evidence Ledger with config, data window, metrics, and stress results. You can reconstruct the entire evidence chain behind any strategy in seconds." 
  }
];

const agenticCrewFeatures = [
  { 
    icon: Cpu, 
    title: "Agentic Research Crew – 24 agents trying to break your idea", 
    desc: "Specialized agents probe parameter space, market regimes, and execution assumptions. Their job is to kill fragile edges before capital ever touches them." 
  },
  { 
    icon: Lock, 
    title: "Risk & Overfit Guards – built‑in skepticism", 
    desc: "Deflated Sharpe, PBO, trade‑count thresholds, and cost sensitivity checks are first‑class citizens, not afterthoughts. Strategies that pass look good and survive harsher assumptions than your slide deck." 
  },
  { 
    icon: Zap, 
    title: "Synthesis Gate – one deterministic verdict", 
    desc: "At the end of the pipeline, a synthesis layer aggregates all gates into a single, deterministic verdict and robustness score — the number that powers the NEXUS equity/drawdown charts you see on this page." 
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">FEATURES</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] font-display mb-6">Built for the next generation of quants</h3>
          <p className="text-[#7A8BA0] font-['JetBrains_Mono'] text-sm max-w-3xl mx-auto">
            For people who care about IS/OOS, WFA, DSR, and PBO — not AI buzzwords.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Research Engine */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#1A2333]"></div>
              <span className="text-[10px] font-bold text-[#F0B429] tracking-[0.2em] uppercase font-['JetBrains_Mono']">Research Engine</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#1A2333]"></div>
            </div>
            
            <div className="grid gap-6">
              {researchEngineFeatures.map((f, i) => (
                <div key={i} className="p-8 rounded-2xl border border-[#1A2333] bg-[#0A101A] group hover:border-[#F0B429]/30 transition-all">
                  <f.icon className="w-6 h-6 text-[#F0B429] mb-4" />
                  <h4 className="text-xl font-bold mb-3 font-display">{f.title}</h4>
                  <p className="text-sm text-[#7A8BA0] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Agentic Crew */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#1A2333]"></div>
              <span className="text-[10px] font-bold text-[#F0B429] tracking-[0.2em] uppercase font-['JetBrains_Mono']">Agentic Crew & Risk Guards</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#1A2333]"></div>
            </div>

            <div className="grid gap-6">
              {agenticCrewFeatures.map((f, i) => (
                <div key={i} className="p-8 rounded-2xl border border-[#1A2333] bg-[#0A101A] group hover:border-[#F0B429]/30 transition-all">
                  <f.icon className="w-6 h-6 text-[#F0B429] mb-4" />
                  <h4 className="text-xl font-bold mb-3 font-display">{f.title}</h4>
                  <p className="text-sm text-[#7A8BA0] leading-relaxed">{f.desc}</p>
                </div>
              ))}
              
              {/* Visual Element for Agentic Crew */}
              <div className="relative aspect-[16/9] rounded-2xl border border-[#1A2333] bg-[#05080D] overflow-hidden p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F0B429]/5 to-transparent"></div>
                <div className="relative flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border border-[#F0B429]/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border border-[#F0B429] border-t-transparent animate-spin"></div>
                    <Cpu className="w-8 h-8 text-[#F0B429]" />
                    {[0, 120, 240].map((angle, i) => (
                      <div key={i} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded bg-[#0A101A] border border-[#F0B429]/30 flex items-center justify-center">
                          <Zap className="w-2 h-2 text-[#F0B429]" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <div className="text-[9px] font-bold text-[#F0B429] tracking-[0.2em] uppercase mb-1">24 Specialized Agents</div>
                    <p className="text-[10px] text-[#4A5568]">Orchestrated by the NEXUS Core</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-[#7A8BA0] text-sm font-['JetBrains_Mono'] max-w-3xl mx-auto border-t border-[#1A2333] pt-12">
            Everything you see below — the validation log, robustness score, performance table, equity and drawdown charts — is generated automatically by this engine. No manual Jupyter wiring, no one‑off scripts.
          </p>
        </div>
      </div>
    </section>
  );
};
