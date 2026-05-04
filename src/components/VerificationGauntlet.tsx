import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Zap, 
  Target, 
  AlertTriangle, 
  BarChart3, 
  Cpu, 
  Database, 
  Lock, 
  CheckCircle2, 
  XCircle,
  TrendingDown,
  Activity,
  FileText,
  Share2,
  Skull,
  TrendingUp,
  Fingerprint,
  ZapOff
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const gauntletStages = [
  {
    id: 'execution',
    title: "Realistic Perps Execution",
    icon: Zap,
    desc: "We simulate extreme thin-liquidity events where slippage isn't just a cost—it's a liquidation event. Funding rate flips and partial fills are modeled against real-time order-book depth from top-tier venues (Binance, Bybit, OKX).",
    visual: "Split-screen comparison: [Left: Optimistic Backtest Fill] vs [Right: Reality-Decimated Slip -65bps]",
    rules: ["Min Liquidity Floor: 100x Nominal Size", "Variable Funding Stress: -0.15% Hourly", "Full Order-Book Depth Simulation"]
  },
  {
    id: 'overfitting',
    title: "Overfitting Attack (C.M.I.O.)",
    icon: Cpu,
    desc: "Cross-Market Influence Optimization. We use 'Agentic Noise Injection' to try and break your logic. If your alpha only lives in a hand-picked parameter window, we expose the curve-fitting before the market does.",
    visual: "3D parameter landscape turning into a 'shattered glass' effect as noise is injected.",
    rules: ["Probabilistic Sharpe Filter: > 95% Confidence", "Parameter Sensitivity Floor: < 1.5% Var", "Noise Resistance Threshold: 80%"]
  },
  {
    id: 'regime',
    title: "Regime Shift Survival",
    icon: Activity,
    desc: "Your strategy won in the 2025 bull run? Great. Now we drop it into the 2022 LUNA death spiral and the 2026 'Liquidity Black Hole' events. If the equity curve doesn't hold, the strategy is discarded.",
    visual: "Strategy heart-rate monitor style UI flatlining during 'FTX 2.0' replay.",
    rules: ["Max DD Threshold: 15% (Hard Limit)", "Correlation Break Replay: 10 Scenario Min", "Recovery Speed Requirement: < 30 Days"]
  },
  {
    id: 'portfolio',
    title: "Tail Risk & Correlation",
    icon: TrendingDown,
    desc: "Most quants underestimate 'everything-goes-to-zero' correlations. We stress-test your strategy inside a multi-asset portfolio context to ensure it doesn't just add tail risk.",
    visual: "Heatmap of 50 assets flashing bright red then showing the strategy's survival path.",
    rules: ["Asset-Specific Correlation Ceiling: 0.4", "Tail-End VaR Constraint: 99.9%", "Portfolio Volatility Contribution: < 5%"]
  }
];

const reportData = [
  { subject: 'Slippage', A: 85, fullMark: 100 },
  { subject: 'Funding', A: 92, fullMark: 100 },
  { subject: 'Overfit', A: 95, fullMark: 100 },
  { subject: 'Regime', A: 78, fullMark: 100 },
  { subject: 'Tail Risk', A: 88, fullMark: 100 },
  { subject: 'Recovery', A: 91, fullMark: 100 },
];

