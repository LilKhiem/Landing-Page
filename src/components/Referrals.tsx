import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Gift, Star, Award, Crown, Check, Copy } from "lucide-react";

const rewards = [
  { count: 5, label: "5 Referrals", reward: "1 Month Pro Free", icon: Gift },
  { count: 10, label: "10 Referrals", reward: "NEXUS Swag Pack", icon: Star },
  { count: 25, label: "25 Referrals", reward: "Lifetime 50% Discount", icon: Award },
  { count: 50, label: "50 Referrals", reward: "Founding Member Status", icon: Crown },
];

export const Referrals = () => {
  const [copied, setCopied] = useState(false);
  const currentReferrals = 12; // Example state
  const maxReferrals = 50;
  const progress = (currentReferrals / maxReferrals) * 100;

  const handleCopy = () => {
    navigator.clipboard.writeText("https://nexus-ide.com/join?ref=ALPHA_QUANT");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-10 bg-[#05080D]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">REFERRAL PROGRAM</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] font-display mb-8">Skip the wait. <br />Earn your edge.</h3>
          <p className="text-[#7A8BA0] text-xl font-light">Invite other quants and unlock exclusive founding rewards.</p>
        </div>

        <div className="bg-[#0A101A] border border-[#1A2333] rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#F0B429]/5 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-10">
              <div>
                <div className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest mb-1">YOUR REFERRALS</div>
                <div className="text-5xl font-black text-white font-['JetBrains_Mono']">{currentReferrals}</div>
              </div>
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase transition-all duration-300 ${
                  copied 
                    ? 'bg-[#27C93F] text-black shadow-[0_0_20px_rgba(39,201,63,0.4)]' 
                    : 'bg-[#F0B429] text-black hover:shadow-[0_0_20px_rgba(240,180,41,0.4)] hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Invite Link
                  </>
                )}
              </button>
            </div>

            {/* Progress Bar Container */}
            <div className="relative h-4 bg-black border border-[#1A2333] rounded-full mb-16 mt-12">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-[#F0B429] rounded-full shadow-[0_0_15px_rgba(240,180,41,0.5)]"
              />
              
              {/* Reward Markers */}
              {rewards.map((reward, i) => {
                const position = (reward.count / maxReferrals) * 100;
                const isAchieved = currentReferrals >= reward.count;
                
                return (
                  <div 
                    key={i} 
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{ left: `${position}%` }}
                  >
                    <div className="relative group cursor-help">
                      <motion.div 
                        whileHover={{ scale: 1.5 }}
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                          isAchieved 
                            ? 'bg-[#F0B429] border-[#F0B429] shadow-[0_0_10px_rgba(240,180,41,0.5)]' 
                            : 'bg-black border-[#1A2333]'
                        }`}
                      />
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none z-20">
                        <div className="bg-[#0D1521] border border-[#F0B429]/30 p-5 rounded-2xl whitespace-nowrap shadow-2xl text-center">
                          <div className="w-10 h-10 bg-[#F0B429]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <reward.icon className="w-5 h-5 text-[#F0B429]" />
                          </div>
                          <div className="text-[10px] font-bold text-[#F0B429] uppercase tracking-[0.2em] mb-1">{reward.label}</div>
                          <div className="text-sm font-black text-white tracking-tight">{reward.reward}</div>
                          {!isAchieved && (
                            <div className="mt-2 text-[9px] text-[#4A5568] font-bold uppercase tracking-widest">
                              {reward.count - currentReferrals} more needed
                            </div>
                          )}
                        </div>
                        <div className="w-3 h-3 bg-[#0D1521] border-r border-b border-[#F0B429]/30 rotate-45 mx-auto -mt-1.5"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rewards.map((reward, i) => (
                <div key={i} className={`p-6 rounded-2xl border transition-all duration-500 ${currentReferrals >= reward.count ? 'border-[#F0B429]/30 bg-[#F0B429]/5 shadow-[0_0_20px_rgba(240,180,41,0.05)]' : 'border-[#1A2333] bg-black/40'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${currentReferrals >= reward.count ? 'bg-[#F0B429]/20' : 'bg-[#1A2333]'}`}>
                    <reward.icon className={`w-5 h-5 ${currentReferrals >= reward.count ? 'text-[#F0B429]' : 'text-[#4A5568]'}`} />
                  </div>
                  <div className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest mb-1">{reward.count} REFS</div>
                  <div className={`text-xs font-black tracking-tight ${currentReferrals >= reward.count ? 'text-white' : 'text-[#4A5568]'}`}>{reward.reward}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
