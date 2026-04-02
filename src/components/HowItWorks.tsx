import { motion } from "motion/react";
import { 
  PenTool, 
  Beaker, 
  CheckCircle, 
  ArrowRight, 
  Terminal, 
  Cpu, 
  ShieldAlert, 
  Activity,
  ChevronRight,
  Zap,
  Lock
} from "lucide-react";

const pipelineSteps = [
  {
    id: "input",
    title: "01. Strategy Intent",
    desc: "Start in NEXUS Chat or directly in the IDE. Describe your strategy in plain English — asset, session, style, risk — and NEXUS takes it from there.",
    icon: PenTool,
    color: "#F0B429",
    details: ["NEXUS Chat input for natural‑language strategy ideas.", "Multi-asset support", "Custom indicators", "Risk parameters"]
  },
  {
    id: "synthesis",
    title: "02. Agentic Synthesis",
    desc: "ATLAS, ECHO, and SYNTH agents build 1,000+ candidates.",
    icon: Cpu,
    color: "#F0B429",
    details: ["Code generation", "Parameter optimization", "Regime detection"]
  },
  {
    id: "validation",
    title: "03. 8-Gate Validation",
    desc: "Every candidate is stress-tested against historical chaos. Each surviving candidate is fully backtested and rendered as an equity and drawdown profile.",
    icon: Beaker,
    color: "#F0B429",
    details: ["Monte Carlo", "Walk-Forward", "Slippage models"]
  },
  {
    id: "certification",
    title: "04. Certification",
    desc: "The top 3% are hashed and ready for deployment. Certified strategies ship with a shareable NEXUS report — equity curve, regime breakdown, and stress results.",
    icon: CheckCircle,
    color: "#00E676",
    details: ["Immutable Ledger", "API Export", "Performance Proof"]
  }
];

