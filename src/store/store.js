import { configureStore } from "@reduxjs/toolkit";
import cartReduser  from "@/slice/cartSlice"
const store = configureStore({
    reducer: {
        cart: cartReduser
    },
});

export default store;
