import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  persons: [],
  loading: false,
  error: null,
}

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true
    },
    loadingFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    loadPersonsSuccess: (state, action) => {
      state.persons = action.payload
      state.loading = false
    },
    addPersonSuccess: (state, action) => {
      state.persons =  [action.payload , ...state.persons ]
      state.loading = false
    },
    removePersonSuccess: (state, action) => {
      state.persons = state.persons.filter(person => person.id !== action.payload)
      state.loading = false
    },
    updatePersonSuccess: (state, action) => {
      const index = state.persons.findIndex(person => person.id === action.payload.id)
      if (index !== -1) {
        state.persons[index] = action.payload
      }
      state.loading = false
    },
  },
})

export const {
  startLoading,
  loadingFailed,
  loadPersonsSuccess,
  addPersonSuccess,
  removePersonSuccess,
  updatePersonSuccess
} = personSlice.actions

export default personSlice.reducer


