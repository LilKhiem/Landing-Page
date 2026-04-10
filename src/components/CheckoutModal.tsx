import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, ShieldCheck } from 'lucide-react';

interface CheckoutModalProps {
  url: string | null;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ url, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when URL changes
  useEffect(() => {
    if (url) {
      setIsLoading(true);
    }
  }, [url]);

  // Listen for Lemon Squeezy success event
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.event === 'Checkout.Success') {
        onClose(); // Close modal
        window.location.href = '/dashboard'; // Redirect to dashboard
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose]);

  if (!url) return null;

  // Append embed parameter
  const iframeUrl = url + (url.includes('?') ? '&' : '?') + 'embed=1';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        
        {/* Transparent backdrop - No heavy blur, just a tiny dim */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="absolute inset-0 bg-black/40 pointer-events-auto"
           onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[480px] h-[85vh] min-h-[500px] max-h-[800px] bg-[#0A101A] border border-[#1A2333] shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden pointer-events-auto flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-[#1A2333] bg-[#050709] shrink-0">
             <div className="flex items-center gap-2 text-[#7A8BA0]">
               <ShieldCheck className="w-4 h-4 text-emerald-500" />
               <span className="text-xs font-bold uppercase tracking-widest">NEXUS Secure Checkout</span>
             </div>
             <button 
               onClick={onClose} 
               className="p-1.5 hover:bg-[#1A2333] rounded-lg text-[#7A8BA0] hover:text-white transition-colors"
             >
               <X className="w-4 h-4" />
             </button>
          </div>
          
          {/* Iframe Container */}
          <div className="flex-1 w-full bg-white relative">
             {isLoading && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050709] gap-4 z-10">
                 <Loader2 className="w-8 h-8 text-[#F0B429] animate-spin" />
                 <p className="text-xs font-bold tracking-widest uppercase text-[#7A8BA0]">Loading Secure Payment...</p>
               </div>
             )}
             <iframe 
               src={iframeUrl} 
               className="absolute inset-0 w-full h-full border-0" 
               allow="payment" 
               onLoad={() => setIsLoading(false)}
             />
          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};
