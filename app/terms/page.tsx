/**
 * TERMS OF SERVICE
 */

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-white/80">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Opflow ("the Platform"), you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, you must not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
            <p>
              Opflow is an over-the-counter (OTC) marketplace facilitating peer-to-peer swaps between OP-20 tokens 
              (on Bitcoin Layer 1 via OP_NET) and stablecoins (USDT/USDC on Base network). The Platform acts solely 
              as an intermediary and does not take custody of user funds beyond the duration of a transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Eligibility</h2>
            <p>You must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 18 years old</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Not be a resident of a jurisdiction where cryptocurrency trading is prohibited</li>
              <li>Comply with all applicable laws and regulations in your jurisdiction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Platform Fees</h2>
            <p>
              Opflow charges a 7% platform fee on all transactions. Sellers receive 93% of the fair market value 
              of their tokens. This fee covers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gas costs on both OP_NET and Base networks</li>
              <li>Liquidity provision and market-making services</li>
              <li>Platform maintenance and development</li>
              <li>Security audits and monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. User Responsibilities</h2>
            <p>Users are solely responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintaining the security of their wallet private keys</li>
              <li>Verifying all transaction details before confirmation</li>
              <li>Understanding the risks associated with cryptocurrency trading</li>
              <li>Complying with tax obligations in their jurisdiction</li>
              <li>Conducting their own due diligence on token valuations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Prohibited Activities</h2>
            <p>Users must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Platform for money laundering or terrorist financing</li>
              <li>Manipulate prices or engage in market manipulation</li>
              <li>Attempt to exploit bugs or vulnerabilities</li>
              <li>Use automated bots or scripts without authorization</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer of Warranties</h2>
            <p>
              THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. We do not guarantee:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Uninterrupted or error-free service</li>
              <li>Accuracy of price data or market information</li>
              <li>Security against all potential threats</li>
              <li>Compatibility with all wallet providers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
            <p>
              Opflow and its operators shall not be liable for any direct, indirect, incidental, special, 
              consequential, or exemplary damages resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Loss of funds due to user error or negligence</li>
              <li>Network congestion or blockchain delays</li>
              <li>Smart contract failures or bugs</li>
              <li>Market volatility or price fluctuations</li>
              <li>Third-party wallet provider issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Opflow, its operators, and affiliates from any claims, 
              losses, damages, or expenses arising from your use of the Platform or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of the Platform after 
              changes constitutes acceptance of the modified Terms. Material changes will be announced via 
              the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>
            <p>
              We may suspend or terminate your access to the Platform at any time, with or without cause, 
              and with or without notice, particularly in cases of suspected fraud, market manipulation, 
              or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with international arbitration 
              principles. Any disputes shall be resolved through binding arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us through our official channels listed on the Platform.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-white/40">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
