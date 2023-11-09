export const selectProducts = (state) => state.product?.products || []
export const selectProductError = (state) => state.product?.error
export const selectIsLoadingProduct = (state) => state.product?.loading
