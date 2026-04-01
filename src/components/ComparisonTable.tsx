import { motion } from "motion/react";
import { Check, X, Minus } from "lucide-react";

const rows = [
  { feature: "Natural Language to Strategy", nexus: true, legacy: false, llm: "~" },
  { feature: "Institutional IS/OOS/WFA", nexus: true, legacy: true, llm: false },
  { feature: "Monte Carlo Stress Testing", nexus: true, legacy: true, llm: false },
  { feature: "Overfitting Correction (DSR)", nexus: true, legacy: false, llm: false },
  { feature: "Agentic Research Crew", nexus: true, legacy: false, llm: false },
  { feature: "Deployment-Ready Certification", nexus: true, legacy: false, llm: false },
];

const StatusIcon = ({ status }: { status: boolean | string }) => {
  if (status === true) return <Check className="w-5 h-5 text-[#F0B429] mx-auto" />;
  if (status === false) return <X className="w-5 h-5 text-[#4A5568] mx-auto" />;
  return <Minus className="w-5 h-5 text-[#7A8BA0] mx-auto" />;
};

export const ComparisonTable = () => (
  <section className="py-24 px-10 bg-[#05080D]">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">COMPARISON</h2>
        <h3 className="text-4xl font-extrabold tracking-tighter font-['Syne']">NEXUS vs. The Status Quo</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#1A2333]">
              <th className="py-6 px-4 text-left text-xs font-bold text-[#4A5568] uppercase tracking-widest">Feature</th>
              <th className="py-6 px-4 text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F0B429] text-black text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase whitespace-nowrap">YOU ARE HERE</div>
                <span className="text-lg font-black text-[#F0B429] font-['Syne']">NEXUS</span>
              </th>
              <th className="py-6 px-4 text-center text-sm font-bold text-[#7A8BA0] font-['Syne']">Legacy Platforms</th>
              <th className="py-6 px-4 text-center text-sm font-bold text-[#7A8BA0] font-['Syne']">Raw LLMs</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[#1A2333] group hover:bg-white/[0.02] transition-colors">
                <td className="py-6 px-4 text-sm font-medium text-[#7A8BA0]">{row.feature}</td>
                <td className="py-6 px-4 bg-[#F0B429]/5 border-x border-[#F0B429]/20">
                  <StatusIcon status={row.nexus} />
                </td>
                <td className="py-6 px-4">
                  <StatusIcon status={row.legacy} />
                </td>
                <td className="py-6 px-4">
                  <StatusIcon status={row.llm} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-12 p-6 rounded-2xl border border-[#F0B429]/20 bg-[#F0B429]/5 text-center">
        <p className="text-sm text-[#F0B429] font-medium">
          "Legacy platforms require PhDs. Raw LLMs hallucinate code. NEXUS is the only platform that bridges the gap with deterministic validation."
        </p>
      </div>
    </div>
  </section>
);