export const VerificationGauntlet = ({ onOpenWaitlist }: { onOpenWaitlist?: () => void }) => {
  const [activeStage, setActiveStage] = useState(0);

  const ActiveIcon = gauntletStages[activeStage].icon;

  return (
    <section id="features" className="py-24 px-6 md:px-10 bg-[#050709] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[#F0B429]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-black tracking-widest uppercase mb-8"
            >
              <Lock className="w-3 h-3" />
              Independent | Transparent | Institutional-Grade
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold tracking-[-0.04em] font-display mb-8 leading-[0.95]"
            >
              The NEXUS <br /><span className="text-[#F0B429]">Verification Gauntlet.</span>
            </motion.h2>
            <p className="text-[#7A8BA0] text-xl leading-relaxed max-w-2xl font-medium">
              We try to kill your strategy first, before the market kills it with your money. This isn't just a backtest—it's an industrial-grade audit for crypto quants.
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-4 p-8 bg-[#0A101A] border border-[#1A2333] rounded-[2rem]">
            <div className="text-[10px] font-black text-[#4A5568] uppercase tracking-[0.3em]">LIVE VERIFICATION FEED</div>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-2xl font-black text-white">1.04M</div>
                <div className="text-[9px] text-[#4A5568] uppercase font-bold">Simulations / Hour</div>
              </div>
              <div className="w-px h-10 bg-[#1A2333]" />
              <div className="text-center">
                <div className="text-2xl font-black text-red-500">92.4%</div>
                <div className="text-[9px] text-[#4A5568] uppercase font-bold">Gauntlet Fail Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Stage List */}
          <div className="lg:col-span-5 space-y-3">
            {gauntletStages.map((stage, i) => {
              const StageIcon = stage.icon;
              return (
                <motion.button
                  key={stage.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveStage(i)}
                  className={`w-full p-6 text-left rounded-[1.5rem] transition-all group relative overflow-hidden border ${
                    activeStage === i 
                      ? 'bg-[#0A101A] border-[#F0B429] shadow-[0_0_40px_rgba(240,180,41,0.08)]' 
                      : 'bg-transparent border-[#1A2333] hover:border-[#F0B429]/40 hover:bg-[#0A101A]/30'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      activeStage === i ? 'bg-[#F0B429] text-black shadow-[0_0_20px_rgba(240,180,41,0.3)]' : 'bg-[#1A2333] text-[#4A5568] group-hover:text-white'
                    }`}>
                      <StageIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className={`text-lg font-bold transition-colors ${
                          activeStage === i ? 'text-white' : 'text-[#7A8BA0] group-hover:text-white'
                        }`}>
                          {stage.title}
                        </h4>
                        <span className="text-[10px] font-black text-[#4A5568] group-hover:text-[#F0B429] transition-colors">STAGE 0{i+1}</span>
                      </div>
                      <p className="text-xs text-[#4A5568] leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-all">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active Visualization */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-[#0A101A] border border-[#1A2333] rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                {/* Visual Simulation Display */}
                <div className="h-[400px] bg-black border-b border-[#1A2333] relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(240,180,41,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(240,180,41,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
                  
                  {/* Simulation Meta */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                       <span className="text-[10px] font-black text-[#7A8BA0] uppercase tracking-widest">Running Gauntlet Simulation</span>
                    </div>
                    <div className="text-[11px] font-['JetBrains_Mono'] text-white/40">Latency: 12ms | Load: 88% | Agent: ATLAS_GAUNTLET</div>
                  </div>

                  {/* Stage-Specific Mock UI */}
                  <div className="relative text-center px-10">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[11px] text-[#F0B429] font-['JetBrains_Mono'] mb-10 uppercase tracking-[0.4em]"
                    >
                      [ {gauntletStages[activeStage].visual} ]
                    </motion.div>
                    
                    <div className="flex flex-col items-center gap-10">
                      <div className="relative">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-48 h-48 border border-dashed border-[#F0B429]/30 rounded-full flex items-center justify-center"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-32 h-32 bg-gradient-to-br from-[#F0B429]/20 to-transparent border border-[#F0B429]/50 rounded-full flex items-center justify-center backdrop-blur-md"
                          >
                             <ActiveIcon className="w-10 h-10 text-[#F0B429]" />
                          </motion.div>
                        </div>
                        {/* Orbiting dots */}
                        <motion.div 
                          animate={{ rotate: -360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0"
                        >
                           <div className="absolute -top-1 left-1/2 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#f00]" />
                        </motion.div>
                      </div>
                      
                      <div className="flex gap-3">
                         {[1,2,3,4,5,6].map(i => (
                           <motion.div 
                             key={i}
                             animate={{ height: [4, 12, 4] }}
                             transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                             className="w-1.5 bg-[#F0B429] rounded-full" 
                           />
                         ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-10 grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h5 className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                       <Fingerprint className="w-4 h-4 text-[#F0B429]" />
                       Strict Audit Parameters
                    </h5>
                    <ul className="space-y-4">
                      {gauntletStages[activeStage].rules.map((rule, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-sm text-[#7A8BA0] font-medium leading-tight">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600/60 shadow-[0_0_5px_red]" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                       <Zap className="w-4 h-4 text-[#F0B429]" />
                       The Gauntlet Objective
                    </h5>
                    <p className="text-sm text-[#4A5568] leading-relaxed font-medium">
                      {gauntletStages[activeStage].desc}
                    </p>
                    <div className="pt-4 border-t border-[#1A2333]">
                       <div className="text-[10px] text-white/20 font-black uppercase tracking-widest">Simulation Source Table</div>
                       <div className="text-[11px] text-[#7A8BA0] font-['JetBrains_Mono'] mt-1">L1/L2 ORDERBOOK REALTIME DEEP_DATA_2026</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* The Final Report Section */}
        <div id="report" className="mt-32">
          <div className="text-center mb-16">
             <h3 className="text-3xl md:text-5xl font-black mb-4">The Verification Report.</h3>
             <p className="text-[#7A8BA0] text-lg font-medium">Independent proof of alpha. Not just numbers—a blueprint for execution.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-8 md:p-16 bg-white rounded-[3.5rem] overflow-hidden relative shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
          >
            <div className="relative z-10 grid lg:grid-cols-12 gap-16">
              {/* Left Column: Stats & Breakdown */}
              <div className="lg:col-span-12 xl:col-span-5">
                <div className="flex items-center gap-5 mb-12">
                  <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                     <FileText className="w-7 h-7 text-[#F0B429]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-black leading-none uppercase tracking-tighter">Verification Report</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-black mt-2">ID: NX-A-2026-0812 | HASH: 0x82...BF91</p>
                  </div>
                </div>

                <div className="flex items-center gap-10 mb-12 bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                  <div className="flex-1">
                    <div className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Robustness Score</div>
                    <div className="flex items-baseline gap-2">
                       <span className="text-8xl font-black text-black font-display tracking-tight">94</span>
                       <span className="text-3xl font-bold text-gray-300">/100</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <div className="px-5 py-2 rounded-full border-2 border-green-500 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                       <CheckCircle2 className="w-4 h-4" /> Fund Grade
                     </div>
                     <div className="px-5 py-2 rounded-full border border-black/10 text-gray-600 text-[10px] font-black uppercase tracking-widest flex items-center justify-center">
                       High Conviction
                     </div>
                  </div>
                </div>

                {/* Kill Report & Strengths */}
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[11px] font-black text-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                       <Skull className="w-4 h-4 text-red-600" />
                       Kill Report (Primary Failure)
                    </h5>
                    <div className="p-6 bg-red-50 rounded-[1.5rem] border border-red-100">
                      <div className="text-sm font-bold text-red-700 mb-1">Liquidity Vacuum Event (FTX 2.0 Replay)</div>
                      <p className="text-xs text-red-600/80 leading-relaxed font-medium">
                        Strategy failed during a 15-minute correlation flip. Expected slippage decoupled from reality by 4x. Risk of ruin: <span className="font-black">8.2%</span> if account size exceeds <span className="font-black">$1.5M</span>.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-6 bg-green-50/50 rounded-[1.5rem] border border-green-100/50">
                      <div className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-2">Top Strength</div>
                      <div className="text-sm font-bold text-black mb-1">Regime Neutrality</div>
                      <p className="text-[10px] text-gray-500 font-medium">Maintained positive ER across both 2022 and 2026 regimes.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Weakness</div>
                      <div className="text-sm font-bold text-black mb-1">Latency Sensitivity</div>
                      <p className="text-[10px] text-gray-500 font-medium">Profit factor drops 18% if execution delay exceeds 150ms.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visualization & Recommendations */}
              <div className="lg:col-span-12 xl:col-span-7 bg-gray-950 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="flex flex-col h-full gap-10">
                  <div className="flex justify-between items-start">
                    <h5 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Strategy Performance Profile</h5>
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#F0B429] text-[10px] font-black uppercase tracking-widest">
                      Certified Alpha
                    </div>
                  </div>
                  
                  <div className="flex-1 min-h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={320}>
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={reportData}>
                        <PolarGrid stroke="#1A2333" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#4A5568', fontSize: 10, fontWeight: 'black' }} />
                        <Radar
                          name="Strategy"
                          dataKey="A"
                          stroke="#F0B429"
                          strokeWidth={2}
                          fill="#F0B429"
                          fillOpacity={0.4}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Deployment Recs */}
                  <div>
                    <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                       <TrendingUp className="w-4 h-4 text-green-500" />
                       Expert Deployment Blueprint
                    </h5>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                       {[
                         { label: "Position Size", value: "Scale to $1M Max", icon: Target },
                         { label: "Kill Switch", value: "4.2% Peak-to-Valley", icon: ZapOff },
                         { label: "Venue Priority", value: "OKX > Binance", icon: Database }
                       ].map((rec, i) => (
                         <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1">
                            <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{rec.label}</div>
                            <div className="text-xs font-bold text-white">{rec.value}</div>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* Shareable Badge Preview */}
                  <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 shadow-xl shrink-0">
                           {/* Small circular badge mockup */}
                           <div className="w-full h-full border-2 border-black rounded-full flex flex-col items-center justify-center">
                              <span className="text-[6px] font-black leading-none">ALPHA</span>
                              <span className="text-[12px] font-black">94</span>
                              <span className="text-[4px] font-black">CERTIFIED</span>
                           </div>
                        </div>
                        <p className="text-[11px] text-[#7A8BA0] font-medium leading-relaxed max-w-[180px]">
                          Your certified badge is shareable with LPs, Prop Firms, and on your profile.
                        </p>
                     </div>
                     <div className="flex gap-4">
                        <button 
                          onClick={() => onOpenWaitlist?.()}
                          className="px-6 py-3 bg-[#F0B429] text-black rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-[0_0_40px_rgba(240,180,41,0.4)] transition-all flex items-center gap-2"
                        >
                           Join Waitlist — Verify Your Strategy
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
