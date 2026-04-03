/**
 * OPFLOW CORE CONSTANTS
 * These are the hardcoded production values for the Opflow OTC marketplace
 */

// ====================================================================
// HOT WALLETS - THESE ARE THE MAIN RECEIVING ADDRESSES
// ====================================================================

/**
 * OP_NET HOT WALLET
 * This address receives all OP-20 tokens from sellers
 * CRITICAL: This is a native OP_NET address (bc1p...)
 */
export const OPNET_HOT_WALLET = 'bc1pvuy6k4zxuaywa8f7knz7289acla5hlc5ae39p07zhvqesep45ngqdxavun';

/**
 * BASE HOT WALLET
 * This address receives all USDT/USDC payments from buyers
 * CRITICAL: This is an EVM address on Base network (0x...)
 */
export const BASE_HOT_WALLET = '0xc07838c496118c8730317E8CBDbAfd37D91f59A1';

// ====================================================================
// FEE STRUCTURE
// ====================================================================

/**
 * Platform fee percentage
 * Seller receives (100 - FEE_PERCENTAGE)% of the fair market price
 * Example: If FEE = 7%, seller gets 93% of current price
 */
export const FEE_PERCENTAGE = 7;

/**
 * Calculate amount seller receives after fee
 * @param amount Original amount in USDT/USDC
 * @returns Amount seller receives (93% of original)
 */
export const calculateSellerReceives = (amount: number): number => {
  return amount * (1 - FEE_PERCENTAGE / 100);
};

/**
 * Calculate fee amount
 * @param amount Original amount in USDT/USDC
 * @returns Fee amount (7% of original)
 */
export const calculateFee = (amount: number): number => {
  return amount * (FEE_PERCENTAGE / 100);
};

// ====================================================================
// RPC ENDPOINTS
// ====================================================================

/**
 * OP_NET mainnet RPC endpoint
 * Used for all OP-20 token operations and price queries
 */
export const OPNET_RPC = 'https://mainnet.opnet.org';

/**
 * Base mainnet RPC endpoint
 * Used for USDT/USDC transfers and balance queries
 */
export const BASE_RPC = 'https://mainnet.base.org';

// ====================================================================
// OP-20 TOKEN DEFINITIONS
// ====================================================================

export interface OP20Token {
  symbol: string;
  name: string;
  contractId: string;
  decimals: number;
  logo?: string;
  description?: string;
}

/**
 * Complete list of supported OP-20 tokens
 * All contract IDs are from OPScan mainnet: https://opscan.org/tokens?network=mainnet
 * 
 * TO ADD NEW TOKENS:
 * 1. Go to https://opscan.org/tokens?network=mainnet
 * 2. Find the token you want to add
 * 3. Copy the exact contract ID (transaction hash)
 * 4. Add to this array with symbol, name, contractId, and decimals
 */
export const OP20_TOKENS: OP20Token[] = [
  {
    symbol: 'PILL',
    name: 'Orange Pill',
    contractId: '0xfb7df2f08d8042d4df0506c0d4cee3cfa5f2d7b02ef01ec76dd699551393a438',
    decimals: 18,
    description: 'The original Orange Pill on OP_NET'
  },
  {
    symbol: 'MONEY',
    name: 'MONEY',
    contractId: '0xd0e5def804a309471393c36cbfdc02f65dc977c51264fcef05fa495585d9d311',
    decimals: 18,
    description: 'MONEY token on OP_NET'
  },
  {
    symbol: 'SATOSHI',
    name: 'SAT',
    contractId: '0xb2d6af9d8e923ad794edaaf04bf0d3a4ac11b4302e009801f75ea7cd86de7035',
    decimals: 8,
    description: 'SATOSHI on OP_NET'
  },
  {
    symbol: 'SWAP',
    name: 'SWAP',
    contractId: '0xb4be035ad7e09d72b57ba5e1a28b70ec281991dab106833bd1a9e7642bb1f599',
    decimals: 18,
    description: 'SWAP token'
  },
  {
    symbol: 'OPBET',
    name: 'OPBET',
    contractId: '0x455df9403d9d1e68c0a6d9aefbb3fa02e667bc452b515f0926a5a03fc00fad77',
    decimals: 18,
    description: 'OPBET gaming token'
  },
  {
    symbol: 'OPTARD',
    name: 'OPTARD',
    contractId: '0x8b62e826627a46c17c293d8edd9caf9ff8b6acbf0107cf6425e46bec4c3d572a',
    decimals: 18,
    description: 'OPTARD meme token'
  },
  {
    symbol: 'MOTO',
    name: 'MOTO',
    contractId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', // Replace with actual MOTO contract ID
    decimals: 18,
    description: 'MotoSwap native token - used for intermediate pricing'
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    contractId: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890', // Replace with actual WBTC contract ID
    decimals: 8,
    description: 'Wrapped Bitcoin on OP_NET'
  },
  {
    symbol: 'OPCAT',
    name: 'OP CAT',
    contractId: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba', // Replace with actual OPCAT contract ID
    decimals: 18,
    description: 'OP_CAT meme token'
  },
  {
    symbol: 'ORANGE',
    name: 'Orange',
    contractId: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321', // Replace with actual ORANGE contract ID
    decimals: 18,
    description: 'Orange token on OP_NET'
  },
  
  // ====================================================================
  // ADD MORE OP-20 TOKENS HERE
  // ====================================================================
  // Go to https://opscan.org/tokens?network=mainnet
  // Copy the contract ID (transaction hash) from the token page
  // Add entries following this format:
  // {
  //   symbol: 'TOKEN_SYMBOL',
  //   name: 'Full Token Name',
  //   contractId: '0x...', // Full contract ID from OPScan
  //   decimals: 18, // Check token decimals on OPScan
  //   description: 'Brief description'
  // },
];

// ====================================================================
// BASE STABLECOINS
// ====================================================================

export interface BaseToken {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
}

/**
 * Supported stablecoins on Base network
 */
export const BASE_TOKENS: BaseToken[] = [
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2', // Base USDT contract
    decimals: 6
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // Base USDC contract
    decimals: 6
  }
];

// ====================================================================
// PRICE ORACLE CONFIGURATION
// ====================================================================

/**
 * Price refresh interval in milliseconds
 * Default: 15 seconds
 */
export const PRICE_REFRESH_INTERVAL = 15000;

/**
 * Coingecko API endpoint for BTC/USD price
 */
export const COINGECKO_BTC_PRICE_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

/**
 * Maximum retries for failed API calls
 */
export const MAX_PRICE_RETRIES = 3;

/**
 * Delay between retries in milliseconds
 */
export const RETRY_DELAY = 2000;

// ====================================================================
// BLOCKCHAIN EXPLORERS
// ====================================================================

/**
 * Get OP_NET explorer URL for transaction
 */
export const getOPNetExplorerUrl = (txHash: string): string => {
  return `https://opscan.org/tx/${txHash}`;
};

/**
 * Get Base explorer URL for transaction
 */
export const getBaseExplorerUrl = (txHash: string): string => {
  return `https://basescan.org/tx/${txHash}`;
};

/**
 * Get OP_NET explorer URL for address
 */
export const getOPNetAddressUrl = (address: string): string => {
  return `https://opscan.org/address/${address}`;
};

/**
 * Get Base explorer URL for address
 */
export const getBaseAddressUrl = (address: string): string => {
  return `https://basescan.org/address/${address}`;
};
