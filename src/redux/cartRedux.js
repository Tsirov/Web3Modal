import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: {aa: 'anton'},
        quantity: 2,
        total: 0,
    }
    ,
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;

        },
        // clearProduct: (state,action) => {
        //     state.products = [];
        //     state.quantity = 0;
        //     state.total = 0;
        // },
        increaseProduct: (state, action) => {
            state.products[action.payload.index].quantity += 1;
            state.total += state.products[action.payload.index].price * 1;
        },
        decreaseProduct: (state, action) => {
            state.products[action.payload.index].quantity -= 1; 
            state.total -= state.products[action.payload.index].price * 1;
            if (state.products[action.payload.index].quantity == 0) {
                state.products.splice(action.payload.index, 1);
                state.quantity -= 1;
            }
        }
    }
});

export const { addProduct,clearProduct,increaseProduct,decreaseProduct } = cartSlice.actions;
export default cartSlice.reducer;



