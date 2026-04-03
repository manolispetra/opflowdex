/**
 * TRANSPARENCY SECTION - WITH LIVE BALANCES
 * Shows hot wallet addresses with real-time balance updates
 */

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { OPNET_HOT_WALLET, BASE_HOT_WALLET } from '@/lib/constants';
import { useLiveBalances } from '@/lib/useLiveBalances';

export function Transparency() {
  const [copiedOPNet, setCopiedOPNet] = useState(false);
  const [copiedBase, setCopiedBase] = useState(false);
  
  const { opnetBTC, baseUSDT, baseUSDC, isLoading, lastUpdate, refresh } = useLiveBalances();
  
  const copyToClipboard = (text: string, type: 'opnet' | 'base') => {
    navigator.clipboard.writeText(text);
    if (type === 'opnet') {
      setCopiedOPNet(true);
      setTimeout(() => setCopiedOPNet(false), 2000);
    } else {
      setCopiedBase(true);
      setTimeout(() => setCopiedBase(false), 2000);
    }
  };
  
  const formatTime = (timestamp: number | null) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  return (
    <section id="transparency" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Full Transparency
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Live hot wallet balances. Track every transaction. Verify every transfer.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* OP_NET Hot Wallet */}
          <motion.div
            className="glass glass-hover p-8 rounded-2xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bitcoin-orange to-bitcoin-orange/50 flex items-center justify-center">
                <span className="text-2xl">₿</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">OP_NET Hot Wallet</h3>
                <p className="text-sm text-white/60">Receives OP-20 tokens</p>
              </div>
            </div>
            
            {/* Live Balance */}
            <div className="mb-6 p-4 bg-white/5 rounded-xl">
              <p className="text-sm text-white/60 mb-1">Live Balance</p>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-bitcoin-orange border-t-transparent rounded-full animate-spin" />
                  <span className="text-white/40">Loading...</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-bitcoin-orange">
                  {opnetBTC || '0.00'} BTC
                </p>
              )}
              {lastUpdate && (
                <p className="text-xs text-white/40 mt-1">
                  Updated: {formatTime(lastUpdate)}
                </p>
              )}
            </div>
            
            {/* Address */}
            <div className="mb-4">
              <p className="text-sm text-white/60 mb-2">Address</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-black/30 px-3 py-2 rounded font-mono text-white/80 overflow-x-auto">
                  {OPNET_HOT_WALLET}
                </code>
                <button
                  onClick={() => copyToClipboard(OPNET_HOT_WALLET, 'opnet')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors"
                >
                  {copiedOPNet ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
            
            {/* Explorer Link */}
            <a
              href={`https://opscan.org/address/${OPNET_HOT_WALLET}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 bg-bitcoin-orange/20 hover:bg-bitcoin-orange/30 rounded-lg text-bitcoin-orange transition-colors"
            >
              View on OPScan →
            </a>
          </motion.div>
          
          {/* Base Hot Wallet */}
          <motion.div
            className="glass glass-hover p-8 rounded-2xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-base-blue to-base-blue/50 flex items-center justify-center">
                <span className="text-2xl">💎</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Base Hot Wallet</h3>
                <p className="text-sm text-white/60">Sends USDT/USDC payments</p>
              </div>
            </div>
            
            {/* Live Balances */}
            <div className="mb-6 p-4 bg-white/5 rounded-xl space-y-3">
              <div>
                <p className="text-sm text-white/60 mb-1">USDT Balance</p>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-base-blue border-t-transparent rounded-full animate-spin" />
                    <span className="text-white/40">Loading...</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-green-400">
                    ${baseUSDT || '0.00'}
                  </p>
                )}
              </div>
              
              <div>
                <p className="text-sm text-white/60 mb-1">USDC Balance</p>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-base-blue border-t-transparent rounded-full animate-spin" />
                    <span className="text-white/40">Loading...</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-blue-400">
                    ${baseUSDC || '0.00'}
                  </p>
                )}
              </div>
              
              {lastUpdate && (
                <p className="text-xs text-white/40 pt-2 border-t border-white/10">
                  Updated: {formatTime(lastUpdate)}
                </p>
              )}
            </div>
            
            {/* Address */}
            <div className="mb-4">
              <p className="text-sm text-white/60 mb-2">Address</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-black/30 px-3 py-2 rounded font-mono text-white/80 overflow-x-auto">
                  {BASE_HOT_WALLET}
                </code>
                <button
                  onClick={() => copyToClipboard(BASE_HOT_WALLET, 'base')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors"
                >
                  {copiedBase ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
            
            {/* Explorer Link */}
            <a
              href={`https://basescan.org/address/${BASE_HOT_WALLET}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 bg-base-blue/20 hover:bg-base-blue/30 rounded-lg text-base-blue transition-colors"
            >
              View on BaseScan →
            </a>
          </motion.div>
        </div>
        
        {/* Refresh Button */}
        <div className="text-center mt-8">
          <button
            onClick={refresh}
            disabled={isLoading}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded-lg transition-colors"
          >
            {isLoading ? 'Refreshing...' : '🔄 Refresh Balances'}
          </button>
        </div>
        
        {/* Fee Info */}
        <motion.div
          className="mt-16 glass p-8 rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Platform Fee: 7%</h3>
          <p className="text-white/60 max-w-2xl mx-auto">
            Sellers receive 93% of the fair market value. The 7% platform fee covers gas costs and liquidity provision on both networks.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
