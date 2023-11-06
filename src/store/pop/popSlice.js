import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pops: [],
  loading: false,
  error: null,
}

export const popSlice = createSlice({
  name: 'pop',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true
    },
    loadingFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    loadPopsSuccess: (state, action) => {
      state.pops = action.payload
      state.loading = false
    },
    addPopSuccess: (state, action) => {
      state.pops.push(action.payload)
      state.loading = false
    },
    removePopSuccess: (state, action) => {
      state.pops = state.pops.filter(pop => pop.id !== action.payload)
      state.loading = false
    },
    updatePopSuccess: (state, action) => {
      const index = state.pops.findIndex(pop => pop.id === action.payload.id)
      if (index !== -1) {
        state.pops[index] = action.payload
      }
      state.loading = false
    },
  },
})

export const {
  startLoading, 
  loadingFailed, 
  loadPopsSuccess,
  addPopSuccess,
  removePopSuccess,
  updatePopSuccess
} = popSlice.actions

export default popSlice.reducer


