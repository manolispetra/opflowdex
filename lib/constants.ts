/**
 * OPFLOW CONSTANTS - PRODUCTION
 */

export const OPNET_HOT_WALLET = 'bc1pvuy6k4zxuaywa8f7knz7289acla5hlc5ae39p07zhvqesep45ngqdxavun';
export const BASE_HOT_WALLET = '0xc07838c496118c8730317E8CBDbAfd37D91f59A1';
export const FEE_PERCENTAGE = 7;

export const calculateSellerReceives = (amount: number): number => {
  return amount * (1 - FEE_PERCENTAGE / 100);
};

export const calculateFee = (amount: number): number => {
  return amount * (FEE_PERCENTAGE / 100);
};

// API Endpoints
export const OPSCAN_API = 'https://api.opscan.org';
export const BASE_RPC = 'https://mainnet.base.org';
export const BTC_USD_API = 'https://blockchain.info/ticker';

// OP-20 Tokens
export interface OP20Token {
  symbol: string;
  name: string;
  contractId: string;
  decimals: number;
  description?: string;
  hasDirectBTCPair: boolean;
}

export const OP20_TOKENS: OP20Token[] = [
  {
    symbol: 'PILL',
    name: 'Orange Pill',
    contractId: '0xfb7df2f08d8042d4df0506c0d4cee3cfa5f2d7b02ef01ec76dd699551393a438',
    decimals: 18,
    description: 'The original Orange Pill on OP_NET',
    hasDirectBTCPair: true
  },
  {
    symbol: 'MOTO',
    name: 'MOTO',
    contractId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    decimals: 18,
    description: 'MotoSwap native token',
    hasDirectBTCPair: true
  },
  {
    symbol: 'MONEY',
    name: 'MONEY',
    contractId: '0xd0e5def804a309471393c36cbfdc02f65dc977c51264fcef05fa495585d9d311',
    decimals: 18,
    hasDirectBTCPair: false
  },
  {
    symbol: 'SATOSHI',
    name: 'SAT',
    contractId: '0xb2d6af9d8e923ad794edaaf04bf0d3a4ac11b4302e009801f75ea7cd86de7035',
    decimals: 8,
    hasDirectBTCPair: false
  },
  {
    symbol: 'SWAP',
    name: 'SWAP',
    contractId: '0xb4be035ad7e09d72b57ba5e1a28b70ec281991dab106833bd1a9e7642bb1f599',
    decimals: 18,
    hasDirectBTCPair: false
  },
];

// Base Stablecoins
export interface BaseToken {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
}

export const BASE_TOKENS: BaseToken[] = [
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
    decimals: 6
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    decimals: 6
  }
];

export const PRICE_REFRESH_INTERVAL = 15000;
export const MAX_RETRIES = 3;
export const RETRY_DELAY = 2000;

// Explorer URLs
export const getOPNetExplorerUrl = (txHash: string): string => {
  return `https://opscan.org/tx/${txHash}`;
};

export const getBaseExplorerUrl = (txHash: string): string => {
  return `https://basescan.org/tx/${txHash}`;
};

export const getOPNetAddressUrl = (address: string): string => {
  return `https://opscan.org/address/${address}`;
};

export const getBaseAddressUrl = (address: string): string => {
  return `https://basescan.org/address/${address}`;
};
