import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const ResetPasswordModal = ({ token, onClose }: { token: string, onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirm: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
        toast.error("Passwords do not match");
        return;
    }
    setLoading(true);

    try {
      const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:8000';
      const res = await fetch(`${adminUrl}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ token, password: formData.password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Password reset failed');
      }

      setSuccess(true);
      toast.success('Password updated successfully! You can now log in.');
      
      setTimeout(() => {
        window.location.href = '/'; 
      }, 2000);
      
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#0A101A] border border-[#1A2333] rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />
          
          <button
            onClick={() => window.location.href = '/'}
            className="absolute top-4 right-4 text-[#7A8BA0] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-display mb-2 text-white">
                Reset Password
              </h2>
              <p className="text-[#7A8BA0] text-sm">
                Enter a new password for your account.
              </p>
            </div>

            {success ? (
                <div className="text-center text-green-400 py-8">
                    <p>Your password has been reset.</p>
                    <p className="text-sm mt-2 text-[#7A8BA0]">Redirecting you to the home page...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-[#7A8BA0] uppercase tracking-wider mb-2">
                    New Password
                    </label>
                    <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5568]" />
                    <input
                        type="password"
                        required
                        minLength={6}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-[#1A2333]/50 border border-[#2A3441] rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="••••••••"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#7A8BA0] uppercase tracking-wider mb-2">
                    Confirm New Password
                    </label>
                    <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5568]" />
                    <input
                        type="password"
                        required
                        minLength={6}
                        value={formData.confirm}
                        onChange={(e) => setFormData({...formData, confirm: e.target.value})}
                        className="w-full bg-[#1A2333]/50 border border-[#2A3441] rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="••••••••"
                    />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center disabled:opacity-50 mt-6"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Set New Password'}
                </button>
                </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