const ConsoleLine = ({ text, delay = 0 }: { text: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-center gap-2 text-[10px] font-mono text-[#4A5568] mb-1"
  >
    <ChevronRight className="w-2 h-2 text-[#F0B429]" />
    <span>{text}</span>
  </motion.div>
);

import { trackCTA } from '../lib/analytics';
import { BetaModal } from './BetaModal';
import { useState } from 'react';

export const HowItWorks = () => {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);

  const handleExportClick = () => {
    trackCTA('pipeline_export_code');
    setIsBetaModalOpen(true);
  };

  return (
    <section id="how" className="py-20 px-10 bg-black overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">THE PIPELINE</h2>
        <h3 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] font-display mb-8">How NEXUS builds alpha.</h3>
        <p className="text-[#7A8BA0] text-lg max-w-2xl mx-auto font-light">
          We've automated the entire quant research lifecycle. What used to take a team of PhDs months now takes 3 minutes.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left: Interactive Pipeline Steps */}
        <div className="lg:col-span-5 space-y-4">
          {pipelineSteps.map((step, i) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl border border-[#1A2333] bg-[#0A101A] hover:border-[#F0B429]/30 transition-all relative overflow-hidden"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-black border border-[#1A2333] text-[#F0B429] group-hover:border-[#F0B429]/50 transition-colors">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold mb-2 font-display">{step.title}</h4>
                  <p className="text-sm text-[#7A8BA0] leading-relaxed mb-4">{step.desc}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((detail, j) => (
                      <span key={j} className="text-[9px] font-bold px-2 py-1 bg-black border border-[#1A2333] rounded text-[#4A5568] uppercase tracking-widest">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Connector Line */}
              {i < pipelineSteps.length - 1 && (
                <div className="absolute bottom-0 left-12 w-[1px] h-4 bg-gradient-to-b from-[#1A2333] to-transparent translate-y-full"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Right: The "Research Console" Mockup */}
        <div className="lg:col-span-7 sticky top-24">
          <div className="relative p-1 rounded-3xl bg-gradient-to-br from-[#1A2333] to-transparent">
            <div className="bg-[#05080D] rounded-[22px] overflow-hidden border border-[#1A2333] shadow-2xl">
              {/* Console Header */}
              <div className="bg-[#0A101A] px-6 py-3 border-b border-[#1A2333] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                  <span className="ml-4 text-[10px] font-mono text-[#4A5568] uppercase tracking-widest">NEXUS_RESEARCH_IDE_V2.0</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[9px] font-mono text-green-500 uppercase">Live</span>
                  </div>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-8 font-mono">
                {/* Prompt Section */}
                <div className="mb-8">
                  <div className="text-[10px] text-[#F0B429] mb-2 uppercase tracking-widest font-bold">USER_PROMPT</div>
                  <div className="p-4 rounded-xl bg-black border border-[#1A2333] text-sm text-[#E8EDF5] leading-relaxed">
                    "Build a mean-reversion strategy for <span className="text-[#F0B429]">BTC/USDT</span>. Use 4H timeframe. Exit if volatility spikes {">"} 20%. Stress test for <span className="text-[#F0B429]">FTX-style</span> liquidity events."
                  </div>
                </div>

                {/* Processing Section */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-[10px] text-[#4A5568] mb-4 uppercase tracking-widest font-bold">AGENT_LOGS</div>
                    <div className="space-y-1">
                      <ConsoleLine text="ATLAS: Initializing regime detection..." delay={0.1} />
                      <ConsoleLine text="ECHO: Fetching cross-asset correlations..." delay={0.3} />
                      <ConsoleLine text="SYNTH: Generating 1,024 candidates..." delay={0.5} />
                      <ConsoleLine text="GATE_1: IS/OOS Validation started..." delay={0.7} />
                      <ConsoleLine text="GATE_2: Monte Carlo simulation..." delay={0.9} />
                      <ConsoleLine text="GATE_3: Slippage impact analysis..." delay={1.1} />
                      <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-[10px] text-[#F0B429] mt-4"
                      >
                        _ PROCESSING_VALIDATION_QUEUE...
                      </motion.div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="text-[10px] text-[#4A5568] mb-4 uppercase tracking-widest font-bold">VALIDATION_GATES</div>
                    <div className="space-y-2">
                      {[
                        { label: "IS/OOS Consistency", status: "PASS", val: "1.14" },
                        { label: "Monte Carlo (10k)", status: "PASS", val: "94%" },
                        { label: "Walk-Forward", status: "PASS", val: "0.88" },
                        { label: "Regime Robustness", status: "PASS", val: "0.91" },
                        { label: "Black Swan Stress", status: "PASS", val: "0.76" },
                        { label: "Synthesis Gate", status: "WAIT", val: "..." },
                      ].map((gate, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded bg-black/40 border border-[#1A2333]">
                          <span className="text-[9px] text-[#7A8BA0] uppercase tracking-tighter">{gate.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-white">{gate.val}</span>
                            <span className={`text-[9px] font-bold ${gate.status === 'PASS' ? 'text-green-500' : 'text-[#F0B429]'}`}>{gate.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Final Output Preview */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="mt-8 p-4 rounded-xl border border-green-500/30 bg-green-500/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest">STRATEGY_CERTIFIED ✓</div>
                      <div className="text-xs text-white/80">SHA-256: 8f2b...9e1a</div>
                      <div className="text-[9px] text-[#4A5568] mt-1 font-mono">REPORT: Interactive equity & drawdown charts generated. Research trail stored in Evidence Ledger.</div>
                    </div>
                  </div>
                  <button 
                    onClick={handleExportClick}
                    className="px-4 py-2 bg-green-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg"
                  >
                    Export Code
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <BetaModal 
        isOpen={isBetaModalOpen} 
        onClose={() => setIsBetaModalOpen(false)} 
        title="NEXUS Live Exports are in private beta."
        source="pipeline_export_code"
      />
    </section>
  );
};
