import { combineReducers } from '@reduxjs/toolkit';
import walletReducer from '@/store/features/wallet/walletSlice';
import hostCountReducer from '@/store/features/hostCount/hostCountSlice'
import postReducer from'@/store/features/Post_related/postSlice'
// import other reducers
// import userReducer from '@/store/features/user/userSlice';

export const rootReducer = combineReducers({
wallet: walletReducer,
hostCount:hostCountReducer,
post:postReducer
// user: userReducer,
});
