/**
 * PRIVACY POLICY
 */

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-white/80">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Opflow ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you use our Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Wallet addresses (public blockchain addresses)</li>
              <li>Transaction data (amounts, tokens, timestamps)</li>
              <li>Communication data (if you contact support)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP addresses and device information</li>
              <li>Browser type and version</li>
              <li>Usage data (pages visited, time spent)</li>
              <li>Transaction metadata (not financial details)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.3 Blockchain Data</h3>
            <p>
              All transactions on OP_NET and Base are publicly recorded on their respective blockchains. 
              This data is permanent, transparent, and accessible to anyone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Facilitate and process transactions</li>
              <li>Display transaction history and account activity</li>
              <li>Improve Platform functionality and user experience</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
              <li>Communicate important updates about the Platform</li>
              <li>Provide customer support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Storage and Security</h2>
            <p>
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Limited access controls to sensitive data</li>
              <li>Secure cloud infrastructure with redundancy</li>
            </ul>
            <p className="mt-4">
              However, no system is 100% secure. You are responsible for maintaining the security of your 
              private keys and wallet credentials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">5.1 We Do NOT Sell Your Data</h3>
            <p>We do not sell, rent, or trade your personal information to third parties.</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.2 We May Share Data With:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Cloud hosting, analytics, security services</li>
              <li><strong>Legal Authorities:</strong> When required by law or to prevent illegal activity</li>
              <li><strong>Blockchain Networks:</strong> Transaction data is publicly visible on-chain</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking</h2>
            <p>We use minimal cookies and tracking technologies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for Platform functionality</li>
              <li><strong>Analytics Cookies:</strong> To understand user behavior (optional)</li>
              <li><strong>Performance Cookies:</strong> To improve loading times</li>
            </ul>
            <p className="mt-4">
              You can disable non-essential cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Object to certain data processing</li>
              <li>Export your data in a portable format</li>
            </ul>
            <p className="mt-4">
              Note: Blockchain data cannot be deleted due to its immutable nature.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. International Users</h2>
            <p>
              Opflow operates globally. Your data may be transferred to and processed in countries other than 
              your own. We ensure appropriate safeguards are in place for international data transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
            <p>
              Our Platform is not intended for users under 18 years old. We do not knowingly collect data 
              from children. If you believe a child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Data Retention</h2>
            <p>We retain your data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>For as long as you use the Platform</li>
              <li>As required to comply with legal obligations (typically 7 years)</li>
              <li>To resolve disputes and enforce our Terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Third-Party Links</h2>
            <p>
              Our Platform may contain links to third-party services (OPScan, MotoSwap, Base Network explorers). 
              We are not responsible for their privacy practices. Please review their privacy policies separately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Material changes will be announced via the Platform. 
              Your continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
            <p>
              For privacy-related questions or to exercise your rights, contact us through our official channels 
              listed on the Platform.
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
