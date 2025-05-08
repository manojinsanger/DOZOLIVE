import { call, put, takeLatest } from "redux-saga/effects";
import {
    fetchhostCount,
    fetchhostCountSuccess,
    fetchFailurehostCount,
} from "./hostCountSlice";
import { fetchAgentHostCount } from "./hostCountServices";
import { SagaIterator } from "@redux-saga/core";

// Worker saga to fetch wallet balances
function* fetchhostCountSaga(): SagaIterator {
  try {
    const totalNuberOfHosts:{totalHosts:number} = yield call(fetchAgentHostCount);
    yield put( fetchhostCountSuccess(totalNuberOfHosts));
  } catch (error: any) {
    yield put( fetchFailurehostCount(error.message || "Failed to fetch wallet data"));
  }
}

// Watcher saga
export function* hostCountSaga(): SagaIterator {
  yield takeLatest(fetchhostCount.type, fetchhostCountSaga);
}