import React from 'react';

const Check = () => <span className="text-[#00E676] text-lg">✓</span>;
const Cross = () => <span className="text-[#FF4444] text-lg">✗</span>;
const Tilde = () => <span className="text-[#F0B429] text-lg">~</span>;

export const ComparisonTable = () => (
  <section className="py-24 px-10 max-w-7xl mx-auto">
    <div className="mb-16">
      <h2 className="text-5xl font-bold tracking-tighter mb-5">What NEXUS replaces.</h2>
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
            { cap: 'Strategy generation', trad: 'Human: weeks', qc: 'Manual code', nexus: 'Plain English: 3 mins', rec: true },
            { cap: 'Walk-forward validation', trad: <><Check /> Months</>, qc: <><Tilde /> Manual setup</>, nexus: <><Check /> Automatic</>, rec: true },
            { cap: 'Multiple testing correction', trad: <><Tilde /> Rarely done</>, qc: <><Cross /> Not included</>, nexus: <><Check /> DSR + PBO</>, rec: true },
            { cap: 'Deterministic safety gate', trad: <><Cross /> Human only</>, qc: <><Cross /> No gate</>, nexus: <><Check /> 0% false-pass</>, rec: true },
            { cap: 'Evidence ledger', trad: <><Cross /> Internal</>, qc: <><Cross /> None</>, nexus: <><Check /> SHA-256</>, rec: true },
            { cap: 'Cost per strategy', trad: '$500K+/year', qc: 'Free platform, $$$$ researcher', nexus: '~ $99/month', rec: true },
            { cap: 'Time to result', trad: '3–6 months', qc: 'Weeks', nexus: '3 minutes', rec: true },
            { cap: 'Marketplace', trad: <><Cross /></>, qc: <><Tilde /> Basic</>, nexus: <><Check /> Certified-only</>, rec: true },
          ].map((row, i) => (
            <tr key={i} className={`border-b border-[#1A2333] ${row.rec ? 'bg-[#00D4FF]/5' : ''}`}>
              <td className="p-6">{row.cap}</td>
              <td className="p-6 text-[#7A8BA0]">{row.trad}</td>
              <td className="p-6 text-[#7A8BA0]">{row.qc}</td>
              <td className="p-6 font-bold text-[#00D4FF] relative">
                {row.rec && <span className="absolute -top-2 -right-2 bg-[#00D4FF] text-black text-[8px] font-bold px-1.5 rounded-full">REC</span>}
                {row.nexus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);
