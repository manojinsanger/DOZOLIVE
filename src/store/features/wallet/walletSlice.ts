import { UserSearchResult, CoinTransferResponse, CoinTransferRequestPayload, TransactionItem, TransactionSearchParams, Pagination } from './walletTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  coinWalletBalance: number;
  BeansWalletBalance: number;
  sellerWalletBalance: number;
  searchedUser: UserSearchResult | null;
  loading: boolean;
  error: string | null;
  transferResponse: CoinTransferResponse | null;
  transactions: TransactionItem[];
  pagination: Pagination | null;
}

// Initial state for the user
const initialState: WalletState = {
  coinWalletBalance: 0,
  BeansWalletBalance: 0,
  sellerWalletBalance: 0,
  loading: false,
  error: null,
  searchedUser: null,
  transferResponse: null,
  transactions: [],
  pagination: null,
};

// Create the slice for user
const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    fetchCoinBeanWallet: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCoinBeanWalletSuccess: (state, action) => {
      state.loading = false;
      state.coinWalletBalance = action.payload.coinBalance;
      state.BeansWalletBalance = action.payload.beanBalance;
    },
    fetchFailureCoinBeanWalletSucess: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Search seller balance
    fetchSellerWalletBalanceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSellerWalletBalanceSuccess: (state, action) => {
      state.loading = false;
      state.sellerWalletBalance = action.payload;
    },
    fetchSellerWalletBalancefailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // send coin seller wallet to any user wallet
    sendCoinSellerWalletToAnyUserRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    sendCoinSellerWalletToAnyUserSuccess: (state, action: PayloadAction<CoinTransferResponse>) => {
      state.loading = false;
      state.transferResponse = action.payload;

      if (action.payload?.amount) {
        state.sellerWalletBalance = state.sellerWalletBalance - action.payload.amount;
      } else {
        console.warn("Missing senderSellerWalletBalance in response!");
      }
    },
    sendCoinSellerWalletToAnyUserfailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // send coin seller wallet to seller wallet
    sendCoinSellerWalletToSellerRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    sendCoinSellerWalletToSellerSuccess: (state, action: PayloadAction<CoinTransferResponse>) => {
      state.loading = false;
      state.transferResponse = action.payload;

      if (action.payload?.amount) {
        state.sellerWalletBalance = state.sellerWalletBalance - action.payload.amount;
      } else {
        console.warn("Missing senderSellerWalletBalance in response!");
      }

    },
    sendCoinSellerWalletToSellerfailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearWalletError: (state) => {
      state.error = null;
    },

    clearTransferResponse: (state) => {
      state.transferResponse = null;
    },
    fetchTransactionsRequest: (state, action: PayloadAction<TransactionSearchParams>) => {
      state.loading = true;
      state.error = null;
    },
    fetchTransactionsSuccess: (state, action: PayloadAction<{ data: TransactionItem[]; pagination: Pagination }>) => {
      state.loading = false;
      state.transactions = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchTransactionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

// Export the actions
export const {
  fetchCoinBeanWallet,
  fetchCoinBeanWalletSuccess,
  fetchFailureCoinBeanWalletSucess,
  fetchSellerWalletBalanceRequest,
  fetchSellerWalletBalanceSuccess,
  fetchSellerWalletBalancefailure,
  sendCoinSellerWalletToAnyUserRequest,
  sendCoinSellerWalletToAnyUserSuccess,
  sendCoinSellerWalletToAnyUserfailed,
  sendCoinSellerWalletToSellerRequest,
  sendCoinSellerWalletToSellerSuccess,
  sendCoinSellerWalletToSellerfailed,
  clearWalletError,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  clearTransferResponse

} = walletSlice.actions;

// Export the reducer to be used in the store
export default walletSlice.reducer;
