/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { StrategyMarketplace } from './components/StrategyMarketplace';
import { ComparisonTable } from './components/ComparisonTable';
import { Pricing } from './components/Pricing';
import { Referrals } from './components/Referrals';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';
import { PainPoints } from './components/PainPoints';
import { VerificationGauntlet } from './components/VerificationGauntlet';
import { MockCheckout } from './components/MockCheckout';
import { Toaster } from 'sonner';

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
  }
}

export default function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState<{isOpen: boolean, planName: string, price: number, isYearly: boolean}>({
    isOpen: false,
    planName: 'Pro',
    price: 99,
    isYearly: false
  });

  const openCheckout = (planName: string, price: number, isYearly: boolean) => {
    setCheckoutState({ isOpen: true, planName, price, isYearly });
  };

  return (
    <div className="bg-[#050709] min-h-screen text-[#E8EDF5]">
      <Toaster position="top-center" theme="dark" />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      <Navbar onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <Hero onOpenWaitlist={() => setIsWaitlistOpen(true)} onOpenCheckout={() => openCheckout('Pro', 99, false)} />
      <PainPoints onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <VerificationGauntlet onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <HowItWorks />
      <ComparisonTable onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <StrategyMarketplace onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <Pricing onOpenWaitlist={() => setIsWaitlistOpen(true)} onOpenCheckout={openCheckout} />
      <Referrals />
      <FinalCTA onOpenWaitlist={() => setIsWaitlistOpen(true)} onOpenCheckout={() => openCheckout('Pro', 99, false)} />
      <Footer onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <MockCheckout 
        isOpen={checkoutState.isOpen} 
        onClose={() => setCheckoutState(prev => ({ ...prev, isOpen: false }))}
        planName={checkoutState.planName}
        price={checkoutState.price}
        isYearly={checkoutState.isYearly}
      />
    </div>
  );
}
