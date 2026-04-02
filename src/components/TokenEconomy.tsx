import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Coins, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const data = [
  { name: 'Strategy R&D', value: 40, color: '#F0B429', desc: 'Allocation for strategy generation and backtesting.' },
  { name: 'Compute Resources', value: 30, color: '#7A8BA0', desc: 'Dedicated GPU/CPU time for Monte Carlo and stress tests.' },
  { name: 'Ecosystem Incentives', value: 20, color: '#4A5568', desc: 'Rewards for developers and strategy contributors.' },
  { name: 'Governance', value: 10, color: '#1A2333', desc: 'System voting and protocol development.' },
];

export const TokenEconomy = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="tokenomics" className="py-12 px-10 bg-black border-y border-[#1A2333]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="group inline-flex flex-col items-center"
          >
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-[#4A5568] group-hover:text-[#F0B429] uppercase mb-2 font-['JetBrains_Mono'] transition-colors">OPTIONAL DEEP DIVE: TOKEN ECONOMY</h2>
            <div className="flex items-center gap-2 text-white group-hover:text-[#F0B429] transition-colors">
              <span className="text-xl font-bold font-display uppercase tracking-tight">NEXUS Credits Allocation</span>
              {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="h-[400px] w-full relative group">
                    <div className="absolute inset-0 bg-[#F0B429]/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={140}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#050709', 
                            borderColor: '#1A2333',
                            borderRadius: '8px',
                            padding: '10px'
                          }}
                          itemStyle={{ color: '#F0B429', fontSize: '12px', fontWeight: 'bold' }}
                          labelStyle={{ color: '#7A8BA0', fontSize: '10px', marginBottom: '5px', textTransform: 'uppercase' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <Coins className="w-8 h-8 text-[#F0B429] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white font-display">100%</div>
                      <div className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest">Allocation</div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {data.map((item, i) => (
                      <div 
                        key={i} 
                        className="p-6 rounded-2xl border border-[#1A2333] bg-[#0A101A] group hover:border-[#F0B429]/30 transition-all flex items-center gap-6"
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold font-['JetBrains_Mono']" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                          {item.value}%
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#F0B429] transition-colors font-display">{item.name}</h4>
                          <p className="text-sm text-[#7A8BA0] leading-relaxed italic">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-20 p-8 rounded-3xl bg-[#F0B429]/5 border border-[#F0B429]/10 text-center">
                  <p className="text-sm text-[#7A8BA0] italic max-w-3xl mx-auto">
                    "The NEXUS Credit system is designed to incentivize high-quality research while ensuring the platform remains sustainable and decentralized. Every credit spent is a vote for the future of quant finance."
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
