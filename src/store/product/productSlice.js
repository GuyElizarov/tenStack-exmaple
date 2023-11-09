import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  loading: false,
  error: null,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true
    },
    loadingFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    loadProductsSuccess: (state, action) => {
      state.products = action.payload
      state.loading = false
    },
    addProductSuccess: (state, action) => {
      state.products =  [action.payload , ...state.products ]
      state.loading = false
    },
    removeProductSuccess: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload)
      state.loading = false
    },
    updateProductSuccess: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
      state.loading = false
    },
  },
})

export const {
  startLoading,
  loadingFailed,
  loadProductsSuccess,
  addProductSuccess,
  removeProductSuccess,
  updateProductSuccess
} = productSlice.actions

export default productSlice.reducer


