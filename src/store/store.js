import { configureStore } from '@reduxjs/toolkit'
import productReducer from './product/productSlice'
import userReducer from './user/userSlice'
import cartReducer from './cart/cartSlice'

export const store = configureStore({
  reducer: {
    product: productReducer, 
    user: userReducer, 
    cart: cartReducer, 
  },
})