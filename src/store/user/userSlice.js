import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  loading: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true
    },
    loadingFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    loadUsersSuccess: (state, action) => {
      state.users = action.payload
      state.loading = false
    },
    addUserSuccess: (state, action) => {
      state.users =  [action.payload , ...state.users ]
      state.loading = false
    },
    removeUserSuccess: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload)
      state.loading = false
    },
    updateUserSuccess: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
      state.loading = false
    },
  },
})

export const {
  startLoading,
  loadingFailed,
  loadUsersSuccess,
  addUserSuccess,
  removeUserSuccess,
  updateUserSuccess
} = userSlice.actions

export default userSlice.reducer


