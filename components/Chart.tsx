/**
 * LIVE PRICE CHART
 * Real-time price chart with live updates from price oracle
 */

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { OP20_TOKENS } from '@/lib/constants';
import { usePriceOracle } from '@/lib/usePriceOracle';

export function Chart() {
  const [selectedToken, setSelectedToken] = useState(OP20_TOKENS[0]);
  const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D'>('24H');
  const [priceHistory, setPriceHistory] = useState<Array<{ time: number; price: number; priceBTC: number }>>([]);
  
  const { price, priceInBTC, isLoading, lastUpdate } = usePriceOracle(selectedToken);

  // Update price history when new price arrives
  useEffect(() => {
    if (price && priceInBTC && lastUpdate) {
      setPriceHistory(prev => {
        const newEntry = { time: lastUpdate, price, priceBTC: priceInBTC };
        const updated = [...prev, newEntry];
        
        // Keep last 100 data points
        if (updated.length > 100) {
          updated.shift();
        }
        
        return updated;
      });
    }
  }, [price, priceInBTC, lastUpdate]);

  // Generate chart path from price history
  const generateChartPath = () => {
    if (priceHistory.length < 2) {
      // Not enough data, show flat line
      return 'M 0 100 L 300 100';
    }

    const width = 300;
    const height = 100;
    const padding = 10;

    // Get price range
    const prices = priceHistory.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1; // Avoid division by zero

    // Generate SVG path
    let path = '';
    priceHistory.forEach((point, index) => {
      const x = (index / (priceHistory.length - 1)) * width;
      const y = height - padding - ((point.price - minPrice) / priceRange) * (height - 2 * padding);
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });

    return path;
  };

  const formatPrice = (value: number | null) => {
    if (!value) return '$0.00';
    if (value < 0.01) return `$${value.toFixed(6)}`;
    return `$${value.toFixed(2)}`;
  };

  const formatBTCPrice = (value: number | null) => {
    if (!value) return '0 BTC';
    return `${value.toFixed(8)} BTC`;
  };

  const getPriceChange = () => {
    if (priceHistory.length < 2) return { percent: 0, isPositive: true };
    
    const oldPrice = priceHistory[0].price;
    const currentPrice = priceHistory[priceHistory.length - 1].price;
    const change = ((currentPrice - oldPrice) / oldPrice) * 100;
    
    return { percent: Math.abs(change), isPositive: change >= 0 };
  };

  const priceChange = getPriceChange();

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-2xl"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Live Price Chart</h3>
              <p className="text-white/60">Real-time price updates from MotoSwap</p>
            </div>
            
            {/* Token Selector */}
            <div className="mt-4 md:mt-0">
              <select
                value={selectedToken.symbol}
                onChange={(e) => {
                  const token = OP20_TOKENS.find(t => t.symbol === e.target.value);
                  if (token) {
                    setSelectedToken(token);
                    setPriceHistory([]); // Reset history when changing tokens
                  }
                }}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-bitcoin-orange"
              >
                {OP20_TOKENS.map(token => (
                  <option key={token.symbol} value={token.symbol} className="bg-dark-bg">
                    {token.symbol} - {token.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-xl p-6">
              <p className="text-sm text-white/60 mb-2">Current Price (USD)</p>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-bitcoin-orange border-t-transparent rounded-full animate-spin" />
                  <span className="text-white/40">Loading...</span>
                </div>
              ) : (
                <p className="text-3xl font-bold text-white">{formatPrice(price)}</p>
              )}
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <p className="text-sm text-white/60 mb-2">Price in BTC</p>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-bitcoin-orange border-t-transparent rounded-full animate-spin" />
                  <span className="text-white/40">Loading...</span>
                </div>
              ) : (
                <p className="text-3xl font-bold text-bitcoin-orange">{formatBTCPrice(priceInBTC)}</p>
              )}
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <p className="text-sm text-white/60 mb-2">24h Change</p>
              <p className={`text-3xl font-bold ${priceChange.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {priceChange.isPositive ? '+' : '-'}{priceChange.percent.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-black/30 rounded-xl p-6 mb-6">
            <svg
              width="100%"
              height="200"
              viewBox="0 0 300 120"
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={priceChange.isPositive ? '#10B981' : '#EF4444'} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={priceChange.isPositive ? '#10B981' : '#EF4444'} stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Chart area fill */}
              <path
                d={`${generateChartPath()} L 300 120 L 0 120 Z`}
                fill="url(#chartGradient)"
              />

              {/* Chart line */}
              <motion.path
                d={generateChartPath()}
                stroke={priceChange.isPositive ? '#10B981' : '#EF4444'}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />

              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map(y => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="300"
                  y2={y}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                />
              ))}
            </svg>
          </div>

          {/* Timeframe Selector */}
          <div className="flex gap-2 justify-center">
            {(['1H', '24H', '7D'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  timeframe === tf
                    ? 'bg-bitcoin-orange text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Live Indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{
                opacity: [1, 0.5, 1],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-sm text-white/60">
              Live • Updates every 15s
            </span>
          </div>

          {lastUpdate && (
            <p className="text-center text-xs text-white/40 mt-2">
              Last update: {new Date(lastUpdate).toLocaleTimeString()}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
