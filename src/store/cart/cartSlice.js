import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  carts: [],
  loading: false,
  error: null,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true
    },
    loadingFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    loadCartsSuccess: (state, action) => {
      state.carts = action.payload
      state.loading = false
    },
    addCartSuccess: (state, action) => {
      state.carts =  [action.payload , ...state.carts ]
      state.loading = false
    },
    removeCartSuccess: (state, action) => {
      state.carts = state.carts.filter(cart => cart.id !== action.payload)
      state.loading = false
    },
    updateCartSuccess: (state, action) => {
      const index = state.carts.findIndex(cart => cart.id === action.payload.id)
      if (index !== -1) {
        state.carts[index] = action.payload
      }
      state.loading = false
    },
  },
})

export const {
  startLoading,
  loadingFailed,
  loadCartsSuccess,
  addCartSuccess,
  removeCartSuccess,
  updateCartSuccess
} = cartSlice.actions

export default cartSlice.reducer


