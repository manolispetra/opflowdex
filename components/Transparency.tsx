/**
 * TRANSPARENCY SECTION
 * 
 * Shows the two hot wallet addresses with copy buttons
 * Live balance placeholders
 * Complete transparency in operations
 */

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { OPNET_HOT_WALLET, BASE_HOT_WALLET, getOPNetAddressUrl, getBaseAddressUrl } from '@/lib/constants';

export function Transparency() {
  const [copiedOPNet, setCopiedOPNet] = useState(false);
  const [copiedBase, setCopiedBase] = useState(false);
  
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
  
  return (
    <section id="transparency" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Full Transparency
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Our hot wallets are public. Track every transaction. Verify every transfer. No secrets.
          </p>
        </motion.div>
        
        {/* Hot Wallets Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* OP_NET Hot Wallet */}
          <motion.div
            className="glass-hover p-8 rounded-2xl space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-bitcoin-orange/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-bitcoin-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">OP_NET Hot Wallet</h3>
                <p className="text-sm text-white/60">Receives all OP-20 tokens</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Address</span>
                <a
                  href={getOPNetAddressUrl(OPNET_HOT_WALLET)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bitcoin-orange hover:underline"
                >
                  View on OPScan
                </a>
              </div>
              
              <div className="glass p-4 rounded-xl font-mono text-sm break-all text-white/90 relative group">
                {OPNET_HOT_WALLET}
                <button
                  onClick={() => copyToClipboard(OPNET_HOT_WALLET, 'opnet')}
                  className="absolute top-2 right-2 glass-hover p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedOPNet ? (
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-white/60">Live Balance</span>
                <span className="text-white font-bold">Loading...</span>
              </div>
            </div>
          </motion.div>
          
          {/* Base Hot Wallet */}
          <motion.div
            className="glass-hover p-8 rounded-2xl space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-base-blue/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-base-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Base Hot Wallet</h3>
                <p className="text-sm text-white/60">Receives all USDT/USDC</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Address</span>
                <a
                  href={getBaseAddressUrl(BASE_HOT_WALLET)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base-blue hover:underline"
                >
                  View on Basescan
                </a>
              </div>
              
              <div className="glass p-4 rounded-xl font-mono text-sm break-all text-white/90 relative group">
                {BASE_HOT_WALLET}
                <button
                  onClick={() => copyToClipboard(BASE_HOT_WALLET, 'base')}
                  className="absolute top-2 right-2 glass-hover p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedBase ? (
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
              
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">USDT Balance</span>
                  <span className="text-white font-bold">Loading...</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">USDC Balance</span>
                  <span className="text-white font-bold">Loading...</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Trust Message */}
        <motion.div
          className="mt-12 text-center glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lg text-white/80 leading-relaxed">
            <span className="text-bitcoin-orange font-bold">Every transaction is on-chain.</span> You can verify our hot wallet balances anytime. 
            We don't hold funds longer than necessary. The opposite-side transfer happens automatically within 2-5 minutes after confirmation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
