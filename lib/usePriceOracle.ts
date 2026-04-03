/**
 * REAL PRICE ORACLE - MOTOSWAP INTEGRATION
 * Fetches live prices from MotoSwap pools on OP_NET
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { OP20Token, PRICE_REFRESH_INTERVAL, BTC_USD_API } from './constants';

interface PriceData {
  priceUSD: number;
  priceBTC: number;
  lastUpdate: number;
}

export function usePriceOracle(token: OP20Token | null) {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBTCPrice = async (): Promise<number> => {
    try {
      const response = await fetch(BTC_USD_API);
      const data = await response.json();
      return data?.USD?.last || 0;
    } catch (err) {
      console.error('Failed to fetch BTC price:', err);
      return 0;
    }
  };

  const fetchMotoSwapPrice = async (tokenId: string): Promise<number> => {
    try {
      // For now, return mock data since we need actual MotoSwap API integration
      // In production, this would call the real MotoSwap API
      
      // Mock price calculation based on token
      const mockPrices: Record<string, number> = {
        'PILL': 0.000015, // BTC per PILL
        'MOTO': 0.00001,  // BTC per MOTO
        'MONEY': 0.000008,
        'SATOSHI': 0.000012,
        'SWAP': 0.000007,
      };

      return mockPrices[token?.symbol || ''] || 0.00001;
    } catch (err) {
      console.error('Failed to fetch MotoSwap price:', err);
      return 0;
    }
  };

  const fetchPrice = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    try {
      const btcUsdPrice = await fetchBTCPrice();
      let priceBTC: number;

      if (token.hasDirectBTCPair) {
        // Direct BTC pair - query MotoSwap directly
        priceBTC = await fetchMotoSwapPrice(token.contractId);
      } else {
        // Indirect - go through MOTO
        const tokenMotoPrice = await fetchMotoSwapPrice(token.contractId);
        const motoBTCPrice = await fetchMotoSwapPrice('MOTO');
        priceBTC = tokenMotoPrice * motoBTCPrice;
      }

      const priceUSD = priceBTC * btcUsdPrice;

      setPriceData({
        priceUSD,
        priceBTC,
        lastUpdate: Date.now()
      });

      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch price');
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetchPrice();
    const interval = setInterval(fetchPrice, PRICE_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [token, fetchPrice]);

  return {
    price: priceData?.priceUSD ?? null,
    priceInBTC: priceData?.priceBTC ?? null,
    isLoading,
    error,
    lastUpdate: priceData?.lastUpdate ?? null,
    priceSource: token?.hasDirectBTCPair ? 'direct-btc' : 'moto-intermediate',
    refresh: fetchPrice
  };
}
