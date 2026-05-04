import React from 'react';
import { motion } from "motion/react";
import { Check, X, ShieldAlert, BadgeCheck, Info, HelpCircle } from "lucide-react";

interface RowData {
  feature: string;
  tooltip: string;
  nexus: string;
  legacy: string;
  llm: string;
  nexusStatus: boolean | string;
  legacyStatus: boolean | string;
  llmStatus: boolean | string;
}

const rows: RowData[] = [
  { 
    feature: "Natural Language to Strategy", 
    tooltip: "Convert plain English into production-ready PineScript or Python code instantly.",
    nexus: "Instant + Fully Editable", 
    legacy: "Limited or rigid", 
    llm: "Hallucinates broken code",
    nexusStatus: true,
    legacyStatus: "partial",
    llmStatus: false
  },
  { 
    feature: "Realistic Perps Execution", 
    tooltip: "Simulates funding rates, slippage, and order-book depth for realistic execution.",
    nexus: "Funding rates, slippage, order-book depth", 
    legacy: "Basic or optimistic slippage", 
    llm: "Ignores completely",
    nexusStatus: true,
    legacyStatus: "partial",
    llmStatus: false
  },
  { 
    feature: "Robustness Testing", 
    tooltip: "Exhaustive testing across In-Sample, Out-of-Sample, and Walk-Forward optimization.",
    nexus: "Full IS/OOS, Walk-Forward, Regime Slicing", 
    legacy: "Partial", 
    llm: "None",
    nexusStatus: true,
    legacyStatus: "partial",
    llmStatus: false
  },
  { 
    feature: "Overfitting Detection", 
    tooltip: "Uses Probabilistic Sharpe and Monte Carlo to detect curve-fitted garbage.",
    nexus: "Probabilistic Sharpe + Monte Carlo Attacks", 
    legacy: "Basic", 
    llm: "Creates more overfitting",
    nexusStatus: true,
    legacyStatus: "partial",
    llmStatus: false
  },
  { 
    feature: "Regime & Stress Survival", 
    tooltip: "Stress tests across 2022 crashes, FTX chaos, and 2026 volatility spikes.",
    nexus: "Tests across 2022, FTX, 2026 Vol Spikes", 
    legacy: "Limited historical", 
    llm: "No understanding of regimes",
    nexusStatus: true,
    legacyStatus: "partial",
    llmStatus: false
  },
  { 
    feature: "Agentic Research Crew", 
    tooltip: "Autonomous AI agents that actively try to find edge cases and break your strategy.",
    nexus: "Multi-agent Red Team (ATLAS/ECHO)", 
    legacy: "None", 
    llm: "Unreliable",
    nexusStatus: true,
    legacyStatus: false,
    llmStatus: false
  },
  { 
    feature: "Deployment Certification", 
    tooltip: "Get an independent audit score and badge to prove your strategy's robustness.",
    nexus: "Audit Badge + Robustness Score", 
    legacy: "No independent proof", 
    llm: "Dangerous overconfidence",
    nexusStatus: true,
    legacyStatus: false,
    llmStatus: false
  },
];

