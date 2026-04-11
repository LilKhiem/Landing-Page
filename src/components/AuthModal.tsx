import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onSuccess: (token: string, identityToken: string) => void;
  intendedProductId?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode = 'login', onClose, onSuccess, intendedProductId }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login');
      setIsForgotPassword(false);
      setVerificationSent(false);
      setForgotSuccess(false);
    }
  }, [isOpen, initialMode]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:8000';

      if (isForgotPassword) {
        const res = await fetch(`${adminUrl}/api/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ email: formData.email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Request failed');
        setForgotSuccess(true);
        return;
      }

      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin ? { email: formData.email, password: formData.password } : formData;

      const res = await fetch(`${adminUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || (data.errors ? Object.values(data.errors)[0]?.[0] : 'Authentication failed'));
      }

      if (data.status === 'verification_required') {
        setVerificationSent(true);
        return;
      }

      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      
      if (data.access_token) {
        localStorage.setItem('nexus_access_token', data.access_token);
        if (data.identity_token) {
           localStorage.setItem('nexus_identity_token', data.identity_token);
        }
        onSuccess(data.access_token, data.identity_token || 'python_backend_no_identity_token');
      }
      
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
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
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#7A8BA0] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            {verificationSent ? (
               <div className="text-center py-8">
                 <Mail className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                 <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
                 <p className="text-[#7A8BA0] text-sm">
                   We've sent a verification link to <span className="text-white">{formData.email}</span>. 
                   Please verify your account to continue.
                 </p>
                 <button onClick={() => { setVerificationSent(false); setIsLogin(true); }} className="mt-8 text-indigo-400 text-sm hover:text-white transition">Return to login</button>
               </div>
            ) : forgotSuccess ? (
               <div className="text-center py-8">
                 <Mail className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                 <h2 className="text-2xl font-bold text-white mb-2">Reset link sent</h2>
                 <p className="text-[#7A8BA0] text-sm">
                   If an account exists for <span className="text-white">{formData.email}</span>, you will receive password reset instructions.
                 </p>
                 <button onClick={() => { setForgotSuccess(false); setIsForgotPassword(false); setIsLogin(true); }} className="mt-8 text-indigo-400 text-sm hover:text-white transition">Return to login</button>
               </div>
            ) : (
             <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-display mb-2 text-white">
                {isForgotPassword ? 'Reset Password' : isLogin ? 'Sign In to NEXUS' : 'Create Account'}
              </h2>
              <p className="text-[#7A8BA0] text-sm">
                {isForgotPassword ? 'Enter your email to receive reset instructions' : intendedProductId 
                  ? 'Please authenticate to complete your purchase' 
                  : 'Enter your credentials to access the ecosystem'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && !isForgotPassword && (
                <div>
                  <label className="block text-xs font-bold text-[#7A8BA0] uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5568]" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#1A2333]/50 border border-[#2A3441] rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#7A8BA0] uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5568]" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#1A2333]/50 border border-[#2A3441] rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {!isForgotPassword && (
                <div>
                  <label className="block text-xs font-bold text-[#7A8BA0] uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5568]" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-[#1A2333]/50 border border-[#2A3441] rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                  {isLogin && (
                    <div className="flex justify-end mt-2">
                      <button type="button" onClick={() => setIsForgotPassword(true)} className="text-xs text-indigo-400 hover:text-indigo-300">
                        Forgot Password?
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!isLogin && !isForgotPassword && (
                <div>
                  <label className="block text-xs font-bold text-[#7A8BA0] uppercase tracking-wider mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5568]" />
                    <input
                      type="password"
                      required
                      value={formData.password_confirmation}
                      onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                      className="w-full bg-[#1A2333]/50 border border-[#2A3441] rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isForgotPassword ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              {!isForgotPassword ? (
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-[#7A8BA0] hover:text-white transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              ) : (
                <button
                  onClick={() => setIsForgotPassword(false)}
                  className="text-sm text-[#7A8BA0] hover:text-white transition-colors"
                >
                  Back to Sign In
                </button>
              )}
            </div>
            </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
