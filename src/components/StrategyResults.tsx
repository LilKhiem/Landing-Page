import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';
import { TrendingUp, Percent, ArrowDownCircle, DollarSign } from 'lucide-react';

const equityData = [
  { day: 'Day 1', equity: 10000 },
  { day: 'Day 10', equity: 10500 },
  { day: 'Day 20', equity: 10200 },
  { day: 'Day 30', equity: 11200 },
  { day: 'Day 40', equity: 11800 },
  { day: 'Day 50', equity: 11500 },
  { day: 'Day 60', equity: 12500 },
];

const drawdownData = [
  { day: 'Day 1', dd: 0 },
  { day: 'Day 10', dd: 1 },
  { day: 'Day 20', dd: 3 },
  { day: 'Day 30', dd: 0 },
  { day: 'Day 40', dd: 0 },
  { day: 'Day 50', dd: 2 },
  { day: 'Day 60', dd: 0 },
];

const KPIBox = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="bg-[#0D1117] border border-[#1A2333] p-6 rounded-xl">
    <div className="flex items-center gap-3 mb-3">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-[#7A8BA0] text-xs font-['JetBrains_Mono'] uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-3xl font-bold font-display tracking-tight">{value}</div>
  </div>
);

export const StrategyResults = () => (
  <section id="results" className="py-20 px-10 max-w-7xl mx-auto">
    <div className="mb-12">
      <div className="text-[10px] font-bold text-[#F0B429] uppercase tracking-widest mb-6">This entire block – performance table, equity curve, and drawdown chart – is the answer NEXUS generates when you ask a single question in NEXUS Chat.</div>
      <div className="font-['JetBrains_Mono'] text-[11px] tracking-[0.2em] uppercase text-[#F0B429] mb-4">Validation Results</div>
      <h2 className="font-display text-5xl md:text-7xl font-bold tracking-[-0.03em] mb-4">Performance</h2>
      <p className="text-[#7A8BA0] text-base leading-relaxed max-w-xl">Detailed backtesting metrics for your certified strategy.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <KPIBox icon={TrendingUp} label="Sharpe Ratio" value="3.15" color="text-[#F0B429]" />
      <KPIBox icon={ArrowDownCircle} label="Max Drawdown" value="2.1%" color="text-[#FF4444]" />
      <KPIBox icon={Percent} label="Win Rate" value="68.4%" color="text-[#00E676]" />
      <KPIBox icon={DollarSign} label="Total Profit" value="$2,500" color="text-[#F0B429]" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#0D1117] border border-[#1A2333] p-8 rounded-xl">
        <div className="text-[9px] font-bold text-[#F0B429] uppercase tracking-widest mb-2">Generated automatically from your last NEXUS run.</div>
        <h3 className="font-display text-2xl font-bold mb-6">Equity Curve</h3>
        <div className="h-48 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={equityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2333" />
              <XAxis dataKey="day" stroke="#7A8BA0" fontSize={12} />
              <YAxis stroke="#7A8BA0" fontSize={12} />
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
              <Area type="monotone" dataKey="equity" stroke="#F0B429" fill="#F0B429" fillOpacity={0.1} />
              <Brush 
                dataKey="day" 
                height={30} 
                stroke="#1A2333" 
                fill="#0D1117" 
                fillOpacity={0.5}
                travellerWidth={10}
                tickFormatter={() => ''}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-[#0D1117] border border-[#1A2333] p-8 rounded-xl">
        <h3 className="font-display text-2xl font-bold mb-6">Drawdown</h3>
        <div className="h-48 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={drawdownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2333" />
              <XAxis dataKey="day" stroke="#7A8BA0" fontSize={12} />
              <YAxis stroke="#7A8BA0" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#050709', 
                  borderColor: '#1A2333',
                  borderRadius: '8px',
                  padding: '10px'
                }}
                itemStyle={{ color: '#FF4444', fontSize: '12px', fontWeight: 'bold' }}
                labelStyle={{ color: '#7A8BA0', fontSize: '10px', marginBottom: '5px', textTransform: 'uppercase' }}
              />
              <Area type="monotone" dataKey="dd" stroke="#FF4444" fill="#FF4444" fillOpacity={0.1} />
              <Brush 
                dataKey="day" 
                height={30} 
                stroke="#1A2333" 
                fill="#0D1117" 
                fillOpacity={0.5}
                travellerWidth={10}
                tickFormatter={() => ''}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-[#4A5568] mt-4 italic">Both charts update every time you tweak your idea and re‑run the lab. They are the visual output of the entire 8-gate validation stack.</p>
      </div>
    </div>
  </section>
);
