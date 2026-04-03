/**
 * SWAP CARD - MAIN TRADING INTERFACE
 * 
 * Uniswap-style interface with:
 * - Left panel: "You Sell" (OP-20 token selector + amount input + balance)
 * - Right panel: "You Receive" (USDT/USDC selector + calculated amount + fee)
 * - Big glowing SWAP button in center
 * - Real-time price calculations with 7% fee breakdown
 * - Price impact warnings
 * - Animated progress after swap
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OP20_TOKENS, BASE_TOKENS, FEE_PERCENTAGE, calculateSellerReceives, calculateFee, OPNET_HOT_WALLET, BASE_HOT_WALLET, getOPNetExplorerUrl, getBaseExplorerUrl } from '@/lib/constants';
import { usePriceOracle } from '@/lib/usePriceOracle';
import { useWalletStore } from '@/lib/walletStore';

type SwapDirection = 'sell' | 'buy';

export function SwapCard() {
  const { opnetConnected, baseConnected } = useWalletStore();
  
  const [direction, setDirection] = useState<SwapDirection>('sell');
  const [selectedOP20, setSelectedOP20] = useState(OP20_TOKENS[0]);
  const [selectedBase, setSelectedBase] = useState(BASE_TOKENS[0]);
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [showTokenSelector, setShowTokenSelector] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapProgress, setSwapProgress] = useState(0);
  const [txHash, setTxHash] = useState<string | null>(null);
  
  // Get real-time price from oracle
  const { price, isLoading: priceLoading, error: priceError, priceSource } = usePriceOracle(selectedOP20);
  
  // Calculate output amount based on input
  useEffect(() => {
    if (!inputAmount || !price) {
      setOutputAmount('');
      return;
    }
    
    const input = parseFloat(inputAmount);
    if (isNaN(input) || input <= 0) {
      setOutputAmount('');
      return;
    }
    
    if (direction === 'sell') {
      // Selling OP-20 for USDT/USDC
      const totalValue = input * price;
      const amountAfterFee = calculateSellerReceives(totalValue);
      setOutputAmount(amountAfterFee.toFixed(2));
    } else {
      // Buying OP-20 with USDT/USDC
      const tokensReceived = input / price;
      const tokensAfterFee = calculateSellerReceives(tokensReceived);
      setOutputAmount(tokensAfterFee.toFixed(6));
    }
  }, [inputAmount, price, direction]);
  
  const handleSwap = async () => {
    if (!inputAmount || !outputAmount) {
      alert('Please enter an amount');
      return;
    }
    
    if (direction === 'sell' && !opnetConnected) {
      alert('Please connect your OP_NET wallet');
      return;
    }
    
    if (direction === 'buy' && !baseConnected) {
      alert('Please connect your Base wallet');
      return;
    }
    
    setIsSwapping(true);
    setSwapProgress(0);
    
    try {
      if (direction === 'sell') {
        // SELLING OP-20 → USDT/USDC
        // Create native transfer request to OP_NET hot wallet
        
        // Mock wallet interaction - in production use actual OP_WALLET API
        console.log('Initiating OP-20 transfer:', {
          token: selectedOP20.symbol,
          amount: inputAmount,
          to: OPNET_HOT_WALLET,
          contractId: selectedOP20.contractId
        });
        
        // Simulate progress
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setSwapProgress(i);
        }
        
        // Mock transaction hash
        const mockTxHash = '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
        setTxHash(mockTxHash);
        
        alert(`Success! Your ${selectedOP20.symbol} has been sent. You will receive ${outputAmount} ${selectedBase.symbol} shortly.`);
      } else {
        // BUYING OP-20 with USDT/USDC
        // Create ERC-20 transfer to Base hot wallet
        
        console.log('Initiating USDT/USDC transfer:', {
          token: selectedBase.symbol,
          amount: inputAmount,
          to: BASE_HOT_WALLET,
          address: selectedBase.address
        });
        
        // Simulate progress
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setSwapProgress(i);
        }
        
        const mockTxHash = '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
        setTxHash(mockTxHash);
        
        alert(`Success! Your ${selectedBase.symbol} has been sent. You will receive ${outputAmount} ${selectedOP20.symbol} shortly.`);
      }
    } catch (error) {
      console.error('Swap failed:', error);
      alert('Swap failed. Please try again.');
    } finally {
      setIsSwapping(false);
      setSwapProgress(0);
      setInputAmount('');
      setOutputAmount('');
    }
  };
  
  const feeAmount = inputAmount && price 
    ? calculateFee(parseFloat(inputAmount) * (direction === 'sell' ? price : 1))
    : 0;
  
  const priceImpact = 0.1; // Mock price impact - calculate from liquidity in production
  
  return (
    <motion.div
      className="glass rounded-3xl p-8 max-w-2xl w-full relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-orange/10 to-base-blue/10 rounded-3xl blur-xl -z-10" />
      
      <div className="space-y-6">
        {/* Direction Toggle */}
        <div className="flex gap-2 glass p-1 rounded-xl">
          <button
            onClick={() => setDirection('sell')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
              direction === 'sell'
                ? 'bg-bitcoin-orange text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Sell OP-20
          </button>
          <button
            onClick={() => setDirection('buy')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
              direction === 'buy'
                ? 'bg-base-blue text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Buy OP-20
          </button>
        </div>
        
        {/* You Sell Panel */}
        <div className="glass p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm font-medium">
              {direction === 'sell' ? 'You Sell' : 'You Pay'}
            </span>
            <span className="text-white/40 text-xs">Balance: 1,000.00</span>
          </div>
          
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent text-3xl font-bold text-white outline-none"
              step="any"
            />
            
            <button
              onClick={() => setShowTokenSelector(true)}
              className="flex items-center gap-2 glass-hover px-4 py-2 rounded-xl"
            >
              <span className="font-bold text-white">
                {direction === 'sell' ? selectedOP20.symbol : selectedBase.symbol}
              </span>
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {price && !priceLoading && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">
                1 {selectedOP20.symbol} = ${price.toFixed(6)}
              </span>
              <span className="text-white/40 text-xs">
                via {priceSource === 'direct-btc' ? 'Direct BTC' : 'MOTO'}
              </span>
            </div>
          )}
        </div>
        
        {/* Swap Arrow */}
        <div className="flex justify-center -my-3 relative z-10">
          <motion.div
            className="glass-hover p-3 rounded-full border-2 border-white/10 cursor-pointer"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </motion.div>
        </div>
        
        {/* You Receive Panel */}
        <div className="glass p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm font-medium">You Receive</span>
            <span className="text-green-400 text-xs font-medium">After 7% fee</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 text-3xl font-bold text-white">
              {outputAmount || '0.00'}
            </div>
            
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl">
              <span className="font-bold text-white">
                {direction === 'sell' ? selectedBase.symbol : selectedOP20.symbol}
              </span>
            </div>
          </div>
          
          {feeAmount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Platform fee ({FEE_PERCENTAGE}%)</span>
              <span className="text-bitcoin-orange font-medium">
                ${feeAmount.toFixed(2)}
              </span>
            </div>
          )}
        </div>
        
        {/* Fee Breakdown */}
        {inputAmount && outputAmount && (
          <motion.div
            className="glass p-4 rounded-xl space-y-2 text-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-white/60">Price Impact</span>
              <span className={priceImpact < 1 ? 'text-green-400' : 'text-yellow-400'}>
                {priceImpact.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Estimated Time</span>
              <span className="text-white">~2-5 minutes</span>
            </div>
            <div className="flex items-center justify-between font-medium">
              <span className="text-white">You Receive (after fee)</span>
              <span className="text-white">{outputAmount} {direction === 'sell' ? selectedBase.symbol : selectedOP20.symbol}</span>
            </div>
          </motion.div>
        )}
        
        {/* Big SWAP Button */}
        <motion.button
          onClick={handleSwap}
          disabled={!inputAmount || !outputAmount || isSwapping || priceLoading}
          className={`
            w-full py-6 rounded-2xl font-bold text-xl
            relative overflow-hidden
            disabled:opacity-50 disabled:cursor-not-allowed
            ${direction === 'sell' 
              ? 'bg-gradient-to-r from-bitcoin-orange to-bitcoin-orange/80' 
              : 'bg-gradient-to-r from-base-blue to-base-blue/80'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative z-10">
            {isSwapping ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing... {swapProgress}%</span>
              </div>
            ) : (
              'SWAP'
            )}
          </div>
          
          {/* Animated glow */}
          <motion.div
            className="absolute inset-0 opacity-0"
            whileHover={{ opacity: 0.3 }}
            style={{
              background: 'radial-gradient(circle at center, white 0%, transparent 70%)'
            }}
          />
        </motion.button>
        
        {/* Progress Bar */}
        <AnimatePresence>
          {isSwapping && (
            <motion.div
              className="h-1 bg-white/10 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={`h-full ${direction === 'sell' ? 'bg-bitcoin-orange' : 'bg-base-blue'}`}
                initial={{ width: 0 }}
                animate={{ width: `${swapProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Token Selector Modal */}
      <AnimatePresence>
        {showTokenSelector && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTokenSelector(false)}
          >
            <motion.div
              className="glass rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Select Token</h3>
              <div className="space-y-2">
                {(direction === 'sell' ? OP20_TOKENS : BASE_TOKENS).map((token: any) => (
                  <button
                    key={token.symbol}
                    onClick={() => {
                      if (direction === 'sell') {
                        setSelectedOP20(token);
                      } else {
                        setSelectedBase(token);
                      }
                      setShowTokenSelector(false);
                    }}
                    className="w-full glass-hover p-4 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-bitcoin-orange to-base-blue rounded-full" />
                      <div className="text-left">
                        <div className="font-bold text-white">{token.symbol}</div>
                        <div className="text-sm text-white/60">{token.name}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
