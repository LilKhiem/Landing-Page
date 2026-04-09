import React from 'react';

const PageLayout = ({ children, title }: { children: React.ReactNode, title: string }) => (
  <div className="bg-[#050709] min-h-screen text-[#E8EDF5] font-['JetBrains_Mono'] px-10 py-20 lg:px-40">
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 text-[#7A8BA0] text-sm">
        <a href="/" className="hover:text-white transition">← Back to NEXUS IDE</a>
      </div>
      <h1 className="text-4xl font-bold font-display tracking-tight text-white mb-8 border-b border-[#1A2333] pb-4">{title}</h1>
      <div className="prose prose-invert prose-p:text-[#7A8BA0] prose-li:text-[#7A8BA0] prose-headings:text-white prose-a:text-[#F0B429] max-w-none text-sm space-y-6">
        {children}
      </div>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <PageLayout title="Privacy Policy">
    <p>Last Updated: April 09, 2026</p>
    
    <h2>1. Data Collected</h2>
    <p>We collect information you provide directly to us when you use our services:</p>
    <ul>
      <li><strong>Email Address:</strong> Used for account creation, updates, and communications.</li>
      <li><strong>Payment Information:</strong> Processed securely by our Merchant of Record, Paddle or Lemon Squeezy. We do not store your full card details.</li>
      <li><strong>Usage Data:</strong> Information about your interactions with NEXUS IDE to improve our service offerings.</li>
    </ul>

    <h2>2. Cookies and Tracking</h2>
    <p>We use essential cookies for platform functionality and authentication, alongside analytics cookies to understand how our users interact with our features.</p>

    <h2>3. Third Parties</h2>
    <p>We collaborate with third-party processors like Paddle / Lemon Squeezy to securely handle your payment processing and tax compliance. These entities process your payment data under their own strict privacy regulations.</p>

    <h2>4. GDPR & Your Rights</h2>
    <p>If you reside within the EU/EEA, you maintain full GDPR rights, including the right to:</p>
    <ul>
      <li>Request deletion of your data (Right to be Forgotten).</li>
      <li>Access a copy of your collected personal data.</li>
      <li>Data portability.</li>
    </ul>

    <h2>5. Contact Us</h2>
    <p>To exercise your privacy rights or ask regarding data handling, please contact us at <a href="mailto:admin@algoxpert.org">admin@algoxpert.org</a>.</p>
  </PageLayout>
);

export const TermsOfService = () => (
  <PageLayout title="Terms of Service">
    <p>Last Updated: April 09, 2026</p>

    <h2>1. Subscription Terms</h2>
    <p>Subscriptions automatically renew at the end of every billing cycle unless cancelled beforehand. It is your responsibility to manage or cancel subscriptions via the user dashboard.</p>

    <h2>2. Free Trial Terms</h2>
    <p>The 14-day free trial requires a valid credit card. If you do not cancel before the 14-day period concludes, your card will be automatically charged on Day 15 for the selected subscription tier.</p>

    <h2>3. Founding Rate Policy</h2>
    <p>Founding member rates are locked permanently as long as the subscription remains active. Canceling the subscription permanently forfeits the founding rate; subsequent reactivations will be billed at the standard regular rate.</p>

    <h2>4. Refund Policy</h2>
    <p>Charges applied after the 14-day trial period are completely non-refundable, no exceptions.</p>

    <h2>5. IP Ownership</h2>
    <p>All strategies and configurations generated using the NEXUS IDE remain the intellectual property (IP) of AlgoXpert. In exchange, the active subscribing user is granted a non-exclusive license to utilize these strategies for independent systematic research.</p>

    <h2>6. Limitation of Liability</h2>
    <p>AlgoXpert and NEXUS IDE provide software tools "as is." We are not liable for trading losses, software failures, discrepancies in execution, or external market conditions impacting strategy performance.</p>

    <h2>7. Governing Law</h2>
    <p>These terms shall be governed under the prevailing international commercial jurisdictions, overriding conflicting frameworks unless strictly required by local consumer law.</p>

    <h2>Contact</h2>
    <p>For inquiries, reach out to <a href="mailto:admin@algoxpert.org">admin@algoxpert.org</a>.</p>
  </PageLayout>
);

export const RiskDisclosure = () => (
  <PageLayout title="Risk Disclosure">
    <p className="p-4 bg-red-950/30 border border-red-500 text-red-100 font-bold tracking-widest text-xs uppercase mb-8">
      PLEASE READ CAREFULLY BEFORE USING NEXUS IDE.
    </p>

    <p className="text-xl font-bold text-white mb-4">
      Systematic trading involves substantial risk of loss.
    </p>
    <p>
      NEXUS IDE is a strategy research and validation tool built entirely for educational, research, and software development purposes. It should not be misconstrued as financial guidance or an endorsement of any particular trading opportunity.
    </p>

    <p>
      The outputs, backtest reports, and mathematical validations produced by our software rely entirely on historical data logic. Past results are strictly not indicative of future performance. Users assume full responsibility for any monetary loss resulting from direct or indirect deployments of code generated by NEXUS tools.
    </p>

    <p>
      We heavily recommend employing rigid risk constraints if deploying anything in a live environment. Algorithmic execution carries inherent technological and market-impact risks outside the scope of our validation engine.
    </p>

    <h2>Contact</h2>
    <p>For inquiries, reach out to <a href="mailto:admin@algoxpert.org">admin@algoxpert.org</a>.</p>
  </PageLayout>
);
