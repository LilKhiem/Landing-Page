import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ArrowUpRight, 
  GitFork, 
  ShoppingCart, 
  BarChart3, 
  Search,
  Filter,
  Plus,
  Info,
  ChevronRight,
  ExternalLink
} from "lucide-react";

interface Strategy {
  id: string;
  name: string;
  author: string;
  cagr: number;
  sharpe: number;
  drawdown: number;
  price: string;
  revenueShare: string;
  verified: boolean;
  tags: string[];
  description: string;
  assetClass: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const strategies: Strategy[] = [
  {
    id: "1",
    name: "Alpha Momentum V4",
    author: "QuantLabs_X",
    cagr: 42.5,
    sharpe: 2.8,
    drawdown: -8.2,
    price: "$499",
    revenueShare: "15%",
    verified: true,
    tags: ["Equities", "Momentum", "High Frequency"],
    description: "A high-frequency momentum strategy targeting mid-cap tech stocks with dynamic risk adjustment.",
    assetClass: "Equities",
    riskLevel: "High"
  },
  {
    id: "2",
    name: "Macro Volatility Arb",
    author: "DeepAlpha_Res",
    cagr: 28.1,
    sharpe: 3.1,
    drawdown: -4.5,
    price: "$850",
    revenueShare: "20%",
    verified: true,
    tags: ["Options", "Volatility", "Market Neutral"],
    description: "Exploits mispricing in index volatility surfaces using a proprietary mean-reversion model.",
    assetClass: "Options",
    riskLevel: "Medium"
  },
  {
    id: "3",
    name: "Crypto Trend Follower",
    author: "Satoshi_Quant",
    cagr: 112.4,
    sharpe: 1.9,
    drawdown: -22.1,
    price: "$299",
    revenueShare: "10%",
    verified: false,
    tags: ["Crypto", "Trend", "Leverage"],
    description: "Aggressive trend-following strategy for BTC/ETH pairs with automated stop-loss triggers.",
    assetClass: "Crypto",
    riskLevel: "High"
  },
  {
    id: "4",
    name: "Yield Optimizer Pro",
    author: "DeFi_Master",
    cagr: 18.2,
    sharpe: 4.2,
    drawdown: -1.8,
    price: "$1,200",
    revenueShare: "25%",
    verified: true,
    tags: ["Stablecoins", "Yield Farming", "Low Risk"],
    description: "Low-risk stablecoin yield optimization across multiple chains with insurance coverage.",
    assetClass: "Stablecoins",
    riskLevel: "Low"
  }
];

export const StrategyMarketplace = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("Newest");
  const [filters, setFilters] = useState({
    assetClass: "All",
    riskLevel: "All",
    minCagr: 0,
    minSharpe: 0,
    maxDrawdown: 30
  });

  const resetFilters = () => {
    setFilters({
      assetClass: "All",
      riskLevel: "All",
      minCagr: 0,
      minSharpe: 0,
      maxDrawdown: 30
    });
    setSearchQuery("");
    setSortBy("Newest");
  };

  const filteredStrategies = strategies.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesAsset = filters.assetClass === "All" || s.assetClass === filters.assetClass;
    const matchesRisk = filters.riskLevel === "All" || s.riskLevel === filters.riskLevel;
    const matchesCagr = s.cagr >= filters.minCagr;
    const matchesSharpe = s.sharpe >= filters.minSharpe;
    const matchesDrawdown = Math.abs(s.drawdown) <= filters.maxDrawdown;

