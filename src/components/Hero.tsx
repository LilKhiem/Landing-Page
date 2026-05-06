import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { 
  AlertCircle, 
  CheckCircle2, 
  Skull, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  ArrowDownRight, 
  ShieldAlert, 
  Search, 
  Activity,
  X,
  Play,
  Terminal,
  BarChart3,
  Flame,
  ShieldCheck,
  AlertTriangle,
  Cpu
} from 'lucide-react';
import { toast } from 'sonner';

const KillTestDemo = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [simulationStep, setSimulationStep] = useState(0);
  const [demoLogs, setDemoLogs] = useState<string[]>([]);
  const [activeMetrics, setActiveMetrics] = useState({ ruin: 0, decay: 0, latency: 4 });
  
  const simulationData = [
    {
      title: "PRE-FLIGHT SCAN",
      logs: [
        `[${new Date().toISOString().split('T')[1]}] INITIALIZING NEXUS GAUNTLET V2.4...`,
        `> Ingesting candidate: BTC_MOMENTUM_4H_V12`,
        `> Result: 0.98 Correlation to overfit signatures detected.`,
        `> PROBING: Searching for look-ahead bias... PASSED.`,
      ]
    },
    {
      title: "ATLAS: REGIME STRESS",
      logs: [
        `[${new Date().toISOString().split('T')[1]}] ATLAS: Replaying 2022-2026 volatility regimes...`,
        `> Injecting 40% bid-side liquidity vacuum.`,
        `> WARNING: Strategy logic assumes infinite orderbook depth.`,
        `> Regime Drift: 42% deviation from backtest assumptions.`
      ]
    },
    {
      title: "ECHO: LIQUIDITY REPLAY",
      logs: [
        `[${new Date().toISOString().split('T')[1]}] ECHO: Simulating May 2024 cascade events...`,
        `> Replaying execution reality at 14ms latency.`,
        `> Echo agent detects "Toxicity Leakage" in mid-day sessions.`,
        `> Partial fill rate: 31% (Alpha requires 100%).`
      ]
    },
    {
      title: "DELTA: EXECUTION DECAY",
      logs: [
        `[${new Date().toISOString().split('T')[1]}] DELTA: Injecting 45bps slippage variance.`,
        `> Funding rates flipping negative in 3... 2... 1...`,
        `> Result: Carry costs now exceed average profit per trade.`,
        `> ALERT: Strategy is now a liquidation magnet.`
      ]
    },
    {
      title: "AGENTIC RED-TEAM",
      logs: [
        `[${new Date().toISOString().split('T')[1]}] RED-TEAM: Probing parameter sensitivity...`,
        `> Monte Carlo (n=10k) indicates 88% probability of ruin.`,
        `> Verdict: Strategy is statistically non-persistent.`,
        `> FAIL: Strategy fails to survive execution reality.`
      ]
    },
    {
      title: "FINAL AUDIT",
      logs: [
        `[${new Date().toISOString().split('T')[1]}] GENERATING KILL REPORT #8812...`,
        `> Hashing failure data to Evidence Ledger... DONE.`,
        `> LOGGED TO PUBLIC_NEGATIVE_PROOF.`,
        `> GAUNTLET COMPLETE. ALPHA_EXTINCT.`
      ]
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      setSimulationStep(0);
      setDemoLogs([]);
      setActiveMetrics({ ruin: 0, decay: 0, latency: 4 });
      return;
    }

    let currentStep = 0;
    const runSimulation = async () => {
      for (const s of simulationData) {
        setSimulationStep(currentStep);
        // Randomize metrics based on step
        setActiveMetrics(prev => ({
          ruin: Math.min(95, prev.ruin + Math.random() * 20),
          decay: Math.min(110, prev.decay + Math.random() * 25),
          latency: 4 + Math.floor(Math.random() * 12)
        }));

        for (const log of s.logs) {
          if (!isOpen) return;
          await new Promise(r => setTimeout(r, 450));
          setDemoLogs(prev => [...prev, log]);
        }
        await new Promise(r => setTimeout(r, 1200));
        currentStep++;
      }
    };

    runSimulation();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-3xl bg-black/95"
        >
          <div className="relative w-full max-w-6xl aspect-video bg-[#05070A] border-2 border-[#1A2333] rounded-[3rem] overflow-hidden flex flex-col shadow-[0_0_120px_rgba(240,180,41,0.15)]">
            {/* Header / Meta Info */}
            <div className="h-16 bg-[#0A101A] border-b border-[#1A2333] flex items-center justify-between px-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#EF4444]" />
                   <span className="text-[10px] text-[#F0B429] font-black uppercase tracking-[0.4em]">GAUNTLET_REPLAY // VERIFIER_v2.4.9</span>
                </div>
                <div className="h-4 w-px bg-[#1A2333]" />
                <div className="text-[9px] text-[#4A5568] font-mono tracking-widest">SEED_HASH: 0x82f...a12</div>
              </div>
              <button 
                onClick={onClose}
                className="group p-2 hover:bg-red-500/10 rounded-full transition-all"
              >
                <X className="w-5 h-5 text-[#7A8BA0] group-hover:text-red-500" />
              </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Left: Reality Matrix */}
              <div className="flex-1 relative bg-[#05070A] overflow-hidden border-r border-[#1A2333]">
                {/* Dynamic Scan Line */}
                <motion.div 
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F0B429]/40 to-transparent z-10 pointer-events-none"
                />
                
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                  <div className="w-full h-full bg-[linear-gradient(90deg,rgba(240,180,41,0.1)_1px,transparent_1px),linear-gradient(rgba(240,180,41,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
                </div>

                <div className="absolute inset-0 p-12 flex flex-col">
                  <AnimatePresence mode="wait">
                    {simulationStep < 5 ? (
                      <motion.div 
                        key="active"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="flex-1 flex flex-col"
                      >
                        {/* Comparison Chart Container */}
                        <div className="relative flex-1 bg-[#0A101A] border border-[#1A2333] rounded-3xl p-10 overflow-hidden group">
                          {/* Legend & Meta */}
                          <div className="absolute top-6 left-10 flex gap-6 z-20">
                             <div className="flex items-center gap-2">
                                <div className="w-3 h-0.5 bg-green-500 shadow-[0_0_8px_#10B981]" />
                                <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Beautiful Backtest (Lie)</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <div className="w-3 h-0.5 bg-red-500 shadow-[0_0_8px_#EF4444]" />
                                <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">NEXUS Gauntlet (Reality)</span>
                             </div>
                          </div>

                          <svg viewBox="0 0 800 400" className="w-full h-full opacity-80" preserveAspectRatio="none">
                            {/* Comparison Path (The Lie) */}
                            <motion.path
                              d="M 0 350 C 100 320 200 280 300 240 C 400 200 500 160 600 120 C 700 80 800 40"
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="2"
                              strokeDasharray="8 8"
                              className="opacity-20"
                            />

                            {/* Reality Path (The Gauntlet) */}
                            <motion.path
                              d={
                                simulationStep === 0 ? "M 0 350 C 100 330 200 310 300 290" :
                                simulationStep === 1 ? "M 0 350 C 100 330 250 340 300 360 C 350 380 400 370 500 365" :
                                simulationStep === 2 ? "M 0 350 C 100 340 200 370 300 390 L 400 385 L 500 395" :
                                "M 0 350 L 100 370 L 250 390 L 400 380 L 600 395 L 800 398"
                              }
                              fill="url(#realityGradient)"
                              stroke="#EF4444"
                              strokeWidth="4"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                            
                            <defs>
                              <linearGradient id="realityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                              </linearGradient>
                            </defs>

                            {/* Failure Marker */}
                            {simulationStep >= 2 && (
                               <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                  <circle cx="300" cy="390" r="10" fill="#EF4444" className="animate-ping" />
                                  <text x="320" y="380" className="fill-red-500 text-[12px] font-black font-mono">LIQUIDATION_CASCADE Detected</text>
                               </motion.g>
                            )}
                          </svg>

                          <div className="absolute bottom-10 right-12 text-right">
                             <div className={`text-5xl font-black font-mono tracking-tighter tabular-nums ${simulationStep < 1 ? 'text-green-500' : 'text-red-500'}`}>
                                {simulationStep < 1 ? '+14.2%' : `-${activeMetrics.ruin.toFixed(1)}%`}
                             </div>
                             <div className="text-[10px] text-[#7A8BA0] font-black uppercase tracking-[0.2em] mt-2">Equity Reality Gap</div>
                          </div>
                        </div>

                        {/* Metrics Bar */}
                        <div className="mt-10 grid grid-cols-4 gap-6">
                           {[
                             { label: 'Risk to Ruin', val: `${activeMetrics.ruin.toFixed(0)}%`, icon: AlertTriangle, status: 'danger' },
                             { label: 'Alpha Decay', val: `${activeMetrics.decay.toFixed(1)}%`, icon: Flame, status: 'warning' },
                             { label: 'Execution Latency', val: `${activeMetrics.latency}ms`, icon: Cpu, status: 'neutral' },
                             { label: 'Regime Drift', val: simulationStep > 1 ? 'SEVERE' : 'STABLE', icon: Activity, status: simulationStep > 1 ? 'danger' : 'neutral' }
                           ].map((m, i) => (
                             <div key={i} className="bg-[#0A101A] border border-[#1A2333] p-5 rounded-2xl flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                   <m.icon className={`w-4 h-4 ${m.status === 'danger' ? 'text-red-500 animate-pulse' : 'text-[#F0B429]'}`} />
                                   <div className={`w-1.5 h-1.5 rounded-full ${m.status === 'danger' ? 'bg-red-500' : 'bg-green-500'}`} />
                                </div>
                                <span className="text-[9px] text-[#4A5568] font-black uppercase tracking-widest leading-none mb-2">{m.label}</span>
                                <span className="text-sm font-black text-white font-mono">{m.val}</span>
                             </div>
                           ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="dead"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="flex flex-col items-center justify-center h-full text-center"
                      >
                         <div className="relative mb-12">
                            <motion.div 
                               animate={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: [0.1, 0.3, 0.1]
                               }}
                               transition={{ duration: 2, repeat: Infinity }}
                               className="absolute -inset-20 bg-red-600 rounded-full blur-[100px]" 
                            />
                            <Skull className="w-40 h-40 text-red-600 relative z-10" />
                         </div>
                         <h4 className="text-7xl font-black text-red-600 tracking-[-0.04em] mb-4 uppercase italic">Strategy Killed.</h4>
                         <p className="text-xl text-[#7A8BA0] max-w-xl font-medium leading-relaxed">
                            NEXUS exposed persistent failure modes in your logic. <br />
                            <span className="text-white mt-4 block">This code would have destroyed your capital within 11 trading sessions.</span>
                         </p>
                         
                         <div className="mt-12 flex gap-4">
                            <button 
                             onClick={onClose}
                             className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-white/90 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                            >
                               PREVENT THE LOSS – JOIN THE WAITLIST
                            </button>
                            <button 
                             onClick={() => setSimulationStep(0)}
                             className="border border-[#1A2333] text-[#7A8BA0] px-12 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:text-white transition-colors"
                            >
                               RE-RUN GAUNTLET
                            </button>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right: Evidence Ledger Panel */}
              <div className="w-full lg:w-[400px] bg-[#0A101A] flex flex-col overflow-hidden">
                <div className="p-8 border-b border-[#1A2333] bg-[#05070A]">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[#F0B429]/10 rounded-lg">
                        <Terminal className="w-4 h-4 text-[#F0B429]" />
                      </div>
                      <span className="text-[11px] text-white font-black uppercase tracking-[0.2em]">Audit Trail Ledger</span>
                   </div>
                   <div className="text-[10px] text-[#4A5568] font-mono leading-none flex items-center justify-between">
                     <span>STAGING_ROOT: (~/gauntlet/session_X)</span>
                     <span className="text-[#F0B429]">LIVE_STREAM</span>
                   </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-black/20 font-['JetBrains_Mono']">
                   <div className="space-y-6">
                      <AnimatePresence mode="popLayout">
                        {demoLogs.map((log, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`text-[12px] leading-relaxed group ${
                              log.includes('✓') || log.includes('PASSED') ? 'text-green-500' : 
                              log.includes('FAIL') || log.includes('KILLED') || log.includes('ALERT') ? 'text-red-500 font-bold' : 
                              log.startsWith('>') ? 'text-[#F0B429]' : 'text-[#7A8BA0]'
                            }`}
                          >
                             <div className="flex gap-3">
                                <span className="opacity-20 select-none group-hover:opacity-40 transition-opacity">{(i+1).toString().padStart(3, '0')}</span>
                                <span className="flex-1">{log}</span>
                             </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <div className="h-24" />
                   </div>
                </div>

                {/* Ledger Append UI */}
                <div className="p-8 bg-[#05070A] border-t border-[#1A2333]">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] text-[#4A5568] font-black uppercase tracking-widest">Gauntlet Progress</span>
                      <span className="text-[10px] text-[#F0B429] font-mono">{Math.floor((simulationStep / 6) * 100)}%</span>
                   </div>
                   <div className="flex gap-2 mb-6">
                      {[0, 1, 2, 3, 4, 5].map((s) => (
                        <div 
                          key={s} 
                          className={`flex-1 h-1.5 rounded-full transition-all duration-700 ${
                            simulationStep > s ? 'bg-red-500 shadow-[0_0_8px_#EF4444]' : 
                            simulationStep === s ? 'bg-[#F0B429] animate-pulse' : 
                            'bg-[#1A2333]'
                          }`} 
                        />
                      ))}
                   </div>
                   
                   <div className="p-4 bg-[#0A101A] border border-[#1A2333] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <ShieldCheck className="w-4 h-4 text-green-500" />
                         <span className="text-[10px] text-white/60 font-black uppercase tracking-widest">Encryption: AES-256</span>
                      </div>
                      <span className="text-[9px] text-[#4A5568] font-mono">READY</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Counter = ({ value, isVisible }: { value: string, isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  if (typeof value !== 'string') return null;
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const hasComma = value.includes(',');
  const suffix = value.replace(/[0-9,]|^\$/g, '');
  const prefix = value.startsWith('$') ? '$' : '';

  useEffect(() => {
    if (!isVisible || isNaN(numericValue)) return;

    let startTime: number;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const currentCount = Math.floor(progress * numericValue);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, numericValue]);

  if (isNaN(numericValue) || value === "24/7") return <span>{value}</span>;

  return (
    <span>
      {prefix}
      {hasComma ? count.toLocaleString() : count}
      {suffix}
    </span>
  );
};

interface StatProps {
  value: string;
  label: string;
  description: string;
}

const StatCard: React.FC<{ stat: StatProps, index: number }> = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      whileHover="hover"
      className="group relative flex flex-col bg-[#0A101A] border border-[#1A2333] p-8 rounded-[2.5rem] transition-all duration-500 hover:border-[#F0B429]/40 hover:shadow-[0_0_50px_rgba(240,180,41,0.1)] h-full overflow-hidden"
    >
      <div className="relative mb-6">
        <motion.div 
          variants={{
            hover: { 
              scale: 1.05, 
              filter: "drop-shadow(0 0 30px rgba(240, 180, 41, 0.8))"
            }
          }}
          className="text-[#F0B429] text-5xl md:text-6xl font-black font-display tracking-tighter transition-all duration-300"
        >
          <Counter value={stat.value} isVisible={isInView} />
        </motion.div>
        
        {/* Animated Underline */}
        <motion.div 
          initial={{ scaleX: 0 }}
          variants={{
            hover: { scaleX: 1 }
          }}
          className="absolute -bottom-2 left-0 right-12 h-[3px] bg-gradient-to-r from-[#F0B429] to-transparent origin-left transition-transform duration-500 ease-out"
        />
      </div>

      <div className="text-[13px] font-black text-white uppercase tracking-[0.2em] mb-4 leading-tight group-hover:text-[#F0B429] transition-colors">
        {stat.label}
      </div>

      <div className="text-[11px] text-[#7A8BA0] font-medium leading-relaxed group-hover:text-gray-300 transition-colors">
        {stat.description}
      </div>

      <motion.div 
        variants={{
          hover: { opacity: 1, scale: 1.4 }
        }}
        initial={{ opacity: 0, scale: 1 }}
        className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#F0B429]/[0.05] rounded-full blur-[80px] pointer-events-none transition-all duration-700"
      />
    </motion.div>
  );
};

const prompts = {
  "Mean Reversion": {
    text: "RUN KILL-TEST: USDJPY_LONDON_SCALPER_V3",
    logs: [
      "NEXUS V2.4 › STARTING GAUNTLET",
      "SUBJECT: Mean Reversion USDJPY (Sharpe 3.64 Backtest)",
      "MISSION: Expose the 'Ugly Truth' gap.",
      "",
      "GAUNTLET_INITIATED:",
      "STAGE_1: [CANDIDATE] Ingesting backtest equity curve...",
      "STAGE_2: [SCAN] Checking for look-ahead bias... PASSED.",
      "STAGE_3: [GAUNTLET] Replaying London session slippage matrix...",
      "STAGE_4: [RED-TEAM] Simulating negative funding regime flips...",
      "",
      "KILL_REPORT #8812:",
      "BACKTEST_SHARPE: 3.64  |  REALITY_SHARPE: 0.08",
      "RESULT: STRATEGY KILLED ☠",
      "",
      "NEXUS: Research illusion caught. The strategy assumes liquidity that doesn't exist in 2026 volatility regimes.",
      "LOGGED TO EVIDENCE LEDGER // PUBLIC_NEGATIVE_PROOF"
    ],
    time: "0M 42S"
  },
  "Alpha Engine": {
    text: "RUN KILL-TEST: BTC_MOMENTUM_BREAKOUT_4H",
    logs: [
      "NEXUS V2.4 › STARTING GAUNTLET",
      "SUBJECT: BTCUSD 4H Breakout v1.2",
      "MISSION: Verify robust persistence across regimes.",
      "",
      "GAUNTLET_INITIATED:",
      "STAGE_1: [CANDIDATE] Normalizing volatility parameters...",
      "STAGE_2: [SCAN] Validating walk-forward persistence... ✓",
      "STAGE_3: [GAUNTLET] Stress testing liquidity vacuum events... ✓",
      "STAGE_4: [RED-TEAM] Agentic Red-Team probing fail-safes... ✓",
      "",
      "VALIDATION_GATES:",
      "IS_OVERFIT [FALSE]  ROBUSTNESS [94/100]  SYNC_ERR [0.02%]",
      "",
      "NEXUS: Logic reviewed. Strategy survived execution reality.",
      "STATUS: READY FOR EVIDENCE PACK ✓",
      "GENERATE REPORT: [WAITLIST_ONLY]"
    ],
    time: "1M 12S"
  },
  "Arb Hunter": {
    text: "RUN KILL-TEST: SOL_PERP_FUNDING_CAPTURE",
    logs: [
      "NEXUS V2.4 › STARTING GAUNTLET",
      "SUBJECT: SOL-SPOT vs PERP Arb",
      "MISSION: Stress test execution latency & partial fills.",
      "",
      "GAUNTLET_INITIATED:",
      "STAGE_1: [CANDIDATE] Mapping funding rate delta...",
      "STAGE_2: [SCAN] Checking cross-exchange sync lag...",
      "STAGE_3: [GAUNTLET] Simulating partial fills (80% rejection)...",
      "STAGE_4: [RED-TEAM] Replaying May 2024 liquidity vacuum...",
      "",
      "KILL_REPORT #8815:",
      "SYNC_DELAY: 14ms  |  ALPHA_DECAY: 110% per trade",
      "RESULT: ALPHA_EXTINCT ☠",
      "",
      "NEXUS: Edge is fictitious. Logic destroyed by 12ms latency variance.",
      "STRATEGY_STATUS: KILLED"
    ],
    time: "2M 15S"
  }
};

const TerminalPanel = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof prompts>("Mean Reversion");
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayedLogs([]);
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < prompts[activeTab].logs.length) {
        setDisplayedLogs(prev => [...prev, prompts[activeTab].logs[i]]);
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="relative w-full aspect-square lg:aspect-auto lg:h-[700px] bg-[#05070A] border border-[#1A2333] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col font-['JetBrains_Mono']">
      {/* Dynamic Scan Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full bg-[linear-gradient(rgba(240,180,41,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,180,41,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Terminal Header */}
      <div className="h-12 bg-[#0A101A] border-b border-[#1A2333] px-6 flex items-center justify-between shrink-0 z-10">
        <div className="flex gap-6">
          {(Object.keys(prompts) as Array<keyof typeof prompts>).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] font-black tracking-[0.2em] uppercase transition-all relative ${
                activeTab === tab ? "text-[#F0B429]" : "text-[#4A5568] hover:text-[#7A8BA0]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="terminal-tab" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#F0B429]" />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[9px] text-[#4A5568] font-black uppercase tracking-widest hidden sm:block">GAUNTLET_STATUS: ACTIVE</div>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <div className="w-2 h-2 rounded-full bg-[#F0B429]" />
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
          </div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-8 overflow-y-auto text-[11px] leading-relaxed custom-scrollbar z-10 bg-[#05070A]/80 backdrop-blur-sm">
        {/* User Prompt Entry */}
        <div className="flex gap-3 mb-10 p-4 bg-[#0A101A] border border-[#1A2333] rounded-xl shadow-inner">
          <span className="text-[#F0B429] font-black shrink-0">PROMPT</span>
          <p className="text-[#E8EDF5] font-bold tracking-tight">
            {prompts[activeTab].text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-[#F0B429] ml-1 align-middle"
            />
          </p>
        </div>

        {/* Log Stream */}
        <div className="space-y-4">
          {displayedLogs.map((log, i) => {
            if (!log || typeof log !== 'string') return null;
            let color = "text-[#7A8BA0]";
            let bg = "";

            if (log.startsWith("NEXUS Chat")) color = "text-[#F0B429] font-black border-b border-[#F0B429]/20 pb-1 inline-block";
            else if (log.startsWith("You:")) color = "text-white opacity-90";
            else if (log.startsWith("NEXUS:")) color = "text-[#F0B429] font-bold";
            else if (log.includes("✓") || log.includes("Ready") || log.includes("CERTIFIED")) {
              color = "text-[#10B981] font-black tracking-widest";
              bg = "bg-[#10B981]/10 px-2 py-1 rounded border border-[#10B981]/30";
            }
            else if (log.includes("✗") || log.includes("FAIL") || log.includes("KILLED") || log.includes("☠")) {
              color = "text-white font-black tracking-[0.2em]";
              bg = "bg-red-600 px-3 py-1.5 rounded shadow-[0_0_30px_rgba(220,38,38,0.5)] inline-block animate-pulse";
            }
            else if (log.startsWith("USER_PROMPT:") || log.startsWith("GAUNTLET_INITIATED:") || log.startsWith("VALIDATION_GATES:") || log.startsWith("KILL_REPORT:")) color = "text-[#F0B429] font-black uppercase tracking-[0.3em] text-[9px] opacity-60 mt-8 mb-2";
            
            if (log.startsWith("[ATLAS]") || log.startsWith("[ECHO]") || log.startsWith("[DELTA]") || log.startsWith("[SYNTH]")) {
              const agent = log.match(/\[(.*?)\]/)?.[1];
              const msg = log.split("]")[1];
              return (
                <div key={i} className="flex gap-3 items-center group text-[11px]">
                  <div className="w-1 h-3 bg-[#F0B429]/20 group-hover:bg-[#F0B429] transition-colors" />
                  <span className="text-[#F0B429] text-[10px] font-black w-12 shrink-0">[{agent}]</span>
                  <span className="text-[#E8EDF5] opacity-60 font-medium tracking-tight truncate">{msg}</span>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="flex-1 h-px bg-[#1A2333]" 
                  />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                </div>
              );
            }

            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${color} ${bg} text-[11px] font-mono leading-relaxed`}
              >
                {log}
              </motion.div>
            );
          })}

          {/* Post-Scan Insights (Only when typing is done) */}
          {!isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 p-6 bg-[#0A101A] border border-[#1A2333] rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <ShieldAlert className="w-16 h-16 text-[#F0B429]" />
              </div>
              
              <div className="text-[10px] text-[#F0B429] font-black uppercase tracking-widest mb-4">Vulnerability Matrix</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "REGIME DRIFT", val: activeTab === "Momentum" ? "LOW" : "CRITICAL", color: activeTab === "Momentum" ? "text-green-400" : "text-red-500" },
                  { label: "EXECUTION ENTROPY", val: activeTab === "Arbitrage" ? "EXTREME" : "LOW", color: activeTab === "Arbitrage" ? "text-red-500" : "text-green-400" },
                  { label: "KURTOSIS RISK", val: "MODERATE", color: "text-[#F0B429]" },
                  { label: "EDGE DECAY", val: activeTab === "Mean Reversion" ? "HIGH" : "SLOW", color: activeTab === "Mean Reversion" ? "text-red-500" : "text-green-400" }
                ].map((m, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-[#1A2333] pb-2">
                    <span className="text-[9px] text-[#4A5568] font-black">{m.label}</span>
                    <span className={`text-[10px] font-black font-mono ${m.color}`}>{m.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {isTyping && (
            <motion.div
              animate={{ opacity: [0, 1] }}
              className="text-[#4A5568]"
            >
               _
            </motion.div>
          )}
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="h-12 border-t border-[#1A2333] bg-[#0A101A] px-8 flex items-center justify-end shrink-0">
        <div className="flex items-center gap-3">
          <div className="text-[9px] text-[#4A5568] font-black uppercase tracking-widest">Validated in</div>
          <div className="text-[10px] text-[#F0B429] font-black bg-[#1A2333] px-3 py-1 rounded border border-[#F0B429]/20">
            {prompts[activeTab].time}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero = ({ onOpenWaitlist, onOpenCheckout }: { onOpenWaitlist: () => void, onOpenCheckout: () => void }) => {
  const [isDemoOpen, setDemoOpen] = useState(false);

  return (
    <section className="relative pt-20 pb-16 px-10 overflow-hidden">
      <KillTestDemo isOpen={isDemoOpen} onClose={() => setDemoOpen(false)} />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-8xl font-bold tracking-[-0.05em] leading-[0.9] mb-6 font-display"
          >
            PRETTY BACKTESTS <br />
            <span className="text-[#F0B429] whitespace-nowrap uppercase">DIE LIVE.</span><br />
            <span className="text-2xl md:text-4xl mt-4 block text-[#7A8BA0] tracking-tight">NEXUS shows where your strategy breaks <br />before capital pays the price.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-[#E8EDF5] text-xl font-bold mb-4 leading-tight text-left border-l-2 border-[#F0B429] pl-6"
          >
            AI makes strategy creation cheap. <br />
            <span className="text-[#F0B429] text-sm uppercase tracking-[0.2em]">NEXUS gives you a Kill Report, not a promise.</span>
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl text-[#7A8BA0] text-lg mb-10 leading-relaxed font-medium text-left"
          >
            Don't be the liquidity for someone else's real-world alpha. Beautiful backtests are deceptive; over-fitting is fatal. NEXUS runs your logic through execution reality, regime stress-tests, and funding simulation to expose hidden fragility.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="w-full max-w-lg flex flex-col gap-6"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setDemoOpen(true);
                }}
                className="bg-[#F0B429] text-black px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:shadow-[0_0_50px_rgba(240,180,41,0.5)] transition-all active:scale-[0.98] flex items-center justify-center whitespace-nowrap"
              >
                Watch Kill-Test Replay
              </button>
              <button 
                onClick={() => onOpenWaitlist()}
                className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all active:scale-[0.98] flex items-center justify-center"
              >
                Submit Strategy for Free Teardown
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col text-left">
                  <p className="text-[10px] text-[#4A5568] font-['JetBrains_Mono'] mt-0.5 uppercase tracking-widest leading-relaxed">
                    Verified Logic · Kill Reports · Evidence Ledger · No Profit Guarantees
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Visual Panel: Nexus Terminal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative group w-full"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#F0B429]/20 to-transparent blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
          <TerminalPanel />
        </motion.div>
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mt-32 mb-12 px-10">
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#F0B429]" />
            <span className="text-[#F0B429] text-xs font-black tracking-[0.4em] uppercase">SYSTEM PERFORMANCE</span>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white uppercase tracking-[-0.02em] font-display text-center lg:text-left leading-none"
          >
            SAVING CAPITAL FROM <br />
            <span className="text-[#F0B429]">AI-DRIVEN DESTRUCTION.</span>
          </motion.h2>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="w-full max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            value: "GAAP", 
            label: "FOR ALGORITHMS", 
            description: "Establishing a standardized Evidence Ledger for quantitative research integrity." 
          },
          { 
            value: "AUDIT", 
            label: "TRAIL READY", 
            description: "Every simulation is logged to an immutable ledger. Zero-trust verification for every alpha claim." 
          },
          { 
            value: "14ms", 
            label: "LATENCY STRESS LEVEL", 
            description: "Our Echo agent tests the exact moment your strategy fails during exchange congestion cycles." 
          },
          { 
            value: "REPLAY", 
            label: "FAILURES VS DREAMS", 
            description: "Continuous monitoring of institutional shifts so your strategy doesn't go blind." 
          }
        ].map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
};
