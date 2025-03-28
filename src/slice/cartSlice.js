import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products:[],
    totalPrice:0,
    totalProduct:0,
};

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addProduct:(state, action)=>{
            state.products.push(action.payload.product);
            state.totalProduct +=  action.payload.productAmount
            state.totalPrice += action.payload.productPrice
        }
    }
})

export const {addProduct} = cartSlice.actions
export default cartSlice.reducer