import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCoinBeanWallet,
  fetchCoinBeanWalletSuccess,
  fetchFailureCoinBeanWalletSucess,
  fetchSellerWalletBalancefailure,
  fetchSellerWalletBalanceRequest,
  fetchSellerWalletBalanceSuccess,
  sendCoinSellerWalletToAnyUserfailed,
  sendCoinSellerWalletToAnyUserRequest,
  sendCoinSellerWalletToAnyUserSuccess,
  sendCoinSellerWalletToSellerfailed,
  sendCoinSellerWalletToSellerRequest,
  sendCoinSellerWalletToSellerSuccess,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
} from "./walletSlice";
import { fetchSellerBalance, fetchWallet, fetchSingleUser, sendCoinSellerWalletToAnyUserWallet, sendCoinSellerWalletToSellerWallet, fetchTransactions } from "./walletServices";
import { SagaIterator } from "@redux-saga/core";
import { CoinTransferRequestPayload, CoinTransferResponse, TransactionItem, TransactionSearchParams, TransactionsResponse, Wallet } from "./walletTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

// Selector to get current wallet state
const getWalletState = (state: RootState) => state.wallet;

// Worker saga to fetch wallet balances
function* fetchCoinBeanWalletSaga(): SagaIterator {
  try {
    const walletData: { coinBalance: number; beanBalance: number } = yield call(fetchWallet);
    yield put(fetchCoinBeanWalletSuccess(walletData));
  } catch (error: any) {
    yield put(fetchFailureCoinBeanWalletSucess(error.message || "Failed to fetch wallet data"));
  }
}

function* fetchSellerWalletBalanceSaga(): SagaIterator {
    try {
      const wallet: Wallet = yield call(fetchSellerBalance);
      yield put(fetchSellerWalletBalanceSuccess(wallet.balance));
      
    }catch (error: any) {
      yield put(fetchSellerWalletBalancefailure(error.message || "failed to fetch seller balance"))
    }
}

function* sendCoinSellerWalletToAnyUserSaga(
  action: PayloadAction<CoinTransferRequestPayload>
): SagaIterator {
  try {
    const transaction: CoinTransferResponse = yield call(sendCoinSellerWalletToAnyUserWallet, action.payload);
    yield put(sendCoinSellerWalletToAnyUserSuccess({amount: action.payload.amount, message: transaction.message}));
  } catch (error: any) {
    yield put(sendCoinSellerWalletToAnyUserfailed(error.message || "Failed to transfer coins"));
  }
}

function* sendCoinSellerWalletToSellerSaga(
  action: PayloadAction<CoinTransferRequestPayload>
): SagaIterator {
  try {
   const transaction: CoinTransferResponse =  yield call(sendCoinSellerWalletToSellerWallet, action.payload);
    yield put(sendCoinSellerWalletToSellerSuccess({amount: action.payload.amount, message: transaction.message}));
  } catch (error: any) {
    yield put(sendCoinSellerWalletToSellerfailed(error.message || "Failed to transfer coins"));
  }
}

function* fetchTransactionsSaga(action: PayloadAction<TransactionSearchParams>): SagaIterator {
  try {
    const response: TransactionsResponse = yield call(fetchTransactions, action.payload);
    yield put(fetchTransactionsSuccess({ data: response.data, pagination: response.pagination }));
  } catch (error: any) {
    yield put(fetchTransactionsFailure(error.message || 'Failed to fetch transactions'));
  }
}



// Watcher saga
export function* walletSagas(): SagaIterator {
  yield takeLatest(fetchCoinBeanWallet.type, fetchCoinBeanWalletSaga);
  yield takeLatest(fetchSellerWalletBalanceRequest.type, fetchSellerWalletBalanceSaga);
  yield takeLatest(sendCoinSellerWalletToAnyUserRequest, sendCoinSellerWalletToAnyUserSaga);
  yield takeLatest(sendCoinSellerWalletToSellerRequest, sendCoinSellerWalletToSellerSaga);
  yield takeLatest(fetchTransactionsRequest.type, fetchTransactionsSaga);
}

