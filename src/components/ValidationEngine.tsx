import { motion } from "motion/react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Shield, Zap, BarChart3, Activity, Lock, Globe, ShieldAlert, Cpu } from "lucide-react";

const radarData = [
  { subject: 'Sharpe', A: 120, fullMark: 150 },
  { subject: 'MaxDD', A: 98, fullMark: 150 },
  { subject: 'Win Rate', A: 86, fullMark: 150 },
  { subject: 'Profit Factor', A: 99, fullMark: 150 },
  { subject: 'Stability', A: 85, fullMark: 150 },
];

const layers = [
  { title: "01. IS/OOS Consistency", icon: BarChart3, desc: "Ensures strategy logic holds across unseen data sets." },
  { title: "02. Walk-Forward Stability", icon: Activity, desc: "Parameter optimization across rolling time windows." },
  { title: "03. Monte Carlo (10k)", icon: Zap, desc: "10,000+ randomized trade sequence simulations." },
  { title: "04. Cost Sensitivity", icon: Shield, desc: "Stress testing against extreme slippage and commissions." },
  { title: "05. Regime Robustness", icon: Globe, desc: "Validation across Bull, Bear, and Sideways regimes." },
  { title: "06. Black Swan Stress", icon: ShieldAlert, desc: "Simulated performance during tail-risk events (e.g. 2020, FTX)." },
  { title: "07. Parameter Sensitivity", icon: Cpu, desc: "Ensures alpha isn't dependent on 'lucky' input values." },
  { title: "08. Synthesis Gate", icon: Lock, desc: "Final deterministic certification and SHA-256 hashing, so NEXUS can learn from both your winners and your failed ideas over time." },
];

export const ValidationEngine = () => (
  <section className="py-20 px-10 bg-[#05080D]">
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">VALIDATION ENGINE</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] font-display mb-8">The Multi-Layer <br />Certification Stack.</h3>
          
          <div className="space-y-4">
            {layers.map((layer, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl border border-[#1A2333] bg-[#0A101A] flex items-start gap-4 group hover:border-[#F0B429]/50 transition-all"
              >
                <div className="p-2 rounded-lg bg-[#F0B429]/10 text-[#F0B429]">
                  <layer.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{layer.title}</h4>
                  <p className="text-xs text-[#7A8BA0] leading-relaxed">{layer.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-[#F0B429]/5 blur-3xl rounded-full"></div>
          <div className="relative p-8 rounded-3xl border border-[#1A2333] bg-black/40 backdrop-blur-sm">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <div className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest mb-1">ROBUSTNESS SCORE</div>
                <div className="text-3xl font-black text-[#F0B429] font-['JetBrains_Mono']">94.2/100</div>
                <p className="text-[9px] text-[#4A5568] mt-2 leading-tight">This score powers the equity and drawdown charts you see for every strategy — they’re not just pretty graphs, they visualize the entire validation stack.</p>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-1">STATUS</div>
                <div className="text-xs font-bold text-white">CERTIFIED ✓</div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#1A2333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#4A5568', fontSize: 10 }} />
                  <Radar
                    name="Strategy"
                    dataKey="A"
                    stroke="#F0B429"
                    fill="#F0B429"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-[#0A101A] border border-[#1A2333]">
                <div className="text-[9px] font-bold text-[#4A5568] uppercase mb-1">IS/OOS Ratio</div>
                <div className="text-sm font-bold text-white">1.14</div>
              </div>
              <div className="p-3 rounded-lg bg-[#0A101A] border border-[#1A2333]">
                <div className="text-[9px] font-bold text-[#4A5568] uppercase mb-1">DSR Score</div>
                <div className="text-sm font-bold text-white">0.92</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
