import React from 'react';
import { Check, X, Minus } from 'lucide-react';

const IconWrapper = ({ icon: Icon, color }: { icon: any, color: string }) => (
  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${color}`}>
    <Icon className="w-4 h-4 text-white" />
  </div>
);

const CheckIcon = () => <IconWrapper icon={Check} color="bg-[#00E676]" />;
const CrossIcon = () => <IconWrapper icon={X} color="bg-[#FF4444]" />;
const TildeIcon = () => <IconWrapper icon={Minus} color="bg-[#F0B429]" />;

export const ComparisonTable = () => (
  <section id="comparison" className="py-24 px-10 max-w-7xl mx-auto">
    <div className="mb-16">
      <h2 className="text-5xl font-bold tracking-tighter mb-5">Why NEXUS.</h2>
      <p className="text-[#7A8BA0] text-base leading-relaxed">Not a backtesting tool. Not a signal provider. An autonomous research system that does what a $500K/year quant team does — at $99/month.</p>
    </div>

    <div className="overflow-x-auto bg-[#0D1117] border border-[#1A2333] rounded-xl">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#111820] border-b border-[#1A2333]">
          <tr>
            <th className="p-6 font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-[#3A4A5C]">Capability</th>
            <th className="p-6 font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-[#3A4A5C]">Traditional Quant Team</th>
            <th className="p-6 font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-[#3A4A5C]">QuantConnect / Zipline</th>
            <th className="p-6 font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-[#00D4FF]">NEXUS IDE</th>
          </tr>
        </thead>
        <tbody className="text-[#E8EDF5]">
          {[
            { cap: 'Strategy generation', trad: 'Human: weeks', qc: 'Manual code', nexus: 'Plain English: 3 mins' },
            { cap: 'Walk-forward validation', trad: <><CheckIcon /> Months</>, qc: <><TildeIcon /> Manual setup</>, nexus: <><CheckIcon /> Automatic</> },
            { cap: 'Multiple testing correction', trad: <><TildeIcon /> Rarely done</>, qc: <><CrossIcon /> Not included</>, nexus: <><CheckIcon /> DSR + PBO</> },
            { cap: 'Deterministic safety gate', trad: <><CrossIcon /> Human only</>, qc: <><CrossIcon /> No gate</>, nexus: <><CheckIcon /> 0% false-pass</> },
            { cap: 'Evidence ledger', trad: <><CrossIcon /> Internal</>, qc: <><CrossIcon /> None</>, nexus: <><CheckIcon /> SHA-256</> },
            { cap: 'Cost per strategy', trad: '$500K+/year', qc: 'Free platform, $$$$ researcher', nexus: '~ $99/month' },
            { cap: 'Time to result', trad: '3–6 months', qc: 'Weeks', nexus: '3 minutes' },
            { cap: 'Marketplace', trad: <><CrossIcon /></>, qc: <><TildeIcon /> Basic</>, nexus: <><CheckIcon /> Certified-only</> },
          ].map((row, i) => (
            <tr key={i} className="border-b border-[#1A2333] last:border-0 hover:bg-[#111820]/50 transition-colors">
              <td className="p-6">{row.cap}</td>
              <td className="p-6 text-[#7A8BA0]">{row.trad}</td>
              <td className="p-6 text-[#7A8BA0]">{row.qc}</td>
              <td className="p-6 font-bold text-[#00D4FF] relative bg-[rgba(0,212,255,0.05)]">
                <span className="absolute -top-2 -right-2 bg-[#00D4FF] text-black text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">Recommended</span>
                <div className="flex items-center gap-3">{row.nexus}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);
