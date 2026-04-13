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
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Dashboard } from './components/Dashboard';
import { PrivacyPolicy, TermsOfService, RiskDisclosure } from './components/Legal';
import { ResetPasswordModal } from './components/ResetPasswordModal';
import { Toaster, toast } from 'sonner';

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
    LemonSqueezy?: any;
  }
}

export default function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistPlan, setWaitlistPlan] = useState<string | undefined>(undefined);
  
  // Auth & Checkout State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('nexus_access_token'));
  const [resetToken, setResetToken] = useState<string | null>(null);

  // Initialize Lemon Squeezy and handle URL tokens
  React.useEffect(() => {
    if (window.createLemonSqueezy) {
      window.createLemonSqueezy();
    }
    
    // Check URL search params for verification or password reset
    const params = new URLSearchParams(window.location.search);
    const verify = params.get('verify');
    const reset = params.get('reset');
    const vscodeCallback = params.get('vscode_callback');

    if (vscodeCallback) {
      const token = localStorage.getItem('nexus_access_token');
      if (token) {
        let email = "User";
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.email) email = payload.email;
        } catch (e) {}
        window.location.href = `${vscodeCallback}?token=${token}&email=${encodeURIComponent(email)}`;
        return;
      }

      localStorage.setItem('vscode_callback', vscodeCallback);
      window.history.replaceState({}, '', window.location.pathname);
      setAuthMode('login');
      setIsAuthModalOpen(true);
    }

    if (verify) {
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
      const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:8000';
      fetch(`${adminUrl}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: verify })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          toast.success("Email verified successfully! You can now sign in.");
          setAuthMode('login');
          setIsAuthModalOpen(true);
        } else {
          toast.error(data.error || "Invalid or expired verification link.");
        }
      })
      .catch((err) => toast.error("Verification failed."));
    }

    if (reset) {
      window.history.replaceState({}, '', window.location.pathname);
      setResetToken(reset);
    }
  }, []);

  const handleOpenWaitlist = (plan?: string) => {
    setWaitlistPlan(plan);
    setIsWaitlistOpen(true);
  };

  const processCheckout = async (productId: string, token: string) => {
    try {
      const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:8000';
      const res = await fetch(`${adminUrl}/api/checkout-link`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: productId })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Failed to fetch checkout link');
      
      if (data.url) {
        setCheckoutUrl(data.url);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const openCheckout = (productId: string) => {
    const token = localStorage.getItem('nexus_access_token');
    if (!token) {
      setPendingProductId(productId);
      setAuthMode('register');
      setIsAuthModalOpen(true);
    } else {
      processCheckout(productId, token);
    }
  };

  const handleAuthSuccess = (token: string, identityToken?: string, email?: string) => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);

    const vscodeCb = localStorage.getItem('vscode_callback');
    if (vscodeCb) {
      localStorage.removeItem('vscode_callback');
      window.location.href = `${vscodeCb}?token=${token}&email=${encodeURIComponent(email || 'User')}`;
      return;
    }

    if (pendingProductId) {
      processCheckout(pendingProductId, token);
      setPendingProductId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nexus_access_token');
    localStorage.removeItem('nexus_identity_token');
    setIsLoggedIn(false);
    toast.success('Signed out successfully');
  };

  const path = window.location.pathname;
  if (path === '/privacy') return <PrivacyPolicy />;
  if (path === '/terms') return <TermsOfService />;
  if (path === '/risk-disclosure') return <RiskDisclosure />;
  if (path === '/dashboard') return (
    <>
      <Toaster position="top-center" theme="dark" />
      <Dashboard />
    </>
  );
  
  if (resetToken) {
    return (
      <div className="bg-[#050709] min-h-screen text-[#E8EDF5]">
        <Toaster position="top-center" theme="dark" />
        <ResetPasswordModal token={resetToken} onClose={() => setResetToken(null)} />
      </div>
    );
  }

  return (
    <div className="bg-[#050709] min-h-screen text-[#E8EDF5]">
      <Toaster position="top-center" theme="dark" />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} planName={waitlistPlan} />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        initialMode={authMode}
        onClose={() => { setIsAuthModalOpen(false); setPendingProductId(null); }} 
        onSuccess={handleAuthSuccess}
        intendedProductId={pendingProductId || undefined}
      />

      <Navbar 
        onOpenWaitlist={() => handleOpenWaitlist()} 
        onOpenAuth={(mode) => { setAuthMode(mode); setPendingProductId(null); setIsAuthModalOpen(true); }}
        isLoggedIn={isLoggedIn}
        onOpenProfile={() => window.location.href = '/dashboard'}
      />
      <Hero onOpenWaitlist={() => handleOpenWaitlist()} onOpenCheckout={() => openCheckout('ide-pro-annual-founding')} />
      <HowItWorks />
      <WorkflowDiagram />
      <ValidationEngine />
      <Features />
      <NexusStack />
      <StrategyMarketplace />
      <StrategyResults />
      <ComparisonTable />
      <PerformanceBenchmarks />
      <Pricing onOpenWaitlist={handleOpenWaitlist} onOpenCheckout={(productId) => openCheckout(productId)} />
      <TokenEconomy />
      <Referrals />
      <FinalCTA onOpenWaitlist={() => handleOpenWaitlist()} onOpenCheckout={() => openCheckout('ide-pro-annual-founding')} />
      <Footer onOpenWaitlist={() => handleOpenWaitlist()} />
      <CheckoutModal 
        url={checkoutUrl}
        onClose={() => setCheckoutUrl(null)}
      />
    </div>
  );
}
