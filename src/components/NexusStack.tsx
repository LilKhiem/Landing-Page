import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layout, 
  Cpu, 
  Key, 
  MessageSquare, 
  FileJson, 
  Rocket, 
  TestTube, 
  BarChart, 
  Puzzle, 
  Terminal, 
  Monitor,
  Coins,
  Activity,
  Zap,
  ChevronRight
} from "lucide-react";

const stackData = [
  {
    id: "core",
    title: "NEXUS Core",
    pills: ["IDE", "Engine", "Keys"],
    items: [
      { name: "NEXUS IDE", desc: "Professional-grade editor, branded and extended for systematic trading.", icon: Layout },
      { name: "NEXUS Engine", desc: "One AI brain behind every strategy, fully wrapped by NEXUS.", icon: Cpu },
      { name: "NEXUS Keys", desc: "Centralized console for API keys, permissions, and usage.", icon: Key },
    ]
  },
  {
    id: "quant",
    title: "NEXUS AI Quant Layer",
    pills: ["Chat", "Templates"],
    items: [
      { name: "NEXUS Chat", desc: "Quant‑aware chat sidebar for questions, refactors, and reviews.", icon: MessageSquare },
      { name: "NEXUS Templates", desc: "Ready‑made strategy prompts for FX, crypto, and portfolios.", icon: FileJson },
    ]
  },
  {
    id: "devops",
    title: "NEXUS Productivity & DevOps",
    pills: ["Deploy", "TestLab", "Metrics"],
    items: [
      { name: "NEXUS Deploy", desc: "CI/CD pipeline taking you from backtest to live deployment.", icon: Rocket },
      { name: "NEXUS TestLab", desc: <>GitHub‑native <a href="/docs/testlab" className="text-[#F0B429] hover:underline">testing and regression</a> suite for strategies.</>, icon: TestTube },
      { name: "NEXUS Metrics", desc: <>Benchmarking and <a href="/docs/metrics" className="text-[#F0B429] hover:underline">performance monitoring</a> for every strategy.</>, icon: BarChart },
    ]
  },
  {
    id: "tools",
    title: "NEXUS Extensions & Tools",
    pills: ["Extension", "CLI", "Desktop"],
    items: [
      { name: "NEXUS Extension", desc: "JavaScript extension API for building custom panels and tools.", icon: Puzzle },
      { name: "NEXUS CLI", desc: "Terminal interface for power users and automation.", icon: Terminal },
      { name: "NEXUS Desktop", desc: "Full desktop app for low‑latency and multi‑monitor setups.", icon: Monitor },
    ]
  },
  {
    id: "economy",
    title: "NEXUS Credits & Token Economy",
    pills: ["Credits", "Token", "Hub"],
    items: [
      { name: "NEXUS Credits", desc: "Unified system for tracking R&D usage and resource allocation.", icon: Coins },
      { name: "NEXUS Token", desc: "Internal token for governance, usage, and ecosystem incentives.", icon: Zap },
      { name: "NEXUS Hub", desc: "Central command center for usage, credits, and system health.", icon: Activity },
    ]
  }
];

