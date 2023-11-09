import { userService } from '../../services/userService'
import {  startLoading,  loadingFailed,  loadUsersSuccess,  addUserSuccess,
  removeUserSuccess,  updateUserSuccess} from './userSlice.js' 
  
export const loadUsers = () => async (dispatch) => {
  try {
    dispatch(startLoading())
    const users = await userService.getUsers()
    dispatch(loadUsersSuccess(users))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const addUser = (user) => async (dispatch) => {
  try {
    dispatch(startLoading())
    // const savedUser = await userService.save(user)
    const savedUser = user
    dispatch(addUserSuccess(savedUser))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const removeUser = (userId) => async (dispatch) => {
  try {
    dispatch(startLoading())
    // await userService.remove(userId)
    dispatch(removeUserSuccess(userId))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch(startLoading())
    // const updatedUser = await userService.save(user) 
    const updatedUser = user 
    dispatch(updateUserSuccess(updatedUser))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}