    return matchesSearch && matchesAsset && matchesRisk && matchesCagr && matchesSharpe && matchesDrawdown;
  });

  const sortedStrategies = [...filteredStrategies].sort((a, b) => {
    if (sortBy === "CAGR") return b.cagr - a.cagr;
    if (sortBy === "Sharpe") return b.sharpe - a.sharpe;
    if (sortBy === "Price (Low)") return parseFloat(a.price.replace('$', '').replace(',', '')) - parseFloat(b.price.replace('$', '').replace(',', ''));
    if (sortBy === "Price (High)") return parseFloat(b.price.replace('$', '').replace(',', '')) - parseFloat(a.price.replace('$', '').replace(',', ''));
    return 0;
  });

  const assetClasses = ["All", ...new Set(strategies.map(s => s.assetClass))];
  const riskLevels = ["All", "Low", "Medium", "High"];
  const sortOptions = ["Newest", "CAGR", "Sharpe", "Price (Low)", "Price (High)"];

  return (
    <section className="py-20 px-10 bg-[#05080D] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#F0B429]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">STRATEGY MARKETPLACE</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-[-0.03em] font-display mb-6">Trade Alpha. <br />Monetize Intelligence.</h3>
            <p className="text-[#7A8BA0] text-lg">The world's first decentralized marketplace for certified quantitative strategies. Buy, sell, or fork high-performance algorithms with full transparency.</p>
          </div>
          
          <button className="flex items-center gap-2 px-8 py-4 bg-[#F0B429] text-black rounded-xl font-black text-xs tracking-widest uppercase hover:shadow-[0_0_30px_rgba(240,180,41,0.4)] transition-all duration-300 group">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            Publish Strategy
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A5568]" />
              <input 
                type="text" 
                placeholder="Search strategies, authors, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0A101A] border border-[#1A2333] rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#F0B429]/50 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#0A101A] border border-[#1A2333] rounded-xl px-6 py-4 pr-10 text-xs font-bold uppercase tracking-widest text-[#7A8BA0] focus:outline-none focus:border-[#F0B429]/30 transition-all cursor-pointer"
                >
                  {sortOptions.map(opt => <option key={opt} value={opt}>Sort: {opt}</option>)}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5568] rotate-90 pointer-events-none" />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${
                  showFilters ? 'bg-[#F0B429] text-black' : 'bg-[#0A101A] border border-[#1A2333] text-[#7A8BA0] hover:text-white hover:border-[#F0B429]/30'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="text-xs">Filters</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[#0A101A] border border-[#1A2333] rounded-2xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                    {/* Asset Class */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#4A5568] uppercase tracking-widest mb-3">Asset Class</label>
                      <select 
                        value={filters.assetClass}
                        onChange={(e) => setFilters({...filters, assetClass: e.target.value})}
                        className="w-full bg-black border border-[#1A2333] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F0B429]/30"
                      >
                        {assetClasses.map(ac => <option key={ac} value={ac}>{ac}</option>)}
                      </select>
                    </div>

                    {/* Risk Level */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#4A5568] uppercase tracking-widest mb-3">Risk Level</label>
                      <select 
                        value={filters.riskLevel}
                        onChange={(e) => setFilters({...filters, riskLevel: e.target.value})}
                        className="w-full bg-black border border-[#1A2333] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F0B429]/30"
                      >
                        {riskLevels.map(rl => <option key={rl} value={rl}>{rl}</option>)}
                      </select>
                    </div>

                    {/* Min CAGR */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest">Min CAGR</label>
                        <span className="text-[10px] font-bold text-[#F0B429]">{filters.minCagr}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={filters.minCagr}
                        onChange={(e) => setFilters({...filters, minCagr: parseInt(e.target.value)})}
                        className="w-full accent-[#F0B429] bg-[#1A2333] h-1 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Min Sharpe */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest">Min Sharpe</label>
                        <span className="text-[10px] font-bold text-[#F0B429]">{filters.minSharpe}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="5" 
                        step="0.1"
                        value={filters.minSharpe}
                        onChange={(e) => setFilters({...filters, minSharpe: parseFloat(e.target.value)})}
                        className="w-full accent-[#F0B429] bg-[#1A2333] h-1 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Max Drawdown */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest">Max Drawdown</label>
                        <span className="text-[10px] font-bold text-[#F0B429]">{filters.maxDrawdown}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        value={filters.maxDrawdown}
                        onChange={(e) => setFilters({...filters, maxDrawdown: parseInt(e.target.value)})}
                        className="w-full accent-[#F0B429] bg-[#1A2333] h-1 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={resetFilters}
                      className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest hover:text-[#F0B429] transition-colors flex items-center gap-2"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Strategy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedStrategies.map((strategy, i) => (
            <motion.div 
              key={strategy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#0A101A] border border-[#1A2333] rounded-2xl p-6 hover:border-[#F0B429]/30 transition-all duration-500 relative flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-2 rounded-lg ${strategy.verified ? 'bg-[#F0B429]/10 text-[#F0B429]' : 'bg-[#4A5568]/10 text-[#4A5568]'}`}>
                  {strategy.verified ? <ShieldCheck className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest mb-1">REVENUE SHARE</div>
                  <div className="text-sm font-black text-[#F0B429]">{strategy.revenueShare}</div>
                </div>
              </div>

              <h4 className="text-xl font-bold tracking-tight mb-1 group-hover:text-[#F0B429] transition-colors font-display">{strategy.name}</h4>
              <p className="text-xs text-[#4A5568] font-bold uppercase tracking-widest mb-6">by {strategy.author}</p>

              <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-[#1A2333]">
                <div>
                  <div className="text-[9px] font-bold text-[#4A5568] uppercase tracking-widest mb-1">CAGR</div>
                  <div className="text-sm font-black text-white">+{strategy.cagr}%</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-[#4A5568] uppercase tracking-widest mb-1">SHARPE</div>
                  <div className="text-sm font-black text-white">{strategy.sharpe}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-[#4A5568] uppercase tracking-widest mb-1">MDD</div>
                  <div className="text-sm font-black text-red-500">{strategy.drawdown}%</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest ${
                  strategy.riskLevel === 'Low' ? 'bg-green-500/10 text-green-500' :
                  strategy.riskLevel === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-red-500/10 text-red-500'
                }`}>
                  {strategy.riskLevel} Risk
                </span>
                {strategy.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-bold px-2 py-1 bg-black border border-[#1A2333] rounded text-[#7A8BA0] uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-black text-white">{strategy.price}</span>
                  <button 
                    onClick={() => setSelectedStrategy(strategy)}
                    className="text-[#7A8BA0] hover:text-[#F0B429] transition-colors"
                  >
                    <BarChart3 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 py-3 bg-[#F0B429] text-black rounded-lg font-black text-[10px] tracking-widest uppercase hover:scale-[1.02] transition-all">
                    <ShoppingCart className="w-3 h-3" />
                    Buy
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-[#1A2333] text-white rounded-lg font-black text-[10px] tracking-widest uppercase hover:bg-[#2A3343] transition-all">
                    <GitFork className="w-3 h-3" />
                    Fork
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Strategy Detail Modal */}
      <AnimatePresence>
        {selectedStrategy && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStrategy(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0A101A] border border-[#F0B429]/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(240,180,41,0.1)]"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h4 className="text-3xl font-bold tracking-tight font-display">{selectedStrategy.name}</h4>
                      {selectedStrategy.verified && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-[#F0B429]/10 text-[#F0B429] rounded text-[10px] font-bold uppercase tracking-widest border border-[#F0B429]/20">
                          <ShieldCheck className="w-3 h-3" />
                          Certified
                        </div>
                      )}
                    </div>
                    <p className="text-[#7A8BA0] text-lg leading-relaxed max-w-xl">{selectedStrategy.description}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest mb-1">LISTING PRICE</div>
                    <div className="text-4xl font-black text-white">{selectedStrategy.price}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                  {[
                    { label: "CAGR", value: `+${selectedStrategy.cagr}%`, icon: TrendingUp },
                    { label: "Sharpe Ratio", value: selectedStrategy.sharpe, icon: BarChart3 },
                    { label: "Max Drawdown", value: `${selectedStrategy.drawdown}%`, icon: TrendingUp },
                    { label: "Revenue Share", value: selectedStrategy.revenueShare, icon: Users },
                  ].map((stat, i) => (
                    <div key={i} className="p-6 bg-black/40 border border-[#1A2333] rounded-2xl">
                      <div className="flex items-center gap-2 mb-3 text-[#4A5568]">
                        <stat.icon className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <div className="text-2xl font-black text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-black/60 border border-[#1A2333] rounded-2xl p-8 mb-12">
                  <div className="flex items-center justify-between mb-8">
                    <h5 className="text-sm font-bold uppercase tracking-widest text-white">Performance Report</h5>
                    <button className="flex items-center gap-2 text-[#F0B429] text-xs font-bold uppercase tracking-widest hover:underline">
                      Download Full PDF <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {/* Simulated Chart Area */}
                  <div className="h-48 flex items-end gap-2">
                    {[40, 60, 45, 70, 85, 65, 90, 110, 95, 130, 150, 140].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05 }}
                        className="flex-1 bg-gradient-to-t from-[#F0B429]/5 to-[#F0B429]/40 rounded-t-sm"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button className="flex-1 flex items-center justify-center gap-3 py-5 bg-[#F0B429] text-black rounded-xl font-black text-xs tracking-widest uppercase hover:shadow-[0_0_30px_rgba(240,180,41,0.3)] transition-all">
                    <ShoppingCart className="w-4 h-4" />
                    Purchase Full License
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-3 py-5 bg-[#1A2333] text-white rounded-xl font-black text-xs tracking-widest uppercase hover:bg-[#2A3343] transition-all">
                    <GitFork className="w-4 h-4" />
                    Fork & Customize
                  </button>
                  <button 
                    onClick={() => setSelectedStrategy(null)}
                    className="px-8 py-5 border border-[#1A2333] text-[#7A8BA0] rounded-xl font-black text-xs tracking-widest uppercase hover:text-white hover:border-white transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
