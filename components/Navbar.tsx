/**
 * STICKY GLASSMORPHIC NAVBAR
 * 
 * Features:
 * - Animated logo with flowing wave
 * - Navigation links
 * - Two wallet connection buttons (OP_NET + Base)
 * - Connected addresses and balances
 * - Smooth animations and hover effects
 */

'use client';

import { motion } from 'framer-motion';
import { OpflowLogo } from './OpflowLogo';
import { useWalletStore } from '@/lib/walletStore';
import { useState } from 'react';

export function Navbar() {
  const {
    opnetAddress,
    opnetBalance,
    opnetConnected,
    baseAddress,
    baseBalance,
    baseConnected,
    connectOPNet,
    disconnectOPNet,
    connectBase,
    disconnectBase
  } = useWalletStore();
  
  const [isConnectingOPNet, setIsConnectingOPNet] = useState(false);
  const [isConnectingBase, setIsConnectingBase] = useState(false);
  
  const handleOPNetConnect = async () => {
    setIsConnectingOPNet(true);
    try {
      await connectOPNet();
    } catch (error) {
      console.error('Failed to connect OP_NET wallet:', error);
      alert('Failed to connect OP_NET wallet. Please install OP_WALLET extension.');
    } finally {
      setIsConnectingOPNet(false);
    }
  };
  
  const handleBaseConnect = async () => {
    setIsConnectingBase(true);
    try {
      await connectBase();
    } catch (error) {
      console.error('Failed to connect Base wallet:', error);
      alert('Failed to connect Base wallet. Please install MetaMask, Rabby, or Coinbase Wallet.');
    } finally {
      setIsConnectingBase(false);
    }
  };
  
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  return (
    <motion.nav
      className="sticky top-0 z-50 glass border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center group cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <OpflowLogo size={40} />
          </motion.div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {['Swap', 'How it Works', 'Chart', 'Transparency'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          {/* Wallet Buttons */}
          <div className="flex items-center gap-3">
            {/* OP_NET Wallet */}
            <motion.button
              onClick={opnetConnected ? disconnectOPNet : handleOPNetConnect}
              disabled={isConnectingOPNet}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-300
                ${opnetConnected
                  ? 'glass-hover border border-bitcoin-orange/30 text-white'
                  : 'bg-bitcoin-orange hover:bg-bitcoin-orange/90 text-white'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {isConnectingOPNet ? (
                'Connecting...'
              ) : opnetConnected ? (
                <div className="flex flex-col items-start">
                  <span className="text-xs text-white/60">OP_NET</span>
                  <span className="font-mono">{formatAddress(opnetAddress!)}</span>
                  {opnetBalance && (
                    <span className="text-xs text-bitcoin-orange">{opnetBalance}</span>
                  )}
                </div>
              ) : (
                'OP_WALLET'
              )}
            </motion.button>
            
            {/* Base Wallet */}
            <motion.button
              onClick={baseConnected ? disconnectBase : handleBaseConnect}
              disabled={isConnectingBase}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-300
                ${baseConnected
                  ? 'glass-hover border border-base-blue/30 text-white'
                  : 'bg-base-blue hover:bg-base-blue/90 text-white'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              {isConnectingBase ? (
                'Connecting...'
              ) : baseConnected ? (
                <div className="flex flex-col items-start">
                  <span className="text-xs text-white/60">Base</span>
                  <span className="font-mono">{formatAddress(baseAddress!)}</span>
                  {baseBalance && (
                    <span className="text-xs text-base-blue">{baseBalance} USDC</span>
                  )}
                </div>
              ) : (
                'Base Wallet'
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