const StatusBadge = ({ status, text, isNexus = false }: { status: boolean | string, text: string, isNexus?: boolean }) => {
  const isPositive = status === true;
  const isNeutral = status === "partial";
  
  return (
    <div className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${isNexus ? 'bg-white/5' : ''}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
        isPositive ? 'bg-green-500/10 text-green-500' : 
        isNeutral ? 'bg-[#F0B429]/10 text-[#F0B429]' : 'bg-red-500/10 text-red-500'
      }`}>
        {isPositive ? <Check className="w-4 h-4" /> : 
         isNeutral ? <Info className="w-4 h-4" /> : <X className="w-4 h-4" />}
      </div>
      <span className={`text-[10px] md:text-[11px] font-bold text-center leading-tight ${
        isPositive ? 'text-white' : 'text-[#7A8BA0]'
      }`}>
        {text}
      </span>
    </div>
  );
};

export const ComparisonTable = ({ onOpenWaitlist }: { onOpenWaitlist?: () => void }) => (
  <section id="comparison" className="py-32 px-6 md:px-10 bg-[#020408] relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1A2333] to-transparent" />
    
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0B429]/10 border border-[#F0B429]/20 text-[#F0B429] text-[10px] font-black tracking-widest uppercase mb-6"
        >
          <ShieldAlert className="w-3 h-3" />
          Market Reality Check
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-[-0.04em] font-display mb-6 text-white"
        >
          Why Most Crypto Strategies Fail — <br />
          <span className="text-[#F0B429]">And Why NEXUS Is Different.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#7A8BA0] text-lg max-w-2xl mx-auto font-medium"
        >
          Legacy tools and raw LLMs create beautiful backtests that die in live markets. NEXUS was built to survive 2026 crypto reality.
        </motion.p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block relative">
        <div className="absolute top-0 bottom-0 left-[25.5%] right-[50.5%] bg-[#F0B429]/[0.02] border-x border-[#F0B429]/10 pointer-events-none rounded-[2rem] z-0" />
        
        <div className="overflow-x-auto pb-8 relative z-10">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="">
                <th className="py-10 px-6 text-left text-[10px] font-black text-[#4A5568] uppercase tracking-[0.2em]">The Edge Matrix</th>
                <th className="py-10 px-6 text-center relative bg-[#0A101A]/80 backdrop-blur-md border-t border-x border-[#F0B429]/30 rounded-t-[2.5rem]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#F0B429] text-black text-[9px] font-black rounded-full tracking-widest uppercase whitespace-nowrap shadow-[0_0_30px_rgba(240,180,41,0.5)] z-20">
                    2026 CRYPTO READY
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl font-black text-[#F0B429] font-display tracking-tight">NEXUS</span>
                    <BadgeCheck className="w-6 h-6 text-[#F0B429]" />
                  </div>
                </th>
                <th className="py-10 px-6 text-center text-sm font-black text-[#7A8BA0] font-display uppercase tracking-widest">Legacy Tools</th>
                <th className="py-10 px-6 text-center text-sm font-black text-[#7A8BA0] font-display uppercase tracking-widest">Raw LLMs / AI</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <td className="py-6 px-6 border-b border-[#1A2333]/50">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white group-hover:text-[#F0B429] transition-colors">{row.feature}</span>
                      <div className="group/tip relative">
                        <HelpCircle className="w-3.5 h-3.5 text-[#4A5568] hover:text-[#7A8BA0] cursor-help transition-colors" />
                        <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-black border border-[#1A2333] rounded-lg text-[9px] text-[#7A8BA0] opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                          {row.tooltip}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={`py-6 px-6 bg-[#0A101A] border-x border-[#F0B429]/30 ${i === rows.length - 1 ? 'rounded-b-[2.5rem] border-b' : 'border-b border-white/5'}`}>
                    <StatusBadge status={row.nexusStatus} text={row.nexus} isNexus />
                  </td>
                  <td className="py-6 px-6 border-b border-[#1A2333]/50">
                    <StatusBadge status={row.legacyStatus} text={row.legacy} />
                  </td>
                  <td className="py-6 px-6 border-b border-[#1A2333]/50">
                    <StatusBadge status={row.llmStatus} text={row.llm} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Stacked Cards */}
      <div className="lg:hidden space-y-8">
        {rows.map((row, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-6 bg-[#0A101A] border border-[#1A2333] rounded-[2rem] relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-white group-hover:text-[#F0B429] transition-colors">{row.feature}</h4>
              <div className="text-[10px] font-black text-[#4A5568] uppercase tracking-widest">Stage 0{i+1}</div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 rounded-2xl bg-[#F0B429]/5 border border-[#F0B429]/20">
                <div className="text-[9px] font-black text-[#F0B429] uppercase tracking-widest mb-3">NEXUS Edge</div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#F0B429] shrink-0" />
                  <span className="text-xs font-bold text-white leading-snug">{row.nexus}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3">Legacy</div>
                  <div className="flex items-center gap-2">
                    {row.legacyStatus === "partial" ? <Info className="w-3 h-3 text-[#7A8BA0]" /> : <X className="w-3 h-3 text-red-500" />}
                    <span className="text-[10px] font-bold text-[#7A8BA0] leading-tight">{row.legacy}</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3">Raw LLM</div>
                  <div className="flex items-center gap-2">
                    <X className="w-3 h-3 text-red-500" />
                    <span className="text-[10px] font-bold text-[#7A8BA0] leading-tight">{row.llm}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-20 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-10 md:p-14 rounded-[3rem] border border-[#F0B429]/20 bg-gradient-to-br from-[#0A101A] to-black text-center relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F0B429]/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <p className="text-2xl md:text-3xl font-black text-white mb-10 leading-tight italic font-display">
            "Most tools help you generate strategies. <br className="hidden md:block" />
            Only <span className="text-[#F0B429]">NEXUS</span> helps you kill the weak ones before they kill your account."
          </p>
          
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-black text-[#F0B429] uppercase tracking-[0.2em]">
                Ready to stop guessing whether your strategy will survive?
              </h4>
              <p className="text-xs text-[#7A8BA0] font-medium italic animate-pulse">
                Verification slots available for May 2026 Batch
              </p>
            </div>
            <button 
              onClick={() => onOpenWaitlist?.()}
              className="px-10 py-5 rounded-2xl bg-[#F0B429] text-black font-black text-xs tracking-widest uppercase hover:scale-[1.05] hover:shadow-[0_0_50px_rgba(240,180,41,0.4)] transition-all active:scale-[0.98]"
            >
              Join Waitlist — Get Free Verification on Your First Strategy
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);


