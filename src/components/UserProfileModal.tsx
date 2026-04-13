import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, LogOut, Award, Loader2, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

interface UserData {
  name: string;
  email: string;
  current_plan: string | null;
  plan_status: string | null;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, onLogout }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchUserProfile();
    }
  }, [isOpen]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('nexus_access_token');
      if (!token) throw new Error('Not authenticated');

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
      toast.error(err.message);
      onLogout(); // Force logout if token is invalid
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = () => {
    onClose();
    onLogout();
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="absolute inset-0 bg-black/60 backdrop-blur-sm"
           onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#0A101A] border border-[#1A2333] rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-indigo-500" />
          
          <button onClick={onClose} className="absolute top-4 right-4 text-[#7A8BA0] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-display mb-2 text-white">My Account</h2>
              <p className="text-[#7A8BA0] text-sm">Manage your NEXUS Ecosystem profile</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              </div>
            ) : userData ? (
              <div className="space-y-6">
                <div className="bg-[#1A2333]/30 border border-[#2A3441] rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-white font-bold flex items-center gap-2">
                       {userData.name}
                    </div>
                    <div className="text-[#7A8BA0] text-sm flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {userData.email}
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A2333]/30 border border-[#2A3441] rounded-xl p-4">
                  <h3 className="text-xs font-bold text-[#7A8BA0] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Subscription Plan
                  </h3>
                  {userData.current_plan ? (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#F0B429]" />
                        <span className="text-white font-bold uppercase tracking-wide">
                          {userData.current_plan.replace('ide-', '').replace(/-/g, ' ')}
                        </span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider rounded ${userData.plan_status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {userData.plan_status || 'Unknown'}
                      </span>
                    </div>
                  ) : (
                    <div className="text-[#7A8BA0] text-sm italic">
                      No active subscription found. Upgrade your plan to get full access to the NEXUS IDE.
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                    className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {isChangingPassword ? 'Cancel password change' : 'Change Password'}
                  </button>

                  <AnimatePresence>
                    {isChangingPassword && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-3"
                        onSubmit={handleChangePassword}
                      >
                        <div>
                          <input
                            type="password"
                            placeholder="Current Password"
                            required
                            value={passwords.oldPassword}
                            onChange={e => setPasswords({ ...passwords, oldPassword: e.target.value })}
                            className="w-full bg-[#0A101A] border border-[#2A3441] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>
                        <div>
                          <input
                            type="password"
                            placeholder="New Password"
                            required
                            value={passwords.newPassword}
                            onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
                            className="w-full bg-[#0A101A] border border-[#2A3441] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>
                        <div>
                          <input
                            type="password"
                            placeholder="Confirm New Password"
                            required
                            value={passwords.confirmPassword}
                            onChange={e => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                            className="w-full bg-[#0A101A] border border-[#2A3441] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl transition-colors shadow-lg disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleLogoutClick}
                  className="w-full bg-[#1A2333] hover:bg-red-500/20 text-white hover:text-red-400 font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 border border-[#2A3441] hover:border-red-500/50 mt-4"
                >
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="text-center text-red-400 py-10">Failed to load profile data.</div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
