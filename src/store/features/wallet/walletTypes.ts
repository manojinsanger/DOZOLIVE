
export interface WalletState {
  coinWallet: number;
  beanWallet: number;
  loading: boolean;
  error: string | null;
}

export type WalletType = 'COIN' | 'SELLER';

export interface Wallet {
  id: number,
  balance: string,
  walletType: WalletType,
  createAt: string,
  updatedAt: string,
}


export interface WalletResponse {
  wallet: Wallet
}

export interface UserSearchResult {
  userId: number;
  liveId: number;
  specialId: string,
  name: string,
  profileImage: string,
  roles: "SUPER_SELLER" | "SELLER"
}

export interface CoinTransferRequestPayload {
  receiverId: number;
  amount: number;
}

export interface CoinTransferResponse {
  message: string;
  amount: number
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
}

export interface TransactionSearchParams {
  commonId?: string;
  secondUserID?: string;
  page?: number;
  walletType?: TransactionWalletType;
  search?: string;
  startDate?: string | null;
  endDate?: string | null;
  transactionType?: 'received' | 'sent' | undefined;
}

export interface Pagination {
  page: number;
  total: number;
  totalPages: number;
}

export enum TransactionType {
  RECHARGE = 'RECHARGE',
  GIFT_TRANSACTION = 'GIFT_TRANSACTION',
  WITHDRAW = 'WITHDRAW',
  SEND_TRANSFER = 'SEND_TRANSFER',
  COMMISSION = 'COMMISSION',
}

export type TransactionWalletType = "SELLER" | "COIN" | "BEAN";

export interface User {
  id: number;
  liveId: number;
  name: string | null;
  specialId: string | null;
  profileImage: string | null;
  walletType: TransactionWalletType;
}

export interface TransactionMetadata {
  note?: string;
  senderLiveId: number;
  receiverLiveId: number;
}

export interface Transaction {
  id: number;
  amount: string;
  metadata: TransactionMetadata;
  timestamp: string;
  transactionType: TransactionType;
  senderPreviousBalance: string | null;
  senderCurrentBalance: string | null;
  receiverPreviousBalance: string | null;
  receiverCurrentBalance: string | null;
  senderSpecialId: string | null;
  receiverSpecialId: string | null;
}

export interface TransactionItem {
  transaction: {
    id: number;
    amount: number;
    timestamp: string;
    senderCurrentBalance: number;
    receiverCurrentBalance: number;
  };
  sender: {
    id: string;
    name?: string;
    liveId?: string;
    specialId?: string;
  };
  receiver: {
    id: string;
    name?: string;
    liveId?: string;
    specialId?: string;
    walletType?: string;
  };
}

export interface TransactionsResponse {
  success: boolean;
  data: TransactionItem[];
  pagination: Pagination;
}

export interface UserSearchResult {
  id: string;
  name: string;
  liveId: number;
}

export interface CoinIntersectResponse {
  amount: number;
  message: string;
}

export interface CoinTransferResponse {
  amount: number;
  message: string;
}

export interface Wallet {
  balance: string;
}