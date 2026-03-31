import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const radarData = [
  { subject: 'IS Sharpe', A: 120 },
  { subject: 'OOS Sharpe', A: 98 },
  { subject: 'DSR', A: 86 },
  { subject: 'PBO', A: 99 },
  { subject: 'MaxDD', A: 85 },
];

export const ValidationEngine = () => (
  <section className="py-24 px-10 max-w-7xl mx-auto">
    <div className="mb-16">
      <div className="font-['JetBrains_Mono'] text-[11px] tracking-[0.2em] uppercase text-[#00D4FF] mb-4">The Validation Engine</div>
      <h2 className="text-5xl font-bold tracking-tighter mb-5">The only platform where the AI kills its own strategies.</h2>
      <p className="text-[#7A8BA0] text-base leading-relaxed max-w-xl">8-gate deterministic pipeline, no LLM override.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* 3D Diagram */}
      <div className="flex justify-center items-center perspective-1000">
        <div className="relative w-64 h-80 transform-style-3d rotate-x-15 rotate-y-15">
          {[
            { name: 'Layer 1: In-Sample', color: 'bg-red-500', kpi: '80%' },
            { name: 'Layer 2: Walk-Forward', color: 'bg-orange-500', kpi: '84%' },
            { name: 'Layer 3: LOYO', color: 'bg-yellow-500', kpi: '88%' },
            { name: 'Layer 4: Cost Stress', color: 'bg-lime-500', kpi: '92%' },
            { name: 'Layer 5: SYNTHESIS', color: 'bg-green-500', kpi: '96%' },
          ].map((layer, i) => (
            <div 
              key={i} 
              className={`absolute w-full h-12 ${layer.color} text-black font-bold flex items-center justify-center rounded shadow-lg transition-all duration-300 hover:scale-105 group`}
              style={{ transform: `translateZ(${i * 40}px)` }}
            >
              {layer.name}
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#050709] border border-[#1A2333] p-2 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                KPI: {layer.kpi} | Color: {layer.color.replace('bg-', '')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-[#0D1117] p-6 rounded-xl border border-[#1A2333]">
        <h3 className="text-xl font-bold mb-6">Strategy Robustness</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#1A2333" />
              <PolarAngleAxis dataKey="subject" stroke="#7A8BA0" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#7A8BA0" />
              <Radar name="Robustness" dataKey="A" stroke="#00D4FF" fill="#00D4FF" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Metrics Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-[#1A2333] rounded-xl overflow-hidden mt-12">
      {[
        { val: '0%', label: 'False-pass rate' },
        { val: '94.4%', label: 'Dual-model catch rate' },
        { val: 'DSR > 0.92', label: 'Multiple testing correction' },
        { val: 'PBO < 0.10', label: 'Overfitting probability' },
      ].map((stat, i) => (
        <div key={i} className="bg-[#0D1117] p-8 text-center">
          <div className="text-3xl font-bold text-[#00D4FF]">{stat.val}</div>
          <div className="text-[10px] text-[#3A4A5C] font-['JetBrains_Mono'] uppercase tracking-widest mt-2">{stat.label}</div>
        </div>
      ))}
    </div>
  </section>
);
