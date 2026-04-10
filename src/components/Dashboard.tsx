import React, { useState, useEffect } from 'react';
import { Mail, LogOut, Award, Loader2, CreditCard, ArrowLeft, Download, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface UserData {
  name: string;
  email: string;
  current_plan: string | null;
  plan_status: string | null;
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('nexus_access_token');
      if (!token) {
        window.location.href = '/';
        return;
      }

      const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:8000';
      const res = await fetch(`${adminUrl}/api/auth/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Failed to fetch user data');
      setUserData(data.user || data);
    } catch (err: any) {
      toast.error('Session expired. Please sign in again.');
      localStorage.removeItem('nexus_access_token');
      localStorage.removeItem('nexus_identity_token');
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nexus_access_token');
    localStorage.removeItem('nexus_identity_token');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050709] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
          <p className="text-[#7A8BA0] font-['JetBrains_Mono'] uppercase tracking-widest text-sm">Loading Nexus Node...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050709] text-[#E8EDF5]">
      {/* Dashboard Navbar */}
      <nav className="border-b border-[#1A2333] bg-[#0A101A] px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="text-[#7A8BA0] hover:text-white flex items-center gap-2 transition font-['JetBrains_Mono'] tracking-wider text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to IDE
          </a>
          <span className="text-[#2A3441]">|</span>
          <h1 className="font-display text-xl font-bold tracking-[-0.03em] text-white">NEXUS CONTROL CENTER</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="text-[#7A8BA0] hover:text-red-400 font-['JetBrains_Mono'] text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 transition"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: User Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-[#0A101A] border border-[#1A2333] rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-indigo-500" />
              <div className="flex flex-col items-center text-center mt-4">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-display font-bold text-4xl shadow-lg mb-4">
                  {userData?.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{userData?.name}</h2>
                <div className="text-[#7A8BA0] flex items-center justify-center gap-2 text-sm bg-[#1A2333]/50 px-3 py-1 rounded-full">
                  <Mail className="w-3 h-3" /> {userData?.email}
                </div>
              </div>
            </div>

            <div className="bg-[#0A101A] border border-[#1A2333] rounded-2xl p-6 shadow-xl">
              <h3 className="text-xs font-bold text-[#7A8BA0] uppercase tracking-widest mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Active License
              </h3>
              {userData?.current_plan ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-[#1A2333]/30 p-4 rounded-xl border border-[#2A3441]">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-[#F0B429]" />
                      <div>
                        <div className="text-white font-bold uppercase tracking-wide text-sm">
                          {userData.current_plan.replace('ide-', '').replace(/-/g, ' ')}
                        </div>
                        <div className="text-[#7A8BA0] text-xs">Full ecosystem access</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider rounded ${userData.plan_status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {userData.plan_status || 'Unknown'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 bg-[#1A2333]/20 rounded-xl border border-[#2A3441] border-dashed">
                  <p className="text-[#7A8BA0] text-sm mb-4 px-4">No active subscription found. You need a license to access the Desktop Application.</p>
                  <a href="/#pricing" className="inline-block bg-[#F0B429] text-black font-['JetBrains_Mono'] text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 rounded hover:opacity-85 transition">
                    View Pricing
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: App Downloads & Stats */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#0A101A] border border-[#1A2333] rounded-2xl p-8 shadow-xl">
              <h3 className="text-lg font-display font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-500" /> Desktop Application
              </h3>
              <p className="text-[#7A8BA0] text-sm mb-8">Download the NEXUS Engine to strictly enforce your systematic trading algorithms securely on your own hardware.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  disabled={!userData?.current_plan || userData?.plan_status !== 'active'}
                  className="group relative bg-[#1A2333]/50 hover:bg-[#1A2333] border border-[#2A3441] hover:border-indigo-500/50 rounded-xl p-6 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg className="w-16 h-16 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-white font-bold mb-1">Windows 64-bit</h4>
                    <p className="text-[#7A8BA0] text-xs mb-4">Requires Windows 11/10</p>
                    <div className="flex items-center gap-2 text-indigo-400 font-['JetBrains_Mono'] text-xs font-bold uppercase">
                      <Download className="w-4 h-4" /> {userData?.current_plan ? 'Download .exe' : 'License Required'}
                    </div>
                  </div>
                </button>
                
                <button 
                  disabled={!userData?.current_plan || userData?.plan_status !== 'active'}
                  className="group relative bg-[#1A2333]/50 hover:bg-[#1A2333] border border-[#2A3441] hover:border-emerald-500/50 rounded-xl p-6 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg className="w-16 h-16 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.307 20.372c-1.391.804-3.13 1.156-4.57.25-1.554-.972-2.195-2.903-3.23-5.267-1.12-2.316-2.617-5.59-4.877-6.046-2.26-.457-3.924.969-4.78 1.48L0 7.828c1.378-1.579 5.864-5.32 10.377-5.115 4.513.205 6.452 4.095 8.358 6.643 1.905 2.548 3.513 3.42 4.135 3.32.61-.097 1.34-1.272 1.34-1.272l2.366 3.655c-.53.778-1.745 2.1-3.303 2.1-1.559 0-2.355-.705-3.528-1.72-1.176-1.01-2.072-1.233-2.923-.424-.852.812-1.168 2.39-2.515 5.357z"/>
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-white font-bold mb-1">macOS (Apple Silicon)</h4>
                    <p className="text-[#7A8BA0] text-xs mb-4">Requires macOS 13+</p>
                    <div className="flex items-center gap-2 text-emerald-400 font-['JetBrains_Mono'] text-xs font-bold uppercase">
                      <Download className="w-4 h-4" /> {userData?.current_plan ? 'Download .dmg' : 'License Required'}
                    </div>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
