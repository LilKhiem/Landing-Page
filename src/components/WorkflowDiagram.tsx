import React from 'react';
import { motion } from "motion/react";
import { Beaker, Rocket, TestTube, BarChart, ArrowRight, ShieldCheck } from "lucide-react";

const workflowSteps = [
  { id: "backtest", title: "Backtest", icon: Beaker, desc: "Historical validation across 10+ years of data." },
  { id: "certify", title: "Certify", icon: ShieldCheck, desc: "8-gate validation and SHA-256 evidence logging." },
  { id: "deploy", title: "Deploy", icon: Rocket, desc: "Seamless CI/CD transition to live markets." },
  { id: "monitor", title: "Monitor", icon: BarChart, desc: "Real-time performance and robustness monitoring." }
];

export const WorkflowDiagram = () => (
  <section className="py-24 px-10 bg-[#05080D] border-y border-[#1A2333]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">WORKFLOW DIAGRAM</h2>
        <h3 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] font-display mb-6">From research to live deployment, on autopilot.</h3>
        <p className="text-[#7A8BA0] text-lg max-w-2xl mx-auto font-light">
          The NEXUS CI/CD pipeline is a deterministic journey from plain English to certified deployment.
        </p>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        {workflowSteps.map((step, i) => (
          <React.Fragment key={step.id}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 w-full md:max-w-[240px] p-8 rounded-3xl bg-[#0A101A] border border-[#1A2333] group hover:border-[#F0B429]/50 transition-all text-center relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1A2333] border border-[#F0B429]/30 text-[9px] font-bold text-[#F0B429] uppercase tracking-widest">
                STEP 0{i + 1}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-black border border-[#1A2333] flex items-center justify-center text-[#F0B429] mx-auto mb-6 group-hover:shadow-[0_0_20px_rgba(240,180,41,0.2)] transition-all">
                <step.icon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 font-display">{step.title}</h4>
              <p className="text-xs text-[#7A8BA0] leading-relaxed italic">{step.desc}</p>
            </motion.div>

            {i < workflowSteps.length - 1 && (
              <div className="hidden md:flex items-center text-[#1A2333]">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <ArrowRight className="w-8 h-8" />
                </motion.div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-20 flex flex-col md:flex-row justify-center gap-8 text-center">
        <div className="p-6 rounded-2xl bg-[#0A101A] border border-[#1A2333] flex-1 max-w-sm">
          <div className="text-[10px] font-bold text-[#F0B429] uppercase tracking-widest mb-2">Continuous Loop</div>
          <p className="text-xs text-[#7A8BA0] leading-relaxed italic">
            "NEXUS doesn't just deploy; it monitors. If metrics drift, the strategy is automatically pulled for re-validation."
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0A101A] border border-[#1A2333] flex-1 max-w-sm">
          <div className="text-[10px] font-bold text-[#F0B429] uppercase tracking-widest mb-2">Deterministic Path</div>
          <p className="text-xs text-[#7A8BA0] leading-relaxed italic">
            "Every step is hashed. The SHA-256 evidence ledger ensures your research trail is immutable and audit-ready."
          </p>
        </div>
      </div>
    </div>
  </section>
);
