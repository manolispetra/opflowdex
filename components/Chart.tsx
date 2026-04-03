/**
 * CHART SECTION
 * 
 * Simple live chart showing aggregated trades + MotoSwap price overlay
 * Lightweight implementation without heavy chart libraries
 */

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TradeData {
  time: string;
  price: number;
  amount: number;
  type: 'buy' | 'sell';
}

export function Chart() {
  const [trades, setTrades] = useState<TradeData[]>([]);
  const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D'>('24H');
  
  // Mock trade data - in production, fetch from backend
  useEffect(() => {
    const mockTrades: TradeData[] = [
      { time: '14:30', price: 0.000045, amount: 1000, type: 'buy' },
      { time: '14:25', price: 0.000043, amount: 2500, type: 'sell' },
      { time: '14:20', price: 0.000044, amount: 1500, type: 'buy' },
      { time: '14:15', price: 0.000042, amount: 3000, type: 'sell' },
      { time: '14:10', price: 0.000046, amount: 800, type: 'buy' },
    ];
    setTrades(mockTrades);
  }, [timeframe]);
  
  const maxPrice = Math.max(...trades.map(t => t.price));
  const minPrice = Math.min(...trades.map(t => t.price));
  const priceRange = maxPrice - minPrice;
  
  return (
    <section id="chart" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Live Trading Activity
          </h2>
          <p className="text-xl text-white/60">
            Real-time trades synced with MotoSwap prices
          </p>
        </motion.div>
        
        {/* Chart Container */}
        <motion.div
          className="glass-hover rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Timeframe Selector */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              {(['1H', '24H', '7D'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    timeframe === tf
                      ? 'bg-bitcoin-orange text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <span className="text-white/60">Buy</span>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <span className="text-white/60">Sell</span>
              </div>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="relative h-64 flex items-end justify-between gap-2">
            {trades.map((trade, index) => {
              const heightPercent = ((trade.price - minPrice) / priceRange) * 100;
              return (
                <motion.div
                  key={index}
                  className="flex-1 relative group"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className={`w-full rounded-t-lg transition-all cursor-pointer ${
                      trade.type === 'buy'
                        ? 'bg-green-400/30 hover:bg-green-400/50'
                        : 'bg-red-400/30 hover:bg-red-400/50'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <div className="text-xs text-white/60">{trade.time}</div>
                    <div className="text-sm font-bold text-white">${trade.price.toFixed(6)}</div>
                    <div className="text-xs text-white/80">{trade.amount.toLocaleString()} tokens</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-4 text-xs text-white/40">
            {trades.map((trade, index) => (
              <div key={index} className="flex-1 text-center">
                {trade.time}
              </div>
            ))}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
            <div>
              <div className="text-sm text-white/60 mb-1">24h Volume</div>
              <div className="text-2xl font-bold text-white">$12,450</div>
              <div className="text-sm text-green-400">+24.5%</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">24h High</div>
              <div className="text-2xl font-bold text-white">${maxPrice.toFixed(6)}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">24h Low</div>
              <div className="text-2xl font-bold text-white">${minPrice.toFixed(6)}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
