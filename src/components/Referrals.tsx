import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Gift, Star, Award, Crown, Check, Copy, Twitter, Linkedin, Share2, ArrowRight, Activity } from "lucide-react";

const rewards = [
  { count: 5, label: "5 Referrals", reward: "1 Month Pro Free", icon: Gift },
  { count: 10, label: "10 Referrals", reward: "NEXUS Swag Pack", icon: Star },
  { count: 25, label: "25 Referrals", reward: "Lifetime 50% Discount", icon: Award },
  { count: 50, label: "50 Referrals", reward: "Founding Member Status", icon: Crown },
];

const steps = [
  { title: "Copy Link", desc: "Get your unique invite link from your dashboard.", icon: Copy },
  { title: "Share Link", desc: "Share it with your quant network or on socials.", icon: Share2 },
  { title: "Earn Rewards", desc: "Unlock exclusive perks as your network grows.", icon: Gift },
];

const recentActivity = [
  { user: "Quant_Trader_X", action: "joined using your link", time: "2h ago" },
  { user: "Alpha_Seeker", action: "joined using your link", time: "5h ago" },
  { user: "Macro_Flows", action: "joined using your link", time: "1d ago" },
];

import { trackCTA } from '../lib/analytics';
import { getMe } from '../lib/api';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const Referrals = () => {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ count: 12, max: 50, code: 'ALPHA_QUANT' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getMe();
        setStats({
          count: data.referral_stats.count,
          max: data.referral_stats.max,
          code: data.referral_code
        });
      } catch (error) {
        console.error('Failed to fetch referral stats');
      }
    };
    fetchStats();
  }, []);

  const handleCopy = () => {
    const link = `https://nexus-ide.com/join?ref=${stats.code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    trackCTA('referral_copy_link', { code: stats.code });
    toast.success('Invite link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: 'twitter' | 'linkedin') => {
    const link = `https://nexus-ide.com/join?ref=${stats.code}`;
    const text = `Join me on NEXUS IDE – the next generation quant research platform. Use my invite link to skip the wait: ${link}`;
    
    let url = '';
    if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    } else {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
    }
    
    window.open(url, '_blank');
    trackCTA(`referral_share_${platform}`, { code: stats.code });
  };

  const progress = (stats.count / stats.max) * 100;

  return (
    <section id="referral" className="py-24 px-10 bg-[#05080D] border-t border-[#1A2333]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">REFERRAL PROGRAM</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] font-display mb-8">Skip the wait. <br />Earn your edge.</h3>
          <p className="text-[#7A8BA0] text-lg max-w-2xl mx-auto font-light mb-12">
            NEXUS is currently in private beta. The fastest way to get in is to invite other quants. Every successful referral earns you credits and moves you up the priority queue.
          </p>
          
          {/* How it Works Steps */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="w-12 h-12 rounded-2xl bg-[#0A101A] border border-[#1A2333] flex items-center justify-center mx-auto mb-6 group-hover:border-[#F0B429]/50 transition-all">
                  <step.icon className="w-5 h-5 text-[#F0B429]" />
                </div>
                <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">{step.title}</h4>
                <p className="text-xs text-[#4A5568] leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[1px] bg-gradient-to-r from-[#1A2333] to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-[#0A101A] border border-[#1A2333] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#F0B429]/5 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-12">
                <div>
                  <div className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest mb-2">YOUR REFERRALS</div>
                  <div className="text-6xl font-black text-white font-['JetBrains_Mono'] tracking-tighter">{stats.count}</div>
                </div>
                <div className="w-full md:w-auto">
                  <div className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest mb-3 text-center md:text-left">SHARE YOUR LINK</div>
                  <div className="flex gap-3">
                    <button 
                      onClick={handleCopy}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-black text-xs tracking-widest uppercase transition-all duration-300 ${
                        copied 
                          ? 'bg-[#27C93F] text-black shadow-[0_0_30px_rgba(39,201,63,0.4)]' 
                          : 'bg-[#F0B429] text-black hover:shadow-[0_0_30px_rgba(240,180,41,0.4)] hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button 
                      onClick={() => handleShare('twitter')}
                      className="p-4 rounded-xl bg-[#1A2333] text-white hover:bg-[#F0B429]/10 hover:text-[#F0B429] transition-all"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleShare('linkedin')}
                      className="p-4 rounded-xl bg-[#1A2333] text-white hover:bg-[#F0B429]/10 hover:text-[#F0B429] transition-all"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="relative h-5 bg-black border border-[#1A2333] rounded-full mb-20 mt-16">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-[#F0B429] rounded-full shadow-[0_0_20px_rgba(240,180,41,0.6)]"
                />
                
                {/* Reward Markers */}
                {rewards.map((reward, i) => {
                  const position = (reward.count / stats.max) * 100;
                  const isAchieved = stats.count >= reward.count;
                  
                  return (
                    <div 
                      key={i} 
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                      style={{ left: `${position}%` }}
                    >
                      <div className="relative group cursor-help">
                        <motion.div 
                          whileHover={{ scale: 1.5 }}
                          className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                            isAchieved 
                              ? 'bg-[#F0B429] border-[#F0B429] shadow-[0_0_15px_rgba(240,180,41,0.5)]' 
                              : 'bg-black border-[#1A2333]'
                          }`}
                        />
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none z-20">
                          <div className="bg-[#0D1521] border border-[#F0B429]/30 p-6 rounded-2xl whitespace-nowrap shadow-2xl text-center min-w-[200px]">
                            <div className="w-12 h-12 bg-[#F0B429]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <reward.icon className="w-6 h-6 text-[#F0B429]" />
                            </div>
                            <div className="text-[10px] font-bold text-[#F0B429] uppercase tracking-[0.2em] mb-2">{reward.label}</div>
                            <div className="text-base font-black text-white tracking-tight">{reward.reward}</div>
                            {!isAchieved && (
                              <div className="mt-3 text-[10px] text-[#4A5568] font-bold uppercase tracking-widest">
                                {reward.count - stats.count} more needed
                              </div>
                            )}
                          </div>
                          <div className="w-4 h-4 bg-[#0D1521] border-r border-b border-[#F0B429]/30 rotate-45 mx-auto -mt-2"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {rewards.map((reward, i) => (
                  <div key={i} className={`p-6 rounded-2xl border transition-all duration-500 ${stats.count >= reward.count ? 'border-[#F0B429]/30 bg-[#F0B429]/5 shadow-[0_0_20px_rgba(240,180,41,0.05)]' : 'border-[#1A2333] bg-black/40'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${stats.count >= reward.count ? 'bg-[#F0B429]/20' : 'bg-[#1A2333]'}`}>
                      <reward.icon className={`w-5 h-5 ${stats.count >= reward.count ? 'text-[#F0B429]' : 'text-[#4A5568]'}`} />
                    </div>
                    <div className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest mb-1">{reward.count} REFS</div>
                    <div className={`text-xs font-black tracking-tight ${stats.count >= reward.count ? 'text-white' : 'text-[#4A5568]'}`}>{reward.reward}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard & Activity Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Leaderboard */}
            <div className="bg-[#0A101A] border border-[#1A2333] rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <Users className="w-5 h-5 text-[#F0B429]" />
                <h4 className="text-sm font-bold tracking-widest uppercase text-white">Top Referrers</h4>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "QuantMaster_88", count: 142, rank: 1 },
                  { name: "AlphaSeeker", count: 98, rank: 2 },
                  { name: "VolatilityKing", count: 76, rank: 3 },
                  { name: "MacroEdge", count: 54, rank: 4 },
                  { name: "Nexus_Dev_01", count: 42, rank: 5 },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-[#1A2333] hover:border-[#F0B429]/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`text-[10px] font-bold w-5 h-5 rounded flex items-center justify-center ${i < 3 ? 'bg-[#F0B429] text-black' : 'bg-[#1A2333] text-[#4A5568]'}`}>
                        {user.rank}
                      </div>
                      <span className="text-xs font-bold text-[#7A8BA0] group-hover:text-white transition-colors">{user.name}</span>
                    </div>
                    <div className="text-xs font-black text-white font-['JetBrains_Mono']">{user.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#0A101A] border border-[#1A2333] rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <Activity className="w-5 h-5 text-[#F0B429]" />
                <h4 className="text-sm font-bold tracking-widest uppercase text-white">Recent Activity</h4>
              </div>
              
              <div className="space-y-6">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                    <div>
                      <p className="text-xs text-white font-bold mb-1">
                        <span className="text-[#F0B429]">{item.user}</span> {item.action}
                      </p>
                      <p className="text-[10px] text-[#4A5568] uppercase tracking-widest">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-[#1A2333]">
                <div className="p-4 rounded-xl bg-[#F0B429]/5 border border-[#F0B429]/10">
                  <p className="text-[10px] text-[#F0B429] font-bold uppercase tracking-widest mb-2">PRO TIP</p>
                  <p className="text-[11px] text-[#7A8BA0] leading-relaxed">
                    Top 10 referrers get early access to the <span className="text-white font-bold">NEXUS Alpha Hub</span> and exclusive strategy templates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
