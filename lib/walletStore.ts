/**
 * WALLET STORE - REAL WALLET INTEGRATION
 * Integrates with OP_WALLET browser extension and Base network wallets (MetaMask)
 */

'use client';

import { create } from 'zustand';

declare global {
  interface Window {
    opwallet?: {
      requestAccounts: () => Promise<string[]>;
      getBalance: (address: string) => Promise<string>;
      getNetwork: () => Promise<string>;
      on: (event: string, callback: (data: any) => void) => void;
      removeListener: (event: string, callback: (data: any) => void) => void;
    };
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (data: any) => void) => void;
      removeListener: (event: string, callback: (data: any) => void) => void;
      isMetaMask?: boolean;
    };
  }
}

interface WalletState {
  opnetAddress: string | null;
  opnetBalance: string | null;
  opnetConnected: boolean;
  opnetConnecting: boolean;
  opnetError: string | null;
  
  baseAddress: string | null;
  baseBalance: string | null;
  baseConnected: boolean;
  baseConnecting: boolean;
  baseError: string | null;
  
  connectOPWallet: () => Promise<void>;
  disconnectOPWallet: () => void;
  connectBaseWallet: () => Promise<void>;
  disconnectBaseWallet: () => void;
  refreshOPBalance: () => Promise<void>;
  refreshBaseBalance: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  opnetAddress: null,
  opnetBalance: null,
  opnetConnected: false,
  opnetConnecting: false,
  opnetError: null,
  
  baseAddress: null,
  baseBalance: null,
  baseConnected: false,
  baseConnecting: false,
  baseError: null,

  connectOPWallet: async () => {
    set({ opnetConnecting: true, opnetError: null });
    
    try {
      if (typeof window === 'undefined' || !window.opwallet) {
        throw new Error('OP_WALLET not installed');
      }

      const accounts = await window.opwallet.requestAccounts();
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];
      const balance = await window.opwallet.getBalance(address);

      set({
        opnetAddress: address,
        opnetBalance: balance,
        opnetConnected: true,
        opnetConnecting: false,
      });
    } catch (error) {
      set({
        opnetConnecting: false,
        opnetError: error instanceof Error ? error.message : 'Connection failed',
      });
    }
  },

  disconnectOPWallet: () => {
    set({
      opnetAddress: null,
      opnetBalance: null,
      opnetConnected: false,
    });
  },

  refreshOPBalance: async () => {
    const { opnetAddress } = get();
    if (!opnetAddress || !window.opwallet) return;

    try {
      const balance = await window.opwallet.getBalance(opnetAddress);
      set({ opnetBalance: balance });
    } catch (error) {
      console.error('Failed to refresh OP balance:', error);
    }
  },

  connectBaseWallet: async () => {
    set({ baseConnecting: true, baseError: null });
    
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const address = accounts[0];
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      if (chainId !== '0x2105') {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2105' }]
        });
      }

      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });

      const balanceInEth = parseInt(balance, 16) / 1e18;

      set({
        baseAddress: address,
        baseBalance: balanceInEth.toFixed(6),
        baseConnected: true,
        baseConnecting: false,
      });
    } catch (error) {
      set({
        baseConnecting: false,
        baseError: error instanceof Error ? error.message : 'Connection failed',
      });
    }
  },

  disconnectBaseWallet: () => {
    set({
      baseAddress: null,
      baseBalance: null,
      baseConnected: false,
    });
  },

  refreshBaseBalance: async () => {
    const { baseAddress } = get();
    if (!baseAddress || !window.ethereum) return;

    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [baseAddress, 'latest']
      });

      const balanceInEth = parseInt(balance, 16) / 1e18;
      set({ baseBalance: balanceInEth.toFixed(6) });
    } catch (error) {
      console.error('Failed to refresh Base balance:', error);
    }
  }
}));
