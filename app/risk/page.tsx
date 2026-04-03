/**
 * RISK DISCLOSURE
 */

export default function RiskPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Risk Disclosure</h1>
        
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
          <p className="text-red-400 font-semibold text-lg">
            ⚠️ IMPORTANT: Trading cryptocurrencies involves substantial risk of loss. Only trade with funds you can afford to lose.
          </p>
        </div>
        
        <div className="prose prose-invert max-w-none space-y-8 text-white/80">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Market Risk</h2>
            <p>
              <strong>Cryptocurrency markets are highly volatile.</strong> Token prices can fluctuate dramatically within minutes. 
              OP-20 tokens on OP_NET are particularly volatile due to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Limited liquidity compared to major cryptocurrencies</li>
              <li>Emerging technology with unproven track record</li>
              <li>Susceptibility to market manipulation in low-volume markets</li>
              <li>Rapid price swings based on sentiment and speculation</li>
            </ul>
            <p className="mt-4 text-yellow-400">
              <strong>Risk Level: EXTREME</strong> - You could lose 50-100% of your investment in hours.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Technology Risk</h2>
            <p>
              OP_NET is a relatively new Bitcoin Layer 1 metaprotocol. Risks include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Smart Contract Bugs:</strong> Undetected vulnerabilities could result in total loss of funds</li>
              <li><strong>Network Congestion:</strong> High Bitcoin fees may make transactions uneconomical</li>
              <li><strong>Protocol Changes:</strong> Upgrades or forks could affect token functionality</li>
              <li><strong>Wallet Compatibility:</strong> OP_WALLET or other wallets may have bugs or security issues</li>
            </ul>
            <p className="mt-4 text-orange-400">
              <strong>Risk Level: HIGH</strong> - New technology = untested edge cases.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Liquidity Risk</h2>
            <p>
              OP-20 tokens may have very limited liquidity:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may not be able to sell tokens quickly at fair prices</li>
              <li>Large trades can significantly move market prices (slippage)</li>
              <li>Some tokens may become completely illiquid (no buyers)</li>
              <li>MotoSwap pools may have insufficient reserves for larger swaps</li>
            </ul>
            <p className="mt-4 text-orange-400">
              <strong>Risk Level: HIGH</strong> - Especially for tokens without direct BTC pairs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Operational Risk</h2>
            <p>
              Using Opflow involves several operational risks:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>User Error:</strong> Sending to wrong address results in permanent loss</li>
              <li><strong>Private Key Loss:</strong> Losing wallet access means losing funds forever</li>
              <li><strong>Phishing Attacks:</strong> Fake sites or malicious extensions can steal funds</li>
              <li><strong>Transaction Errors:</strong> Incorrect amounts or addresses cannot be reversed</li>
            </ul>
            <p className="mt-4 text-yellow-400">
              <strong>Risk Level: MEDIUM-HIGH</strong> - Always double-check transaction details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Regulatory Risk</h2>
            <p>
              Cryptocurrency regulation is evolving worldwide:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your jurisdiction may ban or restrict crypto trading at any time</li>
              <li>Tax treatment of crypto transactions varies and may be unclear</li>
              <li>Future regulations could affect the value or usability of tokens</li>
              <li>Cross-border transactions may face additional restrictions</li>
            </ul>
            <p className="mt-4 text-orange-400">
              <strong>Risk Level: MEDIUM</strong> - Consult local legal and tax advisors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Counterparty Risk</h2>
            <p>
              While Opflow acts as an intermediary:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We temporarily hold funds during transactions</li>
              <li>Platform downtime could delay your transaction</li>
              <li>Hot wallet security depends on our operational practices</li>
              <li>No government insurance (like FDIC) protects your funds</li>
            </ul>
            <p className="mt-4 text-yellow-400">
              <strong>Risk Level: MEDIUM</strong> - We aim for transparency but risks remain.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Price Oracle Risk</h2>
            <p>
              Our pricing mechanism relies on external data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>MotoSwap pool reserves determine fair market value</li>
              <li>Low liquidity can cause inaccurate pricing</li>
              <li>Oracle failures could display incorrect prices</li>
              <li>You receive 93% of displayed price (7% platform fee)</li>
            </ul>
            <p className="mt-4 text-yellow-400">
              <strong>Risk Level: MEDIUM</strong> - Always verify prices independently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Network Risks</h2>
            <p>
              Blockchain-specific risks:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Bitcoin Network:</strong> High fees during congestion, slow confirmation times</li>
              <li><strong>Base Network:</strong> Potential downtime, MEV attacks, reorgs</li>
              <li><strong>Bridge Risk:</strong> Although Opflow doesn't use bridges, understanding cross-chain risks is important</li>
            </ul>
            <p className="mt-4 text-yellow-400">
              <strong>Risk Level: MEDIUM</strong> - Network issues are beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Token-Specific Risks</h2>
            <p>
              Each OP-20 token carries unique risks:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Project abandonment (team stops development)</li>
              <li>Rug pulls or exit scams (malicious developers)</li>
              <li>Code vulnerabilities specific to the token contract</li>
              <li>Loss of community interest or utility</li>
            </ul>
            <p className="mt-4 text-red-400">
              <strong>Risk Level: VERY HIGH</strong> - Do your own research on each token.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. No Guarantees</h2>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
              <p className="font-semibold text-yellow-400 mb-3">We Do NOT Guarantee:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/80">
                <li>Profits or positive returns on any trade</li>
                <li>Availability of the Platform at all times</li>
                <li>Accuracy of price feeds or market data</li>
                <li>Protection against market manipulation</li>
                <li>Recovery of lost or stolen funds</li>
                <li>Future value of any token</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Recommended Precautions</h2>
            <p>
              To minimize risks:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>✅ Only invest what you can afford to lose completely</li>
              <li>✅ Use hardware wallets for large holdings</li>
              <li>✅ Enable all available security features (2FA where supported)</li>
              <li>✅ Verify all addresses and amounts before confirming</li>
              <li>✅ Research tokens thoroughly before trading</li>
              <li>✅ Start with small test transactions</li>
              <li>✅ Keep private keys offline and backed up securely</li>
              <li>✅ Understand tax implications in your jurisdiction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Acknowledgment</h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <p className="font-semibold text-red-400 mb-3">By using Opflow, you acknowledge that:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/80">
                <li>You have read and understood all risks described above</li>
                <li>You accept full responsibility for your trading decisions</li>
                <li>You will not hold Opflow liable for any losses</li>
                <li>You understand cryptocurrency trading is speculative and risky</li>
                <li>Past performance does not indicate future results</li>
              </ul>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-white/40">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-white/40 mt-2">
              This disclosure is not exhaustive. Additional risks may exist that are not listed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
