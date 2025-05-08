import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

import { walletSagas } from '@/store/features/wallet/walletSaga';
import {hostCountSaga} from '@/store/features/hostCount/hostCountSaga'
import {postSaga} from '@/store/features/Post_related/postSaga'
// import other sagas similarly
// import { userSaga } from '@/store/features/user/userSaga';

export function* rootSaga(): SagaIterator {
yield all([
fork(walletSagas),
fork(hostCountSaga),
fork(postSaga)
// fork(userSaga),
]);
}