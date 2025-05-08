// src/types/wallet.types.ts
export enum WalletType {
    USER = 1,
    HOST = 2,
    AGENT = 3,
    SUPER_AGENT = 4,
    COIN_SELLER = 5
  }
  
  export interface Wallet {
    _id: string;
    userId: string;
    balance: number;
    walletType: WalletType;
    transactions: Transaction[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Transaction {
    _id: string;
    amount: number;
    type: 'credit' | 'debit';
    details: string;
    createdAt: string;
  }
  
  // Request types
  export interface RechargeWalletRequest {
    userId: string;
    amount: number;
    walletType?: WalletType;
  }
  
  export interface SpendCoinsRequest {
    userId: string;
    amount: number;
    details: string;
    walletType?: WalletType;
  }
  
  export interface SendGiftRequest {
    senderId: string;
    receiverId: string;
    amount: number;
    senderWalletType?: WalletType;
    receiverWalletType?: WalletType;
  }
  
  export interface WithdrawPointsRequest {
    userId: string;
    amount: number;
    walletType?: WalletType;
  }
  
  export interface TransferCoinsAgentUserRequest {
    agentId: string;
    userId: string;
    amount: number;
  }
  
  export interface TransferCoinsSuperAgentAgentRequest {
    superAgentId: string;
    agentId: string;
    amount: number;
  }