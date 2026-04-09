import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, CreditCard, ShieldCheck } from 'lucide-react';

interface MockCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: number;
  isYearly: boolean;
}

export const MockCheckout = ({ isOpen, onClose, planName, price, isYearly }: MockCheckoutProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Order Summary */}
            <div className="bg-[#F8FAFC] p-8 md:w-2/5 border-r border-gray-100 flex flex-col">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-[#F0B429] rounded-sm"></div>
                </div>
                <span className="font-bold text-gray-900">NEXUS IDE</span>
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium mb-1">Subscribe to</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">NEXUS {planName}</h2>
                
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black text-gray-900">${price}</span>
                  <span className="text-gray-500 font-medium">.00</span>
                </div>
                <p className="text-sm text-gray-500 mb-8">Billed {isYearly ? 'yearly' : 'monthly'}</p>

                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">${price}.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-900">Calculated next</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-3 border-t border-gray-200">
                    <span className="text-gray-900">Total due today</span>
                    <span className="text-gray-900">${price}.00</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>14-day money-back guarantee</span>
              </div>
            </div>

            {/* Right Column: Payment Details */}
            <div className="p-8 md:w-3/5 bg-white relative">
              {isSuccess ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful</h3>
                  <p className="text-gray-500">Welcome to NEXUS {planName}.</p>
                </div>
              ) : (
                <form onSubmit={handlePay} className="flex flex-col h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Payment Details</h3>
                  
                  {/* Express Checkout */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="#000"/><path d="M15.4857 10.4286C15.4857 10.4286 14.6286 9.57143 12.9143 9.57143C11.2 9.57143 9.48571 10.4286 9.48571 12.1429C9.48571 13.8571 11.2 14.7143 12.9143 14.7143C14.6286 14.7143 15.4857 13.8571 15.4857 13.8571" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="text-sm font-semibold text-gray-900">Pay</span>
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FFC439] hover:bg-[#F4BB36] rounded-lg transition-colors">
                      <span className="text-sm font-bold text-[#003087] italic">PayPal</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Or pay with card</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                      <input type="email" required placeholder="you@example.com" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F0B429] focus:border-[#F0B429] outline-none transition-all text-gray-900" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card information</label>
                      <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#F0B429] focus-within:border-[#F0B429] transition-all">
                        <div className="px-4 py-2.5 border-b border-gray-300 flex items-center gap-2 bg-white">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <input type="text" required placeholder="Card number" className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400" />
                        </div>
                        <div className="flex bg-white">
                          <input type="text" required placeholder="MM / YY" className="w-1/2 px-4 py-2.5 border-r border-gray-300 bg-transparent outline-none text-gray-900 placeholder:text-gray-400" />
                          <input type="text" required placeholder="CVC" className="w-1/2 px-4 py-2.5 bg-transparent outline-none text-gray-900 placeholder:text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder name</label>
                      <input type="text" required placeholder="Full name on card" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F0B429] focus:border-[#F0B429] outline-none transition-all text-gray-900" />
                    </div>
                  </div>

                  <div className="mt-8">
                    <button 
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 px-4 bg-[#7047EB] hover:bg-[#5E3BC4] text-white rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Subscribe
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                      Powered by <span className="font-bold text-gray-600">Lemon Squeezy</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
