export const selectCarts = (state) => state.cart?.carts || []
export const selectCartError = (state) => state.cart?.error
export const selectIsLoadingCart = (state) => state.cart?.loading
