import { fetchToken } from '@/controllers/fetchToken';
import { axiosInstance } from '@/services/apiUrl';
import { CoinTransferRequestPayload, CoinTransferResponse, TransactionItem, TransactionSearchParams, TransactionsResponse, UserSearchResult, Wallet } from './walletTypes';

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await fetchToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const fetchWallet = async (): Promise<{ coinBalance: number; beanBalance: number }> => {
  try {
    const response = await axiosInstance.get('/wallet/getcoinbeanwalletbalance');

    if (!response.data.success) {
      throw new Error("Failed to fetch wallet data");
    }

    const { beanwallet, coinwallet } = response.data.data;

    const coinBalance = parseFloat(coinwallet?.balance || '0');
    const beanBalance = parseFloat(beanwallet?.balance || '0');

    return { coinBalance, beanBalance };
  } catch (error: any) {
    throw new Error(error?.message || "Wallet fetch failed");
  }
};

export const fetchSellerBalance = async (): Promise<Wallet> => {
  try {
    const response = await axiosInstance.get('/wallet/getsellerwalletbalance');
    const wallet = await response.data.wallet;
    return wallet;

  } catch (err: any) {
    throw new Error(err?.message || "Seller balance fetch failed");
  }
}

export const fetchSingleUser = async (searchId: string): Promise<UserSearchResult> => {
  try {
    const response = await axiosInstance.get('/search/searchsingleuser', {
      params: {
        searchId
      }
    })

    if (response.data.status != 'success') {
      throw new Error(response.data.message || "Failed to fetch user")
    }
    return response.data.data;

  } catch (error) {
    throw new Error("Failed to fetch user")
  }
}

export const sendCoinSellerWalletToAnyUserWallet = async (
  payload: CoinTransferRequestPayload
): Promise<CoinTransferResponse> => {
  try {
    const response = await axiosInstance.post('/wallet/sendcoinsellertoanyuser', payload);
    return response.data; // ✅ FIXED HERE
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to transfer coins");
  }
};




export const sendCoinSellerWalletToSellerWallet = async (payload: CoinTransferRequestPayload): Promise<CoinTransferResponse> => {
  try {
    const response = await axiosInstance.post('/wallet/sendcoinssellerwallettosellerwallet', payload);
    return response.data;

  } catch (error: any) {
    console.log("Seller wallet API error:", error?.response?.data || error.message);
    throw error;
  }
}

export const fetchTransactions = async (params?: TransactionSearchParams): Promise<TransactionsResponse> => {
  try {
    const response = await axiosInstance.get('/transaction/gettransaction', {
      params
    });
    if (!response.data.success) {
      throw new Error("Failed to fetch transactions");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Transaction fetch failed");
  }
};
