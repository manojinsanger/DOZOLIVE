// import { 
//   Wallet, 
//   RechargeWalletRequest,
//   SpendCoinsRequest,
//   SendGiftRequest,
//   WithdrawPointsRequest,
//   TransferCoinsAgentUserRequest,
//   TransferCoinsSuperAgentAgentRequest,
//   WalletType
// } from '@/types/wallet.types';
// import { fetchToken } from '@/controllers/fetchToken';
// import { axiosInstance } from '@/services/apiUrl';

// // Add auth token to requests
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = await fetchToken(); // ✅ await here
//     console.log("Token in interceptor:", token); // Should be actual string now
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// import { axiosInstance } from '@/services/apiUrl';
// import { WalletType, SendGiftRequest, RechargeWalletRequest, SpendCoinsRequest, TransferCoinsAgentUserRequest } from '@/types/wallet.types';

// export interface WalletData {
//   coinWallet: number;
//   beanWallet: number;
// }

// export interface SendGiftResponse {
//   message: string;
//   transaction: any; // Ignored in state as per requirement
//   senderSellerWalletBalance: number;
//   receiverBalance: number;
// }

// export const fetchWallet = async (): Promise<WalletData> => {
//   const response = await axiosInstance.get('/wallet');
//   return {
//     coinWallet: response.data.coinWallet || 0,
//     beanWallet: response.data.beanWallet || 0,
//   };
// };

// export const addFunds = async (amount: number, currency: WalletType): Promise<void> => {
//   const payload: RechargeWalletRequest = { amount, currency };
//   await axiosInstance.post('/wallet/add', payload);
// };

// export const spendFunds = async (amount: number, currency: WalletType): Promise<void> => {
//   const payload: SpendCoinsRequest = { amount, currency };
//   await axiosInstance.post('/wallet/spend', payload);
// };

// export const sendGift = async (receiverId: string, amount: number): Promise<SendGiftResponse> => {
//   const payload: SendGiftRequest = { receiverId, amount };
//   const response = await axiosInstance.post('/gifts/send', payload);
//   return {
//     message: response.data.message,
//     transaction: response.data.transaction,
//     senderSellerWalletBalance: response.data.senderSellerWalletBalance,
//     receiverBalance: response.data.receiverBalance,
//   };
// };

// export const transferCoins = async (amount: number, recipientId: string): Promise<void> => {
//   const payload: TransferCoinsAgentUserRequest = { amount, recipientId };
//   await axiosInstance.post('/wallet/transfer', payload);
// };
