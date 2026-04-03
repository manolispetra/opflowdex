/**
 * WALLET STATE MANAGEMENT
 * 
 * This store manages both OP_NET and Base wallet connections
 * Uses Zustand for lightweight state management
 */

import { create } from 'zustand';

interface WalletState {
  // OP_NET wallet (OP_WALLET extension)
  opnetAddress: string | null;
  opnetBalance: string | null;
  opnetConnected: boolean;
  
  // Base wallet (MetaMask/Rabby/Coinbase)
  baseAddress: string | null;
  baseBalance: string | null;
  baseConnected: boolean;
  
  // Actions
  connectOPNet: () => Promise<void>;
  disconnectOPNet: () => void;
  connectBase: () => Promise<void>;
  disconnectBase: () => void;
  updateOPNetBalance: (balance: string) => void;
  updateBaseBalance: (balance: string) => void;
}

/**
 * Global wallet store
 */
export const useWalletStore = create<WalletState>((set) => ({
  // Initial state
  opnetAddress: null,
  opnetBalance: null,
  opnetConnected: false,
  baseAddress: null,
  baseBalance: null,
  baseConnected: false,
  
  /**
   * Connect to OP_NET wallet (OP_WALLET extension)
   * 
   * In production, this would use:
   * - window.opwallet.requestAccounts()
   * - Listen for account changes
   * - Query balance via OP_NET RPC
   */
  connectOPNet: async () => {
    try {
      // Mock implementation - replace with actual OP_WALLET integration
      if (typeof window !== 'undefined') {
        // Check if OP_WALLET is installed
        // const opwallet = (window as any).opwallet;
        
        // if (!opwallet) {
        //   throw new Error('OP_WALLET not installed');
        // }
        
        // Request account access
        // const accounts = await opwallet.requestAccounts();
        // const address = accounts[0];
        
        // Mock for demo
        const mockAddress = 'bc1p...demo...address';
        const mockBalance = '1000.00';
        
        set({
          opnetAddress: mockAddress,
          opnetBalance: mockBalance,
          opnetConnected: true
        });
      }
    } catch (error) {
      console.error('Failed to connect OP_NET wallet:', error);
      throw error;
    }
  },
  
  /**
   * Disconnect OP_NET wallet
   */
  disconnectOPNet: () => {
    set({
      opnetAddress: null,
      opnetBalance: null,
      opnetConnected: false
    });
  },
  
  /**
   * Connect to Base wallet (MetaMask/Rabby/Coinbase)
   * 
   * In production, this would use:
   * - window.ethereum.request({ method: 'eth_requestAccounts' })
   * - Switch to Base network (chain ID 8453)
   * - Query USDT/USDC balances
   */
  connectBase: async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const ethereum = (window as any).ethereum;
        
        // Request account access
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        const address = accounts[0];
        
        // Switch to Base network (chain ID 8453)
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x2105' }], // Base mainnet
          });
        } catch (switchError: any) {
          // Chain doesn't exist, add it
          if (switchError.code === 4902) {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x2105',
                chainName: 'Base',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['https://mainnet.base.org'],
                blockExplorerUrls: ['https://basescan.org']
              }]
            });
          }
        }
        
        // Mock balance for demo
        const mockBalance = '500.00';
        
        set({
          baseAddress: address,
          baseBalance: mockBalance,
          baseConnected: true
        });
      } else {
        throw new Error('No Ethereum wallet detected');
      }
    } catch (error) {
      console.error('Failed to connect Base wallet:', error);
      throw error;
    }
  },
  
  /**
   * Disconnect Base wallet
   */
  disconnectBase: () => {
    set({
      baseAddress: null,
      baseBalance: null,
      baseConnected: false
    });
  },
  
  /**
   * Update OP_NET wallet balance
   */
  updateOPNetBalance: (balance: string) => {
    set({ opnetBalance: balance });
  },
  
  /**
   * Update Base wallet balance
   */
  updateBaseBalance: (balance: string) => {
    set({ baseBalance: balance });
  }
}));
