import { configureStore } from '@reduxjs/toolkit'
import personReducer from './person/personSlice'

export const store = configureStore({
  reducer: {
    person: personReducer,
  },
})