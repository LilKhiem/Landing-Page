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
import { StrategyMarketplace } from './components/StrategyMarketplace';
import { StrategyResults } from './components/StrategyResults';
import { ComparisonTable } from './components/ComparisonTable';
import { Pricing } from './components/Pricing';
import { Referrals } from './components/Referrals';
import { Moats } from './components/Moats';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';

export default function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <div className="bg-[#050709] min-h-screen text-[#E8EDF5]">
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      <Navbar onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <Hero onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <HowItWorks />
      <ValidationEngine />
      <Features />
      <StrategyMarketplace />
      <StrategyResults />
      <ComparisonTable />
      <Pricing onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <Referrals />
      <Moats />
      <FinalCTA onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <Footer />
    </div>
  );
}
