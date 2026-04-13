import React, { useState, useEffect } from 'react';
import { Mail, LogOut, Award, Loader2, CreditCard, ArrowLeft, Download, ShieldCheck, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
interface UserData {
  name: string;
  email: string;
  current_plan: string | null;
  plan_status: string | null;
}

interface SubscriptionData {
  id: string;
  plan_key: string;
  status: string;
  started_at: string;
  expires_at: string;
  created_at: string;
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const [userRes, subsRes] = await Promise.all([
        fetch(`${adminUrl}/api/auth/user`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        }),
        fetch(`${adminUrl}/api/auth/subscriptions`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        })
      ]);

      const userData = await userRes.json();
      
      if (!userRes.ok) throw new Error(userData.message || 'Failed to fetch user data');
      setUserData(userData.user || userData);

      if (subsRes.ok) {
        const subsData = await subsRes.json();
        if (Array.isArray(subsData)) {
          setSubscriptions(subsData);
        }
      }
    } catch (err: any) {
      toast.error('Session expired. Please sign in again.');
      localStorage.removeItem('nexus_access_token');
      localStorage.removeItem('nexus_identity_token');
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async (subId: string) => {
    if (!confirm('Are you sure you want to cancel this subscription? You will still have access until the end of the billing period.')) return;
    setCancelingId(subId);
    try {
      const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:8000';
      const token = localStorage.getItem('nexus_access_token');
      const res = await fetch(`${adminUrl}/api/auth/subscriptions/${subId}/cancel`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to cancel subscription');
      
      toast.success('Subscription cancelled successfully.');
      fetchUserProfile();
    } catch (err: any) {
      if (err.message === 'cannot_cancel_onetime_payment') {
        toast.error('One-time payments cannot be cancelled via API.');
      } else {
        toast.error(err.message || 'An error occurred.');
      }
    } finally {
      setCancelingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nexus_access_token');
    localStorage.removeItem('nexus_identity_token');
    window.location.href = '/';
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('nexus_access_token');
      const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:8000';
      const res = await fetch(`${adminUrl}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          old_password: passwords.oldPassword,
          new_password: passwords.newPassword
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || 'Failed to change password');
      
      toast.success('Password changed successfully');
      setIsChangingPassword(false);
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
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
                <div className="text-[#7A8BA0] flex items-center justify-center gap-2 text-sm bg-[#1A2333]/50 px-3 py-1 rounded-full mb-6">
                  <Mail className="w-3 h-3" /> {userData?.email}
                </div>
                
                <div className="w-full border-t border-[#1A2333] pt-4">
                  <button
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                    className="w-full flex items-center justify-center gap-2 text-sm font-bold tracking-widest uppercase text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Key className="w-4 h-4" />
                    {isChangingPassword ? 'Cancel Change' : 'Change Password'}
                  </button>

                  <AnimatePresence>
                    {isChangingPassword && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-3 text-left overflow-hidden"
                        onSubmit={handleChangePassword}
                      >
                        <div>
                          <input
                            type="password"
                            placeholder="Current Password"
                            required
                            value={passwords.oldPassword}
                            onChange={e => setPasswords({ ...passwords, oldPassword: e.target.value })}
                            className="w-full bg-[#1A2333]/50 border border-[#2A3441] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>
                        <div>
                          <input
                            type="password"
                            placeholder="New Password"
                            required
                            value={passwords.newPassword}
                            onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
                            className="w-full bg-[#1A2333]/50 border border-[#2A3441] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>
                        <div>
                          <input
                            type="password"
                            placeholder="Confirm New Password"
                            required
                            value={passwords.confirmPassword}
                            onChange={e => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                            className="w-full bg-[#1A2333]/50 border border-[#2A3441] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2.5 rounded-xl transition-colors shadow-lg disabled:opacity-50 flex justify-center items-center gap-2 text-sm uppercase tracking-wider"
                        >
                          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : 'Update Password'}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
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

            <div className="bg-[#0A101A] border border-[#1A2333] rounded-2xl p-8 shadow-xl">
              <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-500" /> Payment & Subscription History
              </h3>
              
              {subscriptions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#1A2333] text-xs font-bold text-[#7A8BA0] uppercase tracking-wider">
                        <th className="pb-3 pr-4 font-['JetBrains_Mono']">Date</th>
                        <th className="pb-3 pr-4 font-['JetBrains_Mono']">Plan</th>
                        <th className="pb-3 pr-4 font-['JetBrains_Mono']">Status</th>
                        <th className="pb-3 font-['JetBrains_Mono'] text-right">Expiration</th>
                        <th className="pb-3 pl-4"></th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {subscriptions.map((sub, idx) => (
                        <tr key={sub.id || idx} className="border-b border-[#1A2333]/50 last:border-0 hover:bg-[#1A2333]/30 transition-colors">
                          <td className="py-4 pr-4 font-['JetBrains_Mono'] text-[#7A8BA0]">
                            {(sub.started_at || sub.created_at) ? new Date(sub.started_at || sub.created_at).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="py-4 pr-4">
                            <span className="bg-[#1A2333] text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                              {sub.plan_key?.replace('ide-', '').replace(/-/g, ' ') || 'Unknown'}
                            </span>
                          </td>
                          <td className="py-4 pr-4">
                            <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
                              sub.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                              sub.status === 'expired' ? 'bg-[#1A2333] text-[#7A8BA0]' :
                              sub.status === 'canceled' ? 'bg-red-500/20 text-red-400' :
                              'bg-indigo-500/20 text-indigo-400'
                            }`}>
                              {sub.status || 'pending'}
                            </span>
                          </td>
                          <td className="py-4 font-['JetBrains_Mono'] text-right text-[#7A8BA0]">
                            {sub.expires_at ? new Date(sub.expires_at).toLocaleDateString() : 'Lifetime'}
                          </td>
                          <td className="py-4 pl-4 text-right">
                            {sub.status === 'active' && (
                              <button
                                onClick={() => handleCancelSubscription(sub.id)}
                                disabled={cancelingId === sub.id}
                                className="text-xs text-red-500/80 hover:text-red-400 transition-colors disabled:opacity-50 underline decoration-red-500/30 underline-offset-2"
                              >
                                {cancelingId === sub.id ? 'Canceling...' : 'Cancel'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 bg-[#1A2333]/20 rounded-xl border border-[#2A3441] border-dashed">
                  <p className="text-[#7A8BA0] text-sm">No payment history found.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
