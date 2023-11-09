import { cartService } from '../../services/cartService'
import {  startLoading,  loadingFailed,  loadCartsSuccess,  addCartSuccess,
  removeCartSuccess,  updateCartSuccess} from './cartSlice.js' 
  
export const loadCarts = () => async (dispatch) => {
  try {
    dispatch(startLoading())
    const carts = await cartService.getCarts()
    dispatch(loadCartsSuccess(carts))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const addToCart = (cart) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const savedCart = cart
    // const savedCart = await cartService.save(cart)
    dispatch(addCartSuccess(savedCart))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const removeFromCart = (cartId) => async (dispatch) => {
  try {
    dispatch(startLoading())
    // await cartService.remove(cartId)
    dispatch(removeCartSuccess(cartId))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const updateCart = (cart) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const updatedCart = cart
    // const updatedCart = await cartService.save(cart) 
    dispatch(updateCartSuccess(updatedCart))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}


