// ✅ Centralized typed Redux hooks
// Use these instead of plain `useDispatch` and `useSelector` throughout the app

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';

// 📌 Use this hook when dispatching actions
// Example: const dispatch = useAppDispatch();
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 📌 Use this hook when selecting from the Redux store
// Example: const user = useAppSelector(state => state.user.data);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



// reference 
// import { useDispatch, useSelector } from 'react-redux';

// import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

// const dispatch = useAppDispatch();
// const user = useAppSelector(state => state.user);