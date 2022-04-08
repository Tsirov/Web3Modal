import { createSlice } from '@reduxjs/toolkit';

const providerSlice = createSlice({
    name: 'provider',
    initialState: {
        currentProvider: false        
    },
    reducers: {
        connectionSuccess: (state, action) => {
            // state.isFetching = false;
            state.currentProvider = action.payload;
        },
        disconnectionSuccess: (state) => {
            state.currentProvider = {};

        }
    }
});

export const {connectionSuccess,disconnectionSuccess} = providerSlice.actions;
export default providerSlice.reducer;




