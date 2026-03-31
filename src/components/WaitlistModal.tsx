import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [email, setEmail] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#0D1117] border border-[#1A2333] p-8 rounded-xl max-w-md w-full relative">
              <button onClick={onClose} className="absolute top-4 right-4 text-[#7A8BA0] hover:text-[#00D4FF]">
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-2">Join the Waitlist</h2>
              <p className="text-[#7A8BA0] text-sm mb-6">Get early access to NEXUS IDE. Founding Member pricing locked permanently on launch day.</p>
              <form onSubmit={(e) => { e.preventDefault(); console.log('Email:', email); onClose(); }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#050709] border border-[#1A2333] rounded px-4 py-3 text-sm mb-4 focus:border-[#00D4FF] outline-none"
                  placeholder="your@email.com"
                  required
                />
                <button type="submit" className="w-full bg-[#00D4FF] text-black font-bold py-3 rounded hover:opacity-90 transition">
                  Join Waitlist →
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
