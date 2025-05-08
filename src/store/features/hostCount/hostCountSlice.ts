// features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user
const initialState = { 
  hostCount:0,
  loading: false,   
  error: null,     
};


// Create the slice for user
const userSlice = createSlice({
  name: 'hostCount',                  
  initialState,                 
  reducers: {
    fetchhostCount: (state) => {
      state.loading = true;      
      state.error = null;         
    },
    fetchhostCountSuccess: (state, action) => {
      state.loading = false;      
   
      state.hostCount = action.payload.totalHosts; 
    },
    fetchFailurehostCount: (state, action) => {
      state.loading = false;  
      state.error = action.payload; 
    },
  },
});

// Export the actions
export const { fetchhostCount, fetchhostCountSuccess, fetchFailurehostCount } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;