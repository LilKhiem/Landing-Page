/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ValidationEngine } from './components/ValidationEngine';
import { Features } from './components/Features';
import { NexusStack } from './components/NexusStack';
import { PerformanceBenchmarks } from './components/PerformanceBenchmarks';
import { TokenEconomy } from './components/TokenEconomy';
import { WorkflowDiagram } from './components/WorkflowDiagram';
import { StrategyMarketplace } from './components/StrategyMarketplace';
import { StrategyResults } from './components/StrategyResults';
import { ComparisonTable } from './components/ComparisonTable';
import { Pricing } from './components/Pricing';
import { Referrals } from './components/Referrals';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';
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
      <HowItWorks />
      <WorkflowDiagram />
      <ValidationEngine />
      <Features />
      <NexusStack />
      <StrategyMarketplace />
      <StrategyResults />
      <ComparisonTable />
      <PerformanceBenchmarks />
      <Pricing onOpenWaitlist={() => setIsWaitlistOpen(true)} onOpenCheckout={openCheckout} />
      <TokenEconomy />
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
