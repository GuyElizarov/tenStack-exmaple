export const selectPops = (state) => state.pop?.pops || []
export const selectPopError = (state) => state.pop?.error
export const selectIsLoadingPop = (state) => state.pop?.loading
