import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from './cartRedux';
import providerReducer from './providerRedux';
// import {
//     persistStore,
//     persistReducer,
// } from 'redux-persist';


// const rootReducer = combineReducers({provider: providerReducer, cart: cartReducer})

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store =  configureStore({
    reducer: { // this is only if we have userReducer
        provider: providerReducer,
        cart: cartReducer
    },
    // reducer:persistedReducer  
});

// export const persistor = persistStore(store)