import { configureStore } from '@reduxjs/toolkit'
import popReducer from './pop/popSlice'

export const store = configureStore({
  reducer: {
    pop: popReducer,
  },
})