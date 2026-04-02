import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Zap, Clock, Users, ShieldCheck } from 'lucide-react';

const benchmarkData = [
  { name: 'NEXUS IDE', value: 3, label: '3 mins', color: '#F0B429' },
  { name: 'Claude Code', value: 30, label: '30 mins', color: '#4A5568' },
  { name: 'Manual Quant Team', value: 2400, label: '40 hours', color: '#1A2333' }
];

export const PerformanceBenchmarks = () => (
  <section id="benchmarks" className="py-24 px-10 bg-[#05080D] border-y border-[#1A2333]">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">PERFORMANCE BENCHMARKS</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] font-display mb-8">NEXUS vs. The World.</h3>
          <p className="text-[#7A8BA0] text-lg font-light leading-relaxed mb-6">
            Time from English prompt to certified alpha (e.g., BTCUSD Momentum). NEXUS isn't just faster; it's an order of magnitude more efficient.
          </p>

          <div className="space-y-6">
            {[
              { icon: Zap, title: "10x Faster than AI", desc: "Optimized for quant research, beating general AI coding tools by 1,000%." },
              { icon: Clock, title: "800x Faster than Manual", desc: "What takes a team a full work week, NEXUS completes in 3 minutes." },
              { icon: ShieldCheck, title: "Certified Accuracy", desc: "Deterministic outputs and SHA-256 hashed for proof of research." }
            ].map((item, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="p-3 rounded-xl bg-[#F0B429]/10 text-[#F0B429]">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 font-display">{item.title}</h4>
                  <p className="text-[#7A8BA0] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0A101A] border border-[#1A2333] p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F0B429]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="mb-8 flex justify-between items-end">
            <div>
              <div className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest mb-1">METRIC: TIME TO CERTIFIED ALPHA</div>
              <div className="text-2xl font-bold text-white font-display uppercase tracking-tight">Efficiency Gap</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-[#F0B429] uppercase tracking-widest mb-1">NEXUS ADVANTAGE</div>
              <div className="text-3xl font-black text-[#F0B429] font-['JetBrains_Mono']">10X - 800X</div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2333" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#7A8BA0" 
                  fontSize={10} 
                  tick={{ fill: '#7A8BA0', fontWeight: 'bold' }}
                  width={120}
                />
                <Tooltip 
                  cursor={{ fill: '#1A2333', opacity: 0.5 }}
                  contentStyle={{ 
                    backgroundColor: '#050709', 
                    borderColor: '#1A2333',
                    borderRadius: '8px',
                    padding: '10px'
                  }}
                  itemStyle={{ color: '#F0B429', fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ color: '#7A8BA0', fontSize: '10px', marginBottom: '5px', textTransform: 'uppercase' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                  {benchmarkData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-black/40 border border-[#1A2333] text-center">
            <p className="text-[10px] text-[#4A5568] font-bold uppercase tracking-widest leading-relaxed">
              *Manual Quant Team estimate based on 40-hour research cycle per strategy. <br />
              Claude Code estimate based on multiple prompt-debug-test iterations.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
