import { productService } from '../../services/productService'
import {  startLoading,  loadingFailed,  loadProductsSuccess,  addProductSuccess,
  removeProductSuccess,  updateProductSuccess} from './productSlice.js' 
  
export const loadProducts = () => async (dispatch) => {
  try {
    dispatch(startLoading())
    const products = await productService.getProducts()
    dispatch(loadProductsSuccess(products))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const addProduct = (product) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const savedProduct = product
    // const savedProduct = await productService.save(product)
    dispatch(addProductSuccess(savedProduct))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const removeProduct = (productId) => async (dispatch) => {
  try {
    dispatch(startLoading())
    // await productService.remove(productId)
    dispatch(removeProductSuccess(productId))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const updatedProduct = product
    // const updatedProduct = await productService.save(product) 
    dispatch(updateProductSuccess(updatedProduct))
  } catch (error) {
    dispatch(loadingFailed(error.toString()))
  }
}