export const NexusStack = () => {
  const [activeLayer, setActiveLayer] = useState(stackData[0].id);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleLayerClick = (id: string) => {
    setActiveLayer(id);
    setActiveItem(null);
  };

  const handlePillClick = (e: React.MouseEvent, layerId: string, pill: string) => {
    e.stopPropagation();
    setActiveLayer(layerId);
    setActiveItem(pill);
    
    // Scroll to grid on mobile or if not in view
    if (window.innerWidth < 1024) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-24 px-10 bg-black border-y border-[#1A2333]">
      <div className="max-w-5xl mx-auto">
        <div className="text-left mb-16">
          <p className="text-[10px] font-bold text-[#F0B429] tracking-[0.3em] uppercase mb-4 font-['JetBrains_Mono']">
            Everything in one unified system – no third‑party logos, just NEXUS.
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] font-display mb-4">The NEXUS Stack.</h2>
          <p className="text-[#7A8BA0] text-lg font-light max-w-3xl mb-6">
            The NEXUS Stack is a single, unified system — IDE, engine, DevOps, and credits — so a single idea can become a certified strategy with live charts and a full research history without ever leaving NEXUS.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Vertical Stack Diagram (Interactive Tabs) */}
          <div className="lg:col-span-6 space-y-3">
            {stackData.map((layer, i) => {
              const isActive = activeLayer === layer.id;
              return (
                <motion.button
                  key={layer.id}
                  onClick={() => handleLayerClick(layer.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-full group relative flex items-center justify-between p-5 rounded-xl border transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#F0B429]/5 border-[#F0B429] shadow-[0_0_30px_rgba(240,180,41,0.1)]' 
                      : 'bg-[#0A101A] border-[#1A2333] hover:border-[#F0B429]/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-['JetBrains_Mono'] transition-colors ${
                      isActive ? 'bg-[#F0B429] text-black' : 'bg-[#1A2333] text-[#4A5568]'
                    }`}>
                      0{i + 1}
                    </div>
                    <span className={`text-sm font-bold tracking-tight transition-colors ${
                      isActive ? 'text-white' : 'text-[#7A8BA0] group-hover:text-white'
                    }`}>
                      {layer.title}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    {layer.pills.map(pill => (
                      <span 
                        key={pill} 
                        onClick={(e) => handlePillClick(e, layer.id, pill)}
                        className={`text-[9px] px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                          isActive && activeItem === pill
                            ? 'bg-[#F0B429] border-[#F0B429] text-black shadow-[0_0_10px_rgba(240,180,41,0.4)]'
                            : isActive 
                              ? 'bg-[#F0B429]/20 border-[#F0B429]/30 text-[#F0B429] hover:bg-[#F0B429]/40' 
                              : 'bg-black/40 border-[#1A2333] text-[#4A5568] hover:border-[#F0B429]/30 hover:text-[#7A8BA0]'
                        }`}
                      >
                        {pill}
                      </span>
                    ))}
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#F0B429] rotate-90' : 'text-[#1A2333]'}`} />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Compact Cards Grid */}
          <div className="lg:col-span-6" ref={gridRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid gap-4"
              >
                {stackData.find(l => l.id === activeLayer)?.items.map((item, i) => {
                  const isHighlighted = activeItem && item.name.includes(activeItem);
                  return (
                    <div 
                      key={item.name}
                      className={`p-5 rounded-xl bg-[#0A101A] border transition-all flex gap-5 items-start group ${
                        isHighlighted 
                          ? 'border-[#F0B429] shadow-[0_0_20px_rgba(240,180,41,0.1)] scale-[1.02]' 
                          : 'border-[#1A2333] hover:border-[#F0B429]/30'
                      }`}
                    >
                      <div className={`p-3 rounded-lg bg-black border transition-all ${
                        isHighlighted ? 'border-[#F0B429] text-[#F0B429] shadow-[0_0_15px_rgba(240,180,41,0.2)]' : 'border-[#1A2333] text-[#F0B429]'
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold mb-1 transition-colors ${
                          isHighlighted ? 'text-[#F0B429]' : 'text-white group-hover:text-[#F0B429]'
                        }`}>
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#7A8BA0] leading-relaxed max-w-[280px]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 p-6 rounded-2xl bg-[#F0B429]/5 border border-[#F0B429]/10">
              <p className="text-[10px] text-[#F0B429] font-bold uppercase tracking-widest mb-2">System Architecture</p>
              <p className="text-xs text-[#7A8BA0] leading-relaxed italic">
                The NEXUS Stack is engineered as a single, cohesive organism. Each layer communicates via high-speed internal protocols, eliminating the latency and security risks of multi-vendor integrations. That’s how a single idea in NEXUS Chat can become a certified strategy with live charts and a full research history — without ever leaving the IDE. For most users, NEXUS begins as a chat window: you talk to NEXUS Chat, and the IDE, Engine, and Metrics move behind the scenes to produce code, backtests, and reports.
              </p>
            </div>
          </div>
        </div>

        {/* Section Footer Line */}
        <div className="mt-24 pt-10 border-t border-[#1A2333] text-center">
          <p className="text-[10px] text-[#4A5568] font-['JetBrains_Mono'] uppercase tracking-[0.4em]">
            “Every surface you touch – IDE, keys, usage, extensions – lives under one name: <span className="text-[#F0B429]">NEXUS</span>.”
          </p>
        </div>
      </div>
    </section>
  );
};


