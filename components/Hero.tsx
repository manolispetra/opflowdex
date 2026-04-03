/**
 * HERO SECTION
 * 
 * Features:
 * - Live price ticker from MotoSwap
 * - Slangy modern headlines
 * - Centered swap card
 * - Animated entrance
 */

'use client';

import { motion } from 'framer-motion';
import { SwapCard } from './SwapCard';
import { usePriceOracle } from '@/lib/usePriceOracle';
import { OP20_TOKENS } from '@/lib/constants';
import { useEffect, useState } from 'react';

export function Hero() {
  const { price, isLoading } = usePriceOracle(OP20_TOKENS[0]); // PILL as default ticker
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number>(0);
  
  useEffect(() => {
    if (price) {
      if (currentPrice) {
        setPriceChange(((price - currentPrice) / currentPrice) * 100);
      }
      setCurrentPrice(price);
    }
  }, [price]);
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Live Price Ticker */}
      <motion.div
        className="mb-8 glass px-6 py-3 rounded-full flex items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white/60 text-sm">LIVE</span>
        </div>
        <div className="h-4 w-px bg-white/20" />
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">
            {isLoading ? '...' : `$${price?.toFixed(6) || '0.00'}`}
          </span>
          {!isLoading && priceChange !== 0 && (
            <span className={`text-xs font-medium ${priceChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          )}
        </div>
        <div className="h-4 w-px bg-white/20" />
        <span className="text-white/40 text-sm">via MotoSwap</span>
      </motion.div>
      
      {/* Hero Headlines */}
      <motion.div
        className="text-center mb-12 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">
            OP-20 Drops Hard.
          </span>
          <br />
          <span className="text-white">
            USDT Hits Your Wallet.
          </span>
          <br />
          <span className="text-white/80 text-4xl md:text-5xl">
            Native Flow, No Cap.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/70 font-medium max-w-2xl mx-auto">
          Stack Your Tokens → Cash Out in Base. One Transfer, Real Shit.
        </p>
      </motion.div>
      
      {/* Swap Card */}
      <SwapCard />
      
      {/* Trust Bar */}
      <motion.div
        className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-bitcoin-orange" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Native AF</span>
        </div>
        
        <div className="hidden sm:block w-px h-4 bg-white/20" />
        
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-base-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="font-medium">Transfer Only</span>
        </div>
        
        <div className="hidden sm:block w-px h-4 bg-white/20" />
        
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <span className="font-medium">7% and You're Paid</span>
        </div>
        
        <div className="hidden sm:block w-px h-4 bg-white/20" />
        
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-bitcoin-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="font-medium">Straight from Bitcoin L1</span>
        </div>
      </motion.div>
    </section>
  );
}
